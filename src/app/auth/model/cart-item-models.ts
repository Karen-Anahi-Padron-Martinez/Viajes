import { Paquete } from "../interfaces/paquete.interface";

export class CartItemModel {
  paqueteId: string;
  paqueteNombre: string;
  paqueteCosto: number; // Cambié a número
  qty: number;

  constructor(paquete: Paquete) {
    this.paqueteId = paquete.id;
    this.paqueteNombre = paquete.nombre;
    this.paqueteCosto = Number(paquete.costo); // Conversión a número
    this.qty = 1;
  }
}
