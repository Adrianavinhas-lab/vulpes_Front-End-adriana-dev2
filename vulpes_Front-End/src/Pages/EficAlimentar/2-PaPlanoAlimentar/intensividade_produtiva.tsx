import React, { ChangeEvent, useState } from "react";

import { Box, Paper } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { IEFIntensividade } from "./interfacePA";
import {
  StyledTableCell,
  StyledTableHead,
} from "../../../Styles/tabelCellStyled/customTableCell";
import {
  CustomTextField,
  CustomThemeProvider,
} from "../../../Styles/theme/customThemeprovider";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";

interface IProducaoProps {
  tabela: IEFIntensividade;
  rows: IEFIntensividade[];
  updateCreateTable: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveTabela: (callback: () => void) => void;
  onSaveEdit: (callback: () => void) => void;
  onEditTableChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  setEditRow: React.Dispatch<React.SetStateAction<boolean>>;
  editingId: number | null;
  editRow: boolean;
  onDelete: (id: number) => void;
}

export const IntensividadeProdutiva: React.FC<IProducaoProps> = ({
  tabela,
  rows,
  onInputChange,
  updateCreateTable,
  onSaveTabela,
  onSaveEdit,
  onEditTableChange,
  setEditingId,
  setEditRow,
  editingId,
  editRow,
  onDelete,
}) => {
  const [createTable, setCreateTable] = useState(false);

  /********** EDITAR LINHA *************/
  const handleEdit = (id: number | null) => {
    setEditingId(id);
    setEditRow(true);
  };

  return (
    <>
      <form>
        <CustomThemeProvider>
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{
              height: "auto",
              width: "auto",
              margin: 2,
              padding: 2,
            }}
          >
            <table style={{ width: "100%" }}>
              <TableHead>
                {rows.length <= 0 && createTable === false && (
                  <>
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        sx={{
                          fontWeight: 600,
                          fontSize: 14,
                          fontFamily: "candara",
                        }}
                      >
                        2.2 Intensidade Produtiva (CN/ ha de superficie
                        forrageira)
                      </TableCell>
                      <StyledTableCell></StyledTableCell>

                      <TableCell>
                        <Box sx={{ display: "flex", justifyContent: "end" }}>
                          <BarraDeFerramentas
                            mostrarBotaoNovo
                            textoBotaoNovo="Registar"
                            aoClicarNovo={() => setCreateTable(true)}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ display: "flex", justifyContent: "right" }}
                      >
                        CN
                      </TableCell>
                      <StyledTableHead></StyledTableHead>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ display: "flex", justifyContent: "right" }}
                      >
                        Superficie forrageira
                      </TableCell>
                      <StyledTableHead></StyledTableHead>
                    </TableRow>
                  </>
                )}
              </TableHead>

              <TableBody>
                {createTable && (
                  <>
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        sx={{
                          fontWeight: 600,
                          fontSize: 14,
                          fontFamily: "candara",
                        }}
                      >
                        2.2 Intensidade Produtiva (CN/ ha de superficie
                        forrageira)
                      </TableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="cn_ha"
                          value={tabela.cn_ha}
                          onChange={onInputChange}
                        />
                      </StyledTableCell>

                      <TableCell>
                        <ButtonCadernos
                          mostrarBotaoCancelar
                          aoClicarCancelar={() => setCreateTable(false)}
                          mostrarBotaoGravar
                          aoClicarGravar={() => onSaveTabela(updateCreateTable)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ display: "flex", justifyContent: "right" }}
                      >
                        CN
                      </TableCell>
                      <StyledTableHead>
                        <CustomTextField
                          name="cn"
                          value={tabela.cn}
                          onChange={onInputChange}
                        />
                      </StyledTableHead>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ display: "flex", justifyContent: "right" }}
                      >
                        Superficie forrageira
                      </TableCell>
                      <StyledTableHead>
                        <CustomTextField
                          name="superfici"
                          value={tabela.superfici}
                          onChange={onInputChange}
                        />
                      </StyledTableHead>
                    </TableRow>
                  </>
                )}

                {rows.map((row) => (
                  <>
                    {editingId === row.id_intensidade && editRow ? (
                      <>
                        <TableRow>
                          <TableCell
                            colSpan={2}
                            sx={{
                              fontWeight: 600,
                              fontSize: 14,
                              fontFamily: "candara",
                            }}
                          >
                            2.2 Intensidade Produtiva (CN/ ha de superficie
                            forrageira)
                          </TableCell>
                          <StyledTableCell>
                            <CustomTextField
                              name="cn_ha"
                              value={tabela.cn_ha}
                              onChange={onEditTableChange}
                            />
                          </StyledTableCell>

                          <TableCell>
                            <ButtonCadernos
                              mostrarBotaoGravar
                              aoClicarGravar={() =>
                                onSaveEdit(updateCreateTable)
                              }
                              mostrarBotaoCancelar
                              aoClicarCancelar={() => setEditingId(null)}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{ display: "flex", justifyContent: "right" }}
                          >
                            CN
                          </TableCell>
                          <StyledTableHead>
                            <CustomTextField
                              name="cn"
                              value={tabela.cn}
                              onChange={onEditTableChange}
                            />
                          </StyledTableHead>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{ display: "flex", justifyContent: "right" }}
                          >
                            Superficie forrageira
                          </TableCell>
                          <StyledTableHead>
                            <CustomTextField
                              name="superfici"
                              value={tabela.superfici}
                              onChange={onEditTableChange}
                            />
                          </StyledTableHead>
                        </TableRow>
                      </>
                    ) : (
                      <>
                        <TableRow>
                          <TableCell
                            colSpan={2}
                            sx={{
                              fontWeight: 600,
                              fontSize: 14,
                              fontFamily: "candara",
                            }}
                          >
                            2.2 Intensidade Produtiva (CN/ ha de superficie
                            forrageira)
                          </TableCell>
                          <StyledTableCell>
                            <CustomTextField
                              name="cn_ha"
                              value={tabela.cn_ha}
                              onChange={onEditTableChange}
                            />
                          </StyledTableCell>

                          <TableCell>
                            <ButtonCadernos
                              mostrarBotaoEditar
                              aoClicarEditar={() =>
                                handleEdit(row.id_intensidade)
                              }
                              mostrarBotaoApagar
                              aoClicarApagar={() =>
                                onDelete(row.id_intensidade)
                              }
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{ display: "flex", justifyContent: "right" }}
                          >
                            CN
                          </TableCell>
                          <StyledTableHead>
                            <CustomTextField
                              name="cn"
                              value={tabela.cn}
                              onChange={onEditTableChange}
                            />
                          </StyledTableHead>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{ display: "flex", justifyContent: "right" }}
                          >
                            Superficie forrageira
                          </TableCell>
                          <StyledTableHead>
                            <CustomTextField
                              name="superfici"
                              value={tabela.superfici}
                              onChange={onEditTableChange}
                            />
                          </StyledTableHead>
                        </TableRow>
                      </>
                    )}
                  </>
                ))}
              </TableBody>
            </table>
          </TableContainer>
        </CustomThemeProvider>
      </form>
    </>
  );
};
