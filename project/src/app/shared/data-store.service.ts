import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  constructor(private http: Http, private recipseSrv: RecipeService, private authSrv: AuthService) {}

  storeRecipes() {
    const token = this.authSrv.getToken();
    return this.http
      .put(environment.firebaseUrl + 'recipes.json?auth=' + token, this.recipseSrv.getRecipesSnapshot())
      .pipe(map((res: Response) => res.json()));
  }

  fetchRecipes() {
    const token = this.authSrv.getToken();
    return this.http.get(environment.firebaseUrl + 'recipes.json?auth=' + token).pipe(
      tap((res: Response) => {
        const newRecipes: Recipe[] = res.json();
        this.recipseSrv.updateRecipesFromDatabase(newRecipes);
      }),
      map((res: Response) => {
        let recipes: Recipe[] = res.json();
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
      })
    );
  }

  setDefaultRecipes() {
    const token = this.authSrv.getToken();
    return this.http
      .put(environment.firebaseUrl + 'recipes.json?auth=' + token, this.recipseSrv.getDefaultRecipes())
      .pipe(
        tap((res: Response) => {
          const newRecipes: Recipe[] = res.json();
          this.recipseSrv.updateRecipesFromDatabase(newRecipes);
        }),
        map((res: Response) => res.json())
      );
  }
}
