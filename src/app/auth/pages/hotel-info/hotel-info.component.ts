import { Component, OnInit } from '@angular/core';
import { FacebookService } from '../../services/facebook.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-hotel-info',
  templateUrl: './hotel-info.component.html',
  styleUrls: ['./hotel-info.component.css'],
})
export class HotelInfoComponent  {
  user: any;

  constructor(private facebookService: FacebookService) {}

  // Método para iniciar sesión
  signInWithFacebook() {
    this.facebookService.loginu()
      .then((authResponse) => {
        console.log('User logged in:', authResponse);
        return this.facebookService.getUserData();
      })
      .then((userData) => {
        this.user = userData;
        console.log('User data:', this.user);
        alert('User email: ' + this.user.email); // Muestra el email del usuario
      })
      .catch((error) => {
        console.error('Error during Facebook login:', error);
        alert('Error: ' + error);
      });
  }
}