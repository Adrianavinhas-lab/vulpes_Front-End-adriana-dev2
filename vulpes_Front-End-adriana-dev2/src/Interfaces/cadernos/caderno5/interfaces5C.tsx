export interface IOperacoesCulturais {
  id_regis_ope_cult: number;
  zona_homo: string;
  area: string;
  data: string;
  especis_exis: string;
  oper_cultural: string;
  tipo_ferti: string;
  ferti_utilizado: string;
  t: string;
  m: string;
  n: string;
  po: string;
  ko: string;
  mgo: string;
  cao: string;
  so: string;
  b: string;
  opcao: string;

  id_rosto: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

export interface IManeioEPecuario {
  id_regis_ope_cult: number;
  zona_homo: string;
  parqueamento: string;
  area: number;

  cn_out_dez: number;
  cn_ja_fev: number;
  cn_mar_mai: number;
  cn_jun_set: number;
  
  cn_ha_out_dez: number;
  cn_ha_ja_fev: number;
  cn_ha_mar_mai: number;
  cn_ha_jun_set: number;

  id_rosto: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

