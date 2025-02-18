import { Injectable } from '@angular/core';
import { AuthServices } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  constructor(private authService: AuthServices) {
    this.loadFBSDK();
  }

  loadFBSDK() {
    if ((window as any).FB) {
      return;  // Si ya está cargado, no lo cargues de nuevo
    }

    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => this.initFB();
    document.body.appendChild(script);
  }

  initFB() {
    (window as any).fbAsyncInit = () => {
      (window as any).FB.init({
        appId: '1987471735022853',  // Asegúrate de que este sea tu App ID correcto
        cookie: true, // Habilitar cookies para gestionar la sesión
        xfbml: true,
        version: 'v17.0'  // Asegúrate de que la versión sea la correcta
      });
      console.log('Facebook SDK inicializado');
    };
  }

  // Método para iniciar sesión con Facebook
  // facebook.service.ts
loginu() {
  return new Promise((resolve, reject) => {
    (window as any).FB.login((response: any) => {
      if (response.authResponse) {
        const accessToken = response.authResponse.accessToken;
        this.authService.setToken(accessToken);

        this.getUserData().then((userData: any) => {
          // Guardar los datos en la base de datos
          this.authService.saveFacebookUserData(userData).subscribe({
            next: () => console.log('Usuario guardado en la base de datos'),
            error: (err) => console.error('Error al guardar el usuario', err)
          });
          resolve(userData);
        });
      } else {
        reject('No se pudo iniciar sesión en Facebook');
      }
    }, { scope: 'public_profile,email' });
  });
}

  

  // Método para obtener los datos del perfil del usuario
  getUserData() {
    return new Promise((resolve, reject) => {
      (window as any).FB.api('/me', { fields: 'id,name,email' }, (response: any) => {
        if (response && !response.error) {
          resolve(response);
        } else {
          reject(response.error);
        }
      });
    });
  }
}

