import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Snackbar } from "@mui/material";
import { Box } from "@mui/material";
import CadernoLayout from "../../../Styles/layout/cadernoLayout";
import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
import { CustomThemeProvider } from "../../../Styles/theme/customThemeprovider";
import { CabecalhoA1Form } from "./cabecalho";
import { AnaliseTerrasForm } from "./analiseterras";
import { Alert } from "../../../Components/Alert/Alert";
import { AnaliseAguaForm } from "./analiseagua";
import { AnaliseFoliar } from "./analise_foliar";
import { ComposicaoQ1Form } from "./composicaoQ1";
import { AdubacaoForm } from "./adubacao";
import { AzotoForm } from "./azoto";
import { NutrientesForm } from "./nutrientes";
import { NecessidadesForm } from "./necessidadesCultura";
import { PlanoNutrientesForm } from "./plano_nutrientes";
import { PlanoFertlizante2Form } from "./plano_fertilizante";
import { ICabecalho } from "../../../Interfaces/anexos/anexo1/analise_e_foliar1_1_3";

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




export default function Anexo1() {
  const classes = useStyles();

  const [message, setMessage] = React.useState("");
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const [obj_anexo_cabecalho_selecionado, set_obj_anexo_cabecalho_selecionado] = useState<ICabecalho | undefined>();

  const handleCloseSnack = () => {
    setOpenSnackSuccess(false);
    setOpenSnackError(false);
  };

  return (
    <div className={classes.root}>
      <CadernoLayout title="Anexo 1 - Plano de fertilização" />
      <main className={classes.contents}>
        <div className={classes.toolbars} />
        <Box width="80%" margin="auto">
          <Beneficiario_nome_id_alinhado_direita />
        </Box>
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
          <CabecalhoA1Form
            obj_anexo_cabecalho_selecionado={obj_anexo_cabecalho_selecionado}
            set_obj_anexo_cabecalho_selecionado={set_obj_anexo_cabecalho_selecionado}

          />
          <AnaliseTerrasForm
            obj_anexo_cabecalho_selecionado={obj_anexo_cabecalho_selecionado}
          />
          <AnaliseAguaForm
            obj_anexo_cabecalho_selecionado={obj_anexo_cabecalho_selecionado}
          />
          <AnaliseFoliar 
          obj_anexo_cabecalho_selecionado={obj_anexo_cabecalho_selecionado}
          />
          <ComposicaoQ1Form 
           obj_anexo_cabecalho_selecionado={obj_anexo_cabecalho_selecionado}
          />
          <AdubacaoForm />
          <AzotoForm />
          <NutrientesForm />
          <NecessidadesForm />
          <PlanoNutrientesForm />
          <PlanoFertlizante2Form />
        </CustomThemeProvider>


      </main>
    </div>
  );
}
