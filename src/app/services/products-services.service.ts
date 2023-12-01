import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Productos } from '../Interfaces/productos';
@Injectable({
  providedIn: 'root'
})
export class ProductsServicesService {
  
  //mostrar todos los productos
  private apiUrl = 'http://localhost:5107/api/productos/obtener';
  private UrlPendientes = 'http://localhost:5107/api/productos/filtrar/'; 
  private UrlFinalizados = 'http://localhost:5107/api/productos/filtrar_finalizados/'; 
  private UrlProductosFinalizados = 'http://localhost:5107/api/productos/insertar/';
  private UrlPendientesEmpleado = 'http://localhost:5107/api/productos/filtrar_empleado';
  private UrlFinalizadosEmpleado = 'http://localhost:5107/api/productos/filtrar_finalizadosEmpleado';

  constructor(private http : HttpClient) { }
  //obtener todos los productos
  obtenerProductos(): Observable<Productos[]>{
    return this.http.get<Productos[]>(this.apiUrl);
  }

  //obtener productos confirmados
  obtenerFiltrado(username : string) : Observable<Productos[]>{
    return this.http.get<Productos[]>(this.UrlPendientes + username);
  }

  //obtener productos confirmados como empleado
  obtenerFiltradoEmpleado() : Observable<Productos[]>{
    return this.http.get<Productos[]>(this.UrlPendientesEmpleado);
  }
  //obtener productos finalizados
  obtenerFinalizado(username : string) : Observable<Productos[]>{
    return this.http.get<Productos[]>(this.UrlFinalizados + username);
  }

  //metodo para obtener finalizado como empleado
  obtenerFinalizadoEmpleado() : Observable<Productos[]>{
    return this.http.get<Productos[]>(this.UrlFinalizadosEmpleado);
  }

  //confirmar productos
    confirmarProductos(productos: Productos[], username: string): Observable<any>{
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      return this.http.post(this.UrlProductosFinalizados + username, productos, { headers });
    }
    
  
}
