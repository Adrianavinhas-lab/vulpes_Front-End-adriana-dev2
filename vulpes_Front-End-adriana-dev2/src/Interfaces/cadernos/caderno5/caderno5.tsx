export interface ICabecalho {
  id_regsto_oper_cult_cabecalho: number;
  zona_homo: string;
  conversao: string;
  c_1: boolean;
  c_2: boolean;
  c_3: boolean;
  area: number;
  cultura: string;
  compasso: string;
  porta_enxerto: string;
  n_plantas: number;
  date_platacao: string | null;
  metodo_rega: string;
  c_e: string;
  producao_total: string;
  esperada: string;
  obtida: string;
  n_contador: string;
  leitura_contador_preimeira: string;

  id_rosto: 0;
  last_update: string;
  create_date: string;
  uuid: string;
}



export interface IPage5 {
  id_regsto_oper_cult: number;
  data: string;
  operacao_cultural: string;
  ferilizante_utili: string;
  modo_aplicacao: string;
  t: string;
  m: string;
  n: string;
  po: string;
  k2o: string;
  mgo: string;
  cao: string;
  so: string;
  // outros: string;
  inter_processos: string;
  material_utilizado: string;
  observacoes_objetivo: string;
  debito_dia: string;
  processo: string;
  quantificacao: string;
  obs: string;
  id_regsto_oper_cult_cabecalho: number;
  last_update: string;
  create_date: string;
  uuid: string;
}
export interface IPage5Observacoes {
  id_regsto_oper_cult_obs: number | undefined;
  obs: string | undefined;
  id_regsto_oper_cult_cabecalho: number | undefined;
  last_update: string | undefined;
  create_date: string | undefined;
  uuid: string | undefined;
}


