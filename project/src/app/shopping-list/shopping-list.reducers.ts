import * as ShoppingListActs from './shopping-list.actions';

import { Ingredient } from '../shared/ingredient.model';

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActs.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActs.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    default:
      return state;
  }
}
