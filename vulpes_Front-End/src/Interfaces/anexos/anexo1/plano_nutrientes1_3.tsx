

export interface IPlanoNutrientes {
  id_plano: number;

  elemento_camp1: string;
  elemento_camp2: string;
  elemento_camp3: string;
  previsao_camp1: number | null;
  previsao_camp2: number| null;
  previsao_camp3: number| null;
  previsao_camp4: number| null;
  previsao_camp5: number;
  previsao_camp6: number;
  previsao_camp7: number;
  previsao_camp8: number;
  indentifica: string;

  id_anexo_um_cabecalho: number;
  last_update: string;
  create_date: string;
  uuid: string;
}


