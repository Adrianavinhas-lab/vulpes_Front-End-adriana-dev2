
import React, { useEffect, useState } from "react";
import { CustomTextField, CustomThemeProvider } from "../../../../Styles/theme/customThemeprovider";
import { Box, Snackbar, Paper, TableContainer, Stack, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { BarraDeFerramentas } from "../../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { StyledTableCell, StyledTableHead } from "../../../../Styles/tabelCellStyled/customTableCell";
import BasicPopover from "../../../../Components/Popover";
import { ButtonCadernos } from "../../../../Components/barra-de-ferramentas/ButtonCadernos";
import ConfirmDialog from "../../../../Components/CustomDialog/customdialog";
import { del, get, post } from "../../../../Services/tokenConfig";
import LoadingVulpes from "../../../../Styles/Loader/loading";
import { func_print } from "../../../../Func_genericas/func_print";
import { useLocation } from "react-router-dom";
import { IAcoes } from "../../../../Interfaces/anexos/anexo2/acoes";
import { Alert } from "../../../../Components/Alert/Alert";



export const AcoesForm = () => {

  const location = useLocation();


  const [obj_anexo, set_obj_anexo] = useState<IAcoes>();
  const [obj_anexo_lista, set_obj_anexo_lista] = useState<IAcoes[]>([]);
  const [flag_criar_novo_anexo, set_flag_criar_novo_anexo] = React.useState(false);
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);

  const [createTable, setCreateTable] = useState(false);
  const [message, setMessage] = useState("");
  const [editRow, setEditRow] = useState(false);
  const [open_dialog_tem_a_certeza_que_quer_eliminar, set_open_dialog_tem_a_certeza_que_quer_eliminar] = useState(false);

  const [isLoading, setIsLoading] = useState(false);


  const onInputEdit = (event: any) => {
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


  const get_info = async () => {
    try {
      let res = await get(
        `/get_reg_anexo_dois_operacoes_acoes_prevencao_rosto/${location.state.id_rosto}`
      );
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
      await get_info();
    })();
  }, []);

  const handle_create_anexo = async () => {
    try {
      setIsLoading(true);
      let res = await post("new_reg_anexo_dois_operacoes_acoes_prevencao", {
        payload: {
          id_prevensao: 0,
          zona_homo: obj_anexo?.zona_homo === undefined ? '' : obj_anexo?.zona_homo,
          especies: obj_anexo?.especies === undefined ? '' : obj_anexo?.especies,
          acoes: obj_anexo?.acoes === undefined ? '' : obj_anexo?.acoes,
          epoca: obj_anexo?.epoca === undefined ? '' : obj_anexo?.epoca,
          periocidade: obj_anexo?.periocidade === undefined ? '' : obj_anexo?.periocidade,
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

      let res = await post("update_reg_anexo_operacoes_acoes_prevencao", { payload: obj_anexo });

      if (res.status === 200) {
        let lista_aux: any = obj_anexo_lista.map((el) => {
          if (el.id_prevensao !== obj_anexo?.id_prevensao) {
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
        `delete__reg_anexo_dois_operacoes_acoes_prevencao/${obj_anexo?.id_prevensao}`
      );
      if (res.status === 200) {
        let lista_aux: any = obj_anexo_lista.filter((el) => {
          if (el.id_prevensao !== obj_anexo?.id_prevensao) {
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
  const handleCloseSnack = () => {

    setOpenSnackSuccess(false);
    setOpenSnackError(false);
  };
  const handleClickOpenDelete = (obj: IAcoes) => {
    set_obj_anexo(obj);
    set_open_dialog_tem_a_certeza_que_quer_eliminar(true)
  };
  const handleEdit = (obj: IAcoes) => {
    set_obj_anexo(obj)
    set_flag_criar_novo_anexo(true)
    setCreateTable(false)

  };
  const handle_change_coisas_a_editar = () => {
    set_obj_anexo(undefined)
    setCreateTable(!createTable)
    set_flag_criar_novo_anexo(!flag_criar_novo_anexo)
  }


  return (
    <CustomThemeProvider>
      {isLoading ? (
        <LoadingVulpes />
      ) : (
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
                  colSpan={4}
                  sx={{
                    fontWeight: 600,
                    fontFamily: "candara",
                    fontSize: 16,
                  }}
                >
                  5.3 - Ações de preservação do coberto arbóreo
                  <BasicPopover
                    text={
                      "Quadro a preencher apenas quando na zona homogénea existir coberto arbóreo. Por cada zona homogénea identificar as espécies arbóreas presentes, as ações de preservação adequadas a cada uma das espécies, bem como o período em que as mesmas devem ser efetuadas e sua períocidade."
                    }
                  />
                </TableCell>
                <TableCell colSpan={2}>
                  <Stack direction="row" sx={{ justifyContent: "end" }}>
                    <BarraDeFerramentas
                      mostrarBotaoNovo
                      textoBotaoNovo="Novo Registo"
                      aoClicarNovo={() => handle_change_coisas_a_editar()}
                    />
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead sx={{ minWidth: 110 }}>
                  <Stack direction="row" justifyContent="center">
                    Zona homogénea
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Preencher com a zona homogénea onde exista espécies arbóreas que exijam ações de preservação periódicas recomendáveis para o seu bom estado vegetativo."
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableHead>
                <StyledTableHead sx={{ minWidth: 110 }}>
                  <Stack direction="row" justifyContent="center">
                    Espécies arbóreas
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Preencher com a identificação (nome vulgar ou denominação cientifica) das espécies arbóreas existentes na zona homogénea.\n\nQuando na mesma zona homogénea existir mais do que uma espécie arbórea que carece de ações de preservação, os seus nomes devem ser separados por (;)."
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableHead>
                <StyledTableHead sx={{ minWidth: 70 }}>
                  <Stack direction="row" justifyContent="center">
                    Ações de preservação aconselhadas
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Campo descritivo, que deve listar as ações de preservação aconselhadas por cada uma das espécies existentes na zona homogénea."
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableHead>
                <StyledTableHead sx={{ minWidth: 80 }}>
                  <Stack direction="row" justifyContent="center">
                    Época do ano
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Campo descritivo onde se deve registar a época do ano aconselhada para a realização das ações de preservação aconselhadas."
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableHead>
                <StyledTableHead sx={{ minWidth: 80 }}>
                  <Stack direction="row" justifyContent="center">
                    Periocidade
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Indicar a períocidade com que as ações de preservação devem ser executadas, ex. anual, bienal, trianual, etc..."
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableHead>
                <StyledTableHead width={150}>Ações</StyledTableHead>
              </TableRow>
            </TableHead>

            <TableBody>
              {createTable && (
                <TableRow>
                  <StyledTableCell>
                    <CustomTextField
                      name="zona_homo"
                      value={obj_anexo?.zona_homo === undefined ? '' : obj_anexo?.zona_homo}
                      onChange={onInputEdit}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="especies"
                      value={obj_anexo?.especies === undefined ? '' : obj_anexo?.especies}

                      onChange={onInputEdit}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="acoes"
                      value={obj_anexo?.acoes === undefined ? '' : obj_anexo?.acoes}

                      onChange={onInputEdit}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="epoca"
                      value={obj_anexo?.epoca === undefined ? '' : obj_anexo?.epoca}

                      onChange={onInputEdit}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="periocidade"
                      value={obj_anexo?.periocidade === undefined ? '' : obj_anexo?.periocidade}

                      onChange={onInputEdit}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Stack direction="row" justifyContent="center">
                      <ButtonCadernos
                        mostrarBotaoCancelar
                        aoClicarCancelar={() => setCreateTable(false)}
                        mostrarBotaoGravar
                        aoClicarGravar={() => handle_create_anexo()}
                      />
                    </Stack>
                  </StyledTableCell>
                </TableRow>
              )}

              {

                obj_anexo_lista.length === 0 ? <></>
                  :

                  obj_anexo_lista.map((row, key) => {
                    if (row.id_prevensao === obj_anexo?.id_prevensao) {
                      return (
                        <TableRow key={key}>
                          <StyledTableCell>
                            <CustomTextField
                              name="zona_homo"
                              value={obj_anexo?.zona_homo === undefined ? '' : obj_anexo?.zona_homo}
                              onChange={onInputEdit}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <CustomTextField
                              name="especies"
                              value={obj_anexo?.especies === undefined ? '' : obj_anexo?.especies}

                              onChange={onInputEdit}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <CustomTextField
                              name="acoes"
                              value={obj_anexo?.acoes === undefined ? '' : obj_anexo?.acoes}

                              onChange={onInputEdit}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <CustomTextField
                              name="epoca"
                              value={obj_anexo?.epoca === undefined ? '' : obj_anexo?.epoca}

                              onChange={onInputEdit}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <CustomTextField
                              name="periocidade"
                              value={obj_anexo?.periocidade === undefined ? '' : obj_anexo?.periocidade}

                              onChange={onInputEdit}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row" justifyContent="center">
                              <ButtonCadernos
                                mostrarBotaoCancelar
                                aoClicarCancelar={() => {
                                  set_flag_criar_novo_anexo(false)
                                  set_obj_anexo(undefined)

                                }}
                                mostrarBotaoGravar
                                aoClicarGravar={() => handle_update_anexo()}
                              />
                            </Stack>
                          </StyledTableCell>
                        </TableRow>
                      )
                    } else {
                      return (
                        <TableRow key={key}>
                          <StyledTableCell>{row.zona_homo}</StyledTableCell>
                          <StyledTableCell>{row.especies}</StyledTableCell>
                          <StyledTableCell>{row.acoes}</StyledTableCell>
                          <StyledTableCell>{row.epoca}</StyledTableCell>
                          <StyledTableCell>{row.periocidade}</StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row" justifyContent="center">
                              <ButtonCadernos
                                mostrarBotaoEditar
                                aoClicarEditar={() =>
                                  handleEdit(row)
                                }
                                mostrarBotaoApagar
                                aoClicarApagar={() =>
                                  handleClickOpenDelete(row)
                                }
                              />
                            </Stack>
                          </StyledTableCell>
                        </TableRow>

                      )

                    }



                  })



              }
            </TableBody>
          </table>
          <ConfirmDialog
            open={open_dialog_tem_a_certeza_que_quer_eliminar}
            onClose={() => set_open_dialog_tem_a_certeza_que_quer_eliminar(false)}
            onConfirm={handle_delete_anexo}
            message="Deseja eliminar o registo?"
          />
        </TableContainer>
      )}
    </CustomThemeProvider>
  );
};
