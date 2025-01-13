import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FormHelperText, TableFooter, TablePagination, Typography } from "@mui/material";
import { Box, Table, Checkbox, Stack, styled } from "@mui/material";
import { DialogTitle, Dialog, DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { FormControl, FormGroup, FormControlLabel } from "@mui/material";
import { TableContainer } from "@mui/material";
import { BarraDeFerramentas } from "../../Components/barra-de-ferramentas/BarraDeFerramentas";
import Layout from "../../Styles/layout/index";
import { Register } from "../Login/Register";
import CloseIcon from "@mui/icons-material/Close";
import { del, get, post } from "../../Services/tokenConfig";
import { Snackbar, TableHead } from "@material-ui/core";
import Loading from "../../Styles/Loader/loading";
import TablePaginationActions from "../../Components/Pagination/pagination";
import { ButtonCadernos } from "../../Components/barra-de-ferramentas/ButtonCadernos";
import { CustomThemeProvider } from "../../Styles/theme/customThemeprovider";
import ConfirmDialog from "../../Components/CustomDialog/customdialog";
import { AuthContext } from "../../AuthContext/AuthContext";
import { func_print } from "../../Func_genericas/func_print";
import { cores, operacao_erro } from "../../Func_genericas/valores_estaticos";
import Switch from "react-switch";
import { isValidEmail } from "../../Func_genericas/isValidEmail";
import { ITecnico } from "../../Interfaces/tecnico/tecnico";
import { Alert } from "../../Components/Alert/Alert";

//ADRIANA VINHAS

const StyledTableHead = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  fontSize: 17,
  fontFamily: "candara",
  fontWeight: 600,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  padding: theme.spacing(0, 1),
  textAlign: "center",
  fontSize: 15,
  fontFamily: "candara",
  height: "40px",
}));

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
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
        minWidth: 325,
      },
    },
    header: {
      textAlign: "center",
      background: "#f2d1c2",
      color: "black",
    },
  })
);


export default function Listatecnicos() {
  const classes = useStyles();

  const auth = useContext(AuthContext);

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password] = useState("");
  const [rolesCkh, setRolesChk] = useState<string[]>([]);
  const [isloading, setIsLoading] = useState(true);

  const [obj_to_edit, set_obj_to_edit] = useState<ITecnico>()

  const [dialogCreate, setdialogCreate] = useState(false);

  const [mensagem, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const [tecnicoList, setTecnicoList] = useState<ITecnico[]>([]);

  const [error, setError] = useState(false);
  const [error_nome, set_error_nome] = useState(false);
  const [error_escolha_role, set_error_escolha_role] = useState(false);
  // const [checkPass, setCheckPass] = useState(false);
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);

  const [openSnackError, setOpenSnackError] = React.useState(false);

  const [opendelete, setOpenDelete] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  /*********************** GET TECNICO *********************************************************** */

  async function getTecnicos() {
    try {
      var id = auth.user?.id_org
      const urlrelativa = `/users/get_user_idOrg/${id}`;

      let result = await get(urlrelativa)

      if (result.status === 200) {
        setTecnicoList(result.data.result);
        
      } else {
        setMessage(operacao_erro)
        setOpenSnackSuccess(true)
      }
      setIsLoading(false);

    } catch (error) {
      setMessage(operacao_erro)
      setOpenSnackSuccess(true)
      setIsLoading(false);
      func_print('getTecnicos', error, true)
    }
  }

  useEffect(() => {
    (async () => {
      await getTecnicos();
    })();

  }, []);

  /*********************** CREATE TECNICO *********************************************************** */

  // PopUp para criar novo registo

  const handleClickOpenCreate = () => {
    setdialogCreate(true);
  };
  const handleCloseDialog = () => {
    setdialogCreate(false);
  };

  /*********************** EDIT TECNICO *********************************************************** */

  // Função que abre o componente editbeneficiario e leva os dados do beneficiario

  const handleClickOpen = (id: string, nome: string, email: string, roles: Array<string>) => {
    setId(id);
    setEmail(email);
    setNome(nome);
    setRolesChk(roles);
    setOpen(true);
  };

  const handleCloseUpdate = () => {
    setId("");
    setEmail("");
    setNome("");
    setRolesChk([]);
    func_clean()
    setOpen(false);
  };

  const handleUpdate_flag_disabled = async (obj: ITecnico) => {
    try {
      setIsLoading(true)

      let res = await post(`/users/update_user`, {
        parameter: {
          id: obj.id,
          nome: obj?.nome,
          email: obj?.email,
          password: obj?.password,
          roles: obj?.roles,
          disabled: !obj?.disabled,
          id_org: obj?.id_org,
          last_login: obj?.last_login,
          create_date: obj?.create_date,
          uuid: obj?.uuid,
        },
      });

      if (res.status === 200) {
        setMessage("Atualizado com sucesso!");
        setOpen(false);
        setOpenSnackSuccess(true);

        let list_aux = tecnicoList.map((el: ITecnico) => {
          if (el.id === res.data.result.id) {
            return res.data.result
          } else {
            return el
          }

        })
        setTecnicoList(list_aux)
        setIsLoading(false)

      } else {
        setMessage(operacao_erro)
        setOpenSnackError(true);
        setIsLoading(false)

      }
    } catch (error) {
      func_print('handleUpdate', error, true)
      setMessage(operacao_erro)
      setOpenSnackError(true);
      setIsLoading(false)

    }
  };
  const func_clean = () => {
    set_error_escolha_role(false)
    set_error_nome(false)
    setError(false)
  }

  const handleUpdate = async (id: string) => {
    try {
      setIsLoading(true)

      let flag_valido_nome = false
      let flag_valido_email = false
      let flag_valido_role = false

      if (nome.length === 0) {
        set_error_nome(true)
        flag_valido_nome = false

      } else {
        set_error_nome(false)
        flag_valido_nome = true
      }

      if (email.length === 0) {
        setError(true)
        flag_valido_email = false

      } else {
        if (isValidEmail(email) === true) {
          setError(false)
          flag_valido_email = true

        } else {
          setError(true)
          flag_valido_email = false
        }
      }


      if (rolesCkh.length === 0) {
        set_error_escolha_role(true)
        flag_valido_role = false

      } else {
        set_error_escolha_role(false)
        flag_valido_role = true
      }

      if (flag_valido_email === true && flag_valido_nome === true && flag_valido_role === true) {
        
        let res = await post(`/users/update_user`, {
          parameter: {
            id: id,
            nome: nome,
            email: email,
            password: password,
            roles: rolesCkh,
            disabled: obj_to_edit?.disabled,
            id_org: obj_to_edit?.id_org,
            last_login: obj_to_edit?.last_login,
            create_date: obj_to_edit?.create_date,
            uuid: obj_to_edit?.uuid,
          },
        });
        if (res.status === 200) {

          let list_aux = tecnicoList.map((el: ITecnico) => {
            if (el.id === res.data.result.id) {
              return res.data.result
            } else {
              return el
            }

          })
          setTecnicoList(list_aux)
          setMessage("Atualizado com sucesso!");
          setOpen(false);
          setOpenSnackSuccess(true);
          setIsLoading(false)
          func_clean()
          handleCloseDialog()


        } else {
          setMessage(operacao_erro);

          setOpenSnackError(true);
          setIsLoading(false)

        }
      } else {
        setMessage(operacao_erro);
        setOpenSnackError(true);
        setIsLoading(false)

      }

    } catch (error) {
      func_print('handleUpdate', error, true)
      setMessage(operacao_erro);
      setOpenSnackError(true);
      setIsLoading(false)

    }
  };

  /** Alterar o tipo de role */
  const handleRolesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = rolesCkh.indexOf(event.target.value);

    if (index === -1) {
      setRolesChk([...rolesCkh, event.target.value]);
    } else {
      setRolesChk(
        rolesCkh.filter((rolesCkh) => rolesCkh !== event.target.value)
      );
    }
  };

  /*********************** DELETE TECNICO *********************************************************** */
  const handleClickOpenDelete = (id: string, nome: string, email: string) => {
    setId(id);
    setNome(nome);
    setEmail(email);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setId("");
    setNome("");
    setEmail("");
    setOpenDelete(false);
  };
  async function handleDelete(id: string) {
    try {
      setIsLoading(true)

      let result = await del(`/users/delete_user/${id}`)

      if (result.status === 200) {

        setTecnicoList((current) =>
          current.filter((tecnico) => {
            return tecnico.id !== id
          })
        );

        setMessage(result.data.message);
        setOpenSnackSuccess(true);
        handleCloseDelete()

      } else {
        setMessage(operacao_erro);

        setOpenSnackError(true)
      }

      setIsLoading(false)

    } catch (error) {
      func_print('handleDelete', error, true)
      setMessage(operacao_erro);

      setOpenSnackError(true)
      setIsLoading(false)

    }
  }

  /***************** PAGINAÇÃO ****************************/


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tecnicoList.length) : 0;

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

  const return_roles = (array_roles: Array<string>) => {
    try {

      if (array_roles.length === 1) {
        return array_roles.includes('TECNICO') ? 'Técnico' : array_roles.includes('ADMIN') ? 'Administrador' : ''

      } else if (array_roles.length === 2) {
        return 'Técnico/Administrador'
      } else {
        return ''

      }

    } catch (error) {
      func_print('return_roles', error, true)
      return ''

    }

  }

  return (
    <CustomThemeProvider>
      <div className={classes.root}>
        <Layout title=" Gestão de Utilizadores" />
        <main className={classes.contents}>
          <div className={classes.toolbars} />
          {isloading ? (
            <Loading />
          ) : (
            <div className={classes.label}>
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
                  {mensagem}
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
                  {mensagem}
                </Alert>
              </Snackbar>
              <Box
                width="100%"
                height="auto"
                display="flex"
                justifyContent="end"
              >
                <BarraDeFerramentas
                  mostrarBotaoNovo
                  textoBotaoNovo="Adicionar Utilizador"
                  aoClicarNovo={handleClickOpenCreate}
                />
              </Box>

              <Dialog
                open={dialogCreate}
                onClose={handleCloseDialog}
                maxWidth="md"
              >
                <div style={{ display: "flex" }}>
                  <DialogTitle sx={{ fontFamily: "candara" }}>
                    Registar Utilizador
                  </DialogTitle>
                  <div style={{ marginLeft: "auto", marginRight: 0 }}>
                    <IconButton
                      color="info"
                      size="small"
                      onClick={handleCloseDialog}
                    >
                      <CloseIcon color="action" />
                    </IconButton>
                  </div>
                </div>
                <Register
                  lista_utilizadores={tecnicoList}
                  set_lista_utilizadores={(list: Array<ITecnico>) => setTecnicoList(list)}
                  setMessage={(string) => setMessage(string)}
                  setOpenSnackSuccess={(flag: boolean) => setOpenSnackSuccess(flag)}
                  setOpenSnackError={(flag: boolean) => setOpenSnackError(flag)}
                  onCloseDialog={handleCloseDialog}
                />
              </Dialog>

              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{
                  height: "auto",
                  width: "100%",
                  display: "flex",
                  padding: 4,
                }}
              >
                <Table>
                  <TableHead className={classes.header}>
                    <TableRow>
                      <StyledTableHead>Nome</StyledTableHead>
                      <StyledTableHead>Email</StyledTableHead>
                      <StyledTableHead>Categoria</StyledTableHead>
                      <StyledTableHead>Ações</StyledTableHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tecnicoList.length === 0 ?
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={12} />
                      </TableRow> :
                      (rowsPerPage > 0
                        ? tecnicoList.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        : tecnicoList
                      ).map((tec, i) => {
                        return (
                          <TableRow key={i}>
                            <StyledTableCell>{tec.nome}</StyledTableCell>
                            <StyledTableCell>{tec.email}</StyledTableCell>
                            <StyledTableCell>{return_roles(tec.roles)}</StyledTableCell>
                            
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
                                    handleUpdate_flag_disabled(tec)
                                  }} checked={!tec.disabled} />

                                <ButtonCadernos
                                  mostrarBotaoApagar
                                  aoClicarApagar={() =>
                                    handleClickOpenDelete(
                                      tec.id,
                                      tec.nome,
                                      tec.email
                                    )
                                  }
                                  mostrarBotaoEditar
                                  aoClicarEditar={() => {
                                    set_obj_to_edit(tec)
                                    handleClickOpen(tec.id, tec.nome, tec.email, tec.roles)
                                  }}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}

                  </TableBody>
                  <TableFooter>
                    <TableRow sx={{ width: "100%" }} >
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "Todos", value: -1 },
                        ]}
                        colSpan={12}
                        count={tecnicoList.length}
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
              </TableContainer>
              <Dialog
                open={open}
                onClose={handleCloseUpdate}
                fullWidth
                maxWidth="md"
              >
                <Stack direction="row">
                  <DialogTitle sx={{ fontFamily: "candara" }}>
                    Atualizar dados do Utilizador
                  </DialogTitle>
                  <div style={{ marginLeft: "auto", marginRight: 0 }}>
                    <IconButton
                      color="info"
                      size="small"
                      onClick={handleCloseUpdate}
                    >
                      <CloseIcon color="action" />
                    </IconButton>
                  </div>
                </Stack>
                <DialogContent>
                  <Box sx={{ width: "100%" }} display="flex">
                    <Stack spacing={3} width="100%">
                      <TextField
                        error={error_nome}
                        helperText={error_nome === true ? 'Preenchimento do nome obrigatório' : ''}
                        fullWidth
                        label="Nome "
                        placeholder="Nome "
                        margin="normal"
                        sx={{ width: "100%", paddingRight: "5px" }}
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />

                      <TextField
                        error={error}
                        helperText={error === true ? 'Email inválido' : ''}
                        fullWidth
                        label="EMAIL"
                        placeholder="email"
                        margin="normal"
                        sx={{ width: "100%", paddingRight: "5px" }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <FormControl>
                        <div>
                          <FormGroup>
                            <div style={{ display: "flex" }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "left",
                                  fontFamily: "candara",
                                }}
                              >
                                <FormControlLabel
                                  label={<Typography
                                    fontFamily="candara"
                                    fontSize={18}
                                  >
                                    Administrador
                                  </Typography>}
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
                                      checked={rolesCkh.includes("ADMIN")}
                                      onChange={handleRolesChange}
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
                                    <Typography
                                      fontFamily="candara"
                                      fontSize={18}
                                    >
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
                                          fontFamily: "candara",
                                        },
                                      }}
                                      checked={rolesCkh.includes("TECNICO")}
                                      onChange={handleRolesChange}
                                    />
                                  }
                                />
                              </div>
                            </div>
                            <FormHelperText id="username-helper"
                              error={error_escolha_role}>{error_escolha_role === true ? 'Escolha uma função' : ''}
                            </FormHelperText>
                          </FormGroup>
                        </div>
                      </FormControl>
                    </Stack>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <BarraDeFerramentas
                    mostrarBotaoGravar
                    aoClicarGravar={() => handleUpdate(id)}
                  />
                </DialogActions>
              </Dialog>
              <ConfirmDialog
                open={opendelete}
                onClose={handleCloseDelete}
                onConfirm={() => handleDelete(id)}
                message="Deseja eliminar o registo?"
              />
            </div>
          )}
        </main>
      </div>
    </CustomThemeProvider>
  );
}
