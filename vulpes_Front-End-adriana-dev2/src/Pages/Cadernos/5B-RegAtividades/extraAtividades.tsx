import React from "react";
import { ChangeEvent, useState } from "react";

import { SelectChangeEvent } from "@mui/material";
import { TableBody, TableRow } from "@mui/material";

import { CustomTextField } from "../../../Styles/theme/customThemeprovider";
import { CustomThemeProvider } from "../../../Styles/theme/customThemeprovider";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { StyledTableCell } from "../../../Styles/tabelCellStyled/customTableCell";
import { StyledTableHead } from "../../../Styles/tabelCellStyled/customTableCell";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import { del } from "../../../Services/tokenConfig";
import { func_print } from "../../../Func_genericas/func_print";
import { IPage5B_Two } from "../../../Interfaces/cadernos/caderno5/interfaces5B";


interface IRegistoAtividadesExtraProps {
  extraObject: IPage5B_Two | undefined;
  extraFields: IPage5B_Two[];
  setExtraObject: React.Dispatch<React.SetStateAction<IPage5B_Two | undefined>>;
  setExtraFields: React.Dispatch<React.SetStateAction<IPage5B_Two[]>>;
  updateCreateTable: () => void;
  onSaveTabelaExtra: (callback: () => void) => void;
  onSaveEditExtra: (callback: () => void) => void;
  setEditingIdExtra: React.Dispatch<React.SetStateAction<number | null | undefined>>;
  setEditRowExtra: React.Dispatch<React.SetStateAction<boolean>>;
  editingIdExtra: number | null | undefined;
  editRowExtra: boolean;
  setOpenSnackSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSnackError: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegistoAtividadesExtra: React.FC<IRegistoAtividadesExtraProps> = ({
  extraObject,
  extraFields,
  setExtraObject,
  setExtraFields,
  updateCreateTable,
  onSaveTabelaExtra,
  onSaveEditExtra,
  setEditingIdExtra,
  setEditRowExtra,
  editingIdExtra,
  editRowExtra,
  setMessage,
  setOpenSnackError,
  setOpenSnackSuccess,
  setIsLoading
}) => {
  const [createTable, setCreateTable] = useState(false);
  const [openDeleteAtividades, setOpenDeleteExtra] = React.useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null | undefined>(0);

  const message_apenas_numero = ("Apenas números são aceites");

  const [error_elementos_n, set_error_elementos_n] = useState<boolean>(false);
  const [error_elementos_po, set_error_elementos_po] = useState<boolean>(false);
  const [error_elementos_ko, set_error_elementos_ko] = useState<boolean>(false);
  const [error_elementos_mgo, set_error_elementos_mgo] = useState<boolean>(false);
  const [error_elementos_cao, set_error_elementos_cao] = useState<boolean>(false);
  const [error_elementos_so, set_error_elementos_so] = useState<boolean>(false);
  const [error_elementos_b, set_error_elementos_b] = useState<boolean>(false);

  const [error_totais_apli_homo_n, set_error_totais_apli_homo_n] = useState<boolean>(false);
  const [error_totais_apli_homo_po, set_error_totais_apli_homo_po] = useState<boolean>(false);
  const [error_totais_apli_homo_ko, set_error_totais_apli_homo_ko] = useState<boolean>(false);
  const [error_totais_apli_homo_mgo, set_error_totais_apli_homo_mgo] = useState<boolean>(false);
  const [error_totais_apli_homo_cao, set_error_totais_apli_homo_cao] = useState<boolean>(false);
  const [error_totais_apli_homo_so, set_error_totais_apli_homo_so] = useState<boolean>(false);
  const [error_totais_apli_homo_b, set_error_totais_apli_homo_b] = useState<boolean>(false);

  const [error_totais_apli_n, set_error_totais_apli_n] = useState<boolean>(false);
  const [error_totais_apli_po, set_error_totais_apli_po] = useState<boolean>(false);
  const [error_totais_apli_ko, set_error_totais_apli_ko] = useState<boolean>(false);
  const [error_totais_apli_mgo, set_error_totais_apli_mgo] = useState<boolean>(false);
  const [error_totais_apli_cao, set_error_totais_apli_cao] = useState<boolean>(false);
  const [error_totais_apli_so, set_error_totais_apli_so] = useState<boolean>(false);
  const [error_totais_apli_b, set_error_totais_apli_b] = useState<boolean>(false);


  const onInputChangeExtra = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    let newValue: any = value;

    if (type === "date" && value === "") {
      newValue = null;
    }
    if (name === "elementos_n") {
      if (isNaN(Number(value))) {
        set_error_elementos_n(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_n(false);
      }
    }
    if (name === "elementos_po") {
      if (isNaN(Number(value))) {
        set_error_elementos_po(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_po(false);
      }
    }
    if (name === "elementos_ko") {
      if (isNaN(Number(value))) {
        set_error_elementos_ko(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_ko(false);
      }
    }
    if (name === "elementos_mgo") {
      if (isNaN(Number(value))) {
        set_error_elementos_mgo(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_mgo(false);
      }
    }
    if (name === "elementos_cao") {
      if (isNaN(Number(value))) {
        set_error_elementos_cao(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_cao(false);
      }
    }
    if (name === "elementos_so") {
      if (isNaN(Number(value))) {
        set_error_elementos_so(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_so(false);
      }
    }
    if (name === "elementos_b") {
      if (isNaN(Number(value))) {
        set_error_elementos_b(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_elementos_b(false);
      }
    }
    if (name === "totais_apli_homo_n") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_homo_n(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_totais_apli_homo_n(false);
      }
    }
    if (name === "totais_apli_homo_po") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_homo_po(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_totais_apli_homo_po(false);
      }
    }
    if (name === "totais_apli_homo_ko") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_homo_ko(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_totais_apli_homo_ko(false);
      }
    }
    if (name === "totais_apli_homo_mgo") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_homo_mgo(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_totais_apli_homo_mgo(false);
      }
    }
    if (name === "totais_apli_homo_cao") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_homo_cao(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_totais_apli_homo_cao(false);
      }
    }
    if (name === "totais_apli_homo_so") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_homo_so(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_totais_apli_homo_so(false);
      }
    }
    if (name === "totais_apli_homo_b") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_homo_b(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_totais_apli_homo_b(false);
      }
    }
    if (name === "totais_apli_n") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_n(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_totais_apli_n(false);
      }
    }
    if (name === "totais_apli_po") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_po(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_totais_apli_po(false);
      }
    }
    if (name === "totais_apli_ko") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_ko(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_totais_apli_ko(false);
      }
    }
    if (name === "totais_apli_mgo") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_mgo(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_totais_apli_mgo(false);
      }
    }
    if (name === "totais_apli_cao") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_cao(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_totais_apli_cao(false);
      }
    }
    if (name === "totais_apli_so") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_so(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_totais_apli_so(false);
      }
    }
    if (name === "totais_apli_b") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_b(true);
        newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_totais_apli_b(false);
      }
    }


    setExtraObject((prevRegisto: any) => ({
      ...prevRegisto,
      [name]: newValue,
    }));
  };

  // EDITAR
  const handleEditExtra = (id: number | null | undefined) => {
    setEditingIdExtra(id);
    setEditRowExtra(true);
  };

  const onChageEditExtra = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    let newValue: any = value;

    if (type === "date" && value === "") {
      newValue = null;
    }
    if (name === "elementos_n") {
      if (isNaN(Number(value))) {
        set_error_elementos_n(true);
        return;
      } else {
        set_error_elementos_n(false);
      }
    }
    if (name === "elementos_po") {
      if (isNaN(Number(value))) {
        set_error_elementos_po(true);
        return;
      } else {
        set_error_elementos_po(false);
      }
    }
    if (name === "elementos_ko") {
      if (isNaN(Number(value))) {
        set_error_elementos_ko(true);
        return;
      } else {
        set_error_elementos_ko(false);
      }
    }
    if (name === "elementos_mgo") {
      if (isNaN(Number(value))) {
        set_error_elementos_mgo(true);
        return;
      } else {
        set_error_elementos_mgo(false);
      }
    }
    if (name === "elementos_cao") {
      if (isNaN(Number(value))) {
        set_error_elementos_cao(true);
        return;
      } else {
        set_error_elementos_cao(false);
      }
    }
    if (name === "elementos_so") {
      if (isNaN(Number(value))) {
        set_error_elementos_so(true);
        return;
      } else {
        set_error_elementos_so(false);
      }
    }
    if (name === "elementos_b") {
      if (isNaN(Number(value))) {
        set_error_elementos_b(true);
        return;
      } else {
        set_error_elementos_b(false);
      }
    }
    if (name === "totais_apli_homo_n") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_homo_n(true);
        return;
      } else {
        set_error_totais_apli_homo_n(false);
      }
    }
    if (name === "totais_apli_homo_po") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_homo_po(true);
        return;
      } else {
        set_error_totais_apli_homo_po(false);
      }
    }
    if (name === "totais_apli_homo_ko") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_homo_ko(true);
        return;
      } else {
        set_error_totais_apli_homo_ko(false);
      }
    }
    if (name === "totais_apli_homo_mgo") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_homo_mgo(true);
        return;
      } else {
        set_error_totais_apli_homo_mgo(false);
      }
    }
    if (name === "totais_apli_homo_cao") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_homo_cao(true);
        return;
      } else {
        set_error_totais_apli_homo_cao(false);
      }
    }
    if (name === "totais_apli_homo_so") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_homo_so(true);
        return;
      } else {
        set_error_totais_apli_homo_so(false);
      }
    }
    if (name === "totais_apli_homo_b") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_homo_b(true);
        return;
      } else {
        set_error_totais_apli_homo_b(false);
      }
    }
    if (name === "totais_apli_n") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_n(true);
        return;
      } else {
        set_error_totais_apli_n(false);
      }
    }
    if (name === "totais_apli_po") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_po(true);
        return;
      } else {
        set_error_totais_apli_po(false);
      }
    }
    if (name === "totais_apli_ko") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_ko(true);
        return;
      } else {
        set_error_totais_apli_ko(false);
      }
    }
    if (name === "totais_apli_mgo") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_mgo(true);
        return;
      } else {
        set_error_totais_apli_mgo(false);
      }
    }
    if (name === "totais_apli_cao") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_cao(true);
        return;
      } else {
        set_error_totais_apli_cao(false);
      }
    }
    if (name === "totais_apli_so") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_so(true);
        return;
      } else {
        set_error_totais_apli_so(false);
      }
    }
    if (name === "totais_apli_b") {
      if (isNaN(Number(value))) {
        set_error_totais_apli_b(true);
        return;
      } else {
        set_error_totais_apli_b(false);
      }
    }

    if (editingIdExtra !== null) {
      const updatedTable = extraFields.map((tab) => {
        if (tab.id_atividade_two === editingIdExtra) {
          return {
            ...tab,
            [name]: newValue,
          };
        }
        return tab;
      });
      setExtraFields(updatedTable);
    }
  };

  // Delete
  const handleClickOpenDeleteExtra = (id: number | undefined) => {
    setIdToDelete(id);
    setOpenDeleteExtra(true);
  };
  const handleDeleteExtra = async () => {
    try {
      setIsLoading(true);
      let res = await del(`/delete__reg_actividades_5b_two/${idToDelete}`);

      if (res.status === 200) {
        setMessage("Registo eliminado com sucesso!");
        setOpenDeleteExtra(false);
        setIdToDelete(null);
        setExtraFields((oldRows) => [
          ...oldRows.filter((oldRow) => oldRow.id_atividade_two !== idToDelete),
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
    <CustomThemeProvider>


      {/* Se não houver registos mostra tabela vazia e botão criar  */}
      {extraFields.length <= 0 && createTable === false && (
        <TableBody>
          <TableRow>
            <StyledTableHead colSpan={5}>
              Elementos fornecidos pelo solo (cf. Análise de terras)
            </StyledTableHead>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell rowSpan={3}>
              <BarraDeFerramentas
                mostrarBotaoNovo
                textoBotaoNovo="Registar"
                aoClicarNovo={() => setCreateTable(true)}
              />
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableHead colSpan={5}>
              Totais aplicados na subparcela ou na zona homogénea (kg)
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
              Totais aplicados por hectare (kg/ha)
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
        </TableBody>
      )}

      {/* Se não houver registos e botão criar === true mostra tabela para criar  */}
      {extraFields.length <= 0 && createTable && (
        <TableBody>
          <TableRow>
            <StyledTableHead colSpan={5}>
              Elementos fornecidos pelo solo (cf. Análise de terras)
            </StyledTableHead>
            <StyledTableCell>
              <CustomTextField
                name="elementos_n"
                value={extraObject?.elementos_n}
                onChange={onInputChangeExtra}
                error={error_elementos_n}
                helperText={
                  error_elementos_n ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_po"
                value={extraObject?.elementos_po}
                onChange={onInputChangeExtra}
                error={error_elementos_po}
                helperText={
                  error_elementos_po ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_ko"
                value={extraObject?.elementos_ko}
                onChange={onInputChangeExtra}
                error={error_elementos_ko}
                helperText={
                  error_elementos_ko ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_mgo"
                value={extraObject?.elementos_mgo}
                onChange={onInputChangeExtra}
                error={error_elementos_mgo}
                helperText={
                  error_elementos_mgo ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_cao"
                value={extraObject?.elementos_cao}
                onChange={onInputChangeExtra}
                error={error_elementos_cao}
                helperText={
                  error_elementos_cao ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_so"
                value={extraObject?.elementos_so}
                onChange={onInputChangeExtra}
                error={error_elementos_so}
                helperText={
                  error_elementos_so ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_b"
                value={extraObject?.elementos_b}
                onChange={onInputChangeExtra}
                error={error_elementos_b}
                helperText={
                  error_elementos_b ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="elementos_campp_opcao"
                value={extraObject?.elementos_campp_opcao}
                onChange={onInputChangeExtra}
              />
            </StyledTableCell>

            <StyledTableCell rowSpan={3}>
              <ButtonCadernos
                mostrarBotaoGravar
                aoClicarGravar={() => onSaveTabelaExtra(updateCreateTable)}
                mostrarBotaoCancelar
                aoClicarCancelar={() => setCreateTable(false)}
              />
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableHead colSpan={5}>
              Totais aplicados na subparcela ou na zona homogénea (kg)
            </StyledTableHead>
            <StyledTableCell>
              <CustomTextField
                name="totais_apli_homo_n"
                value={extraObject?.totais_apli_homo_n}
                onChange={onInputChangeExtra}
                error={error_totais_apli_homo_n}
                helperText={
                  error_totais_apli_homo_n ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_apli_homo_po"
                value={extraObject?.totais_apli_homo_po}
                onChange={onInputChangeExtra}
                error={error_totais_apli_homo_po}
                helperText={
                  error_totais_apli_homo_po ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_apli_homo_ko"
                value={extraObject?.totais_apli_homo_ko}
                onChange={onInputChangeExtra}
                error={error_totais_apli_homo_ko}
                helperText={
                  error_totais_apli_homo_ko ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_apli_homo_mgo"
                value={extraObject?.totais_apli_homo_mgo}
                onChange={onInputChangeExtra}
                error={error_totais_apli_homo_mgo}
                helperText={
                  error_totais_apli_homo_mgo ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_apli_homo_cao"
                value={extraObject?.totais_apli_homo_cao}
                onChange={onInputChangeExtra}
                error={error_totais_apli_homo_cao}
                helperText={
                  error_totais_apli_homo_cao ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_apli_homo_so"
                value={extraObject?.totais_apli_homo_so}
                onChange={onInputChangeExtra}
                error={error_totais_apli_homo_so}
                helperText={
                  error_totais_apli_homo_so ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_apli_homo_b"
                value={extraObject?.totais_apli_homo_b}
                onChange={onInputChangeExtra}
                error={error_totais_apli_homo_b}
                helperText={
                  error_totais_apli_homo_b ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_apli_homo_campp_opcao"
                value={extraObject?.totais_apli_homo_campp_opcao}
                onChange={onInputChangeExtra}
              />
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableHead colSpan={5}>
              Totais aplicados por hectare (kg/ha)
            </StyledTableHead>
            <StyledTableCell>
              <CustomTextField
                name="totais_apli_n"
                value={extraObject?.totais_apli_n}
                onChange={onInputChangeExtra}
                error={error_totais_apli_n}
                helperText={
                  error_totais_apli_n ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_apli_po"
                value={extraObject?.totais_apli_po}
                onChange={onInputChangeExtra}
                error={error_totais_apli_po}
                helperText={
                  error_totais_apli_po ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_apli_ko"
                value={extraObject?.totais_apli_ko}
                onChange={onInputChangeExtra}
                error={error_totais_apli_ko}
                helperText={
                  error_totais_apli_ko ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_apli_mgo"
                value={extraObject?.totais_apli_mgo}
                onChange={onInputChangeExtra}
                error={error_totais_apli_mgo}
                helperText={
                  error_totais_apli_mgo ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_apli_cao"
                value={extraObject?.totais_apli_cao}
                onChange={onInputChangeExtra}
                error={error_totais_apli_cao}
                helperText={
                  error_totais_apli_cao ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_apli_so"
                value={extraObject?.totais_apli_so}
                onChange={onInputChangeExtra}
                error={error_totais_apli_so}
                helperText={
                  error_totais_apli_so ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_apli_b"
                value={extraObject?.totais_apli_b}
                onChange={onInputChangeExtra}
                error={error_totais_apli_b}
                helperText={
                  error_totais_apli_b ? message_apenas_numero : ""
                }
              />
            </StyledTableCell>
            <StyledTableCell>
              <CustomTextField
                name="totais_apli_campp_opcao"
                value={extraObject?.totais_apli_campp_opcao}
                onChange={onInputChangeExtra}
              />
            </StyledTableCell>
          </TableRow>
        </TableBody>
      )}

      {/* Se houver registos mostra tabela para editar  */}
      {extraFields.length > 0 &&
        extraFields.map((ext, key) => {
          return (
            <TableBody key={key}>
              {editingIdExtra === ext.id_atividade_two && editRowExtra ? (
                <>
                  <TableRow>
                    <StyledTableHead colSpan={5}>
                      Elementos fornecidos pelo solo (cf. Análise de terras)
                    </StyledTableHead>
                    <StyledTableCell>
                      <CustomTextField
                        name="elementos_n"
                        value={ext.elementos_n}
                        onChange={onChageEditExtra}
                        error={error_elementos_n}
                        helperText={
                          error_elementos_n ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="elementos_po"
                        value={ext.elementos_po}
                        onChange={onChageEditExtra}
                        error={error_elementos_po}
                        helperText={
                          error_elementos_po ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="elementos_ko"
                        value={ext.elementos_ko}
                        onChange={onChageEditExtra}
                        error={error_elementos_ko}
                        helperText={
                          error_elementos_ko ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="elementos_mgo"
                        value={ext.elementos_mgo}
                        onChange={onChageEditExtra}
                        error={error_elementos_mgo}
                        helperText={
                          error_elementos_mgo ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="elementos_cao"
                        value={ext.elementos_cao}
                        onChange={onChageEditExtra}
                        error={error_elementos_cao}
                        helperText={
                          error_elementos_cao ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="elementos_so"
                        value={ext.elementos_so}
                        onChange={onChageEditExtra}
                        error={error_elementos_so}
                        helperText={
                          error_elementos_so ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="elementos_b"
                        value={ext.elementos_b}
                        onChange={onChageEditExtra}
                        error={error_elementos_b}
                        helperText={
                          error_elementos_b ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="elementos_campp_opcao"
                        value={ext.elementos_campp_opcao}
                        onChange={onChageEditExtra}
                      />
                    </StyledTableCell>
                    <StyledTableCell rowSpan={3}>
                      <ButtonCadernos
                        mostrarBotaoGravar
                        aoClicarGravar={() =>
                          onSaveEditExtra(updateCreateTable)
                        }
                        mostrarBotaoCancelar
                        aoClicarCancelar={() => setEditingIdExtra(null)}
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
                        name="totais_apli_homo_n"
                        value={ext.totais_apli_homo_n}
                        onChange={onChageEditExtra}
                        error={error_totais_apli_homo_n}
                        helperText={
                          error_totais_apli_homo_n ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="totais_apli_homo_po"
                        value={ext.totais_apli_homo_po}
                        onChange={onChageEditExtra}
                        error={error_totais_apli_homo_po}
                        helperText={
                          error_totais_apli_homo_po ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="totais_apli_homo_ko"
                        value={ext.totais_apli_homo_ko}
                        onChange={onChageEditExtra}
                        error={error_totais_apli_homo_ko}
                        helperText={
                          error_totais_apli_homo_ko ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="totais_apli_homo_mgo"
                        value={ext.totais_apli_homo_mgo}
                        onChange={onChageEditExtra}
                        error={error_totais_apli_homo_mgo}
                        helperText={
                          error_totais_apli_homo_mgo ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="totais_apli_homo_cao"
                        value={ext.totais_apli_homo_cao}
                        onChange={onChageEditExtra}
                        error={error_totais_apli_homo_cao}
                        helperText={
                          error_totais_apli_homo_cao ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="totais_apli_homo_so"
                        value={ext.totais_apli_homo_so}
                        onChange={onChageEditExtra}
                        error={error_totais_apli_homo_so}
                        helperText={
                          error_totais_apli_homo_so ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="totais_apli_homo_b"
                        value={ext.totais_apli_homo_b}
                        onChange={onChageEditExtra}
                        error={error_totais_apli_homo_b}
                        helperText={
                          error_totais_apli_homo_b ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="totais_apli_homo_campp_opcao"
                        value={ext.totais_apli_homo_campp_opcao}
                        onChange={onChageEditExtra}
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead colSpan={5}>
                      Totais aplicados por hectare (kg/ha)
                    </StyledTableHead>

                    <StyledTableCell>
                      <CustomTextField
                        name="totais_apli_n"
                        value={ext.totais_apli_n}
                        onChange={onChageEditExtra}
                        error={error_totais_apli_n}
                        helperText={
                          error_totais_apli_n ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="totais_apli_po"
                        value={ext.totais_apli_po}
                        onChange={onChageEditExtra}
                        error={error_totais_apli_po}
                        helperText={
                          error_totais_apli_po ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="totais_apli_ko"
                        value={ext.totais_apli_ko}
                        onChange={onChageEditExtra}
                        error={error_totais_apli_ko}
                        helperText={
                          error_totais_apli_ko ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="totais_apli_mgo"
                        value={ext.totais_apli_mgo}
                        onChange={onChageEditExtra}
                        error={error_totais_apli_mgo}
                        helperText={
                          error_totais_apli_mgo ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="totais_apli_cao"
                        value={ext.totais_apli_cao}
                        onChange={onChageEditExtra}
                        error={error_totais_apli_cao}
                        helperText={
                          error_totais_apli_cao ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="totais_apli_so"
                        value={ext.totais_apli_so}
                        onChange={onChageEditExtra}
                        error={error_totais_apli_so}
                        helperText={
                          error_totais_apli_so ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="totais_apli_b"
                        value={ext.totais_apli_b}
                        onChange={onChageEditExtra}
                        error={error_totais_apli_b}
                        helperText={
                          error_totais_apli_b ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="totais_apli_campp_opcao"
                        value={ext.totais_apli_campp_opcao}
                        onChange={onChageEditExtra}
                      />
                    </StyledTableCell>
                  </TableRow>
                </>
              ) : (
                <>
                  <TableRow>
                    <StyledTableHead colSpan={5}>
                      Elementos fornecidos pelo solo (cf. Análise de terras)
                    </StyledTableHead>
                    <StyledTableCell>{ext.elementos_n} </StyledTableCell>
                    <StyledTableCell>{ext.elementos_po}</StyledTableCell>
                    <StyledTableCell>{ext.elementos_ko}</StyledTableCell>
                    <StyledTableCell>{ext.elementos_mgo}</StyledTableCell>
                    <StyledTableCell>{ext.elementos_cao}</StyledTableCell>
                    <StyledTableCell>{ext.elementos_so}</StyledTableCell>
                    <StyledTableCell>{ext.elementos_b}</StyledTableCell>
                    <StyledTableCell>
                      {ext.elementos_campp_opcao}
                    </StyledTableCell>
                    <StyledTableCell rowSpan={3}>
                      <ButtonCadernos
                        mostrarBotaoEditar
                        aoClicarEditar={() =>
                          handleEditExtra(ext.id_atividade_two)
                        }
                        mostrarBotaoApagar
                        aoClicarApagar={() =>
                          handleClickOpenDeleteExtra(ext.id_atividade_two)
                        }
                      />
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead colSpan={5}>
                      Totais aplicados na subparcela ou na zona homogénea
                      (kg)
                    </StyledTableHead>
                    <StyledTableCell>
                      {ext.totais_apli_homo_n}
                    </StyledTableCell>
                    <StyledTableCell>
                      {ext.totais_apli_homo_po}
                    </StyledTableCell>
                    <StyledTableCell>
                      {ext.totais_apli_homo_ko}
                    </StyledTableCell>
                    <StyledTableCell>
                      {ext.totais_apli_homo_mgo}
                    </StyledTableCell>
                    <StyledTableCell>
                      {ext.totais_apli_homo_cao}
                    </StyledTableCell>
                    <StyledTableCell>
                      {ext.totais_apli_homo_so}
                    </StyledTableCell>
                    <StyledTableCell>
                      {ext.totais_apli_homo_b}
                    </StyledTableCell>
                    <StyledTableCell>
                      {ext.totais_apli_homo_campp_opcao}
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead colSpan={5}>
                      Totais aplicados por hectare (kg/ha)
                    </StyledTableHead>
                    <StyledTableCell>{ext.totais_apli_n}</StyledTableCell>
                    <StyledTableCell>{ext.totais_apli_po}</StyledTableCell>
                    <StyledTableCell>{ext.totais_apli_ko}</StyledTableCell>
                    <StyledTableCell>{ext.totais_apli_mgo}</StyledTableCell>
                    <StyledTableCell>{ext.totais_apli_cao}</StyledTableCell>
                    <StyledTableCell>{ext.totais_apli_so}</StyledTableCell>
                    <StyledTableCell>{ext.totais_apli_b}</StyledTableCell>
                    <StyledTableCell>
                      {ext.totais_apli_campp_opcao}
                    </StyledTableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          );
        })}

      <ConfirmDialog
        open={openDeleteAtividades}
        onClose={() => setOpenDeleteExtra(false)}
        onConfirm={handleDeleteExtra}
        message="Deseja eliminar o registo?"
      />

    </CustomThemeProvider>

  );
};
