import React, { ChangeEvent, useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box } from "@mui/material";
import { TableContainer } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";

import CadernoLayout from "../../../Styles/layout/cadernoLayout";
import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
import LoadingVulpes from "../../../Styles/Loader/loading";
import { IBalancoGH3, TabelaBalancoGH3 } from "./balancoGH3";
import { Typography } from "@material-ui/core";
import { IJaneiroGH3, TabelaJaneiroGH3 } from "./janeiroGH3";
import { IfevereiroGH3, TabelafevereiroGH3 } from "./fevereiroGH3";
import { ImarcoGH3, TabelamarcoGH3 } from "./marcoGH3";
import { IAbrilGH3, TabelaAbrilGH3 } from "./abrilGH3";
import { IMaioGH3, TabelaMaioGH3 } from "./maioGH3";
import { IJunhoGH3, TabelaJunhoGH3 } from "./junhoGH3";
import { IJulhoGH3, TabelaJulhoGH3 } from "./julhoGH3";
import { IAgostoGH3, TabelaAgostoGH3 } from "./agostoGH3";
import { ISetembroGH3, TabelaSetembroGH3 } from "./setembroGH3";
import { IOutubroGH3, TabelaOutubroGH3 } from "./outubroGH3";
import { INovembroGH3, TabelaNovembroGH3 } from "./novembroGH3";
import { IDezembroGH3, TabelaDezembroGH3 } from "./dezembroGH3";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },

    toolbars: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(2, 3),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    contents: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },

  })
);

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          // input label when focused
          "& label.Mui-focused": {
            color: "#c94f1e",
            // focused color for input with variant='standard'
            "& .MuiInput-underline:after": {
              borderBottomColor: "#c94f1e",
            },
          },
          // focused color for input with variant='filled'
          "& .MuiFilledInput-underline:after": {
            borderBottomColor: "#c94f1e",
          },
          // focused color for input with variant='outlined'
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#c94f1e",
            },
          },
        },
      },
    },
  },
});


export default function EF_CC_GH3() {
  const classes = useStyles();
  const [isloading, ] = useState(false);

  /******************* TABELA BALANÇO ********************/
  const [balanco, setBalanco] = useState<IBalancoGH3>({
    id_balanco_GH3: 0,

    pa_total_ms_pastagem: "",
    pa_total_ms_silagem: "",
    pa_total_ms_o_forragens: "",
    pa_total_ms_composto: "",

    pa_total_dieta_pastagem: "",
    pa_total_dieta_silagem: "",
    pa_total_dieta_o_forragens: "",
    pa_total_dieta_composto: "",

    jan_pastagem: "",
    fev_pastagem: "",
    mar_pastagem: "",
    abr_pastagem: "",
    mai_pastagem: "",
    jun_pastagem: "",
    jul_pastagem: "",
    ago_pastagem: "",
    set_pastagem: "",
    out_pastagem: "",
    nov_pastagem: "",
    dez_pastagem: "",

    jan_silagem: "",
    fev_silagem: "",
    mar_silagem: "",
    abr_silagem: "",
    mai_silagem: "",
    jun_silagem: "",
    jul_silagem: "",
    ago_silagem: "",
    set_silagem: "",
    out_silagem: "",
    nov_silagem: "",
    dez_silagem: "",

    jan_o_forragem: "",
    fev_o_forragem: "",
    mar_o_forragem: "",
    abr_o_forragem: "",
    mai_o_forragem: "",
    jun_o_forragem: "",
    jul_o_forragem: "",
    ago_o_forragem: "",
    set_o_forragem: "",
    out_o_forragem: "",
    nov_o_forragem: "",
    dez_o_forragem: "",

    jan_composto: "",
    fev_composto: "",
    mar_composto: "",
    abr_composto: "",
    mai_composto: "",
    jun_composto: "",
    jul_composto: "",
    ago_composto: "",
    set_composto: "",
    out_composto: "",
    nov_composto: "",
    dez_composto: "",

    alim_total_ms_pastagem: "",
    alim_total_ms_silagem: "",
    alim_total_ms_o_forragem: "",
    alim_total_ms_composto: "",

    alim_total_dieta_pastagem: "",
    alim_total_dieta_silagem: "",
    alim_total_dieta_o_forragem: "",
    alim_total_dieta_composto: "",

    dif_total_ms_pastagem: "",
    dif_total_ms_silagem: "",
    dif_total_ms_o_forragem: "",
    dif_total_ms_composto: "",

    dif_total_dieta_pastagem: "",
    dif_total_dieta_silagem: "",
    dif_total_dieta_o_forragem: "",
    dif_total_dieta_composto: "",

    id_rosto: 0,
    last_update: "",
    create_date: "",
    uuid: "",
  });

  const handleInputChangeBalanco = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBalanco((prevOrganica) => ({
      ...prevOrganica,
      [name]: value,
    }));
  };

  /********************* TABELA JANEIRO ********************/
  const [janeiro, setJaneiro] = useState<IJaneiroGH3>({
    id_janeiro_GH3: 0,

    b_macho_menos_6meses_cn: "",
    b_femea_menos_6meses_cn: "",
    b_macho_6meses_a_1ano_cn: "",
    b_femea_6meses_a_1ano_cn: "",
    b_macho_mais1ano_menos2_cn: "",
    b_femea_mais1ano_menos2_cn: "",
    b_macho_mais_2anos_cn: "",
    b_femea_mais_2anos_cn: "",
  
    b_macho_menos_6meses_dias: "",
    b_femea_menos_6meses_dias: "",
    b_macho_6meses_a_1ano_dias: "",
    b_femea_6meses_a_1ano_dias: "",
    b_macho_mais1ano_menos2_dias: "",
    b_femea_mais1ano_menos2_dias: "",
    b_macho_mais_2anos_dias: "",
    b_femea_mais_2anos_dias: "",

    b_macho_menos_6meses_pastagem: "",
    b_femea_menos_6meses_pastagem: "",
    b_macho_6meses_a_1ano_pastagem: "",
    b_femea_6meses_a_1ano_pastagem: "",
    b_macho_mais1ano_menos2_pastagem: "",
    b_femea_mais1ano_menos2_pastagem: "",
    b_macho_mais_2anos_pastagem: "",
    b_femea_mais_2anos_pastagem: "",
  
    b_macho_menos_6meses_silagem: "",
    b_femea_menos_6meses_silagem: "",
    b_macho_6meses_a_1ano_silagem: "",
    b_femea_6meses_a_1ano_silagem: "",
    b_macho_mais1ano_menos2_silagem: "",
    b_femea_mais1ano_menos2_silagem: "",
    b_macho_mais_2anos_silagem: "",
    b_femea_mais_2anos_silagem: "",
  
    b_macho_menos_6meses_o_forragem: "",
    b_femea_menos_6meses_o_forragem: "",
    b_macho_6meses_a_1ano_o_forragem: "",
    b_femea_6meses_a_1ano_o_forragem: "",
    b_macho_mais1ano_menos2_o_forragem: "",
    b_femea_mais1ano_menos2_o_forragem: "",
    b_macho_mais_2anos_o_forragem: "",
    b_femea_mais_2anos_o_forragem: "",
  
    b_macho_menos_6meses_composto: "",
    b_femea_menos_6meses_composto: "",
    b_macho_6meses_a_1ano_composto: "",
    b_femea_6meses_a_1ano_composto: "",
    b_macho_mais1ano_menos2_composto: "",
    b_femea_mais1ano_menos2_composto: "",
    b_macho_mais_2anos_composto: "",
    b_femea_mais_2anos_composto: "",
  
    // sub_total_pastagem: "",
    // sub_total_silagem: "",
    // sub_total_o_forragem: "",
    // sub_total_composto: "",
  
    id_rosto: 0,
    last_update: "",
    create_date: "",
    uuid: "",
});

const handleInputChangejaneiro = (event: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setJaneiro((prevOrganica) => ({
    ...prevOrganica,
    [name]: value,
  }));
};

/******************** TABELA FEVEREIRO **********************/
const [fevereiro, setFevereiro] = useState<IfevereiroGH3>({
  id_fevereiro_GH3: 0,

  b_macho_menos_6meses_cn: "",
  b_femea_menos_6meses_cn: "",
  b_macho_6meses_a_1ano_cn: "",
  b_femea_6meses_a_1ano_cn: "",
  b_macho_mais1ano_menos2_cn: "",
  b_femea_mais1ano_menos2_cn: "",
  b_macho_mais_2anos_cn: "",
  b_femea_mais_2anos_cn: "",

  b_macho_menos_6meses_dias: "",
  b_femea_menos_6meses_dias: "",
  b_macho_6meses_a_1ano_dias: "",
  b_femea_6meses_a_1ano_dias: "",
  b_macho_mais1ano_menos2_dias: "",
  b_femea_mais1ano_menos2_dias: "",
  b_macho_mais_2anos_dias: "",
  b_femea_mais_2anos_dias: "",

  b_macho_menos_6meses_pastagem: "",
  b_femea_menos_6meses_pastagem: "",
  b_macho_6meses_a_1ano_pastagem: "",
  b_femea_6meses_a_1ano_pastagem: "",
  b_macho_mais1ano_menos2_pastagem: "",
  b_femea_mais1ano_menos2_pastagem: "",
  b_macho_mais_2anos_pastagem: "",
  b_femea_mais_2anos_pastagem: "",

  b_macho_menos_6meses_silagem: "",
  b_femea_menos_6meses_silagem: "",
  b_macho_6meses_a_1ano_silagem: "",
  b_femea_6meses_a_1ano_silagem: "",
  b_macho_mais1ano_menos2_silagem: "",
  b_femea_mais1ano_menos2_silagem: "",
  b_macho_mais_2anos_silagem: "",
  b_femea_mais_2anos_silagem: "",

  b_macho_menos_6meses_o_forragem: "",
  b_femea_menos_6meses_o_forragem: "",
  b_macho_6meses_a_1ano_o_forragem: "",
  b_femea_6meses_a_1ano_o_forragem: "",
  b_macho_mais1ano_menos2_o_forragem: "",
  b_femea_mais1ano_menos2_o_forragem: "",
  b_macho_mais_2anos_o_forragem: "",
  b_femea_mais_2anos_o_forragem: "",

  b_macho_menos_6meses_composto: "",
  b_femea_menos_6meses_composto: "",
  b_macho_6meses_a_1ano_composto: "",
  b_femea_6meses_a_1ano_composto: "",
  b_macho_mais1ano_menos2_composto: "",
  b_femea_mais1ano_menos2_composto: "",
  b_macho_mais_2anos_composto: "",
  b_femea_mais_2anos_composto: "",

  // sub_total_pastagem: "",
  // sub_total_silagem: "",
  // sub_total_o_forragem: "",
  // sub_total_composto: "",

  id_rosto: 0,
  last_update: "",
  create_date: "",
  uuid: "",
});

const handleInputChangeFevereiro = (event: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setFevereiro((prevOrganica) => ({
    ...prevOrganica,
    [name]: value,
  }));
};

/******************** TABELA MARCO **********************/
const [marco, setMarco] = useState<ImarcoGH3>({
  id_marco_GH3: 0,

  b_macho_menos_6meses_cn: "",
  b_femea_menos_6meses_cn: "",
  b_macho_6meses_a_1ano_cn: "",
  b_femea_6meses_a_1ano_cn: "",
  b_macho_mais1ano_menos2_cn: "",
  b_femea_mais1ano_menos2_cn: "",
  b_macho_mais_2anos_cn: "",
  b_femea_mais_2anos_cn: "",

  b_macho_menos_6meses_dias: "",
  b_femea_menos_6meses_dias: "",
  b_macho_6meses_a_1ano_dias: "",
  b_femea_6meses_a_1ano_dias: "",
  b_macho_mais1ano_menos2_dias: "",
  b_femea_mais1ano_menos2_dias: "",
  b_macho_mais_2anos_dias: "",
  b_femea_mais_2anos_dias: "",

  b_macho_menos_6meses_pastagem: "",
  b_femea_menos_6meses_pastagem: "",
  b_macho_6meses_a_1ano_pastagem: "",
  b_femea_6meses_a_1ano_pastagem: "",
  b_macho_mais1ano_menos2_pastagem: "",
  b_femea_mais1ano_menos2_pastagem: "",
  b_macho_mais_2anos_pastagem: "",
  b_femea_mais_2anos_pastagem: "",

  b_macho_menos_6meses_silagem: "",
  b_femea_menos_6meses_silagem: "",
  b_macho_6meses_a_1ano_silagem: "",
  b_femea_6meses_a_1ano_silagem: "",
  b_macho_mais1ano_menos2_silagem: "",
  b_femea_mais1ano_menos2_silagem: "",
  b_macho_mais_2anos_silagem: "",
  b_femea_mais_2anos_silagem: "",

  b_macho_menos_6meses_o_forragem: "",
  b_femea_menos_6meses_o_forragem: "",
  b_macho_6meses_a_1ano_o_forragem: "",
  b_femea_6meses_a_1ano_o_forragem: "",
  b_macho_mais1ano_menos2_o_forragem: "",
  b_femea_mais1ano_menos2_o_forragem: "",
  b_macho_mais_2anos_o_forragem: "",
  b_femea_mais_2anos_o_forragem: "",

  b_macho_menos_6meses_composto: "",
  b_femea_menos_6meses_composto: "",
  b_macho_6meses_a_1ano_composto: "",
  b_femea_6meses_a_1ano_composto: "",
  b_macho_mais1ano_menos2_composto: "",
  b_femea_mais1ano_menos2_composto: "",
  b_macho_mais_2anos_composto: "",
  b_femea_mais_2anos_composto: "",

  // sub_total_pastagem: "",
  // sub_total_silagem: "",
  // sub_total_o_forragem: "",
  // sub_total_composto: "",

  id_rosto: 0,
  last_update: "",
  create_date: "",
  uuid: "",
});

const handleInputChangemarco = (event: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setMarco((prevOrganica) => ({
    ...prevOrganica,
    [name]: value,
  }));
};

/******************** TABELA ABRIL **********************/
const [abril, setAbril] = useState<IAbrilGH3>({
  id_Abril_GH3: 0,

  b_macho_menos_6meses_cn: "",
  b_femea_menos_6meses_cn: "",
  b_macho_6meses_a_1ano_cn: "",
  b_femea_6meses_a_1ano_cn: "",
  b_macho_mais1ano_menos2_cn: "",
  b_femea_mais1ano_menos2_cn: "",
  b_macho_mais_2anos_cn: "",
  b_femea_mais_2anos_cn: "",

  b_macho_menos_6meses_dias: "",
  b_femea_menos_6meses_dias: "",
  b_macho_6meses_a_1ano_dias: "",
  b_femea_6meses_a_1ano_dias: "",
  b_macho_mais1ano_menos2_dias: "",
  b_femea_mais1ano_menos2_dias: "",
  b_macho_mais_2anos_dias: "",
  b_femea_mais_2anos_dias: "",

  b_macho_menos_6meses_pastagem: "",
  b_femea_menos_6meses_pastagem: "",
  b_macho_6meses_a_1ano_pastagem: "",
  b_femea_6meses_a_1ano_pastagem: "",
  b_macho_mais1ano_menos2_pastagem: "",
  b_femea_mais1ano_menos2_pastagem: "",
  b_macho_mais_2anos_pastagem: "",
  b_femea_mais_2anos_pastagem: "",

  b_macho_menos_6meses_silagem: "",
  b_femea_menos_6meses_silagem: "",
  b_macho_6meses_a_1ano_silagem: "",
  b_femea_6meses_a_1ano_silagem: "",
  b_macho_mais1ano_menos2_silagem: "",
  b_femea_mais1ano_menos2_silagem: "",
  b_macho_mais_2anos_silagem: "",
  b_femea_mais_2anos_silagem: "",

  b_macho_menos_6meses_o_forragem: "",
  b_femea_menos_6meses_o_forragem: "",
  b_macho_6meses_a_1ano_o_forragem: "",
  b_femea_6meses_a_1ano_o_forragem: "",
  b_macho_mais1ano_menos2_o_forragem: "",
  b_femea_mais1ano_menos2_o_forragem: "",
  b_macho_mais_2anos_o_forragem: "",
  b_femea_mais_2anos_o_forragem: "",

  b_macho_menos_6meses_composto: "",
  b_femea_menos_6meses_composto: "",
  b_macho_6meses_a_1ano_composto: "",
  b_femea_6meses_a_1ano_composto: "",
  b_macho_mais1ano_menos2_composto: "",
  b_femea_mais1ano_menos2_composto: "",
  b_macho_mais_2anos_composto: "",
  b_femea_mais_2anos_composto: "",

  id_rosto: 0,
  last_update: "",
  create_date: "",
  uuid: "",
});

const handleInputChangeAbril = (event: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setAbril((prevOrganica) => ({
    ...prevOrganica,
    [name]: value,
  }));
};

/******************** TABELA MAIO **********************/
const [maio, setMaio] = useState<IMaioGH3>({
  id_Maio_GH3: 0,

  b_macho_menos_6meses_cn: "",
  b_femea_menos_6meses_cn: "",
  b_macho_6meses_a_1ano_cn: "",
  b_femea_6meses_a_1ano_cn: "",
  b_macho_mais1ano_menos2_cn: "",
  b_femea_mais1ano_menos2_cn: "",
  b_macho_mais_2anos_cn: "",
  b_femea_mais_2anos_cn: "",

  b_macho_menos_6meses_dias: "",
  b_femea_menos_6meses_dias: "",
  b_macho_6meses_a_1ano_dias: "",
  b_femea_6meses_a_1ano_dias: "",
  b_macho_mais1ano_menos2_dias: "",
  b_femea_mais1ano_menos2_dias: "",
  b_macho_mais_2anos_dias: "",
  b_femea_mais_2anos_dias: "",

  b_macho_menos_6meses_pastagem: "",
  b_femea_menos_6meses_pastagem: "",
  b_macho_6meses_a_1ano_pastagem: "",
  b_femea_6meses_a_1ano_pastagem: "",
  b_macho_mais1ano_menos2_pastagem: "",
  b_femea_mais1ano_menos2_pastagem: "",
  b_macho_mais_2anos_pastagem: "",
  b_femea_mais_2anos_pastagem: "",

  b_macho_menos_6meses_silagem: "",
  b_femea_menos_6meses_silagem: "",
  b_macho_6meses_a_1ano_silagem: "",
  b_femea_6meses_a_1ano_silagem: "",
  b_macho_mais1ano_menos2_silagem: "",
  b_femea_mais1ano_menos2_silagem: "",
  b_macho_mais_2anos_silagem: "",
  b_femea_mais_2anos_silagem: "",

  b_macho_menos_6meses_o_forragem: "",
  b_femea_menos_6meses_o_forragem: "",
  b_macho_6meses_a_1ano_o_forragem: "",
  b_femea_6meses_a_1ano_o_forragem: "",
  b_macho_mais1ano_menos2_o_forragem: "",
  b_femea_mais1ano_menos2_o_forragem: "",
  b_macho_mais_2anos_o_forragem: "",
  b_femea_mais_2anos_o_forragem: "",

  b_macho_menos_6meses_composto: "",
  b_femea_menos_6meses_composto: "",
  b_macho_6meses_a_1ano_composto: "",
  b_femea_6meses_a_1ano_composto: "",
  b_macho_mais1ano_menos2_composto: "",
  b_femea_mais1ano_menos2_composto: "",
  b_macho_mais_2anos_composto: "",
  b_femea_mais_2anos_composto: "",

  id_rosto: 0,
  last_update: "",
  create_date: "",
  uuid: "",
});

const handleInputChangeMaio = (event: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setMaio((prevOrganica) => ({
    ...prevOrganica,
    [name]: value,
  }));
};

/******************** TABELA JUNHO **********************/
const [junho, setJunho] = useState<IJunhoGH3>({
  id_Junho_GH3: 0,

  b_macho_menos_6meses_cn: "",
  b_femea_menos_6meses_cn: "",
  b_macho_6meses_a_1ano_cn: "",
  b_femea_6meses_a_1ano_cn: "",
  b_macho_mais1ano_menos2_cn: "",
  b_femea_mais1ano_menos2_cn: "",
  b_macho_mais_2anos_cn: "",
  b_femea_mais_2anos_cn: "",

  b_macho_menos_6meses_dias: "",
  b_femea_menos_6meses_dias: "",
  b_macho_6meses_a_1ano_dias: "",
  b_femea_6meses_a_1ano_dias: "",
  b_macho_mais1ano_menos2_dias: "",
  b_femea_mais1ano_menos2_dias: "",
  b_macho_mais_2anos_dias: "",
  b_femea_mais_2anos_dias: "",

  b_macho_menos_6meses_pastagem: "",
  b_femea_menos_6meses_pastagem: "",
  b_macho_6meses_a_1ano_pastagem: "",
  b_femea_6meses_a_1ano_pastagem: "",
  b_macho_mais1ano_menos2_pastagem: "",
  b_femea_mais1ano_menos2_pastagem: "",
  b_macho_mais_2anos_pastagem: "",
  b_femea_mais_2anos_pastagem: "",

  b_macho_menos_6meses_silagem: "",
  b_femea_menos_6meses_silagem: "",
  b_macho_6meses_a_1ano_silagem: "",
  b_femea_6meses_a_1ano_silagem: "",
  b_macho_mais1ano_menos2_silagem: "",
  b_femea_mais1ano_menos2_silagem: "",
  b_macho_mais_2anos_silagem: "",
  b_femea_mais_2anos_silagem: "",

  b_macho_menos_6meses_o_forragem: "",
  b_femea_menos_6meses_o_forragem: "",
  b_macho_6meses_a_1ano_o_forragem: "",
  b_femea_6meses_a_1ano_o_forragem: "",
  b_macho_mais1ano_menos2_o_forragem: "",
  b_femea_mais1ano_menos2_o_forragem: "",
  b_macho_mais_2anos_o_forragem: "",
  b_femea_mais_2anos_o_forragem: "",

  b_macho_menos_6meses_composto: "",
  b_femea_menos_6meses_composto: "",
  b_macho_6meses_a_1ano_composto: "",
  b_femea_6meses_a_1ano_composto: "",
  b_macho_mais1ano_menos2_composto: "",
  b_femea_mais1ano_menos2_composto: "",
  b_macho_mais_2anos_composto: "",
  b_femea_mais_2anos_composto: "",

  id_rosto: 0,
  last_update: "",
  create_date: "",
  uuid: "",
});

const handleInputChangeJunho = (event: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setJunho((prevOrganica) => ({
    ...prevOrganica,
    [name]: value,
  }));
};

/******************** TABELA JULHO **********************/
const [julho, setJulho] = useState<IJulhoGH3>({
  id_Julho_GH3: 0,

  b_macho_menos_6meses_cn: "",
  b_femea_menos_6meses_cn: "",
  b_macho_6meses_a_1ano_cn: "",
  b_femea_6meses_a_1ano_cn: "",
  b_macho_mais1ano_menos2_cn: "",
  b_femea_mais1ano_menos2_cn: "",
  b_macho_mais_2anos_cn: "",
  b_femea_mais_2anos_cn: "",

  b_macho_menos_6meses_dias: "",
  b_femea_menos_6meses_dias: "",
  b_macho_6meses_a_1ano_dias: "",
  b_femea_6meses_a_1ano_dias: "",
  b_macho_mais1ano_menos2_dias: "",
  b_femea_mais1ano_menos2_dias: "",
  b_macho_mais_2anos_dias: "",
  b_femea_mais_2anos_dias: "",

  b_macho_menos_6meses_pastagem: "",
  b_femea_menos_6meses_pastagem: "",
  b_macho_6meses_a_1ano_pastagem: "",
  b_femea_6meses_a_1ano_pastagem: "",
  b_macho_mais1ano_menos2_pastagem: "",
  b_femea_mais1ano_menos2_pastagem: "",
  b_macho_mais_2anos_pastagem: "",
  b_femea_mais_2anos_pastagem: "",

  b_macho_menos_6meses_silagem: "",
  b_femea_menos_6meses_silagem: "",
  b_macho_6meses_a_1ano_silagem: "",
  b_femea_6meses_a_1ano_silagem: "",
  b_macho_mais1ano_menos2_silagem: "",
  b_femea_mais1ano_menos2_silagem: "",
  b_macho_mais_2anos_silagem: "",
  b_femea_mais_2anos_silagem: "",

  b_macho_menos_6meses_o_forragem: "",
  b_femea_menos_6meses_o_forragem: "",
  b_macho_6meses_a_1ano_o_forragem: "",
  b_femea_6meses_a_1ano_o_forragem: "",
  b_macho_mais1ano_menos2_o_forragem: "",
  b_femea_mais1ano_menos2_o_forragem: "",
  b_macho_mais_2anos_o_forragem: "",
  b_femea_mais_2anos_o_forragem: "",

  b_macho_menos_6meses_composto: "",
  b_femea_menos_6meses_composto: "",
  b_macho_6meses_a_1ano_composto: "",
  b_femea_6meses_a_1ano_composto: "",
  b_macho_mais1ano_menos2_composto: "",
  b_femea_mais1ano_menos2_composto: "",
  b_macho_mais_2anos_composto: "",
  b_femea_mais_2anos_composto: "",

  id_rosto: 0,
  last_update: "",
  create_date: "",
  uuid: "",
});

const handleInputChangeJulho = (event: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setJulho((prevOrganica) => ({
    ...prevOrganica,
    [name]: value,
  }));
};

/******************** TABELA AGOSTO **********************/
const [agosto, setAgosto] = useState<IAgostoGH3>({
  id_Agosto_GH3: 0,

  b_macho_menos_6meses_cn: "",
  b_femea_menos_6meses_cn: "",
  b_macho_6meses_a_1ano_cn: "",
  b_femea_6meses_a_1ano_cn: "",
  b_macho_mais1ano_menos2_cn: "",
  b_femea_mais1ano_menos2_cn: "",
  b_macho_mais_2anos_cn: "",
  b_femea_mais_2anos_cn: "",

  b_macho_menos_6meses_dias: "",
  b_femea_menos_6meses_dias: "",
  b_macho_6meses_a_1ano_dias: "",
  b_femea_6meses_a_1ano_dias: "",
  b_macho_mais1ano_menos2_dias: "",
  b_femea_mais1ano_menos2_dias: "",
  b_macho_mais_2anos_dias: "",
  b_femea_mais_2anos_dias: "",

  b_macho_menos_6meses_pastagem: "",
  b_femea_menos_6meses_pastagem: "",
  b_macho_6meses_a_1ano_pastagem: "",
  b_femea_6meses_a_1ano_pastagem: "",
  b_macho_mais1ano_menos2_pastagem: "",
  b_femea_mais1ano_menos2_pastagem: "",
  b_macho_mais_2anos_pastagem: "",
  b_femea_mais_2anos_pastagem: "",

  b_macho_menos_6meses_silagem: "",
  b_femea_menos_6meses_silagem: "",
  b_macho_6meses_a_1ano_silagem: "",
  b_femea_6meses_a_1ano_silagem: "",
  b_macho_mais1ano_menos2_silagem: "",
  b_femea_mais1ano_menos2_silagem: "",
  b_macho_mais_2anos_silagem: "",
  b_femea_mais_2anos_silagem: "",

  b_macho_menos_6meses_o_forragem: "",
  b_femea_menos_6meses_o_forragem: "",
  b_macho_6meses_a_1ano_o_forragem: "",
  b_femea_6meses_a_1ano_o_forragem: "",
  b_macho_mais1ano_menos2_o_forragem: "",
  b_femea_mais1ano_menos2_o_forragem: "",
  b_macho_mais_2anos_o_forragem: "",
  b_femea_mais_2anos_o_forragem: "",

  b_macho_menos_6meses_composto: "",
  b_femea_menos_6meses_composto: "",
  b_macho_6meses_a_1ano_composto: "",
  b_femea_6meses_a_1ano_composto: "",
  b_macho_mais1ano_menos2_composto: "",
  b_femea_mais1ano_menos2_composto: "",
  b_macho_mais_2anos_composto: "",
  b_femea_mais_2anos_composto: "",

  id_rosto: 0,
  last_update: "",
  create_date: "",
  uuid: "",
});

const handleInputChangeAgosto = (event: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setAgosto((prevOrganica) => ({
    ...prevOrganica,
    [name]: value,
  }));
};

/******************** TABELA Setembro **********************/
const [setembro, setSetembro] = useState<ISetembroGH3>({
  id_Setembro_GH3: 0,

  b_macho_menos_6meses_cn: "",
  b_femea_menos_6meses_cn: "",
  b_macho_6meses_a_1ano_cn: "",
  b_femea_6meses_a_1ano_cn: "",
  b_macho_mais1ano_menos2_cn: "",
  b_femea_mais1ano_menos2_cn: "",
  b_macho_mais_2anos_cn: "",
  b_femea_mais_2anos_cn: "",

  b_macho_menos_6meses_dias: "",
  b_femea_menos_6meses_dias: "",
  b_macho_6meses_a_1ano_dias: "",
  b_femea_6meses_a_1ano_dias: "",
  b_macho_mais1ano_menos2_dias: "",
  b_femea_mais1ano_menos2_dias: "",
  b_macho_mais_2anos_dias: "",
  b_femea_mais_2anos_dias: "",

  b_macho_menos_6meses_pastagem: "",
  b_femea_menos_6meses_pastagem: "",
  b_macho_6meses_a_1ano_pastagem: "",
  b_femea_6meses_a_1ano_pastagem: "",
  b_macho_mais1ano_menos2_pastagem: "",
  b_femea_mais1ano_menos2_pastagem: "",
  b_macho_mais_2anos_pastagem: "",
  b_femea_mais_2anos_pastagem: "",

  b_macho_menos_6meses_silagem: "",
  b_femea_menos_6meses_silagem: "",
  b_macho_6meses_a_1ano_silagem: "",
  b_femea_6meses_a_1ano_silagem: "",
  b_macho_mais1ano_menos2_silagem: "",
  b_femea_mais1ano_menos2_silagem: "",
  b_macho_mais_2anos_silagem: "",
  b_femea_mais_2anos_silagem: "",

  b_macho_menos_6meses_o_forragem: "",
  b_femea_menos_6meses_o_forragem: "",
  b_macho_6meses_a_1ano_o_forragem: "",
  b_femea_6meses_a_1ano_o_forragem: "",
  b_macho_mais1ano_menos2_o_forragem: "",
  b_femea_mais1ano_menos2_o_forragem: "",
  b_macho_mais_2anos_o_forragem: "",
  b_femea_mais_2anos_o_forragem: "",

  b_macho_menos_6meses_composto: "",
  b_femea_menos_6meses_composto: "",
  b_macho_6meses_a_1ano_composto: "",
  b_femea_6meses_a_1ano_composto: "",
  b_macho_mais1ano_menos2_composto: "",
  b_femea_mais1ano_menos2_composto: "",
  b_macho_mais_2anos_composto: "",
  b_femea_mais_2anos_composto: "",

  id_rosto: 0,
  last_update: "",
  create_date: "",
  uuid: "",
});

const handleInputChangeSetembro = (event: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setSetembro((prevOrganica) => ({
    ...prevOrganica,
    [name]: value,
  }));
};

/******************** TABELA OUTUBRO **********************/
const [outubro, setOutubro] = useState<IOutubroGH3>({
  id_Outubro_GH3: 0,

  b_macho_menos_6meses_cn: "",
  b_femea_menos_6meses_cn: "",
  b_macho_6meses_a_1ano_cn: "",
  b_femea_6meses_a_1ano_cn: "",
  b_macho_mais1ano_menos2_cn: "",
  b_femea_mais1ano_menos2_cn: "",
  b_macho_mais_2anos_cn: "",
  b_femea_mais_2anos_cn: "",

  b_macho_menos_6meses_dias: "",
  b_femea_menos_6meses_dias: "",
  b_macho_6meses_a_1ano_dias: "",
  b_femea_6meses_a_1ano_dias: "",
  b_macho_mais1ano_menos2_dias: "",
  b_femea_mais1ano_menos2_dias: "",
  b_macho_mais_2anos_dias: "",
  b_femea_mais_2anos_dias: "",

  b_macho_menos_6meses_pastagem: "",
  b_femea_menos_6meses_pastagem: "",
  b_macho_6meses_a_1ano_pastagem: "",
  b_femea_6meses_a_1ano_pastagem: "",
  b_macho_mais1ano_menos2_pastagem: "",
  b_femea_mais1ano_menos2_pastagem: "",
  b_macho_mais_2anos_pastagem: "",
  b_femea_mais_2anos_pastagem: "",

  b_macho_menos_6meses_silagem: "",
  b_femea_menos_6meses_silagem: "",
  b_macho_6meses_a_1ano_silagem: "",
  b_femea_6meses_a_1ano_silagem: "",
  b_macho_mais1ano_menos2_silagem: "",
  b_femea_mais1ano_menos2_silagem: "",
  b_macho_mais_2anos_silagem: "",
  b_femea_mais_2anos_silagem: "",

  b_macho_menos_6meses_o_forragem: "",
  b_femea_menos_6meses_o_forragem: "",
  b_macho_6meses_a_1ano_o_forragem: "",
  b_femea_6meses_a_1ano_o_forragem: "",
  b_macho_mais1ano_menos2_o_forragem: "",
  b_femea_mais1ano_menos2_o_forragem: "",
  b_macho_mais_2anos_o_forragem: "",
  b_femea_mais_2anos_o_forragem: "",

  b_macho_menos_6meses_composto: "",
  b_femea_menos_6meses_composto: "",
  b_macho_6meses_a_1ano_composto: "",
  b_femea_6meses_a_1ano_composto: "",
  b_macho_mais1ano_menos2_composto: "",
  b_femea_mais1ano_menos2_composto: "",
  b_macho_mais_2anos_composto: "",
  b_femea_mais_2anos_composto: "",

  id_rosto: 0,
  last_update: "",
  create_date: "",
  uuid: "",
});

const handleInputChangeOutubro = (event: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setOutubro((prevOrganica) => ({
    ...prevOrganica,
    [name]: value,
  }));
};

/******************** TABELA NOVEMBRO **********************/
const [novembro, setNovembro] = useState<INovembroGH3>({
  id_Novembro_GH3: 0,

  b_macho_menos_6meses_cn: "",
  b_femea_menos_6meses_cn: "",
  b_macho_6meses_a_1ano_cn: "",
  b_femea_6meses_a_1ano_cn: "",
  b_macho_mais1ano_menos2_cn: "",
  b_femea_mais1ano_menos2_cn: "",
  b_macho_mais_2anos_cn: "",
  b_femea_mais_2anos_cn: "",

  b_macho_menos_6meses_dias: "",
  b_femea_menos_6meses_dias: "",
  b_macho_6meses_a_1ano_dias: "",
  b_femea_6meses_a_1ano_dias: "",
  b_macho_mais1ano_menos2_dias: "",
  b_femea_mais1ano_menos2_dias: "",
  b_macho_mais_2anos_dias: "",
  b_femea_mais_2anos_dias: "",

  b_macho_menos_6meses_pastagem: "",
  b_femea_menos_6meses_pastagem: "",
  b_macho_6meses_a_1ano_pastagem: "",
  b_femea_6meses_a_1ano_pastagem: "",
  b_macho_mais1ano_menos2_pastagem: "",
  b_femea_mais1ano_menos2_pastagem: "",
  b_macho_mais_2anos_pastagem: "",
  b_femea_mais_2anos_pastagem: "",

  b_macho_menos_6meses_silagem: "",
  b_femea_menos_6meses_silagem: "",
  b_macho_6meses_a_1ano_silagem: "",
  b_femea_6meses_a_1ano_silagem: "",
  b_macho_mais1ano_menos2_silagem: "",
  b_femea_mais1ano_menos2_silagem: "",
  b_macho_mais_2anos_silagem: "",
  b_femea_mais_2anos_silagem: "",

  b_macho_menos_6meses_o_forragem: "",
  b_femea_menos_6meses_o_forragem: "",
  b_macho_6meses_a_1ano_o_forragem: "",
  b_femea_6meses_a_1ano_o_forragem: "",
  b_macho_mais1ano_menos2_o_forragem: "",
  b_femea_mais1ano_menos2_o_forragem: "",
  b_macho_mais_2anos_o_forragem: "",
  b_femea_mais_2anos_o_forragem: "",

  b_macho_menos_6meses_composto: "",
  b_femea_menos_6meses_composto: "",
  b_macho_6meses_a_1ano_composto: "",
  b_femea_6meses_a_1ano_composto: "",
  b_macho_mais1ano_menos2_composto: "",
  b_femea_mais1ano_menos2_composto: "",
  b_macho_mais_2anos_composto: "",
  b_femea_mais_2anos_composto: "",

  id_rosto: 0,
  last_update: "",
  create_date: "",
  uuid: "",
});

const handleInputChangeNovembro = (event: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setNovembro((prevOrganica) => ({
    ...prevOrganica,
    [name]: value,
  }));
};

/******************** TABELA NOVEMBRO **********************/
const [dezembro, setDezembro] = useState<IDezembroGH3>({
  id_Dezembro_GH3: 0,

  b_macho_menos_6meses_cn: "",
  b_femea_menos_6meses_cn: "",
  b_macho_6meses_a_1ano_cn: "",
  b_femea_6meses_a_1ano_cn: "",
  b_macho_mais1ano_menos2_cn: "",
  b_femea_mais1ano_menos2_cn: "",
  b_macho_mais_2anos_cn: "",
  b_femea_mais_2anos_cn: "",

  b_macho_menos_6meses_dias: "",
  b_femea_menos_6meses_dias: "",
  b_macho_6meses_a_1ano_dias: "",
  b_femea_6meses_a_1ano_dias: "",
  b_macho_mais1ano_menos2_dias: "",
  b_femea_mais1ano_menos2_dias: "",
  b_macho_mais_2anos_dias: "",
  b_femea_mais_2anos_dias: "",

  b_macho_menos_6meses_pastagem: "",
  b_femea_menos_6meses_pastagem: "",
  b_macho_6meses_a_1ano_pastagem: "",
  b_femea_6meses_a_1ano_pastagem: "",
  b_macho_mais1ano_menos2_pastagem: "",
  b_femea_mais1ano_menos2_pastagem: "",
  b_macho_mais_2anos_pastagem: "",
  b_femea_mais_2anos_pastagem: "",

  b_macho_menos_6meses_silagem: "",
  b_femea_menos_6meses_silagem: "",
  b_macho_6meses_a_1ano_silagem: "",
  b_femea_6meses_a_1ano_silagem: "",
  b_macho_mais1ano_menos2_silagem: "",
  b_femea_mais1ano_menos2_silagem: "",
  b_macho_mais_2anos_silagem: "",
  b_femea_mais_2anos_silagem: "",

  b_macho_menos_6meses_o_forragem: "",
  b_femea_menos_6meses_o_forragem: "",
  b_macho_6meses_a_1ano_o_forragem: "",
  b_femea_6meses_a_1ano_o_forragem: "",
  b_macho_mais1ano_menos2_o_forragem: "",
  b_femea_mais1ano_menos2_o_forragem: "",
  b_macho_mais_2anos_o_forragem: "",
  b_femea_mais_2anos_o_forragem: "",

  b_macho_menos_6meses_composto: "",
  b_femea_menos_6meses_composto: "",
  b_macho_6meses_a_1ano_composto: "",
  b_femea_6meses_a_1ano_composto: "",
  b_macho_mais1ano_menos2_composto: "",
  b_femea_mais1ano_menos2_composto: "",
  b_macho_mais_2anos_composto: "",
  b_femea_mais_2anos_composto: "",

  id_rosto: 0,
  last_update: "",
  create_date: "",
  uuid: "",
});

const handleInputChangeDezembro = (event: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setDezembro((prevOrganica) => ({
    ...prevOrganica,
    [name]: value,
  }));
};



  return (
    <div className={classes.root}>
      <CadernoLayout title="Grupo Homogêneo 3" />
      <main className={classes.contents}>
        <div className={classes.toolbars} />

        <Box width="80%" margin="auto">
          <Beneficiario_nome_id_alinhado_direita />
        </Box>

        {isloading ? (
          <LoadingVulpes />
        ) : (
          <ThemeProvider theme={theme}>
          <TableContainer
        
          >
            <Box>
              <Typography
                style={{
                  fontWeight: 700,
                  fontSize: 20,
                  fontFamily: "candara",
                  paddingLeft: 5,
                }}
              >
                CC - Grupo Homogêneo 3
              </Typography>
            </Box>
            <TabelaBalancoGH3
              tabela={balanco}
              onInputChange={handleInputChangeBalanco}
            />
            <TabelaJaneiroGH3 tabela={janeiro} onInputChange={handleInputChangejaneiro} />
            <TabelafevereiroGH3 tabela={fevereiro} onInputChange={handleInputChangeFevereiro } />
            <TabelamarcoGH3 tabela={marco} onInputChange={handleInputChangemarco} />
            <TabelaAbrilGH3 tabela={abril} onInputChange={handleInputChangeAbril} />
            <TabelaMaioGH3 tabela={maio} onInputChange={handleInputChangeMaio} />
            <TabelaJunhoGH3 tabela={junho} onInputChange={handleInputChangeJunho} />
            <TabelaJulhoGH3 tabela={julho} onInputChange={handleInputChangeJulho} />
            <TabelaAgostoGH3 tabela={agosto} onInputChange={handleInputChangeAgosto} />
            <TabelaSetembroGH3 tabela={setembro} onInputChange={handleInputChangeSetembro} />
            <TabelaOutubroGH3 tabela={outubro} onInputChange={handleInputChangeOutubro} />
            <TabelaNovembroGH3 tabela={novembro} onInputChange={handleInputChangeNovembro} />
            <TabelaDezembroGH3 tabela={dezembro} onInputChange={handleInputChangeDezembro} />        
          </TableContainer>
          </ThemeProvider>
        )}
        <Box height={150}></Box>
      </main>
    </div>
  );
}
