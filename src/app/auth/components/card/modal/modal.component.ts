import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { jsPDF } from 'jspdf';  // Importamos jsPDF

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [`/* Tus estilos aquí */`]
})
export class ModalComponent implements OnInit {
  @Input() amount: any;
  @Input() items: any;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {}

  // Función para generar y descargar el PDF
  downloadPDF(): void {
    const doc = new jsPDF();  // Creamos un nuevo documento PDF

    // Añadimos título
    doc.setFontSize(16);
    doc.text('Datos de Compra', 20, 20);

    // Añadimos los detalles de los paquetes
    let yPosition = 30;
    this.items.forEach((item: any) => {
      doc.text(`Nombre: ${item.name}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Unidades: ${item.quantity}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Unidades/Cantidad: $${item.unit_amount.value}`, 20, yPosition);
      yPosition += 20;
    });

    // Añadimos el total
    doc.setFontSize(14);
    doc.text(`Total: $${this.amount}`, 20, yPosition);

    // Descargamos el PDF
    doc.save('compra.pdf');
  }
}
