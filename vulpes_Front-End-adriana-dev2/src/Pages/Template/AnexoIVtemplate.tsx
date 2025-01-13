import React, { ChangeEvent, useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Snackbar, Stack } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Box, Paper } from "@mui/material";
import Layout from "../../Styles/layout/index";
import { del, get, post } from "../../Services/tokenConfig";
import LoadingVulpes from "../../Styles/Loader/loading";
import BasicPopover from "../../Components/Popover";
import {
  StyledTableCell,
  StyledTableCellBaseLeft,
  StyledTableHead,
  StyledTableHeadLeft,
} from "../../Styles/tabelCellStyled/customTableCell";
import ConfirmDialog from "../../Components/CustomDialog/customdialog";
import { func_print } from "../../Func_genericas/func_print";
import { IAnexo4 } from "../../Interfaces/anexos/anexo4";
import { CustomTextField } from "../../Styles/theme/customThemeprovider";
import { ButtonCadernos } from "../../Components/barra-de-ferramentas/ButtonCadernos";
import { Alert } from "../../Components/Alert/Alert";


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




const AnexoIVtemplate = () => {
  const Location = useLocation();
  const navigate = useNavigate();

  const classes = useStyles();
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const [message, setMessage] = useState("");
  const [open_dialog_tem_a_certeza_que_quer_eliminar, set_open_dialog_tem_a_certeza_que_quer_eliminar] = useState(false);
  const [createTable, setCreateTable] = useState(false);
  const [flag_editar_Anexo, set_flag_editar_Anexo] = useState(false);
  const [obj_anexo, set_obj_anexo] = useState<IAnexo4>();
  const [params, set_params] = React.useState<any>(Location.state);

  const [isLoading, setIsLoading] = useState(true);
  const [anexo, setAnexo] = useState<IAnexo4>()

  const get_info = async () => {
    try {
      let res = await get(
        `/get_template_anexo_quatro_template_id/${params.id_template_params}`
      );
      if (res.status === 200) {
        if (res.data.result.length !== 0) {
          set_obj_anexo(res.data.result[0]);
          setAnexo(res.data.result[0]);
          setCreateTable(false);
        } else {
          setAnexo((old: any) => ({
            ...old,
            id_template: params.id_template_params,
          }));
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

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setAnexo((prevAnaliseTerras: any) => ({
      ...prevAnaliseTerras,
      [name]: value,
    }));
  };
  const handle_update_anexo = async () => {
    try {
      setIsLoading(true);

      
      let res = await post("update_template_anexo_quatro", {
        payload:
        {
          id_higiene: anexo?.id_higiene === undefined ? 0 : anexo?.id_higiene,
          id_template: anexo?.id_template === undefined ? 0 : anexo?.id_template,
          entradas_previstas_capm_um: anexo?.entradas_previstas_capm_um === undefined ? '' : anexo?.entradas_previstas_capm_um,
          entradas_previstas_capm_dois: anexo?.entradas_previstas_capm_dois === undefined ? '' : anexo?.entradas_previstas_capm_dois,
          entradas_previstas_capm_tres: anexo?.entradas_previstas_capm_tres === undefined ? '' : anexo?.entradas_previstas_capm_tres,
          entradas_periodo_capm_um: anexo?.entradas_periodo_capm_um === undefined ? '' : anexo?.entradas_periodo_capm_um,
          entradas_periodo_capm_dois: anexo?.entradas_periodo_capm_dois === undefined ? '' : anexo?.entradas_periodo_capm_dois,
          entradas_periodo_capm_tres: anexo?.entradas_periodo_capm_tres === undefined ? '' : anexo?.entradas_periodo_capm_tres,
          limpeza_desinfecao_previstas_capm_um: anexo?.limpeza_desinfecao_previstas_capm_um === undefined ? '' : anexo?.limpeza_desinfecao_previstas_capm_um,
          limpeza_desinfecao_previstas_capm_dois: anexo?.limpeza_desinfecao_previstas_capm_dois === undefined ? '' : anexo?.limpeza_desinfecao_previstas_capm_dois,

          limpeza_desinfecao_periodo_capm_um: anexo?.limpeza_desinfecao_periodo_capm_um === undefined ? '' : anexo?.limpeza_desinfecao_periodo_capm_um,
          limpeza_desinfecao_periodo_capm_dois: anexo?.limpeza_desinfecao_periodo_capm_dois === undefined ? '' : anexo?.limpeza_desinfecao_periodo_capm_dois,

          controlo_animais_previstas_capm_um: anexo?.controlo_animais_previstas_capm_um === undefined ? '' : anexo?.controlo_animais_previstas_capm_um,
          controlo_animais_periodo_capm_um: anexo?.controlo_animais_periodo_capm_um === undefined ? '' : anexo?.controlo_animais_periodo_capm_um,

          controlo_qualidade_previstas_capm_um: anexo?.controlo_qualidade_previstas_capm_um === undefined ? '' : anexo?.controlo_qualidade_previstas_capm_um,
          controlo_qualidade_previstas_capm_dois: anexo?.controlo_qualidade_previstas_capm_dois === undefined ? '' : anexo?.controlo_qualidade_previstas_capm_dois,

          controlo_qualidade_periodo_capm_um: anexo?.controlo_qualidade_periodo_capm_um === undefined ? '' : anexo?.controlo_qualidade_periodo_capm_um,
          controlo_qualidade_periodo_capm_dois: anexo?.controlo_qualidade_periodo_capm_dois === undefined ? '' : anexo?.controlo_qualidade_periodo_capm_dois,

          controlo_armazenamento_previstas_capm_um: anexo?.controlo_armazenamento_previstas_capm_um === undefined ? '' : anexo?.controlo_armazenamento_previstas_capm_um,

          controlo_armazenamento_periodo_capm_um: anexo?.controlo_armazenamento_periodo_capm_um === undefined ? '' : anexo?.controlo_armazenamento_periodo_capm_um,

          limpeza_alojamentos_previstas_capm_um: anexo?.limpeza_alojamentos_previstas_capm_um === undefined ? '' : anexo?.limpeza_alojamentos_previstas_capm_um,
          limpeza_alojamentos_previstas_capm_dois: anexo?.limpeza_alojamentos_previstas_capm_dois === undefined ? '' : anexo?.limpeza_alojamentos_previstas_capm_dois,
          limpeza_alojamentos_previstas_capm_tres: anexo?.limpeza_alojamentos_previstas_capm_tres === undefined ? '' : anexo?.limpeza_alojamentos_previstas_capm_tres,
          limpeza_alojamentos_periodo_capm_um: anexo?.limpeza_alojamentos_periodo_capm_um === undefined ? '' : anexo?.limpeza_alojamentos_periodo_capm_um,
          limpeza_alojamentos_periodo_capm_dois: anexo?.limpeza_alojamentos_periodo_capm_dois === undefined ? '' : anexo?.limpeza_alojamentos_periodo_capm_dois,
          limpeza_alojamentos_periodo_capm_tres: anexo?.limpeza_alojamentos_periodo_capm_tres === undefined ? '' : anexo?.limpeza_alojamentos_periodo_capm_tres,

          remocao_previstas_capm_um: anexo?.remocao_previstas_capm_um === undefined ? '' : anexo?.remocao_previstas_capm_um,
          remocao_previstas_capm_dois: anexo?.remocao_previstas_capm_dois === undefined ? '' : anexo?.remocao_previstas_capm_dois,

          remocao_periodo_capm_um: anexo?.remocao_periodo_capm_um === undefined ? '' : anexo?.remocao_periodo_capm_um,
          remocao_periodo_capm_dois: anexo?.remocao_periodo_capm_dois === undefined ? '' : anexo?.remocao_periodo_capm_dois,

          id_rosto: Location.state.id_rosto,
          last_update: new Date().toISOString(),
          create_date: new Date().toISOString(),
          uuid: ''
        }
      });

      if (res.status === 200) {
        setMessage("Gravado com sucesso!");

        setOpenSnackSuccess(true);
        set_obj_anexo(res.data.result);
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
        `delete_template_anexo_quatro/${obj_anexo?.id_higiene}`
      );
      if (res.status === 200) {
        setMessage("Registo eliminado com sucesso!");


        set_open_dialog_tem_a_certeza_que_quer_eliminar(false);
        setOpenSnackSuccess(true);
        navigate(-1);
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

      let res = await post("new_template_anexo_quatro", {
        payload: {
          id_higiene: 0,
          id_template: params.id_template_params,
          entradas_previstas_capm_um: anexo?.entradas_previstas_capm_um === undefined ? '' : anexo?.entradas_previstas_capm_um,
          entradas_previstas_capm_dois: anexo?.entradas_previstas_capm_dois === undefined ? '' : anexo?.entradas_previstas_capm_dois,
          entradas_previstas_capm_tres: anexo?.entradas_previstas_capm_tres === undefined ? '' : anexo?.entradas_previstas_capm_tres,
          entradas_periodo_capm_um: anexo?.entradas_periodo_capm_um === undefined ? '' : anexo?.entradas_periodo_capm_um,
          entradas_periodo_capm_dois: anexo?.entradas_periodo_capm_dois === undefined ? '' : anexo?.entradas_periodo_capm_dois,
          entradas_periodo_capm_tres: anexo?.entradas_periodo_capm_tres === undefined ? '' : anexo?.entradas_periodo_capm_tres,
          limpeza_desinfecao_previstas_capm_um: anexo?.limpeza_desinfecao_previstas_capm_um === undefined ? '' : anexo?.limpeza_desinfecao_previstas_capm_um,
          limpeza_desinfecao_previstas_capm_dois: anexo?.limpeza_desinfecao_previstas_capm_dois === undefined ? '' : anexo?.limpeza_desinfecao_previstas_capm_dois,

          limpeza_desinfecao_periodo_capm_um: anexo?.limpeza_desinfecao_periodo_capm_um === undefined ? '' : anexo?.limpeza_desinfecao_periodo_capm_um,
          limpeza_desinfecao_periodo_capm_dois: anexo?.limpeza_desinfecao_periodo_capm_dois === undefined ? '' : anexo?.limpeza_desinfecao_periodo_capm_dois,

          controlo_animais_previstas_capm_um: anexo?.controlo_animais_previstas_capm_um === undefined ? '' : anexo?.controlo_animais_previstas_capm_um,
          controlo_animais_periodo_capm_um: anexo?.controlo_animais_periodo_capm_um === undefined ? '' : anexo?.controlo_animais_periodo_capm_um,

          controlo_qualidade_previstas_capm_um: anexo?.controlo_qualidade_previstas_capm_um === undefined ? '' : anexo?.controlo_qualidade_previstas_capm_um,
          controlo_qualidade_previstas_capm_dois: anexo?.controlo_qualidade_previstas_capm_dois === undefined ? '' : anexo?.controlo_qualidade_previstas_capm_dois,

          controlo_qualidade_periodo_capm_um: anexo?.controlo_qualidade_periodo_capm_um === undefined ? '' : anexo?.controlo_qualidade_periodo_capm_um,
          controlo_qualidade_periodo_capm_dois: anexo?.controlo_qualidade_periodo_capm_dois === undefined ? '' : anexo?.controlo_qualidade_periodo_capm_dois,

          controlo_armazenamento_previstas_capm_um: anexo?.controlo_armazenamento_previstas_capm_um === undefined ? '' : anexo?.controlo_armazenamento_previstas_capm_um,

          controlo_armazenamento_periodo_capm_um: anexo?.controlo_armazenamento_periodo_capm_um === undefined ? '' : anexo?.controlo_armazenamento_periodo_capm_um,

          limpeza_alojamentos_previstas_capm_um: anexo?.limpeza_alojamentos_previstas_capm_um === undefined ? '' : anexo?.limpeza_alojamentos_previstas_capm_um,
          limpeza_alojamentos_previstas_capm_dois: anexo?.limpeza_alojamentos_previstas_capm_dois === undefined ? '' : anexo?.limpeza_alojamentos_previstas_capm_dois,
          limpeza_alojamentos_previstas_capm_tres: anexo?.limpeza_alojamentos_previstas_capm_tres === undefined ? '' : anexo?.limpeza_alojamentos_previstas_capm_tres,
          limpeza_alojamentos_periodo_capm_um: anexo?.limpeza_alojamentos_periodo_capm_um === undefined ? '' : anexo?.limpeza_alojamentos_periodo_capm_um,
          limpeza_alojamentos_periodo_capm_dois: anexo?.limpeza_alojamentos_periodo_capm_dois === undefined ? '' : anexo?.limpeza_alojamentos_periodo_capm_dois,
          limpeza_alojamentos_periodo_capm_tres: anexo?.limpeza_alojamentos_periodo_capm_tres === undefined ? '' : anexo?.limpeza_alojamentos_periodo_capm_tres,

          remocao_previstas_capm_um: anexo?.remocao_previstas_capm_um === undefined ? '' : anexo?.remocao_previstas_capm_um,
          remocao_previstas_capm_dois: anexo?.remocao_previstas_capm_dois === undefined ? '' : anexo?.remocao_previstas_capm_dois,

          remocao_periodo_capm_um: anexo?.remocao_periodo_capm_um === undefined ? '' : anexo?.remocao_periodo_capm_um,
          remocao_periodo_capm_dois: anexo?.remocao_periodo_capm_dois === undefined ? '' : anexo?.remocao_periodo_capm_dois,

          id_rosto: Location.state.id_rosto,
          last_update: new Date().toISOString(),
          create_date: new Date().toISOString(),
          uuid: ''
        }
      });

      if (res.status === 200) {
        setMessage("Gravado com sucesso!");
        setOpenSnackSuccess(true);
        func_print('res.data.result', res.data.result)
        setAnexo(res.data.result)
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

  return (
    <div className={classes.root}>
      <Layout title="Anexo IV - Plano Boas Práticas de Higiene" />
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
                      "Preencher apenas para AB ou PRODI.\n\nDescrever sucintamente as medidas preventivas de carácter sanitário que o produtor planeia adotar em relação a cada um dos parâmetros referidos, quando aplicável. O agricultor deve apresentar um plano contendo a informação solicitada neste anexo?. Este modelo é um guia de orientação, não obrigatório"
                    }
                  />
                </TableCell>
                <TableCell>
                  <Box width="100%" height="auto" justifyContent="end">
                    <Stack direction="row" justifyContent="right">
                      {obj_anexo !== undefined &&
                        flag_editar_Anexo === false ? (
                        <Box
                          sx={{
                            justifyContent: "end",
                            display: "flex",
                          }}
                        >
                          <ButtonCadernos
                            mostrarBotaoEditar
                            aoClicarEditar={() => set_flag_editar_Anexo(true)}
                            mostrarBotaoApagar
                            aoClicarApagar={() => set_open_dialog_tem_a_certeza_que_quer_eliminar(true)}

                          />
                          {/* <BarraDeFerramentas
                            mostrarBotaoNovo
                            textoBotaoNovo="Editar anexo"
                            aoClicarNovo={() => set_flag_editar_Anexo(true)}
                          />
                          <BarraDeFerramentas
                            mostrarBotaoNovo
                            textoBotaoNovo="Eliminar anexo"
                            aoClicarNovo={() => set_open_dialog_tem_a_certeza_que_quer_eliminar(true)}
                          /> */}

                        </Box>
                      ) : (
                        <></>
                      )}
                    </Stack>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>

            {/*  {rowsanexo?.length <= 0 && createTable === false && <Anexo4Home />} */}

            {createTable === true ? (
              <>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Box sx={{ justifyContent: "end", display: "flex" }}>
                        <ButtonCadernos
                          mostrarBotaoGravar
                          aoClicarGravar={() => handle_create_anexo()}
                          mostrarBotaoCancelar
                          aoClicarCancelar={() => {
                            navigate(-1)
                            setCreateTable(false)
                          }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>

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
                      <CustomTextField
                        name="entradas_previstas_capm_um"
                        value={anexo?.entradas_previstas_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="entradas_periodo_capm_um"
                        value={anexo?.entradas_periodo_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Pessoas (ex.: barreira física, pedilúvio, vestiário, outras)
                    </StyledTableCellBaseLeft>
                    <StyledTableCell>
                      <CustomTextField
                        name="entradas_previstas_capm_dois"
                        value={anexo?.entradas_previstas_capm_dois}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="entradas_periodo_capm_dois"
                        value={anexo?.entradas_periodo_capm_dois}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Animais (ex.: barreira física /limites)
                    </StyledTableCellBaseLeft>
                    <StyledTableCell>
                      <CustomTextField
                        name="entradas_previstas_capm_tres"
                        value={anexo?.entradas_previstas_capm_tres}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="entradas_periodo_capm_tres"
                        value={anexo?.entradas_periodo_capm_tres}
                        onChange={onInputChange}
                      />
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
                      <CustomTextField
                        name="limpeza_desinfecao_previstas_capm_um"
                        value={anexo?.limpeza_desinfecao_previstas_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="limpeza_desinfecao_periodo_capm_um"
                        value={anexo?.limpeza_desinfecao_periodo_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Centro de lavagem e desinfeção (se utilizado)
                    </StyledTableCellBaseLeft>
                    <StyledTableCell>
                      <CustomTextField
                        name="limpeza_desinfecao_previstas_capm_dois"
                        value={anexo?.limpeza_desinfecao_previstas_capm_dois}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="limpeza_desinfecao_periodo_capm_dois"
                        value={anexo?.limpeza_desinfecao_periodo_capm_dois}
                        onChange={onInputChange}
                      />
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
                      <CustomTextField
                        name="controlo_animais_previstas_capm_um"
                        value={anexo?.controlo_animais_previstas_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="controlo_animais_periodo_capm_um"
                        value={anexo?.controlo_animais_periodo_capm_um}
                        onChange={onInputChange}
                      />
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
                      <CustomTextField
                        name="controlo_qualidade_previstas_capm_um"
                        value={anexo?.controlo_qualidade_previstas_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="controlo_qualidade_periodo_capm_um"
                        value={anexo?.controlo_qualidade_periodo_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Plano de análise de águas
                    </StyledTableCellBaseLeft>
                    <StyledTableCell>
                      <CustomTextField
                        name="controlo_qualidade_previstas_capm_dois"
                        value={anexo?.controlo_qualidade_previstas_capm_dois}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="controlo_qualidade_periodo_capm_dois"
                        value={anexo?.controlo_qualidade_periodo_capm_dois}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Controlo da armazenagem dos alimentos
                    </StyledTableCellBaseLeft>
                    <StyledTableCell>
                      <CustomTextField
                        name="controlo_armazenamento_previstas_capm_um"
                        value={anexo?.controlo_armazenamento_previstas_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="controlo_armazenamento_periodo_capm_um"
                        value={anexo?.controlo_armazenamento_periodo_capm_um}
                        onChange={onInputChange}
                      />
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
                      <CustomTextField
                        name="limpeza_alojamentos_previstas_capm_um"
                        value={anexo?.limpeza_alojamentos_previstas_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="limpeza_alojamentos_periodo_capm_um"
                        value={anexo?.limpeza_alojamentos_periodo_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Limpeza de equipamentos
                    </StyledTableCellBaseLeft>
                    <StyledTableCell>
                      <CustomTextField
                        name="limpeza_alojamentos_previstas_capm_dois"
                        value={anexo?.limpeza_alojamentos_previstas_capm_dois}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="limpeza_alojamentos_periodo_capm_dois"
                        value={anexo?.limpeza_alojamentos_periodo_capm_dois}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Vazio sanitário (ex.: instalações, rotação de pastagens)
                    </StyledTableCellBaseLeft>
                    <StyledTableCell>
                      <CustomTextField
                        name="limpeza_alojamentos_previstas_capm_tres"
                        value={anexo?.limpeza_alojamentos_previstas_capm_tres}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="limpeza_alojamentos_periodo_capm_tres"
                        value={anexo?.limpeza_alojamentos_periodo_capm_tres}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft colSpan={3}>
                      <strong>Remoção de camas e dejetos</strong>
                    </StyledTableHeadLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>Periodicidade</StyledTableCellBaseLeft>
                    <StyledTableCell>
                      <CustomTextField
                        name="remocao_previstas_capm_um"
                        value={anexo?.remocao_previstas_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="remocao_periodo_capm_um"
                        value={anexo?.remocao_periodo_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Destino (espalhamento, compostagem, outros)
                    </StyledTableCellBaseLeft>
                    <StyledTableCell>
                      <CustomTextField
                        name="remocao_previstas_capm_dois"
                        value={anexo?.remocao_previstas_capm_dois}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="remocao_periodo_capm_dois"
                        value={anexo?.remocao_periodo_capm_dois}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>

                  {/* <ConfirmDialog
                open={openDelete}
                onClose={handleCloseDelete}
                onConfirm={handleDelete}
                message="Deseja eliminar o registo?"
              /> */}
                </TableBody>
              </>
            ) : flag_editar_Anexo === true ? (
              <>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Box sx={{ justifyContent: "end", display: "flex" }}>
                        <ButtonCadernos
                          mostrarBotaoGravar
                          aoClicarGravar={() => handle_update_anexo()}
                          mostrarBotaoCancelar
                          aoClicarCancelar={() => set_flag_editar_Anexo(false)}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>

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
                      <CustomTextField
                        name="entradas_previstas_capm_um"
                        value={anexo?.entradas_previstas_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="entradas_periodo_capm_um"
                        value={anexo?.entradas_periodo_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Pessoas (ex.: barreira física, pedilúvio, vestiário, outras)
                    </StyledTableCellBaseLeft>
                    <StyledTableCell>
                      <CustomTextField
                        name="entradas_previstas_capm_dois"
                        value={anexo?.entradas_previstas_capm_dois}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="entradas_periodo_capm_dois"
                        value={anexo?.entradas_periodo_capm_dois}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Animais (ex.: barreira física /limites)
                    </StyledTableCellBaseLeft>
                    <StyledTableCell>
                      <CustomTextField
                        name="entradas_previstas_capm_tres"
                        value={anexo?.entradas_previstas_capm_tres}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="entradas_periodo_capm_tres"
                        value={anexo?.entradas_periodo_capm_tres}
                        onChange={onInputChange}
                      />
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
                      <CustomTextField
                        name="limpeza_desinfecao_previstas_capm_um"
                        value={anexo?.limpeza_desinfecao_previstas_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="limpeza_desinfecao_periodo_capm_um"
                        value={anexo?.limpeza_desinfecao_periodo_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Centro de lavagem e desinfeção (se utilizado)
                    </StyledTableCellBaseLeft>
                    <StyledTableCell>
                      <CustomTextField
                        name="limpeza_desinfecao_previstas_capm_dois"
                        value={anexo?.limpeza_desinfecao_previstas_capm_dois}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="limpeza_desinfecao_periodo_capm_dois"
                        value={anexo?.limpeza_desinfecao_periodo_capm_dois}
                        onChange={onInputChange}
                      />
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
                      <CustomTextField
                        name="controlo_animais_previstas_capm_um"
                        value={anexo?.controlo_animais_previstas_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="controlo_animais_periodo_capm_um"
                        value={anexo?.controlo_animais_periodo_capm_um}
                        onChange={onInputChange}
                      />
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
                      <CustomTextField
                        name="controlo_qualidade_previstas_capm_um"
                        value={anexo?.controlo_qualidade_previstas_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="controlo_qualidade_periodo_capm_um"
                        value={anexo?.controlo_qualidade_periodo_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Plano de análise de águas
                    </StyledTableCellBaseLeft>
                    <StyledTableCell>
                      <CustomTextField
                        name="controlo_qualidade_previstas_capm_dois"
                        value={anexo?.controlo_qualidade_previstas_capm_dois}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="controlo_qualidade_periodo_capm_dois"
                        value={anexo?.controlo_qualidade_periodo_capm_dois}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Controlo da armazenagem dos alimentos
                    </StyledTableCellBaseLeft>
                    <StyledTableCell>
                      <CustomTextField
                        name="controlo_armazenamento_previstas_capm_um"
                        value={anexo?.controlo_armazenamento_previstas_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="controlo_armazenamento_periodo_capm_um"
                        value={anexo?.controlo_armazenamento_periodo_capm_um}
                        onChange={onInputChange}
                      />
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
                      <CustomTextField
                        name="limpeza_alojamentos_previstas_capm_um"
                        value={anexo?.limpeza_alojamentos_previstas_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="limpeza_alojamentos_periodo_capm_um"
                        value={anexo?.limpeza_alojamentos_periodo_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Limpeza de equipamentos
                    </StyledTableCellBaseLeft>
                    <StyledTableCell>
                      <CustomTextField
                        name="limpeza_alojamentos_previstas_capm_dois"
                        value={anexo?.limpeza_alojamentos_previstas_capm_dois}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="limpeza_alojamentos_periodo_capm_dois"
                        value={anexo?.limpeza_alojamentos_periodo_capm_dois}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Vazio sanitário (ex.: instalações, rotação de pastagens)
                    </StyledTableCellBaseLeft>
                    <StyledTableCell>
                      <CustomTextField
                        name="limpeza_alojamentos_previstas_capm_tres"
                        value={anexo?.limpeza_alojamentos_previstas_capm_tres}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="limpeza_alojamentos_periodo_capm_tres"
                        value={anexo?.limpeza_alojamentos_periodo_capm_tres}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft colSpan={3}>
                      <strong>Remoção de camas e dejetos</strong>
                    </StyledTableHeadLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>Periodicidade</StyledTableCellBaseLeft>
                    <StyledTableCell>
                      <CustomTextField
                        name="remocao_previstas_capm_um"
                        value={anexo?.remocao_previstas_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="remocao_periodo_capm_um"
                        value={anexo?.remocao_periodo_capm_um}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Destino (espalhamento, compostagem, outros)
                    </StyledTableCellBaseLeft>
                    <StyledTableCell>
                      <CustomTextField
                        name="remocao_previstas_capm_dois"
                        value={anexo?.remocao_previstas_capm_dois}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="remocao_periodo_capm_dois"
                        value={anexo?.remocao_periodo_capm_dois}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>


                </TableBody>
              </>
            ) : (
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
                    {obj_anexo?.entradas_previstas_capm_um}
                  </StyledTableCell>
                  <StyledTableCell>
                    {obj_anexo?.entradas_periodo_capm_um}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCellBaseLeft>
                    Pessoas (ex.: barreira física, pedilúvio, vestiário, outras)
                  </StyledTableCellBaseLeft>
                  <StyledTableCell>
                    {obj_anexo?.entradas_previstas_capm_dois}
                  </StyledTableCell>
                  <StyledTableCell>
                    {obj_anexo?.entradas_periodo_capm_dois}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCellBaseLeft>
                    Animais (ex.: barreira física /limites)
                  </StyledTableCellBaseLeft>
                  <StyledTableCell>
                    {obj_anexo?.entradas_previstas_capm_tres}
                  </StyledTableCell>
                  <StyledTableCell>
                    {obj_anexo?.entradas_periodo_capm_tres}
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
                    {obj_anexo?.limpeza_desinfecao_previstas_capm_um}
                  </StyledTableCell>
                  <StyledTableCell>
                    {obj_anexo?.limpeza_desinfecao_periodo_capm_um}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCellBaseLeft>
                    Centro de lavagem e desinfeção (se utilizado)
                  </StyledTableCellBaseLeft>
                  <StyledTableCell>
                    {obj_anexo?.limpeza_desinfecao_previstas_capm_dois}
                  </StyledTableCell>
                  <StyledTableCell>
                    {obj_anexo?.limpeza_desinfecao_periodo_capm_dois}
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
                    {obj_anexo?.controlo_animais_previstas_capm_um}
                  </StyledTableCell>
                  <StyledTableCell>
                    {obj_anexo?.controlo_animais_periodo_capm_um}
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
                    {obj_anexo?.controlo_qualidade_previstas_capm_um}
                  </StyledTableCell>
                  <StyledTableCell>
                    {obj_anexo?.controlo_qualidade_periodo_capm_um}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCellBaseLeft>
                    Plano de análise de águas
                  </StyledTableCellBaseLeft>
                  <StyledTableCell>
                    {obj_anexo?.controlo_qualidade_previstas_capm_dois}
                  </StyledTableCell>
                  <StyledTableCell>
                    {obj_anexo?.controlo_qualidade_periodo_capm_dois}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCellBaseLeft>
                    Controlo da armazenagem dos alimentos
                  </StyledTableCellBaseLeft>
                  <StyledTableCell>
                    {obj_anexo?.controlo_armazenamento_previstas_capm_um}
                  </StyledTableCell>
                  <StyledTableCell>
                    {obj_anexo?.controlo_armazenamento_periodo_capm_um}
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
                    {obj_anexo?.limpeza_alojamentos_previstas_capm_um}
                  </StyledTableCell>
                  <StyledTableCell>
                    {obj_anexo?.limpeza_alojamentos_periodo_capm_um}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCellBaseLeft>
                    Limpeza de equipamentos
                  </StyledTableCellBaseLeft>
                  <StyledTableCell>
                    {obj_anexo?.limpeza_alojamentos_previstas_capm_dois}
                  </StyledTableCell>
                  <StyledTableCell>
                    {obj_anexo?.limpeza_alojamentos_periodo_capm_dois}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCellBaseLeft>
                    Vazio sanitário (ex.: instalações, rotação de pastagens)
                  </StyledTableCellBaseLeft>
                  <StyledTableCell>
                    {obj_anexo?.limpeza_alojamentos_previstas_capm_tres}
                  </StyledTableCell>
                  <StyledTableCell>
                    {obj_anexo?.limpeza_alojamentos_periodo_capm_tres}
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
                    {obj_anexo?.remocao_previstas_capm_um}
                  </StyledTableCell>
                  <StyledTableCell>
                    {obj_anexo?.remocao_periodo_capm_um}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCellBaseLeft>
                    Destino (espalhamento, compostagem, outros)
                  </StyledTableCellBaseLeft>
                  <StyledTableCell>
                    {obj_anexo?.remocao_previstas_capm_dois}
                  </StyledTableCell>
                  <StyledTableCell>
                    {obj_anexo?.remocao_periodo_capm_dois}
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            )}
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
export default AnexoIVtemplate;