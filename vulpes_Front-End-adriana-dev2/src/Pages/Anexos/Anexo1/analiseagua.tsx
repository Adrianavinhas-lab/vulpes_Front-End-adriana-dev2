import React, { useEffect } from "react";
import { useState } from "react";
import {
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
import BasicPopover from "../../../Components/Popover";
import { CustomTextField } from "../../../Styles/theme/customThemeprovider";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import { IAnaliseAguaA1 } from "../../../Interfaces/anexos/anexo1/analise_e_foliar1_1_3";
import { Alert } from "../../../Components/Alert/Alert";
import { del, get, post } from "../../../Services/tokenConfig";
import { func_print } from "../../../Func_genericas/func_print";
import { ICabecalho } from "../../../Interfaces/anexos/anexo1/analise_e_foliar1_1_3";

interface AnaliseAguaForm_prop {
  obj_anexo_cabecalho_selecionado: ICabecalho | undefined;
}

export const AnaliseAguaForm: React.FC<AnaliseAguaForm_prop> = ({ obj_anexo_cabecalho_selecionado }) => {
  const [createTable, setCreateTable] = useState(false);
  const [message, setMessage] = useState("");
  const [openDeleteAgua, setOpenDeleteAgua] = useState(false);
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const [error_dotacao, set_error_dotacao] = React.useState(false);
  const [error_resultado_camp1, set_error_resultado_camp1] = React.useState(false);
  const [error_resultado_camp2, set_error_resultado_camp2] = React.useState(false);
  const [error_resultado_camp3, set_error_resultado_camp3] = React.useState(false);
  const [error_resultado_camp4, set_error_resultado_camp4] = React.useState(false);
  const [error_resultado_camp5, set_error_resultado_camp5] = React.useState(false);
  const [error_resultado_camp6, set_error_resultado_camp6] = React.useState(false);
  const [error_resultado_camp7, set_error_resultado_camp7] = React.useState(false);
  const [error_resultado_camp8, set_error_resultado_camp8] = React.useState(false);
  const [error_resultado_camp9, set_error_resultado_camp9] = React.useState(false);
  const [error_resultado_camp10, set_error_resultado_camp10] = React.useState(false);
  const [error_resultado_camp11, set_error_resultado_camp11] = React.useState(false);
  const [error_quantidade_nutri_camp1, set_error_quantidade_nutri_camp1] = React.useState(false);
  const [error_quantidade_nutri_camp2, set_error_quantidade_nutri_camp2] = React.useState(false);
  const [error_data_resultados, set_error_data_resultados] = useState(true)
  const [error_data_colheira, set_error_data_colheira] = useState(true)
  const [open_dialog_tem_a_certeza_que_quer_eliminar, set_open_dialog_tem_a_certeza_que_quer_eliminar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [obj_anexo, set_obj_anexo] = useState<IAnaliseAguaA1>();
  const [obj_anexo_lista, set_obj_anexo_lista] = useState<IAnaliseAguaA1[]>([]);

  const handleCloseSnack = () => {
    setOpenSnackSuccess(false);
    setOpenSnackError(false);
  };


  const handle_delete_anexo = async () => {
    try {
      setIsLoading(true);

      let res = await del(
        `delete__reg_anexo_um_dois/${obj_anexo?.id_anexo_um_dois}`
      );
      if (res.status === 200) {
        let lista_aux: any = obj_anexo_lista.filter((el) => {
          if (el.id_anexo_um_dois !== obj_anexo?.id_anexo_um_dois) {
            return el
          }
        })
        set_obj_anexo_lista(lista_aux === undefined ? [] : lista_aux)
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

  const handle_criar_anexo = async () => {
    if (error_data_resultados || error_data_colheira || error_dotacao || error_resultado_camp1 || error_resultado_camp2 || error_resultado_camp3 || error_resultado_camp4 || error_resultado_camp5 || error_resultado_camp6 || error_resultado_camp7 || error_resultado_camp8 || error_resultado_camp9 || error_resultado_camp10 || error_resultado_camp11 || error_quantidade_nutri_camp1 || error_quantidade_nutri_camp2) {
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);

    } else {

      try {
        setIsLoading(true);

        let data = await post("new_reg_anexo_um_dois", {
          payload: {

            id_anexo_um_dois: 0,
            dotacao: obj_anexo?.dotacao === undefined ? '' : obj_anexo?.dotacao,
            origem_agua: obj_anexo?.origem_agua === undefined ? '' : obj_anexo?.origem_agua,
            metodo_rega: obj_anexo?.metodo_rega === undefined ? '' : obj_anexo?.metodo_rega,
            eficiencia: obj_anexo?.eficiencia === undefined ? '' : obj_anexo?.eficiencia,
            razao: obj_anexo?.razao === undefined ? '' : obj_anexo?.razao,
            resultado_camp1: obj_anexo?.resultado_camp1 === undefined ? '' : obj_anexo?.resultado_camp1,
            resultado_camp2: obj_anexo?.resultado_camp2 === undefined ? '' : obj_anexo?.resultado_camp2,
            resultado_camp3: obj_anexo?.resultado_camp3 === undefined ? '' : obj_anexo?.resultado_camp3,
            resultado_camp4: obj_anexo?.resultado_camp4 === undefined ? '' : obj_anexo?.resultado_camp4,
            resultado_camp5: obj_anexo?.resultado_camp5 === undefined ? '' : obj_anexo?.resultado_camp5,
            resultado_camp6: obj_anexo?.resultado_camp6 === undefined ? '' : obj_anexo?.resultado_camp6,
            resultado_camp7: obj_anexo?.resultado_camp7 === undefined ? '' : obj_anexo?.resultado_camp7,
            resultado_camp8: obj_anexo?.resultado_camp8 === undefined ? '' : obj_anexo?.resultado_camp8,
            resultado_camp9: obj_anexo?.resultado_camp9 === undefined ? '' : obj_anexo?.resultado_camp9,
            resultado_camp10: obj_anexo?.resultado_camp10 === undefined ? '' : obj_anexo?.resultado_camp10,
            resultado_camp11: obj_anexo?.resultado_camp11 === undefined ? '' : obj_anexo?.resultado_camp11,
            quantidade_nutri_camp1: obj_anexo?.quantidade_nutri_camp1 === undefined ? '' : obj_anexo?.quantidade_nutri_camp1,
            quantidade_nutri_camp2: obj_anexo?.quantidade_nutri_camp2 === undefined ? '' : obj_anexo?.quantidade_nutri_camp2,
            quantidade_nutri_camp3: obj_anexo?.quantidade_nutri_camp3 === undefined ? '' : obj_anexo?.quantidade_nutri_camp3,
            k: obj_anexo?.k === undefined ? false : obj_anexo?.k,
            ko: obj_anexo?.ko === undefined ? false : obj_anexo?.ko,
            data_colheita: obj_anexo?.data_colheita === undefined ? '' : obj_anexo?.data_colheita,
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
  const onInputChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    let aux_obj_anexo: any = obj_anexo === undefined ? {} : obj_anexo

    if (type === "checkbox") {
      aux_obj_anexo[name] = aux_obj_anexo[name] === undefined ? true : !aux_obj_anexo[name]
      set_obj_anexo(aux_obj_anexo);

    } else {
      if (name === 'data_colheita') {
        set_error_data_colheira(false)
      }
      if (name === 'data_resultados') {
        set_error_data_resultados(false)
      }

      if (name === 'dotacao') {
        if (!/^\d+$/.test(value)) {
          set_error_dotacao(true)
        } else {
          set_error_dotacao(false)
        }
      }
      if (name === 'resultado_camp1') {
        if (!/^\d+$/.test(value)) {
          set_error_resultado_camp1(true)
        } else {
          set_error_resultado_camp1(false)
        }
      }
      if (name === 'resultado_camp2') {
        if (!/^\d+$/.test(value)) {
          set_error_resultado_camp2(true)
        } else {
          set_error_resultado_camp2(false)
        }
      }
      if (name === 'resultado_camp3') {
        if (!/^\d+$/.test(value)) {
          set_error_resultado_camp3(true)
        } else {
          set_error_resultado_camp3(false)
        }
      }
      if (name === 'resultado_camp4') {
        if (!/^\d+$/.test(value)) {
          set_error_resultado_camp4(true)
        } else {
          set_error_resultado_camp4(false)
        }
      }
      if (name === 'resultado_camp5') {
        if (!/^\d+$/.test(value)) {
          set_error_resultado_camp5(true)
        } else {
          set_error_resultado_camp5(false)
        }
      }
      if (name === 'resultado_camp6') {
        if (!/^\d+$/.test(value)) {
          set_error_resultado_camp6(true)
        } else {
          set_error_resultado_camp6(false)
        }
      }
      if (name === 'resultado_camp7') {
        if (!/^\d+$/.test(value)) {
          set_error_resultado_camp7(true)
        } else {
          set_error_resultado_camp7(false)
        }
      }
      if (name === 'resultado_camp8') {
        if (!/^\d+$/.test(value)) {
          set_error_resultado_camp8(true)
        } else {
          set_error_resultado_camp8(false)
        }
      }
      if (name === 'resultado_camp9') {
        if (!/^\d+$/.test(value)) {
          set_error_resultado_camp9(true)
        } else {
          set_error_resultado_camp9(false)
        }
      }
      if (name === 'resultado_camp10') {
        if (!/^\d+$/.test(value)) {
          set_error_resultado_camp10(true)
        } else {
          set_error_resultado_camp10(false)
        }
      }
      if (name === 'resultado_camp11') {
        if (!/^\d+$/.test(value)) {
          set_error_resultado_camp11(true)
        } else {
          set_error_resultado_camp11(false)
        }
      }
      if (name === 'quantidade_nutri_camp1') {
        if (!/^\d+$/.test(value)) {
          set_error_quantidade_nutri_camp1(true)
        } else {
          set_error_quantidade_nutri_camp1(false)
        }
      }
      if (name === 'quantidade_nutri_camp2') {
        if (!/^\d+$/.test(value)) {
          set_error_quantidade_nutri_camp2(true)
        } else {
          set_error_quantidade_nutri_camp2(false)
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
      let res = await get(
        `/get_reg_anexo_um_dois_cabecalho/${obj_anexo_cabecalho_selecionado?.id_anexo_um_cabecalho}`
      );
      func_print('get_info res2222', res)
      func_print('obj_anexo_cabecalho_selecionado?.id_anexo_um_cabecalho res1111', obj_anexo_cabecalho_selecionado?.id_anexo_um_cabecalho)
      if (res.status === 200) {
        if (res.data.result.length !== 0) {
          set_obj_anexo_lista(res.data.result);
        } else {
          setCreateTable(true)
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

  return (
    <>
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
                colSpan={12}
                sx={{
                  fontWeight: 600,

                  fontFamily: "candara",
                  fontSize: 16,
                }}
              >
                1.2 Análise da água de rega
                <BasicPopover
                  text={
                    "Os boletins de análise devem ser mantidos pelo beneficiário por forma a serem consultados sempre que necessário pelas entidades que monitorizam, verificam a aplicação da legislação nacional aplicável no âmbito da gestão de nutrientes disponibilizados às culturas."
                  }
                />
              </TableCell>

              {createTable === false ?
                <TableCell>
                  <Stack direction="row" justifyContent="end">
                    <BarraDeFerramentas
                      mostrarBotaoNovo
                      textoBotaoNovo="Registar"
                      aoClicarNovo={() => setCreateTable(true)}
                    />
                  </Stack>
                </TableCell>
                :
                <>

                  <TableCell>
                    <ButtonCadernos
                      mostrarBotaoCancelar
                      aoClicarCancelar={() => setCreateTable(false)}
                      mostrarBotaoGravar
                      aoClicarGravar={() => { handle_criar_anexo() }}
                    />
                  </TableCell>
                </>

              }
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.length <= 0 && createTable === false && <TabelaAguaHome />} */}
            {createTable && (
              <>
                <TableRow>
                  <TableCell
                    colSpan={5}
                    sx={{
                      fontWeight: 600,
                      fontFamily: "candara",
                    }}
                  >
                    Dotação (m3/ha):
                    <CustomTextField
                      name="dotacao"
                      value={obj_anexo?.dotacao === undefined ? '' : obj_anexo?.dotacao}
                      onChange={onInputChange}
                      error={error_dotacao}
                      helperText={error_dotacao ? "Apenas números são aceites" : ""}
                    />
                  </TableCell>
                  <TableCell
                    colSpan={4}
                    sx={{
                      fontWeight: 600,
                      fontFamily: "candara",
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{ justifyContent: "center", alignItems: "center" }}
                    >
                      Origem da água:
                      <CustomTextField
                        name="origem_agua"
                        value={obj_anexo?.origem_agua === undefined ? '' : obj_anexo?.origem_agua}
                        onChange={onInputChange}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell
                    colSpan={4}
                    sx={{
                      fontWeight: 600,
                      fontFamily: "candara",
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{ justifyContent: "center", alignItems: "center" }}
                    >
                      Método de rega:
                      <CustomTextField
                        name="metodo_rega"
                        value={obj_anexo?.metodo_rega === undefined ? '' : obj_anexo?.metodo_rega}
                        onChange={onInputChange}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={4}
                    sx={{
                      fontWeight: 600,
                      fontFamily: "candara",
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{ justifyContent: "center", alignItems: "center" }}
                    >
                      Eficiência de rega:
                      <CustomTextField
                        name="eficiencia"
                        value={obj_anexo?.eficiencia === undefined ? '' : obj_anexo?.eficiencia}
                        onChange={onInputChange}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell
                    colSpan={9}
                    sx={{
                      fontWeight: 600,
                      fontFamily: "candara",
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{ justifyContent: "center", alignItems: "center" }}
                    >
                      Razão de adsorção de sódio ajustada:
                      <CustomTextField
                        name="razao"
                        multiline
                        value={obj_anexo?.razao === undefined ? '' : obj_anexo?.razao}

                        onChange={onInputChange}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableHead sx={{ minWidth: 100 }} colSpan={2}>
                    Elemento/nutriente
                    <BasicPopover text="Todos os campos deste quadro são de preenchimento obrigatório." />
                  </StyledTableHead>
                  <StyledTableHead sx={{ minWidth: 100 }}>
                    N
                    <BasicPopover text="Azoto sob a forma de nitrato (NO3)" />
                  </StyledTableHead>
                  <StyledTableHead sx={{ minWidth: 100 }}>
                    P2O5
                    <BasicPopover text="Fósforo" />
                  </StyledTableHead>
                  <StyledTableHead sx={{ minWidth: 100 }}>
                    K
                    <BasicPopover text="Potássio" />
                  </StyledTableHead>
                  <StyledTableHead sx={{ minWidth: 100 }}>
                    Mg
                    <BasicPopover text="Magnésio" />
                  </StyledTableHead>
                  <StyledTableHead sx={{ minWidth: 100 }}>
                    Bicarbonatos
                  </StyledTableHead>
                  <StyledTableHead sx={{ minWidth: 100 }}>
                    B
                    <BasicPopover text="Boro" />
                  </StyledTableHead>
                  <StyledTableHead sx={{ minWidth: 100 }}>
                    Ca
                    <BasicPopover text="Cálcio" />
                  </StyledTableHead>
                  <StyledTableHead sx={{ minWidth: 100 }}>
                    Clorestos
                  </StyledTableHead>
                  <StyledTableHead sx={{ minWidth: 100 }}>
                    Na
                    <BasicPopover text="Sódio" />
                  </StyledTableHead>
                  <StyledTableHead sx={{ minWidth: 100 }}>
                    pH(H2O)
                  </StyledTableHead>
                  <StyledTableHead sx={{ minWidth: 100 }}>
                    C.E. (dS/m)
                    <BasicPopover text="Condutividade elétrica" />
                  </StyledTableHead>
                </TableRow>
                <TableRow>
                  <StyledTableHead>Resultado das análises</StyledTableHead>
                  <StyledTableHead>(mg/l)</StyledTableHead>
                  <StyledTableHead>
                    <CustomTextField
                      name="resultado_camp1"
                      value={obj_anexo?.resultado_camp1 === undefined ? '' : obj_anexo?.resultado_camp1}
                      onChange={onInputChange}
                      error={error_resultado_camp1}
                      helperText={error_resultado_camp1 ? "Apenas números são aceites" : ""}
                    />
                  </StyledTableHead>
                  <StyledTableHead>
                    <CustomTextField
                      name="resultado_camp2"
                      value={obj_anexo?.resultado_camp2 === undefined ? '' : obj_anexo?.resultado_camp2}
                      onChange={onInputChange}
                      error={error_resultado_camp2}
                      helperText={error_resultado_camp2 ? "Apenas números são aceites" : ""}
                    />
                  </StyledTableHead>
                  <StyledTableHead>
                    <CustomTextField
                      name="resultado_camp3"
                      value={obj_anexo?.resultado_camp3 === undefined ? '' : obj_anexo?.resultado_camp3}
                      onChange={onInputChange}
                      error={error_resultado_camp3}
                      helperText={error_resultado_camp3 ? "Apenas números são aceites" : ""}
                    />
                  </StyledTableHead>
                  <StyledTableHead>
                    <CustomTextField
                      name="resultado_camp4"
                      value={obj_anexo?.resultado_camp4 === undefined ? '' : obj_anexo?.resultado_camp4}
                      onChange={onInputChange}
                      error={error_resultado_camp4}
                      helperText={error_resultado_camp4 ? "Apenas números são aceites" : ""}
                    />
                  </StyledTableHead>
                  <StyledTableHead>
                    <CustomTextField
                      name="resultado_camp5"
                      value={obj_anexo?.resultado_camp5 === undefined ? '' : obj_anexo?.resultado_camp5}
                      onChange={onInputChange}
                      error={error_resultado_camp5}
                      helperText={error_resultado_camp5 ? "Apenas números são aceites" : ""}
                    />
                  </StyledTableHead>
                  <StyledTableHead>
                    <CustomTextField
                      name="resultado_camp6"
                      value={obj_anexo?.resultado_camp6 === undefined ? '' : obj_anexo?.resultado_camp6}
                      onChange={onInputChange}
                      error={error_resultado_camp6}
                      helperText={error_resultado_camp6 ? "Apenas números são aceites" : ""}
                    />
                  </StyledTableHead>
                  <StyledTableHead>
                    <CustomTextField
                      name="resultado_camp7"
                      value={obj_anexo?.resultado_camp7 === undefined ? '' : obj_anexo?.resultado_camp7}
                      onChange={onInputChange}
                      error={error_resultado_camp7}
                      helperText={error_resultado_camp7 ? "Apenas números são aceites" : ""}
                    />
                  </StyledTableHead>
                  <StyledTableHead>
                    <CustomTextField
                      name="resultado_camp8"
                      value={obj_anexo?.resultado_camp8 === undefined ? '' : obj_anexo?.resultado_camp8}
                      onChange={onInputChange}
                      error={error_resultado_camp8}
                      helperText={error_resultado_camp8 ? "Apenas números são aceites" : ""}
                    />
                  </StyledTableHead>
                  <StyledTableHead>
                    <CustomTextField
                      name="resultado_camp9"
                      value={obj_anexo?.resultado_camp9 === undefined ? '' : obj_anexo?.resultado_camp9}
                      onChange={onInputChange}
                      error={error_resultado_camp9}
                      helperText={error_resultado_camp9 ? "Apenas números são aceites" : ""}
                    />
                  </StyledTableHead>
                  <StyledTableHead>
                    <CustomTextField
                      name="resultado_camp10"
                      value={obj_anexo?.resultado_camp10 === undefined ? '' : obj_anexo?.resultado_camp10}
                      onChange={onInputChange}
                      error={error_resultado_camp10}
                      helperText={error_resultado_camp10 ? "Apenas números são aceites" : ""}
                    />
                  </StyledTableHead>
                  <StyledTableHead>
                    <CustomTextField
                      name="resultado_camp11"
                      value={obj_anexo?.resultado_camp11 === undefined ? '' : obj_anexo?.resultado_camp11}
                      onChange={onInputChange}
                      error={error_resultado_camp11}
                      helperText={error_resultado_camp11 ? "Apenas números são aceites" : ""}
                    />
                  </StyledTableHead>
                </TableRow>
                <TableRow>
                  <StyledTableHead colSpan={2}>
                    Quantidade de nutriente fornecida pela água de rega (kg/ha)
                  </StyledTableHead>
                  <StyledTableCell>
                    <CustomTextField
                      name="quantidade_nutri_camp1"
                      value={obj_anexo?.quantidade_nutri_camp1 === undefined ? '' : obj_anexo?.quantidade_nutri_camp1}
                      onChange={onInputChange}
                      error={error_quantidade_nutri_camp1}
                      helperText={error_quantidade_nutri_camp1 ? "Apenas números são aceites" : ""}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="quantidade_nutri_camp2"
                      value={obj_anexo?.quantidade_nutri_camp2 === undefined ? '' : obj_anexo?.quantidade_nutri_camp2}
                      onChange={onInputChange}
                      error={error_quantidade_nutri_camp2}
                      helperText={error_quantidade_nutri_camp2 ? "Apenas números são aceites" : ""}
                    />
                  </StyledTableCell>

                  <StyledTableCell
                    colSpan={9}
                    sx={{ backgroundColor: "lightgray" }}
                  ></StyledTableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}>
                    Identificar se a avaliação do teor de potássio na água de
                    rega foi expresso em:
                  </TableCell>

                  <TableCell colSpan={4}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <FormControlLabel
                        name="k"
                        label={
                          <Typography fontFamily="candara" fontSize={18}>
                            K
                          </Typography>
                        }
                        aria-readonly
                        control={
                          <Checkbox
                            defaultChecked={obj_anexo?.k === true && true}
                            value={obj_anexo?.k === true && obj_anexo?.k}
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
                    </Stack>
                  </TableCell>

                  <TableCell colSpan={4}>
                    <FormControlLabel
                      name="ko"
                      label={
                        <Typography fontFamily="candara" fontSize={18}>
                          K2O
                        </Typography>
                      }
                      aria-readonly
                      control={
                        <Checkbox
                          defaultChecked={obj_anexo?.ko === true && true}
                          value={obj_anexo?.ko === true && obj_anexo?.ko}
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
                    colSpan={4}
                    sx={{
                      fontWeight: 600,
                      fontFamily: "candara",
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{ justifyContent: "center", alignItems: "center" }}
                    >
                      Data da colheita da água:
                      <TextField
                        variant="filled"
                        name="data_colheita"
                        error={error_data_colheira}
                        helperText={error_data_colheira === true ? 'Data obrigatória' : ''}
                        type="date"
                        inputProps={{
                          style: { fontSize: 12, fontFamily: "verdana" },
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={obj_anexo?.data_colheita}
                        onChange={onInputChange}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell
                    colSpan={3}
                    sx={{
                      fontWeight: 600,
                      fontFamily: "candara",
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{ justifyContent: "center", alignItems: "center" }}
                    >
                      Data emissão resultados:
                      <TextField
                        variant="filled"
                        name="data_resultados"
                        error={error_data_resultados}
                        helperText={error_data_resultados === true ? 'Data obrigatória' : ''}
                        type="date"
                        inputProps={{
                          style: { fontSize: 12, fontFamily: "verdana" },
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={obj_anexo?.data_resultados}
                        onChange={onInputChange}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell
                    colSpan={3}
                    sx={{
                      fontWeight: 600,
                      fontFamily: "candara",
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{ justifyContent: "center", alignItems: "center" }}
                    >
                      N.º de amostras
                      <CustomTextField
                        name="n_amostras"
                        value={obj_anexo?.n_amostras === undefined ? '' : obj_anexo?.n_amostras}
                        onChange={onInputChange}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell
                    colSpan={3}
                    sx={{
                      fontWeight: 600,
                      fontFamily: "candara",
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{ justifyContent: "center", alignItems: "center" }}
                    >
                      N.º do Boletim:
                      <CustomTextField
                        name="n_boletin"
                        value={obj_anexo?.n_boletin === undefined ? '' : obj_anexo?.n_boletin}
                        onChange={onInputChange}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              </>
            )}

            {obj_anexo_lista.map((row, key) => {
              if (obj_anexo?.id_anexo_um_dois === row.id_anexo_um_dois) {
                return (
                  <>
                    <TableRow key={key}>
                      <TableCell>

                        <ButtonCadernos
                          mostrarBotaoGravar
                          aoClicarGravar={() => { }}
                          mostrarBotaoCancelar
                          aoClicarCancelar={() => { }}
                        />
                      </TableCell>

                    </TableRow>


                    <TableRow>
                      <TableCell
                        colSpan={5}
                        sx={{
                          fontWeight: 600,

                          fontFamily: "candara",
                        }}
                      >
                        <Stack
                          direction="row"
                          sx={{ justifyContent: "center" }}
                        >
                          Dotação (m3/ha):
                          <CustomTextField
                            name="dotacao"
                            value={row.dotacao}
                            onChange={onInputChange}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell
                        colSpan={4}
                        sx={{
                          fontWeight: 600,

                          fontFamily: "candara",
                        }}
                      >
                        <Stack
                          direction="row"
                          sx={{ justifyContent: "center" }}
                        >
                          Origem da água:
                          <CustomTextField
                            name="origem_agua"
                            value={obj_anexo?.origem_agua === undefined ? '' : obj_anexo?.origem_agua}
                            onChange={onInputChange}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell
                        colSpan={4}
                        sx={{
                          fontWeight: 600,

                          fontFamily: "candara",
                        }}
                      >
                        <Stack
                          direction="row"
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Método de rega:
                          <CustomTextField
                            name="metodo_rega"
                            value={obj_anexo?.metodo_rega === undefined ? '' : obj_anexo?.metodo_rega}

                            onChange={onInputChange}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        sx={{
                          fontWeight: 600,

                          fontFamily: "candara",
                        }}
                      >
                        <Stack
                          direction="row"
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Eficiência de rega:
                          <CustomTextField
                            name="eficiencia"
                            value={obj_anexo?.eficiencia === undefined ? '' : obj_anexo?.eficiencia}
                            onChange={onInputChange}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell
                        colSpan={9}
                        sx={{
                          fontWeight: 600,

                          fontFamily: "candara",
                        }}
                      >
                        <Stack
                          direction="row"
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Razão de adsorção de sódio ajustada:
                          <CustomTextField
                            name="razao"
                            multiline
                            value={obj_anexo?.razao === undefined ? '' : obj_anexo?.razao}
                            onChange={onInputChange}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead sx={{ minWidth: 100 }} colSpan={2}>
                        Elemento/nutriente
                        <BasicPopover text="Todos os campos deste quadro são de preenchimento obrigatório." />
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        N
                        <BasicPopover text="Azoto sob a forma de nitrato (NO3)" />
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        P2O5
                        <BasicPopover text="Fósforo" />
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        K
                        <BasicPopover text="Potássio" />
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        Mg
                        <BasicPopover text="Magnésio" />
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        Bicarbonatos
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        B
                        <BasicPopover text="Boro" />
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        Ca
                        <BasicPopover text="Cálcio" />
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        Clorestos
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        Na
                        <BasicPopover text="Sódio" />
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        pH(H2O)
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        C.E. (dS/m)
                        <BasicPopover text="Condutividade elétrica" />
                      </StyledTableHead>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        Resultado das análises
                      </StyledTableHead>
                      <StyledTableHead>(mg/l)</StyledTableHead>
                      <StyledTableHead>
                        <CustomTextField
                          name="resultado_camp1"
                          value={obj_anexo?.resultado_camp1 === undefined ? '' : obj_anexo?.resultado_camp1}
                          onChange={onInputChange}
                          error={error_resultado_camp1}
                          helperText={error_resultado_camp1 ? "Apenas números são aceites" : ""}
                        />
                      </StyledTableHead>
                      <StyledTableHead>
                        <CustomTextField
                          name="resultado_camp2"
                          value={obj_anexo?.resultado_camp2 === undefined ? '' : obj_anexo?.resultado_camp2}
                          onChange={onInputChange}
                          error={error_resultado_camp2}
                          helperText={error_resultado_camp2 ? "Apenas números são aceites" : ""}
                        />
                      </StyledTableHead>
                      <StyledTableHead>
                        <CustomTextField
                          name="resultado_camp3"
                          value={obj_anexo?.resultado_camp3 === undefined ? '' : obj_anexo?.resultado_camp3}
                          onChange={onInputChange}
                          error={error_resultado_camp3}
                          helperText={error_resultado_camp3 ? "Apenas números são aceites" : ""}
                        />
                      </StyledTableHead>
                      <StyledTableHead>
                        <CustomTextField
                          name="resultado_camp4"
                          value={obj_anexo?.resultado_camp4 === undefined ? '' : obj_anexo?.resultado_camp4}
                          onChange={onInputChange}
                          error={error_resultado_camp4}
                          helperText={error_resultado_camp4 ? "Apenas números são aceites" : ""}
                        />
                      </StyledTableHead>
                      <StyledTableHead>
                        <CustomTextField
                          name="resultado_camp5"
                          value={obj_anexo?.resultado_camp5 === undefined ? '' : obj_anexo?.resultado_camp5}
                          onChange={onInputChange}
                          error={error_resultado_camp5}
                          helperText={error_resultado_camp5 ? "Apenas números são aceites" : ""}
                        />
                      </StyledTableHead>
                      <StyledTableHead>
                        <CustomTextField
                          name="resultado_camp6"
                          value={obj_anexo?.resultado_camp6 === undefined ? '' : obj_anexo?.resultado_camp6}
                          onChange={onInputChange}
                          error={error_resultado_camp6}
                          helperText={error_resultado_camp6 ? "Apenas números são aceites" : ""}
                        />
                      </StyledTableHead>
                      <StyledTableHead>
                        <CustomTextField
                          name="resultado_camp7"
                          value={obj_anexo?.resultado_camp7 === undefined ? '' : obj_anexo?.resultado_camp7}
                          onChange={onInputChange}
                          error={error_resultado_camp7}
                          helperText={error_resultado_camp7 ? "Apenas números são aceites" : ""}
                        />
                      </StyledTableHead>
                      <StyledTableHead>
                        <CustomTextField
                          name="resultado_camp8"
                          value={obj_anexo?.resultado_camp8 === undefined ? '' : obj_anexo?.resultado_camp8}
                          onChange={onInputChange}
                          error={error_resultado_camp8}
                          helperText={error_resultado_camp8 ? "Apenas números são aceites" : ""}
                        />
                      </StyledTableHead>
                      <StyledTableHead>
                        <CustomTextField
                          name="resultado_camp9"
                          value={obj_anexo?.resultado_camp9 === undefined ? '' : obj_anexo?.resultado_camp9}
                          onChange={onInputChange}
                          error={error_resultado_camp9}
                          helperText={error_resultado_camp9 ? "Apenas números são aceites" : ""}
                        />
                      </StyledTableHead>
                      <StyledTableHead>
                        <CustomTextField
                          name="resultado_camp10"
                          value={obj_anexo?.resultado_camp10 === undefined ? '' : obj_anexo?.resultado_camp10}
                          onChange={onInputChange}
                          error={error_resultado_camp10}
                          helperText={error_resultado_camp10 ? "Apenas números são aceites" : ""}
                        />
                      </StyledTableHead>
                      <StyledTableHead>
                        <CustomTextField
                          name="resultado_camp11"
                          value={obj_anexo?.resultado_camp10 === undefined ? '' : obj_anexo?.resultado_camp10}
                          onChange={onInputChange}
                          error={error_resultado_camp10}
                          helperText={error_resultado_camp10 ? "Apenas números são aceites" : ""}
                        />
                      </StyledTableHead>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead colSpan={2}>
                        Quantidade de nutriente fornecida pela água de rega
                        (kg/ha)
                      </StyledTableHead>
                      <StyledTableCell>
                        <CustomTextField
                          name="quantidade_nutri_camp1"
                          value={obj_anexo?.quantidade_nutri_camp1 === undefined ? '' : obj_anexo?.quantidade_nutri_camp1}
                          onChange={onInputChange}
                          error={error_quantidade_nutri_camp1}
                          helperText={error_quantidade_nutri_camp1 ? "Apenas números são aceites" : ""}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="quantidade_nutri_camp2"
                          value={obj_anexo?.quantidade_nutri_camp2 === undefined ? '' : obj_anexo?.quantidade_nutri_camp2}
                          onChange={onInputChange}
                          error={error_quantidade_nutri_camp2}
                          helperText={error_quantidade_nutri_camp2 ? "Apenas números são aceites" : ""}
                        />
                      </StyledTableCell>
                      <StyledTableCell
                        colSpan={9}
                        sx={{ backgroundColor: "lightgray" }}
                      ></StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5}>
                        Identificar se a avaliação do teor de potássio na
                        água de rega foi expresso em:
                      </TableCell>
                      <TableCell colSpan={4}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <FormControlLabel
                            name="k"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={18}
                              >
                                K
                              </Typography>
                            }
                            aria-readonly
                            control={
                              <Checkbox
                                checked={row.k === true && true}
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
                        </Stack>
                      </TableCell>
                      <TableCell colSpan={4}>
                        <FormControlLabel
                          name="ko"
                          label={
                            <Typography fontFamily="candara" fontSize={18}>
                              K2O
                            </Typography>
                          }
                          aria-readonly
                          control={
                            <Checkbox
                              checked={row.ko === true && true}
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
                        colSpan={4}
                        sx={{
                          fontWeight: 600,
                          fontFamily: "candara",
                        }}
                      >
                        <Stack
                          direction="row"
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Data da colheita da água:
                          <TextField
                            variant="filled"
                            name="data_colheita"
                            error={error_data_colheira}
                            helperText={error_data_colheira === true ? 'Data obrigatória' : ''}
                            type="date"
                            inputProps={{
                              style: {
                                fontSize: 12,
                                fontFamily: "verdana",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={row.data_colheita}
                            onChange={onInputChange}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell
                        colSpan={3}
                        sx={{
                          fontWeight: 600,
                          fontFamily: "candara",
                        }}
                      >
                        <Stack
                          direction="row"
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Data emissão resultados:
                          <TextField
                            variant="filled"
                            name="data_resultados"
                            error={error_data_resultados}
                            helperText={error_data_resultados === true ? 'Data obrigatória' : ''}
                            type="date"
                            inputProps={{
                              style: {
                                fontSize: 12,
                                fontFamily: "verdana",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={row.data_resultados}
                            onChange={onInputChange}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell
                        colSpan={3}
                        sx={{
                          fontWeight: 600,
                          fontFamily: "candara",
                        }}
                      >
                        <Stack
                          direction="row"
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          N.º de amostras
                          <CustomTextField
                            name="n_amostras"
                            value={row.n_amostras}
                            onChange={onInputChange}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell
                        colSpan={3}
                        sx={{
                          fontWeight: 600,
                          fontFamily: "candara",
                        }}
                      >
                        <Stack
                          direction="row"
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          N.º do Boletim:
                          <CustomTextField
                            name="n_boletin"
                            value={row.n_boletin}
                            onChange={onInputChange}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  </>
                )
              } else {
                return (
                  <>
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        sx={{
                          textAlign: "right",
                          fontWeight: 600,
                          fontFamily: "candara",
                        }}
                      >
                        Dotação (m3/ha):
                      </TableCell>
                      <TableCell>{row.dotacao}</TableCell>

                      <TableCell
                        colSpan={2}
                        sx={{
                          textAlign: "right",
                          fontWeight: 600,
                          fontFamily: "candara",
                        }}
                      >
                        Origem da água:
                      </TableCell>
                      <TableCell colSpan={2}>
                        {row.origem_agua}
                      </TableCell>

                      <TableCell
                        colSpan={2}
                        sx={{
                          textAlign: "right",
                          fontWeight: 600,
                          fontFamily: "candara",
                        }}
                      >
                        Método de rega:
                      </TableCell>
                      <TableCell colSpan={4} sx={{}}>
                        {row.metodo_rega}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        sx={{
                          textAlign: "right",
                          fontWeight: 600,
                          fontFamily: "candara",
                        }}
                      >
                        Eficiência de rega:
                      </TableCell>
                      <TableCell colSpan={3} sx={{}}>
                        {row.eficiencia}
                      </TableCell>

                      <TableCell
                        colSpan={4}
                        sx={{
                          textAlign: "right",
                          fontWeight: 600,
                          fontFamily: "candara",
                        }}
                      >
                        Razão de adsorção de sódio ajustada:
                      </TableCell>
                      <TableCell colSpan={4} sx={{}}>
                        {row.razao}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead sx={{ minWidth: 100 }} colSpan={2}>
                        Elemento/nutriente
                        <BasicPopover text="Todos os campos deste quadro são de preenchimento obrigatório." />
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        N
                        <BasicPopover text="Azoto sob a forma de nitrato (NO3)" />
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        P2O5
                        <BasicPopover text="Fósforo" />
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        K
                        <BasicPopover text="Potássio" />
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        Mg
                        <BasicPopover text="Magnésio" />
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        Bicarbonatos
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        B
                        <BasicPopover text="Boro" />
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        Ca
                        <BasicPopover text="Cálcio" />
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        Clorestos
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        Na
                        <BasicPopover text="Sódio" />
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        pH(H2O)
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 100 }}>
                        C.E. (dS/m)
                        <BasicPopover text="Condutividade elétrica" />
                      </StyledTableHead>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        Resultado das análises
                      </StyledTableHead>
                      <StyledTableHead>(mg/l)</StyledTableHead>
                      <StyledTableCell>
                        {row.resultado_camp1}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.resultado_camp2}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.resultado_camp3}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.resultado_camp4}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.resultado_camp5}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.resultado_camp6}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.resultado_camp7}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.resultado_camp8}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.resultado_camp9}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.resultado_camp10}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.resultado_camp11}
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead colSpan={2}>
                        Quantidade de nutriente fornecida pela água de
                        rega (kg/ha)
                      </StyledTableHead>
                      <StyledTableCell>
                        {row.quantidade_nutri_camp1}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.quantidade_nutri_camp2}
                      </StyledTableCell>

                      <StyledTableCell
                        colSpan={9}
                        sx={{ backgroundColor: "lightgray" }}
                      ></StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5}>
                        Identificar se a avaliação do teor de potássio na
                        água de rega foi expresso em:
                      </TableCell>

                      <TableCell colSpan={4}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <FormControlLabel
                            name="k"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={18}
                              >
                                K
                              </Typography>
                            }
                            aria-readonly
                            control={
                              <Checkbox
                                checked={row.k === true && true}
                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </Stack>
                      </TableCell>

                      <TableCell colSpan={4}>
                        <FormControlLabel
                          name="ko"
                          label={
                            <Typography
                              fontFamily="candara"
                              fontSize={18}
                            >
                              K2O
                            </Typography>
                          }
                          aria-readonly
                          control={
                            <Checkbox
                              checked={row.ko === true && true}
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
                        sx={{
                          textAlign: "right",
                          fontWeight: 600,
                          fontFamily: "candara",
                        }}
                      >
                        Data da colheita da água:
                      </TableCell>
                      <TableCell colSpan={2}>
                        {row.data_colheita}
                      </TableCell>
                      <TableCell
                        colSpan={2}
                        sx={{
                          textAlign: "right",
                          fontWeight: 600,
                          fontFamily: "candara",
                        }}
                      >
                        Data emissão resultados:
                      </TableCell>
                      <TableCell colSpan={2}>
                        {row.data_resultados}
                      </TableCell>
                      <TableCell
                        colSpan={2}
                        sx={{
                          textAlign: "right",
                          fontWeight: 600,
                          fontFamily: "candara",
                        }}
                      >
                        N.º de amostras
                      </TableCell>
                      <TableCell>{row.n_amostras}</TableCell>
                      <TableCell
                        colSpan={2}
                        sx={{
                          textAlign: "right",
                          fontWeight: 600,
                          fontFamily: "candara",
                        }}
                      >
                        N. do Boletim:
                      </TableCell>
                      <TableCell>{row.n_boletin}</TableCell>
                    </TableRow>
                  </>
                )
              }
            })}
          </TableBody>
        </table>
        <ConfirmDialog
          open={open_dialog_tem_a_certeza_que_quer_eliminar}
          onClose={() => set_open_dialog_tem_a_certeza_que_quer_eliminar(false)}
          onConfirm={handle_delete_anexo}
          message="Deseja eliminar o registo?"
        />
      </TableContainer >
    </>
  );
};