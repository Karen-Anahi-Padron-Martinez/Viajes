import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AirportService {
  private apiKey = '2b7ef98211f90237e4c910d1e663c9d8'; // Reemplaza con tu API Key de AviationStack
  private apiUrl = 'http://api.aviationstack.com/v1/airports';

  constructor(private http: HttpClient) {}

  getAirports(): Observable<any> {
    return this.http.get(`${this.apiUrl}?access_key=${this.apiKey}`);
  }
  // Método para buscar aeropuertos por país
  getAirportsByCountry(country: string): Observable<any> {
    let url = `${this.apiUrl}?access_key=${this.apiKey}`;
    if (country) {
      url += `&country_name=${country}`;
    }
    return this.http.get(url);
  }
}
