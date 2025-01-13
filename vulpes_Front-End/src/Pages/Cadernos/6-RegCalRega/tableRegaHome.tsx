import React from "react";

import { Box, Stack } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";

import { StyledTableHeadLeft } from "../../../Styles/tabelCellStyled/customTableCell";
import { StyledTableCell } from "../../../Styles/tabelCellStyled/customTableCell";
import BasicPopover from "../../../Components/Popover";

export const TabelaCalendarioRegaHome = () => {
  return (
    <>
      <TableRow>
        <StyledTableHeadLeft>
          Capacidade utilizável (m3/m3):
        </StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <TableCell></TableCell>
        <StyledTableHeadLeft>Eficiência da rega:</StyledTableHeadLeft>
        <TableCell> </TableCell>
        <StyledTableHeadLeft> mês:</StyledTableHeadLeft>
        <TableCell> </TableCell>
        <StyledTableHeadLeft> Semana n.º:</StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <StyledTableHeadLeft>
          Reserva facilmente utilizável (m3/m3):
        </StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <TableCell></TableCell>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <TableCell></TableCell>
        <StyledTableHeadLeft> </StyledTableHeadLeft>
        <TableCell></TableCell>
        <StyledTableHeadLeft></StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <TableCell></TableCell>
      </TableRow>
      <TableRow>
        <StyledTableHeadLeft>
          <Stack direction="row" justifyContent="end">
            Data
            <Box margin={-1} padding={0}>
              <BasicPopover
                text={
                  "Identificar, em cada um dos campos seguintes o dia da semana, dia do mês e mês"
                }
              />
            </Box>
          </Stack>
        </StyledTableHeadLeft>
        <StyledTableHeadLeft>{"SSS D MMM"}</StyledTableHeadLeft>
        <StyledTableHeadLeft>{"SSS D MMM"}</StyledTableHeadLeft>
        <StyledTableHeadLeft>{"SSS D MMM"}</StyledTableHeadLeft>
        <StyledTableHeadLeft>{"SSS D MMM"}</StyledTableHeadLeft>
        <StyledTableHeadLeft>{"SSS D MMM"}</StyledTableHeadLeft>
        <StyledTableHeadLeft>{"SSS D MMM"}</StyledTableHeadLeft>
        <StyledTableHeadLeft>{"SSS D MMM"}</StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <StyledTableHeadLeft>
          <Stack direction="row" justifyContent="end">
            DIA DO CICLO VEGETATIVO
          </Stack>
        </StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
      </TableRow>

      <TableRow>
        <StyledTableHeadLeft>PROFUNDIDADE RADICULAR (m)</StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <StyledTableHeadLeft>CAPACIDADE DE CAMPO (mm)</StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <StyledTableHeadLeft>TEOR CRÍTICO CULTURAL (mm)</StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <StyledTableHeadLeft>
          TEOR DE ÁGUA DO SOLO - INÍCIO (mm)
        </StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <StyledTableHeadLeft>ET0 (mm)</StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft> </StyledTableHeadLeft>
        <StyledTableHeadLeft> </StyledTableHeadLeft>
        <StyledTableHeadLeft> </StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft> </StyledTableHeadLeft>
        <StyledTableHeadLeft> </StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <StyledTableHeadLeft>KC</StyledTableHeadLeft>
        <StyledTableHeadLeft> </StyledTableHeadLeft>
        <StyledTableHeadLeft> </StyledTableHeadLeft>
        <StyledTableHeadLeft> </StyledTableHeadLeft>
        <StyledTableHeadLeft> </StyledTableHeadLeft>
        <StyledTableHeadLeft> </StyledTableHeadLeft>
        <StyledTableHeadLeft> </StyledTableHeadLeft>
        <StyledTableHeadLeft> </StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <StyledTableHeadLeft>ETC (mm)</StyledTableHeadLeft>
        <StyledTableHeadLeft> </StyledTableHeadLeft>
        <StyledTableHeadLeft> </StyledTableHeadLeft>
        <StyledTableHeadLeft> </StyledTableHeadLeft>
        <StyledTableHeadLeft> </StyledTableHeadLeft>
        <StyledTableHeadLeft> </StyledTableHeadLeft>
        <StyledTableHeadLeft> </StyledTableHeadLeft>
        <StyledTableHeadLeft> </StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <StyledTableHeadLeft>PRECIPITAÇÃO TOTAL (mm)</StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <StyledTableHeadLeft>
          VARIAÇÃO DA ÁGUA NO SOLO (mm)
        </StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <StyledTableHeadLeft>
          TEOR DE ÁGUA DO SOLO - SEM REGA (mm)
        </StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <StyledTableHeadLeft>
          <Stack direction="row" justifyContent="left">
            LEITURA DA SONDA (% OU kPa)
            <Box margin={-1} padding={0}>
              <BasicPopover
                text={
                  "A ser preenchido apenas por regantes da classe A e B+."
                }
              />
            </Box>
          </Stack>
        </StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <StyledTableHeadLeft>
          <Stack direction="row" justifyContent="left">
            LEITURA DA SONDA (mm)
            <Box margin={-1} padding={0}>
              <BasicPopover
                text={
                  "A ser preenchido apenas por regantes da classe A e B+."
                }
              />
            </Box>
          </Stack>
        </StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <StyledTableHeadLeft>
          FOLGA PARA PRÓXIMA REGA (mm)
        </StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <StyledTableHeadLeft>
          REGA - LEITURA DO CONTADOR NO FINAL (m3)
        </StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <StyledTableHeadLeft>
          REGA - DOSE TOTAL APLICADA (mm)
        </StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <StyledTableHeadLeft>
          REGA - DOSE ÚTIL (mm) – APÓS REGA
        </StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <StyledTableHeadLeft>TEOR DE ÁGUA DO SOLO (mm)</StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <StyledTableHeadLeft>
          PERDA DE ÁGUA (CHUVA OU REGA EXCESSIVA)
        </StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
        <StyledTableHeadLeft></StyledTableHeadLeft>
      </TableRow>
      <TableRow>
        <TableCell
          colSpan={9}
          sx={{
            fontWeight: 600,
            paddingTop: 10,
            fontFamily: "candara",
            fontSize: 18,
          }}
        >
          PREENCHER APENAS OS CAMPOS QUE SE APLICAM
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4} sx={{ fontFamily: "candara", fontSize: 16 }}>
          <Stack direction="row" justifyContent="left">
            IDENTIFICAÇÃO DO AVISO DE REGA com sonda (Data):
            <Box margin={-1} padding={0}>
              <BasicPopover
                text={"A ser preenchido apenas por regantes da classe A."}
              />
            </Box>
          </Stack>
        </TableCell>
        <StyledTableCell></StyledTableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4} sx={{ fontFamily: "candara", fontSize: 16 }}>
          <Stack direction="row" justifyContent="left">
            IDENTIFICAÇÃO DO AVISO DE REGA com sonda (dotação recomendada
            m3/ha):
            <Box margin={-1} padding={0}>
              <BasicPopover
                text={"A ser preenchido apenas por regantes da classe A."}
              />
            </Box>
          </Stack>
        </TableCell>
        <StyledTableCell></StyledTableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4} sx={{ fontFamily: "candara", fontSize: 16 }}>
          <Stack direction="row" justifyContent="left">
            IDENTIFICAÇÃO DO AVISO DE REGA com imagem satélite IVDI (Data):
            <Box margin={-1} padding={0}>
              <BasicPopover
                text={"A ser preenchido apenas por regantes da classe A."}
              />
            </Box>
          </Stack>
        </TableCell>
        <StyledTableCell></StyledTableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4} sx={{ fontFamily: "candara", fontSize: 16 }}>
          <Stack direction="row" justifyContent="left">
            IDENTIFICAÇÃO DO AVISO DE REGA com imagem satélite IVDI (dotação
            recomendada m3/ha):
            <Box margin={-1} padding={0}>
              <BasicPopover
                text={"A ser preenchido apenas por regantes da classe A."}
              />
            </Box>
          </Stack>
        </TableCell>
        <StyledTableCell></StyledTableCell>
      </TableRow>
    </>
  );
};
