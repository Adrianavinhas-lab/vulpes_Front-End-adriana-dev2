import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Snackbar, Stack } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Box, Paper } from "@mui/material";
import CadernoLayout from "../../../Styles/layout/cadernoLayout";
import { del, get, post } from "../../../Services/tokenConfig";
import LoadingVulpes from "../../../Styles/Loader/loading";
import { StyledTableCell, StyledTableCellBaseLeft, StyledTableHead, StyledTableHeadLeft } from "../../../Styles/tabelCellStyled/customTableCell";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import { func_print } from "../../../Func_genericas/func_print";
import { CustomTextField } from "../../../Styles/theme/customThemeprovider";
import { IAnexo4 } from "../../../Interfaces/anexos/anexo4";
import BasicPopover from "../../../Components/Popover";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { Alert } from "../../../Components/Alert/Alert";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    toolbar: {
      display: "flex",
      textAlign: "center",
      justifyContent: "center",
      padding: theme.spacing(2, 4),
      // necessary for content to be below app bar
      background: " #E7F0DA ",
      color: "#353C47",
      fontFamily: "Arial",
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



const Anexo4 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const classes = useStyles();
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const [message, setMessage] = useState("");
  const [open_dialog_tem_a_certeza_que_quer_eliminar, set_open_dialog_tem_a_certeza_que_quer_eliminar] = useState(false);
  const [createTable, setCreateTable] = useState(false);
  const [flag_editar_Anexo, set_flag_editar_Anexo] = useState(false);
  const [obj_anexo, set_obj_anexo] = useState<IAnexo4>();
  const [obj_anexo_new_or_edit, set_obj_anexo_new_or_edit] = useState<IAnexo4>();

  const [isLoading, setIsLoading] = useState(true);


  const get_info = async () => {
    try {
      let res = await get(
        `/get_reg_anexo_quatro_rosto/${location.state.id_rosto}`
      );
      if (res.status === 200) {
        if (res.data.result.length !== 0) {
          set_obj_anexo(res.data.result[0]);
          setCreateTable(false);
        } else {
          setCreateTable(true);
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
  const reset_flags = () => {
    set_obj_anexo_new_or_edit(undefined)
  }
  const handle_update_anexo = async () => {
    try {
      setIsLoading(true);

      let res = await post("update_reg_anexo_quatro", { payload: obj_anexo_new_or_edit });

      if (res.status === 200) {
        setMessage("Gravado com sucesso!");
        setOpenSnackSuccess(true);
        set_obj_anexo(res.data.result);
        reset_flags()
        set_flag_editar_Anexo(false);
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
        `delete__reg_anexo_quatro/${obj_anexo?.id_higiene}`
      );
      if (res.status === 200) {
        set_obj_anexo(undefined)

        setMessage("Registo eliminado com sucesso!");
        setCreateTable(true)

        func_print('obj_anexo', obj_anexo)
        // set_flag_editar_Anexo(true)
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

      let res = await post("new_reg_anexo_quatro", {
        payload: {
          id_higiene: obj_anexo_new_or_edit?.id_higiene === undefined ? 0 : obj_anexo_new_or_edit?.id_higiene,
          entradas_previstas_capm_um: obj_anexo_new_or_edit?.entradas_previstas_capm_um === undefined ? '' : obj_anexo_new_or_edit?.entradas_previstas_capm_um,
          entradas_previstas_capm_dois: obj_anexo_new_or_edit?.entradas_previstas_capm_dois === undefined ? '' : obj_anexo_new_or_edit?.entradas_previstas_capm_dois,
          entradas_previstas_capm_tres: obj_anexo_new_or_edit?.entradas_previstas_capm_tres === undefined ? '' : obj_anexo_new_or_edit?.entradas_previstas_capm_tres,
          entradas_periodo_capm_um: obj_anexo_new_or_edit?.entradas_periodo_capm_um === undefined ? '' : obj_anexo_new_or_edit?.entradas_periodo_capm_um,
          entradas_periodo_capm_dois: obj_anexo_new_or_edit?.entradas_periodo_capm_dois === undefined ? '' : obj_anexo_new_or_edit?.entradas_periodo_capm_dois,
          entradas_periodo_capm_tres: obj_anexo_new_or_edit?.entradas_periodo_capm_tres === undefined ? '' : obj_anexo_new_or_edit?.entradas_periodo_capm_tres,
          limpeza_desinfecao_previstas_capm_um: obj_anexo_new_or_edit?.limpeza_desinfecao_previstas_capm_um === undefined ? '' : obj_anexo_new_or_edit?.limpeza_desinfecao_previstas_capm_um,
          limpeza_desinfecao_previstas_capm_dois: obj_anexo_new_or_edit?.limpeza_desinfecao_previstas_capm_dois === undefined ? '' : obj_anexo_new_or_edit?.limpeza_desinfecao_previstas_capm_dois,
          limpeza_desinfecao_periodo_capm_um: obj_anexo_new_or_edit?.limpeza_desinfecao_periodo_capm_um === undefined ? '' : obj_anexo_new_or_edit?.limpeza_desinfecao_periodo_capm_um,
          limpeza_desinfecao_periodo_capm_dois: obj_anexo_new_or_edit?.limpeza_desinfecao_periodo_capm_dois === undefined ? '' : obj_anexo_new_or_edit?.limpeza_desinfecao_periodo_capm_dois,
          controlo_animais_previstas_capm_um: obj_anexo_new_or_edit?.controlo_animais_previstas_capm_um === undefined ? '' : obj_anexo_new_or_edit?.controlo_animais_previstas_capm_um,
          controlo_animais_periodo_capm_um: obj_anexo_new_or_edit?.controlo_animais_periodo_capm_um === undefined ? '' : obj_anexo_new_or_edit?.controlo_animais_periodo_capm_um,
          controlo_qualidade_previstas_capm_um: obj_anexo_new_or_edit?.controlo_qualidade_previstas_capm_um === undefined ? '' : obj_anexo_new_or_edit?.controlo_qualidade_previstas_capm_um,
          controlo_qualidade_previstas_capm_dois: obj_anexo_new_or_edit?.controlo_qualidade_previstas_capm_dois === undefined ? '' : obj_anexo_new_or_edit?.controlo_qualidade_previstas_capm_dois,
          controlo_qualidade_periodo_capm_um: obj_anexo_new_or_edit?.controlo_qualidade_periodo_capm_um === undefined ? '' : obj_anexo_new_or_edit?.controlo_qualidade_periodo_capm_um,
          controlo_qualidade_periodo_capm_dois: obj_anexo_new_or_edit?.controlo_qualidade_periodo_capm_dois === undefined ? '' : obj_anexo_new_or_edit?.controlo_qualidade_periodo_capm_dois,
          controlo_armazenamento_previstas_capm_um: obj_anexo_new_or_edit?.controlo_armazenamento_previstas_capm_um === undefined ? '' : obj_anexo_new_or_edit?.controlo_armazenamento_previstas_capm_um,
          controlo_armazenamento_periodo_capm_um: obj_anexo_new_or_edit?.controlo_armazenamento_periodo_capm_um === undefined ? '' : obj_anexo_new_or_edit?.controlo_armazenamento_periodo_capm_um,
          limpeza_alojamentos_previstas_capm_um: obj_anexo_new_or_edit?.limpeza_alojamentos_previstas_capm_um === undefined ? '' : obj_anexo_new_or_edit?.limpeza_alojamentos_previstas_capm_um,
          limpeza_alojamentos_previstas_capm_dois: obj_anexo_new_or_edit?.limpeza_alojamentos_previstas_capm_dois === undefined ? '' : obj_anexo_new_or_edit?.limpeza_alojamentos_previstas_capm_dois,
          limpeza_alojamentos_previstas_capm_tres: obj_anexo_new_or_edit?.limpeza_alojamentos_previstas_capm_tres === undefined ? '' : obj_anexo_new_or_edit?.limpeza_alojamentos_previstas_capm_tres,
          limpeza_alojamentos_periodo_capm_um: obj_anexo_new_or_edit?.limpeza_alojamentos_periodo_capm_um === undefined ? '' : obj_anexo_new_or_edit?.limpeza_alojamentos_periodo_capm_um,
          limpeza_alojamentos_periodo_capm_dois: obj_anexo_new_or_edit?.limpeza_alojamentos_periodo_capm_dois === undefined ? '' : obj_anexo_new_or_edit?.limpeza_alojamentos_periodo_capm_dois,
          limpeza_alojamentos_periodo_capm_tres: obj_anexo_new_or_edit?.limpeza_alojamentos_periodo_capm_tres === undefined ? '' : obj_anexo_new_or_edit?.limpeza_alojamentos_periodo_capm_tres,
          remocao_previstas_capm_um: obj_anexo_new_or_edit?.remocao_previstas_capm_um === undefined ? '' : obj_anexo_new_or_edit?.remocao_previstas_capm_um,
          remocao_previstas_capm_dois: obj_anexo_new_or_edit?.remocao_previstas_capm_dois === undefined ? '' : obj_anexo_new_or_edit?.remocao_previstas_capm_dois,
          remocao_periodo_capm_um: obj_anexo_new_or_edit?.remocao_periodo_capm_um === undefined ? '' : obj_anexo_new_or_edit?.remocao_periodo_capm_um,
          remocao_periodo_capm_dois: obj_anexo_new_or_edit?.remocao_periodo_capm_dois === undefined ? '' : obj_anexo_new_or_edit?.remocao_periodo_capm_dois,
          id_rosto: location.state.id_rosto,
          last_update: new Date().toISOString(),
          create_date: new Date().toISOString(),
          uuid: obj_anexo_new_or_edit?.uuid === undefined ? '' : obj_anexo_new_or_edit?.uuid,
        }
      });

      if (res.status === 200) {
        setMessage("Gravado com sucesso!");
        setOpenSnackSuccess(true);
        reset_flags()
        set_obj_anexo(res.data.result);
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

  const handleCloseSnack = () => {

    setOpenSnackSuccess(false);
    setOpenSnackError(false);
  };
  const onInputChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    let aux_obj_anexo: any = obj_anexo_new_or_edit === undefined ? {} : obj_anexo_new_or_edit

    if (type === "checkbox") {
      aux_obj_anexo[name] = aux_obj_anexo[name] === undefined ? true : !aux_obj_anexo[name]
      set_obj_anexo_new_or_edit(aux_obj_anexo);

    } else {

      set_obj_anexo_new_or_edit((old: any) => ({
        ...old,
        [name]: value,
      }));
    }


  };
  const handle_aoClicarGravar = () => {

    if (flag_editar_Anexo === false) {
      handle_create_anexo()
    } else {
      handle_update_anexo()
    }

  }

  const handle_aoClicarCancelar = () => {

    if (createTable) {
      navigate(-1)
      setCreateTable(false)
    } else {
      set_flag_editar_Anexo(false)

    }
  }

  return (
    <div className={classes.root}>
      <CadernoLayout title="Anexo IV - Plano Boas Práticas de Higiene" />
      <main className={classes.contents}>
        <div className={classes.toolbars} />

        {isLoading && <LoadingVulpes />}

        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ height: "auto", width: "auto", m: 2, padding: 2 }}
        >
          <table style={{ width: "100%" }}>
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

            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={2}
                  sx={{
                    fontWeight: 700,
                    fontSize: 18,
                    fontFamily: "candara",
                  }}
                >
                  Anexo 4 - Plano Boas Práticas de Higiene
                  <BasicPopover
                    text={
                      "Preencher apenas para AB ou PRODI.\n\nDescrever sucintamente as medidas preventivas de carácter sanitário que o produtor planeia adotar em relação a cada um dos parâmetros referidos, quando aplicável. O agricultor deve apresentar um plano contendo a informação solicitada neste anexo. Este modelo é um guia de orientação, não obrigatório"
                    }
                  />
                </TableCell>
                <TableCell>
                  <Box width="100%" height="auto" justifyContent="end">
                    <Stack direction="row" justifyContent="right">
                      {
                        flag_editar_Anexo === false && createTable === false ?
                          <Box
                            sx={{
                              justifyContent: "end",
                              display: "flex",
                            }}
                          >
                            <ButtonCadernos
                              mostrarBotaoEditar

                              aoClicarEditar={() => {
                                set_flag_editar_Anexo(true)
                                set_obj_anexo_new_or_edit(obj_anexo)

                              }}
                            />
                            <ButtonCadernos

                              mostrarBotaoApagar
                              aoClicarApagar={() => (set_open_dialog_tem_a_certeza_que_quer_eliminar(true))}
                            />


                          </Box>
                          : <><ButtonCadernos
                            mostrarBotaoGravar
                            aoClicarGravar={() => { handle_aoClicarGravar() }}
                          
                          />
                            {typeof obj_anexo === 'undefined' ? <></> :
                              <ButtonCadernos
                                mostrarBotaoCancelar
                                aoClicarCancelar={() => { handle_aoClicarCancelar() }}
                              />
                            }
                          </>
                      }
                    </Stack>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <StyledTableHead width={350} height={50}>
                  Parâmetro
                </StyledTableHead>
                <StyledTableHead height={50}>
                  Medidas Higiosanitárias e de Biosegurança Previstas
                </StyledTableHead>
                <StyledTableHead width={200} height={50}>
                  Período
                </StyledTableHead>
              </TableRow>
              <TableRow>
                <StyledTableHeadLeft colSpan={3}>
                  Controlo de Entrada na Exploração
                </StyledTableHeadLeft>
              </TableRow>
              <TableRow>
                <StyledTableCellBaseLeft>
                  Veículos (ex.: rodilúvio, arcos de desinfeção)
                </StyledTableCellBaseLeft>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="entradas_previstas_capm_um"
                        value={obj_anexo_new_or_edit?.entradas_previstas_capm_um === undefined ? '' : obj_anexo_new_or_edit?.entradas_previstas_capm_um}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.entradas_previstas_capm_um
                  }
                </StyledTableCell>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="entradas_periodo_capm_um"
                        value={obj_anexo_new_or_edit?.entradas_periodo_capm_um === undefined ? '' : obj_anexo_new_or_edit?.entradas_periodo_capm_um}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.entradas_periodo_capm_um
                  }

                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCellBaseLeft>
                  Pessoas (ex.: barreira física, pedilúvio, vestiário, outras)
                </StyledTableCellBaseLeft>
                <StyledTableCell>

                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="entradas_previstas_capm_dois"
                        value={obj_anexo_new_or_edit?.entradas_previstas_capm_dois === undefined ? '' : obj_anexo_new_or_edit?.entradas_previstas_capm_dois}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.entradas_previstas_capm_dois
                  }
                </StyledTableCell>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="entradas_periodo_capm_dois"
                        value={obj_anexo_new_or_edit?.entradas_periodo_capm_dois === undefined ? '' : obj_anexo_new_or_edit?.entradas_periodo_capm_dois}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.entradas_periodo_capm_dois
                  }
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCellBaseLeft>
                  Animais (ex.: barreira física /limites)
                </StyledTableCellBaseLeft>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="entradas_previstas_capm_tres"
                        value={obj_anexo_new_or_edit?.entradas_previstas_capm_tres === undefined ? '' : obj_anexo_new_or_edit?.entradas_previstas_capm_tres}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.entradas_previstas_capm_tres
                  }
                </StyledTableCell>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="entradas_periodo_capm_tres"
                        value={obj_anexo_new_or_edit?.entradas_periodo_capm_tres === undefined ? '' : obj_anexo_new_or_edit?.entradas_periodo_capm_tres}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.entradas_periodo_capm_tres
                  }
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHeadLeft colSpan={3}>
                  Limpeza e desinfeção dos veículos de transporte
                </StyledTableHeadLeft>
              </TableRow>
              <TableRow>
                <StyledTableCellBaseLeft>
                  Produtos a utilizar na lavagem e na desinfeção
                </StyledTableCellBaseLeft>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="limpeza_desinfecao_previstas_capm_um"
                        value={obj_anexo_new_or_edit?.limpeza_desinfecao_previstas_capm_um === undefined ? '' : obj_anexo_new_or_edit?.limpeza_desinfecao_previstas_capm_um}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.limpeza_desinfecao_previstas_capm_um
                  }
                </StyledTableCell>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="limpeza_desinfecao_periodo_capm_um"
                        value={obj_anexo_new_or_edit?.limpeza_desinfecao_periodo_capm_um === undefined ? '' : obj_anexo_new_or_edit?.limpeza_desinfecao_periodo_capm_um}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.limpeza_desinfecao_periodo_capm_um
                  }
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCellBaseLeft>
                  Centro de lavagem e desinfeção (se utilizado)
                </StyledTableCellBaseLeft>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="limpeza_desinfecao_previstas_capm_dois"
                        value={obj_anexo_new_or_edit?.limpeza_desinfecao_previstas_capm_dois === undefined ? '' : obj_anexo_new_or_edit?.limpeza_desinfecao_previstas_capm_dois}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.limpeza_desinfecao_previstas_capm_dois
                  }
                </StyledTableCell>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="limpeza_desinfecao_periodo_capm_dois"
                        value={obj_anexo_new_or_edit?.limpeza_desinfecao_periodo_capm_dois === undefined ? '' : obj_anexo_new_or_edit?.limpeza_desinfecao_periodo_capm_dois}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.limpeza_desinfecao_periodo_capm_dois
                  }
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHeadLeft colSpan={3}>
                  Controlo de animais domésticos e selvagens
                </StyledTableHeadLeft>
              </TableRow>
              <TableRow>
                <StyledTableCellBaseLeft>
                  Controlo de roedores e/ou de insetos
                </StyledTableCellBaseLeft>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="controlo_animais_previstas_capm_um"
                        value={obj_anexo_new_or_edit?.controlo_animais_previstas_capm_um === undefined ? '' : obj_anexo_new_or_edit?.controlo_animais_previstas_capm_um}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.controlo_animais_previstas_capm_um
                  }
                </StyledTableCell>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="controlo_animais_periodo_capm_um"
                        value={obj_anexo_new_or_edit?.controlo_animais_periodo_capm_um === undefined ? '' : obj_anexo_new_or_edit?.controlo_animais_periodo_capm_um}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.controlo_animais_periodo_capm_um
                  }
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHeadLeft colSpan={3}>
                  Controlo da qualidade da água
                </StyledTableHeadLeft>
              </TableRow>
              <TableRow>
                <StyledTableCellBaseLeft>
                  Proveniência / renovação
                </StyledTableCellBaseLeft>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="controlo_qualidade_previstas_capm_um"
                        value={obj_anexo_new_or_edit?.controlo_qualidade_previstas_capm_um === undefined ? '' : obj_anexo_new_or_edit?.controlo_qualidade_previstas_capm_um}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.controlo_qualidade_previstas_capm_um
                  }
                </StyledTableCell>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="controlo_qualidade_periodo_capm_um"
                        value={obj_anexo_new_or_edit?.controlo_qualidade_periodo_capm_um === undefined ? '' : obj_anexo_new_or_edit?.controlo_qualidade_periodo_capm_um}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.controlo_qualidade_periodo_capm_um
                  }
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCellBaseLeft>
                  Plano de análise de águas
                </StyledTableCellBaseLeft>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="controlo_qualidade_previstas_capm_dois"
                        value={obj_anexo_new_or_edit?.controlo_qualidade_previstas_capm_dois === undefined ? '' : obj_anexo_new_or_edit?.controlo_qualidade_previstas_capm_dois}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.controlo_qualidade_previstas_capm_dois
                  }
                </StyledTableCell>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="controlo_qualidade_periodo_capm_dois"
                        value={obj_anexo_new_or_edit?.controlo_qualidade_periodo_capm_dois === undefined ? '' : obj_anexo_new_or_edit?.controlo_qualidade_periodo_capm_dois}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.controlo_qualidade_periodo_capm_dois
                  }
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCellBaseLeft>
                  Controlo da armazenagem dos alimentos
                </StyledTableCellBaseLeft>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="controlo_armazenamento_previstas_capm_um"
                        value={obj_anexo_new_or_edit?.controlo_armazenamento_previstas_capm_um === undefined ? '' : obj_anexo_new_or_edit?.controlo_armazenamento_previstas_capm_um}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.controlo_armazenamento_previstas_capm_um
                  }
                </StyledTableCell>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="controlo_armazenamento_periodo_capm_um"
                        value={obj_anexo_new_or_edit?.controlo_armazenamento_periodo_capm_um === undefined ? '' : obj_anexo_new_or_edit?.controlo_armazenamento_periodo_capm_um}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.controlo_armazenamento_periodo_capm_um
                  }
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHeadLeft colSpan={3}>
                  Limpeza, lavagem, desinfeção e manutenção de alojamentos e
                  equipamentos
                </StyledTableHeadLeft>
              </TableRow>
              <TableRow>
                <StyledTableCellBaseLeft>
                  Lavagem e desinfeção de instalações
                </StyledTableCellBaseLeft>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="limpeza_alojamentos_previstas_capm_um"
                        value={obj_anexo_new_or_edit?.limpeza_alojamentos_previstas_capm_um === undefined ? '' : obj_anexo_new_or_edit?.limpeza_alojamentos_previstas_capm_um}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.limpeza_alojamentos_previstas_capm_um
                  }
                </StyledTableCell>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="limpeza_alojamentos_periodo_capm_um"
                        value={obj_anexo_new_or_edit?.limpeza_alojamentos_periodo_capm_um === undefined ? '' : obj_anexo_new_or_edit?.limpeza_alojamentos_periodo_capm_um}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.limpeza_alojamentos_periodo_capm_um
                  }
                  {/* {obj_anexo?.limpeza_alojamentos_periodo_capm_um} */}
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCellBaseLeft>
                  Limpeza de equipamentos
                </StyledTableCellBaseLeft>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="limpeza_alojamentos_previstas_capm_dois"
                        value={obj_anexo_new_or_edit?.limpeza_alojamentos_previstas_capm_dois === undefined ? '' : obj_anexo_new_or_edit?.limpeza_alojamentos_previstas_capm_dois}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.limpeza_alojamentos_previstas_capm_dois
                  }
                </StyledTableCell>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="limpeza_alojamentos_periodo_capm_dois"
                        value={obj_anexo_new_or_edit?.limpeza_alojamentos_periodo_capm_dois === undefined ? '' : obj_anexo_new_or_edit?.limpeza_alojamentos_periodo_capm_dois}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.limpeza_alojamentos_periodo_capm_dois
                  }
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCellBaseLeft>
                  Vazio sanitário (ex.: instalações, rotação de pastagens)
                </StyledTableCellBaseLeft>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="limpeza_alojamentos_previstas_capm_tres"
                        value={obj_anexo_new_or_edit?.limpeza_alojamentos_previstas_capm_tres === undefined ? '' : obj_anexo_new_or_edit?.limpeza_alojamentos_previstas_capm_tres}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.limpeza_alojamentos_previstas_capm_tres
                  }
                </StyledTableCell>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="limpeza_alojamentos_periodo_capm_tres"
                        value={obj_anexo_new_or_edit?.limpeza_alojamentos_periodo_capm_tres === undefined ? '' : obj_anexo_new_or_edit?.limpeza_alojamentos_periodo_capm_tres}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.limpeza_alojamentos_periodo_capm_tres
                  }
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHeadLeft colSpan={3}>
                  Remoção de camas e dejetos
                </StyledTableHeadLeft>
              </TableRow>
              <TableRow>
                <StyledTableCellBaseLeft>
                  Periodicidade
                </StyledTableCellBaseLeft>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="remocao_previstas_capm_um"
                        value={obj_anexo_new_or_edit?.remocao_previstas_capm_um === undefined ? '' : obj_anexo_new_or_edit?.remocao_previstas_capm_um}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.remocao_previstas_capm_um
                  }
                </StyledTableCell>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="remocao_periodo_capm_um"
                        value={obj_anexo_new_or_edit?.remocao_periodo_capm_um === undefined ? '' : obj_anexo_new_or_edit?.remocao_periodo_capm_um}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.remocao_periodo_capm_um
                  }
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCellBaseLeft>
                  Destino (espalhamento, compostagem, outros)
                </StyledTableCellBaseLeft>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="remocao_previstas_capm_dois"
                        value={obj_anexo_new_or_edit?.remocao_previstas_capm_dois === undefined ? '' : obj_anexo_new_or_edit?.remocao_previstas_capm_dois}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.remocao_previstas_capm_dois
                  }
                </StyledTableCell>
                <StyledTableCell>
                  {

                    createTable === true || flag_editar_Anexo === true ?
                      <CustomTextField

                        name="remocao_periodo_capm_dois"
                        value={obj_anexo_new_or_edit?.remocao_periodo_capm_dois === undefined ? '' : obj_anexo_new_or_edit?.remocao_periodo_capm_dois}
                        onChange={onInputChange}
                      /> :
                      obj_anexo?.remocao_periodo_capm_dois
                  }
                </StyledTableCell>
              </TableRow>
            </TableBody>

          </table>
        </TableContainer>

        <ConfirmDialog
          open={open_dialog_tem_a_certeza_que_quer_eliminar}
          onClose={() => set_open_dialog_tem_a_certeza_que_quer_eliminar(false)}
          onConfirm={handle_delete_anexo}
          message="Deseja eliminar o registo?"
        />
      </main>
    </div>
  );
};
export default Anexo4;