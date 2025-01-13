import React, { ChangeEvent, useState } from "react";

import { Snackbar, Stack, TextField } from "@mui/material";
import { Box, Paper } from "@mui/material";
import { TableFooter, TablePagination } from "@mui/material";
import { TableBody, TableHead } from "@mui/material";
import { TableContainer, TableCell, TableRow } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import TablePaginationActions from "../../../Components/Pagination/pagination";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { StyledTableHead } from "../../../Styles/tabelCellStyled/customTableCell";
import { StyledTableCell } from "../../../Styles/tabelCellStyled/customTableCell";
import { CustomThemeProvider } from "../../../Styles/theme/customThemeprovider";
import { CustomTextField } from "../../../Styles/theme/customThemeprovider";
import BasicPopover from "../../../Components/Popover";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import { del } from "../../../Services/tokenConfig";
import { func_print } from "../../../Func_genericas/func_print";
import LoadingVulpes from "../../../Styles/Loader/loading";
import { IAguaDeRega } from "../../../Interfaces/cadernos/caderno5/interfaces5D";

interface IAguaRegaProps {
  agua: IAguaDeRega;
  rows: IAguaDeRega[];
  setAgua: React.Dispatch<React.SetStateAction<IAguaDeRega>>;
  setRowsAgua: React.Dispatch<React.SetStateAction<IAguaDeRega[]>>;
  updateCreateTable: () => void;
  handleAddRowAgua: () => void;
  onSaveTabela: (callback: () => void) => void;
  onSaveEdit: (callback: () => void) => void;
  setEditingId: React.Dispatch<React.SetStateAction<number | null | undefined>>;
  setEditRow: React.Dispatch<React.SetStateAction<boolean>>;
  editingId: number | null | undefined;
  editRow: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref}  {...props} />;
});

export const AguaRegaForm: React.FC<IAguaRegaProps> = ({
  agua,
  rows,
  setAgua,
  setRowsAgua,
  handleAddRowAgua,
  updateCreateTable,
  onSaveTabela,
  onSaveEdit,
  setEditingId,
  setEditRow,
  editingId,
  editRow,
}) => {
  const [showNewRow, setShowNewRow] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const message_apenas_numero = ("Apenas números são aceites");
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [idToDelete, setIdToDelete] = useState<number | null | undefined>(null);
  const [openDeleteAgua, setOpenDeleteAgua] = React.useState(false);

  const [error_eficiencia_rega, set_error_eficiencia_rega] = useState<boolean>(false);
  const [error_volume, set_error_volume] = useState<boolean>(false);
  const [error_dotacao, set_error_dotacao] = useState<boolean>(false);
  const [error_teor, set_error_teor] = useState<boolean>(false);
  const [error_kg_n, set_error_kg_n] = useState<boolean>(false);

  const handleAddRow = () => {
    handleAddRowAgua();
    setShowNewRow(true);
  }

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    let newValue: any = value;

    if (type === "date" && value === "") {
      newValue = null;
    }

    if (name === "eficiencia_rega") {
      if (isNaN(Number(value))) {
        set_error_eficiencia_rega(true);
        return;
      } else {
        set_error_eficiencia_rega(false);
      }
    }
    if (name === "volume") {
      if (isNaN(Number(value))) {
        set_error_volume(true);
        return;
      } else {
        set_error_volume(false);
      }
    }
    if (name === "dotacao") {
      if (isNaN(Number(value))) {
        set_error_dotacao(true);
        return;
      } else {
        set_error_dotacao(false);
      }
    }
    if (name === "teor") {
      if (isNaN(Number(value))) {
        set_error_teor(true);
        return;
      } else {
        set_error_teor(false);
      }
    }
    if (name === "kg_n") {
      if (isNaN(Number(value))) {
        set_error_kg_n(true);
        return;
      } else {
        set_error_kg_n(false);
      }
    }

    setAgua((prevAzoto) => ({
      ...prevAzoto,
      [name]: newValue,
    }));
  };


  // Editar
  const handleEdit = (id: number | null | undefined) => {
    setEditingId(id);
    setEditRow(true);
  };

  const onInputChangeEdit = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    let newValue: any = value;

    if (type === "date" && value === "") {
      newValue = null;
    }

    if (name === "eficiencia_rega") {
      if (isNaN(Number(value))) {
        set_error_eficiencia_rega(true);
        return;
      } else {
        set_error_eficiencia_rega(false);
      }
    }
    if (name === "volume") {
      if (isNaN(Number(value))) {
        set_error_volume(true);
        return;
      } else {
        set_error_volume(false);
      }
    }
    if (name === "dotacao") {
      if (isNaN(Number(value))) {
        set_error_dotacao(true);
        return;
      } else {
        set_error_dotacao(false);
      }
    }
    if (name === "teor") {
      if (isNaN(Number(value))) {
        set_error_teor(true);
        return;
      } else {
        set_error_teor(false);
      }
    }
    if (name === "kg_n") {
      if (isNaN(Number(value))) {
        set_error_kg_n(true);
        return;
      } else {
        set_error_kg_n(false);
      }
    }

    if (editingId !== null) {
      const updatedTable = rows.map((tab) => {
        if (tab.id_registo_fertil_dois === editingId) {
          return {
            ...tab,
            [name]: newValue,
          }
        }
        return tab;
      });
      setRowsAgua(updatedTable);
    }
  };

  // DELETE
  const handleClickOpenDeleteAgua = (id: number | undefined) => {
    setIdToDelete(id);
    setOpenDeleteAgua(true);
  };

  const handleDeleteAgua = async () => {
    try {
      setIsLoading(true);
      let res = await del(`/delete__reg_act_fertil_azotada_dois_5d/${idToDelete}`);

      if (res.status === 200) {
        setMessage("Eliminado com sucesso!");
        setRowsAgua((oldRows) => [
          ...oldRows.filter((oldRow) => oldRow.id_registo_fertil_dois !== idToDelete),
        ]);
        setIdToDelete(null);
        setOpenDeleteAgua(false);
        setOpenSnackSuccess(true);
      } else {
        setMessage("Erro ao eliminar!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleDeleteAgua", error, true);
      setMessage("Erro ao eliminar o registo!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  /**************** SOMAS  ****************/
  const somaDotacao = rows.reduce((acc, row) => acc + Number(row.dotacao), 0);

  const somaTeor = rows.reduce((acc, row) => acc + Number(row.teor), 0);

  const somaKg = rows.reduce((acc, row) => acc + Number(row.kg_n), 0);

  /*****************  PAGINAÇÃO ********************** */
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
      {isLoading ?
        <LoadingVulpes /> :
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
          <Snackbar
            open={openSnackSuccess}
            autoHideDuration={2000}
            onClose={() => setOpenSnackSuccess(false)}
          >
            <Alert
              onClose={() => setOpenSnackSuccess(false)}
              severity="success"
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
          <Snackbar
            open={openSnackError}
            autoHideDuration={2000}
            onClose={() => setOpenSnackError(false)}
          >
            <Alert
              onClose={() => setOpenSnackError(false)}
              severity="error"
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
          <table style={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={7}
                  sx={{
                    fontWeight: 600,
                    textAlign: "left",
                    fontFamily: "candara",
                    fontSize: 16,
                  }}
                >
                  2 - Azoto fornecido pela água de rega
                  <BasicPopover
                    text={
                      "Quadro de preenchimento obrigatório apenas para as explorações em Zona Vulnerável para cumprimento do disposto na alínea a) do n.º 9 do artigo 8.º da Portaria n.º 259/2012, caso o beneficiário opte pelo registo em CCU."
                    }
                  />
                </TableCell>
                <TableCell colSpan={2}>
                  <BarraDeFerramentas
                    mostrarBotaoNovo
                    textoBotaoNovo="Novo Registo"
                    aoClicarNovo={handleAddRow}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead>Data da rega (dd-mm-aaaa)</StyledTableHead>
                <StyledTableHead>Método de rega</StyledTableHead>
                <StyledTableHead>Eficiência de rega (%)</StyledTableHead>
                <StyledTableHead>
                  Volume aplicado (m3/zona homogénea ou parcela)
                </StyledTableHead>
                <StyledTableHead>Dotação Total (m3/ha)</StyledTableHead>
                <StyledTableHead>
                  Teor em Nitratos
                  <Stack direction="row" justifyContent="center">
                    (mg/l)
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "A dedução de azoto só deverá ser efetuada a partir de 10 mg/l de nitratos, isto é, o N das águas de rega que apresentem teores iguais ou inferiores a 10 mg/l de NO3 não deve ser contabilizado"
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableHead>
                <StyledTableHead>
                  kg de N / ha
                  <Stack direction="row" justifyContent="center">
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Podem ser consideradas duas situações distintas, a seguir apresentadas:  \n\na) No caso da cultura do arroz e do agrião. \n\nN=0,000226xTx0,40xVxf \n\nN é a quantidade de azoto veiculada pela água, expressa em kg/ha; \nT - é o teor médio de nitratos da água de rega, em mg/l de NO3;\nV - é o volume total de água utilizada na rega, em m3/ha; \nF - é um fator que depende da eficiência da rega (a água retida no canteiro é cerca de 30 a 60% do volume de água fornecido). \nO fator 0,40 desta expressão corresponde à eficiência do azoto nítrico. \n\nb) Nos restantes casos. \n\nN=0,000226xTxVxF \n\nN é a quantidade de azoto veiculada pela água, expressa em kg/ha; \nT - é o teor médio de nitratos da água de rega, em mg/l de NO3;\nV - é o volume total de água utilizada na rega, em m3/ha; \nF - é um fator que depende da eficiência da rega (em rega localizada deve rondar 0,90 a 0,95).\n\nFonte: Manual das Boas Práticas para a Implementação do Programa de Ação em Zonas Vulneráveis de Portugal Continental (DGADR, 2021)."
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableHead>

                <StyledTableHead>Ações</StyledTableHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {showNewRow && (
                <TableRow>
                  <StyledTableCell>
                    <TextField
                      variant="filled"
                      type="date"
                      inputProps={{
                        style: { fontSize: 12, fontFamily: "verdana" },
                      }}
                      name="data_rega"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={agua.data_rega}
                      onChange={
                        onInputChange as (
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => void
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="metodo_rega"
                      value={agua.metodo_rega}
                      onChange={onInputChange}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="eficiencia_rega"
                      value={agua.eficiencia_rega}
                      onChange={onInputChange}
                      error={error_eficiencia_rega}
                      helperText={error_eficiencia_rega ? message_apenas_numero : ""}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="volume"
                      value={agua.volume}
                      onChange={onInputChange}
                      error={error_volume}
                      helperText={error_volume ? message_apenas_numero : ""}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="dotacao"
                      value={agua.dotacao}
                      onChange={onInputChange}
                      error={error_dotacao}
                      helperText={error_dotacao ? message_apenas_numero : ""}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="teor"
                      value={agua.teor}
                      onChange={onInputChange}
                      error={error_teor}
                      helperText={error_teor ? message_apenas_numero : ""}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="kg_n"
                      value={agua.kg_n}
                      onChange={onInputChange}
                      error={error_kg_n}
                      helperText={error_kg_n ? message_apenas_numero : ""}
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
              )}

              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row, key) => (
                <React.Fragment key={key}>
                  <TableRow key={row.id_registo_fertil_dois}>
                    {editingId === row.id_registo_fertil_dois &&
                      editRow === true ? (
                      <>
                        <StyledTableCell>
                          <TextField
                            variant="filled"
                            name="data_rega"
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
                            value={row.data_rega}
                            onChange={
                              onInputChangeEdit as (
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => void
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="metodo_rega"
                            value={row.metodo_rega}
                            onChange={onInputChangeEdit}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="eficiencia_rega"
                            value={row.eficiencia_rega}
                            onChange={onInputChangeEdit}
                            error={error_eficiencia_rega}
                            helperText={error_eficiencia_rega ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="volume"
                            value={row.volume}
                            onChange={onInputChangeEdit}
                            error={error_volume}
                            helperText={error_volume ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="dotacao"
                            value={row.dotacao}
                            onChange={onInputChangeEdit}
                            error={error_dotacao}
                            helperText={error_dotacao ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="teor"
                            value={row.teor}
                            onChange={onInputChangeEdit}
                            error={error_teor}
                            helperText={error_teor ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="kg_n"
                            value={row.kg_n}
                            onChange={onInputChangeEdit}
                            error={error_kg_n}
                            helperText={error_kg_n ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                      </>
                    ) : (
                      <>
                        <StyledTableCell>{row.data_rega}</StyledTableCell>
                        <StyledTableCell>{row.metodo_rega}</StyledTableCell>
                        <StyledTableCell>{row.eficiencia_rega !== "" ? row.eficiencia_rega + "%" : ""}</StyledTableCell>
                        <StyledTableCell>{row.volume}</StyledTableCell>
                        <StyledTableCell>{row.dotacao}</StyledTableCell>
                        <StyledTableCell>{row.teor}</StyledTableCell>
                        <StyledTableCell>{row.kg_n}</StyledTableCell>
                      </>
                    )}

                    {editingId === row.id_registo_fertil_dois && editRow ? (
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
                          aoClicarEditar={() =>
                            handleEdit(row.id_registo_fertil_dois)
                          }
                          mostrarBotaoApagar
                          aoClicarApagar={() =>
                            handleClickOpenDeleteAgua(row.id_registo_fertil_dois)
                          }
                        />
                      </StyledTableCell>
                    )}
                  </TableRow>
                </React.Fragment>
              ))}
              <TableRow>
                <TableCell colSpan={3}></TableCell>
                <StyledTableCell sx={{ textAlign: "right" }}>
                  {"Total ->"}
                </StyledTableCell>
                <StyledTableCell>{somaDotacao} </StyledTableCell>
                <StyledTableCell>{somaTeor} </StyledTableCell>
                <StyledTableCell>{somaKg} </StyledTableCell>
              </TableRow>
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={19} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow sx={{ width: "100%" }}>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={14}
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
        </TableContainer>
      }
      <ConfirmDialog
        open={openDeleteAgua}
        onClose={() => setOpenDeleteAgua(false)}
        onConfirm={handleDeleteAgua}
        message="Deseja eliminar o registo?"
      />
    </CustomThemeProvider>
  );
};
