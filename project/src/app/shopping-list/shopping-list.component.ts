import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import * as fromShoppingListReducers from './shopping-list.reducers';
import * as ShoppingListActs from './shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shopListState$: Observable<{ ingredients: Ingredient[] }>;
  ingredients: Ingredient[];

  constructor(private store: Store<fromShoppingListReducers.AppState>) {}

  ngOnInit() {
    this.shopListState$ = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActs.StartEdit(index));
  }
}
