import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Snackbar, Stack } from "@mui/material";
import { TablePagination } from "@mui/material";
import { Paper } from "@mui/material";
import { Box } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import { TableBody, TableFooter, TableHead } from "@mui/material";
import { TableContainer } from "@mui/material";
import CadernoLayout from "../../../Styles/layout/cadernoLayout";
import { del, get, post } from "../../../Services/tokenConfig";
import TablePaginationActions from "../../../Components/Pagination/pagination";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import LoadingVulpes from "../../../Styles/Loader/loading";
import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
import { StyledTableCell, StyledTableHead } from "../../../Styles/tabelCellStyled/customTableCell";
import { IAnexo3 } from "../../../Interfaces/anexos/anexo3";
import { CustomTextField, CustomThemeProvider } from "../../../Styles/theme/customThemeprovider";
import { func_print } from "../../../Func_genericas/func_print";
import { useLocation } from "react-router-dom";
import BasicPopover from "../../../Components/Popover";
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



export default function RegVendas() {
  const classes = useStyles();

  const location = useLocation();

  const [createTable, setCreateTable] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const [obj_anexo, set_obj_anexo] = useState<IAnexo3>();
  const [open_dialog_tem_a_certeza_que_quer_eliminar, set_open_dialog_tem_a_certeza_que_quer_eliminar] = useState(false);
  const [obj_anexo_lista, set_obj_anexo_lista] = useState<IAnexo3[]>([]);
  const [flag_criar_novo_anexo, set_flag_criar_novo_anexo] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /********** EDITAR LINHA *************/
  const handleEdit = (obj: IAnexo3) => {
    setCreateTable(false)
    set_obj_anexo(obj)
    set_flag_criar_novo_anexo(true)
  };

  const get_info = async () => {
    try {
      let res = await get(
        `/get_reg_anexo_tres_rosto/${location.state.id_rosto}`
      );
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
      await get_info();
    })();
  }, []);

  // Criar Tabela
  const onInputChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    let aux_obj_anexo: any = obj_anexo === undefined ? {} : obj_anexo

    if (type === "checkbox") {
      aux_obj_anexo[name] = aux_obj_anexo[name] === undefined ? true : !aux_obj_anexo[name]
      set_obj_anexo(aux_obj_anexo);

    } else {

      set_obj_anexo((old: any) => ({
        ...old,
        [name]: value,
      }));
    }


  };
  const handle_create_anexo = async () => {
    try {
      setIsLoading(true);

      let res = await post("new_reg_anexo_tres", {
        payload: {
          id_plano: obj_anexo?.id_plano === undefined ? 0 : obj_anexo?.id_plano,
          raca: obj_anexo?.raca === undefined ? '' : obj_anexo?.raca,
          grupo: obj_anexo?.grupo === undefined ? '' : obj_anexo?.grupo,
          classe: obj_anexo?.classe === undefined ? '' : obj_anexo?.classe,
          pastagem: obj_anexo?.pastagem === undefined ? '' : obj_anexo?.pastagem,
          espaco: obj_anexo?.espaco === undefined ? '' : obj_anexo?.espaco,
          superfice: obj_anexo?.superfice === undefined ? '' : obj_anexo?.superfice,
          forragem: obj_anexo?.forragem === undefined ? '' : obj_anexo?.forragem,
          alimentos: obj_anexo?.alimentos === undefined ? '' : obj_anexo?.alimentos,
          outras: obj_anexo?.outras === undefined ? '' : obj_anexo?.outras,
          id_rosto: location.state.id_rosto,
          last_update: new Date().toISOString(),
          create_date: new Date().toISOString(),
          uuid: ''
        }
      });

      if (res.status === 200) {
        set_obj_anexo_lista((old) => [...old, res.data.result])
        set_obj_anexo(undefined);

        setMessage("Gravado com sucesso!");
        setOpenSnackSuccess(true);


        setCreateTable(false);
      } else {
        setMessage("Erro ao gravar!");
        setOpenSnackError(true);

      }

      setIsLoading(false);
    } catch (error) {
      func_print("handle_create_anexo", error, true);
      setIsLoading(false);
      setMessage("Erro ao gravar!");
      setOpenSnackError(true);

    }
  };


  const handle_update_anexo = async () => {
    try {
      setIsLoading(true);

      let res = await post("update_reg_anexo_tres", { payload: obj_anexo });

      if (res.status === 200) {
        let lista_aux: any = obj_anexo_lista.map((el) => {
          if (el.id_plano !== obj_anexo?.id_plano) {
            return el
          } else {
            return res.data.result
          }
        })
        set_obj_anexo_lista(lista_aux === undefined ? [] : lista_aux)
        set_obj_anexo(undefined);
        set_flag_criar_novo_anexo(false)

        setMessage("Gravado com sucesso!");
        setOpenSnackSuccess(true);
      } else {
        setMessage("Erro ao gravar!");

        setOpenSnackError(true);
      }

      setIsLoading(false);
    } catch (error) {
      func_print("handle_update_anexo", error, true);
      setMessage("Erro ao gravar!");

      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  const handle_delete_anexo = async () => {
    try {
      setIsLoading(true);

      let res = await del(
        `delete__reg_anexo_tres/${obj_anexo?.id_plano}`
      );
      if (res.status === 200) {
        let lista_aux: any = obj_anexo_lista.filter((el) => {
          if (el.id_plano !== obj_anexo?.id_plano) {
            return el
          }
        })
        set_obj_anexo_lista(lista_aux === undefined ? [] : lista_aux)
        setMessage("Registo eliminado com sucesso!");

        set_open_dialog_tem_a_certeza_que_quer_eliminar(false);
        setOpenSnackSuccess(true);

        if (lista_aux === undefined || lista_aux.length === 0) {
          setCreateTable(true)
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

  /**************** PAGINAÇÃO *********************/
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // // Avoid a layout jump when reaching the last page with empty rows.
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

  /******  ALERTA **********************************/
  const handleCloseSnack = () => {

    setOpenSnackSuccess(false);
    setOpenSnackError(false);
  };

  const handleClickOpenDelete = (obj: IAnexo3) => {
    set_obj_anexo(obj);
    set_open_dialog_tem_a_certeza_que_quer_eliminar(true)
  };

  return (
    <div className={classes.root}>
      <CadernoLayout title="Anexo 3 - Plano Alimentar" />
      <main className={classes.contents}>
        <div className={classes.toolbars} />

        <Box width="80%" margin="auto">
          <Beneficiario_nome_id_alinhado_direita />
        </Box>

        {isLoading ? (
          <LoadingVulpes />
        ) : (
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
                  Erro ao editar caderno!
                </Alert>
              </Snackbar>

              <table style={{ width: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      sx={{
                        fontWeight: 700,
                        fontSize: 18,
                        fontFamily: "candara",
                      }}
                    >
                      Anexo 3 - Plano Alimentar
                      <BasicPopover
                        text={"Preencher apenas para AB ou PRODI"}
                      />
                    </TableCell>
                    <TableCell colSpan={10}>
                      <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <BarraDeFerramentas
                          mostrarBotaoNovo
                          textoBotaoNovo="Novo Registo"
                          aoClicarNovo={() => {
                            set_obj_anexo(undefined)
                            set_flag_criar_novo_anexo(false)
                            setCreateTable(true)
                          }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead rowSpan={3}>Espécie/Raça</StyledTableHead>
                    <StyledTableHead rowSpan={3}>
                      Grupo Homogéneo
                    </StyledTableHead>
                    <StyledTableHead rowSpan={3}>Classe Etária</StyledTableHead>
                    <StyledTableHead colSpan={6}>
                      Plano Alimentar
                    </StyledTableHead>

                    <StyledTableHead rowSpan={3}>Ações</StyledTableHead>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead colSpan={3}>
                      Parcelas pastoreadas(ha)
                    </StyledTableHead>
                    <StyledTableHead colSpan={3}>
                      Tipo de alimento e quantidade
                    </StyledTableHead>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>Pastagem permanente</StyledTableHead>
                    <StyledTableHead>
                      Espaço florestal não arborizado com aproveito forrageiro
                    </StyledTableHead>
                    <StyledTableHead>
                      Superfície forrageira temporária
                    </StyledTableHead>
                    <StyledTableHead>Forragem</StyledTableHead>
                    <StyledTableHead>Alimentos compostos</StyledTableHead>
                    <StyledTableHead>Outras matérias-primas</StyledTableHead>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {createTable && (
                    <TableRow>
                      <StyledTableCell>
                        <CustomTextField
                          variant="filled"
                          name="raca"
                          value={obj_anexo?.raca === undefined ? '' : obj_anexo?.raca}
                          onChange={onInputChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          variant="filled"
                          name="grupo"
                          value={obj_anexo?.grupo === undefined ? '' : obj_anexo?.grupo}
                          onChange={onInputChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          variant="filled"
                          name="classe"
                          value={obj_anexo?.classe === undefined ? '' : obj_anexo?.classe}
                          onChange={onInputChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          variant="filled"
                          name="pastagem"
                          value={obj_anexo?.pastagem === undefined ? '' : obj_anexo?.pastagem === undefined}
                          onChange={onInputChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          variant="filled"
                          name="espaco"
                          value={obj_anexo?.espaco === undefined ? '' : obj_anexo?.espaco}
                          onChange={onInputChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          variant="filled"
                          name="superfice"
                          value={obj_anexo?.superfice === undefined ? '' : obj_anexo?.superfice}
                          onChange={onInputChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          variant="filled"
                          name="forragem"
                          value={obj_anexo?.forragem === undefined ? '' : obj_anexo?.forragem}
                          onChange={onInputChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          variant="filled"
                          name="alimentos"
                          value={obj_anexo?.alimentos === undefined ? '' : obj_anexo?.alimentos}
                          onChange={onInputChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          variant="filled"
                          name="outras"
                          value={obj_anexo?.outras === undefined ? '' : obj_anexo?.outras}
                          onChange={onInputChange}
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
                                setCreateTable(false)
                                set_obj_anexo(undefined)
                              }}
                            />
                          }
                        </Stack>
                      </StyledTableCell>
                    </TableRow>

                  )}
                  {(rowsPerPage > 0
                    ? obj_anexo_lista.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    : obj_anexo_lista
                  ).map((row, key) => {
                    return (
                      <TableRow key={key}>
                        {obj_anexo?.id_plano === row.id_plano && flag_criar_novo_anexo === true ?
                          <>
                            <StyledTableCell>
                              <CustomTextField
                                variant="filled"
                                name="raca"
                                value={obj_anexo?.raca === undefined ? '' : obj_anexo?.raca}
                                onChange={onInputChange}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                variant="filled"
                                name="grupo"
                                value={obj_anexo?.grupo === undefined ? '' : obj_anexo?.grupo}
                                onChange={onInputChange}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                variant="filled"
                                name="classe"
                                value={obj_anexo?.classe === undefined ? '' : obj_anexo?.classe}
                                onChange={onInputChange}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                variant="filled"
                                name="pastagem"
                                value={obj_anexo?.pastagem === undefined ? '' : obj_anexo?.pastagem}
                                onChange={onInputChange}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                variant="filled"
                                name="espaco"
                                value={obj_anexo?.espaco === undefined ? '' : obj_anexo?.espaco}
                                onChange={onInputChange}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                variant="filled"
                                name="superfice"
                                value={obj_anexo?.superfice === undefined ? '' : obj_anexo?.superfice}
                                onChange={onInputChange}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                variant="filled"
                                name="forragem"
                                value={obj_anexo?.forragem === undefined ? '' : obj_anexo?.forragem}
                                onChange={onInputChange}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                variant="filled"
                                name="alimentos"
                                value={obj_anexo?.alimentos === undefined ? '' : obj_anexo?.alimentos}
                                onChange={onInputChange}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                variant="filled"
                                name="outras"
                                value={obj_anexo?.outras === undefined ? '' : obj_anexo?.outras}
                                onChange={onInputChange}
                              />
                            </StyledTableCell>

                          </>
                          :
                          <>
                            <StyledTableCell>{row.raca}</StyledTableCell>
                            <StyledTableCell>{row.grupo} </StyledTableCell>
                            <StyledTableCell>{row.classe} </StyledTableCell>
                            <StyledTableCell>{row.pastagem}</StyledTableCell>
                            <StyledTableCell>{row.espaco}</StyledTableCell>
                            <StyledTableCell>{row.superfice}</StyledTableCell>
                            <StyledTableCell>{row.forragem}</StyledTableCell>
                            <StyledTableCell>{row.alimentos}</StyledTableCell>
                            <StyledTableCell>{row.outras}</StyledTableCell>

                          </>
                        }
                        {obj_anexo?.id_plano === row.id_plano ? (
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
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        10,
                        20,
                        50,
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
        <ConfirmDialog
          open={open_dialog_tem_a_certeza_que_quer_eliminar}
          onClose={() => set_open_dialog_tem_a_certeza_que_quer_eliminar(false)}
          onConfirm={handle_delete_anexo}
          message="Deseja eliminar o registo?"
        />
      </main>
    </div>
  );
}
