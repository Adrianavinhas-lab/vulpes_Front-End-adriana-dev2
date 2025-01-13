import React, { ChangeEvent, useState } from "react";

import { Box, TableFooter, TablePagination } from "@mui/material";
import { Stack } from "@mui/material";
import { Paper } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { TableContainer } from "@mui/material";
import TablePaginationActions from "../../../Components/Pagination/pagination";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";


import {
  StyledTableHead,
  StyledTableCell,
} from "../../../Styles/tabelCellStyled/customTableCell";
import {
  CustomTextField,
  CustomThemeProvider,
} from "../../../Styles/theme/customThemeprovider";
import BasicPopover from "../../../Components/Popover";
import { IQuantidadeEP } from "../../../Interfaces/cadernos/caderno11";

interface IQuantidadeEPProps {
  quantEP: IQuantidadeEP;
  quantidadesEP: IQuantidadeEP[];
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

export const QuantidadeEPForm: React.FC<IQuantidadeEPProps> = ({
  quantEP,
  quantidadesEP,
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
  const [createTable, setCreateTable] = useState(false);

  /********** EDITAR LINHA *************/
  const handleEdit = (id: number) => {
    setEditingId(id);
    setEditRow(true);
  };



  /*********************** SOMAS / TOTAIS ****************/
  const somaCampo1 = quantidadesEP.reduce((acc, row) => acc + Number(row.ex_chorume), 0);
  const somaCampo2 = quantidadesEP.reduce((acc, row) => acc + Number(row.ex_estrume), 0);
  const somaCampo3 = quantidadesEP.reduce((acc, row) => acc + Number(row.exter_chorume), 0);
  const somaCampo4 = quantidadesEP.reduce((acc, row) => acc + Number(row.exter_estrume), 0);
  const somaCampo5 = quantidadesEP.reduce((acc, row) => acc + Number(row.vendido_chorume), 0);
  const somaCampo6 = quantidadesEP.reduce((acc, row) => acc + Number(row.vendido_estrume), 0);
  const somaCampo7 = quantidadesEP.reduce((acc, row) => acc + Number(row.quant_chorume), 0);
  const somaCampo8 = quantidadesEP.reduce((acc, row) => acc + Number(row.quant_estrume), 0);

  /*****************  PAGINAÇÃO ********************** */
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - quantidadesEP.length) : 0;

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
                colSpan={9}
                sx={{
                  fontWeight: 600,
                  textAlign: "left",
                  fontFamily: "candara",
                  fontSize: 16,
                }}
              >
                2 - Quantidade de efluentes pecuários produzidos na exploração
                agrícola, adquiridos externamente e vendidos/cedidos a
                terceiros.
              </TableCell>

              <TableCell colSpan={3}>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <BarraDeFerramentas
                    mostrarBotaoNovo
                    textoBotaoNovo="Novo Registo"
                    aoClicarNovo={() => setCreateTable(true)}
                  />
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableHead rowSpan={3}>Categoria animal</StyledTableHead>
              <StyledTableHead rowSpan={3}>Espécie animal </StyledTableHead>
              <StyledTableHead rowSpan={3}>N.º de animais</StyledTableHead>
              <StyledTableHead colSpan={6}>
                Quantidade de efluentes pecuários{" "}
              </StyledTableHead>
              <StyledTableHead rowSpan={2} colSpan={2}>
                Quantidade de N
              </StyledTableHead>
              <StyledTableHead rowSpan={3}>Ações</StyledTableHead>
            </TableRow>
            <TableRow>
              <StyledTableHead colSpan={2}>Exploração</StyledTableHead>
              <StyledTableHead colSpan={2}>
                <Stack direction="row" justifyContent="center">
                  Externa
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={
                        "  Na gestão de efluentes pecuários, devem ser registadas na origem as informações e os documentos relativos à venda/cedência\n a terceiros e relativos a efluentes adquiridos externamente à exploração agrícola, de onde conste:\ni) A dat em que os efluentes pecuários foram retirados da instalação de origem ou recebidos na instalação de destino;\nii) A composição do produto, a sua caracterização físico-química e a identificação da espécie animal que o produziu;\niii) A quantidade das matérias transportadas (em peso ou volume);\niv) A identificação e o endereço do transportador, bem como a identificação do veículo de transporte;\nv) A identificação e o endereço do destino ou da origem, bem como o respetivo número de registo da exploração.\nOs registos referidos nas sub-alíneas i) a v) do presente anexo devem ser conservados por um período mínimo de cinco anos\n para apresentação às autoridades competentes, quando solicitados."
                      }
                    />
                  </Box>
                </Stack>
              </StyledTableHead>
              <StyledTableHead colSpan={2}>
                <Stack direction="row" justifyContent="center">
                  Vendido/cedido a terceiros
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={
                        "  Na gestão de efluentes pecuários, devem ser registadas na origem as informações e os documentos relativos à venda/cedência\n a terceiros e relativos a efluentes adquiridos externamente à exploração agrícola, de onde conste:\ni) A dat em que os efluentes pecuários foram retirados da instalação de origem ou recebidos na instalação de destino;\nii) A composição do produto, a sua caracterização físico-química e a identificação da espécie animal que o produziu;\niii) A quantidade das matérias transportadas (em peso ou volume);\niv) A identificação e o endereço do transportador, bem como a identificação do veículo de transporte;\nv) A identificação e o endereço do destino ou da origem, bem como o respetivo número de registo da exploração.\nOs registos referidos nas sub-alíneas i) a v) do presente anexo devem ser conservados por um período mínimo de cinco anos\n para apresentação às autoridades competentes, quando solicitados."
                      }
                    />
                  </Box>
                </Stack>
              </StyledTableHead>
            </TableRow>
            <TableRow>
              <StyledTableHead>Chorume (m3/ano)</StyledTableHead>
              <StyledTableHead>Estrume (t/ano)</StyledTableHead>
              <StyledTableHead>Chorume (m3/ano)</StyledTableHead>
              <StyledTableHead>Estrume (t/ano)</StyledTableHead>
              <StyledTableHead>Chorume (m3/ano)</StyledTableHead>
              <StyledTableHead>Estrume (t/ano)</StyledTableHead>
              <StyledTableHead>Chorume (m3/ano)</StyledTableHead>
              <StyledTableHead>Estrume (t/ano)</StyledTableHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {createTable && (
              <>
                <StyledTableCell>
                  <CustomTextField
                    name="categoria_animal"
                    value={quantEP.categoria_animal}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="especie_animal"
                    value={quantEP.especie_animal}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="n_animais"
                    value={quantEP.n_animais}
                    onChange={onInputChange}
                    error={error}
                    helperText={error ? messageTextField : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="ex_chorume"
                    value={quantEP.ex_chorume}
                    onChange={onInputChange}
                    error={error}
                    helperText={error ? messageTextField : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="ex_estrume"
                    value={quantEP.ex_estrume}
                    onChange={onInputChange}
                    error={error}
                    helperText={error ? messageTextField : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="exter_chorume"
                    value={quantEP.exter_chorume}
                    onChange={onInputChange}
                    error={error}
                    helperText={error ? messageTextField : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="exter_estrume"
                    value={quantEP.exter_estrume}
                    onChange={onInputChange}
                    error={error}
                    helperText={error ? messageTextField : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="vendido_chorume"
                    value={quantEP.vendido_chorume}
                    onChange={onInputChange}
                    error={error}
                    helperText={error ? messageTextField : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="vendido_estrume"
                    value={quantEP.vendido_estrume}
                    onChange={onInputChange}
                    error={error}
                    helperText={error ? messageTextField : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="quant_estrume"
                    value={quantEP.quant_estrume}
                    onChange={onInputChange}
                    error={error}
                    helperText={error ? messageTextField : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="quant_chorume"
                    value={quantEP.quant_chorume}
                    onChange={onInputChange}
                    error={error}
                    helperText={error ? messageTextField : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <Stack direction="row" justifyContent="center">
                    <ButtonCadernos
                      mostrarBotaoCancelar
                      aoClicarCancelar={() => setCreateTable(false)}
                      mostrarBotaoGravar
                      aoClicarGravar={() => onSaveTabela(updateCreateTable)}
                    />
                  </Stack>
                </StyledTableCell>
              </>
            )}

            {(rowsPerPage > 0
              ? quantidadesEP.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : quantidadesEP
            ).map((row) => (
              <React.Fragment>
                <TableRow key={row.id_fluentes_dois}>
                  {editingId === row.id_fluentes_dois && editRow ? (
                    <>
                      <StyledTableCell>
                        <CustomTextField
                          name="categoria_animal"
                          value={row.categoria_animal}
                          onChange={onEditTableChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="especie_animal"
                          value={row.especie_animal}
                          onChange={onEditTableChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="n_animais"
                          value={row.n_animais}
                          onChange={onEditTableChange}
                          error={error}
                          helperText={error ? messageTextField : ""}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="ex_chorume"
                          value={row.ex_chorume}
                          onChange={onEditTableChange}
                          error={error}
                          helperText={error ? messageTextField : ""}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="ex_estrume"
                          value={row.ex_estrume}
                          onChange={onEditTableChange}
                          error={error}
                          helperText={error ? messageTextField : ""}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="exter_chorume"
                          value={row.exter_chorume}
                          onChange={onEditTableChange}
                          error={error}
                          helperText={error ? messageTextField : ""}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="exter_estrume"
                          value={row.exter_estrume}
                          onChange={onEditTableChange}
                          error={error}
                          helperText={error ? messageTextField : ""}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="vendido_chorume"
                          value={row.vendido_chorume}
                          onChange={onEditTableChange}
                          error={error}
                          helperText={error ? messageTextField : ""}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="vendido_estrume"
                          value={row.vendido_estrume}
                          onChange={onEditTableChange}
                          error={error}
                          helperText={error ? messageTextField : ""}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="quant_chorume"
                          value={row.quant_chorume}
                          onChange={onEditTableChange}
                          error={error}
                          helperText={error ? messageTextField : ""}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="quant_estrume"
                          value={row.quant_estrume}
                          onChange={onEditTableChange}
                          error={error}
                          helperText={error ? messageTextField : ""}
                        />
                      </StyledTableCell>
                    </>
                  ) : (
                    <>
                      <StyledTableCell>{row.categoria_animal} </StyledTableCell>
                      <StyledTableCell>{row.especie_animal} </StyledTableCell>
                      <StyledTableCell>{row.n_animais}</StyledTableCell>
                      <StyledTableCell>{row.ex_chorume} </StyledTableCell>
                      <StyledTableCell>{row.ex_estrume} </StyledTableCell>
                      <StyledTableCell>{row.exter_chorume}</StyledTableCell>
                      <StyledTableCell>{row.exter_estrume}</StyledTableCell>
                      <StyledTableCell>{row.vendido_chorume}</StyledTableCell>
                      <StyledTableCell>{row.vendido_estrume}</StyledTableCell>
                      <StyledTableCell>{row.quant_chorume}</StyledTableCell>
                      <StyledTableCell>{row.quant_estrume}</StyledTableCell>
                    </>
                  )}
                  {editingId === row.id_fluentes_dois && editRow ? (
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
                        aoClicarEditar={() => handleEdit(row.id_fluentes_dois)}
                        mostrarBotaoApagar
                        aoClicarApagar={() => onDelete(row.id_fluentes_dois)}
                      />
                    </StyledTableCell>
                  )}
                </TableRow>
              </React.Fragment>
            ))}
            <TableRow>
              <StyledTableCell colSpan={3} sx={{ textAlign: "right" }}>
                {"Totais ->"}
              </StyledTableCell>
              <StyledTableCell>{somaCampo1} </StyledTableCell>
              <StyledTableCell>{somaCampo2} </StyledTableCell>
              <StyledTableCell>{somaCampo3}  </StyledTableCell>
              <StyledTableCell>{somaCampo4}  </StyledTableCell>
              <StyledTableCell>{somaCampo5}  </StyledTableCell>
              <StyledTableCell>{somaCampo6}  </StyledTableCell>
              <StyledTableCell>{somaCampo7}  </StyledTableCell>
              <StyledTableCell>{somaCampo8}  </StyledTableCell>
            </TableRow>
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
                count={quantidadesEP.length}
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
