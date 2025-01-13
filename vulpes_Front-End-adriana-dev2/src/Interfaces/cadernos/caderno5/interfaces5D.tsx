export interface ICabecalho5D {
  id_act_feertil_azotada: number;

  zona_homo: string;
  n_sequencia: string;
  n_subparcela: string;
  area: number;
  metodo_rega: string;
  cultura: string;
  compasso: string;
  porta_enxerto: string;
  n_planta: string;
  data_plantacao: string;
  produca_total: string;
  obtida: string;

  id_zona_homo: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

export interface IAzotoAplicado {
  id_registo_fertil_um: number;
  origem: string;
  tipo_ferti: string;
  nome_comercial: string;
  especi_pecuaria: string;
  data_aplica: string;
  quantidade_um: number;
  teor_n: number;
  quantidade_dois: number;
  quantidade_tres: number;
  quantidade_quatro: number;
  quantidade_cinco: number;
  total: number;
  hash: string;
  id_act_feertil_azotada: number;
  last_update: string;
  create_date: string;
  uuid: string;



}

export interface IAguaDeRega {
  id_registo_fertil_dois: number | undefined;
  kg_n: string;
  teor: string;
  dotacao: string;
  volume: string;
  eficiencia_rega: string;
  metodo_rega: string;
  data_rega: string;
  id_act_feertil_azotada: number | undefined;
  last_update: string;
  create_date: string;
  uuid: string;
}

export interface IFertilizacaoOrganica {
  id_registo_fertil_tres: number | undefined;

  ferti_A: number;
  ferti_B: number;
  B_A: number;

  tres_um: string;
  tres_dois: string;
  quatro_um_um: string;
  quatro_um_dois: string;
  quatro_um_tres: string;
  quatro_um_quatro: string;
  quatro_dois_um: string;
  quatro_dois_dois: string;

  id_act_feertil_azotada: number | undefined;
  last_update: string;
  create_date: string;
  uuid: string;
}
