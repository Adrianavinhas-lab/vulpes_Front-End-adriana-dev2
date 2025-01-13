import React, { useState, ChangeEvent, useContext } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  Typography,
} from "@mui/material";
import { FormGroup } from "@mui/material";
import { Checkbox } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { post } from "../../Services/tokenConfig";
import { BarraDeFerramentas } from "../../Components/barra-de-ferramentas/BarraDeFerramentas";
import {
  CustomTextField,
  // CustomTextField_pass,
  // CustomTextField_pass_confirm,
  CustomTextFieldPass,
  CustomTextFieldPassConfirm,
  CustomThemeProvider,
} from "../../Styles/theme/customThemeprovider";
import { func_print } from "../../Func_genericas/func_print";
import { InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ITecnico } from "../../Interfaces/tecnico/tecnico";
import { operacao_erro } from "../../Func_genericas/valores_estaticos";
import { AuthContext } from "../../AuthContext/AuthContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 600,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      background: "green",
    },
    passBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      background: "blue",
    },
    header: {
      textAlign: "center",
      background: "#FAFAFA",

      color: "black",
    },

    card: {
      marginTop: theme.spacing(10),
      background: "#FAFAFA",
    },
  })
);

//ADRIANA VINHAS
export const Register: React.FC<{
  onCloseDialog: () => void;
  setMessage: React.Dispatch<string>,
  setOpenSnackSuccess: React.Dispatch<boolean>,
  setOpenSnackError: React.Dispatch<boolean>,
  set_lista_utilizadores: React.Dispatch<Array<ITecnico>>,
  lista_utilizadores: Array<ITecnico>,
}> = ({ onCloseDialog, setMessage, setOpenSnackSuccess, setOpenSnackError, set_lista_utilizadores, lista_utilizadores }) => {

  const auth = useContext(AuthContext);


  const classes = useStyles();

  const [mostrar_passe, set_mostrar_passe] = useState(false)
  const [mostrar_passe2, set_mostrar_passe2] = useState(false)

  const [error, setError] = useState(false);
  const [error_nome, set_error_nome] = useState(false);
  const [error_escolha_role, set_error_escolha_role] = useState(false);

  const [templateChK, setTemplateChK] = useState<string[]>([]);
  const [checkPass, setCheckPass] = useState(false);
  const [tecnico, setTecnico] = useState({
    nome: "",
    email: "",
    password: "",
    confirmationPassword: "",
  });

  // Função de data
  const [date] = React.useState<Dayjs | null>(dayjs);

  // valida o email
  function isValidEmail(email: any) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const verifica_se_tem_pelo_menos_um_carater_especial = (palavra: string) => {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (format.test(palavra)) {
      return true;
    } else {
      return false;
    }
  }

  /** Botão "registar" verifica email, password e envia dados para a API */
  const handleClick = async () => {

    let flag_valido_nome = false
    let flag_valido_email = false
    let flag_valido_pass = false
    let flag_valido_role = false

    if (tecnico.nome.length === 0) {
      set_error_nome(true)
      flag_valido_nome = false

    } else {
      set_error_nome(false)
      flag_valido_nome = true
    }

    if (tecnico.email.length === 0) {
      setError(true)
      flag_valido_email = false

    } else {
      if (isValidEmail(tecnico.email) === true) {
        setError(false)
        flag_valido_email = true

      } else {
        setError(true)
        flag_valido_email = false
      }
    }

    if (!verifica_se_tem_pelo_menos_um_carater_especial(tecnico.password) || !verifica_se_tem_pelo_menos_um_carater_especial(tecnico.confirmationPassword) || tecnico.password.length < 8 || tecnico.confirmationPassword.length < 8 || tecnico.password !== tecnico.confirmationPassword) {
      setCheckPass(true)
      flag_valido_pass = false

    } else {
      setCheckPass(false)
      flag_valido_pass = true

    }
    if (templateChK.length === 0) {
      set_error_escolha_role(true)
      flag_valido_role = false

    } else {
      set_error_escolha_role(false)
      flag_valido_role = true
    }




    if (flag_valido_email && flag_valido_nome && flag_valido_pass && flag_valido_role) {
      await submitRegistration(); //Envia para a API
    }


  };

  // Função de registo de tecnico
  const submitRegistration = async () => {
    try {
      var id = auth.user?.id_org

      console.log({
        email: tecnico.email,
        nome: tecnico.nome,
        password: tecnico.password,
        roles: templateChK,
        id: 0,
        disabled: false,
        id_org: id,
        last_login: date,
        last_update: date,
        create_date: date,
        uuid: "",
      })
      const response = await post("/users/new_user", {
        parameter: {
          email: tecnico.email,
          nome: tecnico.nome,
          password: tecnico.password,
          roles: templateChK,
          id: 0,
          disabled: false,
          id_org: id,
          last_login: date,
          last_update: date,
          create_date: date,
          uuid: "",
        },
      });



      if (response.status === 200) {

        setTecnico({
          nome: "",
          email: "",
          password: "",
          confirmationPassword: "",
        })
        setTemplateChK([])

        let lista_aux = lista_utilizadores
        lista_aux.push(response.data.result)
        set_lista_utilizadores(lista_aux)
        onCloseDialog();
        setMessage(response.data.message)
        setOpenSnackSuccess(true)

      }

    } catch (error) {
      func_print('submitRegistration', error, true)
      setMessage(operacao_erro)
      setOpenSnackError(true)

    }
  };



  //------------------------------------------//

  const handleTemplateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = templateChK.indexOf(event.target.value);
    // se não estiver escolhido
    if (index === -1) {
      //procura as opções existentes e adiciona o event
      setTemplateChK([...templateChK, event.target.value]);
    } else {
      setTemplateChK(
        templateChK.filter((templateChK) => templateChK !== event.target.value)
      );
    }
  };

  //----------------------------------------------------------------//

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setTecnico((prevCabecalho) => ({
      ...prevCabecalho,
      [name]: value,
    }));
  };


  return (
    <>
      <CustomThemeProvider>

        <div>
          <form className={classes.container} noValidate autoComplete="off">
            <Card>
              <CardContent>
                <div>
                  <CustomTextField
                    error={error_nome}
                    helperText={error_nome === true ? 'Preenchimento do nome obrigatório' : ''}
                    fullWidth
                    name="nome"
                    type="nome"
                    label="Nome Completo"
                    placeholder="Nome Completo"
                    margin="normal"
                    value={tecnico.nome}
                    onChange={handleInputChange}
                  />
                  <CustomTextField
                    error={error}
                    helperText={error === true ? 'Email inválido' : ''}
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Email"
                    margin="normal"
                    value={tecnico.email}
                    onChange={handleInputChange}
                  />


                  <CustomTextFieldPass

                    error={checkPass}
                    selectBool={checkPass}
                    name="password"
                    label="Palavra-Passe"
                    //helperText={checkPass === true ? 'Palavra-Passe inválida' : ''}
                    value={tecnico.password}
                    onChange={handleInputChange}
                    placeholder="Palavra-Passe"

                    type={mostrar_passe ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => { set_mostrar_passe(!mostrar_passe) }}

                          edge="end"
                        >
                          {mostrar_passe ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <CustomTextFieldPassConfirm
                    error={checkPass}
                    selectBool={checkPass}

                    name="confirmationPassword"
                    label="Palavra-Passe"
                    // helperText={checkPass === true ? 'Palavra-Passe inválida' : ''}
                    value={tecnico.confirmationPassword}
                    onChange={handleInputChange}
                    placeholder="Confirme a palavra-passe"

                    type={mostrar_passe2 ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          // aria-label="toggle password visibility"
                          onClick={() => { set_mostrar_passe2(!mostrar_passe2) }}

                          edge="end"
                        >
                          {mostrar_passe2 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }

                  />
                  {/* <FormHelperText id="username-helper"
                    error={checkPass}>{checkPass === true ? 'Palavra-Passe inválida' : ''}
                  </FormHelperText> */}

                  <Box sx={{ height: 20 }}></Box>
                  <FormControl>
                    <FormLabel sx={{ fontFamily: "candara", fontSize: 18 }}>
                      Função:
                    </FormLabel>
                    <br />

                    <div style={{ marginLeft: 150 }}>
                      <FormGroup>
                        <div style={{ display: "flex" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <FormControlLabel
                              label={
                                <Typography fontFamily="candara" fontSize={18}>
                                  Administrador
                                </Typography>
                              }
                              value="ADMIN"
                              control={
                                <Checkbox
                                  sx={{
                                    color: "#aaaaaa",
                                    "&.Mui-checked": {
                                      color: "#C94F1E",
                                      fontFamily: "candara",
                                    },
                                  }}
                                  checked={templateChK.includes("ADMIN")}
                                  onChange={handleTemplateChange}

                                />
                              }

                            />

                          </div>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <FormControlLabel
                              label={
                                <Typography fontFamily="candara" fontSize={18}>
                                  Técnico
                                </Typography>
                              }
                              value="TECNICO"
                              control={
                                <Checkbox
                                  sx={{
                                    color: "#aaaaaa",
                                    "&.Mui-checked": {
                                      color: "#C94F1E",
                                    },
                                  }}
                                  checked={templateChK.includes("TECNICO")}
                                  onChange={handleTemplateChange}

                                />
                              }
                            />
                          </div>
                        </div>
                        <FormHelperText id="username-helper"
                          error={error_escolha_role}>{error_escolha_role === true ? 'Função inválida' : ''}
                        </FormHelperText>
                      </FormGroup>
                    </div>
                  </FormControl>
                </div>
              </CardContent>
              <CardActions>
                <Box
                  width="100%"
                  height="auto"
                  display="flex"
                  justifyContent="end"
                >
                  <BarraDeFerramentas
                    mostrarBotaoGravar
                    aoClicarGravar={() => handleClick()}
                  />
                </Box>
                <br />
              </CardActions>
            </Card>
          </form>
        </div>
      </CustomThemeProvider>
    </>
  );
};
