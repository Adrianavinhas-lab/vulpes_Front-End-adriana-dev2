import { useState } from "react";

export interface IAcoesMelhoriaUm {
  id_melhoria: number;
  zona_homo: string;
  area_intervencionar: number | null;
  acoes: string;
  periocidade: string;
  id_rosto: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

export interface IAcoesMelhoriaDois {
  id_melhoria: number;
  ano: string;
  seq: number | null;
  tipo: string;
  fundamentacao: string;
  id_rosto: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

export interface IAcoesMelhoriaTres {
  id_melhoria: number;
  ano: string;
  seq: number | null;
  tipologia: string;
  quantidade: number | null;
  fundamentacao: string;
  id_rosto: number;
  last_update: string;
  create_date: string;
  uuid: string;
}

