import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { BasketComponent } from './pages/basket/basket.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products'
  },
  {
    path: 'products',
    loadComponent: () => ProductListComponent,
  },
  {
    path: 'checkout',
    loadComponent: () => BasketComponent,
  }
];
