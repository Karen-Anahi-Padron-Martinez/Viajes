import { Component, OnInit } from '@angular/core';
import { Paquete } from '../../interfaces/paquete.interface';
import { PaquetesService } from '../../services/paquete.service';
import { Itinerario } from '../../../administrador/interfaces/itinerario.interface';
import { ItinerariosService } from '../../services/itinerario.service';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrl: './paquetes.component.css',
})
export class PaquetesComponent implements OnInit {
  public paquetes: Paquete[] = [];
  public itinerarios: Itinerario[] = [];

  constructor(
    private paquetesService: PaquetesService,
    private itinerariosService: ItinerariosService,
  ){}
  ngOnInit(): void {
    this.paquetesService.getPaquetes()
    .subscribe(paquetes => this.paquetes = paquetes);


    this.itinerariosService.getItinerarios()
    .subscribe(itinerarios => this.itinerarios = itinerarios);
  }
}
