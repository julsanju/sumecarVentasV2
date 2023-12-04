import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../../Interfaces/dashboard';
import { DashboardServicesService } from '../../services/dashboard-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit{

    montados =  0;
    pendientes = 0;
    finalizados = 0; 
  
  constructor(private servicio:DashboardServicesService){}

  ngOnInit() {
    // pedidos montados
    this.servicio.obtenerConfirmados().subscribe(
      (response: Dashboard[]) => {
        if (response && response.length > 0) {
          // Assuming you want the 'cantidad' property of the first Dashboard object
          this.montados = response[0].cantidad;
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    this.servicio.obtenerPendientes().subscribe(
      (response: Dashboard[]) => {
        if (response && response.length > 0) {
          // Assuming you want the 'cantidad' property of the first Dashboard object
          this.pendientes = response[0].cantidad;
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    this.servicio.obtenerFinalizados().subscribe(
      (response: Dashboard[]) => {
        console.log(response)
        if (response && response.length > 0) {
          // Assuming you want the 'cantidad' property of the first Dashboard object
          this.finalizados = response[0].cantidad;
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    
  }

  
}
