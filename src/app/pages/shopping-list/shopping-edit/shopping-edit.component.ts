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
    const newIngredients = new Ingredient(this.addItemForm.value.name, this.addItemForm.value.amount)
    this.shoppingListService.addIngredient(newIngredients);
    this.addItemForm.reset();
  }

  validateInput(event: KeyboardEvent) {
    if (event.key === '-') {
      event.preventDefault();
    }
  }
}
