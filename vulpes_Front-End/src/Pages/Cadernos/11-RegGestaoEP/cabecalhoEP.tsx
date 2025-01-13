import React from "react";
import { ChangeEvent, useState } from "react";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { TableContainer } from "@mui/material";
import { Paper, Stack } from "@mui/material";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";

import { ICabecalhoEP } from "../../../Interfaces/cadernos/caderno11";
import {
  CustomTextField,
  CustomThemeProvider,
} from "../../../Styles/theme/customThemeprovider";
import BasicPopover from "../../../Components/Popover";
import { TableHead } from "@material-ui/core";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  padding: theme.spacing(1, 1),
  fontSize: 14,
  height: "40px",
  fontFamily: "candara",
  fontWeight: 600,
}));

interface ICabecalhoFormProps {
  cabecalho: ICabecalhoEP;
  cabecalhos: ICabecalhoEP[];
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

export const CabecalhoEPForm: React.FC<ICabecalhoFormProps> = ({
  cabecalho,
  cabecalhos,
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

  const handleEdit = (id: number) => {
    setEditingId(id);
    setEditRow(true);
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
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell
                  colSpan={2}
                  sx={{ fontWeight: 700, fontSize: 18 }}
                >
                  11 - Registo de gestão de efluentes pecuários
                  <BasicPopover
                    text={
                      "O Registo da gestão de efluentes pecuários, no caso de o beneficiário assim o desejar, pode ser utilizado para cumprimento da Portaria n.º 259/2012 (Anexo XI), de 28 de agosto e para cumprimento, em parte (apoio à verificação dos indicadores 2.1 e 2.2), ao indicador 2 do RLG 2 da Portaria n.º 54-Q/2023, de 27 de fevereiro."
                    }
                  />
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cabecalhos.length <= 0 &&
                (createTable === false ? (
                  <>
                    <TableRow>
                      <StyledTableCell
                        sx={{
                          fontWeight: 600,
                          textAlign: "left",
                          fontFamily: "candara",
                          fontSize: 16,
                        }}
                      >
                        1 - Capacidade das infraestruturas de armazenamento da
                        exploração agrícola
                      </StyledTableCell>

                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                            fontFamily: "candara",
                          }}
                        >
                          <BarraDeFerramentas
                            mostrarBotaoNovo
                            textoBotaoNovo="Registar"
                            aoClicarNovo={() => setCreateTable(true)}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>
                        <Stack direction="row" alignItems="center">
                          Fossas: ______ m3
                        </Stack>
                      </StyledTableCell>

                      <StyledTableCell>
                        <Stack direction="row" alignItems="center">
                          Nitreiras: ___ m3
                        </Stack>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>
                        <Stack direction="row" alignItems="center">
                          Valas de condução de efluentes: ____ m3
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Stack direction="row" alignItems="center">
                          Lagoas impermeáveis: ___ m3
                        </Stack>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>
                        <Stack direction="row" alignItems="center">
                          Outros resertatórios:___ m3
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Stack direction="row" alignItems="center">
                          Contratualizada: ___ m3
                        </Stack>
                      </StyledTableCell>
                    </TableRow>
                  </>
                ) : (
                  <>
                    <TableRow>
                      <StyledTableCell
                        sx={{
                          fontWeight: 600,
                          textAlign: "left",
                          fontFamily: "candara",
                          fontSize: 16,
                        }}
                      >
                        1 - Capacidade das infraestruturas de armazenamento da
                        exploração agrícola
                      </StyledTableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                            fontFamily: "candara",
                          }}
                        >
                          <ButtonCadernos
                            mostrarBotaoGravar
                            aoClicarGravar={() =>
                              onSaveTabela(updateCreateTable)
                            }
                            mostrarBotaoCancelar
                            aoClicarCancelar={() => setCreateTable(false)}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>
                        <Stack direction="row" alignItems="center">
                          Fossas:
                          <CustomTextField
                            name="fossas"
                            value={cabecalho.fossas}
                            onChange={onInputChange}
                            error={error}
                            helperText={
                              error ? messageTextField : ""
                            }
                          />
                          m3
                        </Stack>
                      </StyledTableCell>

                      <StyledTableCell>
                        <Stack direction="row" alignItems="center">
                          Nitreiras:
                          <CustomTextField
                            name="nitreiras"
                            value={cabecalho.nitreiras}
                            onChange={onInputChange}
                            error={error}
                            helperText={
                              error ? messageTextField : ""
                            }
                          />
                          m3
                        </Stack>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>
                        <Stack direction="row" alignItems="center">
                          Valas de condução de efluentes:
                          <CustomTextField
                            name="valas_condu_fluentes"
                            value={cabecalho.valas_condu_fluentes}
                            onChange={onInputChange}
                            error={error}
                            helperText={
                              error ? messageTextField : ""
                            }
                          />
                          m3
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Stack direction="row" alignItems="center">
                          Lagoas impermeáveis:
                          <CustomTextField
                            name="lagos_imperm"
                            value={cabecalho.lagos_imperm}
                            onChange={onInputChange}
                            error={error}
                            helperText={
                              error ? messageTextField : ""
                            }
                          />
                          m3
                        </Stack>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>
                        <Stack direction="row" alignItems="center">
                          Outros resertatórios:
                          <CustomTextField
                            name="outros_reservatorios"
                            value={cabecalho.outros_reservatorios}
                            onChange={onInputChange}
                            error={error}
                            helperText={
                              error ? messageTextField : ""
                            }
                          />
                          m3
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Stack direction="row" alignItems="center">
                          Contratualizada:
                          <CustomTextField
                            name="contratualizada"
                            value={cabecalho.contratualizada}
                            onChange={onInputChange}
                            error={error}
                            helperText={
                              error ? messageTextField : ""
                            }
                          />
                          m3
                        </Stack>
                      </StyledTableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
            <TableBody>
              {cabecalhos.length > 0 &&
                cabecalhos.map((cab) => (
                  <>
                    {editingId === cab.id_fluentes_um && editRow ? (
                      <>
                        <TableRow>
                          <StyledTableCell
                            sx={{
                              fontWeight: 600,
                              textAlign: "left",
                              fontFamily: "candara",
                              fontSize: 16,
                            }}
                          >
                            1 - Capacidade das infraestruturas de armazenamento
                            da exploração agrícola
                          </StyledTableCell>
                          <StyledTableCell>
                            <Stack
                              direction="row"
                              sx={{ justifyContent: "end" }}
                            >
                              <ButtonCadernos
                                mostrarBotaoGravar
                                aoClicarGravar={() =>
                                  onSaveEdit(updateCreateTable)
                                }
                                mostrarBotaoCancelar
                                aoClicarCancelar={() => setEditRow(false)}
                              />
                            </Stack>
                          </StyledTableCell>
                        </TableRow>
                        <TableRow>
                          <StyledTableCell colSpan={2}>
                            1 - Capacidade das infraestruturas de armazenamento
                            da exploração agrícola
                          </StyledTableCell>
                        </TableRow>
                        <TableRow>
                          <StyledTableCell>
                            <Stack direction="row" alignItems="center">
                              Fossas:
                              <CustomTextField
                                name="fossas"
                                value={cab.fossas}
                                onChange={onEditTableChange}
                                error={error}
                                helperText={
                                  error ? messageTextField : ""
                                }
                              />
                              m3
                            </Stack>
                          </StyledTableCell>

                          <StyledTableCell>
                            <Stack direction="row" alignItems="center">
                              Nitreiras:
                              <CustomTextField
                                name="nitreiras"
                                value={cab.nitreiras}
                                onChange={onEditTableChange}
                                error={error}
                                helperText={
                                  error ? messageTextField : ""
                                }
                              />
                              m3
                            </Stack>
                          </StyledTableCell>
                        </TableRow>
                        <TableRow>
                          <StyledTableCell>
                            <Stack direction="row" alignItems="center">
                              Valas de condução de efluentes:
                              <CustomTextField
                                name="valas_condu_fluentes"
                                value={cab.valas_condu_fluentes}
                                onChange={onEditTableChange}
                                error={error}
                                helperText={
                                  error ? messageTextField : ""
                                }
                              />
                              m3
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row" alignItems="center">
                              Lagoas impermeáveis:
                              <CustomTextField
                                name="lagos_imperm"
                                value={cab.lagos_imperm}
                                onChange={onEditTableChange}
                                error={error}
                                helperText={
                                  error ? messageTextField : ""
                                }
                              />
                              m3
                            </Stack>
                          </StyledTableCell>
                        </TableRow>
                        <TableRow>
                          <StyledTableCell>
                            <Stack direction="row" alignItems="center">
                              Outros resertatórios:
                              <CustomTextField
                                name="outros_reservatorios"
                                value={cab.outros_reservatorios}
                                onChange={onEditTableChange}
                                error={error}
                                helperText={
                                  error ? messageTextField : ""
                                }
                              />
                              m3
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row" alignItems="center">
                              Contratualizada:
                              <CustomTextField
                                name="contratualizada"
                                value={cab.contratualizada}
                                onChange={onEditTableChange}
                                error={error}
                                helperText={
                                  error ? messageTextField : ""
                                }
                              />
                              m3
                            </Stack>
                          </StyledTableCell>
                        </TableRow>
                      </>
                    ) : (
                      <>
                        <TableRow>
                          <StyledTableCell
                            sx={{
                              fontWeight: 600,
                              textAlign: "left",
                              fontFamily: "candara",
                              fontSize: 16,
                            }}
                          >
                            1 - Capacidade das infraestruturas de armazenamento
                            da exploração agrícola
                          </StyledTableCell>
                          <StyledTableCell colSpan={2}>
                            <Stack
                              direction="row"
                              sx={{ justifyContent: "end" }}
                            >
                              <ButtonCadernos
                                mostrarBotaoEditar
                                aoClicarEditar={() =>
                                  handleEdit(cab.id_fluentes_um)
                                }
                                mostrarBotaoApagar
                                aoClicarApagar={() =>
                                  onDelete(cab.id_fluentes_um)
                                }
                              />
                            </Stack>
                          </StyledTableCell>
                        </TableRow>
                        <TableRow>
                          <StyledTableCell>
                            <Stack direction="row" alignItems="center">
                              Fossas:
                              <Typography
                                style={{
                                  fontFamily: "verdana",
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  fontSize: 14,
                                }}
                              >
                                {cab.fossas}
                              </Typography>
                              m3
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row" alignItems="center">
                              Nitreiras:
                              <Typography
                                style={{
                                  fontFamily: "verdana",
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  fontSize: 14,
                                }}
                              >
                                {cab.nitreiras}{" "}
                              </Typography>
                              m3
                            </Stack>
                          </StyledTableCell>
                        </TableRow>
                        <TableRow>
                          <StyledTableCell>
                            <Stack direction="row" alignItems="center">
                              Valas de condução de efluentes:
                              <Typography
                                style={{
                                  fontFamily: "verdana",
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  fontSize: 14,
                                }}
                              >
                                {cab.valas_condu_fluentes}
                              </Typography>
                              m3
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row" alignItems="center">
                              Lagoas impermeáveis:
                              <Typography
                                style={{
                                  fontFamily: "verdana",
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  fontSize: 14,
                                }}
                              >
                                {cab.lagos_imperm}
                              </Typography>
                              m3
                            </Stack>
                          </StyledTableCell>
                        </TableRow>
                        <TableRow>
                          <StyledTableCell>
                            <Stack direction="row" alignItems="center">
                              Outros resertatórios:
                              <Typography
                                style={{
                                  fontFamily: "verdana",
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  fontSize: 14,
                                }}
                              >
                                {cab.outros_reservatorios}
                              </Typography>
                              m3
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row" alignItems="center">
                              Contratualizada:
                              <Typography
                                style={{
                                  fontFamily: "verdana",
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  fontSize: 14,
                                }}
                              >
                                {cab.contratualizada}
                              </Typography>
                              m3
                            </Stack>
                          </StyledTableCell>
                        </TableRow>
                      </>
                    )}
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomThemeProvider>
    </form>
  );
};
