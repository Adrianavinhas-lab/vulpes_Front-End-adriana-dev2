export interface ICabecalho5A {
  id_registo_fertil_cabecalho: number;
  zona_homo: string;
  n_sequencia: string;
  n_subparcela: string;
  area: 0;
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

export interface IPage5A {
  id_registo_fertil: number ;
  data: string ;
  operacao: string ;
  fertilizante_utilizado: string ;
  t: string ;
  m: string ;
  n: string ;
  po: string ;
  ko: string ;
  mgo: string ;
  cao: string ;
  so: string ;
  b: string ;
  camp_opcao: string ;

  id_registo_fertil_cabecalho: number ;
  last_update: string ;
  create_date: string ;
  uuid: string ;
}

export interface IPage5ADesdobramento {
  id_registo_fertil_two: number,

  elementos_forn_solo_n: string;
  elementos_forn_agua_n: string;
  totais_aplicados_zona_n: string;
  totais_aplicados_hectare_n: string;

  elementos_forn_solo_po: string;
  elementos_forn_agua_po: string;
  totais_aplicados_zona_po: string;
  totais_aplicados_hectare_po: string;

  elementos_forn_solo_ko: string;
  elementos_forn_agua_ko: string;
  totais_aplicados_zona_ko: string;
  totais_aplicados_hectare_ko: string;

  elementos_forn_solo_mgo: string;
  elementos_forn_agua_mgo: string;
  totais_aplicados_zona_mgo: string;
  totais_aplicados_hectare_mgo: string;

  elementos_forn_solo_cao: string;
  elementos_forn_agua_cao: string;
  totais_aplicados_zona_cao: string;
  totais_aplicados_hectare_cao: string;

  elementos_forn_solo_so: string;
  elementos_forn_agua_so: string;
  totais_aplicados_zona_so: string;
  totais_aplicados_hectare_so: string;

  elementos_forn_solo_b: string;
  elementos_forn_agua_b: string;
  totais_aplicados_zona_b: string;
  totais_aplicados_hectare_b: string;

  elementos_forn_solo_ob: string,
  elementos_forn_agua_ob: string,
  totais_aplicados_zona_ob: string,
  totais_aplicados_hectare_ob: string,

  id_registo_fertil_cabecalho: number;
  last_update: string;
  create_date: string;
  uuid: string;
}



  
