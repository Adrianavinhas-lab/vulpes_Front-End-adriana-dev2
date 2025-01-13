import React, { ChangeEvent, useState } from "react";

import { Box, TextField } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { TableFooter, TableContainer, TablePagination } from "@mui/material";
import { Paper, Stack } from "@mui/material";

import TablePaginationActions from "../../../Components/Pagination/pagination";
import {
  StyledTableHead,
  StyledTableCell,
} from "../../../Styles/tabelCellStyled/customTableCell";
import { IObservacoes, IProducaoAnimal } from "../../../Interfaces/cadernos/caderno7";
import {
  CustomTextField,
  CustomThemeProvider,
} from "../../../Styles/theme/customThemeprovider";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import BasicPopover from "../../../Components/Popover";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";

export interface IProducaoAnimalProps {
  prodanimal: IProducaoAnimal;
  rows: IProducaoAnimal[];
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

  obsRow: IObservacoes;
  obs: IObservacoes[];
  onInputChangeObs: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveTabelaObs: (callback: () => void) => void;
  onEditTableChangeObs: (event: ChangeEvent<HTMLInputElement>) => void;
  onSaveEditObs: (callback: () => void) => void;
  setEditingIdObs: React.Dispatch<React.SetStateAction<number | null>>;
  editingIdObs: number | null;
  setEditRowObs: React.Dispatch<React.SetStateAction<boolean>>;
  editRowObs: boolean;
  onDeleteObs: (id: number) => void;
}

export const ProducaoAnimalForm: React.FC<IProducaoAnimalProps> = ({
  prodanimal,
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

  obsRow,
  obs,
  onInputChangeObs,
  onSaveTabelaObs,
  onEditTableChangeObs,
  onSaveEditObs,
  setEditingIdObs,
  editingIdObs,
  setEditRowObs,
  editRowObs,
  onDeleteObs
}) => {
  const [showNewRow, setShowNewRow] = useState(false);
  const [showNewRowObs, setShowNewRowObs] = useState(false);

  const handleEdit = (id: number) => {
    setEditingId(id);
    setEditRow(true);
  };

  const handleEditObs = (id: number) => {
    setEditingIdObs(id);
    setEditRowObs(true);
  };

  /*****************  PAGINAÇÃO ********************** */
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
              <TableRow>
                <TableCell colSpan={8}>
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
                <StyledTableHead>Data</StyledTableHead>
                <StyledTableHead>Justificação de Intervenção</StyledTableHead>
                <StyledTableHead>Alteração Nº Animais</StyledTableHead>
                <StyledTableHead>Alimentação Animal</StyledTableHead>
                <StyledTableHead>
                  Operações Gerais e Gestão efluentes
                </StyledTableHead>
                <StyledTableHead>Controlo Sanitário</StyledTableHead>
                <StyledTableHead>Produção Vendas</StyledTableHead>
                <StyledTableHead rowSpan={3}>Ações</StyledTableHead>
              </TableRow>
              <TableRow>
                <StyledTableCell>
                  Data <br /> (Dia ou Periodo)
                </StyledTableCell>
                <StyledTableCell>
                  Facto ocorrido <br /> Diagnóstico
                </StyledTableCell>
                <StyledTableCell>
                  Motivo <br /> (Documento justificativo)
                </StyledTableCell>
                <StyledTableCell>
                  Silagem, Feno-silagem, Forragem,
                  <br /> Alimento composto (composição) <br />
                  Aditivos, Pastagens
                </StyledTableCell>
                <StyledTableCell>
                  <Stack direction="row" justifyContent="center">
                    Tipo intervenção
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Exemplos de operações gerais: cortes de caudas colocação de elásticos (*),\n tosquias, estabulação, arganéis (*), cortes de bicos e de chifres (*),\n manutenção de estruturas; períodos de acesso a\n áreas de movimentação livre."
                        }
                      />
                    </Box>
                  </Stack>
                  Tipo efluente
                </StyledTableCell>
                <StyledTableCell>
                  Método, Medida <br /> Produto / S.ativa
                </StyledTableCell>
                <StyledTableCell>
                  Designação do produto <br /> Tipo de embalagem
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>Animais Alvo</StyledTableCell>
                <StyledTableCell>Quantificação</StyledTableCell>
                <StyledTableCell>
                  Quantificação
                  <Stack direction="row" justifyContent="center">
                    Nº total atual
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Registar os nascimentos e mortes ocorridos num período de tempo pré-definido \n(ex.: quinzenalmente, mensalmente). As vendas são de preenchimento obrigatório \nno dia em que ocorreram. Poderá remeter para o registo do Livro de\n Registo de Existências e Deslocações."
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell>
                  Quantificação
                  <Stack direction="row" justifyContent="center">
                    Parcela/ Zona homogénea
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Registar apenas as alterações ocorridas, isto é, o início de uma determinada \ndieta e os dias em que haja alteração da dieta anteriormente registada. \nSempre que iniciar uma dieta com um alimento composto, indicar\n a proporção dos vários ingredientes."
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell>
                  Material / equipam. <br />
                  Destino <br /> Quantificação
                </StyledTableCell>
                <StyledTableCell>
                  Posologia{" "}
                  <Stack direction="row" justifyContent="center">
                    Quantificação
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Deve remeter para o registo do Livro de Registo de Medicamentos, ou para o Plano de Profilaxia Médica e Sanitária."
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell>
                  Quantificação Lote
                  <br /> nº / Destino
                </StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {showNewRow && (
                <>
                  <TableRow>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        name="data_camp1"
                        type="date"
                        inputProps={{
                          style: {
                            fontSize: 12,
                            fontFamily: "verdana",
                          },
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={prodanimal.data_camp1}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          onInputChange(e)
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="justif_camp1"
                        value={prodanimal.justif_camp1}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="alter_camp1"
                        value={prodanimal.alter_camp1}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="alimenta_camp1"
                        value={prodanimal.alimenta_camp1}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="operacoescamp1"
                        value={prodanimal.operacoescamp1}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="control_camp1"
                        value={prodanimal.control_camp1}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="prod_camp1"
                        value={prodanimal.prod_camp1}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell rowSpan={2}>
                      <Stack direction="row" justifyContent="center">
                        <ButtonCadernos
                          mostrarBotaoCancelar
                          aoClicarCancelar={() => setShowNewRow(false)}
                          mostrarBotaoGravar
                          aoClicarGravar={() => onSaveTabela(updateCreateTable)}
                        />
                      </Stack>
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>
                      <CustomTextField
                        name="data_camp2"
                        value={prodanimal.data_camp2}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="justif_camp2"
                        value={prodanimal.justif_camp2}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="alter_camp2"
                        value={prodanimal.alter_camp2}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="alimenta_camp2"
                        value={prodanimal.alimenta_camp2}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="operacoescamp2"
                        value={prodanimal.operacoescamp2}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="control_camp2"
                        value={prodanimal.control_camp2}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="prod_camp2"
                        value={prodanimal.prod_camp2}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                  </TableRow>
                </>
              )}

              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows && rows
              ).map((row) => (
                <>
                  {editingId === row.id_registo_pro_ani && editRow ? (
                    <>
                      <TableRow>
                        <StyledTableCell>
                          <TextField
                            variant="filled"
                            name="data_camp1"
                            type="date"
                            inputProps={{
                              style: {
                                fontSize: 12,
                                fontFamily: "verdana",
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={prodanimal.data_camp1}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              onEditTableChange(e)
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="justif_camp1"
                            value={row.justif_camp1}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="alter_camp1"
                            value={row.alter_camp1}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="alimenta_camp1"
                            value={row.alimenta_camp1}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="operacoescamp1"
                            value={row.operacoescamp1}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="control_camp1"
                            value={row.control_camp1}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="prod_camp1"
                            value={row.prod_camp1}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell rowSpan={2}>
                          <ButtonCadernos
                            mostrarBotaoGravar
                            aoClicarGravar={() => onSaveEdit(updateCreateTable)}
                            mostrarBotaoCancelar
                            aoClicarCancelar={() => setEditingId(null)}
                          />
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableCell>
                          <CustomTextField
                            name="data_camp2"
                            value={row.data_camp2}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="justif_camp2"
                            value={row.justif_camp2}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="alter_camp2"
                            value={row.alter_camp2}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="alimenta_camp2"
                            value={row.alimenta_camp2}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="operacoescamp2"
                            value={row.operacoescamp2}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="control_camp2"
                            value={row.control_camp2}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="prod_camp2"
                            value={row.prod_camp2}
                            onChange={onEditTableChange}
                          />
                        </StyledTableCell>
                      </TableRow>
                    </>
                  ) : (
                    <>
                      <TableRow>
                        <StyledTableCell>{row.data_camp1}</StyledTableCell>
                        <StyledTableCell>{row.justif_camp1}</StyledTableCell>
                        <StyledTableCell>{row.alter_camp1} </StyledTableCell>
                        <StyledTableCell>{row.alimenta_camp1} </StyledTableCell>
                        <StyledTableCell>{row.operacoescamp1} </StyledTableCell>
                        <StyledTableCell>{row.control_camp1}</StyledTableCell>
                        <StyledTableCell>{row.prod_camp1} </StyledTableCell>
                        <StyledTableCell rowSpan={2}>
                          <ButtonCadernos
                            mostrarBotaoEditar
                            aoClicarEditar={() =>
                              handleEdit(row.id_registo_pro_ani)
                            }
                            mostrarBotaoApagar
                            aoClicarApagar={() =>
                              onDelete(row.id_registo_pro_ani)
                            }
                          />
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableCell>{row.data_camp2}</StyledTableCell>
                        <StyledTableCell>{row.justif_camp2}</StyledTableCell>
                        <StyledTableCell>{row.alter_camp2}</StyledTableCell>
                        <StyledTableCell>{row.alimenta_camp2}</StyledTableCell>
                        <StyledTableCell>{row.operacoescamp2}</StyledTableCell>
                        <StyledTableCell>{row.control_camp2}</StyledTableCell>
                        <StyledTableCell>{row.prod_camp2}</StyledTableCell>
                      </TableRow>
                    </>
                  )}
                </>
              ))}

              {obs.length <= 0 &&
                (showNewRowObs ? (
                  <TableRow>
                    <StyledTableCell>{"Observações"}</StyledTableCell>
                    <StyledTableCell colSpan={6}>
                      <CustomTextField
                        name="obs"
                        fullWidth
                        value={obsRow.obs}
                        onChange={onInputChangeObs}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Stack direction="row" justifyContent="center">
                        <ButtonCadernos
                          mostrarBotaoCancelar
                          aoClicarCancelar={() => setShowNewRowObs(false)}
                          mostrarBotaoGravar
                          aoClicarGravar={() =>
                            onSaveTabelaObs(updateCreateTable)
                          }
                        />
                      </Stack>
                    </StyledTableCell>
                  </TableRow>
                ) : (
                  showNewRowObs === false && (
                    <TableRow>
                      <StyledTableCell>{"Observações"}</StyledTableCell>
                      <StyledTableCell colSpan={6}> </StyledTableCell>
                      <StyledTableCell>
                        <TableRow>
                          <BarraDeFerramentas
                            mostrarBotaoNovo
                            textoBotaoNovo="Registar"
                            aoClicarNovo={() => setShowNewRowObs(true)}
                          />
                        </TableRow>
                      </StyledTableCell>
                    </TableRow>
                  )
                ))}

              {obs.map((obsR) => (
                <>
                  {editingIdObs === obsR.id_registo_pro_ani_obs &&
                  editRowObs ? (
                    <TableRow>
                      <StyledTableCell>{"Observações"}</StyledTableCell>
                      <StyledTableCell colSpan={6}>
                        <CustomTextField
                          name="obs"
                          fullWidth
                          value={obsR.obs}
                          onChange={onEditTableChangeObs}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Stack direction="row" justifyContent="center">
                          <ButtonCadernos                          
                            mostrarBotaoGravar
                            aoClicarGravar={() =>
                              onSaveEditObs(updateCreateTable)
                            }
                            mostrarBotaoCancelar
                            aoClicarCancelar={() => setEditingIdObs(null)}
                          />
                        </Stack>
                      </StyledTableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <StyledTableCell>{"Observações"}</StyledTableCell>
                      <StyledTableCell colSpan={6}>{obsR.obs} </StyledTableCell>

                      <StyledTableCell>
                        <ButtonCadernos
                          mostrarBotaoEditar
                          aoClicarEditar={() =>
                            handleEditObs(obsR.id_registo_pro_ani_obs)
                          }
                          mostrarBotaoApagar
                          aoClicarApagar={() => onDeleteObs(obsR.id_registo_pro_ani_obs)}
                        />
                      </StyledTableCell>
                    </TableRow>
                  )}
                </>
              ))}

              <TableRow>
              {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={12} />
                      </TableRow>
                    )}
              </TableRow>
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[3, 10, 25, { label: "All", value: -1 }]}
                  colSpan={12}
                  count={rows.length}
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
    </form>
  );
};
