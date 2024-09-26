import { Injectable, NgZone } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthServices {

  //private baseUrl: string = 'https://backend-production-70c9.up.railway.app';
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone ) { }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }

  login(usuario: string, pass: string): Observable<{ autenticado: boolean, token: string | null } | null> {
    const url = `${this.baseUrl}/login`;
    const body = { usuario, pass };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<{ autenticado: boolean, token: string | null }>(url, body, httpOptions)
      .pipe(
        map(response => {
          if (response.autenticado && response.token) {
            localStorage.setItem('token', response.token);
          }
          return response;
        }),
        catchError(error => {
          console.error('Error de la autenticación', error);
          return of(null);
        })
      );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Verifica si el token existe y es válido (podrías agregar más lógica aquí)
  }
}
