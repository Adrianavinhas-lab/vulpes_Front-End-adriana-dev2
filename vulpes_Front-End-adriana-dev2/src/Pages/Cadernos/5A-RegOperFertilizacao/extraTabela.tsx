import React, { SetStateAction } from "react";
import { ChangeEvent, useState } from "react";

import { Box, Stack, TableCell, TableRow } from "@mui/material";

import { StyledTableCell, StyledTableHead } from "../../../Styles/tabelCellStyled/customTableCell";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import BasicPopover from "../../../Components/Popover";
import { CustomTextField } from "../../../Styles/theme/customThemeprovider";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { IPage5ADesdobramento } from "../../../Interfaces/cadernos/caderno5/interfaces5A";

interface OperacaoFertilizacaoProps {
  extraRow: IPage5ADesdobramento | undefined;
  extraRows: IPage5ADesdobramento[];
  setExtraRows: React.Dispatch<SetStateAction<IPage5ADesdobramento[]>>
  setExtraRow: React.Dispatch<SetStateAction<IPage5ADesdobramento | undefined>>
  updateCreateTable: () => void;
  onSaveTabela: (callback: () => void) => void;
  onEditTabela: (callback: () => void) => void;
  onDelete: (id: number | undefined) => void;
  setEditingId: React.Dispatch<React.SetStateAction<number | null | undefined>>;
  setEditRow: React.Dispatch<React.SetStateAction<boolean>>;
  editingId: number | null | undefined;
  editRow: boolean;
}

export const OperacaoFertilizacaoExtra: React.FC<OperacaoFertilizacaoProps> = ({
  extraRow,
  extraRows,
  setExtraRow,
  setExtraRows,
  updateCreateTable,
  onSaveTabela,
  onEditTabela,
  onDelete,
  setEditingId,
  setEditRow,
  editingId,
  editRow,
}) => {
  const [createTable, setCreateTable] = useState(false);

  const [elementos_forn_solo_n, set_error_elementos_forn_solo_n] = useState<boolean>(false);
  const [elementos_forn_agua_n, set_error_elementos_forn_agua_n] = useState<boolean>(false);
  const [totais_aplicados_zona_n, set_error_totais_aplicados_zona_n] = useState<boolean>(false);
  const [totais_aplicados_hectare_n, set_error_totais_aplicados_hectare_n] = useState<boolean>(false);
  const [elementos_forn_solo_po, set_error_elementos_forn_solo_po] = useState<boolean>(false);
  const [elementos_forn_agua_po, set_error_elementos_forn_agua_po] = useState<boolean>(false);
  const [totais_aplicados_zona_po, set_error_totais_aplicados_zona_po] = useState<boolean>(false);
  const [totais_aplicados_hectare_po, set_error_totais_aplicados_hectare_po] = useState<boolean>(false);
  const [elementos_forn_solo_ko, set_error_elementos_forn_solo_ko] = useState<boolean>(false);
  const [elementos_forn_agua_ko, set_error_elementos_forn_agua_ko] = useState<boolean>(false);
  const [totais_aplicados_zona_ko, set_error_totais_aplicados_zona_ko] = useState<boolean>(false);
  const [totais_aplicados_hectare_ko, set_error_totais_aplicados_hectare_ko] = useState<boolean>(false);
  const [elementos_forn_solo_mgo, set_error_elementos_forn_solo_mgo] = useState<boolean>(false);
  const [elementos_forn_agua_mgo, set_error_elementos_forn_agua_mgo] = useState<boolean>(false);
  const [totais_aplicados_zona_mgo, set_error_totais_aplicados_zona_mgo] = useState<boolean>(false);
  const [totais_aplicados_hectare_mgo, set_error_totais_aplicados_hectare_mgo] = useState<boolean>(false);
  const [elementos_forn_solo_cao, set_error_elementos_forn_solo_cao] = useState<boolean>(false);
  const [elementos_forn_agua_cao, set_error_elementos_forn_agua_cao] = useState<boolean>(false);
  const [totais_aplicados_zona_cao, set_error_totais_aplicados_zona_cao] = useState<boolean>(false);
  const [totais_aplicados_hectare_cao, set_error_totais_aplicados_hectare_cao] = useState<boolean>(false);
  const [elementos_forn_solo_so, set_error_elementos_forn_solo_so] = useState<boolean>(false);
  const [elementos_forn_agua_so, set_error_elementos_forn_agua_so] = useState<boolean>(false);
  const [totais_aplicados_zona_so, set_error_totais_aplicados_zona_so] = useState<boolean>(false);
  const [totais_aplicados_hectare_so, set_error_totais_aplicados_hectare_so] = useState<boolean>(false);
  const [elementos_forn_solo_b, set_error_elementos_forn_solo_b] = useState<boolean>(false);
  const [elementos_forn_agua_b, set_error_elementos_forn_agua_b] = useState<boolean>(false);
  const [totais_aplicados_zona_b, set_error_totais_aplicados_zona_b] = useState<boolean>(false);
  const [totais_aplicados_hectare_b, set_error_totais_aplicados_hectare_b] = useState<boolean>(false);
  const message_apenas_numero = ("Apenas números são aceites");


  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let newValue = value;

    if (name === "elementos_forn_solo_n") {
      if (isNaN(Number(newValue))) {        
        set_error_elementos_forn_solo_n(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_forn_solo_n(false);
      }
    }
    if (name === "elementos_forn_agua_n") {
      if (isNaN(Number(newValue))) {
        set_error_elementos_forn_agua_n(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_forn_agua_n(false);
      }
    }
    if (name === "totais_aplicados_zona_n") {
      if (isNaN(Number(newValue))) {
        set_error_totais_aplicados_zona_n(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_totais_aplicados_zona_n(false);
      }
    }
    if (name === "totais_aplicados_hectare_n") {
      if (isNaN(Number(newValue))) {
        set_error_totais_aplicados_hectare_n(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_totais_aplicados_hectare_n(false);
      }
    }
    if (name === "elementos_forn_solo_po") {
      if (isNaN(Number(newValue))) {
        set_error_elementos_forn_solo_po(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_forn_solo_po(false);
      }
    }
    if (name === "elementos_forn_agua_po") {
      if (isNaN(Number(newValue))) {
        set_error_elementos_forn_agua_po(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_forn_agua_po(false);
      }
    }
    if (name === "totais_aplicados_zona_po") {
      if (isNaN(Number(newValue))) {
        set_error_totais_aplicados_zona_po(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_totais_aplicados_zona_po(false);
      }
    }
    if (name === "totais_aplicados_hectare_po") {
      if (isNaN(Number(newValue))) {
        set_error_totais_aplicados_hectare_po(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_totais_aplicados_hectare_po(false);
      }
    }
    if (name === "elementos_forn_solo_ko") {
      if (isNaN(Number(newValue))) {
        set_error_elementos_forn_solo_ko(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_forn_solo_ko(false);
      }
    }
    if (name === "elementos_forn_agua_ko") {
      if (isNaN(Number(newValue))) {
        set_error_elementos_forn_agua_ko(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_forn_agua_ko(false);
      }
    }
    if (name === "totais_aplicados_zona_ko") {
      if (isNaN(Number(newValue))) {
        set_error_totais_aplicados_zona_ko(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_totais_aplicados_zona_ko(false);
      }
    }
    if (name === "totais_aplicados_hectare_ko") {
      if (isNaN(Number(newValue))) {
        set_error_totais_aplicados_hectare_ko(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_totais_aplicados_hectare_ko(false);
      }
    }
    if (name === "elementos_forn_solo_mgo") {
      if (isNaN(Number(newValue))) {
        set_error_elementos_forn_solo_mgo(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_forn_solo_mgo(false);
      }
    }
    if (name === "elementos_forn_agua_mgo") {
      if (isNaN(Number(newValue))) {
        set_error_elementos_forn_agua_mgo(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_forn_agua_mgo(false);
      }
    }
    if (name === "totais_aplicados_zona_mgo") {
      if (isNaN(Number(newValue))) {
        set_error_totais_aplicados_zona_mgo(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_totais_aplicados_zona_mgo(false);
      }
    }
    if (name === "totais_aplicados_hectare_mgo") {
      if (isNaN(Number(newValue))) {
        set_error_totais_aplicados_hectare_mgo(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_totais_aplicados_hectare_mgo(false);
      }
    }
    if (name === "elementos_forn_solo_cao") {
      if (isNaN(Number(newValue))) {
        set_error_elementos_forn_solo_cao(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_forn_solo_cao(false);
      }
    }
    if (name === "elementos_forn_agua_cao") {
      if (isNaN(Number(newValue))) {
        set_error_elementos_forn_agua_cao(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_forn_agua_cao(false);
      }
    }
    if (name === "totais_aplicados_zona_cao") {
      if (isNaN(Number(newValue))) {
        set_error_totais_aplicados_zona_cao(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_totais_aplicados_zona_cao(false);
      }
    }
    if (name === "totais_aplicados_hectare_cao") {
      if (isNaN(Number(newValue))) {
        set_error_totais_aplicados_hectare_cao(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_totais_aplicados_hectare_cao(false);
      }
    }
    if (name === "elementos_forn_solo_so") {
      if (isNaN(Number(newValue))) {
        set_error_elementos_forn_solo_so(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_forn_solo_so(false);
      }
    }
    if (name === "elementos_forn_agua_so") {
      if (isNaN(Number(newValue))) {
        set_error_elementos_forn_agua_so(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_forn_agua_so(false);
      }
    }
    if (name === "totais_aplicados_zona_so") {
      if (isNaN(Number(newValue))) {
        set_error_totais_aplicados_zona_so(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_totais_aplicados_zona_so(false);
      }
    }
    if (name === "totais_aplicados_hectare_so") {
      if (isNaN(Number(newValue))) {
        set_error_totais_aplicados_hectare_so(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_totais_aplicados_hectare_so(false);
      }
    }
    if (name === "elementos_forn_solo_b") {
      if (isNaN(Number(newValue))) {
        set_error_elementos_forn_solo_b(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_forn_solo_b(false);
      }
    }
    if (name === "elementos_forn_agua_b") {
      if (isNaN(Number(newValue))) {
        set_error_elementos_forn_agua_b(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_forn_agua_b(false);
      }
    }
    if (name === "totais_aplicados_zona_b") {
      if (isNaN(Number(newValue))) {
        set_error_totais_aplicados_zona_b(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_totais_aplicados_zona_b(false);
      }
    }
    if (name === "totais_aplicados_hectare_b") {
      if (isNaN(Number(newValue))) {
        set_error_totais_aplicados_hectare_b(true);
         newValue = newValue.replace(/[^0-9]/g, "");
      } else {
        set_error_totais_aplicados_hectare_b(false);
      }
    }

    setExtraRow((prevExtraRow: any) => ({
      ...prevExtraRow,
      [name]: newValue,
    }));
  };

  // EDITAR
  const handleEdit = (id: number | null | undefined) => {
    setEditingId(id);
    setEditRow(true);
  };

  const onInputChange_editar = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (name === "elementos_forn_solo_po") {
      if (isNaN(Number(value))) {
        set_error_elementos_forn_solo_po(true);
        return;
      } else {
        set_error_elementos_forn_solo_po(false);
      }
    }
    if (name === "elementos_forn_agua_po") {
      if (isNaN(Number(value))) {
        set_error_elementos_forn_agua_po(true);
        return;
      } else {
        set_error_elementos_forn_agua_po(false);
      }
    }
    if (name === "totais_aplicados_zona_po") {
      if (isNaN(Number(value))) {
        set_error_totais_aplicados_zona_po(true);
        return;
      } else {
        set_error_totais_aplicados_zona_po(false);
      }
    }
    if (name === "totais_aplicados_hectare_po") {
      if (isNaN(Number(value))) {
        set_error_totais_aplicados_hectare_po(true);
        return;
      } else {
        set_error_totais_aplicados_hectare_po(false);
      }
    }
    if (name === "elementos_forn_solo_n") {
      if (isNaN(Number(value))) {        
        set_error_elementos_forn_solo_n(true);
         return;
      } else {
        set_error_elementos_forn_solo_n(false);
      }
    }
    if (name === "elementos_forn_agua_n") {
      if (isNaN(Number(value))) {
        set_error_elementos_forn_agua_n(true);
        return;
      } else {
        set_error_elementos_forn_agua_n(false);
      }
    }
    if (name === "totais_aplicados_zona_n") {
      if (isNaN(Number(value))) {
        set_error_totais_aplicados_zona_n(true);
        return;
      } else {
        set_error_totais_aplicados_zona_n(false);
      }
    }
    if (name === "totais_aplicados_hectare_n") {
      if (isNaN(Number(value))) {
        set_error_totais_aplicados_hectare_n(true);
        return;
      } else {
        set_error_totais_aplicados_hectare_n(false);
      }
    }
    if (name === "elementos_forn_solo_ko") {
      if (isNaN(Number(value))) {
        set_error_elementos_forn_solo_ko(true);
        return;
      } else {
        set_error_elementos_forn_solo_ko(false);
      }
    }
    if (name === "elementos_forn_agua_ko") {
      if (isNaN(Number(value))) {
        set_error_elementos_forn_agua_ko(true);
        return;
      } else {
        set_error_elementos_forn_agua_ko(false);
      }
    }
    if (name === "totais_aplicados_zona_ko") {
      if (isNaN(Number(value))) {
        set_error_totais_aplicados_zona_ko(true);
        return;
      } else {
        set_error_totais_aplicados_zona_ko(false);
      }
    }
    if (name === "totais_aplicados_hectare_ko") {
      if (isNaN(Number(value))) {
        set_error_totais_aplicados_hectare_ko(true);
        return;
      } else {
        set_error_totais_aplicados_hectare_ko(false);
      }
    }
    if (name === "elementos_forn_solo_mgo") {
      if (isNaN(Number(value))) {
        set_error_elementos_forn_solo_mgo(true);
        return;
      } else {
        set_error_elementos_forn_solo_mgo(false);
      }
    }
    if (name === "elementos_forn_agua_mgo") {
      if (isNaN(Number(value))) {
        set_error_elementos_forn_agua_mgo(true);
        return;
      } else {
        set_error_elementos_forn_agua_mgo(false);
      }
    }
    if (name === "totais_aplicados_zona_mgo") {
      if (isNaN(Number(value))) {
        set_error_totais_aplicados_zona_mgo(true);
        return;
      } else {
        set_error_totais_aplicados_zona_mgo(false);
      }
    }
    if (name === "totais_aplicados_hectare_mgo") {
      if (isNaN(Number(value))) {
        set_error_totais_aplicados_hectare_mgo(true);
        return;
      } else {
        set_error_totais_aplicados_hectare_mgo(false);
      }
    }
    if (name === "elementos_forn_solo_cao") {
      if (isNaN(Number(value))) {
        set_error_elementos_forn_solo_cao(true);
        return;
      } else {
        set_error_elementos_forn_solo_cao(false);
      }
    }
    if (name === "elementos_forn_agua_cao") {
      if (isNaN(Number(value))) {
        set_error_elementos_forn_agua_cao(true);
        return;
      } else {
        set_error_elementos_forn_agua_cao(false);
      }
    }
    if (name === "totais_aplicados_zona_cao") {
      if (isNaN(Number(value))) {
        set_error_totais_aplicados_zona_cao(true);
        return;
      } else {
        set_error_totais_aplicados_zona_cao(false);
      }
    }
    if (name === "totais_aplicados_hectare_cao") {
      if (isNaN(Number(value))) {
        set_error_totais_aplicados_hectare_cao(true);
        return;
      } else {
        set_error_totais_aplicados_hectare_cao(false);
      }
    }
    if (name === "elementos_forn_solo_so") {
      if (isNaN(Number(value))) {
        set_error_elementos_forn_solo_so(true);
        return;
      } else {
        set_error_elementos_forn_solo_so(false);
      }
    }
    if (name === "elementos_forn_agua_so") {
      if (isNaN(Number(value))) {
        set_error_elementos_forn_agua_so(true);
        return;
      } else {
        set_error_elementos_forn_agua_so(false);
      }
    }
    if (name === "totais_aplicados_zona_so") {
      if (isNaN(Number(value))) {
        set_error_totais_aplicados_zona_so(true);
        return;
      } else {
        set_error_totais_aplicados_zona_so(false);
      }
    }
    if (name === "totais_aplicados_hectare_so") {
      if (isNaN(Number(value))) {
        set_error_totais_aplicados_hectare_so(true);
        return;
      } else {
        set_error_totais_aplicados_hectare_so(false);
      }
    }
    if (name === "elementos_forn_solo_b") {
      if (isNaN(Number(value))) {
        set_error_elementos_forn_solo_b(true);
        return;
      } else {
        set_error_elementos_forn_solo_b(false);
      }
    }
    if (name === "elementos_forn_agua_b") {
      if (isNaN(Number(value))) {
        set_error_elementos_forn_agua_b(true);
        return;
      } else {
        set_error_elementos_forn_agua_b(false);
      }
    }
    if (name === "totais_aplicados_zona_b") {
      if (isNaN(Number(value))) {
        set_error_totais_aplicados_zona_b(true);
        return;
      } else {
        set_error_totais_aplicados_zona_b(false);
      }
    }
    if (name === "totais_aplicados_hectare_b") {
      if (isNaN(Number(value))) {
        set_error_totais_aplicados_hectare_b(true);
        return;
      } else {
        set_error_totais_aplicados_hectare_b(false);
      }
    }

    if (editingId !== null) {
      const updateRow = extraRows.map((row) => {
        if (row.id_registo_fertil_two === editingId) {
          return {
            ...row,
            [name]: value,
          };
        }
        return row;
      });
      setExtraRows(updateRow);
    }
  };


  return (
    <>
      {/* Se não houver registos mostra tabela vazia e botão criar  */}
      {extraRows.length <= 0 && createTable === false && (
        <>
          <TableRow>
            <StyledTableHead colSpan={5}>
              Elementos fornecidos pelo solo (cf. Análise de)
              terras
            </StyledTableHead>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <TableCell rowSpan={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
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
            <StyledTableHead colSpan={5}>
              Elementos fornecidos pela água da rega (cf. Análise
              de água de rega)
            </StyledTableHead>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableHead colSpan={5}>
              <Stack direction="row" justifyContent="start">
                Elementos fornecidos pela água da rega (cf.
                Análise de água de rega)
                <Box margin={-1} padding={0}>
                  <BasicPopover
                    text={
                      " Preenchimento obrigatório para os beneficiário com compromissos ativos na intervenção «Uso Eficiente da água»"
                    }
                  />
                </Box>
              </Stack>
            </StyledTableHead>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableHead colSpan={5}>
              Totais aplicados por hectare (kg/há)
            </StyledTableHead>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </>
      )}
      {/* Se não houver registos e botão criar === true mostra tabela para criar  */}
      {extraRows.length <= 0 && createTable && (
        <>
          <TableRow>
            <StyledTableHead colSpan={5}>
              Elementos fornecidos pelo solo (cf. Análise de
              terras)
            </StyledTableHead>
            <StyledTableCell>
              <CustomTextField
                name="elementos_forn_solo_n"
                value={extraRow?.elementos_forn_solo_n}
                onChange={onInputChange}
                error={elementos_forn_solo_n}
                helperText={elementos_forn_solo_n ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_forn_solo_po"
                value={extraRow?.elementos_forn_solo_po}
                onChange={onInputChange}
                error={elementos_forn_solo_po}
                helperText={elementos_forn_solo_po ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_forn_solo_ko"
                value={extraRow?.elementos_forn_solo_ko}
                onChange={onInputChange}
                error={elementos_forn_solo_ko}
                helperText={elementos_forn_solo_ko ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_forn_solo_mgo"
                value={extraRow?.elementos_forn_solo_mgo}
                onChange={onInputChange}
                error={elementos_forn_solo_mgo}
                helperText={elementos_forn_solo_mgo ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_forn_solo_cao"
                value={extraRow?.elementos_forn_solo_cao}
                onChange={onInputChange}
                error={elementos_forn_solo_cao}
                helperText={elementos_forn_solo_cao ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_forn_solo_so"
                value={extraRow?.elementos_forn_solo_so}
                onChange={onInputChange}
                error={elementos_forn_solo_so}
                helperText={elementos_forn_solo_so ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_forn_solo_b"
                value={extraRow?.elementos_forn_solo_b}
                onChange={onInputChange}
                error={elementos_forn_solo_b}
                helperText={elementos_forn_solo_b ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_forn_solo_ob"
                value={extraRow?.elementos_forn_solo_ob}
                onChange={onInputChange}
              />
            </StyledTableCell>
            <StyledTableCell rowSpan={4}>
              <Stack direction="row" justifyContent="center">
                <ButtonCadernos
                  mostrarBotaoCancelar
                  aoClicarCancelar={() => setCreateTable(false)}
                  mostrarBotaoGravar
                  aoClicarGravar={() => onSaveTabela(updateCreateTable)}
                />
              </Stack>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableHead colSpan={5}>
              Elementos fornecidos pela água da rega (cf. Análise
              de água de rega)
            </StyledTableHead>
            <StyledTableCell>
              <CustomTextField
                name="elementos_forn_agua_n"
                value={extraRow?.elementos_forn_agua_n}
                onChange={onInputChange}
                error={elementos_forn_agua_n}
                helperText={elementos_forn_agua_n ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_forn_agua_po"
                value={extraRow?.elementos_forn_agua_po}
                onChange={onInputChange}
                error={elementos_forn_agua_po}
                helperText={elementos_forn_agua_po ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_forn_agua_ko"
                value={extraRow?.elementos_forn_agua_ko}
                onChange={onInputChange}
                error={elementos_forn_agua_ko}
                helperText={elementos_forn_agua_ko ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_forn_agua_mgo"
                value={extraRow?.elementos_forn_agua_mgo}
                onChange={onInputChange}
                error={elementos_forn_agua_mgo}
                helperText={elementos_forn_agua_mgo ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_forn_agua_cao"
                value={extraRow?.elementos_forn_agua_cao}
                onChange={onInputChange}
                error={elementos_forn_agua_cao}
                helperText={elementos_forn_agua_cao ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_forn_agua_so"
                value={extraRow?.elementos_forn_agua_so}
                onChange={onInputChange}
                error={elementos_forn_agua_so}
                helperText={elementos_forn_agua_so ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_forn_agua_b"
                value={extraRow?.elementos_forn_agua_b}
                onChange={onInputChange}
                error={elementos_forn_agua_b}
                helperText={elementos_forn_agua_b ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_forn_agua_ob"
                value={extraRow?.elementos_forn_agua_ob}
                onChange={onInputChange}
              />
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableHead colSpan={5}>
              Totais aplicados na subparcela ou na zona homogénea
              (kg)
            </StyledTableHead>
            <StyledTableCell>
              <CustomTextField
                name="totais_aplicados_zona_n"
                value={extraRow?.totais_aplicados_zona_n}
                onChange={onInputChange}
                error={totais_aplicados_zona_n}
                helperText={totais_aplicados_zona_n ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_aplicados_zona_po"
                value={extraRow?.totais_aplicados_zona_po}
                onChange={onInputChange}
                error={totais_aplicados_zona_po}
                helperText={totais_aplicados_zona_po ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_aplicados_zona_ko"
                value={extraRow?.totais_aplicados_zona_ko}
                onChange={onInputChange}
                error={totais_aplicados_zona_ko}
                helperText={totais_aplicados_zona_ko ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_aplicados_zona_mgo"
                value={extraRow?.totais_aplicados_zona_mgo}
                onChange={onInputChange}
                error={totais_aplicados_zona_mgo}
                helperText={totais_aplicados_zona_mgo ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_aplicados_zona_cao"
                value={extraRow?.totais_aplicados_zona_cao}
                onChange={onInputChange}
                error={totais_aplicados_zona_cao}
                helperText={totais_aplicados_zona_cao ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_aplicados_zona_so"
                value={extraRow?.totais_aplicados_zona_so}
                onChange={onInputChange}
                error={totais_aplicados_zona_so}
                helperText={totais_aplicados_zona_so ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_aplicados_zona_b"
                value={extraRow?.totais_aplicados_zona_b}
                onChange={onInputChange}
                error={totais_aplicados_zona_b}
                helperText={totais_aplicados_zona_b ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_aplicados_zona_ob"
                value={extraRow?.totais_aplicados_zona_ob}
                onChange={onInputChange}
              />
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableHead colSpan={5}>
              Totais aplicados por hectare (kg/há)
            </StyledTableHead>
            <StyledTableCell>
              <CustomTextField
                name="totais_aplicados_hectare_n"
                value={extraRow?.totais_aplicados_hectare_n}
                onChange={onInputChange}
                error={totais_aplicados_hectare_n}
                helperText={totais_aplicados_hectare_n ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_aplicados_hectare_po"
                value={extraRow?.totais_aplicados_hectare_po}
                onChange={onInputChange}
                error={totais_aplicados_hectare_po}
                helperText={totais_aplicados_hectare_po ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_aplicados_hectare_ko"
                value={extraRow?.totais_aplicados_hectare_ko}
                onChange={onInputChange}
                error={totais_aplicados_hectare_ko}
                helperText={totais_aplicados_hectare_ko ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_aplicados_hectare_mgo"
                value={extraRow?.totais_aplicados_hectare_mgo}
                onChange={onInputChange}
                error={totais_aplicados_hectare_mgo}
                helperText={totais_aplicados_hectare_mgo ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_aplicados_hectare_cao"
                value={extraRow?.totais_aplicados_hectare_cao}
                onChange={onInputChange}
                error={totais_aplicados_hectare_cao}
                helperText={totais_aplicados_hectare_cao ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_aplicados_hectare_so"
                value={extraRow?.totais_aplicados_hectare_so}
                onChange={onInputChange}
                error={totais_aplicados_hectare_so}
                helperText={totais_aplicados_hectare_so ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_aplicados_hectare_b"
                value={extraRow?.totais_aplicados_hectare_b}
                onChange={onInputChange}
                error={totais_aplicados_hectare_b}
                helperText={totais_aplicados_hectare_b ? message_apenas_numero : ""}
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_aplicados_hectare_ob"
                value={extraRow?.totais_aplicados_hectare_ob}
                onChange={onInputChange}
              />
            </StyledTableCell>
          </TableRow>
        </>
      )}


      {/* Se houver registos mostra tabela para editar  */}
      {extraRows.length > 0 &&
        extraRows.map((extra, k) =>
          editRow && editingId === extra.id_registo_fertil_two ? (
            <React.Fragment key={k}>
              <TableRow>
                <StyledTableHead colSpan={5}>
                  Elementos fornecidos pelo solo (cf. Análise de
                  terras)
                </StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="elementos_forn_solo_n"
                    value={extra.elementos_forn_solo_n}
                    onChange={onInputChange_editar}
                    error={elementos_forn_solo_n}
                    helperText={elementos_forn_solo_n ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="elementos_forn_solo_po"
                    value={extra.elementos_forn_solo_po}
                    onChange={onInputChange_editar}
                    error={elementos_forn_solo_po}
                    helperText={elementos_forn_solo_po ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="elementos_forn_solo_ko"
                    value={extra.elementos_forn_solo_ko}
                    onChange={onInputChange_editar}
                    error={elementos_forn_solo_ko}
                    helperText={elementos_forn_solo_ko ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="elementos_forn_solo_mgo"
                    value={extra.elementos_forn_solo_mgo}
                    onChange={onInputChange_editar}
                    error={elementos_forn_solo_mgo}
                    helperText={elementos_forn_solo_mgo ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="elementos_forn_solo_cao"
                    value={extra.elementos_forn_solo_cao}
                    onChange={onInputChange_editar}
                    error={elementos_forn_solo_cao}
                    helperText={elementos_forn_solo_cao ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="elementos_forn_solo_so"
                    value={extra.elementos_forn_solo_so}
                    onChange={onInputChange_editar}
                    error={elementos_forn_solo_so}
                    helperText={elementos_forn_solo_so ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="elementos_forn_solo_b"
                    value={extra.elementos_forn_solo_b}
                    onChange={onInputChange_editar}
                    error={elementos_forn_solo_b}
                    helperText={elementos_forn_solo_b ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="elementos_forn_solo_ob"
                    value={extra.elementos_forn_solo_ob}
                    onChange={onInputChange_editar}
                  />
                </StyledTableCell>
                <StyledTableCell rowSpan={4}>
                  <ButtonCadernos
                    mostrarBotaoGravar
                    aoClicarGravar={() =>
                      onEditTabela(updateCreateTable)
                    }
                    mostrarBotaoCancelar
                    aoClicarCancelar={() => setEditRow(false)}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead colSpan={5}>
                  Elementos fornecidos pela água da rega (cf.
                  Análise de água de rega)
                </StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="elementos_forn_agua_n"
                    value={extra.elementos_forn_agua_n}
                    onChange={onInputChange_editar}
                    error={elementos_forn_agua_n}
                    helperText={elementos_forn_agua_n ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="elementos_forn_agua_po"
                    value={extra.elementos_forn_agua_po}
                    onChange={onInputChange_editar}
                    error={elementos_forn_agua_po}
                    helperText={elementos_forn_agua_po ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="elementos_forn_agua_ko"
                    value={extra.elementos_forn_agua_ko}
                    onChange={onInputChange_editar}
                    error={elementos_forn_agua_ko}
                    helperText={elementos_forn_agua_ko ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="elementos_forn_agua_mgo"
                    value={extra.elementos_forn_agua_mgo}
                    onChange={onInputChange_editar}
                    error={elementos_forn_agua_mgo}
                    helperText={elementos_forn_agua_mgo ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="elementos_forn_agua_cao"
                    value={extra.elementos_forn_agua_cao}
                    onChange={onInputChange_editar}
                    error={elementos_forn_agua_cao}
                    helperText={elementos_forn_agua_cao ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="elementos_forn_agua_so"
                    value={extra.elementos_forn_agua_so}
                    onChange={onInputChange_editar}
                    error={elementos_forn_agua_so}
                    helperText={elementos_forn_agua_so ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="elementos_forn_agua_b"
                    value={extra.elementos_forn_agua_b}
                    onChange={onInputChange_editar}
                    error={elementos_forn_agua_b}
                    helperText={elementos_forn_agua_b ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="elementos_forn_agua_ob"
                    value={extra.elementos_forn_agua_ob}
                    onChange={onInputChange_editar}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead colSpan={5}>
                  Totais aplicados na subparcela ou na zona
                  homogénea (kg)
                </StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="totais_aplicados_zona_n"
                    value={extra.totais_aplicados_zona_n}
                    onChange={onInputChange_editar}
                    error={totais_aplicados_zona_n}
                    helperText={totais_aplicados_zona_n ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="totais_aplicados_zona_po"
                    value={extra.totais_aplicados_zona_po}
                    onChange={onInputChange_editar}
                    error={totais_aplicados_zona_po}
                    helperText={totais_aplicados_zona_po ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="totais_aplicados_zona_ko"
                    value={extra.totais_aplicados_zona_ko}
                    onChange={onInputChange_editar}
                    error={totais_aplicados_zona_ko}
                    helperText={totais_aplicados_zona_ko ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="totais_aplicados_zona_mgo"
                    value={extra.totais_aplicados_zona_mgo}
                    onChange={onInputChange_editar}
                    error={totais_aplicados_zona_mgo}
                    helperText={totais_aplicados_zona_mgo ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="totais_aplicados_zona_cao"
                    value={extra.totais_aplicados_zona_cao}
                    onChange={onInputChange_editar}
                    error={totais_aplicados_zona_cao}
                    helperText={totais_aplicados_zona_cao ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="totais_aplicados_zona_so"
                    value={extra.totais_aplicados_zona_so}
                    onChange={onInputChange_editar}
                    error={totais_aplicados_zona_so}
                    helperText={totais_aplicados_zona_so ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="totais_aplicados_zona_b"
                    value={extra.totais_aplicados_zona_b}
                    onChange={onInputChange_editar}
                    error={totais_aplicados_zona_b}
                    helperText={totais_aplicados_zona_b ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="totais_aplicados_zona_ob"
                    value={extra.totais_aplicados_zona_ob}
                    onChange={onInputChange_editar}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead colSpan={5}>
                  Totais aplicados por hectare (kg/há)
                </StyledTableHead>
                <StyledTableCell>
                  <CustomTextField
                    name="totais_aplicados_hectare_n"
                    value={extra.totais_aplicados_hectare_n}
                    onChange={onInputChange_editar}
                    error={totais_aplicados_hectare_n}
                    helperText={totais_aplicados_hectare_n ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="totais_aplicados_hectare_po"
                    value={extra.totais_aplicados_hectare_po}
                    onChange={onInputChange_editar}
                    error={totais_aplicados_hectare_po}
                    helperText={totais_aplicados_hectare_po ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="totais_aplicados_hectare_ko"
                    value={extra.totais_aplicados_hectare_ko}
                    onChange={onInputChange_editar}
                    error={totais_aplicados_hectare_ko}
                    helperText={totais_aplicados_hectare_ko ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="totais_aplicados_hectare_mgo"
                    value={extra.totais_aplicados_hectare_mgo}
                    onChange={onInputChange_editar}
                    error={totais_aplicados_hectare_mgo}
                    helperText={totais_aplicados_hectare_mgo ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="totais_aplicados_hectare_cao"
                    value={extra.totais_aplicados_hectare_cao}
                    onChange={onInputChange_editar}
                    error={totais_aplicados_hectare_cao}
                    helperText={totais_aplicados_hectare_cao ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="totais_aplicados_hectare_so"
                    value={extra.totais_aplicados_hectare_so}
                    onChange={onInputChange_editar}
                    error={totais_aplicados_hectare_so}
                    helperText={totais_aplicados_hectare_so ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="totais_aplicados_hectare_b"
                    value={extra.totais_aplicados_hectare_b}
                    onChange={onInputChange_editar}
                    error={totais_aplicados_hectare_b}
                    helperText={totais_aplicados_hectare_b ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="totais_aplicados_hectare_ob"
                    value={extra.totais_aplicados_hectare_ob}
                    onChange={onInputChange_editar}
                    error={totais_aplicados_hectare_b}
                    helperText={totais_aplicados_hectare_b ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
              </TableRow>
            </React.Fragment>
          ) : (
            <React.Fragment key={k}>
              <TableRow>
                <StyledTableHead colSpan={5}>
                  Elementos fornecidos pelo solo (cf. Análise de)
                  terras
                </StyledTableHead>
                <StyledTableCell>
                  {extra.elementos_forn_solo_n}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.elementos_forn_solo_po}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.elementos_forn_solo_ko}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.elementos_forn_solo_mgo}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.elementos_forn_solo_cao}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.elementos_forn_solo_so}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.elementos_forn_solo_b}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.elementos_forn_solo_ob}
                </StyledTableCell>
                <StyledTableCell rowSpan={4}>
                  <ButtonCadernos
                    mostrarBotaoEditar
                    aoClicarEditar={() =>
                      handleEdit(extra.id_registo_fertil_two)
                    }
                    mostrarBotaoApagar
                    aoClicarApagar={() =>
                      onDelete(extra.id_registo_fertil_two)
                    }
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead colSpan={5}>
                  Elementos fornecidos pela água da rega (cf.
                  Análise de água de rega)
                </StyledTableHead>
                <StyledTableCell>
                  {extra.elementos_forn_agua_n}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.elementos_forn_agua_po}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.elementos_forn_agua_ko}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.elementos_forn_agua_mgo}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.elementos_forn_agua_cao}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.elementos_forn_agua_so}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.elementos_forn_agua_b}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.elementos_forn_agua_ob}
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead colSpan={5}>
                  Totais aplicados na subparcela ou na zona
                  homogénea (kg)
                </StyledTableHead>
                <StyledTableCell>
                  {extra.totais_aplicados_zona_n}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.totais_aplicados_zona_po}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.totais_aplicados_zona_ko}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.totais_aplicados_zona_mgo}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.totais_aplicados_zona_cao}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.totais_aplicados_zona_so}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.totais_aplicados_zona_b}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.totais_aplicados_zona_ob}
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead colSpan={5}>
                  Totais aplicados por hectare (kg/há)
                </StyledTableHead>
                <StyledTableCell>
                  {extra.totais_aplicados_hectare_n}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.totais_aplicados_hectare_po}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.totais_aplicados_hectare_ko}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.totais_aplicados_hectare_mgo}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.totais_aplicados_hectare_cao}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.totais_aplicados_hectare_so}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.totais_aplicados_hectare_b}
                </StyledTableCell>
                <StyledTableCell>
                  {extra.totais_aplicados_hectare_ob}
                </StyledTableCell>
              </TableRow>
            </React.Fragment>
          )
        )}
    </>
  )
}