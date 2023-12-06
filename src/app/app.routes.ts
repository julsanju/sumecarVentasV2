import { Routes } from '@angular/router';
import { PruebaLoginComponent } from './pages/modulo-login/prueba-login.component';
import { RegisterSalesComponent } from './pages/register-sales/register-sales.component';
import { CambiarContrasenaComponent } from './pages/cambiar-contrasena/cambiar-contrasena.component';
import { MenuComponent } from './pages/menu/menu.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductosComponent } from './pages/modulo-productos/productos.component';
import { VisualizarProductosComponent } from './pages/modulo-visualizar-productos/visualizar-productos.component';
import { ConfirmedProductsComponent } from './pages/confirmed-products/confirmed-products.component';
import { FinishedProductsComponent } from './pages/finished-products/finished-products.component';
import { AddInformationComponent } from './pages/add-information/add-information.component';
import { ViewPeticionesComponent } from './pages/view-peticiones/view-peticiones.component';
import { HistorialPeticionesComponent } from './pages/historial-peticiones/historial-peticiones.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/prueba-login', // Redirige a la página de inicio de sesión
        pathMatch: 'full',
      },
      {
        path: 'prueba-login',
        component: PruebaLoginComponent
      },
      {
        path: 'register',
        component: RegisterSalesComponent
      },
      {
        path: 'cambio-contrasena',
        component: CambiarContrasenaComponent
      },
      {
        path: 'menu',
        component: MenuComponent
      },
      {
        path : 'dashboard',
        component : DashboardComponent
      },
      {
        path : 'productos',
        component : ProductosComponent
      },
      {
        path : 'view-products',
        component : VisualizarProductosComponent 
      },
      {
        path : 'confirmed-products',
        component : ConfirmedProductsComponent 
      },
      {
        path : 'finished-products',
        component : FinishedProductsComponent 
      },
      {
        path : 'add-information',
        component : AddInformationComponent 
      },
      {
        path : 'view-peticiones',
        component : ViewPeticionesComponent 
      },
      {
        path : 'historial-peticiones',
        component : HistorialPeticionesComponent 
      }
];


