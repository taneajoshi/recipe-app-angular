import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(public route: ActivatedRoute, public recipeService: RecipeService){}
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        //Params will be null only in the case when there is no recipe in edit mode and we can consider it a new recipe addition mode.
        this.editMode = params['id'] != null && params['id'] !== undefined;
      }
    )
      console.log('edit mode'+ this.editMode);
    this.initForm();
  }

  initForm() {
    console.log('init');
    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      console.log(recipe);
      recipeName = recipe.name;
      recipeImage = recipe.imageUrl;
      recipeDescription = recipe.description;
      if(recipe.Ingredients) {
        for(const ingredient of recipe.Ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, Validators.required),
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'image': new FormControl(recipeImage, Validators.required),
      'desc':  new FormControl(recipeDescription, Validators.required),
      ingredients : recipeIngredients,
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, Validators.required),
      })
    )
  }

  onRecipeFormSubmit() {
    console.log(this.recipeForm);
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
