import React, { ChangeEvent, useEffect, useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper, Snackbar, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Box } from "@mui/material";
import CadernoLayout from "../../../Styles/layout/cadernoLayout";
import { del, get, post } from "../../../Services/tokenConfig";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { CabecalhoRegaForm } from "./cabecalhoRega";
import { TabelaCalendarioRega } from "./tableRega";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import LoadingVulpes from "../../../Styles/Loader/loading";
import { CustomThemeProvider } from "../../../Styles/theme/customThemeprovider";
import { useLocation } from "react-router-dom";
import { func_print } from "../../../Func_genericas/func_print";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { CreateTabelaRega } from "./table_create";
import { TabelaCalendarioRegaHome } from "./tableRegaHome";
import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
import { ICabecalho, IPage6 } from "../../../Interfaces/cadernos/caderno6";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    contents: {
      flexGrow: 1,
      padding: theme.spacing(0),
    },
    toolbars: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(2, 3),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },

    label: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
        minWidth: 325,
      },
    },
  })
);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref}
    //  variant="filled"
    {...props} />;
});

export default function RegCalRega() {
  const classes = useStyles();
  const location = useLocation();

  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<boolean>(false);
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);

  const [, setIndex] = useState(0); // index da zona homegénea
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0); // grava o index da zona homogénea selecionada
  const [editRow, setEditRow] = useState(false);
  const [idCabecalho, setIdCabecalho] = useState(0);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [create, setCreate] = useState(false);

  const [cabecalhos, setCabecalhos] = useState<ICabecalho[]>([]);

  const [tabelas, setTabelas] = useState<IPage6[]>([]);
  const [tabela, setTabela] = useState<IPage6 | undefined>();


  const [error_capacidade_utili, set_capacidade_utili] = useState<boolean>(false);
  const [error_reserva_facilmente_utiliz, set_reserva_facilmente_utiliz] = useState<boolean>(false);
  const [error_semana_n, set_semana_n] = useState<boolean>(false);
  const [error_prefundidad_radi_camp_1, set_prefundidad_radi_camp_1] = useState<boolean>(false);
  const [error_prefundidad_radi_camp_2, set_prefundidad_radi_camp_2] = useState<boolean>(false);
  const [error_prefundidad_radi_camp_3, set_prefundidad_radi_camp_3] = useState<boolean>(false);
  const [error_prefundidad_radi_camp_4, set_prefundidad_radi_camp_4] = useState<boolean>(false);
  const [error_prefundidad_radi_camp_5, set_prefundidad_radi_camp_5] = useState<boolean>(false);
  const [error_prefundidad_radi_camp_6, set_prefundidad_radi_camp_6] = useState<boolean>(false);
  const [error_prefundidad_radi_camp_7, set_prefundidad_radi_camp_7] = useState<boolean>(false);
  const [error_capacidade_campo_camp_1, set_capacidade_campo_camp_1] = useState<boolean>(false);
  const [error_capacidade_campo_camp_2, set_capacidade_campo_camp_2] = useState<boolean>(false);
  const [error_capacidade_campo_camp_3, set_capacidade_campo_camp_3] = useState<boolean>(false);
  const [error_capacidade_campo_camp_4, set_capacidade_campo_camp_4] = useState<boolean>(false);
  const [error_capacidade_campo_camp_5, set_capacidade_campo_camp_5] = useState<boolean>(false);
  const [error_capacidade_campo_camp_6, set_capacidade_campo_camp_6] = useState<boolean>(false);
  const [error_capacidade_campo_camp_7, set_capacidade_campo_camp_7] = useState<boolean>(false);
  const [error_teor_crit_cul_camp_1, set_teor_crit_cul_camp_1] = useState<boolean>(false);
  const [error_teor_crit_cul_camp_2, set_teor_crit_cul_camp_2] = useState<boolean>(false);
  const [error_teor_crit_cul_camp_3, set_teor_crit_cul_camp_3] = useState<boolean>(false);
  const [error_teor_crit_cul_camp_4, set_teor_crit_cul_camp_4] = useState<boolean>(false);
  const [error_teor_crit_cul_camp_5, set_teor_crit_cul_camp_5] = useState<boolean>(false);
  const [error_teor_crit_cul_camp_6, set_teor_crit_cul_camp_6] = useState<boolean>(false);
  const [error_teor_crit_cul_camp_7, set_teor_crit_cul_camp_7] = useState<boolean>(false);
  const [error_teor_agua_inicio_camp_1, set_teor_agua_inicio_camp_1] = useState<boolean>(false);
  const [error_teor_agua_inicio_camp_2, set_teor_agua_inicio_camp_2] = useState<boolean>(false);
  const [error_teor_agua_inicio_camp_3, set_teor_agua_inicio_camp_3] = useState<boolean>(false);
  const [error_teor_agua_inicio_camp_4, set_teor_agua_inicio_camp_4] = useState<boolean>(false);
  const [error_teor_agua_inicio_camp_5, set_teor_agua_inicio_camp_5] = useState<boolean>(false);
  const [error_teor_agua_inicio_camp_6, set_teor_agua_inicio_camp_6] = useState<boolean>(false);
  const [error_teor_agua_inicio_camp_7, set_teor_agua_inicio_camp_7] = useState<boolean>(false);
  const [error_eto_camp_1, set_eto_camp_1] = useState<boolean>(false);
  const [error_eto_camp_2, set_eto_camp_2] = useState<boolean>(false);
  const [error_eto_camp_3, set_eto_camp_3] = useState<boolean>(false);
  const [error_eto_camp_4, set_eto_camp_4] = useState<boolean>(false);
  const [error_eto_camp_5, set_eto_camp_5] = useState<boolean>(false);
  const [error_eto_camp_6, set_eto_camp_6] = useState<boolean>(false);
  const [error_eto_camp_7, set_eto_camp_7] = useState<boolean>(false);
  const [error_kc_camp_1, set_kc_camp_1] = useState<boolean>(false);
  const [error_kc_camp_2, set_kc_camp_2] = useState<boolean>(false);
  const [error_kc_camp_3, set_kc_camp_3] = useState<boolean>(false);
  const [error_kc_camp_4, set_kc_camp_4] = useState<boolean>(false);
  const [error_kc_camp_5, set_kc_camp_5] = useState<boolean>(false);
  const [error_kc_camp_6, set_kc_camp_6] = useState<boolean>(false);
  const [error_kc_camp_7, set_kc_camp_7] = useState<boolean>(false);
  const [error_etc_camp_1, set_etc_camp_1] = useState<boolean>(false);
  const [error_etc_camp_2, set_etc_camp_2] = useState<boolean>(false);
  const [error_etc_camp_3, set_etc_camp_3] = useState<boolean>(false);
  const [error_etc_camp_4, set_etc_camp_4] = useState<boolean>(false);
  const [error_etc_camp_5, set_etc_camp_5] = useState<boolean>(false);
  const [error_etc_camp_6, set_etc_camp_6] = useState<boolean>(false);
  const [error_etc_camp_7, set_etc_camp_7] = useState<boolean>(false);
  const [error_precipita_t_camp_1, set_precipita_t_camp_1] = useState<boolean>(false);
  const [error_precipita_t_camp_2, set_precipita_t_camp_2] = useState<boolean>(false);
  const [error_precipita_t_camp_3, set_precipita_t_camp_3] = useState<boolean>(false);
  const [error_precipita_t_camp_4, set_precipita_t_camp_4] = useState<boolean>(false);
  const [error_precipita_t_camp_5, set_precipita_t_camp_5] = useState<boolean>(false);
  const [error_precipita_t_camp_6, set_precipita_t_camp_6] = useState<boolean>(false);
  const [error_precipita_t_camp_7, set_precipita_t_camp_7] = useState<boolean>(false);
  const [error_variacao_agu_camp_1, set_variacao_agu_camp_1] = useState<boolean>(false);
  const [error_variacao_agu_camp_2, set_variacao_agu_camp_2] = useState<boolean>(false);
  const [error_variacao_agu_camp_3, set_variacao_agu_camp_3] = useState<boolean>(false);
  const [error_variacao_agu_camp_4, set_variacao_agu_camp_4] = useState<boolean>(false);
  const [error_variacao_agu_camp_5, set_variacao_agu_camp_5] = useState<boolean>(false);
  const [error_variacao_agu_camp_6, set_variacao_agu_camp_6] = useState<boolean>(false);
  const [error_variacao_agu_camp_7, set_variacao_agu_camp_7] = useState<boolean>(false);
  const [error_teor_agua_solo_s_rega_camp_1, set_teor_agua_solo_s_rega_camp_1] = useState<boolean>(false);
  const [error_teor_agua_solo_s_rega_camp_2, set_teor_agua_solo_s_rega_camp_2] = useState<boolean>(false);
  const [error_teor_agua_solo_s_rega_camp_3, set_teor_agua_solo_s_rega_camp_3] = useState<boolean>(false);
  const [error_teor_agua_solo_s_rega_camp_4, set_teor_agua_solo_s_rega_camp_4] = useState<boolean>(false);
  const [error_teor_agua_solo_s_rega_camp_5, set_teor_agua_solo_s_rega_camp_5] = useState<boolean>(false);
  const [error_teor_agua_solo_s_rega_camp_6, set_teor_agua_solo_s_rega_camp_6] = useState<boolean>(false);
  const [error_teor_agua_solo_s_rega_camp_7, set_teor_agua_solo_s_rega_camp_7] = useState<boolean>(false);
  const [error_leitura_sonda_1_camp_1, set_leitura_sonda_1_camp_1] = useState<boolean>(false);
  const [error_leitura_sonda_1_camp_2, set_leitura_sonda_1_camp_2] = useState<boolean>(false);
  const [error_leitura_sonda_1_camp_3, set_leitura_sonda_1_camp_3] = useState<boolean>(false);
  const [error_leitura_sonda_1_camp_4, set_leitura_sonda_1_camp_4] = useState<boolean>(false);
  const [error_leitura_sonda_1_camp_5, set_leitura_sonda_1_camp_5] = useState<boolean>(false);
  const [error_leitura_sonda_1_camp_6, set_leitura_sonda_1_camp_6] = useState<boolean>(false);
  const [error_leitura_sonda_1_camp_7, set_leitura_sonda_1_camp_7] = useState<boolean>(false);
  const [error_leitura_sonda_2_camp_1, set_leitura_sonda_2_camp_1] = useState<boolean>(false);
  const [error_leitura_sonda_2_camp_2, set_leitura_sonda_2_camp_2] = useState<boolean>(false);
  const [error_leitura_sonda_2_camp_3, set_leitura_sonda_2_camp_3] = useState<boolean>(false);
  const [error_leitura_sonda_2_camp_4, set_leitura_sonda_2_camp_4] = useState<boolean>(false);
  const [error_leitura_sonda_2_camp_5, set_leitura_sonda_2_camp_5] = useState<boolean>(false);
  const [error_leitura_sonda_2_camp_6, set_leitura_sonda_2_camp_6] = useState<boolean>(false);
  const [error_leitura_sonda_2_camp_7, set_leitura_sonda_2_camp_7] = useState<boolean>(false);
  const [error_folga_prox_rega_camp_1, set_folga_prox_rega_camp_1] = useState<boolean>(false);
  const [error_folga_prox_rega_camp_2, set_folga_prox_rega_camp_2] = useState<boolean>(false);
  const [error_folga_prox_rega_camp_3, set_folga_prox_rega_camp_3] = useState<boolean>(false);
  const [error_folga_prox_rega_camp_4, set_folga_prox_rega_camp_4] = useState<boolean>(false);
  const [error_folga_prox_rega_camp_5, set_folga_prox_rega_camp_5] = useState<boolean>(false);
  const [error_folga_prox_rega_camp_6, set_folga_prox_rega_camp_6] = useState<boolean>(false);
  const [error_folga_prox_rega_camp_7, set_folga_prox_rega_camp_7] = useState<boolean>(false);
  const [error_rega_leitura_camp_1, set_rega_leitura_camp_1] = useState<boolean>(false);
  const [error_rega_leitura_camp_2, set_rega_leitura_camp_2] = useState<boolean>(false);
  const [error_rega_leitura_camp_3, set_rega_leitura_camp_3] = useState<boolean>(false);
  const [error_rega_leitura_camp_4, set_rega_leitura_camp_4] = useState<boolean>(false);
  const [error_rega_leitura_camp_5, set_rega_leitura_camp_5] = useState<boolean>(false);
  const [error_rega_leitura_camp_6, set_rega_leitura_camp_6] = useState<boolean>(false);
  const [error_rega_leitura_camp_7, set_rega_leitura_camp_7] = useState<boolean>(false);
  const [error_rega_dose_total_camp_1, set_rega_dose_total_camp_1] = useState<boolean>(false);
  const [error_rega_dose_total_camp_2, set_rega_dose_total_camp_2] = useState<boolean>(false);
  const [error_rega_dose_total_camp_3, set_rega_dose_total_camp_3] = useState<boolean>(false);
  const [error_rega_dose_total_camp_4, set_rega_dose_total_camp_4] = useState<boolean>(false);
  const [error_rega_dose_total_camp_5, set_rega_dose_total_camp_5] = useState<boolean>(false);
  const [error_rega_dose_total_camp_6, set_rega_dose_total_camp_6] = useState<boolean>(false);
  const [error_rega_dose_total_camp_7, set_rega_dose_total_camp_7] = useState<boolean>(false);
  const [error_rega_dose_util_camp_1, set_rega_dose_util_camp_1] = useState<boolean>(false);
  const [error_rega_dose_util_camp_2, set_rega_dose_util_camp_2] = useState<boolean>(false);
  const [error_rega_dose_util_camp_3, set_rega_dose_util_camp_3] = useState<boolean>(false);
  const [error_rega_dose_util_camp_4, set_rega_dose_util_camp_4] = useState<boolean>(false);
  const [error_rega_dose_util_camp_5, set_rega_dose_util_camp_5] = useState<boolean>(false);
  const [error_rega_dose_util_camp_6, set_rega_dose_util_camp_6] = useState<boolean>(false);
  const [error_rega_dose_util_camp_7, set_rega_dose_util_camp_7] = useState<boolean>(false);
  const [error_teor_agua_solo_1_camp_1, set_teor_agua_solo_1_camp_1] = useState<boolean>(false);
  const [error_teor_agua_solo_1_camp_2, set_teor_agua_solo_1_camp_2] = useState<boolean>(false);
  const [error_teor_agua_solo_1_camp_3, set_teor_agua_solo_1_camp_3] = useState<boolean>(false);
  const [error_teor_agua_solo_1_camp_4, set_teor_agua_solo_1_camp_4] = useState<boolean>(false);
  const [error_teor_agua_solo_1_camp_5, set_teor_agua_solo_1_camp_5] = useState<boolean>(false);
  const [error_teor_agua_solo_1_camp_6, set_teor_agua_solo_1_camp_6] = useState<boolean>(false);
  const [error_teor_agua_solo_1_camp_7, set_teor_agua_solo_1_camp_7] = useState<boolean>(false);
  const [error_perda_agua_camp_1, set_perda_agua_camp_1] = useState<boolean>(false);
  const [error_perda_agua_camp_2, set_perda_agua_camp_2] = useState<boolean>(false);
  const [error_perda_agua_camp_3, set_perda_agua_camp_3] = useState<boolean>(false);
  const [error_perda_agua_camp_4, set_perda_agua_camp_4] = useState<boolean>(false);
  const [error_perda_agua_camp_5, set_perda_agua_camp_5] = useState<boolean>(false);
  const [error_perda_agua_camp_6, set_perda_agua_camp_6] = useState<boolean>(false);
  const [error_perda_agua_camp_7, set_perda_agua_camp_7] = useState<boolean>(false);
  const [error_ident_camp2, set_ident_camp2] = useState<boolean>(false);
  const [error_ident_camp4, set_ident_camp4] = useState<boolean>(false);


  const handleSelectZona = (index: number, idZonaHomo: any) => {
    setSelectedIndex(index);
    setIndex(idZonaHomo);
    setIdCabecalho(idZonaHomo);
  };

  /**************************** CABEÇALHO **********************************************************************/
  async function getCabecalho() {

    try {
      let res = await get(`/get_reg_horario_rega_seis_cabecalho_rosto/${location.state.id_rosto}`);

      if (res.status === 200) {
        const sortedData = res.data.result.sort((a: any, b: any) => {
          if (a.zona_homo < b.zona_homo) return -1;
          if (a.zona_homo > b.zona_homo) return 1;
          return 0;
        });
        setCabecalhos(sortedData);
        setIdCabecalho(sortedData[0].id_horario_rega);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("getCabecalho", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      await getCabecalho();
    })();
  }, []);


  const handleUpdateCabecalho = async () => {
    if (selectedIndex !== null) {
      const cabecalhoToUpdate = cabecalhos[selectedIndex];

      if (!cabecalhoToUpdate) {
        setMessage("Não encontrado!");
        setOpenSnackError(true);
        return;
      }

      try {
        setIsLoading(true);
        let res = await post("update_reg_horario_rega_seis_cabecalho", { payload: cabecalhoToUpdate });
        if (res.status === 200) {
          setMessage("Atualizado com sucesso!");
          const updatedCabecalho =
            cabecalhos.map((cab) => {
              if (cabecalhoToUpdate.id_horario_rega !== cab.id_horario_rega) {
                return { ...cab };
              } else {
                return res.data.result
              }
            }
            );
          setCabecalhos(updatedCabecalho);
          setCreate(false);
          setOpenSnackSuccess(true);
        } else {
          setMessage("Erro ao atualizar o cabeçalho!");
          setOpenSnackError(true);
        }
        setIsLoading(false);
      } catch (error) {
        func_print("handleUpdateCabecalho", error, true);
        setMessage("Erro ao atualizar o cabeçalho!");
        setOpenSnackError(true);
        setIsLoading(false);
      }
    }
  };

  /************************** TABLE *************************************************************/
  async function getTabela(id: number) {
    setIsLoading(true);
    try {
      if (idCabecalho !== undefined) {
        let res = await get(`/get_reg_horario_rega_seis_cabecalho/${id}`);
        if (res.status === 200) {
          setTabelas(res.data.result);
        }
      };
      setIsLoading(false);
    } catch (error) {
      func_print("getTabela", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      await getTabela(idCabecalho);
    })();
  }, [idCabecalho]);

  // Criar
  const handleAddNew = () => {
    setTabela((row: any) => ({
      ...row,
      id_horario_rega: idCabecalho
    }));
    setCreate(true);
  }
  const onInputChangeTabela = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;

    if (name === "prefundidad_radi_camp_1") {
      if (isNaN(Number(value))) {
        set_prefundidad_radi_camp_1(true);
        return;
      } else {
        set_prefundidad_radi_camp_1(false);
      }
    }
    if (name === "prefundidad_radi_camp_2") {
      if (isNaN(Number(value))) {
        set_prefundidad_radi_camp_2(true);
        return;
      } else {
        set_prefundidad_radi_camp_2(false);
      }
    }
    if (name === "prefundidad_radi_camp_3") {
      if (isNaN(Number(value))) {
        set_prefundidad_radi_camp_3(true);
        return;
      } else {
        set_prefundidad_radi_camp_3(false);
      }
    }
    if (name === "prefundidad_radi_camp_4") {
      if (isNaN(Number(value))) {
        set_prefundidad_radi_camp_4(true);
        return;
      } else {
        set_prefundidad_radi_camp_4(false);
      }
    }
    if (name === "prefundidad_radi_camp_5") {
      if (isNaN(Number(value))) {
        set_prefundidad_radi_camp_5(true);
        return;
      } else {
        set_prefundidad_radi_camp_5(false);
      }
    }
    if (name === "prefundidad_radi_camp_6") {
      if (isNaN(Number(value))) {
        set_prefundidad_radi_camp_6(true);
        return;
      } else {
        set_prefundidad_radi_camp_6(false);
      }
    }
    if (name === "prefundidad_radi_camp_7") {
      if (isNaN(Number(value))) {
        set_prefundidad_radi_camp_7(true);
        return;
      } else {
        set_prefundidad_radi_camp_7(false);
      }
    }
    if (name === "capacidade_campo_camp_1") {
      if (isNaN(Number(value))) {
        set_capacidade_campo_camp_1(true);
        return;
      } else {
        set_capacidade_campo_camp_1(false);
      }
    }
    if (name === "capacidade_campo_camp_2") {
      if (isNaN(Number(value))) {
        set_capacidade_campo_camp_2(true);
        return;
      } else {
        set_capacidade_campo_camp_2(false);
      }
    }
    if (name === "capacidade_campo_camp_3") {
      if (isNaN(Number(value))) {
        set_capacidade_campo_camp_3(true);
        return;
      } else {
        set_capacidade_campo_camp_3(false);
      }
    }
    if (name === "capacidade_campo_camp_4") {
      if (isNaN(Number(value))) {
        set_capacidade_campo_camp_4(true);
        return;
      } else {
        set_capacidade_campo_camp_4(false);
      }
    }
    if (name === "capacidade_campo_camp_5") {
      if (isNaN(Number(value))) {
        set_capacidade_campo_camp_5(true);
        return;
      } else {
        set_capacidade_campo_camp_5(false);
      }
    }
    if (name === "capacidade_campo_camp_6") {
      if (isNaN(Number(value))) {
        set_capacidade_campo_camp_6(true);
        return;
      } else {
        set_capacidade_campo_camp_6(false);
      }
    }
    if (name === "capacidade_campo_camp_7") {
      if (isNaN(Number(value))) {
        set_capacidade_campo_camp_7(true);
        return;
      } else {
        set_capacidade_campo_camp_7(false);
      }
    }
    if (name === "teor_crit_cul_camp_1") {
      if (isNaN(Number(value))) {
        set_teor_crit_cul_camp_1(true);
        return;
      } else {
        set_teor_crit_cul_camp_1(false);
      }
    }
    if (name === "teor_crit_cul_camp_2") {
      if (isNaN(Number(value))) {
        set_teor_crit_cul_camp_2(true);
        return;
      } else {
        set_teor_crit_cul_camp_2(false);
      }
    }
    if (name === "teor_crit_cul_camp_3") {
      if (isNaN(Number(value))) {
        set_teor_crit_cul_camp_3(true);
        return;
      } else {
        set_teor_crit_cul_camp_3(false);
      }
    }
    if (name === "teor_crit_cul_camp_4") {
      if (isNaN(Number(value))) {
        set_teor_crit_cul_camp_4(true);
        return;
      } else {
        set_teor_crit_cul_camp_4(false);
      }
    }
    if (name === "teor_crit_cul_camp_5") {
      if (isNaN(Number(value))) {
        set_teor_crit_cul_camp_5(true);
        return;
      } else {
        set_teor_crit_cul_camp_5(false);
      }
    }
    if (name === "teor_crit_cul_camp_6") {
      if (isNaN(Number(value))) {
        set_teor_crit_cul_camp_6(true);
        return;
      } else {
        set_teor_crit_cul_camp_6(false);
      }
    }
    if (name === "teor_crit_cul_camp_7") {
      if (isNaN(Number(value))) {
        set_teor_crit_cul_camp_7(true);
        return;
      } else {
        set_teor_crit_cul_camp_7(false);
      }
    }
    if (name === "teor_agua_inicio_camp_1") {
      if (isNaN(Number(value))) {
        set_teor_agua_inicio_camp_1(true);
        return;
      } else {
        set_teor_agua_inicio_camp_1(false);
      }
    }
    if (name === "teor_agua_inicio_camp_2") {
      if (isNaN(Number(value))) {
        set_teor_agua_inicio_camp_2(true);
        return;
      } else {
        set_teor_agua_inicio_camp_2(false);
      }
    }
    if (name === "teor_agua_inicio_camp_3") {
      if (isNaN(Number(value))) {
        set_teor_agua_inicio_camp_3(true);
        return;
      } else {
        set_teor_agua_inicio_camp_3(false);
      }
    }
    if (name === "teor_agua_inicio_camp_4") {
      if (isNaN(Number(value))) {
        set_teor_agua_inicio_camp_4(true);
        return;
      } else {
        set_teor_agua_inicio_camp_4(false);
      }
    }
    if (name === "teor_agua_inicio_camp_5") {
      if (isNaN(Number(value))) {
        set_teor_agua_inicio_camp_5(true);
        return;
      } else {
        set_teor_agua_inicio_camp_5(false);
      }
    }
    if (name === "teor_agua_inicio_camp_6") {
      if (isNaN(Number(value))) {
        set_teor_agua_inicio_camp_6(true);
        return;
      } else {
        set_teor_agua_inicio_camp_6(false);
      }
    }
    if (name === "teor_agua_inicio_camp_7") {
      if (isNaN(Number(value))) {
        set_teor_agua_inicio_camp_7(true);
        return;
      } else {
        set_teor_agua_inicio_camp_7(false);
      }
    }
    if (name === "eto_camp_1") {
      if (isNaN(Number(value))) {
        set_eto_camp_1(true);
        return;
      } else {
        set_eto_camp_1(false);
      }
    }
    if (name === "eto_camp_2") {
      if (isNaN(Number(value))) {
        set_eto_camp_2(true);
        return;
      } else {
        set_eto_camp_2(false);
      }
    }
    if (name === "eto_camp_3") {
      if (isNaN(Number(value))) {
        set_eto_camp_3(true);
        return;
      } else {
        set_eto_camp_3(false);
      }
    }
    if (name === "eto_camp_4") {
      if (isNaN(Number(value))) {
        set_eto_camp_4(true);
        return;
      } else {
        set_eto_camp_4(false);
      }
    }
    if (name === "eto_camp_5") {
      if (isNaN(Number(value))) {
        set_eto_camp_5(true);
        return;
      } else {
        set_eto_camp_5(false);
      }
    }
    if (name === "eto_camp_6") {
      if (isNaN(Number(value))) {
        set_eto_camp_6(true);
        return;
      } else {
        set_eto_camp_6(false);
      }
    }
    if (name === "eto_camp_7") {
      if (isNaN(Number(value))) {
        set_eto_camp_7(true);
        return;
      } else {
        set_eto_camp_7(false);
      }
    }
    if (name === "kc_camp_1") {
      if (isNaN(Number(value))) {
        set_kc_camp_1(true);
        return;
      } else {
        set_kc_camp_1(false);
      }
    }
    if (name === "kc_camp_2") {
      if (isNaN(Number(value))) {
        set_kc_camp_2(true);
        return;
      } else {
        set_kc_camp_2(false);
      }
    }
    if (name === "kc_camp_3") {
      if (isNaN(Number(value))) {
        set_kc_camp_3(true);
        return;
      } else {
        set_kc_camp_3(false);
      }
    }
    if (name === "kc_camp_4") {
      if (isNaN(Number(value))) {
        set_kc_camp_4(true);
        return;
      } else {
        set_kc_camp_4(false);
      }
    }
    if (name === "kc_camp_5") {
      if (isNaN(Number(value))) {
        set_kc_camp_5(true);
        return;
      } else {
        set_kc_camp_5(false);
      }
    }
    if (name === "kc_camp_6") {
      if (isNaN(Number(value))) {
        set_kc_camp_6(true);
        return;
      } else {
        set_kc_camp_6(false);
      }
    }
    if (name === "kc_camp_7") {
      if (isNaN(Number(value))) {
        set_kc_camp_7(true);
        return;
      } else {
        set_kc_camp_7(false);
      }
    }
    if (name === "etc_camp_1") {
      if (isNaN(Number(value))) {
        set_etc_camp_1(true);
        return;
      } else {
        set_etc_camp_1(false);
      }
    }
    if (name === "etc_camp_2") {
      if (isNaN(Number(value))) {
        set_etc_camp_2(true);
        return;
      } else {
        set_etc_camp_2(false);
      }
    }
    if (name === "etc_camp_3") {
      if (isNaN(Number(value))) {
        set_etc_camp_3(true);
        return;
      } else {
        set_etc_camp_3(false);
      }
    }
    if (name === "etc_camp_4") {
      if (isNaN(Number(value))) {
        set_etc_camp_4(true);
        return;
      } else {
        set_etc_camp_4(false);
      }
    }
    if (name === "etc_camp_5") {
      if (isNaN(Number(value))) {
        set_etc_camp_5(true);
        return;
      } else {
        set_etc_camp_5(false);
      }
    }
    if (name === "etc_camp_6") {
      if (isNaN(Number(value))) {
        set_etc_camp_6(true);
        return;
      } else {
        set_etc_camp_6(false);
      }
    }
    if (name === "etc_camp_7") {
      if (isNaN(Number(value))) {
        set_etc_camp_7(true);
        return;
      } else {
        set_etc_camp_7(false);
      }
    }
    if (name === "precipita_t_camp_1") {
      if (isNaN(Number(value))) {
        set_precipita_t_camp_1(true);
        return;
      } else {
        set_precipita_t_camp_1(false);
      }
    }
    if (name === "precipita_t_camp_2") {
      if (isNaN(Number(value))) {
        set_precipita_t_camp_2(true);
        return;
      } else {
        set_precipita_t_camp_2(false);
      }
    }
    if (name === "precipita_t_camp_3") {
      if (isNaN(Number(value))) {
        set_precipita_t_camp_3(true);
        return;
      } else {
        set_precipita_t_camp_3(false);
      }
    }
    if (name === "precipita_t_camp_4") {
      if (isNaN(Number(value))) {
        set_precipita_t_camp_4(true);
        return;
      } else {
        set_precipita_t_camp_4(false);
      }
    }
    if (name === "precipita_t_camp_5") {
      if (isNaN(Number(value))) {
        set_precipita_t_camp_5(true);
        return;
      } else {
        set_precipita_t_camp_5(false);
      }
    }
    if (name === "precipita_t_camp_6") {
      if (isNaN(Number(value))) {
        set_precipita_t_camp_6(true);
        return;
      } else {
        set_precipita_t_camp_6(false);
      }
    }
    if (name === "precipita_t_camp_7") {
      if (isNaN(Number(value))) {
        set_precipita_t_camp_7(true);
        return;
      } else {
        set_precipita_t_camp_7(false);
      }
    }
    if (name === "variacao_agu_camp_1") {
      if (isNaN(Number(value))) {
        set_variacao_agu_camp_1(true);
        return;
      } else {
        set_variacao_agu_camp_1(false);
      }
    }
    if (name === "variacao_agu_camp_2") {
      if (isNaN(Number(value))) {
        set_variacao_agu_camp_2(true);
        return;
      } else {
        set_variacao_agu_camp_2(false);
      }
    }
    if (name === "variacao_agu_camp_3") {
      if (isNaN(Number(value))) {
        set_variacao_agu_camp_3(true);
        return;
      } else {
        set_variacao_agu_camp_3(false);
      }
    }
    if (name === "variacao_agu_camp_4") {
      if (isNaN(Number(value))) {
        set_variacao_agu_camp_4(true);
        return;
      } else {
        set_variacao_agu_camp_4(false);
      }
    }
    if (name === "variacao_agu_camp_5") {
      if (isNaN(Number(value))) {
        set_variacao_agu_camp_5(true);
        return;
      } else {
        set_variacao_agu_camp_5(false);
      }
    }
    if (name === "variacao_agu_camp_6") {
      if (isNaN(Number(value))) {
        set_variacao_agu_camp_6(true);
        return;
      } else {
        set_variacao_agu_camp_6(false);
      }
    }
    if (name === "variacao_agu_camp_7") {
      if (isNaN(Number(value))) {
        set_variacao_agu_camp_7(true);
        return;
      } else {
        set_variacao_agu_camp_7(false);
      }
    }
    if (name === "teor_agua_solo_s_rega_camp_1") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_s_rega_camp_1(true);
        return;
      } else {
        set_teor_agua_solo_s_rega_camp_1(false);
      }
    }
    if (name === "teor_agua_solo_s_rega_camp_2") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_s_rega_camp_2(true);
        return;
      } else {
        set_teor_agua_solo_s_rega_camp_2(false);
      }
    }
    if (name === "teor_agua_solo_s_rega_camp_3") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_s_rega_camp_3(true);
        return;
      } else {
        set_teor_agua_solo_s_rega_camp_3(false);
      }
    }
    if (name === "teor_agua_solo_s_rega_camp_4") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_s_rega_camp_4(true);
        return;
      } else {
        set_teor_agua_solo_s_rega_camp_4(false);
      }
    }
    if (name === "teor_agua_solo_s_rega_camp_5") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_s_rega_camp_5(true);
        return;
      } else {
        set_teor_agua_solo_s_rega_camp_5(false);
      }
    }
    if (name === "teor_agua_solo_s_rega_camp_6") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_s_rega_camp_6(true);
        return;
      } else {
        set_teor_agua_solo_s_rega_camp_6(false);
      }
    }
    if (name === "teor_agua_solo_s_rega_camp_7") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_s_rega_camp_7(true);
        return;
      } else {
        set_teor_agua_solo_s_rega_camp_7(false);
      }
    }
    if (name === "leitura_sonda_1_camp_1") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_1_camp_1(true);
        return;
      } else {
        set_leitura_sonda_1_camp_1(false);
      }
    }
    if (name === "leitura_sonda_1_camp_2") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_1_camp_2(true);
        return;
      } else {
        set_leitura_sonda_1_camp_2(false);
      }
    }
    if (name === "leitura_sonda_1_camp_3") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_1_camp_3(true);
        return;
      } else {
        set_leitura_sonda_1_camp_3(false);
      }
    }
    if (name === "leitura_sonda_1_camp_4") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_1_camp_4(true);
        return;
      } else {
        set_leitura_sonda_1_camp_4(false);
      }
    }
    if (name === "leitura_sonda_1_camp_5") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_1_camp_5(true);
        return;
      } else {
        set_leitura_sonda_1_camp_5(false);
      }
    }
    if (name === "leitura_sonda_1_camp_6") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_1_camp_6(true);
        return;
      } else {
        set_leitura_sonda_1_camp_6(false);
      }
    }
    if (name === "leitura_sonda_2_camp_1") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_2_camp_1(true);
        return;
      } else {
        set_leitura_sonda_2_camp_1(false);
      }
    }
    if (name === "leitura_sonda_2_camp_2") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_2_camp_2(true);
        return;
      } else {
        set_leitura_sonda_2_camp_2(false);
      }
    }
    if (name === "leitura_sonda_2_camp_3") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_2_camp_3(true);
        return;
      } else {
        set_leitura_sonda_2_camp_3(false);
      }
    }
    if (name === "leitura_sonda_2_camp_4") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_2_camp_4(true);
        return;
      } else {
        set_leitura_sonda_2_camp_4(false);
      }
    }
    if (name === "leitura_sonda_2_camp_5") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_2_camp_5(true);
        return;
      } else {
        set_leitura_sonda_2_camp_5(false);
      }
    }
    if (name === "leitura_sonda_2_camp_6") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_2_camp_6(true);
        return;
      } else {
        set_leitura_sonda_2_camp_6(false);
      }
    }
    if (name === "leitura_sonda_2_camp_7") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_2_camp_7(true);
        return;
      } else {
        set_leitura_sonda_2_camp_7(false);
      }
    }
    if (name === "folga_prox_rega_camp_1") {
      if (isNaN(Number(value))) {
        set_folga_prox_rega_camp_1(true);
        return;
      } else {
        set_folga_prox_rega_camp_1(false);
      }
    }
    if (name === "folga_prox_rega_camp_2") {
      if (isNaN(Number(value))) {
        set_folga_prox_rega_camp_2(true);
        return;
      } else {
        set_folga_prox_rega_camp_2(false);
      }
    }
    if (name === "folga_prox_rega_camp_3") {
      if (isNaN(Number(value))) {
        set_folga_prox_rega_camp_3(true);
        return;
      } else {
        set_folga_prox_rega_camp_3(false);
      }
    }
    if (name === "folga_prox_rega_camp_4") {
      if (isNaN(Number(value))) {
        set_folga_prox_rega_camp_4(true);
        return;
      } else {
        set_folga_prox_rega_camp_4(false);
      }
    }
    if (name === "folga_prox_rega_camp_5") {
      if (isNaN(Number(value))) {
        set_folga_prox_rega_camp_5(true);
        return;
      } else {
        set_folga_prox_rega_camp_5(false);
      }
    }
    if (name === "folga_prox_rega_camp_6") {
      if (isNaN(Number(value))) {
        set_folga_prox_rega_camp_6(true);
        return;
      } else {
        set_folga_prox_rega_camp_6(false);
      }
    }
    if (name === "folga_prox_rega_camp_7") {
      if (isNaN(Number(value))) {
        set_folga_prox_rega_camp_7(true);
        return;
      } else {
        set_folga_prox_rega_camp_7(false);
      }
    }
    if (name === "rega_leitura_camp_1") {
      if (isNaN(Number(value))) {
        set_rega_leitura_camp_1(true);
        return;
      } else {
        set_rega_leitura_camp_1(false);
      }
    }
    if (name === "rega_leitura_camp_2") {
      if (isNaN(Number(value))) {
        set_rega_leitura_camp_2(true);
        return;
      } else {
        set_rega_leitura_camp_2(false);
      }
    }
    if (name === "rega_leitura_camp_3") {
      if (isNaN(Number(value))) {
        set_rega_leitura_camp_3(true);
        return;
      } else {
        set_rega_leitura_camp_3(false);
      }
    }
    if (name === "rega_leitura_camp_4") {
      if (isNaN(Number(value))) {
        set_rega_leitura_camp_4(true);
        return;
      } else {
        set_rega_leitura_camp_4(false);
      }
    }
    if (name === "rega_leitura_camp_5") {
      if (isNaN(Number(value))) {
        set_rega_leitura_camp_5(true);
        return;
      } else {
        set_rega_leitura_camp_5(false);
      }
    }
    if (name === "rega_leitura_camp_6") {
      if (isNaN(Number(value))) {
        set_rega_leitura_camp_6(true);
        return;
      } else {
        set_rega_leitura_camp_6(false);
      }
    }
    if (name === "rega_leitura_camp_7") {
      if (isNaN(Number(value))) {
        set_rega_leitura_camp_7(true);
        return;
      } else {
        set_rega_leitura_camp_7(false);
      }
    }
    if (name === "rega_dose_total_camp_1") {
      if (isNaN(Number(value))) {
        set_rega_dose_total_camp_1(true);
        return;
      } else {
        set_rega_dose_total_camp_1(false);
      }
    }
    if (name === "rega_dose_total_camp_2") {
      if (isNaN(Number(value))) {
        set_rega_dose_total_camp_2(true);
        return;
      } else {
        set_rega_dose_total_camp_2(false);
      }
    }
    if (name === "rega_dose_total_camp_3") {
      if (isNaN(Number(value))) {
        set_rega_dose_total_camp_3(true);
        return;
      } else {
        set_rega_dose_total_camp_3(false);
      }
    }
    if (name === "rega_dose_total_camp_4") {
      if (isNaN(Number(value))) {
        set_rega_dose_total_camp_4(true);
        return;
      } else {
        set_rega_dose_total_camp_4(false);
      }
    }
    if (name === "rega_dose_total_camp_5") {
      if (isNaN(Number(value))) {
        set_rega_dose_total_camp_5(true);
        return;
      } else {
        set_rega_dose_total_camp_5(false);
      }
    }
    if (name === "rega_dose_total_camp_6") {
      if (isNaN(Number(value))) {
        set_rega_dose_total_camp_6(true);
        return;
      } else {
        set_rega_dose_total_camp_6(false);
      }
    }
    if (name === "rega_dose_total_camp_7") {
      if (isNaN(Number(value))) {
        set_rega_dose_total_camp_7(true);
        return;
      } else {
        set_rega_dose_total_camp_7(false);
      }
    }
    if (name === "rega_dose_util_camp_1") {
      if (isNaN(Number(value))) {
        set_rega_dose_util_camp_1(true);
        return;
      } else {
        set_rega_dose_util_camp_1(false);
      }
    }
    if (name === "rega_dose_util_camp_2") {
      if (isNaN(Number(value))) {
        set_rega_dose_util_camp_2(true);
        return;
      } else {
        set_rega_dose_util_camp_2(false);
      }
    }
    if (name === "rega_dose_util_camp_3") {
      if (isNaN(Number(value))) {
        set_rega_dose_util_camp_3(true);
        return;
      } else {
        set_rega_dose_util_camp_3(false);
      }
    }
    if (name === "rega_dose_util_camp_4") {
      if (isNaN(Number(value))) {
        set_rega_dose_util_camp_4(true);
        return;
      } else {
        set_rega_dose_util_camp_4(false);
      }
    }
    if (name === "rega_dose_util_camp_5") {
      if (isNaN(Number(value))) {
        set_rega_dose_util_camp_5(true);
        return;
      } else {
        set_rega_dose_util_camp_5(false);
      }
    }
    if (name === "rega_dose_util_camp_6") {
      if (isNaN(Number(value))) {
        set_rega_dose_util_camp_6(true);
        return;
      } else {
        set_rega_dose_util_camp_6(false);
      }
    }
    if (name === "rega_dose_util_camp_7") {
      if (isNaN(Number(value))) {
        set_rega_dose_util_camp_7(true);
        return;
      } else {
        set_rega_dose_util_camp_7(false);
      }
    }
    if (name === "teor_agua_solo_1_camp_1") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_1_camp_1(true);
        return;
      } else {
        set_teor_agua_solo_1_camp_1(false);
      }
    }
    if (name === "teor_agua_solo_1_camp_2") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_1_camp_2(true);
        return;
      } else {
        set_teor_agua_solo_1_camp_2(false);
      }
    }
    if (name === "teor_agua_solo_1_camp_3") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_1_camp_3(true);
        return;
      } else {
        set_teor_agua_solo_1_camp_3(false);
      }
    }
    if (name === "teor_agua_solo_1_camp_4") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_1_camp_4(true);
        return;
      } else {
        set_teor_agua_solo_1_camp_4(false);
      }
    }
    if (name === "teor_agua_solo_1_camp_5") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_1_camp_5(true);
        return;
      } else {
        set_teor_agua_solo_1_camp_5(false);
      }
    }
    if (name === "teor_agua_solo_1_camp_6") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_1_camp_6(true);
        return;
      } else {
        set_teor_agua_solo_1_camp_6(false);
      }
    }
    if (name === "teor_agua_solo_1_camp_7") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_1_camp_7(true);
        return;
      } else {
        set_teor_agua_solo_1_camp_7(false);
      }
    }
    if (name === "perda_agua_camp_1") {
      if (isNaN(Number(value))) {
        set_perda_agua_camp_1(true);
        return;
      } else {
        set_perda_agua_camp_1(false);
      }
    }
    if (name === "perda_agua_camp_2") {
      if (isNaN(Number(value))) {
        set_perda_agua_camp_2(true);
        return;
      } else {
        set_perda_agua_camp_2(false);
      }
    }
    if (name === "perda_aguacamp_3") {
      if (isNaN(Number(value))) {
        set_perda_agua_camp_3(true);
        return;
      } else {
        set_perda_agua_camp_3(false);
      }
    }
    if (name === "perda_agua_camp_4") {
      if (isNaN(Number(value))) {
        set_perda_agua_camp_4(true);
        return;
      } else {
        set_perda_agua_camp_4(false);
      }
    }
    if (name === "perda_agua_camp_5") {
      if (isNaN(Number(value))) {
        set_perda_agua_camp_5(true);
        return;
      } else {
        set_perda_agua_camp_5(false);
      }
    }
    if (name === "perda_agua_camp_6") {
      if (isNaN(Number(value))) {
        set_perda_agua_camp_6(true);
        return;
      } else {
        set_perda_agua_camp_6(false);
      }
    }
    if (name === "perda_agua_camp_7") {
      if (isNaN(Number(value))) {
        set_perda_agua_camp_7(true);
        return;
      } else {
        set_perda_agua_camp_7(false);
      }
    }
    if (name === "ident_camp2") {
      if (isNaN(Number(value))) {
        set_ident_camp2(true);
        return;
      } else {
        set_ident_camp2(false);
      }
    }
    if (name === "ident_camp4") {
      if (isNaN(Number(value))) {
        set_ident_camp4(true);
        return;
      } else {
        set_ident_camp4(false);
      }
    }
    if (name === "capacidade_utili") {
      if (isNaN(Number(value))) {
        set_capacidade_utili(true);
        return;
      } else {
        set_capacidade_utili(false);
      }
    }
    if (name === "reserva_facilmente_utiliz") {
      if (isNaN(Number(value))) {
        set_reserva_facilmente_utiliz(true);
        return;
      } else {
        set_reserva_facilmente_utiliz(false);
      }
    }
    if (name === "semana_n") {
      if (isNaN(Number(value))) {
        set_semana_n(true);
        return;
      } else {
        set_semana_n(false);
      }
    }

    if (editingId !== null) {
      const updatedTable = tabelas.map((tab) => {
        if (tab.id_registo_rega === editingId) {
          return {
            ...tab,
            [name]: value,
          };
        }
        return tab;
      });
      setTabelas(updatedTable);
    }
  };
  const handleSaveTabela = async () => {
    try {
      let res = await post("new_reg_horario_rega_seis", { payload: tabela });
      if (res.status === 200) {
        setMessage("Gravado com sucesso!");

        setTabelas((prevRows) => {
          return [...prevRows, res.data.result];
        })
        setTabela(undefined);
        setCreate(false);
        setOpenSnackSuccess(true);
      } else {
        setMessage("Erro ao gravar!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleSave", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  // EDIT
  const onChangeAtividades = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;

    if (name === "prefundidad_radi_camp_1") {
      if (isNaN(Number(value))) {
        set_prefundidad_radi_camp_1(true);
        return;
      } else {
        set_prefundidad_radi_camp_1(false);
      }
    }
    if (name === "prefundidad_radi_camp_2") {
      if (isNaN(Number(value))) {
        set_prefundidad_radi_camp_2(true);
        return;
      } else {
        set_prefundidad_radi_camp_2(false);
      }
    }
    if (name === "prefundidad_radi_camp_3") {
      if (isNaN(Number(value))) {
        set_prefundidad_radi_camp_3(true);
        return;
      } else {
        set_prefundidad_radi_camp_3(false);
      }
    }
    if (name === "prefundidad_radi_camp_4") {
      if (isNaN(Number(value))) {
        set_prefundidad_radi_camp_4(true);
        return;
      } else {
        set_prefundidad_radi_camp_4(false);
      }
    }
    if (name === "prefundidad_radi_camp_5") {
      if (isNaN(Number(value))) {
        set_prefundidad_radi_camp_5(true);
        return;
      } else {
        set_prefundidad_radi_camp_5(false);
      }
    }
    if (name === "prefundidad_radi_camp_6") {
      if (isNaN(Number(value))) {
        set_prefundidad_radi_camp_6(true);
        return;
      } else {
        set_prefundidad_radi_camp_6(false);
      }
    }
    if (name === "prefundidad_radi_camp_7") {
      if (isNaN(Number(value))) {
        set_prefundidad_radi_camp_7(true);
        return;
      } else {
        set_prefundidad_radi_camp_7(false);
      }
    }
    if (name === "capacidade_campo_camp_1") {
      if (isNaN(Number(value))) {
        set_capacidade_campo_camp_1(true);
        return;
      } else {
        set_capacidade_campo_camp_1(false);
      }
    }
    if (name === "capacidade_campo_camp_2") {
      if (isNaN(Number(value))) {
        set_capacidade_campo_camp_2(true);
        return;
      } else {
        set_capacidade_campo_camp_2(false);
      }
    }
    if (name === "capacidade_campo_camp_3") {
      if (isNaN(Number(value))) {
        set_capacidade_campo_camp_3(true);
        return;
      } else {
        set_capacidade_campo_camp_3(false);
      }
    }
    if (name === "capacidade_campo_camp_4") {
      if (isNaN(Number(value))) {
        set_capacidade_campo_camp_4(true);
        return;
      } else {
        set_capacidade_campo_camp_4(false);
      }
    }
    if (name === "capacidade_campo_camp_5") {
      if (isNaN(Number(value))) {
        set_capacidade_campo_camp_5(true);
        return;
      } else {
        set_capacidade_campo_camp_5(false);
      }
    }
    if (name === "capacidade_campo_camp_6") {
      if (isNaN(Number(value))) {
        set_capacidade_campo_camp_6(true);
        return;
      } else {
        set_capacidade_campo_camp_6(false);
      }
    }
    if (name === "capacidade_campo_camp_7") {
      if (isNaN(Number(value))) {
        set_capacidade_campo_camp_7(true);
        return;
      } else {
        set_capacidade_campo_camp_7(false);
      }
    }
    if (name === "teor_crit_cul_camp_1") {
      if (isNaN(Number(value))) {
        set_teor_crit_cul_camp_1(true);
        return;
      } else {
        set_teor_crit_cul_camp_1(false);
      }
    }
    if (name === "teor_crit_cul_camp_2") {
      if (isNaN(Number(value))) {
        set_teor_crit_cul_camp_2(true);
        return;
      } else {
        set_teor_crit_cul_camp_2(false);
      }
    }
    if (name === "teor_crit_cul_camp_3") {
      if (isNaN(Number(value))) {
        set_teor_crit_cul_camp_3(true);
        return;
      } else {
        set_teor_crit_cul_camp_3(false);
      }
    }
    if (name === "teor_crit_cul_camp_4") {
      if (isNaN(Number(value))) {
        set_teor_crit_cul_camp_4(true);
        return;
      } else {
        set_teor_crit_cul_camp_4(false);
      }
    }
    if (name === "teor_crit_cul_camp_5") {
      if (isNaN(Number(value))) {
        set_teor_crit_cul_camp_5(true);
        return;
      } else {
        set_teor_crit_cul_camp_5(false);
      }
    }
    if (name === "teor_crit_cul_camp_6") {
      if (isNaN(Number(value))) {
        set_teor_crit_cul_camp_6(true);
        return;
      } else {
        set_teor_crit_cul_camp_6(false);
      }
    }
    if (name === "teor_crit_cul_camp_7") {
      if (isNaN(Number(value))) {
        set_teor_crit_cul_camp_7(true);
        return;
      } else {
        set_teor_crit_cul_camp_7(false);
      }
    }
    if (name === "teor_agua_inicio_camp_1") {
      if (isNaN(Number(value))) {
        set_teor_agua_inicio_camp_1(true);
        return;
      } else {
        set_teor_agua_inicio_camp_1(false);
      }
    }
    if (name === "teor_agua_inicio_camp_2") {
      if (isNaN(Number(value))) {
        set_teor_agua_inicio_camp_2(true);
        return;
      } else {
        set_teor_agua_inicio_camp_2(false);
      }
    }
    if (name === "teor_agua_inicio_camp_3") {
      if (isNaN(Number(value))) {
        set_teor_agua_inicio_camp_3(true);
        return;
      } else {
        set_teor_agua_inicio_camp_3(false);
      }
    }
    if (name === "teor_agua_inicio_camp_4") {
      if (isNaN(Number(value))) {
        set_teor_agua_inicio_camp_4(true);
        return;
      } else {
        set_teor_agua_inicio_camp_4(false);
      }
    }
    if (name === "teor_agua_inicio_camp_5") {
      if (isNaN(Number(value))) {
        set_teor_agua_inicio_camp_5(true);
        return;
      } else {
        set_teor_agua_inicio_camp_5(false);
      }
    }
    if (name === "teor_agua_inicio_camp_6") {
      if (isNaN(Number(value))) {
        set_teor_agua_inicio_camp_6(true);
        return;
      } else {
        set_teor_agua_inicio_camp_6(false);
      }
    }
    if (name === "teor_agua_inicio_camp_7") {
      if (isNaN(Number(value))) {
        set_teor_agua_inicio_camp_7(true);
        return;
      } else {
        set_teor_agua_inicio_camp_7(false);
      }
    }
    if (name === "eto_camp_1") {
      if (isNaN(Number(value))) {
        set_eto_camp_1(true);
        return;
      } else {
        set_eto_camp_1(false);
      }
    }
    if (name === "eto_camp_2") {
      if (isNaN(Number(value))) {
        set_eto_camp_2(true);
        return;
      } else {
        set_eto_camp_2(false);
      }
    }
    if (name === "eto_camp_3") {
      if (isNaN(Number(value))) {
        set_eto_camp_3(true);
        return;
      } else {
        set_eto_camp_3(false);
      }
    }
    if (name === "eto_camp_4") {
      if (isNaN(Number(value))) {
        set_eto_camp_4(true);
        return;
      } else {
        set_eto_camp_4(false);
      }
    }
    if (name === "eto_camp_5") {
      if (isNaN(Number(value))) {
        set_eto_camp_5(true);
        return;
      } else {
        set_eto_camp_5(false);
      }
    }
    if (name === "eto_camp_6") {
      if (isNaN(Number(value))) {
        set_eto_camp_6(true);
        return;
      } else {
        set_eto_camp_6(false);
      }
    }
    if (name === "eto_camp_7") {
      if (isNaN(Number(value))) {
        set_eto_camp_7(true);
        return;
      } else {
        set_eto_camp_7(false);
      }
    }
    if (name === "kc_camp_1") {
      if (isNaN(Number(value))) {
        set_kc_camp_1(true);
        return;
      } else {
        set_kc_camp_1(false);
      }
    }
    if (name === "kc_camp_2") {
      if (isNaN(Number(value))) {
        set_kc_camp_2(true);
        return;
      } else {
        set_kc_camp_2(false);
      }
    }
    if (name === "kc_camp_3") {
      if (isNaN(Number(value))) {
        set_kc_camp_3(true);
        return;
      } else {
        set_kc_camp_3(false);
      }
    }
    if (name === "kc_camp_4") {
      if (isNaN(Number(value))) {
        set_kc_camp_4(true);
        return;
      } else {
        set_kc_camp_4(false);
      }
    }
    if (name === "kc_camp_5") {
      if (isNaN(Number(value))) {
        set_kc_camp_5(true);
        return;
      } else {
        set_kc_camp_5(false);
      }
    }
    if (name === "kc_camp_6") {
      if (isNaN(Number(value))) {
        set_kc_camp_6(true);
        return;
      } else {
        set_kc_camp_6(false);
      }
    }
    if (name === "kc_camp_7") {
      if (isNaN(Number(value))) {
        set_kc_camp_7(true);
        return;
      } else {
        set_kc_camp_7(false);
      }
    }
    if (name === "etc_camp_1") {
      if (isNaN(Number(value))) {
        set_etc_camp_1(true);
        return;
      } else {
        set_etc_camp_1(false);
      }
    }
    if (name === "etc_camp_2") {
      if (isNaN(Number(value))) {
        set_etc_camp_2(true);
        return;
      } else {
        set_etc_camp_2(false);
      }
    }
    if (name === "etc_camp_3") {
      if (isNaN(Number(value))) {
        set_etc_camp_3(true);
        return;
      } else {
        set_etc_camp_3(false);
      }
    }
    if (name === "etc_camp_4") {
      if (isNaN(Number(value))) {
        set_etc_camp_4(true);
        return;
      } else {
        set_etc_camp_4(false);
      }
    }
    if (name === "etc_camp_5") {
      if (isNaN(Number(value))) {
        set_etc_camp_5(true);
        return;
      } else {
        set_etc_camp_5(false);
      }
    }
    if (name === "etc_camp_6") {
      if (isNaN(Number(value))) {
        set_etc_camp_6(true);
        return;
      } else {
        set_etc_camp_6(false);
      }
    }
    if (name === "etc_camp_7") {
      if (isNaN(Number(value))) {
        set_etc_camp_7(true);
        return;
      } else {
        set_etc_camp_7(false);
      }
    }
    if (name === "precipita_t_camp_1") {
      if (isNaN(Number(value))) {
        set_precipita_t_camp_1(true);
        return;
      } else {
        set_precipita_t_camp_1(false);
      }
    }
    if (name === "precipita_t_camp_2") {
      if (isNaN(Number(value))) {
        set_precipita_t_camp_2(true);
        return;
      } else {
        set_precipita_t_camp_2(false);
      }
    }
    if (name === "precipita_t_camp_3") {
      if (isNaN(Number(value))) {
        set_precipita_t_camp_3(true);
        return;
      } else {
        set_precipita_t_camp_3(false);
      }
    }
    if (name === "precipita_t_camp_4") {
      if (isNaN(Number(value))) {
        set_precipita_t_camp_4(true);
        return;
      } else {
        set_precipita_t_camp_4(false);
      }
    }
    if (name === "precipita_t_camp_5") {
      if (isNaN(Number(value))) {
        set_precipita_t_camp_5(true);
        return;
      } else {
        set_precipita_t_camp_5(false);
      }
    }
    if (name === "precipita_t_camp_6") {
      if (isNaN(Number(value))) {
        set_precipita_t_camp_6(true);
        return;
      } else {
        set_precipita_t_camp_6(false);
      }
    }
    if (name === "precipita_t_camp_7") {
      if (isNaN(Number(value))) {
        set_precipita_t_camp_7(true);
        return;
      } else {
        set_precipita_t_camp_7(false);
      }
    }
    if (name === "variacao_agu_camp_1") {
      if (isNaN(Number(value))) {
        set_variacao_agu_camp_1(true);
        return;
      } else {
        set_variacao_agu_camp_1(false);
      }
    }
    if (name === "variacao_agu_camp_2") {
      if (isNaN(Number(value))) {
        set_variacao_agu_camp_2(true);
        return;
      } else {
        set_variacao_agu_camp_2(false);
      }
    }
    if (name === "variacao_agu_camp_3") {
      if (isNaN(Number(value))) {
        set_variacao_agu_camp_3(true);
        return;
      } else {
        set_variacao_agu_camp_3(false);
      }
    }
    if (name === "variacao_agu_camp_4") {
      if (isNaN(Number(value))) {
        set_variacao_agu_camp_4(true);
        return;
      } else {
        set_variacao_agu_camp_4(false);
      }
    }
    if (name === "variacao_agu_camp_5") {
      if (isNaN(Number(value))) {
        set_variacao_agu_camp_5(true);
        return;
      } else {
        set_variacao_agu_camp_5(false);
      }
    }
    if (name === "variacao_agu_camp_6") {
      if (isNaN(Number(value))) {
        set_variacao_agu_camp_6(true);
        return;
      } else {
        set_variacao_agu_camp_6(false);
      }
    }
    if (name === "variacao_agu_camp_7") {
      if (isNaN(Number(value))) {
        set_variacao_agu_camp_7(true);
        return;
      } else {
        set_variacao_agu_camp_7(false);
      }
    }
    if (name === "teor_agua_solo_s_rega_camp_1") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_s_rega_camp_1(true);
        return;
      } else {
        set_teor_agua_solo_s_rega_camp_1(false);
      }
    }
    if (name === "teor_agua_solo_s_rega_camp_2") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_s_rega_camp_2(true);
        return;
      } else {
        set_teor_agua_solo_s_rega_camp_2(false);
      }
    }
    if (name === "teor_agua_solo_s_rega_camp_3") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_s_rega_camp_3(true);
        return;
      } else {
        set_teor_agua_solo_s_rega_camp_3(false);
      }
    }
    if (name === "teor_agua_solo_s_rega_camp_4") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_s_rega_camp_4(true);
        return;
      } else {
        set_teor_agua_solo_s_rega_camp_4(false);
      }
    }
    if (name === "teor_agua_solo_s_rega_camp_5") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_s_rega_camp_5(true);
        return;
      } else {
        set_teor_agua_solo_s_rega_camp_5(false);
      }
    }
    if (name === "teor_agua_solo_s_rega_camp_6") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_s_rega_camp_6(true);
        return;
      } else {
        set_teor_agua_solo_s_rega_camp_6(false);
      }
    }
    if (name === "teor_agua_solo_s_rega_camp_7") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_s_rega_camp_7(true);
        return;
      } else {
        set_teor_agua_solo_s_rega_camp_7(false);
      }
    }
    if (name === "leitura_sonda_1_camp_1") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_1_camp_1(true);
        return;
      } else {
        set_leitura_sonda_1_camp_1(false);
      }
    }
    if (name === "leitura_sonda_1_camp_2") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_1_camp_2(true);
        return;
      } else {
        set_leitura_sonda_1_camp_2(false);
      }
    }
    if (name === "leitura_sonda_1_camp_3") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_1_camp_3(true);
        return;
      } else {
        set_leitura_sonda_1_camp_3(false);
      }
    }
    if (name === "leitura_sonda_1_camp_4") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_1_camp_4(true);
        return;
      } else {
        set_leitura_sonda_1_camp_4(false);
      }
    }
    if (name === "leitura_sonda_1_camp_5") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_1_camp_5(true);
        return;
      } else {
        set_leitura_sonda_1_camp_5(false);
      }
    }
    if (name === "leitura_sonda_1_camp_6") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_1_camp_6(true);
        return;
      } else {
        set_leitura_sonda_1_camp_6(false);
      }
    }
    if (name === "leitura_sonda_2_camp_1") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_2_camp_1(true);
        return;
      } else {
        set_leitura_sonda_2_camp_1(false);
      }
    }
    if (name === "leitura_sonda_2_camp_2") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_2_camp_2(true);
        return;
      } else {
        set_leitura_sonda_2_camp_2(false);
      }
    }
    if (name === "leitura_sonda_2_camp_3") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_2_camp_3(true);
        return;
      } else {
        set_leitura_sonda_2_camp_3(false);
      }
    }
    if (name === "leitura_sonda_2_camp_4") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_2_camp_4(true);
        return;
      } else {
        set_leitura_sonda_2_camp_4(false);
      }
    }
    if (name === "leitura_sonda_2_camp_5") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_2_camp_5(true);
        return;
      } else {
        set_leitura_sonda_2_camp_5(false);
      }
    }
    if (name === "leitura_sonda_2_camp_6") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_2_camp_6(true);
        return;
      } else {
        set_leitura_sonda_2_camp_6(false);
      }
    }
    if (name === "leitura_sonda_2_camp_7") {
      if (isNaN(Number(value))) {
        set_leitura_sonda_2_camp_7(true);
        return;
      } else {
        set_leitura_sonda_2_camp_7(false);
      }
    }
    if (name === "folga_prox_rega_camp_1") {
      if (isNaN(Number(value))) {
        set_folga_prox_rega_camp_1(true);
        return;
      } else {
        set_folga_prox_rega_camp_1(false);
      }
    }
    if (name === "folga_prox_rega_camp_2") {
      if (isNaN(Number(value))) {
        set_folga_prox_rega_camp_2(true);
        return;
      } else {
        set_folga_prox_rega_camp_2(false);
      }
    }
    if (name === "folga_prox_rega_camp_3") {
      if (isNaN(Number(value))) {
        set_folga_prox_rega_camp_3(true);
        return;
      } else {
        set_folga_prox_rega_camp_3(false);
      }
    }
    if (name === "folga_prox_rega_camp_4") {
      if (isNaN(Number(value))) {
        set_folga_prox_rega_camp_4(true);
        return;
      } else {
        set_folga_prox_rega_camp_4(false);
      }
    }
    if (name === "folga_prox_rega_camp_5") {
      if (isNaN(Number(value))) {
        set_folga_prox_rega_camp_5(true);
        return;
      } else {
        set_folga_prox_rega_camp_5(false);
      }
    }
    if (name === "folga_prox_rega_camp_6") {
      if (isNaN(Number(value))) {
        set_folga_prox_rega_camp_6(true);
        return;
      } else {
        set_folga_prox_rega_camp_6(false);
      }
    }
    if (name === "folga_prox_rega_camp_7") {
      if (isNaN(Number(value))) {
        set_folga_prox_rega_camp_7(true);
        return;
      } else {
        set_folga_prox_rega_camp_7(false);
      }
    }
    if (name === "rega_leitura_camp_1") {
      if (isNaN(Number(value))) {
        set_rega_leitura_camp_1(true);
        return;
      } else {
        set_rega_leitura_camp_1(false);
      }
    }
    if (name === "rega_leitura_camp_2") {
      if (isNaN(Number(value))) {
        set_rega_leitura_camp_2(true);
        return;
      } else {
        set_rega_leitura_camp_2(false);
      }
    }
    if (name === "rega_leitura_camp_3") {
      if (isNaN(Number(value))) {
        set_rega_leitura_camp_3(true);
        return;
      } else {
        set_rega_leitura_camp_3(false);
      }
    }
    if (name === "rega_leitura_camp_4") {
      if (isNaN(Number(value))) {
        set_rega_leitura_camp_4(true);
        return;
      } else {
        set_rega_leitura_camp_4(false);
      }
    }
    if (name === "rega_leitura_camp_5") {
      if (isNaN(Number(value))) {
        set_rega_leitura_camp_5(true);
        return;
      } else {
        set_rega_leitura_camp_5(false);
      }
    }
    if (name === "rega_leitura_camp_6") {
      if (isNaN(Number(value))) {
        set_rega_leitura_camp_6(true);
        return;
      } else {
        set_rega_leitura_camp_6(false);
      }
    }
    if (name === "rega_leitura_camp_7") {
      if (isNaN(Number(value))) {
        set_rega_leitura_camp_7(true);
        return;
      } else {
        set_rega_leitura_camp_7(false);
      }
    }
    if (name === "rega_dose_total_camp_1") {
      if (isNaN(Number(value))) {
        set_rega_dose_total_camp_1(true);
        return;
      } else {
        set_rega_dose_total_camp_1(false);
      }
    }
    if (name === "rega_dose_total_camp_2") {
      if (isNaN(Number(value))) {
        set_rega_dose_total_camp_2(true);
        return;
      } else {
        set_rega_dose_total_camp_2(false);
      }
    }
    if (name === "rega_dose_total_camp_3") {
      if (isNaN(Number(value))) {
        set_rega_dose_total_camp_3(true);
        return;
      } else {
        set_rega_dose_total_camp_3(false);
      }
    }
    if (name === "rega_dose_total_camp_4") {
      if (isNaN(Number(value))) {
        set_rega_dose_total_camp_4(true);
        return;
      } else {
        set_rega_dose_total_camp_4(false);
      }
    }
    if (name === "rega_dose_total_camp_5") {
      if (isNaN(Number(value))) {
        set_rega_dose_total_camp_5(true);
        return;
      } else {
        set_rega_dose_total_camp_5(false);
      }
    }
    if (name === "rega_dose_total_camp_6") {
      if (isNaN(Number(value))) {
        set_rega_dose_total_camp_6(true);
        return;
      } else {
        set_rega_dose_total_camp_6(false);
      }
    }
    if (name === "rega_dose_total_camp_7") {
      if (isNaN(Number(value))) {
        set_rega_dose_total_camp_7(true);
        return;
      } else {
        set_rega_dose_total_camp_7(false);
      }
    }
    if (name === "rega_dose_util_camp_1") {
      if (isNaN(Number(value))) {
        set_rega_dose_util_camp_1(true);
        return;
      } else {
        set_rega_dose_util_camp_1(false);
      }
    }
    if (name === "rega_dose_util_camp_2") {
      if (isNaN(Number(value))) {
        set_rega_dose_util_camp_2(true);
        return;
      } else {
        set_rega_dose_util_camp_2(false);
      }
    }
    if (name === "rega_dose_util_camp_3") {
      if (isNaN(Number(value))) {
        set_rega_dose_util_camp_3(true);
        return;
      } else {
        set_rega_dose_util_camp_3(false);
      }
    }
    if (name === "rega_dose_util_camp_4") {
      if (isNaN(Number(value))) {
        set_rega_dose_util_camp_4(true);
        return;
      } else {
        set_rega_dose_util_camp_4(false);
      }
    }
    if (name === "rega_dose_util_camp_5") {
      if (isNaN(Number(value))) {
        set_rega_dose_util_camp_5(true);
        return;
      } else {
        set_rega_dose_util_camp_5(false);
      }
    }
    if (name === "rega_dose_util_camp_6") {
      if (isNaN(Number(value))) {
        set_rega_dose_util_camp_6(true);
        return;
      } else {
        set_rega_dose_util_camp_6(false);
      }
    }
    if (name === "rega_dose_util_camp_7") {
      if (isNaN(Number(value))) {
        set_rega_dose_util_camp_7(true);
        return;
      } else {
        set_rega_dose_util_camp_7(false);
      }
    }
    if (name === "teor_agua_solo_1_camp_1") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_1_camp_1(true);
        return;
      } else {
        set_teor_agua_solo_1_camp_1(false);
      }
    }
    if (name === "teor_agua_solo_1_camp_2") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_1_camp_2(true);
        return;
      } else {
        set_teor_agua_solo_1_camp_2(false);
      }
    }
    if (name === "teor_agua_solo_1_camp_3") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_1_camp_3(true);
        return;
      } else {
        set_teor_agua_solo_1_camp_3(false);
      }
    }
    if (name === "teor_agua_solo_1_camp_4") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_1_camp_4(true);
        return;
      } else {
        set_teor_agua_solo_1_camp_4(false);
      }
    }
    if (name === "teor_agua_solo_1_camp_5") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_1_camp_5(true);
        return;
      } else {
        set_teor_agua_solo_1_camp_5(false);
      }
    }
    if (name === "teor_agua_solo_1_camp_6") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_1_camp_6(true);
        return;
      } else {
        set_teor_agua_solo_1_camp_6(false);
      }
    }
    if (name === "teor_agua_solo_1_camp_7") {
      if (isNaN(Number(value))) {
        set_teor_agua_solo_1_camp_7(true);
        return;
      } else {
        set_teor_agua_solo_1_camp_7(false);
      }
    }
    if (name === "perda_agua_camp_1") {
      if (isNaN(Number(value))) {
        set_perda_agua_camp_1(true);
        return;
      } else {
        set_perda_agua_camp_1(false);
      }
    }
    if (name === "perda_agua_camp_2") {
      if (isNaN(Number(value))) {
        set_perda_agua_camp_2(true);
        return;
      } else {
        set_perda_agua_camp_2(false);
      }
    }
    if (name === "perda_aguacamp_3") {
      if (isNaN(Number(value))) {
        set_perda_agua_camp_3(true);
        return;
      } else {
        set_perda_agua_camp_3(false);
      }
    }
    if (name === "perda_agua_camp_4") {
      if (isNaN(Number(value))) {
        set_perda_agua_camp_4(true);
        return;
      } else {
        set_perda_agua_camp_4(false);
      }
    }
    if (name === "perda_agua_camp_5") {
      if (isNaN(Number(value))) {
        set_perda_agua_camp_5(true);
        return;
      } else {
        set_perda_agua_camp_5(false);
      }
    }
    if (name === "perda_agua_camp_6") {
      if (isNaN(Number(value))) {
        set_perda_agua_camp_6(true);
        return;
      } else {
        set_perda_agua_camp_6(false);
      }
    }
    if (name === "perda_agua_camp_7") {
      if (isNaN(Number(value))) {
        set_perda_agua_camp_7(true);
        return;
      } else {
        set_perda_agua_camp_7(false);
      }
    }
    if (name === "ident_camp2") {
      if (isNaN(Number(value))) {
        set_ident_camp2(true);
        return;
      } else {
        set_ident_camp2(false);
      }
    }
    if (name === "ident_camp4") {
      if (isNaN(Number(value))) {
        set_ident_camp4(true);
        return;
      } else {
        set_ident_camp4(false);
      }
    }
    if (name === "capacidade_utili") {
      if (isNaN(Number(value))) {
        set_capacidade_utili(true);
        return;
      } else {
        set_capacidade_utili(false);
      }
    }
    if (name === "reserva_facilmente_utiliz") {
      if (isNaN(Number(value))) {
        set_reserva_facilmente_utiliz(true);
        return;
      } else {
        set_reserva_facilmente_utiliz(false);
      }
    }
    if (name === "semana_n") {
      if (isNaN(Number(value))) {
        set_semana_n(true);
        return;
      } else {
        set_semana_n(false);
      }
    }

    if (editingId !== null) {
      const updatedTable = tabelas.map((tab) => {
        if (tab.id_registo_rega === editingId) {
          return {
            ...tab,
            [name]: value,
          };
        }
        return tab;
      });
      setTabelas(updatedTable);
    }
  };

  const handleUpdatetabela = async () => {
    if (editingId !== null) {
      const atividadeToSave = tabelas.find((tab) => tab.id_registo_rega === editingId);

      if (!atividadeToSave) {
        setMessage("Tabela não encontrada!");
        setOpenSnackError(true);
        return;
      }

      try {
        setIsLoading(true);

        let res = await post(`update_reg_horario_rega_seis`, { payload: atividadeToSave });

        if (res.status === 200) {
          setMessage("Registado com sucesso!");

          const updatedRows = tabelas.map((row) => {
            if (row.id_registo_rega === editingId) {
              return res.data.result
            } else {
              return { ...row };
            }
          });

          setTabelas(updatedRows !== undefined ? updatedRows : []);
          setEditRow(false);
          setEditingId(null);
          setOpenSnackSuccess(true);
        } else {
          setMessage("Erro ao gravar!");
          setOpenSnackError(true);
        }
        setIsLoading(false);
      } catch (error) {
        func_print("handleUpdatetabela", error, true);
        setMessage("Erro ao gravar!");
        setOpenSnackError(true);
        setIsLoading(false);
      }
    }
  };

  // DELETE
  const handleClickOpenDelete = (id: number) => {
    setIdToDelete(id);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    try {
      if (idToDelete !== null) {
        setIsLoading(true);

        let res = await del(`/delete__reg_horario_rega_seis/${idToDelete}`);

        if (res.status === 200) {
          setMessage("Registo eliminado com sucesso!");
          setOpenDelete(false);
          setIdToDelete(null);
          setTabelas((oldRows) => [
            ...oldRows.filter((oldRow) => oldRow.id_registo_rega !== idToDelete),
          ]);
          setOpenSnackSuccess(true);
        } else {
          setMessage("Erro ao eliminar o registo!");
          setOpenSnackError(true);
        }
        setIsLoading(false);
      }
    } catch (error) {
      func_print("handleDelete", error, true);
      setMessage("Erro ao eliminar o registo!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };



  return (
    <CustomThemeProvider>
      <div className={classes.root}>
        <CadernoLayout title="6 - Registo calendário Rega" />
        <main className={classes.contents}>
          <div className={classes.toolbars} />
          <Box width="80%" margin="auto">
            <Beneficiario_nome_id_alinhado_direita />
          </Box>

          <Snackbar
            open={openSnackSuccess}
            autoHideDuration={2000}
            onClose={() => setOpenSnackSuccess(false)}
          >
            <Alert
              onClose={() => setOpenSnackSuccess(false)}
              severity="success"
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
          <Snackbar
            open={openSnackError}
            autoHideDuration={2000}
            onClose={() => setOpenSnackError(false)}
          >
            <Alert
              onClose={() => setOpenSnackError(false)}
              severity="error"
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>

          {isLoading ? (
            <LoadingVulpes />
          ) : (
            <>
              <CabecalhoRegaForm
                cabecalhos={cabecalhos}
                updateCreateCabecalho={() => setCreate(false)}
                setCabecalhos={setCabecalhos}
                onSaveEditCabecalho={handleUpdateCabecalho}
                handleSelectZona={handleSelectZona}
                selectedIndex={selectedIndex}
              />
              <CustomThemeProvider>
                <TableContainer
                  component={Paper}
                  sx={{
                    height: "auto",
                    width: "auto",
                    margin: 2,
                    padding: 2,
                    marginTop: 6,
                  }}
                >
                  <table style={{ width: "100%" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell colSpan={8}>
                          <Box sx={{ justifyContent: "end", display: "flex" }}>
                            <BarraDeFerramentas
                              mostrarBotaoNovo
                              textoBotaoNovo="Nova tabela"
                              aoClicarNovo={handleAddNew}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>

                      {tabelas.length <= 0 && <TabelaCalendarioRegaHome />}

                      {create && (
                        <CreateTabelaRega
                          tabela={tabela}
                          setTabela={setTabela}
                          updateCreateTable={() => setCreate(false)}
                          onSaveTabela={handleSaveTabela}
                        />
                      )}

                      <TabelaCalendarioRega
                        tabelas={tabelas}
                        updateCreateTable={() => setCreate(false)}
                        onSaveEdit={handleUpdatetabela}
                        onInputChange={onChangeAtividades}
                        setEditingId={setEditingId}
                        setEditRow={setEditRow}
                        editingId={editingId}
                        editRow={editRow}
                        onDelete={handleClickOpenDelete}
                        setTabelas={setTabelas}
                        error_capacidade_utili={error_capacidade_utili}
                        error_reserva_facilmente_utiliz={error_reserva_facilmente_utiliz}
                        error_semana_n={error_semana_n}
                        error_prefundidad_radi_camp_1={error_prefundidad_radi_camp_1}
                        error_prefundidad_radi_camp_2={error_prefundidad_radi_camp_2}
                        error_prefundidad_radi_camp_3={error_prefundidad_radi_camp_3}
                        error_prefundidad_radi_camp_4={error_prefundidad_radi_camp_4}
                        error_prefundidad_radi_camp_5={error_prefundidad_radi_camp_5}
                        error_prefundidad_radi_camp_6={error_prefundidad_radi_camp_6}
                        error_prefundidad_radi_camp_7={error_prefundidad_radi_camp_7}
                        error_capacidade_campo_camp_1={error_capacidade_campo_camp_1}
                        error_capacidade_campo_camp_2={error_capacidade_campo_camp_2}
                        error_capacidade_campo_camp_3={error_capacidade_campo_camp_3}
                        error_capacidade_campo_camp_4={error_capacidade_campo_camp_4}
                        error_capacidade_campo_camp_5={error_capacidade_campo_camp_5}
                        error_capacidade_campo_camp_6={error_capacidade_campo_camp_6}
                        error_capacidade_campo_camp_7={error_capacidade_campo_camp_7}
                        error_teor_crit_cul_camp_1={error_teor_crit_cul_camp_1}
                        error_teor_crit_cul_camp_2={error_teor_crit_cul_camp_2}
                        error_teor_crit_cul_camp_3={error_teor_crit_cul_camp_3}
                        error_teor_crit_cul_camp_4={error_teor_crit_cul_camp_4}
                        error_teor_crit_cul_camp_5={error_teor_crit_cul_camp_5}
                        error_teor_crit_cul_camp_6={error_teor_crit_cul_camp_6}
                        error_teor_crit_cul_camp_7={error_teor_crit_cul_camp_7}
                        error_teor_agua_inicio_camp_1={error_teor_agua_inicio_camp_1}
                        error_teor_agua_inicio_camp_2={error_teor_agua_inicio_camp_2}
                        error_teor_agua_inicio_camp_3={error_teor_agua_inicio_camp_3}
                        error_teor_agua_inicio_camp_4={error_teor_agua_inicio_camp_4}
                        error_teor_agua_inicio_camp_5={error_teor_agua_inicio_camp_5}
                        error_teor_agua_inicio_camp_6={error_teor_agua_inicio_camp_6}
                        error_teor_agua_inicio_camp_7={error_teor_agua_inicio_camp_7}
                        error_eto_camp_1={error_eto_camp_1}
                        error_eto_camp_2={error_eto_camp_2}
                        error_eto_camp_3={error_eto_camp_3}
                        error_eto_camp_4={error_eto_camp_4}
                        error_eto_camp_5={error_eto_camp_5}
                        error_eto_camp_6={error_eto_camp_6}
                        error_eto_camp_7={error_eto_camp_7}
                        error_kc_camp_1={error_kc_camp_1}
                        error_kc_camp_2={error_kc_camp_2}
                        error_kc_camp_3={error_kc_camp_3}
                        error_kc_camp_4={error_kc_camp_4}
                        error_kc_camp_5={error_kc_camp_5}
                        error_kc_camp_6={error_kc_camp_6}
                        error_kc_camp_7={error_kc_camp_7}
                        error_etc_camp_1={error_etc_camp_1}
                        error_etc_camp_2={error_etc_camp_2}
                        error_etc_camp_3={error_etc_camp_3}
                        error_etc_camp_4={error_etc_camp_4}
                        error_etc_camp_5={error_etc_camp_5}
                        error_etc_camp_6={error_etc_camp_6}
                        error_etc_camp_7={error_etc_camp_7}
                        error_precipita_t_camp_1={error_precipita_t_camp_1}
                        error_precipita_t_camp_2={error_precipita_t_camp_2}
                        error_precipita_t_camp_3={error_precipita_t_camp_3}
                        error_precipita_t_camp_4={error_precipita_t_camp_4}
                        error_precipita_t_camp_5={error_precipita_t_camp_5}
                        error_precipita_t_camp_6={error_precipita_t_camp_6}
                        error_precipita_t_camp_7={error_precipita_t_camp_7}
                        error_variacao_agu_camp_1={error_variacao_agu_camp_1}
                        error_variacao_agu_camp_2={error_variacao_agu_camp_2}
                        error_variacao_agu_camp_3={error_variacao_agu_camp_3}
                        error_variacao_agu_camp_4={error_variacao_agu_camp_4}
                        error_variacao_agu_camp_5={error_variacao_agu_camp_5}
                        error_variacao_agu_camp_6={error_variacao_agu_camp_6}
                        error_variacao_agu_camp_7={error_variacao_agu_camp_7}
                        error_teor_agua_solo_s_rega_camp_1={error_teor_agua_solo_s_rega_camp_1}
                        error_teor_agua_solo_s_rega_camp_2={error_teor_agua_solo_s_rega_camp_2}
                        error_teor_agua_solo_s_rega_camp_3={error_teor_agua_solo_s_rega_camp_3}
                        error_teor_agua_solo_s_rega_camp_4={error_teor_agua_solo_s_rega_camp_4}
                        error_teor_agua_solo_s_rega_camp_5={error_teor_agua_solo_s_rega_camp_5}
                        error_teor_agua_solo_s_rega_camp_6={error_teor_agua_solo_s_rega_camp_6}
                        error_teor_agua_solo_s_rega_camp_7={error_teor_agua_solo_s_rega_camp_7}
                        error_leitura_sonda_1_camp_1={error_leitura_sonda_1_camp_1}
                        error_leitura_sonda_1_camp_2={error_leitura_sonda_1_camp_2}
                        error_leitura_sonda_1_camp_3={error_leitura_sonda_1_camp_3}
                        error_leitura_sonda_1_camp_4={error_leitura_sonda_1_camp_4}
                        error_leitura_sonda_1_camp_5={error_leitura_sonda_1_camp_5}
                        error_leitura_sonda_1_camp_6={error_leitura_sonda_1_camp_6}
                        error_leitura_sonda_1_camp_7={error_leitura_sonda_1_camp_7}
                        error_leitura_sonda_2_camp_1={error_leitura_sonda_2_camp_1}
                        error_leitura_sonda_2_camp_2={error_leitura_sonda_2_camp_2}
                        error_leitura_sonda_2_camp_3={error_leitura_sonda_2_camp_3}
                        error_leitura_sonda_2_camp_4={error_leitura_sonda_2_camp_4}
                        error_leitura_sonda_2_camp_5={error_leitura_sonda_2_camp_5}
                        error_leitura_sonda_2_camp_6={error_leitura_sonda_2_camp_6}
                        error_leitura_sonda_2_camp_7={error_leitura_sonda_2_camp_7}
                        error_folga_prox_rega_camp_1={error_folga_prox_rega_camp_1}
                        error_folga_prox_rega_camp_2={error_folga_prox_rega_camp_2}
                        error_folga_prox_rega_camp_3={error_folga_prox_rega_camp_3}
                        error_folga_prox_rega_camp_4={error_folga_prox_rega_camp_4}
                        error_folga_prox_rega_camp_5={error_folga_prox_rega_camp_5}
                        error_folga_prox_rega_camp_6={error_folga_prox_rega_camp_6}
                        error_folga_prox_rega_camp_7={error_folga_prox_rega_camp_7}
                        error_rega_leitura_camp_1={error_rega_leitura_camp_1}
                        error_rega_leitura_camp_2={error_rega_leitura_camp_2}
                        error_rega_leitura_camp_3={error_rega_leitura_camp_3}
                        error_rega_leitura_camp_4={error_rega_leitura_camp_4}
                        error_rega_leitura_camp_5={error_rega_leitura_camp_5}
                        error_rega_leitura_camp_6={error_rega_leitura_camp_6}
                        error_rega_leitura_camp_7={error_rega_leitura_camp_7}
                        error_rega_dose_total_camp_1={error_rega_dose_total_camp_1}
                        error_rega_dose_total_camp_2={error_rega_dose_total_camp_2}
                        error_rega_dose_total_camp_3={error_rega_dose_total_camp_3}
                        error_rega_dose_total_camp_4={error_rega_dose_total_camp_4}
                        error_rega_dose_total_camp_5={error_rega_dose_total_camp_5}
                        error_rega_dose_total_camp_6={error_rega_dose_total_camp_6}
                        error_rega_dose_total_camp_7={error_rega_dose_total_camp_7}
                        error_rega_dose_util_camp_1={error_rega_dose_util_camp_1}
                        error_rega_dose_util_camp_2={error_rega_dose_util_camp_2}
                        error_rega_dose_util_camp_3={error_rega_dose_util_camp_3}
                        error_rega_dose_util_camp_4={error_rega_dose_util_camp_4}
                        error_rega_dose_util_camp_5={error_rega_dose_util_camp_5}
                        error_rega_dose_util_camp_6={error_rega_dose_util_camp_6}
                        error_rega_dose_util_camp_7={error_rega_dose_util_camp_7}
                        error_teor_agua_solo_1_camp_1={error_teor_agua_solo_1_camp_1}
                        error_teor_agua_solo_1_camp_2={error_teor_agua_solo_1_camp_2}
                        error_teor_agua_solo_1_camp_3={error_teor_agua_solo_1_camp_3}
                        error_teor_agua_solo_1_camp_4={error_teor_agua_solo_1_camp_4}
                        error_teor_agua_solo_1_camp_5={error_teor_agua_solo_1_camp_5}
                        error_teor_agua_solo_1_camp_6={error_teor_agua_solo_1_camp_6}
                        error_teor_agua_solo_1_camp_7={error_teor_agua_solo_1_camp_7}
                        error_perda_agua_camp_1={error_perda_agua_camp_1}
                        error_perda_agua_camp_2={error_perda_agua_camp_2}
                        error_perda_agua_camp_3={error_perda_agua_camp_3}
                        error_perda_agua_camp_4={error_perda_agua_camp_4}
                        error_perda_agua_camp_5={error_perda_agua_camp_5}
                        error_perda_agua_camp_6={error_perda_agua_camp_6}
                        error_perda_agua_camp_7={error_perda_agua_camp_7}
                        error_ident_camp2={error_ident_camp2}
                        error_ident_camp4={error_ident_camp4} />
                    </TableBody>
                  </table>

                </TableContainer>
              </CustomThemeProvider>

            </>
          )}
          <ConfirmDialog
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            onConfirm={handleDelete}
            message="Deseja eliminar o registo?"
          />
        </main>
      </div>
    </CustomThemeProvider>
  );
}
