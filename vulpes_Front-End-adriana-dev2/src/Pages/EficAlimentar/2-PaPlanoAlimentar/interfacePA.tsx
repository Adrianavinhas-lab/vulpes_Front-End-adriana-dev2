import { useState } from "react";

export interface IEFProducaoForrageira {
  id_producao: number;
  ha_culturas: number | null;
  ma_culturas: number | null;
  ha_silagem: number | null;
  ma_silagem: number | null;
  ha_outras: number | null;
  ma_outras: number | null;
  ha_pastagem: number | null;
  ma_pastagem: number | null;
  ha_regadio: number | null;
  ma_regadio: number | null;
  ha_sequeiro: number | null;
  ma_sequeiro: number | null;
  id_identificacao: number | null;
  last_update: string;
  create_date: string;
  uuid: string;
}

export interface IEFIntensividade {
  id_intensidade: number;
  cn_ha: number | null;
  cn: number | null;
  superfici: number | null;
  id_identificacao: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

export interface IGrupoHomogeneo {
  id_grupo: number;
  grupo_nome: string;
  grupo_descritivo: string;
  id_identificacao: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

const useDadosPAForrageira = (id: number) => {
  const [rowsPA, setRowsPA] = useState<IEFProducaoForrageira[]>([]);
  const [producaoForrageira, setProducaoForrageira] =
    useState<IEFProducaoForrageira>({
      id_producao: 0,
      ha_culturas: null,
      ma_culturas: null,
      ha_silagem: null,
      ma_silagem: null,
      ha_outras: null,
      ma_outras: null,
      ha_pastagem: null,
      ma_pastagem: null,
      ha_regadio: null,
      ma_regadio: null,
      ha_sequeiro: null,
      ma_sequeiro: null,
      id_identificacao: id,
      last_update: new Date().toISOString(),
      create_date: new Date().toISOString(),
      uuid: "",
    });
  const initialProducaoForrageira = {
    id_producao: 0,
    ha_culturas: null,
    ma_culturas: null,
    ha_silagem: null,
    ma_silagem: null,
    ha_outras: null,
    ma_outras: null,
    ha_pastagem: null,
    ma_pastagem: null,
    ha_regadio: null,
    ma_regadio: null,
    ha_sequeiro: null,
    ma_sequeiro: null,
    id_identificacao: id,
    last_update: new Date().toISOString(),
    create_date: new Date().toISOString(),
    uuid: "",
  };
  const [rowsIntensidade, setRowsIntensidade] = useState<IEFIntensividade[]>(
    []
  );
  const [intensidade, setIntensidade] = useState<IEFIntensividade>({
    id_intensidade: 0,
    cn_ha: null,
    cn: null,
    superfici: null,
    id_identificacao: id,
    last_update: new Date().toISOString(),
    create_date: new Date().toISOString(),
    uuid: "",
  });
  const initialIntensidade = {
    id_intensidade: 0,
    cn_ha: null,
    cn: null,
    superfici: null,
    id_identificacao: id,
    last_update: "",
    create_date: "",
    uuid: "",
  };

  const [rowsGrupo, setRowsGrupo] = useState<IGrupoHomogeneo[]>([]);
  const [grupo, setgGrupo] = useState<IGrupoHomogeneo>({
    id_grupo: 0,
    grupo_nome: "",
    grupo_descritivo: "",
    id_identificacao: 0,
    last_update: new Date().toISOString(),
    create_date: new Date().toISOString(),
    uuid: "",
  });
  const initialGrupo = {
    id_grupo: 0,
    grupo_nome: "",
    grupo_descritivo: "",
    id_identificacao: 0,
    last_update: new Date().toISOString(),
    create_date: new Date().toISOString(),
    uuid: "",
  }

  return {
    rowsPA,
    setRowsPA,
    producaoForrageira,
    setProducaoForrageira,
    initialProducaoForrageira,
    rowsIntensidade,
    setRowsIntensidade,
    intensidade,
    setIntensidade,
    initialIntensidade,
    rowsGrupo, setRowsGrupo,
    grupo,
    setgGrupo,
    initialGrupo
  };
};

export default useDadosPAForrageira;
