export interface Hotel {
  id: string;
  nombre: string;
  categoria: string;
  tipologia: string;
  localizacion: string;
  descripcion: string;
  accesibilidad: string;
  num_habitaciones: string;
  actividades: string;
  servicios: string;
  num_visitante_ideal: string;
  fecha_ideal_visita: string;
  segmento_mercado_potencial: string;
  costo: string;
  contacto: string;
  coordenadas: string;
  alt_img?: string;
  selected: boolean; // Vamos a ver si funciona
}
