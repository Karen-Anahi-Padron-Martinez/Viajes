export interface Experiencia {
  id: string;
  nombre: string;
  descripcion: string;
  accesibilidad: string;
  servicio: string;
  costo: string;
  contacto: string;
  coordenadas: string;
  alt_img?:string;
  selected?: boolean; // Propiedad opcional para manejar la selección

}
