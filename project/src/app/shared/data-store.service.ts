import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Response } from '@angular/http';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  constructor(private http: HttpClient, private recipseSrv: RecipeService, private authSrv: AuthService) {}

  storeRecipes() {
    const token = this.authSrv.getToken();
    return this.http.put<Recipe[]>(
      environment.firebaseUrl + 'recipes.json?auth=' + token,
      this.recipseSrv.getRecipesSnapshot()
    );
  }

  fetchRecipes() {
    const token = this.authSrv.getToken();

    // return this.http.get<Recipe[]>(environment.firebaseUrl + 'recipes.json?auth=' + token, { observe: 'events' }).pipe(
    //   map((response: HttpEvent<Object>) => {
    //     console.log(response);
    //   })
    // );
    return this.http.get<Recipe[]>(environment.firebaseUrl + 'recipes.json?auth=' + token).pipe(
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
    const token = this.authSrv.getToken();
    return this.http
      .put<Recipe[]>(environment.firebaseUrl + 'recipes.json?auth=' + token, this.recipseSrv.getDefaultRecipes())
      .pipe(
        tap(newRecipes => {
          this.recipseSrv.updateRecipesFromDatabase(newRecipes);
        })
      );
  }
}
