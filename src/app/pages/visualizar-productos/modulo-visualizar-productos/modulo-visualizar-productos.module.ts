import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarProductosComponent } from '../visualizar-productos.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    VisualizarProductosComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule
  ],
  exports: [
    VisualizarProductosComponent
  ],
  
})
export class ModuloVisualizarProductosModule { }
