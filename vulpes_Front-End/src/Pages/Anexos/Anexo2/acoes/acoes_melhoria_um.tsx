import React, { useEffect, useState } from "react";
import { CustomTextField, CustomThemeProvider } from "../../../../Styles/theme/customThemeprovider";
import { Box, Paper, Snackbar, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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
import { IAcoesMelhoriaUm } from "../../../../Interfaces/anexos/anexo2/acoes_melhoria";
import { AcoesMelhoriaDoisForm } from "./acoes_melhoria_dois";
import { AcoesMelhoriaTresForm } from "./acoes_melhoria_tres";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

export const AcoesMelhoriaUmForm = () => {

  const location = useLocation();


  const [obj_anexo_um, set_obj_anexo_um] = useState<IAcoesMelhoriaUm>();
  const [obj_anexo_lista_um, set_obj_anexo_lista_um] = useState<IAcoesMelhoriaUm[]>([]);
  const [flag_criar_novo_anexo, set_flag_criar_novo_anexo] = React.useState(false);
  const [open_dialog_tem_a_certeza_que_quer_eliminar, set_open_dialog_tem_a_certeza_que_quer_eliminar] = useState(false);
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);



  const [createTable, setCreateTable] = useState(false);
  const [message, setMessage] = useState("");
  const [idToDelete, setIdToDelete] = useState<number | null>(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [error_area_intervencionar, set_error_area_intervencionar] = useState<boolean>(false);
  const [messageTextField, setMessageTextField] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editRow, setEditRow] = useState(false);

  const [isLoading, setIsLoading] = useState(false);



  const onInputChange_um = (event: any) => {
    const { name, value, type, checked } = event.target;
    let aux_obj_anexo: any = obj_anexo_um === undefined ? {} : obj_anexo_um

    if (type === "checkbox") {
      aux_obj_anexo[name] = aux_obj_anexo[name] === undefined ? true : !aux_obj_anexo[name]
      set_obj_anexo_um(aux_obj_anexo);

    } else {
      if (name === 'area_intervencionar') {

        if (!/^\d+$/.test(value)) {
          set_error_area_intervencionar(true)

        } else {
          set_error_area_intervencionar(false)

        }

      }
      set_obj_anexo_um((old: any) => ({
        ...old,
        [name]: value,
      }));
    }
  };

  const get_info = async () => {
    try {
      let res = await get(
        `/get_reg_anexo_dois_operacoes_melhoria_um_rosto/${location.state.id_rosto}`
      );
      if (res.status === 200) {
        if (res.data.result.length !== 0) {
          set_obj_anexo_lista_um(res.data.result);
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

  const handle_create_anexo_um = async () => {
    try {
      setIsLoading(true);

      if (error_area_intervencionar) {
        setMessage("Erro ao gravar!");
        setOpenSnackError(true);
      } else {


        let res = await post("new_reg_anexo_dois_operacoes_acoes_melhoria_um", {
          payload: {


            id_melhoria: 0,
            zona_homo: obj_anexo_um?.zona_homo === undefined ? '' : obj_anexo_um?.zona_homo,
            area_intervencionar: obj_anexo_um?.area_intervencionar === undefined ? 0 : obj_anexo_um?.area_intervencionar,
            acoes: obj_anexo_um?.acoes === undefined ? '' : obj_anexo_um?.acoes,
            periocidade: obj_anexo_um?.periocidade === undefined ? '' : obj_anexo_um?.periocidade,
            id_rosto: location.state.id_rosto,
            last_update: new Date().toISOString(),
            create_date: new Date().toISOString(),
            uuid: ''
          }
        });

        if (res.status === 200) {
          set_obj_anexo_lista_um((old) => [...old, res.data.result])
          set_obj_anexo_um(undefined);

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

  const handle_update_anexo_um = async () => {
    try {
      setIsLoading(true);

      let res = await post("update_reg_anexo_operacoes_melhoria_um", { payload: obj_anexo_um });

      if (res.status === 200) {
        let lista_aux: any = obj_anexo_lista_um.map((el) => {
          if (el.id_melhoria !== obj_anexo_um?.id_melhoria) {
            return el
          } else {
            return res.data.result
          }
        })
        set_obj_anexo_lista_um(lista_aux === undefined ? [] : lista_aux)
        set_obj_anexo_um(undefined);
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
  const handle_delete_anexo_um = async () => {
    try {
      setIsLoading(true);

      let res = await del(
        `delete__reg_anexo_dois_operacoes_melhoria_um/${obj_anexo_um?.id_melhoria}`
      );
      if (res.status === 200) {
        let lista_aux: any = obj_anexo_lista_um.filter((el) => {
          if (el.id_melhoria !== obj_anexo_um?.id_melhoria) {
            return el
          }
        })
        set_obj_anexo_um(undefined)
        set_obj_anexo_lista_um(lista_aux === undefined ? [] : lista_aux)
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
  const handleClickOpenDelete_um = (obj: IAcoesMelhoriaUm) => {
    set_obj_anexo_um(obj);
    set_open_dialog_tem_a_certeza_que_quer_eliminar(true)
  };
  const handleEdit_um = (obj: IAcoesMelhoriaUm) => {
    setCreateTable(false)
    set_obj_anexo_um(obj)
    set_flag_criar_novo_anexo(true)
  };

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
                  5.4 - Ações de melhoria do estado geral da pastagem
                  <BasicPopover
                    text={
                      "Campo descritivo a preencher apenas quando são necessárias ações distintas das identificadas nos quadros anteriores, tais como melhorar a gestão da rega (caso de pastagens regadas) ou reformulação da fertilização a efetuar.\n\nIdentificar as subparcelas/zona homogénea onde as ações são necessárias, ações a implementar e períocidade, quando aplicável."
                    }
                  />
                </TableCell>
                <TableCell colSpan={2}>
                  <Stack direction="row" sx={{ justifyContent: "end" }}>
                    <BarraDeFerramentas
                      mostrarBotaoNovo
                      textoBotaoNovo="Novo Registo"
                      aoClicarNovo={() => {
                        setCreateTable(true)
                        set_obj_anexo_um(undefined)
                      }}
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
                          "Preencher com a zona homogénea onde são necessárias ações distintas das identificadas nos quadros anteriores."
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableHead>
                <StyledTableHead sx={{ minWidth: 110 }}>
                  Área a intervencionar
                </StyledTableHead>
                <StyledTableHead sx={{ minWidth: 70 }}>
                  <Stack direction="row" justifyContent="center">
                    Ações a implementar
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Campo descritivo, que deve identificar a ação a implementar para melhoria do estado geral da pastagem."
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableHead>
                <StyledTableHead sx={{ minWidth: 80 }}>
                  <Stack direction="row" justifyContent="center">
                    Ano/Periocidade
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Indicar o ano em que a ação deve ser implementada ou a períocidade com que a ação de melhoria deve ser executada, ex. anual, bienal, trianual, etc..."
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
                    <CustomTextField
                      name="zona_homo"
                      value={obj_anexo_um?.zona_homo === undefined ? '' : obj_anexo_um?.zona_homo}
                      onChange={onInputChange_um}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="area_intervencionar"
                      value={obj_anexo_um?.area_intervencionar === undefined ? '' : obj_anexo_um?.area_intervencionar}
                      onChange={onInputChange_um}
                      error={error_area_intervencionar}
                      helperText={error_area_intervencionar ? "Apenas números são aceites" : ""}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="acoes"
                      value={obj_anexo_um?.acoes === undefined ? '' : obj_anexo_um?.acoes}
                      onChange={onInputChange_um}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="periocidade"
                      value={obj_anexo_um?.periocidade === undefined ? '' : obj_anexo_um?.periocidade}
                      onChange={onInputChange_um}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Stack direction="row" justifyContent="center">
                      <ButtonCadernos
                        mostrarBotaoCancelar
                        aoClicarCancelar={() => {setCreateTable(false)
                          
                        }}
                        mostrarBotaoGravar
                        aoClicarGravar={() => handle_create_anexo_um()}
                      />
                    </Stack>
                  </StyledTableCell>
                </TableRow>
              )}

              {obj_anexo_lista_um.map((row, key) => {

                if (obj_anexo_um?.id_melhoria === row.id_melhoria) {
                  return (
                    <TableRow key={key}>
                      <StyledTableCell>
                        <CustomTextField
                          name="zona_homo"
                          value={obj_anexo_um?.zona_homo === undefined ? '' : obj_anexo_um?.zona_homo}
                          onChange={onInputChange_um}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="area_intervencionar"
                          value={obj_anexo_um?.area_intervencionar === undefined ? '' : obj_anexo_um?.area_intervencionar}
                          onChange={onInputChange_um}
                          error={error_area_intervencionar}
                          helperText={error_area_intervencionar ? "Apenas números são aceites" : ""}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="acoes"
                          value={obj_anexo_um?.acoes === undefined ? '' : obj_anexo_um?.acoes}
                          onChange={onInputChange_um}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="periocidade"
                          value={obj_anexo_um?.periocidade === undefined ? '' : obj_anexo_um?.periocidade}
                          onChange={onInputChange_um}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Stack direction="row" justifyContent="center">
                          <ButtonCadernos
                            mostrarBotaoGravar
                            aoClicarGravar={() => handle_update_anexo_um()}
                            mostrarBotaoCancelar
                            aoClicarCancelar={() => set_obj_anexo_um(undefined)}
                          />
                        </Stack>
                      </StyledTableCell>
                    </TableRow>
                  )

                } else {
                  return (
                    <TableRow key={key}>
                      <StyledTableCell>{row.zona_homo}</StyledTableCell>
                      <StyledTableCell>
                        {row.area_intervencionar}
                      </StyledTableCell>
                      <StyledTableCell>{row.acoes}</StyledTableCell>
                      <StyledTableCell>{row.periocidade}</StyledTableCell>
                      <StyledTableCell>
                        <Stack direction="row" justifyContent="center">
                          <ButtonCadernos
                            mostrarBotaoEditar
                            aoClicarEditar={() => handleEdit_um(row)}
                            mostrarBotaoApagar
                            aoClicarApagar={() =>
                              handleClickOpenDelete_um(row)
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


            <AcoesMelhoriaDoisForm />
            <AcoesMelhoriaTresForm />
          </table>
          <ConfirmDialog
            open={open_dialog_tem_a_certeza_que_quer_eliminar}
            onClose={() => set_open_dialog_tem_a_certeza_que_quer_eliminar(false)}
            onConfirm={handle_delete_anexo_um}
            message="Deseja eliminar o registo?"
          />
        </TableContainer>
      )}
    </CustomThemeProvider>
  );
};
