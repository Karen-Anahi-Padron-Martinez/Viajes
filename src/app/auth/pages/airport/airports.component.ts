import { Component, OnInit } from '@angular/core';
import { AirportService } from '../../services/airport.service';
//import { AirportService } from './airport.service';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.css'],
})
export class AirportsComponent implements OnInit {
    airports: any[] = [];
  searchTerm: string = '';

  constructor(private airportService: AirportService) {}

  ngOnInit(): void {
    // Opcionalmente, puedes cargar todos los aeropuertos cuando el componente se inicializa
    this.getAirportsByCountry(''); // Cargar por defecto (vacío)
  }

  searchAirports(): void {
    this.getAirportsByCountry(this.searchTerm);
  }
  
  getAirportsByCountry(country: string): void {
    this.airportService.getAirportsByCountry(country).subscribe(
      (data) => {
        if (data && data.data) {
          this.airports = data.data;
        } else {
          console.log('No se encontraron aeropuertos para este país.');
        }
      },
      (error) => {
        console.error('Error al obtener los aeropuertos:', error);
        alert('Hubo un error al obtener los aeropuertos. Verifique la consola para más detalles.');
      }
    );
  }
}