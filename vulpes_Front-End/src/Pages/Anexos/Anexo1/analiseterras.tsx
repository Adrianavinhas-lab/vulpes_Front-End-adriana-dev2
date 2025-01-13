import React, { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Paper, Stack, TableBody } from "@mui/material";
import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import {
  StyledTableHead,
  StyledTableCell,
} from "../../../Styles/tabelCellStyled/customTableCell";
import { CustomSelect, CustomTextField } from "../../../Styles/theme/customThemeprovider";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import { IAnaliseTerrasA1 } from "../../../Interfaces/anexos/anexo1/analise_e_foliar1_1_3";
import { del, get, post } from "../../../Services/tokenConfig";
import BasicPopover from "../../../Components/Popover";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { TabelaTerraHome } from "./tabela_terra_home";
import { func_print } from "../../../Func_genericas/func_print";
import { useLocation } from "react-router-dom";
import { Alert } from "../../../Components/Alert/Alert";
import { classeFertilizacao } from "../../../informacao_estatica";
import { ICabecalho } from "../../../Interfaces/anexos/anexo1/analise_e_foliar1_1_3";

interface AnaliseTerrasForm_prop {
  obj_anexo_cabecalho_selecionado: ICabecalho | undefined;
}
export const AnaliseTerrasForm: React.FC<AnaliseTerrasForm_prop> = ({ obj_anexo_cabecalho_selecionado }) => {

  const location = useLocation();

  const [createTable, setCreateTable] = useState(false);
  const [message, setMessage] = useState("");
  const [, setError] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<number>(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [obj_anexo, set_obj_anexo] = useState<IAnaliseTerrasA1>();
  const [error_azoto_mineral, set_error_azoto_mineral] = useState<boolean>(false)
  const [error_azoto_mitrico, set_error_azoto_mitrico] = useState<boolean>(false)
  const [error_azoto_total, set_error_azoto_total] = useState<boolean>(false)
  const [error_date, set_error_date] = useState<boolean>(false)
  const [error_classe_fert, set_error_classe_fert] = useState<boolean>(false)
  const [openSnackSuccess, setOpenSnackSuccess] = useState(false);
  const [openSnackError, setOpenSnackError] = useState(false);
  const [open_dialog_tem_a_certeza_que_quer_eliminar, set_open_dialog_tem_a_certeza_que_quer_eliminar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [obj_anexo_lista, set_obj_anexo_lista] = useState<IAnaliseTerrasA1[]>([]);
  const [error_mg_camp1, set_error_mg_camp1] = useState(false)
  const [error_mg_camp2, set_error_mg_camp2] = useState(false)
  const [error_mg_camp3, set_error_mg_camp3] = useState(false)
  const [error_mg_camp4, set_error_mg_camp4] = useState(false)
  const [error_mg_camp5, set_error_mg_camp5] = useState(false)
  const [error_mg_camp6, set_error_mg_camp6] = useState(false)
  const [error_mg_per_ph, set_error_mg_per_ph] = useState(false)
  const [error_mg_per_mo, set_error_mg_per_mo] = useState(false)
  const [error_perc_camp1, set_error_perc_camp1] = useState(false)
  const [error_perc_camp2, set_error_perc_camp2] = useState(false)
  const [error_perc_camp3, set_error_perc_camp3] = useState(false)
  const [error_perc_camp4, set_error_perc_camp4] = useState(false)
  const [error_perc_camp5, set_error_perc_camp5] = useState(false)
  const [error_perc_camp6, set_error_perc_camp6] = useState(false)
  const [error_deduzir_camp1, set_error_deduzir_camp1] = useState(false)
  const [error_pronfundidade, set_error_pronfundidade] = useState(false)
  const [error_data_colheira, set_error_data_colheira] = useState(true)
  const [error_data_resultados, set_error_data_resultados] = useState(true)
  const [error_n_amostras, set_error_n_amostras] = useState(false)


  const func_reset = () => {
    set_error_mg_camp1(false)
    set_error_mg_camp2(false)
    set_error_mg_camp3(false)
    set_error_mg_camp4(false)
    set_error_mg_camp5(false)
    set_error_mg_camp6(false)
    set_error_mg_per_ph(false)
    set_error_mg_per_mo(false)
    set_error_perc_camp1(false)
    set_error_perc_camp2(false)
    set_error_perc_camp3(false)
    set_error_perc_camp4(false)
    set_error_perc_camp5(false)
    set_error_perc_camp6(false)
    set_error_deduzir_camp1(false)
    set_error_pronfundidade(false)
    set_error_n_amostras(false)
    set_error_data_colheira(true)
    set_error_data_resultados(true)

  }

  // onChange criar
  const onInputChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    let aux_obj_anexo: any = obj_anexo === undefined ? {} : obj_anexo

    if (type === "checkbox") {
      aux_obj_anexo[name] = aux_obj_anexo[name] === undefined ? true : !aux_obj_anexo[name]
      set_obj_anexo(aux_obj_anexo);

    } else {
      if (name === 'data_colheira') {
        set_error_data_colheira(false)
      }
      if (name === 'data_resultados') {
        set_error_data_resultados(false)
      }
      if (name === 'Azoto_mineral') {

        if (!/^\d+$/.test(value)) {
          set_error_azoto_mineral(true)

        } else {
          set_error_azoto_mineral(false)

        }

      }
      if (name === 'Azoto_mitrico') {

        if (!/^\d+$/.test(value)) {
          set_error_azoto_mitrico(true)

        } else {
          set_error_azoto_mitrico(false)

        }

      }
      if (name === 'Azoto_total') {

        if (!/^\d+$/.test(value)) {
          set_error_azoto_total(true)

        } else {
          set_error_azoto_total(false)

        }

      }
      if (name === 'Classe_fert') {

        if (!/^\d+$/.test(value)) {
          set_error_classe_fert(true)

        } else {
          set_error_classe_fert(false)

        }

      }
      if (name === 'mg_camp1') {

        if (!/^\d+$/.test(value)) {
          set_error_mg_camp1(true)

        } else {
          set_error_mg_camp1(false)

        }

      }

      if (name === 'mg_camp2') {

        if (!/^\d+$/.test(value)) {
          set_error_mg_camp2(true)

        } else {
          set_error_mg_camp2(false)

        }

      }
      if (name === 'mg_camp3') {
        if (!/^\d+$/.test(value)) {
          set_error_mg_camp3(true)
        } else {
          set_error_mg_camp3(false)
        }
      }
      if (name === 'mg_camp4') {
        if (!/^\d+$/.test(value)) {
          set_error_mg_camp4(true)
        } else {
          set_error_mg_camp4(false)
        }
      }
      if (name === 'mg_camp5') {
        if (!/^\d+$/.test(value)) {
          set_error_mg_camp5(true)
        } else {
          set_error_mg_camp5(false)
        }
      }
      if (name === 'mg_camp6') {
        if (!/^\d+$/.test(value)) {
          set_error_mg_camp6(true)
        } else {
          set_error_mg_camp6(false)
        }
      }
      if (name === 'mg_per_ph') {
        if (!/^\d+$/.test(value)) {
          set_error_mg_per_ph(true)
        } else {
          set_error_mg_per_ph(false)
        }
      }
      if (name === 'mg_per_mo') {
        if (!/^\d+$/.test(value)) {
          set_error_mg_per_mo(true)
        } else {
          set_error_mg_per_mo(false)
        }
      }
      if (name === 'perc_camp1') {
        if (!/^\d+$/.test(value)) {
          set_error_perc_camp1(true)
        } else {
          set_error_perc_camp1(false)
        }
      }
      if (name === 'perc_camp2') {
        if (!/^\d+$/.test(value)) {
          set_error_perc_camp2(true)
        } else {
          set_error_perc_camp2(false)
        }
      }
      if (name === 'perc_camp3') {
        if (!/^\d+$/.test(value)) {
          set_error_perc_camp3(true)
        } else {
          set_error_perc_camp3(false)
        }
      }
      if (name === 'perc_camp4') {
        if (!/^\d+$/.test(value)) {
          set_error_perc_camp4(true)
        } else {
          set_error_perc_camp4(false)
        }
      }
      if (name === 'perc_camp5') {
        if (!/^\d+$/.test(value)) {
          set_error_perc_camp5(true)
        } else {
          set_error_perc_camp5(false)
        }
      }
      if (name === 'perc_camp6') {
        if (!/^\d+$/.test(value)) {
          set_error_perc_camp6(true)
        } else {
          set_error_perc_camp6(false)
        }
      }
      if (name === 'perc_camp6') {
        if (!/^\d+$/.test(value)) {
          set_error_perc_camp6(true)
        } else {
          set_error_perc_camp6(false)
        }
      }
      if (name === 'deduzir_camp1') {
        if (!/^\d+$/.test(value)) {
          set_error_deduzir_camp1(true)
        } else {
          set_error_deduzir_camp1(false)
        }
      }
      if (name === 'pronfundidade') {
        if (!/^\d+$/.test(value)) {
          set_error_pronfundidade(true)
        } else {
          set_error_pronfundidade(false)
        }
      }
      if (name === 'n_amostras') {
        if (!/^\d+$/.test(value)) {
          set_error_n_amostras(true)
        } else {
          set_error_n_amostras(false)
        }
      }
      set_obj_anexo((old: any) => ({
        ...old,
        [name]: value,
      }));
    }

  };

  const get_info = async () => {
    try {
      func_reset()
      let res = await get(
        `/get_reg_anexo_um_um_cabecalho/${obj_anexo_cabecalho_selecionado?.id_anexo_um_cabecalho}`
      );
      func_print('get_info res1111', res)
      func_print('obj_anexo_cabecalho_selecionado?.id_anexo_um_cabecalho res1111', obj_anexo_cabecalho_selecionado?.id_anexo_um_cabecalho)
      if (res.status === 200) {
        if (res.data.result.length !== 0) {
          set_obj_anexo_lista(res.data.result);
        }
      } else {
        setMessage("Erro a carregar informação!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("get_info", error, true);
      setMessage("Erro!");

      setOpenSnackError(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    (async () => {
      if (obj_anexo_cabecalho_selecionado !== undefined) {
        await get_info();

      }
    })();
  }, [obj_anexo_cabecalho_selecionado]);


  const handle_delete = async () => {
    try {
      setIsLoading(true);

      let res = await del(`delete__reg_anexo_um_um/${obj_anexo?.id_anexo_um_cabecalho}`);
      if (res.status === 200) {
        // let lista_aux: any = obj_anexo_lista_dois.filter((el) => {
        //   if (el.id_melhoria !== obj_anexo_dois?.id_melhoria) {
        //     return el
        //   }
        // })
        // set_obj_anexo_lista_dois(lista_aux === undefined ? [] : lista_aux)
        setMessage("Registo eliminado com sucesso!");
        set_open_dialog_tem_a_certeza_que_quer_eliminar(false);
        setOpenSnackSuccess(true);

      } else {
        setMessage("Erro ao eliminar o registo!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handle_delete_anexo", error, true);
      setIsLoading(false);
      setMessage("Erro ao eliminar o registo!");
      setOpenSnackError(true);
    }
  };


  const handleCloseSnack = () => {

    setOpenSnackSuccess(false);
    setOpenSnackError(false);
  };
  const handle_criar_anexo = async () => {
    if (error_data_resultados || error_data_colheira || error_mg_camp1 || error_mg_camp2 || error_mg_camp3 || error_mg_camp4 || error_mg_camp5 || error_mg_camp6 || error_mg_per_ph || error_mg_per_mo || error_perc_camp1 || error_perc_camp2 || error_perc_camp3 || error_perc_camp4 || error_perc_camp5 || error_perc_camp6 || error_deduzir_camp1 || error_pronfundidade || error_n_amostras) {
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);

    } else {

      try {
        setIsLoading(true);

        let data = await post("new_reg_anexo_um_um", {
          payload: {

            id_anexo_um_um: 0,
            mg_camp1: obj_anexo?.mg_camp1 === undefined ? '' : obj_anexo?.mg_camp1,
            mg_camp2: obj_anexo?.mg_camp2 === undefined ? '' : obj_anexo?.mg_camp2,
            mg_camp3: obj_anexo?.mg_camp3 === undefined ? '' : obj_anexo?.mg_camp3,
            mg_camp4: obj_anexo?.mg_camp4 === undefined ? '' : obj_anexo?.mg_camp4,
            mg_camp5: obj_anexo?.mg_camp5 === undefined ? '' : obj_anexo?.mg_camp5,
            mg_camp6: obj_anexo?.mg_camp6 === undefined ? '' : obj_anexo?.mg_camp6,
            perc_camp1: obj_anexo?.perc_camp1 === undefined ? '' : obj_anexo?.perc_camp1,
            perc_camp2: obj_anexo?.perc_camp2 === undefined ? '' : obj_anexo?.perc_camp2,
            perc_camp3: obj_anexo?.perc_camp3 === undefined ? '' : obj_anexo?.perc_camp3,
            perc_camp4: obj_anexo?.perc_camp4 === undefined ? '' : obj_anexo?.perc_camp4,
            perc_camp5: obj_anexo?.perc_camp5 === undefined ? '' : obj_anexo?.perc_camp5,
            perc_camp6: obj_anexo?.perc_camp6 === undefined ? '' : obj_anexo?.perc_camp6,
            mg_per_ph: obj_anexo?.mg_per_ph === undefined ? '' : obj_anexo?.mg_per_ph,
            mg_per_mo: obj_anexo?.mg_per_mo === undefined ? '' : obj_anexo?.mg_per_mo,
            classe_fert_camp1: obj_anexo?.classe_fert_camp1 === undefined ? '' : obj_anexo?.classe_fert_camp1,
            classe_fert_camp2: obj_anexo?.classe_fert_camp2 === undefined ? '' : obj_anexo?.classe_fert_camp2,
            classe_fert_camp3: obj_anexo?.classe_fert_camp3 === undefined ? '' : obj_anexo?.classe_fert_camp3,
            classe_fert_camp4: obj_anexo?.classe_fert_camp4 === undefined ? '' : obj_anexo?.classe_fert_camp4,
            classe_fert_camp5: obj_anexo?.classe_fert_camp5 === undefined ? '' : obj_anexo?.classe_fert_camp5,
            classe_fert_camp6: obj_anexo?.classe_fert_camp6 === undefined ? '' : obj_anexo?.classe_fert_camp6,
            classe_fert_camp7: obj_anexo?.classe_fert_camp7 === undefined ? '' : obj_anexo?.classe_fert_camp7,
            classe_fert_camp8: obj_anexo?.classe_fert_camp8 === undefined ? '' : obj_anexo?.classe_fert_camp8,
            deduzir_camp1: obj_anexo?.deduzir_camp1 === undefined ? '' : obj_anexo?.deduzir_camp1,
            deduzir_camp2: obj_anexo?.deduzir_camp2 === undefined ? '' : obj_anexo?.deduzir_camp2,
            Azoto_mineral: obj_anexo?.Azoto_mineral === undefined ? false : obj_anexo?.Azoto_mineral,
            Azoto_mitrico: obj_anexo?.Azoto_mitrico === undefined ? false : obj_anexo?.Azoto_mitrico,
            azoto_total: obj_anexo?.azoto_total === undefined ? false : obj_anexo?.azoto_total,
            data_colheira: obj_anexo?.data_colheira === undefined ? '' : obj_anexo?.data_colheira,
            pronfundidade: obj_anexo?.pronfundidade === undefined ? 0 : obj_anexo?.pronfundidade,
            data_resultados: obj_anexo?.data_resultados === undefined ? '' : obj_anexo?.data_resultados,
            n_amostras: obj_anexo?.n_amostras === undefined ? 0 : obj_anexo?.n_amostras,
            n_boletin: obj_anexo?.n_boletin === undefined ? '' : obj_anexo?.n_boletin,
            id_anexo_um_cabecalho: obj_anexo_cabecalho_selecionado?.id_anexo_um_cabecalho,
            last_update: new Date().toISOString(),
            create_date: new Date().toISOString(),
            uuid: ""
          }
        })
        func_print('data', data)
        if (data.status === 200) {
          setMessage("Operação efetuada com sucesso!");
          setOpenSnackSuccess(true);
          set_obj_anexo(data.data.result)
          set_obj_anexo_lista((old) => [...old, data.data.result])

        } else {
          setMessage("Erro ao efetuar a sua operação!");
          setOpenSnackError(true);
        }
        setIsLoading(false);

      } catch (error) {
        func_print('handle_criar_anexo', error, true)
        setIsLoading(false);

        setMessage("Erro ao efetuar a sua operação!");
        setOpenSnackError(true);
      }
    }
  }

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{
        height: "auto",
        width: "auto",
        margin: 2,
        padding: 2,
      }}
    >
      <Snackbar
        open={openSnackSuccess}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackError}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="error"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <table style={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={10}
              sx={{
                fontWeight: 600,
                textAlign: "left",
                fontFamily: "candara",
                fontSize: 18,
              }}
            >
              1 - Nutrientes disponibilizados ou a disponibilizar
            </TableCell>
          </TableRow>
          <TableRow>
            {createTable === false ? (
              <>
                <TableCell
                  colSpan={9}
                  sx={{
                    fontWeight: 600,
                    textAlign: "left",
                    fontFamily: "candara",
                    fontSize: 16,
                  }}
                >
                  1.1 - Análises de terras
                  <BasicPopover
                    text={
                      "Os boletins de análise devem ser mantidos pelo beneficiário por forma a serem consultados sempre que necessário pelas entidades que monitorizam, verificam a aplicação da legislação nacional aplicável no âmbito da gestão de nutrientes disponibilizados às culturas."
                    }
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" justifyContent="end">
                    <BarraDeFerramentas
                      mostrarBotaoNovo
                      textoBotaoNovo="Registar"
                      aoClicarNovo={() => setCreateTable(true)}
                    />
                  </Stack>
                </TableCell>
              </>
            ) :
              (
                <>
                  <TableCell
                    colSpan={9}
                    sx={{
                      fontWeight: 600,
                      textAlign: "left",
                      fontFamily: "candara",
                      fontSize: 16,
                    }}
                  >
                    1.1 - Análises de terras
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" justifyContent="end">
                      <ButtonCadernos
                        mostrarBotaoCancelar
                        aoClicarCancelar={() => setCreateTable(false)}
                        mostrarBotaoGravar
                        aoClicarGravar={() => { handle_criar_anexo() }}
                      />
                    </Stack>
                  </TableCell>
                </>

              )}
          </TableRow>
          {obj_anexo_lista.length <= 0 && createTable === false && <TabelaTerraHome />}
        </TableHead>
        <TableBody>
          {createTable && (
            <>
              <TableRow>
                <StyledTableHead colSpan={2}>
                  Elemento / nutriente
                </StyledTableHead>
                <StyledTableHead>
                  N <BasicPopover text="Azoto do solo" />
                </StyledTableHead>
                <StyledTableHead>
                  P2O5 <BasicPopover text="Fósforo do solo" />
                </StyledTableHead>
                <StyledTableHead>
                  K2O <BasicPopover text="Potássio do solo" />
                </StyledTableHead>
                <StyledTableHead>
                  Mg <BasicPopover text="Magnésio do solo" />
                </StyledTableHead>
                <StyledTableHead sx={{ minWidth: "50%" }}>
                  Outro
                  <BasicPopover text="Preencher apenas quando o boletim de análises apresenta dados sobre outros elementos, que vão ser considerados na elaboração do plano de fertilização." />
                </StyledTableHead>
                <StyledTableHead>
                  Outro
                  <BasicPopover text="Preencher apenas quando o boletim de análises apresenta dados sobre outros elementos, que vão ser considerados na elaboração do plano de fertilização." />
                </StyledTableHead>
                <StyledTableHead>
                  ph(H2O) <BasicPopover text="pH do solo" />
                </StyledTableHead>
                <StyledTableHead>
                  M.O.(%) <BasicPopover text="% de matéria orgânica do solo" />
                </StyledTableHead>
              </TableRow>
              <TableRow>
                <StyledTableHead rowSpan={3}>
                  Resultado das análises
                </StyledTableHead>
                <StyledTableHead>mg/kg</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="mg_camp1"
                    value={obj_anexo?.mg_camp1}
                    onChange={onInputChange}
                    error={error_mg_camp1}
                    helperText={error_mg_camp1 ? 'Apenas números são aceites' : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="mg_camp2"
                    value={obj_anexo?.mg_camp2}
                    onChange={onInputChange}
                    error={error_mg_camp2}
                    helperText={error_mg_camp2 ? 'Apenas números são aceites' : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="mg_camp3"
                    value={obj_anexo?.mg_camp3}
                    onChange={onInputChange}
                    error={error_mg_camp3}
                    helperText={error_mg_camp3 ? 'Apenas números são aceites' : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="mg_camp4"
                    value={obj_anexo?.mg_camp4}
                    onChange={onInputChange}
                    error={error_mg_camp4}
                    helperText={error_mg_camp4 ? 'Apenas números são aceites' : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="mg_camp5"
                    value={obj_anexo?.mg_camp5}
                    onChange={onInputChange}
                    error={error_mg_camp5}
                    helperText={error_mg_camp5 ? 'Apenas números são aceites' : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="mg_camp6"
                    value={obj_anexo?.mg_camp6}
                    onChange={onInputChange}
                    error={error_mg_camp6}
                    helperText={error_mg_camp6 ? 'Apenas números são aceites' : ""}
                  />
                </StyledTableCell>
                <StyledTableCell rowSpan={2}>
                  <CustomTextField
                    name="mg_per_ph"
                    value={obj_anexo?.mg_per_ph}
                    onChange={onInputChange}
                    error={error_mg_per_ph}
                    helperText={error_mg_per_ph ? 'Apenas números são aceites' : ""}
                  />
                </StyledTableCell>
                <StyledTableCell rowSpan={2}>
                  <CustomTextField
                    name="mg_per_mo"
                    value={obj_anexo?.mg_per_mo}
                    onChange={onInputChange}
                    error={error_mg_per_mo}
                    helperText={error_mg_per_mo ? 'Apenas números são aceites' : ""}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>(%)</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="perc_camp1"
                    value={obj_anexo?.perc_camp1}
                    onChange={onInputChange}
                    error={error_perc_camp1}
                    helperText={error_perc_camp1 ? 'Apenas números são aceites' : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="perc_camp2"
                    value={obj_anexo?.perc_camp2}
                    onChange={onInputChange}
                    error={error_perc_camp2}
                    helperText={error_perc_camp2 ? 'Apenas números são aceites' : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="perc_camp3"
                    value={obj_anexo?.perc_camp3}
                    onChange={onInputChange}
                    error={error_perc_camp3}
                    helperText={error_perc_camp3 ? 'Apenas números são aceites' : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="perc_camp4"
                    value={obj_anexo?.perc_camp4}
                    onChange={onInputChange}
                    error={error_perc_camp4}
                    helperText={error_perc_camp4 ? 'Apenas números são aceites' : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="perc_camp5"
                    value={obj_anexo?.perc_camp5}
                    onChange={onInputChange}
                    error={error_perc_camp5}
                    helperText={error_perc_camp5 ? 'Apenas números são aceites' : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="perc_camp6"
                    value={obj_anexo?.perc_camp6}
                    onChange={onInputChange}
                    error={error_perc_camp6}
                    helperText={error_perc_camp6 ? 'Apenas números são aceites' : ""}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>Classe de fertilidade</StyledTableHead>
                <StyledTableCell>
                  <CustomSelect
                    value={obj_anexo?.classe_fert_camp1 === undefined ? 'MA - Muito Alto' : obj_anexo?.classe_fert_camp1}
                    name="classe_fert_camp1"
                    onChange={onInputChange}
                    options={classeFertilizacao}
                    label=""
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomSelect
                    value={obj_anexo?.classe_fert_camp2 === undefined ? '' : obj_anexo?.classe_fert_camp2}
                    name="classe_fert_camp2"
                    onChange={onInputChange}
                    options={classeFertilizacao}
                    label=""
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomSelect
                    value={obj_anexo?.classe_fert_camp3 === undefined ? '' : obj_anexo?.classe_fert_camp3}
                    name="classe_fert_camp3"
                    onChange={onInputChange}
                    options={classeFertilizacao}
                    label=""
                  />
                </StyledTableCell>
                <StyledTableCell>

                  <CustomSelect
                    value={obj_anexo?.classe_fert_camp4 === undefined ? '' : obj_anexo?.classe_fert_camp4}
                    name="classe_fert_camp4"
                    onChange={onInputChange}
                    options={classeFertilizacao}
                    label=""
                  />
                </StyledTableCell>
                <StyledTableCell>

                  <CustomSelect
                    value={obj_anexo?.classe_fert_camp5 === undefined ? '' : obj_anexo?.classe_fert_camp5}
                    name="classe_fert_camp5"
                    onChange={onInputChange}
                    options={classeFertilizacao}
                    label=""
                  />
                </StyledTableCell>
                <StyledTableCell>

                  <CustomSelect
                    value={obj_anexo?.classe_fert_camp6 === undefined ? '' : obj_anexo?.classe_fert_camp6}
                    name="classe_fert_camp6"
                    onChange={onInputChange}
                    options={classeFertilizacao}
                    label=""
                  />
                </StyledTableCell>
                <StyledTableCell
                  sx={{ backgroundColor: "lightgray" }}
                ></StyledTableCell>
                <StyledTableCell>

                  <CustomSelect
                    value={obj_anexo?.classe_fert_camp7 === undefined ? '' : obj_anexo?.classe_fert_camp7}
                    name="classe_fert_camp7"
                    onChange={onInputChange}
                    options={classeFertilizacao}
                    label=""
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead colSpan={2}>
                  A deduzir no cálculo da fertilização azotada (kg/ha)
                </StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="deduzir_camp1"
                    value={obj_anexo?.deduzir_camp1}
                    onChange={onInputChange}
                    error={error_deduzir_camp1}
                    helperText={error_deduzir_camp1 ? 'Apenas números são aceites' : ""}
                  />
                </StyledTableCell>
                <StyledTableCell
                  sx={{ backgroundColor: "lightgray" }}
                  colSpan={7}
                ></StyledTableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}>
                  Quando são disponibilizados resultados analíticos referentes
                  ao teor de azoto do solo, identificar se este corresponde a:
                </TableCell>
                <TableCell colSpan={2}>
                  <FormControlLabel
                    name="Azoto_mineral"
                    label={
                      <Typography
                        fontFamily="candara"
                        fontSize={14}
                        fontWeight="600"
                      >
                        Azoto mineral
                      </Typography>
                    }
                    aria-readonly
                    control={
                      <Checkbox
                        defaultChecked={
                          obj_anexo?.Azoto_mineral === true &&
                          obj_anexo?.Azoto_mineral
                        }
                        value={obj_anexo?.Azoto_mineral}
                        onChange={onInputChange}
                        sx={{
                          color: "#aaaaaa",
                          "&.Mui-checked": {
                            color: "#C94F1E",
                          },
                        }}
                      />
                    }
                  />
                </TableCell>
                <TableCell colSpan={2}>
                  <FormControlLabel
                    name="Azoto_mitrico"
                    label={
                      <Typography fontFamily="candara" fontSize={14}>
                        Azoto nítrico
                      </Typography>
                    }
                    aria-readonly
                    control={
                      <Checkbox
                        defaultChecked={
                          obj_anexo?.Azoto_mitrico === true &&
                          obj_anexo?.Azoto_mitrico
                        }
                        value={obj_anexo?.Azoto_mitrico}
                        onChange={onInputChange}
                        sx={{
                          color: "#aaaaaa",
                          "&.Mui-checked": {
                            color: "#C94F1E",
                          },
                        }}
                      />
                    }
                  />
                </TableCell>
                <TableCell colSpan={2}>
                  <FormControlLabel
                    name="azoto_total"
                    label={
                      <Typography fontFamily="candara" fontSize={14}>
                        Azoto total
                      </Typography>
                    }
                    aria-readonly
                    control={
                      <Checkbox
                        defaultChecked={
                          obj_anexo?.azoto_total === true &&
                          obj_anexo?.azoto_total
                        }
                        value={obj_anexo?.azoto_total}
                        onChange={onInputChange}
                        sx={{
                          color: "#aaaaaa",
                          "&.Mui-checked": {
                            color: "#C94F1E",
                          },
                        }}
                      />
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, fontFamily: "candara" }}>
                  Data da colheita de terras:
                </TableCell>
                <TableCell>
                  <TextField
                    variant="filled"
                    name="data_colheira"
                    type="date"
                    error={error_data_colheira}
                    helperText={error_data_colheira === true ? 'Data obrigatória' : ''}
                    inputProps={{
                      style: {
                        fontSize: 12,
                        fontFamily: "verdana",
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={
                      obj_anexo?.data_colheira
                        ? obj_anexo?.data_colheira
                        : ""
                    }
                    onChange={onInputChange}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontFamily: "candara" }}>
                  Profundidade da colheita da amostra (cm):
                </TableCell>
                <TableCell>
                  <CustomTextField
                    name="pronfundidade"
                    value={obj_anexo?.pronfundidade}
                    onChange={onInputChange}
                    error={error_pronfundidade}
                    helperText={error_pronfundidade ? 'Apenas números são aceites' : ""}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontFamily: "candara" }}>
                  Data emissão resultados:
                </TableCell>
                <TableCell>
                  <TextField
                    variant="filled"
                    name="data_resultados"
                    type="date"
                    error={error_data_resultados}
                    helperText={error_data_resultados === true ? 'Data obrigatória' : ''}
                    inputProps={{
                      style: {
                        fontSize: 12,
                        fontFamily: "verdana",
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={
                      obj_anexo?.data_resultados
                        ? obj_anexo?.data_resultados
                        : ""
                    }
                    onChange={onInputChange}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontFamily: "candara" }}>
                  N.º de amostras
                </TableCell>
                <TableCell>
                  <CustomTextField
                    name="n_amostras"
                    value={obj_anexo?.n_amostras}
                    onChange={onInputChange}
                    error={error_n_amostras}
                    helperText={error_n_amostras ? 'Apenas números são aceites' : ""}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontFamily: "candara" }}>
                  N.º do Boletim:
                </TableCell>
                <TableCell>
                  <CustomTextField
                    name="n_boletin"
                    value={obj_anexo?.n_boletin}
                    onChange={onInputChange}
                  />
                </TableCell>
              </TableRow>
            </>
          )}

          {obj_anexo_lista.length < 0 ? <></>
            : obj_anexo_lista.map((table) => {

              return (
                <>
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      sx={{
                        fontWeight: 600,
                        textAlign: "left",
                        fontFamily: "candara",
                        fontSize: 16,
                      }}
                    >
                      1.1 - Análises de terras
                      <BasicPopover
                        text={
                          "Os boletins de análise devem ser mantidos pelo beneficiário por forma a serem consultados sempre que necessário pelas entidades que monitorizam, verificam a aplicação da legislação nacional aplicável no âmbito da gestão de nutrientes disponibilizados às culturas."
                        }
                      />
                    </TableCell>
                    {obj_anexo_lista.length > 0 ? (
                      <TableCell>
                        <ButtonCadernos
                          mostrarBotaoEditar
                          aoClicarEditar={() => { }}
                          mostrarBotaoApagar
                          aoClicarApagar={() => { }
                          }
                        />
                      </TableCell>
                    ) : (
                      (
                        <ButtonCadernos
                          mostrarBotaoGravar
                          aoClicarGravar={() => { }}
                          mostrarBotaoCancelar
                          aoClicarCancelar={() => { }}
                        />
                      )
                    )}
                  </TableRow>
                  {true ? (
                    <>
                      <TableRow>
                        <StyledTableHead colSpan={2}>
                          Elemento / nutriente
                        </StyledTableHead>
                        <StyledTableHead>
                          N <BasicPopover text="Azoto do solo" />
                        </StyledTableHead>
                        <StyledTableHead>
                          P2O5 <BasicPopover text="Fósforo do solo" />
                        </StyledTableHead>
                        <StyledTableHead>
                          K2O <BasicPopover text="Potássio do solo" />
                        </StyledTableHead>
                        <StyledTableHead>
                          Mg <BasicPopover text="Magnésio do solo" />
                        </StyledTableHead>
                        <StyledTableHead sx={{ minWidth: "50%" }}>
                          Outro
                          <BasicPopover text="Preencher apenas quando o boletim de análises apresenta dados sobre outros elementos, que vão ser considerados na elaboração do plano de fertilização." />
                        </StyledTableHead>
                        <StyledTableHead>
                          Outro
                          <BasicPopover text="Preencher apenas quando o boletim de análises apresenta dados sobre outros elementos, que vão ser considerados na elaboração do plano de fertilização." />
                        </StyledTableHead>
                        <StyledTableHead>
                          ph(H2O) <BasicPopover text="pH do solo" />
                        </StyledTableHead>
                        <StyledTableHead>
                          M.O.(%){" "}
                          <BasicPopover text="% de matéria orgânica do solo" />
                        </StyledTableHead>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead rowSpan={3}>
                          Resultado das análises
                        </StyledTableHead>
                        <StyledTableHead>mg/kg</StyledTableHead>
                        <StyledTableCell>
                          <CustomTextField
                            name="mg_camp1"
                            value={table.mg_camp1}
                            onChange={onInputChange}
                            error={error_mg_camp1}
                            helperText={error_mg_camp1 ? 'Apenas números são aceites' : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="mg_camp2"
                            value={table.mg_camp2}
                            onChange={onInputChange}
                            error={error_mg_camp2}
                            helperText={error_mg_camp2 ? 'Apenas números são aceites' : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="mg_camp3"
                            value={table.mg_camp3}
                            onChange={onInputChange}
                            error={error_mg_camp3}
                            helperText={error_mg_camp3 ? 'Apenas números são aceites' : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="mg_camp4"
                            value={table.mg_camp4}
                            onChange={onInputChange}
                            error={error_mg_camp4}
                            helperText={error_mg_camp4 ? 'Apenas números são aceites' : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="mg_camp5"
                            value={table.mg_camp5}
                            onChange={onInputChange}
                            error={error_mg_camp5}
                            helperText={error_mg_camp5 ? 'Apenas números são aceites' : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="mg_camp6"
                            value={table.mg_camp6}
                            onChange={onInputChange}
                            error={error_mg_camp6}
                            helperText={error_mg_camp6 ? 'Apenas números são aceites' : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell rowSpan={2}>
                          <CustomTextField
                            name="mg_per_ph"
                            value={table.mg_per_ph}
                            onChange={onInputChange}
                            error={error_mg_per_ph}
                            helperText={error_mg_per_ph ? 'Apenas números são aceites' : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell rowSpan={2}>
                          <CustomTextField
                            name="mg_per_mo"
                            value={table.mg_per_mo}
                            onChange={onInputChange}
                            error={error_mg_per_mo}
                            helperText={error_mg_per_mo ? 'Apenas números são aceites' : ""}
                          />
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead>(%)</StyledTableHead>
                        <StyledTableCell>
                          <CustomTextField
                            name="perc_camp1"
                            value={table.perc_camp1}
                            onChange={onInputChange}
                            error={error_perc_camp1}
                            helperText={error_perc_camp1 ? 'Apenas números são aceites' : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="perc_camp2"
                            value={table.perc_camp2}
                            onChange={onInputChange}
                            error={error_perc_camp2}
                            helperText={error_perc_camp2 ? 'Apenas números são aceites' : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="perc_camp3"
                            value={table.perc_camp3}
                            onChange={onInputChange}
                            error={error_perc_camp3}
                            helperText={error_perc_camp3 ? 'Apenas números são aceites' : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="perc_camp4"
                            value={table.perc_camp4}
                            onChange={onInputChange}
                            error={error_perc_camp4}
                            helperText={error_perc_camp4 ? 'Apenas números são aceites' : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="perc_camp5"
                            value={table.perc_camp5}
                            onChange={onInputChange}
                            error={error_perc_camp5}
                            helperText={error_perc_camp5 ? 'Apenas números são aceites' : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="perc_camp6"
                            value={table.perc_camp6}
                            onChange={onInputChange}
                            error={error_perc_camp6}
                            helperText={error_perc_camp6 ? 'Apenas números são aceites' : ""}
                          />
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead>
                          Classe de fertilidade
                          <BasicPopover text="Registar a classe de fertilidade constante no boletim de análise para cada um dos nutrientes, caso faça parte do referido boletim." />
                        </StyledTableHead>
                        <StyledTableCell>
                          <Stack direction="row">

                            <CustomSelect
                              value={table.classe_fert_camp1 === undefined ? 'MA - Muito Alto' : table.classe_fert_camp1}
                              name="classe_fert_camp1"
                              onChange={onInputChange}
                              options={classeFertilizacao}
                              label=""
                            />
                            <BasicPopover
                              text={
                                " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                              }
                            />
                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Stack direction="row">

                            <CustomSelect
                              value={table?.classe_fert_camp2 === undefined ? '' : table?.classe_fert_camp2}
                              name="classe_fert_camp2"
                              onChange={onInputChange}
                              options={classeFertilizacao}
                              label=""
                            />
                            <BasicPopover
                              text={
                                " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                              }
                            />
                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Stack direction="row">

                            <CustomSelect
                              value={table?.classe_fert_camp3 === undefined ? '' : table?.classe_fert_camp3}
                              name="classe_fert_camp3"
                              onChange={onInputChange}
                              options={classeFertilizacao}
                              label=""
                            />
                            <BasicPopover
                              text={
                                " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                              }
                            />
                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Stack direction="row">

                            <CustomSelect
                              value={table?.classe_fert_camp4 === undefined ? '' : table?.classe_fert_camp4}
                              name="classe_fert_camp4"
                              onChange={onInputChange}
                              options={classeFertilizacao}
                              label=""
                            />
                            <BasicPopover
                              text={
                                " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                              }
                            />
                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Stack direction="row">

                            <CustomSelect
                              value={table?.classe_fert_camp5 === undefined ? '' : table?.classe_fert_camp5}
                              name="classe_fert_camp5"
                              onChange={onInputChange}
                              options={classeFertilizacao}
                              label=""
                            />
                            <BasicPopover
                              text={
                                " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                              }
                            />
                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Stack direction="row">

                            <CustomSelect
                              value={table?.classe_fert_camp6 === undefined ? '' : table?.classe_fert_camp6}
                              name="classe_fert_camp6"
                              onChange={onInputChange}
                              options={classeFertilizacao}
                              label=""
                            />
                            <BasicPopover
                              text={
                                " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                              }
                            />
                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{ backgroundColor: "lightgray" }}
                        ></StyledTableCell>
                        <StyledTableCell>
                          <Stack direction="row">
                            <CustomSelect
                              value={table?.classe_fert_camp7 === undefined ? '' : table?.classe_fert_camp7}
                              name="classe_fert_camp7"
                              onChange={onInputChange}
                              options={classeFertilizacao}
                              label=""
                            />
                            <BasicPopover
                              text={
                                " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                              }
                            />
                          </Stack>
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead colSpan={2}>
                          A deduzir no cálculo da fertilização azotada (kg/ha)
                        </StyledTableHead>
                        <StyledTableCell>
                          <CustomTextField
                            name="deduzir_cálculo"
                            value={table.deduzir_camp1}
                            onChange={onInputChange}
                            error={error_deduzir_camp1}
                            helperText={error_deduzir_camp1 ? 'Apenas números são aceites' : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{ backgroundColor: "lightgray" }}
                          colSpan={7}
                        ></StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={4}>
                          Quando são disponibilizados resultados analíticos
                          referentes ao teor de azoto do solo, identificar se
                          este corresponde a:
                        </TableCell>
                        <TableCell colSpan={2}>
                          <FormControlLabel
                            name="Azoto_mineral"
                            label={
                              <Typography fontFamily="candara" fontSize={14}>
                                Azoto mineral
                              </Typography>
                            }
                            aria-readonly
                            control={
                              <Checkbox
                                defaultChecked={
                                  table.Azoto_mineral === true && true
                                }
                                checked={table.Azoto_mineral}
                                onChange={onInputChange}
                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </TableCell>
                        <TableCell colSpan={2}>
                          <FormControlLabel
                            name="Azoto_mitrico"
                            label={
                              <Typography fontFamily="candara" fontSize={14}>
                                Azoto nítrico
                              </Typography>
                            }
                            aria-readonly
                            control={
                              <Checkbox
                                defaultChecked={
                                  table.Azoto_mitrico === true && true
                                }
                                checked={table.Azoto_mitrico}
                                onChange={onInputChange}
                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </TableCell>
                        <TableCell colSpan={2}>
                          <FormControlLabel
                            label={
                              <Typography fontFamily="candara" fontSize={14}>
                                Azoto total
                              </Typography>
                            }
                            aria-readonly
                            control={
                              <Checkbox
                                name="azoto_total"
                                defaultChecked={table.azoto_total}
                                checked={table.azoto_total}
                                onChange={onInputChange}
                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ fontWeight: 600, fontFamily: "candara" }}
                        >
                          Data da colheita de terras:
                        </TableCell>
                        <TableCell>
                          <TextField
                            variant="filled"
                            name="data_colheira"
                            type="date"
                            error={error_data_colheira}
                            helperText={error_data_colheira === true ? 'Data obrigatória' : ''}
                            inputProps={{
                              style: {
                                fontSize: 12,
                                fontFamily: "verdana",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={
                              table.data_colheira ? table.data_colheira : ""
                            }
                            onChange={onInputChange}
                          />
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: 600, fontFamily: "candara" }}
                        >
                          Profundidade da colheita da amostra (cm):
                        </TableCell>
                        <TableCell>
                          <CustomTextField
                            name="pronfundidade"
                            value={table.pronfundidade}
                            onChange={onInputChange}
                            error={error_pronfundidade}
                            helperText={error_pronfundidade ? 'Apenas números são aceites' : ""}
                          />
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: 600, fontFamily: "candara" }}
                        >
                          Data emissão resultados:
                        </TableCell>
                        <TableCell>
                          <TextField
                            variant="filled"
                            name="data_resultados"
                            type="date"
                            error={error_data_resultados}
                            helperText={error_data_resultados === true ? 'Data obrigatória' : ''}
                            inputProps={{
                              style: {
                                fontSize: 12,
                                fontFamily: "verdana",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={
                              table.data_resultados ? table.data_resultados : ""
                            }
                            onChange={onInputChange}
                          />
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: 600, fontFamily: "candara" }}
                        >
                          N.º de amostras
                        </TableCell>
                        <TableCell>
                          <CustomTextField
                            name="n_amostras"
                            value={table.n_amostras}
                            onChange={onInputChange}
                            error={error_n_amostras}
                            helperText={error_n_amostras ? 'Apenas números são aceites' : ""}
                          />
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: 600, fontFamily: "candara" }}
                        >
                          N.º do Boletim:
                        </TableCell>
                        <TableCell>
                          <CustomTextField
                            name="n_boletin"
                            value={table.n_boletin}
                            onChange={onInputChange}
                          />
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    createTable === false && (
                      <>
                        <TableRow>
                          <StyledTableHead colSpan={2}>
                            Elemento / nutriente
                          </StyledTableHead>
                          <StyledTableHead>
                            N <BasicPopover text="Azoto do solo" />
                          </StyledTableHead>
                          <StyledTableHead>
                            P2O5 <BasicPopover text="Fósforo do solo" />
                          </StyledTableHead>
                          <StyledTableHead>
                            K2O <BasicPopover text="Potássio do solo" />
                          </StyledTableHead>
                          <StyledTableHead>
                            Mg <BasicPopover text="Magnésio do solo" />
                          </StyledTableHead>
                          <StyledTableHead sx={{ minWidth: "50%" }}>
                            Outro
                            <BasicPopover text="Preencher apenas quando o boletim de análises apresenta dados sobre outros elementos, que vão ser considerados na elaboração do plano de fertilização." />
                          </StyledTableHead>
                          <StyledTableHead>
                            Outro
                            <BasicPopover text="Preencher apenas quando o boletim de análises apresenta dados sobre outros elementos, que vão ser considerados na elaboração do plano de fertilização." />
                          </StyledTableHead>
                          <StyledTableHead>
                            ph(H2O) <BasicPopover text="pH do solo" />
                          </StyledTableHead>
                          <StyledTableHead>
                            M.O.(%)
                            <BasicPopover text="% de matéria orgânica do solo" />
                          </StyledTableHead>
                        </TableRow>
                        <TableRow>
                          <StyledTableHead rowSpan={3}>
                            Resultado das análises
                          </StyledTableHead>
                          <StyledTableHead>mg/kg</StyledTableHead>
                          <StyledTableCell>{table.mg_camp1}</StyledTableCell>
                          <StyledTableCell>{table.mg_camp2}</StyledTableCell>
                          <StyledTableCell>{table.mg_camp3}</StyledTableCell>
                          <StyledTableCell>{table.mg_camp4}</StyledTableCell>
                          <StyledTableCell>{table.mg_camp5}</StyledTableCell>
                          <StyledTableCell>{table.mg_camp6}</StyledTableCell>
                          <StyledTableCell rowSpan={2}>
                            {table.mg_per_ph}
                          </StyledTableCell>
                          <StyledTableCell rowSpan={2}>
                            {table.mg_per_mo}
                          </StyledTableCell>
                        </TableRow>
                        <TableRow>
                          <StyledTableHead>(%)</StyledTableHead>
                          <StyledTableCell>
                            {table.classe_fert_camp1}
                          </StyledTableCell>
                          <StyledTableCell>
                            {table.classe_fert_camp2}
                          </StyledTableCell>
                          <StyledTableCell>
                            {table.classe_fert_camp3}
                          </StyledTableCell>
                          <StyledTableCell>
                            {table.classe_fert_camp4}
                          </StyledTableCell>
                          <StyledTableCell>
                            {table.classe_fert_camp5}
                          </StyledTableCell>
                          <StyledTableCell>
                            {table.classe_fert_camp6}
                          </StyledTableCell>
                        </TableRow>
                        <TableRow>
                          <StyledTableHead>
                            <Stack direction="row" justifyContent="center">
                              Classe de fertilidade
                              <Box margin={-1} padding={0}>
                                <BasicPopover
                                  text={
                                    "Registar a classe de fertilidade constante no boletim de análise para cada um dos nutrientes, caso faça parte do referido boletim."
                                  }
                                />
                              </Box>
                            </Stack>
                          </StyledTableHead>
                          <StyledTableCell>
                            <Stack direction="row" justifyContent="right">
                              {table.mg_camp1}
                              <Box margin={-1} padding={0}>
                                <BasicPopover
                                  text={
                                    " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                                  }
                                />
                              </Box>
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row" justifyContent="right">
                              {table.mg_camp2}
                              <Box margin={-1} padding={0}>
                                <BasicPopover
                                  text={
                                    " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                                  }
                                />
                              </Box>
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row" justifyContent="right">
                              {table.mg_camp3}
                              <Box margin={-1} padding={0}>
                                <BasicPopover
                                  text={
                                    " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                                  }
                                />
                              </Box>
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row" justifyContent="right">
                              {table.mg_camp4}
                              <Box margin={-1} padding={0}>
                                <BasicPopover
                                  text={
                                    " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                                  }
                                />
                              </Box>
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row" justifyContent="right">
                              {table.mg_camp5}
                              <Box margin={-1} padding={0}>
                                <BasicPopover
                                  text={
                                    " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                                  }
                                />
                              </Box>
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row" justifyContent="right">
                              {table.mg_camp6}
                              <Box margin={-1} padding={0}>
                                <BasicPopover
                                  text={
                                    " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                                  }
                                />
                              </Box>
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{ backgroundColor: "lightgrey" }}
                          ></StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row" justifyContent="right">
                              {/* {table.mg_camp7} */}
                              <Box margin={-1} padding={0}>
                                <BasicPopover
                                  text={
                                    " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                                  }
                                />
                              </Box>
                            </Stack>
                          </StyledTableCell>
                        </TableRow>
                        <TableRow>
                          <StyledTableHead colSpan={2}>
                            <Stack direction="row" justifyContent="start">
                              A deduzir no cálculo da fertilização azotada
                              (kg/ha)
                              <Box margin={-1} padding={0}>
                                <BasicPopover
                                  text={
                                    "Preenchimento referente ao elemento N (azoto)."
                                  }
                                />
                              </Box>
                            </Stack>
                          </StyledTableHead>
                          <StyledTableCell>
                            {table.deduzir_camp1}
                            <BasicPopover
                              text={
                                "Parcela usada no cálculo automático do campo «previsão total de nutrientes a disponibilizar à cultura» do quadro 3 - Plano de aplicação, para o azoto (N).\n\nInserir o resultado da aplicação dos valores de azoto previstos no Anexo VI da Portaria n.º 295/2012 ou no Quadro 1 da GPP/OT/2023/3 - Instrucoes Caderno Campo em função dos resultados das análises de terras (pág.17). "
                              }
                            />
                          </StyledTableCell>
                          <StyledTableCell
                            colSpan={7}
                            sx={{ backgroundColor: "lightgrey" }}
                          ></StyledTableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={4}>
                            Quando são disponibilizados resultados analíticos
                            referentes ao teor de azoto do solo, identificar se
                            este corresponde a:
                          </TableCell>
                          <TableCell colSpan={2}>
                            <FormControlLabel
                              sx={{ paddingLeft: 8 }}
                              label={
                                <Typography fontFamily="candara" fontSize={14}>
                                  Azoto mineral
                                </Typography>
                              }
                              aria-readonly
                              control={
                                <Checkbox
                                  checked={
                                    table.Azoto_mineral === true &&
                                    table.Azoto_mineral
                                  }
                                  sx={{
                                    color: "#aaaaaa",
                                    "&.Mui-checked": {
                                      color: "#C94F1E",
                                    },
                                  }}
                                />
                              }
                            />
                          </TableCell>
                          <TableCell colSpan={2}>
                            <FormControlLabel
                              sx={{ paddingLeft: 8 }}
                              label={
                                <Typography fontFamily="candara" fontSize={14}>
                                  Azoto nítrico
                                </Typography>
                              }
                              aria-readonly
                              control={
                                <Checkbox
                                  checked={
                                    table.Azoto_mitrico === true &&
                                    table.Azoto_mitrico
                                  }
                                  sx={{
                                    color: "#aaaaaa",
                                    "&.Mui-checked": {
                                      color: "#C94F1E",
                                    },
                                  }}
                                />
                              }
                            />
                          </TableCell>
                          <TableCell colSpan={2}>
                            <FormControlLabel
                              sx={{ paddingLeft: 8 }}
                              label={
                                <Typography fontFamily="candara" fontSize={14}>
                                  Azoto total
                                </Typography>
                              }
                              aria-readonly
                              control={
                                <Checkbox
                                  checked={
                                    table.azoto_total === true &&
                                    table.azoto_total
                                  }
                                  sx={{
                                    color: "#aaaaaa",
                                    "&.Mui-checked": {
                                      color: "#C94F1E",
                                    },
                                  }}
                                />
                              }
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{ fontWeight: 600, fontFamily: "candara" }}
                          >
                            Data da colheita de terras:
                          </TableCell>
                          <TableCell>{table.data_colheira}</TableCell>
                          <TableCell
                            sx={{ fontWeight: 600, fontFamily: "candara" }}
                          >
                            Profundidade da colheita da amostra (cm):
                          </TableCell>
                          <TableCell>{table.pronfundidade}</TableCell>
                          <TableCell
                            sx={{ fontWeight: 600, fontFamily: "candara" }}
                          >
                            Data emissão resultados:
                          </TableCell>
                          <TableCell>{table.data_resultados}</TableCell>
                          <TableCell
                            sx={{ fontWeight: 600, fontFamily: "candara" }}
                          >
                            N.º de amostras
                          </TableCell>
                          <TableCell>{table.n_amostras}</TableCell>
                          <TableCell
                            sx={{ fontWeight: 600, fontFamily: "candara" }}
                          >
                            N.º do Boletim:
                          </TableCell>
                          <TableCell>{table.n_boletin}</TableCell>
                        </TableRow>
                      </>
                    )
                  )}
                </>
              );

            })}
        </TableBody>
        <ConfirmDialog
          open={open_dialog_tem_a_certeza_que_quer_eliminar}
          onClose={() => set_open_dialog_tem_a_certeza_que_quer_eliminar(false)}
          onConfirm={handle_delete}
          message="Deseja eliminar o registo?"
        />
      </table>
    </TableContainer>
  );
};
