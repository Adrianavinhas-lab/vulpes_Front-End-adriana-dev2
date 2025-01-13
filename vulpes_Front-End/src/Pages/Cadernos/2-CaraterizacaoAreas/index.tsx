import React, { ChangeEvent, useEffect, useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Paper, SelectChangeEvent, Snackbar, Stack, Typography } from "@mui/material";
import { TableFooter } from "@mui/material";
import { TableHead, TableBody } from "@mui/material";
import { TableCell, TableRow, TableContainer } from "@mui/material";
import { TablePagination } from "@mui/material";

import TablePaginationActions from "../../../Components/Pagination/pagination";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { del, get, post } from "../../../Services/tokenConfig";
import CadernoLayout from "../../../Styles/layout/cadernoLayout";
import LoadingVulpes from "../../../Styles/Loader/loading";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { StyledTableHead } from "../../../Styles/tabelCellStyled/customTableCell";
import { StyledTableCell } from "../../../Styles/tabelCellStyled/customTableCell";
import BasicPopover from "../../../Components/Popover";
import { CustomSelect, CustomTextField, CustomThemeProvider, } from "../../../Styles/theme/customThemeprovider";

import { func_print } from "../../../Func_genericas/func_print";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";

import { useLocation } from "react-router-dom";
import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
import { IPage2 } from "../../../Interfaces/cadernos/caderno2";
import { boasPraticas, modoproducao, texturasolo } from "../../../informacao_estatica";
import { Alert } from "../../../Components/Alert/Alert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    contents: {
      flexGrow: 1,
      padding: theme.spacing(1),
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

export default function CaraterizacaoAreas() {
  const classes = useStyles();
  const location = useLocation();

  const [showNewRow, setShowNewRow] = useState(false);
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [openDelete, setOpenDelete] = React.useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null | undefined>(null);
  const [editingId, setEditingId] = useState<number | null | undefined>(null);
  const [editRow, setEditRow] = useState(false);

  const [error_parcela_numero, setError_parcela_numero] = useState<boolean>(false);
  const [error_sub_parcela, setError_sub_parcela] = useState<boolean>(false);
  const [error_area, setError_sarea] = useState<boolean>(false);
  const [error_iqfp, setError_iqfp] = useState<boolean>(false);
  const [error_zona_homogenea, setError_zona_homogenea] = useState<boolean>(false);
  const message_apenas_numero = ("Apenas números são aceites");
  const [message_iqfp, setMessage_iqfp] = useState("");
  const [message_zona_homogenea, setMessage_zona_homogenea] = useState("");


  const [rows, setRows] = useState<IPage2[]>([]);
  const [newRows, setNewRows] = useState<IPage2>();

  /**************** GET DATA **********************************/
  async function getCaracterizacao() {
    try {
      let res = await get(`/get_caraterizacao_id_rosto/${location.state.id_rosto}`);

      if (res.status === 200) {
        setRows(res.data.result);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("getCaracterizacao", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      await getCaracterizacao();
    })();
  }, []);

  /************************** CREATE ROW *****************************************/
  const handleInputChangeTable = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;

    if (name === "iqfp") {
      const intValue = parseInt(value as string, 10);

      if (isNaN(intValue) || intValue < 1 || intValue > 5) {
        setError_iqfp(true);
        setMessage_iqfp("Introduza um número entre 1 a 5");
        return;
      } else {
        setError_iqfp(false);
        setMessage_iqfp("");
      }
    }

    if (name === "parcela_numero") {
      if (isNaN(Number(value))) {
        setError_parcela_numero(true);
        return;
      } else {
        setError_parcela_numero(false);
      }
    }

    if (name === "sub_parcela") {
      if (isNaN(Number(value))) {
        setError_sub_parcela(true);
        return;
      } else {
        setError_sub_parcela(false);
      }
    }

    if (name === "area") {
      if (isNaN(Number(value))) {
        setError_sarea(true);
        return;
      } else {
        setError_sarea(false);
      }
    }

    if (name === "zona_homogenea") {
      if (!/^[a-zA-Z]*$/.test(value as string)) {
        setError_zona_homogenea(true);
        setMessage_zona_homogenea("Apenas letras são permitidas.");
        return;
      } else {
        setError_zona_homogenea(false);
        setMessage_zona_homogenea("");
      }
    }

    setNewRows((prevRows: any) => ({
      ...prevRows,
      [name]: value,
    }));
  };

  const handleCreateRow = async () => {
    if (newRows?.area === undefined ||
      newRows?.zona_homogenea === undefined ||
      newRows?.sub_parcela === undefined ||
      newRows?.parcela_numero === undefined
    ) {
      setMessage("Preencha todos os campos obrigatórios!");
      setOpenSnackError(true);
    } else {
      try {
        setIsLoading(true);

        let res = await post('new_caraterizacao', {
          payload: {
            id_cara: 0,
            parcela_numero: newRows?.parcela_numero === undefined ? "" : newRows.parcela_numero,
            sub_parcela: newRows?.sub_parcela === undefined ? "" : newRows.sub_parcela,
            zona_homogenea: newRows?.zona_homogenea === undefined ? "" : newRows.zona_homogenea,
            area: newRows?.area === undefined ? "" : newRows.area,
            textura_solo: newRows?.textura_solo === undefined ? "" : newRows.textura_solo,
            modo_producao: newRows?.modo_producao === undefined ? "" : newRows.modo_producao,
            cultura: newRows?.cultura === undefined ? "" : newRows.cultura,
            intervencao_PEPAC: newRows?.intervencao_PEPAC === undefined ? "" : newRows.intervencao_PEPAC,
            sucessao_cultural: newRows?.sucessao_cultural === undefined ? "" : newRows.sucessao_cultural,
            iqfp: newRows?.iqfp === undefined ? "" : newRows.iqfp,
            boas_praticas: newRows?.boas_praticas === undefined ? "" : newRows.boas_praticas,
            id_rosto: location.state.id_rosto,
            last_update: new Date().toISOString(),
            create_date: new Date().toISOString(),
            uuid: "",
          }
        });

        if (res.status === 200) {
          setMessage("Gravado com sucesso!");
          setOpenSnackSuccess(true);

          setShowNewRow(false);
          setNewRows(undefined);
          setRows((prevRows) => {
            return [...prevRows, res.data.result];
          })
        } else {
          setMessage("Erro ao gravar!");
          setOpenSnackError(true);
        }
        setIsLoading(false);

      } catch (error) {
        func_print("getCaracterizacao", error, true);
        setMessage("Erro ao efetuar a sua operação!");
        setOpenSnackError(true);
        setIsLoading(false);
      }
    }

  };

  /*************** EDITAR LINHA *********************/
  const handleEdit = (id: number | null | undefined) => {
    setEditingId(id);
    setEditRow(true);
  };

  const onInputChangeEdit = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;

    if (name === "iqfp") {
      if (/^\d*$/.test(value)) {     // API devolve number e não string
        const intValue = parseInt(value, 10);

        if (intValue < 1 || intValue > 5) {
          setError_iqfp(true);
          setMessage_iqfp("Introduza um número entre 1 a 5");
          return;
        } else {
          setError_iqfp(false);
          setMessage_iqfp("");
        }

      } else {
        setError_iqfp(true);
        setMessage_iqfp("Introduza um número entre 1 a 5");
        return;
      }
    }

    if (name === "parcela_numero") {
      if (/^\d*$/.test(value)) {
        setError_parcela_numero(false);
      } else {
        setError_parcela_numero(true);
        return;
      }
    }

    if (name === "sub_parcela") {
      if (/^\d*$/.test(value)) {
        setError_sub_parcela(false);
      } else {
        setError_sub_parcela(true);
        return;
      }
    }

    if (name === "area") {
      if (isNaN(Number(value))) {
        setError_sarea(true);
        return;
      } else {
        setError_sarea(false);
      }
    }

    if (name === "zona_homogenea") {
      if (!/^[a-zA-Z]*$/.test(value as string)) {
        setError_zona_homogenea(true);
        setMessage_zona_homogenea("Apenas letras são permitidas.");
        return;
      } else {
        setError_zona_homogenea(false);
        setMessage_zona_homogenea("");
      }
    }

    if (editingId !== null) {
      const updatedTable = rows.map((tab) => {
        if (tab.id_cara === editingId) {
          return {
            ...tab,
            [name]: value,
          };
        }
        return tab;
      });
      setRows(updatedTable);
    }
  };

  const handleUpdateCaraterização = async () => {
    if (editingId !== null) {
      const tableToSave = rows.find((tab) => tab.id_cara === editingId);

      if (tableToSave) {
        try {
          setIsLoading(true);

          const res = await post("/update_caraterizacao", {
            payload: tableToSave,
          });

          if (res.status === 200) {
            setMessage("Registado com sucesso!");
            setOpenSnackSuccess(true);

            const updatedRows = rows.map((row) => {
              if (row.id_cara === editingId) {
                return res.data.result
              } else {
                return row;
              }
            });

            setRows(updatedRows);
            setEditingId(undefined);
            setEditRow(false);
          } else {
            setOpenSnackError(true);
            setMessage("Erro ao registar!");
          }
          setIsLoading(false);
        } catch (error) {
          func_print("handleUpdateCaraterização", error, true);
          setMessage("Erro ao gravar!");
          setOpenSnackError(true);
          setIsLoading(false);
        }
      } else {
        setMessage("Linha não encontrada");
        setOpenSnackError(true);
      }
    }

  };

  /************************** DELETE **************************/
  const handleClickOpenDelete = (id: number | null | undefined) => {
    setOpenDelete(true);
    setIdToDelete(id);
  };

  const handleDeleteCaraterizacao = async () => {
    try {
      setIsLoading(true);
      let res = await del(`/delete_caraterizacao/${idToDelete}`);

      if (res.status === 200) {
        setMessage("Registo eliminado com sucesso!");
        setOpenDelete(false);
        setRows((oldRows) => [
          ...oldRows.filter((oldRow) => oldRow.id_cara !== idToDelete),
        ]);
        setOpenSnackSuccess(true);
      } else {
        setMessage("Erro ao eliminar o registo!");
        setOpenSnackError(true);
      }
      setIsLoading(false);

    } catch (error) {
      func_print("handleDeleteCaraterizacao", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }

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
        <CadernoLayout title="2 - Caraterização das áreas sob compromisso" />
        <main className={classes.contents}>
          <div className={classes.toolbars} />

          <>
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
              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{ height: "auto", width: "auto", padding: 2, margin: 2 }}
              >
                <table style={{ width: "100%" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        colSpan={10}
                        sx={{
                          fontWeight: 700,
                          fontSize: 18,
                          fontFamily: "candara",
                        }}
                      >
                        2 - Caraterização das áreas sob compromisso
                      </TableCell>
                      <TableCell colSpan={2}>
                        <Box sx={{ display: "flex", justifyContent: "end" }}>
                          <BarraDeFerramentas
                            mostrarBotaoNovo
                            textoBotaoNovo="Novo Registo"
                            aoClicarNovo={() => setShowNewRow(true)}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead sx={{ minWidth: 125 }}>
                        Nº Seq.de <br />
                        <Stack direction="row" justifyContent="center">
                          Parcela *
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={" N.º sequencial da parcela - Preencher com o n.º sequencial da parcela constante do iE do agricultor e anexar o respetivo iE. \n\nParcela é a área delimitada geograficamente com uma identificação única conforme registado no Sistema de Identificação Parcelar (iSIP). \n\nO iE é o documento de caraterização da exploração agrícola resultante da identificação das parcelas da exploração no iSIP; \nesta caraterização da exploração encontra-se no documento IFAP e nele consta o n.º sequencial da parcela ou baldio; n.º do parcelário; \nnome da parcela; área da parcela; IQFP, entre outros."
                              }
                            />
                          </Box>
                        </Stack>
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 125 }}>
                        <Stack direction="row" justifyContent="center">
                          Subparcela *
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={"Preencher com o n.º de subparcela constante no iE para a corresponde parcela com o n.º sequencial registado na coluna anterior. \n\nEntende-se por Subparcela a área corresponde à porção contínua de terreno homogéneo \ncom a mesma ocupação de solo existente numa mesma parcela e que consta do documento iE"
                              }
                            />
                          </Box>
                        </Stack>
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 125 }}>
                        Zona <br />
                        <Stack direction="row" justifyContent="center">
                          Homogénea *
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={"A Zona Homogénea, que deverá ser identificada por uma letra maiúscula, \ntanto pode corresponder a uma subparcela, como a mais do que uma. \nNas culturas arbóreas e arbustivas, a zona homogénea compreende \nas mesmas características dominantes quanto à natureza do solo, \nà topografia e exposição, à espécie e variedade das plantas, à idade das plantas e às práticas culturais. \nNo caso das culturas anuais, pertencentes à mesma unidade de produção, a zona homogênea compreende \nas mesmas características dominantes. \nUma mesma zona homogénea, para efeitos de registo no presente caderno de campo \nnão deve contemplar conjuntamente área em conversão e área em produção biológica. \nPor exemplo: Pode incluir uma vinha com várias castas, desde que as outras caraterísticas dominantes sejam uniformes quanto à natureza do solo, \nà topografia, ao passado cultural e às práticas culturais e a finalidade da produção seja a mesma \n(uva para vinho ou uva de mesa não podem estar na mesma zona homogénea mas, vinha com diferentes castas podem estar na mesma zona homogénea)."
                              }
                            />
                          </Box>
                        </Stack>
                      </StyledTableHead>
                      <StyledTableHead>
                        Modo de <br />
                        <Stack direction="row" justifyContent="center">
                          Produção
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={" Convencional (CV), \nProdução Integrada (PRODI), \n Manutenção Agricultura Biológica (AB),  \nConversão para AB de 1º ano (C1),\nConversão para AB de 2º ano (C2),\nConversão para AB de 3º ano (C3)."
                              }
                            />
                          </Box>
                        </Stack>
                      </StyledTableHead>
                      <StyledTableHead width={150}>
                        Intervenção <br />
                        <Stack direction="row" justifyContent="center">
                          PEPAC
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={"Agricultura Biológica (AB), \nProdução Integrada (PRODI), \nManeio da pastagem Permanente (MPP), \nPromoção de Fertilização Orgânica (PFO), \nConservação do solo – Sementeira direta (SD), \nConservação do solo – Enrelvamento (ENR), \nConservação do solo – Pastagens biodiversas (PB),\n Uso Eficiente da Água (UEA), \nApoio Zonal Montesinho-Nogueira (AZMN), \nApoio Zonal Douro Internacional, Sabor, Maçãs e Vale do Côa (AZDISMVC), \nAooio Zonal Castro Verde, Vale do Guadiana, Piçarras e Cuba (AZCVVGPC)\n ou Apoio Zonal Alto e Centro Alentejo (AZACA).\n\n Sempre que a mesma subparcela esteja candidata simultaneamente a mais do que uma intervenção PEPAC, o presente campo deve ser preenchido \ncom as siglas de todos os apoios em questão separados por um hifen. EX: AB-ENR-UEA."
                              }
                            />
                          </Box>
                        </Stack>
                      </StyledTableHead>
                      <StyledTableHead>Área (ha) *</StyledTableHead>
                      <StyledTableHead>
                        Textura <br />
                        <Stack direction="row" justifyContent="center">
                          do Solo
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={"Exemplos: argiloso (ARG), franco (FRA), arenoso (ARE), franco-argiloso (FAG). A textura ou granulometria refere-se à proporção de argila, limo e areia do solo. Assim, a textura de um solo pode ser observada no respetivo boletim de análises que deve constar em anexo a este CC."
                              }
                            />
                          </Box>
                        </Stack>
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 150 }}>
                        Cultura/ variedade ou casta
                      </StyledTableHead>
                      <StyledTableHead sx={{ minWidth: 150 }}>
                        Sucessão cultural <br />
                        <Stack direction="row" justifyContent="center">
                          (C1-C2-C3-C4...)
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={"Preencher apenas nas subparcelas com culturas temporárias. Sucessão de culturas no mesmo ano"
                              }
                            />
                          </Box>
                        </Stack>
                      </StyledTableHead>
                      <StyledTableHead>
                        <Stack direction="row" justifyContent="center">
                          IQFP
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={"O Índice de qualificação fisiográfica da parcela (IQFP) fornece informação sobre o risco de erosão do solo existente nas parcelas. O seu valor varia de 1 a 5 (do menor para o maior declive) e quanto maior for este valor, maior é o risco de perda de solo devido à erosão (de preenchimento facultativo); pode ser consultado no iE."
                              }
                            />
                          </Box>
                        </Stack>
                      </StyledTableHead>
                      <StyledTableHead width={180}>
                        Boas
                        <Stack direction="row" justifyContent="center">
                          práticas
                          <Box margin={-1} padding={0}>
                            <BasicPopover
                              text={"Por Boas Práticas Agrícolas (BPA), entende-se o conjunto de princípios, normas e recomendações técnicas. Exemplos: enrelvamento natural ou semeado (ENR), mobilização mínima (M.MÍN), sementeira direta (SEM.D), curvas de nível (C.NÍV), cobertura vegetal do solo (COB), bordaduras ervadas (BORD), bandas de compensação ecológica (BCE), refúgios para fauna selvagem (REF), sebes vegetais (SEB), variedades resistentes (RES), podas de arejamento (P.AR), etc."
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
                          <CustomTextField
                            name="parcela_numero"
                            value={newRows?.parcela_numero === undefined ? "" : newRows?.parcela_numero}
                            onChange={handleInputChangeTable}
                            error={error_parcela_numero}
                            helperText={error_parcela_numero ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="sub_parcela"
                            value={newRows?.sub_parcela === undefined ? "" : newRows.sub_parcela}
                            onChange={handleInputChangeTable}
                            error={error_sub_parcela}
                            helperText={error_sub_parcela ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="zona_homogenea"
                            value={newRows?.zona_homogenea === undefined ? "" : newRows.zona_homogenea}
                            onChange={handleInputChangeTable}
                            error={error_zona_homogenea}
                            helperText={error_zona_homogenea ? message_zona_homogenea : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomSelect
                            value={newRows?.modo_producao !== undefined ? newRows.modo_producao : ""}
                            name="modo_producao"
                            options={modoproducao}
                            label={"Modo de produção"}
                            onChange={handleInputChangeTable}

                          />
                        </StyledTableCell>
                        <StyledTableCell width={150}>
                          <CustomTextField
                            name="intervencao_PEPAC"
                            value={newRows?.intervencao_PEPAC !== undefined ? newRows.intervencao_PEPAC : ""}
                            onChange={handleInputChangeTable}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="area"
                            value={newRows?.area !== undefined ? newRows.area : ""}
                            onChange={handleInputChangeTable}
                            error={error_area}
                            helperText={error_area ? message_apenas_numero : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomSelect
                            value={newRows?.textura_solo !== undefined ? newRows.textura_solo : ""}
                            name="textura_solo"
                            label="Textura do solo"
                            options={texturasolo}
                            onChange={handleInputChangeTable}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="cultura"
                            value={newRows?.cultura !== undefined ? newRows.cultura : ""}
                            onChange={handleInputChangeTable}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="sucessao_cultural"
                            value={newRows?.sucessao_cultural !== undefined ? newRows.sucessao_cultural : ""}
                            onChange={handleInputChangeTable}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="iqfp"
                            value={newRows?.iqfp === undefined ? "" : newRows.iqfp}
                            onChange={handleInputChangeTable}
                            error={error_iqfp}
                            helperText={error_iqfp ? message_iqfp : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell width={180}>
                          <CustomSelect
                            value={newRows?.boas_praticas !== undefined ? newRows.boas_praticas : ""}
                            name="boas_praticas"
                            onChange={handleInputChangeTable}
                            options={boasPraticas}
                            label={"Boas Práticas"}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <ButtonCadernos
                            mostrarBotaoCancelar
                            aoClicarCancelar={() => setShowNewRow(false)}
                            mostrarBotaoGravar
                            aoClicarGravar={() => handleCreateRow()}
                          />
                        </StyledTableCell>
                      </TableRow>
                    )}

                    {(rowsPerPage > 0
                      ? rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      : rows
                    ).map((row, key) =>
                      <TableRow key={key}>
                        {editingId === row.id_cara && editRow ? (
                          <>
                            <StyledTableCell>
                              <CustomTextField
                                name="parcela_numero"
                                error={error_parcela_numero}
                                helperText={error_parcela_numero ? message_apenas_numero : ""}
                                value={row.parcela_numero}
                                onChange={onInputChangeEdit} />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                name="sub_parcela"
                                error={error_sub_parcela}
                                helperText={error_sub_parcela ? message_apenas_numero : ""}
                                value={row.sub_parcela}
                                onChange={onInputChangeEdit} />
                            </StyledTableCell>
                            <StyledTableCell width={50}>
                              <CustomTextField
                                name="zona_homogenea"
                                value={row.zona_homogenea}
                                onChange={onInputChangeEdit} />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomSelect
                                value={row.modo_producao !== undefined ? row.modo_producao : ""}
                                name="modo_producao"
                                onChange={onInputChangeEdit}
                                options={modoproducao}
                                label="Modo de produção" />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                name="intervencao_PEPAC"
                                value={row.intervencao_PEPAC}
                                onChange={onInputChangeEdit} />
                            </StyledTableCell>
                            <StyledTableCell width={80}>
                              <CustomTextField
                                name="area"
                                value={row.area}
                                error={error_area}
                                helperText={error_area ? message_apenas_numero : ""}
                                onChange={onInputChangeEdit} />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomSelect
                                value={row.textura_solo !== undefined ? row.textura_solo : ""}
                                label="Textura do solo"
                                name="textura_solo"
                                onChange={onInputChangeEdit}
                                options={texturasolo} />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                name="cultura"
                                value={row.cultura}
                                onChange={onInputChangeEdit} />
                            </StyledTableCell>
                            <StyledTableCell>
                              <CustomTextField
                                name="sucessao_cultural"
                                value={row.sucessao_cultural}
                                onChange={onInputChangeEdit} />
                            </StyledTableCell>
                            <StyledTableCell width={100}>
                              <CustomTextField
                                name="iqfp"
                                error={error_iqfp}
                                helperText={error_iqfp ? message_iqfp : ""}
                                value={row.iqfp}
                                onChange={onInputChangeEdit} />
                            </StyledTableCell>
                            <StyledTableCell width={150}>
                              <CustomSelect
                                value={row.boas_praticas !== undefined ? row.boas_praticas : ""}
                                name="boas_praticas"
                                onChange={onInputChangeEdit}
                                options={boasPraticas}
                                label={"Boas Práticas"} />
                            </StyledTableCell>
                          </>
                        ) : (
                          <>
                            <StyledTableCell>
                              {row.parcela_numero}
                            </StyledTableCell>
                            <StyledTableCell>
                              {row.sub_parcela}
                            </StyledTableCell>
                            <StyledTableCell>
                              {row.zona_homogenea}
                            </StyledTableCell>
                            <StyledTableCell>
                              {row.modo_producao}
                            </StyledTableCell>
                            <StyledTableCell>
                              {row.intervencao_PEPAC}
                            </StyledTableCell>
                            <StyledTableCell>{row.area} </StyledTableCell>
                            <StyledTableCell>
                              {row.textura_solo}
                            </StyledTableCell>
                            <StyledTableCell>
                              {row.cultura}{" "}
                            </StyledTableCell>
                            <StyledTableCell>
                              {row.sucessao_cultural}
                            </StyledTableCell>
                            <StyledTableCell>{row.iqfp} </StyledTableCell>
                            <StyledTableCell>
                              {row.boas_praticas}
                            </StyledTableCell>
                          </>
                        )}
                        {editingId === row.id_cara ? (
                          <StyledTableCell>
                            <ButtonCadernos
                              mostrarBotaoGravar
                              aoClicarGravar={() => handleUpdateCaraterização()}
                              mostrarBotaoCancelar
                              aoClicarCancelar={() => setEditingId(null)} />
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell>
                            <ButtonCadernos
                              mostrarBotaoEditar
                              aoClicarEditar={() => handleEdit(row.id_cara)}
                              mostrarBotaoApagar
                              aoClicarApagar={() => handleClickOpenDelete(row.id_cara)} />
                          </StyledTableCell>
                        )}

                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={12} />
                          </TableRow>
                        )}
                      </TableRow>

                    )}
                    <TableRow>
                      <TableCell colSpan={16}>
                        <Typography style={{ fontSize: 14, fontFamily: "candara" }}>
                          * Campos de preenchimento obrigatório
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <ConfirmDialog
                      open={openDelete}
                      onClose={() => setOpenDelete(false)}
                      onConfirm={handleDeleteCaraterizacao}
                      message="Deseja eliminar o registo?"
                    />
                  </TableBody>
                  <TableFooter>
                    <TableRow sx={{ width: "100%" }}>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "Todos", value: -1 },
                        ]}
                        colSpan={12}
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
                <br />
              </TableContainer>
            )}
          </>
        </main>
      </div>
    </CustomThemeProvider>
  );
}
