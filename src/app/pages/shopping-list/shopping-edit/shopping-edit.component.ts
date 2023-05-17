import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {
  @ViewChild('addItemForm') addItemForm;

  constructor(private shoppingListService: ShoppingListService) {}
  onAddItem() {
    //Need to create new object for each add item else due to object reference and mutation we will also change the old ingredients added.
    const newIngredients: Ingredient = {
      name: this.addItemForm.value.name,
      amount: this.addItemForm.value.amount,
    }

    this.shoppingListService.addIngredient(newIngredients);
    console.log(newIngredients);
    this.addItemForm.reset();
  }

  validateInput(event: KeyboardEvent) {
    if (event.key === '-') {
      event.preventDefault();
    }
  }
}
