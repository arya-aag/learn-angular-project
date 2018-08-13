import * as ShoppingListActs from './shopping-list.actions';

import { Ingredient } from '../shared/ingredient.model';

export interface AppState {
  shoppingList: ShoppingListState;
}

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActs.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActs.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };

    case ShoppingListActs.ADD_INGREDIENTS:
      return { ...state, ingredients: [...state.ingredients, ...action.payload] };

    case ShoppingListActs.EDIT_INGREDIENT:
      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = action.payload;
      return {
        ...state,
        ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case ShoppingListActs.DELETE_INGREDIENT:
      const newIngredients = [...state.ingredients];
      newIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: newIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case ShoppingListActs.START_EDIT:
      return {
        ...state,
        editedIngredient: { ...state.ingredients[action.payload] },
        editedIngredientIndex: action.payload
      };

    case ShoppingListActs.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    default:
      return state;
  }
}
