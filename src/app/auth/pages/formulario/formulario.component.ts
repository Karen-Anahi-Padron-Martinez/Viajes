import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../interfaces/hotel.interface';
import { Restaurante } from '../../interfaces/restaurante.interface';
import { Agencia } from '../../interfaces/agencia.interface';
import { HotelesService } from '../../services/hotel.service';
import { RestaurantesService } from '../../services/restaurante.service';
import { AgenciasService } from '../../services/agencia.service';
import { Atractivo } from '../../interfaces/atractivo.interface';
import { AtractivosService } from '../../services/atractivo.service';
import { ChangeDetectorRef } from '@angular/core';
import { enviroments } from '../../../../enviroments/enviroments';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public hoteles: Hotel[] = [];
  public restaurantes: Restaurante[] = [];
  public agencias: Agencia[] = [];
  public atractivos: Atractivo[] = [];

  public dias: number = 0;
  public noches: number = 0;
  public adultos: number = 0;
  public ninos: number = 0;
  public nombre: string = '';
  public correo: string = '';
  public telefono: string = '';
  public fechaInicial: Date = new Date();
  public transporte: string = '';
  private apiUrl: string = enviroments.baseUrl + '/api/email';
  // private apiUrl: string = 'http://localhost:3001/api/email';
  public mensajeExito: string = ''; // Variable para el mensaje de éxito

  constructor(
    private hotelesService: HotelesService,
    private restaurantesService: RestaurantesService,
    private agenciasService: AgenciasService,
    private atractivosService: AtractivosService,
    private http: HttpClient,
    private cd: ChangeDetectorRef // Añadido para detección de cambios
  ) { }

  ngOnInit(): void {
    this.hotelesService.getHoteles().subscribe(hoteles => this.hoteles = hoteles);
    this.restaurantesService.getRestaurantes().subscribe(restaurantes => this.restaurantes = restaurantes);
    this.atractivosService.getAtractivos().subscribe(atractivos => this.atractivos = atractivos);
    this.agenciasService.getAgencias()
    .subscribe(agencias => {
      this.agencias = agencias;
      this.agencias.forEach(agencia => agencia.selected = false);
    });
  }

  actualizarSeleccion(hotel: Hotel) {
    const index = this.hoteles.findIndex(h => h.id === hotel.id);
    if (index !== -1) {
      this.hoteles[index] = hotel;
    }
  }

  actualizarSeleccionRestaurante(restaurante: Restaurante) {
    const index = this.restaurantes.findIndex(r => r.id === restaurante.id);
    if (index !== -1) {
      this.restaurantes[index] = restaurante;
    }
  }

  actualizarSeleccionAtractivo(atractivo: Atractivo) {
    const index = this.atractivos.findIndex(a => a.id === atractivo.id);
    if (index !== -1) {
      this.atractivos[index] = atractivo;
    }
  }

  enviarFormulario(): void {
    if (!this.nombre || !this.correo || !this.telefono) {
      window.alert('Por favor, complete los campos de Nombre, Correo y Teléfono antes de enviar el formulario.');
      return;
    }

    const agenciaSeleccionada = this.agencias.find(a => a.selected);

    if (!agenciaSeleccionada) {
      window.alert('Por favor, seleccione una agencia antes de enviar el formulario.');
      return;
    }

    // Convertir fechaInicial a formato ISO si no es un objeto Date
    const fechaInicialISO = this.fechaInicial instanceof Date ? this.fechaInicial.toISOString() : new Date(this.fechaInicial).toISOString();

    const seleccionados = {
      hoteles: this.hoteles.filter(h => h.selected),
      restaurantes: this.restaurantes.filter(r => r.selected),
      agenciaCorreo: agenciaSeleccionada.correo, // obtener el correo de la agencia seleccionada
      atractivos: this.atractivos.filter(at => at.selected),
      dias: this.dias,
      noches: this.noches,
      adultos: this.adultos,
      ninos: this.ninos,
      nombre: this.nombre,
      correo: this.correo,
      telefono: this.telefono,
      fechaInicial: fechaInicialISO, // Enviar fecha en formato ISO
      transporte: this.transporte,
    };

    console.log(seleccionados); // console

    this.http.post(this.apiUrl, seleccionados, { responseType: 'json' })
      .subscribe(
        response => {
          this.limpiarFormulario(); // Limpia el formulario
          this.mensajeExito = 'Correo enviado con éxito'; // Asigna el mensaje de éxito
          window.alert(this.mensajeExito); // Muestra la alerta
        },
        error => {
          if (error.status === 400 && error.error === 'Por favor, seleccione una agencia antes de enviar el formulario.') {
            window.alert('Por favor, seleccione una agencia antes de enviar el formulario.');
          } else {
            console.error('Error al enviar el correo', error);
          }
        }
      );
  }

  limpiarFormulario(): void {
    this.dias = 0;
    this.noches = 0;
    this.adultos = 0;
    this.ninos = 0;
    this.nombre = '';
    this.correo = '';
    this.telefono = '';
    this.fechaInicial = new Date();
    this.transporte = '';

    // Reiniciar estado de selección de hoteles
    this.hoteles.forEach(h => h.selected = false);

    // Reiniciar estado de selección de restaurantes
    this.restaurantes.forEach(r => r.selected = false);

    // Reiniciar estado de selección de atractivos
    this.atractivos.forEach(a => a.selected = false);

    // Reiniciar estado de selección de agencias
    this.agencias.forEach(a => a.selected = false);

    // Forzar la detección de cambios para asegurar que la vista se actualice
    this.cd.detectChanges();
  }
}
