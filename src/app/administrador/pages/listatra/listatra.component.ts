import { Component, OnInit } from '@angular/core';
import { Atractivo } from '../../interfaces/atractivo.interface';
import { Experiencia } from '../../interfaces/experiencia.interface';
import { AtractivosService } from '../../services/atractivo.service';
import { ExperienciasService } from '../../services/experiencia.service';

@Component({
  selector: 'app-listatra',
  templateUrl: './listatra.component.html',
  styleUrl: './listatra.component.css'
})
export class ListatraComponent implements OnInit {
  public atractivos: Atractivo[] = [];
  public experiencias: Experiencia[] = [];

  constructor(
    private atractivosService: AtractivosService,
    private experienciasService: ExperienciasService
  ){}
  ngOnInit(): void {

    this.atractivosService.getAtractivos()
    .subscribe(atractivos => this.atractivos = atractivos);

    this.experienciasService.getExperiencias()
    .subscribe(experiencias => {
      this.experiencias = experiencias.filter(experiencia=>
        experiencia.nombre.trim().toLowerCase() !== 'no especificado'
      )
    });
  }

}
