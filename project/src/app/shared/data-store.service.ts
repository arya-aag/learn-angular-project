import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  constructor(private http: Http, private recipseSrv: RecipeService) {}

  storeRecipes() {
    return this.http
      .put(environment.firebaseUrl + 'recipes.json', this.recipseSrv.getRecipesSnapshot())
      .pipe(map((res: Response) => res.json()));
  }

  fetchRecipes() {
    return this.http.get(environment.firebaseUrl + 'recipes.json').pipe(
      tap((res: Response) => {
        const newRecipes: Recipe[] = res.json();
        this.recipseSrv.updateRecipesFromDatabase(newRecipes);
      }),
      map((res: Response) => res.json())
    );
  }

  setDefaultRecipes() {
    return this.http.put(environment.firebaseUrl + 'recipes.json', this.recipseSrv.getDefaultRecipes()).pipe(
      tap((res: Response) => {
        const newRecipes: Recipe[] = res.json();
        this.recipseSrv.updateRecipesFromDatabase(newRecipes);
      }),
      map((res: Response) => res.json())
    );
  }
}
