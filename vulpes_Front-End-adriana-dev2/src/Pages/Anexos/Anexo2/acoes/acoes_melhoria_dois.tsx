import React, { useEffect, useState } from "react";
import { Box, Snackbar, Stack, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { CustomTextField, CustomThemeProvider } from "../../../../Styles/theme/customThemeprovider";
import { BarraDeFerramentas } from "../../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { StyledTableCell, StyledTableHead } from "../../../../Styles/tabelCellStyled/customTableCell";
import BasicPopover from "../../../../Components/Popover";
import ConfirmDialog from "../../../../Components/CustomDialog/customdialog";
import { IAcoesMelhoriaDois } from "../../../../Interfaces/anexos/anexo2/acoes_melhoria";
import { del, get, post } from "../../../../Services/tokenConfig";
import LoadingVulpes from "../../../../Styles/Loader/loading";
import { func_print } from "../../../../Func_genericas/func_print";
import { ButtonCadernos } from "../../../../Components/barra-de-ferramentas/ButtonCadernos";
import { Alert } from "../../../../Components/Alert/Alert";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";



export const AcoesMelhoriaDoisForm = () => {

  const location = useLocation();


  const [obj_anexo_dois, set_obj_anexo_dois] = useState<IAcoesMelhoriaDois>();
  const [obj_anexo_lista_dois, set_obj_anexo_lista_dois] = useState<IAcoesMelhoriaDois[]>([]);
  const [open_dialog_tem_a_certeza_que_quer_eliminar, set_open_dialog_tem_a_certeza_que_quer_eliminar] = useState(false);

  const [createTable, setCreateTable] = useState(false);
  const [message, setMessage] = useState("");

  const [error, setError] = useState<boolean>(false);
  const [editRow, setEditRow] = useState(false);
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const [flag_criar_novo_anexo, set_flag_criar_novo_anexo] = React.useState(false);


  const [isLoading, setIsLoading] = useState(false);

  const onInputChange_dois = (event: any) => {
    const { name, value, type, checked } = event.target;
    let aux_obj_anexo: any = obj_anexo_dois === undefined ? {} : obj_anexo_dois

    if (type === "checkbox") {
      aux_obj_anexo[name] = aux_obj_anexo[name] === undefined ? true : !aux_obj_anexo[name]
      set_obj_anexo_dois(aux_obj_anexo);

    } else {

      if (name === 'seq') {

        if (!/^\d+$/.test(value)) {
          setError(true)

        } else {
          setError(false)

        }

      }
      set_obj_anexo_dois((old: any) => ({
        ...old,
        [name]: value,
      }));
    }
  };

  const get_info = async () => {
    try {
      let res = await get(
        `/get_reg_anexo_dois_operacoes_melhoria_dois_rosto/${location.state.id_rosto}`
      );
      if (res.status === 200) {
        if (res.data.result.length !== 0) {
          set_obj_anexo_lista_dois(res.data.result);
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

  const handle_create_anexo_dois = async () => {
    try {
      setIsLoading(true);
      let res = await post("new_reg_anexo_dois_operacoes_melhoria_dois", {
        payload: {
          id_melhoria: 0,
          ano: obj_anexo_dois?.ano === undefined ? '' : obj_anexo_dois?.ano,
          seq: obj_anexo_dois?.seq === undefined ? 0 : obj_anexo_dois?.seq,
          tipo: obj_anexo_dois?.tipo === undefined ? '' : obj_anexo_dois?.tipo,
          fundamentacao: obj_anexo_dois?.fundamentacao === undefined ? '' : obj_anexo_dois?.fundamentacao,
          id_rosto: location.state.id_rosto,
          last_update: new Date().toISOString(),
          create_date: new Date().toISOString(),
          uuid: ''
        }
      });

      if (res.status === 200) {
        set_obj_anexo_lista_dois((old) => [...old, res.data.result])
        set_obj_anexo_dois(undefined);

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

  const handle_update_anexo_dois = async () => {
    try {
      if (error) {
        setMessage("Erro ao gravar!");

        setOpenSnackError(true);

      } else {

        setIsLoading(true);

        let res = await post("update_reg_anexo_alteracoes_dois", { payload: obj_anexo_dois });

        if (res.status === 200) {
          let lista_aux: any = obj_anexo_lista_dois.map((el) => {
            if (el.id_melhoria !== obj_anexo_dois?.id_melhoria) {
              return el
            } else {
              return res.data.result
            }
          })
          set_obj_anexo_lista_dois(lista_aux === undefined ? [] : lista_aux)
          set_obj_anexo_dois(undefined);
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
  const handle_delete_anexo_dois = async () => {
    try {
      setIsLoading(true);

      let res = await del(
        `delete__reg_anexo_dois_operacoes_melhoria_dois/${obj_anexo_dois?.id_melhoria}`
      );
      if (res.status === 200) {
        let lista_aux: any = obj_anexo_lista_dois.filter((el) => {
          if (el.id_melhoria !== obj_anexo_dois?.id_melhoria) {
            return el
          }
        })
        set_obj_anexo_lista_dois(lista_aux === undefined ? [] : lista_aux)
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
  const handleClickOpenDelete_dois = (obj: IAcoesMelhoriaDois) => {
    set_obj_anexo_dois(obj);
    set_open_dialog_tem_a_certeza_que_quer_eliminar(true)
  };
  const handleEdit_dois = (obj: IAcoesMelhoriaDois) => {
    set_obj_anexo_dois(obj)
    set_flag_criar_novo_anexo(true)
    setCreateTable(false)
  };


  return (
    <CustomThemeProvider>
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
      {isLoading ? (
        <LoadingVulpes />
      ) : (
        <>
          <TableHead>
            <TableRow>
              <TableCell colSpan={7}>
                <Stack direction="row" sx={{ justifyContent: "end" }}>
                  <BarraDeFerramentas
                    mostrarBotaoNovo
                    textoBotaoNovo="Novo Registo"
                    aoClicarNovo={() => {
                      setCreateTable(true)
                      set_obj_anexo_dois(undefined)
                    }}
                  />
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableHead sx={{ minWidth: 110 }}>
                <Stack direction="row" justifyContent="center">
                  Presença de leguminosas
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={
                        "Quadro que complementa a informação prestada no quadro 4 fornecendo a fundamentação para as intervenções nele propostas (sementeira, ressementeira ou melhoria da pastagem permanente."
                      }
                    />
                  </Box>
                </Stack>
              </StyledTableHead>
              <StyledTableHead sx={{ width: 110 }}>
                Ano
                <BasicPopover
                  text={
                    "Preencher de acordo com os elementos preenchidos no quadro 4."
                  }
                />
              </StyledTableHead>
              <StyledTableHead sx={{ minWidth: 70 }}>
                <Stack direction="row" justifyContent="center">
                  n.º seq. parcela/zona homogénea
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={
                        "Preencher de acordo com os elementos preenchidos no quadro 4."
                      }
                    />
                  </Box>
                </Stack>
              </StyledTableHead>
              <StyledTableHead sx={{ minWidth: 80 }}>
                <Stack direction="row" justifyContent="center">
                  Tipo de intervenção
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={
                        "Preencher de acordo com os elementos preenchidos no quadro 4."
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
          </TableHead>
          <TableBody>
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
                      value={obj_anexo_dois?.ano === undefined ? '' : obj_anexo_dois?.ano}

                      onChange={(newValue) => {
                        onInputChange_dois({
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
                    value={obj_anexo_dois?.seq === undefined ? '' : obj_anexo_dois?.seq}
                    onChange={onInputChange_dois}
                    error={error}
                    helperText={error ? "Apenas números são aceites" : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="tipo"
                    value={obj_anexo_dois?.tipo === undefined ? '' : obj_anexo_dois?.tipo}
                    onChange={onInputChange_dois}
                  />
                </StyledTableCell>
                <StyledTableCell colSpan={2}>
                  <CustomTextField
                    name="fundamentacao"
                    value={obj_anexo_dois?.fundamentacao === undefined ? '' : obj_anexo_dois?.fundamentacao}
                    onChange={onInputChange_dois}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <Stack direction="row" justifyContent="center">
                    <ButtonCadernos
                      mostrarBotaoCancelar
                      aoClicarCancelar={() => setCreateTable(false)}
                      mostrarBotaoGravar
                      aoClicarGravar={() => handle_create_anexo_dois()}
                    />
                  </Stack>
                </StyledTableCell>
              </TableRow>
            )}

            {obj_anexo_lista_dois.map((row, key) => {

              if (obj_anexo_dois?.id_melhoria === row.id_melhoria) {
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
                          value={obj_anexo_dois?.ano === undefined ? '' : obj_anexo_dois?.ano}

                          onChange={(newValue) => {
                            onInputChange_dois({
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
                        value={obj_anexo_dois?.seq === undefined ? '' : obj_anexo_dois?.seq}
                        onChange={onInputChange_dois}
                        error={error}
                        helperText={error ? "Apenas números são aceites" : ""}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="tipo"
                        value={obj_anexo_dois?.tipo === undefined ? '' : obj_anexo_dois?.tipo}
                        onChange={onInputChange_dois}
                      />
                    </StyledTableCell>
                    <StyledTableCell colSpan={2}>
                      <CustomTextField
                        name="fundamentacao"
                        value={obj_anexo_dois?.fundamentacao === undefined ? '' : obj_anexo_dois?.fundamentacao}
                        onChange={onInputChange_dois}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Stack direction="row" justifyContent="center">
                        <ButtonCadernos
                          mostrarBotaoCancelar
                          aoClicarCancelar={() => {
                            setEditRow(false)
                            set_obj_anexo_dois(undefined)
                          }}
                          mostrarBotaoGravar
                          aoClicarGravar={() =>
                            handle_update_anexo_dois()
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
                    <StyledTableCell>{row.tipo}</StyledTableCell>
                    <StyledTableCell colSpan={2}>
                      {row.fundamentacao}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Stack direction="row" justifyContent="center">
                        <ButtonCadernos
                          mostrarBotaoEditar
                          aoClicarEditar={() => handleEdit_dois(row)}
                          mostrarBotaoApagar
                          aoClicarApagar={() =>
                            handleClickOpenDelete_dois(row)
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
        </>
      )}

      <ConfirmDialog
        open={open_dialog_tem_a_certeza_que_quer_eliminar}
        onClose={() => set_open_dialog_tem_a_certeza_que_quer_eliminar(false)}
        onConfirm={handle_delete_anexo_dois}
        message="Deseja eliminar o registo?"
      />
    </CustomThemeProvider>
  );
};
