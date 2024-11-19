import { Component } from '@angular/core';
import { YahooWeatherService } from '../../services/yahoo-weather.service';

@Component({
  selector: 'app-yahoo-weather',
  templateUrl: './yahoo-weather.component.html',
  styleUrl: './yahoo-weather.component.css',
})
export class YahooWeatherComponent {
  weatherData: any;
  city: string = ''; // Ciudad ingresada por el usuario

  constructor(private yahooWeatherService: YahooWeatherService) {}

  // Convierte la temperatura de Fahrenheit a Celsius
  convertToCelsius(fahrenheit: number): number {
    return ((fahrenheit - 32) / 1.8);
  }

  // Obtiene los datos del clima para la ciudad ingresada
  getWeather(): void {
    if (this.city.trim()) {
      this.yahooWeatherService.getWeather(this.city.trim()).subscribe(
        data => this.weatherData = data,
        error => console.error('Error al obtener los datos del clima:', error)
      );
    }
  }
}
