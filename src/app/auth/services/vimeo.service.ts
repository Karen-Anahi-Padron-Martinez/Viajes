import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VimeoService {

  private apiUrl = 'https://api.vimeo.com/videos'; // Endpoint de Vimeo
  private accessToken = 'c700741bf3eac7b8d3deb7ee1b2e4b92'; // Reemplaza con tu token de acceso

  constructor(private http: HttpClient) { }

  searchVideos(query: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    const params = {
      query: query,
      per_page: '10' // Cantidad de videos a obtener
    };

    return this.http.get<any>(this.apiUrl, { headers, params });
  }
}

