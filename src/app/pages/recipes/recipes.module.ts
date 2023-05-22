import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { MenuModule } from 'src/app/menu/menu.module';
import {MatMenuModule} from '@angular/material/menu';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    children: [{
      path: '',
      component: RecipeStartComponent,
    },
    {
      path: 'new',
      component: EditRecipeComponent,
    },
    {
      path: ':id',
      component: RecipeDetailsComponent,
    },{
      path: ':id/edit',
      component: EditRecipeComponent,
    },]
  },
];

@NgModule({
  declarations: [RecipesComponent, RecipeItemComponent, RecipeListComponent, RecipeDetailsComponent, RecipeStartComponent, EditRecipeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MenuModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RecipesModule { }
