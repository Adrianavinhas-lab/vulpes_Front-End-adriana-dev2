import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import BasicPopover from "../../../Components/Popover";
import { StyledTableCell } from "../../../Styles/tabelCellStyled/customTableCell";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";


export const TabelaComposicaoHome = () => {
  return (
    <>
      <TableRow>
        <StyledTableCell>Digerido de Unidade de Biogás</StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell rowSpan={8}>
          <BarraDeFerramentas
            mostrarBotaoNovo
            textoBotaoNovo="Registar"
            aoClicarNovo={()=>{}}
          />
        </StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell>
          Sedimentos depositados nos orgãos de armazenamento de efluentes
          pecuários (por um período até 2 nos)
        </StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell>
          Mistura de um ou mais dos anteriores fertilizantes
        </StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell>
          Composto de bioresíduos de origem agrícola
        </StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell>
          Composto orgânico de Unidade de tratamento de residuos sólidos urbanos
          (Decreto-Lei n.º 30/2022)
        </StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell>
          <BasicPopover
            text={
              "Campo de preenchimento 'livre'.\n\nRegistar o fertilizante orgânico a ser utilizado quando este não se enquadra nos tipos de fertilizantes orgânicos previstos nas linhas acima."
            }
          />
        </StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
      </TableRow>
      <TableRow>
        <TableCell
          rowSpan={2}
          sx={{
            textAlign: "left",
            fontWeight: 600,
            fontFamily: "candara",
          }}
        >
          <Stack direction="row" justifyContent="center">
            Origem dos dados:
            <Box margin={-1} padding={0}>
              <BasicPopover
                text={
                  "Assinalar com uma X o campo correspondente à origem dos dados"
                }
              />
            </Box>
          </Stack>
        </TableCell>
        <TableCell colSpan={2}>
          <Stack direction="row" alignItems="center" justifyContent="left">
            <FormControlLabel
              name="origem_tabela"
              label={
                <Typography fontFamily="candara" fontSize={16}>
                  a) Tabela - Referência bibliográfica:
                </Typography>
              }
              aria-readonly
              control={
                <Checkbox
                  sx={{
                    color: "#aaaaaa",
                    "&.Mui-checked": {
                      color: "#C94F1E",
                    },
                  }}
                />
              }
            />
          </Stack>
        </TableCell>
        <TableCell colSpan={2}></TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={2}>
          <Stack direction="row" alignItems="center" justifyContent="left">
            <FormControlLabel
              name="origem_analise"
              label={
                <Typography fontFamily="candara" fontSize={16}>
                  b) Análise - Data:
                </Typography>
              }
              aria-readonly
              control={
                <Checkbox
                  sx={{
                    color: "#aaaaaa",
                    "&.Mui-checked": {
                      color: "#C94F1E",
                    },
                  }}
                />
              }
            />
          </Stack>
        </TableCell>

        <TableCell colSpan={2}></TableCell>
      </TableRow>
    </>
  );
};