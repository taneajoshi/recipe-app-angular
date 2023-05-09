import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/services/shopping/shopping-list.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent {
  @Input() recipe: Recipe;
  constructor(private shoppingListService: ShoppingListService) {}

  addToShoppingList() {
    const ingredients = this.recipe.Ingredients;
    ingredients.forEach(ingredient => {
      this.shoppingListService.addIngredient(ingredient);
    })
  }
}

