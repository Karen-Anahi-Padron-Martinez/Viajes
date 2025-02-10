import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError, of } from "rxjs";
import { usuarios } from "../../auth/interfaces/users.interface";

@Injectable({ providedIn: "root" })

export class AdministradorServices {



  // Base URL backend
  //private baseUrl: string = 'https://serverkaren-production.up.railway.app';
  //private baseUrl: string = 'https://backend-production-70c9.up.railway.app';
  private baseUrl = 'http://localhost:3000'; // URL de tu servidor backend
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

  // Método para guardar la ubicación del usuario en la base de datos
  saveLocation(idUsuario: number, latitud: number, longitud: number): Observable<any> {
    const body = { idUsuario, latitud, longitud };
    return this.http.post(`${this.baseUrl}/save-location`, body);
  }

  // Método para obtener la última ubicación del usuario
  getLocation(idUsuario: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-location/${idUsuario}`);
  }

  // Método para obtener todas las ubicaciones de los usuarios
  getAllLocations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-all-locations`);
  }
  // AuthService en Angular
getUserProfilee(userId: number) {
  return this.http.get(`${this.baseUrl}/user/${userId}`);
}

  // Método para obtener el perfil de usuario por ID
  getUserProfile(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile/${userId}`);
  }
}
