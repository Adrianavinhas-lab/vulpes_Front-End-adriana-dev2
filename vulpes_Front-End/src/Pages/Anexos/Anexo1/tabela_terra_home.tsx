import {
  Checkbox,
  FormControlLabel,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableHead,
} from "../../../Styles/tabelCellStyled/customTableCell";
import BasicPopover from "../../../Components/Popover";

export const TabelaTerraHome = () => {
  return (
    <>
      <TableRow>
        <StyledTableHead colSpan={2}>Elemento / nutriente</StyledTableHead>
        <StyledTableHead>
          N <BasicPopover text="Azoto do solo" />
        </StyledTableHead>
        <StyledTableHead>
          P2O5 <BasicPopover text="Fósforo do solo" />
        </StyledTableHead>
        <StyledTableHead>
          K2O <BasicPopover text="Potássio do solo" />
        </StyledTableHead>
        <StyledTableHead>
          Mg <BasicPopover text="Magnésio do solo" />
        </StyledTableHead>
        <StyledTableHead sx={{ minWidth: "50%" }}>
          Outro
          <BasicPopover text="Preencher apenas quando o boletim de análises apresenta dados sobre outros elementos, que vão ser considerados na elaboração do plano de fertilização." />
        </StyledTableHead>
        <StyledTableHead>
          Outro
          <BasicPopover text="Preencher apenas quando o boletim de análises apresenta dados sobre outros elementos, que vão ser considerados na elaboração do plano de fertilização." />
        </StyledTableHead>
        <StyledTableHead>
          ph(H2O) <BasicPopover text="pH do solo" />
        </StyledTableHead>
        <StyledTableHead>
          M.O.(%) <BasicPopover text="% de matéria orgânica do solo" />
        </StyledTableHead>
      </TableRow>
      <TableRow>
        <StyledTableHead rowSpan={3}>Resultado das análises</StyledTableHead>
        <StyledTableHead>mg/kg</StyledTableHead>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell rowSpan={2}></StyledTableCell>
        <StyledTableCell rowSpan={2}></StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableHead>(%)</StyledTableHead>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableHead>Classe de fertilidade</StyledTableHead>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell
          sx={{ backgroundColor: "lightgray" }}
        ></StyledTableCell>
        <StyledTableCell></StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableHead colSpan={2}>
          A deduzir no cálculo da fertilização azotada (kg/ha)
        </StyledTableHead>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell
          sx={{ backgroundColor: "lightgray" }}
          colSpan={7}
        ></StyledTableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4}>
          Quando são disponibilizados resultados analíticos referentes ao teor
          de azoto do solo, identificar se este corresponde a:
        </TableCell>
        <TableCell colSpan={2}>
          <FormControlLabel
            name="Azoto_mineral"
            label={
              <Typography fontFamily="candara" fontSize={14} fontWeight="600">
                Azoto mineral
              </Typography>
            }
            disabled
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
        </TableCell>
        <TableCell colSpan={2}>
          <FormControlLabel
            name="Azoto_mitrico"
            label={
              <Typography fontFamily="candara" fontSize={14} fontWeight="600">
                Azoto nítrico
              </Typography>
            }
            disabled
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
        </TableCell>
        <TableCell colSpan={2}>
          <FormControlLabel
            name="azoto_total"
            label={
              <Typography fontFamily="candara" fontSize={14} fontWeight="600">
                Azoto total
              </Typography>
            }
            disabled
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
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ fontWeight: 600, fontFamily: "candara" }}>
          Data da colheita de terras:
        </TableCell>
        <TableCell></TableCell>
        <TableCell sx={{ fontWeight: 600, fontFamily: "candara" }}>
          Profundidade da colheita da amostra (cm):
        </TableCell>
        <TableCell></TableCell>
        <TableCell sx={{ fontWeight: 600, fontFamily: "candara" }}>
          Data emissão resultados:
        </TableCell>
        <TableCell></TableCell>
        <TableCell sx={{ fontWeight: 600, fontFamily: "candara" }}>
          N.º de amostras
        </TableCell>
        <TableCell></TableCell>
        <TableCell sx={{ fontWeight: 600, fontFamily: "candara" }}>
          N.º do Boletim:
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
    </>
  );
};
