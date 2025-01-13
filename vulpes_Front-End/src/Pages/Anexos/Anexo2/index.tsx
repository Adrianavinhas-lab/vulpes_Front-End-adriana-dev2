import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Snackbar } from "@mui/material";
import CadernoLayout from "../../../Styles/layout/cadernoLayout";
import { CaraterizacaoAreaForm } from "./caraterizacao";
import { ControloVegetacaoAreaForm } from "./controlo";
import { OperacoesSementeiraForm } from "./operacoesSementeira";
import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
import { CustomThemeProvider } from "../../../Styles/theme/customThemeprovider";
import LoadingVulpes from "../../../Styles/Loader/loading";
import { ManeioCabecalhoForm } from "./maneio_cabecalho";
import { CalagemForm } from "./calagem";
import { AcoesForm } from "./acoes";
import { SementeiraPastagemForm } from "./sementeira";
import { AcoesMelhoriaUmForm } from "./acoes/acoes_melhoria_um";
import { AlteracoesAEfetuarAreaForm } from "./alteracoes";
import { Alert } from "../../../Components/Alert/Alert";

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
  })
);



export default function Anexo2() {
  const classes = useStyles();


  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);


  const handleCloseSnack = () => {

    setOpenSnackSuccess(false);
    setOpenSnackError(false);
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
      <div className={classes.root}>
        <CadernoLayout title="Anexo 2 - Plano de Gestão do Pastoreio " />
        <main className={classes.contents}>
          <div className={classes.toolbars} />
          <div>
            <Box width="80%" margin="auto">
              <Beneficiario_nome_id_alinhado_direita />
            </Box>
            <CustomThemeProvider>
              {isLoading ? (
                <LoadingVulpes />
              ) : (
                <>
                  <CaraterizacaoAreaForm />
                  <ManeioCabecalhoForm />
                  <ControloVegetacaoAreaForm />
                  <SementeiraPastagemForm />
                  <OperacoesSementeiraForm />
                  <CalagemForm />
                  <AcoesForm />
                  <AcoesMelhoriaUmForm />
                  <AlteracoesAEfetuarAreaForm />


                </>
              )}
              <Box height={150}></Box>
            </CustomThemeProvider>
          </div>
        </main>
      </div>
    </>
  );
}
