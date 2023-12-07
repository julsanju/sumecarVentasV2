import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path : '',
    redirectTo : '/login',
    pathMatch: 'full'
  },

  {
    path: "login",
    loadComponent: () => import('../app/pages/modulo-login/prueba-login.component')
  },

  {
    path: "menu",
    loadComponent: () => import('../app/pages/modulo-productos/productos.component')
  }
];


