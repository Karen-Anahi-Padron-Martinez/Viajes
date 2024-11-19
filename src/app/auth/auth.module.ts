import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ExperienciasComponent } from './pages/experiencias/experiencias.component';
import { PaquetesComponent } from './pages/paquetes/paquetes.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card/card.component';
import { HotelImagePipe } from './pipes/hotel-image.pipe';
import { AgenciasComponent } from './pages/agencias/agencias.component';
import { OlvidarpassComponent } from './pages/olvidarpass/olvidarpass.component';
import { RestauranteComponent } from './components/card/restaurante/restaurante.component';
import { RestauranteImagePipe } from './pipes/restaurante-image.pipe';
import { InfoatraComponent } from './pages/infoatra/infoatra.component';
import { PaqueteImagePipe } from './pipes/paquete-image.pipe';
import { PaqueteComponent } from './components/card/paquete/paquete.component';
import { InfopaqComponent } from './pages/infopaq/infopaq.component';
import { PersonalizadoHotelComponent } from './components/card/personalizado-hotel/personalizado.hotel';
import { PersonalizadoRestauranteComponent } from './components/card/personalizado-restaurante/personalizado.rest';

import { ExperienciaComponent } from './components/card/experiencia/experiencia.component';
import { InfoexpComponent } from './pages/infoexp/infoexp.component';
import { InforesComponent } from './pages/infores/infores.component';
import { InfohotelComponent } from './pages/infohotel/infohotel.component';
import { AgenciaComponent } from './components/card/agencia/agencia.component';
import { InfoageComponent } from './pages/infoage/infoage.component';
import { AgenciaImagePipe } from './pipes/agencia-image.pipe';
import { PersonalizadoAgenciaComponent } from './components/card/personalizado-agencia/personalizado.agencia';
import { AtractivoImagePipe } from './pipes/atractivo-image.pipe';
import { AtractivoComponent } from './components/card/atractivo/atractivo.component';
import { ItinerarioComponent } from './components/card/itinerario/itinerario.component';
import { ListalugarComponent } from './pages/listalugar/listalugar.component';
import { ExperienciaImagePipe } from './pipes/experiencia-image.pipe';
import { FormsModule } from '@angular/forms';
import { PersonalizadoAtractivoComponent } from './components/card/personalizado-atractivo/personalizado-atractivo.component';
import { InfoitiComponent } from './pages/infoiti/infoiti.component';

import { CartItemComponent } from './components/card/cart-item/cart-item.component';
import { NgxPayPalModule } from 'ngx-paypal'; 
import { CartComponent } from './components/card/cart/cart.component';
import { ModalComponent } from './components/card/modal/modal.component';
import { SitiosbnbComponent } from './pages/sitiosbnb/sitiosbnb.component';
import { PagosComponent } from './pages/pagos/pagos.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MapComponent } from './pages/map/map.component';
import { HotelInfoComponent } from './pages/hotel-info/hotel-info.component';
import { CountryComponent } from './pages/country/country.component';
import { AirportsComponent } from './pages/airport/airports.component';
import { VideoListComponent } from './pages/video/video-list.component';
import { SafePipe } from './pipes/safe.pipe';
import { LiveStreamsComponent } from './pages/twich/live-streams.component';




@NgModule({
  declarations: [
    LayoutPageComponent,
    ExperienciasComponent,
    PaquetesComponent,
    FormularioComponent,
    LoginComponent,
    InicioComponent,
    CardComponent,
    HotelImagePipe,
    AgenciasComponent,
    OlvidarpassComponent,
    RestauranteComponent,
    RestauranteImagePipe,
    InfoatraComponent,
    ExperienciaComponent,
    ExperienciaImagePipe,
    InfoexpComponent,
    PersonalizadoHotelComponent,
    PersonalizadoRestauranteComponent,
    PersonalizadoAgenciaComponent,
    PaqueteImagePipe,
    PaqueteComponent,
    InfopaqComponent,
    InforesComponent,
    AgenciasComponent,
    InfohotelComponent,
    AgenciaComponent,
    InfoageComponent,
    AgenciaImagePipe,
    AtractivoImagePipe,
    AtractivoComponent,
    ItinerarioComponent,
    ListalugarComponent,
    PersonalizadoAtractivoComponent,
    InfoitiComponent,

    CartComponent,
    CartItemComponent,
    ModalComponent,
    SitiosbnbComponent,
    PagosComponent,


    HotelInfoComponent,
    CountryComponent,
    AirportsComponent,
    VideoListComponent,
    SafePipe,
    LiveStreamsComponent,

    
    


  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FormsModule,
    NgxPayPalModule,
    MatSnackBarModule


  ]
})
export class AuthModule { }
