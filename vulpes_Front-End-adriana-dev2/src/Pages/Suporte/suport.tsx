import { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Button, CardActions, CardContent, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import img from "../../Assets/Images/VULPES LOGO V1 SUPORTE HUGE .png";
import Layout from "../../Styles/layout/index";
import { post } from "../../Services/tokenConfig";

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
    header: {
      textAlign: "center",
      background: "#FAFAFA",
      color: "black",
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

export default function Suporte() {
  const classes = useStyles();
  const [emailvar, setEmailvar] = useState("");
  const [descriptionvar, setDescriptionvar] = useState("");
  // const [error, setError]=useState(false);
  const [msgError, setMsgError] = useState("");

  const [iserror, setiserror] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorDesc, setErrorDesc] = useState(false);
  const [errorDescMsg, seterrorDescMsg] = useState("");

  //MediaQuery Para um Layout responsivo
  const matches = useMediaQuery("(min-width:950px)");

  function isValidEmail(email: any) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleClick = () => {
    if (!isValidEmail(emailvar)) {
      setError(true);
      setMsgError("Email inválido");
    } else if (descriptionvar === "") {
      setError(false);
      setMsgError("");
      setErrorDesc(true);
      seterrorDescMsg("O campo 'descrição' não pode estar vazio");
    } else {
      setErrorDesc(false);
      seterrorDescMsg("");
      setError(false);
      setMsgError("");
      submitTicket(); //Envia para a API
    }

    //   setMessage(event.target.value);
  };

  const submitTicket = async () => {
    //Falta testar
    const response = await post("/suporte", {
      body: JSON.stringify({ email: emailvar, descricao: descriptionvar }),
    });

    // console.log(response);

    if (!response) {
      setSuccess(false);
      setiserror(true);
      console.log("Erro ao conectar com a API");
    } else {
      setSuccess(true);
      setiserror(false);
      setEmailvar("");
      setDescriptionvar("");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Layout title="Suporte" />
        <main className={classes.contents}>
          <div className={classes.toolbars} />
          {iserror && (
            <Alert severity="error">
              <AlertTitle>Erro</AlertTitle>O ticket não foi submetido por falha na
              ligação
            </Alert>
          )}
          {success && (
            <Alert severity="success">
              <AlertTitle>Sucesso</AlertTitle>
              Ticket enviado com sucesso
            </Alert>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor:'red'
            }}
          >

            <Card
              sx={{
                display: "flex",
                width: "100%",
                flexDirection:'column'
              }}
            >
              <div
              
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection:'row',
                paddingLeft:20

              }}>
                <CardContent>
                  <Typography
                    component="div"
                    variant="h3"
                    fontFamily="candara"
                    color="#7e2706"
                  >
                    Suporte
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    fontFamily="candara"
                  >
                    Linha de apoio
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{
                    width: "20%",
                    height: "20%",
                    margin: "auto",
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                  image={img}
                  alt="Caderno de Campo"
                />
              </div>


              <CardContent>

                <CardContent>
                  <TextField
                    error={error}
                    helperText={msgError}
                    fullWidth
                    id="username"
                    label={
                      <Typography fontFamily="candara">
                        Email para contacto
                      </Typography>
                    }
                    placeholder="Email "
                    margin="normal"
                    sx={{ width: "100%" }}
                    value={emailvar}
                    onChange={(e) => setEmailvar(e.target.value)}
                  />

                  <TextField
                    error={errorDesc}
                    helperText={errorDescMsg}
                    id="outlined-multiline-static"
                    label={
                      <Typography fontFamily="candara">
                        Descrição
                      </Typography>
                    }
                    placeholder="Descrição"
                    multiline
                    sx={{ width: "100%" }}
                    rows={5}
                    value={descriptionvar}
                    onChange={(e) => setDescriptionvar(e.target.value)}
                  />
                </CardContent>
                <CardActions
                  style={{
                    display: "flex",
                    alignItems: "right",
                    justifyContent: "right",
                    marginRight: 10,
                  }}
                >
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{
                      backgroundColor: "#ffffff",
                      fontFamily: "candara",
                      color: "#000000",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#f7a837",
                      },
                    }}
                    onClick={() => handleClick()}
                  >
                    Enviar
                  </Button>
                </CardActions>
              </CardContent>

            </Card>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
