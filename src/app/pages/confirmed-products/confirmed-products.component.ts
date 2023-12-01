import { Component,  OnInit, ViewChild } from '@angular/core';
import { ProductsServicesService } from '../../services/products-services.service';
import { Productos } from '../../Interfaces/productos';
import { Empleado } from '../../Interfaces/empleado';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MensajeError } from '../../Interfaces/mensaje-error';
import { Router } from '@angular/router';
import { PeticioneServicesService } from '../../services/peticione-services.service';
import { MatTableDataSource } from '@angular/material/table'; // Importa MatTableDataSource
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DataProductsService } from '../../services/data-products.service';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';

@Component({
  selector: 'app-confirmed-products',
  templateUrl: './confirmed-products.component.html',
  styleUrls: ['./confirmed-products.component.css']
})
export class ConfirmedProductsComponent implements OnInit{
  dataUser : string = '';
  correo : string = '';
  private rolSubject = new Subject<boolean>();
  errorMessage: MensajeError | null = null;
  spinner: boolean = false;
  loading: boolean = true;
  data: Productos[] = [];
  data2: Empleado[] = [];
  displayedColumns: string[] = ['# Orden', 'Codigo', 'Articulo', 'Laboratorio'];

  // Variables de paginación
  pageSize: number = 5;
  currentPage: number = 1;

  constructor(private servicio: ProductsServicesService, private router:Router, private peticion: PeticioneServicesService) {}

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  
    // Llamamos a obtenerCorreo y nos suscribimos al observable resultante
    this.validacionRol();
    console.log(this.validacionRol())
    this.rolSubject.subscribe((esEmpleado: boolean) => {
      if (esEmpleado) {

        this.handleEmpleadoCase();
      } else {
        
        this.handleClienteCase();
      }
    });
  }


  //metodos para poder saber si es empleado o cliente
  //empleado
  private handleEmpleadoCase() {
    this.obtenerCorreo().subscribe(
      (correo) => {
        this.correo = correo;
  
        if (this.correo) {
          this.servicio.obtenerFiltradoEmpleado().subscribe(
            (response) => {
              this.data = response;
            },
            (error) => {
              console.error('Error al obtener los productos: ', error);
              this.loading = false;
            }
          );
        }
      },
      (error) => {
        console.error('Error al obtener el correo: ', error);
        this.loading = false;
      }
    );
  }

  //cliente
  private handleClienteCase() {
    this.obtener_usuarioToClientes().subscribe(
      (usuario) => {
        this.dataUser = usuario;
  
        if (this.dataUser) {
          this.servicio.obtenerFiltrado(this.dataUser).subscribe(
            (response) => {
              this.data = response;
            },
            (error) => {
              console.error('Error al obtener los productos: ', error);
              this.loading = false;
            }
          );
        }
      }
    );
  }

  private obtener_usuario(username : string){
    //obtener username
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      try {
        // Intenta analizar la cadena como JSON
        const userData = JSON.parse(userDataString);
        username = userData.usuario; // Actualiza la propiedad 'username' con el valor correcto
      } catch (error) {
        // En caso de un error al analizar JSON, puedes manejarlo o simplemente retornar false
        console.error('Error al analizar JSON:', error);
      }
    }
    return username;
  }

  private obtener_usuarioToClientes(): Observable<string> {
    return new Observable((observer) => {
      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        try {
          const userData = JSON.parse(userDataString);
          const username = userData.usuario;
          observer.next(username);
          observer.complete();
        } catch (error) {
          observer.error('Error al analizar JSON:');
        }
      } else {
        observer.error('No se encontró userData en localStorage.');
      }
    });
  }


  obtenerCorreo(): Observable<string>{
    var name = this.obtener_usuario(this.dataUser);

    return this.peticion.obtenerCorreo(name).pipe(
      map((response) => {
        this.data2 = response;
        return this.data2[0].correo;
      })
    );
      
  }

  validacionRol(): void {
    var name = this.obtener_usuario(this.dataUser);
  
    this.peticion.obtenerCorreo(name).subscribe(
      (response) => {
        this.data2 = response;
        const esEmpleado = this.data2[0].rol === 'empleado';
        this.rolSubject.next(esEmpleado);
      },
      (error) => {
        // Manejar errores si es necesario
        console.error(error);
        this.rolSubject.next(false); // En caso de error, asumimos que no es empleado
      }
    );
  }

  finalizarPeticion(id: number): void {
    this.peticion.FinalizarPeticion(id).subscribe(
      () => {
        this.spinner = true;
        this.spinner = false;

        Swal.fire('La peticion ha sido finalizada correctamente!', '', 'success');

        this.errorMessage = null; // Limpiar el mensaje de error si hubo éxito
        console.log('Login exitoso');
        this.router.navigate(['/menu/historial-peticiones']);
      },
      (error) => {
        this.spinner = false;

        this.errorMessage = error.Message; // Accede al campo "Message" del JSON de error
        

        Swal.fire({
          title: 'ERROR',
          html: `${this.errorMessage}`,
          icon: 'error',
        });
      }
    );
  }

  getPaginatedData(): Productos[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.data.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.data.length);
  }

  //metodo para filtrar roles de usuario
  esAdmin(): boolean {
    // Recupera la información del usuario desde localStorage
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      try {
        // Intenta analizar la cadena como JSON
        const userData = JSON.parse(userDataString);
        return userData.rol === 'admin'; // Verifica la propiedad correcta 'rol'
      } catch (error) {
        // En caso de un error al analizar JSON, puedes manejarlo o simplemente retornar false
        console.error('Error al analizar JSON:', error);
        return false;
      }
    }
    return false; // Retorna false si no se encuentra información del usuario
  }

  esEmpleado(): boolean{
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      try{
        const userData = JSON.parse(userDataString);
        return userData.rol === 'empleado';
      }catch (error) {
        console.error('Error al aalizar JSON:' , error)
        return false;
      }
    }
    return false;

  }

  esCliente(): boolean{
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      try{
        const userData = JSON.parse(userDataString);
        return userData.rol === 'cliente';
      }catch (error) {
        console.error('Error al aalizar JSON:' , error)
        return false;
      }
    }
    return false;
  }
}
