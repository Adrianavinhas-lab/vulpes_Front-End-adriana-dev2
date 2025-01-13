
export interface IAlteracoesUmCab {
  id_alteracoes_cabecalho: number;
  ano: string | null;
  mes_um: string;
  mes_dois: string;
  mes_tres: string;
  mes_quatro: string;

  id_rosto: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

export interface IAlteracoesUm {
  id_alteracoes: number;
  camp_um: string;
  camp_dois: string;
  camp_tres: string;
  camp_quatro: string;
  camps_um: string;
  camps_dois: string;
  camps_tres: string;
  camps_quatro: string;
  fundamentacao: string;

  id_alteracoes_cabecalho: number;
  last_update: string;
  create_date: string;
  uuid: string;
}