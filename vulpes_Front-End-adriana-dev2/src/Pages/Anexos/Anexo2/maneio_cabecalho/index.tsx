import React, { useEffect } from "react";
import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Snackbar } from "@mui/material";
import { Paper, Stack, TableBody } from "@mui/material";
import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ConfirmDialog from "../../../../Components/CustomDialog/customdialog";
import { StyledTableCell, StyledTableHead } from "../../../../Styles/tabelCellStyled/customTableCell";
import { CustomTextField, CustomThemeProvider } from "../../../../Styles/theme/customThemeprovider";
import { IManeio, IManeioA2_cabecalho } from "../../../../Interfaces/anexos/anexo2/maneio";
import { del, get, post } from "../../../../Services/tokenConfig";
import { func_print } from "../../../../Func_genericas/func_print";
import { useLocation } from "react-router-dom";
import BasicPopover from "../../../../Components/Popover";
import { BarraDeFerramentas } from "../../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { ButtonCadernos } from "../../../../Components/barra-de-ferramentas/ButtonCadernos";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Alert } from "../../../../Components/Alert/Alert";




export const ManeioCabecalhoForm = () => {
  const location = useLocation();

  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const [obj_anexo_cabecalho, set_obj_anexo_cabecalho] = useState<IManeioA2_cabecalho>();
  const [obj_anexo, set_obj_anexo] = useState<IManeio>();
  const [open_dialog_tem_a_certeza_que_quer_eliminar, set_open_dialog_tem_a_certeza_que_quer_eliminar] = useState(false);
  const [obj_anexo_lista_cabecalho, set_obj_anexo_lista_cabecalho] = useState<IManeioA2_cabecalho[]>([]);
  const [obj_anexo_lista, set_obj_anexo_lista] = useState<IManeio[]>([]);
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
    let aux_obj_anexo: any = obj_anexo_cabecalho === undefined ? {} : obj_anexo_cabecalho

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
        `delete__reg_anexo_dois_maneio_um/${obj_anexo?.id_maneiro_cabecalho}`
      );
      if (res.status === 200) {
        let lista_aux: any = obj_anexo_lista.filter((el) => {
          if (el.id_maneiro_cabecalho !== obj_anexo?.id_maneiro_cabecalho) {
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
        `delete__reg_anexo_dois_maneio_um/${obj_anexo_cabecalho?.id_maneiro_cabecalho}`
      );
      if (res.status === 200) {
        let lista_aux: any = obj_anexo_lista_cabecalho.filter((el) => {
          if (el.id_maneiro_cabecalho !== obj_anexo_cabecalho?.id_maneiro_cabecalho) {
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
          id_maneiro: 0,
          zona_homo: obj_anexo?.zona_homo === undefined ? '' : obj_anexo?.zona_homo,
          area: obj_anexo?.area === undefined ? 0 : obj_anexo?.area,
          mes_um: obj_anexo?.mes_um === undefined ? '' : obj_anexo?.mes_um,
          mes_dois: obj_anexo?.mes_dois === undefined ? '' : obj_anexo?.mes_dois,
          mes_tres: obj_anexo?.mes_tres === undefined ? '' : obj_anexo?.mes_tres,
          mes_quatro: obj_anexo?.mes_quatro === undefined ? '' : obj_anexo?.mes_quatro,
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

          id_maneiro_cabecalho: 0,
          data: obj_anexo_cabecalho?.data === undefined ? '' : obj_anexo_cabecalho?.data,
          camp_um: obj_anexo_cabecalho?.camp_um === undefined ? '' : obj_anexo_cabecalho?.camp_um,
          camp_dois: obj_anexo_cabecalho?.camp_dois === undefined ? '' : obj_anexo_cabecalho?.camp_dois,
          camp_tres: obj_anexo_cabecalho?.camp_tres === undefined ? '' : obj_anexo_cabecalho?.camp_tres,
          camp_quatro: obj_anexo_cabecalho?.camp_quatro === undefined ? '' : obj_anexo_cabecalho?.camp_quatro,
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
          if (el.id_maneiro !== obj_anexo?.id_maneiro) {
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
          if (el.id_maneiro_cabecalho !== obj_anexo_cabecalho?.id_maneiro_cabecalho) {
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
        `/get_reg_anexo_dois_getAll_maneio/${location.state.id_rosto}`
        // `/get_reg_anexo_dois_maneio_um_rosto/${location.state.id_rosto}`
      );

      let res_anexo = await post(
        `get_reg_anexo_dois_getAll`, {payload:location.state.id_rosto}
        // `/get_reg_anexo_dois_maneio_dois_cabecalho/${location.state.id_rosto}`
        // `/get_reg_anexo_dois_maneio_dois_cabecalho/${location.state.id_rosto}`
      );
      func_print('res_anexo', res_anexo)


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
            {message}

          </Alert>
        </Snackbar>
        <table style={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={5}
                sx={{
                  fontWeight: 600,
                  fontFamily: "candara",
                  fontSize: 16,
                }}
              >
                <Stack direction="row" justifyContent="left">
                  2 - Maneio do pastoreio
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={
                        "No caso do regime ecológico «maneio da pastagem permanente», a carga animal no pastoreio das parcelas candidatas deve ser proposta para 3 anos.\n\n No caso da intervenção agroambiental «conservação do solo - pastagens biodiversas, a carga animal no pastoreio das parcelas candidatas deve ser propostas para 5 anos."
                      }
                    />
                  </Box>
                </Stack>
              </TableCell>
              <TableCell colSpan={2}>
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
          {
            flag_criar_novo_cabecalho === true ?
              <TableBody>

                <TableRow>
                  <StyledTableHead rowSpan={3} width={150}>
                    <BasicPopover
                      text={
                        "Preencher com a zona homogénea indicada no quadro 1 anterior como tendo necessidade de intervenção no maneio do pastoreio."
                      }
                    />
                    Zona homogénea
                  </StyledTableHead>
                  <StyledTableHead rowSpan={3} width={150}>
                    <Stack direction="row" justifyContent="right">
                      <BasicPopover
                        text={
                          "Preencher com a área correspondente à zona homogénea (soma da área de todas as subparcelas que constituem a zona homogénea)."
                        }
                      />
                    </Stack>
                    Área (Ha)
                  </StyledTableHead>
                  <StyledTableHead colSpan={4} width={500}>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        views={["year"]}
                        label={
                          <Typography fontFamily="candara" fontSize={18}>
                            Ano
                          </Typography>
                        }
                        value={obj_anexo_cabecalho?.data === undefined ? '' : obj_anexo_cabecalho?.data}
                        onChange={(newValue) => {
                          onInputEditTableChange_cabecalho({
                            target: {
                              name: "data",
                              value: newValue ? newValue.format("YYYY") : "",
                            },
                          });
                        }}
                        minDate={dayjs("2010")}

                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </StyledTableHead>
                  <StyledTableHead rowSpan={1} width={150}>

                    Ações


                  </StyledTableHead>
                </TableRow>
                <TableRow>

                  <StyledTableCell>
                    <BasicPopover
                      text={
                        "Campo editável nos casos em que a rotação do efetivo apresenta outro período temporal (ex. mensal, bimensal, etc…)."
                      }
                    />
                    <CustomTextField
                      name="camp_um"
                      value={obj_anexo_cabecalho?.camp_um === undefined ? '' : obj_anexo_cabecalho?.camp_um}
                      onChange={onInputEditTableChange_cabecalho}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <BasicPopover
                      text={
                        "Campo editável nos casos em que a rotação do efetivo apresenta outro período temporal (ex. mensal, bimensal, etc…)."
                      }
                    />
                    <CustomTextField
                      name="camp_dois"
                      value={obj_anexo_cabecalho?.camp_dois === undefined ? '' : obj_anexo_cabecalho?.camp_dois}
                      onChange={onInputEditTableChange_cabecalho}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <BasicPopover
                      text={
                        "Campo editável nos casos em que a rotação do efetivo apresenta outro período temporal (ex. mensal, bimensal, etc…)."
                      }
                    />
                    <CustomTextField
                      name="camp_tres"
                      value={obj_anexo_cabecalho?.camp_tres === undefined ? '' : obj_anexo_cabecalho?.camp_tres}
                      onChange={onInputEditTableChange_cabecalho}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <BasicPopover
                      text={
                        "Campo editável nos casos em que a rotação do efetivo apresenta outro período temporal (ex. mensal, bimensal, etc…)."
                      }
                    />
                    <CustomTextField
                      name="camp_quatro"
                      value={obj_anexo_cabecalho?.camp_quatro === undefined ? '' : obj_anexo_cabecalho?.camp_quatro}
                      onChange={onInputEditTableChange_cabecalho}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <ButtonCadernos
                      mostrarBotaoGravar
                      aoClicarGravar={() => handle_create_anexo_cabecalho()}
                      mostrarBotaoCancelar
                      aoClicarCancelar={() => handle_close_adicionar_anexo_cabecalho()}
                    />

                  </StyledTableCell>
                </TableRow>
              </TableBody> :
              <></>
          }


          {
            obj_anexo_lista_cabecalho.length === 0 ?
              <></>
              :
              obj_anexo_lista_cabecalho.map((el, key) => {
                if (el.id_maneiro_cabecalho !== obj_anexo_cabecalho?.id_maneiro_cabecalho) {
                  return (
                    <TableBody key={key}>
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
                              aoClicarNovo={() => set_id_do_cabecalho_onde_vai_ser_adicionada_info(el.id_maneiro_cabecalho)}
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead rowSpan={2} width={150}>
                          <BasicPopover
                            text={
                              "Preencher com a zona homogénea indicada no quadro 1 anterior como tendo necessidade de intervenção no maneio do pastoreio."
                            }
                          />
                          Zona homogénea
                        </StyledTableHead>
                        <StyledTableHead rowSpan={2} width={150}>
                          <Stack direction="row" justifyContent="right">
                            <BasicPopover
                              text={
                                "Preencher com a área correspondente à zona homogénea (soma da área de todas as subparcelas que constituem a zona homogénea)."
                              }
                            />
                          </Stack>
                          Área (Ha)
                        </StyledTableHead>
                        <StyledTableHead colSpan={4} width={500}>
                          Ano:
                          {el.data}
                        </StyledTableHead>
                        <StyledTableHead rowSpan={1} width={150}>
                          Ações
                        </StyledTableHead>
                      </TableRow>


                      <TableRow>

                        <StyledTableCell>
                          {el.camp_um}
                          <BasicPopover
                            text={
                              "Campo editável nos casos em que a rotação do efetivo apresenta outro período temporal (ex. mensal, bimensal, etc…)."
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          {el.camp_dois}
                          <BasicPopover
                            text={
                              "Campo editável nos casos em que a rotação do efetivo apresenta outro período temporal (ex. mensal, bimensal, etc…)."
                            }
                          />

                        </StyledTableCell>
                        <StyledTableCell>
                          {el.camp_tres}
                          <BasicPopover
                            text={
                              "Campo editável nos casos em que a rotação do efetivo apresenta outro período temporal (ex. mensal, bimensal, etc…)."
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          {el.camp_quatro}
                          <BasicPopover
                            text={
                              "Campo editável nos casos em que a rotação do efetivo apresenta outro período temporal (ex. mensal, bimensal, etc…)."
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <ButtonCadernos
                            mostrarBotaoEditar
                            aoClicarEditar={() => set_obj_anexo_cabecalho(el)}
                            mostrarBotaoApagar
                            aoClicarApagar={() => {
                              set_obj_anexo_cabecalho(el)
                              set_open_dialog_tem_a_certeza_que_quer_eliminar(true)
                            }}
                          />


                        </StyledTableCell>
                      </TableRow>

                      {
                        id_do_cabecalho_onde_vai_ser_adicionada_info === el.id_maneiro_cabecalho && (flag_criar_novo_anexo === true || obj_anexo_lista.length === 0) ?
                          <TableRow>
                            <StyledTableCell>
                              <CustomTextField
                                name="zona_homo"
                                value={obj_anexo?.zona_homo === undefined ? '' : obj_anexo?.zona_homo}
                                onChange={onInputEditTableChange}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                name="area"
                                value={obj_anexo?.area === undefined ? '' : obj_anexo?.area}
                                onChange={onInputEditTableChange}
                                error={error_area}
                                helperText={error_area ? "Apenas números são aceites" : ""}

                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                name="mes_um"
                                value={obj_anexo?.mes_um === undefined ? '' : obj_anexo?.mes_um}
                                onChange={onInputEditTableChange}

                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                name="mes_dois"
                                value={obj_anexo?.mes_dois === undefined ? '' : obj_anexo?.mes_dois}
                                onChange={onInputEditTableChange}

                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                name="mes_tres"
                                value={obj_anexo?.mes_tres === undefined ? '' : obj_anexo?.mes_tres}
                                onChange={onInputEditTableChange}

                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                name="mes_quatro"
                                value={obj_anexo?.mes_quatro === undefined ? '' : obj_anexo?.mes_quatro}
                                onChange={onInputEditTableChange}

                              />
                            </StyledTableCell>
                            <StyledTableCell>

                              <ButtonCadernos
                                mostrarBotaoGravar
                                aoClicarGravar={() =>
                                  handle_create_anexo()
                                }
                                mostrarBotaoCancelar
                                aoClicarCancelar={() => handle_close_adicionar_anexo()}
                              />
                            </StyledTableCell>
                          </TableRow> :
                          <></>

                      }
                      {
                        obj_anexo_lista.length !== 0 ?

                          obj_anexo_lista.map((elem, key1) => {
                            if (el.id_maneiro_cabecalho === elem.id_maneiro_cabecalho && id_do_cabecalho_onde_vai_ser_adicionada_info === el.id_maneiro_cabecalho && elem.id_maneiro === obj_anexo?.id_maneiro) {
                              return (

                                <TableRow key={key1}>
                                  <StyledTableCell>

                                    <CustomTextField
                                      name="zona_homo"
                                      value={obj_anexo?.zona_homo === undefined ? '' : obj_anexo?.zona_homo}
                                      onChange={onInputEditTableChange}
                                    />
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <CustomTextField
                                      name="area"
                                      value={obj_anexo?.area === undefined ? '' : obj_anexo?.area}
                                      onChange={onInputEditTableChange}
                                      error={error_area}
                                      helperText={error_area ? "Apenas números são aceites" : ""}

                                    />
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <CustomTextField
                                      name="mes_um"
                                      value={obj_anexo?.mes_um === undefined ? '' : obj_anexo?.mes_um}
                                      onChange={onInputEditTableChange}

                                    />
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <CustomTextField
                                      name="mes_dois"
                                      value={obj_anexo?.mes_dois === undefined ? '' : obj_anexo?.mes_dois}
                                      onChange={onInputEditTableChange}

                                    />
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <CustomTextField
                                      name="mes_tres"
                                      value={obj_anexo?.mes_tres === undefined ? '' : obj_anexo?.mes_tres}
                                      onChange={onInputEditTableChange}

                                    />
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <CustomTextField
                                      name="mes_quatro"
                                      value={obj_anexo?.mes_quatro === undefined ? '' : obj_anexo?.mes_quatro}
                                      onChange={onInputEditTableChange}

                                    />
                                  </StyledTableCell>
                                  <StyledTableCell>

                                    <ButtonCadernos
                                      mostrarBotaoGravar
                                      aoClicarGravar={() =>
                                        handle_create_anexo()
                                      }
                                      mostrarBotaoCancelar
                                      aoClicarCancelar={() => handle_close_adicionar_anexo()}
                                    />
                                  </StyledTableCell>
                                </TableRow>

                              )

                            } else if (el.id_maneiro_cabecalho === elem.id_maneiro_cabecalho) {
                              return (
                                <TableRow key={key1}>
                                  <StyledTableCell>
                                    {elem.zona_homo}

                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {elem.area}

                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {elem.mes_um}


                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {elem.mes_dois}


                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {elem.mes_tres}


                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {elem.mes_quatro}


                                  </StyledTableCell>
                                  <StyledTableCell>

                                    <ButtonCadernos
                                      mostrarBotaoEditar
                                      aoClicarEditar={() => {
                                        set_obj_anexo(elem)

                                        set_id_do_cabecalho_onde_vai_ser_adicionada_info(el.id_maneiro_cabecalho)
                                      }}
                                      mostrarBotaoApagar
                                      aoClicarApagar={() => {
                                        set_obj_anexo(elem)
                                        set_open_dialog_tem_a_certeza_que_quer_eliminar(true)
                                      }}
                                    />
                                  </StyledTableCell>
                                </TableRow>

                              )
                            }
                          })
                          :
                          <></>
                      }


                    </TableBody>


                  )
                } else {
                  return (
                    <TableBody key={key}>
                      <TableRow>
                        <StyledTableHead rowSpan={3} width={150}>
                          <BasicPopover
                            text={
                              "Preencher com a zona homogénea indicada no quadro 1 anterior como tendo necessidade de intervenção no maneio do pastoreio."
                            }
                          />
                          Zona homogénea
                        </StyledTableHead>
                        <StyledTableHead rowSpan={3} width={150}>
                          <Stack direction="row" justifyContent="right">
                            <BasicPopover
                              text={
                                "Preencher com a área correspondente à zona homogénea (soma da área de todas as subparcelas que constituem a zona homogénea)."
                              }
                            />
                          </Stack>
                          Área (Ha)
                        </StyledTableHead>
                        <StyledTableHead colSpan={4} width={500}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              views={["year"]}
                              label={
                                <Typography fontFamily="candara" fontSize={18}>
                                  Ano
                                </Typography>
                              }
                              value={obj_anexo_cabecalho?.data === undefined ? '' : obj_anexo_cabecalho?.data}
                              onChange={(newValue) => {
                                onInputEditTableChange_cabecalho({
                                  target: {
                                    name: "data",
                                    value: newValue ? newValue.format("YYYY") : "",
                                  },
                                });
                              }}
                              minDate={dayjs("2010")}

                              renderInput={(params) => <TextField {...params} />}
                            />
                          </LocalizationProvider>
                        </StyledTableHead>
                        <StyledTableHead rowSpan={1} width={150}>
                          Ações
                        </StyledTableHead>
                      </TableRow>
                      <TableRow>
                        <StyledTableCell>
                          <CustomTextField
                            name="camp_um"
                            value={obj_anexo_cabecalho?.camp_um === undefined ? '' : obj_anexo_cabecalho?.camp_um}
                            onChange={onInputEditTableChange_cabecalho}
                          />
                          <BasicPopover
                            text={
                              "Campo editável nos casos em que a rotação do efetivo apresenta outro período temporal (ex. mensal, bimensal, etc…)."
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="camp_dois"
                            value={obj_anexo_cabecalho?.camp_dois === undefined ? '' : obj_anexo_cabecalho?.camp_dois}
                            onChange={onInputEditTableChange_cabecalho}
                          />
                          <BasicPopover
                            text={
                              "Campo editável nos casos em que a rotação do efetivo apresenta outro período temporal (ex. mensal, bimensal, etc…)."
                            }
                          />

                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="camp_tres"
                            value={obj_anexo_cabecalho?.camp_tres === undefined ? '' : obj_anexo_cabecalho?.camp_tres}
                            onChange={onInputEditTableChange_cabecalho}
                          />
                          <BasicPopover
                            text={
                              "Campo editável nos casos em que a rotação do efetivo apresenta outro período temporal (ex. mensal, bimensal, etc…)."
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="camp_quatro"
                            value={obj_anexo_cabecalho?.camp_quatro === undefined ? '' : obj_anexo_cabecalho?.camp_quatro}
                            onChange={onInputEditTableChange_cabecalho}
                          />
                          <BasicPopover
                            text={
                              "Campo editável nos casos em que a rotação do efetivo apresenta outro período temporal (ex. mensal, bimensal, etc…)."
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <ButtonCadernos
                            mostrarBotaoGravar
                            aoClicarGravar={() => handle_update_anexo_cabecalho()}
                            mostrarBotaoCancelar
                            aoClicarCancelar={() => set_obj_anexo_cabecalho(undefined)}
                          />
                        </StyledTableCell>
                      </TableRow>
                    </TableBody>

                  )

                }

              })

          }


        </table>

        <ConfirmDialog
          open={open_dialog_tem_a_certeza_que_quer_eliminar}
          onClose={() => set_open_dialog_tem_a_certeza_que_quer_eliminar(false)}
          onConfirm={handle_escolhe_qual_elimina}
          message="Deseja eliminar o registo?"
        />
      </TableContainer>
    </CustomThemeProvider >
  );
};
