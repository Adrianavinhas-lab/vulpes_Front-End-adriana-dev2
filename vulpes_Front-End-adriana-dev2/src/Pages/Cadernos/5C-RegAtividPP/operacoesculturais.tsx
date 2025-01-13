import React from "react";
import { ChangeEvent, useState } from "react";

import { Box, SelectChangeEvent, Snackbar, TableFooter, TextField } from "@mui/material";
import { TablePagination } from "@mui/material";
import { Paper, Stack, TableBody } from "@mui/material";
import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import TablePaginationActions from "../../../Components/Pagination/pagination";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { StyledTableCell, StyledTableHead, } from "../../../Styles/tabelCellStyled/customTableCell";
import BasicPopover from "../../../Components/Popover";
import { CustomSelect, CustomTextField, CustomThemeProvider, } from "../../../Styles/theme/customThemeprovider";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import { del } from "../../../Services/tokenConfig";
import { func_print } from "../../../Func_genericas/func_print";
import LoadingVulpes from "../../../Styles/Loader/loading";
import { IOperacoesCulturais } from "../../../Interfaces/cadernos/caderno5/interfaces5C";
import { operacaocultural, tipoFertilizacao } from "../../../informacao_estatica";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref}  {...props} />;
});

interface IOperacoesCulturaisProps {
  operacoes: IOperacoesCulturais | undefined;
  rows: IOperacoesCulturais[];
  setOperacoes: React.Dispatch<React.SetStateAction<IOperacoesCulturais | undefined>>;
  setRows: React.Dispatch<React.SetStateAction<IOperacoesCulturais[]>>;

  onSaveTabela: (callback: () => void) => void;
  onSaveEdit: (callback: () => void) => void;
  setEditingId: React.Dispatch<React.SetStateAction<number | null | undefined>>;
  setEditRow: React.Dispatch<React.SetStateAction<boolean>>;
  editingId: number | null | undefined;
  editRow: boolean;
  updateCreateTable: () => void;
}

export const OperacoesCulturaisForm: React.FC<IOperacoesCulturaisProps> = ({
  operacoes,
  rows,
  setOperacoes,
  setRows,
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

  const [idToDelete, setIdToDelete] = useState<number | null | undefined>(null);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);

  const message_apenas_numero = ("Apenas números são aceites");

  const [error_area, set_error_area] = useState<boolean>(false);
  const [error_t, set_error_t] = useState<boolean>(false);
  const [error_m, set_error_m] = useState<boolean>(false);
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

    if (name === "area") {
      if (isNaN(Number(value))) {
        set_error_area(true);
        return;
      } else {
        set_error_area(false);
      }
    }
    if (name === "t") {
      if (isNaN(Number(value))) {
        set_error_t(true);
        return;
      } else {
        set_error_t(false);
      }
    }
    if (name === "m") {
      if (isNaN(Number(value))) {
        set_error_m(true);
        return;
      } else {
        set_error_m(false);
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

    setOperacoes((prevOperacoes:any) => ({
      ...prevOperacoes,
      [name]: value,
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

    if (name === "area") {
      if (isNaN(Number(value))) {
        set_error_area(true);
        return;
      } else {
        set_error_area(false);
      }
    }
    if (name === "t") {
      if (isNaN(Number(value))) {
        set_error_t(true);
        return;
      } else {
        set_error_t(false);
      }
    }
    if (name === "m") {
      if (isNaN(Number(value))) {
        set_error_m(true);
        return;
      } else {
        set_error_m(false);
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
        if (tab.id_regis_ope_cult === editingId) {
          return {
            ...tab,
            [name]: newValue,
          };
        }
        return tab;
      });
      setRows(updatedTable);
    }
  };
  // Delete
  const handleClickOpenDelete = (id: number | undefined) => {
    setIdToDelete(id);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      let res = await del(`delete__reg_oper_culturais_PP_um_5c/${idToDelete}`);

      if (res.status === 200) {
        setMessage("Registo eliminado com sucesso!");
        setOpenDelete(false);
        setIdToDelete(null);
        setRows((oldRows) => [
          ...oldRows.filter((oldRow) => oldRow.id_regis_ope_cult !== idToDelete),
        ]);
        setOpenSnackSuccess(true);
      } else {
        setMessage("Erro ao eliminar o registo!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleDelete", error, true);
      setMessage("Erro ao eliminar o registo!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

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
                  colSpan={18}
                  sx={{
                    fontWeight: 700,
                    fontSize: 18,
                    fontFamily: "candara",
                  }}
                >
                  <Stack direction="row" justifyContent="start">
                    5C - Registo das Atividades pastagens permanentes e pastagens
                    biodiversas
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Registo obrigatório para as seguintes intervenções: Maneio da Pastagem Permanente e Conservação do solo-Pastagens Biodiversas. \n\n Pretende-se que o beneficiário registe qualquer intervenção nas pastagens permanentes,\n nomeadamente as datas da instalação (quando a pastagem permanente é instalada no a que respeita o registo), ressementeiras,\n controlo da vegetação arbustiva, rotação do pastoreio e a aplicação de fertilizantes, com base nos resultados dos boletins de análise e nas produções obtidas."
                        }
                      />
                    </Box>
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={16}
                  sx={{ fontWeight: 600, fontFamily: "candara", fontSize: 17 }}
                >
                  1 - Registo das operações culturais
                </TableCell>
                <TableCell colSpan={2}>
                  <BarraDeFerramentas
                    mostrarBotaoNovo
                    textoBotaoNovo="Novo Registo"
                    aoClicarNovo={()=> setShowNewRow(true)}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead rowSpan={2}>
                  Zona
                  <Stack direction="row" justifyContent="center">
                    Homogénea
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          " O registo das atividades deverá ser efetuado de acordo com\n a zona homogénea indicada no separador \n«caracterização das áreas sob compromisso»."
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableHead>
                <StyledTableHead rowSpan={2}>
                  Área
                  <Stack direction="row" justifyContent="center">
                    (ha)
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Área da zona homogénea corresponde ao somatório das subparcelas que a compõem"
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableHead>
                <StyledTableHead rowSpan={2}>Data</StyledTableHead>
                <StyledTableHead rowSpan={2} sx={{ minWidth: 180 }}>
                  Especies existentes no coberto
                  <Stack direction="row" justifyContent="center">
                    vegetal
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Identificar as diferentes espécies ou géneros de plantas\n presentes na zona homogénea, incluindo das leguminosas, quando presentes. \n\nRegisto das espécies/géneros deve ser feito utilizando ';' a separar as\n diferentes espécies presentes na pastagem. (exemplo: azevém; tremocilha; ...)"
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableHead>
                <StyledTableHead rowSpan={2}>
                  Operação
                  <Stack direction="row" justifyContent="center">
                    Cultural
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Registar a operação efetuada em determinada data: \nSementeira \nRessementeira \nControlo vegetação arbustiva"
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableHead>
                <StyledTableHead rowSpan={2}>
                  Tipo de
                  <Stack direction="row" justifyContent="center">
                    fertilização
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "O beneficiário deverá preencher com um dos seguintes valores por linha (data da aplicação):\nAplicação de corretivos\nFertilização fundo\nAplicação de estrume\nAplicação de chorume\nFertilização cobertura\nFertirrega"
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableHead>
                <StyledTableHead rowSpan={2}>
                  Fertilizante utilizado
                </StyledTableHead>
                <StyledTableHead colSpan={2}>Quantidade Aplicada</StyledTableHead>
                <StyledTableHead colSpan={8}>
                  Aplicação de nutrientes (kg/ha)
                </StyledTableHead>
                <StyledTableHead rowSpan={2}>Ações</StyledTableHead>
              </TableRow>

              <TableRow>
                <StyledTableHead>t/ha</StyledTableHead>
                <StyledTableHead>m3/ha</StyledTableHead>
                <StyledTableHead>
                  <Stack direction="row" justifyContent="center">
                    N
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Ter em atenção que na intervenção «conservação do solo-pastagens\n biodiversas» não é permitida a aplicação de azoto após a instalação da pastagem."
                        }
                      />
                    </Box>
                  </Stack>
                </StyledTableHead>
                <StyledTableHead>P2O5</StyledTableHead>
                <StyledTableHead>K2O</StyledTableHead>
                <StyledTableHead>MgO</StyledTableHead>
                <StyledTableHead>CaO</StyledTableHead>
                <StyledTableHead>SO3</StyledTableHead>
                <StyledTableHead>B</StyledTableHead>
                <StyledTableHead width={150}>Outros</StyledTableHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {showNewRow && (
                <>
                  <StyledTableCell>
                    <CustomTextField
                      name="zona_homo"
                      value={operacoes?.zona_homo}
                      onChange={
                        onInputChange as (
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => void
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="area"
                      value={operacoes?.area}
                      onChange={onInputChange}
                      error={error_area}
                      helperText={
                        error_area ? message_apenas_numero : ""
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      variant="filled"
                      type="date"
                      inputProps={{
                        style: { fontSize: 12, fontFamily: "verdana" },
                      }}
                      name="data"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={operacoes?.data}
                      onChange={
                        onInputChange as (
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => void
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="especis_exis"
                      value={operacoes?.especis_exis}
                      onChange={onInputChange}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomSelect
                      value={operacoes?.oper_cultural !== undefined ? operacoes?.oper_cultural : ""}
                      name="oper_cultural"
                      onChange={onInputChange}
                      options={operacaocultural}
                      label="Fertilização"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomSelect
                      value={operacoes?.tipo_ferti !== undefined ? operacoes?.tipo_ferti : ""}
                      name="tipo_ferti"
                      onChange={onInputChange}
                      options={tipoFertilizacao}
                      label="Fertilização"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="ferti_utilizado"
                      inputProps={{ style: { fontSize: 12 } }}
                      value={operacoes?.ferti_utilizado}
                      onChange={onInputChange}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="t"
                      inputProps={{ style: { fontSize: 12 } }}
                      value={operacoes?.t}
                      onChange={onInputChange}
                      error={error_t}
                      helperText={
                        error_t ? message_apenas_numero : ""
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="m"
                      inputProps={{ style: { fontSize: 12 } }}
                      value={operacoes?.m}
                      onChange={onInputChange}
                      error={error_m}
                      helperText={
                        error_m ? message_apenas_numero : ""
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="n"
                      inputProps={{ style: { fontSize: 12 } }}
                      value={operacoes?.n}
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
                      inputProps={{ style: { fontSize: 12 } }}
                      value={operacoes?.po}
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
                      value={operacoes?.ko}
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
                      value={operacoes?.mgo}
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
                      value={operacoes?.cao}
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
                      value={operacoes?.so}
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
                      value={operacoes?.b}
                      onChange={onInputChange}
                      error={error_b}
                      helperText={
                        error_b ? message_apenas_numero : ""
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomTextField
                      multiline
                      name="opcao"
                      value={operacoes?.opcao}
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
                </>
              )}

              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row, key) => (
                <TableRow key={key}>
                  {editingId === row.id_regis_ope_cult && editRow ? (
                    <>
                      <StyledTableCell>
                        <CustomTextField
                          name="zona_homo"
                          value={row.zona_homo}
                          onChange={onEditTableChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="area"
                          value={row.area}
                          onChange={onEditTableChange}
                          error={error_area}
                          helperText={
                            error_area ? message_apenas_numero : ""
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          name="data"
                          variant="filled"
                          type="date"
                          inputProps={{
                            style: { fontSize: 12, fontFamily: "verdana" },
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={row.data}
                          onChange={
                            onEditTableChange as (
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => void
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="especis_exis"
                          value={row.especis_exis}
                          onChange={onEditTableChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomSelect
                          value={operacoes?.oper_cultural !== undefined ? operacoes?.oper_cultural : ""}
                          name="oper_cultural"
                          onChange={onEditTableChange}
                          options={operacaocultural}
                          label="Fertilização"
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomSelect
                          value={operacoes?.tipo_ferti !== undefined ? operacoes?.tipo_ferti : ""}
                          name="tipo_ferti"
                          onChange={onEditTableChange}
                          options={tipoFertilizacao}
                          label="Fertilização"
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomTextField
                          name="ferti_utilizado"
                          value={row.ferti_utilizado}
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
                          name="m"
                          value={row.m}
                          onChange={onEditTableChange}
                          error={error_m}
                          helperText={
                            error_m ? message_apenas_numero : ""
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
                          name="opcao"
                          value={row.opcao}
                          onChange={onEditTableChange}
                        />
                      </StyledTableCell>
                    </>
                  ) : (
                    <>
                      <StyledTableCell>{row.zona_homo}</StyledTableCell>
                      <StyledTableCell>{row.area} </StyledTableCell>
                      <StyledTableCell>{row.data} </StyledTableCell>
                      <StyledTableCell>{row.especis_exis}</StyledTableCell>
                      <StyledTableCell>{row.oper_cultural}</StyledTableCell>
                      <StyledTableCell>{row.tipo_ferti}</StyledTableCell>
                      <StyledTableCell>{row.ferti_utilizado}</StyledTableCell>
                      <StyledTableCell>{row.t} </StyledTableCell>
                      <StyledTableCell>{row.m} </StyledTableCell>
                      <StyledTableCell>{row.n} </StyledTableCell>
                      <StyledTableCell>{row.po} </StyledTableCell>
                      <StyledTableCell>{row.ko} </StyledTableCell>
                      <StyledTableCell>{row.mgo} </StyledTableCell>
                      <StyledTableCell>{row.cao} </StyledTableCell>
                      <StyledTableCell>{row.so} </StyledTableCell>
                      <StyledTableCell aria-multiline>{row.b}</StyledTableCell>
                      <StyledTableCell>{row.opcao}</StyledTableCell>
                    </>
                  )}
                  {editingId === row.id_regis_ope_cult ? (
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
                        aoClicarEditar={() => handleEdit(row.id_regis_ope_cult)}
                        mostrarBotaoApagar
                        aoClicarApagar={() => handleClickOpenDelete(row.id_regis_ope_cult)}
                      />
                    </StyledTableCell>
                  )}
                </TableRow>
              ))}
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
                  colSpan={18}
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
            <ConfirmDialog
              open={openDelete}
              onClose={() => setOpenDelete(false)}
              onConfirm={handleDelete}
              message="Deseja eliminar o registo?"
            />
          </table>
        </TableContainer>
      }
    </CustomThemeProvider>
  );
};
