import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActs from './shopping-list.actions';
import * as fromAppReducers from '../app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shopListState$: Observable<{ ingredients: Ingredient[] }>;
  ingredients: Ingredient[];

  constructor(private store: Store<fromAppReducers.AppState>) {}

  ngOnInit() {
    this.shopListState$ = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActs.StartEdit(index));
  }
}
