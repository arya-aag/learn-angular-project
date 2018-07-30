import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editSub: Subscription;
  indexToEdit: number;
  itemToEdit: Ingredient;
  editMode = false;

  @ViewChild('shopList') ingForm: NgForm;

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.editSub = this.slService.editInitiated.subscribe(index => {
      this.indexToEdit = index;
      this.editMode = true;
      this.itemToEdit = this.slService.getIngredient(index);
      this.ingForm.form.patchValue({
        name: this.itemToEdit.name,
        amount: this.itemToEdit.amount
      });
    });
  }

  onSubmit(form: NgForm) {
    const ingName = form.value.name;
    const ingAmount = form.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.slService.editIngredient(this.indexToEdit, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.ingForm.reset();
    this.editMode = false;
    this.itemToEdit = null;
    this.indexToEdit = 0;
  }

  onClear() {
    this.ingForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.indexToEdit);
    this.onClear();
  }

  ngOnDestroy() {
    this.editSub.unsubscribe();
  }
}
