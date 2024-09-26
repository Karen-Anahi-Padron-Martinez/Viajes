import { Component, OnInit } from '@angular/core';
import { Itinerario } from '../../../administrador/interfaces/itinerario.interface';
import { Actividad } from '../../../administrador/interfaces/actividad.interface';
import { ItinerariosService } from '../../../administrador/services/itinerario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-infoiti',
  templateUrl: './infoiti.component.html',
  styles: ``
})
export class InfoitiComponent implements OnInit{
  public itinerario?: Itinerario;
  public actividadesArray:Actividad[] | undefined

  constructor(
    private itinerariosService:ItinerariosService,
    private activateRoute: ActivatedRoute,
    private router:Router,
  ){}
    ngOnInit(): void {
      this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.itinerariosService.getItinerarioById(id) ),
      )
      .subscribe( itinerario => {
        if ( !itinerario) return this.router.navigate(['/administrador/listpaq']);

        this.itinerario = itinerario;
        console.log(itinerario);
        return;
      })
  }
  goBack():void{
    this.router.navigateByUrl('auth/paquetes')
  }
}
