import React, { ChangeEvent, useEffect, useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Alert, Box, Paper, SelectChangeEvent, Snackbar, Stack, styled, TableBody, TableCell, TableContainer, TableRow, } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import CadernoLayout from "../../../Styles/layout/cadernoLayout";
import { del, get, post } from "../../../Services/tokenConfig";
import { AzotoAplicadoForm } from "./azotoaplicado";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import LoadingVulpes from "../../../Styles/Loader/loading";

import { CabecalhoForm } from "./cabecalho";
import { AguaRegaForm } from "./agua_de_rega";
import BasicPopover from "../../../Components/Popover";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { StyledTableCell, StyledTableHead, } from "../../../Styles/tabelCellStyled/customTableCell";
import { CustomSelect, CustomTextField, } from "../../../Styles/theme/customThemeprovider";
import { TableHead } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { func_print } from "../../../Func_genericas/func_print";
import BasicDialog from "../../../Components/CustomDialog/basic_dialog";
import { IAguaDeRega, IAzotoAplicado, ICabecalho5D, IFertilizacaoOrganica } from "../../../Interfaces/cadernos/caderno5/interfaces5D";
import { confirm, tres_dois_dois, tres_um_dois, tres_um_quatro, tres_um_tres } from "../../../informacao_estatica";
import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
import { IZonaHomogenea } from "../../../Interfaces/cadernos/zona_homogenea";

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

const StyledTableHead2 = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: theme.spacing(1, 1),
  textAlign: "left",
  fontSize: 16,
  fontFamily: "candara",
  fontWeight: 600,
}));


export default function RegAtividadesFO() {
  const location = useLocation();
  const classes = useStyles();
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = useState(true);



  const [error_ferti_B, set_error_ferti_B] = useState<boolean>(false);
  const message_apenas_numero = ("Apenas números são aceites");

  const [, setCreateCabecalho] = useState(false);
  const [, setIndex] = useState(0); // index da zona homegénea
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0); // grava o index da zona homogénea selecionada

  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const [openInformToSavetable3, setOpenInformToSavetable3] = useState(false);
  const [idCabecalho, setIdCabecalho] = useState(0);
  const [openDeleteAzoto, setOpenDeleteAzoto] = React.useState(false);
  const [openDeleteOrganica, setOpenDeleteOrganica] = React.useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null | undefined>(null);

  const [editRow, setEditRow] = useState(false);
  const [editRowOrganica, setEditRowOrganica] = useState<boolean>(false);
  const [editingIdAzoto, setEditingIdAzoto] = useState<number | null>(null);
  const [editingIdAgua, setEditingIdAgua] = useState<number | null | undefined>(null);
  const [editingIdOrganica, setEditingIdOrganica] = useState<number | null | undefined>(null);
  const [createTable, setCreateTable] = useState(false);


  const [zona_homogenea, setZona_Homogenea] = useState<IZonaHomogenea[]>([]);
  const [obj_cabecalho, set_obj_Cabecalho] = useState<ICabecalho5D>();
  const [cabecalhos, setCabecalhos] = useState<ICabecalho5D[]>([]);
  const [cabecalho, setCabecalho] = useState<ICabecalho5D>({
    id_act_feertil_azotada: 0,

    zona_homo: "",
    n_sequencia: "",
    n_subparcela: "",
    area: 0,
    metodo_rega: "",
    cultura: "",
    compasso: "",
    porta_enxerto: "",
    n_planta: "",
    data_plantacao: "",
    produca_total: "",
    obtida: "",

    id_zona_homo: 0,
    last_update: "",
    create_date: "",
    uuid: "",
  });

  const [rowsAzoto, setRowsAzoto] = useState<IAzotoAplicado[]>([]);
  const [azoto, setAzoto] = useState<IAzotoAplicado>({
    id_registo_fertil_um: 0, 
    origem: "",
    tipo_ferti: "",
    nome_comercial: "",
    especi_pecuaria: "",
    data_aplica: "",
    quantidade_um: 0,
    teor_n: 0,
    quantidade_dois: 0,
    quantidade_tres: 0,
    quantidade_quatro: 0,
    quantidade_cinco: 0,
    total: 0,
    hash: "",
    id_act_feertil_azotada: idCabecalho,
    last_update: new Date().toISOString(),
    create_date: new Date().toISOString(),
    uuid: "",
  });

  const somaQuantidadeTres = rowsAzoto.reduce(
    (acc, row) => acc + Number(row.quantidade_tres),
    0
  );
  
  // const somaQuantidadeTres = Array.isArray(rowsAzoto)
  // ? rowsAzoto.reduce((acc, row) => acc + Number(row.quantidade_tres), 0)
  // : 0;


  const [rowsAgua, setRowsAgua] = useState<IAguaDeRega[]>([]);
  const [agua, setAgua] = useState<IAguaDeRega>({
    id_registo_fertil_dois: 0,
    kg_n: "",
    teor: "",
    dotacao: "",
    volume: "",
    eficiencia_rega: "",
    metodo_rega: "",
    data_rega: "",

    id_act_feertil_azotada: idCabecalho,
    last_update: new Date().toISOString(),
    create_date: new Date().toISOString(),
    uuid: "",
  });
  const initialAgua = {
    id_registo_fertil_dois: 0,
    kg_n: "",
    teor: "",
    dotacao: "",
    volume: "",
    eficiencia_rega: "",
    metodo_rega: "",
    data_rega: "",
    id_act_feertil_azotada: idCabecalho,
    last_update: new Date().toISOString(),
    create_date: new Date().toISOString(),
    uuid: "",
  };

  const [rowsOrganica, setRowsOrganica] = useState<IFertilizacaoOrganica[]>([]);
  const [organica, setOrganica] = useState<IFertilizacaoOrganica>({
    id_registo_fertil_tres: 0,
    ferti_A: 0,
    ferti_B: 0,
    B_A: 0,
    tres_dois: "",
    tres_um: "",
    quatro_um_um: "",
    quatro_um_dois: "",
    quatro_um_tres: "",
    quatro_um_quatro: "",
    quatro_dois_um: "",
    quatro_dois_dois: "",
    id_act_feertil_azotada: idCabecalho,
    last_update: new Date().toISOString(),
    create_date: new Date().toISOString(),
    uuid: "",
  });


  /********************* SELEÇÃO DA ZONA HOMOGÉNEA*****************/
  const handleSelectZona = async (index: number, idZonaHomo: any) => {
    try {
      setSelectedIndex(index);
      setIndex(idZonaHomo);
      setIdCabecalho(idZonaHomo);
      await getInfoVariasTabelas(idZonaHomo);

    } catch (error) {
      func_print("handleSelectZona", error, true);
      setMessage("Erro ao gravar!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  async function getCabecalhoAtividades() {
    try {
      let res = await get(`/get_reg_act_fertil_azotada_cabecalho_rosto/${location.state.id_rosto}`);

      if (res.status === 200) {
        const sortedData = res.data.result.sort((a: any, b: any) => {
          if (a.zona_homo < b.zona_homo) return -1;
          if (a.zona_homo > b.zona_homo) return 1;
          return 0;
        });
        setCabecalhos(sortedData);
        setIdCabecalho(sortedData[0].id_act_feertil_azotada);

        setCabecalho((prevNewRow) => ({
          ...prevNewRow,
          area: sortedData[0].area,
        }));
        await getInfoVariasTabelas(sortedData[0].id_act_feertil_azotada);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("getCabecalhoAtividades", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      await getCabecalhoAtividades();
    })();
  }, []);

  async function getAzoto(id: number) {
    setIsLoading(true);
    try {
      let res = await get(`/get_reg_act_fertil_azotada_um_5d_cabecalho/${id}`);
      if (res.status === 200) {
        setRowsAzoto(res.data.result);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("getAzoto", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }
  async function getAgua(id: number) {
    setIsLoading(true);
    try {
      let res = await get(`/get_reg_act_fertil_azotada_dois_5d_cabecalho/${id}`);

      if (res.status === 200) {
        setRowsAgua(res.data.result);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("getAgua", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }
  async function getOrganica(id: number) {
    setIsLoading(true);
    try {
      let res = await get(`/get_reg_act_fertil_azotada_tres_5d_cabecalho/${id}`);
      if (res.status === 200) {
        const updatedRows = res.data.result.map((item: IFertilizacaoOrganica) => {
          const resultadoDivisaoB_A =
            item.ferti_A !== 0
              ? ((item.ferti_B / item.ferti_A) * 100).toFixed(2)
              : "0";

          const B_A = isFinite(Number(resultadoDivisaoB_A))
            ? Number(resultadoDivisaoB_A)
            : 0;

          return {
            ...item,
            B_A,
          };
        });
        setRowsOrganica(updatedRows);

      }
      setIsLoading(false);
    } catch (error) {
      func_print("getOrganica", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }

  const getInfoVariasTabelas = async (id_cabecalho: number) => {
    setOrganica((prevNewRow) => ({
      ...prevNewRow,
      id_act_feertil_azotada: id_cabecalho,
      ferti_A: somaQuantidadeTres,
    }));
    setRowsOrganica((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        ferti_A: somaQuantidadeTres,
      }))
    )
    await getAzoto(id_cabecalho);
    await getAgua(id_cabecalho);
    await getOrganica(id_cabecalho);
  }


  /************************** TABELA AGUA DE REGA ***********************************/
  // CRIAR
  const handleAddRowAgua = () => {
    setAgua(initialAgua);
    setCreateCabecalho(true);
  }
  const handleSaveAgua = async () => {
    setIsLoading(true);
    try {
      let res = await post("new_reg_act_fertil_azotada_doi_5d", { payload: agua });

      if (res.status === 200) {
        setMessage("Gravado com sucesso!");

        setRowsAgua((rows) => [...rows, res.data.result]);
        setAgua({
          id_registo_fertil_dois: undefined,
          kg_n: "",
          teor: "",
          dotacao: "",
          volume: "",
          eficiencia_rega: "",
          metodo_rega: "",
          data_rega: "",
          id_act_feertil_azotada: undefined,
          last_update: new Date().toISOString(),
          create_date: new Date().toISOString(),
          uuid: "",
        });
        setOpenSnackSuccess(true);
        setCreateTable(false);
      } else {
        setMessage("Erro ao gravar!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleSaveAgua", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  // EDITAR
  const handleUpdateAgua = async () => {
    if (editingIdAgua !== null) {
      const tableToSave = rowsAgua.find((tab) => tab.id_registo_fertil_dois === editingIdAgua);

      if (tableToSave) {
        try {
          let res = await post("update_reg_act_fertil_azotada_dois_5d", { payload: tableToSave });

          if (res.status === 200) {
            setMessage("Registado com sucesso!");

            setRowsAgua((rows) => [...rows, res.data.result]);
            setEditRow(false);
            setEditingIdAgua(null);
            setOpenSnackSuccess(true);
          } else {
            setMessage("Erro ao gravar!");
            setOpenSnackError(true);
          }
          setIsLoading(false);
        } catch (error) {
          func_print("handleUpdateAgua", error, true);
          setMessage("Erro ao gravar!");
          setOpenSnackError(true);
          setIsLoading(false);
        }
      }
    }
  };


  /****************** TABELA FERTILIZAÇÃO ORGANICA *********************************************** */
  // FORMULAS
  const resultadoDivisaoB_A =
    organica.ferti_A !== 0
      ? ((organica.ferti_B / organica.ferti_A) * 100).toFixed(2)
      : "0";

  const B_A = isFinite(Number(resultadoDivisaoB_A))
    ? Number(resultadoDivisaoB_A)
    : 0;


  const renderRows = rowsOrganica.map((item) => {
    const resultadoDivisaoB_A =
      item.ferti_A !== 0
        ? ((item.ferti_B / item.ferti_A) * 100).toFixed(2)
        : "0";

    const B_A = isFinite(Number(resultadoDivisaoB_A))
      ? Number(resultadoDivisaoB_A)
      : 0;

    return {
      ...item,
      B_A,
    };
  });

  // Criar
  const handleInputChangeOrganica = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<String>
  ) => {
    const { name, value } = event.target;

    if (name === "ferti_B") {
      if (isNaN(Number(value))) {
        set_error_ferti_B(true);
        return;
      } else {
        set_error_ferti_B(false);
      }
    }

    setOrganica((prevOrganica) => ({
      ...prevOrganica,
      [name]: value,
    }));
  };

  const handleSaveOrganica = async () => {
    setIsLoading(true);

    try {
      let res = await post("new_reg_act_fertil_azotada_tres_5d", { payload: organica });

      if (res.status === 200) {
        setMessage("Gravado com sucesso!");
        setRowsOrganica((rows) => [...rows, res.data.result]);

        setCreateTable(false);
        setOrganica({
          id_registo_fertil_tres: undefined,
          ferti_A: 0,
          ferti_B: 0,
          B_A: 0,
          tres_dois: "",
          tres_um: "",
          quatro_um_um: "",
          quatro_um_dois: "",
          quatro_um_tres: "",
          quatro_um_quatro: "",
          quatro_dois_um: "",
          quatro_dois_dois: "",
          id_act_feertil_azotada: undefined,
          last_update: new Date().toISOString(),
          create_date: new Date().toISOString(),
          uuid: "",
        })
      } else {
        setMessage("Erro ao gravar!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleSaveOrganica", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  // EDIT
  const handleEdit = (id: number | null | undefined) => {
    setEditingIdOrganica(id);
    setEditRowOrganica(true);
  };

  const onInputChangeOrganica = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>,
    index: number
  ) => {
    const { name, value } = event.target;

    if (name === "ferti_B") {
      if (isNaN(Number(value))) {
        set_error_ferti_B(true);
        return;
      } else {
        set_error_ferti_B(false);
      }
    }

    setRowsOrganica((prevRows) => {
      const updatedRows = [...prevRows];
      let updatedValue: any = Number(value);

      if (name === "ferti_A") {
        updatedValue = somaQuantidadeTres;
      } else if (name === "ferti_A" || name === "ferti_B") {
        updatedValue = Number(value);
      } else {
        updatedValue = value;
      }

      updatedRows[index] = {
        ...updatedRows[index],
        [name]: updatedValue,
      };

      // Recalcular B_A
      const ferti_A = updatedRows[index].ferti_A;
      const ferti_B = updatedRows[index].ferti_B;
      const resultadoDivisaoB_A =
        ferti_A !== null ? ((ferti_B / ferti_A) * 100).toFixed(2) : "0";
      updatedRows[index].B_A = isFinite(Number(resultadoDivisaoB_A))
        ? Number(resultadoDivisaoB_A)
        : 0;

      return updatedRows;
    });
  };

  const handleSaveEdit = async () => {
    if (editingIdOrganica !== null) {
      try {
        const rowToSave = rowsOrganica.find((row) => row.id_registo_fertil_tres === editingIdOrganica);

        if (!rowToSave) {
          setOpenSnackError(true);
          setMessage("Erro ao encontrar o registro para salvar!");
          setTimeout(() => {
            setOpenSnackError(false);
          }, 3000);
          return;
        }

        const updatedRowToSave = {
          ...rowToSave,
          ferti_A: somaQuantidadeTres,
        };

        let res = await post(`update_reg_act_fertil_azotada_tres_5d`, { payload: updatedRowToSave });

        if (res.status === 200) {
          setMessage("Registado com sucesso!");
          setRowsOrganica((rows) => [...rows, res.data.result]);
          setEditRowOrganica(false);
          setEditingIdOrganica(null);
          setOpenSnackSuccess(true);
        } else {
          setMessage("Erro ao atualizar o cabeçalho!");
          setOpenSnackError(true);
        }
        setIsLoading(false);
      } catch (error) {
        func_print("handleSaveEdit", error, true);
        setMessage("Erro ao gravar!");
        setOpenSnackError(true);
        setIsLoading(false);
      }
    }
  };

  // DELETE
  const handleClickOpenDeleteOrganica = (id: number | undefined) => {
    setIdToDelete(id);
    setOpenDeleteOrganica(true);
  };
  const handleDeleteOrganica = async () => {
    try {
      if (idToDelete !== null) {
        let res = del(`delete__reg_act_fertil_azotada_tres_5d/${idToDelete}`);

        if ((await res).status === 200) {
          setMessage("Eliminado com sucesso!");
          setIdToDelete(null);
          setOpenDeleteOrganica(false);
          setRowsOrganica((rows) => [...rows.filter((row) => row.id_registo_fertil_tres !== idToDelete)]
          );

          setOpenSnackSuccess(true);
        } else {
          setMessage("Erro ao eliminar!");
          setOpenSnackError(true);
        }
        setIsLoading(false);
      }
    } catch (error) {
      func_print("handleClickOpenDeleteOrganica", error, true);
      setMessage("Erro ao eliminar o registo!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };



  return (
    <div className={classes.root}>
      <CadernoLayout title="5D - Registo das Atividades de fertilização Orgânica" />
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
            <CabecalhoForm
              cabecalhos={cabecalhos}
              handleSelectZona={handleSelectZona}
              selectedIndex={selectedIndex}
              obj_Cabecalho={obj_cabecalho}
              set_obj_Cabecalho={set_obj_Cabecalho}
              setCabecalhos={setCabecalhos}
              setZona_Homogenea={setZona_Homogenea}
              setMessage={setMessage}
              setOpenSnackError={setOpenSnackError}
              setOpenSnackSuccess={setOpenSnackSuccess}
              setIsLoading={setIsLoading}
            />

            <AzotoAplicadoForm
              azoto={azoto}
              rows={rowsAzoto}
              setEditingId={setEditingIdAzoto}
              editingId={editingIdAzoto}
              setEditRow={setEditRow}
              editRow={editRow}
              cabecalho={cabecalho}
              setAzoto={setAzoto}
              setRowsAzoto={setRowsAzoto}
              setIsLoading={setIsLoading}
              setOpenSnackSuccess={setOpenSnackSuccess}
              setOpenSnackError={setOpenSnackError}
              setMessage={setMessage}
              idCabecalho={idCabecalho}
              rowsOrganica={rowsOrganica}
              setRowsOrganica={setRowsOrganica} />

            <AguaRegaForm
              agua={agua}
              rows={rowsAgua}
              updateCreateTable={() => setCreateCabecalho(false)}
              handleAddRowAgua={handleAddRowAgua}
              onSaveTabela={handleSaveAgua}
              onSaveEdit={handleUpdateAgua}
              setEditingId={setEditingIdAgua}
              setEditRow={setEditRow}
              editingId={editingIdAgua}
              editRow={editRow}
              setAgua={setAgua}
              setRowsAgua={setRowsAgua} />

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
                    <StyledTableHead2
                      colSpan={6}
                      sx={{ fontWeight: 600, fontSize: 16 }}
                    >
                      <Stack direction="row" justifyContent="start">
                        3 - Nível de fertilização orgânica
                        <Box margin={-1} padding={0}>
                          <BasicPopover
                            text={
                              "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção da fertilização orgânica»."
                            }
                          />
                        </Box>
                      </Stack>
                    </StyledTableHead2>
                    {rowsOrganica.length <= 0 && createTable === false ? (
                      <TableCell colSpan={5}>
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
                        <TableCell colSpan={5}>
                          <ButtonCadernos
                            mostrarBotaoCancelar
                            aoClicarCancelar={() => setCreateTable(false)}
                            mostrarBotaoGravar
                            aoClicarGravar={() => handleSaveOrganica()}
                          />
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>

                {createTable ? (
                  <TableBody>
                    <TableRow>
                      <StyledTableHead
                        colSpan={2}
                        width="30%"
                        sx={{ backgroundColor: "lightgray" }}
                      >
                        (A) = Fertilização N(total) (kg/ha)
                      </StyledTableHead>
                      <StyledTableHead
                        width="15%"
                        sx={{ backgroundColor: "lightgray" }}
                      >
                        <CustomTextField
                          name="ferti_A"
                          value={(organica.ferti_A = somaQuantidadeTres)}
                          onChange={handleInputChangeOrganica}
                        />
                      </StyledTableHead>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead
                        colSpan={2}
                        sx={{ backgroundColor: "lightgray" }}
                      >
                        (B)= Fertilização de N Total Orgânico de: efluentes
                        pecuários, seus equiparados, sua mistura ou composto de
                        efluentes pecuários (kg/ha)
                        <BasicPopover
                          text={
                            "Para determinar o valor de (B) o beneficiário deve somar todos os valores individuais registados no campo «Quantidade total de azoto (NTotal) aplicada» do Quadro «1 - Quantidades de azoto aplicadas» provenientes de efluentes pecuários, seus equiparados, sua mistura ou compostos de efluentes pecuários.\n Ou seja, ao TOTAL do campo «Quantidade total de azoto (NTotal) aplicada» do Quadro 1 deve ser subtraído o azoto proveniente dos fertilizantes de síntese."
                          }
                        />
                      </StyledTableHead>

                      <StyledTableHead>
                        <CustomTextField
                          name="ferti_B"
                          value={organica.ferti_B}
                          onChange={handleInputChangeOrganica}
                          error={error_ferti_B}
                          helperText={error_ferti_B ? message_apenas_numero : ""}
                        />
                      </StyledTableHead>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead colSpan={2}>(B)/(A) (%)</StyledTableHead>
                      <StyledTableHead>
                        <CustomTextField
                          value={(organica.B_A = B_A)}
                          name="B_A"
                          onChange={handleInputChangeOrganica}
                        />
                      </StyledTableHead>
                    </TableRow>
                    <Box sx={{ height: 50 }}></Box>
                    <TableRow>
                      <StyledTableHead2 colSpan={5}>
                        {"   3.1 - Nível de fertilização orgânica ≥25% e <50%?"}
                      </StyledTableHead2>
                      <StyledTableCell>
                        <Stack direction="row" justifyContent="right">
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={
                                "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção\n da fertilização orgânica».\n Beneficiário deve preencher esta questão de acordo com o resultado\n obtido no campo (B)/(A) do Quadro «2 - Nível de fertilização orgânica».\n\nValores possíveis:\n- Sim;\n- Não."
                              }
                            />
                          </Box>
                        </Stack>
                        <CustomSelect
                          value={organica.tres_um}
                          name="tres_um"
                          onChange={handleInputChangeOrganica}
                          options={confirm}
                          label={"Selecione"}
                        />
                      </StyledTableCell>
                    </TableRow>

                    <TableRow>
                      <StyledTableHead2
                        colSpan={5}
                        sx={{ fontWeight: 600, fontSize: 16 }}
                      >
                        3.2 - Nível de fertilização orgânica ≥50%?
                      </StyledTableHead2>

                      <StyledTableCell>
                        <Stack direction="row" justifyContent="right">
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={
                                "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção\n da fertilização orgânica».\n Beneficiário deve preencher esta questão de acordo com o resultado\n obtido no campo (B)/(A) do Quadro «2 - Nível de fertilização orgânica».\n\nValores possíveis:\n- Sim;\n- Não."
                              }
                            />
                          </Box>
                        </Stack>
                        <CustomSelect
                          value={organica.tres_dois}
                          name="tres_dois"
                          onChange={
                            handleInputChangeOrganica as (
                              event: SelectChangeEvent<string>
                            ) => void
                          }
                          options={confirm}
                          label={"Selecione"}
                        />
                      </StyledTableCell>
                    </TableRow>
                    <Box sx={{ height: 50 }} />

                    <TableRow>
                      <StyledTableHead2
                        colSpan={5}
                        align="center"
                        sx={{ fontWeight: 600, fontSize: 16, paddingTop: 10 }}
                      >
                        4 - Práticas adotadas na valorização agrícola dos
                        efluentes pecuários
                      </StyledTableHead2>
                    </TableRow>
                    <Box sx={{ height: 50 }} />

                    <TableRow>
                      <StyledTableHead2
                        colSpan={5}
                        sx={{ fontWeight: 600, fontSize: 16, paddingLeft: 3 }}
                      >
                        4.1 - Chorume
                      </StyledTableHead2>
                    </TableRow>

                    <TableRow>
                      <StyledTableHead2
                        colSpan={5}
                        sx={{ fontWeight: 600, fontSize: 16, paddingLeft: 6 }}
                      >
                        4.1.1 - Aplicou chorume?
                      </StyledTableHead2>
                      <StyledTableCell>
                        <Stack direction="row" justifyContent="right">
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={
                                "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção da fertilização orgânica».\nO beneficiário deverá responder: \n - Sim;\n- Não. \n\nEm caso de resposta afirmativa deverá responder às questão 3.1.2, 3.1.3 e 3.1.4."
                              }
                            />
                          </Box>
                        </Stack>
                        <CustomSelect
                          value={organica.quatro_um_um}
                          name="quatro_um_um"
                          onChange={
                            handleInputChangeOrganica as (
                              event: SelectChangeEvent<string>
                            ) => void
                          }
                          options={confirm}
                          label={"Selecione"}
                        />
                      </StyledTableCell>
                    </TableRow>

                    <TableRow>
                      <StyledTableHead2
                        colSpan={5}
                        sx={{ fontWeight: 600, fontSize: 16, paddingLeft: 6 }}
                      >
                        4.1.2 - Qual o equipamento usado para a aplicação de
                        chorume?
                      </StyledTableHead2>

                      <StyledTableCell>
                        <Stack direction="row" justifyContent="right">
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={
                                "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção da fertilização orgânica» e se o beneficiário respondeu 'Sim' à questão 3.1.1.\n\nValores possíveis:\n- Equipamento a baixa pressão; \n- Equipamento de injeção direta;\n- Outro tipo de equipamento.."
                              }
                            />
                          </Box>
                        </Stack>
                        <CustomSelect
                          value={organica.quatro_um_dois}
                          name="quatro_um_dois"
                          onChange={
                            handleInputChangeOrganica as (
                              event: SelectChangeEvent<string>
                            ) => void
                          }
                          options={tres_um_dois}
                          label={"Selecione"}
                        />
                      </StyledTableCell>
                    </TableRow>

                    <TableRow>
                      <StyledTableHead2
                        colSpan={5}
                        sx={{ fontWeight: 600, fontSize: 16, paddingLeft: 6 }}
                      >
                        4.1.3 - Qual o tempo decorrido para a incorporação de
                        chorume no solo?
                      </StyledTableHead2>

                      <StyledTableCell>
                        <Stack direction="row" justifyContent="right">
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={
                                "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção da fertilização orgânica» e se o beneficiário respondeu 'Sim' à questão 3.1.1. \n\nValores possíveis:\n- Chorume incorporado até 4 horas após a distribuição; \n- Chorume incorporado mais de 4 horas após a distribuição* \n\n(*) - De acordo com o n.º 21, do artigo 10º da Portaria n.º 259/2012, de 28 de agosto, o período de intervalo de tempo\n entre a distribuiçao e a incorporação de chorume, pode ser superior a 4 horas,\n desde que a sua aplicação cumpra simultaneamente as seguintes condições: \n 1) Aplicação e cobertura ou em sementeira direta sem injeção; \n 2) Seguida de rega controlada em tempo seco."
                              }
                            />
                          </Box>
                        </Stack>
                        <CustomSelect
                          value={organica.quatro_um_tres}
                          name="quatro_um_tres"
                          onChange={
                            handleInputChangeOrganica as (
                              event: SelectChangeEvent<string>
                            ) => void
                          }
                          options={tres_um_tres}
                          label={"Selecione"}
                        />
                      </StyledTableCell>
                    </TableRow>

                    <TableRow>
                      <StyledTableHead2
                        colSpan={5}
                        sx={{ fontWeight: 600, fontSize: 16, paddingLeft: 6 }}
                      >
                        4.1.4 - Qual a fase do processo produtivo em que aplicou
                        chorume?
                      </StyledTableHead2>

                      <StyledTableCell>
                        <Stack direction="row" justifyContent="right">
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={
                                "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção da fertilização orgânica» e se o beneficiário respondeu 'Sim' à questão 3.1.1. \n\n  Valores possíveis: \n - Antes da sementeira (em fundo);\n- Em sementeira direta;\n- Sobre cultura já instalada (em cobertura). "
                              }
                            />
                          </Box>
                        </Stack>
                        <CustomSelect
                          value={organica.quatro_um_quatro}
                          name="quatro_um_quatro"
                          onChange={
                            handleInputChangeOrganica as (
                              event: SelectChangeEvent<string>
                            ) => void
                          }
                          options={tres_um_quatro}
                          label={"Selecione"}
                        />
                      </StyledTableCell>
                    </TableRow>

                    <Box sx={{ height: 50 }} />
                    <TableRow>
                      <StyledTableHead2
                        colSpan={5}
                        sx={{ fontWeight: 600, fontSize: 16, paddingLeft: 3 }}
                      >
                        4.2 - Estrume ou outro fertilizante orgânico (FO, alínea
                        b) do n.º 1 do artigo 31º) exceto chorume
                      </StyledTableHead2>
                    </TableRow>

                    <TableRow>
                      <StyledTableHead2
                        colSpan={5}
                        sx={{ fontWeight: 600, fontSize: 16, paddingLeft: 6 }}
                      >
                        4.2.1 - Aplicou estrume ou outra F.O. (exceto chorume)?
                      </StyledTableHead2>
                      <StyledTableCell>
                        <Stack direction="row" justifyContent="right">
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={
                                "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção da fertilização orgânica». \n O beneficiário deverá responder: \n - Sim; \n - Não. \n\n Em caso de resposta afirmativa deverá responder à questão 3.2.2."
                              }
                            />
                          </Box>
                        </Stack>
                        <CustomSelect
                          value={organica.quatro_dois_um}
                          name="quatro_dois_um"
                          onChange={
                            handleInputChangeOrganica as (
                              event: SelectChangeEvent<string>
                            ) => void
                          }
                          options={confirm}
                          label={"Selecione"}
                        />
                      </StyledTableCell>
                    </TableRow>

                    <TableRow>
                      <StyledTableHead2
                        colSpan={5}
                        sx={{ fontWeight: 600, fontSize: 16, paddingLeft: 6 }}
                      >
                        4.2.2 - Qual o tempo decorrido para a incorporação de
                        estrume ou outro FO no solo?
                      </StyledTableHead2>

                      <StyledTableCell>
                        <Stack direction="row" justifyContent="right">
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={
                                "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção da fertilização orgânica» e se o beneficiário respondeu 'Sim' à questão 3.2.1. \n\n  Valores possíveis: \n - Estrume ou outra F.O. incorporado até 24 horas após a distribuição; \n - Estrume ou outra F.O. incorporado mais de 24 horas após a distribuição."
                              }
                            />
                          </Box>
                        </Stack>
                        <CustomSelect
                          value={organica.quatro_dois_dois}
                          name="quatro_dois_dois"
                          onChange={
                            handleInputChangeOrganica as (
                              event: SelectChangeEvent<string>
                            ) => void
                          }
                          options={tres_dois_dois}
                          label={"Selecione"}
                        />
                      </StyledTableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  rowsOrganica.length <= 0 &&
                  createTable === false &&
                  editRow === false && (
                    <TableBody>
                      <TableRow>
                        <StyledTableHead
                          colSpan={2}
                          width="30%"
                          sx={{ backgroundColor: "lightgray" }}
                        >
                          (A) = Fertilização N(total) (kg/ha)
                        </StyledTableHead>
                        <StyledTableHead
                          width="15%"
                          sx={{ backgroundColor: "lightgray" }}
                        ></StyledTableHead>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead
                          colSpan={2}
                          sx={{ backgroundColor: "lightgray" }}
                        >
                          (B)= Fertilização de N Total Orgânico de: efluentes
                          pecuários, seus equiparados, sua mistura ou composto
                          de efluentes pecuários (kg/ha)
                          <BasicPopover
                            text={
                              "Para determinar o valor de (B) o beneficiário deve somar todos os valores individuais registados no campo «Quantidade total de azoto (NTotal) aplicada» do Quadro «1 - Quantidades de azoto aplicadas» provenientes de efluentes pecuários, seus equiparados, sua mistura ou compostos de efluentes pecuários. Ou seja, ao TOTAL do campo «Quantidade total de azoto (NTotal) aplicada» do Quadro 1 deve ser subtraído o azoto proveniente dos fertilizantes de síntese."
                            }
                          />
                        </StyledTableHead>

                        <StyledTableHead></StyledTableHead>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead colSpan={2}>
                          (B)/(A) (%)
                        </StyledTableHead>
                        <StyledTableHead></StyledTableHead>
                      </TableRow>
                      <TableRow>
                        <TableCell></TableCell>
                      </TableRow>

                      <TableRow>
                        <StyledTableHead2 colSpan={5}>
                          {
                            "   3.1 - Nível de fertilização orgânica ≥25% e <50%?"
                          }
                        </StyledTableHead2>
                        <StyledTableCell>
                          <Stack direction="row" justifyContent="right">
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={
                                  "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção\n da fertilização orgânica».\n Beneficiário deve preencher esta questão de acordo com o resultado\n obtido no campo (B)/(A) do Quadro «2 - Nível de fertilização orgânica».\n\nValores possíveis:\n- Sim;\n- Não."
                                }
                              />
                            </Box>
                          </Stack>
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead2 colSpan={5}>
                          3.2 - Nível de fertilização orgânica ≥50%?
                        </StyledTableHead2>

                        <StyledTableCell>
                          <Stack direction="row" justifyContent="right">
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={
                                  "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção\n da fertilização orgânica».\n Beneficiário deve preencher esta questão de acordo com o resultado\n obtido no campo (B)/(A) do Quadro «2 - Nível de fertilização orgânica».\n\nValores possíveis:\n- Sim;\n- Não."
                                }
                              />
                            </Box>
                          </Stack>
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead2 colSpan={5} align="center">
                          4 - Práticas adotadas na valorização agrícola dos
                          efluentes pecuários
                        </StyledTableHead2>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead2 colSpan={5}>
                          4.1 - Chorume
                        </StyledTableHead2>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead2 colSpan={5}>
                          4.1.1 - Aplicou chorume?
                        </StyledTableHead2>
                        <StyledTableCell>
                          <Stack direction="row" justifyContent="right">
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={
                                  "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção da fertilização orgânica».\nO beneficiário deverá responder: \n - Sim;\n- Não. \n\nEm caso de resposta afirmativa deverá responder às questão 3.1.2, 3.1.3 e 3.1.4."
                                }
                              />
                            </Box>
                          </Stack>
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead2 colSpan={5}>
                          4.1.2 - Qual o equipamento usado para a aplicação de
                          chorume?
                        </StyledTableHead2>
                        <StyledTableCell>
                          <Stack direction="row" justifyContent="right">
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={
                                  "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção da fertilização orgânica» e se o beneficiário respondeu 'Sim' à questão 3.1.1.\n\nValores possíveis:\n- Equipamento a baixa pressão; \n- Equipamento de injeção direta;\n- Outro tipo de equipamento.."
                                }
                              />
                            </Box>
                          </Stack>
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead2 colSpan={5}>
                          4.1.3 - Qual o tempo decorrido para a incorporação de
                          chorume no solo?
                        </StyledTableHead2>
                        <StyledTableCell>
                          <Stack direction="row" justifyContent="right">
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={
                                  "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção da fertilização orgânica» e se o beneficiário respondeu 'Sim' à questão 3.1.1. \n\nValores possíveis:\n- Chorume incorporado até 4 horas após a distribuição; \n- Chorume incorporado mais de 4 horas após a distribuição* \n\n(*) - De acordo com o n.º 21, do artigo 10º da Portaria n.º 259/2012, de 28 de agosto, o período de intervalo de tempo\n entre a distribuiçao e a incorporação de chorume, pode ser superior a 4 horas,\n desde que a sua aplicação cumpra simultaneamente as seguintes condições: \n 1) Aplicação e cobertura ou em sementeira direta sem injeção; \n 2) Seguida de rega controlada em tempo seco."
                                }
                              />
                            </Box>
                          </Stack>
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead2 colSpan={5}>
                          4.1.4 - Qual a fase do processo produtivo em que
                          aplicou chorume?
                        </StyledTableHead2>
                        <StyledTableCell>
                          <Stack direction="row" justifyContent="right">
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={
                                  "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção da fertilização orgânica» e se o beneficiário respondeu 'Sim' à questão 3.1.1. \n\n  Valores possíveis: \n - Antes da sementeira (em fundo);\n- Em sementeira direta;\n- Sobre cultura já instalada (em cobertura). "
                                }
                              />
                            </Box>
                          </Stack>
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead2 colSpan={5}>
                          4.2 - Estrume ou outro fertilizante orgânico (FO,
                          alínea b) do n.º 1 do artigo 31º) exceto chorume
                        </StyledTableHead2>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead2 colSpan={5}>
                          4.2.1 - Aplicou estrume ou outra F.O. (exceto
                          chorume)?
                        </StyledTableHead2>
                        <StyledTableCell>
                          <Stack direction="row" justifyContent="right">
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={
                                  "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção da fertilização orgânica». \n O beneficiário deverá responder: \n - Sim; \n - Não. \n\n Em caso de resposta afirmativa deverá responder à questão 3.2.2."
                                }
                              />
                            </Box>
                          </Stack>
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableHead2 colSpan={5}>
                          4.2.2 - Qual o tempo decorrido para a incorporação de
                          estrume ou outro FO no solo?
                        </StyledTableHead2>
                        <StyledTableCell>
                          <Stack direction="row" justifyContent="right">
                            <Box margin={-1} padding={0}>
                              <BasicPopover
                                text={
                                  "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção da fertilização orgânica» e se o beneficiário respondeu 'Sim' à questão 3.2.1. \n\n  Valores possíveis: \n - Estrume ou outra F.O. incorporado até 24 horas após a distribuição; \n - Estrume ou outra F.O. incorporado mais de 24 horas após a distribuição."
                                }
                              />
                            </Box>
                          </Stack>
                        </StyledTableCell>
                      </TableRow>
                    </TableBody>
                  )
                )}


                {renderRows.length > 0 &&
                  renderRows.map((row, index) => {
                    return (
                      <TableBody key={index}>
                        {editRowOrganica === true &&
                          editingIdOrganica === row.id_registo_fertil_tres ? (
                          <>
                            <TableRow>
                              <TableCell colSpan={8}>
                                <Stack direction="row" justifyContent="end">
                                  <ButtonCadernos
                                    mostrarBotaoGravar
                                    aoClicarGravar={() => handleSaveEdit()}
                                    mostrarBotaoCancelar
                                    aoClicarCancelar={() =>
                                      setEditRowOrganica(false)
                                    }
                                  />
                                </Stack>
                              </TableCell>
                            </TableRow>
                            <TableRow key={row.id_registo_fertil_tres}>
                              <StyledTableHead
                                colSpan={2}
                                width="30%"
                                sx={{ backgroundColor: "lightgray" }}
                              >
                                (A) = Fertilização N(total) (kg/ha)
                              </StyledTableHead>
                              <StyledTableHead
                                width="15%"
                                sx={{ backgroundColor: "lightgray" }}
                              >
                                <CustomTextField
                                  name="ferti_A"
                                  value={somaQuantidadeTres}
                                  onChange={(e: any) =>
                                    onInputChangeOrganica(e, index)
                                  }
                                />
                              </StyledTableHead>
                            </TableRow>
                            <TableRow>
                              <StyledTableHead
                                colSpan={2}
                                sx={{ backgroundColor: "lightgray" }}
                              >
                                (B)= Fertilização de N Total Orgânico de:
                                efluentes pecuários, seus equiparados, sua
                                mistura ou composto de efluentes pecuários
                                (kg/ha)
                                <BasicPopover
                                  text={
                                    "Para determinar o valor de (B) o beneficiário deve somar todos os valores individuais registados no campo «Quantidade total de azoto (NTotal) aplicada» do Quadro «1 - Quantidades de azoto aplicadas» provenientes de efluentes pecuários, seus equiparados, sua mistura ou compostos de efluentes pecuários. Ou seja, ao TOTAL do campo «Quantidade total de azoto (NTotal) aplicada» do Quadro 1 deve ser subtraído o azoto proveniente dos fertilizantes de síntese."
                                  }
                                />
                              </StyledTableHead>

                              <StyledTableHead>
                                <CustomTextField
                                  name="ferti_B"
                                  value={row.ferti_B}
                                  onChange={(e: any) =>
                                    onInputChangeOrganica(e, index)
                                  }
                                  error={error_ferti_B}
                                  helperText={error_ferti_B ? message_apenas_numero : ""}
                                />
                              </StyledTableHead>
                            </TableRow>
                            <TableRow>
                              <StyledTableHead colSpan={2}>
                                (B)/(A) (%)
                              </StyledTableHead>
                              <StyledTableHead>
                                <CustomTextField
                                  value={row.ferti_B / row.ferti_A}
                                  name="B_A"
                                  onChange={(e: any) =>
                                    onInputChangeOrganica(e, index)
                                  }
                                />
                              </StyledTableHead>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableHead2 colSpan={5}>
                                {"   3.1 - Nível de fertilização orgânica ≥25% e <50%?"}
                              </StyledTableHead2>
                              <StyledTableCell>
                                <Stack
                                  direction="row"
                                  justifyContent="right"
                                >
                                  <Box margin={-1} padding={0}>
                                    <BasicPopover
                                      text={"Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção\n da fertilização orgânica».\n Beneficiário deve preencher esta questão de acordo com o resultado\n obtido no campo (B)/(A) do Quadro «2 - Nível de fertilização orgânica».\n\nValores possíveis:\n- Sim;\n- Não."
                                      }
                                    />
                                  </Box>
                                </Stack>
                                <CustomSelect
                                  value={row.tres_um !== undefined ? row.tres_um : ""}
                                  name="tres_um"
                                  onChange={(e: any) =>
                                    onInputChangeOrganica(e, index)
                                  }
                                  options={confirm}
                                  label={"Selecione"}
                                />
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableHead2 colSpan={5}>
                                3.2 - Nível de fertilização orgânica ≥50%?
                              </StyledTableHead2>

                              <StyledTableCell>
                                <Stack
                                  direction="row"
                                  justifyContent="right"
                                >
                                  <Box margin={-1} padding={0}>
                                    <BasicPopover
                                      text={
                                        "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção\n da fertilização orgânica».\n Beneficiário deve preencher esta questão de acordo com o resultado\n obtido no campo (B)/(A) do Quadro «2 - Nível de fertilização orgânica».\n\nValores possíveis:\n- Sim;\n- Não."
                                      }
                                    />
                                  </Box>
                                </Stack>
                                <CustomSelect
                                  value={row.tres_dois}
                                  name="tres_dois"
                                  onChange={(e: any) =>
                                    onInputChangeOrganica(e, index)
                                  }
                                  options={confirm}
                                  label={"Selecione"}
                                />
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableHead2 colSpan={5} align="center">
                                4 - Práticas adotadas na valorização
                                agrícola dos efluentes pecuários
                              </StyledTableHead2>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableHead2 colSpan={5}>
                                4.1 - Chorume
                              </StyledTableHead2>
                            </TableRow>
                            <TableRow>
                              <StyledTableHead2 colSpan={5}>
                                4.1.1 - Aplicou chorume?
                              </StyledTableHead2>
                              <StyledTableCell>
                                <Stack
                                  direction="row"
                                  justifyContent="right"
                                >
                                  <Box margin={-1} padding={0}>
                                    <BasicPopover
                                      text={
                                        "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção da fertilização orgânica».\nO beneficiário deverá responder: \n - Sim;\n- Não. \n\nEm caso de resposta afirmativa deverá responder às questão 3.1.2, 3.1.3 e 3.1.4."
                                      }
                                    />
                                  </Box>
                                </Stack>
                                <CustomSelect
                                  value={row.quatro_um_um}
                                  name="quatro_um_um"
                                  onChange={(e: any) =>
                                    onInputChangeOrganica(e, index)
                                  }
                                  options={confirm}
                                  label={"Selecione"}
                                />
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableHead2 colSpan={5}>
                                4.1.2 - Qual o equipamento usado para a
                                aplicação de chorume?
                              </StyledTableHead2>
                              <StyledTableCell>
                                <Stack
                                  direction="row"
                                  justifyContent="right"
                                >
                                  <Box margin={-1} padding={0}>
                                    <BasicPopover
                                      text={
                                        "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção da fertilização orgânica» e se o beneficiário respondeu 'Sim' à questão 3.1.1.\n\nValores possíveis:\n- Equipamento a baixa pressão; \n- Equipamento de injeção direta;\n- Outro tipo de equipamento.."
                                      }
                                    />
                                  </Box>
                                </Stack>
                                <CustomSelect
                                  value={row.quatro_um_dois}
                                  name="quatro_um_dois"
                                  onChange={(e: any) =>
                                    onInputChangeOrganica(e, index)
                                  }
                                  options={tres_um_dois}
                                  label={"Selecione"}
                                />
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableHead2 colSpan={5}>
                                4.1.3 - Qual o tempo decorrido para a
                                incorporação de chorume no solo?
                              </StyledTableHead2>
                              <StyledTableCell>
                                <Stack
                                  direction="row"
                                  justifyContent="right"
                                >
                                  <Box margin={-1} padding={0}>
                                    <BasicPopover
                                      text={
                                        "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção da fertilização orgânica» e se o beneficiário respondeu 'Sim' à questão 3.1.1. \n\nValores possíveis:\n- Chorume incorporado até 4 horas após a distribuição; \n- Chorume incorporado mais de 4 horas após a distribuição* \n\n(*) - De acordo com o n.º 21, do artigo 10º da Portaria n.º 259/2012, de 28 de agosto, o período de intervalo de tempo\n entre a distribuiçao e a incorporação de chorume, pode ser superior a 4 horas,\n desde que a sua aplicação cumpra simultaneamente as seguintes condições: \n 1) Aplicação e cobertura ou em sementeira direta sem injeção; \n 2) Seguida de rega controlada em tempo seco."
                                      }
                                    />
                                  </Box>
                                </Stack>
                                <CustomSelect
                                  value={row.quatro_um_tres}
                                  name="quatro_um_tres"
                                  onChange={(e: any) =>
                                    onInputChangeOrganica(e, index)
                                  }
                                  options={tres_um_tres}
                                  label={"Selecione"}
                                />
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableHead2 colSpan={5}>
                                4.1.4 - Qual a fase do processo produtivo em
                                que aplicou chorume?
                              </StyledTableHead2>
                              <StyledTableCell>
                                <Stack
                                  direction="row"
                                  justifyContent="right"
                                >
                                  <Box margin={-1} padding={0}>
                                    <BasicPopover
                                      text={
                                        "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção da fertilização orgânica» e se o beneficiário respondeu 'Sim' à questão 3.1.1. \n\n  Valores possíveis: \n - Antes da sementeira (em fundo);\n- Em sementeira direta;\n- Sobre cultura já instalada (em cobertura). "
                                      }
                                    />
                                  </Box>
                                </Stack>
                                <CustomSelect
                                  value={row.quatro_um_quatro}
                                  name="quatro_um_quatro"
                                  onChange={(e: any) =>
                                    onInputChangeOrganica(e, index)
                                  }
                                  options={tres_um_quatro}
                                  label={"Selecione"}
                                />
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableHead2 colSpan={5}>
                                4.2 - Estrume ou outro fertilizante orgânico
                                (FO, alínea b) do n.º 1 do artigo 31º)
                                exceto chorume
                              </StyledTableHead2>
                            </TableRow>
                            <TableRow>
                              <StyledTableHead2 colSpan={5}>
                                4.2.1 - Aplicou estrume ou outra F.O.
                                (exceto chorume)?
                              </StyledTableHead2>
                              <StyledTableCell>
                                <Stack
                                  direction="row"
                                  justifyContent="right"
                                >
                                  <Box margin={-1} padding={0}>
                                    <BasicPopover
                                      text={
                                        "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção da fertilização orgânica». \n O beneficiário deverá responder: \n - Sim; \n - Não. \n\n Em caso de resposta afirmativa deverá responder à questão 3.2.2."
                                      }
                                    />
                                  </Box>
                                </Stack>
                                <CustomSelect
                                  value={row.quatro_dois_um}
                                  name="quatro_dois_um"
                                  onChange={(e: any) =>
                                    onInputChangeOrganica(e, index)
                                  }
                                  options={confirm}
                                  label={"Selecione"}
                                />
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableHead2 colSpan={5}>
                                4.2.2 - Qual o tempo decorrido para a
                                incorporação de estrume ou outro FO no solo?
                              </StyledTableHead2>
                              <StyledTableCell>
                                <Stack
                                  direction="row"
                                  justifyContent="right"
                                >
                                  <Box margin={-1} padding={0}>
                                    <BasicPopover
                                      text={
                                        "Preenchimento obrigatório apenas no âmbito do regime ecológico «promoção da fertilização orgânica» e se o beneficiário respondeu 'Sim' à questão 3.2.1. \n\n  Valores possíveis: \n - Estrume ou outra F.O. incorporado até 24 horas após a distribuição; \n - Estrume ou outra F.O. incorporado mais de 24 horas após a distribuição."
                                      }
                                    />
                                  </Box>
                                </Stack>
                                <CustomSelect
                                  value={row.quatro_dois_dois}
                                  name="quatro_dois_dois"
                                  onChange={(e: any) =>
                                    onInputChangeOrganica(e, index)
                                  }
                                  options={tres_dois_dois}
                                  label={"Selecione"}
                                />
                              </StyledTableCell>
                            </TableRow>
                          </>
                        ) : (
                          editRowOrganica === false &&
                          createTable === false && (
                            <>
                              <TableRow>
                                <TableCell colSpan={8}>
                                  <Stack
                                    direction="row"
                                    justifyContent="end"
                                  >
                                    <ButtonCadernos
                                      mostrarBotaoEditar
                                      aoClicarEditar={() =>
                                        handleEdit(
                                          row.id_registo_fertil_tres
                                        )
                                      }
                                      mostrarBotaoApagar
                                      aoClicarApagar={() =>
                                        handleClickOpenDeleteOrganica(
                                          row.id_act_feertil_azotada
                                        )
                                      }
                                    />
                                  </Stack>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <StyledTableHead
                                  colSpan={2}
                                  width="30%"
                                  sx={{ backgroundColor: "lightgray" }}
                                >
                                  <Stack
                                    direction="row"
                                    justifyContent="center"
                                  >
                                    (A) = Fertilização N(total) (kg/ha)
                                    <Box margin={-1} padding={0}>
                                      <BasicPopover
                                        text={
                                          "Campo de preenchimento automático e que corresponde ao TOTAL do campo \n «Quantidade total de azoto (NTotal) aplicada» do Quadro «1 - Quantidades de azoto aplicadas»."
                                        }
                                      />
                                    </Box>
                                  </Stack>
                                </StyledTableHead>
                                <StyledTableHead
                                  width="15%"
                                  sx={{ backgroundColor: "lightgray" }}
                                >
                                  {row.ferti_A}
                                </StyledTableHead>
                              </TableRow>
                              <TableRow>
                                <StyledTableHead
                                  colSpan={2}
                                  sx={{ backgroundColor: "lightgray" }}
                                >
                                  (B)= Fertilização de N Total Orgânico de:
                                  efluentes pecuários, seus equiparados, sua
                                  mistura ou composto de efluentes pecuários
                                  (kg/ha)
                                  <BasicPopover
                                    text={
                                      "Para determinar o valor de (B) o beneficiário deve somar todos os valores individuais registados no campo «Quantidade total de azoto (NTotal) aplicada» do Quadro «1 - Quantidades de azoto aplicadas» provenientes de efluentes pecuários, seus equiparados, sua mistura ou compostos de efluentes pecuários.\n Ou seja, ao TOTAL do campo «Quantidade total de azoto (NTotal) aplicada» do Quadro 1 deve ser subtraído o azoto proveniente dos fertilizantes de síntese."
                                    }
                                  />
                                </StyledTableHead>
                                <StyledTableHead>
                                  {row.ferti_B}
                                </StyledTableHead>
                              </TableRow>
                              <TableRow>
                                <StyledTableHead
                                  colSpan={2}
                                  sx={{ backgroundColor: "lightgray" }}
                                >
                                  (B)/(A) (%)
                                </StyledTableHead>
                                <StyledTableHead>{row.B_A}</StyledTableHead>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <StyledTableHead2 colSpan={5}>
                                  {
                                    "3.1 - Nível de fertilização orgânica ≥25% e <50%?"
                                  }
                                </StyledTableHead2>
                                <StyledTableHead>
                                  {row.tres_um}
                                </StyledTableHead>
                              </TableRow>
                              <TableRow>
                                <StyledTableHead2 colSpan={5}>
                                  3.2 - Nível de fertilização orgânica ≥50%?
                                </StyledTableHead2>

                                <StyledTableHead>
                                  {row.tres_dois}
                                </StyledTableHead>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <StyledTableHead2
                                  colSpan={5}
                                  align="center"
                                >
                                  4 - Práticas adotadas na valorização
                                  agrícola dos efluentes pecuários
                                </StyledTableHead2>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <StyledTableHead2 colSpan={5}>
                                  4.1 - Chorume
                                </StyledTableHead2>
                              </TableRow>
                              <TableRow>
                                <StyledTableHead2 colSpan={5}>
                                  4.1.1 - Aplicou chorume?
                                </StyledTableHead2>

                                <StyledTableHead>
                                  {row.quatro_um_um}
                                </StyledTableHead>
                              </TableRow>
                              <TableRow>
                                <StyledTableHead2 colSpan={5}>
                                  4.1.2 - Qual o equipamento usado para a
                                  aplicação de chorume?
                                </StyledTableHead2>

                                <StyledTableHead>
                                  {row.quatro_um_dois}
                                </StyledTableHead>
                              </TableRow>
                              <TableRow>
                                <StyledTableHead2 colSpan={5}>
                                  4.1.3 - Qual o tempo decorrido para a
                                  incorporação de chorume no solo?
                                </StyledTableHead2>

                                <StyledTableHead>
                                  {row.quatro_um_tres}
                                </StyledTableHead>
                              </TableRow>
                              <TableRow>
                                <StyledTableHead2 colSpan={5}>
                                  4.1.4 - Qual a fase do processo produtivo
                                  em que aplicou chorume?
                                </StyledTableHead2>

                                <StyledTableHead>
                                  {row.quatro_um_quatro}
                                </StyledTableHead>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <StyledTableHead2 colSpan={5}>
                                  4.2 - Estrume ou outro fertilizante
                                  orgânico (FO, alínea b) do n.º 1 do artigo
                                  31º) exceto chorume
                                </StyledTableHead2>
                              </TableRow>
                              <TableRow>
                                <StyledTableHead2 colSpan={5}>
                                  4.2.1 - Aplicou estrume ou outra F.O.
                                  (exceto chorume)?
                                </StyledTableHead2>

                                <StyledTableHead>
                                  {row.quatro_dois_um}
                                </StyledTableHead>
                              </TableRow>
                              <TableRow>
                                <StyledTableHead2 colSpan={5}>
                                  4.2.2 - Qual o tempo decorrido para a
                                  incorporação de estrume ou outro FO no
                                  solo?
                                </StyledTableHead2>

                                <StyledTableHead>
                                  {row.quatro_dois_dois}
                                </StyledTableHead>
                              </TableRow>
                            </>
                          )
                        )}
                      </TableBody>
                    );
                  })}

              </table>
            </TableContainer>
          </>
        )}
        <BasicDialog
          open={openInformToSavetable3}
          onClose={() => setOpenInformToSavetable3(false)}
          message="Atualize a tabela 3 - Nível de fertilização Orgânica"
        />

        <ConfirmDialog
          open={openDeleteOrganica}
          onClose={() => setOpenDeleteOrganica(false)}
          onConfirm={handleDeleteOrganica}
          message="Deseja eliminar o registo?"
        />
      </main>
    </div>
  );
}