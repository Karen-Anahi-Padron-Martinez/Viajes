
import { Component, OnInit } from '@angular/core';
import { Experiencia } from "../../interfaces/experiencia.interface";
import { ExperienciasService } from '../../services/experiencias.service';
import { Atractivo } from '../../interfaces/atractivo.interface';
import { AtractivosService } from '../../services/atractivo.service';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrl: './experiencias.component.css'
})
export class ExperienciasComponent implements OnInit {
  public experiencias: Experiencia[] = [];
  public atractivos: Atractivo[] = [];




  constructor(

    private experienciasService: ExperienciasService,
    private atractivosService: AtractivosService,  //Add this line.
  ){}
  ngOnInit(): void {

    this.experienciasService.getExperiencias()
    .subscribe(experiencias => {
      this.experiencias = experiencias.filter(experiencia=>
        experiencia.nombre.trim().toLowerCase() !== 'no especificado'
      )
    });

    this.atractivosService.getAtractivos()  //Add this line.
    .subscribe(atractivos => this.atractivos = atractivos);
    //Add 'implements OnInit' to the class.


  }

}
