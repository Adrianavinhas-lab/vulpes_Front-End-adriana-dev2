import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, Button, Paper, Snackbar, Stack, Tab, Table, Tabs } from "@mui/material";
import { DialogContent } from "@mui/material";
import { TextField, Typography, IconButton } from "@mui/material";
import { TableBody, TableRow, TableContainer } from "@mui/material";
import { CardContent, CardHeader } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import dayjs, { Dayjs } from "dayjs";
import { BarraDeFerramentas } from "../../Components/barra-de-ferramentas/BarraDeFerramentas";
import DocsUpload from "../../Components/Upload/DocsUpload";
import HomeViewTecnico from "../../Styles/layout/homeViewTecnico";
import UpdatePopup from "./UpdatePopup";
import { get, post, post_imagem } from "../../Services/tokenConfig";
import Historico from "../Historico/historico";
import LoadingVulpesSmall from "../../Styles/Loader/loadingSmall";
import { CustomThemeProvider } from "../../Styles/theme/customThemeprovider";
import { AuthContext } from "../../AuthContext/AuthContext";
import {
  StyledTableCellCabecalho,
  StyledTableCellWithoutBorder, StyledTableHeadWithoutBorder,
} from "../../Styles/tabelCellStyled/customTableCell";
import { func_print } from "../../Func_genericas/func_print";
import { aviso_sem_info } from "../../Func_genericas/aviso_sem_info";
import { handler_pesquisa } from "../../Func_genericas/func_pesquisa";
import { Search } from "@material-ui/icons";
import { ICaderno } from "../../Interfaces/cadernos/caderno1";
import { cores, operacao_erro, operacao_sucesso } from "../../Func_genericas/valores_estaticos";
import { DialogNovoCadernoManual } from "./dialog_novo_caderno_manual";
import { IBeneficiarios, IParcela } from "../../Interfaces/beneficiarios/beneficiario";
import { flag_botao_carregar_candidatura } from "../../Services/flags_funcionalidades_disponiveis";
import { TableHead } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
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
      padding: theme.spacing(2),
    },
    label: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
        minWidth: 325,
      },
    },
    header: {
      textAlign: "center",
      background: "#FAFAFA",
      color: "#7e2706",
    },
    picker: {
      color: "#7e2706",
      "&.Mui-checked": {
        color: "#ccafa3",
      },
    },
    tabs: {
      "& .MuiTabs-indicator": {
        backgroundColor: cores.cor1,
        height: 3,
      },
      "& .MuiTab-root.Mui-selected": {
        color: cores.cor1,
      },
    },
  })
);

function Home() {
  const classes = useStyles();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [isloading, setIsLoading] = useState(true);

  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const [message, setMessage] = useState("");

  const [file, setFile] = useState<any>(); // Para carregar ficheiros IE e candidaturas

  const [openInfoAboutBeneficiario, setOpenInfoAboutBeneficiario] = React.useState(false); //ativa popup info beneficiario
  const [openEditBenef, setOpenEditBenef] = React.useState(false); //ativa popup para editar o beneficiario
  const [uploadIE, setuploadIE] = React.useState(false); //ativa popup do upload
  const [flag_gerir_caderno, setflag_gerir_caderno] = useState(false);
  const [flag_escolha_caderno_manual, setflag_escolha_caderno_manual] = useState(false);
  const [flag_escolha_carregar_candidatura, setflag_escolha_carregar_candidatura] = useState(false);

  const [lista_benefeciario, set_lista_benefeciario] = useState<IBeneficiarios[]>([]);
  const [beneficiario, set_beneficiario] = useState<IBeneficiarios>();
  const [string_para_pesquisar,] = useState<string>();
  const [lista_benefeciario_pesquisa, set_lista_benefeciario_pesquisa] = useState<IBeneficiarios[]>([]);
  const [, set_obj_template_escolhido] = useState<any>();
  const [obj_caderno, set_obj_caderno] = useState<ICaderno>();

  const [listaParcelas, setlistaParcelas] = useState<IParcela[]>();
  const [drapChoose, setDrapChoose] = useState<string>("Norte");

  const [valueYear, setValueYear] = React.useState<Dayjs | null>(dayjs);
  const [valueTab, setValueTab] = React.useState("1"); // TAB NAVIGATION - Escolher Parcelas / histórico


  /*************** BENEFICIARIO ******************/
  const getAllBeneficiariosByOrg = async () => {
    try {
      let res = await get(`/get_beneficiario_idOrg/${auth.user?.id_org}`);

      if (res.status === 200) {
        set_lista_benefeciario(res.data.result);
        set_lista_benefeciario_pesquisa(res.data.result);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("getAllBeneficiariosByOrg", error, true);
      setMessage(operacao_erro)
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    (async () => {
      await getAllBeneficiariosByOrg();
    })();
  }, []);

  //PESQUISAR BENEFICIARIO 
  const handle_pesquisa = (string_to_search: string) => {
    try {
      set_lista_benefeciario_pesquisa(
        handler_pesquisa(lista_benefeciario, ["nif", "nome"], string_to_search)
      );
    } catch (error) {
      func_print("handle_pesquisa", error, true);
      setMessage(operacao_erro)
      setOpenSnackError(true);
    }
  };

  //EDITAR
  const handleOpenEditBenef = (el: IBeneficiarios) => {
    set_beneficiario(el);
    setOpenEditBenef(true);
  };

  /**************** PARCELAS ****************/
  const getParcelas = async (id_agri_arg: number | undefined) => {
    try {
      setIsLoading(true);

      let response = await get(`/get_parcela_agri/${id_agri_arg}`);
      if (response.status === 200) {
        setlistaParcelas(response.data.result);
      } else {
        setMessage(operacao_erro)
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("getParcelas", error, true);
      setMessage(operacao_erro)
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  /***************** CADERNO ************************************/
  // GET 
  const handle_open_beneficiario = (el: IBeneficiarios) => {
    try {
      set_beneficiario(el);

      setOpenInfoAboutBeneficiario(true);
    } catch (error) {
      func_print("handle_open_beneficiario", error, true);
      setMessage(operacao_erro)
      setOpenSnackError(true);
    }
  };
  //CRIAR
  const handleCreateCaderno = async () => {
    try {
      setIsLoading(true);
      let response = await post(`/gerarCaderno`, {
        parameter: {
          ano: valueYear?.format("YYYY"),
          id_agri: beneficiario?.id_agri,
          drap: drapChoose,
          template_id: null,
          // template_id: obj_template_escolhido.value === -1 ? "0" : obj_template_escolhido.value,
        },
      });

      if (response.status === 200) {

        cadernoAtivo(response.data.result)

        auth.func_setId_rosto_from_caderno(response.data.result.id_rosto);
        auth.func_setNif_agricultor_from_caderno(response.data.result.nif);
        auth.func_setNome_agricultor_from_caderno(response.data.result.nome);

        setMessage(operacao_sucesso)
        setOpenSnackSuccess(true);
      } else {
        setMessage(operacao_erro)
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleCreateCaderno", error, true);
      setMessage(operacao_erro)
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };
  // CADERNO ATIVO 
  function cadernoAtivo(caderno: ICaderno) {

    auth.func_setId_rosto_from_caderno(caderno.id_rosto);
    auth.func_setNif_agricultor_from_caderno(caderno.nif);
    auth.func_setNome_agricultor_from_caderno(caderno.nome);

    navigate("/IdentificacaoBenExp",
      { state: caderno, });
  }
  // GERIR CADERNO 
  const handle_gerir_caderno = async (el: IBeneficiarios) => {
    try {
      setIsLoading(true);
      set_beneficiario(el);
      let res = await get(`/get_rosto_valida/${el.id_agri}`);
      if (res.status === 200) {
        console.log("activo", res.data.result)
        if (res.data.result.activo === 0) {
          setflag_gerir_caderno(true);
        } else {
          set_obj_caderno(res.data.result);
          cadernoAtivo(res.data.result);

          auth.func_setId_rosto_from_caderno(res.data.result.id_rosto);
          auth.func_setNif_agricultor_from_caderno(res.data.result.nif);
          auth.func_setNome_agricultor_from_caderno(res.data.result.nome);
        }
      } else {
        setMessage(operacao_erro)
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handle_gerir_caderno", error, true);
      setMessage(operacao_erro)
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  /****************** UPLOAD CANDIDATURA - NOVO CADERNO  **********************************************/
  async function novoCaderno() {
    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("file", file);
      if (file !== undefined) {
        let response = await post_imagem("/uploadcandidatura", formData);
        if (response.status === 200) {
          cadernoAtivo(response.data.result)

          setMessage("Candidatura carregada com sucesso!")
          setOpenSnackSuccess(true);


        } else {
          setMessage("Erro ao carregar o ficheiro.")
          setOpenSnackError(true);
        }
      } else {
        setMessage(operacao_erro)
        setOpenSnackError(true);

      }
      setIsLoading(false);
    } catch (error) {
      func_print("novoCaderno", error, true);
      setMessage("Erro ao carregar o ficheiro.")
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }

  /**************  TAB NAVIGATION ************/
  const handleChangeTabNavigation = async (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    try {
      await getParcelas(beneficiario?.id_agri);
      setValueTab(newValue);
    } catch (error) {
      func_print("handleChangeTabNavigation", error, true);
    }
  };

  /**************  ONCHANGE CARREGAR FICHEIROS ************/
  const onChange = (file: ChangeEvent) => {
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      setFile(files[0]);
    } else {
      setMessage("Erro ao carregar o ficheiro.")
      setOpenSnackError(true);
    }
  };


  return (
    <CustomThemeProvider>
      <div className={classes.root}>
        <HomeViewTecnico title=" Identificação do Beneficiário" />

        <main className={classes.contents}>
          <div className={classes.toolbars} />
          <div className={classes.label}>
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
                {message}

              </Alert>
            </Snackbar>
            {/************** CARREGAR FICHEIRO IE ***************/}
            <Box
              width={"100%"}
              height="auto"
              display="flex"
              justifyContent="end"
              marginRight={10}
            >
              <BarraDeFerramentas
                mostrarBotaoUpload
                textoBotaoUpload="Carregar Ficheiro IE"
                aoClicarUpload={() => setuploadIE(true)}
              />
              {/************** POPUP CARREGAR FICHEIRO IE ***************/}
              <Dialog
                open={uploadIE}
                onClose={() => setuploadIE(false)}


              >
                <Stack direction="column" sx={{ padding: 5 }}>

                  <div style={{
                    display: "flex",
                    paddingBottom: 30
                  }}>

                    <div style={{
                      display: "flex",
                      flex: 0.9
                    }}>
                      <DialogTitle sx={{ fontFamily: "candara" }}>
                        Carregar Ficheiro IE
                      </DialogTitle>
                    </div>

                    <div style={{
                      display: "flex",
                      flex: 0.1
                    }}>
                      <Button
                        color="inherit"
                        size="small"
                        onClick={() => setuploadIE(false)}
                      >
                        <ClearIcon />
                      </Button>
                    </div>

                  </div>
                  <DocsUpload
                    onCloseDialog={() => setuploadIE(false)}
                  />
                </Stack>


              </Dialog>
            </Box>

            {/************** Beneficiario ***************/}
            {openInfoAboutBeneficiario === false ? (
              <></>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  width: "100%",
                  maxHeight: 40,
                }}
              >
                <BarraDeFerramentas
                  mostrarBotaoCancelar
                  aoClicarCancelar={() => {
                    setlistaParcelas(undefined);
                    set_beneficiario(undefined);
                    setOpenInfoAboutBeneficiario(false);
                  }}
                />
              </Box>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%",
                justifyContent: "center",
              }}
            >
              {/************** DIV DO LADO ESQUERDO ***************/}
              <div
                id="dados"
                style={{
                  height: "auto",
                  flex: openInfoAboutBeneficiario === false ? 1 : 0.5,
                  paddingRight: 10,
                  display: "flex",
                }}
              >
                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{
                    height: "100%",
                    width: "100%",
                  }}
                >
                  {openInfoAboutBeneficiario === false ? (
                    <>
                      <CardHeader
                        className={classes.header}
                        title="Pesquisar Beneficiário"
                      />
                      <CardContent>
                        <div style={{ display: "flex" }}>
                          <TextField
                            fullWidth
                            id="username"
                            label="NIF ou Nome do Beneficiário"
                            placeholder="NIF ou Nome do Beneficiário"
                            margin="normal"
                            onChange={(e) => {
                              handle_pesquisa(e.target.value);
                            }}
                            value={string_para_pesquisar}
                          />
                        </div>
                      </CardContent>
                    </>
                  ) : (
                    <></>
                  )}

                  {/*********** DADOS DO BENEFICIARIO ***********/}
                  {isloading ? (
                    <Box sx={{ justifyContent: "-moz-initial" }}>
                      <LoadingVulpesSmall />
                    </Box>
                  ) : openInfoAboutBeneficiario === false ? (
                    <TableContainer
                      component={Paper}
                      variant="outlined"
                      sx={{ height: "55vh", width: "auto", m: 2, padding: 2 }}
                    >
                      <table style={{ width: "100%" }}>
                        <TableHead>
                          <StyledTableCellCabecalho>
                            NIF
                          </StyledTableCellCabecalho>
                          <StyledTableCellCabecalho colSpan={2}>
                            Nome
                          </StyledTableCellCabecalho>
                          <StyledTableHeadWithoutBorder>
                            Ações
                          </StyledTableHeadWithoutBorder>
                        </TableHead>
                        <TableBody>
                          {lista_benefeciario_pesquisa !== undefined &&
                            lista_benefeciario_pesquisa.length !== 0 &&
                            lista_benefeciario_pesquisa.map((el, key) => {
                              return (
                                <TableRow key={key}>
                                  <StyledTableCellCabecalho width="20%">
                                    {el.nif}
                                  </StyledTableCellCabecalho>
                                  <StyledTableCellCabecalho width="40%" >
                                    {el.nome}
                                  </StyledTableCellCabecalho>
                                  <StyledTableCellCabecalho sx={{ color: cores.cor2 }}>
                                    {el.disabled === true ? "Inativo" : ""}
                                  </StyledTableCellCabecalho>
                                  <StyledTableHeadWithoutBorder width="40%">
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        "& button": { m: 1 },
                                      }}
                                    >
                                      <Button
                                        sx={{
                                          backgroundColor: "#c94f1e",
                                          fontFamily: "candara",
                                          color: "#ffffff",
                                          "&:hover": {
                                            backgroundColor: "transparent",
                                            color: "#7e2706",
                                          },
                                        }}
                                        size="small"
                                        onClick={() =>
                                          handle_open_beneficiario(el)
                                        }
                                      >
                                        <Search />
                                      </Button>
                                      <Button
                                        sx={{
                                          backgroundColor: el.disabled === true ? cores.cor2 : cores.cor1,
                                          fontFamily: "candara",
                                          color: "#ffffff",
                                          "&:hover": {
                                            backgroundColor: "transparent",
                                            color: "#7e2706",
                                          },
                                        }}
                                        size="small"
                                        disabled={el.disabled}
                                      >
                                        <EditIcon />
                                      </Button>
                                      <Button
                                        size="small"
                                        sx={{
                                          backgroundColor: el.disabled === true ? cores.cor2 : cores.cor1,
                                          color: "#ffffff",
                                          "&:hover": {
                                            backgroundColor: "transparent",
                                            color: "#7e2706",
                                          },
                                          fontFamily: "candara",
                                        }}
                                        onClick={() => handle_gerir_caderno(el)}
                                        disabled={el.disabled}
                                      >
                                        Gerir Caderno
                                      </Button>
                                    </Box>
                                  </StyledTableHeadWithoutBorder>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </table>
                    </TableContainer>
                  ) : (
                    <>
                      <TableHead>
                        <TableRow>
                          <StyledTableHeadWithoutBorder sx={{
                            height: 50, width: "100%", fontFamily: "candara",
                            color: cores.cor1, fontSize: 24
                          }}>
                            Visualizar Beneficiário
                          </StyledTableHeadWithoutBorder>
                          <StyledTableCellCabecalho sx={{ width: "80%", paddingRight: 5, color: cores.cor2 }}>
                            {beneficiario?.disabled === true ? "Inativo" : ""}
                          </StyledTableCellCabecalho>
                        </TableRow>
                      </TableHead>
                      <CardContent>
                        <div>
                          <TextField
                            fullWidth
                            id="username"
                            label="Nome"
                            placeholder="Nome"
                            disabled
                            value={beneficiario?.nome}
                            sx={{
                              paddingRight: "5px",
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                              },
                            }}
                          />
                          <TextField
                            fullWidth
                            id="nif"
                            label="NIF"
                            placeholder="NIF"
                            margin="normal"
                            disabled
                            sx={{
                              width: "50%",
                              paddingRight: "5px",
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                              },
                            }}
                            value={beneficiario?.nif}
                          />
                          <TextField
                            fullWidth
                            id="ifap"
                            label="IFAP"
                            placeholder="IFAP"
                            margin="normal"
                            disabled
                            sx={{
                              width: "50%",
                              paddingRight: "5px",
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                              },
                            }}
                            value={beneficiario?.ifap}
                          />
                          <TextField
                            fullWidth
                            id="morada"
                            label="Morada"
                            placeholder="Morada"
                            margin="normal"
                            disabled
                            sx={{
                              width: "70%",
                              paddingRight: "5px",
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                              },
                            }}
                            value={beneficiario?.morada}
                          />
                          <TextField
                            fullWidth
                            id="cpostal"
                            label="Código Postal"
                            placeholder="Código Postal"
                            margin="normal"
                            disabled
                            sx={{
                              width: "30%",
                              paddingRight: "5px",
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                              },
                            }}
                            value={beneficiario?.Codigo_postal}
                          />
                          <TextField
                            fullWidth
                            id="concelho"
                            label="Concelho"
                            placeholder="Concelho"
                            margin="normal"
                            disabled
                            sx={{
                              width: "50%",
                              paddingRight: "5px",
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                              },
                            }}
                            value={beneficiario?.Concelho}
                          />
                          <TextField
                            fullWidth
                            id="freguesia"
                            label="Freguesia"
                            placeholder="Freguesia"
                            margin="normal"
                            disabled
                            sx={{
                              width: "50%",
                              paddingRight: "5px",
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                              },
                            }}
                            value={beneficiario?.freguesia}
                          />
                          <TextField
                            fullWidth
                            id="telefone"
                            label="Telefone"
                            placeholder="Telefone"
                            margin="normal"
                            disabled
                            sx={{
                              width: "30%",
                              paddingRight: "5px",
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                              },
                            }}
                            value={beneficiario?.telefone}
                          />
                          <TextField
                            fullWidth
                            id="telemovel"
                            label="Telemóvel"
                            placeholder="Telemóvel"
                            margin="normal"
                            disabled
                            sx={{
                              width: "30%",
                              paddingRight: "5px",
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                              },
                            }}
                            value={beneficiario?.telemovel}
                          />
                          <TextField
                            fullWidth
                            id="email"
                            label="E-mail"
                            placeholder="E-mail"
                            margin="normal"
                            disabled
                            sx={{
                              width: "40%",
                              paddingRight: "5px",
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                              },
                            }}
                            value={beneficiario?.email}
                          />
                        </div>
                      </CardContent>
                    </>
                  )}

                  {/********************** UPDATE BENEFICIARIO ************************/}
                  <Dialog
                    open={openEditBenef}
                    onClose={() => setOpenEditBenef(false)}
                    fullWidth
                    maxWidth="md"
                  >
                    <Stack direction="row">
                      <DialogTitle sx={{ fontFamily: "candara" }}>
                        Atualizar Dados Beneficiário
                      </DialogTitle>
                      <div style={{ marginLeft: "auto", marginRight: 0 }}>
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => setOpenEditBenef(false)}
                        >
                          <CloseIcon color="action" />
                        </IconButton>
                      </div>
                    </Stack>
                    <UpdatePopup
                      dados={beneficiario}
                      lista={lista_benefeciario}
                      lista_pesquisa={lista_benefeciario_pesquisa}
                      set_lista={(lista: Array<IBeneficiarios>) =>
                        set_lista_benefeciario(lista)
                      }
                      set_lista_pesquisa={(lista: Array<IBeneficiarios>) =>
                        set_lista_benefeciario_pesquisa(lista)
                      }
                      handleCloseEditBenef={() => setOpenEditBenef(false)}
                    />
                  </Dialog>

                  {/********************* CRIAR CADERNO MANUAL OU COM CANDIDATURA **************************/}
                  {flag_gerir_caderno === true ? (
                    <Dialog
                      open={flag_gerir_caderno}
                      onClose={() => setflag_gerir_caderno(false)}
                      //  fullWidth
                      maxWidth="lg"
                      sx={{ padding: 10 }}
                    >
                      <DialogContent>
                        <Stack direction="row" display="flex">
                          <DialogTitle
                            fontFamily="candara"
                            fontSize={22}
                            fontWeight={500}
                          >
                            Criação de Caderno
                          </DialogTitle>
                          <div style={{ marginLeft: "auto" }}>
                            <BarraDeFerramentas
                              mostrarBotaoCancelar
                              aoClicarCancelar={() => {
                                setflag_gerir_caderno(false);
                                setflag_escolha_caderno_manual(false);
                                setflag_escolha_carregar_candidatura(false);
                              }}
                            />
                          </div>
                        </Stack>

                        {flag_escolha_caderno_manual === false &&
                          flag_escolha_carregar_candidatura === false ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              paddingBottom: 50,
                              paddingTop: 30,
                            }}
                          >

                            <Button
                              size="large"
                              sx={{
                                width: 250,
                                marginBottom: 5,
                                backgroundColor: flag_botao_carregar_candidatura === true ? cores.cor1 : cores.cor2,
                                color: "#ffffff",
                                "&:hover": {
                                  backgroundColor: "transparent",
                                  color: "#7e2706",
                                },
                                fontFamily: "candara",
                              }}
                              onClick={() =>
                                setflag_escolha_carregar_candidatura(true)
                              }
                              disabled={!flag_botao_carregar_candidatura}
                            >
                              Carregar Candidatura
                            </Button>
                            <Button
                              size="large"
                              sx={{
                                width: 250,

                                backgroundColor: "#c94f1e",
                                color: "#ffffff",
                                "&:hover": {
                                  backgroundColor: "transparent",
                                  color: "#7e2706",
                                },
                                fontFamily: "candara",
                              }}
                              onClick={() =>
                                setflag_escolha_caderno_manual(true)
                              }
                            >
                              Criar Caderno Manualmente
                            </Button>
                          </div>
                        ) : flag_escolha_caderno_manual === true ? (
                          <DialogNovoCadernoManual
                            handleCreateCaderno_arg={() => handleCreateCaderno()}
                            setDrapChoose_arg={(choose_drap: string) => { setDrapChoose(choose_drap); }}
                            setValueYear_arg={(obj: Dayjs | null) => setValueYear(obj)}
                            set_obj_template_escolhido_arg={(obj) => set_obj_template_escolhido(obj)}
                          />
                        ) : flag_escolha_carregar_candidatura === true ? (
                          <Box
                            sx={{ marginTop: 10 }}
                            padding={2}
                            width="100%"
                            display="flex"
                            alignItems="center"
                            component={Paper}
                            justifyContent="center"
                          >
                            <Stack>
                              <Typography
                                fontFamily="candara"
                                align="center"
                                padding={2}
                              >
                                Carregar candidatura
                              </Typography>
                              {isloading ? (
                                <LoadingVulpesSmall />
                              ) : (
                                <>
                                  <form onSubmit={(e) => e.preventDefault()}>
                                    <Button
                                      variant="contained"
                                      component="label"
                                      size="small"
                                      sx={{
                                        fontFamily: "candara",
                                        backgroundColor: "#ccafa3",
                                        "&:hover": {
                                          backgroundColor: "#f2d1c2",
                                          color: "#000000",
                                        },
                                      }}
                                    >
                                      <input
                                        style={{
                                          color: "#7e2706",
                                          fontFamily: "candara",
                                        }}
                                        accept=".pdf"
                                        type="file"
                                        onChange={onChange} />
                                    </Button>

                                  </form><Stack direction="row" display="flex" justifyContent="end" paddingTop={5}>
                                    <BarraDeFerramentas
                                      mostrarBotaoNovo
                                      aoClicarNovo={() => novoCaderno()}
                                      textoBotaoNovo="CRIAR" />
                                  </Stack>
                                </>
                              )}
                            </Stack>
                          </Box>
                        ) : (
                          <DialogNovoCadernoManual
                            handleCreateCaderno_arg={() => handleCreateCaderno()}
                            setDrapChoose_arg={(choose_drap: string) => { setDrapChoose(choose_drap); }}
                            setValueYear_arg={(obj: Dayjs | null) => setValueYear(obj)}
                            set_obj_template_escolhido_arg={(obj) => set_obj_template_escolhido(obj)}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <></>
                  )}
                </TableContainer>
              </div>

              {/********** DIV LADO DIREITO ******************/}
              {openInfoAboutBeneficiario ? (
                <div
                  id="dados"
                  style={{
                    flex: 0.5,
                    paddingLeft: 10,

                    height: "75vh",
                    display: "flex",
                  }}
                >
                  <TableContainer
                    component={Paper}
                    variant="outlined"
                    sx={{ height: "auto", width: "100%" }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Tabs
                        value={valueTab}
                        variant="fullWidth"
                        onChange={handleChangeTabNavigation}
                        className={classes.tabs}
                      >
                        <Tab
                          value="1"
                          label="Histórico"
                          sx={{
                            fontWeight: 700,
                            fontFamily: "candara",
                            fontSize: 18,
                          }}
                        />
                        <Tab
                          value="2"
                          label="Listagem Parcelas"
                          sx={{
                            fontWeight: 700,
                            fontFamily: "candara",
                            fontSize: 18,
                          }}
                        />
                      </Tabs>
                    </Box>

                    <TableContainer
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <table width="90%">
                        {valueTab === "1" ? (
                          <Historico
                            idagri={beneficiario?.id_agri}
                            idrosto={obj_caderno?.id_rosto}
                          />
                        ) : (
                          <TableBody>
                            <TableRow>
                              <StyledTableHeadWithoutBorder>
                                Nº Parcelario
                              </StyledTableHeadWithoutBorder>
                              <StyledTableHeadWithoutBorder>
                                Nome da Parcela
                              </StyledTableHeadWithoutBorder>
                              <StyledTableHeadWithoutBorder>
                                Área (ha)
                              </StyledTableHeadWithoutBorder>
                            </TableRow>

                            {listaParcelas === undefined ? (
                              <TableRow key={0}>
                                <StyledTableCellWithoutBorder>
                                  {aviso_sem_info}
                                </StyledTableCellWithoutBorder>
                                <StyledTableCellWithoutBorder>
                                  {aviso_sem_info}
                                </StyledTableCellWithoutBorder>
                                <StyledTableCellWithoutBorder>
                                  {aviso_sem_info}
                                </StyledTableCellWithoutBorder>
                              </TableRow>
                            ) : (
                              listaParcelas.map((lista) => (
                                <TableRow key={lista.id_parcela}>
                                  <StyledTableCellWithoutBorder>
                                    {lista.numero_Parce}
                                  </StyledTableCellWithoutBorder>
                                  <StyledTableCellWithoutBorder>
                                    {lista.nome}
                                  </StyledTableCellWithoutBorder>

                                  <StyledTableCellWithoutBorder>
                                    {lista.area_gis}
                                  </StyledTableCellWithoutBorder>
                                </TableRow>
                              ))
                            )}
                            <TableRow>
                              <StyledTableCellWithoutBorder
                                colSpan={2}
                                sx={{
                                  fontFamily: "candara",
                                  fontSize: 20,
                                  color: "#7e2706",
                                }}
                              >
                                Total de Parcelas
                              </StyledTableCellWithoutBorder>
                              <StyledTableCellWithoutBorder
                                sx={{
                                  fontFamily: "candara",
                                  fontSize: 22,
                                  color: "#7e2706",
                                }}
                              >
                                {listaParcelas === undefined
                                  ? 0
                                  : listaParcelas.length}
                              </StyledTableCellWithoutBorder>
                            </TableRow>
                          </TableBody>
                        )}
                      </table>
                    </TableContainer>
                  </TableContainer>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </main>
      </div>
    </CustomThemeProvider>
  );
}
export default Home;
