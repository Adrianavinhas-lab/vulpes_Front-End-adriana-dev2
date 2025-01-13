import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import HomeViewTecnico from "../../Styles/layout/homeViewTecnico";
import ResetPassword from "../Login/ResetPassword";

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
  })
);

export default function DefinicoesTecnico() {
  const classes = useStyles();



  return (
    <div className={classes.root}>
      <HomeViewTecnico title="Definições" />
      <main className={classes.contents}>
        <div className={classes.toolbars} />
        <ResetPassword/>
        
        {/* <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <Box
              height={theme.spacing(20)}
              //sx={{ "& button": { m: 1 } }}
              padding={3}
              width="100%"
              display="flex"
              alignItems="center"
              component={Paper}
              justifyContent="center"
            >
              <Typography variant="h4">
                Carregar os logotipos da empresa
              </Typography>
              <BarraDeFerramentas
                mostrarBotaoUpload
                textoBotaoUpload="Carregar Logotipo"
                aoClicarUpload={handleClickOpen}
              />
            </Box>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
              <DialogTitle>Carregar Ficheiro</DialogTitle>
              <ImgUpload />
              <BarraDeFerramentas
              mostrarBotaoCancelar
              aoClicarCancelar={handleClose} />
            </Dialog>
            <br/>
            <br/>
            <br/>
            <br/>
            <Box
              height={theme.spacing(20)}
              //sx={{ "& button": { m: 1 } }}
              padding={3}
              width="100%"
              display="flex"
              alignItems="center"
              component={Paper}
              justifyContent="center"
            >
              <Typography variant="h4">
                Criar um Novo Template
              </Typography>
              <BarraDeFerramentas
                mostrarBotaoUpload
                textoBotaoUpload="Criar Template"
                aoClicarUpload={template}
              />
            </Box>
          </AppBar>
        </Paper> */}
      </main>
    </div>
  );
}

