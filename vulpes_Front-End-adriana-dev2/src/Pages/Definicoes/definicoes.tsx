import React, { useContext, useEffect, useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { DialogContent } from "@mui/material";
import { Typography, Stack } from "@mui/material";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";

import { get, logos } from "../../Services/tokenConfig";

import Layout from "../../Styles/layout/index";
import { Templategenerico } from "./Templategenerico";

import LoadingVulpes from "../../Styles/Loader/loading";
import { AuthContext } from "../../AuthContext/AuthContext";
import { func_print } from "../../Func_genericas/func_print";
import BasicPopover from "../../Components/Popover";
import { BarraDeFerramentas } from "../../Components/barra-de-ferramentas/BarraDeFerramentas";
import Logotipo0 from "../../Components/Upload/logotipo0";
import Logotipo1 from "../../Components/Upload/logotipo1";
import Logotipo2 from "../../Components/Upload/logotipo2";
import { ITemplate } from "../../Interfaces/templates/template1";
import { IOrg } from "../../Interfaces/organizacao/organizacao";
import { operacao_erro } from "../../Func_genericas/valores_estaticos";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3),
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

    label: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(3),
        width: theme.spacing(16),
        height: theme.spacing(16),
        minWidth: 325,
      },
    },
  })
);

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          // input label when focused
          "& label.Mui-focused": {
            color: "#c94f1e",
            // focused color for input with variant='standard'
            "& .MuiInput-underline:after": {
              borderBottomColor: "#c94f1e",
            },
            // focused color for input with variant='filled'
            "& .MuiFilledInput-underline:after": {
              borderBottomColor: "#c94f1e",
            },
          },
          // focused color for input with variant='outlined'
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#c94f1e",
            },
          },
        },
      },
    },
  },
});




export default function Definicoes() {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  const imageUploader = React.useRef<any>(null);
  const UploaderLogo1 = React.useRef<any>(null);
  const UploaderLogo2 = React.useRef<any>(null);


  const [openlogo1, setOpenlogo1] = useState(false);
  const [openlogo2, setOpenlogo2] = useState(false);


  const [isloading, setIsLoading] = useState(false);

  const [list_template4, set_list_template4] = useState<ITemplate[]>([]);
  const [list_template5, set_list_template5] = useState<ITemplate[]>([]);

  const [orgData, setOrgdata] = useState<IOrg>();
  const [message, setMessage] = useState("");
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const [open, setOpen] = useState(false);


  /*********************** GET DATA FROM ORG  *******************************************************************/



  const get_info = async () => {
    try {
      setIsLoading(true);

      const response = await get(`/get_org/${auth.user?.id_org}`);
      if (response.status === 200) {
        setOrgdata(response.data.result);
      }



      const urlrelativa_template3 = `/get_template_org_template/4/${auth.user?.id_org}`;
      const data4 = await get(urlrelativa_template3);
      if (data4.status === 200) {
        set_list_template4(data4.data.result);
      }

      const urlrelativa_template5 = `/get_template_org_template/5/${auth.user?.id_org}`;

      const data5 = await get(urlrelativa_template5);

      func_print('data5', data5)
      if (data5.status === 200) {
        set_list_template5(data5.data.result);
      }

      setIsLoading(false);

    } catch (error) {
      func_print('get_info', error, true)
      setMessage(operacao_erro)
      setOpenSnackError(true)
      setIsLoading(false);
    }
  }



  useEffect(() => {

    (async () => {
      await get_info();
    })();


  }, []);



  /*********************** CREATE LOGOTIPO *********************************************************** */

  // Abrir e fechar o popup do logotipo
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);

  };

  // const uploadedImage = React.useRef<any>(null);

  // Função que mostra a imagem no ecrã. Não compativel.
  // Guardar para mostrar imagem no ecrã.
  const handleImageUpload = async (e: any) => {
    try {


      const [file] = e.target.files;

      if (file) {
        const reader = new FileReader();
        const { current } = imageUploader;
        current.file = file;
        reader.onload = (e: any) => {
          current.src = e.target.result;
        };
        reader.readAsDataURL(file);


      }
    } catch (error) {
      func_print('handleImageUpload', error, true)
      setMessage(operacao_erro)
      setOpenSnackError(true)
    }
  };

  /*********************** CREATE LOGOTIPO1 *********************************************************** */
  const handleClickOpenLogo1 = () => {
    setOpenlogo1(true);
  };
  const handleCloseLogo1 = () => {
    setOpenlogo1(false);
  };


  const handleUploadLogo1 = async (e: any) => {
    try {

      const [file] = e.target.files;

      if (file) {
        const reader = new FileReader();
        const { current } = UploaderLogo1;
        current.file = file;
        reader.onload = (e: any) => {
          current.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      func_print('handleUploadLogo1', error, true)
      setMessage(operacao_erro)
      setOpenSnackError(true)
    }
  };

  /*********************** CREATE LOGOTIPO2 *********************************************************** */
  const handleClickOpenLogo2 = () => {
    setOpenlogo2(true);
  };
  const handleCloseLogo2 = () => {
    setOpenlogo2(false);
  };


  const handleUploadLogo2 = async (e: any) => {
    try {

      const [file] = e.target.files;

      if (file) {
        const reader = new FileReader();
        const { current } = UploaderLogo2;
        current.file = file;
        reader.onload = (e: any) => {
          current.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      func_print('handleUploadLogo2', error, true)
      setMessage(operacao_erro)
      setOpenSnackError(true)
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Layout title="Definições" />
        <main className={classes.contents}>
          <div className={classes.toolbars} />
          {isloading ? (
            <LoadingVulpes />
          ) : (
            <>
              <div>
                <Paper elevation={3} sx={{ width: "100%", padding: 7.8 }}>
                  <Stack direction="row">
                    {/****** UPLOAD LOGOTIPO 1 ********************/}

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "33%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        ref={imageUploader}
                        style={{
                          display: "none",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          border: "2px solid #7e2706",
                          width: "100px",
                          height: "100px",
                        }}
                        onChange={() => imageUploader.current.click()}
                        onClick={handleClickOpen}
                      >
                        <img
                          ref={imageUploader}
                          alt="Upload Logotipo"
                          src={logos + orgData?.logo}
                          style={{
                            width: "50%",
                            height: "80%",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                      {/* <Typography fontFamily="candara">Clique para carregar/alterar logotipo</Typography> */}

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        onClick={() => imageUploader.current.click()}
                      ></div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 22,
                            fontWeight: 700,
                            fontFamily: "candara",
                          }}
                        >
                          Logotipo 1
                        </Typography>

                        <BasicPopover
                          text="Clique para importar ou alterar o logotipo da
                            empresa"
                        />
                      </div>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        fullWidth
                        maxWidth="md"
                      >
                        <Stack direction="row">
                          <DialogTitle sx={{ fontFamily: "candara" }}>
                            Carregar Logotipo
                          </DialogTitle>
                          <DialogContent
                            sx={{ display: "flex", justifyContent: "end" }}
                          >
                            <BarraDeFerramentas
                              mostrarBotaoCancelar
                              aoClicarCancelar={handleClose}
                            />
                          </DialogContent>
                        </Stack>
                        <Logotipo0 setOpen={setOpen} setOrgdata={setOrgdata} orgData={orgData} />
                        {/* <DialogActions><UploadResize/></DialogActions> */}
                      </Dialog>
                    </div>

                    {/****** UPLOAD LOGOTIPO2 ********************/}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "33%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUploadLogo1}
                        ref={UploaderLogo1}
                        style={{
                          display: "none",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          border: "2px solid #7e2706",
                          width: "100px",
                          height: "100px",
                        }}
                        onChange={() => UploaderLogo1.current.click()}
                        onClick={handleClickOpenLogo1}
                      >
                        <img
                          ref={UploaderLogo1}
                          alt="Upload Logotipo"
                          src={logos + orgData?.logo1}
                          style={{
                            width: "50%",
                            height: "90%",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                      {/* Clique para carregar/alterar logotipo */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        onClick={() => UploaderLogo1.current.click()}
                      ></div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 22,
                            fontWeight: 700,
                            fontFamily: "candara",
                          }}
                        >
                          Logotipo 2
                        </Typography>

                        <BasicPopover
                          text=" Clique para importar ou alterar o logotipo da
                            empresa"
                        />
                      </div>
                      <Dialog
                        open={openlogo1}
                        onClose={handleCloseLogo1}
                        fullWidth
                        maxWidth="md"
                      >
                        <Stack direction="row">
                          <DialogTitle sx={{ fontFamily: "candara" }}>Carregar Logotipo</DialogTitle>
                          <DialogContent
                            sx={{ display: "flex", justifyContent: "end" }}
                          >
                            <BarraDeFerramentas
                              mostrarBotaoCancelar
                              aoClicarCancelar={handleCloseLogo1}
                            />
                          </DialogContent>
                        </Stack>
                        <Logotipo1 setOpen={setOpenlogo1} setOrgdata={setOrgdata} orgData={orgData} />
                      </Dialog>
                    </div>

                    {/****** UPLOAD LOGOTIPO3 ********************/}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "33%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUploadLogo2}
                        ref={UploaderLogo2}
                        style={{
                          display: "none",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          border: "2px solid #7e2706",
                          width: "100px",
                          height: "100px",
                        }}
                        onChange={() => UploaderLogo2.current.click()}
                        onClick={handleClickOpenLogo2}
                      >
                        <img
                          ref={UploaderLogo2}
                          alt="Upload Logotipo"
                          src={logos + orgData?.logo2}
                          style={{
                            width: "50%",
                            height: "90%",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                      {/* Clique para carregar/alterar logotipo */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        onClick={() => UploaderLogo2.current.click()}
                      ></div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 22,
                            fontWeight: 700,
                            fontFamily: "candara",
                          }}
                        >
                          Logotipo 3
                        </Typography>

                        <BasicPopover
                          text="Clique para importar ou alterar o logotipo da
                            empresa"
                        />
                      </div>
                      <Dialog
                        open={openlogo2}
                        onClose={handleCloseLogo2}
                        fullWidth
                        maxWidth="md"
                      >
                        <Stack direction="row">
                          <DialogTitle sx={{ fontFamily: "candara" }}>Carregar Logotipo</DialogTitle>
                          <DialogContent
                            sx={{ display: "flex", justifyContent: "end" }}
                          >
                            <BarraDeFerramentas
                              mostrarBotaoCancelar
                              aoClicarCancelar={handleCloseLogo2}
                            />
                          </DialogContent>
                        </Stack>
                        <Logotipo2 setOpen={setOpenlogo2} setOrgdata={setOrgdata} orgData={orgData} />
                      </Dialog>
                    </div>
                  </Stack>
                </Paper>
              </div>
              <Templategenerico
                lista_templates={list_template4}
                titulo='Templates Anexo IV'
                tipo_de_anexo='4'
                set_lista_templates={(lista: Array<ITemplate>) => set_list_template4(lista)}

              />
              <Templategenerico
                lista_templates={list_template5}
                set_lista_templates={set_list_template5}
                titulo='Templates Anexo V'
                tipo_de_anexo='5'
              />
            </>
          )}

        </main>
      </div>
    </ThemeProvider>
  );
}
