
export interface ICabecalho4 {
  id_registo_fitocabe: number;
  zona_homo: string;
  area: string;
  tipo_rega: string;
  cultura: string;
  compasso: string;
  producao_total: string;
  esperada: string;
  obtidas: string;
  id_rosto: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

export interface IPage4 {
  id_registo_fito: number | undefined;
  data: string | undefined;
  estado_fenologico: string | undefined;
  inimigo: string | undefined;
  metodologia: string | undefined;
  estimativa_risco: string | undefined;
  justifi_intervencao: string | undefined;
  observacoes_aux: string | undefined;
  n_autorizacao: string | undefined;
  nome_biocida: string | undefined;
  concentracao_dose: string | undefined;
  volume_aplicacao: string | undefined;
  area_tratada: string | undefined;
  n_aplicador: string | undefined;
  nome: string | undefined;
  n_autorizacao_atividade: string | undefined;
  observacoes: string | undefined;
  id_registo_fitocabe: number | undefined;
  last_update: string | undefined;
  create_date: string | undefined;
  uuid: string | undefined;
}

export interface IPage4Observacoes {
  id_registo_fito_obs: number | undefined;
  observacoes: string | undefined;
  id_registo_fitocabe: number | undefined;
  last_update: string | undefined;
  create_date: string | undefined;
  uuid: string | undefined;
}
