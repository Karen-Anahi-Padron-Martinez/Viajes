import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YahooWeatherService {
  private apiUrl = 'https://yahoo-weather5.p.rapidapi.com/weather';
  private headers = new HttpHeaders({
    'X-RapidAPI-Key': '5babf2021fmsh6b76df50574679ap12ade3jsnd6b558581257', // Obtén esta clave de RapidAPI
    'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
  });

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?location=${city}&format=json`, { headers: this.headers });
  }
}
