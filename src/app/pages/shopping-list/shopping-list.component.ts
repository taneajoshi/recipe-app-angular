import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  shoppingListSubscription: Subscription;
  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredientsMethod();
    this.shoppingListSubscription = this.shoppingListService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }

  editIngredient(id: number) {
    this.shoppingListService.isEditing.next(id);
  }

  ngOnDestroy() {
    this.shoppingListSubscription.unsubscribe();
  }
}
