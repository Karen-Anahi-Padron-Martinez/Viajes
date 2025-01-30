import { Injectable, NgZone } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthServices {
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone ) { }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('rol'); // Eliminar el rol también al hacer logout
    this.router.navigateByUrl('/auth/login');
  }

  login(usuario: string, pass: string): Observable<{ autenticado: boolean; token: string | null; userId: number; rol: number } | null> {
    const url = `${this.baseUrl}/login`;
    const body = { usuario, pass };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<{ autenticado: boolean; token: string | null; userId: number; rol: number }>(url, body, httpOptions)
      .pipe(
        map(response => {
          if (response.autenticado && response.token) {
            localStorage.setItem('token', response.token);
            //localStorage.setItem('userId', response.userId.toString());
            //localStorage.setItem('rol', response.rol.toString()); // Guardamos el rol en localStorage
          }
          return response;
        }),
        catchError(error => {
          console.error('Error de la autenticación', error);
          return of(null);
        })
      );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Verifica si el token existe y es válido 
  }

  getRol(): number | null {
    const rol = localStorage.getItem('rol');
    return rol ? parseInt(rol, 10) : null; // Devuelve el rol almacenado o null
  }

  saveFacebookUserData(userData: any) {
    return this.http.post(`${this.baseUrl}/facebook-login`, userData);
  }

  getUserData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`); // Asegúrate de tener un endpoint que devuelva los datos del perfil
  }
}
