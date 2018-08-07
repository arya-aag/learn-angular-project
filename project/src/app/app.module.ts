import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { RecipesModule } from './recipes/recipes.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { DataStoreService } from './shared/data-store.service';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SignupComponent, SigninComponent],
  imports: [BrowserModule, HttpModule, FormsModule, RecipesModule, AppRoutingModule, SharedModule, ShoppingListModule],
  providers: [ShoppingListService, RecipeService, DataStoreService],
  bootstrap: [AppComponent]
})
export class AppModule {}
