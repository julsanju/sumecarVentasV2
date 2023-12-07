import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//modulos angular material
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
//componentes
//import { VisualizarProductosComponent } from '../pages/visualizar-productos/visualizar-productos.component';
//import { ProductosComponent } from '../pages/productos/productos.component';
//import { DialogOverviewComponent } from '../pages/dialog-overview/dialog-overview.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressBarModule,
    MatStepperModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSortModule,
    MatInputModule,
    MatExpansionModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule
  ],
  exports: [
    
  ]
})
export class ModuloAngularMaterialModule { }
