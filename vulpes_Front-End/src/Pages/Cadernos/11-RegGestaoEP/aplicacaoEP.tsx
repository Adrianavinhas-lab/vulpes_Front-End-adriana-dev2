import React, { ChangeEvent, useState } from "react";

import { Box, Paper, Stack, TextField } from "@mui/material";
import { TableFooter, TablePagination } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { TableContainer } from "@mui/material";
import TablePaginationActions from "../../../Components/Pagination/pagination";
import {
  StyledTableHead,
  StyledTableCell,
} from "../../../Styles/tabelCellStyled/customTableCell";
import { IAplicacaoEP } from "../../../Interfaces/cadernos/caderno11";
import {
  CustomTextField,
  CustomThemeProvider,
} from "../../../Styles/theme/customThemeprovider";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";

interface IAplicacaoEPProps {
  aplicEP: IAplicacaoEP;
  aplicacoes: IAplicacaoEP[];
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
  error: boolean;
  messageTextField: string;
}

export const AplicacaoEPForm: React.FC<IAplicacaoEPProps> = ({
  aplicEP,
  aplicacoes,
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
  error,
  messageTextField,
}) => {
  const [showNewRow, setShowNewRow] = useState(false);

  const handleEdit = (id: number | null) => {
    setEditingId(id);
    setEditRow(true);
  };

  /*****************  PAGINAÇÃO ********************** */
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - aplicacoes.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
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
            <TableRow>
              <TableCell
                colSpan={7}
                sx={{
                  fontWeight: 600,
                  textAlign: "left",
                  fontFamily: "candara",
                }}
              >
                3 - Aplicação de efluentes pecuários.
              </TableCell>

              <TableCell colSpan={2}>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <BarraDeFerramentas
                    mostrarBotaoNovo
                    textoBotaoNovo="Novo Registo"
                    aoClicarNovo={() => setShowNewRow(true)}
                  />
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableHead rowSpan={2}>
                Identificação da Parcela (N.º Parcelário)
              </StyledTableHead>
              <StyledTableHead rowSpan={2}>Cultura </StyledTableHead>
              <StyledTableHead colSpan={2}>
                Áreas de aplicação dos efluentes (ha)
              </StyledTableHead>
              <StyledTableHead colSpan={4}>
                Aplicação de efluentes
              </StyledTableHead>
              <StyledTableHead rowSpan={2}>Ações</StyledTableHead>
            </TableRow>
            <TableRow>
              <StyledTableHead>Própria exploração</StyledTableHead>
              <StyledTableHead>Contratualizada</StyledTableHead>
              <StyledTableHead>Tipo</StyledTableHead>
              <StyledTableHead>EOrigem</StyledTableHead>
              <StyledTableHead>Data da Aplicação (dd/mm/aaaa)</StyledTableHead>
              <StyledTableHead>Quantidade (m3 ou t)</StyledTableHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {showNewRow && (
              <>
                <StyledTableCell>
                  <CustomTextField
                    name="n_parcelario"
                    value={aplicEP.n_parcelario}
                    onChange={onInputChange}
                    error={error}
                    helperText={error ? messageTextField : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="cultura"
                    value={aplicEP.cultura}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="propria"
                    value={aplicEP.propria}
                    onChange={onInputChange}
                    error={error}
                    helperText={error ? messageTextField : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="contratualizada"
                    value={aplicEP.contratualizada}
                    onChange={onInputChange}
                    error={error}
                    helperText={error ? messageTextField : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="tipo"
                    value={aplicEP.tipo}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="origem"
                    value={aplicEP.origem}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    variant="filled"
                    type="date"
                    inputProps={{
                      style: { fontSize: 12, fontFamily: "verdana" },
                    }}
                    name="data"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={aplicEP.data}
                    onChange={
                      onInputChange as (
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => void
                    }
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="quant"
                    value={aplicEP.quant}
                    onChange={onInputChange}
                    error={error}
                    helperText={error ? messageTextField : ""}
                  />
                </StyledTableCell>

                <StyledTableCell>
                  <Stack direction="row" justifyContent="center">
                    <ButtonCadernos
                      mostrarBotaoCancelar
                      aoClicarCancelar={() => setShowNewRow(false)}
                      mostrarBotaoGravar
                      aoClicarGravar={() => onSaveTabela(updateCreateTable)}
                    />
                  </Stack>
                </StyledTableCell>
              </>
            )}

            {(rowsPerPage > 0
              ? aplicacoes.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : aplicacoes
            ).map((row) => (
              <React.Fragment>
                <TableRow key={row.id_fluentes_tres}>
                  {editingId === row.id_fluentes_tres && editRow ? (
                    <>
                      <StyledTableCell>
                        <CustomTextField
                          name="n_parcelario"
                          value={row.n_parcelario}
                          error={error}
                          helperText={error ? messageTextField : ""}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="cultura"
                          value={row.cultura}
                          onChange={onEditTableChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="propria"
                          value={row.propria}
                          onChange={onEditTableChange}
                          error={error}
                          helperText={error ? messageTextField : ""}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="contratualizada"
                          value={row.contratualizada}
                          onChange={onEditTableChange}
                          error={error}
                          helperText={error ? messageTextField : ""}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="tipo"
                          value={row.tipo}
                          onChange={onEditTableChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="origem"
                          value={row.origem}
                          onChange={onEditTableChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="filled"
                          type="date"
                          inputProps={{
                            style: { fontSize: 12, fontFamily: "verdana" },
                          }}
                          name="data"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={aplicEP.data}
                          onChange={
                            onEditTableChange as (
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => void
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="quant"
                          value={row.quant}
                          onChange={onEditTableChange}
                          error={error}
                          helperText={error ? messageTextField : ""}
                        />
                      </StyledTableCell>
                    </>
                  ) : (
                    <>
                      <StyledTableCell>{row.n_parcelario} </StyledTableCell>
                      <StyledTableCell>{row.cultura} </StyledTableCell>
                      <StyledTableCell>{row.propria}</StyledTableCell>
                      <StyledTableCell>{row.contratualizada} </StyledTableCell>
                      <StyledTableCell>{row.tipo} </StyledTableCell>
                      <StyledTableCell>{row.origem}</StyledTableCell>
                      <StyledTableCell>{row.data}</StyledTableCell>
                      <StyledTableCell>{row.quant}</StyledTableCell>
                    </>
                  )}
                  {editingId === row.id_fluentes_tres && editRow ? (
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
                        aoClicarEditar={() => handleEdit(row.id_fluentes_tres)}
                        mostrarBotaoApagar
                        aoClicarApagar={() => onDelete(row.id_fluentes_tres)}
                      />
                    </StyledTableCell>
                  )}
                </TableRow>
              </React.Fragment>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={12} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow sx={{ width: "100%" }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={14}
                count={aplicacoes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelDisplayedRows={({ from, to, count }) => {
                  return `${from}–${to} de ${count !== -1 ? count : `mais do que ${to}`}`;
                }}
                labelRowsPerPage={'Linhas por página'}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </table>
      </TableContainer>
    </CustomThemeProvider>
  );
};
