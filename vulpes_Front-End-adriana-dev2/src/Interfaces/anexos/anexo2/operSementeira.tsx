

export interface IOperSementCab {
  id_sementeira_cabecalho: number;
  data: string;
  id_rosto: number;
  last_update: string;
  create_date: string;
  uuid: string;
}



export interface IOperSementA2 {
  id_sementeira: number;
  zona_homo: string;
  area: number;
  area_intervencionar: string;
  especies: string;
  id_sementeira_cabecalho: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

export const initialOperSement = {
  id_sementeira: 0,
  zona_homo: "",
  area: 0,
  area_intervencionar: "",
  especies: "",
  id_sementeira_cabecalho: 0,
  last_update: new Date().toISOString(),
  create_date: new Date().toISOString(),
  uuid: "",
};
