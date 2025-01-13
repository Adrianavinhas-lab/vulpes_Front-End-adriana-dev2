import React, { ChangeEvent } from "react";

import { Box, Paper, TableCell, TableRow, Typography, styled } from "@mui/material";
import { TableBody, TableContainer, TableHead } from "@mui/material";

const StyledTableHead = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: theme.spacing(1, 1),
  border: "1px solid #555",
  textAlign: "left",
  fontSize: 16,
  fontFamily: "candara",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#dcdcdc",
  color: theme.palette.common.black,
  padding: theme.spacing(0, 1),
  border: "1px solid #555",
  textAlign: "center",
  fontSize: 14,
  height: "40px",
}));

export interface IBalancoGH3 {
  id_balanco_GH3: number;

  pa_total_ms_pastagem: string;
  pa_total_ms_silagem: string;
  pa_total_ms_o_forragens: string;
  pa_total_ms_composto: string;

  pa_total_dieta_pastagem: string;
  pa_total_dieta_silagem: string;
  pa_total_dieta_o_forragens: string;
  pa_total_dieta_composto: string;

  jan_pastagem: string;
  fev_pastagem: string;
  mar_pastagem: string;
  abr_pastagem: string;
  mai_pastagem: string;
  jun_pastagem: string;
  jul_pastagem: string;
  ago_pastagem: string;
  set_pastagem: string;
  out_pastagem: string;
  nov_pastagem: string;
  dez_pastagem: string;

  jan_silagem: string;
  fev_silagem: string;
  mar_silagem: string;
  abr_silagem: string;
  mai_silagem: string;
  jun_silagem: string;
  jul_silagem: string;
  ago_silagem: string;
  set_silagem: string;
  out_silagem: string;
  nov_silagem: string;
  dez_silagem: string;

  jan_o_forragem: string;
  fev_o_forragem: string;
  mar_o_forragem: string;
  abr_o_forragem: string;
  mai_o_forragem: string;
  jun_o_forragem: string;
  jul_o_forragem: string;
  ago_o_forragem: string;
  set_o_forragem: string;
  out_o_forragem: string;
  nov_o_forragem: string;
  dez_o_forragem: string;

  jan_composto: string;
  fev_composto: string;
  mar_composto: string;
  abr_composto: string;
  mai_composto: string;
  jun_composto: string;
  jul_composto: string;
  ago_composto: string;
  set_composto: string;
  out_composto: string;
  nov_composto: string;
  dez_composto: string;

  alim_total_ms_pastagem: string;
  alim_total_ms_silagem: string;
  alim_total_ms_o_forragem: string;
  alim_total_ms_composto: string;

  alim_total_dieta_pastagem: string;
  alim_total_dieta_silagem: string;
  alim_total_dieta_o_forragem: string;
  alim_total_dieta_composto: string;

  dif_total_ms_pastagem: string;
  dif_total_ms_silagem: string;
  dif_total_ms_o_forragem: string;
  dif_total_ms_composto: string;

  dif_total_dieta_pastagem: string;
  dif_total_dieta_silagem: string;
  dif_total_dieta_o_forragem: string;
  dif_total_dieta_composto: string;

  id_rosto: 0;
  last_update: string;
  create_date: string;
  uuid: string;
}

interface IJaneiroGH3Props {
  tabela: IBalancoGH3;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TabelaBalancoGH3: React.FC<IJaneiroGH3Props> = ({
  tabela,
  onInputChange,
}) => {
  //   const idrosto = parseInt(localStorage.getItem("idrosto") || "0", 10);
  //   const [editingId, setEditingId] = useState<number | null>(null);
  //   const [, setEditedFields] = useState<
  //     Partial<Record<number, Partial<IBalancoGH3>>>
  //   >({});
  //   const [id] = useState(0);

  //   const [row, setRow] = useState<IBalancoGH3>({
  //     id_balanco_GH3: 0,

  //     pa_total_ms_pastagem: "",
  //     pa_total_ms_silagem: "",
  //     pa_total_ms_o_forragens: "",
  //     pa_total_ms_composto: "",

  //     pa_total_dieta_pastagem: "",
  //     pa_total_dieta_silagem: "",
  //     pa_total_dieta_o_forragens: "",
  //     pa_total_dieta_composto: "",

  //     jan_pastagem: "",
  //     fev_pastagem: "",
  //     mar_pastagem: "",
  //     abr_pastagem: "",
  //     mai_pastagem: "",
  //     jun_pastagem: "",
  //     jul_pastagem: "",
  //     ago_pastagem: "",
  //     set_pastagem: "",
  //     out_pastagem: "",
  //     nov_pastagem: "",
  //     dez_pastagem: "",

  //     jan_silagem: "",
  //     fev_silagem: "",
  //     mar_silagem: "",
  //     abr_silagem: "",
  //     mai_silagem: "",
  //     jun_silagem: "",
  //     jul_silagem: "",
  //     ago_silagem: "",
  //     set_silagem: "",
  //     out_silagem: "",
  //     nov_silagem: "",
  //     dez_silagem: "",

  //     jan_o_forragem: "",
  //     fev_o_forragem: "",
  //     mar_o_forragem: "",
  //     abr_o_forragem: "",
  //     mai_o_forragem: "",
  //     jun_o_forragem: "",
  //     jul_o_forragem: "",
  //     ago_o_forragem: "",
  //     set_o_forragem: "",
  //     out_o_forragem: "",
  //     nov_o_forragem: "",
  //     dez_o_forragem: "",

  //     jan_composto: "",
  //     fev_composto: "",
  //     mar_composto: "",
  //     abr_composto: "",
  //     mai_composto: "",
  //     jun_composto: "",
  //     jul_composto: "",
  //     ago_composto: "",
  //     set_composto: "",
  //     out_composto: "",
  //     nov_composto: "",
  //     dez_composto: "",

  //     alim_total_ms_pastagem: "",
  //     alim_total_ms_silagem: "",
  //     alim_total_ms_o_forragem: "",
  //     alim_total_ms_composto: "",

  //     alim_total_dieta_pastagem: "",
  //     alim_total_dieta_silagem: "",
  //     alim_total_dieta_o_forragem: "",
  //     alim_total_dieta_composto: "",

  //     dif_total_ms_pastagem: "",
  //     dif_total_ms_silagem: "",
  //     dif_total_ms_o_forragem: "",
  //     dif_total_ms_composto: "",

  //     dif_total_dieta_pastagem: "",
  //     dif_total_dieta_silagem: "",
  //     dif_total_dieta_o_forragem: "",
  //     dif_total_dieta_composto: "",

  //     id_rosto: 0,
  //     last_update: "",
  //     create_date: "",
  //     uuid: "",
  //   });

  //   const handleNewRowsChange = (
  //     field: keyof IBalancoGH3,
  //     value: string | number
  //   ) => {
  //     setRow((prevNewRows) => ({
  //       ...prevNewRows,
  //       [field]: value,
  //     }));
  //   };

  return (
    <>
      <form>
        <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ height: "auto", width: "auto", padding: 2 }}>
          <table width="100%">
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{ fontWeight: 700, fontSize: 16, fontFamily: "candara" }}
                >
                  Balanço
                </TableCell>
              </TableRow>

              <TableRow>
                <StyledTableHead rowSpan={2}></StyledTableHead>
                <StyledTableHead colSpan={4}>
                  Tipo de alimento (ton)
                  <br /> (kg x nº dias x CN)
                </StyledTableHead>
                <StyledTableHead rowSpan={2}>
                  ANEXAR RÓTULO ALIMENTO COMPOSTOS
                </StyledTableHead>
              </TableRow>
              <TableRow>
                <StyledTableHead>Pastagem</StyledTableHead>
                <StyledTableHead>Silagem</StyledTableHead>
                <StyledTableHead>Outra Forragem</StyledTableHead>
                <StyledTableHead>Composto</StyledTableHead>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <StyledTableHead
                  rowSpan={2}
                  sx={{
                    justifyContent: "space-between",
                    verticalAlign: "top",
                  }}
                >
                  <strong>1. Necessidades alimentares anuais (PA)</strong>
                  <Box
                    sx={{
                      justifyContent: "end",
                      display: "flex",
                      padding: 1,
                    }}
                  >
                    <Typography style={{ fontFamily: "candara", fontSize: 16 }}>
                      Total de MS
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      justifyContent: "end",
                      display: "flex",
                      padding: 1,
                    }}
                  >
                    <Typography style={{ fontFamily: "candara", fontSize: 16 }}>
                      Peso na Dieta (%)
                    </Typography>
                  </Box>
                </StyledTableHead>

                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableHead
                  rowSpan={14}
                  sx={{
                    justifyContent: "space-between",
                    verticalAlign: "top",
                  }}
                >
                  <strong>2. Alimentação (Caderno de campo) </strong>

                  <Box
                    sx={{
                      padding: 1,
                    }}
                  >
                    <Typography style={{ fontFamily: "candara", fontSize: 16 }}>
                      Janeiro
                      <br />
                      <br />
                      fevereiro
                      <br />
                      <br />
                      Março
                      <br />
                      <br />
                      Abril
                      <br />
                      <br />
                      Maio
                      <br />
                      <br />
                      Junho
                      <br />
                      <br />
                      Julho
                      <br />
                      <br />
                      Agosto
                      <br />
                      <br />
                      Setembro
                      <br />
                      <br />
                      Outubro
                      <br />
                      <br />
                      Novembro
                      <br />
                      <br />
                      Dezembro
                    </Typography>
                    <Box
                      sx={{
                        justifyContent: "end",
                        display: "flex",
                        padding: 1,
                      }}
                    >
                      <Typography
                        style={{ fontFamily: "candara", fontSize: 16 }}
                      >
                        Total de MS
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        justifyContent: "end",
                        display: "flex",
                        padding: 1,
                      }}
                    >
                      <Typography
                        style={{ fontFamily: "candara", fontSize: 16 }}
                      >
                        Peso na Dieta (%)
                      </Typography>
                    </Box>
                  </Box>
                </StyledTableHead>
                <StyledTableCell sx={{ height: 60 }}>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead
                  rowSpan={2}
                  sx={{
                    justifyContent: "space-between",
                    verticalAlign: "top",
                  }}
                >
                  <strong>3. Diferença (2-1)</strong>
                  <Box
                    sx={{
                      justifyContent: "end",
                      display: "flex",
                      padding: 1,
                    }}
                  >
                    <Typography style={{ fontFamily: "candara", fontSize: 16 }}>
                      Total de MS
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      justifyContent: "end",
                      display: "flex",
                      padding: 1,
                    }}
                  >
                    <Typography style={{ fontFamily: "candara", fontSize: 16 }}>
                      Peso na Dieta (%)
                    </Typography>
                  </Box>
                </StyledTableHead>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
                <StyledTableCell>{} </StyledTableCell>
              </TableRow>
            </TableBody>
          </table>
        </TableContainer>
      </form>
    </>
  );
};
