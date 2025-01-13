import React, { ChangeEvent, useEffect, useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SelectChangeEvent, Stack, TableCell, TableFooter, TablePagination, TableRow, } from "@mui/material";
import { Box, Paper, Snackbar } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableHead, TableBody } from "@mui/material";

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
import { modoProducao } from "../../../informacao_estatica";
import { IPage3 } from "../../../Interfaces/cadernos/caderno3";
import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
import { Alert } from "../../../Components/Alert/Alert";

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
  })
);

export default function CaracterizacaoEfePecuaria() {
  const classes = useStyles();
  const location = useLocation();

  const [showNewRow, setShowNewRow] = useState(false);
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [openDelete, setOpenDelete] = React.useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null | undefined>(null);
  const [editingId, setEditingId] = useState<number | null | undefined>(null);
  const [editRow, setEditRow] = useState(false);

  const [error_naturais, setError_naturais] = useState<boolean>(false);
  const [error_normais, setError_normais] = useState<boolean>(false);
  const message_apenas_numero = ("Apenas números são aceites");

  const [rows, setRows] = useState<IPage3[]>([]);
  const [newRow, setNewRow] = useState<IPage3>();

  /**************** GET DATA **********************************/
  async function getPecuaria() {
    try {
      let res = await get(`/get_caraterizacao_pecuario_id_rosto/${location.state.id_rosto}`);

      if (res.status === 200) {
        setRows(res.data.result);
      };
      setIsLoading(false);

    } catch (error) {
      func_print("getPecuaria", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);

      setIsLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      await getPecuaria();
    })();
  }, []);

  /************************** CREATE ROW *****************************************/
  const handleInputChangeTable = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;

    if (name === "naturais") {
      if (isNaN(Number(value))) {
        setError_naturais(true);
        return;
      } else {
        setError_naturais(false);
      }
    }

    if (name === "normais") {
      if (isNaN(Number(value))) {
        setError_normais(true);
        return;
      } else {
        setError_normais(false);
      }
    }

    setNewRow((prevRows: any) => ({
      ...prevRows,
      [name]: value,
    }));
  };

  const handleSavePagina3 = async () => {
    if (newRow === undefined) {
      setMessage("Preencha os campos antes de gravar!");
      setOpenSnackError(true);
    } else {
      try {
        setIsLoading(true);
        let res = await post("/new_caraterizacao_pecuario", {
          payload: {
            id_cara_pecu: 0,
            epecie: newRow?.epecie === undefined ? "" : newRow.epecie,
            grupo_homoge: newRow?.grupo_homoge === undefined ? "" : newRow.grupo_homoge,
            classe_etaria: newRow?.classe_etaria === undefined ? "" : newRow.classe_etaria,
            modo_producao: newRow?.modo_producao === undefined ? "" : newRow.modo_producao,
            naturais: newRow?.naturais === undefined ? "" : newRow.naturais,
            normais: newRow?.normais === undefined ? "" : newRow.normais,
            finalidade_producao: newRow?.finalidade_producao === undefined ? "" : newRow.finalidade_producao,
            observacoes: newRow?.observacoes === undefined ? "" : newRow.observacoes,
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
        func_print("handleSavePagina3", error, true);
        setMessage("Erro ao efetuar a sua operação!");
        setOpenSnackError(true);

        setIsLoading(false);
      }
    }



  };

  /*************** EDITAR LINHA *********************/
  const handleEdit = (id: number | null | undefined) => {
    setEditingId(id);
    setEditRow(true);
  };

  const onInputChangeEdit = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;

    if (name === "naturais") {
      if (/^\d*$/.test(value)) {
        setError_naturais(false);
      } else {
        setError_naturais(true);
        return;
      }
    }
    if (name === "normais") {
      if (/^\d*$/.test(value)) {
        setError_normais(false);
      } else {
        setError_normais(true);
        return;
      }
    }

    if (editingId !== null) {
      const updatedTable = rows.map((tab) => {
        if (tab.id_cara_pecu === editingId) {
          return {
            ...tab,
            [name]: value,
          };
        }
        return tab;
      });
      setRows(updatedTable);
    }
  }

  const handleUpdatePagina3 = async () => {
    if (editingId !== null) {
      const tableToSave = rows.find((tab) => tab.id_cara_pecu === editingId);

      if (tableToSave) {
        try {
          setIsLoading(true);

          const res = await post("/update_caraterizacao_pecuario", {
            payload: tableToSave,
          });

          if (res.status === 200) {
            setMessage("Registado com sucesso!");
            setEditingId(null);

            const updatedRows = rows.map((row) => {
              if (row.id_cara_pecu === editingId) {
                return res.data.result
              } else {
                return row;
              }
            });

            setRows(updatedRows !== undefined ? updatedRows : []);
            setEditingId(undefined);
            setEditRow(false);
            setOpenSnackSuccess(true);
          } else {
            setMessage("Erro ao gravar!");
            setOpenSnackError(true);
          }
          setIsLoading(false);
        } catch (error) {
          func_print("handleUpdatePagina3", error, true);
          setMessage("Erro ao gravar!");
          setOpenSnackError(true);
          setIsLoading(false);
        }
      }
    }

  };

  /************************** DELETE **************************/
  const handleClickOpenDelete = (id: number | null | undefined) => {
    setIdToDelete(id);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      let res = await del(`/delete_caraterizacao_pecuario/${idToDelete}`);
      if (res.status === 200) {
        setRows((oldRows) => [
          ...oldRows.filter((oldRow) => oldRow.id_cara_pecu !== idToDelete),
        ]);
        setOpenDelete(false);
        setMessage("Registo eliminado com sucesso!");
        setOpenSnackSuccess(true);
      } else {
        setMessage("Erro ao eliminar o registo!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleDelete", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);

      setIsLoading(false);
    }
  };


  /*****************  PAGINAÇÃO ********************** */
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
        <CadernoLayout title="3 - Caraterização do Efetivo Pecuário" />
        <main className={classes.contents}>
          <div className={classes.toolbars} />

          <>
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
              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{ height: "auto", padding: 2, margin: 2, width: "auto" }}
              >
                <table style={{ width: "100%" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        sx={{
                          fontWeight: 600,
                          fontSize: 20,
                          fontFamily: "candara",
                        }}
                      >
                        3 - Caraterização do Efetivo Pecuário
                        <BasicPopover
                          text={
                            "Preenchimento obrigatório para os beneficiários que detenham animais certificados em modo de produção biológico ou PRODI."
                          }
                        />
                      </TableCell>

                      <TableCell>
                        <BarraDeFerramentas
                          mostrarBotaoNovo
                          textoBotaoNovo="Novo Registo"
                          aoClicarNovo={() => setShowNewRow(true)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead rowSpan={2}>
                        Espécie / Raça
                      </StyledTableHead>
                      <StyledTableHead rowSpan={2}>
                        Grupo Homogéneo
                      </StyledTableHead>
                      <StyledTableHead rowSpan={2}>
                        Classe Etária
                      </StyledTableHead>
                      <StyledTableHead rowSpan={2}>
                        Modo de <br />
                        <Stack direction="row" justifyContent="center">
                          produção
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={
                                "Modo de Produção Biológico ou Produção Integrada"
                              }
                            />
                          </Box>
                        </Stack>
                      </StyledTableHead>
                      <StyledTableHead colSpan={2}>
                        Nº de Cabeças
                      </StyledTableHead>
                      <StyledTableHead rowSpan={2} sx={{ minWidth: 150 }}>
                        Finalidade da produção
                      </StyledTableHead>
                      <StyledTableHead rowSpan={2} sx={{ minWidth: 180 }}>
                        Outras Observações
                      </StyledTableHead>
                      <StyledTableHead rowSpan={3}>Ações</StyledTableHead>
                    </TableRow>

                    <TableRow>
                      <StyledTableHead>Naturais</StyledTableHead>
                      <StyledTableHead>Normais (CN)</StyledTableHead>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {showNewRow && (
                      <TableRow>
                        <StyledTableCell>
                          <CustomTextField
                            name="epecie"
                            value={newRow?.epecie}
                            onChange={handleInputChangeTable}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="grupo_homoge"
                            value={newRow?.grupo_homoge}
                            onChange={handleInputChangeTable}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="classe_etaria"
                            value={newRow?.classe_etaria}
                            onChange={handleInputChangeTable}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomSelect
                            value={newRow?.modo_producao !== undefined ? newRow.modo_producao : ""}
                            name="modo_producao"
                            options={modoProducao}
                            label={"Modo de produção"}
                            onChange={handleInputChangeTable}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="naturais"
                            value={newRow?.naturais}
                            onChange={handleInputChangeTable}
                            error={error_naturais}
                            helperText={error_naturais ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="normais"
                            value={newRow?.normais}
                            onChange={handleInputChangeTable}
                            error={error_normais}
                            helperText={error_normais ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="finalidade_producao"
                            value={newRow?.finalidade_producao}
                            onChange={handleInputChangeTable}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="observacoes"
                            value={newRow?.observacoes}
                            onChange={handleInputChangeTable}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <ButtonCadernos
                            mostrarBotaoCancelar
                            aoClicarCancelar={() => setShowNewRow(false)}
                            mostrarBotaoGravar
                            aoClicarGravar={() => handleSavePagina3()}
                          />
                        </StyledTableCell>
                      </TableRow>
                    )}

                    {(rowsPerPage > 0
                      ? rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      : rows
                    ).map((row, key) => {
                      return (
                        <TableRow key={key}>
                          {editingId === row.id_cara_pecu && editRow ? (
                            <>
                              <StyledTableCell>
                                <CustomTextField
                                  value={row.epecie !== undefined ? row.epecie : ""}
                                  name="epecie"
                                  onChange={onInputChangeEdit}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="grupo_homoge"
                                  value={row.grupo_homoge !== undefined ? row.grupo_homoge : ""}
                                  onChange={onInputChangeEdit}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="classe_etaria"
                                  value={row?.classe_etaria !== undefined ? row.classe_etaria : ""}
                                  onChange={onInputChangeEdit}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomSelect
                                  value={row?.modo_producao !== undefined ? row.modo_producao : ""}
                                  name="modo_producao"
                                  options={modoProducao}
                                  label={"Modo de produção"}
                                  onChange={onInputChangeEdit}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="naturais"
                                  value={row?.naturais !== undefined ? row.naturais : ""}
                                  onChange={onInputChangeEdit}
                                  error={error_naturais}
                                  helperText={error_naturais ? message_apenas_numero : ""}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="normais"
                                  value={row?.normais !== undefined ? row.normais : ""}
                                  onChange={onInputChangeEdit}
                                  error={error_normais}
                                  helperText={error_normais ? message_apenas_numero : ""}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="finalidade_producao"
                                  value={row?.finalidade_producao !== undefined ? row.finalidade_producao : ""}
                                  onChange={onInputChangeEdit}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <CustomTextField
                                  name="observacoes"
                                  value={row.observacoes !== undefined ? row.observacoes : ""}
                                  onChange={onInputChangeEdit}
                                />
                              </StyledTableCell>
                            </>
                          ) : (
                            <>
                              <StyledTableCell>{row.epecie}</StyledTableCell>
                              <StyledTableCell>
                                {row.grupo_homoge}
                              </StyledTableCell>
                              <StyledTableCell>
                                {row.classe_etaria}
                              </StyledTableCell>
                              <StyledTableCell>
                                {row.modo_producao}
                              </StyledTableCell>
                              <StyledTableCell>{row.naturais}</StyledTableCell>
                              <StyledTableCell>{row.normais}</StyledTableCell>
                              <StyledTableCell>
                                {row.finalidade_producao}
                              </StyledTableCell>
                              <StyledTableCell>
                                {row.observacoes}
                              </StyledTableCell>
                            </>
                          )}

                          {editingId === row.id_cara_pecu && editRow ? (
                            <StyledTableCell>
                              <ButtonCadernos
                                mostrarBotaoGravar
                                aoClicarGravar={() => handleUpdatePagina3()}
                                mostrarBotaoCancelar
                                aoClicarCancelar={() => setEditRow(false)}
                              />
                            </StyledTableCell>
                          ) : (
                            <StyledTableCell>
                              <ButtonCadernos
                                mostrarBotaoEditar
                                aoClicarEditar={() =>
                                  handleEdit(row.id_cara_pecu)
                                }
                                mostrarBotaoApagar
                                aoClicarApagar={() =>
                                  handleClickOpenDelete(row.id_cara_pecu)
                                }
                              />
                            </StyledTableCell>
                          )}

                        </TableRow>
                      );
                    })}

                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={12} />
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
                          { label: "Tudo", value: -1 },
                        ]}
                        colSpan={14}
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

            )}
            <ConfirmDialog
              open={openDelete}
              onClose={() => setOpenDelete(false)}
              onConfirm={handleDelete}
              message="Deseja eliminar o registo?"
            />
          </>
        </main>
      </div>
    </CustomThemeProvider>
  );
}
