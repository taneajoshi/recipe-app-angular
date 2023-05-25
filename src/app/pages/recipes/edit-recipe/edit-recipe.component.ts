import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { Recipe } from '../recipe.model';
import { GenerateRecipeIdService } from 'src/app/services/generateRecipeId/generate-recipe-id.service';
import { GenerateIngredientIdService } from 'src/app/services/generateIngredientId/generate-ingredient-id.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(public route: ActivatedRoute,
              public recipeService: RecipeService,
              public generateRecipeId: GenerateRecipeIdService,
              public router: Router,
              private generateIngredientId: GenerateIngredientIdService ){}
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        //Params will be null only in the case when there is no recipe in edit mode and we can consider it a new recipe addition mode.
        this.editMode = params['id'] != null && params['id'] !== undefined;
      }
    )
    this.initForm();
   }

  initForm() {
    let recipeId: number;
    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeId = recipe.id;
      recipeName = recipe.name;
      recipeImage = recipe.image;
      recipeDescription = recipe.desc;
      if(recipe.ingredients) {
        for(const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'id': new FormControl(ingredient.id, Validators.required),
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, Validators.required),
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'id': new FormControl(recipeId),
      'name': new FormControl(recipeName, Validators.required),
      'image': new FormControl(recipeImage, Validators.required),
      'desc':  new FormControl(recipeDescription, Validators.required),
      ingredients : recipeIngredients,
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'id': new FormControl(this.generateIngredientId.generateId()),
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, Validators.required),
      })
    )
  }

  onRecipeFormSubmit() {
    if(!this.editMode) {
      const newRecipe = new Recipe(this.generateRecipeId.generateId(), this.recipeForm.value['name'], this.recipeForm.value['desc'], this.recipeForm.value['image'], this.recipeForm.value['ingredients'] );
      this.recipeService.addRecipe(newRecipe);
    }
    //If our new Recipe format is exactly same as in the form so we can use directly this.recipeForm.value instead of storing all the values in a constant. but since we are creating dynamic ids and not have any api yet so we would have to use above method.
    else {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    this.cancelEditingMode();
  }

  clearForm() {
    this.recipeForm.reset();
    this.editMode = false;
  }

  cancelEditingMode() {
    this.router.navigate(['../', {relativeTo: this.route}]);
  }

  deleteIngredients(ingredientId: number) {
    const index = this.controls.findIndex(control => control.value.id === ingredientId);
    if(this.editMode) {
      this.recipeService.deleteRecipeIngredient(ingredientId, this.id);
    }
    if (index !== -1) {
      (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
    }
  }

  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  validateInput(event: KeyboardEvent) {
    if (event.key === '-') {
      event.preventDefault();
    }
  }
}
