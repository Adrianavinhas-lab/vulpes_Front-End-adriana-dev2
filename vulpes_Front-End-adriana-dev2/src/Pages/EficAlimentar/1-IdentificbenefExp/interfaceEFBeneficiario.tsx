import { useState } from "react";

export interface IEFBeneficiario {
  id_identificacao: number | null;
  nome: string;
  nif: string;
  nifap: string;
  morada: string;
  localizacao: string;
  codig_postal: string;
  freguesia: string;
  concelho: string;
  telefone: number | null;
  email: string;
  cargo_s: string;
  nome_S: string;
  morada_S: string;
  telefone_S: number | null;
  telemvel_S: number | null;
  email_S: string;
  local_sede_E: string;
  codigo_postal_E: string;
  freguesia_E: string;
  concelho_E: string;
  bovinos_carne: string;
  ccdr: string;
  assistencia: string;
  identificacao_oc: string;
  id_agri: number | null;
  last_update: string;
  create_date: string;
  uuid: string;
}

const useDadosEFBeneficiario = (id: number | null) => {
  const [beneficiarios, setBeneficiarios] = useState<IEFBeneficiario[]>([]);
  const [beneficiario, setBeneficiario] = useState<IEFBeneficiario>({
    id_identificacao: null,
    nome: "",
    nif: "",
    nifap: "",
    morada: "",
    localizacao: "",
    codig_postal: "",
    freguesia: "",
    concelho: "",
    telefone: null,
    email: "",
    cargo_s: "",
    nome_S: "",
    morada_S: "",
    telefone_S: null,
    telemvel_S: null,
    email_S: "",
    local_sede_E: "",
    codigo_postal_E: "",
    freguesia_E: "",
    concelho_E: "",
    bovinos_carne: "",
    ccdr: "",
    assistencia: "",
    identificacao_oc: "",
    id_agri: id,
    last_update: new Date().toISOString(),
    create_date: new Date().toISOString(),
    uuid: "",
  });

  const initialEFBeneficiario = {
    id_identificacao: null,
    nome: "",
    nif: "",
    nifap: "",
    morada: "",
    localizacao: "",
    codig_postal: "",
    freguesia: "",
    concelho: "",
    telefone: null,
    email: "",
    cargo_s: "",
    nome_S: "",
    morada_S: "",
    telefone_S: null,
    telemvel_S: null,
    email_S: "",
    local_sede_E: "",
    codigo_postal_E: "",
    freguesia_E: "",
    concelho_E: "",
    bovinos_carne: "",
    ccdr: "",
    assistencia: "",
    identificacao_oc: "",
    id_agri: id,
    last_update: new Date().toISOString(),
    create_date: new Date().toISOString(),
    uuid: "",
  };

  return {
    beneficiario,
    setBeneficiario,
    beneficiarios,
    setBeneficiarios,
    initialEFBeneficiario
  };
};

export default useDadosEFBeneficiario;
