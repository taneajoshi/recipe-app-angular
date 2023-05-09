import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from 'src/app/pages/recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('test recipe', 'This is description for our test recipe', 'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg'),
    new Recipe('test recipe 2', 'This is description 2 for our test recipe', 'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg'),
  ];

  getRecipes() {
    /**Using slice we will get a copy of our Recipe array and not the actual array so no one
    from outside can access our Recipe inside private Recipe service class.**/
    return this.recipes.slice();
  }
}
