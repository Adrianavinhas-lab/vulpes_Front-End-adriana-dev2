export interface ITecnico {
    id: string;
    nome: string;
    email: string;
    password?: string;
    roles: [];
    disabled: boolean;
    uuid: string;
    id_org: number;
    last_login: string;
    last_update: string;
    create_date: string;
  }