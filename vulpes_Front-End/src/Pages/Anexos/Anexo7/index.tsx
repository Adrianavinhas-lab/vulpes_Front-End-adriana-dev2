import React, { useEffect, useRef, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, FormGroup, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import { TableBody, TableHead } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import { TableContainer } from "@mui/material";
import CadernoLayout from "../../../Styles/layout/cadernoLayout";
import { del, get, post } from "../../../Services/tokenConfig";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
import { StyledTableCell, StyledTableCellBaseLeft, StyledTableHeadLeft, StyledTableHeadColor } from "../../../Styles/tabelCellStyled/customTableCell";
import { CustomTextField, CustomThemeProvider } from "../../../Styles/theme/customThemeprovider";
import { IAnexo7 } from "../../../Interfaces/anexos/anexo7";
import LoadingVulpes from "../../../Styles/Loader/loading";
import { func_print } from "../../../Func_genericas/func_print";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import { PatternFormat } from "react-number-format";
import { verify_nif } from "../../../Func_genericas/verify_nif";
import { isValidEmail } from "../../../Func_genericas/isValidEmail";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import BasicPopover from "../../../Components/Popover";
import { Alert } from "../../../Components/Alert/Alert";
import { operacao_erro } from "../../../Func_genericas/valores_estaticos";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    contents: {
      flexGrow: 1,
      padding: theme.spacing(0),
    },
    toolbars: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(2, 3),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  })
);





export default function Anexo7() {
  const classes = useStyles();
  const navigate = useNavigate();

  const location = useLocation();
  const obj_ref = useRef<IAnexo7>();


  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = React.useState("");
  const [obj_anexo, set_obj_anexo] = useState<IAnexo7>();
  const [obj_anexo_new_or_edit, set_obj_anexo_new_or_edit] = useState<IAnexo7>();
  const [flag_editar_Anexo, set_flag_editar_Anexo] = useState(false);
  const [open_dialog_tem_a_certeza_que_quer_eliminar, set_open_dialog_tem_a_certeza_que_quer_eliminar] = useState(false);
  const [flag_criar_novo_anexo, set_flag_criar_novo_anexo] = useState(false);
  const [flag_erro_nif, set_flag_erro_nif] = useState(false);
  const [flag_erro_nifap, set_flag_erro_nifap] = useState(false);
  const [flag_erro_email, set_flag_erro_email] = useState(false);
  const [flag_erro_email_s, set_flag_erro_email_s] = useState(false);

  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);


  const [error_aprovado_data, set_error_aprovado_data] = useState<boolean>(false)

  const handleCloseSnack = () => {

    setOpenSnackSuccess(false);
    setOpenSnackError(false);
  };


  const get_info = async () => {
    try {
      let res = await get(
        `/get_reg_anexo_sete_rosto/${location.state.id_rosto}`
      );
      if (res.status === 200) {
        if (res.data.result.length !== 0) {
          set_obj_anexo(res.data.result[0]);
          func_print('res.data.result[0]', res.data.result[0])
          obj_ref.current = res.data.result[0]
          set_flag_criar_novo_anexo(false);
        } else {

          set_flag_criar_novo_anexo(true);
        }
      } else {

        setMessage("Erro a carregar informação!");

        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("get_info", error, true);
      setMessage(operacao_erro);

      setOpenSnackError(true);
      setIsLoading(false);
    }
  };
  const reset_flags = () => {
    set_obj_anexo_new_or_edit(undefined)
    set_flag_editar_Anexo(false)
    set_open_dialog_tem_a_certeza_que_quer_eliminar(false)
    set_flag_criar_novo_anexo(false)
    set_flag_erro_nif(false)
    set_flag_erro_nifap(false)
    set_flag_erro_email(false)
    set_flag_erro_nifap(false)
  }


  const handle_update_anexo = async () => {
    try {
      let flag_valido_nif = false
      let flag_valido_email = false
      let flag_valido_email_s = false
      let flag_aprovado_data = false

      if ((obj_anexo_new_or_edit?.nif)?.length !== 0 && obj_anexo_new_or_edit?.nif !== undefined) {
        if (verify_nif(obj_anexo_new_or_edit?.nif) === false) {
          set_flag_erro_nif(true);
          flag_valido_nif = false;
        } else {
          set_flag_erro_nif(false);
          flag_valido_nif = true;
        }
      } else {
        set_flag_erro_nif(true);
        flag_valido_nif = false;
      }



      if ((obj_anexo_new_or_edit?.email)?.length !== 0 && obj_anexo_new_or_edit?.email !== undefined) {

        if (isValidEmail(obj_anexo_new_or_edit?.email) === false && (obj_anexo_new_or_edit?.email)?.length !== 0) {
          set_flag_erro_email(true);
          flag_valido_email = false;
        } else {
          set_flag_erro_email(false);
          flag_valido_email = true;
        }
      } else {
        set_flag_erro_email(true);
        flag_valido_email = false;
      }

      if ((obj_anexo_new_or_edit?.email_S)?.length !== 0 && obj_anexo_new_or_edit?.email_S !== undefined) {

        if (isValidEmail(obj_anexo_new_or_edit?.email_S) === false && (obj_anexo_new_or_edit?.email_S)?.length !== 0) {
          set_flag_erro_email_s(true);
          flag_valido_email_s = false;
        } else {
          set_flag_erro_email_s(false);
          flag_valido_email_s = true;
        }
      } else {
        set_flag_erro_email_s(true);
        flag_valido_email_s = false;
      }
      if (typeof obj_anexo_new_or_edit?.Aprovado_data === 'undefined' || obj_anexo_new_or_edit?.Aprovado_data.length === 0) {
        set_error_aprovado_data(true)
        flag_aprovado_data = false
      } else {
        set_error_aprovado_data(false)
        flag_aprovado_data = true
      }


      if (flag_aprovado_data === false || flag_valido_nif === false || flag_valido_email === false || flag_valido_email_s === false) {
        // set_flag_erro_aprovado_data(true)
        setMessage("Erro ao gravar, data ou outro dado inválido!");
        setOpenSnackError(true);

      } else {
        setIsLoading(true);

        let res = await post("update_reg_anexo_sete", { payload: obj_anexo_new_or_edit });

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
      }

    } catch (error) {
      func_print("handle_update_anexo", error, true);
      setMessage("Erro ao gravar!");

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
      let flag_valido_nif = false
      let flag_valido_email = false
      let flag_valido_email_s = false
      let flag_aprovado_data = false

      if ((obj_anexo_new_or_edit?.nif)?.length !== 0 && obj_anexo_new_or_edit?.nif !== undefined) {
        if (verify_nif(obj_anexo_new_or_edit?.nif) === false) {
          set_flag_erro_nif(true);
          flag_valido_nif = false;
        } else {
          set_flag_erro_nif(false);
          flag_valido_nif = true;
        }
      } else {
        set_flag_erro_nif(true);
        flag_valido_nif = false;
      }
      if (typeof obj_anexo_new_or_edit?.Aprovado_data === 'undefined') {
        set_error_aprovado_data(true)
        flag_aprovado_data = false
      } else {
        set_error_aprovado_data(false)
        flag_aprovado_data = true
      }


      if ((obj_anexo_new_or_edit?.email)?.length !== 0 && obj_anexo_new_or_edit?.email !== undefined) {

        if (isValidEmail(obj_anexo_new_or_edit?.email) === false) {
          set_flag_erro_email(true);
          flag_valido_email = false;
        } else {
          set_flag_erro_email(false);
          flag_valido_email = true;
        }
      } else {
        set_flag_erro_email(true);
        flag_valido_email = false;
      }

      if ((obj_anexo_new_or_edit?.email_S)?.length !== 0 && obj_anexo_new_or_edit?.email_S !== undefined) {

        if (isValidEmail(obj_anexo_new_or_edit?.email_S) === false && (obj_anexo_new_or_edit?.email_S)?.length !== 0) {
          set_flag_erro_email_s(true);
          flag_valido_email_s = false;
        } else {
          set_flag_erro_email_s(false);
          flag_valido_email_s = true;
        }
      } else {
        set_flag_erro_email_s(true);
        flag_valido_email_s = false;
      }

      if (flag_aprovado_data === false || flag_valido_nif === false || flag_valido_email === false || flag_valido_email_s === false) {
        // set_flag_erro_aprovado_data(true)
        setMessage("Erro ao gravar, data ou outro dado inválido1!");
        setOpenSnackError(true);

      } else {

        setIsLoading(true);

        let res = await post("new_reg_anexo_sete", {
          payload: {
            id_parcer: obj_anexo_new_or_edit?.id_parcer === undefined ? 0 : obj_anexo_new_or_edit?.id_parcer,
            nome: obj_anexo_new_or_edit?.nome === undefined ? '' : obj_anexo_new_or_edit?.nome,
            nif: obj_anexo_new_or_edit?.nif === undefined ? '' : obj_anexo_new_or_edit?.nif,
            nifap: obj_anexo_new_or_edit?.nifap === undefined ? '' : obj_anexo_new_or_edit?.nifap,
            morada: obj_anexo_new_or_edit?.morada === undefined ? '' : obj_anexo_new_or_edit?.morada,
            codig_postal: obj_anexo_new_or_edit?.codig_postal === undefined ? '' : obj_anexo_new_or_edit?.codig_postal,
            localizacao: obj_anexo_new_or_edit?.localizacao === undefined ? '' : obj_anexo_new_or_edit?.localizacao,
            email: obj_anexo_new_or_edit?.email === undefined ? '' : obj_anexo_new_or_edit?.email,
            cargo_s: obj_anexo_new_or_edit?.cargo_s === undefined ? '' : obj_anexo_new_or_edit?.cargo_s,
            nome_S: obj_anexo_new_or_edit?.nome_S === undefined ? '' : obj_anexo_new_or_edit?.nome_S,
            morada_S: obj_anexo_new_or_edit?.morada_S === undefined ? '' : obj_anexo_new_or_edit?.morada_S,
            email_S: obj_anexo_new_or_edit?.email_S === undefined ? '' : obj_anexo_new_or_edit?.email_S,
            local_sede_E: obj_anexo_new_or_edit?.local_sede_E === undefined ? '' : obj_anexo_new_or_edit?.local_sede_E,
            codigo_postal_E: obj_anexo_new_or_edit?.codigo_postal_E === undefined ? '' : obj_anexo_new_or_edit?.codigo_postal_E,
            freguesia_E: obj_anexo_new_or_edit?.freguesia_E === undefined ? '' : obj_anexo_new_or_edit?.freguesia_E,
            concelho_E: obj_anexo_new_or_edit?.concelho_E === undefined ? '' : obj_anexo_new_or_edit?.concelho_E,
            parcer_emitido: obj_anexo_new_or_edit?.parcer_emitido === undefined ? '' : obj_anexo_new_or_edit?.parcer_emitido,
            plano_ferti: obj_anexo_new_or_edit?.plano_ferti === undefined ? false : obj_anexo_new_or_edit?.plano_ferti,
            plano_gestao: obj_anexo_new_or_edit?.plano_gestao === undefined ? false : obj_anexo_new_or_edit?.plano_gestao,
            parecer: obj_anexo_new_or_edit?.parecer === undefined ? '' : obj_anexo_new_or_edit?.parecer,
            Aprovado_data: obj_anexo_new_or_edit?.Aprovado_data === undefined ? '' : dayjs(obj_anexo_new_or_edit?.Aprovado_data).format('YYYY-MM-DD'),
            nome_tec: obj_anexo_new_or_edit?.nome_tec === undefined ? '' : obj_anexo_new_or_edit?.nome_tec,
            assinatura: obj_anexo_new_or_edit?.assinatura === undefined ? '' : obj_anexo_new_or_edit?.assinatura,
            id_rosto: location.state.id_rosto,
            last_update: new Date().toISOString(),
            create_date: new Date().toISOString(),
            uuid: '',

          }
        });

        if (res.status === 200) {
          setMessage("Gravado com sucesso!");
          setOpenSnackSuccess(true);

          set_obj_anexo(res.data.result);
          reset_flags()
          set_flag_criar_novo_anexo(false);
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

  const handle_delete_anexo = async () => {
    try {
      setIsLoading(true);

      let res = await del(`delete_reg_anexo_sete/${obj_anexo?.id_parcer}`);

      if (res.status === 200) {
        setMessage("Registo eliminado com sucesso!");

        set_open_dialog_tem_a_certeza_que_quer_eliminar(false);
        setOpenSnackSuccess(true);
        set_obj_anexo(undefined)
        set_flag_criar_novo_anexo(true)
        // navigate(-1);
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

  const handle_aoClicarGravar = () => {

    if (flag_editar_Anexo === false) {
      handle_create_anexo()
    } else {
      handle_update_anexo()
    }

  }

  const handle_aoClicarCancelar = () => {



    if (flag_criar_novo_anexo) {
      navigate(-1)

      set_flag_criar_novo_anexo(false)
    } else {
      set_flag_editar_Anexo(false)

    }
    set_flag_criar_novo_anexo(false)
    set_flag_editar_Anexo(false)
    // set_obj_anexo(obj_ref.current)
    // func_print('obj_anexo_new_or_edit', obj_anexo_new_or_edit)
    // func_print('obj_anexo', obj_anexo)
    reset_flags()


  }
  const onInputChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    let aux_obj_anexo: any = obj_anexo_new_or_edit === undefined ? {} : obj_anexo_new_or_edit

    if (type === "checkbox") {
      aux_obj_anexo[name] = aux_obj_anexo[name] === undefined ? true : !aux_obj_anexo[name]
      set_obj_anexo_new_or_edit(aux_obj_anexo);

    } else {
      if (name === 'nif') {
        if (!/^\d+$/.test(value)) {
          set_flag_erro_nif(true)

        } else {
          set_flag_erro_nif(false)

        }
      }
      if (name === 'nifap') {
        if (!/^\d+$/.test(value)) {
          set_flag_erro_nifap(true)

        } else {
          set_flag_erro_nifap(false)

        }
      }



      set_obj_anexo_new_or_edit((old: any) => ({
        ...old,
        [name]: value,
      }));
      func_print('obj_anexo_new_or_edit.name', obj_anexo_new_or_edit)
      func_print('obj_anexo.name', obj_anexo)
    }


  };


  return (
    <div className={classes.root}>
      <CadernoLayout title="Anexo 7 - Emissão de Parecer" />
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
              sx={{ height: "auto", width: "auto", m: 2, padding: 2 }}
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
                        fontFamily: "candara",
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      Anexo 7 - Emissão de Parecer
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={7}>
                      {
                        flag_editar_Anexo === false && flag_criar_novo_anexo === false ?
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
                                const aux_obj_anexo = obj_anexo
                                set_obj_anexo_new_or_edit(aux_obj_anexo)

                              }}
                            />
                            <ButtonCadernos
                              mostrarBotaoApagar
                              aoClicarApagar={() => (set_open_dialog_tem_a_certeza_que_quer_eliminar(true))}
                            />
                          </Box>
                          :
                          <Stack direction="row" justifyContent="end">
                            <ButtonCadernos
                              mostrarBotaoGravar
                              aoClicarGravar={() => { handle_aoClicarGravar() }}
                            />
                            {typeof obj_anexo === 'undefined' ? <></> :
                              <ButtonCadernos
                                mostrarBotaoCancelar
                                aoClicarCancelar={() => { handle_aoClicarCancelar() }}
                              />
                            }

                          </Stack>
                      }
                    </TableCell>
                  </TableRow>
                </TableHead>



                <TableBody>


                  <TableRow>
                    <StyledTableHeadColor colSpan={4}>
                      Identificação do operador
                    </StyledTableHeadColor>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft width="20%">
                      Nome do Beneficiário
                    </StyledTableHeadLeft>
                    <StyledTableCell colSpan={3}>
                      {

                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField

                            name="nome"
                            value={obj_anexo_new_or_edit?.nome}
                            onChange={onInputChange}
                          /> :
                          obj_anexo?.nome
                      }
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>NIF </StyledTableHeadLeft>
                    <StyledTableCell colSpan={3}>
                      {

                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField
                            error={flag_erro_nif}
                            helperText={
                              flag_erro_nif === true ? "Número inválido" : ""
                            }

                            name="nif"
                            value={obj_anexo_new_or_edit?.nif}
                            onChange={onInputChange}
                          /> :
                          obj_anexo?.nif
                      }
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>NIFAP</StyledTableHeadLeft>
                    <StyledTableCell colSpan={3}>
                      {

                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField
                            error={flag_erro_nifap}
                            helperText={
                              flag_erro_nifap === true && (obj_anexo_new_or_edit?.nifap)?.length !== 0 ? "Número inválido" : ""
                            }
                            name="nifap"
                            value={obj_anexo_new_or_edit?.nifap}
                            onChange={onInputChange}
                          /> :
                          obj_anexo?.nifap
                      }
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Morada</StyledTableHeadLeft>
                    <StyledTableCell colSpan={3}>
                      {

                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField

                            name="morada"
                            value={obj_anexo_new_or_edit?.morada}
                            onChange={onInputChange}
                          /> :
                          obj_anexo?.morada
                      }
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Localização</StyledTableHeadLeft>
                    <StyledTableCell colSpan={3}>
                      {

                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField

                            name="localizacao"
                            value={obj_anexo_new_or_edit?.localizacao}
                            onChange={onInputChange}
                          /> :
                          obj_anexo?.localizacao
                      }
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>
                      Código Postal
                    </StyledTableHeadLeft>
                    <StyledTableCell colSpan={3}>
                      {

                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?

                          <PatternFormat
                            format="%%%%-%%%"
                            customInput={TextField}
                            variant="filled"
                            fullWidth
                            patternChar="%"
                            value={obj_anexo_new_or_edit?.codig_postal || ""}
                            name="codig_postal"
                            margin="normal"
                            onChange={(e: any) => onInputChange}
                          />

                          : obj_anexo?.codig_postal
                      }
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>
                      Correio electrónico
                    </StyledTableHeadLeft>
                    <StyledTableCell colSpan={3}>
                      {

                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField
                            error={flag_erro_email}
                            helperText={
                              flag_erro_email === true && (obj_anexo_new_or_edit?.email)?.length !== 0 ? "Email inválido" : ""
                            }
                            name="email"
                            value={obj_anexo_new_or_edit?.email}
                            onChange={onInputChange}
                          /> :
                          obj_anexo?.email
                      }
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadColor colSpan={4}>
                      Sócio gerente ou representante (Quando aplicável)
                    </StyledTableHeadColor>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Cargo</StyledTableHeadLeft>
                    <StyledTableCell colSpan={3}>
                      {

                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField

                            name="cargo_s"
                            value={obj_anexo_new_or_edit?.cargo_s}
                            onChange={onInputChange}
                          /> :
                          obj_anexo?.cargo_s
                      }
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Nome</StyledTableHeadLeft>
                    <StyledTableCell colSpan={3}>
                      {

                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField

                            name="nome_S"
                            value={obj_anexo_new_or_edit?.nome_S}
                            onChange={onInputChange}
                          /> :
                          obj_anexo?.nome_S
                      }
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Morada</StyledTableHeadLeft>
                    <StyledTableCell colSpan={3}>
                      {

                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField

                            name="morada_S"
                            value={obj_anexo_new_or_edit?.morada_S}
                            onChange={onInputChange}
                          /> :
                          obj_anexo?.morada_S
                      }
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>
                      Correio electrónico
                    </StyledTableHeadLeft>
                    <StyledTableCell colSpan={3}>
                      {

                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField
                            error={flag_erro_email_s}
                            helperText={
                              flag_erro_email_s === true && (obj_anexo_new_or_edit?.email_S)?.length !== 0 ? "Email inválido" : ""
                            }
                            name="email_S"
                            value={obj_anexo_new_or_edit?.email_S}
                            onChange={onInputChange}
                          /> :
                          obj_anexo?.email_S
                      }
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadColor colSpan={4}>
                      Identificação da exploração
                    </StyledTableHeadColor>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>
                      Local da sede
                    </StyledTableHeadLeft>
                    <StyledTableCell colSpan={3}>
                      {

                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField

                            name="local_sede_E"
                            value={obj_anexo_new_or_edit?.local_sede_E}
                            onChange={onInputChange}
                          /> :
                          obj_anexo?.local_sede_E
                      }
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Cód. Postal</StyledTableHeadLeft>
                    <StyledTableCell colSpan={3}>
                      {

                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?

                          <PatternFormat
                            format="%%%%-%%%"
                            customInput={TextField}
                            variant="filled"
                            fullWidth
                            patternChar="%"
                            value={obj_anexo_new_or_edit?.codigo_postal_E || ""}
                            name="codig_postal"
                            margin="normal"
                            onChange={(e: any) => onInputChange}
                          />

                          : obj_anexo?.codigo_postal_E
                      }
                    </StyledTableCell>

                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Freguesia</StyledTableHeadLeft>
                    <StyledTableCell colSpan={3}>
                      {

                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField

                            name="freguesia_E"
                            value={obj_anexo_new_or_edit?.freguesia_E}
                            onChange={onInputChange}
                          /> :
                          obj_anexo?.freguesia_E
                      }
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Concelho</StyledTableHeadLeft>
                    <StyledTableCell colSpan={3}>
                      {

                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField

                            name="concelho_E"
                            value={obj_anexo_new_or_edit?.concelho_E}
                            onChange={onInputChange}
                          /> :
                          obj_anexo?.concelho_E
                      }
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontFamily: "candara",
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      Parecer emitido por:
                    </TableCell>
                    <StyledTableCell colSpan={3}>
                      {

                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField

                            name="parcer_emitido"
                            value={obj_anexo_new_or_edit?.parcer_emitido}
                            onChange={onInputChange}
                          /> :
                          obj_anexo?.parcer_emitido
                      }
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontFamily: "candara",
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      Para:
                    </TableCell>

                    <TableCell>
                      {flag_criar_novo_anexo === false && flag_editar_Anexo === false ?
                        // <div style={{
                        //   backgroundColor: 'red',
                        //   flex: 1,
                        // }}>

                        //   <Typography fontFamily="candara" fontSize={16}>
                        //     Plano de Fertilização {(obj_anexo?.plano_ferti===undefined ? 'nada': obj_anexo?.plano_ferti).toString()}
                        //   </Typography>
                        // </div>
                        <FormGroup
                      >
                        <FormControlLabel
                          name="plano_ferti"
                          label={
                            <Typography fontFamily="candara" fontSize={16}>
                              Plano de Fertilização
                            </Typography>
                          }
                          value={obj_anexo?.plano_ferti}
                          aria-readonly
                          control={
                            <Checkbox
                            disabled={true}
                              defaultChecked={obj_anexo?.plano_ferti}
                              sx={{
                                color: "#aaaaaa",
                                "&.Mui-checked": {
                                  color: "#C94F1E",
                                },
                              }}
                            />
                          }
                        />
                      </FormGroup>
                        :
                        <FormGroup
                          onChange={onInputChange}
                        >
                          <FormControlLabel
                            name="plano_ferti"
                            label={
                              <Typography fontFamily="candara" fontSize={16}>
                                Plano de Fertilização
                              </Typography>
                            }
                            value={obj_anexo_new_or_edit?.plano_ferti}
                            aria-readonly
                            control={
                              <Checkbox
                                defaultChecked={obj_anexo_new_or_edit?.plano_ferti}
                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>
                      }

                    </TableCell>
                    <TableCell colSpan={2}>
                      <FormGroup onChange={onInputChange}>

                        <FormControlLabel
                          name="plano_gestao"
                          label={
                            <Typography fontFamily="candara" fontSize={14}>
                              Plano de Gestão do Pastoreio
                            </Typography>
                          }
                          aria-readonly
                          value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.plano_gestao : obj_anexo?.plano_gestao}

                          control={
                            <Checkbox
                              disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}

                              defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.plano_gestao : obj_anexo?.plano_gestao}

                              sx={{
                                color: "#aaaaaa",
                                "&.Mui-checked": {
                                  color: "#C94F1E",
                                },
                              }}
                            />
                          }
                        />
                      </FormGroup>

                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft colSpan={4}>
                      <Typography
                        fontFamily="candara"
                        fontWeight={600}
                        fontSize={14}
                      >
                        Parecer:
                        {

                          flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                            <CustomTextField

                              name="parecer"
                              value={obj_anexo_new_or_edit?.parecer}
                              onChange={onInputChange}
                            /> :
                            obj_anexo?.parecer
                        }
                      </Typography>
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontFamily: "candara",
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      Data:
                    </TableCell>
                    <StyledTableCell width="20%">
                      {

                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?


                          <TextField
                            variant="filled"
                            name="Aprovado_data"
                            type="date"
                            inputProps={{
                              style: {
                                fontSize: 12,
                                fontFamily: "verdana",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={obj_anexo_new_or_edit?.Aprovado_data === undefined ? "" : obj_anexo_new_or_edit.Aprovado_data}
                            onChange={onInputChange}
                            error={error_aprovado_data}
                            helperText={error_aprovado_data === true ? 'Campo obrigatório' : ''}
                          />


                          :
                          obj_anexo?.Aprovado_data}

                    </StyledTableCell>
                    <TableCell
                      sx={{
                        fontFamily: "candara",
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      Nome completo do técnico que emite parecer:
                      <BasicPopover
                        text={"Nome deve ser legível, sem abreviaturas."}
                      />
                    </TableCell>
                    <StyledTableHeadLeft sx={{ minWidth: 300 }}>
                      {

                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField

                            name="nome_tec"
                            value={obj_anexo_new_or_edit?.nome_tec}
                            onChange={onInputChange}
                          /> :
                          obj_anexo?.nome_tec
                      }
                    </StyledTableHeadLeft>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <StyledTableHeadLeft width="20%">
                      Assinatura e carimbo da entidade:
                    </StyledTableHeadLeft>
                    <StyledTableCell colSpan={2}></StyledTableCell>
                  </TableRow>

                </TableBody>
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