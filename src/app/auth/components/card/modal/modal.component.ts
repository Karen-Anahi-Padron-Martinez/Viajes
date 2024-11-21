import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';  // Importamos NgbModalConfig
import { jsPDF } from 'jspdf';  // Importamos jsPDF

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [`/* Tus estilos aquí */`]
})
export class ModalComponent implements OnInit {
  @Input() amount: any;
  @Input() items: any;

  // Datos del usuario (nombre, email, tarjeta)
  userData = {
    name: '',
    email: '',
    card: ''
  };

  // Bandera para indicar si el PDF ha sido descargado
  isPdfDownloaded: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private modalConfig: NgbModalConfig  // Usamos NgbModalConfig
  ) {
    // Configuramos el modal para que no se cierre al hacer clic fuera
    this.modalConfig.backdrop = 'static';  // No cerrar al hacer clic fuera
    this.modalConfig.keyboard = false;  // No cerrar con el teclado
  }

  ngOnInit(): void {}

  downloadPDF(): void {
    // Validamos que todos los campos del usuario estén completos
    if (this.userData.name && this.userData.email && this.userData.card) {
      const doc = new jsPDF();

      // Establecer un fondo claro con borde
      doc.setFillColor(240, 240, 240);  // Color de fondo gris claro
      doc.rect(10, 10, 180, 280, 'F');  // Fondo gris claro que cubre todo el contenido del PDF

      // Título principal
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(0, 102, 204);  // Color azul para el título
      doc.text('Comprobante de Compra', 20, 20);

      // Línea de separación después del título
      doc.setLineWidth(0.5);
      doc.line(20, 25, 190, 25);

      // Subtítulo - Datos de Usuario
      doc.setFontSize(18);
      doc.setTextColor(0, 102, 204);  // Color azul
      doc.text('Datos de Usuario', 20, 35);

      // Información del usuario
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);  // Color negro para el texto
      doc.text(`Nombre: ${this.userData.name}`, 20, 45);
      doc.text(`Correo: ${this.userData.email}`, 20, 55);
      doc.text(`Cuenta de Tarjeta: ${this.userData.card}`, 20, 65);

      // Espacio para separar
      let yPosition = 75;

      // Subtítulo - Datos de Compra
      doc.setFontSize(18);
      doc.setTextColor(0, 102, 204);  // Color azul
      doc.text('Datos de Compra', 20, yPosition);  // Cambié la posición aquí
      yPosition += 10; // Para dar espacio entre el título y los productos

      // Información de los productos
      this.items.forEach((item: any) => {
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);  // Color negro
        doc.text(`Nombre del Paquete: ${item.name}`, 20, yPosition);
        yPosition += 10;
        doc.setFontSize(12);
        doc.text(`Unidades: ${item.quantity}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Precio Unitario: $${item.unit_amount.value}`, 20, yPosition);
        yPosition += 10;

        // Imagen del paquete (si existe)
        if (item.imageUrl) {
          const image = item.imageUrl;  // URL de la imagen
          doc.addImage(image, 'JPEG', 20, yPosition, 50, 50);  // Ajusta las coordenadas y el tamaño de la imagen
          yPosition += 55;  // Espacio después de la imagen
        }

        yPosition += 20;  // Espacio entre productos
      });

      // Línea de separación entre productos y total
      doc.setLineWidth(0.5);
      doc.line(20, yPosition, 190, yPosition);

      // Total
      doc.setFontSize(16);
      doc.setTextColor(0, 102, 204);  // Azul
      doc.text(`Total: $${this.amount}`, 20, yPosition + 10);

      // Pie de página
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);  // Gris
      doc.text('Gracias por tu compra. ¡Esperamos verte pronto!', 20, 280);

      // Descargar el PDF
      doc.save('Comprobante_Turismo_DH.pdf');

      // Marcar como descargado el PDF
      this.isPdfDownloaded = true;
    } else {
      alert('Por favor, completa todos los campos antes de descargar el PDF.');
    }
  }

  closeModal(): void {
    // Validar que todos los campos estén completos y el PDF haya sido descargado antes de cerrar el modal
    if (this.userData.name && this.userData.email && this.userData.card && this.isPdfDownloaded) {
      this.activeModal.dismiss('Cross click');
    } else {
      alert('Por favor complete todos los campos y descargue el PDF antes de cerrar.');
    }
  }
}
