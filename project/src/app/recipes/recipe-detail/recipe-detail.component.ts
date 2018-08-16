import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import * as ShoppingListActs from '../../shopping-list/shopping-list.actions';
import * as fromRecipeReducers from '../store/recipes.reducers';
import * as RecipeActs from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState$: Observable<fromRecipeReducers.RecipeState>;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipeReducers.RecipeFeatureState>
  ) {}

  ngOnInit() {
    this.recipeState$ = this.store.select('recipes');
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
  }

  onAddToShoppingList() {
    this.store
      .select('recipes')
      .pipe(take(1))
      .subscribe(recipeState => {
        this.store.dispatch(new ShoppingListActs.AddIngredients(recipeState.recipes[this.id].ingredients));
      });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActs.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
