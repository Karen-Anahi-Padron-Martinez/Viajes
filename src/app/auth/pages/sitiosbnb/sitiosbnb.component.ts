import { Component, OnInit } from '@angular/core';
import { ExpediaService } from '../../services/expedia.service';



@Component({
  selector: 'app-sitiosbnb',
  templateUrl: './sitiosbnb.component.html',
  styleUrl: './sitiosbnb.component.css',
})
export class SitiosbnbComponent implements OnInit {
  lodgings: any[] = [];

  constructor(private expediaService: ExpediaService) {}

  ngOnInit(): void {
    this.expediaService.getLodgingData('Mexico City').subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.lodgings = data;
      },
      error: (error) => {
        console.error('Error al obtener los datos de Expedia:', error);
      }
    });
  }

}


