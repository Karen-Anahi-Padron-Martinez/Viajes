// import { Component } from '@angular/core';
// import { AdministradorServices } from '../../services/administrador.service';

// @Component({
//   selector: 'app-registro',
//   templateUrl: './registro.component.html',
//   styleUrl: './registro.component.css'
// })
// export class RegistroComponent {

//   usuario: string = '';
//   email: string = '';
//   pass: string = '';

//   constructor(
//     private administradorServices: AdministradorServices
//   ) {
//   }


//   onRegister() {
//     this.administradorServices.register(this.usuario, this.email, this.pass).subscribe(response => {
//       if (response) {
//       } else {
//         // ! Mostrar un mensaje de error si la autenticación falla
//         alert('Usuario o contraseña incorrectos');
//       }
//     });
//   }

// }

import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdministradorServices } from '../../services/administrador.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  usuario: string = '';
  email: string = '';
  pass: string = '';

  constructor(
    private administradorServices: AdministradorServices,
    private snackBar: MatSnackBar
  ) { }

  onRegister() {
    this.administradorServices.register(this.usuario, this.email, this.pass)
    .subscribe(response => {
      if (response) {
        this.snackBar.open('Registrado', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      } else {
        // ! Mostrar un mensaje de error si la autenticación falla
        alert('Hubo un error');
      }
    });
  }
}
