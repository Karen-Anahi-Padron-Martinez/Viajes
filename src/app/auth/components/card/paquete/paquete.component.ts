import { Component, Input, OnInit } from '@angular/core';
import { Paquete } from '../../../interfaces/paquete.interface';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar
import { MessageService } from './../../../services/message.service';

@Component({
  selector: 'paquetes-paquete-card',
  templateUrl: './paquete.component.html',
  styleUrl: './paquete.component.css',
})
export class PaqueteComponent implements OnInit {

  @Input() paquete!: Paquete;


  constructor(
    private messageService: MessageService,
    private snackBar: MatSnackBar // Inyecta MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.paquete) throw Error('Paquete property is required.');
  }

  addToCart(): void {
    console.log('envianding...');
    // Lógica para agregar el paquete al carrito
    this.messageService.sendMessage(this.paquete);

    // Muestra el mensaje de notificación
    this.snackBar.open(
      `¡Se añadió el paquete "${this.paquete.nombre}" a tu carrito!`,
      'Cerrar',
      {
        duration: 3000, // Duración del mensaje en milisegundos
        horizontalPosition: 'center', // Posición horizontal
        verticalPosition: 'top', // Posición vertical
        panelClass: ['snackbar-success'] // Clase personalizada opcional
      }
    );
  }
}
