import { MessageService } from './../../../services/message.service';
import { Component, Input, OnInit } from '@angular/core';
import { Paquete } from '../../../interfaces/paquete.interface';

@Component({
  selector: 'paquetes-paquete-card',
  templateUrl: './paquete.component.html',
  styles: ``
})
export class PaqueteComponent implements OnInit {
  @Input() paquete!: Paquete;

  constructor(
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (!this.paquete) throw Error('Paquete property is required.');
  }

  addToCart(): void {
    console.log('envianding...');
    // Logic to add paquete to the cart
    this.messageService.sendMessage(this.paquete);
  }
}
