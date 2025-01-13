import React, { ChangeEvent, useEffect, useState } from "react";

import { TextField, styled } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import { get, post } from "../../../Services/tokenConfig";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";

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

export interface INecessidadesNutriTotalGH2 {
  id_nutri_totaisGH2: number;

  b_macho_menos_6meses_materia: string;
  b_femea_menos_6meses_materia: string;
  b_macho_6meses_a_1ano_materia: string;
  b_femea_6meses_a_1ano_materia: string;
  b_macho_mais1ano_menos2_materia: string;
  b_femea_mais1ano_menos2_materia: string;
  b_macho_mais_2anos_materia: string;
  b_femea_mais_2anos_materia: string;

  b_macho_menos_6meses_energia: string;
  b_femea_menos_6meses_energia: string;
  b_macho_6meses_a_1ano_energia: string;
  b_femea_6meses_a_1ano_energia: string;
  b_macho_mais1ano_menos2_energia: string;
  b_femea_mais1ano_menos2_energia: string;
  b_macho_mais_2anos_energia: string;
  b_femea_mais_2anos_energia: string;

  b_macho_menos_6meses_proteina: string;
  b_femea_menos_6meses_proteina: string;
  b_macho_6meses_a_1ano_proteina: string;
  b_femea_6meses_a_1ano_proteina: string;
  b_macho_mais1ano_menos2_proteina: string;
  b_femea_mais1ano_menos2_proteina: string;
  b_macho_mais_2anos_proteina: string;
  b_femea_mais_2anos_proteina: string;

  b_macho_menos_6meses_bf: string;
  b_femea_menos_6meses_bf: string;
  b_macho_6meses_a_1ano_bf: string;
  b_femea_6meses_a_1ano_bf: string;
  b_macho_mais1ano_menos2_bf: string;
  b_femea_mais1ano_menos2_bf: string;
  b_macho_mais_2anos_bf: string;
  b_femea_mais_2anos_bf: string;

  b_macho_menos_6meses_leite: string;
  b_femea_menos_6meses_leite: string;
  b_macho_6meses_a_1ano_leite: string;
  b_femea_6meses_a_1ano_leite: string;

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

  b_macho_menos_6meses_o_forragens: string;
  b_femea_menos_6meses_o_forragens: string;
  b_macho_6meses_a_1ano_o_forragens: string;
  b_femea_6meses_a_1ano_o_forragens: string;
  b_macho_mais1ano_menos2_o_forragens: string;
  b_femea_mais1ano_menos2_o_forragens: string;
  b_macho_mais_2anos_o_forragens: string;
  b_femea_mais_2anos_o_forragens: string;

  b_macho_menos_6meses_alimento: string;
  b_femea_menos_6meses_alimento: string;
  b_macho_6meses_a_1ano_alimento: string;
  b_femea_6meses_a_1ano_alimento: string;
  b_macho_mais1ano_menos2_alimento: string;
  b_femea_mais1ano_menos2_alimento: string;
  b_macho_mais_2anos_alimento: string;
  b_femea_mais_2anos_alimento: string;

  id_rosto: 0;
  last_update: string;
  create_date: string;
  uuid: string;
}

interface INecessidadesTotaisProps {
  tabela: INecessidadesNutriTotalGH2;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const NNutricionaisTotaisEFGH2: React.FC<INecessidadesTotaisProps> = ({
  tabela,
  onInputChange,
}) => {
  const idrosto = parseInt(localStorage.getItem("idrosto") || "0", 10);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [, setEditedFields] = useState<
    Partial<Record<number, Partial<INecessidadesNutriTotalGH2>>>
  >({});
  const [id] = useState(0);

  /************* TABELA EFETIVO PECUARIO ***********************************/
  // const [rowsEfetivo, setRowsEfetivo] =useState<IEfetivoPecuario[]>([]);
  const [efetivo, setEfetivo] = useState<INecessidadesNutriTotalGH2>({
    id_nutri_totaisGH2: 0,

    b_macho_menos_6meses_materia: "",
    b_femea_menos_6meses_materia: "",
    b_macho_6meses_a_1ano_materia: "",
    b_femea_6meses_a_1ano_materia: "",
    b_macho_mais1ano_menos2_materia: "",
    b_femea_mais1ano_menos2_materia: "",
    b_macho_mais_2anos_materia: "",
    b_femea_mais_2anos_materia: "",

    b_macho_menos_6meses_energia: "",
    b_femea_menos_6meses_energia: "",
    b_macho_6meses_a_1ano_energia: "",
    b_femea_6meses_a_1ano_energia: "",
    b_macho_mais1ano_menos2_energia: "",
    b_femea_mais1ano_menos2_energia: "",
    b_macho_mais_2anos_energia: "",
    b_femea_mais_2anos_energia: "",

    b_macho_menos_6meses_proteina: "",
    b_femea_menos_6meses_proteina: "",
    b_macho_6meses_a_1ano_proteina: "",
    b_femea_6meses_a_1ano_proteina: "",
    b_macho_mais1ano_menos2_proteina: "",
    b_femea_mais1ano_menos2_proteina: "",
    b_macho_mais_2anos_proteina: "",
    b_femea_mais_2anos_proteina: "",

    b_macho_menos_6meses_bf: "",
    b_femea_menos_6meses_bf: "",
    b_macho_6meses_a_1ano_bf: "",
    b_femea_6meses_a_1ano_bf: "",
    b_macho_mais1ano_menos2_bf: "",
    b_femea_mais1ano_menos2_bf: "",
    b_macho_mais_2anos_bf: "",
    b_femea_mais_2anos_bf: "",

    b_macho_menos_6meses_leite: "",
    b_femea_menos_6meses_leite: "",
    b_macho_6meses_a_1ano_leite: "",
    b_femea_6meses_a_1ano_leite: "",

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

    b_macho_menos_6meses_o_forragens: "",
    b_femea_menos_6meses_o_forragens: "",
    b_macho_6meses_a_1ano_o_forragens: "",
    b_femea_6meses_a_1ano_o_forragens: "",
    b_macho_mais1ano_menos2_o_forragens: "",
    b_femea_mais1ano_menos2_o_forragens: "",
    b_macho_mais_2anos_o_forragens: "",
    b_femea_mais_2anos_o_forragens: "",

    b_macho_menos_6meses_alimento: "",
    b_femea_menos_6meses_alimento: "",
    b_macho_6meses_a_1ano_alimento: "",
    b_femea_6meses_a_1ano_alimento: "",
    b_macho_mais1ano_menos2_alimento: "",
    b_femea_mais1ano_menos2_alimento: "",
    b_macho_mais_2anos_alimento: "",
    b_femea_mais_2anos_alimento: "",

    id_rosto: 0,
    last_update: "",
    create_date: "",
    uuid: "",
  });

  const handleNewRowsChange = (
    field: keyof INecessidadesNutriTotalGH2,
    value: string | number
  ) => {
    setEfetivo((prevNewRows) => ({
      ...prevNewRows,
      [field]: value,
    }));
  };

  async function getTabela(): Promise<INecessidadesNutriTotalGH2> {
    try {
      const response = await get(`/get_reg_/${idrosto}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao obter cabeçalho por ID");
    }
  }

  useEffect(() => {
    getTabela();
  }, []);

  /********* CREATE *******************/
  async function criarTabela(
    tabela: INecessidadesNutriTotalGH2
  ): Promise<INecessidadesNutriTotalGH2> {
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
  };

  return (
    <>
      <form>
        <TableContainer>
          <table>
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={9}
                  sx={{
                    fontWeight: 700,
                    fontSize: 16,
                    fontFamily: "candara",
                  }}
                >
                  3. Necessidades Nutricionais e Dieta Totais
                </TableCell>
                {editingId === id ? (
                  <TableCell colSpan={8}>
                    <ButtonCadernos
                      mostrarBotaoGravar
                      aoClicarGravar={() => criarTabela(efetivo)}
                      mostrarBotaoCancelar
                      aoClicarCancelar={() => setEditingId(null)}
                    />
                  </TableCell>
                ) : (
                  <TableCell
                    colSpan={8}
                    sx={{ alignItems: "center", justifyContent: "end" }}
                  >
                    <ButtonCadernos
                      mostrarBotaoEditar
                      aoClicarEditar={() => handleEdit(id)}
                      mostrarBotaoApagar
                      // aoClicarApagar={() => handleClickOpenDelete(id)}
                    />
                  </TableCell>
                )}
              </TableRow>
              <TableRow>
                <StyledTableHead rowSpan={2}>Efetivo Pecuário</StyledTableHead>
                <StyledTableHead colSpan={4}>
                  Necessidades nutricionais do efetivo
                </StyledTableHead>
                <StyledTableHead colSpan={5}>
                  Tipo de alimento <br /> (Kg/MS/CN/dia)
                </StyledTableHead>
              </TableRow>
              <StyledTableHead>
                Matéria Seca <br /> (kg/MS/dia)
              </StyledTableHead>
              <StyledTableHead>
                Energia <br /> Energia (Mjoules/dia)
              </StyledTableHead>
              <StyledTableHead>
                Proteina Bruta <br /> (kg,MS,dia)
              </StyledTableHead>
              <StyledTableHead>
                FB/NDF <br /> (kg,MS,dia){" "}
              </StyledTableHead>
              <StyledTableHead>Leite substituição</StyledTableHead>
              <StyledTableHead>Pastagem</StyledTableHead>
              <StyledTableHead>Silagem</StyledTableHead>
              <StyledTableHead>Outra forragem</StyledTableHead>
              <StyledTableHead>Alimento composto</StyledTableHead>
            </TableHead>
            <TableBody>
              {editingId === id ? (
                <>
                  <TableRow>
                    <StyledTableHead>
                      {"Bovinos Machos com < 6 Meses"}
                    </StyledTableHead>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_menos_6meses_materia}
                        name="b_macho_menos_6meses_materia"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_menos_6meses_materia",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_menos_6meses_energia}
                        name="b_macho_menos_6meses_energia"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_menos_6meses_energia",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_menos_6meses_proteina}
                        name="b_macho_menos_6meses_proteina"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_menos_6meses_proteina",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_menos_6meses_bf}
                        name="b_macho_menos_6meses_leite"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_menos_6meses_bf",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_menos_6meses_leite}
                        name="b_macho_menos_6meses_leite"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_menos_6meses_leite",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_menos_6meses_pastagem}
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
                        value={efetivo.b_macho_menos_6meses_silagem}
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
                        value={efetivo.b_macho_menos_6meses_o_forragens}
                        name="b_macho_menos_6meses_o_forragens"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_menos_6meses_o_forragens",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_menos_6meses_alimento}
                        name="b_macho_menos_6meses_alimento"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_menos_6meses_alimento",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>
                      {"Bovinos Fêmeas com < 6 Mes"}
                    </StyledTableHead>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_menos_6meses_materia}
                        name="b_femea_menos_6meses_materia"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_menos_6meses_materia",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_menos_6meses_energia}
                        name="b_femea_menos_6meses_energia"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_menos_6meses_energia",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_menos_6meses_proteina}
                        name="b_femea_menos_6meses_proteina"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_menos_6meses_proteina",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_menos_6meses_bf}
                        name="b_femea_menos_6meses_bf"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_menos_6meses_bf",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_menos_6meses_leite}
                        name="b_femea_menos_6meses_leite"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_menos_6meses_leite",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_menos_6meses_pastagem}
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
                        value={efetivo.b_femea_menos_6meses_silagem}
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
                        value={efetivo.b_femea_menos_6meses_o_forragens}
                        name="b_femea_menos_6meses_o_forragens"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_menos_6meses_o_forragens",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_menos_6meses_alimento}
                        name="b_femea_menos_6meses_alimento"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_menos_6meses_alimento",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>
                      {"Bovinos Machos de 6 meses a < 1 ano"}
                    </StyledTableHead>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_6meses_a_1ano_materia}
                        name="b_macho_6meses_a_1ano_materia"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_6meses_a_1ano_materia",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_6meses_a_1ano_energia}
                        name="b_macho_6meses_a_1ano_energia"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_6meses_a_1ano_energia",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_6meses_a_1ano_proteina}
                        name="b_macho_6meses_a_1ano_proteina"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_6meses_a_1ano_proteina",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_6meses_a_1ano_bf}
                        name="b_macho_6meses_a_1ano_bf"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_6meses_a_1ano_bf",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_6meses_a_1ano_leite}
                        name="b_macho_6meses_a_1ano_leite"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_6meses_a_1ano_leite",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_6meses_a_1ano_pastagem}
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
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_6meses_a_1ano_silagem}
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
                        value={efetivo.b_macho_6meses_a_1ano_o_forragens}
                        name="b_macho_6meses_a_1ano_o_forragens"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_6meses_a_1ano_o_forragens",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_6meses_a_1ano_alimento}
                        name="b_macho_6meses_a_1ano_alimento"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_6meses_a_1ano_alimento",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>
                      {"Bovinos Fêmeas de 6 meses a < 1 ano"}
                    </StyledTableHead>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_6meses_a_1ano_materia}
                        name="b_femea_6meses_a_1ano_materia"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_6meses_a_1ano_materia",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_6meses_a_1ano_energia}
                        name="b_femea_6meses_a_1ano_energia"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_6meses_a_1ano_energia",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_6meses_a_1ano_proteina}
                        name="b_femea_6meses_a_1ano_proteina"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_6meses_a_1ano_proteina",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_6meses_a_1ano_bf}
                        name="b_femea_6meses_a_1ano_bf"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_6meses_a_1ano_bf",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_6meses_a_1ano_leite}
                        name="b_femea_6meses_a_1ano_leite"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_6meses_a_1ano_leite",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_6meses_a_1ano_pastagem}
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
                        value={efetivo.b_femea_6meses_a_1ano_silagem}
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
                        value={efetivo.b_femea_6meses_a_1ano_o_forragens}
                        name="b_femea_6meses_a_1ano_o_forragens"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_6meses_a_1ano_o_forragens",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_6meses_a_1ano_alimento}
                        name="b_femea_6meses_a_1ano_alimento"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_6meses_a_1ano_alimento",
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
                        value={efetivo.b_macho_mais1ano_menos2_materia}
                        name="b_macho_mais1ano_menos2_materia"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais1ano_menos2_materia",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_mais1ano_menos2_energia}
                        name="b_macho_mais1ano_menos2_energia"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais1ano_menos2_energia",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_mais1ano_menos2_proteina}
                        name="b_macho_mais1ano_menos2_proteina"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais1ano_menos2_proteina",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_mais1ano_menos2_bf}
                        name="b_macho_mais1ano_menos2_bf"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais1ano_menos2_bf",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_mais1ano_menos2_pastagem}
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
                        value={efetivo.b_macho_mais1ano_menos2_silagem}
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
                        value={efetivo.b_macho_mais1ano_menos2_o_forragens}
                        name="b_macho_mais1ano_menos2_o_forragens"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais1ano_menos2_o_forragens",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_mais1ano_menos2_alimento}
                        name="b_macho_mais1ano_menos2_alimento"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais1ano_menos2_alimento",
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
                        value={efetivo.b_femea_mais1ano_menos2_materia}
                        name="b_femea_mais1ano_menos2_materia"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais1ano_menos2_materia",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_mais1ano_menos2_energia}
                        name="b_femea_mais1ano_menos2_energia"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais1ano_menos2_energia",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_mais1ano_menos2_proteina}
                        name="b_femea_mais1ano_menos2_proteina"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais1ano_menos2_proteina",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_mais1ano_menos2_bf}
                        name="b_femea_mais1ano_menos2_bf"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais1ano_menos2_bf",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_mais1ano_menos2_pastagem}
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
                        value={efetivo.b_femea_mais1ano_menos2_silagem}
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
                        value={efetivo.b_femea_mais1ano_menos2_o_forragens}
                        name="b_femea_mais1ano_menos2_o_forragens"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais1ano_menos2_o_forragens",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_mais1ano_menos2_alimento}
                        name="b_femea_mais1ano_menos2_alimento"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais1ano_menos2_alimento",
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
                        value={efetivo.b_macho_mais_2anos_materia}
                        name="b_macho_mais_2anos_materia"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais_2anos_materia",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_mais_2anos_energia}
                        name="b_macho_mais_2anos_energia"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais_2anos_energia",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_mais_2anos_proteina}
                        name="b_macho_mais_2anos_proteina"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais_2anos_proteina",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_mais_2anos_bf}
                        name="b_macho_mais_2anos_bf"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais_2anos_bf",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_mais_2anos_pastagem}
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
                        value={efetivo.b_macho_mais_2anos_silagem}
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
                        value={efetivo.b_macho_mais_2anos_o_forragens}
                        name="b_macho_mais_2anos_o_forragens"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais_2anos_o_forragens",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_mais_2anos_alimento}
                        name="b_macho_mais_2anos_alimento"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais_2anos_alimento",
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
                        value={efetivo.b_femea_mais_2anos_materia}
                        name="b_femea_mais_2anos_materia"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais_2anos_materia",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_mais_2anos_energia}
                        name="b_femea_mais_2anos_energia"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais_2anos_energia",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_mais_2anos_proteina}
                        name="b_femea_mais_2anos_proteina"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais_2anos_proteina",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_mais_2anos_bf}
                        name="b_femea_mais_2anos_bf"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais_2anos_bf",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_mais_2anos_pastagem}
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
                        value={efetivo.b_femea_mais_2anos_silagem}
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
                        value={efetivo.b_femea_mais_2anos_o_forragens}
                        name="b_femea_mais_2anos_o_forragens"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais_2anos_o_forragens",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_mais_2anos_alimento}
                        name="b_femea_mais_2anos_alimento"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais_2anos_alimento",
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
                      {"Bovinos Machos com < 6 Mes"}
                    </StyledTableHead>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_materia}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_energia}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_proteina}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_bf}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_leite}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_pastagem}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_silagem}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_o_forragens}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_alimento}
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>
                      {"Bovinos Fêmeas com < 6 Mes"}
                    </StyledTableHead>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_materia}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_energia}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_proteina}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_bf}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_leite}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_pastagem}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_silagem}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_o_forragens}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_alimento}
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>
                      {"Bovinos Machos de 6 meses a < 1 ano"}
                    </StyledTableHead>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_materia}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_energia}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_proteina}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_bf}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_leite}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_pastagem}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_silagem}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_o_forragens}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_alimento}
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>
                      {"Bovinos Fêmeas de 6 meses a < 1 ano"}
                    </StyledTableHead>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_materia}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_energia}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_proteina}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_bf}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_leite}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_pastagem}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_silagem}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_o_forragens}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_alimento}
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>
                      {"Bovinos Machos de 1 ano a < 2 anos"}
                    </StyledTableHead>
                    <StyledTableCell>
                      {efetivo.b_macho_mais1ano_menos2_materia}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais1ano_menos2_energia}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais1ano_menos2_proteina}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais1ano_menos2_bf}
                    </StyledTableCell>
                    <StyledTableCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais1ano_menos2_pastagem}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais1ano_menos2_silagem}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais1ano_menos2_o_forragens}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais1ano_menos2_alimento}
                    </StyledTableCell>                   
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>
                      {"Bovinos Fêmeas de 1 ano a < 2 anos"}
                    </StyledTableHead>
                    <StyledTableCell>
                      {efetivo.b_femea_mais1ano_menos2_materia}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais1ano_menos2_energia}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais1ano_menos2_proteina}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais1ano_menos2_bf}
                    </StyledTableCell>
                    <StyledTableCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais1ano_menos2_pastagem}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais1ano_menos2_silagem}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais1ano_menos2_o_forragens}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais1ano_menos2_alimento}
                    </StyledTableCell> 
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>
                      {"Bovinos Machos com ≥ 2 anos"}
                    </StyledTableHead>
                    <StyledTableCell>
                      {efetivo.b_macho_mais_2anos_materia}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais_2anos_energia}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais_2anos_proteina}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais_2anos_bf}
                    </StyledTableCell>
                    <StyledTableCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais_2anos_pastagem}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais_2anos_silagem}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais_2anos_o_forragens}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais_2anos_alimento}
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>
                      {"Bovinos Fêmeas com ≥ 2 anos"}
                    </StyledTableHead>
                    <StyledTableCell>
                      {efetivo.b_femea_mais_2anos_materia}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais_2anos_energia}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais_2anos_proteina}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais_2anos_bf}
                    </StyledTableCell>
                    <StyledTableCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais_2anos_pastagem}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais_2anos_silagem}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais_2anos_o_forragens}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais_2anos_alimento}
                    </StyledTableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </table>
        </TableContainer>
      </form>
    </>
  );
};
