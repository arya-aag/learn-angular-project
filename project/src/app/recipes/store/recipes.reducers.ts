import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActs from './recipes.actions';

export const RECIPE_FEATURE_NAME = 'recipes';

export interface RecipeFeatureState {
  [RECIPE_FEATURE_NAME]: RecipeState;
}

export interface RecipeState {
  recipes: Recipe[];
  activeRecipe: Recipe;
  activeRecipeIndex: number;
}

const initialState: RecipeState = {
  recipes: [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    )
  ],
  activeRecipe: null,
  activeRecipeIndex: -1
};

export function recipeReducer(state = initialState, action: RecipeActs.RecipeActions) {
  switch (action.type) {
    case RecipeActs.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };

    case RecipeActs.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case RecipeActs.UPDATE_RECIPE:
      const recipeList = state.recipes;
      recipeList[action.payload.index] = action.payload.recipe;
      return {
        ...state,
        recipes: [...recipeList]
      };

    case RecipeActs.DELETE_RECIPE:
      const recipesList = state.recipes;
      recipesList.splice(action.payload, 1);
      return {
        ...state,
        recipes: [...recipesList]
      };

    default:
      return state;
  }
}
