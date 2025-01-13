export interface ICabecalhoEP {
  id_fluentes_um: number;

  fossas: string;
  nitreiras: string;
  valas_condu_fluentes: string;
  lagos_imperm: string;
  outros_reservatorios: string;
  contratualizada: string;

  id_rosto: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

export interface IQuantidadeEP {
  id_fluentes_dois: number;
  categoria_animal: string;
  especie_animal: string;
  n_animais: string;
  ex_chorume: string;
  ex_estrume: string;
  exter_chorume: string;
  exter_estrume: string;
  vendido_chorume: string;
  vendido_estrume: string;
  quant_chorume: string;
  quant_estrume: string;
  id_rosto: number;
  last_update: string;
  create_date: string;
  uuid: string;
}
export interface IAplicacaoEP {
  id_fluentes_tres: number;
  n_parcelario: number;
  cultura: string;
  propria: number;
  contratualizada: number;
  tipo: string;
  origem: string;
  data: string;
  quant: number;

  id_rosto: number;
  last_update: string;
  create_date: string;
  uuid: string;
}
