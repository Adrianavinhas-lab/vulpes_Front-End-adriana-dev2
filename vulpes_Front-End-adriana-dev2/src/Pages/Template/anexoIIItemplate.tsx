import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Paper,
  Snackbar,
  styled,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import uuid from "react-uuid";
import dayjs, { Dayjs } from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { del, get, post } from "../../Services/tokenConfig";
import { BarraDeFerramentas } from "../../Components/barra-de-ferramentas/BarraDeFerramentas";
import Layout from "../../Styles/layout";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    contents: {
      flexGrow: 1,
      padding: theme.spacing(0),
    },
  })
);

//Formatação das células do Head
const StyledTableHead = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  fontWeight: "bold",
  typography: theme.typography.fontWeightBold,
  padding: theme.spacing(0, 1),
  border: "1px solid #555",
  textAlign: "center",
}));

//Formatação das células do Body
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  padding: theme.spacing(1, 1),
  border: "1px solid #555",
  fontSize: 14,
}));

export interface IAnexoIIITemplate {
  id_anexoIII: string;
  veiculos_camp1: string;
  veiculos_camp2: string;
  pessoas_camp1: string;
  pessoas_camp2: string;
  animais_camp1: string;
  animais_camp2: string;
  produtos_camp1: string;
  produtos_camp2: string;
  centro_camp1: string;
  centro_camp2: string;
  control_camp1: string;
  control_camp2: string;
  proveniencia_camp1: string;
  proveniencia_camp2: string;
  plano_camp1: string;
  plano_camp2: string;
  contro_armaz_camp1: string;
  contro_armaz_camp2: string;
  lavagem_camp1: string;
  lavagem_camp2: string;
  limpeza_camp1: string;
  limpeza_camp2: string;
  vazio_camp1: string;
  vazio_camp2: string;
  periodicidade_camp1: string;
  periodicidade_camp2: string;
  destino_camp1: string;
  destino_camp2: string;
  id_template: string;
  last_update: string;
  create_date: string;
  uuid: string;
}

//Props got via router-dom
type LocationState = {
  idfromdefinicoes: string;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TemplateAnexoIII() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  const location = useLocation();
  const { idfromdefinicoes } = location.state as LocationState;

  // Data atual
  const [date] = React.useState<Dayjs | null>(dayjs);

  const [anexoIIIobj, setanexoIIIobj] = useState<IAnexoIIITemplate[]>([]);
  const [id, setId] = useState<any>(0);

  const [veiculos_camp1, setVeiculos_Camp1] = useState("");
  const [veiculos_camp2, setVeiculos_Camp2] = useState("");

  const [pessoas_camp1, setPessoas_Camp1] = useState("");
  const [pessoas_camp2, setPessoas_Camp2] = useState("");

  const [animais_camp1, setanimais_camp1] = useState("");
  const [animais_camp2, setanimais_camp2] = useState("");

  const [produtos_camp1, setprodutos_camp1] = useState("");
  const [produtos_camp2, setprodutos_camp2] = useState("");

  const [centro_camp1, setcentro_camp1] = useState("");
  const [centro_camp2, setcentro_camp2] = useState("");

  const [control_camp1, setcontrol_camp1] = useState("");
  const [control_camp2, setcontrol_camp2] = useState("");

  const [proveniencia_camp1, setproveniencia_camp1] = useState("");
  const [proveniencia_camp2, setproveniencia_camp2] = useState("");

  const [plano_camp1, setplano_camp1] = useState("");
  const [plano_camp2, setplano_camp2] = useState("");

  const [contro_armaz_camp1, setcontro_armaz_camp1] = useState("");
  const [contro_armaz_camp2, setcontro_armaz_camp2] = useState("");

  const [lavagem_camp1, setlavagem_camp1] = useState("");
  const [lavagem_camp2, setlavagem_camp2] = useState("");

  const [limpeza_camp1, setlimpeza_camp1] = useState("");
  const [limpeza_camp2, setlimpeza_camp2] = useState("");

  const [vazio_camp1, setvazio_camp1] = useState("");
  const [vazio_camp2, setvazio_camp2] = useState("");

  const [periodicidade_camp1, setperiodicidade_camp1] = useState("");
  const [periodicidade_camp2, setperiodicidade_camp2] = useState("");

  const [destino_camp1, setdestino_camp1] = useState("");
  const [destino_camp2, setdestino_camp2] = useState("");

  const getAnexoIIIById = async (
    Id: string
  ): Promise<IAnexoIIITemplate | Error> => {
    try {
      const { data } = await get(`/get_template_anexoIII_idTemplate/${Id}`);
      setanexoIIIobj(data.result);
      if (data) {
        setId(data.result.id_anexoIII)
        setVeiculos_Camp1(data.result.veiculos_camp1);
        setVeiculos_Camp2(data.result.veiculos_camp2);
        setPessoas_Camp1(data.result.pessoas_camp1);
        setPessoas_Camp2(data.result.pessoas_camp2);
        setanimais_camp1(data.result.animais_camp1);
        setanimais_camp2(data.result.animais_camp2);
        setprodutos_camp1(data.result.proveniencia_camp1);
        setprodutos_camp2(data.result.proveniencia_camp2);
        setcentro_camp1(data.result.centro_camp1);
        setcentro_camp2(data.result.centro_camp2);
        setcontrol_camp1(data.result.control_camp1);
        setcontrol_camp2(data.result.control_camp2);
        setproveniencia_camp1(data.result.proveniencia_camp1);
        setproveniencia_camp2(data.result.proveniencia_camp2);
        setplano_camp1(data.result.plano_camp1);
        setplano_camp2(data.result.plano_camp2);
        setcontro_armaz_camp1(data.result.contro_armaz_camp1);
        setcontro_armaz_camp2(data.result.contro_armaz_camp2);
        setlavagem_camp1(data.result.lavagem_camp1);
        setlavagem_camp2(data.result.lavagem_camp2);
        setlimpeza_camp1(data.result.limpeza_camp1);
        setlimpeza_camp2(data.result.limpeza_camp2);
        setvazio_camp1(data.result.vazio_camp1);
        setvazio_camp2(data.result.vazio_camp2);
        setperiodicidade_camp1(data.result.periodicidade_camp1);
        setperiodicidade_camp2(data.result.periodicidade_camp2);
        setdestino_camp1(data.result.destino_camp1);
        setdestino_camp2(data.result.destino_camp2);
      }
      return new Error("Erro ao listar");
    } catch (error) {
      console.error(error);
      return new Error(
        (error as { message: string }).message || "Erro ao listar"
      );
    }
  };

  useEffect(() => {
    getAnexoIIIById(idfromdefinicoes);
  }, [idfromdefinicoes]);

  /** Função de gravar template */
  const create = async (): Promise<IAnexoIIITemplate | Error> => {
    try {
      const { data } = await post(`/new_template_anexoIII`, {
        parameter: {
          id_anexoIII: 0,
          uuid: uuid().slice(0, 8),
          veiculos_camp1: veiculos_camp1,
          veiculos_camp2: veiculos_camp2,
          pessoas_camp1: pessoas_camp1,
          pessoas_camp2: pessoas_camp2,
          animais_camp1: animais_camp1,
          animais_camp2: animais_camp2,
          produtos_camp1: produtos_camp1,
          produtos_camp2: produtos_camp2,
          centro_camp1: centro_camp1,
          centro_camp2: centro_camp2,
          control_camp1: control_camp1,
          control_camp2: control_camp2,
          proveniencia_camp1: proveniencia_camp1,
          proveniencia_camp2: proveniencia_camp2,
          plano_camp1: plano_camp1,
          plano_camp2: plano_camp2,
          contro_armaz_camp1: contro_armaz_camp1,
          contro_armaz_camp2: contro_armaz_camp2,
          lavagem_camp1: lavagem_camp1,
          lavagem_camp2: lavagem_camp2,
          limpeza_camp1: limpeza_camp1,
          limpeza_camp2: limpeza_camp2,
          vazio_camp1: vazio_camp1,
          vazio_camp2: vazio_camp2,
          periodicidade_camp1: periodicidade_camp1,
          periodicidade_camp2: periodicidade_camp2,
          destino_camp1: destino_camp1,
          destino_camp2: destino_camp2,
          id_template: idfromdefinicoes,
          last_update: date,
          create_date: date,
        },
      });
      if (data) {
        setMessage(data.message);
        setOpenSnackSuccess(true);
      } else {
        setOpenSnackError(data.message);
        setOpenSnackError(true);
      }
      return new Error("Erro ao criar o Registo!");
    } catch (error) {
      console.error(error);
      return new Error(
        (error as { message: string }).message || "Erro ao ao criar o Registo"
      );
    }
  };

  const [check, setcheck] = useState(false);

  /** Verifica se os campos estão todos em branco */
  function checkChanges() {
    if (
      veiculos_camp1 !== "" ||
      veiculos_camp2 !== "" ||
      pessoas_camp1 !== "" ||
      pessoas_camp2 !== "" ||
      animais_camp1 !== "" ||
      animais_camp2 !== "" ||
      produtos_camp1 !== "" ||
      produtos_camp2 !== "" ||
      centro_camp1 !== "" ||
      centro_camp2 !== "" ||
      control_camp1 !== "" ||
      control_camp2 !== "" ||
      proveniencia_camp1 !== "" ||
      proveniencia_camp2 !== "" ||
      plano_camp1 !== "" ||
      plano_camp2 !== "" ||
      contro_armaz_camp1 !== "" ||
      contro_armaz_camp2 !== "" ||
      lavagem_camp1 !== "" ||
      lavagem_camp2 !== "" ||
      limpeza_camp1 !== "" ||
      limpeza_camp2 !== "" ||
      vazio_camp1 !== "" ||
      vazio_camp2 !== "" ||
      periodicidade_camp1 !== "" ||
      periodicidade_camp2 !== "" ||
      destino_camp1 !== "" ||
      destino_camp2 !== ""
    ) {
      setcheck(false);
    } else {
      setcheck(true);
    }
  }

  /***************** GRAVAR *****************************/
  function handleGravar() {
    create();
    setTimeout(() => {
      setOpenSnackSuccess(true);
      navigate("/definicoes", {
        state: {
          flag2: true,
          id_template: idfromdefinicoes,
        },
      });
    }, 1000);
  }

  /*************** DELETE *********************************************/
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpen = (id: number) => {
    setOpenDelete(true);
    setId(id);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const deleteById = async (id: number): Promise<void | Error> => {
    try {
      const { data } = await del(`/delete_template_anexoIII/${id}`);
      if (data instanceof Error) {
        setMessageError(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      return new Error(
        (error as { message: string }).message ||
          "Erro ao ao eliminar o Registo"
      );
    }
  };
  const handleDelete = () => {
    deleteById(id).then((result) => {
      if (result instanceof Error) {
        setTimeout(() => {
          setOpenDelete(false);
          setOpenSnackError(true);
        }, 2000);
      } else {      
        setTimeout(() => {
          setOpenDelete(false);
          setOpenSnackSuccess(true);
          navigate("/definicoes");
        }, 2000);
      }
    });
  };

  function back() {
    navigate("/definicoes");
  }

  const [openPopupconfirm, setopenPopupconfirm] = useState(false);
  const [openPopupconfirm1, setopenPopupconfirm1] = useState(false);

  function handleclosePopupconfirm() {
    setopenPopupconfirm(false);
  }
  function handleclosePopupconfirm1() {
    setopenPopupconfirm1(false);
  }

  function handleopenPopupconfirm1() {
    setopenPopupconfirm1(true);
  }
  function handleopenPopupconfirm() {
    checkChanges();
    setopenPopupconfirm(true);
  }

  /****** fecha o alerta **********************************/
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const handleCloseSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackSuccess(false);
  };

  return (
    <div className={classes.root}>
      <Layout title="Anexo III- Plano de Boas Práticas de Higiene" />
      <main className={classes.contents}>
        <div style={{ height: 70 }}></div>

        {anexoIIIobj ? (
          <Box width={"100%"} height="auto">
            <BarraDeFerramentas
              mostrarBotaoApagar
              aoClicarApagar={() => handleClickOpen(id)}
              mostrarBotaoCancelar
              aoClicarCancelar={handleopenPopupconfirm1}
            />
          </Box>
        ) : (
          <Box width={"100%"} height="auto">
            <BarraDeFerramentas
              mostrarBotaoGravar
              aoClicarGravar={handleopenPopupconfirm}
              mostrarBotaoCancelar
              aoClicarCancelar={handleopenPopupconfirm1}
            />
          </Box>
        )}

        <Dialog open={openPopupconfirm} onClose={handleclosePopupconfirm}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {check && "Todos os campos do template estão em branco'."}
              Tem certeza que deseja gravar template?
            </DialogContentText>

            <DialogActions>
              <Button onClick={() => handleGravar()}>Sim</Button>
              <Button onClick={handleclosePopupconfirm}>Cancelar</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
        <Dialog open={openPopupconfirm1} onClose={handleclosePopupconfirm1}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Tem certeza que deseja cancelar?
            </DialogContentText>

            <DialogActions>
              <Button onClick={back}>Sim</Button>
              <Button onClick={handleclosePopupconfirm1}>Não</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogContent id="alert-dialog-description">
            Deseja eliminar o registo?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete}>Não</Button>
            <Button color="error" onClick={handleDelete}>
              Sim
            </Button>
          </DialogActions>
        </Dialog>
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
              {messageError}
            </Alert>
          </Snackbar>
          <table style={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <StyledTableHead width={350} height={50}>
                  Parâmetro
                </StyledTableHead>
                <StyledTableHead height={50}>
                  Medidas Higiosanitárias e de Biosegurança Previstas
                </StyledTableHead>
                <StyledTableHead width={200} height={50}>
                  Período
                </StyledTableHead>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <StyledTableCell colSpan={3}>
                  <strong>Controlo de Entrada na Exploração</strong>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>
                  Veículos (ex.: rodilúvio, arcos de desinfeção)
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={veiculos_camp1}
                    onChange={(e) => setVeiculos_Camp1(e.target.value)}
                  ></TextField>
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={veiculos_camp2}
                    onChange={(e) => setVeiculos_Camp2(e.target.value)}
                  ></TextField>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>
                  Pessoas (ex.: barreira física, pedilúvio, vestiário, outras)
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={pessoas_camp1}
                    onChange={(e) => setPessoas_Camp1(e.target.value)}
                  ></TextField>
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={pessoas_camp2}
                    onChange={(e) => setPessoas_Camp2(e.target.value)}
                  ></TextField>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>
                  Animais (ex.: barreira física /limites)
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={animais_camp1}
                    onChange={(e) => setanimais_camp1(e.target.value)}
                  ></TextField>
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={animais_camp2}
                    onChange={(e) => setanimais_camp2(e.target.value)}
                  ></TextField>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell colSpan={3}>
                  <strong>
                    Limpeza e desinfeção dos veículos de transporte
                  </strong>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>
                  Produtos a utilizar na lavagem e na desinfeção
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={produtos_camp1}
                    onChange={(e) => setprodutos_camp1(e.target.value)}
                  ></TextField>
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={produtos_camp2}
                    onChange={(e) => setprodutos_camp2(e.target.value)}
                  ></TextField>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>
                  Centro de lavagem e desinfeção (se utilizado)
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={centro_camp1}
                    onChange={(e) => setcentro_camp1(e.target.value)}
                  ></TextField>
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={centro_camp2}
                    onChange={(e) => setcentro_camp2(e.target.value)}
                  ></TextField>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell colSpan={3}>
                  <strong>Controlo de animais domésticos e selvagens</strong>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>
                  Controlo de roedores e/ou de insetos
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={control_camp1}
                    onChange={(e) => setcontrol_camp1(e.target.value)}
                  ></TextField>
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={control_camp2}
                    onChange={(e) => setcontrol_camp2(e.target.value)}
                  ></TextField>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell colSpan={3}>
                  <strong>Controlo da qualidade da água </strong>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>Proveniência / renovação</StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={proveniencia_camp1}
                    onChange={(e) => setproveniencia_camp1(e.target.value)}
                  ></TextField>
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={proveniencia_camp2}
                    onChange={(e) => setproveniencia_camp2(e.target.value)}
                  ></TextField>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>Plano de análise de águas</StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={plano_camp1}
                    onChange={(e) => setplano_camp1(e.target.value)}
                  ></TextField>
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={plano_camp2}
                    onChange={(e) => setplano_camp2(e.target.value)}
                  ></TextField>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>
                  <strong>Controlo da armazenagem dos alimentos</strong>
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={contro_armaz_camp1}
                    onChange={(e) => setcontro_armaz_camp1(e.target.value)}
                  ></TextField>
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={contro_armaz_camp2}
                    onChange={(e) => setcontro_armaz_camp2(e.target.value)}
                  ></TextField>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell colSpan={3}>
                  <strong>
                    Limpeza, lavagem, desinfeção e manutenção de alojamentos e
                    equipamentos
                  </strong>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>
                  Lavagem e desinfeção de instalações
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={lavagem_camp1}
                    onChange={(e) => setlavagem_camp1(e.target.value)}
                  ></TextField>
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={lavagem_camp2}
                    onChange={(e) => setlavagem_camp2(e.target.value)}
                  ></TextField>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>Limpeza de equipamentos</StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={limpeza_camp1}
                    onChange={(e) => setlimpeza_camp1(e.target.value)}
                  ></TextField>
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={limpeza_camp2}
                    onChange={(e) => setlimpeza_camp2(e.target.value)}
                  ></TextField>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>
                  Vazio sanitário (ex.: instalações, rotação de pastagens)
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={vazio_camp1}
                    onChange={(e) => setvazio_camp1(e.target.value)}
                  ></TextField>
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={vazio_camp2}
                    onChange={(e) => setvazio_camp2(e.target.value)}
                  ></TextField>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell colSpan={3}>
                  <strong>Remoção de camas e dejetos</strong>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>Periodicidade</StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={periodicidade_camp1}
                    onChange={(e) => setperiodicidade_camp1(e.target.value)}
                  ></TextField>
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={periodicidade_camp2}
                    onChange={(e) => setperiodicidade_camp2(e.target.value)}
                  ></TextField>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>
                  Destino (espalhamento, compostagem, outros)
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={destino_camp1}
                    onChange={(e) => setdestino_camp1(e.target.value)}
                  ></TextField>
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={destino_camp2}
                    onChange={(e) => setdestino_camp2(e.target.value)}
                  ></TextField>
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </table>
        </TableContainer>
      </main>
    </div>
  );
}
export default TemplateAnexoIII;
