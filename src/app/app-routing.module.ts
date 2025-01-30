import { LoginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { LoginComponent } from './auth/pages/login/login.component';

const routes: Routes = [  
  { path: '', component: LoginComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )},
  { path: 'administrador', loadChildren: () => import('./administrador/administrador.module').then( m => m.AdministradorModule ), canActivate: [ LoginGuard ]},
  { path: '404', component: Error404PageComponent,},
  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  { path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
