import React, { ChangeEvent, useState } from "react";

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import { TableContainer } from "@mui/material";
import { Paper, Stack } from "@mui/material";

import { ICabecalho8 } from "../../../Interfaces/cadernos/caderno8";
import {
  CustomTextField,
  CustomThemeProvider,
} from "../../../Styles/theme/customThemeprovider";
import { TableHead } from "@material-ui/core";
import BasicPopover from "../../../Components/Popover";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  padding: theme.spacing(1, 1),
  fontSize: 14,
  height: "40px",
  fontFamily: "candara",
  fontWeight: 600,
}));

export interface ICabecalhoFormProps {
  cabecalhos: ICabecalho8[];
  updateCreateCabecalho: () => void;
  onEditChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSaveEditCabecalho: (callback: () => void) => void;
  handleSelectZona: (index: number, id: number) => void;
  selectedIndex: number | null;
  error: boolean;
  messageTextField: string;
}

export const CabecalhoPosColheitaForm: React.FC<ICabecalhoFormProps> = ({
  cabecalhos,
  updateCreateCabecalho,
  onEditChange,
  onSaveEditCabecalho,
  handleSelectZona,
  selectedIndex,
  error,
  messageTextField,
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
              key={zona.id_registo_colh}
              onClick={() => handleSelectZona(index, zona.id_registo_colh)}
              sx={{
                background: index === selectedIndex ? "#c94f1e" : "transparent",
                color: index === selectedIndex ? "white" : "inherit",
              }}
            >
              {zona.zona_homo}
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
                  <TableHead>
                    <TableRow>
                      <StyledTableCell
                        colSpan={5}
                        sx={{
                          fontWeight: 700,
                          fontSize: 18,
                          fontFamily: "candara",
                        }}
                      >
                        8 - Registo de Pós-Colheita
                        <BasicPopover
                          text={
                            "Preencher apenas no caso do beneficiário ter compromisso ativo na intervenção Agricultura Biológica ou PRODI.\n\nPretende-se que neste quadro sejam registadas todas as operações de processamento e comercialização quando tal seja realizado diretamente pelo produtor"
                          }
                        />
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {cabecalhos.map((cab, j) => {
                      if (j === selectedIndex)
                        return (
                          <>
                            {editingId === cab.id_registo_colh &&
                            createcabecalho &&
                            selectedIndex !== null ? (
                              <>
                                <TableRow>
                                  <StyledTableCell colSpan={6}>
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
                                      Zona Homogénea:
                                      <CustomTextField
                                        name="zona_homo"
                                        value={cab.zona_homo}
                                        onChange={onEditChange}
                                      />
                                    </Stack>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    colSpan={3}
                                    sx={{
                                      wordSpacing: 6,
                                      paddingY: 2,
                                      textAlign: "center",
                                      fontWeight: 600,
                                    }}
                                  >
                                    <Stack direction="row" alignItems="center">
                                      Conversão:
                                      <FormControlLabel
                                        name="c1"
                                        label={
                                          <Typography
                                            fontFamily="candara"
                                            fontSize={18}
                                          >
                                            C1
                                          </Typography>
                                        }
                                        aria-readonly
                                        control={
                                          <Checkbox
                                            defaultChecked={
                                              cab.c1 === true && true
                                            }
                                            value={cab.c1}
                                            onChange={onEditChange}
                                            sx={{
                                              color: "#aaaaaa",
                                              "&.Mui-checked": {
                                                color: "#C94F1E",
                                              },
                                            }}
                                          />
                                        }
                                      />
                                      <FormControlLabel
                                        name="c2"
                                        label={
                                          <Typography
                                            fontFamily="candara"
                                            fontSize={18}
                                          >
                                            C2
                                          </Typography>
                                        }
                                        aria-readonly
                                        control={
                                          <Checkbox
                                            defaultChecked={
                                              cab.c2 === true && true
                                            }
                                            value={cab.c2 === true && cab.c2}
                                            onChange={onEditChange}
                                            sx={{
                                              color: "#aaaaaa",
                                              "&.Mui-checked": {
                                                color: "#C94F1E",
                                              },
                                            }}
                                          />
                                        }
                                      />
                                      <FormControlLabel
                                        name="c3"
                                        label={
                                          <Typography
                                            fontFamily="candara"
                                            fontSize={18}
                                          >
                                            C3
                                          </Typography>
                                        }
                                        aria-readonly
                                        control={
                                          <Checkbox
                                            defaultChecked={
                                              cab.c3 === true && true
                                            }
                                            value={cab.c3}
                                            onChange={onEditChange}
                                            sx={{
                                              color: "#aaaaaa",
                                              "&.Mui-checked": {
                                                color: "#C94F1E",
                                              },
                                            }}
                                          />
                                        }
                                      />
                                    </Stack>
                                  </StyledTableCell>
                                  <StyledTableCell colSpan={2}>
                                    <Stack direction="row" alignItems="center">
                                      Área:
                                      <CustomTextField
                                        name="area"
                                        value={cab.area !== null && cab.area}
                                        onChange={onEditChange}
                                        error={error}
                                        helperText={
                                          error ? messageTextField : ""
                                        }
                                      />
                                    </Stack>
                                  </StyledTableCell>
                                </TableRow>

                                <TableRow>
                                  <StyledTableCell
                                    colSpan={5}
                                    sx={{
                                      textAlign: "left",
                                      fontWeight: 600,
                                    }}
                                  >
                                    <Stack direction="row" alignItems="center">
                                      Cultura e variedade:
                                      <CustomTextField
                                        name="cultura"
                                        value={cab.cultura}
                                        onChange={onEditChange}
                                      />
                                    </Stack>
                                  </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                  <StyledTableCell>
                                    <Stack direction="row" alignItems="center">
                                      Compasso:
                                      <CustomTextField
                                        name="compasso"
                                        value={cab.compasso}
                                        onChange={onEditChange}
                                      />
                                    </Stack>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <Stack direction="row" alignItems="center">
                                      porta-enxerto:
                                      <CustomTextField
                                        name="porta_enxerto"
                                        value={cab.porta_enxerto}
                                        onChange={onEditChange}
                                      />
                                    </Stack>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <Stack direction="row" alignItems="center">
                                      Nº de plantas:
                                      <CustomTextField
                                        name="n_planta"
                                        value={cab.n_planta}
                                        onChange={onEditChange}
                                        error={error}
                                        helperText={
                                          error ? messageTextField : ""
                                        }
                                      />
                                    </Stack>
                                  </StyledTableCell>
                                  <StyledTableCell colSpan={2}>
                                    <Stack direction="row" alignItems="center">
                                      Data de plantação:
                                      <TextField
                                        variant="filled"
                                        fullWidth
                                        type="date"
                                        inputProps={{
                                          style: {
                                            fontSize: 12,
                                            fontFamily: "verdana",
                                          },
                                        }}
                                        name="data_plantacao"
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        value={
                                          cab.data_plantacao
                                            ? cab.data_plantacao
                                            : ""
                                        }
                                        onChange={onEditChange}
                                      />
                                    </Stack>
                                  </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                  <StyledTableCell>
                                    Produção Total:
                                  </StyledTableCell>
                                  <StyledTableCell colSpan={2}>
                                    <Stack direction="row" alignItems="center">
                                      Esperada:
                                      <CustomTextField
                                        name="produca_total"
                                        value={cab.produca_total}
                                        onChange={onEditChange}
                                      />
                                      Unidades / Ton/ha
                                    </Stack>
                                  </StyledTableCell>
                                  <StyledTableCell colSpan={2}>
                                    <Stack direction="row" alignItems="center">
                                      Obtida:{" "}
                                      <CustomTextField
                                        name="obtida"
                                        value={cab.obtida}
                                        onChange={onEditChange}
                                      />
                                      Unidades / Ton/ha
                                    </Stack>
                                  </StyledTableCell>
                                </TableRow>
                              </>
                            ) : (
                              <>
                                <TableRow>
                                  <StyledTableCell colSpan={5}>
                                    <Stack
                                      direction="row"
                                      sx={{ justifyContent: "end" }}
                                    >
                                      <ButtonCadernos
                                        mostrarBotaoEditar
                                        aoClicarEditar={() =>
                                          handleEdit(cab.id_registo_colh)
                                        }
                                      />
                                    </Stack>
                                  </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                  <StyledTableCell>
                                    <Stack
                                      direction="row"
                                      sx={{ alignItems: "center" }}
                                    >
                                      Zona Homogénea:
                                      <Typography
                                        style={{
                                          fontSize: 20,
                                          paddingLeft: 10,
                                        }}
                                      >
                                        {cab.zona_homo}
                                      </Typography>
                                    </Stack>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    colSpan={2}
                                    sx={{
                                      wordSpacing: 6,
                                      paddingY: 2,
                                      textAlign: "center",
                                    }}
                                  >
                                    Conversão:
                                    <BasicPopover
                                      text={
                                        "Exploração em conversão para Produção Biológica (PB), assinalar:\nC1 - Primeiro ano de conversão para PB;\nC2 - Segundo ano de conversão para PB;\nC3 - Terceiro ano de conversão para PB."
                                      }
                                    />
                                    <FormControlLabel
                                      sx={{ paddingLeft: 8 }}
                                      label={
                                        <Typography
                                          fontFamily="candara"
                                          fontSize={18}
                                        >
                                          C1
                                        </Typography>
                                      }
                                      aria-readonly
                                      control={
                                        <Checkbox
                                          checked={cab.c1 === true && cab.c1}
                                          sx={{
                                            color: "#aaaaaa",
                                            "&.Mui-checked": {
                                              color: "#C94F1E",
                                            },
                                          }}
                                        />
                                      }
                                    />
                                    <FormControlLabel
                                      label={
                                        <Typography
                                          fontFamily="candara"
                                          fontSize={18}
                                        >
                                          C2
                                        </Typography>
                                      }
                                      aria-readonly
                                      control={
                                        <Checkbox
                                          checked={cab.c2 === true && cab.c2}
                                          sx={{
                                            color: "#aaaaaa",
                                            "&.Mui-checked": {
                                              color: "#C94F1E",
                                            },
                                          }}
                                        />
                                      }
                                    />
                                    <FormControlLabel
                                      label={
                                        <Typography
                                          fontFamily="candara"
                                          fontSize={18}
                                        >
                                          C3
                                        </Typography>
                                      }
                                      aria-readonly
                                      control={
                                        <Checkbox
                                          checked={cab.c3 === true && cab.c3}
                                          sx={{
                                            color: "#aaaaaa",
                                            "&.Mui-checked": {
                                              color: "#C94F1E",
                                            },
                                          }}
                                        />
                                      }
                                    />
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <Stack direction="row">
                                      Área:
                                      <Typography
                                        style={{
                                          fontFamily: "verdana",
                                          paddingLeft: 10,
                                          paddingRight: 10,
                                          fontSize: 14,
                                        }}
                                      >
                                        {cab.area}
                                      </Typography>
                                    </Stack>
                                  </StyledTableCell>
                                </TableRow>

                                <TableRow>
                                  <StyledTableCell colSpan={5}>
                                    <Stack direction="row">
                                      Cultura e variedade:
                                      <Typography
                                        style={{
                                          fontFamily: "verdana",
                                          paddingLeft: 10,
                                          paddingRight: 10,
                                          fontSize: 14,
                                        }}
                                      >
                                        {cab.cultura}
                                      </Typography>
                                    </Stack>
                                  </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                  <StyledTableCell>
                                    <Stack direction="row">
                                      Compasso:
                                      <Box margin={-1} padding={0}>
                                        <BasicPopover
                                          text={
                                            "Preencher apenas para cultura permanente."
                                          }
                                        />
                                      </Box>
                                      <Typography
                                        style={{
                                          fontFamily: "verdana",
                                          paddingLeft: 10,
                                          paddingRight: 10,
                                          fontSize: 14,
                                        }}
                                      >
                                        {cab.compasso}
                                      </Typography>
                                    </Stack>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <Stack direction="row">
                                      porta-enxerto:
                                      <Box margin={-1} padding={0}>
                                        <BasicPopover
                                          text={
                                            "Preencher apenas para cultura permanente."
                                          }
                                        />
                                      </Box>
                                      <Typography
                                        style={{
                                          fontFamily: "verdana",
                                          paddingLeft: 10,
                                          paddingRight: 10,
                                          fontSize: 14,
                                        }}
                                      >
                                        {cab.porta_enxerto}
                                      </Typography>
                                    </Stack>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <Stack direction="row">
                                      Nº de plantas:
                                      <Typography
                                        style={{
                                          fontFamily: "verdana",
                                          paddingLeft: 10,
                                          paddingRight: 10,
                                          fontSize: 14,
                                        }}
                                      >
                                        {cab.n_planta}
                                      </Typography>
                                    </Stack>
                                  </StyledTableCell>
                                  <StyledTableCell colSpan={2}>
                                    <Stack direction="row">
                                      Data de plantação
                                      <Box margin={-1} padding={0}>
                                        <BasicPopover
                                          text={
                                            "Preencher apenas para cultura permanente."
                                          }
                                        />
                                      </Box>
                                      <Typography
                                        style={{
                                          fontFamily: "verdana",
                                          paddingLeft: 10,
                                          paddingRight: 10,
                                          fontSize: 14,
                                        }}
                                      >
                                        {cab.data_plantacao}
                                      </Typography>
                                    </Stack>
                                  </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                  <StyledTableCell>
                                    Produção Total:
                                  </StyledTableCell>
                                  <StyledTableCell colSpan={2}>
                                    <Stack direction="row">
                                      Esperada:
                                      <Typography
                                        style={{
                                          fontFamily: "verdana",
                                          paddingLeft: 10,
                                          paddingRight: 10,
                                          fontSize: 14,
                                        }}
                                      >
                                        {cab.produca_total}
                                      </Typography>
                                      Unidades / Ton/ha
                                    </Stack>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <Stack direction="row">
                                      Obtida:
                                      <Typography
                                        style={{
                                          fontFamily: "verdana",
                                          paddingLeft: 10,
                                          paddingRight: 10,
                                          fontSize: 14,
                                        }}
                                      >
                                        {cab.obtida}
                                      </Typography>
                                      Unidades / Ton/ha
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
