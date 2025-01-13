export interface IBeneficiarios {
    Concelho: string;
    Codigo_postal: string;
    create_date: string;
    disabled: boolean;
    freguesia: string;
    email: string;
    id_agri: number;
    id_org: number;
    telemovel: number;
    last_update: string;
    morada: string;
    ifap: string;
    nif: string;
    uuid: string;
    telefone: number;
    nome: string;
}
export interface IParcela {
    nome: string;
    primeiro_pilar: number;
    uuid: string;
    seccao_finan: string;
    segundo_pilar: number;
    artigo: string;
    iqfp: number;
    forma: string;
    acao: string;
    s_n_l: string;
    Data_ultima_atualizacao: string;
    id_parcela: number;
    multiDec: string;
    id_agri: number;
    numero_seq: number;
    area_gis: number;
    last_update: string;
    numero_Parce: string;
    create_date: string;
}
export interface IBeneficiario {
    id_agri: number;
    nome: string;
    email: string;
    telefone: number;
    telemovel: number;
    morada: string;
    Concelho: string;
    freguesia: string;
    Codigo_postal: string;
    nif: string;
    nifap: string;
    disabled: boolean;
    last_update: string;
    create_date: string;
    id_org: number;
    uuid: string;
}