import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from 'src/app/pages/recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,) { }

  //Storing Recipes
  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    //In firebase we use put request to override the existing data present in the server.
    return this.http.put('https://recipebook-54c6a-default-rtdb.firebaseio.com/recipes.json', recipes)
    .subscribe(response => {
      console.log(response);
    })
  }

  //Fetch Recipes
  fetchRecipes(){
    return this.http.get<Recipe[]>
    ('https://recipebook-54c6a-default-rtdb.firebaseio.com/recipes.json')
    .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
