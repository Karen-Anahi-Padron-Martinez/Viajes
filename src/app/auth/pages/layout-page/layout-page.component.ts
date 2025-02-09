import { Component } from '@angular/core';
import { AuthServices } from '../../services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css',
})
export class LayoutPageComponent {
  constructor ( private auth: AuthServices){
  }

  logout(){
    this.auth.logout();
  }
  public sidebarItem=[
    {label:'Inicio', icon:'home', url:'./inicio'},
    {label:'Clima', icon:'cloud',url:'./yahoo-weather'},
    {label:'Lugares', icon:'stars', url:'./listalugar'},
    {label:'Experiencias', icon:'stars', url:'./experiencias'},
    {label:'Paquetes', icon:'folder', url:'./paquetes'},
    {label:'Paquete personalizado', icon:'folder_open', url:'./formulario'},
    {label:'Contacto Agencias', icon:'assistant', url:'./agencias'},
    {label:'Ubicacion',icon:'location_on',url:'./mapa'},
    {label: 'Información de Paises',icon:'flag',url:'./pais'},
    //{label: 'Aeropuertos',icon:'flight',url:'./air'},
    {label: 'Videos en Vivo',icon:'tour',url:'./twitch'},
   //{label: 'Turismo',icon:'tour',url:'./streaming'},
    //{label: 'Hoteles Info',icon:'flights_and_hotels',url:'./info'},
   // {label:'SitiosBnb', icon:'stars', url:'./sitiosbnb'},
    {label: 'Hoteles Info',icon:'flights_and_hotels',url:'./info'},
    //{label:'Administrador', icon:'label_important', url:'./login'},
    {label:'Pagos',icon:'money',url:'./pagos'}
  ]
}
