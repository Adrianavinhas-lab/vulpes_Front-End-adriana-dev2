import React, { ChangeEvent, useState } from "react";

import { Box, Paper } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { IEFProducaoForrageira } from "./interfacePA";
import {
  StyledTableCell,
  StyledTableHead,
} from "../../../Styles/tabelCellStyled/customTableCell";
import { CustomTextField } from "../../../Styles/theme/customThemeprovider";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";

interface IProducaoProps {
  tabela: IEFProducaoForrageira;
  rows: IEFProducaoForrageira[];
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

export const ProducaoForrageira: React.FC<IProducaoProps> = ({
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

  // /***************** SOMA ha *******************************************/
  const somaCampoHA =
    tabela.ha_culturas !== null ||
    tabela.ha_outras !== null ||
    tabela.ha_pastagem !== null ||
    tabela.ha_regadio !== null ||
    tabela.ha_sequeiro !== null ||
    tabela.ha_silagem !== null
      ? Number(tabela.ha_culturas) +
        Number(tabela.ha_outras) +
        Number(tabela.ha_pastagem) +
        Number(tabela.ha_regadio) +
        Number(tabela.ha_sequeiro) +
        Number(tabela.ha_silagem)
      : 0;
  const ResulatdoSomaCampoHA = isFinite(Number(somaCampoHA))
    ? Number(somaCampoHA)
    : 0;

  // /***************** SOMA Ton *******************************************/
  const somaCampoTon =
    tabela.ma_culturas !== null ||
    tabela.ma_outras !== null ||
    tabela.ma_pastagem !== null ||
    tabela.ma_regadio !== null ||
    tabela.ma_sequeiro !== null ||
    tabela.ma_silagem !== null
      ? Number(tabela.ma_culturas) +
        Number(tabela.ma_outras) +
        Number(tabela.ma_pastagem) +
        Number(tabela.ma_regadio) +
        Number(tabela.ma_sequeiro) +
        Number(tabela.ma_silagem)
      : 0;
  const ResulatdoSomaCampoTon = isFinite(Number(somaCampoTon))
    ? Number(somaCampoTon)
    : 0;

  return (
    <>
      <form>
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
              <TableRow>
                <TableCell
                  colSpan={11}
                  sx={{
                    fontWeight: 600,
                    textAlign: "left",
                    fontFamily: "candara",
                    fontSize: 16,
                  }}
                >
                  2 - Plano de Alimentação de Bovinos
                </TableCell>
              </TableRow>
              <TableRow>
                {rows.length <= 0 && (
                  <TableCell
                    colSpan={2}
                    sx={{
                      fontWeight: 600,
                      fontSize: 14,
                      fontFamily: "candara",
                    }}
                  >
                    2.1. Produção Forrageira (preenchimento facultativo - quando
                    exista Plano Forrageiro da Exploração)
                  </TableCell>
                )}
              </TableRow>
              <TableRow>
                <StyledTableHead>Tipo de alimento grosseiro</StyledTableHead>
                <StyledTableHead>ha</StyledTableHead>
                <StyledTableHead>Matéria Seca (ton)</StyledTableHead>
                {rows.length <= 0 && createTable === false ? (
                  <TableCell>
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                      <BarraDeFerramentas
                        mostrarBotaoNovo
                        textoBotaoNovo="Registar"
                        aoClicarNovo={() => setCreateTable(true)}
                      />
                    </Box>
                  </TableCell>
                ) : (
                  createTable && (
                    <TableCell>
                      <ButtonCadernos
                        mostrarBotaoCancelar
                        aoClicarCancelar={() => setCreateTable(false)}
                        mostrarBotaoGravar
                        aoClicarGravar={() => onSaveTabela(updateCreateTable)}
                      />
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {createTable && (
                <>
                  <TableRow>
                    <StyledTableHead>Culturas forrageiras</StyledTableHead>
                    <StyledTableCell>
                      <CustomTextField
                        name="ha_culturas"
                        value={tabela.ha_culturas}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="ma_culturas"
                        value={tabela.ma_culturas}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead> Silagem</StyledTableHead>
                    <StyledTableCell>
                      <CustomTextField
                        name="ha_silagem"
                        value={tabela.ha_silagem}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="ma_silagem"
                        value={tabela.ma_silagem}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead> Outras forragens</StyledTableHead>
                    <StyledTableCell>
                      <CustomTextField
                        name="ha_outras"
                        value={tabela.ha_outras}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="ma_outras"
                        value={tabela.ma_outras}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>Pastagem</StyledTableHead>
                    <StyledTableCell>
                      <CustomTextField
                        name="ha_pastagem"
                        value={tabela.ha_pastagem}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="ma_pastagem"
                        value={tabela.ma_pastagem}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>Regadio</StyledTableHead>
                    <StyledTableCell>
                      <CustomTextField
                        name="ha_regadio"
                        value={tabela.ha_regadio}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="ma_regadio"
                        value={tabela.ma_regadio}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>Sequeiro</StyledTableHead>
                    <StyledTableCell>
                      <CustomTextField
                        name="ha_sequeiro"
                        value={tabela.ha_sequeiro}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="ma_sequeiro"
                        value={tabela.ma_sequeiro}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>

                  <TableRow>
                    <StyledTableHead>TOTAL</StyledTableHead>
                    <StyledTableCell>
                      <CustomTextField
                        name=""
                        value={ResulatdoSomaCampoHA}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name=""
                        value={ResulatdoSomaCampoTon}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                </>
              )}

              {rows.map((row) => (
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
                      2.1. Produção Forrageira (preenchimento facultativo -
                      quando exista Plano Forrageiro da Exploração)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead>
                      Tipo de alimento grosseiro
                    </StyledTableHead>
                    <StyledTableHead>ha</StyledTableHead>
                    <StyledTableHead>Matéria Seca (ton)</StyledTableHead>
                    {editRow ? (
                      <StyledTableCell>
                        <ButtonCadernos
                          mostrarBotaoGravar
                          aoClicarGravar={() => onSaveEdit(updateCreateTable)}
                          mostrarBotaoCancelar
                          aoClicarCancelar={() => setEditingId(null)}
                        />
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell>
                        <ButtonCadernos
                          mostrarBotaoEditar
                          aoClicarEditar={() => handleEdit(row.id_producao)}
                          mostrarBotaoApagar
                          aoClicarApagar={() => onDelete(row.id_producao)}
                        />
                      </StyledTableCell>
                    )}
                  </TableRow>
                  {editingId === row.id_producao && editRow ? (
                    <>
                      <TableRow>
                        <StyledTableHead>Culturas forrageiras</StyledTableHead>
                        <StyledTableCell>
                          <CustomTextField
                            name="ha_culturas"
                            value={row.ha_culturas}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="ma_culturas"
                            value={row.ma_culturas}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead> Silagem</StyledTableHead>
                        <StyledTableCell>
                          <CustomTextField
                            name="ha_silagem"
                            value={row.ha_silagem}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="ma_silagem"
                            value={row.ma_silagem}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead> Outras forragens</StyledTableHead>
                        <StyledTableCell>
                          <CustomTextField
                            name="ha_outras"
                            value={row.ha_outras}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="ma_outras"
                            value={row.ma_outras}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead>Pastagem</StyledTableHead>
                        <StyledTableCell>
                          <CustomTextField
                            name="ha_pastagem"
                            value={row.ha_pastagem}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="ma_pastagem"
                            value={row.ma_pastagem}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead>Regadio</StyledTableHead>
                        <StyledTableCell>
                          <CustomTextField
                            name="ha_regadio"
                            value={row.ha_regadio}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="ma_regadio"
                            value={row.ma_regadio}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead>Sequeiro</StyledTableHead>
                        <StyledTableCell>
                          <CustomTextField
                            name="ha_sequeiro"
                            value={row.ha_sequeiro}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="ma_sequeiro"
                            value={row.ma_sequeiro}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                      </TableRow>

                      <TableRow>
                        <StyledTableHead>TOTAL</StyledTableHead>
                        <StyledTableCell>
                          <CustomTextField
                            name=""
                            value={ResulatdoSomaCampoHA}
                            // onChange={onInputChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name=""
                            value={ResulatdoSomaCampoTon}
                            // onChange={onInputChange}
                          />
                        </StyledTableCell>
                      </TableRow>
                    </>
                  ) : (
                    <>
                      <TableRow>
                        <StyledTableHead>Culturas forrageiras</StyledTableHead>
                        <StyledTableCell>{row.ha_culturas}</StyledTableCell>
                        <StyledTableCell>{row.ma_culturas}</StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead> Silagem</StyledTableHead>
                        <StyledTableCell>{row.ha_silagem} </StyledTableCell>
                        <StyledTableCell>{row.ha_silagem}</StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead> Outras forragens</StyledTableHead>
                        <StyledTableCell>{row.ha_outras}</StyledTableCell>
                        <StyledTableCell>{row.ma_outras}</StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead>Pastagem</StyledTableHead>
                        <StyledTableCell>{row.ha_pastagem} </StyledTableCell>
                        <StyledTableCell>{row.ma_pastagem}</StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead>Regadio</StyledTableHead>
                        <StyledTableCell>{row.ha_regadio} </StyledTableCell>
                        <StyledTableCell>{row.ma_regadio}</StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead>Sequeiro</StyledTableHead>
                        <StyledTableCell>{row.ha_sequeiro} </StyledTableCell>
                        <StyledTableCell>{row.ma_sequeiro}</StyledTableCell>
                      </TableRow>

                      <TableRow>
                        <StyledTableHead>TOTAL</StyledTableHead>
                        <StyledTableCell>
                          {ResulatdoSomaCampoHA}
                        </StyledTableCell>
                        <StyledTableCell>
                          {ResulatdoSomaCampoTon}
                        </StyledTableCell>
                      </TableRow>
                    </>
                  )}
                </>
              ))}
            </TableBody>
          </table>
        </TableContainer>
      </form>
    </>
  );
};
