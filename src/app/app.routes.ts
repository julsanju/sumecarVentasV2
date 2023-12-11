import { Routes } from '@angular/router';
import PruebaLoginComponent from './pages/modulo-login/prueba-login.component';
import MenuComponent from './pages/menu/menu.component';
import { RegisterSalesComponent } from './pages/register-sales/register-sales.component';
import CambiarContrasenaComponent from './pages/cambiar-contrasena/cambiar-contrasena.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import ProductosComponent from './pages/modulo-productos/productos.component';
import { VisualizarProductosComponent } from './pages';
import { AddInformationComponent } from './pages/add-information/add-information.component';
import { ConfirmedProductsComponent } from './pages/confirmed-products/confirmed-products.component';
import { FinishedProductsComponent } from './pages/finished-products/finished-products.component';
import { ViewPeticionesComponent } from './pages/view-peticiones/view-peticiones.component';
import { HistorialPeticionesComponent } from './pages/historial-peticiones/historial-peticiones.component';

export const routes: Routes = [
  {
    path : '',
    redirectTo : '/login',
    pathMatch: 'full'
  },

  {
    path: "login",
    component: PruebaLoginComponent
  },

  {
    path: "cambiar-contrasena",
    component: CambiarContrasenaComponent
  },
  
  {
    path: 'menu',
    component: MenuComponent, // Usa el mismo componente principal para mantener el sidebar
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' }, // Redirige a 'register' por defecto en '/menu'
      { path: 'prueba-login', component: PruebaLoginComponent },
      { path : 'dashboard', component: DashboardComponent},
      //{ path: '**', component: Page404Component },
    ],
  },
];


