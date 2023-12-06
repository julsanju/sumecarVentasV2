import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input'
import { PruebaLoginComponent } from '../pages/modulo-login/prueba-login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzStepsModule,
    NzSelectModule,
    NzInputModule
  ],
  exports:[
    
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
})
export class ModuloZorroModule { }
