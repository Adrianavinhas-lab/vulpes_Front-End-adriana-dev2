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

export interface IEfetivoPecuarioGH2 {
    id_efetivo_pecuarioGH2: number;
  
    b_macho_menos_6meses_cn: string;
    b_femea_menos_6meses_cn: string;
    b_macho_6meses_a_1ano_cn: string;
    b_femea_6meses_a_1ano_cn: string;
    b_macho_mais1ano_menos2_cn: string;
    b_femea_mais1ano_menos2_cn: string;
    b_macho_mais_2anos_cn: string;
    b_femea_mais_2anos_cn: string;
  
    b_macho_menos_6meses_dieta: string;
    b_femea_menos_6meses_dieta: string;
    b_macho_6meses_a_1ano_dieta: string;
    b_femea_6meses_a_1ano_dieta: string;
    b_macho_mais1ano_menos2_dieta: string;
    b_femea_mais1ano_menos2_dieta: string;
    b_macho_mais_2anos_dieta: string;
    b_femea_mais_2anos_dieta: string;
  
    total_cn: string;
  
    id_rosto: 0;
    last_update: string;
    create_date: string;
    uuid: string;
  }

interface IPecuarioProps {
    tabela: IEfetivoPecuarioGH2;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const EfetivoPecuarioEFGH2: React.FC<IPecuarioProps> = ({
    tabela,
  onInputChange,
}) => {
  const idrosto = parseInt(localStorage.getItem("idrosto") || "0", 10);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [, setEditedFields] = useState<
    Partial<Record<number, Partial<IEfetivoPecuarioGH2>>>
  >({});
  const [id] = useState(0);


  /************* TABELA EFETIVO PECUARIO ***********************************/
    // const [rowsEfetivo, setRowsEfetivo] =useState<IEfetivoPecuario[]>([]);
  const [efetivo, setEfetivo] = useState<IEfetivoPecuarioGH2>({
    id_efetivo_pecuarioGH2: 0,

    b_macho_menos_6meses_cn: "",
    b_femea_menos_6meses_cn: "",
    b_macho_6meses_a_1ano_cn: "",
    b_femea_6meses_a_1ano_cn: "",
    b_macho_mais1ano_menos2_cn: "",
    b_femea_mais1ano_menos2_cn: "",
    b_macho_mais_2anos_cn: "",
    b_femea_mais_2anos_cn: "",

    b_macho_menos_6meses_dieta: "",
    b_femea_menos_6meses_dieta: "",
    b_macho_6meses_a_1ano_dieta: "",
    b_femea_6meses_a_1ano_dieta: "",
    b_macho_mais1ano_menos2_dieta: "",
    b_femea_mais1ano_menos2_dieta: "",
    b_macho_mais_2anos_dieta: "",
    b_femea_mais_2anos_dieta: "",

    total_cn: "",

    id_rosto: 0,
    last_update: "",
    create_date: "",
    uuid: "",
  });

  const handleNewRowsChange = (field: keyof IEfetivoPecuarioGH2, value: string | number) => {
    setEfetivo((prevNewRows) => ({
      ...prevNewRows,
      [field]: value,
    }));
  };


  async function getTabelaCalendarioRega(): Promise<IEfetivoPecuarioGH2> {
    try {
      const response = await get(`/get_reg_/${idrosto}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao obter cabeçalho por ID");
    }
  }

  useEffect(() => {
    getTabelaCalendarioRega();
  }, []);

  /********* CREATE *******************/
  async function criarTabela(tabela: IEfetivoPecuarioGH2): Promise<IEfetivoPecuarioGH2> {
    try {
      const response = await post(
        "/new_reg_actividades_cabecalho",
        tabela
      );
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
        <TableContainer
        >
             <table>
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={4}
                    sx={{
                      fontWeight: 700,
                      fontSize: 20,
                      fontFamily: "candara",
                    }}
                  >
                    Plano de Alimentação - Grupo Homogéneo 2
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={9}
                    sx={{
                      fontWeight: 700,
                      fontSize: 16,
                      fontFamily: "candara",
                    }}
                  >
                    1. Efetivo Pecuário
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
                  <StyledTableHead sx={{ fontWeight: 700 }}>
                    Efetivo Pecuário
                  </StyledTableHead>
                  <StyledTableHead>CN (nº)</StyledTableHead>
                  <StyledTableHead>Nº dias de dieta</StyledTableHead>
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
                          value={efetivo.b_macho_menos_6meses_cn}
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
                          value={efetivo.b_macho_menos_6meses_dieta}
                          name="b_macho_menos_6meses_dieta"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_menos_6meses_dieta",
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
                          value={efetivo.b_femea_menos_6meses_cn}
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
                          value={efetivo.b_femea_menos_6meses_dieta}
                          name="b_femea_menos_6meses_dieta"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_menos_6meses_dieta",
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
                          value={efetivo.b_macho_6meses_a_1ano_cn}
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
                        {" "}
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={efetivo.b_macho_6meses_a_1ano_dieta}
                          name="b_macho_6meses_a_1ano_dieta"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_6meses_a_1ano_dieta",
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
                          value={efetivo.b_femea_6meses_a_1ano_cn}
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
                          value={efetivo.b_femea_6meses_a_1ano_dieta}
                          name="b_femea_6meses_a_1ano_dieta"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_6meses_a_1ano_dieta",
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
                          value={efetivo.b_macho_mais1ano_menos2_cn}
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
                          value={efetivo.b_macho_mais1ano_menos2_dieta}
                          name="b_macho_mais1ano_menos2_dieta"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_mais1ano_menos2_dieta",
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
                          value={efetivo.b_femea_mais1ano_menos2_cn}
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
                          value={efetivo.b_femea_mais1ano_menos2_dieta}
                          name="b_femea_mais1ano_menos2_dieta"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_mais1ano_menos2_dieta",
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
                          value={efetivo.b_macho_mais_2anos_cn}
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
                          value={efetivo.b_macho_mais_2anos_dieta}
                          name="b_macho_mais_2anos_dieta"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_macho_mais_2anos_dieta",
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
                          value={efetivo.b_femea_mais_2anos_cn}
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
                          value={efetivo.b_femea_mais_2anos_dieta}
                          name="b_femea_mais_2anos_dieta"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "b_femea_mais_2anos_dieta",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                    </TableRow>

                    <TableRow>
                      <StyledTableHead>TOTAL</StyledTableHead>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={efetivo.total_cn}
                          name="total_cn"
                          onChange={(e) =>
                            handleNewRowsChange("total_cn", e.target.value)
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
                      <StyledTableCell>{efetivo.b_macho_6meses_a_1ano_cn} </StyledTableCell>
                      <StyledTableCell>{efetivo.b_macho_6meses_a_1ano_dieta} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Fêmeas com < 6 Mes"}
                      </StyledTableHead>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Machos de 6 meses a < 1 ano"}
                      </StyledTableHead>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Fêmeas de 6 meses a < 1 ano"}
                      </StyledTableHead>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Machos de 1 ano a < 2 anos"}
                      </StyledTableHead>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Fêmeas de 1 ano a < 2 anos"}
                      </StyledTableHead>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Machos com ≥ 2 anos"}
                      </StyledTableHead>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead>
                        {"Bovinos Fêmeas com ≥ 2 anos"}
                      </StyledTableHead>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>

                    <TableRow>
                      <StyledTableHead>TOTAL</StyledTableHead>
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
