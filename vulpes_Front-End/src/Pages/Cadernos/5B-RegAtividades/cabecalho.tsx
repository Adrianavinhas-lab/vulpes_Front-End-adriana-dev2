import React, { ChangeEvent, SetStateAction } from "react";
import { useState } from "react";

import {
  Box, Button, Table, TableBody, TableHead, TableRow, TextField, Toolbar, Typography, styled,
} from "@mui/material";
import { TableContainer } from "@mui/material";
import { Paper, Stack } from "@mui/material";

import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { CustomTextField, CustomThemeProvider, } from "../../../Styles/theme/customThemeprovider";
import BasicPopover from "../../../Components/Popover";
import { ICabecalho5B } from "../../../Interfaces/cadernos/caderno5/interfaces5B";
import { StyledTableCellCabecalho } from "../../../Styles/tabelCellStyled/customTableCell";


export interface ICabecalhoFormProps {
  cabecalhos: ICabecalho5B[];
  setCabecalhos: React.Dispatch<SetStateAction<ICabecalho5B[]>>;
  updateCreateCabecalho: () => void;
  onSaveEditCabecalho: (callback: () => void) => void;
  handleSelectZona: (index: number, id: number) => void;
  selectedIndex: number | null;
}

export const CabecalhoForm: React.FC<ICabecalhoFormProps> = ({
  cabecalhos,
  setCabecalhos,
  updateCreateCabecalho,
  onSaveEditCabecalho,
  handleSelectZona,
  selectedIndex,

}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [createcabecalho, setCreateCabecalho] = useState(false);

  // const [error_area, set_error_area] = useState<boolean>(false);
  // const [error_n_sequencia, set_error_n_sequencia] = useState<boolean>(false);
  // const [error_n_subparcela, set_error_n_subparcela] = useState<boolean>(false);
  const [error_esperada, set_error_esperada] = useState<boolean>(false);
  const [error_obtida, set_error_obtida] = useState<boolean>(false);
  const [error_profundidade, set_error_profundidade] = useState<boolean>(false);
  const [error_n_amostras, set_error_n_amostras] = useState<boolean>(false);
  const message_apenas_numero = ("Apenas números são aceites");

  /********************** CABEÇALHO **************************/
  // EDITAR
  const handleEdit = (id: number) => {
    setEditingId(id);
    setCreateCabecalho(true);
  };

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type } = event.target;
    let newValue: any = value;

    if (type === "date" && value === "") {
      newValue = undefined;
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
    if (name === "esperada") {
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
    if (name === "profundidade") {
      if (isNaN(Number(value))) {
        set_error_profundidade(true);
        return;
      } else {
        set_error_profundidade(false);
      }
    }
    if (name === "n_amostras") {
      if (isNaN(Number(value))) {
        set_error_n_amostras(true);
        return;
      } else {
        set_error_n_amostras(false);
      }
    }

    if (selectedIndex !== null) {
      const idCabecalhoToEdit =
        cabecalhos[selectedIndex].id_registo_activi;
      const updatedCabecalhos = cabecalhos.map((cab) => {
        if (cab.id_registo_activi === idCabecalhoToEdit) {
          return {
            ...cab,
            [name]: newValue,
            id_registo_activ: cab.id_registo_activi,
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
              onClick={() => handleSelectZona(index, zona.id_registo_activi)}
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
                          colSpan={5}
                          sx={{ fontWeight: 700, fontSize: 18 }}
                        >
                          5B - Registo das atividades
                          <BasicPopover
                            text={"Registo obrigatório para as seguintes intervenções: Conservação do Solo - Sementeira Direta, Conservação do Solo - Enrelvamento, Apoio Zonal Peneda-Gerês - manutenção de socalcos, Apoio Zonal Montesinho-Nogueira - manutenção de rotação de sequeiro cereal-pousio, Apoio Zonal Douro Internacional, Sabor, Maçãs e Vale do Côa - manutenção de rotação de sequeiro cereal-pousio, Apoio Zonal Castro Verde, Vale do Guadiana, Piçarras e Cuba - manutenção de rotação de sequeiro cereal-pousio-pastagens temporárias naturais e Apoio Zonal Alto e Centro Alentejo - manutenção de rotação de sequeiro cereal-pousio-pastagens temporárias naturais, quando não há acumulação com AB e PRODI. \n\nPretende-se que o beneficiário registe qualquer intervenção na cultura e no solo, nomeadamente as datas e técnicas a aplicar nos cortes, na mobilização de pousios e a aplicação de fertilizantes, com base nos resultados dos boletins de análise e nas produções obtidas."} />
                        </StyledTableCellCabecalho>
                        <StyledTableCellCabecalho >
                          {editingId === cab.id_registo_activi && createcabecalho ?
                            <Stack direction="row" sx={{ justifyContent: "end" }}>
                              <ButtonCadernos
                                mostrarBotaoGravar
                                aoClicarGravar={() => onSaveEditCabecalho(updateCreateCabecalho)}
                                mostrarBotaoCancelar
                                aoClicarCancelar={() => setCreateCabecalho(false)} />
                            </Stack>
                            :
                            <Stack direction="row" sx={{ justifyContent: "end" }}>
                              <ButtonCadernos
                                mostrarBotaoEditar
                                aoClicarEditar={() => handleEdit(cab.id_registo_activi)} />
                            </Stack>
                          }
                        </StyledTableCellCabecalho>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {editingId === cab.id_registo_activi &&
                        createcabecalho &&
                        selectedIndex !== null ?
                        <>
                          <TableRow>
                            <StyledTableCellCabecalho>
                              <Stack direction="row" alignItems="center">
                                  Zona Homogénea:
                                  <CustomTextField
                                    name="zona_homo"
                                    value={cab.zona_homo}
                                    // onChange={onInputChange} 
                                    disabled
                                  />
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho colSpan={2}>
                              <Stack direction="row" alignItems="center">
                                Nº Seq. Parcela:
                                <CustomTextField
                                  name="n_sequencia"
                                  value={cab.n_sequencia}
                                  disabled
                                // onChange={onInputChange}
                                // error={error_n_sequencia}
                                // helperText={error_n_sequencia ? message_apenas_numero : ""} 
                                />
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho colSpan={2}>
                              <Stack direction="row" alignItems="center">
                                Nº subparcela:
                                <CustomTextField
                                  name="n_subparcela"
                                  value={cab.n_subparcela}
                                  disabled
                                // onChange={onInputChange}
                                // error={error_n_subparcela}
                                // helperText={error_n_subparcela ? message_apenas_numero : ""} 
                                />
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row" alignItems="center">
                                Área (ha):
                                <CustomTextField
                                  name="area"
                                  value={cab.area}
                                  disabled
                                // onChange={onInputChange}
                                // error={error_area}
                                // helperText={error_area ? message_apenas_numero : ""} 
                                />
                              </Stack>
                            </StyledTableCellCabecalho>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellCabecalho colSpan={2}>
                              <Stack direction="row" alignItems="center">
                                Cultura e variedade:
                                <CustomTextField
                                  name="cultura"
                                  value={cab.cultura}
                                  onChange={onInputChange} />
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              Produção Total:
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row" alignItems="center">
                                Esperada:
                                {/* <Stack direction="row" alignItems="center" paddingLeft={3} paddingRight={1}> */}
                                <CustomTextField
                                  name="esperada"
                                  value={cab.esperada}
                                  onChange={onInputChange}
                                  error={error_esperada}
                                  helperText={error_esperada ? message_apenas_numero : ""} />
                                Ton/ha
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho colSpan={2}>
                              <Stack direction="row" alignItems="center">
                                Obtida:
                                <CustomTextField
                                  name="obtida"
                                  value={cab.obtida}
                                  onChange={onInputChange}
                                  error={error_obtida}
                                  helperText={error_obtida ? message_apenas_numero : ""} />
                                Ton/ha
                              </Stack>
                            </StyledTableCellCabecalho>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellCabecalho>
                              Análise de terras
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              Data da colheita de terras:
                              <TextField
                                variant="filled"
                                type="date"
                                inputProps={{
                                  style: {
                                    fontSize: 12,
                                    fontFamily: "verdana",
                                  },
                                }}
                                name="data"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                value={cab.data || ""}
                                onChange={onInputChange} />
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row" alignItems="center">
                                Profundidade da colheita da amostra (cm):
                                <CustomTextField
                                  name="profundidade"
                                  value={cab.profundidade}
                                  onChange={onInputChange}
                                  error={error_profundidade}
                                  helperText={error_profundidade ? message_apenas_numero : ""} />
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              Data emissão resultados:
                              <TextField
                                variant="filled"
                                type="date"
                                inputProps={{
                                  style: {
                                    fontSize: 12,
                                    fontFamily: "verdana",
                                  },
                                }}
                                name="data_emissao"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                value={cab.data_emissao || ""}
                                onChange={onInputChange} />
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row" alignItems="center">
                                N.º de amostras
                                <CustomTextField
                                  name="n_amostras"
                                  value={cab.n_amostras}
                                  onChange={onInputChange}
                                  error={error_n_amostras}
                                  helperText={error_n_amostras ? message_apenas_numero : ""} />
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row" alignItems="center">
                                N. do Boletim:
                                <CustomTextField
                                  name="n_boletim"
                                  value={cab.n_boletim}
                                  onChange={onInputChange} />
                              </Stack>
                            </StyledTableCellCabecalho>
                          </TableRow>
                        </>
                        :
                        <>
                          <TableRow>
                            <StyledTableCellCabecalho>
                              <Stack direction="row">
                                Zona Homogénea:
                                <Typography style={{ fontSize: 14, paddingLeft: 10, }} >
                                  {cab.zona_homo}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>ou</StyledTableCellCabecalho>
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
                                N.º Subparcela
                                <Box margin={-1} padding={0}>
                                  <BasicPopover text={"Preencher com o n.º de subparcela constante no iE para a corresponde parcela com o n.º sequencial registado no campo anterior.\n\nEntende-se por Subparcela a área corresponde à porção contínua de terreno homogéneo com a mesma ocupação de solo existente numa mesma parcela e que consta do documento iE"} />
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
                            <StyledTableCellCabecalho colSpan={2}>
                              <Stack direction="row">
                                Área (ha)
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
                          </TableRow>

                          <TableRow>
                            <StyledTableCellCabecalho>
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
                            <StyledTableCellCabecalho sx={{ textAlign: "center" }}>
                              Produção Total
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho colSpan={2}>
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
                                  {cab.esperada}
                                </Typography>
                                Ton/ha
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho colSpan={2}>
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
                                Ton/ha
                              </Stack>
                            </StyledTableCellCabecalho>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellCabecalho>
                              Análise de terras
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho >
                              Data da colheita
                              <Stack direction="row">
                                de terras:
                                <Typography
                                  style={{
                                    fontFamily: "verdana",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 14,
                                  }}
                                >
                                  {cab.data}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>

                            <StyledTableCellCabecalho >
                              Profundidade da colheita
                              <Stack direction="row">
                                da amostra (cm):
                                <Typography
                                  style={{
                                    fontFamily: "verdana",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 14,
                                  }}
                                >
                                  {cab.profundidade}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>

                            <StyledTableCellCabecalho >
                              Data emissão
                              <Stack direction="row">
                                resultados:
                                <Typography
                                  style={{
                                    fontFamily: "verdana",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 14,
                                  }}
                                >
                                  {cab.data_emissao}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>

                            <StyledTableCellCabecalho >
                              <Stack direction="row">
                                N.º de amostras
                                <Typography
                                  style={{
                                    fontFamily: "verdana",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 14,
                                  }}
                                >
                                  {cab.n_amostras}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>

                            <StyledTableCellCabecalho >
                              <Stack direction="row">
                                N.º do Boletim:
                                <Typography
                                  style={{
                                    fontFamily: "verdana",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 14,
                                  }}
                                >
                                  {cab.n_boletim}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>
                          </TableRow>
                        </>}
                    </TableBody>
                  </React.Fragment>
                );
            })}

          </Table>
        </TableContainer>
      </CustomThemeProvider>
    </form>
  );
};
