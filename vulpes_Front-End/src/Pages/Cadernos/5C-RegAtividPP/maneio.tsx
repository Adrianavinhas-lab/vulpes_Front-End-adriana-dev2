import React, { useEffect, useRef } from "react";
import { ChangeEvent, useState } from "react";

import { Box, Snackbar, TableCell, TableContainer, TableHead, TableRow, Typography, } from "@mui/material";
import { TableFooter, TablePagination } from "@mui/material";
import { Paper, Stack, TableBody } from "@mui/material";

import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import TablePaginationActions from "../../../Components/Pagination/pagination";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { StyledTableCell, StyledTableHead, } from "../../../Styles/tabelCellStyled/customTableCell";
import { CustomTextField, CustomThemeProvider, } from "../../../Styles/theme/customThemeprovider";
import BasicPopover from "../../../Components/Popover";
import { IManeioEPecuario } from "../../../Interfaces/cadernos/caderno5/interfaces5C";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import { del, get, post } from "../../../Services/tokenConfig";
import { func_print } from "../../../Func_genericas/func_print";
import { Alert } from "../../../Components/Alert/Alert";
import { useLocation } from "react-router-dom";



export const ManeioEPecuarioForm = () => {
  const location = useLocation();

  const [showNewRow, setShowNewRow] = useState(false);
  const [editingId, setEditingId] = useState<number | null | undefined>(null);
  const [message, setMessage] = React.useState("");

  const [idToDeleteManeio, setIdToDeleteManeio] = useState<number | null | undefined>(null);

  const [openDeleteManeio, setOpenDeleteManeio] = React.useState(false);

  const [rowsManeio, setRowsManeio] = useState<IManeioEPecuario[]>([]);
  const [maneio, setManeio] = useState<IManeioEPecuario>();

  const [isLoading, setIsLoading] = useState(true);
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const [editRow, setEditRow] = useState(false);

  const [error_area, set_error_area] = useState<boolean>(false);
  const [error_cn_out_dez, set_error_cn_out_dez] = useState<boolean>(false);
  const [error_cn_ja_fev, set_error_cn_ja_fev] = useState<boolean>(false);
  const [error_cn_mar_mai, set_error_cn_mar_mai] = useState<boolean>(false);
  const [error_cn_jun_set, set_error_cn_jun_set] = useState<boolean>(false);
  const message_apenas_numero = ("Apenas números são aceites");


  const ref_area = useRef(0);
  const ref_campo_cn_out_dez = useRef(0);
  const ref_campo_cn_ha_out_dez = useRef(0);
  const ref_campo_dois = useRef(0);
  const ref_campo_tres = useRef(0);
  const ref_campo_quatro = useRef(0);

  const reset_valores_ref = () => {
    ref_area.current = 0;
    ref_campo_cn_out_dez.current = 0;
    ref_campo_cn_ha_out_dez.current = 0;
    ref_campo_dois.current = 0;
    ref_campo_tres.current = 0;
    ref_campo_quatro.current = 0;
  }

  const handle_fechar_nova_linha_limpar_campos = () => {
    setManeio(undefined)
    setShowNewRow(false);
    reset_valores_ref();
  }


  async function getManeio() {
    setIsLoading(true);
    try {
      let res = await get(`/get_reg_oper_culturais_PP_dois_5c_rosto/${location.state.id_rosto}`);

      if (res.status === 200) {
        setRowsManeio(res.data.result);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("getManeio", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      await getManeio();
    })();
  }, []);

  // FORMULAS
  const calculos = (maneio: IManeioEPecuario) => {
    const resultadoDivisaoOut_Dez =
      maneio.area !== 0 ? (maneio.cn_out_dez !== undefined ? maneio.cn_out_dez : 0) / (maneio.area !== undefined ? maneio.area : 0) : 0;
    const val_out_dez = isFinite(resultadoDivisaoOut_Dez)
      ? roundToTwoDecimals(resultadoDivisaoOut_Dez)
      : 0;

    const resultadoDivisaoJan_Fev =
      maneio.area !== 0 ? (maneio.cn_ja_fev !== undefined ? maneio.cn_ja_fev : 0) / (maneio.area !== undefined ? maneio.area : 0) : 0;
    const val_jan_fev = isFinite(resultadoDivisaoJan_Fev)
      ? roundToTwoDecimals(resultadoDivisaoJan_Fev)
      : 0;

    const resultadoDivisaoMar_Mai =
      maneio.area !== 0 ? (maneio.cn_mar_mai !== undefined ? maneio.cn_mar_mai : 0) / (maneio.area !== undefined ? maneio.area : 0) : 0;
    const val_mar_mai = isFinite(resultadoDivisaoMar_Mai)
      ? roundToTwoDecimals(resultadoDivisaoMar_Mai)
      : 0;

    const resultadoDivisaoJun_Set =
      maneio.area !== 0 ? (maneio.cn_jun_set !== undefined ? maneio.cn_jun_set : 0) / (maneio.area !== undefined ? maneio.area : 0) : 0;
    const val_jun_set = isFinite(resultadoDivisaoJun_Set)
      ? roundToTwoDecimals(resultadoDivisaoJun_Set)
      : 0;

    return {
      ...maneio,
      cn_ha_out_dez: val_out_dez,
      cn_ha_ja_fev: val_jan_fev,
      cn_ha_mar_mai: val_mar_mai,
      cn_ha_jun_set: val_jun_set,
    };
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let newValue: any = value;


    if (name === "area") {
      if (isNaN(Number(value))) {
        set_error_area(true);
        return;
      } else {
        set_error_area(false);
      }
    }
    if (name === "cn_out_dez") {
      if (isNaN(Number(value))) {
        set_error_cn_out_dez(true);
        return;
      } else {
        set_error_cn_out_dez(false);
      }
    }
    if (name === "cn_ja_fev") {
      if (isNaN(Number(value))) {
        set_error_cn_ja_fev(true);
        return;
      } else {
        set_error_cn_ja_fev(false);
      }
    }
    if (name === "cn_mar_mai") {
      if (isNaN(Number(value))) {
        set_error_cn_mar_mai(true);
        return;
      } else {
        set_error_cn_mar_mai(false);
      }
    }
    if (name === "cn_jun_set") {
      if (isNaN(Number(value))) {
        set_error_cn_jun_set(true);
        return;
      } else {
        set_error_cn_jun_set(false);
      }
    }

    if (name === "area") {
      ref_area.current = newValue;
      
      ref_campo_cn_ha_out_dez.current = resultado_campo_cn_out_dez(newValue)      

      console.log("ref_area.current", ref_area.current)
      console.log("resultado_campo_um", resultado_campo_cn_out_dez(newValue))
      console.log("ref_campo_cn_ha_out_dez.current", ref_campo_cn_ha_out_dez.current)

      setManeio((prevManeio: any) => ({
        ...prevManeio,
        [name]: newValue,
        cn_ha_out_dez: ref_campo_cn_ha_out_dez.current,
        ["cn_ha_ja_fev"]: ref_campo_dois.current,
        ["cn_ha_mar_mai"]: ref_campo_tres.current,
        ["cn_ha_jun_set"]: ref_campo_quatro.current,

      }));
  
    } else {
      setManeio((prevManeio: any) => ({
        ...prevManeio,
        [name]: newValue,
      }));
    }

    setManeio((prevManeio: any) => ({
      ...prevManeio,
      [name]: newValue,
      cn_ha_out_dez: ref_campo_cn_ha_out_dez.current,
      ["cn_ha_ja_fev"]: ref_campo_dois.current,
      ["cn_ha_mar_mai"]: ref_campo_tres.current,
      ["cn_ha_jun_set"]: ref_campo_quatro.current,

    }));

  };

  const handleSaveManeio = async () => {
    if (maneio?.zona_homo === undefined ||
      maneio.parqueamento === undefined) {
      setMessage("Preencha todos os campos obrigatórios!");
      setOpenSnackError(true);
    } else

      try {
        setIsLoading(true);

        let res = await post("new_reg_oper_culturais_PP_dois_5c", {
          payload: {
            id_regis_ope_cult: 0,
            zona_homo: maneio?.zona_homo === undefined ? "" : maneio.zona_homo,
            parqueamento: maneio?.parqueamento === undefined ? "" : maneio.parqueamento,
            area: maneio?.area === undefined ? 0 : maneio.area,
            cn_out_dez: maneio?.cn_out_dez === undefined ? 0 : maneio.cn_out_dez,
            cn_ja_fev: maneio?.cn_ja_fev === undefined ? 0 : maneio.cn_ja_fev,
            cn_mar_mai: maneio?.cn_mar_mai === undefined ? 0 : maneio.cn_mar_mai,
            cn_jun_set: maneio?.cn_jun_set === undefined ? 0 : maneio.cn_jun_set,
            cn_ha_out_dez: maneio?.cn_ha_out_dez === undefined ? 0 : maneio.cn_ha_out_dez,
            cn_ha_ja_fev: maneio?.cn_ha_ja_fev === undefined ? 0 : maneio.cn_ha_ja_fev,
            cn_ha_mar_mai: maneio?.cn_ha_mar_mai === undefined ? 0 : maneio.cn_ha_mar_mai,
            cn_ha_jun_set: maneio?.cn_ha_jun_set === undefined ? 0 : maneio.cn_ha_jun_set,
            id_rosto: location.state.id_rosto,
            last_update: new Date().toISOString(),
            create_date: new Date().toISOString(),
            uuid: "",
          }
        });

        if (res.status === 200) {
          setMessage("Gravado com sucesso!");
          setOpenSnackSuccess(true);
          setShowNewRow(false);

          setManeio(undefined);
          setRowsManeio((prevRows) => {
            return [...prevRows, res.data.result];
          })
        } else {
          setMessage("Erro ao gravar!");
          setOpenSnackError(true);
        }
        setIsLoading(false);
      } catch (error) {
        func_print("handleSaveManeio", error, true);
        setMessage("Erro ao efetuar a sua operação!");
        setOpenSnackError(true);
        setIsLoading(false);
      }
  };

  const handleEdit = (id: number | null | undefined) => {
    setEditingId(id);
    setEditRow(true);
  };

  // EDIT
  const onInputChange_editar = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "area") {
      if (isNaN(Number(value))) {
        set_error_area(true);
        return;
      } else {
        set_error_area(false);
      }
    }
    if (name === "cn_out_dez") {
      if (isNaN(Number(value))) {
        set_error_cn_out_dez(true);
        return;
      } else {
        set_error_cn_out_dez(false);
      }
    }
    if (name === "cn_ja_fev") {
      if (isNaN(Number(value))) {
        set_error_cn_ja_fev(true);
        return;
      } else {
        set_error_cn_ja_fev(false);
      }
    }
    if (name === "cn_mar_mai") {
      if (isNaN(Number(value))) {
        set_error_cn_mar_mai(true);
        return;
      } else {
        set_error_cn_mar_mai(false);
      }
    }
    if (name === "cn_jun_set") {
      if (isNaN(Number(value))) {
        set_error_cn_jun_set(true);
        return;
      } else {
        set_error_cn_jun_set(false);
      }
    }

    if (editingId !== null) {
      const updatedTable = rowsManeio.map((tab) => {
        if (tab.id_regis_ope_cult === editingId) {
          const updatedRow = {
            ...tab,
            [name]: value,
          };
          setManeio(updatedRow);
          return calculos(updatedRow);
        }
        return tab;
      });
      setRowsManeio(updatedTable);
    }
  };

  const handleSaveEditManeio = async () => {
    if (editingId !== null) {
      const tableToSave = rowsManeio.find((tab) => tab.id_regis_ope_cult === editingId);

      try {
        setIsLoading(true);

        let res = await post(`update_reg_oper_culturais_PP_dois_5c`, { payload: tableToSave });

        if (res.status === 200) {
          setMessage("Registado com sucesso!");
          const updatedRows = rowsManeio.map((row) => {
            if (row.id_regis_ope_cult === editingId) {
              return res.data.result
            } else {
              return { ...row }
            }
          });
          setRowsManeio(updatedRows !== undefined ? updatedRows : []);
          setEditRow(false);
          setEditingId(null);
          setManeio(undefined);
          setOpenSnackSuccess(true);
        } else {
          setMessage("Erro ao gravar!");
          setOpenSnackError(true);
        }
        setIsLoading(false);
      } catch (error) {
        func_print("handleSaveEditManeio", error, true);
        setMessage("Erro ao gravar!");
        setOpenSnackError(true);
        setIsLoading(false);
      }

    };
  };


  /**************** FORMULAS ********************************************/

  const resultado_campo_cn_out_dez = (area: number | undefined) => {
    console.log("cn_out_dez", maneio?.cn_out_dez)
    return area !== 0 && area !== undefined && maneio?.cn_out_dez !== 0 && maneio?.cn_out_dez !== undefined
      ? (maneio.cn_out_dez / area)
      : 0;
  }

  const roundToTwoDecimals = (num: number): number => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  const resultadoDivisaoOut_Dez =
    maneio?.area !== 0 ? (maneio?.cn_out_dez !== undefined ? maneio?.cn_out_dez : 0) / (maneio?.area !== undefined ? maneio?.area : 0) : 0;
  const val_out_dez = isFinite(resultadoDivisaoOut_Dez)
    ? roundToTwoDecimals(resultadoDivisaoOut_Dez)
    : 0;

  const resultadoDivisaoJan_Fev =
    maneio?.area !== 0 ? (maneio?.cn_ja_fev !== undefined ? maneio?.cn_ja_fev : 0) / (maneio?.area !== undefined ? maneio?.area : 0) : 0;
  const val_jan_fev = isFinite(resultadoDivisaoJan_Fev)
    ? roundToTwoDecimals(resultadoDivisaoJan_Fev)
    : 0;

  const resultadoDivisaoMar_Mai =
    maneio?.area !== 0 ? (maneio?.cn_mar_mai !== undefined ? maneio?.cn_mar_mai : 0) / (maneio?.area !== undefined ? maneio?.area : 0) : 0;
  const val_mar_mai = isFinite(resultadoDivisaoMar_Mai)
    ? roundToTwoDecimals(resultadoDivisaoMar_Mai)
    : 0;

  const resultadoDivisaoJun_Set =
    maneio?.area !== 0 ? (maneio?.cn_jun_set !== undefined ? maneio?.cn_jun_set : 0) / (maneio?.area !== undefined ? maneio?.area : 0) : 0;
  const val_jun_set = isFinite(resultadoDivisaoJun_Set)
    ? roundToTwoDecimals(resultadoDivisaoJun_Set)
    : 0;


  // Delete
  const handleClickOpenDeleteManeio = (id: number | undefined) => {
    setIdToDeleteManeio(id);
    setOpenDeleteManeio(true);
  };

  const handleDeleteManeio = async () => {
    try {
      setIsLoading(true);
      let res = await del(`/delete__reg_oper_culturais_PP_dois_5c/${idToDeleteManeio}`);

      if (res.status === 200) {
        setMessage("Registo eliminado com sucesso!");
        setOpenDeleteManeio(false);
        setIdToDeleteManeio(null);
        setRowsManeio((oldRows) => [
          ...oldRows.filter((oldRow) => oldRow.id_regis_ope_cult !== idToDeleteManeio),
        ]);
        setOpenSnackSuccess(true);
      } else {
        setMessage("Erro ao eliminar o registo!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleDeleteManeio", error, true);
      setMessage("Erro ao eliminar o registo!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  /*****************  PAGINAÇÃO ********************** */
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <CustomThemeProvider>
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
        <table width="100%">
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={10}
                sx={{
                  fontWeight: 600,
                  fontFamily: "candara",
                  fontSize: 17,
                }}
              >
                2 - Registo do maneio do efetivo pecuário
              </TableCell>

              <TableCell colSpan={2}>
                <Stack direction="row" justifyContent="end">
                  <BarraDeFerramentas
                    mostrarBotaoNovo
                    textoBotaoNovo="Novo Registo"
                    aoClicarNovo={() => setShowNewRow(true)}
                  />
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableHead rowSpan={2}>Zona Homogénea *</StyledTableHead>
              <StyledTableHead rowSpan={2}>
                <Stack direction="row" justifyContent="center">
                  Parqueamento *
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={
                        "No caso do recurso ao parquemanto da área de pastagem\n para controlar a rotação dos animais, deverá ser identificado\n o número de parque instalados por zona homogénea ou subparcela.\n\nSão aceites os seguintes valores P1, P2, P3, P4, etc.\n\nNo caso de não existirem parque preencher com P1."
                      }
                    />
                  </Box>
                </Stack>
              </StyledTableHead>
              <StyledTableHead rowSpan={2}>
                <Stack direction="row" justifyContent="center">
                  Área (ha)
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={
                        "Área do parque, no caso de a zona homogéne/subparcela ter sido parqueada\n para facilitar a rotação do efetivo animal. No caso de não existir\n parqueamento da área de pastagem, registar a área da Zona homogénea/subparcela. \nA área da Zona homogénea corresponde ao somatório das subparcelas que a compõem"
                      }
                    />
                  </Box>
                </Stack>
              </StyledTableHead>
              <StyledTableHead colSpan={4}>
                <Stack direction="row" justifyContent="center">
                  Animais em pastoreio (CN)
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={
                        "Registar por cada trimestre o n.º de cabeças normais (CN) que permaneceram/pastorearam a zona homogénea em causa.\n\nNa conversão de cabeças naturais em cabeças normais devem ser utilizados os coeficientes previstos no\n Anexo I da Portaria n.º 54-C/2023 e da Portaria n.º 54-E/2023:\n\nEspécies  ......................................  Cabeças Normais (CN)\nBovinos com mais de 2 anos ............................. 1\nBovinos de 6 meses a 2 anos ........................... 0,6\nBovinos com menos de 6 meses ....................... 0,4\nOvinos com mais de 1 ano ............................... 0,15\nCaprinos com mais de 1 ano ............................ 0,15\nPorcas reprodutoras > 50kg ........................... 0,5\nOutros suínos (com mais de 3 meses) .............. 0,3\nEquídeos com mais de 6 meses ......................... 1"
                      }
                    />
                  </Box>
                </Stack>
              </StyledTableHead>
              <StyledTableHead colSpan={4}>
                <Stack direction="row" justifyContent="center">
                  Encabeçamento (CN/ha)
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={
                        "O registo por cada trimestre do n.º de CN/ha é efetuad\no automaticamente após preenchimento dos campo de «Animais em pastoreio (CN))."
                      }
                    />
                  </Box>
                </Stack>
              </StyledTableHead>
              <StyledTableHead rowSpan={2}>Ações</StyledTableHead>
            </TableRow>
            <TableRow>
              <StyledTableHead>Out/Dez</StyledTableHead>
              <StyledTableHead>Jan/Fev</StyledTableHead>
              <StyledTableHead>Mar/Mai</StyledTableHead>
              <StyledTableHead>Jun/Set</StyledTableHead>
              <StyledTableHead sx={{ backgroundColor: "lightgray" }}>
                Out/Dez
              </StyledTableHead>
              <StyledTableHead sx={{ backgroundColor: "lightgray" }}>
                Jan/Fev
              </StyledTableHead>
              <StyledTableHead sx={{ backgroundColor: "lightgray" }}>
                Mar/Mai
              </StyledTableHead>
              <StyledTableHead sx={{ backgroundColor: "lightgray" }}>
                Jun/Set
              </StyledTableHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {showNewRow && (
              <TableRow>
                <StyledTableCell>
                  <CustomTextField
                    name="zona_homo"
                    value={maneio?.zona_homo !== null && maneio?.zona_homo}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="parqueamento"
                    value={maneio?.parqueamento !== null && maneio?.parqueamento}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
                <StyledTableCell width={100}>
                  <CustomTextField
                    name="area"
                    value={maneio?.area}
                    onChange={onInputChange}
                    error={error_area}
                    helperText={error_area ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell width={100}>
                  <CustomTextField
                    name="cn_out_dez"
                    value={maneio?.cn_out_dez}
                    onChange={onInputChange}
                    error={error_area}
                    helperText={error_area ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell width={100}>
                  <CustomTextField
                    name="cn_ja_fev"
                    value={maneio?.cn_ja_fev}
                    onChange={onInputChange}
                    error={error_cn_ja_fev}
                    helperText={error_cn_ja_fev ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell width={100}>
                  <CustomTextField
                    name="cn_mar_mai"
                    value={maneio?.cn_mar_mai}
                    onChange={onInputChange}
                    error={error_cn_mar_mai}
                    helperText={error_cn_mar_mai ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell width={100}>
                  <CustomTextField
                    name="cn_jun_set"
                    value={maneio?.cn_jun_set}
                    onChange={onInputChange}
                    error={error_cn_jun_set}
                    helperText={error_cn_jun_set ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="cn_ha_out_dez"
                    value={maneio?.cn_ha_out_dez !== undefined ? maneio.cn_ha_out_dez : 0}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="cn_ha_ja_fev"
                    value={maneio?.cn_ha_ja_fev}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="cn_ha_mar_mai"
                    value={maneio?.cn_ha_mar_mai}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="cn_ha_jun_set"
                    value={maneio?.cn_ha_jun_set}
                    onChange={onInputChange}
                  />
                </StyledTableCell>

                <StyledTableCell>
                  <Stack direction="row" justifyContent="center">
                    <ButtonCadernos
                      mostrarBotaoCancelar
                      aoClicarCancelar={() => setShowNewRow(false)}
                      mostrarBotaoGravar
                      aoClicarGravar={() => handleSaveManeio()}
                    />
                  </Stack>
                </StyledTableCell>
              </TableRow>
            )}

            {(rowsPerPage > 0
              ? rowsManeio.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rowsManeio
            ).map((row, key) => (
              <TableRow key={key}>
                {editingId === row.id_regis_ope_cult && editRow ? (
                  <>
                    <StyledTableCell>
                      <CustomTextField
                        name="zona_homo"
                        value={row.zona_homo}
                        onChange={onInputChange_editar}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="parqueamento"
                        value={row.parqueamento}
                        onChange={onInputChange_editar}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="area"
                        value={row.area}
                        onChange={onInputChange_editar}
                        error={error_area}
                        helperText={
                          error_area ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>

                    <StyledTableCell>
                      <CustomTextField
                        name="cn_out_dez"
                        value={row.cn_out_dez}
                        onChange={onInputChange_editar}
                        error={error_cn_out_dez}
                        helperText={
                          error_cn_out_dez ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="cn_ja_fev"
                        value={row.cn_ja_fev}
                        onChange={onInputChange_editar}
                        error={error_cn_ja_fev}
                        helperText={
                          error_cn_ja_fev ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="cn_mar_mai"
                        value={row.cn_mar_mai}
                        onChange={onInputChange_editar}
                        error={error_cn_mar_mai}
                        helperText={
                          error_cn_mar_mai ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="cn_jun_set"
                        value={row.cn_jun_set}
                        onChange={onInputChange_editar}
                        error={error_cn_jun_set}
                        helperText={
                          error_cn_jun_set ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell sx={{ backgroundColor: "lightgray" }}>
                      <CustomTextField
                        name="cn_ha_out_dez"
                        value={row.cn_ha_out_dez}
                        onChange={onInputChange_editar}
                        disabled
                      />
                    </StyledTableCell>
                    <StyledTableCell sx={{ backgroundColor: "lightgray" }}>
                      <CustomTextField
                        name="cn_ha_ja_fev"
                        value={row.cn_ha_ja_fev}
                        onChange={onInputChange_editar}
                        disabled
                      />
                    </StyledTableCell>
                    <StyledTableCell sx={{ backgroundColor: "lightgray" }}>
                      <CustomTextField
                        name="parcela"
                        value={row.cn_ha_mar_mai}
                        onChange={onInputChange_editar}
                        disabled
                      />
                    </StyledTableCell>
                    <StyledTableCell sx={{ backgroundColor: "lightgray" }}>
                      <CustomTextField
                        name="cn_ha_jun_set"
                        value={row.cn_ha_jun_set}
                        onChange={onInputChange_editar}
                        disabled
                      />
                    </StyledTableCell>
                  </>
                ) : (
                  <>
                    <StyledTableCell>{row.zona_homo} </StyledTableCell>
                    <StyledTableCell>{row.parqueamento} </StyledTableCell>
                    <StyledTableCell>{row.area} </StyledTableCell>
                    <StyledTableCell>{row.cn_out_dez} </StyledTableCell>
                    <StyledTableCell>{row.cn_ja_fev} </StyledTableCell>
                    <StyledTableCell>{row.cn_mar_mai} </StyledTableCell>
                    <StyledTableCell>{row.cn_jun_set} </StyledTableCell>
                    <StyledTableCell>{row.cn_ha_out_dez}</StyledTableCell>
                    <StyledTableCell>{row.cn_ha_ja_fev}</StyledTableCell>
                    <StyledTableCell>{row.cn_ha_mar_mai}</StyledTableCell>
                    <StyledTableCell>{row.cn_ha_jun_set}</StyledTableCell>
                  </>
                )}
                {editingId === row.id_regis_ope_cult ? (
                  <StyledTableCell>
                    <ButtonCadernos
                      mostrarBotaoGravar
                      aoClicarGravar={() => handleSaveEditManeio()}
                      mostrarBotaoCancelar
                      aoClicarCancelar={() => setEditingId(null)}
                    />
                  </StyledTableCell>
                ) : (
                  <StyledTableCell>
                    <ButtonCadernos
                      mostrarBotaoEditar
                      aoClicarEditar={() => handleEdit(row.id_regis_ope_cult)}
                      mostrarBotaoApagar
                      aoClicarApagar={() => handleClickOpenDeleteManeio(row.id_regis_ope_cult)}
                    />
                  </StyledTableCell>
                )}
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow sx={{ width: "100%" }}>
              <TableCell colSpan={5}>
                <Typography style={{ fontSize: 14, fontFamily: "candara" }}>
                  * Campos de preenchimento obrigatório
                </Typography>
              </TableCell>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={9}
                count={rowsManeio.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelDisplayedRows={({ from, to, count }) => {
                  return `${from}–${to} de ${count !== -1 ? count : `mais do que ${to}`}`;
                }}
                labelRowsPerPage={'Linhas por página'}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
          <ConfirmDialog
            open={openDeleteManeio}
            onClose={() => setOpenDeleteManeio(false)}
            onConfirm={handleDeleteManeio}
            message="Deseja eliminar o registo?"
          />
        </table>
      </TableContainer>
    </CustomThemeProvider>
  );
};
