
export interface IControloCabA2 {
  id_controlo_cabecalho: number;
  data: string;
  id_rosto: number;
  last_update: string;
  create_date: string;
  uuid: string;
}


export interface IControloA2 {
  id_controlo: number;
  zona_homo: string;
  area: number | null;
  grau: string;
  tipo: string;
  area_intervencionar: number | null;
  id_controlo_cabecalho: number;
  last_update: string;
  create_date: string;
  uuid: string;
}


