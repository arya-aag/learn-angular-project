import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRecipeReducers from '../store/recipes.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeState$: Observable<fromRecipeReducers.RecipeState>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromRecipeReducers.RecipeFeatureState>
  ) {}

  ngOnInit() {
    this.recipeState$ = this.store.select('recipes');
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
