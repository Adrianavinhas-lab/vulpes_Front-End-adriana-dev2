import React, { ChangeEvent } from "react";

import { Box, Typography } from "@mui/material";
import { Paper, Stack } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import { TableBody, TableHead } from "@mui/material";
import { TableContainer } from "@mui/material";

import BasicPopover from "../../../Components/Popover";

import { IEFBeneficiario } from "./interfaceEFBeneficiario";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import {
  CustomTextField,
  CustomThemeProvider,
} from "../../../Styles/theme/customThemeprovider";
import {
  StyledTableCell,
  StyledTableHead,
  StyledTableHeadColor,
} from "../../../Styles/tabelCellStyled/customTableCell";

interface IEficAlimentarProps {
  book: IEFBeneficiario;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  updateCreateTable: () => void;
  onSaveTabela: (callback: () => void) => void;
  error: boolean;
  messageTextField: string;
}

export const IdentifEficienciaAlimentarEdit: React.FC<IEficAlimentarProps> = ({
  book,
  onInputChange,
  updateCreateTable,
  onSaveTabela,
  error,
  messageTextField,
}) => {
  const handleCancel = () => {
    updateCreateTable();
  };
  return (
    <div>
      <CustomThemeProvider>
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ height: "auto", width: "auto", m: 2, p: 2 }}
        >
          <table style={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      margin: "auto",
                      padding: 1,
                    }}
                  >
                    <Typography
                      fontWeight={600}
                      fontSize={18}
                      fontFamily="candara"
                      sx={{ marginLeft: 0 }}
                    >
                      A.3.4 Melhorar a eficiência alimentar animal para redução
                      das emissões de GEE - Bovinos de Carne
                    </Typography>
                    <Box
                      sx={{
                        width: "98%",
                        display: "flex",
                        justifyContent: "right",
                      }}
                    >
                      <Box sx={{ justifyContent: "end", display: "flex" }}>
                        <ButtonCadernos
                          mostrarBotaoGravar
                          aoClicarGravar={() => onSaveTabela(updateCreateTable)}
                          mostrarBotaoCancelar
                          aoClicarCancelar={handleCancel}
                        />
                      </Box>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <StyledTableHeadColor colSpan={2}>
                  Identificação do operador
                </StyledTableHeadColor>
              </TableRow>
              <TableRow>
                <StyledTableHead width="20%">
                  Nome do Beneficiário
                </StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="nome"
                    value={book.nome}
                    onChange={onInputChange}
                    error={error}
                    helperText={error ? messageTextField : ""}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>NIF </StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="nif"
                    value={book.nif}
                    onChange={onInputChange}
                    error={error}
                    helperText={error ? messageTextField : ""}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>NIFAP</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="nifap"
                    value={book.nifap}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>Morada</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="morada"
                    value={book.morada}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>Localização</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="localizacao"
                    value={book.localizacao}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>Código Postal</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="codig_postal"
                    value={book.codig_postal}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>Freguesia</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="freguesia"
                    value={book.freguesia}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableHead>Concelho</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="concelho"
                    value={book.concelho}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>Contacto telefónico </StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="telefone"
                    value={book.telefone}
                    onChange={onInputChange}
                    error={error}
                    helperText={error ? messageTextField : ""}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>Correio electrónico </StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="email"
                    value={book.email}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHeadColor colSpan={2}>
                  <Stack direction="row">
                    Sócio gerente ou representante (Quando aplicável)
                    <BasicPopover text="Identificação da exploração" />
                  </Stack>
                </StyledTableHeadColor>
              </TableRow>
              <TableRow>
                <StyledTableHead>Cargo</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="cargo_s"
                    value={book.cargo_s}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>Nome</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="nome_S"
                    value={book.nome_S}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>Morada</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="morada_S"
                    value={book.morada_S}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>Telefone</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="telefone_S"
                    value={book.telefone_S}
                    onChange={onInputChange}
                    error={error}
                    helperText={error ? messageTextField : ""}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>Telemóvel</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="telemvel_S"
                    value={book.telemvel_S}
                    onChange={onInputChange}
                    error={error}
                    helperText={error ? messageTextField : ""}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>Correio electrónico</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="email_S"
                    value={book.email_S}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHeadColor colSpan={2}>
                  Identificação da exploração
                </StyledTableHeadColor>
              </TableRow>
              <TableRow>
                <StyledTableHead>Local da sede</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="local_sede_E"
                    value={book.local_sede_E}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>Cód. Postal</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="codigo_postal_E"
                    value={book.codigo_postal_E}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>Concelho</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="concelho_E"
                    value={book.concelho_E}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>Freguesia</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="freguesia_E"
                    value={book.freguesia_E}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHeadColor colSpan={2}>
                  Efetivo Pecuário (CN):
                </StyledTableHeadColor>
              </TableRow>
              <TableRow>
                <StyledTableHead>Bovinos de carne (CN): {}</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="bovinos_carne"
                    value={book.bovinos_carne}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>CCDR a que pertence:</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="ccdr"
                    value={book.ccdr}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>Assistência Técnica</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="assistencia"
                    value={book.assistencia}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>Identificação do OC</StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="identificacao_oc"
                    value={book.identificacao_oc}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </table>
        </TableContainer>
      </CustomThemeProvider>
      <Box height={300}></Box>
    </div>
  );
};
