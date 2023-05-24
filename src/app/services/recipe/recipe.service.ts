import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/pages/recipes/recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { GenerateIngredientIdService } from '../generateIngredientId/generate-ingredient-id.service';
import { Subject } from 'rxjs';
import { GenerateRecipeIdService } from '../generateRecipeId/generate-recipe-id.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  public singleRecipe: Recipe[];
  private recipes: Recipe[] = [
    new Recipe(
       this.generateRecipeId.generateId(),
      'test recipe',
      'This is description for our test recipe',
      'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg',
      [
        new Ingredient(this.generateIngredientIdService.generateId(), 'Meat', 1),
        new Ingredient (this.generateIngredientIdService.generateId(), 'Yogurt', 1)
      ]
    ),
    new Recipe(
       this.generateRecipeId.generateId(),
      'test recipe 2',
      'This is description 2 for our test recipe',
      'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg',
      [
        new Ingredient(this.generateIngredientIdService.generateId(), 'French Fries', 20),
        new Ingredient (this.generateIngredientIdService.generateId(), 'Buns', 2)
      ]),
  ];

  constructor(private generateIngredientIdService: GenerateIngredientIdService, private generateRecipeId: GenerateRecipeIdService){}

  getRecipes() {
    /**Using slice we will get a copy of our Recipe array and not the actual array so no one
    from outside can access our Recipe inside private Recipe service class.**/
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    const recipe = this.recipes.slice().find(recipe => recipe.id === id);
    return recipe;
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    const index = this.recipes.findIndex(item => item.id === id);
    if (index !== -1) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
      console.log(this.recipes);
    }
  }
}
