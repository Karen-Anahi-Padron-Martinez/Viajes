import { Component, OnInit, HostListener } from '@angular/core';
import * as L from 'leaflet';

interface User {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-mapapage',
  templateUrl: './mapapage.component.html',
  styleUrls: ['./mapapage.component.css'] // Corregido el nombre aquí
})
export class MapapageComponent implements OnInit {
  map!: L.Map;
  users: User[] = [
    { id: 12, name: 'uriel', lat: 21.126598, lng: -100.855372 },
    { id: 13, name: 'lizeth', lat: 21.151915, lng: -100.930291 },
    { id: 4, name: 'erika', lat: 21.125325, lng: -100.856640 }
  ];
  userLocation!: L.Marker; // Para guardar tu ubicación como marcador

  ngOnInit(): void {
    this.initMap();
    this.getUserLocation(); // Llamar a la función para obtener la ubicación del usuario
  }

  initMap(): void {
    // Configuración inicial del mapa
    this.map = L.map('map').setView([51.505, -0.09], 13); // Ubicación inicial por defecto

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Centrar el mapa en la ubicación del usuario
        this.map.setView([lat, lng], 13);

        // Añadir un marcador para la ubicación del usuario
        this.userLocation = L.marker([lat, lng])
          .addTo(this.map)
          .bindPopup('Tu ubicación')
          .openPopup();

        // Después de centrar el mapa en el usuario, mostrar las ubicaciones de los demás usuarios
        this.showUserLocations();
      }, () => {
        console.error('No se pudo obtener la ubicación');
      });
    } else {
      console.error('Geolocalización no soportada por el navegador');
    }
  }

  showUserLocations(): void {
    this.users.forEach(user => {
      L.marker([user.lat, user.lng])
        .addTo(this.map)
        .bindPopup(`${user.name} (ID: ${user.id})`);
    });
  }

  // Ajustar el tamaño del mapa al redimensionar la ventana
  @HostListener('window:resize')
  onResize() {
    this.map.invalidateSize();
  }
}
