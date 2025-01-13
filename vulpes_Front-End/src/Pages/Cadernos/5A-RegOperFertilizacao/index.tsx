import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import { useLocation } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SelectChangeEvent, Snackbar, TextField, Typography } from "@mui/material";
import { TableBody, TableFooter, TableHead } from "@mui/material";
import { TableContainer, TableCell, TableRow } from "@mui/material";
import { Box, Paper, Stack } from "@mui/material";
import { TablePagination } from "@mui/material";

import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import CadernoLayout from "../../../Styles/layout/cadernoLayout";
import { del, get, post } from "../../../Services/tokenConfig";
import TablePaginationActions from "../../../Components/Pagination/pagination";
import { Cabecalho5AForm } from "./cabecalho";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import LoadingVulpes from "../../../Styles/Loader/loading";
import { StyledTableCell, StyledTableHead, } from "../../../Styles/tabelCellStyled/customTableCell";
import BasicPopover from "../../../Components/Popover";
import { CustomSelect, CustomTextField, CustomThemeProvider, } from "../../../Styles/theme/customThemeprovider";

import { func_print } from "../../../Func_genericas/func_print";
import { OperacaoFertilizacaoExtra } from "./extraTabela";
import { ICabecalho5A, IPage5A, IPage5ADesdobramento } from "../../../Interfaces/cadernos/caderno5/interfaces5A";
import { operacoes } from "../../../informacao_estatica";
import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
import { Alert } from "../../../Components/Alert/Alert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    contents: {
      flexGrow: 1,
      padding: theme.spacing(0),
    },
    toolbars: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(2, 3),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  })
);

export default function RegOperFertil() {
  const classes = useStyles();
  const location = useLocation();

  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [, setCreateCabecalho] = useState(false); // FECHAR CABEÇALHO POR PROPS
  const [idToDelete, setIdToDelete] = useState<number | null | undefined>(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0); // grava o index da zona homogénea selecionada

  const [idCabecalho, setIdCabecalho] = useState(0);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openDeleteExtra, setOpenDeleteExtra] = React.useState(false);
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [editingId, setEditingId] = useState<number | null | undefined>(null);
  const [editingIdExtra, setEditingIdExtra] = useState<number | null | undefined>(null);

  const [cabecalhos, setCabecalhos] = useState<ICabecalho5A[]>([]);
  const [showNewRow, setShowNewRow] = useState(false);
  const [editRow, setEditRow] = useState(false);
  const [editRowExtra, setEditRowExtra] = useState(false);
  const [, setCreateObsRow] = useState(false);

  const [error_t, set_error_t] = useState<boolean>(false);
  const [error_m, set_error_m] = useState<boolean>(false);
  const [error_n, set_error_n] = useState<boolean>(false);
  const [error_po, set_error_po] = useState<boolean>(false);
  const [error_ko, set_error_ko] = useState<boolean>(false);
  const [error_mgo, set_error_mgo] = useState<boolean>(false);
  const [error_cao, set_error_cao] = useState<boolean>(false);
  const [error_so, set_error_so] = useState<boolean>(false);
  const [error_b, set_error_b] = useState<boolean>(false);
  const message_apenas_numero = ("Apenas números são aceites");

  const [rows, setRows] = useState<IPage5A[]>([]);
  const [newRow, setNewRow] = useState<IPage5A>();

  const [extraRows, setExtraRows] = useState<IPage5ADesdobramento[]>([]);
  const [extraRow, setExtraRow] = useState<IPage5ADesdobramento>();


  /********************* SELEÇÃO DA ZONA HOMOGÉNEA*****************/
  const handleSelectZona = async (index: number, idZonaHomo: any) => {
    try {
      setSelectedIndex(index);
      setIdCabecalho(idZonaHomo);
      await getInfoVariasTabelas(idZonaHomo);
    } catch (error) {
      func_print("handleSelectZona", error, true);
      setMessage("Erro ao gravar!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  /********************** GET FUNCTIONS *********************/
  async function getCabecalhoOperFertil() {

    try {
      let res = await get(`/get_reg_operacoes_fertil_cabecalho__rosto/${location.state.id_rosto}`);

      if (res.status === 200) {
        const sortedData = res.data.result.sort((a: any, b: any) => {
          if (a.zona_homo < b.zona_homo) return -1;
          if (a.zona_homo > b.zona_homo) return 1;
          return 0;
        });
        setCabecalhos(sortedData);
        setIdCabecalho(sortedData[0].id_registo_fertil_cabecalho);

        await getInfoVariasTabelas(sortedData[0].id_registo_fertil_cabecalho);
      }
      setIsLoading(false);

    } catch (error) {
      func_print("getCabecalhoOperFertil", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      await getCabecalhoOperFertil();
    })();
  }, []);

  async function getOperacoesFertil(id: number) {
    setIsLoading(true);
    try {
      if (idCabecalho !== undefined) {
        let res = await get(`/get_reg_operacoes_fertil_cabecalho/${id}`);
        if (res.status === 200) {
          setRows(res.data.result);
        }
      };
      setIsLoading(false);
    } catch (error) {
      func_print("getOperacoesFertil", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }

  async function getExtraFields(id: number) {
    setIsLoading(true);
    try {
      let res = await get(
        `/get_reg_operacoes_fertil_cabecalho_desdobramento/${id}`
      );
      if (res.status === 200) {
        setExtraRows(res.data.result);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("getExtraFields", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }

  const getInfoVariasTabelas = async (id_cabecalho: number) => {

    setNewRow((prevNewRow: any) => ({
      ...prevNewRow,
      id_registo_fertil_cabecalho: id_cabecalho,
    }));

    setExtraRow((prevNewRow: any) => ({
      ...prevNewRow,
      id_registo_fertil_cabecalho: id_cabecalho,
    }));

    await getOperacoesFertil(id_cabecalho);
    await getExtraFields(id_cabecalho);
  }

  /**************************** CABEÇALHO **********************************************************************/
  // EDIT
  const handleUpdateCabecalho = async () => {
    if (selectedIndex !== null) {
      const cabecalhoToUpdate = cabecalhos[selectedIndex];

      if (!cabecalhoToUpdate) {
        setMessage("Cabeçalho não encontrado!");
        setOpenSnackError(true);
        return;
      }

      try {
        setIsLoading(true);
        let res = await post("update_reg_operacoes_fertil_cabecalho", { payload: cabecalhoToUpdate });

        if (res.status === 200) {
          setMessage("Cabeçalho atualizado com sucesso!");
          const updatedCabecalho =
            cabecalhos.map((cab) => {
              if (cabecalhoToUpdate.id_registo_fertil_cabecalho !== cab.id_registo_fertil_cabecalho) {
                return { ...cab };
              } else {
                return res.data.result
              }
            }
            );
          setCabecalhos(updatedCabecalho);

          setCreateCabecalho(false);
          setOpenSnackSuccess(true);
        } else {
          setMessage("Erro ao atualizar o cabeçalho!");
          setOpenSnackError(true);
        }
        setIsLoading(false);
      } catch (error) {
        func_print("handleUpdateCabecalho", error, true);
        setMessage("Erro ao atualizar o cabeçalho!");
        setOpenSnackError(true);
        setIsLoading(false);
      }
    }
  };

  /**************** TABELA OPERAÇOES FERTIL **************************/
  // CREATE NEW ROW
  const handlenewRowChange = (
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

    setNewRow((prevNewRows: any) => ({
      ...prevNewRows,
      [name]: newValue,
    }));
  };

  const handleSave = async () => {
    if (newRow?.data === undefined ||
      newRow.operacao === undefined ||
      newRow.fertilizante_utilizado === undefined
    ) {
      setMessage("Preencha todos os campos obrigatórios!");
      setOpenSnackError(true);
    } else try {
      setIsLoading(true);
      let res = await post("new_reg_operacoes_fertil", {
        payload: {
          id_registo_fertil: 0,
          data: newRow?.data === undefined ? "" : newRow.data,
          operacao: newRow?.operacao === undefined ? "" : newRow.operacao,
          fertilizante_utilizado: newRow?.fertilizante_utilizado === undefined ? "" : newRow.fertilizante_utilizado,
          t: newRow?.t === undefined ? "" : newRow.t,
          m: newRow?.m === undefined ? "" : newRow.m,
          n: newRow?.n === undefined ? "" : newRow.n,
          po: newRow?.po === undefined ? "" : newRow.po,
          ko: newRow?.ko === undefined ? "" : newRow.ko,
          mgo: newRow?.mgo === undefined ? "" : newRow.mgo,
          cao: newRow?.cao === undefined ? "" : newRow.cao,
          so: newRow?.so === undefined ? "" : newRow.so,
          b: newRow?.b === undefined ? "" : newRow.b,
          camp_opcao: newRow?.camp_opcao === undefined ? "" : newRow.camp_opcao,
          id_registo_fertil_cabecalho: idCabecalho,
          last_update: new Date().toISOString(),
          create_date: new Date().toISOString(),
          uuid: "",
        }
      });
      if (res.status === 200) {
        setMessage("Gravado com sucesso!");

        setNewRow(undefined);
        setRows((prevRows) => { return [...prevRows, res.data.result] });
        setOpenSnackSuccess(true);
        setShowNewRow(false);
      } else {
        setMessage("Erro ao gravar!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleSave", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  // Editar
  const handleEdit = (id: number | undefined) => {
    setEditingId(id);
    setEditRow(true);
  };

  const handleEditChange = (
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
      const updateRow = rows.map((row) => {
        if (row.id_registo_fertil === editingId) {
          return {
            ...row,
            [name]: newValue,
          };
        }
        return row;
      });
      setRows(updateRow);
    }
  };

  const handleUpdate = async () => {
    if (editingId !== null) {
      const tableToSave = rows.find((tab) => tab.id_registo_fertil === editingId);


      if (newRow?.data === "" ||
        newRow?.operacao === "" ||
        newRow?.fertilizante_utilizado === ""
      ) {
        setMessage("Preencha todos os campos obrigatórios!");
        setOpenSnackError(true);
      } else if (tableToSave) {
        try {
          setIsLoading(true);

          let res = await post("update_reg_operacoes_fertil", { payload: tableToSave });

          if (res.status === 200) {
            setMessage("Registado com sucesso!");
            const updatedRows = rows.map((row) => {
              if (row.id_registo_fertil === editingId) {
                return res.data.result
              } else {
                return { ...row }
              }
            });

            setRows(updatedRows !== undefined ? updatedRows : []);
            setEditRow(false);
            setEditingId(null);
            setOpenSnackSuccess(true);
          } else {
            setMessage("Erro ao gravar!");
            setOpenSnackError(true);
          }
          setIsLoading(false);

        } catch (error) {
          func_print("handleUpdate", error, true);
          setMessage("Erro ao gravar!");
          setOpenSnackError(true);
          setIsLoading(false);
        }
      }
    };
  }

  // Delete
  const handleClickOpenDelete = (idToDelete: number | null | undefined) => {
    setIdToDelete(idToDelete);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      let res = await del(`/delete__reg_operacoes_fertil/${idToDelete}`);

      if (res.status === 200) {
        setMessage("Registo eliminado com sucesso!");
        setOpenDelete(false);
        setIdToDelete(null);
        setRows((oldRows) => [
          ...oldRows.filter((oldRow) => oldRow.id_registo_fertil !== idToDelete),
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

  /**************** CAMPOS EXTRA *********************/
  //Criar

  const handleSaveExtra = async () => {
    if (extraRow === undefined) {
      setMessage("Preencha a tabela antes de gravar.")
      setOpenSnackError(true)
    } else try {
      setIsLoading(true);
      let res = await post("new_reg_operacoes_fertil_desdobramento", {
        payload: {
          id_registo_fertil_two: 0,
          elementos_forn_solo_n: extraRow?.elementos_forn_solo_n === undefined ? "" : extraRow.elementos_forn_solo_n,
          elementos_forn_agua_n: extraRow?.elementos_forn_agua_n === undefined ? "" : extraRow.elementos_forn_agua_n,
          totais_aplicados_zona_n: extraRow?.totais_aplicados_zona_n === undefined ? "" : extraRow.totais_aplicados_zona_n,
          totais_aplicados_hectare_n: extraRow?.totais_aplicados_hectare_n === undefined ? "" : extraRow.totais_aplicados_hectare_n,
          elementos_forn_solo_po: extraRow?.elementos_forn_solo_po === undefined ? "" : extraRow.elementos_forn_solo_po,
          elementos_forn_agua_po: extraRow?.elementos_forn_agua_po === undefined ? "" : extraRow.elementos_forn_agua_po,
          totais_aplicados_zona_po: extraRow?.totais_aplicados_zona_po === undefined ? "" : extraRow.totais_aplicados_zona_po,
          totais_aplicados_hectare_po: extraRow?.totais_aplicados_hectare_po === undefined ? "" : extraRow.totais_aplicados_hectare_po,
          elementos_forn_solo_ko: extraRow?.elementos_forn_solo_ko === undefined ? "" : extraRow.elementos_forn_solo_ko,
          elementos_forn_agua_ko: extraRow?.elementos_forn_agua_ko === undefined ? "" : extraRow.elementos_forn_agua_ko,
          totais_aplicados_zona_ko: extraRow?.totais_aplicados_zona_ko === undefined ? "" : extraRow.totais_aplicados_zona_ko,
          totais_aplicados_hectare_ko: extraRow?.totais_aplicados_hectare_ko === undefined ? "" : extraRow.totais_aplicados_hectare_ko,
          elementos_forn_solo_mgo: extraRow?.elementos_forn_solo_mgo === undefined ? "" : extraRow.elementos_forn_solo_mgo,
          elementos_forn_agua_mgo: extraRow?.elementos_forn_agua_mgo === undefined ? "" : extraRow.elementos_forn_agua_mgo,
          totais_aplicados_zona_mgo: extraRow?.totais_aplicados_zona_mgo === undefined ? "" : extraRow.totais_aplicados_zona_mgo,
          totais_aplicados_hectare_mgo: extraRow?.totais_aplicados_hectare_mgo === undefined ? "" : extraRow.totais_aplicados_hectare_mgo,
          elementos_forn_solo_cao: extraRow?.elementos_forn_solo_cao === undefined ? "" : extraRow.elementos_forn_solo_cao,
          elementos_forn_agua_cao: extraRow?.elementos_forn_agua_cao === undefined ? "" : extraRow.elementos_forn_agua_cao,
          totais_aplicados_zona_cao: extraRow?.totais_aplicados_zona_cao === undefined ? "" : extraRow.totais_aplicados_zona_cao,
          totais_aplicados_hectare_cao: extraRow?.totais_aplicados_hectare_cao === undefined ? "" : extraRow.totais_aplicados_hectare_cao,
          elementos_forn_solo_so: extraRow?.elementos_forn_solo_so === undefined ? "" : extraRow.elementos_forn_solo_so,
          elementos_forn_agua_so: extraRow?.elementos_forn_agua_so === undefined ? "" : extraRow.elementos_forn_agua_so,
          totais_aplicados_zona_so: extraRow?.totais_aplicados_zona_so === undefined ? "" : extraRow.totais_aplicados_zona_so,
          totais_aplicados_hectare_so: extraRow?.totais_aplicados_hectare_so === undefined ? "" : extraRow.totais_aplicados_hectare_so,
          elementos_forn_solo_b: extraRow?.elementos_forn_solo_b === undefined ? "" : extraRow.elementos_forn_solo_b,
          elementos_forn_agua_b: extraRow?.elementos_forn_agua_b === undefined ? "" : extraRow.elementos_forn_agua_b,
          totais_aplicados_zona_b: extraRow?.totais_aplicados_zona_b === undefined ? "" : extraRow.totais_aplicados_zona_b,
          totais_aplicados_hectare_b: extraRow?.totais_aplicados_hectare_b === undefined ? "" : extraRow.totais_aplicados_hectare_b,
          elementos_forn_solo_ob: extraRow?.elementos_forn_solo_ob === undefined ? "" : extraRow.elementos_forn_solo_ob,
          elementos_forn_agua_ob: extraRow?.elementos_forn_agua_ob === undefined ? "" : extraRow.elementos_forn_agua_ob,
          totais_aplicados_zona_ob: extraRow?.totais_aplicados_zona_ob === undefined ? "" : extraRow.totais_aplicados_zona_ob,
          totais_aplicados_hectare_ob: extraRow?.totais_aplicados_hectare_ob === undefined ? "" : extraRow.totais_aplicados_hectare_ob,

          id_registo_fertil_cabecalho: idCabecalho,
          last_update: new Date().toISOString(),
          create_date: new Date().toISOString(),
          uuid: "",
        }
      });
      if (res.status === 200) {
        setMessage("Gravado com sucesso!");
        setOpenSnackSuccess(true);
        setShowNewRow(false);

        setExtraRow(undefined);
        setExtraRows((prevRows) => {
          return [...prevRows, res.data.result];
        })
      } else {
        setMessage("Erro ao gravar!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleSaveExtra", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  //Editar
  const handleUpdateObs = async () => {
    if (editingIdExtra !== null) {
      const tableToSave = extraRows.find((tab) => tab.id_registo_fertil_two === editingIdExtra);

      if (tableToSave) {
        try {
          let res = await post("update_reg_operacoes_fertil_desdobramento", { payload: tableToSave })
          if (res.status === 200) {
            setMessage("Registado com sucesso!");

            const updatedRows = extraRows.map((row) => {
              if (row.id_registo_fertil_two === editingIdExtra) {
                return res.data.result
              } else {
                return { ...row };
              }
            });

            setExtraRows(updatedRows !== undefined ? updatedRows : []);
            setEditRowExtra(false);
            setEditingIdExtra(null);
            setOpenSnackSuccess(true);
          } else {
            setMessage("Erro ao gravar!");
            setOpenSnackError(true);
          }
          setIsLoading(false);

        } catch (error) {
          func_print("handleUpdateObs", error, true);
          setMessage("Erro ao gravar!");
          setOpenSnackError(true);
          setIsLoading(false);
        }
      }
    };
  }

  //Delete
  const handleClickOpenDeleteExtra = (id: number | null | undefined) => {
    setIdToDelete(id);
    setOpenDeleteExtra(true);
  };

  const handleDeleteExtra = async () => {
    try {
      setIsLoading(true);
      let res = await del(`/delete__reg_operacoes_fertil_desdobramento/${idToDelete}`);

      if (res.status === 200) {
        setMessage("Registo eliminado com sucesso!");
        setOpenDeleteExtra(false);
        setIdToDelete(null);
        setExtraRows((oldRows) => [
          ...oldRows.filter((oldRow) => oldRow.id_registo_fertil_two !== idToDelete),
        ]);
        setOpenSnackSuccess(true);
      } else {
        setMessage("Erro ao eliminar o registo!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleDeleteExtra", error, true);
      setMessage("Erro ao eliminar o registo!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };


  /*****************  PAGINAÇÃO ********************** */
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
      <div className={classes.root}>
        <CadernoLayout title="5A - Registo de Operações de Fertilização" />
        <main className={classes.contents}>
          <div className={classes.toolbars} />
          <Box width="80%" margin="auto">
            <Beneficiario_nome_id_alinhado_direita />
          </Box>

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

          {isLoading ? (
            <LoadingVulpes />
          ) : (
            <>
              <Box style={{ width: "100%", height: "auto" }}>
                <Cabecalho5AForm
                  cabecalhos={cabecalhos}
                  setCabecalhos={setCabecalhos}
                  updateCreateCabecalho={() => setCreateCabecalho(false)}
                  onSaveEditCabecalho={handleUpdateCabecalho}
                  handleSelectZona={handleSelectZona}
                  selectedIndex={selectedIndex}
                />
              </Box>

              <TableContainer
                component={Paper}
                sx={{
                  height: "auto",
                  width: "auto",
                  margin: 2,
                  padding: 2,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <BarraDeFerramentas
                    mostrarBotaoNovo
                    textoBotaoNovo="Nova linha"
                    aoClicarNovo={() => setShowNewRow(true)}
                  />
                </Box>
                <table style={{ width: "100%" }}>
                  <TableHead>
                    <TableRow>
                      <StyledTableHead rowSpan={2}>
                        <Stack direction="row" justifyContent="center">
                          Data *
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={" O registo das operações deverá seguir a ordem cronológica da sua ocorrência.No caso das fertirregas,\n o seu registo poderá estar agrupado por períodos mensais; quinzenais; semanais, ou outros.\n\nFormato para registo diário deverá ser: dd-mm-aaaa"}
                            />
                          </Box>
                        </Stack>
                      </StyledTableHead>
                      <StyledTableHead rowSpan={2} sx={{ minWidth: 120 }}>
                        <Stack direction="row" justifyContent="center">
                          Operação *
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={"O beneficiário deverá preencher com um dos seguintes valores por linha (data da aplicação):\nAplicação de corretivos\nFertilização fundo\nAdubação verde\nAplicação de estrume\nAplicação de chorume\nFertilização cobertura\nFertirrigação\n\nNo caso de compromisso ativo na intervenção «Uso Eficiente da Água», o beneficiário deverá preencher  \ncom as operações de fertilização previstas no Plano de Fertilização (Anexo 1) quando realizadas."}
                            />
                          </Box>
                        </Stack>
                      </StyledTableHead>
                      <StyledTableHead rowSpan={2} sx={{ minWidth: 180 }}>
                        <Stack direction="row" justifyContent="center">
                          Fertilizante utilizado *
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={"No caso de adução verde identificar as espécies integradas no solo."}
                            />
                          </Box>
                        </Stack>
                      </StyledTableHead>
                      <StyledTableHead colSpan={2}>
                        Quantidade Aplicada
                      </StyledTableHead>
                      <StyledTableHead colSpan={8}>
                        Incorporação de nutrientes (Kg)
                      </StyledTableHead>

                      <StyledTableHead rowSpan={2}>Ações</StyledTableHead>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead sx={{ minWidth: 80 }}>t</StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 80 }}>m3</StyledTableHead>
                      <StyledTableHead>N</StyledTableHead>
                      <StyledTableHead>P2O5</StyledTableHead>
                      <StyledTableHead>K2O</StyledTableHead>
                      <StyledTableHead>MgO</StyledTableHead>
                      <StyledTableHead>CaO</StyledTableHead>
                      <StyledTableHead>SO3</StyledTableHead>
                      <StyledTableHead>B</StyledTableHead>
                      <StyledTableHead>Outros</StyledTableHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {showNewRow && (
                      <TableRow>
                        <StyledTableCell>
                          <TextField
                            variant="filled"
                            name="data"
                            type="date"
                            inputProps={{
                              style: { fontSize: 12, fontFamily: "verdana" },
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={newRow?.data}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handlenewRowChange(e)
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomSelect
                            value={newRow?.operacao !== undefined ? newRow.operacao : ""}
                            name="operacao"
                            onChange={handlenewRowChange}
                            options={operacoes}
                            label="Operação"
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="fertilizante_utilizado"
                            value={newRow?.fertilizante_utilizado}
                            onChange={handlenewRowChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="t"
                            value={newRow?.t}
                            onChange={handlenewRowChange}
                            error={error_t}
                            helperText={error_t ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="m"
                            value={newRow?.m}
                            onChange={handlenewRowChange}
                            error={error_m}
                            helperText={error_m ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="n"
                            value={newRow?.n}
                            onChange={handlenewRowChange}
                            error={error_n}
                            helperText={error_n ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="po"
                            value={newRow?.po}
                            onChange={handlenewRowChange}
                            error={error_po}
                            helperText={error_po ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="ko"
                            value={newRow?.ko}
                            onChange={handlenewRowChange}
                            error={error_ko}
                            helperText={error_ko ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="mgo"
                            value={newRow?.mgo}
                            onChange={handlenewRowChange}
                            error={error_mgo}
                            helperText={error_mgo ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="cao"
                            value={newRow?.cao}
                            onChange={handlenewRowChange}
                            error={error_cao}
                            helperText={error_cao ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="so"
                            value={newRow?.so}
                            onChange={handlenewRowChange}
                            error={error_so}
                            helperText={error_so ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="b"
                            value={newRow?.b}
                            onChange={handlenewRowChange}
                            error={error_b}
                            helperText={error_b ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="camp_opcao"
                            value={newRow?.camp_opcao}
                            onChange={handlenewRowChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <Stack direction="row" justifyContent="center">
                            <ButtonCadernos
                              mostrarBotaoCancelar
                              aoClicarCancelar={() => setShowNewRow(false)}
                              mostrarBotaoGravar
                              aoClicarGravar={() => handleSave()}
                            />
                          </Stack>
                        </StyledTableCell>
                      </TableRow>
                    )}
                    {(rowsPerPage > 0
                      ? rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      : rows
                    ).map((row, index) => (
                      <TableRow key={index}>
                        {editingId === row.id_registo_fertil && editRow ? (
                          <>
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
                                value={row.data}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                  handleEditChange(e)
                                }
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomSelect
                                value={row.operacao}
                                name="operacao"
                                onChange={handleEditChange}
                                options={operacoes}
                                label="Operação"
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                name="fertilizante_utilizado"
                                value={row.fertilizante_utilizado}
                                onChange={handleEditChange}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                name="t"
                                value={row.t}
                                onChange={handleEditChange}
                                error={error_t}
                                helperText={error_t ? message_apenas_numero : ""}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                name="m"
                                value={row.m}
                                onChange={handleEditChange}
                                error={error_m}
                                helperText={error_m ? message_apenas_numero : ""}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                name="n"
                                value={row.n}
                                onChange={handleEditChange}
                                error={error_n}
                                helperText={error_n ? message_apenas_numero : ""}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                name="po"
                                value={row.po}
                                onChange={handleEditChange}
                                error={error_po}
                                helperText={error_po ? message_apenas_numero : ""}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                name="ko"
                                value={row.ko}
                                onChange={handleEditChange}
                                error={error_ko}
                                helperText={error_ko ? message_apenas_numero : ""}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                name="mgo"
                                value={row.mgo}
                                onChange={handleEditChange}
                                error={error_mgo}
                                helperText={error_mgo ? message_apenas_numero : ""}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                name="cao"
                                value={row.cao}
                                onChange={handleEditChange}
                                error={error_cao}
                                helperText={error_cao ? message_apenas_numero : ""}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                name="so"
                                value={row.so}
                                onChange={handleEditChange}
                                error={error_so}
                                helperText={error_so ? message_apenas_numero : ""}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                name="b"
                                value={row.b}
                                onChange={handleEditChange}
                                error={error_b}
                                helperText={error_b ? message_apenas_numero : ""}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                name="camp_opcao"
                                value={row.camp_opcao}
                                onChange={handleEditChange}
                              />
                            </StyledTableCell>
                          </>
                        ) : (
                          <>
                            <StyledTableCell>{row.data}</StyledTableCell>
                            <StyledTableCell>{row.operacao}</StyledTableCell>
                            <StyledTableCell>
                              {row.fertilizante_utilizado}
                            </StyledTableCell>
                            <StyledTableCell>{row.t}</StyledTableCell>
                            <StyledTableCell>{row.m}</StyledTableCell>
                            <StyledTableCell>{row.n}</StyledTableCell>
                            <StyledTableCell>{row.po}</StyledTableCell>
                            <StyledTableCell>{row.ko}</StyledTableCell>
                            <StyledTableCell>{row.mgo}</StyledTableCell>
                            <StyledTableCell>{row.cao}</StyledTableCell>
                            <StyledTableCell>{row.so}</StyledTableCell>
                            <StyledTableCell>{row.b}</StyledTableCell>
                            <StyledTableCell>
                              {row.camp_opcao}
                            </StyledTableCell>
                          </>
                        )}

                        {editingId === row.id_registo_fertil ? (
                          <StyledTableCell>
                            <ButtonCadernos
                              mostrarBotaoGravar
                              aoClicarGravar={() =>
                                handleUpdate()
                              }
                              mostrarBotaoCancelar
                              aoClicarCancelar={() => setEditingId(null)}
                            />
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell>
                            <ButtonCadernos
                              mostrarBotaoEditar
                              aoClicarEditar={() =>
                                handleEdit(row.id_registo_fertil)
                              }
                              mostrarBotaoApagar
                              aoClicarApagar={() =>
                                handleClickOpenDelete(row.id_registo_fertil)
                              }
                            />
                          </StyledTableCell>
                        )}
                      </TableRow>
                    ))}

                    <OperacaoFertilizacaoExtra
                      extraRows={extraRows}
                      extraRow={extraRow}
                      setExtraRow={setExtraRow}
                      setExtraRows={setExtraRows}
                      updateCreateTable={() => setCreateObsRow(false)}
                      // onInputChange={handleInputObsChange}
                      onSaveTabela={handleSaveExtra}
                      onEditTabela={handleUpdateObs}
                      // onEditTableChange={handleEditObsChange}
                      onDelete={handleClickOpenDeleteExtra}
                      setEditingId={setEditingIdExtra}
                      setEditRow={setEditRowExtra}
                      editingId={editingIdExtra}
                      editRow={editRowExtra} />



                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={12} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow sx={{ width: "100%" }}>
                      <TableCell colSpan={6}>
                        <Typography style={{ fontSize: 14, fontFamily: "candara" }}>
                          * Campos de preenchimento obrigatório
                        </Typography>
                      </TableCell>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={8}
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
            </>
          )}
          <ConfirmDialog
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            onConfirm={handleDelete}
            message="Deseja eliminar o registo?"
          />
          <ConfirmDialog
            open={openDeleteExtra}
            onClose={() => setOpenDeleteExtra(false)}
            onConfirm={handleDeleteExtra}
            message="Deseja eliminar o registo?"
          />
        </main>
      </div>
    </CustomThemeProvider>
  );
}
