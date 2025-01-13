import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { Stack, TableBody } from "@mui/material";
import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ConfirmDialog from "../../../../Components/CustomDialog/customdialog";
import { ButtonCadernos } from "../../../../Components/barra-de-ferramentas/ButtonCadernos";
import { StyledTableHead } from "../../../../Styles/tabelCellStyled/customTableCell";
import BasicPopover from "../../../../Components/Popover";
import { CustomThemeProvider } from "../../../../Styles/theme/customThemeprovider";
import { ICalagem, ICalagemCab } from "../../../../Interfaces/anexos/anexo2/calagem";
import { func_print } from "../../../../Func_genericas/func_print";
import { del, get, post } from "../../../../Services/tokenConfig";
import { useLocation } from "react-router-dom";
import { BarraDeFerramentas } from "../../../../Components/barra-de-ferramentas/BarraDeFerramentas";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});


export const CalagemForm = () => {
  const location = useLocation();


  const [obj_anexo_cabecalho, set_obj_anexo_cabecalho] = useState<ICalagemCab>();
  const [obj_anexo, set_obj_anexo] = useState<ICalagem>();
  const [open_dialog_tem_a_certeza_que_quer_eliminar, set_open_dialog_tem_a_certeza_que_quer_eliminar] = useState(false);
  const [obj_anexo_lista_cabecalho, set_obj_anexo_lista_cabecalho] = useState<ICalagemCab[]>([]);
  const [obj_anexo_lista, set_obj_anexo_lista] = useState<ICalagem[]>([]);
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
        `delete__reg_anexo_dois_maneio_um/${obj_anexo?.id_calagem_cabecalho}`
      );
      if (res.status === 200) {
        let lista_aux: any = obj_anexo_lista.filter((el) => {
          if (el.id_calagem_cabecalho !== obj_anexo?.id_calagem_cabecalho) {
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
        `delete__reg_anexo_dois_maneio_um/${obj_anexo_cabecalho?.id_calagem_cabecalho}`
      );
      if (res.status === 200) {
        let lista_aux: any = obj_anexo_lista_cabecalho.filter((el) => {
          if (el.id_calagem_cabecalho !== obj_anexo_cabecalho?.id_calagem_cabecalho) {
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
          id_calagem: 0,
          zona_homo: obj_anexo?.zona_homo === undefined ? '' : obj_anexo?.zona_homo,
          area: obj_anexo?.area === undefined ? 0 : obj_anexo?.area,
          area_intervencionar: obj_anexo?.area_intervencionar === undefined ? '' : obj_anexo?.area_intervencionar,
          corretivo: obj_anexo?.corretivo === undefined ? '' : obj_anexo?.corretivo,
          quantidade: obj_anexo?.quantidade === undefined ? '' : obj_anexo?.quantidade,
          id_calagem_cabecalho: id_do_cabecalho_onde_vai_ser_adicionada_info,
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
          id_calagem_cabecalho: 0,
          data: obj_anexo_cabecalho?.data === undefined ? '' : obj_anexo_cabecalho?.data,
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
          if (el.id_calagem !== obj_anexo?.id_calagem) {
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
          if (el.id_calagem_cabecalho !== obj_anexo_cabecalho?.id_calagem_cabecalho) {
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
                colSpan={4}
                sx={{
                  fontWeight: 600,
                  fontFamily: "candara",
                  fontSize: 16,
                }}
              >
                <Stack direction="row" justifyContent="left">
                  5.2 - Calagem ou aplicação de outros fertilizantes
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={
                        "Quadro a preencher, quando aplicável:\n1 -  Tendo em consideração o valor de ph registado no quadro 1.1 do Anexo 1 - Plano de Fertilização e as recomendações constantes no boletim com os resultados das análises de terras (deve estar alinhado com o previsto no quadro 1 do Plano de Gestão do Pastoreio);\n\n2 - Quando se verificar, pela observação visual da pastagem, a necessidade pontual (numa determinada área) da aplicação de fertilizante não previsto no Anexo 1 - Plano de Fertilização (deve estar alinhado com o previsto no quadro 1 do Plano de Gestão do Pastoreio).\n\nO quadro 5.2 deve ser replicado tantas vezes quantos os anos previstos para efetuar a calagem ou a aplicação adicional de outros fertilizantes (casos em que esta intervenção seja fraccionada no tempo)."
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
                    aoClicarNovo={() => { }}
                  />
                </Stack>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <StyledTableHead rowSpan={2}>
                Zona homogénea
                <BasicPopover
                  text={
                    "Preencher com a zona homogénea indicada no quadro 4 anterior como tendo necessidade de intervenção na Sementeira/ ressementeira/melhoria da pastagem."
                  }
                />
              </StyledTableHead>
              <StyledTableHead rowSpan={2}>
                Área (Ha)
                <BasicPopover
                  text={
                    "Preencher com a área correspondente à zona homogénea (soma da área de todas as subparcelas que constituem a zona homogénea)."
                  }
                />
              </StyledTableHead>
              <StyledTableHead colSpan={3}>Ano:</StyledTableHead>
              <StyledTableHead rowSpan={3}>Ações</StyledTableHead>
            </TableRow>
            <TableRow>
              <StyledTableHead>Área a intervencionar</StyledTableHead>
              <StyledTableHead>
                Corretivo/outro fertilizante aplicado
                <BasicPopover
                  text={
                    "Preencher com a identificação do corretivo ou outro fertilizante aplicado, quando não previsto no Anexo 1 - Plano de Fertilização (deve estar alinhado com o previsto no quadro 1 do Plano de Gestão do Pastoreio)."
                  }
                />
              </StyledTableHead>
              <StyledTableHead>
                Quantidade de corretivo/outro fertilizante a aplicar
                (kg/ha)
              </StyledTableHead>
            </TableRow>

            {flag_criar_novo_cabecalho && (
              <>
                <TableRow>
                  <StyledTableHead rowSpan={2}>
                    Zona homogénea
                    <BasicPopover
                      text={
                        "Preencher com a zona homogénea indicada no quadro 4 anterior como tendo necessidade de intervenção na Sementeira/ ressementeira/melhoria da pastagem."
                      }
                    />
                  </StyledTableHead>
                  <StyledTableHead rowSpan={2}>
                    Área (Ha)
                    <BasicPopover
                      text={
                        "Preencher com a área correspondente à zona homogénea (soma da área de todas as subparcelas que constituem a zona homogénea)."
                      }
                    />
                  </StyledTableHead>
                  <StyledTableHead colSpan={3} width={500}>
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
                    </Stack>
                  </StyledTableHead>
                  <StyledTableHead rowSpan={2} width={150}>
                    <ButtonCadernos
                      mostrarBotaoGravar
                      aoClicarGravar={() => { }}
                      mostrarBotaoCancelar
                      aoClicarCancelar={() => { }}
                    />
                  </StyledTableHead>
                </TableRow>
                <TableRow>
                  <StyledTableHead>Área a intervencionar</StyledTableHead>
                  <StyledTableHead>
                    Corretivo/outro fertilizante aplicado
                    <BasicPopover
                      text={
                        "Preencher com a identificação do corretivo ou outro fertilizante aplicado, quando não previsto no Anexo 1 - Plano de Fertilização (deve estar alinhado com o previsto no quadro 1 do Plano de Gestão do Pastoreio)."
                      }
                    />
                  </StyledTableHead>
                  <StyledTableHead>
                    Quantidade de corretivo/outro fertilizante a aplicar
                    (kg/ha)
                  </StyledTableHead>
                </TableRow>
              </>
            )}

            {obj_anexo_lista_cabecalho?.map((tab) => {


              if (obj_anexo_cabecalho?.id_calagem_cabecalho === tab.id_calagem_cabecalho) {
                return (
                  <>
                    <TableRow key={tab.id_calagem_cabecalho}>
                      <TableCell colSpan={7}>
                        <Stack direction="row" sx={{ justifyContent: "end" }}>
                          <BarraDeFerramentas
                            mostrarBotaoNovo
                            textoBotaoNovo="Nova linha"
                            aoClicarNovo={() => { }}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead rowSpan={2} width={150}>
                        Zona homogénea{" "}
                        <BasicPopover
                          text={
                            "Preencher com a zona homogénea indicada no quadro 1 anterior como tendo necessidade de intervenção na Sementeira/ ressementeira/melhoria da pastagem."
                          }
                        />
                      </StyledTableHead>
                      <StyledTableHead rowSpan={2} width={150}>
                        Área (Ha)
                        <BasicPopover
                          text={
                            "Preencher com a área correspondente à zona homogénea (soma da área de todas as subparcelas que constituem a zona homogénea)."
                          }
                        />
                      </StyledTableHead>
                      <StyledTableHead colSpan={3} width={500}>
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
                              value={obj_anexo_cabecalho?.data === undefined ? '' : obj_anexo_cabecalho?.data}
                              onChange={(newValue) => {
                                onInputEditTableChange_cabecalho({
                                  target: {
                                    name: "data",
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
                      <StyledTableHead rowSpan={2} width={150}>
                        <ButtonCadernos
                          mostrarBotaoGravar
                          aoClicarGravar={() => { }}
                          mostrarBotaoCancelar
                          aoClicarCancelar={() => { }}
                        />
                      </StyledTableHead>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>Área a intervencionar</StyledTableHead>
                      <StyledTableHead>
                        Corretivo/outro fertilizante aplicado
                        <BasicPopover
                          text={
                            "Preencher com a identificação do corretivo ou outro fertilizante aplicado, quando não previsto no Anexo 1 - Plano de Fertilização (deve estar alinhado com o previsto no quadro 1 do Plano de Gestão do Pastoreio)."
                          }
                        />
                      </StyledTableHead>
                      <StyledTableHead>
                        Quantidade de corretivo/outro fertilizante a aplicar
                        (kg/ha)
                      </StyledTableHead>
                    </TableRow>
                  </>

                )
              } else {
                return (
                  <>
                    <TableRow key={tab.id_calagem_cabecalho}>
                      <TableCell colSpan={7}>
                        <Stack direction="row" sx={{ justifyContent: "end" }}>
                          <BarraDeFerramentas
                            mostrarBotaoNovo
                            textoBotaoNovo="Nova linha"
                            aoClicarNovo={() => { }}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <StyledTableHead rowSpan={2} width={150}>
                        Zona homogénea
                        <BasicPopover
                          text={
                            "Preencher com a zona homogénea indicada no quadro 1 anterior como tendo necessidade de intervenção na Sementeira/ ressementeira/melhoria da pastagem."
                          }
                        />
                      </StyledTableHead>
                      <StyledTableHead rowSpan={2} width={150}>
                        Área (Ha)
                        <BasicPopover
                          text={
                            "Preencher com a área correspondente à zona homogénea (soma da área de todas as subparcelas que constituem a zona homogénea)."
                          }
                        />
                      </StyledTableHead>
                      <StyledTableHead colSpan={3} width={500}>
                        Ano:
                        <Typography
                          sx={{
                            paddingLeft: 2,
                            fontFamily: "candara",
                            fontWeight: 600,
                          }}
                        >
                          {tab.data}
                        </Typography>
                      </StyledTableHead>
                      <StyledTableHead rowSpan={2} width={150}>
                        <ButtonCadernos
                          mostrarBotaoEditar
                          aoClicarEditar={() => { }}
                          mostrarBotaoApagar
                          aoClicarApagar={() => { }}
                        />
                      </StyledTableHead>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>Área a intervencionar</StyledTableHead>
                      <StyledTableHead>
                        Corretivo/outro fertilizante aplicado
                        <BasicPopover
                          text={
                            "Preencher com a identificação do corretivo ou outro fertilizante aplicado, quando não previsto no Anexo 1 - Plano de Fertilização (deve estar alinhado com o previsto no quadro 1 do Plano de Gestão do Pastoreio)."
                          }
                        />
                      </StyledTableHead>
                      <StyledTableHead>
                        Quantidade de corretivo/outro fertilizante a aplicar
                        (kg/ha)
                      </StyledTableHead>
                    </TableRow>



                  </>
                )

              }
            }





            )}
          </TableBody>
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
