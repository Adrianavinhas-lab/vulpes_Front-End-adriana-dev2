import { Box, Button, Skeleton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Save } from "@material-ui/icons";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HistoryIcon from "@mui/icons-material/History";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";

interface IBarraDeFerramentasProps {
  mostrarBotaoGravar?: boolean;
  mostrarBotaoEditar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoUpload?: boolean;
  mostrarBotaoCancelar?: boolean;
  mostrarBotaoHistorico?: boolean;
  mostarInputPesquisa?: boolean;
  mostrarBotaoGravarCarregando?: boolean;
  mostrarBotaoEditarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoAdicionarCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  textoBotaoNovo?: string;
  textoBotaoEditar?: string;
  textoBotaoUpload?: string;
  textoBotaoApagar?: string;
  textoDaPesquisa?: string;
  textoGravar?: string;

  aoClicarGravar?: () => void;
  aoClicarEditar?: () => void;
  aoClicarApagar?: () => void;
  aoClicarNovo?: () => void;
  aoClicarVoltar?: () => void;
  aoClicarUpload?: () => void;
  aoClicarHistorico?: () => void;
  aoClicarCancelar?: () => void;
  aoMudarTextoDePesquisa?: (novoTexto: string) => void;
}

export const BarraDeFerramentas = ({
  mostrarBotaoGravar = false,
  mostrarBotaoEditar = false,
  mostrarBotaoApagar = false,
  mostrarBotaoNovo = false,
  mostrarBotaoVoltar = false,
  mostrarBotaoUpload = false,
  mostrarBotaoCancelar = false,
  mostrarBotaoHistorico = false,
  mostarInputPesquisa = false,
  mostrarBotaoGravarCarregando = false,
  mostrarBotaoEditarCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoAdicionarCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  textoBotaoNovo = "Novo",
  textoBotaoUpload = "Carregar",
  textoDaPesquisa = "",
  textoBotaoEditar = "",
  textoGravar = "",

  aoClicarGravar,
  aoClicarEditar,
  aoClicarApagar,
  aoClicarNovo,
  aoClicarVoltar,
  aoClicarHistorico,
  aoClicarUpload,
  aoClicarCancelar,
  aoMudarTextoDePesquisa,
}: IBarraDeFerramentasProps) => {
  // const theme = useTheme();

  return (
    <Box
      // height={theme.spacing(4)}
      sx={{ "& button": { m: 1 } }}
      // padding={2}
      // display="flex"
      // alignItems="center"
      // justifyContent="center"
    >
      {mostrarBotaoGravar && !mostrarBotaoGravarCarregando && (
        <Button
          sx={{
            backgroundColor: "#f2d1c2",
            color: "#7e2706",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#479f39",
            },
            fontFamily: "candara",
          }}
          variant="contained"
          size="small"
          onClick={aoClicarGravar}
        >
          <Save /> Gravar
        </Button>
      )}

      {mostrarBotaoGravarCarregando && <Skeleton width={110} height={50} />}

      {mostrarBotaoEditar && !mostrarBotaoEditarCarregando && (
        <Button
          sx={{
            backgroundColor: "#c94f1e",
            fontFamily: "candara",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#7e2706",
            },
          }}
          size="small"
          onClick={aoClicarEditar}
        >
          <EditIcon /> {textoBotaoEditar}
        </Button>
      )}

      {mostrarBotaoEditarCarregando && <Skeleton width={110} height={50} />}

      {mostrarBotaoApagar && !mostrarBotaoApagarCarregando && (
        <Button
          sx={{
            color: "#7e2706",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#fd0f04",
            },
            fontFamily: "candara",
          }}
          size="small"
          onClick={aoClicarApagar}
        >
          <DeleteIcon />
        </Button>
      )}

      {mostrarBotaoApagarCarregando && <Skeleton width={110} height={50} />}

      {mostrarBotaoNovo && !mostrarBotaoAdicionarCarregando && (
        <Button
          sx={{
            backgroundColor: "#c94f1e",
            fontFamily: "candara",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#ccafa3",
              color: "#000000",
            },
          }}
          size="small"
          variant="contained"
          onClick={aoClicarNovo}
        >
          <AddIcon /> {textoBotaoNovo}
        </Button>
      )}
      {mostrarBotaoAdicionarCarregando && <Skeleton width={110} height={50} />}

      {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (
        <Button
          color="primary"
          size="small"
          variant="contained"
          onClick={aoClicarVoltar}
        >
          <ArrowBackIcon /> Voltar
        </Button>
      )}

      {mostrarBotaoCancelar && (
        <Button
          sx={{ color: "#AAAAAA" }}
          size="small"
          onClick={aoClicarCancelar}
        >
          <CloseIcon />
        </Button>
      )}

      {mostrarBotaoUpload && (
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            fontFamily: "candara",
            backgroundColor: "#7e2706",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#ccafa3",
              color: "#000000",
            },
          }}
          onClick={aoClicarUpload}
        >
          <UploadIcon />
          {textoBotaoUpload}
        </Button>
      )}

      {mostrarBotaoHistorico && (
        <Button
          size="small"
          variant="contained"
          color="inherit"
          sx={{
            fontFamily: "candara",
            "&:hover": {
              backgroundColor: "#ccafa3",
              color: "#000000",
            },
          }}
          onClick={aoClicarHistorico}
        >
          <HistoryIcon />
          Histórico
        </Button>
      )}

      {mostarInputPesquisa && (
        <TextField
          fullWidth
          id="username"
          label="Nome ou NIF do Beneficiário"
          placeholder="Nome ou NIF do Beneficiário"
          margin="normal"
          size="small"
          sx={{ fontFamily: "candara" }}
          value={textoDaPesquisa}
          onChange={(e) => aoMudarTextoDePesquisa?.(e.target.value)}
        />
      )}
    </Box>
  );
};
