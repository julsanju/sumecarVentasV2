import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'any'
})
export class SharedServicesService {

  public usuario : string | null = null;
  constructor() { }
  enviarDatos(datos: any) {
    this.usuario = datos;
  }
}
