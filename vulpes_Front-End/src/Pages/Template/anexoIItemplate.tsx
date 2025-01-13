import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContentText,
  Paper,
  styled,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  DialogContent,
} from "@mui/material";
import { TableBody, Typography } from "@material-ui/core";
import Layout from "../../Styles/layout";
import { BarraDeFerramentas } from "../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { useLocation, useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import { get, post } from "../../Services/tokenConfig";
import dayjs, { Dayjs } from "dayjs";

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
    label: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1, 3),
        width: theme.spacing(16),
        height: theme.spacing(16),
        minWidth: 325,
      },
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
  padding: theme.spacing(0, 1),
  border: "1px solid #555",
  textAlign: "center",
  fontSize: 12,
  height: "40px",
}));

interface IAnexoII {
  id_anexoII: string;
  produto: string;
  quantidade: string;
  epoca: string;
  n_fornecido: string;
  observacoes: string;
  camp1: string;
  camp2: string;
  camp3: string;
  camp4: string;
  camp5: string;
  camp6: string;
  camp7: string;
  camp8: string;
  des_produto: string;
  quantidade_dois: string;
  n_1: string;
  p_1: string;
  k_1: string;
  ca_1: string;
  mg_1: string;
  micro_1: string;
  n_2: string;
  p_2: string;
  k_2: string;
  ca_2: string;
  mg_2: string;
  micro_2: string;
  epoca_prevista: string;
  observacoes_1: string;
  id_template: string;
  last_update: string;
  create_date: string;
  uuid: string;
}

//Props got via router-dom
type LocationState = {
  idfromdefinicoes: string;
};

function TemplateAnexoII() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [, setIsLoading] = useState(false);

  // Data atual
  const [date] = React.useState<Dayjs | null>(dayjs);

  const location = useLocation();
  const { idfromdefinicoes } = location.state as LocationState;


  const [anexoIIobj, setanexoIIobj] = useState<IAnexoII[]>([]);

  // Constante para as variaveis do quadro 1
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [epoca, setEpoca] = useState("");
  const [n_fornecido, setNFornecido] = useState("");
  const [observacoes, setObservacoes] = useState("");

  // Constante para as variaveis do quadro 2
  const [camp1, setcamp1] = useState("");
  const [camp2, setcamp2] = useState("");
  const [camp3, setcamp3] = useState("");
  const [camp4, setcamp4] = useState("");
  const [camp5, setcamp5] = useState("");
  const [camp6, setcamp6] = useState("");
  const [camp7, setcamp7] = useState("");
  const [camp8, setcamp8] = useState("");

  //Constantes para as variaveis do quadro 3
  const [des_produto, setDes_Produto] = useState("");
  const [quantidade_dois, setQuantidade_dois] = useState("");
  const [n_1, setN_1] = useState("");
  const [p_1, setp_1] = useState("");
  const [k_1, setK_1] = useState("");
  const [ca_1, setCa_1] = useState("");
  const [mg_1, setMg_1] = useState("");
  const [micro_1, setMicro_1] = useState("");
  const [n_2, setn_2] = useState("");
  const [p_2, setp_2] = useState("");
  const [k_2, setk_2] = useState("");
  const [ca_2, setca_2] = useState(" ");
  const [mg_2, setMg_2] = useState("");
  const [micro_2, setmicro_2] = useState("");
  const [epoca_prevista, setepoca_prevista] = useState("");
  const [observacoes_1, setobservacoes_1] = useState("");

  console.log(idfromdefinicoes);

  /** Pesquisa o template Anexo II pelo ID */
  const getAnexoIIById = async (Id: string): Promise<IAnexoII | Error> => {
    try {
      const { data } = await get(`/get_template_anexoII_id/${Id}`);
      setanexoIIobj(data.result);

      if (data) {
        setProduto(data.result.produto);
        setQuantidade(data.result.quantidade);
        setEpoca(data.result.data);
        setNFornecido(data.result.n_fornecido);
        setObservacoes(data.result.observacoes);
        setcamp1(data.result.camp1);
        setcamp2(data.result.camp2);
        setcamp3(data.result.camp3);
        setcamp4(data.result.camp4);
        setcamp5(data.result.camp5);
        setcamp6(data.result.camp6);
        setcamp7(data.result.camp7);
        setcamp8(data.result.camp8);
        setDes_Produto(data.result.des_produto);
        setQuantidade_dois(data.result.quantidade_dois);
        setN_1(data.result.n_1);
        setn_2(data.result.n_2);
        setp_1(data.result.p_1);
        setp_2(data.result.p_2);
        setK_1(data.result.k_1);
        setk_2(data.result.k_2);
        setCa_1(data.result.ca_1);
        setca_2(data.result.ca_2);
        setMg_1(data.result.mg_1);
        setMg_2(data.result.mg_2);
        setMicro_1(data.result.micro_1);
        setmicro_2(data.result.micro_2);
        setepoca_prevista(data.result.epoca_prevista);
        setobservacoes_1(data.result.observacoes_1);
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
    setIsLoading(true);
    getAnexoIIById(idfromdefinicoes);
    setIsLoading(false);
  }, [idfromdefinicoes]);

  const create = async (Id: string) => {
    try {
      const { data } = await post(`/new_template_anexoII`, {
        parameter: {
          id_anexoII: 0,
          produto: produto,
          quantidade: quantidade,
          epoca: epoca,
          n_fornecido: n_fornecido,
          observacoes: observacoes,
          camp1: camp1,
          camp2: camp2,
          camp3: camp3,
          camp4: camp4,
          camp5: camp5,
          camp6: camp6,
          camp7: camp7,
          camp8: camp8,
          des_produto: des_produto,
          quantidade_dois: quantidade_dois,
          n_1: n_1,
          p_1: p_1,
          k_1: k_1,
          ca_1: ca_1,
          mg_1: mg_1,
          micro_1: micro_1,
          n_2: n_2,
          p_2: p_2,
          k_2: k_2,
          ca_2: ca_2,
          mg_2: mg_2,
          micro_2: micro_2,
          epoca_prevista: epoca_prevista,
          observacoes_1: observacoes_1,
          id_template: idfromdefinicoes,
          last_update: date,
          create_date: date,
          uuid: uuid().slice(0, 8),
        },
      });
      if (data) {
      
      }
      return new Error("Erro ao criar o Registo!");
    } catch (error) {
      console.error(error);
      return new Error(
        (error as { message: string }).message || "Erro ao ao criar o Registo"
      );
    }
  };

  /** Abre o PopUp nova Linha quadro 1 */
  const handleClickOpen = () => {
    setProduto("");
    setQuantidade("");
    setEpoca("");
    setNFornecido("");
    setObservacoes("");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  /**Abre o terceiro quadro */
  const handleClickOpen2 = () => {
    setDes_Produto("");
    setQuantidade_dois("");
    setN_1("");
    setp_1("");
    setK_1("");
    setCa_1("");
    setMg_1("");
    setMicro_1("");
    setn_2("");
    setp_2("");
    setk_2("");
    setca_2("");
    setMg_2("");
    setmicro_2("");
    setepoca_prevista("");
    setobservacoes_1("");
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleChangeFirstBoard = () => {
    setProduto(produto);
    setNFornecido(n_fornecido);
    setObservacoes(observacoes);
    setQuantidade(quantidade);
    setEpoca(epoca);
    setOpen(false);
  };

  const handleSaveThirdBoard = () => {
    setDes_Produto(des_produto);
    setQuantidade_dois(quantidade_dois);
    setN_1(n_1);
    setp_1(p_1);
    setK_1(k_1);
    setCa_1(ca_1);
    setMg_1(mg_1);
    setMicro_1(micro_1);
    setn_2(n_2);
    setp_2(p_2);
    setk_2(k_2);
    setca_2(ca_2);
    setMg_2(mg_2);
    setmicro_2(micro_2);
    setepoca_prevista(epoca_prevista);
    setobservacoes_1(observacoes_1);
    setOpen2(false);
  };

  /** Função que grava na API todo o anexo de uma vez */
  function handleGravar() {
    create(idfromdefinicoes);
    navigate("/definicoes", {
      state: {
        flag1: true,
        id: idfromdefinicoes,
      },
    });
  }

  function back() {
    navigate("/definicoes");
  }

  //--------------------------------------------------------//

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
    setopenPopupconfirm(true);
  }

  return (
    <div className={classes.root}>
      <Layout title="Anexo II - Plano de Fertilização" />
      <main className={classes.contents}>
        <div className={classes.toolbars} />
        <div className={classes.label}>
          <Box width="100%" height="auto">
            <BarraDeFerramentas
              mostrarBotaoCancelar
              aoClicarCancelar={handleopenPopupconfirm1}
              mostrarBotaoGravar
              aoClicarGravar={handleopenPopupconfirm}
            />
          </Box>
          <Dialog open={openPopupconfirm} onClose={handleclosePopupconfirm}>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {observacoes_1 === ""
                  ? "O campo 'Observações' na tabela 'Fertilizantes está em branco'. "
                  : ""}
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
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ height: "auto" }}
          >
            <table style={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <StyledTableHead colSpan={5}>
                    1) CORREÇÕES DO SOLO (ex: matéria orgânica, calcário, gesso,
                    enxofre, argila, pó de rocha)
                  </StyledTableHead>
                </TableRow>
                <TableRow>
                  <StyledTableHead>Produto</StyledTableHead>
                  <StyledTableHead>Quantidade (ton/ha)</StyledTableHead>
                  <StyledTableHead>
                    Época(s) prevista(s) / fracionamento
                  </StyledTableHead>
                  <StyledTableHead>N fornecido (kg/ha)</StyledTableHead>
                  <StyledTableHead>Observações (1)</StyledTableHead>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      disabled
                      value={produto}
                      onChange={(e) => setProduto(e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      disabled
                      value={quantidade}
                      onChange={(e) => setQuantidade(e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      disabled
                      value={epoca}
                      onChange={(e) => setEpoca(e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      disabled
                      value={n_fornecido}
                      onChange={(e) => setNFornecido(e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      disabled
                      value={observacoes}
                      onChange={(e) => setObservacoes(e.target.value)}
                    />
                  </StyledTableCell>
                </TableRow>

                {anexoIIobj &&
                  anexoIIobj.map((q) => {
                    return (
                      <TableRow key={q.id_anexoII}>
                        <StyledTableCell>{q.produto}</StyledTableCell>
                        <StyledTableCell>{q.quantidade}</StyledTableCell>
                        <StyledTableCell>{q.epoca}</StyledTableCell>
                        <StyledTableCell>{q.n_fornecido}</StyledTableCell>
                        <StyledTableCell>{q.observacoes}</StyledTableCell>
                      </TableRow>
                    );
                  })}

                {/** Abre o popup de registo de nova linha para o 1º quadro */}
                <Dialog
                  open={open}
                  onClose={handleClose}
                  fullWidth
                  maxWidth="lg"
                >
                  <DialogTitle>Novo Registo</DialogTitle>
                  <DialogContent>
                    <Table>
                      <TableBody>
                        <TextField
                          fullWidth
                          id="produto"
                          label="Produto"
                          placeholder="Produto"
                          required
                          margin="normal"
                          sx={{ width: "25%", paddingRight: "5px" }}
                          value={produto}
                          onChange={(e) => setProduto(e.target.value)}
                        />
                        <TextField
                          fullWidth
                          id="quantidade"
                          label="Quantidade"
                          placeholder="Quantidade"
                          required
                          margin="normal"
                          sx={{ width: "25%", paddingRight: "5px" }}
                          value={quantidade}
                          onChange={(e) => setQuantidade(e.target.value)}
                        />
                        <TextField
                          fullWidth
                          id="zona_Homoenea"
                          label="Zona Homogénea"
                          placeholder="Zona Homogénea"
                          required
                          margin="normal"
                          sx={{ width: "25%", paddingRight: "5px" }}
                          value={epoca}
                          onChange={(e) => setEpoca(e.target.value)}
                        />
                        <TextField
                          fullWidth
                          id="num_fornecido"
                          label="N Fornecido"
                          required
                          placeholder="N Fornecido"
                          margin="normal"
                          sx={{ width: "25%", paddingRight: "5px" }}
                          value={n_fornecido}
                          onChange={(e) => setNFornecido(e.target.value)}
                        />
                        <TextField
                          fullWidth
                          id="observacoes"
                          label="Observações"
                          placeholder="Observações"
                          required
                          margin="normal"
                          sx={{ width: "100%", paddingRight: "5px" }}
                          value={observacoes}
                          onChange={(e) => setObservacoes(e.target.value)}
                        />
                      </TableBody>
                    </Table>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      onClick={handleChangeFirstBoard}
                    >
                      Gravar
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={handleClose}
                    >
                      Cancelar
                    </Button>
                  </DialogActions>
                </Dialog>
              </TableBody>
            </table>
            <br />
            <Typography align="right" variant="subtitle2">
              <strong>
                (1) Devem ser indicadas práticas que visem a melhoria do estado
                de fertilidade do solo.
              </strong>
            </Typography>
            <br />
            <BarraDeFerramentas
              mostrarBotaoNovo
              textoBotaoNovo="Novo Registo"
              aoClicarNovo={handleClickOpen}
            />
          </TableContainer>

          {/** Segundo quadro */}
          <TableContainer sx={{ height: "auto" }}>
            <Typography align="justify" variant="subtitle2">
              <strong>2) FERTILIZAÇÃO AZOTADA</strong>
            </Typography>
            <Typography variant="subtitle2">
              A fertilização azotada deve ser calculada e planeada de forma a
              evitar excedentes. No seu cálculo devem ser contabilizados e
              deduzidos os principais fornecimentos secundários.
            </Typography>
            <Typography>
              Consumo estimado da cultura (kg N/ha) (2){" "}
              <TextField
                variant="standard"
                sx={{ width: "5%" }}
                value={camp1}
                onChange={(e) => setcamp1(e.target.value)}
              />
              para uma produção esperada de (2){" "}
              <TextField
                variant="standard"
                sx={{ width: "5%" }}
                value={camp2}
                onChange={(e) => setcamp2(e.target.value)}
              />
              (2) em caso de hortícolas considerar a cultura mais exigente.
            </Typography>
            <br />
          </TableContainer>
          <TableContainer sx={{ height: "auto" }}>
            <Table>
              <TableRow>
                <StyledTableCell>
                  (A) Azoto proveniente da mineralização da MO do solo (kg N/ha)
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    variant="standard"
                    value={camp3}
                    onChange={(e) => setcamp3(e.target.value)}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>
                  (B) Azoto proveniente das correções orgânicas (kg N/ha)
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    variant="standard"
                    value={camp4}
                    onChange={(e) => setcamp4(e.target.value)}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>
                  (C) Azoto proveniente de adubos verdes (kg N/ha)
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    variant="standard"
                    value={camp5}
                    onChange={(e) => setcamp5(e.target.value)}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>
                  (D) Azoto proveniente da dose total estimada da água de rega
                  (kg N/ha)
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    variant="standard"
                    value={camp6}
                    onChange={(e) => setcamp6(e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <strong>Azoto necessário</strong> = Consumo estimado –
                  Fornecimentos involuntários (kg N/ha)
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    variant="standard"
                    value={camp7}
                    onChange={(e) => setcamp7(e.target.value)}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>
                  Fornecimentos involuntários (kg N/ha) (A+B+C+D)
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    variant="standard"
                    value={camp8}
                    onChange={(e) => setcamp8(e.target.value)}
                  />
                </StyledTableCell>
              </TableRow>
            </Table>
          </TableContainer>

          {/** Terceiro quadro */}
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ height: "auto" }}
          >
            <table style={{ width: "100%" }}>
              <TableHead>
                <StyledTableCell colSpan={15}>
                  <Typography variant="subtitle2">
                    <strong>3) FERTILIZANTES PREVISTOS PARA APLICAÇÃO</strong>
                  </Typography>
                </StyledTableCell>
                <TableRow>
                  <StyledTableHead rowSpan={3}>
                    Designação do Produto
                  </StyledTableHead>
                  <StyledTableHead rowSpan={3}>
                    Quantidade (kg ou L/ha)
                  </StyledTableHead>
                  <StyledTableHead colSpan={6} rowSpan={2}>
                    Composição do produto (%)
                  </StyledTableHead>
                  <StyledTableHead colSpan={6} rowSpan={2}>
                    Quantidade de nutriente a fornecer (kg ou L/ha)
                  </StyledTableHead>
                  <StyledTableHead rowSpan={3}>
                    Época(s) prevista(s)/ fracionamento
                  </StyledTableHead>
                </TableRow>
                <TableRow></TableRow>
                <TableRow>
                  <StyledTableHead>N</StyledTableHead>
                  <StyledTableHead>P</StyledTableHead>
                  <StyledTableHead>K</StyledTableHead>
                  <StyledTableHead>Ca</StyledTableHead>
                  <StyledTableHead>Mg</StyledTableHead>
                  <StyledTableHead>
                    Micronutrientes (especificar)
                  </StyledTableHead>
                  <StyledTableHead>N</StyledTableHead>
                  <StyledTableHead>P</StyledTableHead>
                  <StyledTableHead>K</StyledTableHead>
                  <StyledTableHead>Ca</StyledTableHead>
                  <StyledTableHead>Mg</StyledTableHead>
                  <StyledTableHead>
                    Micronutrientes (especificar)
                  </StyledTableHead>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <StyledTableCell>
                    <TextField
                      variant="standard"
                      fullWidth
                      disabled
                      value={des_produto}
                      onChange={(e) => setDes_Produto(e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      variant="standard"
                      disabled
                      value={quantidade_dois}
                      onChange={(e) => setQuantidade_dois(e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      variant="standard"
                      disabled
                      value={n_1}
                      onChange={(e) => setN_1(e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      variant="standard"
                      disabled
                      value={p_1}
                      onChange={(e) => setp_1(e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      variant="standard"
                      disabled
                      value={k_1}
                      onChange={(e) => setK_1(e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      variant="standard"
                      disabled
                      value={ca_1}
                      onChange={(e) => setCa_1(e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      variant="standard"
                      disabled
                      value={mg_1}
                      onChange={(e) => setMg_1(e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      variant="standard"
                      disabled
                      value={micro_1}
                      onChange={(e) => setMicro_1(e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      variant="standard"
                      disabled
                      value={n_2}
                      onChange={(e) => setn_2(e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      variant="standard"
                      disabled
                      value={p_2}
                      onChange={(e) => setp_2(e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      variant="standard"
                      disabled
                      value={k_2}
                      onChange={(e) => setk_2(e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      variant="standard"
                      disabled
                      value={ca_2}
                      onChange={(e) => setca_2(e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      variant="standard"
                      disabled
                      value={mg_2}
                      onChange={(e) => setMg_2(e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      variant="standard"
                      disabled
                      value={micro_2}
                      onChange={(e) => setmicro_2(e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      variant="standard"
                      disabled
                      value={epoca_prevista}
                      onChange={(e) => setepoca_prevista(e.target.value)}
                    />
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>
                    <Typography variant="subtitle2">
                      <strong>Observações</strong>
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell colSpan={14}>
                    <TextField
                      fullWidth
                      variant="standard"
                      disabled
                      sx={{ width: "100%", paddingRight: "5px" }}
                      value={observacoes_1}
                      onChange={(e) => setobservacoes_1(e.target.value)}
                    />
                  </StyledTableCell>
                </TableRow>

                {anexoIIobj &&
                  anexoIIobj.map((row) => {
                    return (
                      <>
                        <TableRow key={row.id_anexoII}>
                          <StyledTableCell>{row.des_produto}</StyledTableCell>
                          <StyledTableCell>
                            {" "}
                            {row.quantidade_dois}{" "}
                          </StyledTableCell>
                          <StyledTableCell> {row.n_1} </StyledTableCell>
                          <StyledTableCell> {row.p_1} </StyledTableCell>
                          <StyledTableCell> {row.k_1} </StyledTableCell>
                          <StyledTableCell> {row.ca_1} </StyledTableCell>
                          <StyledTableCell> {row.mg_1} </StyledTableCell>
                          <StyledTableCell> {row.micro_1} </StyledTableCell>
                          <StyledTableCell> {row.n_2} </StyledTableCell>
                          <StyledTableCell> {row.p_2}</StyledTableCell>
                          <StyledTableCell> {row.k_2}</StyledTableCell>
                          <StyledTableCell> {row.ca_2}</StyledTableCell>
                          <StyledTableCell> {row.mg_2}</StyledTableCell>
                          <StyledTableCell> {row.micro_2}</StyledTableCell>
                          <StyledTableCell>
                            {" "}
                            {row.epoca_prevista}
                          </StyledTableCell>
                        </TableRow>
                        <TableRow>
                          <StyledTableCell>Observações</StyledTableCell>
                          <StyledTableCell>
                            {row.observacoes_1}{" "}
                          </StyledTableCell>
                        </TableRow>
                      </>
                    );
                  })}
                {/* PopUp para novos registos do quadro 3 */}
                <Dialog
                  open={open2}
                  onClose={handleClose2}
                  fullWidth
                  maxWidth="lg"
                >
                  <DialogTitle>Novo Registo</DialogTitle>
                  <table>
                    <TableRow>
                      <TextField
                        fullWidth
                        id="des_produto"
                        label="Designação do Produto"
                        placeholder="Designação do Produto"
                        margin="normal"
                        sx={{ width: "50%", paddingRight: "5px" }}
                        value={des_produto}
                        onChange={(e) => setDes_Produto(e.target.value)}
                      />

                      <TextField
                        fullWidth
                        id="quantidade"
                        label="Quantidade"
                        placeholder="Quantidade"
                        required
                        margin="normal"
                        sx={{ width: "50%", paddingRight: "5px" }}
                        value={quantidade_dois}
                        onChange={(e) => setQuantidade_dois(e.target.value)}
                      />
                    </TableRow>
                    <TableRow>
                      <Typography>Composição do produto</Typography>
                      <TextField
                        fullWidth
                        label="N"
                        placeholder=" N"
                        required
                        margin="normal"
                        sx={{ width: "10%", paddingRight: "5px" }}
                        value={n_1}
                        onChange={(e) => setN_1(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label=" P"
                        placeholder="P"
                        required
                        margin="normal"
                        sx={{ width: "10%", paddingRight: "5px" }}
                        value={p_1}
                        onChange={(e) => setp_1(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label=" K"
                        placeholder=" K"
                        required
                        margin="normal"
                        sx={{ width: "10%", paddingRight: "5px" }}
                        value={k_1}
                        onChange={(e) => setK_1(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Ca"
                        placeholder="Ca"
                        required
                        margin="normal"
                        sx={{ width: "10%", paddingRight: "5px" }}
                        value={ca_1}
                        onChange={(e) => setCa_1(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label=" Mg"
                        placeholder="Mg"
                        required
                        margin="normal"
                        sx={{ width: "10%", paddingRight: "5px" }}
                        value={mg_1}
                        onChange={(e) => setMg_1(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Micronutrientes"
                        placeholder="Micronutrientes"
                        required
                        margin="normal"
                        sx={{ width: "40%", paddingRight: "5px" }}
                        value={micro_1}
                        onChange={(e) => setMicro_1(e.target.value)}
                      />
                    </TableRow>
                    <TableRow>
                      <Typography>
                        Quantidade de nutriente a fornecer
                      </Typography>

                      <TextField
                        fullWidth
                        label="N"
                        placeholder=" N"
                        required
                        margin="normal"
                        sx={{ width: "10%", paddingRight: "5px" }}
                        value={n_2}
                        onChange={(e) => setn_2(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="P"
                        placeholder="P"
                        required
                        margin="normal"
                        sx={{ width: "10%", paddingRight: "5px" }}
                        value={p_2}
                        onChange={(e) => setp_2(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="K"
                        placeholder="K"
                        required
                        margin="normal"
                        sx={{ width: "10%", paddingRight: "5px" }}
                        value={k_2}
                        onChange={(e) => setk_2(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Ca"
                        placeholder="Ca"
                        required
                        margin="normal"
                        sx={{ width: "10%", paddingRight: "5px" }}
                        value={ca_2}
                        onChange={(e) => setca_2(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Mg"
                        placeholder="Mg"
                        required
                        margin="normal"
                        sx={{ width: "10%", paddingRight: "5px" }}
                        value={mg_2}
                        onChange={(e) => setMg_2(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Micronutrientes"
                        placeholder="Micronutrientes"
                        required
                        margin="normal"
                        sx={{ width: "40%", paddingRight: "5px" }}
                        value={micro_2}
                        onChange={(e) => setmicro_2(e.target.value)}
                      />

                      <TextField
                        fullWidth
                        id="epoca_prevista_fertilizante"
                        label="N Fornecido"
                        required
                        placeholder="N Fornecido"
                        margin="normal"
                        sx={{ width: "25%", paddingRight: "5px" }}
                        value={epoca_prevista}
                        onChange={(e) => setepoca_prevista(e.target.value)}
                      />

                      <TextField
                        fullWidth
                        id="observacoes_fertilizante"
                        label="Observações"
                        placeholder="Observações"
                        multiline
                        margin="normal"
                        sx={{ width: "100%", paddingRight: "5px" }}
                        value={observacoes_1}
                        onChange={(e) => setobservacoes_1(e.target.value)}
                      />
                    </TableRow>
                  </table>
                  <DialogActions>
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      onClick={handleSaveThirdBoard}
                    >
                      Gravar
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={handleClose2}
                    >
                      Cancelar
                    </Button>
                  </DialogActions>
                </Dialog>
              </TableBody>
            </table>
            <BarraDeFerramentas
              mostrarBotaoNovo
              textoBotaoNovo="Novo Registo"
              aoClicarNovo={handleClickOpen2}
            />
          </TableContainer>
          <div style={{ height: 150 }}></div>
        </div>
      </main>
    </div>
  );
}
export default TemplateAnexoII;
