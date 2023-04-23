import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuModule } from 'src/app/menu/menu.module';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListComponent,
  }
];
@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MenuModule,
  ]
})
export class ShoppingListModule { }
