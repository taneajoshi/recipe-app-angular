import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { GenerateIngredientIdService } from '../generateIngredientId/generate-ingredient-id.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  isEditing = new Subject<number>();
  constructor(private generateIngredientIdService: GenerateIngredientIdService) {}
  private ingredients: Ingredient[] = [
    new Ingredient(this.generateIngredientIdService.generateId(), 'Apples', 5),
    new Ingredient(this.generateIngredientIdService.generateId(), 'Chocolate', 8)
  ];

  getIngredientsMethod() {
    //copy of ingredients array.
    return this.ingredients.slice();
  }

  getInredient(id: number) {
    return this.ingredients.slice().find(item => item.id === id);
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngredient(id: number, newIngredient: Ingredient) {
    //Store the index where our id mathces the ingredient's id
    const index = this.ingredients.findIndex(item => item.id === id);
    if (index !== -1) {
      this.ingredients[index] = newIngredient;
      this.ingredientChanged.next(this.ingredients.slice());
    }
  }

  deleteIngredient(id: number) {
    console.log('deleting');
    const index = this.ingredients.findIndex(item => item.id === id);
    console.log(index);
    if (index !== -1) {
      this.ingredients.splice(index, 1);
      this.ingredientChanged.next(this.ingredients.slice());
    }
  }
}
