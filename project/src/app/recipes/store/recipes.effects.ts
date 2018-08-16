import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { Store } from '@ngrx/store';

import * as RecipeActs from './recipes.actions';
import * as fromRecipeReducers from './recipes.reducers';
import { Recipe } from '../recipe.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromRecipeReducers.RecipeFeatureState>
  ) {}

  @Effect()
  getRecipes = this.actions$.ofType(RecipeActs.GET_RECIPES_FROM_DATABASE).pipe(
    switchMap(() => {
      return from(this.http.get<Recipe[]>(environment.firebaseUrl + 'recipes.json'));
    }),
    map((recipes: Recipe[]) => {
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
      return {
        type: RecipeActs.SET_RECIPES,
        payload: recipes
      };
    })
  );

  @Effect({ dispatch: false })
  saveRecipes = this.actions$.ofType(RecipeActs.SAVE_RECIPES_TO_DATABASE).pipe(
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, recipeState]) => {
      return from(this.http.put(environment.firebaseUrl + 'recipes.json', recipeState.recipes));
    })
  );
}
