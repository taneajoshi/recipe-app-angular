import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { GenerateIngredientIdService } from 'src/app/services/generateIngredientId/generate-ingredient-id.service';
import { ShoppingListService } from 'src/app/services/shopping/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('addItemForm') addItemForm;
  editMode = false;
  editIngredientIndex: number;
  isEditingSubscription: Subscription;
  editedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService,
              private generateIngredientIdService: GenerateIngredientIdService
              ) {}

  ngOnInit() {
    this.isEditingSubscription = this.shoppingListService.isEditing.subscribe((id: number) => {
      this.editMode = true;
      this.editIngredientIndex = id;
      this.editedIngredient = this.shoppingListService.getInredient(this.editIngredientIndex);
      this.patchIngredientForm();
    });
  }

  patchIngredientForm() {
    this.addItemForm.form.patchValue({
      name: this.editedIngredient.name,
      amount: this.editedIngredient.amount,
    });
  }

  onAddItem() {
    const newIngredients = new Ingredient(this.generateIngredientIdService.generateId(), this.addItemForm.value.name, this.addItemForm.value.amount);
    this.shoppingListService.addIngredient(newIngredients);
    this.clearForm()
  }

  onUpdateItem() {
    this.shoppingListService.updateIngredient(
      this.editIngredientIndex, new Ingredient(this.editIngredientIndex, this.addItemForm.value.name, this.addItemForm.value.amount));
      this.clearForm();
  }

  clearForm() {
    this.addItemForm.reset();
    this.editMode = false;
  }

  onDeleteHandler() {
    this.shoppingListService.deleteIngredient(this.editIngredientIndex);
    this.clearForm();
  }

  validateInput(event: KeyboardEvent) {
    if (event.key === '-') {
      event.preventDefault();
    }
  }

  ngOnDestroy() {
    this.isEditingSubscription.unsubscribe();
  }
}
