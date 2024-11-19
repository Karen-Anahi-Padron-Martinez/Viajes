export interface Restaurante {
  id: string;
  nombre: string;
  categoria: string;
  tipologia: string;
  localizacion: string;
  descripcion: string;
  infraestructura: string;
  accesibilidad: string;
  servicios: string;
  costo: string;
  contacto: string;
  coordenadas: string;
  alt_img?: string;
  selected?: boolean; // Propiedad opcional para manejar la selección
}
