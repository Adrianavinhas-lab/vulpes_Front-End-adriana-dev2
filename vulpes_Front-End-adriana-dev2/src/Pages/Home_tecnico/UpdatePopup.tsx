import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { CardActions, CardContent, Stack } from "@mui/material";
import { FormControl, InputLabel } from "@mui/material";
import { MenuItem, Paper, Snackbar, TextField } from "@mui/material";
import { Table, TableContainer } from "@mui/material";
import { Select, SelectChangeEvent } from "@mui/material";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import PhoneInput from "react-phone-number-input";
import { PatternFormat } from "react-number-format";
import { post } from "../../Services/tokenConfig";
import { BarraDeFerramentas } from "../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { isValidEmail } from "../../Func_genericas/isValidEmail";
import { func_print } from "../../Func_genericas/func_print";
import LoadingVulpes from "../../Styles/Loader/loading";
import { IBeneficiarios } from "../../Interfaces/beneficiarios/beneficiario";
import { operacao_erro, operacao_sucesso } from "../../Func_genericas/valores_estaticos";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
  })
);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
  lista_pesquisa: Array<IBeneficiarios>;
  lista: Array<IBeneficiarios>;
  dados: any;
  set_lista: React.Dispatch<Array<IBeneficiarios>>;
  set_lista_pesquisa: React.Dispatch<Array<IBeneficiarios>>;
  handleCloseEditBenef: () => void;
}

function UpdatePopup({ lista, dados, set_lista, handleCloseEditBenef, lista_pesquisa, set_lista_pesquisa }: Props) {
  const classes = useStyles();
  const [isloading, setIsLoading] = useState(false);

  // Data atual
  const [date] = React.useState<Dayjs | null>(dayjs);

  const beneficiarioId = dados.id_agri;
  const [telemovel, setTelemovel] = useState(dados.telemovel.toString());
  const [telefone, setTelefone] = useState(dados.telefone.toString());
  const [email, setEmail] = useState(dados.email);
  const [morada, setMorada] = useState(dados.morada);
  const [Concelho, setConcelho] = useState(dados.Concelho);
  const [freguesia, setFreguesia] = useState(dados.freguesia);
  const [Codigo_postal, setCodigo_postal] = useState(dados.Codigo_postal);
  const [disabled, setDisabled] = useState(dados.disabled);
  const [message, setMessage] = useState("");

  const [error_email, set_error_email] = useState(false);

  /****** fecha o alerta **********************************/
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);

  const handleCloseSnack = () => {
    setOpenSnackSuccess(false);
    setOpenSnackError(false);
  };


  /** Editar registo */

  const updateById = async (Id: number) => {
    try {
      let flag_valido_email = false;

      if (email.length !== 0 && isValidEmail(email) === false) {
        set_error_email(true);
        flag_valido_email = false;
      } else {
        set_error_email(false);
        flag_valido_email = true;
      }

      if (flag_valido_email === true) {
        setIsLoading(true);

        let data = await post(`/update_beneficiario`, {
          parameter: {
            id_agri: Id,
            nome: dados.nome,
            email: email,
            telefone: parseInt(telefone),
            telemovel: parseInt(telemovel),
            morada: morada,
            Concelho: Concelho,
            freguesia: freguesia,
            Codigo_postal: Codigo_postal,
            nif: dados.nif,
            ifap: dados.ifap,
            disabled: disabled,
            last_update: date,
            create_date: date,
            id_org: dados.id_org,
            uuid: "",
          },
        });

        if (data.status === 200) {

          let list_aux = lista.map((el: IBeneficiarios) => {
            if (el.id_agri === data.data.result.id_agri) {
              return data.data.result;
            } else {
              return el;
            }
          });

          set_lista(list_aux);

          let list_pesquisa_aux = lista_pesquisa.map((el: IBeneficiarios) => {
            if (el.id_agri === data.data.result.id_agri) {
              return data.data.result;
            } else {
              return el;
            }
          });

          set_lista_pesquisa(list_pesquisa_aux);
          setMessage(operacao_sucesso)

          setOpenSnackSuccess(true);
          handleCloseEditBenef();
        } else {
          setMessage(operacao_erro)

          setOpenSnackError(true);
        }
        setIsLoading(false);
      }
    } catch (error) {
      func_print("updateById", error, true);
      setMessage(operacao_erro)
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log("beneficiario", dados);
  //   console.log("beneficiarioId", beneficiarioId);
  // }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setDisabled(event.target.value as string);
  };

  return (
    <div className={classes.root}>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ height: "auto" }}
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
        {isloading ? (
          <LoadingVulpes />
        ) : (
          <div id="novobeneficiario">
            <CardContent>
              <Table>
                <TextField
                  fullWidth
                  id="name"
                  label="Nome Completo"
                  placeholder="Nome Completo"
                  required
                  margin="normal"
                  sx={{ width: "70%", paddingRight: "5px" }}
                  value={dados.nome}
                  disabled={true}
                />

                <TextField
                  fullWidth
                  id="nif"
                  label="NIF"
                  placeholder="NIF"
                  required
                  margin="normal"
                  sx={{ width: "15%", paddingRight: "5px" }}
                  value={dados.nif}
                  disabled={true}
                />

                <TextField
                  fullWidth
                  id="ifap"
                  label="IFAP"
                  placeholder="IFAP"
                  required
                  margin="normal"
                  sx={{ width: "15%", paddingRight: "5px" }}
                  value={dados.ifap}
                  disabled={true}
                />

                <TextField
                  fullWidth
                  id="morada"
                  label="Morada"
                  required
                  placeholder="Morada"
                  margin="normal"
                  sx={{ width: "70%", paddingRight: "5px" }}
                  value={morada}
                  onChange={(e) => setMorada(e.target.value)}
                />

                <PatternFormat
                  format="%%%%-%%%"
                  customInput={TextField}
                  label="Código Postal"
                  patternChar="%"
                  value={Codigo_postal || ""}
                  margin="normal"
                  sx={{ width: "15%", paddingRight: "5px" }}
                  onChange={(e) => setCodigo_postal(e.target.value)}
                />

                <TextField
                  fullWidth
                  id="concelho"
                  label="Concelho"
                  placeholder="Concelho"
                  margin="normal"
                  sx={{ width: "15%", paddingRight: "5px" }}
                  value={Concelho}
                  onChange={(e) => setConcelho(e.target.value)}
                />
                <Stack direction="row">
                  <TextField
                    fullWidth
                    id="freguesia"
                    label="Freguesia"
                    placeholder="Freguesia"
                    margin="normal"
                    sx={{ width: "15%", paddingRight: "5px" }}
                    value={freguesia}
                    onChange={(e) => setFreguesia(e.target.value)}
                  />

                  <div
                    style={{
                      flex: 0.5,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: `1px solid silver`,
                      fontSize: 14,
                      borderRadius: 4,
                      marginRight: 3,
                      width: "15%",
                      paddingRight: "5px",
                    }}
                  >
                    <PhoneInput
                      defaultCountry="PT"
                      placeholder="Número de telefone"
                      value={"+351" + telefone}
                      onChange={(e: any) => {
                        setTelefone(e);
                      }}
                      style={{
                        width: "90%",
                        height: 51,
                      }}
                    />
                  </div>

                  <div
                    style={{
                      flex: 0.5,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: `1px solid silver`,
                      fontSize: 14,
                      borderRadius: 4,
                      marginRight: 3,
                      width: "15%",
                      paddingRight: "5px",
                    }}
                  >
                    <PhoneInput
                      defaultCountry="PT"
                      placeholder="Número de Telemóvel"
                      value={"+351" + telefone}
                      onChange={(e: any) => {
                        setTelemovel(e);
                      }}
                      style={{
                        width: "90%",
                        height: 51,
                      }}
                    />
                  </div>
                </Stack>

                <TextField
                  error={error_email}
                  helperText={error_email === true ? "Email inválido" : ""}
                  fullWidth
                  id="email"
                  label="E-mail"
                  placeholder="E-mail"
                  required
                  margin="normal"
                  sx={{ width: "55%", paddingRight: "5px" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormControl
                  sx={{
                    width: "50%",
                    paddingRight: "5px",
                    marginTop: "15px",
                    minWidth: 150,
                  }}
                >
                  <InputLabel id="status">Estado</InputLabel>
                  <Select
                    id="status"
                    name="status"
                    label="Estado"
                    placeholder="Estado"
                    value={disabled ?? ""}
                    onChange={handleChange}
                  >
                    <MenuItem value={true as any}>Inativo</MenuItem>
                    <MenuItem value={false as any}>Ativo</MenuItem>
                  </Select>
                </FormControl>
              </Table>
              <CardActions>
                <BarraDeFerramentas
                  mostrarBotaoGravar
                  aoClicarGravar={() => updateById(beneficiarioId)}
                />

                <br />
              </CardActions>
            </CardContent>
          </div>
        )}
      </TableContainer>
    </div>
  );
}
export default UpdatePopup;
