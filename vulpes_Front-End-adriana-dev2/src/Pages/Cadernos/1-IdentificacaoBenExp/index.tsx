import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Snackbar } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Paper, Stack, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { TableContainer } from "@mui/material";
import { Checkbox } from "@mui/material";
import EditIcon from "@material-ui/icons/Edit";

import dayjs, { Dayjs } from "dayjs";

import CadernoLayout from "../../../Styles/layout/cadernoLayout";
import { get, post } from "../../../Services/tokenConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { NewCCIdentBenExp } from "./NewCCIdentBenExp";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import LoadingVulpes from "../../../Styles/Loader/loading";
import { CustomThemeProvider } from "../../../Styles/theme/customThemeprovider";
import { func_print } from "../../../Func_genericas/func_print";
import {
  StyledTableCell,
  StyledTableCellBaseLeft,
  StyledTableHead,
  StyledTableHeadColor,
  StyledTableHeadLeft,
} from "../../../Styles/tabelCellStyled/customTableCell";
import BasicPopover from "../../../Components/Popover";
import { formate_obj_null_to_empty } from "../../../Func_genericas/formate_obj_null_to_empty";
import { ICaderno, TCaderno } from "../../../Interfaces/cadernos/caderno1";
import { Alert } from "../../../Components/Alert/Alert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    contents: {
      flexGrow: 1,
      padding: theme.spacing(1),
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

export default function IdentBenExp() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);

  const [closeCaderno, setCloseCaderno] = useState(false);

  const [date] = React.useState<Dayjs | null>(dayjs);

  let aux_caderno = formate_obj_null_to_empty(location.state, TCaderno)
  const [cadernoList, setCadernoList] = useState<ICaderno>(aux_caderno);


  const handle_get_caderno = async () => {
    try {
      setIsLoading(true);
      let res = await get(`/get_rosto_id/${location.state.id_rosto}`);
     
      if (res.status === 200) {
        setCadernoList(res.data.result);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handle_get_caderno", error, true);
      setMessage("Erro ao realizar a sua operação.")
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.addEventListener("load", async (event) => {
      await handle_get_caderno();
    });

  }, []);

  /*************** EDITAR *********************/
  const [showNewForm, setShowNewForm] = useState(false);
  const handleEdit = () => {
    setShowNewForm(true);
  };

  /************ FECHAR CADERNO ***********************************************/
  const handleCloseCaderno = async () => {
    setIsLoading(true);

    try {
      let result = await post(`/fechar_caderno`, {
        payload: {
          id_rosto: cadernoList.id_rosto,
          ano: cadernoList.ano,
          activo: 0,
          last_update: date,
          create_date: date,
          uuid: "",
        },
      });

      if (result.status === 200) {
        setMessage("Caderno Fechado com Sucesso!");
        setOpenSnackSuccess(true);
        navigate("/");

      } else {
        setOpenSnackError(true);
        setMessage("Erro ao fechar caderno");
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleChangeTabNavigation", error, true);
      setIsLoading(false);
      setMessage("Erro ao efetuar a sua operação");
      setOpenSnackError(true);
    }
  };

  function handleClickOpen() {
    setCloseCaderno(true);
  }
  function handleClickClose() {
    setCloseCaderno(false);
  }


  return (
    <CustomThemeProvider>
      <div className={classes.root}>
        <CadernoLayout title="Identificação do Beneficiário e da exploração" />
        <main className={classes.contents}>
          <div className={classes.toolbars} />
          <div>
            {isLoading ? (
              <LoadingVulpes />
            ) : (
              <>
                {showNewForm ? (
                  <NewCCIdentBenExp
                    book={cadernoList}
                    setBook={setCadernoList}
                    updateCreateCabecalho={() => setShowNewForm(false)}
                    setOpenSnackError={setOpenSnackError}
                    setOpenSnackSuccess={setOpenSnackSuccess}
                    setMessage={setMessage}
                  />
                ) : (
                  <>
                    <Box
                      width={"100%"}
                      height="auto"
                      alignItems="end"
                      justifyContent="end"
                      display="flex"
                      padding={2}
                      sx={{ "& button": { m: 1 } }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "#c94f1e",
                          fontFamily: "candara",
                          color: "#ffffff",
                          "&:hover": {
                            backgroundColor: "transparent",
                            color: "#7e2706",
                          },
                        }}
                        onClick={handleEdit}
                      >
                        <EditIcon />
                        Editar caderno
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "#7e2706",
                          fontFamily: "candara",
                          color: "#ffffff",
                          "&:hover": {
                            backgroundColor: "transparent",
                            color: "#7e2706",
                          },
                        }}
                        onClick={handleClickOpen}
                      >
                        Fechar caderno
                      </Button>
                    </Box>

                    <TableContainer
                      component={Paper}
                      variant="outlined"
                      sx={{ height: "auto", width: "auto", m: 2, padding: 2 }}
                    >
                      <Snackbar
                        open={openSnackSuccess}
                        autoHideDuration={2000}
                        onClose={() => setOpenSnackSuccess(false)}
                      >
                        <Alert
                          onClose={() => setOpenSnackSuccess(false)}
                          severity="success"
                          sx={{ width: "100%" }}
                        >
                          {message}
                        </Alert>
                      </Snackbar>
                      <Snackbar
                        open={openSnackError}
                        autoHideDuration={2000}
                        onClose={() => setOpenSnackError(false)}
                      >
                        <Alert
                          onClose={() => setOpenSnackError(false)}
                          severity="error"
                          sx={{ width: "100%" }}
                        >
                          Erro ao editar caderno!
                        </Alert>
                      </Snackbar>

                      <ConfirmDialog
                        open={closeCaderno}
                        onClose={handleClickClose}
                        onConfirm={handleCloseCaderno}
                        message="Deseja Fechar o Caderno?"
                      />
                      <table style={{ width: "100%" }}>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                fontWeight: 700,
                                fontSize: 18,
                                fontFamily: "candara",
                              }}
                            >
                              1. Identificação do beneficiário e da exploração
                            </TableCell>
                            <TableCell
                              sx={{
                                fontWeight: 700,
                                fontSize: 18,
                                fontFamily: "candara",
                                display: "flex",
                                justifyContent: "right",
                              }}
                            >
                              Ano: {cadernoList.ano}
                            </TableCell>
                          </TableRow>

                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <StyledTableHeadColor colSpan={2}>
                              Identificação do operador
                              <BasicPopover
                                text={
                                  "Identificar o beneficiário e a Exploração Pecuária."
                                }
                              />
                            </StyledTableHeadColor>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft width="30%">
                              Nome do Beneficiário:
                            </StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.nome}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>NIF:</StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.nif}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>NIFAP: </StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.nifap}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>Morada: </StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.morada}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>
                              Localização:
                            </StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.localizacao}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>
                              Código Postal:
                            </StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.codig_postal}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>
                              Freguesia:
                            </StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.freguesia}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>Concelho:</StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.concelho}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>Telefone:</StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.telefone}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>
                              Telemóvel:
                            </StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.telemovel}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>
                              Correio electrónico:
                            </StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.email}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadColor colSpan={2}>
                              Sócio gerente ou representante (Quando aplicável)
                              <BasicPopover
                                text={
                                  "No caso de sociedades identificar o sócio gerente ou pessoa em quem delegou a responsabilidade técnica da exploração pecuária.\nNo caso de beneficiário em nome individual quando o mesmo nomeou um representante legal ou responsável técnico."
                                }
                              />
                            </StyledTableHeadColor>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>
                              <Stack direction="row">Cargo:</Stack>
                            </StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.cargo}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>Nome: </StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.nome_S}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>Morada:</StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.morada_S}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>Telefone:</StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.telefone_S}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>
                              Telemóvel:
                            </StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.telemovel_S}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>
                              Correio electrónico:
                            </StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.email_S}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadColor colSpan={2}>
                              <Stack direction="row">
                                Identificação da exploração
                                <BasicPopover text="Pretende-se que seja feita a caraterização em termos de localização, área e modo de produção, identificando a possível existência de assistência técnica, tipo de produção animal/vegetal e eventual transformação da produção na própria exploração." />
                              </Stack>
                            </StyledTableHeadColor>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>
                              Local da sede:
                            </StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.local_sede_E}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>
                              Cód. Postal:
                            </StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.codigo_postal_E}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>
                              Freguesia:
                            </StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.freguesia_E}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>Concelho:</StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.concelho_E}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadColor colSpan={2}>
                              Baldio
                              <BasicPopover text="No caso de pastoreio em terrenos de baldio, p. ex." />
                            </StyledTableHeadColor>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>
                              Designação:
                            </StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.designacao_baldio}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>
                              Nº Parcelário:
                            </StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.n_parcelario}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>
                              Nº Subparcela:
                            </StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.n_subparcela}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>
                              Localização:
                            </StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.localizacao_baldio}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>Concelho:</StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.concelho_baldio}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableHeadLeft>
                              Freguesia:
                            </StyledTableHeadLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.freguesia_baldio}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableBody>
                      </table>

                      <table>
                        <TableHead>
                          <TableRow>
                            <StyledTableHead colSpan={12}>
                              Área (ha)
                            </StyledTableHead>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <StyledTableCellBaseLeft>
                              Área em Manutenção AB:
                            </StyledTableCellBaseLeft>

                            <StyledTableCellBaseLeft width="80">
                              {cadernoList.area_manutencao_AB}
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              Área de conversão AB:
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft width="80">
                              {cadernoList.area_conversao_AB}
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              Área em PRODI
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.area_PRODI}
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              Área total exploração:
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft width="80">
                              {cadernoList.area_total_exploracao}
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              <Stack direction="row" justifyContent="right">
                                <BasicPopover text="Quando existe, registar o tipo de transformação realizado." />
                              </Stack>
                              Transformação:
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              <FormControlLabel
                                label={
                                  <Typography
                                    fontFamily="candara"
                                    fontSize={16}
                                  >
                                    Sim
                                  </Typography>
                                }
                                control={
                                  <Checkbox
                                    sx={{
                                      color: "#aaaaaa",
                                      "&.Mui-checked": {
                                        color: "#C94F1E",
                                      },
                                    }}
                                    checked={cadernoList.transformacao === true ? true : false}
                                  />
                                }
                              />
                              <FormControlLabel
                                label={
                                  <Typography
                                    fontFamily="candara"
                                    fontSize={16}
                                  >
                                    Não
                                  </Typography>
                                }
                                control={
                                  <Checkbox
                                    sx={{
                                      color: "#aaaaaa",
                                      "&.Mui-checked": {
                                        color: "#C94F1E",
                                      },
                                    }}
                                    checked={
                                      cadernoList.transformacao === false
                                        ? true
                                        : false
                                    }
                                  />
                                }
                              />
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft colSpan={2}>
                              <Stack
                                direction="row"
                                justifyContent="right"
                                alignItems="center"
                              >
                                <BasicPopover text="Se resposta é 'SIM', registar o tipo de transformação realizado." />
                                {cadernoList.tranform_obs}
                              </Stack>
                            </StyledTableCellBaseLeft>
                          </TableRow>

                          <TableRow>
                            <StyledTableCellBaseLeft colSpan={2}>
                              <FormControlLabel
                                label={
                                  <Typography
                                    fontFamily="candara"
                                    fontSize={16}
                                  >
                                    Regante de Classe A
                                  </Typography>
                                }
                                control={
                                  <Checkbox
                                    sx={{
                                      color: "#aaaaaa",
                                      "&.Mui-checked": {
                                        color: "#C94F1E",
                                      },
                                    }}
                                    checked={cadernoList.regante_classe_A === true && cadernoList.regante_classe_A}
                                  />
                                }
                              />
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft rowSpan={3} colSpan={2}>
                              Área Regada(ha):
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft rowSpan={3}>
                              {cadernoList.area_regada}
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft rowSpan={3}>
                              Título de regante nº:
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft rowSpan={3}>
                              {cadernoList.titulo_regante}
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft rowSpan={3} colSpan={2}>
                              Data do contrato com a ERR
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft rowSpan={3} colSpan={3}>
                              {cadernoList.data_contrato_ERR}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellBaseLeft colSpan={2}>
                              <FormControlLabel
                                label={
                                  <Typography
                                    fontFamily="candara"
                                    fontSize={16}
                                  >
                                    Regante de Classe B+
                                  </Typography>
                                }
                                control={
                                  <Checkbox
                                    sx={{
                                      color: "#aaaaaa",
                                      "&.Mui-checked": {
                                        color: "#C94F1E",
                                      },
                                    }}
                                    checked={
                                      cadernoList.regante_classe_B_plus ===
                                      true &&
                                      cadernoList.regante_classe_B_plus
                                    }
                                  />
                                }
                              />
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellBaseLeft colSpan={2}>
                              <FormControlLabel
                                label={
                                  <Typography
                                    fontFamily="candara"
                                    fontSize={16}
                                  >
                                    Regante de Classe B
                                  </Typography>
                                }
                                control={
                                  <Checkbox
                                    sx={{
                                      color: "#AAAAAA",
                                      "&.Mui-checked": {
                                        color: "#C94F1E",
                                      },
                                    }}
                                    checked={
                                      cadernoList.regante_classe_B === true &&
                                      cadernoList.regante_classe_B
                                    }
                                  />
                                }
                              />
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={12}></TableCell>
                          </TableRow>

                          <TableRow>
                            <StyledTableHead colSpan={12}>
                              Efetivo pecuário (CN):
                              <BasicPopover
                                text={
                                  "Preencher com as diferentes espécies pecuárias que se encontrem em AB ou PRODI, independentemente que se encontrem candidatas a apoio (AB) ou não.\n\nNo caso de o beneficiário deter outras espécies diferentes das elencadas ou deter animais em PRODI, deverá acrescentar esses animais neste campo.\n\nIndíce de conversão de cabeças naturais em cabeças normais (CN)\nBovinos com mais de 2 anos - 1,0\nBovinos de 6 meses a 2 anos - 0,6\nBovinos com menos de 6 meses - 0,4"
                                }
                              />
                            </StyledTableHead>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellBaseLeft>
                              Bovinos em conversão AB:
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.bovinos_conversao_AB}
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              Bovinos em manutenção AB:
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.bovinos_manutencao_AB}
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              Ovinos em conversão AB:
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.ovinos_conversao_AB}
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              Ovinos em manutennção AB:
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.ovinos_manutencao_AB}
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              Caprinos em conversão AB:
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.caprinos_conversao_AB}
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              Caprinos em manutenção AB:
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft width="80">
                              {cadernoList.caprinos_manutencao_AB}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellBaseLeft>
                              Outras espécies conversão AB:
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.outras_espe_conver_AB}
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              Outras espécies manutenção AB:
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.outras_esp_manu_AB}
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              Bovinos PRODI:
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.bovinos_PRODI}
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              Ovinos PRODI:
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.ovinos_PRODI}
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              Caprinos PRODI:
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.caprinos_PRODI}
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              Outras espécies PRODI:
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              {cadernoList.outras_esp_PRODI}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={12}></TableCell>
                          </TableRow>
                          <TableRow>
                            <StyledTableCell colSpan={12}>
                              <Stack
                                direction="row"
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  fontFamily="candara"
                                  fontWeight={600}
                                >
                                  DRAP a que pertence:
                                </Typography>
                                <BasicPopover
                                  text={
                                    "Identificar a Direção Regional de Agricultura e Pescas em cuja área de influência se localiza a sede da exploração."
                                  }
                                />
                                {cadernoList.drap}
                              </Stack>
                            </StyledTableCell>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellBaseLeft>
                              Assistência técnica em AB:
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft colSpan={3}>
                              {cadernoList.assistencia_tec_AB}
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              Assistência técnica em PRODI:
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft colSpan={3}>
                              {cadernoList.assistencia_tec_PRODI}
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              Assistência técnica Maneio Pastagem Permanente:
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft colSpan={3}>
                              {cadernoList.assistencia_tec_past_permanente}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={12}></TableCell>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellBaseLeft>
                              <Stack direction="row" justifyContent="right">
                                <BasicPopover
                                  text={
                                    "Identificação do OC - Organismo de Controle e Certificação que efetua as ações de controlo durante todo o ciclo produtivo. \nA lista de OC encontra-se disponível na página da DGADR."
                                  }
                                />
                              </Stack>
                              Identificação do OC (AB):
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft colSpan={3}>
                              {cadernoList.indentificacao_OC_AB}
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              <Stack direction="row" justifyContent="right">
                                <BasicPopover
                                  text={
                                    "Identificação do OC - Organismo de Controle e Certificação que efetua as ações de controlo durante todo o ciclo produtivo. \nA lista de OC encontra-se disponível na página da DGADR."
                                  }
                                />
                              </Stack>
                              Identificação do OC (PRODI):
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft colSpan={3}>
                              {cadernoList.indentificacao_OC_PRODI}
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft>
                              <Stack direction="row" justifyContent="right">
                                <BasicPopover
                                  text={
                                    "Identificação do OC - Organismo de Controle e Certificação que efetua as ações de controlo durante todo o ciclo produtivo. \nA lista de OC encontra-se disponível na página da DGADR."
                                  }
                                />
                              </Stack>
                              Identificação do OC (PP biodiversas):
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft colSpan={3}>
                              {cadernoList.indentificacao_OC_PP_biod}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellBaseLeft>
                              Identificação da ERR:
                            </StyledTableCellBaseLeft>
                            <StyledTableCellBaseLeft colSpan={3}>
                              {cadernoList.identificacao_ERR}
                            </StyledTableCellBaseLeft>
                          </TableRow>
                        </TableBody>
                      </table>
                    </TableContainer>
                  </>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </CustomThemeProvider>
  );
}
