import React from "react";
import { ChangeEvent, useState } from "react";
import { Box, Paper, Stack, TextField, Typography } from "@mui/material";
import { TableContainer, TablePagination } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { TableFooter, TableHead } from "@mui/material";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { CustomTextField } from "../../../Styles/theme/customThemeprovider";
import { CustomSelect } from "../../../Styles/theme/customThemeprovider";
import { CustomThemeProvider } from "../../../Styles/theme/customThemeprovider";
import BasicPopover from "../../../Components/Popover";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { StyledTableCell } from "../../../Styles/tabelCellStyled/customTableCell";
import { StyledTableHead } from "../../../Styles/tabelCellStyled/customTableCell";
import TablePaginationActions from "../../../Components/Pagination/pagination";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import { del } from "../../../Services/tokenConfig";
import { func_print } from "../../../Func_genericas/func_print";
import { RegistoAtividadesExtra } from "./extraAtividades";
import { IPage5B, IPage5B_Two } from "../../../Interfaces/cadernos/caderno5/interfaces5B";
import { fertilizacao } from "../../../informacao_estatica";

interface IRegistoAtividadesProps {
  atividades: IPage5B | undefined;
  rows: IPage5B[];
  setAtividades: React.Dispatch<React.SetStateAction<IPage5B | undefined>>;
  setRowsAtividades: React.Dispatch<React.SetStateAction<IPage5B[]>>;
  onSaveTabela: (callback: () => void) => void;
  onSaveEdit: (callback: () => void) => void;
  setEditingId: React.Dispatch<React.SetStateAction<number | null | undefined>>;
  setEditRow: React.Dispatch<React.SetStateAction<boolean>>;
  editingId: number | null | undefined;
  editRow: boolean;
  updateCreateTable: () => void;

  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSnackSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSnackError: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;

  extraObject: IPage5B_Two | undefined;
  extraFields: IPage5B_Two[];
  setExtraObject: React.Dispatch<React.SetStateAction<IPage5B_Two | undefined>>;
  setExtraFields: React.Dispatch<React.SetStateAction<IPage5B_Two[]>>
  onSaveTabelaExtra: (callback: () => void) => void;
  onSaveEditExtra: (callback: () => void) => void;
  setEditingIdExtra: React.Dispatch<React.SetStateAction<number | null | undefined>>;
  setEditRowExtra: React.Dispatch<React.SetStateAction<boolean>>;
  editingIdExtra: number | null | undefined;
  editRowExtra: boolean;

}

export const RegistoAtividades: React.FC<IRegistoAtividadesProps> = ({
  atividades,
  rows,
  extraObject,
  extraFields,
  setExtraObject,
  setExtraFields,
  setRowsAtividades,
  setAtividades,
  updateCreateTable,
  onSaveTabela,
  onSaveEdit,
  setEditingId,
  setEditRow,
  editingId,
  editRow,
  setIsLoading,
  setOpenSnackSuccess,
  setOpenSnackError,
  setMessage,
  onSaveTabelaExtra,
  onSaveEditExtra,
  editingIdExtra,
  setEditingIdExtra,
  setEditRowExtra,
  editRowExtra
}) => {
  const [showNewRow, setShowNewRow] = useState(false);
  const [openDeleteAtividades, setOpenDeleteAtividades] = React.useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null | undefined>(0);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const message_apenas_numero = ("Apenas números são aceites");

  const [error_t, set_error_t] = useState<boolean>(false);
  const [error_n, set_error_n] = useState<boolean>(false);
  const [error_po, set_error_po] = useState<boolean>(false);
  const [error_ko, set_error_ko] = useState<boolean>(false);
  const [error_mgo, set_error_mgo] = useState<boolean>(false);
  const [error_cao, set_error_cao] = useState<boolean>(false);
  const [error_so, set_error_so] = useState<boolean>(false);
  const [error_b, set_error_b] = useState<boolean>(false);


  const onInputChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    let newValue: any = value;

    if (type === "date" && value === "") {
      newValue = null;
    }
    if (name === "t") {
      if (isNaN(Number(value))) {
        newValue = (newValue as string).replace(/[^0-9]/g, "");
        set_error_t(true);
      } else {
        set_error_t(false);
      }
    }
    if (name === "n") {
      if (isNaN(Number(value))) {
        set_error_n(true);
         newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_n(false);
      }
    }
    if (name === "po") {
      if (isNaN(Number(value))) {
        set_error_po(true);
         newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_po(false);
      }
    }
    if (name === "ko") {
      if (isNaN(Number(value))) {
        set_error_ko(true);
         newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_ko(false);
      }
    }
    if (name === "mgo") {
      if (isNaN(Number(value))) {
        set_error_mgo(true);
         newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_mgo(false);
      }
    }
    if (name === "cao") {
      if (isNaN(Number(value))) {
        set_error_cao(true);
         newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_cao(false);
      }
    }
    if (name === "so") {
      if (isNaN(Number(value))) {
        set_error_so(true);
         newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_so(false);
      }
    }
    if (name === "b") {
      if (isNaN(Number(value))) {
        set_error_b(true);
         newValue = (newValue as string).replace(/[^0-9]/g, "");
      } else {
        set_error_b(false);
      }
    }

    setAtividades((prevRegisto: any) => ({
      ...prevRegisto,
      [name]: newValue,
    }));
  };

  // EDITAR
  const handleEdit = (id: number | null | undefined) => {
    setEditingId(id);
    setEditRow(true);
  };
  const onEditTableChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    let newValue: any = value;

    if (type === "date" && value === "") {
      newValue = null;
    }

    if (name === "t") {
      if (isNaN(Number(value))) {
        set_error_t(true);
        return;
      } else {
        set_error_t(false);
      }
    }
    if (name === "n") {
      if (isNaN(Number(value))) {
        set_error_n(true);
        return;
      } else {
        set_error_n(false);
      }
    }
    if (name === "po") {
      if (isNaN(Number(value))) {
        set_error_po(true);
        return;
      } else {
        set_error_po(false);
      }
    }
    if (name === "ko") {
      if (isNaN(Number(value))) {
        set_error_ko(true);
        return;
      } else {
        set_error_ko(false);
      }
    }
    if (name === "mgo") {
      if (isNaN(Number(value))) {
        set_error_mgo(true);
        return;
      } else {
        set_error_mgo(false);
      }
    }
    if (name === "cao") {
      if (isNaN(Number(value))) {
        set_error_cao(true);
        return;
      } else {
        set_error_cao(false);
      }
    }
    if (name === "so") {
      if (isNaN(Number(value))) {
        set_error_so(true);
        return;
      } else {
        set_error_so(false);
      }
    }
    if (name === "b") {
      if (isNaN(Number(value))) {
        set_error_b(true);
        return;
      } else {
        set_error_b(false);
      }
    }

    if (editingId !== null) {
      const updatedTable = rows.map((tab) => {
        if (tab.id_atividade === editingId) {
          return {
            ...tab,
            [name]: newValue,
          };
        }
        return tab;
      });
      setRowsAtividades(updatedTable);
    }
  };

  // Delete
  const handleClickOpenDeleteAtividades = (id: number | undefined) => {
    setIdToDelete(id);
    setOpenDeleteAtividades(true);
  };
  const handleDeleteAtividades = async () => {
    try {
      setIsLoading(true);
      let res = await del(`/delete__reg_actividades_5b/${idToDelete}`);

      if (res.status === 200) {
        setMessage("Registo eliminado com sucesso!");
        setOpenDeleteAtividades(false);
        setIdToDelete(null);
        setRowsAtividades((oldRows) => [
          ...oldRows.filter((oldRow) => oldRow.id_atividade !== idToDelete),
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


  /**************** PAGINAÇÃO *********************/
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
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
              <TableCell
                colSpan={12}
                sx={{
                  fontWeight: 600,
                  textAlign: "left",
                  fontFamily: "candara",
                  fontSize: 18,
                }}
              >
                Registo das atividades
              </TableCell>

              <TableCell colSpan={2}>
                <BarraDeFerramentas
                  mostrarBotaoNovo
                  textoBotaoNovo="Novo Registo"
                  aoClicarNovo={() => setShowNewRow(true)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableHead rowSpan={2}>
                <Stack direction="row" justifyContent="center">
                  Data *
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={"Formato para registo diário deverá ser: dd-mm-aaaa"}
                    />
                  </Box>
                </Stack>
              </StyledTableHead>
              <StyledTableHead rowSpan={2} sx={{ minWidth: 180 }}>
                <Stack direction="row" justifyContent="center">
                  Operação Cultural
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={"Registar qualquer intervenção na cultura, incluindo no solo, exceto a fertilização.\n\n Preenchimento opcional para as intervenções Conservação do Solo - Sementeira Direta,\n Conservação do Solo - Enrelvamento» e «Apoio Zonal Peneda-Gerês - manutenção de socalcos»."}
                    />
                  </Box>
                </Stack>
              </StyledTableHead>
              <StyledTableHead rowSpan={2} sx={{ minWidth: 180 }}>
                <Stack direction="row" justifyContent="center">
                  Fertilização *
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={" O beneficiário deverá preencher com um dos seguintes valores por linha (data da aplicação): \nAplicação de corretivos\nFertilização fundo\nAdubação verde\nAplicação de estrume\nAplicação de chorume\nFertilização cobertura\n\nPreenchimento obrigatório para todas as tipologias da intervenção «Planos Zonais Agroambientais»."}
                    />
                  </Box>
                </Stack>
              </StyledTableHead>
              <StyledTableHead rowSpan={2} sx={{ minWidth: 180 }}>
                Produto Utilizado
              </StyledTableHead>
              <StyledTableHead>Quantidade Aplicada</StyledTableHead>
              <StyledTableHead colSpan={8}>
                Incorporação de nutrientes (Kg)
              </StyledTableHead>

              <StyledTableHead rowSpan={2}>Ações</StyledTableHead>
            </TableRow>
            <TableRow>
              <StyledTableHead>t</StyledTableHead>
              <StyledTableHead>N</StyledTableHead>
              <StyledTableHead>P2O5</StyledTableHead>
              <StyledTableHead>K2O</StyledTableHead>
              <StyledTableHead>MgO</StyledTableHead>
              <StyledTableHead>CaO</StyledTableHead>
              <StyledTableHead>SO3</StyledTableHead>
              <StyledTableHead>B</StyledTableHead>
              <StyledTableHead sx={{ minWidth: 150 }}>Outros</StyledTableHead>
            </TableRow>
          </TableHead>

          {showNewRow && (
            <TableBody>
              <TableRow>
                <StyledTableCell>
                  <TextField
                    variant="filled"
                    name="data"
                    type="date"
                    inputProps={{
                      style: {
                        fontSize: 12,
                        fontFamily: "verdana",
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={atividades?.data !== undefined ? atividades?.data : ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onInputChange(e)
                    }
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="operacao_cult"
                    value={atividades?.operacao_cult}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomSelect
                    value={atividades?.fertilizacao !== undefined ? atividades?.fertilizacao : ""}
                    name="fertilizacao"
                    onChange={onInputChange}
                    options={fertilizacao}
                    label="Fertilização"
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="produto_utilizado"
                    value={atividades?.produto_utilizado}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="t"
                    value={atividades?.t}
                    onChange={onInputChange}
                    error={error_t}
                    helperText={
                      error_t ? message_apenas_numero : ""
                    }
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="n"
                    value={atividades?.n}
                    onChange={onInputChange}
                    error={error_n}
                    helperText={
                      error_n ? message_apenas_numero : ""
                    }
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="po"
                    value={atividades?.po}
                    onChange={onInputChange}
                    error={error_po}
                    helperText={
                      error_po ? message_apenas_numero : ""
                    }
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="ko"
                    value={atividades?.ko}
                    onChange={onInputChange}
                    error={error_ko}
                    helperText={
                      error_ko ? message_apenas_numero : ""
                    }
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="mgo"
                    value={atividades?.mgo}
                    onChange={onInputChange}
                    error={error_mgo}
                    helperText={
                      error_mgo ? message_apenas_numero : ""
                    }
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="cao"
                    value={atividades?.cao}
                    onChange={onInputChange}
                    error={error_cao}
                    helperText={
                      error_cao ? message_apenas_numero : ""
                    }
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="so"
                    value={atividades?.so}
                    onChange={onInputChange}
                    error={error_so}
                    helperText={
                      error_so ? message_apenas_numero : ""
                    }
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="b"
                    value={atividades?.b}
                    onChange={onInputChange}
                    error={error_b}
                    helperText={
                      error_b ? message_apenas_numero : ""
                    }
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="campp_opcao"
                    value={atividades?.campp_opcao}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <Stack direction="row" justifyContent="center">
                    <ButtonCadernos
                      mostrarBotaoCancelar
                      aoClicarCancelar={() => setShowNewRow(false)}
                      mostrarBotaoGravar
                      aoClicarGravar={() => onSaveTabela(updateCreateTable)}
                    />
                  </Stack>
                </StyledTableCell>
              </TableRow>
            </TableBody>
          )}

          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, key) => (
            <TableBody key={key}>
              <TableRow >
                {editingId === row.id_atividade && editRow ? (
                  <>
                    <StyledTableCell>
                      <CustomTextField
                        name="data"
                        value={row.data || "" }
                        onChange={onEditTableChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="operacao_cult"
                        value={row.operacao_cult}
                        onChange={onEditTableChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomSelect
                        value={row.fertilizacao !== undefined ? row.fertilizacao : ""}
                        name="fertilizacao"
                        onChange={onEditTableChange}
                        options={fertilizacao}
                        label="Fertilização"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="produto_utilizado"
                        value={row.produto_utilizado}
                        onChange={onEditTableChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="t"
                        value={row.t}
                        onChange={onEditTableChange}
                        error={error_t}
                        helperText={
                          error_t ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="n"
                        value={row.n}
                        onChange={onEditTableChange}
                        error={error_n}
                        helperText={
                          error_n ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="po"
                        value={row.po}
                        onChange={onEditTableChange}
                        error={error_po}
                        helperText={
                          error_po ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="ko"
                        value={row.ko}
                        onChange={onEditTableChange}
                        error={error_ko}
                        helperText={
                          error_ko ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="mgo"
                        value={row.mgo}
                        onChange={onEditTableChange}
                        error={error_mgo}
                        helperText={
                          error_mgo ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="cao"
                        value={row.cao}
                        onChange={onEditTableChange}
                        error={error_cao}
                        helperText={
                          error_cao ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="so"
                        value={row.so}
                        onChange={onEditTableChange}
                        error={error_so}
                        helperText={
                          error_so ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="b"
                        value={row.b}
                        onChange={onEditTableChange}
                        error={error_b}
                        helperText={
                          error_b ? message_apenas_numero : ""
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="campp_opcao"
                        value={row.campp_opcao}
                        onChange={onEditTableChange}
                      />
                    </StyledTableCell>
                  </>
                ) : (
                  <>
                    <StyledTableCell>{row.data} </StyledTableCell>
                    <StyledTableCell>{row.operacao_cult}</StyledTableCell>
                    <StyledTableCell>{row.fertilizacao}</StyledTableCell>
                    <StyledTableCell>{row.produto_utilizado}</StyledTableCell>
                    <StyledTableCell>{row.t} </StyledTableCell>
                    <StyledTableCell>{row.n} </StyledTableCell>
                    <StyledTableCell>{row.po} </StyledTableCell>
                    <StyledTableCell>{row.ko} </StyledTableCell>
                    <StyledTableCell>{row.mgo} </StyledTableCell>
                    <StyledTableCell>{row.cao} </StyledTableCell>
                    <StyledTableCell>{row.so} </StyledTableCell>
                    <StyledTableCell>{row.b} </StyledTableCell>
                    <StyledTableCell>{row.campp_opcao}</StyledTableCell>
                  </>
                )}

                {editingId === row.id_atividade ? (
                  <StyledTableCell>
                    <ButtonCadernos
                      mostrarBotaoGravar
                      aoClicarGravar={() => onSaveEdit(updateCreateTable)}
                      mostrarBotaoCancelar
                      aoClicarCancelar={() => setEditingId(null)}
                    />
                  </StyledTableCell>
                ) : (
                  <StyledTableCell>
                    <ButtonCadernos
                      mostrarBotaoEditar
                      aoClicarEditar={() => handleEdit(row.id_atividade)}
                      mostrarBotaoApagar
                      aoClicarApagar={() => handleClickOpenDeleteAtividades(row.id_atividade)}
                    />
                  </StyledTableCell>
                )}
              </TableRow>
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={19} />
                </TableRow>
              )}
            </TableBody>
          ))}

          <RegistoAtividadesExtra
            extraObject={extraObject}
            extraFields={extraFields}
            setExtraObject={setExtraObject}
            setExtraFields={setExtraFields}
            updateCreateTable={() => setShowNewRow(false)}
            onSaveTabelaExtra={onSaveTabelaExtra}
            onSaveEditExtra={onSaveEditExtra}
            setEditingIdExtra={setEditingIdExtra}
            setEditRowExtra={setEditRowExtra}
            editingIdExtra={editingIdExtra}
            editRowExtra={editRowExtra}
            setOpenSnackSuccess={setOpenSnackSuccess}
            setOpenSnackError={setOpenSnackError}
            setMessage={setMessage}
            setIsLoading={setIsLoading} />



          <TableFooter>
            <TableRow sx={{ width: "100%" }}>
              <TableCell colSpan={7}>
                <Typography style={{ fontSize: 14, fontFamily: "candara" }}>
                  * Campos de preenchimento obrigatório
                </Typography>
              </TableCell>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "Todas", value: -1 }]}
                colSpan={7}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelDisplayedRows={({ from, to, count }) => {
                  return `${from}–${to} de ${count !== -1 ? count : `mais do que ${to}`}`;
                }}
                labelRowsPerPage={'Linhas por página'}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </table>
        <ConfirmDialog
          open={openDeleteAtividades}
          onClose={() => setOpenDeleteAtividades(false)}
          onConfirm={handleDeleteAtividades}
          message="Deseja eliminar o registo?"
        />
      </TableContainer>
    </CustomThemeProvider>

  );
};
