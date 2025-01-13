import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Divider, Paper, Snackbar, Stack, Typography } from "@mui/material";
import { TableFooter, TablePagination, TextField } from "@mui/material";
import { Box } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import { TableBody, TableHead } from "@mui/material";
import { TableContainer } from "@mui/material";
import CadernoLayout from "../../../Styles/layout/cadernoLayout";
import Loading from "../../../Styles/Loader/loading";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
import TablePaginationActions from "../../../Components/Pagination/pagination";
import { StyledTableCell, StyledTableHead } from "../../../Styles/tabelCellStyled/customTableCell";
import { CustomTextField, CustomThemeProvider } from "../../../Styles/theme/customThemeprovider";
import { IAnexo6 } from "../../../Interfaces/anexos/anexo6";
import { del, get, post } from "../../../Services/tokenConfig";
import { func_print } from "../../../Func_genericas/func_print";
import { useLocation } from "react-router-dom";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { Alert } from "../../../Components/Alert/Alert";

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


export default function Anexo6() {
  const classes = useStyles();
  const location = useLocation();



  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = React.useState("");
  const [showNewRow, setShowNewRow] = useState(false);
  const [editRow, setEditRow] = useState(false);

  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);

  const [obj_anexo_lista, set_obj_anexo_lista] = useState<IAnexo6[]>([]);
  const [obj_anexo, set_obj_anexo] = useState<IAnexo6>();

  const [open_dialog_tem_a_certeza_que_quer_eliminar, set_open_dialog_tem_a_certeza_que_quer_eliminar] = useState(false);

  const [flag_erro_numero_de_visitas, set_flag_erro_numero_de_visitas] = useState(false)
  const [flag_erro_data, set_flag_erro_data] = useState(false)

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


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
  const handleCloseSnack = () => {

    setOpenSnackSuccess(false);
    setOpenSnackError(false);
  };



  const get_info = async () => {
    try {
      let res = await get(
        `/get_reg_anexo_seis_rosto/${location.state.id_rosto}`
      );

      if (res.status === 200) {
        if (res.data.result.length !== 0) {
          set_obj_anexo_lista(res.data.result);
          setShowNewRow(false);
        } else {
          setShowNewRow(true);
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
      await get_info();
    })();
  }, []);

  const onInputChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    let aux_obj_anexo: any = obj_anexo === undefined ? {} : obj_anexo


    if (type === "checkbox") {
      aux_obj_anexo[name] = aux_obj_anexo[name] === undefined ? true : !aux_obj_anexo[name]
      set_obj_anexo(aux_obj_anexo);

    } else {
      if (name === 'numero_visita') {
        console.log(value)
        console.log(typeof value)

        if (!/^\d+$/.test(value)) {
          set_flag_erro_numero_de_visitas(true)

        } else {
          set_flag_erro_numero_de_visitas(false)

        }

      } if (name === 'data' && flag_erro_data === true) {
        set_flag_erro_data(false)

      }


      set_obj_anexo((old: any) => ({
        ...old,
        [name]: value,
      }));
    }



  };

  const handle_create_anexo = async () => {
    try {
      if (typeof obj_anexo?.data === 'undefined' || obj_anexo?.data.length === 0) {
        set_flag_erro_data(true)
        setMessage("Preenchimento da data obrigatório!");
        setOpenSnackError(true);

      } else if (typeof obj_anexo?.numero_visita === 'undefined' || obj_anexo?.numero_visita.toString().length === 0 || flag_erro_numero_de_visitas === true) {
        set_flag_erro_numero_de_visitas(true)
        setMessage("Preenchimento do número de visitas obrigatório!");
        setOpenSnackError(true);

      } else {
        setIsLoading(true);

        let res = await post("new_reg_anexo_seis", {
          payload: {
            id_visita: obj_anexo?.id_visita === undefined ? 0 : obj_anexo?.id_visita,
            numero_visita: obj_anexo?.numero_visita === undefined ? null : obj_anexo?.numero_visita,
            obs: obj_anexo?.obs === undefined ? '' : obj_anexo?.obs,
            tec_um_nome: obj_anexo?.tec_um_nome === undefined ? '' : obj_anexo?.tec_um_nome,
            tec_um_rubrica: obj_anexo?.tec_um_rubrica === undefined ? '' : obj_anexo?.tec_um_rubrica,
            tec_um_entidade: obj_anexo?.tec_um_entidade === undefined ? '' : obj_anexo?.tec_um_entidade,
            tec_dois_nome: obj_anexo?.tec_dois_nome === undefined ? '' : obj_anexo?.tec_dois_nome,
            tec_dois_rubrica: obj_anexo?.tec_dois_rubrica === undefined ? '' : obj_anexo?.tec_dois_rubrica,
            tec_dois_entidade: obj_anexo?.tec_dois_entidade === undefined ? '' : obj_anexo?.tec_dois_entidade,
            data: obj_anexo?.data === undefined ? '' : obj_anexo?.data,
            id_rosto: location.state.id_rosto,
            last_update: new Date().toISOString(),
            create_date: new Date().toISOString(),
            uuid: "",
          }
        });

        if (res.status === 200) {
          setMessage("Gravado com sucesso!");
          setOpenSnackSuccess(true);

          set_obj_anexo_lista((old) => [...old, res.data.result])
          setShowNewRow(false)

          set_obj_anexo(undefined);

        } else {
          setMessage("Erro ao gravar!");
          setOpenSnackError(true);

        }

        setIsLoading(false);

      }
    } catch (error) {
      func_print("handle_create_anexo", error, true);
      setIsLoading(false);
      setMessage("Erro ao gravar!");
      setOpenSnackError(true);

    }
  };

  // EDITAR
  const handleEdit = (obj: IAnexo6) => {

    if (showNewRow === true) {
      setShowNewRow(false)
    }
    set_obj_anexo(obj)
    setEditRow(true);
  };


  const handle_update_anexo = async () => {
    try {

      if (typeof obj_anexo?.data === 'undefined' || obj_anexo?.data.length === 0) {
        set_flag_erro_data(true)
        setMessage("Preenchimento da data obrigatório!");
        setOpenSnackError(true);

      } else if (typeof obj_anexo?.numero_visita === 'undefined' || obj_anexo?.numero_visita.toString().length === 0 || flag_erro_numero_de_visitas === true) {
        set_flag_erro_numero_de_visitas(true)
        setMessage("Preenchimento do número de visitas obrigatório!");
        setOpenSnackError(true);

      } else {
        setIsLoading(true);

        let res = await post("update_reg_anexo_seis", { payload: obj_anexo });

        if (res.status === 200) {
          setMessage("Gravado com sucesso!");
          setOpenSnackSuccess(true);
          set_obj_anexo(undefined);

          let lista_aux: any = obj_anexo_lista.map((el) => {
            if (el.id_visita !== res.data.result.id_visita) {
              return el
            } else {
              return res.data.result
            }
          })
          set_obj_anexo_lista(lista_aux === undefined ? [] : lista_aux)
        } else {
          setMessage("Erro ao gravar!");

          setOpenSnackError(true);
        }

        setIsLoading(false);
      }

    } catch (error) {
      func_print("handle_update_anexo", error, true);
      setMessage("Erro ao gravar!");

      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  // DELETE
  const handleClickOpenDelete = (obj: IAnexo6) => {
    set_obj_anexo(obj);
    set_open_dialog_tem_a_certeza_que_quer_eliminar(true)
  };


  const handle_delete_anexo = async () => {
    try {
      setIsLoading(true);

      let res = await del(`delete__reg_anexo_seis/${obj_anexo?.id_visita}`);

      if (res.status === 200) {
        setMessage("Registo eliminado com sucesso!");
        set_obj_anexo(undefined)
        set_open_dialog_tem_a_certeza_que_quer_eliminar(false);
        setOpenSnackSuccess(true);
        let lista_aux: any = obj_anexo_lista.filter((el) => {
          if (el.id_visita !== obj_anexo?.id_visita) {
            return el
          }
        })
        set_obj_anexo_lista(lista_aux === undefined ? [] : lista_aux)
        if (lista_aux === undefined || lista_aux.length === 0) {
          setShowNewRow(true)
          set_obj_anexo(undefined)
        }
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
  const handle_novo_registo = () => {
    if (editRow === true) {
      setEditRow(false)
      set_obj_anexo(undefined)
    }

    setShowNewRow(true)

  }

  return (
    <div className={classes.root}>
      <CadernoLayout title="Anexo 6 - Registo de visitas de OC, ERR ou ELA" />
      <main className={classes.contents}>
        <div className={classes.toolbars} />

        <Box width="80%" margin="auto">
          <Beneficiario_nome_id_alinhado_direita />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <BarraDeFerramentas
            mostrarBotaoNovo
            textoBotaoNovo="Novo Registo"
            aoClicarNovo={() => handle_novo_registo()}
          />
        </Box>

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
        <ConfirmDialog
          open={open_dialog_tem_a_certeza_que_quer_eliminar}
          onClose={() => set_open_dialog_tem_a_certeza_que_quer_eliminar(false)}
          onConfirm={handle_delete_anexo}
          message="Deseja eliminar o registo?"
        />

        {isLoading ? (
          <Loading />
        ) : (
          <CustomThemeProvider>
            <TableContainer
              component={Paper}
              variant="outlined"
              sx={{ height: "auto", width: "auto", m: 2, padding: 2 }}
            >
              <table style={{ width: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      colSpan={17}
                      sx={{
                        fontWeight: 700,
                        fontSize: 18,
                        fontFamily: "candara",
                      }}
                    >
                      Anexo 6 - Registo de visitas de OC, ERR ou ELA
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>Visita nº</StyledTableHead>
                    <StyledTableHead>Observações recomendações</StyledTableHead>
                    <StyledTableHead>
                      Identificação dos técnicos
                    </StyledTableHead>
                    <StyledTableHead>Data e carimbo</StyledTableHead>
                    <StyledTableHead>Ações</StyledTableHead>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {showNewRow && (
                    <>
                      <StyledTableCell>
                        <CustomTextField
                          name="numero_visita"
                          error={flag_erro_numero_de_visitas}
                          helperText={
                            flag_erro_numero_de_visitas === true ? "Número inválido" : ""
                          }
                          value={obj_anexo?.numero_visita}
                          onChange={onInputChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="obs"
                          value={obj_anexo?.obs}
                          onChange={onInputChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Stack direction="column">
                          <TableCell>
                            <Stack direction="row" alignItems="center">
                              Nome:{" "}
                              <CustomTextField
                                name="tec_um_nome"
                                value={obj_anexo?.tec_um_nome}
                                onChange={onInputChange}
                              />
                              Nome:{" "}
                              <CustomTextField
                                name="tec_dois_nome"
                                value={obj_anexo?.tec_dois_nome}
                                onChange={onInputChange}
                              />
                            </Stack>
                          </TableCell>
                          <TableCell>
                            Rubrica:_______________________
                            Rubrica:_______________________
                          </TableCell>
                          <TableCell>
                            <Stack direction="row" alignItems="center">
                              Entidade:
                              <CustomTextField
                                name="tec_um_entidade"
                                value={obj_anexo?.tec_um_entidade}
                                onChange={onInputChange}
                              />
                              Entidade:
                              <CustomTextField
                                name="tec_dois_entidade"
                                value={obj_anexo?.tec_dois_entidade}
                                onChange={onInputChange}
                              />
                            </Stack>
                          </TableCell>
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          type="date"
                          inputProps={{
                            style: {
                              fontSize: 12,
                              fontFamily: "verdana",
                            },
                          }}
                          name="data"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={obj_anexo?.data}
                          onChange={onInputChange}
                          helperText={flag_erro_data === true ? 'Campo obrigatório' : ''}
                          error={flag_erro_data}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Stack direction="row" justifyContent="center">
                          <ButtonCadernos
                            mostrarBotaoGravar
                            aoClicarGravar={() => handle_create_anexo()}
                          />
                          {obj_anexo_lista.length === 0 ? <></> :
                            <ButtonCadernos
                              mostrarBotaoCancelar
                              aoClicarCancelar={() => {
                                setShowNewRow(false)

                                set_obj_anexo(undefined)
                              }}

                            />}
                        </Stack>
                      </StyledTableCell>
                    </>
                  )}
                  {(rowsPerPage > 0
                    ? obj_anexo_lista.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    : obj_anexo_lista
                  ).map((row, key) => (

                    <TableRow key={key}>
                      {obj_anexo?.id_visita === row.id_visita ? (
                        <>
                          <StyledTableCell>
                            <CustomTextField
                              name="numero_visita"
                              value={obj_anexo?.numero_visita === null ? '' : obj_anexo?.numero_visita}
                              onChange={onInputChange}
                              error={flag_erro_numero_de_visitas}
                              helperText={
                                flag_erro_numero_de_visitas === true ? "Número inválido" : ""
                              }
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <CustomTextField
                              name="obs"
                              value={obj_anexo?.obs === undefined ? '' : obj_anexo?.obs}
                              onChange={onInputChange}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="column">
                              <TableCell>
                                <Stack direction="row" alignItems="center">
                                  Nome:
                                  <CustomTextField
                                    name="tec_um_nome"
                                    value={obj_anexo?.tec_um_nome === undefined ? '' : obj_anexo?.tec_um_nome}
                                    onChange={onInputChange}
                                  />
                                  Nome:
                                  <CustomTextField
                                    name="tec_dois_nome"
                                    value={obj_anexo?.tec_dois_nome === undefined ? '' : obj_anexo?.tec_dois_nome}
                                    onChange={onInputChange}
                                  />
                                </Stack>
                              </TableCell>
                              <TableCell>
                                Rubrica:_______________________
                                Rubrica:_______________________
                              </TableCell>
                              <TableCell>
                                <Stack direction="row" alignItems="center">
                                  Entidade:
                                  <CustomTextField
                                    name="tec_um_entidade"
                                    value={obj_anexo?.tec_um_entidade === undefined ? '' : obj_anexo?.tec_um_entidade}
                                    onChange={onInputChange}
                                  />
                                  Entidade:
                                  <CustomTextField
                                    name="tec_dois_entidade"
                                    value={obj_anexo?.tec_dois_entidade === undefined ? '' : obj_anexo?.tec_dois_entidade}
                                    onChange={onInputChange}
                                  />
                                </Stack>
                              </TableCell>
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell>
                            <TextField
                              variant="filled"
                              type="date"
                              inputProps={{
                                style: {
                                  fontSize: 12,
                                  fontFamily: "verdana",
                                },
                              }}
                              name="data"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={obj_anexo?.data === undefined ? '' : obj_anexo?.data}
                              onChange={onInputChange}
                              helperText={flag_erro_data === true ? 'Campo obrigatório' : ''}
                              error={flag_erro_data}
                            />
                          </StyledTableCell>
                        </>
                      ) : (
                        <>
                          <StyledTableCell>
                            {row?.numero_visita}
                          </StyledTableCell>
                          <StyledTableCell>
                            {row?.obs}
                          </StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row" spacing={2}>
                              <Stack direction="column" width={250}>
                                <TableCell>
                                  Nome:
                                  <Typography
                                    sx={{
                                      paddingLeft: 2,
                                      fontFamily: "candara",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {row?.tec_um_nome === undefined ? '' : row?.tec_um_nome}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  Rubrica:
                                  <Typography
                                    sx={{
                                      paddingLeft: 2,
                                      fontFamily: "candara",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {row?.tec_um_rubrica === undefined ? '' : row?.tec_um_rubrica}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  Entidade:
                                  <Typography
                                    sx={{
                                      paddingLeft: 2,
                                      fontFamily: "candara",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {row?.tec_um_entidade === undefined ? '' : row?.tec_um_entidade}
                                  </Typography>
                                </TableCell>
                              </Stack>
                              <Divider />
                              <Stack direction="column" width={250}>
                                <TableCell>
                                  Nome:
                                  <Typography
                                    sx={{
                                      paddingLeft: 2,
                                      fontFamily: "candara",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {row?.tec_dois_nome === undefined ? '' : row?.tec_dois_nome}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  Rubrica:
                                  <Typography
                                    sx={{
                                      paddingLeft: 2,
                                      fontFamily: "candara",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {row?.tec_dois_rubrica === undefined ? '' : row?.tec_dois_rubrica}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  Entidade:
                                  <Typography
                                    sx={{
                                      paddingLeft: 2,
                                      fontFamily: "candara",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {row?.tec_dois_entidade === undefined ? '' : row?.tec_dois_entidade}
                                  </Typography>
                                </TableCell>
                              </Stack>
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell>{row?.data === undefined ? '' : row?.data} </StyledTableCell>
                        </>
                      )}
                      {obj_anexo?.id_visita === row.id_visita ? (
                        <StyledTableCell>
                          <ButtonCadernos
                            mostrarBotaoGravar
                            aoClicarGravar={() => handle_update_anexo()}
                            mostrarBotaoCancelar
                            aoClicarCancelar={() => set_obj_anexo(undefined)}
                          />
                        </StyledTableCell>
                      ) : (
                        <StyledTableCell>
                          <ButtonCadernos
                            mostrarBotaoEditar
                            aoClicarEditar={() => handleEdit(row)}
                            mostrarBotaoApagar
                            aoClicarApagar={() =>
                              handleClickOpenDelete(row)
                            }
                          />
                        </StyledTableCell>
                      )}
                    </TableRow>


                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        20,
                        { label: "Todos", value: -1 },
                      ]}
                      colSpan={12}
                      count={obj_anexo_lista.length}
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
          </CustomThemeProvider>
        )}
      </main>
    </div>
  );
}
