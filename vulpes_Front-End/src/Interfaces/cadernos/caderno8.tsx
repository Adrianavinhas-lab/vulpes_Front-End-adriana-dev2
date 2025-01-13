export interface ICabecalho8 {
  id_registo_colh: number;

  zona_homo: string;
  c1: boolean;
  c2: boolean;
  c3: boolean;
  area: number;

  cultura: string;
  compasso: string;
  porta_enxerto: string;
  n_planta: 0;
  data_plantacao: string;

  produca_total: string;
  obtida: string;

  id_rosto: 0;
  last_update: string;
  create_date: string;
  uuid: string;
}

export interface IPage8 {
  id_registo_pos_colhe: number;

  data: string;
  embalagem: string;
  quantificacao: string;
  destinatario: string;
  quantificacao_dois: string;

  id_registo_colh: number;
  last_update: string;
  create_date: string;
  uuid: string;
}
