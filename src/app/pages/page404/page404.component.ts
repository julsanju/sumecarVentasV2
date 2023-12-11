import { Component } from '@angular/core';
import { ModuloErrorModule } from './modulo-error/modulo-error.module';

@Component({
  selector: 'app-page404',
  standalone: true,
  imports: [ModuloErrorModule],
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export default class Page404Component {

}
