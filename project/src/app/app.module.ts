import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { DataStoreService } from './shared/data-store.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpModule, CoreModule, SharedModule, ShoppingListModule, AuthModule],
  providers: [ShoppingListService, RecipeService, DataStoreService],
  bootstrap: [AppComponent]
})
export class AppModule {}
