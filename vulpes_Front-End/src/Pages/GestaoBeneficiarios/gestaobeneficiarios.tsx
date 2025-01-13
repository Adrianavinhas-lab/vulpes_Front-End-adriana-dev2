import React, { useContext } from "react";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { DialogContent, TableHead } from "@material-ui/core";
import { CardContent, CardHeader, IconButton, Stack, styled, TablePagination } from "@mui/material";
import { TableContainer, TableFooter } from "@mui/material";
import { Snackbar } from "@mui/material";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Layout from "../../Styles/layout";
import { get, post } from "../../Services/tokenConfig";
import Loading from "../../Styles/Loader/loading";
import TablePaginationActions from "../../Components/Pagination/pagination";
import { BarraDeFerramentas } from "../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { ButtonCadernos } from "../../Components/barra-de-ferramentas/ButtonCadernos";
import { CustomThemeProvider } from "../../Styles/theme/customThemeprovider";
import { func_print } from "../../Func_genericas/func_print";
import { verify_nif } from "../../Func_genericas/verify_nif";
import { isValidEmail } from "../../Func_genericas/isValidEmail";
import { AuthContext } from "../../AuthContext/AuthContext";
import { PatternFormat } from 'react-number-format';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { cores, operacao_erro, operacao_sucesso } from "../../Func_genericas/valores_estaticos";
import Switch from "react-switch";
import { IBeneficiario } from "../../Interfaces/beneficiarios/beneficiario";
import { Alert } from "../../Components/Alert/Alert";
import { handler_pesquisa } from "../../Func_genericas/func_pesquisa";


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
    searchInput: {
      width: "100%",
    },
    contents: {
      flexGrow: 1,
      padding: theme.spacing(3),
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
      background: "#F2D1C2",
      color: "black",
    },
  })
);

const StyledTableHead = styled(TableCell)(({ theme }) => ({
  textAlign: "left",
  fontSize: 17,
  fontFamily: "candara",
  fontWeight: 600,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  padding: theme.spacing(0, 1),
  textAlign: "left",
  fontSize: 15,
  fontFamily: "candara",
  height: "40px",
}));


export default function GestaoBeneficiarios() {

  const auth = useContext(AuthContext);

  const [error_email, set_error_email] = useState(false)
  const [error_nif, set_error_nif] = useState(false)
  const [error_nome, set_error_nome] = useState(false)

  const classes = useStyles();
  const [isloading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [date] = React.useState<Dayjs | null>(dayjs);

  const [id_agri, setIdAgri] = useState<any>(0);
  const [id_org, setIdorg] = useState(0);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [morada, setMorada] = useState("");
  const [Concelho, setConcelho] = useState("");
  const [freguesia, setFreguesia] = useState("");
  const [Codigo_postal, setCodigopostal] = useState("");
  const [nif, setNif] = useState("");
  const [ifap, setIfap] = useState<any>(0);
  const [disabled, setDisabled] = useState(false);
  const [benefList, setBenefList] = useState<IBeneficiario[]>([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const [lista_benefeciario_pesquisa, set_lista_benefeciario_pesquisa] = useState<IBeneficiario[]>([]);
  const [string_para_pesquisar,] = useState<string>();

  /*********************** GET BENEFICIARIO PELO ORGANIZAÇÃP*********************************************************** */
  const getBeneficiarios = async () => {
    try {
      var id = auth.user?.id_org
      const urlrelativa = `/get_beneficiario_idOrg/${id}`;

      let response = await get(urlrelativa)

      if (response.status === 200) {
        setBenefList(response.data.result);
        set_lista_benefeciario_pesquisa(response.data.result);

      }
      setIsLoading(false);

    } catch (error) {
      func_print('getBeneficiarios', error, true)
      setMessage(operacao_erro)
      setOpenSnackError(true)
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getBeneficiarios();
    })();

  }, []);
  //PESQUISAR BENEFICIARIO 
  const handle_pesquisa = (string_to_search: string) => {
    try {
      set_lista_benefeciario_pesquisa(
        handler_pesquisa(benefList, ["nif", "nome"], string_to_search)
      );
    } catch (error) {
      func_print("handle_pesquisa", error, true);
      setMessage(operacao_erro)
      setOpenSnackError(true);
    }
  };

  /*********************** EDIT BENEFICIARIO *********************************************************** */
  const handleClickOpen = (
    id_agri: number,
    nome: string,
    nif: string,
    ifap: string,
    morada: string,
    Codigo_postal: string,
    Concelho: string,
    freguesia: string,
    telefone: number,
    telemovel: number,
    email: string,
    disabled: any
  ) => {
    setIdAgri(id_agri);
    setNome(nome);
    setEmail(email);
    setTelefone('+351' + telefone.toString());
    setTelemovel('+351' + telemovel.toString());
    setMorada(morada);
    setConcelho(Concelho);
    setFreguesia(freguesia);
    setCodigopostal(Codigo_postal);
    setNif(nif);
    setIfap(ifap);
    setDisabled(disabled);
    setOpen(true);
  };
  const func_clean = () => {
    setIdAgri(0);
    setNome('');
    setEmail('');
    setTelefone('');
    setTelemovel('');
    setMorada('');
    setConcelho('');
    setFreguesia('');
    setCodigopostal('');
    setNif('');
    setIfap(0);
    setDisabled(false);
    setOpen(false);
    set_error_email(false)
    set_error_nif(false)
    set_error_nome(false)
  }


  const handleUpdate = async (id: number) => {
    try {
      setIsLoading(true)

      let flag_valido_email = false
      let flag_valido_nif = false
      let flag_valido_nome = false

      if (email.length !== 0 && isValidEmail(email) === false) {
        set_error_email(true)
        flag_valido_email = false

      } else {
        set_error_email(false)
        flag_valido_email = true
      }
      if (nif.length === 0) {
        set_error_nif(true)
        flag_valido_nif = false

      } else if (verify_nif(nif) === false) {
        set_error_nif(true)
        flag_valido_nif = false

      } else {
        set_error_nif(false)
        flag_valido_nif = true
      }

      if (nome.length === 0) {
        set_error_nome(true)
        flag_valido_nome = false

      } else {
        set_error_nome(false)
        flag_valido_nome = true
      }


      if (flag_valido_email && flag_valido_nif && flag_valido_nome) {

        let res = await post(`/update_beneficiario`, {
          parameter: {
            id_agri: id,
            nome: nome,
            email: email,
            telefone: parseInt(telefone.slice(4)),
            telemovel: parseInt(telemovel.slice(4)),
            morada: morada,
            Concelho: Concelho,
            freguesia: freguesia,
            Codigo_postal: Codigo_postal,
            nif: nif,
            nifap: ifap,
            disabled: disabled,
            last_update: date,
            create_date: date,
            id_org: id_org,
            uuid: '',
          },
        });

        if (res.status === 200) {
          let list_aux = benefList.map((el: IBeneficiario) => {
            if (el.id_agri === res.data.result.id_agri) {
              return res.data.result
            } else {
              return el
            }

          })
          let list_aux_1 = lista_benefeciario_pesquisa.map((el: IBeneficiario) => {
            if (el.id_agri === res.data.result.id_agri) {
              return res.data.result
            } else {
              return el
            }

          })
          func_print('list_aux', list_aux)
          func_print('list_aux_1', list_aux_1)
          setBenefList(list_aux)
          set_lista_benefeciario_pesquisa(list_aux_1);
          setMessage(operacao_sucesso)

          setOpenSnackSuccess(true);
          func_clean()

        } else {
          setMessage(operacao_erro)

          setOpenSnackError(true);

        }
      }
      setIsLoading(false)


    } catch (error) {
      func_print('handleUpdate', error, true)
      setMessage(operacao_erro)

      setOpenSnackError(true);
      setIsLoading(false)

    }
  };

  const handleClose = () => {
    setOpen(false);
    func_clean()
  };

  /***************** PAGINAÇÃO ****************************/


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - lista_benefeciario_pesquisa.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  /****** fecha o alerta **********************************/

  const handleCloseSnack = () => {
    setOpenSnackSuccess(false);
    setOpenSnackError(false);
  };



  const handleUpdate_flag_disabled = async (obj: IBeneficiario) => {
    try {
      setIsLoading(true)

      let res = await post(`/update_beneficiario`, {
        parameter: {
          id_agri: obj.id_agri,
          nome: obj.nome,
          email: obj.email,
          telefone: obj.telefone,
          telemovel: obj.telemovel,
          morada: obj.morada,
          Concelho: obj.Concelho,
          freguesia: obj.freguesia,
          Codigo_postal: obj.Codigo_postal,
          nif: obj.nif,
          nifap: obj.nifap,
          disabled: !obj.disabled,
          last_update: obj.last_update,
          create_date: obj.create_date,
          id_org: obj.id_org,
          uuid: '',
        },
      });
      if (res.status === 200) {
        let list_aux = benefList.map((el: IBeneficiario) => {
          if (el.id_agri === res.data.result.id_agri) {
            return res.data.result
          } else {
            return el
          }

        })
        let list_aux_1 = lista_benefeciario_pesquisa.map((el: IBeneficiario) => {
          if (el.id_agri === res.data.result.id_agri) {
            return res.data.result
          } else {
            return el
          }

        })

        set_lista_benefeciario_pesquisa(list_aux_1);
        setBenefList(list_aux)
        setMessage(operacao_sucesso)
        setOpenSnackSuccess(true);

      } else {
        setMessage(operacao_erro)

        setOpenSnackError(true);

      }
      setIsLoading(false)

    } catch (error) {
      func_print('handleUpdate', error, true)
      setMessage(operacao_erro)

      setOpenSnackError(true);
      setIsLoading(false)

    }
  };

  return (
    <>
      <div className={classes.root}>
        <Layout title=" Gestão de Beneficiários" />
        <main className={classes.contents}>
          <div className={classes.toolbars} />
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
            <Loading />
          ) : (
            <CustomThemeProvider>
              <div style={{
                marginRight: 35,
                marginLeft: 35
              }}>
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
              </div>
              <div className={classes.label}>

                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{
                    height: "auto",
                    width: "100%",
                    display: "flex",
                    margin: 4,
                    padding: 5,
                  }}
                >

                  <Table>
                    <TableHead className={classes.header}>
                      <TableRow>
                        <StyledTableHead>Nome do beneficiário</StyledTableHead>
                        <StyledTableHead>Email</StyledTableHead>
                        <StyledTableHead>Estado</StyledTableHead>
                        <StyledTableHead>Ações</StyledTableHead>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? lista_benefeciario_pesquisa.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        : lista_benefeciario_pesquisa
                      ).map((ben, i) => (
                        <TableRow key={i}>
                          <StyledTableCell>{ben.nome} </StyledTableCell>
                          <StyledTableCell>{ben.email} </StyledTableCell>
                          <StyledTableCell>
                            {ben.disabled === true ? "Inativo" : "Ativo"}
                          </StyledTableCell>
                          <TableCell>

                            <div style={{

                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                              <Switch
                                height={20}
                                width={35}
                                onColor={cores.cor1}
                                offColor={cores.cor3}
                                onChange={() => {
                                  handleUpdate_flag_disabled(ben)
                                }} checked={!ben.disabled} />

                              <ButtonCadernos
                                mostrarBotaoEditar
                                aoClicarEditar={() => {
                                  handleClickOpen(
                                    ben.id_agri,
                                    ben.nome,
                                    ben.nif,
                                    ben.nifap,
                                    ben.morada,
                                    ben.Codigo_postal,
                                    ben.Concelho,
                                    ben.freguesia,
                                    ben.telefone,
                                    ben.telemovel,
                                    ben.email,
                                    ben.disabled
                                  )
                                }}
                              />
                            </div>

                          </TableCell>
                        </TableRow>
                      ))}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={12} />
                        </TableRow>
                      )}
                    </TableBody>
                    <TableFooter>
                      <TableRow sx={{ width: "100%" }}>
                        <TablePagination
                          rowsPerPageOptions={[
                            5,
                            10,
                            25,
                            { label: "Todos", value: -1 },
                          ]}
                          colSpan={12}
                          count={benefList.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          labelDisplayedRows={({ from, to, count }) => {
                            return `${from}–${to} de ${count !== -1 ? count : `mais do que ${to}`}`;
                          }}
                          labelRowsPerPage={'Linhas por página'}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>

                  <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="md"
                  >
                    <Stack direction={"row"}>
                      <DialogTitle sx={{ fontFamily: "candara" }}>
                        Atualizar dados de beneficiário
                      </DialogTitle>
                      <div style={{ marginLeft: "auto", marginRight: 0 }}>
                        <IconButton
                          color="info"
                          size="small"
                          onClick={handleClose}
                        >
                          <CloseIcon color="action" />
                        </IconButton>
                      </div>
                    </Stack>
                    <DialogContent>
                      <TextField
                        error={error_nome}
                        helperText={error_nome === true ? 'Nome inválido' : ''}
                        fullWidth
                        id="name"
                        label="Nome Completo"
                        placeholder="Nome Completo"
                        margin="normal"
                        sx={{ width: "70%", paddingRight: "5px" }}
                        value={nome || ""}
                        area-readonly="true"
                        onChange={(e) => setNome(e.target.value)}
                      />

                      <TextField
                        error={error_nif}
                        helperText={error_nif === true ? 'NIF inválido' : ''}
                        fullWidth
                        id="nif"
                        label="NIF"
                        placeholder="NIF"
                        margin="normal"
                        sx={{ width: "15%", paddingRight: "5px" }}
                        value={nif || ""}
                        area-readonly="true"
                        onChange={(e) => setNif(e.target.value)}
                      />

                      <TextField
                        fullWidth
                        id="ifap"
                        label="IFAP"
                        placeholder="IFAP"
                        margin="normal"
                        sx={{ width: "15%", paddingRight: "5px" }}
                        value={ifap || ""}
                        area-readonly="true"
                        onChange={(e) => setIfap(e.target.value)}
                      />

                      <TextField
                        fullWidth
                        id="morada"
                        label="Morada"
                        placeholder="Morada"
                        margin="normal"
                        sx={{ width: "75%", paddingRight: "5px" }}
                        value={morada || ""}
                        onChange={(e) => setMorada(e.target.value)}
                      />
                      <PatternFormat
                        format="%%%%-%%%"
                        customInput={TextField}
                        label="Código Postal"
                        patternChar="%"
                        value={Codigo_postal || ""}
                        margin="normal"
                        sx={{ width: "25%", paddingRight: "5px" }}
                        onChange={(e) => setCodigopostal(e.target.value)}

                      />

                      <TextField
                        fullWidth
                        id="concelho"
                        label="Concelho"
                        placeholder="Concelho"
                        margin="normal"
                        sx={{ width: "23%", paddingRight: "5px" }}
                        value={Concelho || ""}
                        onChange={(e) => setConcelho(e.target.value)}
                      />

                      <TextField
                        fullWidth
                        id="freguesia"
                        label="Freguesia"
                        placeholder="Freguesia"
                        margin="normal"
                        sx={{ width: "22%", paddingRight: "5px" }}
                        value={freguesia || ""}
                        onChange={(e) => setFreguesia(e.target.value)}
                      />
                      <TextField
                        error={error_email}
                        helperText={error_email === true ? 'Email inválido' : ''}
                        fullWidth
                        id="email"
                        label="E-mail"
                        placeholder="E-mail"
                        margin="normal"
                        sx={{ width: "55%", paddingRight: "5px" }}
                        value={email || ""}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div style={{

                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: "space-evenly",
                        paddingTop: 15

                      }}>
                        <div style={{
                          flex: 0.5,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: `1px solid silver`,
                          fontSize: 14,
                          borderRadius: 4,
                          marginRight: 3,

                        }}>
                          <PhoneInput

                            defaultCountry="PT"
                            placeholder="Número de telefone"
                            value={telefone}
                            onChange={(e: any) => { setTelefone(e) }}
                            style={{
                              width: "90%",
                              height: 51,

                            }}
                          />
                        </div>
                        <div style={{
                          flex: 0.5,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: `1px solid silver`,
                          fontSize: 14,
                          borderRadius: 4,
                          marginLeft: 3,

                        }}>
                          <PhoneInput

                            defaultCountry="PT"
                            placeholder="Número de telemóvel"
                            value={telemovel}
                            onChange={(e: any) => { setTelemovel(e) }}
                            style={{
                              width: "90%",
                              height: 51,

                            }}
                          />
                        </div>
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <BarraDeFerramentas
                        mostrarBotaoGravar
                        aoClicarGravar={() => handleUpdate(id_agri)}
                      />
                    </DialogActions>
                  </Dialog>
                </TableContainer>
              </div>
            </CustomThemeProvider>
          )}
        </main>
      </div>
    </>
  );
}
