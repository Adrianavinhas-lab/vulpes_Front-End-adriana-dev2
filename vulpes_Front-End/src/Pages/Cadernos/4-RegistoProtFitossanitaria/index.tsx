import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SelectChangeEvent, Snackbar, TextField, Typography } from "@mui/material";
import { TableFooter, TablePagination } from "@mui/material";
import { TableBody, TableHead } from "@mui/material";
import { TableContainer, TableCell, TableRow } from "@mui/material";
import { Box, Paper, Stack } from "@mui/material";

import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import CadernoLayout from "../../../Styles/layout/cadernoLayout";
import TablePaginationActions from "../../../Components/Pagination/pagination";
import { del, get, post } from "../../../Services/tokenConfig";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import LoadingVulpes from "../../../Styles/Loader/loading";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { StyledTableCell, StyledTableHead, } from "../../../Styles/tabelCellStyled/customTableCell";
import BasicPopover from "../../../Components/Popover";
import { CustomSelect, CustomTextField, CustomThemeProvider, } from "../../../Styles/theme/customThemeprovider";

import { func_print } from "../../../Func_genericas/func_print";
import { useLocation } from "react-router-dom";
import { ICabecalho4, IPage4, IPage4Observacoes } from "../../../Interfaces/cadernos/caderno4";
import { nomebiocida } from "../../../informacao_estatica";
import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
import { Alert } from "../../../Components/Alert/Alert";
import { CabecalhoPOForm } from "./cabecalho";
import { IZonaHomogenea } from "../../../Interfaces/cadernos/zona_homogenea";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    contents: {
      flexGrow: 1,
      padding: theme.spacing(1),
    },

    toolbars: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(2, 3),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    toolbar: {
      display: "flex",
      textAlign: "center",
      justifyContent: "center",
      color: "#7e2706",
      fontFamily: "candara",
    },
  })
);

export default function RegProtFitossanitaria(props: any) {
  const classes = useStyles();
  const location = useLocation();

  const [error_area_tratada, setError_area_tratada] = useState<boolean>(false);
  const message_apenas_numero = ("Apenas números são aceites");

  const [, setCreateCabecalho] = useState(false); // FECHAR CABEÇALHO POR PROPS
  const [, setIndex] = useState(0); // INDEX QUE VEM DO ABEÇALHO
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0); // GRAVA O INDEX SELECIONADO

  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [idCabecalho, setIdCabecalho] = useState(0);
  const [idToDelete, setIdToDelete] = useState<number | null | undefined>(0);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openDeleteObs, setOpenDeleteObs] = React.useState(false);
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [showNewRow, setShowNewRow] = useState(false);
  const [showObsRow, setShowObsRow] = useState(false);
  const [editRow, setEditRow] = useState(false);

  const [editingId, setEditingId] = useState<number | null | undefined>(null);
  const [editingIdObs, setEditingIdObs] = useState<number | null | undefined>(null);

  const [zona_homogenea, setZona_Homogenea] = useState<IZonaHomogenea[]>([]);
  const [cabecalhos, setCabecalhos] = useState<ICabecalho4[]>([]);
  const [obj_cabecalho, set_obj_Cabecalho] = useState<ICabecalho4>();

  const [rows, setRows] = useState<IPage4[]>([]);
  const [newRow, setNewRow] = useState<IPage4>();

  const [rowsObs, setRowsObs] = useState<IPage4Observacoes[]>([]);
  const [rowObs, setRowObs] = useState<IPage4Observacoes>();


  /********************* SELEÇÃO DA ZONA HOMOGÉNEA (INDEX) *****************/
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
  


  async function getCabecalhoFitossanitaria() {

    try {
      let res = await get(`/get_reg_fitossanitaria_cabecalho__rosto/${location.state.id_rosto}`);

      if (res.status === 200) {
        const sortedData = res.data.result.sort((a: any, b: any) => {
          if (a.zona_homo < b.zona_homo) return -1;
          if (a.zona_homo > b.zona_homo) return 1;
          return 0;
        });

        setCabecalhos(sortedData);
        setIdCabecalho(sortedData[0].id_registo_fitocabe);

        await getInfoVariasTabelas(sortedData[0].id_registo_fitocabe);
      }
      setIsLoading(false);

    } catch (error) {
      func_print("getCabecalhoFitossanitaria", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      await getCabecalhoFitossanitaria();
    })();
  }, []);

  const getFitossanitaria = async (id: number) => {
    setIsLoading(true);
    try {
      if (idCabecalho !== undefined) {
        let res = await get(`/get_reg_fitossanitaria_cabecalho/${id}`);
        if (res.status === 200) {
          setRows(res.data.result);
          console.log("tabela", res.data.result)
        }

      };
      setIsLoading(false);
    } catch (error) {
      func_print("getFitossanitaria", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }

  const getFitossanitariaObservacoes = async (id: number) => {
    setIsLoading(true);
    try {
      if (idCabecalho !== undefined) {
        let res = await get(`/get_reg_fitossanitaria_obs_cabecalho/${id}`);
        if (res.status === 200) {
          setRowsObs(res.data.result);
        }

      };
      setIsLoading(false);
    } catch (error) {
      func_print("getFitossanitariaObservacoes", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);

      setIsLoading(false);
    }
  }

  const getInfoVariasTabelas = async (id_cabecalho: number) => {

    setNewRow((prevNewRow: any) => ({
      ...prevNewRow,
      id_registo_fitocabe: id_cabecalho,
    }));

    setRowObs((prevNewRow: any) => ({
      ...prevNewRow,
      id_registo_fitocabe: id_cabecalho,
    }));

    await getFitossanitaria(id_cabecalho);
    await getFitossanitariaObservacoes(id_cabecalho);
  }


  /****************************** PAGINA FITOSSANITÁRIO **********************************************/
  const onInputChangeFitossanitaria = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, } = target;

    if (name === "area_tratada") {
      if (isNaN(Number(value))) {
        setError_area_tratada(true);
        return;
      } else {
        setError_area_tratada(false);
        Number(value);
      }
    }
    setNewRow((prevnewRow: any) => ({
      ...prevnewRow,
      [name]: value,
    }));
  };

  const handleSaveFito = async () => {
    if (
      newRow?.data === undefined || newRow?.data === "" ||
      newRow?.inimigo === undefined || newRow?.inimigo === "" ||
      newRow?.n_autorizacao === undefined || newRow?.n_autorizacao === "" ||
      newRow?.concentracao_dose === undefined || newRow?.concentracao_dose === "" ||
      newRow?.volume_aplicacao === undefined || newRow?.volume_aplicacao === "" ||
      newRow?.area_tratada === undefined || newRow?.area_tratada === "" ||
      newRow?.nome === undefined || newRow?.nome === "" ||
      newRow?.n_autorizacao_atividade === undefined || newRow?.n_autorizacao_atividade === ""
    ) {
      setMessage("Preencha todos os campos obrigatórios!");
      setOpenSnackError(true);
    } else {

      try {
        setIsLoading(true);

        let res = await post("/new_reg_fitossanitaria", {
          payload: {
            id_registo_fito: 0,
            data: newRow?.data === undefined ? "" : newRow.data,
            estado_fenologico: newRow?.estado_fenologico === undefined ? "" : newRow.estado_fenologico,
            inimigo: newRow?.inimigo === undefined ? "" : newRow.inimigo,
            metodologia: newRow?.metodologia === undefined ? "" : newRow.metodologia,
            estimativa_risco: newRow?.estimativa_risco === undefined ? "" : newRow.estimativa_risco,
            justifi_intervencao: newRow?.justifi_intervencao === undefined ? "" : newRow.justifi_intervencao,
            observacoes_aux: newRow?.observacoes_aux === undefined ? "" : newRow.observacoes_aux,
            n_autorizacao: newRow?.n_autorizacao === undefined ? "" : newRow.n_autorizacao,
            nome_biocida: newRow?.nome_biocida === undefined ? "" : newRow.nome_biocida,
            concentracao_dose: newRow?.concentracao_dose === undefined ? "" : newRow.concentracao_dose,
            volume_aplicacao: newRow?.volume_aplicacao === undefined ? "" : newRow.volume_aplicacao,
            area_tratada: newRow?.area_tratada === undefined ? "" : newRow.area_tratada,
            n_aplicador: newRow?.n_aplicador === undefined ? "" : newRow.n_aplicador,
            nome: newRow?.nome === undefined ? "" : newRow.nome,
            n_autorizacao_atividade: newRow?.n_autorizacao_atividade === undefined ? "" : newRow.n_autorizacao_atividade,
            id_registo_fitocabe: idCabecalho,
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
          setRows((prevRows) => [...prevRows, res.data.result])
        } else {
          setMessage("Erro ao gravar!");
          setOpenSnackError(true);
        }
        setIsLoading(false);
      } catch (error: any) {
        func_print("handleSaveFito", error, true);
        setMessage("Erro ao efetuar a sua operação!");
        setOpenSnackError(true);
        setIsLoading(false);
      }
    }
  };
  // Editar
  const handleEdit = (id: number | undefined) => {
    setEditingId(id);
    setEditRow(true);
  };
  const onInputChange_editar_linha_fitossanitaria = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    let newValue: any = value;

    if (type === "date" && value === "") {
      newValue = null;
    }

    if (name === "area_tratada") {
      if (isNaN(Number(value))) {
        setError_area_tratada(true);
        return;
      } else {
        setError_area_tratada(false);
        Number(value);
      }
    }

    if (editingId !== null) {
      const updateRow = rows.map((row) => {
        if (row.id_registo_fito === editingId) {
          return {
            ...row,
            [name]: newValue,
          };
        }
        return row;
      });
      setRows(updateRow);
    } else {
      setMessage("Linha não encontrada!");
      setOpenSnackError(true);
    }
  };

  const handleUpdateFitossanitaria = async () => {
    if (editingId !== null) {
      const tableToSave = rows.find((tab) => tab.id_registo_fito === editingId);

      if (
        tableToSave?.data === undefined || tableToSave?.data === "" ||
        tableToSave?.inimigo === undefined || tableToSave?.inimigo === "" ||
        tableToSave?.n_autorizacao === undefined || tableToSave?.n_autorizacao === "" ||
        tableToSave?.concentracao_dose === undefined || tableToSave?.concentracao_dose === "" ||
        tableToSave?.volume_aplicacao === undefined || tableToSave?.volume_aplicacao === "" ||
        tableToSave?.area_tratada === undefined || tableToSave?.area_tratada === "" ||
        tableToSave?.nome === undefined || tableToSave?.nome === "" ||
        tableToSave?.n_autorizacao_atividade === undefined || tableToSave?.n_autorizacao_atividade === ""
      ) {
        setMessage("Preencha todos os campos obrigatórios!");
        setOpenSnackError(true);
      } else if (tableToSave) {
        try {
          setIsLoading(true);

          const res = await post("/update_reg_fitossanitaria", { payload: tableToSave });
          if (res.status === 200) {
            setMessage("Registado com sucesso!");

            const updatedRows = rows.map((row) => {
              if (row.id_registo_fito === editingId) {
                return res.data.result;
              } else {
                return row;
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
      } else {
        setMessage("Selecione um registo para editar!");
        setOpenSnackError(true);
      }
    } else {
      setMessage("Selecione um registo para editar!");
      setOpenSnackError(true);
    }
  };

  // Delete
  const handleClickOpenDelete = (id: number | null | undefined) => {
    setIdToDelete(id);
    setOpenDelete(true);
  };
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      let res = await del(`/delete__reg_fitossanitaria/${idToDelete}`);

      if (res.status === 200) {
        setMessage("Registo eliminado com sucesso!");
        setOpenDelete(false);
        setIdToDelete(null);
        setRows((oldRows) => [
          ...oldRows.filter((oldRow) => oldRow.id_registo_fito !== idToDelete),
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

  /****************************** CAMPO OBSERVAÇÕES **********************************************/
  const onInputChangeObs = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setRowObs((prevnewRow: any) => ({
      ...prevnewRow,
      [name]: value,
    }));
  };

  const handleSaveFitossanitariaObs = async () => {
    if (rowObs?.observacoes === "" || rowObs?.observacoes === undefined) {
      setMessage("Preencha o campo Observações antes de gravar!");
      setOpenSnackError(true);
    } else {

      try {
        setIsLoading(true);

        let res = await post("/new_reg_fitossanitaria_obs", {
          payload: {
            id_registo_fito_obs: 0,
            observacoes: rowObs?.observacoes === undefined ? "" : rowObs.observacoes,
            id_registo_fitocabe: idCabecalho,
            last_update: new Date().toISOString(),
            create_date: new Date().toISOString(),
            uuid: "",
          }
        });
        if (res.status === 200) {
          setMessage("Gravado com sucesso!");
          setOpenSnackSuccess(true);
          setShowObsRow(false);

          setRowObs(undefined);
          setRowsObs((prevRows) => {
            return [...prevRows, res.data.result];
          })
        } else {
          setMessage("Erro ao gravar!");
          setOpenSnackError(true);
        }
        setIsLoading(false);
      } catch (error) {
        func_print("handleSaveFito", error, true);
        setMessage("Erro ao efetuar a sua operação!");
        setOpenSnackError(true);
        setIsLoading(false);
      }
    }
  };
  //Editar
  const handleEditObs = (id: number | null | undefined) => {
    setEditingIdObs(id);
    setShowObsRow(true);
  }
  const onInputChange_editar_Obs = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (editingIdObs !== null) {
      const updateRow = rowsObs.map((row) => {
        if (row.id_registo_fito_obs === editingIdObs) {
          return {
            ...row,
            [name]: value,
          };
        }
        return row;
      });
      setRowsObs(updateRow);
    } else {
      setMessage("Selecione um registo para editar!");
      setOpenSnackError(true);
    }
  };
  const handleUpdateObs = async () => {
    if (editingIdObs !== null) {
      const tableToSave = rowsObs.find((tab) => tab.id_registo_fito_obs === editingIdObs);

      if (tableToSave) {
        try {
          setIsLoading(true);

          const res = await post("/update_reg_fitossanitaria_obs", { payload: tableToSave });
          if (res.status === 200) {
            setMessage("Registado com sucesso!");

            const updatedRows = rowsObs.map((row) => {
              if (row.id_registo_fito_obs === editingIdObs) {
                return res.data.result;
              } else {
                return row;
              }
            });

            setRowsObs(updatedRows !== undefined ? updatedRows : []);
            setShowObsRow(false);
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
  }
  // Delete
  const handleClickOpenDeleteObs = (id: number | null | undefined) => {
    setIdToDelete(id);
    setOpenDeleteObs(true);
  };
  const handleDeleteObs = async () => {
    try {
      setIsLoading(true);
      let res = await del(`/delete__reg_fitossanitaria_obs/${idToDelete}`);

      if (res.status === 200) {
        setMessage("Registo eliminado com sucesso!");
        setOpenDeleteObs(false);
        setIdToDelete(null);
        setRowsObs((oldRows) => [
          ...oldRows.filter((oldRow) => oldRow.id_registo_fito_obs !== idToDelete),
        ]);
        setOpenSnackSuccess(true);
      } else {
        setMessage("Erro ao eliminar o registo!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleDelete", error, true);
      setIsLoading(false);
      setMessage("Erro ao eliminar o registo!");
      setOpenSnackError(true);
    }
  };


  /**************** PAGINAÇÃO *********************/
  // // Avoid a layout jump when reaching the last page with empty rows.
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
        <CadernoLayout title="4 - Registo de Proteção Fitossanitária e aplicação de biocidas" />
        <main className={classes.contents}>
          <div className={classes.toolbars} />
          <div>
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
                  <CabecalhoPOForm
                      cabecalhos={cabecalhos}
                      obj_Cabecalho={obj_cabecalho}
                      set_obj_Cabecalho={set_obj_Cabecalho}
                      setZona_Homogenea={setZona_Homogenea}
                      handleSelectZona={handleSelectZona}
                      selectedIndex={selectedIndex}
                      setCabecalhos={setCabecalhos} 
                      setMessage={setMessage} 
                      setOpenSnackError={setOpenSnackError} 
                      setOpenSnackSuccess={setOpenSnackSuccess} 
                      setIsLoading={setIsLoading} />
                </Box>

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
                  <table style={{ width: "100%" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell colSpan={16}>
                          <Box sx={{ display: "flex", justifyContent: "end", }} >
                            <BarraDeFerramentas
                              mostrarBotaoNovo
                              textoBotaoNovo="Novo Registo"
                              aoClicarNovo={() => setShowNewRow(true)}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead rowSpan={3}>
                          <Stack direction="row" justifyContent="center">
                            Data *
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={"Data deve ser registada no formato dd-mm-aaaa"}
                              />
                            </Box>
                          </Stack>
                        </StyledTableHead>
                        <StyledTableHead rowSpan={3} sx={{ minWidth: 120 }}>
                          Estado
                          <Stack direction="row" justifyContent="center">
                            fenológico
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={"Estado fenológico da cultura deve ser registado por zona homogénea."}
                              />
                            </Box>
                          </Stack>
                        </StyledTableHead>
                        <StyledTableHead rowSpan={3} sx={{ minWidth: 120 }}>
                          <Stack direction="row" justifyContent="center">
                            Inimigo *
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={"Nome da praga, doença, infestante ou grupo de infestantes.\n\nCampo de preenchimento obrigatório para cumprimento da exigência de manutenção de registo estabelecida no indicador 1.4, da área 1, RLG 5, Anexo III, Portaria n.º 54-Q/2023. Em alternativa, o referido diploma prevê a hipótese de o beneficiário indicar o 'efeito a atingir', que no presente modelo é possível preenchendo o campo «justificação da intervenção»."}
                              />
                            </Box>
                          </Stack>
                        </StyledTableHead>
                        <StyledTableHead rowSpan={3} sx={{ minWidth: 180 }}>
                          <Stack direction="row" justifyContent="center">
                            Metodologia
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={"Metodologia utilizada: observação visual/tipo de armadilha."}
                              />
                            </Box>
                          </Stack>
                        </StyledTableHead>
                        <StyledTableHead rowSpan={3} sx={{ minWidth: 180 }}>
                          Estimativa do risco e/ou <br />
                          <Stack direction="row" justifyContent="center">
                            NEA
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={"NEA - Nível Económico de Ataque. “Estimativa do risco/NEA” – Registos que levam à tomada de decisão da eventual realização dos tratamentos fitossanitários. Quantificação/resultado obtido da estimativa do risco."}
                              />
                            </Box>
                          </Stack>
                        </StyledTableHead>
                        <StyledTableHead rowSpan={3} sx={{ minWidth: 180 }}>
                          Justificação da
                          <Stack direction="row" justifyContent="center">
                            intervenção
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={"A justificação da intervenção, sempre que possível, deve incluir as condições climáticas que levaram ao tratamento fitossanitário. \n\n Para cumprimento da exigência de manutenção de registo estabelecida no indicador 1.4, da área 1, RLG 5, Anexo III, Portaria n.º 54-Q/2023, o beneficiário poderá indicar o efeito a atingir com a aplicação de produto fitofarmacêutico no presente campo em alternativa ao preenchimento do campo «inimigo»."}
                              />
                            </Box>
                          </Stack>
                        </StyledTableHead>
                        <StyledTableHead rowSpan={3} sx={{ minWidth: 180 }}>
                          Observação / Largada de
                          <Stack direction="row" justifyContent="center">
                            auxiliares
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={"Observação de presença de auxiliares ou largada de auxiliares (sobretudo em estufa) espécies e quantidades."}
                              />
                            </Box>
                          </Stack>
                        </StyledTableHead>
                        <StyledTableHead colSpan={6}>
                          <Stack direction="row" justifyContent="center">
                            Tratamento fitossanitário/Aplicação biocida
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={" Todos os aplicadores devem efetuar e manter, durante pelo menos três anos, o registo de quaisquer tratamentos efetuados \n com produtos fitofarmacêuticos em território nacional, designadamente como anexo ao caderno de campo,\n  incluindo, nomeadamente, a referência ao nome comercial e ao número de autorização de venda do produto, \no nome e número de autorização de exercício de atividade do estabelecimento de venda onde o produto foi adquirido,\n a data e a dose ou concentração e volume de calda da aplicação, a área, \nculturas e respetivo inimigo, ou outra finalidade para que o produto foi utilizado."}
                              />
                            </Box>
                          </Stack>
                        </StyledTableHead>
                        <StyledTableHead colSpan={2} sx={{ minWidth: 350 }}>
                          Estabelecimento de venda onde o produto
                          fitofarmaceutico foi adquirido
                        </StyledTableHead>
                        <StyledTableHead rowSpan={3}>Ações</StyledTableHead>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead sx={{ minWidth: 200 }}>
                          <Stack direction="row" justifyContent="center">
                            Nº de autorização *
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={
                                  "De acordo com os casos aplicáveis preencher com: \n - Autorização Provisória de venda (APV); \n- Autorização de Venda (AV); \n - Autorização de Comércio Paralelo (ACP); \n - Autorização Excecional de Emergência (AEE). \n\n  Condicionalidade: campo de preenchimento obrigatório para efeito do cumprimento do indicador 1.4, da área 1, do RLG 5"}
                              />
                            </Box>
                          </Stack>
                        </StyledTableHead>
                        <StyledTableHead rowSpan={2}>
                          Nome de S.A/Biocida/Subs.
                          <Stack direction="row" justifyContent="center">
                            de base
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={"SA – Substância Ativa do produto firofarmacêutico aplicado. \nNo caso de aplicação de biocida registar qual o biocida utilizado. \nSubstância de base - Consideram-se as substâncias de base aprovadas a nível comunitário para utilização na proteção fitossanitária das culturas, nos termos do Regulamento (CE) nº 1107/2009 de 21 de outubro. \nDeve ser preenchida com um dos seguintes valores: \n - Equisetum arvense;\n - Cloridrato de quitosano;\n- Hidróxido de cálcio; \n- Lecitina;\n - Salix spp. cortex;\n - Vinagre;\n - Frutose;\n - Hidrogenocarbonato de sódio;\n - Fosfato diamónico;\n - Soro de leite;\n - Óleo de girassol;\n - Peróxido de hidrogénio;\n - Urtica spp.;\n - Carvão vegetal com bentonite;\n - Cloreto de sódio; \n - Pó de sementes de mostarda;\n - Cerveja; \n - Talco E553B; \n - Óleo de cebola; \n - L-cisteína (E 920); \n- Leite de vaca; \n- Extrato de Bolbo de Allium cepa L.; \n- Quitosano"}
                              />
                            </Box>
                          </Stack>
                        </StyledTableHead>
                        <StyledTableHead rowSpan={2} sx={{ minWidth: 180 }}>
                          Quantidade de produto aplicado (kg ou Litros de
                          <Stack direction="row" justifyContent="center">
                            produto comercial *)
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={"Condicionalidade: campo de preenchimento obrigatório para efeitos dos indicadores 1.4 e 1.5, da área 1 do RLG 5 da portaria n.º 54-Q/2023."}
                              />
                            </Box>
                          </Stack>
                        </StyledTableHead>
                        <StyledTableHead rowSpan={2} sx={{ minWidth: 150 }}>
                          Volume de calda da
                          <Stack direction="row" justifyContent="center">
                            aplicação *
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={"Condicionalidade: campo de preenchimento  obrigatório para efeito do cumprimento do indicador 1.4, da área 1, do RLG 5 da Portaria n.º 54-Q/2023."}
                              />
                            </Box>
                          </Stack>
                        </StyledTableHead>
                        <StyledTableHead rowSpan={2} sx={{ minWidth: 100 }}>
                          Área tratada
                          <Stack direction="row" justifyContent="center">
                            (ha) *
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={"A área tratada deve ser expressa em hectares, no caso de aplicações de produtos fitofarmacêuticos sobre culturas ou em m2, no caso de tratamentos em instalações com produtos fitofarmacêuticos ou biocidas.\n\n Condicionalidade: campo de preenchimento  obrigatório para efeito do cumprimento do indicador 1.4, da área 1, do RLG 5 da Portaria n.º 54-Q/2023."}
                              />
                            </Box>
                          </Stack>
                        </StyledTableHead>
                        <StyledTableHead rowSpan={2} sx={{ minWidth: 120 }}>
                          N.º de
                          <Stack direction="row" justifyContent="center">
                            aplicador
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={"Número de identificação do (ou dos) aplicadores dos PF's."}
                              />
                            </Box>
                          </Stack>
                        </StyledTableHead>
                        <StyledTableHead rowSpan={2} sx={{ minWidth: 120 }}>
                          <Box margin={-1} padding={0}>
                            Nome *
                            <BasicPopover
                              text={"Condicionalidade: campo de preenchimento  obrigatório para efeito do cumprimento do indicador 1.4, da área 1, do RLG 5 da Portaria n.º 54-Q/2023."}
                            />
                          </Box>
                        </StyledTableHead>
                        <StyledTableHead rowSpan={2} sx={{ minWidth: 120 }}>
                          N.º de autorização de
                          <Stack direction="row" justifyContent="center">
                            exercício de atividade *
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={"Condicionalidade: campo de preenchimento  obrigatório para efeito do cumprimento do indicador 1.4, da área 1, do RLG 5 da Portaria n.º 54-Q/2023."}
                              />
                            </Box>
                          </Stack>
                        </StyledTableHead>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead>
                          <Stack direction="row" justifyContent="center">
                            Nome Comercial
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={"Condicionalidade: campo de preenchimento  obrigatório para efeito do cumprimento do indicador 1.4, da área 1, do RLG 5 da Portaria n.º 54-Q/2023."}
                              />
                            </Box>
                          </Stack>
                        </StyledTableHead>
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
                                style: {
                                  fontSize: 12,
                                  fontFamily: "verdana",
                                },
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={newRow?.data === undefined ? "" : newRow.data}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                onInputChangeFitossanitaria(e)
                              }
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <CustomTextField
                              name="estado_fenologico"
                              value={newRow?.estado_fenologico === undefined ? "" : newRow.estado_fenologico}
                              onChange={onInputChangeFitossanitaria}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <CustomTextField
                              name="inimigo"
                              value={newRow?.inimigo === undefined ? "" : newRow.inimigo}
                              onChange={onInputChangeFitossanitaria}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <CustomTextField
                              name="metodologia"
                              value={newRow?.metodologia === undefined ? "" : newRow.metodologia}
                              onChange={onInputChangeFitossanitaria}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <CustomTextField
                              name="estimativa_risco"
                              value={newRow?.estimativa_risco === undefined ? "" : newRow.estimativa_risco}
                              onChange={onInputChangeFitossanitaria}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <CustomTextField
                              name="justifi_intervencao"
                              value={newRow?.justifi_intervencao === undefined ? "" : newRow.justifi_intervencao}
                              onChange={onInputChangeFitossanitaria}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <CustomTextField
                              name="observacoes_aux"
                              value={newRow?.observacoes_aux === undefined ? "" : newRow.observacoes_aux}
                              onChange={onInputChangeFitossanitaria}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <CustomTextField
                              name="n_autorizacao"
                              value={newRow?.n_autorizacao}
                              onChange={onInputChangeFitossanitaria}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <CustomSelect
                              value={newRow?.nome_biocida !== undefined ? newRow.nome_biocida : ""}
                              name="nome_biocida"
                              onChange={onInputChangeFitossanitaria}
                              options={nomebiocida}
                              label=" Nome de Biocida S.A."
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <CustomTextField
                              name="concentracao_dose"
                              value={newRow?.concentracao_dose === undefined ? "" : newRow.concentracao_dose}
                              onChange={onInputChangeFitossanitaria}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <CustomTextField
                              name="volume_aplicacao"
                              value={newRow?.volume_aplicacao === undefined ? "" : newRow.volume_aplicacao}
                              onChange={onInputChangeFitossanitaria}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <CustomTextField
                              error={error_area_tratada}
                              helperText={error_area_tratada ? message_apenas_numero : ""}
                              name="area_tratada"
                              value={newRow?.area_tratada === undefined ? "" : newRow?.area_tratada}
                              onChange={onInputChangeFitossanitaria}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <CustomTextField
                              name="n_aplicador"
                              value={newRow?.n_aplicador === undefined ? "" : newRow?.n_aplicador}
                              onChange={onInputChangeFitossanitaria}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <CustomTextField
                              name="nome"
                              value={newRow?.nome === undefined ? "" : newRow.nome}
                              onChange={onInputChangeFitossanitaria}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <CustomTextField
                              name="n_autorizacao_atividade"
                              value={newRow?.n_autorizacao_atividade === undefined ? "" : newRow.n_autorizacao_atividade}
                              onChange={onInputChangeFitossanitaria}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row" justifyContent="center">
                              <ButtonCadernos
                                mostrarBotaoCancelar
                                aoClicarCancelar={() => setShowNewRow(false)}
                                mostrarBotaoGravar
                                aoClicarGravar={() => handleSaveFito()}
                              />
                            </Stack>
                          </StyledTableCell>
                        </TableRow>
                      )}
                      {(rowsPerPage > 0
                        ? rows &&
                        rows.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        : rows
                      ).map((row, key) => {
                        return (
                          <TableRow key={key}>
                            {editingId === row.id_registo_fito && editRow ? (
                              <>
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
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange_editar_linha_fitossanitaria(e)
                                    }
                                  />
                                </StyledTableCell>
                                <StyledTableCell>
                                  <CustomTextField
                                    name="estado_fenologico"
                                    value={row.estado_fenologico}
                                    onChange={onInputChange_editar_linha_fitossanitaria}
                                  />
                                </StyledTableCell>
                                <StyledTableCell>
                                  <CustomTextField
                                    name="inimigo"
                                    value={row.inimigo}
                                    onChange={onInputChange_editar_linha_fitossanitaria}
                                  />
                                </StyledTableCell>
                                <StyledTableCell>
                                  <CustomTextField
                                    name="metodologia"
                                    value={row.metodologia}
                                    onChange={onInputChange_editar_linha_fitossanitaria}
                                  />
                                </StyledTableCell>
                                <StyledTableCell>
                                  <CustomTextField
                                    name="estimativa_risco"
                                    value={row.estimativa_risco}
                                    onChange={onInputChange_editar_linha_fitossanitaria}
                                  />
                                </StyledTableCell>
                                <StyledTableCell>
                                  <CustomTextField
                                    name="justifi_intervencao"
                                    value={row.justifi_intervencao}
                                    onChange={onInputChange_editar_linha_fitossanitaria}
                                  />
                                </StyledTableCell>
                                <StyledTableCell>
                                  <CustomTextField
                                    name="observacoes_aux"
                                    value={row.observacoes_aux}
                                    onChange={onInputChange_editar_linha_fitossanitaria}
                                  />
                                </StyledTableCell>
                                <StyledTableCell>
                                  <CustomTextField
                                    name="n_autorizacao"
                                    value={row.n_autorizacao}
                                    onChange={onInputChange_editar_linha_fitossanitaria}
                                  />
                                </StyledTableCell>
                                <StyledTableCell>
                                  <CustomSelect
                                    value={row.nome_biocida !== undefined ? row.nome_biocida : ""}
                                    name="nome_biocida"
                                    onChange={onInputChange_editar_linha_fitossanitaria}
                                    options={nomebiocida}
                                    label=" Nome de Biocida S.A."
                                  />
                                </StyledTableCell>
                                <StyledTableCell>
                                  <CustomTextField
                                    name="concentracao_dose"
                                    value={row.concentracao_dose}
                                    onChange={onInputChange_editar_linha_fitossanitaria}
                                  />
                                </StyledTableCell>
                                <StyledTableCell>
                                  <CustomTextField
                                    name="volume_aplicacao"
                                    value={row.volume_aplicacao}
                                    onChange={onInputChange_editar_linha_fitossanitaria}
                                  />
                                </StyledTableCell>
                                <StyledTableCell>
                                  <CustomTextField
                                    name="area_tratada"
                                    value={row.area_tratada}
                                    onChange={onInputChange_editar_linha_fitossanitaria}
                                  />
                                </StyledTableCell>
                                <StyledTableCell>
                                  <CustomTextField
                                    name="n_aplicador"
                                    value={row.n_aplicador}
                                    onChange={onInputChange_editar_linha_fitossanitaria}
                                  />
                                </StyledTableCell>
                                <StyledTableCell>
                                  <CustomTextField
                                    name="nome"
                                    value={row.nome}
                                    onChange={onInputChange_editar_linha_fitossanitaria}
                                  />
                                </StyledTableCell>
                                <StyledTableCell>
                                  <CustomTextField
                                    name="n_autorizacao_atividade"
                                    value={row.n_autorizacao_atividade}
                                    onChange={onInputChange_editar_linha_fitossanitaria}
                                  />
                                </StyledTableCell>
                              </>
                            ) : (
                              <>
                                <StyledTableCell>{row.data} </StyledTableCell>
                                <StyledTableCell>
                                  {row.estado_fenologico}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {row.inimigo}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {row.metodologia}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {row.estimativa_risco}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {row.justifi_intervencao}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {row.observacoes_aux}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {row.n_autorizacao}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {row.nome_biocida}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {row.concentracao_dose}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {row.volume_aplicacao}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {row.area_tratada}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {row.n_aplicador}
                                </StyledTableCell>
                                <StyledTableCell>{row.nome} </StyledTableCell>
                                <StyledTableCell>
                                  {row.n_autorizacao_atividade}
                                </StyledTableCell>
                              </>
                            )}
                            {editingId === row.id_registo_fito && editRow ? (
                              <StyledTableCell>
                                <ButtonCadernos
                                  mostrarBotaoGravar
                                  aoClicarGravar={handleUpdateFitossanitaria}
                                  mostrarBotaoCancelar
                                  aoClicarCancelar={() => setEditingId(null)}
                                />
                              </StyledTableCell>
                            ) : (
                              <StyledTableCell>
                                <ButtonCadernos
                                  mostrarBotaoEditar
                                  aoClicarEditar={() =>
                                    handleEdit(row.id_registo_fito)
                                  }
                                  mostrarBotaoApagar
                                  aoClicarApagar={() =>
                                    handleClickOpenDelete(row.id_registo_fito)
                                  }
                                />
                              </StyledTableCell>
                            )}
                          </TableRow>
                        );
                      })}


                      {selectedIndex !== null && rowsObs.length <= 0 ? (
                        showObsRow ?
                          <TableRow>
                            <StyledTableHead>Observações</StyledTableHead>
                            <StyledTableCell colSpan={14}>
                              <CustomTextField
                                name="observacoes"
                                value={rowObs?.observacoes === undefined ? "" : rowObs.observacoes}
                                onChange={onInputChangeObs}
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
                                  aoClicarGravar={() => handleSaveFitossanitariaObs()}
                                />
                              </Stack>
                            </StyledTableCell>
                          </TableRow>
                          :
                          <TableRow>
                            <StyledTableHead>Observações</StyledTableHead>
                            <StyledTableCell colSpan={14}></StyledTableCell>
                            <TableCell colSpan={16}>
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
                        (rowsObs.map((obs, key) =>
                          <TableRow key={key}>
                            {editingIdObs === obs.id_registo_fito_obs && showObsRow ? (
                              <>
                                <StyledTableHead>Observações</StyledTableHead>
                                <StyledTableCell colSpan={14}>
                                  <CustomTextField
                                    name="observacoes"
                                    value={obs.observacoes}
                                    onChange={onInputChange_editar_Obs}
                                  />
                                </StyledTableCell>
                              </>
                            ) : (
                              <>
                                <StyledTableHead>Observações</StyledTableHead>
                                <StyledTableCell colSpan={14}>
                                  {obs.observacoes}
                                </StyledTableCell>
                              </>
                            )}
                            {showObsRow ? (
                              <StyledTableCell>
                                <ButtonCadernos
                                  mostrarBotaoGravar
                                  aoClicarGravar={handleUpdateObs}
                                  mostrarBotaoCancelar
                                  aoClicarCancelar={() => setShowObsRow(false)}
                                />
                              </StyledTableCell>
                            ) : (
                              <StyledTableCell>
                                <ButtonCadernos
                                  mostrarBotaoEditar
                                  aoClicarEditar={() =>
                                    handleEditObs(obs.id_registo_fito_obs)
                                  }
                                  mostrarBotaoApagar
                                  aoClicarApagar={() =>
                                    handleClickOpenDeleteObs(obs.id_registo_fito_obs)
                                  }
                                />
                              </StyledTableCell>
                            )}
                          </TableRow>
                        )
                        )}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={19} />
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell colSpan={16}>
                          <Typography style={{ fontSize: 14, fontFamily: "candara" }}>
                            * Campos de preenchimento obrigatório
                          </Typography>
                        </TableCell>
                      </TableRow>
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
                          colSpan={16}
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
          </div>
        </main>
      </div>
    </CustomThemeProvider>
  );
}


