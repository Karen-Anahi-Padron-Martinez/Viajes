import { Component } from '@angular/core';
import { YahooWeatherService } from '../../services/yahoo-weather.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-yahoo-weather',
  templateUrl: './yahoo-weather.component.html',
  styleUrls: ['./yahoo-weather.component.css']
})
export class YahooWeatherComponent {
  weatherData: any;
  city: string = ''; // Ciudad ingresada por el usuario
  loading: boolean = false; // Estado para mostrar el spinner

  // Diccionario de traducciones de las condiciones del clima
  weatherTranslations: { [key: string]: string } = {
    "Clear": "Despejado",
    "Partly Cloudy": "Parcialmente Nublado",
    "Cloudy": "Nublado",
    "Rain": "Lluvia",
    "Snow": "Nieve",
    "Thunderstorms": "Tormentas",
    "Fog": "Niebla",
    "Windy": "Ventoso",
    "Fair": "Buen Clima"
    // Agregar más condiciones según lo necesites
  };

  constructor(private yahooWeatherService: YahooWeatherService,
              private spinner: NgxSpinnerService) {}

  // Convierte la temperatura de Fahrenheit a Celsius
  convertToCelsius(fahrenheit: number): number {
    return ((fahrenheit - 32) / 1.8);
  }

  // Traduce la condición del clima al español
  translateWeatherCondition(condition: string): string {
    return this.weatherTranslations[condition] || condition;
     // Si no tiene traducción, devuelve el valor original
  }

  // Obtiene los datos del clima para la ciudad ingresada
  getWeather(): void {
    if (this.city.trim()) {
      this.loading = true;  // Mostrar el spinner
      this.spinner.show();  // Activar spinner
      console.log('Spinner mostrado');

      this.yahooWeatherService.getWeather(this.city.trim()).subscribe(
        data => {
          this.weatherData = data;
          this.loading = false;  // Ocultar el spinner
          this.spinner.hide();
          console.log('Datos del clima obtenidos');
        },
        error => {
          console.error('Error al obtener los datos del clima:', error);
          this.loading = false;  // Ocultar el spinner en caso de error
          this.spinner.hide();
          console.log('Error al obtener los datos');
        }
      );
    }
  }
}
