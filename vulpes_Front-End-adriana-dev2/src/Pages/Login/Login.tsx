import React, { useState, useEffect, useContext } from "react";

import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Alert, Box, CardActions, CardContent, Snackbar } from "@mui/material";
import { Typography } from "@mui/material";

import backgroundImage from "../../Assets/Images/vulpeslogin.png";
import LoadingVulpes from "../../Styles/Loader/loading";
import { AuthContext } from "../../AuthContext/AuthContext";
import { alert_mensagem } from './../../Func_genericas/alert_mensagem'
import { func_print } from "../../Func_genericas/func_print";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "60%",
      backgroundPosition: "50% 70%",
      backgroundRepeat: "no-repeat",
    },
    container: {
      display: "flex",
      maxWidth: 350,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',

    },
    loginBtn: {
      marginLeft: 5,
      marginRight: 5,
      flexGrow: 1,
      background: "#ffffff",
      color: "#000000",
      "&:hover": {
        color: "#ffffff",
        backgroundColor: "#7e2706",
      },
    },
    card: {
      marginTop: theme.spacing(4),
      borderColor: "#566d0a",
    },
  })
);

export default function Login() {
  const classes = useStyles();
  const auth = useContext(AuthContext);


  const [username, setUsername] = useState("carlos@teste.pt");
  //const [username, setUsername] = useState("tomas@teste.pt");
  const [password, setPassword] = useState("secret");
  const [error] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText] = useState("");


  // VARIAVEIS  USESTATE
  const [msg_aviso, set_msg_aviso] = useState('')


  // FLAG USESTATE
  const [open_modal_aviso, set_open_modal_aviso] = useState(false)


  useEffect(() => {
    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, password]);

  const submitLogin = async (e: any) => {

    setIsLoading(true);
    try {

      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("scope", "");
      formData.append("client_id", "");
      formData.append("client_secret", "");

      if (username && password) {

        let res: any = await auth.signin(formData);
        func_print('res', res)

        if (res.flag === false) {

          set_msg_aviso(res.error)
          set_open_modal_aviso(true)
          setTimeout(() => {
            set_open_modal_aviso(false);
          }, 3000);

        } else {

          auth.func_set_user_role(res.role)
        }
      }
      setIsLoading(false);

    } catch (error: any) {
      set_msg_aviso(error)
      set_open_modal_aviso(true)
      setTimeout(() => {
        set_open_modal_aviso(false);
      }, 3000);

      setIsLoading(false);

    }
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || submitLogin(e); //handleLogin();
    }
  };

  return (
    <>
      {

        alert_mensagem(open_modal_aviso, msg_aviso, false/*  true, set_open_modal_aviso */)
      }
      {isLoading ? (
        <LoadingVulpes />
      ) : (
        <div className={classes.root}>
          <React.Fragment>
            <div style={{

              display: "flex",
              flexDirection: 'column',
              width: "100vw",
              height: "100vh"
            }}>
              <Box
                display={"flex"}
                flex={0.7}

                marginLeft={'50%'}
                alignItems={'flex-end'}
                marginBottom={20}

              >
                <Box
                  className={classes.container}
                  component="form"
                  noValidate
                  autoComplete="off"
                >
                  <div className={classes.card}>
                    <Typography
                      fontSize={40}
                      fontFamily={"candara"}
                      color="#7e2706"
                      sx={{
                        margin: 0,
                        padding: 0,
                        '& .MuiTypography-h1': {
                          margin: 0,
                          padding: 0,

                        },
                        '& .MuiTypography-root': {
                          margin: 0,
                          padding: 0,

                        }
                      }}
                    >Bem vindo!
                    </Typography>
                    <Typography
                      color="#000000"
                      sx={{ padding: 0.5, fontSize: 14 }}
                      fontFamily={"candara"}
                    >
                      Introduza os seus dados para iniciar sessão
                    </Typography>
                    <CardContent>
                      <TextField
                        style={{ borderColor: "#566d0a", marginBottom: 20 }}
                        variant="outlined"
                        error={error}
                        fullWidth
                        id="username"
                        type="email"
                        label="Utilizador"
                        placeholder="Utilizador"
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e)}
                      />
                      <TextField
                        variant="outlined"
                        error={error}
                        fullWidth
                        id="password"
                        type="password"
                        label="Palavra-Passe"
                        placeholder="Palavra-Passe"
                        helperText={helperText}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e)}
                      />
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                        className={classes.loginBtn}
                        onClick={(e) => { submitLogin(e) }}
                        disabled={isButtonDisabled}
                      >
                        <Typography
                          variant="subtitle2"
                          fontFamily={"candara"}
                          fontSize={18}
                        >
                          Iniciar Sessão
                        </Typography>
                      </Button>
                    </CardActions>
                    <Typography
                      variant="subtitle2"
                      fontFamily={"candara"}
                      fontSize={14}
                      marginX={2}
                    >
                      Ao iniciar sessão declara que concorda com os nosso termos e
                      politica de dados
                    </Typography>
                  </div>

                </Box>
              </Box>
              <Box
                display={"flex"}
                flex={0.3}
                alignItems={"flex-end"}
                paddingRight={1}

                justifyContent={'flex-end'}
              >
                <Typography variant="subtitle2" fontFamily={"candara"}>
                  Desenvolvido por 2GF Innovation Systems
                </Typography>
              </Box>
            </div>
          </React.Fragment>
        </div>
      )}
    </>
  );
}
