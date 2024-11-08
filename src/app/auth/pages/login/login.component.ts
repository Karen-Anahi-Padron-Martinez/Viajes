import { Component } from '@angular/core';
import { AuthServices } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FacebookService } from '../../services/facebook.service';
import { UserService } from '../../services/user.service';
interface LoginResponse {
  autenticado: boolean;
  token: string | null;
  userId: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  pass: string = '';
  user: any;

  constructor(
    private authServices: AuthServices,
    private userService: UserService,
    private router: Router,
    private facebookService: FacebookService
  ) {}

  onLogin() {
    this.authServices.login(this.usuario, this.pass).subscribe(
      (response: LoginResponse | null) => {
        if (response && response.autenticado) {
          // Redirigir al usuario a la página principal o a la ruta que corresponda
          this.router.navigate(['/administrador/listado']);
        } else {
          // Mostrar un mensaje de error si la autenticación falla
          alert('Usuario o contraseña incorrectos');
        }
      },
      (error) => {
        console.error('Error durante el inicio de sesión', error);
      }
    );
  }

// Método para iniciar sesión con Facebook
signInWithFacebook() {
  this.facebookService.loginu()
    .then((authResponse) => {
      console.log('User logged in:', authResponse);
      return this.facebookService.getUserData();
    })
    .then((userData) => {
      this.user = userData;
      console.log('User data:', this.user);
      this.userService.setUserData(this.user);
      alert('User email: ' + this.user.email); // Muestra el email del usuario
      // Redirigir al usuario a la ruta /administrador/listado
      this.router.navigate(['/administrador/listado']);
    })
    .catch((error) => {
      console.error('Error during Facebook login:', error);
      alert('Error: ' + error);
    });
}
}