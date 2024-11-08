import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { NuevoresComponent } from './pages/nuevores/nuevores.component';
import { BuscarresComponent } from './pages/buscarres/buscarres.component';
import { InforesComponent } from './pages/infores/infores.component';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { NuevoexpComponent } from './pages/nuevoexp/nuevoexp.component';
import { InfoexpComponent } from './pages/infoexp/infoexp.component';
import { BuscarexpComponent } from './pages/buscarexp/buscarexp.component';
import { ListpaqComponent } from './pages/listpaq/listpaq.component';
import { NuevopaqComponent } from './pages/nuevopaq/nuevopaq.component';
import { BuscarpaqComponent } from './pages/buscarpaq/buscarpaq.component';
import { InfopaqComponent } from './pages/infopaq/infopaq.component';
import { NuevoitiComponent } from './pages/nuevoiti/nuevoiti.component';
import { BuscaritiComponent } from './pages/buscariti/buscariti.component';
import { InfoitiComponent } from './pages/infoiti/infoiti.component';
import { ListageComponent } from './pages/listage/listage.component';
import { NuevoageComponent } from './pages/nuevoage/nuevoage.component';
import { BuscarageComponent } from './pages/buscarage/buscarage.component';
import { InfoageComponent } from './pages/infoage/infoage.component';
import { NuevoatraComponent } from './pages/nuevoatra/nuevoatra.component';
import { BuscaratraComponent } from './pages/buscaratra/buscaratra.component';
import { InfoatraComponent } from './pages/infoatra/infoatra.component';
import { ListatraComponent } from './pages/listatra/listatra.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { MapapageComponent } from './pages/mapapage/mapapage.component';
import { ProfileComponent } from './pages/perfil/profile.component';



const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children:[
      { path: 'registro', component: RegistroComponent},
      { path: 'perfil',component: ProfileComponent},
      {path: 'mapita', component: MapapageComponent},
      { path: 'listado', component: ListadoComponent },
      { path: 'listatra', component: ListatraComponent },
      { path: 'listpaq', component: ListpaqComponent },
      { path: 'listage', component: ListageComponent },

      { path: 'nuevoage', component: NuevoageComponent },
      { path: 'buscarage', component: BuscarageComponent },
      { path: 'editarage/:id', component: NuevoageComponent },
      { path: 'agencias/:id', component: InfoageComponent },

      { path: 'nuevoiti', component: NuevoitiComponent },
      { path: 'buscariti', component: BuscaritiComponent },
      { path: 'editariti/:id', component: NuevoitiComponent },
      { path: 'itinerarios/:id', component: InfoitiComponent },

      { path: 'nuevopaq', component: NuevopaqComponent },
      { path: 'buscarpaq', component: BuscarpaqComponent },
      { path: 'editarpaq/:id', component: NuevopaqComponent },
      { path: 'paquetes/:id', component: InfopaqComponent },

      { path: 'nuevoatra', component: NuevoatraComponent },
      { path: 'buscaratra', component: BuscaratraComponent },
      { path: 'editaratra/:id', component: NuevoatraComponent },
      { path: 'atractivos/:id', component: InfoatraComponent },

      { path: 'nuevores', component: NuevoresComponent },
      { path: 'buscarres', component: BuscarresComponent },
      { path: 'editarres/:id', component: NuevoresComponent },
      { path: 'restaurantes/:id', component: InforesComponent },

      { path: 'nuevoexp', component: NuevoexpComponent },
      { path: 'buscarexp', component: BuscarexpComponent },
      { path: 'editarexp/:id', component: NuevoexpComponent },
      { path: 'experiencias/:id', component: InfoexpComponent },
      
      { path: 'nuevo', component: NuevoComponent },
      { path: 'buscar', component: BuscarComponent },
      { path: 'editar/:id', component: NuevoComponent },
      { path: 'hoteles/:id', component: InformacionComponent },
      
      

      { path: '**', redirectTo: 'listado' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
