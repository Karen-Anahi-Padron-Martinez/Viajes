import { Component, OnInit, HostListener } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

interface Location {
  id: number;         // Tipo INT, clave primaria
  idUsuario: number;  // Tipo INT
  latitud: number;    // Tipo DECIMAL
  longitud: number;   // Tipo DECIMAL
  fecha: string;      // Tipo TIMESTAMP, puedes usar string para simplificar
}
@Component({
  selector: 'app-mapapage',
  templateUrl: './mapapage.component.html',
  styleUrls: ['./mapapage.component.css']
})
export class MapapageComponent implements OnInit {
  map!: L.Map;
  userId!: number;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Obtener el userId del localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);
    }

    this.initMap();
    this.loginAndUpdateLocation();
  }

  initMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  loginAndUpdateLocation(): void {
    // Simulación de inicio de sesión
    // Reemplaza esto por la lógica real de autenticación
    const password = '1234'; // Cambia esto por la contraseña real

    this.http.post('http://localhost:3000/login', { userId: 4, password }).subscribe(
      (response: any) => {
        console.log(response.message);
        // Llama a la función para obtener y guardar la ubicación
        this.getUserLocation();
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
      }
    );
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          // Muestra la ubicación del usuario en el mapa
          this.map.setView([userLat, userLng], 13);

          // Agrega un marcador en la ubicación del usuario
          L.marker([userLat, userLng])
            .addTo(this.map)
            .bindPopup('Estás aquí!')
            .openPopup();

          // Guarda la ubicación en el backend
          this.saveUserLocation(userLat, userLng);
        },
        (error) => {
          console.error('Error al obtener la ubicación: ', error);
        }
      );
    } else {
      console.error('La geolocalización no es compatible con este navegador.');
    }
  }

  saveUserLocation(lat: number, lng: number): void {
    const userId = localStorage.getItem('userId'); // Obtener el userId del localStorage
  
    if (!userId) {
      console.error('No se encontró el userId en el localStorage');
      return; // Si no se encuentra el userId, no continuar
    }
  
    console.log('Enviando datos:', { userId: userId, lat: lat, lng: lng });
    this.http.post('http://localhost:3000/save-location', {
      userId: userId,
      lat: lat,
      lng: lng
    }).subscribe(
      (response) => {
        console.log('Ubicación guardada', response);
        // Cargar la última ubicación guardada
        this.loadAllUserLocations();
      },
      (error) => {
        console.error('Error al guardar la ubicación', error);
      }
    );
  }
  

 /* loadUserLocation(): void {
    this.http.get(`http://localhost:3000/get-location/${this.userId}`).subscribe(
      (location: any) => {
        console.log('Ubicación recibida:', location);
        if (location && location.lat && location.lng) {
          // Si hay una ubicación guardada, mostrarla en el mapa
          this.map.setView([location.lat, location.lng], 13);
          L.marker([location.lat, location.lng])
            .addTo(this.map)
            .bindPopup('Última ubicación guardada')
            .openPopup();
        }
      },
      (error) => {
        console.error('Error al cargar la ubicación', error);
      }
    );
  }*/
    loadAllUserLocations(): void {
      this.http.get<Location[]>('http://localhost:3000/get-all-locations').subscribe(
        (locations: Location[]) => {
          console.log('Ubicaciones recibidas:', locations);
          locations.forEach((location) => {
            if (location && location.latitud && location.longitud) {
              // Mostrar cada ubicación en el mapa
              L.marker([location.latitud, location.longitud])
                .addTo(this.map)
                .bindPopup(`Usuario: ${location.idUsuario} - Última ubicación guardada`)
                .openPopup();
            }
          });
        },
        (error) => {
          console.error('Error al cargar las ubicaciones', error);
        }
      );
    }
    
}
