export interface Country {
  name: {
    common: string;
  };
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  languages?: { [key: string]: string };
  languagesString?: string;
  flags: {
    png: string;  // Imagen en formato PNG
    svg: string;  // Imagen en formato SVG
  };
}
