import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  constructor(private http: HttpClient, private recipseSrv: RecipeService) {}

  storeRecipes() {
    const req = new HttpRequest('PUT', environment.firebaseUrl + 'recipes.json', this.recipseSrv.getRecipesSnapshot());
    return this.http.request(req);
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(environment.firebaseUrl + 'recipes.json').pipe(
      map(recipes => {
        if (recipes === null) {
          recipes = [];
        } else {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
        }
        return recipes;
      }),
      tap(newRecipes => {
        this.recipseSrv.updateRecipesFromDatabase(newRecipes);
      })
    );
  }

  setDefaultRecipes() {
    return this.http.put<Recipe[]>(environment.firebaseUrl + 'recipes.json', this.recipseSrv.getDefaultRecipes()).pipe(
      tap(newRecipes => {
        this.recipseSrv.updateRecipesFromDatabase(newRecipes);
      })
    );
  }
}
