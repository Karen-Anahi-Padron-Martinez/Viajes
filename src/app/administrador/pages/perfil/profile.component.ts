// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../auth/services/user.service';
//import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Obtiene los datos del usuario desde el servicio
    this.userData = this.userService.getUserData();
  }
}

