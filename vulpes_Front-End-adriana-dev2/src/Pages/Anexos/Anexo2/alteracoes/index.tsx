import React from "react";
import { useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Snackbar } from "@mui/material";
import { Paper, Stack } from "@mui/material";
import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { del, get, post } from "../../../../Services/tokenConfig";
import LoadingVulpes from "../../../../Styles/Loader/loading";
import {StyledTableHead} from "../../../../Styles/tabelCellStyled/customTableCell";
import { CustomTextField } from "../../../../Styles/theme/customThemeprovider";
import { func_print } from "../../../../Func_genericas/func_print";
import { useLocation } from "react-router-dom";
import BasicPopover from "../../../../Components/Popover";
import { BarraDeFerramentas } from "../../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import ConfirmDialog from "../../../../Components/CustomDialog/customdialog";
import { IAlteracoesUm, IAlteracoesUmCab } from "../../../../Interfaces/anexos/anexo2/alteracoes";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

export const AlteracoesAEfetuarAreaForm = () => {
  const location = useLocation();


  const [obj_anexo_cabecalho, set_obj_anexo_cabecalho] = useState<IAlteracoesUmCab>();
  const [obj_anexo, set_obj_anexo] = useState<IAlteracoesUm>();
  const [open_dialog_tem_a_certeza_que_quer_eliminar, set_open_dialog_tem_a_certeza_que_quer_eliminar] = useState(false);
  const [obj_anexo_lista_cabecalho, set_obj_anexo_lista_cabecalho] = useState<IAlteracoesUmCab[]>([]);
  const [obj_anexo_lista, set_obj_anexo_lista] = useState<IAlteracoesUm[]>([]);
  const [flag_criar_novo_anexo, set_flag_criar_novo_anexo] = React.useState(false);
  const [flag_criar_novo_cabecalho, set_flag_criar_novo_cabecalho] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error_area, set_error_area] = useState(false);
  const [message, setMessage] = useState("");
  const [flag_editar_info, set_flag_editar_info] = useState(true)
  const [flag_editar_cabecalho, set_flag_editar_cabecalho] = useState(false)
  const [id_do_cabecalho_onde_vai_ser_adicionada_info, set_id_do_cabecalho_onde_vai_ser_adicionada_info] = useState<number>()

  const onInputEditTableChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    let aux_obj_anexo: any = obj_anexo === undefined ? {} : obj_anexo

    if (type === "checkbox") {
      aux_obj_anexo[name] = aux_obj_anexo[name] === undefined ? true : !aux_obj_anexo[name]
      set_obj_anexo(aux_obj_anexo);

    } else {
      if (name === 'area') {

        if (!/^\d+$/.test(value)) {
          set_error_area(true)

        } else {
          set_error_area(false)

        }

      }

      set_obj_anexo((old: any) => ({
        ...old,
        [name]: value,
      }));
    }
  };

  const onInputEditTableChange_cabecalho = (event: any) => {
    const { name, value, type, checked } = event.target;
    let aux_obj_anexo: any = obj_anexo === undefined ? {} : obj_anexo

    if (type === "checkbox") {
      aux_obj_anexo[name] = aux_obj_anexo[name] === undefined ? true : !aux_obj_anexo[name]
      set_obj_anexo_cabecalho(aux_obj_anexo);

    } else {

      set_obj_anexo_cabecalho((old: any) => ({
        ...old,
        [name]: value,
      }));
    }
  };
  const handle_delete_anexo = async () => {
    try {
      setIsLoading(true);

      let res = await del(
        `delete__reg_anexo_dois_maneio_um/${obj_anexo?.id_alteracoes_cabecalho}`
      );
      if (res.status === 200) {
        let lista_aux: any = obj_anexo_lista.filter((el) => {
          if (el.id_alteracoes_cabecalho !== obj_anexo?.id_alteracoes_cabecalho) {
            return el
          }
        })
        set_obj_anexo_lista(lista_aux === undefined ? [] : lista_aux)
        setMessage("Registo eliminado com sucesso!");
        set_obj_anexo(undefined)
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
  const handle_delete_anexo_cabecalho = async () => {
    try {
      setIsLoading(true);

      let res = await del(
        `delete__reg_anexo_dois_maneio_um/${obj_anexo_cabecalho?.id_alteracoes_cabecalho}`
      );
      if (res.status === 200) {
        let lista_aux: any = obj_anexo_lista_cabecalho.filter((el) => {
          if (el.id_alteracoes_cabecalho !== obj_anexo_cabecalho?.id_alteracoes_cabecalho) {
            return el
          }
        })
        set_obj_anexo_lista_cabecalho(lista_aux === undefined ? [] : lista_aux)
        setMessage("Registo eliminado com sucesso!");
        set_obj_anexo_cabecalho(undefined)

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

  const handle_create_anexo = async () => {
    try {
      setIsLoading(true);

      let res = await post("new_reg_anexo_dois_maneio_dois", {
        payload: {
          id_alteracoes: 0,
          camp_um: obj_anexo?.camp_um === undefined ? '' : obj_anexo?.camp_um,
          camp_dois: obj_anexo?.camp_dois === undefined ? 0 : obj_anexo?.camp_dois,
          camp_tres: obj_anexo?.camp_tres === undefined ? '' : obj_anexo?.camp_tres,
          camp_quatro: obj_anexo?.camp_quatro === undefined ? '' : obj_anexo?.camp_quatro,
          camps_um: obj_anexo?.camps_um === undefined ? '' : obj_anexo?.camps_um,
          camps_dois: obj_anexo?.camps_dois === undefined ? '' : obj_anexo?.camps_dois,
          camps_tres: obj_anexo?.camps_tres === undefined ? '' : obj_anexo?.camps_tres,
          camps_quatro: obj_anexo?.camps_quatro === undefined ? '' : obj_anexo?.camps_quatro,
          fundamentacao: obj_anexo?.fundamentacao === undefined ? '' : obj_anexo?.fundamentacao,
          id_maneiro_cabecalho: id_do_cabecalho_onde_vai_ser_adicionada_info,
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


        set_flag_criar_novo_anexo(false);
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
  const handle_create_anexo_cabecalho = async () => {
    try {
      setIsLoading(true);

      let res = await post("new_reg_anexo_dois_maneio_um", {
        payload: {
          id_alteracoes_cabecalho: 0,
          ano: obj_anexo_cabecalho?.ano === undefined ? '' : obj_anexo_cabecalho?.ano,
          mes_um: obj_anexo_cabecalho?.mes_um === undefined ? '' : obj_anexo_cabecalho?.mes_um,
          mes_dois: obj_anexo_cabecalho?.mes_dois === undefined ? '' : obj_anexo_cabecalho?.mes_dois,
          mes_tres: obj_anexo_cabecalho?.mes_tres === undefined ? '' : obj_anexo_cabecalho?.mes_tres,
          mes_quatro: obj_anexo_cabecalho?.mes_quatro === undefined ? '' : obj_anexo_cabecalho?.mes_quatro,
          id_rosto: location.state.id_rosto,
          last_update: new Date().toISOString(),
          create_date: new Date().toISOString(),
          uuid: ''
        }
      });

      if (res.status === 200) {
        set_obj_anexo_lista_cabecalho((old) => [...old, res.data.result])
        set_obj_anexo_cabecalho(undefined);
        set_flag_criar_novo_cabecalho(false)

        setMessage("Gravado com sucesso!");
        setOpenSnackSuccess(true);


        set_flag_criar_novo_anexo(false);
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
          if (el.id_alteracoes !== obj_anexo?.id_alteracoes) {
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
  const handle_update_anexo_cabecalho = async () => {
    try {
      setIsLoading(true);
      func_print('obj_anexo_cabecalho', obj_anexo_cabecalho)

      let res = await post("update_reg_anexo_dois_maneio_um", { payload: obj_anexo_cabecalho });

      if (res.status === 200) {
        let lista_aux: any = obj_anexo_lista_cabecalho.map((el) => {
          if (el.id_alteracoes_cabecalho !== obj_anexo_cabecalho?.id_alteracoes_cabecalho) {
            return el
          } else {
            return res.data.result
          }
        })
        set_obj_anexo_lista_cabecalho(lista_aux === undefined ? [] : lista_aux)
        set_obj_anexo_cabecalho(undefined);
        set_flag_criar_novo_cabecalho(false)

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
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const handleCloseSnack = () => {
    setOpenSnackSuccess(false);
    setOpenSnackError(false);
  };
  const handle_escolhe_qual_elimina = async () => {

    if (obj_anexo !== undefined) {

      await handle_delete_anexo()
    } else if (obj_anexo_cabecalho !== undefined) {

      await handle_delete_anexo_cabecalho()
    }
  }


  const get_info = async () => {
    try {
      let res_cabecalho = await get(
        `/get_reg_anexo_dois_alteracoes_cabecalho_rosto/${location.state.id_rosto}`
      );
      let res_anexo = await get(
        `/get_reg_anexo_dois_alteracoes_um_cabecalho/${location.state.id_rosto}`
      );

      if (res_cabecalho.status === 200) {
        if (res_cabecalho.data.result.length !== 0) {
          set_obj_anexo_lista_cabecalho(res_cabecalho.data.result);
        }
      } else {
        setMessage("Erro a carregar informação!");
        setOpenSnackError(true);
      }
      if (res_anexo.status === 200) {
        if (res_anexo.data.result.length !== 0) {
          set_obj_anexo_lista(res_anexo.data.result);
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

  const handle_change_coisas_a_editar = () => {
    set_flag_editar_cabecalho(!flag_editar_cabecalho)
    set_flag_editar_info(!flag_editar_info)
  }

  const handle_close_adicionar_anexo_cabecalho = () => {
    set_obj_anexo_cabecalho(undefined)
    set_flag_criar_novo_cabecalho(false)
  }
  const handle_close_adicionar_anexo = () => {
    set_obj_anexo(undefined)
    set_flag_criar_novo_anexo(false)
  }

  useEffect(() => {
    (async () => {
      await get_info();
    })();
  }, []);


  return (
    <>
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
                  sx={{ fontWeight: 600, fontSize: 16, fontFamily: "candara" }}
                >
                  <Stack direction="row" justifyContent="left">
                    6 - Alterações a efetuar no maneio do efetivo pecuário em
                    pastoreio
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Preencher os campos infra em complemento da informação disponibilizada no quadro 2, quando aplicável.\n\nNo caso do regime ecológico «maneio da pastagem permanente», no preenchimento dos campos deve ser considerado o período de 3 anos.\n\nNo caso da intervenção agroambiental «conservação do solo - pastagens biodiversas, no preenchimento dos campos deve ser considerado o período de 5 anos."
                        }
                      />
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell colSpan={3}>
                  <Stack direction="row" sx={{ justifyContent: "end" }}>
                    <BarraDeFerramentas
                      mostrarBotaoNovo
                      textoBotaoNovo="Adicionar cabeçalho"
                      aoClicarNovo={() => set_flag_criar_novo_cabecalho(true)}
                    />
                  </Stack>
                </TableCell>
              </TableRow>
            </TableHead>

            {flag_criar_novo_cabecalho && (
              <>
                <TableRow>
                  <TableCell rowSpan={2} sx={{ width: 300 }}></TableCell>

                  <StyledTableHead colSpan={4}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography
                        sx={{ paddingRight: 2, fontFamily: "candara" }}
                      >
                        Ano:
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          views={["year"]}
                          label={
                            <Typography fontFamily="candara" fontSize={14}>
                              Selecionar ano
                            </Typography>
                          }
                          value={obj_anexo_cabecalho?.ano === undefined ? '' : obj_anexo_cabecalho?.ano}
                          onChange={(newValue) => {
                            onInputEditTableChange_cabecalho({
                              target: {
                                name: "ano",
                                value: newValue ? newValue.format("YYYY") : "",
                              },
                            });
                          }}
                          minDate={dayjs("2010")}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Stack>
                  </StyledTableHead>
                  <StyledTableHead rowSpan={2}>
                    Ações
                  </StyledTableHead>
                </TableRow>
                <TableRow>
                  <StyledTableHead>
                    <CustomTextField
                      name="mes_um"
                      value={obj_anexo_cabecalho?.mes_um === undefined ? '' : obj_anexo_cabecalho?.mes_um}
                      onChange={onInputEditTableChange_cabecalho}
                    />
                  </StyledTableHead>
                  <StyledTableHead>
                    <CustomTextField
                      name="mes_dois"
                      value={obj_anexo_cabecalho?.mes_dois === undefined ? '' : obj_anexo_cabecalho?.mes_dois}
                      onChange={onInputEditTableChange_cabecalho}
                    />
                  </StyledTableHead>
                  <StyledTableHead>
                    <CustomTextField
                      name="mes_tres"
                      value={obj_anexo_cabecalho?.mes_tres === undefined ? '' : obj_anexo_cabecalho?.mes_tres}
                      onChange={onInputEditTableChange_cabecalho}
                    />
                  </StyledTableHead>
                  <StyledTableHead>
                    <CustomTextField
                      name="mes_quatro"
                      value={obj_anexo_cabecalho?.mes_quatro === undefined ? '' : obj_anexo_cabecalho?.mes_quatro}
                      onChange={onInputEditTableChange_cabecalho}
                    />
                  </StyledTableHead>
                </TableRow>
              </>
            )}

            {obj_anexo_lista_cabecalho?.length === 0 ? <></> :
              obj_anexo_lista_cabecalho?.map((cab) => {
                if (obj_anexo_cabecalho?.id_alteracoes_cabecalho === cab.id_alteracoes_cabecalho) {
                  return (
                    <>
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          sx={{
                            fontWeight: 600,
                            fontFamily: "candara",
                            fontSize: 16,
                          }}
                        >

                        </TableCell>
                        <TableCell colSpan={2}>
                          <Stack direction="row" sx={{ justifyContent: "end" }}>
                            <BarraDeFerramentas
                              mostrarBotaoNovo
                              textoBotaoNovo="Adicionar informação"
                              aoClicarNovo={() => set_id_do_cabecalho_onde_vai_ser_adicionada_info(cab.id_alteracoes_cabecalho)}
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead colSpan={4}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Typography
                              sx={{ paddingRight: 2, fontFamily: "candara" }}
                            >
                              Ano:
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                views={["year"]}
                                label={
                                  <Typography fontFamily="candara" fontSize={14}>
                                    Selecionar ano
                                  </Typography>
                                }
                                value={obj_anexo_cabecalho?.ano === undefined ? '' : obj_anexo_cabecalho?.ano}
                                onChange={(newValue) => {
                                  onInputEditTableChange_cabecalho({
                                    target: {
                                      name: "ano",
                                      value: newValue
                                        ? newValue.format("YYYY")
                                        : "",
                                    },
                                  });
                                }}
                                minDate={dayjs("2010")}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          </Stack>
                        </StyledTableHead>
                        <StyledTableHead>
                          <BarraDeFerramentas
                            mostrarBotaoNovo
                            textoBotaoNovo="Guardar cabeçalho"
                            aoClicarNovo={() => handle_update_anexo_cabecalho()}
                          />
                          <BarraDeFerramentas
                            mostrarBotaoNovo
                            textoBotaoNovo="Voltar"
                            aoClicarNovo={() => {
                              set_obj_anexo_cabecalho(undefined)
                            }}
                          />
                        </StyledTableHead>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead>
                          <CustomTextField
                            name="mes_um"
                            value={obj_anexo_cabecalho?.mes_um === undefined ? '' : obj_anexo_cabecalho?.mes_um}
                            onChange={onInputEditTableChange_cabecalho}
                          />
                        </StyledTableHead>
                        <StyledTableHead>
                          <CustomTextField
                            name="mes_dois"
                            value={obj_anexo_cabecalho?.mes_dois === undefined ? '' : obj_anexo_cabecalho?.mes_dois}
                            onChange={onInputEditTableChange_cabecalho}
                          />
                        </StyledTableHead>
                        <StyledTableHead>
                          <CustomTextField
                            name="mes_tres"
                            value={obj_anexo_cabecalho?.mes_tres === undefined ? '' : obj_anexo_cabecalho?.mes_tres}
                            onChange={onInputEditTableChange_cabecalho}
                          />
                        </StyledTableHead>
                        <StyledTableHead>
                          <CustomTextField
                            name="mes_quatro"
                            value={obj_anexo_cabecalho?.mes_quatro === undefined ? '' : obj_anexo_cabecalho?.mes_quatro}
                            onChange={onInputEditTableChange_cabecalho}
                          />
                        </StyledTableHead>
                      </TableRow>
                    </>
                  )
                } else {
                  return (
                    <>
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          sx={{
                            fontWeight: 600,
                            fontFamily: "candara",
                            fontSize: 16,
                          }}
                        >
                        </TableCell>
                        <TableCell colSpan={2}>
                          <Stack direction="row" sx={{ justifyContent: "end" }}>
                            <BarraDeFerramentas
                              mostrarBotaoNovo
                              textoBotaoNovo="Adicionar informação"
                              aoClicarNovo={() => set_id_do_cabecalho_onde_vai_ser_adicionada_info(cab.id_alteracoes_cabecalho)}
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead colSpan={4}>
                          Ano: {cab.ano}
                        </StyledTableHead>
                        <StyledTableHead rowSpan={2}>
                          <BarraDeFerramentas
                            mostrarBotaoNovo
                            textoBotaoNovo="Editar cabeçalho"
                            aoClicarNovo={() => set_obj_anexo_cabecalho(cab)}
                          />
                          <BarraDeFerramentas
                            mostrarBotaoNovo
                            textoBotaoNovo="Eliminar cabaçalho"
                            aoClicarNovo={() => {
                              set_obj_anexo_cabecalho(cab)
                              set_open_dialog_tem_a_certeza_que_quer_eliminar(true)
                            }}
                          />
                        </StyledTableHead>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead>
                          {cab.mes_um}
                          <BasicPopover
                            text={
                              "Campo editável nos casos em que a rotação do efetivo apresenta outro período temporal (ex. mensal, bimensal, etc…)."
                            }
                          />
                        </StyledTableHead>
                        <StyledTableHead>
                          {cab.mes_dois}
                          <BasicPopover
                            text={
                              "Campo editável nos casos em que a rotação do efetivo apresenta outro período temporal (ex. mensal, bimensal, etc…)."
                            }
                          />
                        </StyledTableHead>
                        <StyledTableHead>
                          {cab.mes_tres}
                          <BasicPopover
                            text={
                              "Campo editável nos casos em que a rotação do efetivo apresenta outro período temporal (ex. mensal, bimensal, etc…)."
                            }
                          />
                        </StyledTableHead>
                        <StyledTableHead>
                          {cab.mes_quatro}
                          <BasicPopover
                            text={
                              "Campo editável nos casos em que a rotação do efetivo apresenta outro período temporal (ex. mensal, bimensal, etc…)."
                            }
                          />
                        </StyledTableHead>
                      </TableRow>
                    </>
                  )
                }
              }
              )}
          </table>
          <ConfirmDialog
            open={open_dialog_tem_a_certeza_que_quer_eliminar}
            onClose={() => set_open_dialog_tem_a_certeza_que_quer_eliminar(false)}
            onConfirm={handle_escolhe_qual_elimina}
            message="Deseja eliminar o registo?"
          />
        </TableContainer >
      )}
    </>
  );
};
