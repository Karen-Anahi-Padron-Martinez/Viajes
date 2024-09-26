import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError, of } from "rxjs";
import { usuarios } from "../../auth/interfaces/users.interface";

@Injectable({ providedIn: "root" })

export class AdministradorServices {



  // Base URL backend
  private baseUrl: string = 'https://backend-production-70c9.up.railway.app';

  constructor ( private http: HttpClient ) { }

  // * Metodo para hacer el Login
  register(usuario: string, email: string,  pass: string): Observable<usuarios | null>{
    const url = `${this.baseUrl}/registro`;

    // * Datos a enviar
    const body = { usuario, email, pass };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<usuarios>(url, body, httpOptions)
      .pipe(
        map(response => {
          // ? Se puede guardar el token y la sesion aqui c:
          console.log(response)
          return response;

        }),
        // ! Manejo de errores
        catchError(error => {
          console.error('Error de la autenticación', error);
          return of(null);
        })
      )
  }
}
