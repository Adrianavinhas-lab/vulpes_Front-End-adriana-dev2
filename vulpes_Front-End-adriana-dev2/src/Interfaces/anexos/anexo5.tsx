export interface IAnexo5Cab {
  id_reproducao: number;
  grupo: string;
  id_rosto: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

export interface IAnexo5 {
  id_cara_pecu:number;
  grupo:string;
  cruzados_indeterminacao: boolean;
  cruzados_pura: boolean;
  raca: string;
  cruzados_industrial: boolean;
  raca_pai: string;
  raca_mae: string;
  idade: boolean;
  estado_produtivo: boolean;
  finalidade_produtiva: boolean;
  utilizacao_parcela: boolean;
  racas: boolean;
  metodo_cobicao: boolean;
  metodo_tranplante: boolean;
  metodo_inseminacao: boolean;
  n_femeas_macho: string;
  sim: boolean;
  nao: boolean;
  sim_melhor_preco: boolean;
  sim_recursos: boolean;
  sim_melhorfertilidade: boolean;
  sim_recursos_humanos: boolean;
  epoca_cobricao: string;
  assistencia_pos_parto_recem_nascido: string;
  assistencia_pos_parto_femea: string;
  longevidade: string;
  reinicio_producao: boolean;
  renovacao_efetivo: boolean;
  renovacao_adquiridos: boolean;
  macho_renovacao_efetivo: boolean;
  macho_renovacao_adquiridos: boolean;
  macho_dade_inicio: number;
  macho_peso_condicao: string;
  macho_avaliacao: string;
  obs: string;
  id_reproducaos: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

