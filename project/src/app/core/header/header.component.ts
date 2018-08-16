import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAuthReducers from '../../auth/auth.reducers';
import * as AuthActs from '../../auth/auth.actions';
import * as fromRecipeReducers from '../../recipes/store/recipes.reducers';
import * as RecipeActs from '../../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState$: Observable<fromAuthReducers.AuthState>;

  constructor(private store: Store<fromRecipeReducers.RecipeFeatureState>) {}

  ngOnInit() {
    this.authState$ = this.store.select('auth');
  }

  saveData() {
    this.store.dispatch(new RecipeActs.SaveRecipesToDatabase());
  }

  fetchData() {
    this.store.dispatch(new RecipeActs.GetRecipesFromDatabase());
  }

  resetData() {
    this.store.dispatch(new RecipeActs.ResetRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActs.TryLogout());
    this.store.dispatch(new AuthActs.Logout());
  }
}
