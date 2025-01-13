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
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  padding: theme.spacing(0, 1),
  border: "1px solid #555",
  textAlign: "center",
  fontSize: 14,
  height: "40px",
}));

export interface IAlimentoCompostoGH2 {
  id_alim_compostoGH2: number;

  b_macho_menos_6meses_prot_bruta: string;
  b_femea_menos_6meses_prot_bruta: string;
  b_macho_6meses_a_1ano_prot_bruta: string;
  b_femea_6meses_a_1ano_prot_bruta: string;
  b_macho_mais1ano_menos2_prot_bruta: string;
  b_femea_mais1ano_menos2_prot_bruta: string;
  b_macho_mais_2anos_prot_bruta: string;
  b_femea_mais_2anos_prot_bruta: string;

  b_macho_menos_6meses_gordura: string;
  b_femea_menos_6meses_gordura: string;
  b_macho_6meses_a_1ano_gordura: string;
  b_femea_6meses_a_1ano_gordura: string;
  b_macho_mais1ano_menos2_gordura: string;
  b_femea_mais1ano_menos2_gordura: string;
  b_macho_mais_2anos_gordura: string;
  b_femea_mais_2anos_gordura: string;

  b_macho_menos_6meses_organoleticos: string;
  b_femea_menos_6meses_organoleticos: string;
  b_macho_6meses_a_1ano_organoleticos: string;
  b_femea_6meses_a_1ano_organoleticos: string;
  b_macho_mais1ano_menos2_organoleticos: string;
  b_femea_mais1ano_menos2_organoleticos: string;
  b_macho_mais_2anos_organoleticos: string;
  b_femea_mais_2anos_organoleticos: string;

  b_macho_menos_6meses_nutri: string;
  b_femea_menos_6meses_nutri: string;
  b_macho_6meses_a_1ano_nutri: string;
  b_femea_6meses_a_1ano_nutri: string;
  b_macho_mais1ano_menos2_nutri: string;
  b_femea_mais1ano_menos2_nutri: string;
  b_macho_mais_2anos_nutri: string;
  b_femea_mais_2anos_nutri: string;

  b_macho_menos_6meses_ambientais: string;
  b_femea_menos_6meses_ambientais: string;
  b_macho_6meses_a_1ano_ambientais: string;
  b_femea_6meses_a_1ano_ambientais: string;
  b_macho_mais1ano_menos2_ambientais: string;
  b_femea_mais1ano_menos2_ambientais: string;
  b_macho_mais_2anos_ambientais: string;
  b_femea_mais_2anos_ambientais: string;

  b_macho_menos_6meses_melhor: string;
  b_femea_menos_6meses_melhor: string;
  b_macho_6meses_a_1ano_melhor: string;
  b_femea_6meses_a_1ano_melhor: string;
  b_macho_mais1ano_menos2_melhor: string;
  b_femea_mais1ano_menos2_melhor: string;
  b_macho_mais_2anos_melhor: string;
  b_femea_mais_2anos_melhor: string;

  b_macho_menos_6meses_estabiliz: string;
  b_femea_menos_6meses_estabiliz: string;
  b_macho_6meses_a_1ano_estabiliz: string;
  b_femea_6meses_a_1ano_estabiliz: string;
  b_macho_mais1ano_menos2_estabiliz: string;
  b_femea_mais1ano_menos2_estabiliz: string;
  b_macho_mais_2anos_estabiliz: string;
  b_femea_mais_2anos_estabiliz: string;

  b_macho_menos_6meses_o_zoot: string;
  b_femea_menos_6meses_o_zoot: string;
  b_macho_6meses_a_1ano_o_zoot: string;
  b_femea_6meses_a_1ano_o_zoot: string;
  b_macho_mais1ano_menos2_o_zoot: string;
  b_femea_mais1ano_menos2_o_zoot: string;
  b_macho_mais_2anos_o_zoot: string;
  b_femea_mais_2anos_o_zoot: string;

  total_bov_menos6_proteina: string;
  total_bov_mais6_proteina: string;
  total_gordura: string;

  id_rosto: 0;
  last_update: string;
  create_date: string;
  uuid: string;
}

interface INAlimentoCompostoProps {
  tabela: IAlimentoCompostoGH2;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const AlimentoCompostoEFGH2: React.FC<INAlimentoCompostoProps> = ({
  tabela,
  onInputChange,
}) => {
  const idrosto = parseInt(localStorage.getItem("idrosto") || "0", 10);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [, setEditedFields] = useState<
    Partial<Record<number, Partial<IAlimentoCompostoGH2>>>
  >({});
  const [id] = useState(0);

  /************* TABELA EFETIVO PECUARIO ***********************************/
  // const [rowsEfetivo, setRowsEfetivo] =useState<IEfetivoPecuario[]>([]);
  const [efetivo, setEfetivo] = useState<IAlimentoCompostoGH2>({
    id_alim_compostoGH2: 0,

    b_macho_menos_6meses_prot_bruta: "",
    b_femea_menos_6meses_prot_bruta: "",
    b_macho_6meses_a_1ano_prot_bruta: "",
    b_femea_6meses_a_1ano_prot_bruta: "",
    b_macho_mais1ano_menos2_prot_bruta: "",
    b_femea_mais1ano_menos2_prot_bruta: "",
    b_macho_mais_2anos_prot_bruta: "",
    b_femea_mais_2anos_prot_bruta: "",

    b_macho_menos_6meses_gordura: "",
    b_femea_menos_6meses_gordura: "",
    b_macho_6meses_a_1ano_gordura: "",
    b_femea_6meses_a_1ano_gordura: "",
    b_macho_mais1ano_menos2_gordura: "",
    b_femea_mais1ano_menos2_gordura: "",
    b_macho_mais_2anos_gordura: "",
    b_femea_mais_2anos_gordura: "",

    b_macho_menos_6meses_organoleticos: "",
    b_femea_menos_6meses_organoleticos: "",
    b_macho_6meses_a_1ano_organoleticos: "",
    b_femea_6meses_a_1ano_organoleticos: "",
    b_macho_mais1ano_menos2_organoleticos: "",
    b_femea_mais1ano_menos2_organoleticos: "",
    b_macho_mais_2anos_organoleticos: "",
    b_femea_mais_2anos_organoleticos: "",

    b_macho_menos_6meses_nutri: "",
    b_femea_menos_6meses_nutri: "",
    b_macho_6meses_a_1ano_nutri: "",
    b_femea_6meses_a_1ano_nutri: "",
    b_macho_mais1ano_menos2_nutri: "",
    b_femea_mais1ano_menos2_nutri: "",
    b_macho_mais_2anos_nutri: "",
    b_femea_mais_2anos_nutri: "",

    b_macho_menos_6meses_ambientais: "",
    b_femea_menos_6meses_ambientais: "",
    b_macho_6meses_a_1ano_ambientais: "",
    b_femea_6meses_a_1ano_ambientais: "",
    b_macho_mais1ano_menos2_ambientais: "",
    b_femea_mais1ano_menos2_ambientais: "",
    b_macho_mais_2anos_ambientais: "",
    b_femea_mais_2anos_ambientais: "",

    b_macho_menos_6meses_melhor: "",
    b_femea_menos_6meses_melhor: "",
    b_macho_6meses_a_1ano_melhor: "",
    b_femea_6meses_a_1ano_melhor: "",
    b_macho_mais1ano_menos2_melhor: "",
    b_femea_mais1ano_menos2_melhor: "",
    b_macho_mais_2anos_melhor: "",
    b_femea_mais_2anos_melhor: "",

    b_macho_menos_6meses_estabiliz: "",
    b_femea_menos_6meses_estabiliz: "",
    b_macho_6meses_a_1ano_estabiliz: "",
    b_femea_6meses_a_1ano_estabiliz: "",
    b_macho_mais1ano_menos2_estabiliz: "",
    b_femea_mais1ano_menos2_estabiliz: "",
    b_macho_mais_2anos_estabiliz: "",
    b_femea_mais_2anos_estabiliz: "",

    b_macho_menos_6meses_o_zoot: "",
    b_femea_menos_6meses_o_zoot: "",
    b_macho_6meses_a_1ano_o_zoot: "",
    b_femea_6meses_a_1ano_o_zoot: "",
    b_macho_mais1ano_menos2_o_zoot: "",
    b_femea_mais1ano_menos2_o_zoot: "",
    b_macho_mais_2anos_o_zoot: "",
    b_femea_mais_2anos_o_zoot: "",

    total_bov_menos6_proteina: "",
    total_bov_mais6_proteina: "",
    total_gordura: "",

    id_rosto: 0,
    last_update: "",
    create_date: "",
    uuid: "",
  });

  const handleNewRowsChange = (
    field: keyof IAlimentoCompostoGH2,
    value: string | number
  ) => {
    setEfetivo((prevNewRows) => ({
      ...prevNewRows,
      [field]: value,
    }));
  };

  async function getTabela(): Promise<IAlimentoCompostoGH2> {
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
    tabela: IAlimentoCompostoGH2
  ): Promise<IAlimentoCompostoGH2> {
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
                   4. Alimento Composto
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
                  <StyledTableHead rowSpan={4}>
                    Efetivo Pecuário
                  </StyledTableHead>
                  <StyledTableHead colSpan={8}>
                    Alimento composto
                  </StyledTableHead>
                </TableRow>
                <TableRow>
                  <StyledTableHead rowSpan={3}>
                    "Proteína Bruta %(1)"
                  </StyledTableHead>
                  <StyledTableHead rowSpan={3}>
                    "Proteína Bruta %(2)"
                  </StyledTableHead>
                  <StyledTableHead colSpan={6}>
                    Aditivos (ver nota 3)
                  </StyledTableHead>
                </TableRow>
                <TableRow>
                  <StyledTableHead rowSpan={2}>Organoléticos</StyledTableHead>
                  <StyledTableHead rowSpan={2}>Nutritivos</StyledTableHead>
                  <StyledTableHead colSpan={4}>Zootécnicos</StyledTableHead>
                </TableRow>
                <TableRow>
                  <StyledTableHead>Ambientais</StyledTableHead>
                  <StyledTableHead>
                    Melhoradores digestibilidade
                  </StyledTableHead>
                  <StyledTableHead>
                    Estabilizadores flora gástrica
                  </StyledTableHead>
                  <StyledTableHead>Outros zootécnicos</StyledTableHead>
                </TableRow>
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
                        value={efetivo.b_macho_menos_6meses_prot_bruta}
                        name="b_macho_menos_6meses_prot_bruta"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_menos_6meses_prot_bruta",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_menos_6meses_gordura}
                        name="b_macho_menos_6meses_gordura"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_menos_6meses_gordura",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_menos_6meses_organoleticos}
                        name="b_macho_menos_6meses_organoleticos"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_menos_6meses_organoleticos",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_menos_6meses_nutri}
                        name="b_macho_menos_6meses_ambientais"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_menos_6meses_nutri",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_menos_6meses_ambientais}
                        name="b_macho_menos_6meses_ambientais"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_menos_6meses_ambientais",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_menos_6meses_melhor}
                        name="b_macho_menos_6meses_melhor"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_menos_6meses_melhor",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_menos_6meses_estabiliz}
                        name="b_macho_menos_6meses_estabiliz"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_menos_6meses_estabiliz",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_menos_6meses_o_zoot}
                        name="b_macho_menos_6meses_o_zoot"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_menos_6meses_o_zoot",
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
                        value={efetivo.b_femea_menos_6meses_prot_bruta}
                        name="b_femea_menos_6meses_prot_bruta"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_menos_6meses_prot_bruta",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_menos_6meses_gordura}
                        name="b_femea_menos_6meses_gordura"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_menos_6meses_gordura",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_menos_6meses_organoleticos}
                        name="b_femea_menos_6meses_organoleticos"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_menos_6meses_organoleticos",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_menos_6meses_nutri}
                        name="b_femea_menos_6meses_nutri"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_menos_6meses_nutri",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_menos_6meses_ambientais}
                        name="b_femea_menos_6meses_ambientais"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_menos_6meses_ambientais",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_menos_6meses_melhor}
                        name="b_femea_menos_6meses_melhor"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_menos_6meses_melhor",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_menos_6meses_estabiliz}
                        name="b_femea_menos_6meses_estabiliz"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_menos_6meses_estabiliz",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_menos_6meses_o_zoot}
                        name="b_femea_menos_6meses_o_zoot"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_menos_6meses_o_zoot",
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
                        value={efetivo.b_macho_6meses_a_1ano_prot_bruta}
                        name="b_macho_6meses_a_1ano_prot_bruta"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_6meses_a_1ano_prot_bruta",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_6meses_a_1ano_gordura}
                        name="b_macho_6meses_a_1ano_gordura"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_6meses_a_1ano_gordura",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_6meses_a_1ano_organoleticos}
                        name="b_macho_6meses_a_1ano_organoleticos"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_6meses_a_1ano_organoleticos",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_6meses_a_1ano_nutri}
                        name="b_macho_6meses_a_1ano_nutri"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_6meses_a_1ano_nutri",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_6meses_a_1ano_ambientais}
                        name="b_macho_6meses_a_1ano_ambientais"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_6meses_a_1ano_ambientais",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_6meses_a_1ano_melhor}
                        name="b_macho_6meses_a_1ano_melhor"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_6meses_a_1ano_melhor",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_6meses_a_1ano_estabiliz}
                        name="b_macho_6meses_a_1ano_estabiliz"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_6meses_a_1ano_estabiliz",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_6meses_a_1ano_o_zoot}
                        name="b_macho_6meses_a_1ano_o_zoot"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_6meses_a_1ano_o_zoot",
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
                        value={efetivo.b_femea_6meses_a_1ano_prot_bruta}
                        name="b_femea_6meses_a_1ano_prot_bruta"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_6meses_a_1ano_prot_bruta",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_6meses_a_1ano_gordura}
                        name="b_femea_6meses_a_1ano_gordura"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_6meses_a_1ano_gordura",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_6meses_a_1ano_organoleticos}
                        name="b_femea_6meses_a_1ano_organoleticos"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_6meses_a_1ano_organoleticos",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_6meses_a_1ano_nutri}
                        name="b_femea_6meses_a_1ano_nutri"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_6meses_a_1ano_nutri",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_6meses_a_1ano_ambientais}
                        name="b_femea_6meses_a_1ano_ambientais"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_6meses_a_1ano_ambientais",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_6meses_a_1ano_melhor}
                        name="b_femea_6meses_a_1ano_melhor"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_6meses_a_1ano_melhor",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_6meses_a_1ano_estabiliz}
                        name="b_femea_6meses_a_1ano_estabiliz"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_6meses_a_1ano_estabiliz",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_6meses_a_1ano_o_zoot}
                        name="b_femea_6meses_a_1ano_o_zoot"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_6meses_a_1ano_o_zoot",
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
                        value={efetivo.b_macho_mais1ano_menos2_prot_bruta}
                        name="b_macho_mais1ano_menos2_prot_bruta"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais1ano_menos2_prot_bruta",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_mais1ano_menos2_gordura}
                        name="b_macho_mais1ano_menos2_gordura"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais1ano_menos2_gordura",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_mais1ano_menos2_organoleticos}
                        name="b_macho_mais1ano_menos2_organoleticos"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais1ano_menos2_organoleticos",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_mais1ano_menos2_nutri}
                        name="b_macho_mais1ano_menos2_nutri"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais1ano_menos2_nutri",
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
                        value={efetivo.b_macho_mais1ano_menos2_melhor}
                        name="b_macho_mais1ano_menos2_melhor"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais1ano_menos2_melhor",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_mais1ano_menos2_estabiliz}
                        name="b_macho_mais1ano_menos2_estabiliz"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais1ano_menos2_estabiliz",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_mais1ano_menos2_o_zoot}
                        name="b_macho_mais1ano_menos2_o_zoot"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais1ano_menos2_o_zoot",
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
                        value={efetivo.b_femea_mais1ano_menos2_prot_bruta}
                        name="b_femea_mais1ano_menos2_prot_bruta"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais1ano_menos2_prot_bruta",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_mais1ano_menos2_gordura}
                        name="b_femea_mais1ano_menos2_gordura"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais1ano_menos2_gordura",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_mais1ano_menos2_organoleticos}
                        name="b_femea_mais1ano_menos2_organoleticos"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais1ano_menos2_organoleticos",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_mais1ano_menos2_nutri}
                        name="b_femea_mais1ano_menos2_nutri"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais1ano_menos2_nutri",
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
                        value={efetivo.b_femea_mais1ano_menos2_melhor}
                        name="b_femea_mais1ano_menos2_melhor"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais1ano_menos2_melhor",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_mais1ano_menos2_estabiliz}
                        name="b_femea_mais1ano_menos2_estabiliz"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais1ano_menos2_estabiliz",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_mais1ano_menos2_o_zoot}
                        name="b_femea_mais1ano_menos2_o_zoot"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais1ano_menos2_o_zoot",
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
                        value={efetivo.b_macho_mais_2anos_prot_bruta}
                        name="b_macho_mais_2anos_prot_bruta"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais_2anos_prot_bruta",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_mais_2anos_gordura}
                        name="b_macho_mais_2anos_gordura"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais_2anos_gordura",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_mais_2anos_organoleticos}
                        name="b_macho_mais_2anos_organoleticos"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais_2anos_organoleticos",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_mais_2anos_nutri}
                        name="b_macho_mais_2anos_nutri"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais_2anos_nutri",
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
                        value={efetivo.b_macho_mais_2anos_melhor}
                        name="b_macho_mais_2anos_melhor"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais_2anos_melhor",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_mais_2anos_estabiliz}
                        name="b_macho_mais_2anos_estabiliz"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais_2anos_estabiliz",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_macho_mais_2anos_o_zoot}
                        name="b_macho_mais_2anos_o_zoot"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_macho_mais_2anos_o_zoot",
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
                        value={efetivo.b_femea_mais_2anos_prot_bruta}
                        name="b_femea_mais_2anos_prot_bruta"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais_2anos_prot_bruta",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_mais_2anos_gordura}
                        name="b_femea_mais_2anos_gordura"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais_2anos_gordura",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_mais_2anos_organoleticos}
                        name="b_femea_mais_2anos_organoleticos"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais_2anos_organoleticos",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_mais_2anos_nutri}
                        name="b_femea_mais_2anos_nutri"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais_2anos_nutri",
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
                        value={efetivo.b_femea_mais_2anos_melhor}
                        name="b_femea_mais_2anos_melhor"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais_2anos_melhor",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_mais_2anos_estabiliz}
                        name="b_femea_mais_2anos_estabiliz"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais_2anos_estabiliz",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={efetivo.b_femea_mais_2anos_o_zoot}
                        name="b_femea_mais_2anos_o_zoot"
                        onChange={(e) =>
                          handleNewRowsChange(
                            "b_femea_mais_2anos_o_zoot",
                            e.target.value
                          )
                        }
                      />
                    </StyledTableCell>
                  
                  </TableRow>
                  <TableRow>
                  <StyledTableHead>
                    {" "}
                    {"TOTAL (Bovinos < 6 meses)"}{" "}
                  </StyledTableHead>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell rowSpan={2}></StyledTableCell>
                  <StyledTableCell rowSpan={2}></StyledTableCell>
                  <StyledTableCell rowSpan={2}></StyledTableCell>
                  <StyledTableCell rowSpan={2}></StyledTableCell>
                  <StyledTableCell rowSpan={2}></StyledTableCell>
                  <StyledTableCell rowSpan={2}></StyledTableCell>
                  <StyledTableCell rowSpan={2}></StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableHead>
                    {" "}
                    {"TOTAL (Bovinos ≥ 6 meses)"}{" "}
                  </StyledTableHead>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
                </>
              ) : (
                <>
                  <TableRow>
                    <StyledTableHead>
                      {"Bovinos Machos com < 6 Mes"}
                    </StyledTableHead>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_prot_bruta}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_gordura}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_organoleticos}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_nutri}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_ambientais}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_melhor}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_estabiliz}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_o_zoot}
                    </StyledTableCell>
                  
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>
                      {"Bovinos Fêmeas com < 6 Mes"}
                    </StyledTableHead>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_prot_bruta}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_gordura}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_organoleticos}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_nutri}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_ambientais}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_melhor}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_estabiliz}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_o_zoot}
                    </StyledTableCell>
                   
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>
                      {"Bovinos Machos de 6 meses a < 1 ano"}
                    </StyledTableHead>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_prot_bruta}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_gordura}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_organoleticos}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_nutri}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_ambientais}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_melhor}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_estabiliz}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_6meses_a_1ano_o_zoot}
                    </StyledTableCell>
                   
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>
                      {"Bovinos Fêmeas de 6 meses a < 1 ano"}
                    </StyledTableHead>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_prot_bruta}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_gordura}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_organoleticos}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_nutri}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_ambientais}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_melhor}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_estabiliz}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_6meses_a_1ano_o_zoot}
                    </StyledTableCell>
                   
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>
                      {"Bovinos Machos de 1 ano a < 2 anos"}
                    </StyledTableHead>
                    <StyledTableCell>
                      {efetivo.b_macho_mais1ano_menos2_prot_bruta}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais1ano_menos2_gordura}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais1ano_menos2_organoleticos}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais1ano_menos2_nutri}
                    </StyledTableCell>
                    <StyledTableCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais1ano_menos2_melhor}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais1ano_menos2_estabiliz}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais1ano_menos2_o_zoot}
                    </StyledTableCell>
                                     
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>
                      {"Bovinos Fêmeas de 1 ano a < 2 anos"}
                    </StyledTableHead>
                    <StyledTableCell>
                      {efetivo.b_femea_mais1ano_menos2_prot_bruta}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais1ano_menos2_gordura}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais1ano_menos2_organoleticos}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais1ano_menos2_nutri}
                    </StyledTableCell>
                    <StyledTableCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais1ano_menos2_melhor}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais1ano_menos2_estabiliz}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais1ano_menos2_o_zoot}
                    </StyledTableCell>
                   
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>
                      {"Bovinos Machos com ≥ 2 anos"}
                    </StyledTableHead>
                    <StyledTableCell>
                      {efetivo.b_macho_mais_2anos_prot_bruta}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais_2anos_gordura}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais_2anos_organoleticos}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais_2anos_nutri}
                    </StyledTableCell>
                    <StyledTableCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais_2anos_melhor}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais_2anos_estabiliz}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_macho_mais_2anos_o_zoot}
                    </StyledTableCell>
                   
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>
                      {"Bovinos Fêmeas com ≥ 2 anos"}
                    </StyledTableHead>
                    <StyledTableCell>
                      {efetivo.b_femea_mais_2anos_prot_bruta}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais_2anos_gordura}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais_2anos_organoleticos}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais_2anos_nutri}
                    </StyledTableCell>
                    <StyledTableCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais_2anos_melhor}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais_2anos_estabiliz}
                    </StyledTableCell>
                    <StyledTableCell>
                      {efetivo.b_femea_mais_2anos_o_zoot}
                    </StyledTableCell>
                   
                  </TableRow>
                  <TableRow>
                  <StyledTableHead>
                    {"TOTAL (Bovinos < 6 meses)"}{" "}
                  </StyledTableHead>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell rowSpan={2}></StyledTableCell>
                  <StyledTableCell rowSpan={2}></StyledTableCell>
                  <StyledTableCell rowSpan={2}></StyledTableCell>
                  <StyledTableCell rowSpan={2}></StyledTableCell>
                  <StyledTableCell rowSpan={2}></StyledTableCell>
                  <StyledTableCell rowSpan={2}></StyledTableCell>
                  <StyledTableCell rowSpan={2}></StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableHead>
                    {"TOTAL (Bovinos ≥ 6 meses)"}{" "}
                  </StyledTableHead>
                  <StyledTableCell></StyledTableCell>
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
