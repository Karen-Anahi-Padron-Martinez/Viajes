import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css',
})
export class LayoutPageComponent {
  public sidebarItem=[
    {label:'Inicio', icon:'home', url:'./inicio'},
    {label:'Lugares', icon:'stars', url:'./listalugar'},
    {label:'Experiencias', icon:'stars', url:'./experiencias'},
    {label:'Paquetes', icon:'folder', url:'./paquetes'},
    {label:'Paquete personalizado', icon:'folder_open', url:'./formulario'},
    {label:'Contacto Agencias', icon:'assistant', url:'./agencias'},
    {label:'Ubicacion',icon:'location_on',url:'./mapa'},
    {label:'Administrador', icon:'label_important', url:'./login'},
  ]
}
