import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import { useLocation } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SelectChangeEvent, Snackbar, TextField } from "@mui/material";
import { TableFooter, TablePagination } from "@mui/material";
import { TableBody, TableHead } from "@mui/material";
import { TableContainer, TableCell, TableRow } from "@mui/material";
import { Box, Paper, Stack } from "@mui/material";

import { del, get, post } from "../../../Services/tokenConfig";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import CadernoLayout from "../../../Styles/layout/cadernoLayout";
import TablePaginationActions from "../../../Components/Pagination/pagination";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import LoadingVulpes from "../../../Styles/Loader/loading";
import { StyledTableCell, StyledTableHead, } from "../../../Styles/tabelCellStyled/customTableCell";
import BasicPopover from "../../../Components/Popover";
import { CustomSelect, CustomTextField, CustomThemeProvider, } from "../../../Styles/theme/customThemeprovider";
import { func_print } from "../../../Func_genericas/func_print";
import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
import { ICabecalho, IPage5, IPage5Observacoes } from "../../../Interfaces/cadernos/caderno5/caderno5";
import { operacaocultural } from "../../../informacao_estatica";
import { Alert } from "../../../Components/Alert/Alert";
import { CabecalhoOPForm } from "./cabecalho";
import { IZonaHomogenea } from "../../../Interfaces/cadernos/zona_homogenea";

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
    }
  })
);

export default function RegistoOperCulturais() {
  const classes = useStyles();
  const location = useLocation();

  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [error_t, set_error_t] = useState<boolean>(false);
  const [error_m, set_error_m] = useState<boolean>(false);
  const [error_n, set_error_n] = useState<boolean>(false);
  const [error_po, set_error_po] = useState<boolean>(false);
  const [error_k2o, set_error_k2o] = useState<boolean>(false);
  const [error_mgo, set_error_mgo] = useState<boolean>(false);
  const [error_cao, set_error_cao] = useState<boolean>(false);
  const [error_so, set_error_lso] = useState<boolean>(false);
  const message_apenas_numero = ("Apenas números são aceites");

  const [, setCreateCabecalho] = useState(false); // FECHAR CABEÇALHO POR PROPS
  const [, setIndex] = useState(0); // INDEX QUE VEM DO ABEÇALHO
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0); // GRAVA O INDEX SELECIONADO

  const [idCabecalho, setIdCabecalho] = useState(0);
  const [idToDelete, setIdToDelete] = useState<number | null | undefined>(0);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openDeleteObs, setOpenDeleteObs] = React.useState(false);
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editRow, setEditRow] = useState(false);
  const [editRowObs, setEditRowObs] = useState(false);
  const [showNewRow, setShowNewRow] = useState(false);
  const [showObsRow, setShowObsRow] = useState(false);

  const [editingId, setEditingId] = useState<number | null | undefined>(null);
  const [editingIdObs, setEditingIdObs] = useState<number | null | undefined>(null);

  const [zona_homogenea, setZona_Homogenea] = useState<IZonaHomogenea[]>([]);
  const [cabecalhos, setCabecalhos] = useState<ICabecalho[]>([]);
  const [obj_cabecalho, set_obj_Cabecalho] = useState<ICabecalho>();
  const [rows, setRows] = useState<IPage5[]>([]);
  const [newRow, setNewRow] = useState<IPage5>();
  const [obsRow, setObsRow] = useState<IPage5Observacoes[]>([])
  const [observacoes, setObervacoes] = useState<IPage5Observacoes>();

  const selectedValue = operacaocultural.includes(newRow?.operacao_cultural !== undefined ? newRow.operacao_cultural : "") ? newRow?.operacao_cultural : "";

  /********************* SELEÇÃO DA ZONA HOMOGÉNEA*****************/
  const handleSelectZona = async (index: number, idZonaHomo: any) => {
    try {
      setSelectedIndex(index);
      setIndex(idZonaHomo);
      setIdCabecalho(idZonaHomo);
      await getInfoVariasTabelas(idZonaHomo);
    } catch (error) {
      func_print("handleSelectZona", error, true);
      setMessage("Erro ao gravar!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  async function getCabecalhoOperaCulturais() {

    try {
      let res = await get(`/get_reg_operacoes_cabecalho__rosto/${location.state.id_rosto}`);

      if (res.status === 200) {
        const sortedData = res.data.result.sort((a: any, b: any) => {
          if (a.zona_homo < b.zona_homo) return -1;
          if (a.zona_homo > b.zona_homo) return 1;
          return 0;
        });
        setCabecalhos(sortedData);
        setIdCabecalho(sortedData[0].id_regsto_oper_cult_cabecalho);

        console.log(res.data.result)

        await getInfoVariasTabelas(sortedData[0].id_regsto_oper_cult_cabecalho);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("getCabecalhoOperaCulturais", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(false);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    (async () => {
      await getCabecalhoOperaCulturais();
    })();
  }, []);

  async function getOperacoesCulturais(id: number) {
    setIsLoading(true);
    try {
      if (idCabecalho !== undefined) {
        let res = await get(`/get_reg_operacoes_culturais_cabecalho/${id}`);
        if (res.status === 200) {
          setRows(res.data.result);
        }
      }
      setIsLoading(false);
    } catch (error) {
      func_print("getOperacoesCulturais", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }

  async function getOperacoesCulturaisObservacoes(id: number) {
    setIsLoading(true);
    try {
      if (idCabecalho !== undefined) {
        let res = await get(`/get_reg_operacoes_culturais_obs_cabecalho/${id}`);
        if (res.status === 200) {
          setObsRow(res.data.result);
        }
      }
      setIsLoading(false);
    } catch (error) {
      func_print("getOperacoesCulturais", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }

  const getInfoVariasTabelas = async (id_cabecalho: number) => {

    setNewRow((prevNewRow: any) => ({
      ...prevNewRow,
      id_regsto_oper_cult_cabecalho: id_cabecalho,
    }));

    setObervacoes((prevNewRow: any) => ({
      ...prevNewRow,
      id_regsto_oper_cult_cabecalho: id_cabecalho,
    }));

    await getOperacoesCulturais(id_cabecalho);
    await getOperacoesCulturaisObservacoes(id_cabecalho);
  }


  /********************** PÁGINA OPERAÇÕES CULTURAIS ******************************************************************/
  // CREATE NEW ROW
  const handleNewRowsChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    let newValue: any = value;

    if (type === "date" && value === "") {
      newValue = null;
    }
    if (name === "t") {
      if (isNaN(Number(value))) {
        set_error_t(true);
        return;
      } else {
        set_error_t(false);
      }
    }
    if (name === "m") {
      if (isNaN(Number(value))) {
        set_error_m(true);
        return;
      } else {
        set_error_m(false);
      }
    }
    if (name === "n") {
      if (isNaN(Number(value))) {
        set_error_n(true);
        return;
      } else {
        set_error_n(false);
      }
    }
    if (name === "po") {
      if (isNaN(Number(value))) {
        set_error_po(true);
        return;
      } else {
        set_error_po(false);
      }
    }
    if (name === "k2o") {
      if (isNaN(Number(value))) {
        set_error_k2o(true);
        return;
      } else {
        set_error_k2o(false);
      }
    }
    if (name === "mgo") {
      if (isNaN(Number(value))) {
        set_error_mgo(true);
        return;
      } else {
        set_error_mgo(false);
      }
    }
    if (name === "cao") {
      if (isNaN(Number(value))) {
        set_error_cao(true);
        return;
      } else {
        set_error_cao(false);
      }
    }
    if (name === "so") {
      if (isNaN(Number(value))) {
        set_error_lso(true);
        return;
      } else {
        set_error_lso(false);
      }
    }

    setNewRow((prevNewRows: any) => ({
      ...prevNewRows,
      [name]: newValue,
    }));
  };

  const handleSave = async () => {
    if (
      newRow?.data === undefined || newRow?.data === ""
    ) {
      setMessage("Selecione uma data válida!");
      setOpenSnackError(true);
    } else {
      try {
        setIsLoading(true);

        let res = await post("new_reg_operacoes_culturais", {
          payload: {
            id_regsto_oper_cult: 0,
            data: newRow?.data === undefined ? "" : newRow.data,
            operacao_cultural: newRow?.operacao_cultural === undefined ? "" : newRow.operacao_cultural,
            ferilizante_utili: newRow?.ferilizante_utili === undefined ? "" : newRow.ferilizante_utili,
            modo_aplicacao: newRow?.modo_aplicacao === undefined ? "" : newRow.modo_aplicacao,
            t: newRow?.t === undefined ? "" : newRow.t,
            m: newRow?.m === undefined ? "" : newRow?.m,
            n: newRow?.n === undefined ? "" : newRow.n,
            po: newRow?.po === undefined ? "" : newRow.po,
            k2o: newRow?.k2o === undefined ? "" : newRow.k2o,
            mgo: newRow?.mgo === undefined ? "" : newRow.mgo,
            cao: newRow?.cao === undefined ? "" : newRow.cao,
            so: newRow?.so === undefined ? "" : newRow?.so,
            inter_processos: newRow?.inter_processos === undefined ? "" : newRow.inter_processos,
            material_utilizado: newRow?.material_utilizado === undefined ? "" : newRow.material_utilizado,
            observacoes_objetivo: newRow?.observacoes_objetivo === undefined ? "" : newRow.observacoes_objetivo,
            debito_dia: newRow?.debito_dia === undefined ? "" : newRow.debito_dia,
            processo: newRow?.processo === undefined ? "" : newRow.processo,
            quantificacao: newRow?.quantificacao === undefined ? "" : newRow.quantificacao,
            id_regsto_oper_cult_cabecalho: idCabecalho,
            last_update: new Date().toISOString(),
            create_date: new Date().toISOString(),
            uuid: "",
          }
        });
        if (res.status === 200) {
          setMessage("Gravado com sucesso!");
          setOpenSnackSuccess(true);
          setShowNewRow(false);

          setNewRow(undefined);
          setRows((prevRows) => {
            return [...prevRows, res.data.result];
          })
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
    }
  };

  // EDITAR LINHA 
  const handleEdit = (id: number | undefined) => {
    setEditingId(id);
    setEditRow(true);
  };
  const onInputChage_editar_linha = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    let newValue: any = value;

    if (type === "date" && value === "") {
      newValue = null;
    }
    if (name === "t") {
      if (isNaN(Number(value))) {
        set_error_t(true);
        return;
      } else {
        set_error_t(false);
      }
    }
    if (name === "m") {
      if (isNaN(Number(value))) {
        set_error_m(true);
        return;
      } else {
        set_error_m(false);
      }
    }
    if (name === "n") {
      if (isNaN(Number(value))) {
        set_error_n(true);
        return;
      } else {
        set_error_n(false);
      }
    }
    if (name === "po") {
      if (isNaN(Number(value))) {
        set_error_po(true);
        return;
      } else {
        set_error_po(false);
      }
    }
    if (name === "k2o") {
      if (isNaN(Number(value))) {
        set_error_k2o(true);
        return;
      } else {
        set_error_k2o(false);
      }
    }
    if (name === "mgo") {
      if (isNaN(Number(value))) {
        set_error_mgo(true);
        return;
      } else {
        set_error_mgo(false);
      }
    }
    if (name === "cao") {
      if (isNaN(Number(value))) {
        set_error_cao(true);
        return;
      } else {
        set_error_cao(false);
      }
    }
    if (name === "so") {
      if (isNaN(Number(value))) {
        set_error_lso(true);
        return;
      } else {
        set_error_lso(false);
      }
    }

    if (editingId !== null) {
      const updateRow = rows.map((row) => {
        if (row.id_regsto_oper_cult === editingId) {
          return {
            ...row,
            [name]: newValue,
          };
        }
        return row;
      });
      setRows(updateRow);
    }
  };

  const handleUpdate = async () => {
    if (editingId !== null) {
      const tableToSave = rows.find((tab) => tab.id_regsto_oper_cult === editingId);


      if (
        tableToSave?.data === undefined || tableToSave?.data === ""
      ) {
        setMessage("Selecione uma data válida!");
        setOpenSnackError(true);
      } else {
        if (tableToSave) {
          try {
            setIsLoading(true);

            const res = await post("/update_reg_operacoes_culturais", { payload: tableToSave });
            if (res.status === 200) {
              setMessage("Registado com sucesso!");

              const updatedRows = rows.map((row) => {
                if (row.id_regsto_oper_cult === editingId) {
                  return res.data.result
                } else {
                  return { ...row }
                }
              });

              setRows(updatedRows !== undefined ? updatedRows : []);
              setEditRow(false);
              setEditingId(null);
              setOpenSnackSuccess(true);
            } else {
              setMessage("Erro ao gravar!");
              setOpenSnackError(true);
            }
            setIsLoading(false);

          } catch (error) {
            func_print("handleUpdate", error, true);
            setMessage("Erro ao gravar!");
            setOpenSnackError(true);
            setIsLoading(false);
          }
        }
      }
    };
  };

  /*********** DELETE **************************/
  const handleClickOpenDelete = (idToDelete: number | null | undefined) => {
    setIdToDelete(idToDelete);
    setOpenDelete(true);
  };
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      let res = await del(`/delete__reg_operacoes_culturais/${idToDelete}`);

      if (res.status === 200) {
        setMessage("Registo eliminado com sucesso!");
        setOpenDelete(false);
        setIdToDelete(null);
        setRows((oldRows) => [
          ...oldRows.filter((oldRow) => oldRow.id_regsto_oper_cult !== idToDelete),
        ]);
        setOpenSnackSuccess(true);
      } else {
        setMessage("Erro ao eliminar o registo!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleDelete", error, true);
      setMessage("Erro ao eliminar o registo!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  /**************** CAMPO OBSERVAÇÕES *********************/
  const handleNewRowsChangeObs = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setObervacoes((prevNewRows: any) => ({
      ...prevNewRows,
      [name]: value,
    }));
  };

  const handleSaveObs = async () => {
    if (observacoes?.obs === "" || observacoes?.obs === undefined) {
      setMessage("Preencha o campo Observações antes de gravar!");
      setOpenSnackError(true);
    } else {
      try {
        setIsLoading(true);

        let res = await post("new_reg_operacoes_culturais_obs", {
          payload: {
            id_regsto_oper_cult_obs: 0,
            obs: observacoes?.obs !== undefined ? observacoes.obs : "",
            id_regsto_oper_cult_cabecalho: idCabecalho,
            last_update: new Date().toISOString(),
            create_date: new Date().toISOString(),
            uuid: "",
          }
        });
        if (res.status === 200) {
          setMessage("Gravado com sucesso!");
          setOpenSnackSuccess(true);
          setShowObsRow(false);

          setObervacoes(undefined);
          setObsRow((prevRows) => {
            return [...prevRows, res.data.result];
          })
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
    }
  };

  // Edit
  const handleEditObs = (id: number | undefined) => {
    setEditingIdObs(id);
    setEditRowObs(true);
  };
  const onInputChage_editar_linhaObs = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (editingIdObs !== null) {
      const updateRow = obsRow.map((row) => {
        if (row.id_regsto_oper_cult_obs === editingIdObs) {
          return {
            ...row,
            [name]: value,
          };
        }
        return row;
      });
      setObsRow(updateRow);
    }
  };
  const handleUpdateObs = async () => {
    if (editingIdObs !== null) {
      const tableToSave = obsRow.find((tab) => tab.id_regsto_oper_cult_obs === editingIdObs);

      if (tableToSave) {
        try {
          setIsLoading(true);

          const res = await post("/update_reg_operacoes_culturais_obs", { payload: tableToSave });
          if (res.status === 200) {
            setMessage("Registado com sucesso!");

            const updatedRows = obsRow.map((row) => {
              if (row.id_regsto_oper_cult_obs === editingIdObs) {
                return res.data.result
              } else {
                return { ...row };
              }
            });

            setObsRow(updatedRows !== undefined ? updatedRows : []);
            setEditRowObs(false);
            setEditingIdObs(null);
            setOpenSnackSuccess(true);
          } else {
            setMessage("Erro ao gravar!");
            setOpenSnackError(true);
          }
          setIsLoading(false);

        } catch (error) {
          func_print("handleUpdateObs", error, true);
          setMessage("Erro ao gravar!");
          setOpenSnackError(true);
          setIsLoading(false);
        }
      }
    }
  };

  /*********** DELETE **************************/
  const handleClickOpenDeleteObs = (idToDelete: number | null | undefined) => {
    setIdToDelete(idToDelete);
    setOpenDeleteObs(true);
  };
  const handleDeleteObs = async () => {
    try {
      setIsLoading(true);
      let res = await del(`/delete__reg_operacoes_culturais_obs/${idToDelete}`);

      if (res.status === 200) {
        setMessage("Registo eliminado com sucesso!");
        setOpenDeleteObs(false);
        setIdToDelete(null);
        setObsRow((oldRows) => [
          ...oldRows.filter((oldRow) => oldRow.id_regsto_oper_cult_obs !== idToDelete),
        ]);
        setOpenSnackSuccess(true);
      } else {
        setMessage("Erro ao eliminar o registo!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleDeleteObs", error, true);
      setMessage("Erro ao eliminar o registo!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };


  /**************** PAGINAÇÃO *********************/
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
      <div className={classes.root}>
        <CadernoLayout title="5 - Registo de Operações Culturais" />
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
              <Box style={{ width: "100%", height: "auto" }}>
                <CabecalhoOPForm
                  cabecalhos={cabecalhos}
                  handleSelectZona={handleSelectZona}
                  selectedIndex={selectedIndex}
                  setCabecalhos={setCabecalhos}
                  obj_Cabecalho={obj_cabecalho}
                  set_obj_Cabecalho={set_obj_Cabecalho}
                  setMessage={setMessage}
                  setOpenSnackError={setOpenSnackError}
                  setOpenSnackSuccess={setOpenSnackSuccess}
                  setIsLoading={setIsLoading}
                  zona_homogenea={zona_homogenea}
                  setZona_Homogenea={setZona_Homogenea}
                />
              </Box>

              <TableContainer
                component={Paper}
                sx={{
                  height: "auto",
                  width: "auto",
                  margin: 2,
                  padding: 2,
                }}
              >
                <table style={{ width: "100%" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={19}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <BarraDeFerramentas
                            mostrarBotaoNovo
                            textoBotaoNovo="Novo Registo"
                            aoClicarNovo={() => setShowNewRow(true)}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead colSpan={12}>
                        Fertilização
                      </StyledTableHead>
                      <StyledTableHead colSpan={3}>
                        <Stack direction="row" justifyContent="center">
                          Prática Cultural
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={
                                "Entende-se por Prática cultural todo o tipo de intervenção efetuado ao nível da parcela agrícola ou cultura,\n como por exemplo a utilização de cultivares resistentes e ou material de propagação vegetativa categoria normalizada ou certificada,\n controlo de infestantes, como a monda manual, mobilização do solo, limpeza e preparação do terreno. \nIncluir também a rotação de culturas, podas sanitárias, destruição e queima da lenha,\n desinfeção de utensílios, entre outros.\n Preenchimento obrigatório apenas para os beneficiários de PRODI."
                              }
                            />
                          </Box>
                        </Stack>
                      </StyledTableHead>
                      <StyledTableHead>
                        <Stack direction="row" justifyContent="center">
                          Rega
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={
                                "No caso de rega diária com dotações constantes, indicar as datas do início, fim,\n e as alterações intermédias dos débitos. Sempre que possível incluir a justificação\n das dotações de rega."
                              }
                            />
                          </Box>
                        </Stack>
                      </StyledTableHead>
                      <StyledTableHead colSpan={2}>Colheita</StyledTableHead>
                      <StyledTableHead rowSpan={3}>Ações</StyledTableHead>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead rowSpan={2} sx={{ minWidth: 100 }}>
                        <Stack direction="row" justifyContent="center">
                          Data
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={
                                "As regas poderão estar agrupadas por períodos mensais, quinzenais, semanais, ou outros.\n As restantes operações devem ser registadas por dia."
                              }
                            />
                          </Box>
                        </Stack>
                      </StyledTableHead>
                      <StyledTableHead rowSpan={2} sx={{ minWidth: 120 }}>
                        Operação
                        <Stack direction="row" justifyContent="center">
                          cultural
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={
                                "O beneficiário deverá preencher com um dos seguintes valores por linha (data da aplicação): \n Aplicação de corretivos \n Fertilização fundo \n Adubação verde \n Aplicação de estrume \n Aplicação de chorume \n Fertilização cobertura \n Fertirrigação \n O beneficiário deverá preencher este campo com as operações de fertilização previstas no Plano de Fertilização (Anexo 1) quando realizadas."
                              }
                            />
                          </Box>
                        </Stack>
                      </StyledTableHead>
                      <StyledTableHead rowSpan={2} sx={{ minWidth: 150 }}>
                        Fertilizante
                        <Stack direction="row" justifyContent="center">
                          utilizado
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={
                                "No caso de adução verde identificar as espécies incorporadas no solo."
                              }
                            />
                          </Box>
                        </Stack>
                      </StyledTableHead>
                      <StyledTableHead rowSpan={2} sx={{ minWidth: 120 }}>
                        Modo de
                        <Stack direction="row" justifyContent="center">
                          aplicação
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={"Não preencher no caso da fertirrega."}
                            />
                          </Box>
                        </Stack>
                      </StyledTableHead>
                      <StyledTableHead colSpan={2}>
                        Quantidade Aplicada
                      </StyledTableHead>
                      <StyledTableHead colSpan={6}>
                        Aplicação de nutrientes (Kg)
                      </StyledTableHead>
                      <StyledTableHead rowSpan={2} sx={{ minWidth: 150 }}>
                        Intervenção ou processos
                      </StyledTableHead>
                      <StyledTableHead rowSpan={2} sx={{ minWidth: 150 }}>
                        Material ou equipamento utilizado
                      </StyledTableHead>
                      <StyledTableHead rowSpan={2} sx={{ minWidth: 150 }}>
                        Observações / Objetivos
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 180 }}>
                        Débito/dia ou dotação total da rega
                      </StyledTableHead>
                      <StyledTableHead rowSpan={2} sx={{ minWidth: 180 }}>Processo</StyledTableHead>
                      <StyledTableHead rowSpan={2} sx={{ minWidth: 120 }}>
                        Quantificação (Lote nº)
                      </StyledTableHead>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead sx={{ minWidth: 70 }}>t</StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 70 }}>
                        m3
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 70 }}>N</StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 70 }}>
                        P2O5
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 70 }}>
                        K2O
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 70 }}>
                        MgO
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 70 }}>
                        CaO
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 70 }}>
                        SO3
                      </StyledTableHead>
                      <StyledTableHead>(mm/m2 ou m3/ha))</StyledTableHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {showNewRow && (
                      <TableRow>
                        <StyledTableCell>
                          <TextField
                            variant="filled"
                            name="data"
                            type="date"
                            inputProps={{
                              style: { fontSize: 12, fontFamily: "verdana" },
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={newRow?.data ? newRow.data : ""}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleNewRowsChange(e)
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomSelect
                            value={selectedValue !== undefined ? selectedValue : ""}
                            name="operacao_cultural"
                            onChange={handleNewRowsChange}
                            options={operacaocultural}
                            label="Operação Cultural"
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="ferilizante_utili"
                            value={newRow?.ferilizante_utili === undefined ? "" : newRow.ferilizante_utili}
                            onChange={handleNewRowsChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="modo_aplicacao"
                            value={newRow?.modo_aplicacao === undefined ? "" : newRow.modo_aplicacao}
                            onChange={handleNewRowsChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="t"
                            value={newRow?.t === undefined ? "" : newRow.t}
                            onChange={handleNewRowsChange}
                            error={error_t}
                            helperText={error_t ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="m"
                            value={newRow?.m === undefined ? "" : newRow.m}
                            onChange={handleNewRowsChange}
                            error={error_m}
                            helperText={error_m ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="n"
                            value={newRow?.n === undefined ? "" : newRow.n}
                            onChange={handleNewRowsChange}
                            error={error_n}
                            helperText={error_n ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="po"
                            value={newRow?.po === undefined ? "" : newRow.po}
                            onChange={handleNewRowsChange}
                            error={error_po}
                            helperText={error_po ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="k2o"
                            value={newRow?.k2o === undefined ? "" : newRow.k2o}
                            onChange={handleNewRowsChange}
                            error={error_k2o}
                            helperText={error_k2o ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="mgo"
                            value={newRow?.mgo === undefined ? "" : newRow.mgo}
                            onChange={handleNewRowsChange}
                            error={error_mgo}
                            helperText={error_mgo ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="cao"
                            value={newRow?.cao === undefined ? "" : newRow.cao}
                            onChange={handleNewRowsChange}
                            error={error_cao}
                            helperText={error_cao ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="so"
                            value={newRow?.so === undefined ? "" : newRow.so}
                            onChange={handleNewRowsChange}
                            error={error_so}
                            helperText={error_so ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="inter_processos"
                            value={newRow?.inter_processos === undefined ? "" : newRow.inter_processos}
                            onChange={handleNewRowsChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="material_utilizado"
                            value={newRow?.material_utilizado === undefined ? "" : newRow.material_utilizado}
                            onChange={handleNewRowsChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="observacoes_objetivo"
                            value={newRow?.observacoes_objetivo === undefined ? "" : newRow.observacoes_objetivo}
                            onChange={handleNewRowsChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="debito_dia"
                            value={newRow?.debito_dia === undefined ? "" : newRow.debito_dia}
                            onChange={handleNewRowsChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="processo"
                            value={newRow?.processo === undefined ? "" : newRow.processo}
                            onChange={handleNewRowsChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="quantificacao"
                            value={newRow?.quantificacao === undefined ? "" : newRow.quantificacao}
                            onChange={handleNewRowsChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <Stack direction="row" justifyContent="center">
                            <ButtonCadernos
                              mostrarBotaoCancelar
                              aoClicarCancelar={() => setShowNewRow(false)}
                              mostrarBotaoGravar
                              aoClicarGravar={() => handleSave()}
                            />
                          </Stack>
                        </StyledTableCell>
                      </TableRow>
                    )}
                    {(rowsPerPage > 0
                      ? rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      : rows
                    ).map((row, index) => {
                      const selectedValueRow = operacaocultural.includes(row.operacao_cultural !== undefined ? row.operacao_cultural : "")
                        ? row.operacao_cultural
                        : "";

                      return (
                        <TableRow
                          key={row.id_regsto_oper_cult || `new-${index}`}
                        >
                          {editingId === row.id_regsto_oper_cult && editRow ? (
                            <React.Fragment>
                              <StyledTableCell>
                                <TextField
                                  variant="filled"
                                  name="data"
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
                                  value={row.data}
                                  onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChage_editar_linha(e)}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomSelect
                                  value={selectedValueRow !== undefined ? selectedValueRow : ""}
                                  name="operacao_cultural"
                                  onChange={onInputChage_editar_linha}
                                  options={operacaocultural}
                                  label="Operação Cultural"
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="ferilizante_utili"
                                  value={row.ferilizante_utili}
                                  onChange={onInputChage_editar_linha}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="modo_aplicacao"
                                  value={row.modo_aplicacao}
                                  onChange={onInputChage_editar_linha}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="t"
                                  value={row.t}
                                  onChange={onInputChage_editar_linha}
                                  error={error_t}
                                  helperText={error_t ? message_apenas_numero : ""}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="m"
                                  value={row.m}
                                  onChange={onInputChage_editar_linha}
                                  error={error_m}
                                  helperText={error_m ? message_apenas_numero : ""}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="n"
                                  value={row.n}
                                  onChange={onInputChage_editar_linha}
                                  error={error_n}
                                  helperText={error_n ? message_apenas_numero : ""}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="po"
                                  value={row.po}
                                  onChange={onInputChage_editar_linha}
                                  error={error_po}
                                  helperText={error_po ? message_apenas_numero : ""}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="k2o"
                                  value={row.k2o}
                                  onChange={onInputChage_editar_linha}
                                  error={error_k2o}
                                  helperText={error_k2o ? message_apenas_numero : ""}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="mgo"
                                  value={row.mgo}
                                  onChange={onInputChage_editar_linha}
                                  error={error_mgo}
                                  helperText={error_mgo ? message_apenas_numero : ""}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="cao"
                                  value={row.cao}
                                  onChange={onInputChage_editar_linha}
                                  error={error_cao}
                                  helperText={error_cao ? message_apenas_numero : ""}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="so"
                                  value={row.so}
                                  onChange={onInputChage_editar_linha}
                                  error={error_so}
                                  helperText={error_so ? message_apenas_numero : ""}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="inter_processos"
                                  value={row.inter_processos}
                                  onChange={onInputChage_editar_linha}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="material_utilizado"
                                  value={row.material_utilizado}
                                  onChange={onInputChage_editar_linha}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="observacoes_objetivo"
                                  value={row.observacoes_objetivo}
                                  onChange={onInputChage_editar_linha}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="debito_dia"
                                  value={row.debito_dia}
                                  onChange={onInputChage_editar_linha}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="processo"
                                  value={row.processo}
                                  onChange={onInputChage_editar_linha}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="quantificacao"
                                  value={row.quantificacao}
                                  onChange={onInputChage_editar_linha}
                                />
                              </StyledTableCell>
                            </React.Fragment>
                          ) : (
                            <>
                              <StyledTableCell>{row.data}</StyledTableCell>
                              <StyledTableCell>
                                {row.operacao_cultural}
                              </StyledTableCell>
                              <StyledTableCell>
                                {row.ferilizante_utili}
                              </StyledTableCell>
                              <StyledTableCell>
                                {row.modo_aplicacao}
                              </StyledTableCell>
                              <StyledTableCell>{row.t} </StyledTableCell>
                              <StyledTableCell>{row.m} </StyledTableCell>
                              <StyledTableCell>{row.n} </StyledTableCell>
                              <StyledTableCell>{row.po} </StyledTableCell>
                              <StyledTableCell>{row.k2o} </StyledTableCell>
                              <StyledTableCell>{row.mgo} </StyledTableCell>
                              <StyledTableCell>{row.cao} </StyledTableCell>
                              <StyledTableCell>{row.so} </StyledTableCell>
                              <StyledTableCell>
                                {row.inter_processos}
                              </StyledTableCell>
                              <StyledTableCell>
                                {row.material_utilizado}
                              </StyledTableCell>
                              <StyledTableCell>
                                {row.observacoes_objetivo}
                              </StyledTableCell>
                              <StyledTableCell>
                                {row.debito_dia}{" "}
                              </StyledTableCell>
                              <StyledTableCell>{row.processo} </StyledTableCell>
                              <StyledTableCell>
                                {row.quantificacao}
                              </StyledTableCell>
                            </>
                          )}
                          {editingId === row.id_regsto_oper_cult && editRow ? (
                            <StyledTableCell>
                              <ButtonCadernos
                                mostrarBotaoGravar
                                aoClicarGravar={() =>
                                  handleUpdate()
                                }
                                mostrarBotaoCancelar
                                aoClicarCancelar={() => setEditRow(false)}
                              />
                            </StyledTableCell>
                          ) : (
                            <StyledTableCell>
                              <ButtonCadernos
                                mostrarBotaoEditar
                                aoClicarEditar={() =>
                                  handleEdit(row.id_regsto_oper_cult)
                                }
                                mostrarBotaoApagar
                                aoClicarApagar={() =>
                                  handleClickOpenDelete(row.id_regsto_oper_cult)
                                }
                              />
                            </StyledTableCell>
                          )}
                        </TableRow>
                      );
                    })}

                    {selectedIndex !== null && obsRow.length <= 0 ?
                      (showObsRow ?
                        <TableRow>
                          <StyledTableHead>Observações</StyledTableHead>
                          <StyledTableCell colSpan={17}>
                            <CustomTextField
                              name="obs"
                              value={observacoes?.obs === undefined ? "" : observacoes.obs}
                              onChange={handleNewRowsChangeObs}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row" justifyContent="center">
                              <ButtonCadernos
                                mostrarBotaoCancelar
                                aoClicarCancelar={() =>
                                  setShowObsRow(false)
                                }
                                mostrarBotaoGravar
                                aoClicarGravar={() => handleSaveObs()}
                              />
                            </Stack>
                          </StyledTableCell>
                        </TableRow>
                        :
                        <TableRow>
                          <StyledTableHead>Observações</StyledTableHead>
                          <StyledTableCell colSpan={17}>
                          </StyledTableCell>
                          <TableCell >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "end",
                              }}
                            >
                              <BarraDeFerramentas
                                mostrarBotaoNovo
                                textoBotaoNovo="Registar Observações"
                                aoClicarNovo={() => setShowObsRow(true)}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                      )
                      :
                      (obsRow.map((obs, key) =>
                        <TableRow key={key}>
                          {editingIdObs === obs.id_regsto_oper_cult_obs && editRowObs ? (
                            <>
                              <StyledTableHead>Observações</StyledTableHead>
                              <StyledTableCell colSpan={17}>
                                <CustomTextField
                                  name="obs"
                                  value={obs.obs}
                                  onChange={onInputChage_editar_linhaObs}
                                />
                              </StyledTableCell>
                            </>
                          ) : (
                            <>
                              <StyledTableHead>Observações</StyledTableHead>
                              <StyledTableCell colSpan={17}>
                                {obs.obs}
                              </StyledTableCell>
                            </>
                          )}
                          {editRowObs ? (
                            <StyledTableCell>
                              <ButtonCadernos
                                mostrarBotaoGravar
                                aoClicarGravar={handleUpdateObs}
                                mostrarBotaoCancelar
                                aoClicarCancelar={() => setEditRowObs(false)}
                              />
                            </StyledTableCell>
                          ) : (
                            <StyledTableCell>
                              <ButtonCadernos
                                mostrarBotaoEditar
                                aoClicarEditar={() =>
                                  handleEditObs(obs.id_regsto_oper_cult_obs)
                                }
                                mostrarBotaoApagar
                                aoClicarApagar={() =>
                                  handleClickOpenDeleteObs(obs.id_regsto_oper_cult_obs)
                                }
                              />
                            </StyledTableCell>
                          )}
                        </TableRow>

                      )
                      )
                    }


                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={19} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow sx={{ width: "100%" }}>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={19}
                        count={rows.length}
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
                </table>
              </TableContainer>
            </>
          )}

          <ConfirmDialog
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            onConfirm={handleDelete}
            message="Deseja eliminar o registo?"
          />
          <ConfirmDialog
            open={openDeleteObs}
            onClose={() => setOpenDeleteObs(false)}
            onConfirm={handleDeleteObs}
            message="Deseja eliminar o registo?"
          />
        </main>
      </div>
    </CustomThemeProvider>
  );
}

// retrona o id da linha prreenchida
// const getFilledObservationId = (rows: IPage5[]): number | null | undefined => {
//   const rowWithObservations = rows.find(
//     (row) => row.obs && row.obs.trim() !== ""
//   );
//   return rowWithObservations ? rowWithObservations.id_regsto_oper_cult : null;
// };
