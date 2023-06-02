import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/pages/recipes/recipe.model';
import { GenerateIngredientIdService } from '../generateIngredientId/generate-ingredient-id.service';
import { Subject } from 'rxjs';
import { GenerateRecipeIdService } from '../generateRecipeId/generate-recipe-id.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  //Dummy Recipes
  // private recipes: Recipe[] = [
  //   new Recipe(
  //      this.generateRecipeId.generateId(),
  //     'test recipe',
  //     'This is description for our test recipe',
  //     'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg',
  //     [
  //       new Ingredient(this.generateIngredientIdService.generateId(), 'Meat', 1),
  //       new Ingredient (this.generateIngredientIdService.generateId(), 'Yogurt', 1)
  //     ]
  //   ),
  //   new Recipe(
  //      this.generateRecipeId.generateId(),
  //     'test recipe 2',
  //     'This is description 2 for our test recipe',
  //     'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg',
  //     [
  //       new Ingredient(this.generateIngredientIdService.generateId(), 'French Fries', 20),
  //       new Ingredient (this.generateIngredientIdService.generateId(), 'Buns', 2)
  //     ]),
  // ];

  private recipes: Recipe[] = [];

  constructor(private generateIngredientIdService: GenerateIngredientIdService, private generateRecipeId: GenerateRecipeIdService){}

  //Function to get list of all the recipes
  getRecipes() {
    /**Using slice we will get a copy of our Recipe array and not the actual array so no one
    from outside can access our Recipe inside private Recipe service class.**/
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  /**
   * Function to get single recipe based on the id
   * @param id
   */
  getRecipe(id: number) {
    const recipe = this.recipes.slice().find(recipe => recipe.id === id);
    return recipe;
  }

  /**
   * Function to add a new recipe
   * @param recipe
   */
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

   /**
   * Function to update an existing recipe
   * @param id
   * @param recipe
   */
  updateRecipe(id: number, newRecipe: Recipe) {
    const index = this.recipes.findIndex(item => item.id === id);
    if (index !== -1) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }
  }

  /**
   * Function to update an existing recipe
   * @param id
   * @param recipe
   */
  deleteRecipe(id: number) {
    const index = this.recipes.findIndex(item => item.id === id);
    if (index !== -1) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
  }

  /**
   * Function to delete ingredient in a recipe
   * @param ingredientId
   * @param recipeId
   */
  deleteRecipeIngredient(ingredientId: number, recipeId: number){
    const recipe = this.getRecipe(recipeId);
    const index = recipe.ingredients.findIndex(item => item.id === ingredientId);
    if (index !== -1) {
      recipe.ingredients.splice(index, 1);
    }
  }
}
