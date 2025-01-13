import React, { ChangeEvent } from "react";
import { useState } from "react";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { TableContainer } from "@mui/material";
import { Paper, Stack, TextField } from "@mui/material";
import { styled } from "@mui/material";

import { CustomThemeProvider } from "../../../Styles/theme/customThemeprovider";
import { ICabecalho7 } from "../../../Interfaces/cadernos/caderno7";
import BasicPopover from "../../../Components/Popover";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  padding: theme.spacing(1, 1),
  fontSize: 14,
  height: "40px",
  fontFamily: "candara",
  textAlign: "left",
  fontWeight: 600,
}));

export interface ICabecalhoFormProps {
  cabecalhos: ICabecalho7[];
  updateCreateCabecalho: () => void;
  onEditChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSaveEditCabecalho: (callback: () => void) => void;
  handleSelectZona: (index: number, id: number) => void;
  selectedIndex: number | null;
}

export const Cabecalho7Form: React.FC<ICabecalhoFormProps> = ({
  cabecalhos,
  updateCreateCabecalho,
  onEditChange,
  onSaveEditCabecalho,
  handleSelectZona,
  selectedIndex,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [createcabecalho, setCreateCabecalho] = useState(false);

  // EDITAR
  const handleEdit = (id: number) => {
    setEditingId(id);
    setCreateCabecalho(true);
  };

  return (
    <form>
      <CustomThemeProvider>
        <Toolbar
          style={{
            background: "#f2d1c2",
            color: "#0000000",
            justifyContent: "center",
            fontFamily: "candara",
            fontSize: 18,
            fontWeight: 500,
            display: "flex",
          }}
        >
          <span>Zonas Homogéneas: </span>
          {cabecalhos.slice().map((zona, index) => (
            <Button
              key={zona.id_registo_pro}
              onClick={() => handleSelectZona(index, zona.id_registo_pro)}
              sx={{
                background: index === selectedIndex ? "#c94f1e" : "transparent",
                color: index === selectedIndex ? "white" : "inherit",
              }}
            >
              {zona.grupo_homo}
            </Button>
          ))}
        </Toolbar>

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
          {cabecalhos.map(
            (z, i) =>
              i === selectedIndex && (
                <Table>
                  <TableBody>
                    <TableRow>
                      <StyledTableCell
                        colSpan={3}
                        sx={{ fontWeight: 700, fontSize: 18 }}
                      >
                        7 - Registo de Produção Animal
                        <BasicPopover
                          text={
                            "Registo obrigatório para AB e PRODI quando obeneficiário detém animais certificados em Agricultura Biológica ou PRODI."
                          }
                        />
                      </StyledTableCell>
                    </TableRow>

                    {cabecalhos.map((cab, j) => {
                      if (cab && j === selectedIndex)
                        return (
                          <>
                            {editingId === cab.id_registo_pro &&
                            createcabecalho ? (
                              <>
                                <TableRow>
                                  <StyledTableCell colSpan={5}>
                                    <Stack
                                      direction="row"
                                      sx={{ justifyContent: "end" }}
                                    >
                                      <ButtonCadernos
                                        mostrarBotaoGravar
                                        aoClicarGravar={() =>
                                          onSaveEditCabecalho(
                                            updateCreateCabecalho
                                          )
                                        }
                                        mostrarBotaoCancelar
                                        aoClicarCancelar={() =>
                                          setCreateCabecalho(false)
                                        }
                                      />
                                    </Stack>
                                  </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                  <StyledTableCell>
                                    <Stack direction="row" alignItems="center">
                                      Espécie Animal:
                                      <TextField
                                        variant="filled"
                                        name="especi"
                                        value={cab.especi}
                                        onChange={onEditChange}
                                      />
                                    </Stack>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <Stack direction="row">
                                      Grupo Homogéneo:
                                      <TextField
                                        variant="filled"
                                        name="grupo_homo"
                                        value={cab.grupo_homo}
                                        onChange={onEditChange}
                                      />
                                    </Stack>
                                  </StyledTableCell>
                                </TableRow>
                              </>
                            ) : (
                              <>
                                <TableRow>
                                  <StyledTableCell colSpan={2}>
                                    <Stack
                                      direction="row"
                                      sx={{ justifyContent: "end" }}
                                    >
                                      <ButtonCadernos
                                        mostrarBotaoEditar
                                        aoClicarEditar={() =>
                                          handleEdit(cab.id_registo_pro)
                                        }
                                      />
                                    </Stack>
                                  </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                  <StyledTableCell>
                                    <Stack direction="row">
                                      Espécie Animal:
                                      <Typography
                                        style={{
                                          fontFamily: "verdana",
                                          paddingLeft: 10,
                                          paddingRight: 10,
                                          fontSize: 14,
                                        }}
                                      >
                                        {" "}
                                        {cab.especi}
                                      </Typography>
                                    </Stack>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <Stack direction="row">
                                      Grupo Homogéneo:
                                      <Typography
                                        style={{
                                          fontFamily: "verdana",
                                          paddingLeft: 10,
                                          paddingRight: 10,
                                          fontSize: 14,
                                        }}
                                      >
                                        {cab.grupo_homo}
                                      </Typography>
                                    </Stack>
                                  </StyledTableCell>
                                </TableRow>
                              </>
                            )}
                          </>
                        );
                      return null;
                    })}
                  </TableBody>
                </Table>
              )
          )}
        </TableContainer>
      </CustomThemeProvider>
    </form>
  );
};
