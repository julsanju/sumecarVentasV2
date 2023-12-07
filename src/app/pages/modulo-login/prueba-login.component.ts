
import { Component, AfterViewInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare let particlesJS: any;

import { trigger, transition, style, animate } from '@angular/animations';
import { LoginServicesService } from '../../services/login-services.service';
import { Login } from '../../Interfaces/login';
import { MensajeError } from '../../Interfaces/mensaje-error';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import {SharedServicesService} from '../../services/shared-services.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LockOutline } from '@ant-design/icons-angular/icons'; // Importa el ícono de candado
import Swal from 'sweetalert2';
import { ModuloLoginModule } from '../prueba-login/modulo-login/modulo-login.module';
//modulos angular material
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSortModule } from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { routes } from '../../app.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prueba-login',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
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
    MatCardModule,RouterOutlet],
  templateUrl: './prueba-login.component.html',
  styleUrls: ['./prueba-login.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
  
})
export default class PruebaLoginComponent {

  users = [
    {value: 'cliente', viewValue: 'Cliente'},
    {value: 'empleado', viewValue: 'Empleado'},
    {value: 'admin', viewValue: 'Admin'}
  ];
  errorMessage: MensajeError | null = null;
  passwordVisible: boolean = true;
  disableSelect = new FormControl(false);
  loginForm: FormGroup;
  email: string = '';
  password: string = '';
  passwordStrength: string = '';
  isSelectActive: boolean = false; // Variable para controlar la animación del combobox
  userData : any;
  roles: string[] = ['cliente', 'empleado'];
  spinner: boolean = false;

  togglePasswordVisibility(event: Event) {
    this.passwordVisible = (event.target as HTMLInputElement).checked;
  }  

 

  constructor(private formBuilder: FormBuilder,  
              private loginService: LoginServicesService, 
              private modalService: NgbModal, 
              private data:SharedServicesService,
              private router:Router) {
    this.loginForm = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      rol: ['Usuario', Validators.required],
    });

    NzIconModule.forRoot([LockOutline]);
  }

  onPasswordChange() {
    const password = this.loginForm.get('contrasena')?.value;

    if (password.length < 6) {
      this.passwordStrength = 'weak';
    } else if (password.length < 10) {
      this.passwordStrength = 'medium';
    } else {
      this.passwordStrength = 'strong';
    }
  }

  EventoEnviar(){
      //mensaje
    const usuario = this.loginForm.get('usuario')?.value;
    // Enviar datos al servicio
    this.data.enviarDatos( usuario );
  }
  
  onSubmit() {
    //login
    const userData: Login = this.loginForm.value;

    this.spinner = true;

    this.loginService.LoginValidation(userData).subscribe(
      (response) => {
        console.log(response);

        // const modalRef = this.modalService.open(SuccesModalComponent, {
        //   size: "sm", // Puedes ajustar el tamaño del modal aquí según tus necesidades
        // });
        // modalRef.componentInstance.modalClass = "success-modal"; // Establece la clase CSS del modal

        this.spinner = false;

        Swal.fire('Login Exitoso', '', 'success');

        this.errorMessage = null; // Limpiar el mensaje de error si hubo éxito
        console.log('Login exitoso');
        this.router.navigate(['/menu/dashboard']);

        const userData2 = {
          usuario: this.loginForm.get('usuario')?.value,
          contrasena: this.loginForm.get('contrasena')?.value,
          rol: this.loginForm.get('rol')?.value,
        };

        localStorage.setItem('userData', JSON.stringify(userData2));
        this.userData = userData2;

        localStorage.setItem('userData', JSON.stringify(userData2));
        this.userData = userData2;
        const user2 = sessionStorage.setItem(
          'userData',
          this.loginForm.get('usuario')?.value
        );
      },
      (error) => {
        console.error('Error:', error);

        this.spinner = false;

        this.errorMessage = error.Message; // Accede al campo "Message" del JSON de error
        console.log(this.errorMessage);

        Swal.fire({
          title: 'ERROR',
          html: `${this.errorMessage}`,
          icon: 'error',
        });
      }
    );
    if (this.loginForm.valid) {
      console.log('Formulario válido');
      console.log('Email:', this.loginForm.value.email);
      console.log('Contraseña:', this.loginForm.value.password);
      console.log('Rol:', this.loginForm.value.role);
    }
  }

  toggleSelect() {
    this.isSelectActive = !this.isSelectActive;
  }

  direccionCambio(){
    this.router.navigate(['/cambiar-contrasena']);
  }
}
  
