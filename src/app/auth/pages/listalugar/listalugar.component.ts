import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../interfaces/hotel.interface';
import { Restaurante } from '../../interfaces/restaurante.interface';
import { HotelesService } from '../../services/hotel.service';
import { RestaurantesService } from '../../services/restaurante.service';

@Component({
  selector: 'app-listalugar',
  templateUrl: './listalugar.component.html',
  styleUrl: './listalugar.component.css'
})
export class ListalugarComponent implements OnInit {
  public hoteles: Hotel[] = [];
  public restaurantes: Restaurante[] = [];

  constructor(
    private hotelesService: HotelesService,
    private restaurantesService: RestaurantesService
  ){}
  ngOnInit(): void {
    this.hotelesService.getHoteles()
    .subscribe(hoteles => {
      this.hoteles = hoteles.filter(hotel=>
        hotel.nombre.trim().toLowerCase() !== 'no especificado'
      )
    });

    this.restaurantesService.getRestaurantes()
    .subscribe(restaurantes =>
      {
        this.restaurantes = restaurantes.filter(restaurante=>
          restaurante.nombre.trim().toLowerCase() !== 'no especificado'
        )
      });
  }

}

