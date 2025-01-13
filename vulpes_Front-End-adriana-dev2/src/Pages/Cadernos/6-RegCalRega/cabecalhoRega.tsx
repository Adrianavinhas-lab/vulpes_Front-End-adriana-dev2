import { ChangeEvent, SetStateAction, useState } from "react";

import { Box, Button, TableHead, TextField, Toolbar, Typography, styled, } from "@mui/material";
import { Table, TableBody } from "@mui/material";
import { Paper, Stack } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableRow, TableCell } from "@mui/material";

import {
  CustomTextField,
  CustomThemeProvider,
} from "../../../Styles/theme/customThemeprovider";
import { ICabecalho } from "../../../Interfaces/cadernos/caderno6";
import BasicPopover from "../../../Components/Popover";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
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

interface ICabecalhoFormProps {
  cabecalhos: ICabecalho[];
  updateCreateCabecalho: () => void;
  setCabecalhos: React.Dispatch<SetStateAction<ICabecalho[]>>;
  onSaveEditCabecalho: (callback: () => void) => void;
  handleSelectZona: (index: number, id: number) => void;
  selectedIndex: number | null;
}

export const CabecalhoRegaForm: React.FC<ICabecalhoFormProps> = ({
  cabecalhos,
  updateCreateCabecalho,
  setCabecalhos,
  onSaveEditCabecalho,
  handleSelectZona,
  selectedIndex,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [createcabecalho, setCreateCabecalho] = useState(false);

  const message_apenas_numero = ("Apenas números são aceites");

  const [error_area, set_error_area] = useState<boolean>(false);
  const [error_esperada, set_error_esperada] = useState<boolean>(false);
  const [error_obtida, set_error_obtida] = useState<boolean>(false);
  const [error_n_sequencia, set_error_n_sequencia] = useState<boolean>(false);
  const [error_n_subparcela, set_error_n_subparcela] = useState<boolean>(false);
  const [error_n_contador, set_error_n_contador] = useState<boolean>(false);
  const [error_leitura_contador_1, set_error_leitura_contador_1] = useState<boolean>(false);

  /********************** CABEÇALHO **************************/
  // EDITAR
  const handleEdit = (id: number) => {
    setEditingId(id);
    setCreateCabecalho(true);
  };

  const onEditChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    let newvalue: any = value;

    if (type === "date" && value === "") {
      newvalue = null;
    }

    if (name === "area") {
      if (isNaN(Number(value))) {
        set_error_area(true);
        return;
      } else {
        set_error_area(false);
      }
    }
    if (name === "n_sequencia") {
      if (isNaN(Number(value))) {
        set_error_n_sequencia(true);
        return;
      } else {
        set_error_n_sequencia(false);
      }
    }
    if (name === "n_subparcela") {
      if (isNaN(Number(value))) {
        set_error_n_subparcela(true);
        return;
      } else {
        set_error_n_subparcela(false);
      }
    }
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
    if (name === "n_contador") {
      if (isNaN(Number(value))) {
        set_error_n_contador(true);
        return;
      } else {
        set_error_n_contador(false);
      }
    }
    if (name === "leitura_contador_1") {
      if (isNaN(Number(value))) {
        set_error_leitura_contador_1(true);
        return;
      } else {
        set_error_leitura_contador_1(false);
      }
    }

    if (selectedIndex !== null) {
      const idCabecalhoToEdit = cabecalhos[selectedIndex].id_horario_rega;
      const updatedCabecalhos = cabecalhos.map((cab) => {
        if (cab.id_horario_rega === idCabecalhoToEdit) {
          return {
            ...cab,
            [name]: newvalue,
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
              onClick={() => handleSelectZona(index, zona.id_horario_rega)}
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
            <TableHead>
              <TableRow>
                <StyledTableCell
                  colSpan={5}
                  sx={{ fontWeight: 700, fontSize: 18 }}
                >
                  6 - Registo calendário rega
                  <BasicPopover
                    text={
                      "Registo obrigatório para a intervenção Uso Eficiente da Água. Registo diário de frequência semanal.\n\nNo preenchimento do calendário de rega, o beneficiário deve ter em atenção:\ni. Caso uma zona homogénea inclua apenas uma cultura, poderá ser preenchido apenas um calendário de rega, que será repetido para cada contador envolvido nessa zona;\nii. Caso uma zona homogénea inclua diversas culturas, terão que ser preenchidos tantos calendários de rega quantas as culturas e quantos os contadores."
                    }
                  />
                </StyledTableCell>
              </TableRow>
            </TableHead>

            {/* <TableRow>
                {cabecalhos.map((cab, j) => {
                  if (j === selectedIndex)
                    return (
                    <>
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
                            {selectedIndex !== null &&
                              cabecalhos[selectedIndex].zona_homo}
                          </Typography>
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <BarraDeFerramentas
                            mostrarBotaoNovo
                            textoGravar="Criar Cabeçalho"
                            aoClicarNovo={() => setCreateCabecalho(true)}
                          />
                        </Box>
                      </StyledTableCell>
                    </>)
                })
                }
              </TableRow> */}

            {cabecalhos.map((cab, j) => {
              if (j === selectedIndex)
                return (
                  <TableBody key={j}>
                    {editingId === cab.id_horario_rega &&
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
                        <TableRow key={cab.id_horario_rega}>
                          <StyledTableCell>
                            Zona Homogénea:
                            <CustomTextField
                              name="zona_homo"
                              value={cab.zona_homo}
                              onChange={onEditChange}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            Nº Seq. Parcela:
                            <CustomTextField
                              name="n_sequencia"
                              value={cab.n_sequencia}
                              onChange={onEditChange}
                              error={error_n_sequencia}
                              helperText={error_n_sequencia ? message_apenas_numero : ""}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            Nº subparcela:
                            <CustomTextField
                              name="n_subparcela"
                              value={cab.n_subparcela}
                              onChange={onEditChange}
                              error={error_n_subparcela}
                              helperText={error_n_subparcela ? message_apenas_numero : ""}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            Área (ha):
                            <CustomTextField
                              name="area"
                              value={cab.area}
                              onChange={onEditChange}
                              error={error_area}
                              helperText={error_area ? message_apenas_numero : ""}
                            />
                          </StyledTableCell>

                          <StyledTableCell>
                            Cenário Climático:
                            <CustomTextField
                              name="cenario_cli"
                              value={cab.cenario_cli}
                              onChange={onEditChange}
                            />
                          </StyledTableCell>
                        </TableRow>
                        <TableRow>
                          <StyledTableCell>
                            Cultura:
                            <CustomTextField
                              name="cultura"
                              value={cab.cultura}
                              onChange={onEditChange}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            Data sementeira ou plantação:
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
                              name="data_sementeira"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={
                                cab.data_sementeira
                                  ? cab.data_sementeira
                                  : ""
                              }
                              onChange={onEditChange}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            Nº do contador:
                            <CustomTextField
                              name="n_contador"
                              value={cab.n_contador}
                              onChange={onEditChange}
                              error={error_n_contador}
                              helperText={error_n_contador ? message_apenas_numero : ""}
                            />
                          </StyledTableCell>
                          <StyledTableCell colSpan={2}>
                            Leitura do contador antes da 1ª rega (m3):
                            <CustomTextField
                              name="leitura_contador_1"
                              value={cab.leitura_contador_1}
                              onChange={onEditChange}
                              error={error_leitura_contador_1}
                              helperText={error_leitura_contador_1 ? message_apenas_numero : ""}
                            />
                          </StyledTableCell>
                        </TableRow>
                        <TableRow>
                          <StyledTableCell>
                            Produção Total:
                          </StyledTableCell>
                          <StyledTableCell>
                            Esperada:
                            <CustomTextField
                              name="produca_total"
                              value={cab.produca_total}
                              onChange={onEditChange}
                              error={error_esperada}
                              helperText={error_esperada ? message_apenas_numero : ""}
                            />
                            Unidades / Ton/ha
                          </StyledTableCell>
                          <StyledTableCell colSpan={3}>
                            Obtida:
                            <CustomTextField
                              name="obtida"
                              value={cab.obtida}
                              onChange={onEditChange}
                              error={error_obtida}
                              helperText={error_obtida ? message_apenas_numero : ""}
                            />
                            Unidades / Ton/ha
                          </StyledTableCell>
                        </TableRow>
                      </>
                    ) : (
                      <>
                        <TableRow>
                          <StyledTableCell colSpan={8}>
                            <Stack
                              direction="row"
                              sx={{ justifyContent: "end" }}
                            >
                              <ButtonCadernos
                                mostrarBotaoEditar
                                aoClicarEditar={() =>
                                  handleEdit(cab.id_horario_rega)
                                }
                              />
                            </Stack>
                          </StyledTableCell>
                        </TableRow>
                        <TableRow key={cab.id_horario_rega}>
                          <StyledTableCell>
                            <Stack direction="row">
                              Zona Homogénea:
                              <Typography
                                style={{
                                  fontSize: 18,
                                  paddingLeft: 10,
                                }}
                              >
                                {cab.zona_homo}
                              </Typography>
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row">
                              Nº Seq. Parcela:
                              <Box margin={-1} padding={0}>
                                <BasicPopover
                                  text={
                                    " N.º sequencial da parcela - Preencher com o n.º sequencial da parcela constante do iE do agricultor e anexar o respetivo iE. \nParcela é a área delimitada geograficamente com uma identificação única conforme registado no Sistema de Identificação Parcelar (iSIP).\nO iE é o documento de caraterização da exploração agrícola resultante da identificação das parcelas da exploração no iSIP; esta caraterização da exploração encontra-se no documento IFAP e nele consta o n.º sequencial da parcela ou baldio; n.º do parcelário; nome da parcela; área da parcela; IQFP, entre outros. "
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
                                {cab.n_sequencia}
                              </Typography>
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row">
                              Nº subparcela:
                              <Box margin={-1} padding={0}>
                                <BasicPopover
                                  text={
                                    "Preencher com o n.º de subparcela constante no iE para a corresponde parcela com o n.º sequencial registado no campo anterior.\n\nEntende-se por Subparcela a área corresponde à porção contínua de terreno homogéneo com a mesma ocupação de solo existente numa mesma parcela e que consta do documento iE"
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
                                {cab.n_subparcela}
                              </Typography>
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell>
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
                          </StyledTableCell>

                          <StyledTableCell>
                            <Stack
                              direction="row"
                              justifyContent="start"
                            >
                              Cenário Climático:
                              <Box margin={-1} padding={0}>
                                <BasicPopover
                                  text={
                                    "Cenário A (médio ou semi-húmido) \nCenário B (seco)."
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
                                {cab.cenario_cli}
                              </Typography>
                            </Stack>
                          </StyledTableCell>
                        </TableRow>
                        <TableRow>
                          <StyledTableCell>
                            <Stack direction="row">
                              Cultura:
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
                          <StyledTableCell>
                            <Stack
                              direction="row"
                              justifyContent="start"
                            >
                              Data sementeira ou plantação:
                              <Box margin={-1} padding={0}>
                                <BasicPopover
                                  text={
                                    "Preencher apenas no caso\n de culturas temporárias."
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
                                {cab.data_sementeira}
                              </Typography>
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row">
                              Nº do contador:
                              <Typography
                                style={{
                                  fontFamily: "verdana",
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  fontSize: 14,
                                }}
                              >
                                {cab.n_contador}
                              </Typography>
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell colSpan={2}>
                            <Stack direction="row">
                              Leitura do contador antes da 1ª rega (m3):
                              <Typography
                                style={{
                                  fontFamily: "verdana",
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  fontSize: 14,
                                }}
                              >
                                {cab.leitura_contador_1}
                              </Typography>
                            </Stack>
                          </StyledTableCell>
                        </TableRow>
                        <TableRow>
                          <StyledTableCell>
                            Produção Total:
                          </StyledTableCell>
                          <StyledTableCell>
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
                          <StyledTableCell colSpan={3}>
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
                  </TableBody>
                );
              return null;
            })}

          </Table>

        </TableContainer>
      </CustomThemeProvider>
    </form>
  );
};
