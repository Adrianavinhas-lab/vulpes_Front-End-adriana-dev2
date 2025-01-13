import React, { useEffect, useState } from "react";
import { CustomTextField, CustomThemeProvider } from "../../../../Styles/theme/customThemeprovider";
import { Box, Snackbar, Stack, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { BarraDeFerramentas } from "../../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { StyledTableCell, StyledTableHead } from "../../../../Styles/tabelCellStyled/customTableCell";
import BasicPopover from "../../../../Components/Popover";
import { ButtonCadernos } from "../../../../Components/barra-de-ferramentas/ButtonCadernos";
import ConfirmDialog from "../../../../Components/CustomDialog/customdialog";
import { del, get, post } from "../../../../Services/tokenConfig";
import LoadingVulpes from "../../../../Styles/Loader/loading";
import { func_print } from "../../../../Func_genericas/func_print";
import { useLocation } from "react-router-dom";
import { IAcoesMelhoriaTres } from "../../../../Interfaces/anexos/anexo2/acoes_melhoria";
import { Alert } from "../../../../Components/Alert/Alert";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";



export const AcoesMelhoriaTresForm = () => {
  const location = useLocation();



  const [flag_criar_novo_anexo, set_flag_criar_novo_anexo] = React.useState(false);
  const [open_dialog_tem_a_certeza_que_quer_eliminar, set_open_dialog_tem_a_certeza_que_quer_eliminar] = useState(false);


  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const [obj_anexo_tres, set_obj_anexo_tres] = useState<IAcoesMelhoriaTres>();
  const [obj_anexo_lista_tres, set_obj_anexo_lista_tres] = useState<IAcoesMelhoriaTres[]>([]);

  const [createTable, setCreateTable] = useState(false);
  const [message, setMessage] = useState("");

  const [error_ano, set_error_ano] = useState<boolean>(false);
  const [error_seq, set_error_seq] = useState<boolean>(false);
  const [error_quantidade, set_error_quantidade] = useState<boolean>(false);


  const [isLoading, setIsLoading] = useState(false);


  const onInputChange_tres = (event: any) => {
    const { name, value, type, checked } = event.target;
    let aux_obj_anexo: any = obj_anexo_tres === undefined ? {} : obj_anexo_tres


    if (type === "checkbox") {
      aux_obj_anexo[name] = aux_obj_anexo[name] === undefined ? true : !aux_obj_anexo[name]
      set_obj_anexo_tres(aux_obj_anexo);

    } else {
      if (name === 'ano') {

        if (!/^\d+$/.test(value)) {
          set_error_ano(true)

        } else {
          set_error_ano(false)

        }

      }

      if (name === 'seq') {

        if (!/^\d+$/.test(value)) {
          set_error_seq(true)

        } else {
          set_error_seq(false)

        }

      }
      if (name === 'quantidade') {

        if (!/^\d+$/.test(value)) {
          set_error_quantidade(true)

        } else {
          set_error_quantidade(false)

        }

      }

      set_obj_anexo_tres((old: any) => ({
        ...old,
        [name]: value,
      }));
    }
  };

  const get_info = async () => {
    try {
      let res = await get(
        `/get_reg_anexo_dois_operacoes_melhoria_tres_rosto/${location.state.id_rosto}`
      );
      if (res.status === 200) {
        if (res.data.result.length !== 0) {
          set_obj_anexo_lista_tres(res.data.result);
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

  const handle_create_anexo_tres = async () => {
    try {

      if (error_ano === true || error_quantidade === true || error_seq === true) {
        setMessage("Erro a efetuar a sua operação!");
        setOpenSnackError(true);

      } else {
        setIsLoading(true);
        let res = await post("new_reg_anexo_dois_operacoes_melhoria_tres", {
          payload: {
            id_melhoria: 0,
            ano: obj_anexo_tres?.ano === undefined ? '' : obj_anexo_tres?.ano,
            seq: obj_anexo_tres?.seq === undefined ? 0 : obj_anexo_tres?.seq,
            tipologia: obj_anexo_tres?.tipologia === undefined ? '' : obj_anexo_tres?.tipologia,
            quantidade: obj_anexo_tres?.quantidade === undefined ? 0 : obj_anexo_tres?.quantidade,
            fundamentacao: obj_anexo_tres?.fundamentacao === undefined ? '' : obj_anexo_tres?.fundamentacao,
            id_rosto: location.state.id_rosto,
            last_update: new Date().toISOString(),
            create_date: new Date().toISOString(),
            uuid: ''
          }
        });

        if (res.status === 200) {
          set_obj_anexo_lista_tres((old) => [...old, res.data.result])
          set_obj_anexo_tres(undefined);

          setMessage("Gravado com sucesso!");
          setOpenSnackSuccess(true);


          setCreateTable(false);
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

  const handle_update_anexo_tres = async () => {
    try {
      if (error_ano === true || error_quantidade === true || error_seq === true) {
        setMessage("Erro a efetuar a sua operação!");
        setOpenSnackError(true);

      } else {
        setIsLoading(true);

        let res = await post("update_reg_anexo_operacoes_melhoria_tres", { payload: obj_anexo_tres });

        if (res.status === 200) {
          let lista_aux: any = obj_anexo_lista_tres.map((el) => {
            if (el.id_melhoria !== obj_anexo_tres?.id_melhoria) {
              return el
            } else {
              return res.data.result
            }
          })
          set_obj_anexo_lista_tres(lista_aux === undefined ? [] : lista_aux)
          set_obj_anexo_tres(undefined);
          set_flag_criar_novo_anexo(false)

          setMessage("Gravado com sucesso!");
          setOpenSnackSuccess(true);
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
  const handle_delete_anexo_tres = async () => {
    try {
      setIsLoading(true);

      let res = await del(
        `delete__reg_anexo_dois_operacoes_melhoria_tres/${obj_anexo_tres?.id_melhoria}`
      );
      if (res.status === 200) {
        let lista_aux: any = obj_anexo_lista_tres.filter((el) => {
          if (el.id_melhoria !== obj_anexo_tres?.id_melhoria) {
            return el
          }
        })
        set_obj_anexo_lista_tres(lista_aux === undefined ? [] : lista_aux)
        set_obj_anexo_tres(undefined)
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
  const handleClickOpenDelete_tres = (obj: IAcoesMelhoriaTres) => {
    set_obj_anexo_tres(obj);
    set_open_dialog_tem_a_certeza_que_quer_eliminar(true)
  };
  const handleEdit_tres = (obj: IAcoesMelhoriaTres) => {
    set_obj_anexo_tres(obj)
    set_flag_criar_novo_anexo(true)
    setCreateTable(false)
  };
  return (
    <>
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
      <CustomThemeProvider>
        {isLoading ? (
          <LoadingVulpes />
        ) : (
          <>
            <TableHead>
              <TableRow>
                <TableCell colSpan={8}>
                  <Stack direction="row" sx={{ justifyContent: "end" }}>
                    <BarraDeFerramentas
                      mostrarBotaoNovo
                      textoBotaoNovo="Novo Registo"
                      aoClicarNovo={() =>{ setCreateTable(true)

                        set_obj_anexo_tres(undefined)
                      }}
                    />
                  </Stack>
                </TableCell>
              </TableRow>

            </TableHead>
            <TableBody>
              <TableRow>
                <StyledTableHead sx={{ width: 200 }} rowSpan={2}>
                  <Stack direction="row" justifyContent="center">
                    Ações de melhoria das estruturas de parqueamento do gado
                    e dos pontos de água acessíveis ao gado
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "estruturas fixas ou móveis que facilitem o condicionamento do efetivo pecuário nas pastagens ou de instalar pontos de água, conforme identificado no quadro 1."
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableHead>
                <StyledTableHead sx={{ width: 110 }}>
                  Ano
                  <BasicPopover
                    text={
                      "Identificar o ano em que estas ações devem ser implementadas"
                    }
                  />
                </StyledTableHead>
                <StyledTableHead sx={{ minWidth: 70 }}>
                  <Stack direction="row" justifyContent="center">
                    n.º seq. parcela/zona homogénea
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Indicar a subparcela ou zona homogénea onde deve ser realizada a melhoria do parqueamento ou a instalação de pontos de água."
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableHead>
                <StyledTableHead sx={{ minWidth: 80 }}>
                  <Stack direction="row" justifyContent="center">
                    Tipologia
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Identificar a tipologia da intervenção e forma:\nParqueamento\n- cercas fixas;\n- cercas móveis;\n- cercas elétricas;\n- Outras.\n\nPontos de água\n- Bebedouro;\n- Charca;\n- Cisterna;\n- Tanque;\n- Reservatório;\n- Outros."
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableHead>
                <StyledTableHead sx={{ minWidth: 80 }}>
                  <Stack direction="row" justifyContent="center">
                    Quantidade/m
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Indicar para o parqueamento a previsão da extensão das cercas.\n\nIndicar para os pontos de água o n.º a instalar por subparcela/zona homogénea."
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableHead>
                <StyledTableHead sx={{ width: 300 }} colSpan={2}>
                  <Stack direction="row" justifyContent="center">
                    Fundamentação/ observações
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Campo descritivo onde deve ser registada a fundamentação técnica para a intervenção proposta."
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableHead>

                <StyledTableHead>Ações</StyledTableHead>
              </TableRow>
              {createTable && (


                <TableRow>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        views={["year"]}
                        label={
                          <Typography fontFamily="candara" fontSize={18}>
                            Ano
                          </Typography>
                        }
                        value={obj_anexo_tres?.ano === undefined ? '' : obj_anexo_tres?.ano}

                        onChange={(newValue) => {
                          onInputChange_tres({
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
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="seq"
                      value={obj_anexo_tres?.seq === undefined ? '' : obj_anexo_tres?.seq}
                      onChange={onInputChange_tres}
                      error={error_seq}
                      helperText={error_seq ? "Apenas números são aceites" : ""}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="tipologia"
                      value={obj_anexo_tres?.tipologia === undefined ? '' : obj_anexo_tres?.tipologia}
                      onChange={onInputChange_tres}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="quantidade"
                      value={obj_anexo_tres?.quantidade === undefined ? '' : obj_anexo_tres?.quantidade}
                      onChange={onInputChange_tres}
                      error={error_quantidade}
                      helperText={error_quantidade ? "Apenas números são aceites" : ""}
                    />
                  </StyledTableCell>
                  <StyledTableCell colSpan={2}>
                    <CustomTextField
                      name="fundamentacao"
                      value={obj_anexo_tres?.fundamentacao === undefined ? '' : obj_anexo_tres?.fundamentacao}
                      onChange={onInputChange_tres}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Stack direction="row" justifyContent="center">
                      <ButtonCadernos
                        mostrarBotaoCancelar
                        aoClicarCancelar={() => setCreateTable(false)}
                        mostrarBotaoGravar
                        aoClicarGravar={() => handle_create_anexo_tres()}
                      />
                    </Stack>
                  </StyledTableCell>
                </TableRow>

              )}


              {obj_anexo_lista_tres.map((row, key) => {



                if (obj_anexo_tres?.id_melhoria === row.id_melhoria) {

                  return (
                    <TableRow key={key}>
                      <StyledTableCell>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            views={["year"]}
                            label={
                              <Typography fontFamily="candara" fontSize={18}>
                                Ano
                              </Typography>
                            }
                            value={obj_anexo_tres?.ano === undefined ? '' : obj_anexo_tres?.ano}

                            onChange={(newValue) => {
                              onInputChange_tres({
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
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="seq"
                          value={obj_anexo_tres?.seq === undefined ? '' : obj_anexo_tres?.seq}
                          onChange={onInputChange_tres}
                          error={error_seq}
                          helperText={error_seq ? "Apenas números são aceites" : ""}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="tipologia"
                          value={obj_anexo_tres?.tipologia === undefined ? '' : obj_anexo_tres?.tipologia}
                          onChange={onInputChange_tres}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="quantidade"
                          value={
                            obj_anexo_tres?.quantidade === undefined ? '' : obj_anexo_tres?.quantidade
                          }
                          onChange={onInputChange_tres}
                          error={error_quantidade}

                          helperText={error_quantidade ? "Apenas números são aceites" : ""}
                        />
                      </StyledTableCell>
                      <StyledTableCell colSpan={2}>
                        <CustomTextField
                          name="fundamentacao"
                          value={obj_anexo_tres?.fundamentacao === undefined ? '' : obj_anexo_tres?.fundamentacao}
                          onChange={onInputChange_tres}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Stack direction="row" justifyContent="center">
                          <ButtonCadernos
                            mostrarBotaoCancelar
                            aoClicarCancelar={() => set_obj_anexo_tres(undefined)}
                            mostrarBotaoGravar
                            aoClicarGravar={() =>
                              handle_update_anexo_tres()
                            }
                          />
                        </Stack>
                      </StyledTableCell>
                    </TableRow>
                  )
                } else {
                  return (
                    <TableRow key={key}>
                      <StyledTableCell>{row.ano}</StyledTableCell>
                      <StyledTableCell>{row.seq}</StyledTableCell>
                      <StyledTableCell>{row.tipologia}</StyledTableCell>
                      <StyledTableCell>{row.quantidade}</StyledTableCell>
                      <StyledTableCell colSpan={2}>
                        {row.fundamentacao}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Stack direction="row" justifyContent="center">
                          <ButtonCadernos
                            mostrarBotaoEditar
                            aoClicarEditar={() =>
                              handleEdit_tres(row)
                            }
                            mostrarBotaoApagar
                            aoClicarApagar={() =>
                              handleClickOpenDelete_tres(row)
                            }
                          />
                        </Stack>
                      </StyledTableCell>
                    </TableRow>
                  )
                }


              }
              )}
            </TableBody>
          </>
        )}
        <ConfirmDialog
          open={open_dialog_tem_a_certeza_que_quer_eliminar}
          onClose={() => set_open_dialog_tem_a_certeza_que_quer_eliminar(false)}
          onConfirm={handle_delete_anexo_tres}
          message="Deseja eliminar o registo?"
        />
      </CustomThemeProvider>
    </>
  );
};
