import { Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';

export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const GET_RECIPES_FROM_DATABASE = 'GET_RECIPES_FROM_DATABASE';
export const SAVE_RECIPES_TO_DATABASE = 'SAVE_RECIPES_TO_DATABASE';
export const RESET_RECIPES = 'RESET_RECIPES';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: { index: number; recipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: number) {}
}

export class GetRecipesFromDatabase implements Action {
  readonly type = GET_RECIPES_FROM_DATABASE;
}

export class SaveRecipesToDatabase implements Action {
  readonly type = SAVE_RECIPES_TO_DATABASE;
}

export class ResetRecipes implements Action {
  readonly type = RESET_RECIPES;
}

export type RecipeActions =
  | SetRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | GetRecipesFromDatabase
  | SaveRecipesToDatabase
  | ResetRecipes;
