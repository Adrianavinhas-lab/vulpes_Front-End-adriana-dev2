
export interface IComposicaoQ1 {
  id_anexo_um_quatro_um: number;
  estrume_camp1: string;
  estrume_camp2: string;
  estrume_camp3: string;
  estrume_camp4: string;
  chorume_camp1: string;
  chorume_camp2: string;
  chorume_camp3: string;
  chorume_camp4: string;
  id_anexo_um_cabecalho: number;

  last_update: string;
  create_date: string;
  uuid: string;
}



export interface IComposicaoQ2 {
  id_anexo_um_quatro_um: number;
  digerido_camp1: string;
  digerido_camp2: string;
  digerido_camp3: string;
  digerido_camp4: string;
  sedimentos_camp1: string;
  sedimentos_camp2: string;
  sedimentos_camp3: string;
  sedimentos_camp4: string;
  mistura_camp1: string;
  mistura_camp2: string;
  mistura_camp3: string;
  mistura_camp4: string;
  composto_camp1: string;
  composto_camp2: string;
  composto_camp3: string;
  composto_camp4: string;
  opcao_um_camp1: string;
  opcao_um_camp2: string;
  opcao_um_camp3: string;
  opcao_um_camp4: string;
  opcao_dois_camp1: string;
  opcao_dois_camp2: string;
  opcao_dois_camp3: string;
  opcao_dois_camp4: string;
  origem_tabela: boolean;
  origem_analise: boolean;
  tabela: string;
  analise: string;
  id_anexo_um_cabecalho: number;
  last_update: string;
  create_date: string;
  uuid: string;
}


export interface IAdubacao {
  id_composicao_verde: number;
  especies_camp1: string;
  especies_camp2: string;
  nutriente_camp1: string;
  nutriente_camp2: string;
  nutriente_camp3: string;
  nutriente_camp4: string;
  quantidade_camp1: string;
  quantidade_camp2: string;
  quantidade_camp3: string;
  quantidade_camp4: string;
  quantidade_camp5: string;
  quantidade_camp6: string;
  quantidade_camp7: string;
  quantidade_camp8: string;
  considerar_camp1: string;
  considerar_camp2: string;
  considerar_camp3: string;
  considerar_camp4: string;
  considerar_camp5: string;
  considerar_camp6: string;
  considerar_camp7: string;
  considerar_camp8: string;
  origem_tabela: boolean;
  origem_analise: boolean;
  tabela: string;
  analise: string;
  id_anexo_um_cabecalho: number;
  last_update: string;
  create_date: string;
  uuid: string;
}


export interface IAzoto {
  id_azoto: number;
  n: string;
  id_anexo_um_cabecalho: number;
  last_update: string;
  create_date: string;
  uuid: string;
}



export interface INutrientes {
  id_nutrientes: number;
  especie: string;
  numero: number;
  valor_ref_n: number;
  valor_ref_po: number;
  valor_ref_ko: number;
  numero_total: number;
  po_total: number;
  ko_total: number;
  id_anexo_um_cabecalho: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

