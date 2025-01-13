export interface ICabecalho7 {
  id_registo_pro: number;
  especi: string;
  grupo_homo: string;
  id_rosto: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

export interface IProducaoAnimal {
  id_registo_pro_ani: number;
  data_camp1: string;
  data_camp2: string;
  justif_camp1: string;
  justif_camp2: string;
  alter_camp1: string;
  alter_camp2: string;
  alimenta_camp1: string;
  alimenta_camp2: string;
  operacoescamp1: string;
  operacoescamp2: string;
  control_camp1: string;
  control_camp2: string;
  prod_camp1: string;
  prod_camp2: string;
  id_registo_pro: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

export interface IObservacoes {
  id_registo_pro_ani_obs: number;
  obs: string;
  id_registo_pro: number;
  last_update: string;
  create_date: string;
  uuid: string;
}
