
export interface ITemplate {
    id_template: number;
    //nome: string;
    decricao: string;
    id_org: number;
    tipo_anexo: number;
    last_update: string;
    create_date: string;
    uuid: string;
    /* anexoII: [];
    anexoIII: []; */
  }
  export interface ITemplate_definicoes {
    id_template: number;
    nome: string;
    descricao: string;
    id_org: number;
    last_update: string;
    create_date: string;
    uuid: string;
    anexoII: [];
    anexoIII: [];
  }