import React, { ChangeEvent, useEffect, useState } from "react";

import { Paper, TableCell, TableRow, TextField } from "@mui/material";
import { Box, Stack, Typography, styled } from "@mui/material";
import { TableBody, TableContainer, TableHead } from "@mui/material";

import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { post } from "../../../Services/tokenConfig";

const StyledTableHead = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: theme.spacing(1, 1),
  border: "1px solid #555",
  textAlign: "left",
  fontSize: 16,
  fontFamily: "candara",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  padding: theme.spacing(0, 1),
  border: "1px solid #555",
  textAlign: "center",
  fontSize: 14,
  height: "40px",
}));

const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#dcdcdc",
  color: theme.palette.common.black,
  padding: theme.spacing(0, 1),
  border: "1px solid #555",
  textAlign: "center",
  fontSize: 14,
  height: "40px",
}));

export interface IJaneiroGH1 {
  id_janeiro_GH1: number;

  b_macho_menos_6meses_cn: string;
  b_femea_menos_6meses_cn: string;
  b_macho_6meses_a_1ano_cn: string;
  b_femea_6meses_a_1ano_cn: string;
  b_macho_mais1ano_menos2_cn: string;
  b_femea_mais1ano_menos2_cn: string;
  b_macho_mais_2anos_cn: string;
  b_femea_mais_2anos_cn: string;

  b_macho_menos_6meses_dias: string;
  b_femea_menos_6meses_dias: string;
  b_macho_6meses_a_1ano_dias: string;
  b_femea_6meses_a_1ano_dias: string;
  b_macho_mais1ano_menos2_dias: string;
  b_femea_mais1ano_menos2_dias: string;
  b_macho_mais_2anos_dias: string;
  b_femea_mais_2anos_dias: string;

  b_macho_menos_6meses_pastagem: string;
  b_femea_menos_6meses_pastagem: string;
  b_macho_6meses_a_1ano_pastagem: string;
  b_femea_6meses_a_1ano_pastagem: string;
  b_macho_mais1ano_menos2_pastagem: string;
  b_femea_mais1ano_menos2_pastagem: string;
  b_macho_mais_2anos_pastagem: string;
  b_femea_mais_2anos_pastagem: string;

  b_macho_menos_6meses_silagem: string;
  b_femea_menos_6meses_silagem: string;
  b_macho_6meses_a_1ano_silagem: string;
  b_femea_6meses_a_1ano_silagem: string;
  b_macho_mais1ano_menos2_silagem: string;
  b_femea_mais1ano_menos2_silagem: string;
  b_macho_mais_2anos_silagem: string;
  b_femea_mais_2anos_silagem: string;

  b_macho_menos_6meses_o_forragem: string;
  b_femea_menos_6meses_o_forragem: string;
  b_macho_6meses_a_1ano_o_forragem: string;
  b_femea_6meses_a_1ano_o_forragem: string;
  b_macho_mais1ano_menos2_o_forragem: string;
  b_femea_mais1ano_menos2_o_forragem: string;
  b_macho_mais_2anos_o_forragem: string;
  b_femea_mais_2anos_o_forragem: string;

  b_macho_menos_6meses_composto: string;
  b_femea_menos_6meses_composto: string;
  b_macho_6meses_a_1ano_composto: string;
  b_femea_6meses_a_1ano_composto: string;
  b_macho_mais1ano_menos2_composto: string;
  b_femea_mais1ano_menos2_composto: string;
  b_macho_mais_2anos_composto: string;
  b_femea_mais_2anos_composto: string;

  //   sub_total_pastagem: string;
  //   sub_total_silagem: string;
  //   sub_total_o_forragem: string;
  //   sub_total_composto: string;

  id_rosto: 0;
  last_update: string;
  create_date: string;
  uuid: string;
}

interface IJaneiroGH1Props {
  tabela: IJaneiroGH1;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TabelaJaneiroGH1: React.FC<IJaneiroGH1Props> = ({
  tabela,
  onInputChange,
}) => {
  //   const idrosto = parseInt(localStorage.getItem("idrosto") || "0", 10);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [, setEditedFields] = useState<
    Partial<Record<number, Partial<IJaneiroGH1>>>
  >({});
  const [id, setId] = useState(0);

  const [row, setRow] = useState<IJaneiroGH1>({
    id_janeiro_GH1: 0,

    b_macho_menos_6meses_cn: "",
    b_femea_menos_6meses_cn: "",
    b_macho_6meses_a_1ano_cn: "",
    b_femea_6meses_a_1ano_cn: "",
    b_macho_mais1ano_menos2_cn: "",
    b_femea_mais1ano_menos2_cn: "",
    b_macho_mais_2anos_cn: "",
    b_femea_mais_2anos_cn: "",

    b_macho_menos_6meses_dias: "",
    b_femea_menos_6meses_dias: "",
    b_macho_6meses_a_1ano_dias: "",
    b_femea_6meses_a_1ano_dias: "",
    b_macho_mais1ano_menos2_dias: "",
    b_femea_mais1ano_menos2_dias: "",
    b_macho_mais_2anos_dias: "",
    b_femea_mais_2anos_dias: "",

    b_macho_menos_6meses_pastagem: "",
    b_femea_menos_6meses_pastagem: "",
    b_macho_6meses_a_1ano_pastagem: "",
    b_femea_6meses_a_1ano_pastagem: "",
    b_macho_mais1ano_menos2_pastagem: "",
    b_femea_mais1ano_menos2_pastagem: "",
    b_macho_mais_2anos_pastagem: "",
    b_femea_mais_2anos_pastagem: "",

    b_macho_menos_6meses_silagem: "",
    b_femea_menos_6meses_silagem: "",
    b_macho_6meses_a_1ano_silagem: "",
    b_femea_6meses_a_1ano_silagem: "",
    b_macho_mais1ano_menos2_silagem: "",
    b_femea_mais1ano_menos2_silagem: "",
    b_macho_mais_2anos_silagem: "",
    b_femea_mais_2anos_silagem: "",

    b_macho_menos_6meses_o_forragem: "",
    b_femea_menos_6meses_o_forragem: "",
    b_macho_6meses_a_1ano_o_forragem: "",
    b_femea_6meses_a_1ano_o_forragem: "",
    b_macho_mais1ano_menos2_o_forragem: "",
    b_femea_mais1ano_menos2_o_forragem: "",
    b_macho_mais_2anos_o_forragem: "",
    b_femea_mais_2anos_o_forragem: "",

    b_macho_menos_6meses_composto: "",
    b_femea_menos_6meses_composto: "",
    b_macho_6meses_a_1ano_composto: "",
    b_femea_6meses_a_1ano_composto: "",
    b_macho_mais1ano_menos2_composto: "",
    b_femea_mais1ano_menos2_composto: "",
    b_macho_mais_2anos_composto: "",
    b_femea_mais_2anos_composto: "",

    // sub_total_pastagem: "",
    // sub_total_silagem: "",
    // sub_total_o_forragem: "",
    // sub_total_composto: "",

    id_rosto: 0,
    last_update: "",
    create_date: "",
    uuid: "",
  });

  const handleNewRowsChange = (
    field: keyof IJaneiroGH1,
    value: string | number
  ) => {
    setRow((prevNewRows) => ({
      ...prevNewRows,
      [field]: value,
    }));
  };

  // async function getTabela(): Promise<IAlimentoCompostoGH1> {
  //   try {
  //     const response = await get(`/get_reg_/${idrosto}`);
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("Erro ao obter cabeçalho por ID");
  //   }
  // }

  useEffect(() => {
    // getTabela();
  }, []);

  /********* CREATE *******************/
  async function criarTabela(tabela: IJaneiroGH1): Promise<IJaneiroGH1> {
    try {
      const response = await post("/new_reg_actividades_cabecalho", tabela);
      return response.data;
    } catch (error) {
      // Tratar o erro aqui
      throw new Error("Erro ao criar cabeçalho");
    }
  }

  const handleEdit = (id: number) => {
    setEditingId(id);
    setEditedFields({});
    setId(id);
  };

  return (
    <>
      <form>
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ height: "auto", width: "auto", padding: 2, margin:1 }}
        >
          <table width="100%">
            <Stack direction="row">
              <Typography
                style={{
                  fontWeight: 700,
                  fontSize: 18,
                  fontFamily: "candara",
                  paddingLeft: 15,
                  paddingTop: 20,
                }}
              >
                Janeiro
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  marginLeft: "auto",
                  marginRight: "20",
                }}
              >
                {editingId === id ? (
                  <ButtonCadernos
                    mostrarBotaoGravar
                    aoClicarGravar={() => criarTabela(row)}
                    mostrarBotaoCancelar
                    aoClicarCancelar={() => setEditingId(null)}
                  />
                ) : (
                  <ButtonCadernos
                    mostrarBotaoEditar
                    aoClicarEditar={() => handleEdit(id)}
                    mostrarBotaoApagar
                    // aoClicarApagar={() => handleClickOpenDelete(id)}
                  />
                )}
              </Box>
            </Stack>
          </table>
          <Stack direction="row">
            <table width="100%">
              <TableHead>
                <TableRow>
                  <StyledTableHead rowSpan={2} colSpan={2}>
                    Efetivo pecuário
                  </StyledTableHead>
                  <StyledTableHead colSpan={4}>
                    Tipo de alimento (ton)
                    <br /> (ton/mês)
                  </StyledTableHead>
                  <StyledTableHead rowSpan={2}>
                    ANEXAR RÓTULO <br /> ALIMENTO <br /> COMPOSTOS
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
                  <StyledTableHead colSpan={2}>
                    {"Bovinos Machos com < 6 meses"}
                  </StyledTableHead>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                </TableRow>
                <TableRow>
                  <StyledTableHead colSpan={2}>
                    {"Bovinos Fêmeas com < 6 meses"}
                  </StyledTableHead>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                </TableRow>
                <TableRow>
                  <StyledTableHead colSpan={2}>
                    {"Bovinos Macho de 6 meses: a < 1 ano"}
                  </StyledTableHead>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                </TableRow>
                <TableRow>
                  <StyledTableHead colSpan={2}>
                    {"Bovinos Fêmeas de 6 meses a < 1 ano"}
                  </StyledTableHead>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                </TableRow>
                <TableRow>
                  <StyledTableHead colSpan={2}>
                    {"Bovinos Machos de 1 ano a < 2 anos"}
                  </StyledTableHead>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                </TableRow>
                <TableRow>
                  <StyledTableHead colSpan={2}>
                    {"Bovinos Fêmeas de 1 ano a < 2 anos"}
                  </StyledTableHead>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                </TableRow>
                <TableRow>
                  <StyledTableHead colSpan={2}>
                    {"Bovinos Machos com ≥ 2 anos"}
                  </StyledTableHead>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                </TableRow>
                <TableRow>
                  <StyledTableHead colSpan={2}>
                    {"Bovinos Fêmeas com ≥ 2 anos"}
                  </StyledTableHead>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                  <StyledTableCell2></StyledTableCell2>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} sx={{ textAlign: "right" }}>
                    Sub-Total
                  </TableCell>
                  <StyledTableCell2>{} </StyledTableCell2>
                  <StyledTableCell2>{} </StyledTableCell2>
                  <StyledTableCell2>{} </StyledTableCell2>
                  <StyledTableCell2>{} </StyledTableCell2>
                  <StyledTableCell2>{} </StyledTableCell2>
                </TableRow>
              </TableBody>
            </table>
            <Box sx={{ width: 50 }}></Box>
            <table width="100%">
              <TableHead>
                <TableRow>
                  <StyledTableHead rowSpan={2}>
                    Efetivo pecuário
                  </StyledTableHead>
                  <StyledTableHead rowSpan={2}>CN</StyledTableHead>
                  <StyledTableHead rowSpan={2}>Nº de dias</StyledTableHead>
                  <StyledTableHead colSpan={4}>
                    Tipo de alimento <br /> (kg/MS/dia/CN)
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
                {editingId === id ? (
                  <>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Machos com < 6 meses"}
                      </StyledTableHead>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_menos_6meses_cn}
                          name="b_macho_menos_6meses_cn"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_menos_6meses_cn",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_menos_6meses_dias}
                          name="b_macho_menos_6meses_dias"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_menos_6meses_dias",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_menos_6meses_pastagem}
                          name="b_macho_menos_6meses_pastagem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_menos_6meses_pastagem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_menos_6meses_silagem}
                          name="b_macho_menos_6meses_silagem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_menos_6meses_silagem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_menos_6meses_o_forragem}
                          name="b_macho_menos_6meses_o_forragem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_menos_6meses_o_forragem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_menos_6meses_composto}
                          name="b_macho_menos_6meses_composto"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_menos_6meses_composto",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Fêmeas com < 6 meses"}
                      </StyledTableHead>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_menos_6meses_cn}
                          name="b_femea_menos_6meses_cn"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_menos_6meses_cn",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_menos_6meses_dias}
                          name="b_femea_menos_6meses_dias"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_menos_6meses_dias",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_menos_6meses_pastagem}
                          name="b_femea_menos_6meses_pastagem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_menos_6meses_pastagem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_menos_6meses_silagem}
                          name="b_femea_menos_6meses_silagem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_menos_6meses_silagem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_menos_6meses_o_forragem}
                          name="b_femea_menos_6meses_o_forragem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_menos_6meses_o_forragem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_menos_6meses_composto}
                          name="b_femea_menos_6meses_composto"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_menos_6meses_composto",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Macho de 6 meses: a < 1 ano"}
                      </StyledTableHead>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_6meses_a_1ano_cn}
                          name="b_macho_6meses_a_1ano_cn"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_6meses_a_1ano_cn",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_6meses_a_1ano_dias}
                          name="b_macho_6meses_a_1ano_dias"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_6meses_a_1ano_dias",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_6meses_a_1ano_pastagem}
                          name="b_macho_6meses_a_1ano_pastagem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_6meses_a_1ano_pastagem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        {" "}
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_6meses_a_1ano_silagem}
                          name="b_macho_6meses_a_1ano_silagem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_6meses_a_1ano_silagem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_6meses_a_1ano_o_forragem}
                          name="b_macho_6meses_a_1ano_o_forragem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_6meses_a_1ano_o_forragem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_6meses_a_1ano_composto}
                          name="b_macho_6meses_a_1ano_composto"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_6meses_a_1ano_composto",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Fêmeas de 6 meses: a < 1 ano"}
                      </StyledTableHead>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_6meses_a_1ano_cn}
                          name="b_femea_6meses_a_1ano_cn"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_6meses_a_1ano_cn",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_6meses_a_1ano_dias}
                          name="b_femea_6meses_a_1ano_dias"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_6meses_a_1ano_dias",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_6meses_a_1ano_pastagem}
                          name="b_femea_6meses_a_1ano_pastagem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_6meses_a_1ano_pastagem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_6meses_a_1ano_silagem}
                          name="b_femea_6meses_a_1ano_silagem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_6meses_a_1ano_silagem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_6meses_a_1ano_o_forragem}
                          name="b_femea_6meses_a_1ano_o_forragem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_6meses_a_1ano_o_forragem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_6meses_a_1ano_composto}
                          name="b_femea_6meses_a_1ano_composto"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_6meses_a_1ano_composto",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Machos de 1 ano a < 2 anos"}
                      </StyledTableHead>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_mais1ano_menos2_cn}
                          name="b_macho_mais1ano_menos2_cn"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_mais1ano_menos2_cn",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_mais1ano_menos2_dias}
                          name="b_macho_mais1ano_menos2_dias"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_mais1ano_menos2_dias",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_mais1ano_menos2_pastagem}
                          name="b_macho_mais1ano_menos2_pastagem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_mais1ano_menos2_pastagem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_mais1ano_menos2_silagem}
                          name="b_macho_mais1ano_menos2_silagem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_mais1ano_menos2_silagem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_mais1ano_menos2_o_forragem}
                          name="b_macho_mais1ano_menos2_o_forragem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_mais1ano_menos2_o_forragem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_mais1ano_menos2_composto}
                          name="b_macho_mais1ano_menos2_composto"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_mais1ano_menos2_composto",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Fêmeas de 1 ano a < 2 anos"}
                      </StyledTableHead>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_mais1ano_menos2_cn}
                          name="b_femea_mais1ano_menos2_cn"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_mais1ano_menos2_cn",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_mais1ano_menos2_dias}
                          name="b_femea_mais1ano_menos2_dias"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_mais1ano_menos2_dias",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_mais1ano_menos2_pastagem}
                          name="b_femea_mais1ano_menos2_pastagem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_mais1ano_menos2_pastagem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_mais1ano_menos2_silagem}
                          name="b_femea_mais1ano_menos2_silagem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_mais1ano_menos2_silagem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_mais1ano_menos2_o_forragem}
                          name="b_femea_mais1ano_menos2_o_forragem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_mais1ano_menos2_o_forragem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_mais1ano_menos2_composto}
                          name="b_femea_mais1ano_menos2_composto"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_mais1ano_menos2_composto",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Machos com ≥ 2 anos"}
                      </StyledTableHead>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_mais_2anos_cn}
                          name="b_macho_mais_2anos_cn"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_mais_2anos_cn",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_mais_2anos_dias}
                          name="b_macho_mais_2anos_dias"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_mais_2anos_dias",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_mais_2anos_pastagem}
                          name="b_macho_mais_2anos_pastagem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_mais_2anos_pastagem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_mais_2anos_silagem}
                          name="b_macho_mais_2anos_silagem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_mais_2anos_silagem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_mais_2anos_o_forragem}
                          name="b_macho_mais_2anos_o_forragem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_mais_2anos_o_forragem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_macho_mais_2anos_composto}
                          name="b_macho_mais_2anos_composto"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_mais_2anos_composto",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Fêmeas com ≥ 2 anos"}
                      </StyledTableHead>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_mais_2anos_cn}
                          name="b_femea_mais_2anos_cn"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_mais_2anos_cn",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_mais_2anos_dias}
                          name="b_femea_mais_2anos_dias"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_mais_2anos_dias",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_mais_2anos_pastagem}
                          name="b_femea_mais_2anos_pastagem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_mais_2anos_pastagem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_mais_2anos_silagem}
                          name="b_femea_mais_2anos_silagem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_mais_2anos_silagem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_mais_2anos_o_forragem}
                          name="b_femea_mais_2anos_o_forragem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_mais_2anos_o_forragem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={row.b_femea_mais_2anos_composto}
                          name="b_femea_mais_2anos_composto"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_mais_2anos_composto",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                    </TableRow>
                  </>
                ) : (
                  <>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Machos com < 6 meses"}
                      </StyledTableHead>
                      <StyledTableCell>
                        {row.b_macho_menos_6meses_cn}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_macho_menos_6meses_dias}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_macho_menos_6meses_pastagem}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_macho_menos_6meses_silagem}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_macho_menos_6meses_o_forragem}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_macho_menos_6meses_composto}{" "}
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Fêmeas com < 6 meses"}
                      </StyledTableHead>
                      <StyledTableCell>
                        {row.b_femea_menos_6meses_cn}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_femea_menos_6meses_dias}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_femea_menos_6meses_pastagem}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_femea_menos_6meses_silagem}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_femea_menos_6meses_o_forragem}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_femea_menos_6meses_composto}{" "}
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Macho de 6 meses: a < 1 ano"}
                      </StyledTableHead>
                      <StyledTableCell>
                        {row.b_macho_6meses_a_1ano_cn}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_macho_6meses_a_1ano_dias}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_macho_6meses_a_1ano_pastagem}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_macho_6meses_a_1ano_silagem}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_macho_6meses_a_1ano_o_forragem}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_macho_6meses_a_1ano_composto}{" "}
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Fêmeas de 6 meses: a < 1 ano"}
                      </StyledTableHead>
                      <StyledTableCell>
                        {row.b_femea_6meses_a_1ano_cn}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_femea_6meses_a_1ano_dias}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_femea_6meses_a_1ano_pastagem}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_femea_6meses_a_1ano_silagem}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_femea_6meses_a_1ano_o_forragem}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_femea_6meses_a_1ano_composto}{" "}
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Machos de 1 ano a < 2 anos"}
                      </StyledTableHead>
                      <StyledTableCell>
                        {row.b_macho_mais1ano_menos2_cn}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_macho_mais1ano_menos2_dias}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_macho_mais1ano_menos2_pastagem}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_macho_mais1ano_menos2_silagem}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_macho_mais1ano_menos2_o_forragem}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_macho_mais1ano_menos2_composto}{" "}
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Fêmeas de 1 ano a < 2 anos"}
                      </StyledTableHead>
                      <StyledTableCell>
                        {row.b_femea_mais1ano_menos2_cn}{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_femea_mais1ano_menos2_dias}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_femea_mais1ano_menos2_pastagem}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_femea_mais1ano_menos2_silagem}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_femea_mais1ano_menos2_o_forragem}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_femea_mais1ano_menos2_composto}
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Machos com ≥ 2 anos"}
                      </StyledTableHead>
                      <StyledTableCell>
                        {row.b_macho_mais_2anos_cn}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_macho_mais_2anos_dias}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_macho_mais_2anos_pastagem}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_macho_mais_2anos_silagem}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_macho_mais_2anos_o_forragem}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_macho_mais_2anos_composto}
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Fêmeas com ≥ 2 anos"}
                      </StyledTableHead>
                      <StyledTableCell>
                        {row.b_femea_mais_2anos_cn}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_femea_mais_2anos_dias}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_femea_mais_2anos_pastagem}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_femea_mais_2anos_silagem}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_femea_mais_2anos_o_forragem}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.b_femea_mais_2anos_composto}
                      </StyledTableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </table>
          </Stack>
        </TableContainer>
      </form>
    </>
  );
};
