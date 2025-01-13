export interface ICabecalho5B {
  id_registo_activi: number;

  zona_homo: string;
  n_sequencia: string;
  n_subparcela: string;
  area: number;
  cultura: string;
  esperada: string;
  obtida: string;
  data: string;
  profundidade: number;
  data_emissao: string;
  n_amostras: number;
  n_boletim: string;

  id_rosto: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

export interface IAnaliseTerras {
  id_registo_analise: number;

  mg_camp1: string;
  mg_camp2: string;
  mg_camp3: string;
  mg_camp4: string;
  mg_camp5: string;
  mg_camp6: string;

  percentagem_camp1: string;
  percentagem_camp2: string;
  percentagem_camp3: string;
  percentagem_camp4: string;
  percentagem_camp5: string;
  percentagem_camp6: string;
  Resultados_analicesPH: string;
  Resultados_analicesMO: string;

  fertilizacao_camp1: string;
  fertilizacao_camp2: string;
  fertilizacao_camp3: string;
  fertilizacao_camp4: string;
  fertilizacao_camp5: string;
  fertilizacao_camp6: string;
  fertilizacao_camp7: string;
  fertilizacao_camp8: string;

  deduzir_cálculo: string;
  deduzir_cálculo_camp2: string;
  azoto_mineral: boolean;
  azoto_nitrico: boolean;
  azoto_total: boolean;

  id_registo_activi: number;
  last_update: string;
  create_date: string;
  uuid: string;
}


export interface IPage5B {
  id_atividade: 0;

  data: string;
  operacao_cult: string;
  fertilizacao: string;
  produto_utilizado: string;
  t: string;
  n: string;
  po: string;
  ko: string;
  mgo: string;
  cao: string;
  so: string;
  b: string;
  campp_opcao: string;

  id_registo_activi: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

export interface IPage5B_Two  {
  id_atividade_two: number,

  elementos_n: string,
  elementos_po: string,
  elementos_ko: string,
  elementos_mgo: string,
  elementos_cao: string,
  elementos_so: string,
  elementos_b: string,
  elementos_campp_opcao: string,
  
  totais_apli_homo_n: string,
  totais_apli_homo_po: string,
  totais_apli_homo_ko: string,
  totais_apli_homo_mgo: string,
  totais_apli_homo_cao: string,
  totais_apli_homo_so: string,
  totais_apli_homo_b: string,
  totais_apli_homo_campp_opcao: string,

  totais_apli_n: string,
  totais_apli_po: string,
  totais_apli_ko: string,
  totais_apli_mgo: string,
  totais_apli_cao: string,
  totais_apli_so: string,
  totais_apli_b: string,
  totais_apli_campp_opcao: string,

  id_registo_activi: number,
  last_update: string,
  create_date: string,
  uuid: string,
}


