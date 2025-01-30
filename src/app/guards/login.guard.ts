import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthServices } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {

  constructor(private authService: AuthServices, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isAuthenticated()) {
      console.log('Token válido');
      return true;
    } else {
      console.log('Token no válido o no presente');
      this.router.navigate(['/login']);
      return false;
    }
  }
}





