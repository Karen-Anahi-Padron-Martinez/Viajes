import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ExperienciasComponent } from './pages/experiencias/experiencias.component';
import { PaquetesComponent } from './pages/paquetes/paquetes.component';
import { LoginComponent } from './pages/login/login.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AgenciasComponent } from './pages/agencias/agencias.component';
import { InfoatraComponent } from './pages/infoatra/infoatra.component';
import { InfoexpComponent } from './pages/infoexp/infoexp.component';
import { InfohotelComponent } from './pages/infohotel/infohotel.component';
import { InfopaqComponent } from './pages/infopaq/infopaq.component';
import { InfoageComponent } from './pages/infoage/infoage.component';
import { OlvidarpassComponent } from './pages/olvidarpass/olvidarpass.component';
import { InforesComponent } from './pages/infores/infores.component';
import { ListalugarComponent } from './pages/listalugar/listalugar.component';
import { InfoitiComponent } from './pages/infoiti/infoiti.component';
import { MapComponent } from './pages/map/map.component';

import { CountryComponent } from './pages/country/country.component';
import { AirportsComponent } from './pages/airport/airports.component';
import { VideoListComponent } from './pages/video/video-list.component';
import { LiveStreamsComponent } from './pages/twich/live-streams.component';
import { SitiosbnbComponent } from './pages/sitiosbnb/sitiosbnb.component';
import { PagosComponent } from './pages/pagos/pagos.component';
import { YahooWeatherComponent } from './pages/yahoo-weather/yahoo-weather.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children:[
      { path: 'experiencias', component: ExperienciasComponent },
      { path: 'atractivos/:id', component: InfoatraComponent },
      { path: 'listalugar', component: ListalugarComponent },
      { path: 'restaurantes/:id', component: InforesComponent },
      { path: 'experiencias/:id', component: InfoexpComponent },
      { path: 'hoteles/:id', component: InfohotelComponent },
      { path: 'paquetes/:id', component: InfopaqComponent },
      { path: 'agencias/:id', component: InfoageComponent},
      { path: 'itinerarios/:id', component: InfoitiComponent},
      { path: 'paquetes', component: PaquetesComponent },
      { path: 'olvidarpass', component: OlvidarpassComponent},
      { path: 'formulario', component: FormularioComponent },
      { path: 'login', component: LoginComponent },
      { path: 'inicio', component: InicioComponent},

      {path: 'mapa',component: MapComponent},
      {path: 'pais',component: CountryComponent},
      {path: 'air',component: AirportsComponent},
      {path: 'info',component: InfoageComponent},
      {path: 'streaming',component:VideoListComponent},
      {path: 'twitch', component:LiveStreamsComponent},

      { path: 'mapa',component: MapComponent},
      { path: 'info',component: InfoageComponent},

      { path: 'agencias', component: AgenciasComponent},
      { path: 'sitiosbnb', component:SitiosbnbComponent},
      { path: 'pagos', component: PagosComponent},
      { path: 'yahoo-weather',component: YahooWeatherComponent},
      { path: '**', redirectTo: 'inicio'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
