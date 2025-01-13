import React from "react";
import { ChangeEvent, useState } from "react";

import { Box, Checkbox, FormControlLabel, FormGroup, SelectChangeEvent, Snackbar, Stack, Typography, } from "@mui/material";
import { Paper, TableBody } from "@mui/material";
import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { StyledTableCell, StyledTableHead, } from "../../../Styles/tabelCellStyled/customTableCell";
import { CustomSelect, CustomTextField, CustomThemeProvider, } from "../../../Styles/theme/customThemeprovider";
import BasicPopover from "../../../Components/Popover";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import { del } from "../../../Services/tokenConfig";
import { func_print } from "../../../Func_genericas/func_print";
import { IAnaliseTerras } from "../../../Interfaces/cadernos/caderno5/interfaces5B";
import { classeFertilizacao } from "../../../informacao_estatica";

interface IAnaliseTerrasProps {
  rows: IAnaliseTerras[];
  tabelaTerra: IAnaliseTerras | undefined;
  updateCreateTable: () => void;
  setTabelaTerra: React.Dispatch<React.SetStateAction<IAnaliseTerras | undefined>>;
  setRowsTabelaTerra: React.Dispatch<React.SetStateAction<IAnaliseTerras[]>>;
  onSaveTabela: (callback: () => void) => void;
  onEditTabela: (callback: () => void) => void;
  setEditingId: React.Dispatch<React.SetStateAction<number | null | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSnackSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSnackError: React.Dispatch<React.SetStateAction<boolean>>;
  setEditRow: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  editingId: number | null | undefined;
  editRow: boolean;
}

export const AnaliseTerrasForm: React.FC<IAnaliseTerrasProps> = ({
  tabelaTerra,
  rows,
  updateCreateTable,
  setTabelaTerra,
  setRowsTabelaTerra,
  onSaveTabela,
  onEditTabela,
  setEditingId,
  setIsLoading,
  setOpenSnackSuccess,
  setOpenSnackError,
  setEditRow,
  setMessage,
  editingId,
  editRow,
}) => {
  const [createTable, setCreateTable] = useState(false);
  const message_apenas_numero = ("Apenas números são aceites");
  const [idToDelete, setIdToDelete] = useState<number | null | undefined>(0);
  const [openDeleteAnalise, setOpenDeleteAnalise] = React.useState(false);

  const [error_percentagem_camp1, set_error_percentagem_camp1] = useState<boolean>(false);
  const [error_percentagem_camp2, set_error_percentagem_camp2] = useState<boolean>(false);
  const [error_percentagem_camp3, set_error_percentagem_camp3] = useState<boolean>(false);
  const [error_percentagem_camp4, set_error_percentagem_camp4] = useState<boolean>(false);
  const [error_percentagem_camp5, set_error_percentagem_camp5] = useState<boolean>(false);
  const [error_percentagem_camp6, set_error_percentagem_camp6] = useState<boolean>(false);
  const [error_Resultados_analicesPH, set_error_Resultados_analicesPH] = useState<boolean>(false);
  const [error_Resultados_analicesMO, set_error_Resultados_analicesMO] = useState<boolean>(false);
  const [error_deduzir_cálculo, set_error_deduzir_cálculo] = useState<boolean>(false);


  const onInputChange = (event: any) => {
    const { name, value, type } = event.target;
    let aux_obj_anexo: any = tabelaTerra === undefined ? {} : tabelaTerra
    let newValue = value;

    if (type === "checkbox") {
      aux_obj_anexo[name] = aux_obj_anexo[name] === undefined ? true : !aux_obj_anexo[name]
      setTabelaTerra(aux_obj_anexo)

    } else {
      if (name === "percentagem_camp1") {
        if (isNaN(Number(value))) {
          set_error_percentagem_camp1(true);
          newValue = value.replace(/[^0-9]/g, "");
        } else {
          set_error_percentagem_camp1(false);
        }
      }
      if (name === "percentagem_camp2") {
        if (isNaN(Number(value))) {
          newValue = value.replace(/[^0-9]/g, "");
          set_error_percentagem_camp2(true);
        } else {
          set_error_percentagem_camp2(false);
        }
      }
      if (name === "percentagem_camp3") {
        if (isNaN(Number(value))) {
          newValue = value.replace(/[^0-9]/g, "");
          set_error_percentagem_camp3(true);
        } else {
          set_error_percentagem_camp3(false);
        }
      }
      if (name === "percentagem_camp4") {
        if (isNaN(Number(value))) {
          newValue = value.replace(/[^0-9]/g, "");
          set_error_percentagem_camp4(true);
        } else {
          set_error_percentagem_camp4(false);
        }
      }
      if (name === "percentagem_camp5") {
        if (isNaN(Number(value))) {
          newValue = value.replace(/[^0-9]/g, "");
          set_error_percentagem_camp5(true);
        } else {
          set_error_percentagem_camp5(false);
        }
      }
      if (name === "percentagem_camp6") {
        if (isNaN(Number(value))) {
          newValue = value.replace(/[^0-9]/g, "");
          set_error_percentagem_camp6(true);
        } else {
          set_error_percentagem_camp6(false);
        }
      }
      if (name === "Resultados_analicesMO") {
        if (isNaN(Number(value))) {
          newValue = value.replace(/[^0-9]/g, "");
          set_error_Resultados_analicesMO(true);
        } else {
          set_error_Resultados_analicesMO(false);
        }
      }
      if (name === "Resultados_analicesPH") {
        if (isNaN(Number(value))) {
          newValue = value.replace(/[^0-9]/g, "");
          set_error_Resultados_analicesPH(true);
        } else {
          set_error_Resultados_analicesPH(false);
        }
      }
      if (name === "deduzir_cálculo") {
        if (isNaN(Number(value))) {
          newValue = value.replace(/[^0-9]/g, "");
          set_error_deduzir_cálculo(true);
        } else {
          set_error_deduzir_cálculo(false);
        }
      }

      setTabelaTerra((prevAnaliseTerrras: any) => ({
        ...prevAnaliseTerrras,
        [name]: newValue,
      }));

    }

  };

  // EDITAR
  const handleEdit = (id: number | null | undefined) => {
    setEditingId(id);
    setEditRow(true);
  };

  const onInputChange_editar = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    const newValue = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;

    if (name === "percentagem_camp1") {
      if (isNaN(Number(value))) {
        set_error_percentagem_camp1(true);
        return;
      } else {
        set_error_percentagem_camp1(false);
      }
    }
    if (name === "percentagem_camp2") {
      if (isNaN(Number(value))) {
        set_error_percentagem_camp2(true);
        return;
      } else {
        set_error_percentagem_camp2(false);
      }
    }
    if (name === "percentagem_camp3") {
      if (isNaN(Number(value))) {
        set_error_percentagem_camp3(true);
        return;
      } else {
        set_error_percentagem_camp3(false);
      }
    }
    if (name === "percentagem_camp4") {
      if (isNaN(Number(value))) {
        set_error_percentagem_camp4(true);
        return;
      } else {
        set_error_percentagem_camp4(false);
      }
    }
    if (name === "percentagem_camp5") {
      if (isNaN(Number(value))) {
        set_error_percentagem_camp5(true);
        return;
      } else {
        set_error_percentagem_camp5(false);
      }
    }
    if (name === "percentagem_camp6") {
      if (isNaN(Number(value))) {
        set_error_percentagem_camp6(true);
        return;
      } else {
        set_error_percentagem_camp6(false);
      }
    }
    if (name === "Resultados_analicesMO") {
      if (isNaN(Number(value))) {
        set_error_Resultados_analicesMO(true);
        return;
      } else {
        set_error_Resultados_analicesMO(false);
      }
    }
    if (name === "Resultados_analicesPH") {
      if (isNaN(Number(value))) {
        set_error_Resultados_analicesPH(true);
        return;
      } else {
        set_error_Resultados_analicesPH(false);
      }
    }
    if (name === "deduzir_cálculo") {
      if (isNaN(Number(value))) {
        set_error_deduzir_cálculo(true);
        return;
      } else {
        set_error_deduzir_cálculo(false);
      }
    }

    if (editingId !== null) {
      const updatedTable = rows.map((tab) => {
        if (tab.id_registo_analise === editingId) {
          return {
            ...tab,
            [name]: newValue,
          };
        }
        return tab;
      });
      setRowsTabelaTerra(updatedTable);
    }
  };
  // Delete
  const handleClickOpenDelete = (id: number | null | undefined) => {
    setIdToDelete(id);
    setOpenDeleteAnalise(true);
  };

  const handleDeleteAnalise = async () => {
    try {
      setIsLoading(true);
      let res = await del(`/delete__reg_actividades/${idToDelete}`);

      if (res.status === 200) {
        setMessage("Registo eliminado com sucesso!");
        setOpenDeleteAnalise(false);
        setIdToDelete(null);
        setRowsTabelaTerra((oldRows) => [
          ...oldRows.filter((oldRow) => oldRow.id_registo_analise !== idToDelete),
        ]);
        setOpenSnackSuccess(true);
      } else {
        setMessage("Erro ao eliminar o registo!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleDeleteAnalise", error, true);
      setMessage("Erro ao eliminar o registo!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  return (
    <>
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
                {rows.length <= 0 && (
                  <TableCell
                    colSpan={9}
                    sx={{
                      fontWeight: 600,
                      textAlign: "left",
                      fontFamily: "candara",
                      fontSize: 18,
                    }}
                  >
                    Resultados das análises da Terra
                  </TableCell>
                )}

                {rows.length <= 0 && createTable === false ? (
                  <TableCell>
                    <Stack direction="row" justifyContent="end">
                      <BarraDeFerramentas
                        mostrarBotaoNovo
                        textoBotaoNovo="Registar"
                        aoClicarNovo={() => setCreateTable(true)}
                      />
                    </Stack>
                  </TableCell>
                ) : (
                  createTable === true && (
                    <TableCell>
                      <ButtonCadernos
                        mostrarBotaoCancelar
                        aoClicarCancelar={() => setCreateTable(false)}
                        mostrarBotaoGravar
                        aoClicarGravar={() => onSaveTabela(updateCreateTable)}
                      />
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            {rows.length <= 0 && createTable === true ?
              <TableBody>
                <TableRow>
                  <StyledTableHead colSpan={2}>
                    Elemento / nutriente
                  </StyledTableHead>
                  <StyledTableHead>N</StyledTableHead>
                  <StyledTableHead>P2O5</StyledTableHead>
                  <StyledTableHead>K2O</StyledTableHead>
                  <StyledTableHead>Mg</StyledTableHead>
                  <StyledTableHead sx={{ minWidth: "50%" }}></StyledTableHead>
                  <StyledTableHead></StyledTableHead>
                  <StyledTableHead>ph(H2O)</StyledTableHead>
                  <StyledTableHead>M.O.(%)</StyledTableHead>
                </TableRow>
                <TableRow>
                  <StyledTableHead rowSpan={3}>
                    Resultado das análises
                  </StyledTableHead>
                  <StyledTableHead>mg/kg</StyledTableHead>
                  <StyledTableCell>
                    <CustomTextField
                      name="mg_camp1"
                      value={tabelaTerra?.mg_camp1}
                      onChange={onInputChange}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="mg_camp2"
                      value={tabelaTerra?.mg_camp2}
                      onChange={onInputChange}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="mg_camp3"
                      value={tabelaTerra?.mg_camp3}
                      onChange={onInputChange}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="mg_camp4"
                      value={tabelaTerra?.mg_camp4}
                      onChange={onInputChange}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="mg_camp5"
                      value={tabelaTerra?.mg_camp5}
                      onChange={onInputChange}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="mg_camp6"
                      value={tabelaTerra?.mg_camp6}
                      onChange={onInputChange}
                    />
                  </StyledTableCell>
                  <StyledTableCell rowSpan={2}>
                    <CustomTextField
                      name="Resultados_analicesPH"
                      value={tabelaTerra?.Resultados_analicesPH}
                      onChange={onInputChange}
                      error={error_Resultados_analicesPH}
                      helperText={error_Resultados_analicesPH ? message_apenas_numero : ""}
                    />
                  </StyledTableCell>
                  <StyledTableCell rowSpan={2}>
                    <CustomTextField
                      name="Resultados_analicesMO"
                      value={tabelaTerra?.Resultados_analicesMO}
                      onChange={onInputChange}
                      error={error_Resultados_analicesMO}
                      helperText={error_Resultados_analicesMO ? message_apenas_numero : ""}
                    />
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableHead>(%)</StyledTableHead>
                  <StyledTableCell>
                    <CustomTextField
                      name="percentagem_camp1"
                      value={tabelaTerra?.percentagem_camp1}
                      onChange={onInputChange}
                      error={error_percentagem_camp1}
                      helperText={error_percentagem_camp1 ? message_apenas_numero : ""}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="percentagem_camp2"
                      value={tabelaTerra?.percentagem_camp2}
                      onChange={onInputChange}
                      error={error_percentagem_camp2}
                      helperText={error_percentagem_camp2 ? message_apenas_numero : ""}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="percentagem_camp3"
                      value={tabelaTerra?.percentagem_camp3}
                      onChange={onInputChange}
                      error={error_percentagem_camp3}
                      helperText={error_percentagem_camp3 ? message_apenas_numero : ""}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="percentagem_camp4"
                      value={tabelaTerra?.percentagem_camp4}
                      onChange={onInputChange}
                      error={error_percentagem_camp4}
                      helperText={error_percentagem_camp4 ? message_apenas_numero : ""}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="percentagem_camp5"
                      value={tabelaTerra?.percentagem_camp5}
                      onChange={onInputChange}
                      error={error_percentagem_camp5}
                      helperText={error_percentagem_camp5 ? message_apenas_numero : ""}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="percentagem_camp6"
                      value={tabelaTerra?.percentagem_camp6}
                      onChange={onInputChange}
                      error={error_percentagem_camp6}
                      helperText={error_percentagem_camp6 ? message_apenas_numero : ""}
                    />
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableHead>Classe de fertilidade</StyledTableHead>
                  <StyledTableCell>
                    <CustomSelect
                      value={tabelaTerra?.fertilizacao_camp1 !== undefined ? tabelaTerra?.fertilizacao_camp1 : ""}
                      name="fertilizacao_camp1"
                      onChange={onInputChange}
                      options={classeFertilizacao}
                      label="Classe de fertilizante"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomSelect
                      value={tabelaTerra?.fertilizacao_camp2 !== undefined ? tabelaTerra?.fertilizacao_camp2 : ""}
                      name="fertilizacao_camp2"
                      onChange={onInputChange}
                      options={classeFertilizacao}
                      label="Classe de fertilizante"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomSelect
                      value={tabelaTerra?.fertilizacao_camp3 !== undefined ? tabelaTerra?.fertilizacao_camp3 : ""}
                      name="fertilizacao_camp3"
                      onChange={onInputChange}
                      options={classeFertilizacao}
                      label="Classe de fertilizante"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomSelect
                      value={tabelaTerra?.fertilizacao_camp4 !== undefined ? tabelaTerra?.fertilizacao_camp4 : ""}
                      name="fertilizacao_camp4"
                      onChange={onInputChange}
                      options={classeFertilizacao}
                      label="Classe de fertilizante"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomSelect
                      value={tabelaTerra?.fertilizacao_camp5 !== undefined ? tabelaTerra?.fertilizacao_camp5 : ""}
                      name="fertilizacao_camp5"
                      onChange={onInputChange}
                      options={classeFertilizacao}
                      label="Classe de fertilizante"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomSelect
                      value={tabelaTerra?.fertilizacao_camp6 !== undefined ? tabelaTerra?.fertilizacao_camp6 : ""}
                      name="fertilizacao_camp6"
                      onChange={onInputChange}
                      options={classeFertilizacao}
                      label="Classe de fertilizante"
                    />
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ backgroundColor: "lightgray" }}
                  ></StyledTableCell>
                  <StyledTableCell>
                    <CustomSelect
                      value={tabelaTerra?.fertilizacao_camp7 !== undefined ? tabelaTerra?.fertilizacao_camp7 : ""}
                      name="fertilizacao_camp7"
                      onChange={onInputChange_editar}
                      options={classeFertilizacao}
                      label="Classe de fertilizante"
                    />
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableHead colSpan={2}>
                    A deduzir no cálculo da fertilização azotada (kg/ha)
                  </StyledTableHead>
                  <StyledTableCell>
                    <CustomTextField
                      name="deduzir_cálculo"
                      value={tabelaTerra?.deduzir_cálculo}
                      onChange={onInputChange}
                      error={error_deduzir_cálculo}
                      helperText={error_deduzir_cálculo ? message_apenas_numero : ""}
                    />
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ backgroundColor: "lightgray" }}
                    colSpan={7}
                  ></StyledTableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>
                    Quando são disponibilizados resultados analíticos referentes
                    ao teor de azoto do solo, identificar se este corresponde a:
                  </TableCell>
                  <TableCell colSpan={2}>
                    <FormControlLabel
                      name="azoto_mineral"
                      label={
                        <Typography fontFamily="candara" fontSize={14}>
                          Azoto mineral
                        </Typography>
                      }
                      control={
                        <Checkbox
                          checked={tabelaTerra?.azoto_mineral}
                          sx={{
                            color: "#aaaaaa",
                            "&.Mui-checked": {
                              color: "#C94F1E",
                            },
                          }}
                          onChange={onInputChange}
                        />
                      }
                    />
                  </TableCell>
                  <TableCell colSpan={2}>
                    <FormControlLabel
                      name="azoto_nitrico"
                      label={
                        <Typography fontFamily="candara" fontSize={14}>
                          Azoto nítrico
                        </Typography>
                      }
                      aria-readonly
                      control={
                        <Checkbox
                          checked={tabelaTerra?.azoto_nitrico ?? false}
                          sx={{
                            color: "#aaaaaa",
                            "&.Mui-checked": {
                              color: "#C94F1E",
                            },
                          }}
                          onChange={onInputChange}
                        />
                      }
                    />
                  </TableCell>
                  <TableCell colSpan={2}>
                    <FormControlLabel
                      name="azoto_total"
                      label={
                        <Typography fontFamily="candara" fontSize={14}>
                          Azoto total
                        </Typography>
                      }
                      aria-readonly
                      control={
                        <Checkbox

                          checked={tabelaTerra?.azoto_total || false}
                          sx={{
                            color: "#aaaaaa",
                            "&.Mui-checked": {
                              color: "#C94F1E",
                            },
                          }}
                          onChange={onInputChange}
                        />
                      }
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
              :
              rows.length <= 0 &&
              <TableBody>
                <TableRow>
                  <StyledTableHead colSpan={2}>
                    Elemento / nutriente
                  </StyledTableHead>
                  <StyledTableHead>N</StyledTableHead>
                  <StyledTableHead>P2O5</StyledTableHead>
                  <StyledTableHead>K2O</StyledTableHead>
                  <StyledTableHead>Mg</StyledTableHead>
                  <StyledTableHead sx={{ minWidth: "50%" }}></StyledTableHead>
                  <StyledTableHead></StyledTableHead>
                  <StyledTableHead>ph(H2O)</StyledTableHead>
                  <StyledTableHead>M.O.(%)</StyledTableHead>
                </TableRow>
                <TableRow>
                  <StyledTableHead rowSpan={3}>
                    Resultado das análises
                  </StyledTableHead>
                  <StyledTableHead>mg/kg</StyledTableHead>
                  <StyledTableCell>
                  </StyledTableCell>
                  <StyledTableCell>

                  </StyledTableCell>
                  <StyledTableCell>
                  </StyledTableCell>
                  <StyledTableCell> </StyledTableCell>
                  <StyledTableCell> </StyledTableCell>
                  <StyledTableCell> </StyledTableCell>
                  <StyledTableCell rowSpan={2}> </StyledTableCell>
                  <StyledTableCell rowSpan={2}> </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableHead>(%)</StyledTableHead>
                  <StyledTableCell> </StyledTableCell>
                  <StyledTableCell> </StyledTableCell>
                  <StyledTableCell>  </StyledTableCell>
                  <StyledTableCell> </StyledTableCell>
                  <StyledTableCell> </StyledTableCell>
                  <StyledTableCell> </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableHead>Classe de fertilidade</StyledTableHead>
                  <StyledTableCell>  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell> </StyledTableCell>
                  <StyledTableCell>  </StyledTableCell>
                  <StyledTableCell> </StyledTableCell>
                  <StyledTableCell> </StyledTableCell>
                  <StyledTableCell sx={{ backgroundColor: "lightgray" }} ></StyledTableCell>
                  <StyledTableCell>  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableHead colSpan={2}>
                    A deduzir no cálculo da fertilização azotada (kg/ha)
                  </StyledTableHead>
                  <StyledTableCell> </StyledTableCell>
                  <StyledTableCell
                    sx={{ backgroundColor: "lightgray" }}
                    colSpan={7}
                  ></StyledTableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>
                    Quando são disponibilizados resultados analíticos referentes
                    ao teor de azoto do solo, identificar se este corresponde a:
                  </TableCell>
                  <TableCell colSpan={2}>
                    <FormControlLabel
                      label={
                        <Typography fontFamily="candara" fontSize={14}>
                          Azoto mineral
                        </Typography>
                      }
                      aria-readonly
                      control={
                        <Checkbox
                          sx={{
                            color: "#aaaaaa",
                            "&.Mui-checked": {
                              color: "#C94F1E",
                            },
                          }}
                        />
                      }
                    />
                  </TableCell>
                  <TableCell colSpan={2}>
                    <FormControlLabel
                      label={
                        <Typography fontFamily="candara" fontSize={14}>
                          Azoto nítrico
                        </Typography>
                      }
                      aria-readonly
                      control={
                        <Checkbox
                          sx={{
                            color: "#aaaaaa",
                            "&.Mui-checked": {
                              color: "#C94F1E",
                            },
                          }}
                        />
                      }
                    />
                  </TableCell>
                  <TableCell colSpan={2}>
                    <FormControlLabel
                      label={
                        <Typography fontFamily="candara" fontSize={14}>
                          Azoto total
                        </Typography>
                      }
                      aria-readonly
                      control={
                        <Checkbox
                          sx={{
                            color: "#aaaaaa",
                            "&.Mui-checked": {
                              color: "#C94F1E",
                            },
                          }}
                        />
                      }
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            }

            {rows.map((table, key) => {
              return (
                <TableBody key={key}>
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      sx={{
                        fontWeight: 600,
                        textAlign: "left",
                        fontFamily: "candara",
                        fontSize: 18,
                      }}
                    >
                      Resultados das análises da Terra
                    </TableCell>
                    {rows.length > 0 && editRow === false ? (
                      <TableCell>
                        <ButtonCadernos
                          mostrarBotaoEditar
                          aoClicarEditar={() =>
                            handleEdit(table.id_registo_analise)
                          }
                          mostrarBotaoApagar
                          aoClicarApagar={() =>
                            handleClickOpenDelete(table.id_registo_analise)
                          }
                        />
                      </TableCell>
                    ) : (
                      editRow === true && (
                        <TableCell>
                          <ButtonCadernos
                            mostrarBotaoGravar
                            aoClicarGravar={() =>
                              onEditTabela(updateCreateTable)
                            }
                            mostrarBotaoCancelar
                            aoClicarCancelar={() => setEditRow(false)}
                          />
                        </TableCell>
                      )
                    )}
                  </TableRow>
                  {editingId === table.id_registo_analise &&
                    editRow === true ?
                    <>
                      <TableRow>
                        <StyledTableHead colSpan={2}>
                          Elemento / nutriente
                        </StyledTableHead>
                        <StyledTableHead>N</StyledTableHead>
                        <StyledTableHead>P2O5</StyledTableHead>
                        <StyledTableHead>K2O</StyledTableHead>
                        <StyledTableHead>Mg</StyledTableHead>
                        <StyledTableHead
                          sx={{ minWidth: "50%" }}
                        ></StyledTableHead>
                        <StyledTableHead></StyledTableHead>
                        <StyledTableHead>ph(H2O)</StyledTableHead>
                        <StyledTableHead>M.O.(%)</StyledTableHead>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead rowSpan={3}>
                          Resultado das análises
                        </StyledTableHead>
                        <StyledTableHead>mg/kg</StyledTableHead>
                        <StyledTableCell>
                          <CustomTextField
                            name="mg_camp1"
                            value={table.mg_camp1}
                            onChange={onInputChange_editar}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="mg_camp2"
                            value={table.mg_camp2}
                            onChange={onInputChange_editar}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="mg_camp3"
                            value={table.mg_camp3}
                            onChange={onInputChange_editar}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="mg_camp4"
                            value={table.mg_camp4}
                            onChange={onInputChange_editar}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="mg_camp5"
                            value={table.mg_camp5}
                            onChange={onInputChange_editar}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="mg_camp6"
                            value={table.mg_camp6}
                            onChange={onInputChange_editar}
                          />
                        </StyledTableCell>
                        <StyledTableCell rowSpan={2}>
                          <CustomTextField
                            name="Resultados_analicesPH"
                            value={table.Resultados_analicesPH}
                            onChange={onInputChange_editar}
                            error={error_Resultados_analicesPH}
                            helperText={error_Resultados_analicesPH ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell rowSpan={2}>
                          <CustomTextField
                            name="Resultados_analicesMO"
                            value={table.Resultados_analicesMO}
                            onChange={onInputChange_editar}
                            error={error_Resultados_analicesMO}
                            helperText={error_Resultados_analicesMO ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead>(%)</StyledTableHead>
                        <StyledTableCell>
                          <CustomTextField
                            name="percentagem_camp1"
                            value={table.percentagem_camp1}
                            onChange={onInputChange_editar}
                            error={error_percentagem_camp1}
                            helperText={error_percentagem_camp1 ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="percentagem_camp2"
                            value={table.percentagem_camp2}
                            onChange={onInputChange_editar}
                            error={error_percentagem_camp2}
                            helperText={error_percentagem_camp2 ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="percentagem_camp3"
                            value={table.percentagem_camp3}
                            onChange={onInputChange_editar}
                            error={error_percentagem_camp3}
                            helperText={error_percentagem_camp3 ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="percentagem_camp4"
                            value={table.percentagem_camp4}
                            onChange={onInputChange_editar}
                            error={error_percentagem_camp4}
                            helperText={error_percentagem_camp4 ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="percentagem_camp5"
                            value={table.percentagem_camp5}
                            onChange={onInputChange_editar}
                            error={error_percentagem_camp5}
                            helperText={error_percentagem_camp6 ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="percentagem_camp6"
                            value={table.percentagem_camp6}
                            onChange={onInputChange_editar}
                            error={error_percentagem_camp6}
                            helperText={error_percentagem_camp6 ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead>
                          Classe de fertilidade
                        </StyledTableHead>
                        <StyledTableCell>
                          <CustomSelect
                            value={table.fertilizacao_camp1 || ""}
                            name="fertilizacao_camp1"
                            onChange={onInputChange_editar}
                            options={classeFertilizacao}
                            label="Classe de fertilizante"
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomSelect
                            value={table.fertilizacao_camp2 || ""}
                            name="fertilizacao_camp2"
                            onChange={onInputChange_editar}
                            options={classeFertilizacao}
                            label="Classe de fertilizante"
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomSelect
                            value={table.fertilizacao_camp3 || ""}
                            name="fertilizacao_camp3"
                            onChange={onInputChange_editar}
                            options={classeFertilizacao}
                            label="Classe de fertilizante"
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomSelect
                            value={table.fertilizacao_camp4 || ""}
                            name="fertilizacao_camp4"
                            onChange={onInputChange_editar}
                            options={classeFertilizacao}
                            label="Classe de fertilizante"
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomSelect
                            value={table.fertilizacao_camp5 || ""}
                            name="fertilizacao_camp5"
                            onChange={onInputChange_editar}
                            options={classeFertilizacao}
                            label="Classe de fertilizante"
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomSelect
                            value={table.fertilizacao_camp6 || ""}
                            name="fertilizacao_camp6"
                            onChange={onInputChange_editar}
                            options={classeFertilizacao}
                            label="Classe de fertilizante"
                          />
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{ backgroundColor: "lightgray" }}
                        ></StyledTableCell>
                        <StyledTableCell>
                          <CustomSelect
                            value={table.fertilizacao_camp7 || ""}
                            name="fertilizacao_camp7"
                            onChange={onInputChange_editar}
                            options={classeFertilizacao}
                            label="Classe de fertilizante"
                          />
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead colSpan={2}>
                          A deduzir no cálculo da fertilização azotada
                          (kg/ha)
                        </StyledTableHead>
                        <StyledTableCell>
                          <CustomTextField
                            name="deduzir_cálculo"
                            value={table.deduzir_cálculo}
                            onChange={onInputChange_editar}
                            error={error_deduzir_cálculo}
                            helperText={error_deduzir_cálculo ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{ backgroundColor: "lightgray" }}
                          colSpan={7}
                        ></StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={4}>
                          Quando são disponibilizados resultados analíticos
                          referentes ao teor de azoto do solo, identificar
                          se este corresponde a:
                        </TableCell>
                        <TableCell colSpan={2}>
                          <FormControlLabel
                            name="azoto_mineral"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={14}
                              >
                                Azoto mineral
                              </Typography>
                            }
                            aria-readonly
                            control={
                              <Checkbox
                                checked={table.azoto_mineral || false}
                                onChange={onInputChange_editar}
                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </TableCell>
                        <TableCell colSpan={2}>
                          <FormControlLabel
                            name="azoto_nitrico"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={14}
                              >
                                Azoto nítrico
                              </Typography>
                            }
                            aria-readonly
                            control={
                              <Checkbox
                                // defaultChecked={
                                //   table.azoto_nitrico === true && true
                                // }
                                checked={table.azoto_nitrico || false}
                                onChange={onInputChange_editar}
                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </TableCell>
                        <TableCell colSpan={2}>
                          <FormControlLabel
                            name="azoto_total"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={14}
                              >
                                Azoto total
                              </Typography>
                            }
                            aria-readonly
                            control={
                              <Checkbox
                                // defaultChecked={
                                //   table.azoto_total === true && true
                                // }
                                checked={table.azoto_total || false}
                                onChange={onInputChange_editar}
                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </TableCell>
                      </TableRow>
                    </>
                    :
                    <>
                      <TableRow>
                        <StyledTableHead colSpan={2}>
                          Elemento/nutriente
                        </StyledTableHead>
                        <StyledTableHead>N</StyledTableHead>
                        <StyledTableHead>P2O5</StyledTableHead>
                        <StyledTableHead>K2O</StyledTableHead>
                        <StyledTableHead>Mg</StyledTableHead>
                        <StyledTableHead></StyledTableHead>
                        <StyledTableHead></StyledTableHead>
                        <StyledTableHead>ph(h20)</StyledTableHead>
                        <StyledTableHead>M.Org.(%)</StyledTableHead>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead rowSpan={3}>
                          Resultado das análises
                        </StyledTableHead>
                        <StyledTableHead>mg/kg</StyledTableHead>
                        <StyledTableCell>
                          {table.mg_camp1}
                        </StyledTableCell>
                        <StyledTableCell>
                          {table.mg_camp2}
                        </StyledTableCell>
                        <StyledTableCell>
                          {table.mg_camp3}
                        </StyledTableCell>
                        <StyledTableCell>
                          {table.mg_camp4}
                        </StyledTableCell>
                        <StyledTableCell>
                          {table.mg_camp5}
                        </StyledTableCell>
                        <StyledTableCell>
                          {table.mg_camp6}
                        </StyledTableCell>
                        <StyledTableCell rowSpan={2}>
                          {table.Resultados_analicesPH}
                        </StyledTableCell>
                        <StyledTableCell rowSpan={2}>
                          {table.Resultados_analicesMO}
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead>(%)</StyledTableHead>
                        <StyledTableCell>
                          {table.percentagem_camp1}
                        </StyledTableCell>
                        <StyledTableCell>
                          {table.percentagem_camp2}
                        </StyledTableCell>
                        <StyledTableCell>
                          {table.percentagem_camp3}
                        </StyledTableCell>
                        <StyledTableCell>
                          {table.percentagem_camp4}
                        </StyledTableCell>
                        <StyledTableCell>
                          {table.percentagem_camp5}
                        </StyledTableCell>
                        <StyledTableCell>
                          {table.percentagem_camp6}
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead>
                          <Stack direction="row" justifyContent="center">
                            Classe de fertilidade
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={
                                  "Registar a classe de fertilidade constante no boletim de análise para cada um dos nutrientes, caso faça parte do referido boletim."
                                }
                              />
                            </Box>
                          </Stack>
                        </StyledTableHead>
                        <StyledTableCell>
                          <Stack direction="row" justifyContent="right">
                            {table.fertilizacao_camp1}
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={
                                  " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                                }
                              />
                            </Box>
                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Stack direction="row" justifyContent="right">
                            {table.fertilizacao_camp2}
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={
                                  " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                                }
                              />
                            </Box>
                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Stack direction="row" justifyContent="right">
                            {table.fertilizacao_camp3}
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={
                                  " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                                }
                              />
                            </Box>
                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Stack direction="row" justifyContent="right">
                            {table.fertilizacao_camp4}
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={
                                  " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                                }
                              />
                            </Box>
                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Stack direction="row" justifyContent="right">
                            {table.fertilizacao_camp5}
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={
                                  " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                                }
                              />
                            </Box>
                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Stack direction="row" justifyContent="right">
                            {table.fertilizacao_camp6}
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={
                                  " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                                }
                              />
                            </Box>
                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{ backgroundColor: "lightgrey" }}
                        ></StyledTableCell>
                        <StyledTableCell>
                          <Stack direction="row" justifyContent="right">
                            {table.fertilizacao_camp7}
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={
                                  " Preencher campo com uma das seguintes classes:\n\nMA - Muito Alto;\nA - Alto;\nM - Médio;\nB - Baixo;\nMB - Muito Baixo."
                                }
                              />
                            </Box>
                          </Stack>
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead colSpan={2}>
                          <Stack direction="row" justifyContent="start">
                            A deduzir no cálculo da fertilização azotada
                            (kg/ha)
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={
                                  "  Preenchimento referente ao elemento N (azoto)."
                                }
                              />
                            </Box>
                          </Stack>
                        </StyledTableHead>
                        <StyledTableCell>
                          {table.deduzir_cálculo}
                        </StyledTableCell>
                        <StyledTableCell
                          colSpan={7}
                          sx={{ backgroundColor: "lightgrey" }}
                        ></StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={4}>
                          Quando são disponibilizados resultados
                          analíticos referentes ao teor de azoto do solo,
                          identificar se este corresponde a:
                        </TableCell>
                        <TableCell colSpan={2}>
                          <FormControlLabel
                            sx={{ paddingLeft: 8 }}
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={14}
                              >
                                Azoto mineral
                              </Typography>
                            }
                            aria-readonly
                            control={
                              <Checkbox
                                checked={table.azoto_mineral}
                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </TableCell>
                        <TableCell colSpan={2}>
                          <FormControlLabel
                            sx={{ paddingLeft: 8 }}
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={14}
                              >
                                Azoto nítrico
                              </Typography>
                            }
                            aria-readonly
                            control={
                              <Checkbox
                                checked={table.azoto_nitrico}
                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </TableCell>
                        <TableCell colSpan={2}>
                          <FormControlLabel
                            sx={{ paddingLeft: 8 }}
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={14}
                              >
                                Azoto total
                              </Typography>
                            }
                            aria-readonly
                            control={
                              <Checkbox
                                checked={table.azoto_total}
                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </TableCell>
                      </TableRow>
                    </>
                  }

                </TableBody>
              );
            })}
          </table>
        </TableContainer>
      </CustomThemeProvider>
      <ConfirmDialog
        open={openDeleteAnalise}
        onClose={() => setOpenDeleteAnalise(false)}
        onConfirm={handleDeleteAnalise}
        message="Deseja eliminar o registo?"
      />
    </>
  );
};
