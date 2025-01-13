import React, { ChangeEvent, SetStateAction, useState } from "react";

import {
  Box, Button, Table, TableBody, TableHead, TableRow, TextField, Toolbar, Typography,
} from "@mui/material";
import { TableContainer } from "@mui/material";
import { Paper, Stack } from "@mui/material";

import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import BasicPopover from "../../../Components/Popover";
import { CustomTextField, CustomThemeProvider, } from "../../../Styles/theme/customThemeprovider";
import { ICabecalho5A } from "../../../Interfaces/cadernos/caderno5/interfaces5A";
import { StyledTableCellCabecalho } from "../../../Styles/tabelCellStyled/customTableCell";


export interface ICabecalhoFormProps {
  cabecalhos: ICabecalho5A[];
  setCabecalhos: React.Dispatch<SetStateAction<ICabecalho5A[]>>;
  updateCreateCabecalho: () => void;
  onSaveEditCabecalho: (callback: () => void) => void;
  handleSelectZona: (index: number, id: number) => void;
  selectedIndex: number | null;
}

export const Cabecalho5AForm: React.FC<ICabecalhoFormProps> = ({
  cabecalhos,
  setCabecalhos,
  updateCreateCabecalho,
  onSaveEditCabecalho,
  handleSelectZona,
  selectedIndex
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [createcabecalho, setCreateCabecalho] = useState(false);

  // const [error_area, set_error_area] = useState<boolean>(false);
  const [error_esperada, set_error_esperada] = useState<boolean>(false);
  const [error_obtida, set_error_obtida] = useState<boolean>(false);
  // const [error_n_sequencia, set_error_n_sequencia] = useState<boolean>(false);
  // const [error_n_subparcela, set_error_n_subparcela] = useState<boolean>(false);
  const [error_n_planta, set_error_n_planta] = useState<boolean>(false);
  const message_apenas_numero = ("Apenas números são aceites");


  // EDITAR
  const handleEdit = (id: number) => {
    setEditingId(id);
    setCreateCabecalho(true);
  };

  const onInputChage = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type } = event.target;
    let newValue: any = value;

    if (type === "date" && value === "") {
      newValue = null;
    }

    // if (name === "area") {
    //   if (isNaN(Number(value))) {
    //     set_error_area(true);
    //     return;
    //   } else {
    //     set_error_area(false);
    //   }
    // }
    // if (name === "n_sequencia") {
    //   if (isNaN(Number(value))) {
    //     set_error_n_sequencia(true);
    //     return;
    //   } else {
    //     set_error_n_sequencia(false);
    //   }
    // }
    // if (name === "n_subparcela") {
    //   if (isNaN(Number(value))) {
    //     set_error_n_subparcela(true);
    //     return;
    //   } else {
    //     set_error_n_subparcela(false);
    //   }
    // }
    if (name === "produca_total") {
      if (isNaN(Number(value))) {
        set_error_esperada(true);
        return;
      } else {
        set_error_esperada(false);
      }
    }
    if (name === "obtida") {
      if (isNaN(Number(value))) {
        set_error_obtida(true);
        return;
      } else {
        set_error_obtida(false);
      }
    }
    if (name === "n_planta") {
      if (isNaN(Number(value))) {
        set_error_n_planta(true);
        return;
      } else {
        set_error_n_planta(false);
      }
    }

    if (selectedIndex !== null) {
      const idCabecalhoToEdit =
        cabecalhos[selectedIndex].id_registo_fertil_cabecalho;
      const updatedCabecalhos = cabecalhos.map((cab) => {
        if (cab.id_registo_fertil_cabecalho === idCabecalhoToEdit) {
          return {
            ...cab,
            [name]: newValue,
          };
        }
        return cab;
      });
      setCabecalhos(updatedCabecalhos);
    }
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
              key={index}
              onClick={() =>
                handleSelectZona(index, zona.id_registo_fertil_cabecalho)
              }
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
          <Table>
            {cabecalhos.map((cab, j) => {
              if (j === selectedIndex)
                return (
                  <React.Fragment key={j}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCellCabecalho
                          colSpan={4}
                          sx={{ fontWeight: 700, fontSize: 18 }}
                        >
                          5A - Registo de operações de Fertilização
                          <BasicPopover
                            text={"Registo obrigatório para a intervenção Uso Eficiente da Água quando não acumula com AB ou PRODI, mas acumulável com as intervenções da conservação do solo (sementeira direta e enrelvamento) e Apoios Zonais Agroambientais.\n\nPretende-se que o beneficiário registo a aplicação de fertilizantes, com base nos resultados dos boletins de análise e nas produções obtidas."} />
                        </StyledTableCellCabecalho>
                        {editingId === cab.id_registo_fertil_cabecalho && createcabecalho ?
                          <StyledTableCellCabecalho >
                            <Stack direction="row" sx={{ justifyContent: "end" }}>
                              <ButtonCadernos
                                mostrarBotaoGravar
                                aoClicarGravar={() => onSaveEditCabecalho(updateCreateCabecalho)}
                                mostrarBotaoCancelar
                                aoClicarCancelar={() => setCreateCabecalho(false)} />
                            </Stack>
                          </StyledTableCellCabecalho>
                          :
                          <StyledTableCellCabecalho>
                            <Stack direction="row" sx={{ justifyContent: "end" }}>
                              <ButtonCadernos
                                mostrarBotaoEditar
                                aoClicarEditar={() => handleEdit(cab.id_registo_fertil_cabecalho)} />
                            </Stack>
                          </StyledTableCellCabecalho>
                        }
                      </TableRow>
                    </TableHead>
                    <TableBody >
                      {editingId === cab.id_registo_fertil_cabecalho &&
                        createcabecalho &&
                        selectedIndex !== null ? (
                        <>
                          <TableRow>
                            <StyledTableCellCabecalho >
                              <Stack direction="row" alignItems="center">
                                Zona Homogénea:
                                <CustomTextField
                                  name="zona_homo"
                                  value={cab.zona_homo}
                                  onChange={onInputChage}
                                  disabled
                                />
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho >
                              <Stack direction="row" alignItems="center">
                                Nº Seq. Parcela:
                                <CustomTextField
                                  name="n_sequencia"
                                  value={cab.n_sequencia}
                                  disabled
                                  onChange={onInputChage}
                                // error={error_n_sequencia}
                                // helperText={error_n_sequencia ? message_apenas_numero : ""}
                                />
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho
                            >
                              <Stack direction="row" alignItems="center">
                                Nº subparcela:
                                <CustomTextField
                                  name="n_subparcela"
                                  value={cab.n_subparcela}
                                  disabled
                                onChange={onInputChage}
                                // error={error_n_subparcela}
                                // helperText={error_n_subparcela ? message_apenas_numero : ""} 
                                />
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho
                            >
                              <Stack direction="row" alignItems="center">
                                Área (ha):
                                <CustomTextField
                                  name="area"
                                  value={cab.area}
                                  disabled
                                onChange={onInputChage}
                                // error={error_area}
                                // helperText={error_area ? message_apenas_numero : ""} 
                                />
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho >
                              <Stack direction="row" alignItems="center">
                                Método de rega:
                                <CustomTextField
                                  name="metodo_rega"
                                  value={cab.metodo_rega}
                                  onChange={onInputChage} />
                              </Stack>
                            </StyledTableCellCabecalho>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellCabecalho colSpan={5}>
                              <Stack direction="row" alignItems="center">
                                Cultura e variedade:
                                <CustomTextField
                                  name="cultura"
                                  value={cab.cultura}
                                  onChange={onInputChage} />
                              </Stack>
                            </StyledTableCellCabecalho>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellCabecalho>
                              <Stack direction="row" alignItems="center">
                                Compasso:
                                <CustomTextField
                                  name="compasso"
                                  value={cab.compasso}
                                  onChange={onInputChage} />
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row" alignItems="center">
                                Porta-enxerto:
                                <CustomTextField
                                  name="porta_enxerto"
                                  value={cab.porta_enxerto}
                                  onChange={onInputChage} />
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho colSpan={2}>
                              <Stack direction="row" alignItems="center">
                                nº de plantas:
                                <CustomTextField
                                  name="n_planta"
                                  value={cab.n_planta}
                                  onChange={onInputChage}
                                  error={error_n_planta}
                                  helperText={error_n_planta ? message_apenas_numero : ""} />
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row" alignItems="center">
                                Data da plantação:
                                <TextField
                                  variant="filled"
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
                                  value={cab.data_plantacao !== null ? cab.data_plantacao : ""}
                                  onChange={onInputChage} />
                              </Stack>
                            </StyledTableCellCabecalho>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellCabecalho>
                              Produção Total:
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row" alignItems="center">
                                Esperada:
                                <CustomTextField
                                  name="produca_total"
                                  value={cab.produca_total}
                                  onChange={onInputChage}
                                  error={error_esperada}
                                  helperText={error_esperada ? message_apenas_numero : ""} />
                                Unidades / Ton/ha
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho colSpan={3}>
                              <Stack direction="row" alignItems="center">
                                Obtida:
                                <CustomTextField
                                  name="obtida"
                                  value={cab.obtida}
                                  onChange={onInputChage}
                                  error={error_obtida}
                                  helperText={error_obtida ? message_apenas_numero : ""} />
                                Unidades / Ton/ha
                              </Stack>
                            </StyledTableCellCabecalho>
                          </TableRow>
                        </>
                      ) : (
                        <>
                          <TableRow key={cab.id_registo_fertil_cabecalho}>
                            <StyledTableCellCabecalho>
                              <Stack direction="row">
                                Zona Homogénea:
                                <Typography style={{ fontSize: 14, paddingLeft: 10, }} >
                                  {cab.zona_homo}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row">
                                N.º Seq. Parcela
                                <Box margin={-1} padding={0}>
                                  <BasicPopover
                                    text={" N.º sequencial da parcela - Preencher com o n.º sequencial da parcela constante do iE do agricultor e anexar o respetivo iE. \nParcela é a área delimitada geograficamente com uma identificação única conforme registado no Sistema de Identificação Parcelar (iSIP).\nO iE é o documento de caraterização da exploração agrícola resultante da identificação das parcelas da exploração no iSIP; esta caraterização da exploração encontra-se no documento IFAP e nele consta o n.º sequencial da parcela ou baldio; n.º do parcelário; nome da parcela; área da parcela; IQFP, entre outros. "} />
                                </Box>
                                <Typography
                                  style={{
                                    fontFamily: "verdana",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 14,
                                  }}
                                >
                                  {cab.n_sequencia}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row">
                                Nº subparcela:
                                <Box margin={-1} padding={0}>
                                  <BasicPopover
                                    text={"Preencher com o n.º de subparcela constante no iE para a corresponde parcela com o n.º sequencial registado no campo anterior.\n\nEntende-se por Subparcela a área corresponde à porção contínua de terreno homogéneo com a mesma ocupação de solo existente numa mesma parcela e que consta do documento iE"} />
                                </Box>
                                <Typography
                                  style={{
                                    fontFamily: "verdana",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 14,
                                  }}
                                >
                                  {cab.n_subparcela}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row">
                                Área (ha):
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
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row">
                                Método de rega:
                                <Typography
                                  style={{
                                    fontFamily: "verdana",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 14,
                                  }}
                                >
                                  {cab.metodo_rega}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellCabecalho colSpan={5}>
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
                            </StyledTableCellCabecalho>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellCabecalho>
                              <Stack direction="row">
                                Compasso:
                                <Box margin={-1} padding={0}>
                                  <BasicPopover
                                    text={"Preencher apenas para cultura permanente."} />
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
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row">
                                Porta-enxerto:
                                <Box margin={-1} padding={0}>
                                  <BasicPopover
                                    text={"Preencher apenas para cultura permanente."} />
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
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
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
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho colSpan={2}>
                              <Stack direction="row">
                                Data de plantação:
                                <Box margin={-1} padding={0}>
                                  <BasicPopover
                                    text={"Preencher apenas para cultura permanente."} />
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
                            </StyledTableCellCabecalho>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellCabecalho>
                              Produção Total:
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
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
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho colSpan={3}>
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
                            </StyledTableCellCabecalho>
                          </TableRow>
                        </>
                      )}
                    </TableBody>
                  </React.Fragment>
                );
              return null;
            })}

          </Table>

        </TableContainer>
      </CustomThemeProvider>
    </form>
  );
};
