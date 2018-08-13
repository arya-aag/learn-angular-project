import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingListReducers from './shopping-list/shopping-list.reducers';
import * as fromAuthReducers from './auth/auth.reducers';

export interface AppState {
  shoppingList: fromShoppingListReducers.ShoppingListState;
  auth: fromAuthReducers.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingListReducers.shoppingListReducer,
  auth: fromAuthReducers.authReducer
};
