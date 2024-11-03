import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwitchService {
  private clientId = '083h3u9nokg0ts5io045bh6p8sqoye';
  private token = 'r72a15xa6wt5gvc799wo0hvzeoc4ep'; // Generado previamente
  private apiUrl = 'https://api.twitch.tv/helix/streams';

  constructor(private http: HttpClient) {}

  // Método para obtener streams en vivo relacionados con un juego
  getLiveStreams(gameId: string, first: number = 10, language: string = 'en'): Observable<any> {
    const headers = new HttpHeaders({
      'Client-ID': this.clientId,
      'Authorization': `Bearer ${this.token}`
    });

    const params = {
      game_id: gameId, // Aquí es donde pasa el parámetro gameId
      first: first.toString(), // Número de streams a obtener
      language: language // Filtrar por idioma, opcional
    };

    return this.http.get(this.apiUrl, { headers, params });
  }
}
