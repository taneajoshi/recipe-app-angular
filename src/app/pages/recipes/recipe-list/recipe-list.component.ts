import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('test recipe', 'This is description for our test recipe', 'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg'),
    new Recipe('test recipe 2', 'This is description 2 for our test recipe', 'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg'),
  ];
  constructor() {}
  ngOnInit(){}
}
