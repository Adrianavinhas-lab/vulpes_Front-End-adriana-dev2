

export interface ICabecalho {
  id_anexo_um_cabecalho: number;
  zona_homo: string;
  n_sequencia: string;
  n_subparcela: string;
  area: number;
  cultura: string;
  idade: number;
  producao_esperado: number;
  insta: true;
  manutencao: true;
  producao: true;

  id_rosto: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

export interface IAnaliseTerrasA1 {
  id_anexo_um_um: number;
  mg_camp1: string;
  mg_camp2: string;
  mg_camp3: string;
  mg_camp4: string;
  mg_camp5: string;
  mg_camp6: string;
  perc_camp1: string;
  perc_camp2: string;
  perc_camp3: string;
  perc_camp4: string;
  perc_camp5: string;
  perc_camp6: string;
  mg_per_ph: string;
  mg_per_mo: string;
  classe_fert_camp1: string;
  classe_fert_camp2: string;
  classe_fert_camp3: string;
  classe_fert_camp4: string;
  classe_fert_camp5: string;
  classe_fert_camp6: string;
  classe_fert_camp7: string;
  classe_fert_camp8: string;
  deduzir_camp1: string;
  deduzir_camp2: string;
  Azoto_mineral: boolean;
  Azoto_mitrico: boolean;
  azoto_total: boolean;
  data_colheira: string;
  pronfundidade: number;
  data_resultados: string;
  n_amostras: number;
  n_boletin: string;
  id_anexo_um_cabecalho: number;
  last_update: string;
  create_date: string;
  uuid: string;


  
}


export interface IAnaliseAguaA1 {
  id_anexo_um_dois: number;
  dotacao: number;
  origem_agua: string;
  metodo_rega: string;
  eficiencia: string;
  razao: string;
  resultado_camp1: string;
  resultado_camp2: string;
  resultado_camp3: string;
  resultado_camp4: string;
  resultado_camp5: string;
  resultado_camp6: string;
  resultado_camp7: string;
  resultado_camp8: string;
  resultado_camp9: string;
  resultado_camp10: string;
  resultado_camp11: string;
  quantidade_nutri_camp1: string;
  quantidade_nutri_camp2: string;
  quantidade_nutri_camp3: string;
  k: boolean;
  ko: boolean;
  data_colheita: string;
  data_resultados: string;
  n_amostras: number;
  n_boletin: string;
  id_anexo_um_cabecalho: number;
  last_update: string;
  create_date: string;
  uuid: string;
}



export interface IFoliar {
  id_anexo_um_tres: number;
  resultado_camp1: string;
  resultado_camp2: string;
  resultado_camp3: string;
  resultado_camp4: string;
  resultado_camp5: string;
  resultado_camp6: string;
  resultado_camp7: string;
  resultado_camp8: string;
  resultado_camp9: string;
  resultado_camp10: string;
  resultado_camp11: string;
  classificacao_camp1: string;
  classificacao_camp2: string;
  classificacao_camp3: string;
  classificacao_camp4: string;
  classificacao_camp5: string;
  classificacao_camp6: string;
  classificacao_camp7: string;
  classificacao_camp8: string;
  classificacao_camp9: string;
  classificacao_camp10: string;
  classificacao_camp11: string;
  data_colheita: string;
  data_resultados: string;
  n_amostras: number;
  n_boletin: string;
  id_anexo_um_cabecalho: number;
  last_update: string;
  create_date: string;
  uuid: string;
}


