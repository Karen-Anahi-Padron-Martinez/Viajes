import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpediaService {
  getHotelMessages() {
    throw new Error('Method not imple mented.');
  }
  private apiUrl = 'https://expedia13.p.rapidapi.com/api/v1/things/message'; // URL de la API desde RapidAPI
  private apiKey = '8bec866947msh5666e47792d312fp15c6cbjsnd23aa4c5ca1f'; // Sustituye por tu clave API

  constructor(private http: HttpClient) {}

  getLodgingData(location: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'expedia13.p.rapidapi.com',
      'x-rapidapi-key': this.apiKey
    });

    return this.http.get<any>(`${this.apiUrl}/lodging?location=${location}`, { headers }).pipe(
      tap((data: any) => console.log('Respuesta de la API:', data)) // Verificar respuesta de la API
    );
  }

}
