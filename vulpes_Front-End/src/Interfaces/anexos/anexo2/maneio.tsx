

export interface IManeioA2_cabecalho {
  id_maneiro_cabecalho: number;
  data: string;
  camp_um: string;
  camp_dois: string;
  camp_tres: string;
  camp_quatro: string;
  id_rosto: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

export interface IManeio {
  id_maneiro: number;
  zona_homo: string;
  area: number;
  mes_um: string;
  mes_dois: string;
  mes_tres: string;
  mes_quatro: string;
  id_maneiro_cabecalho: number;
  last_update: string;
  create_date: string;
  uuid: string;
}
