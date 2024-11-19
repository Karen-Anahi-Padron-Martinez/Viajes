import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card/card.component';
import { HotelImagePipe } from './pipes/hotel-image.pipe';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { BuscarresComponent } from './pages/buscarres/buscarres.component';
import { InforesComponent } from './pages/infores/infores.component';
import { NuevoresComponent } from './pages/nuevores/nuevores.component';
import { RestauranteComponent } from './components/card/restaurante/restaurante.component';
import { RestauranteImagePipe } from './pipes/restaurante-image.pipe';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { NuevoexpComponent } from './pages/nuevoexp/nuevoexp.component';
import { ExperieciaComponent } from './components/card/experiecia/experiecia.component';
import { ExpImagePipe } from './pipes/exp-image.pipe';
import { InfoexpComponent } from './pages/infoexp/infoexp.component';
import { BuscarexpComponent } from './pages/buscarexp/buscarexp.component';
import { BuscarpaqComponent } from './pages/buscarpaq/buscarpaq.component';
import { InfopaqComponent } from './pages/infopaq/infopaq.component';
import { ListpaqComponent } from './pages/listpaq/listpaq.component';
import { NuevopaqComponent } from './pages/nuevopaq/nuevopaq.component';
import { PaqueteImagePipe } from './pipes/paquete-image.pipe';
import { PaqueteComponent } from './components/card/paquete/paquete.component';
import { BuscaritiComponent } from './pages/buscariti/buscariti.component';
import { InfoitiComponent } from './pages/infoiti/infoiti.component';
import { NuevoitiComponent } from './pages/nuevoiti/nuevoiti.component';
import { AgenciaComponent } from './components/card/agencia/agencia.component';
import { AgenciaImagePipe } from './pipes/agencia-image.pipe';
import { BuscarageComponent } from './pages/buscarage/buscarage.component';
import { InfoageComponent } from './pages/infoage/infoage.component';
import { NuevoageComponent } from './pages/nuevoage/nuevoage.component';
import { ListageComponent } from './pages/listage/listage.component';
import { NuevoatraComponent } from './pages/nuevoatra/nuevoatra.component';
import { InfoatraComponent } from './pages/infoatra/infoatra.component';
import { BuscaratraComponent } from './pages/buscaratra/buscaratra.component';
import { AtractivoImagePipe } from './pipes/atractivo-image.pipe';
import { AtractivoComponent } from './components/card/atractivo/atractivo.component';
import { ListatraComponent } from './pages/listatra/listatra.component';
import { ItinerarioComponent } from './components/card/itinerario/itinerario.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { MapapageComponent } from './pages/mapapage/mapapage.component';
import { ChatComponent } from './components/chat/chat.component';
import { ProfileComponent } from './pages/perfil/profile.component';





@NgModule({
  declarations: [
    ListadoComponent,
    NuevoComponent,
    LayoutPageComponent,
    BuscarComponent,
    InformacionComponent,
    CardComponent,
    HotelImagePipe,
    ConfirmDialogComponent,
    BuscarresComponent,
    InforesComponent,
    NuevoresComponent,
    RestauranteComponent,
    RestauranteImagePipe,
    BuscarexpComponent,
    InfoexpComponent,
    NuevoexpComponent,
    ExperieciaComponent,
    ExpImagePipe,
    BuscarpaqComponent,
    InfopaqComponent,
    ListpaqComponent,
    NuevopaqComponent,
    PaqueteImagePipe,
    PaqueteComponent,
    BuscaritiComponent,
    InfoitiComponent,
    NuevoitiComponent,
    AgenciaComponent,
    AgenciaImagePipe,
    BuscarageComponent,
    InfoageComponent,
    NuevoageComponent,
    ListageComponent,
    NuevoatraComponent,
    InfoatraComponent,
    BuscaratraComponent,
    AtractivoImagePipe,
    AtractivoComponent,
    ListatraComponent,
    ItinerarioComponent,
    RegistroComponent,

    ChatComponent,

    ProfileComponent,

    
    

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdministradorRoutingModule,
    MaterialModule,
    FormsModule,
  ]
})
export class AdministradorModule { }
