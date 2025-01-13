

export interface ICalagemCab {
  id_calagem_cabecalho: number;
  data: string;
  id_rosto: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

export interface ICalagem {
  id_calagem: number;
  zona_homo: string;
  area: number | null;
  area_intervencionar: string | null;
  corretivo: string;
  quantidade: string;
  id_calagem_cabecalho: number;
  last_update: string;
  create_date: string;
  uuid: string;
}
