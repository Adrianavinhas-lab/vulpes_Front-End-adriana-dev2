import { Button, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Save } from "@material-ui/icons";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

interface IBarraDeFerramentasProps {
  mostrarBotaoNovo?: boolean;
  mostrarBotaoGravar?: boolean;
  mostrarBotaoEditar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoCancelar?: boolean;

  aoClicarGravar?: () => void;
  aoClicarEditar?: () => void;
  aoClicarApagar?: () => void;
  aoClicarNovo?: () => void;
  aoClicarCancelar?: () => void;
}

export const ButtonCadernos = ({
  mostrarBotaoGravar = false,
  mostrarBotaoEditar = false,
  mostrarBotaoApagar = false,
  mostrarBotaoNovo = false,
  mostrarBotaoCancelar = false,

  aoClicarGravar,
  aoClicarEditar,
  aoClicarApagar,
  aoClicarNovo,
  aoClicarCancelar,
}: IBarraDeFerramentasProps) => {
  return (
    <Stack direction="row" justifyContent="center">
      {mostrarBotaoGravar && (
        <IconButton
          sx={{
            color: "#7e2706",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#479f39",
            },
          }}
          size="small"
          onClick={aoClicarGravar}
        >
          <Save />
        </IconButton>
      )}

      {mostrarBotaoEditar && (
        <IconButton
          sx={{
            color: "#c94f1e",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#f8a836",
            },
          }}
          size="small"
          onClick={aoClicarEditar}
        >
          <EditIcon/>
        </IconButton>
      )}

      {mostrarBotaoApagar && (
        <IconButton
          sx={{
            color: "#7e2706",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#fd0f04",
            },
          }}
          size="small"
          onClick={aoClicarApagar}
        >
          <DeleteIcon />
        </IconButton>
      )}

      {mostrarBotaoNovo && (
        <Button
          sx={{
            backgroundColor: "#c94f1e",
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
          <AddIcon /> Nova Linha
        </Button>
      )}

      {mostrarBotaoCancelar && (
        <IconButton color="default" size="small" onClick={aoClicarCancelar}>
          <CloseIcon />
        </IconButton>
      )}
    </Stack>
  );
};
