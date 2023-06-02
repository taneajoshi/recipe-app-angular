import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { IsAuthenticatedGuard } from './guards/is-authenticated/is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    canActivate: [IsAuthenticatedGuard],
    loadChildren: () =>
      import('./pages/recipes/recipes.module').then((m) => m.RecipesModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./pages/shopping-list/shopping-list.module').then((m) => m.ShoppingListModule)
  },
  {
    path: 'login',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
