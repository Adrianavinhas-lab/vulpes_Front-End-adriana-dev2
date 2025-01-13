import React from "react";
import { useEffect, useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Alert, Snackbar } from "@mui/material";
import { Box } from "@mui/material";

import CadernoLayout from "../../../Styles/layout/cadernoLayout";
import { get, post } from "../../../Services/tokenConfig";

import { CabecalhoForm } from "./cabecalho";
import { AnaliseTerrasForm } from "./analiseterra";


import { CustomThemeProvider } from "../../../Styles/theme/customThemeprovider";
import { RegistoAtividades } from "./registoatividades";
import LoadingVulpes from "../../../Styles/Loader/loading";
import { useLocation } from "react-router-dom";
import { func_print } from "../../../Func_genericas/func_print";
import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
import { IAnaliseTerras, ICabecalho5B, IPage5B, IPage5B_Two } from "../../../Interfaces/cadernos/caderno5/interfaces5B";

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


export default function RegAtividades(props: any) {
  const classes = useStyles();
  const location = useLocation();

  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = useState(true);


  const [, setCreateCabecalho] = useState(false);
  const [editingId, setEditingId] = useState<number | null | undefined>(null);
  const [editingIdAgua, setEditingIdAgua] = useState<number | null | undefined>(null);
  const [editingIdExtra, setEditingIdExtra] = useState<number | null | undefined>(null);

  const [, setIndex] = useState(0); // index da zona homegénea
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0); // grava o index da zona homogénea selecionada

  const [idCabecalho, setIdCabecalho] = useState(0);

  const [editRow, setEditRow] = useState(false);
  const [editRowExtra, setEditRowExtra] = useState(false);
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);

  // Estado para o abeçalho
  const [cabecalhos, setCabecalhos] = useState<ICabecalho5B[]>([]);

  // Estado para a Tabela Análise da terra
  const [rowsTableTerra, setRowsTabelaTerra] = useState<IAnaliseTerras[]>([]);
  const [tabelaTerra, setTabelaTerra] = useState<IAnaliseTerras | any>({});

  // Estado para a tabela Actividades
  const [rowsAtividades, setRowsAtividades] = useState<IPage5B[]>([]);
  const [atividades, setAtividades] = useState<IPage5B>();


  // Estado para os campos extra
  const [extraFields, setExtraFields] = useState<IPage5B_Two[]>([]);
  const [extraObject, setExtraObject] = useState<IPage5B_Two>();

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

  /********************** GET FUNCTIONS *********************/
  async function getCabecalhoAtividades() {

    try {
      let res = await get(`/get_reg_actividades_cabecalho_rosto/${location.state.id_rosto}`);

      if (res.status === 200) {
        const sortedData = res.data.result.sort((a: any, b: any) => {
          if (a.zona_homo < b.zona_homo) return -1;
          if (a.zona_homo > b.zona_homo) return 1;
          return 0;
        });
        setCabecalhos(sortedData);
        setIdCabecalho(sortedData[0].id_registo_activi);

        await getInfoVariasTabelas(sortedData[0].id_registo_activi);
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

  async function getAnalise(id: number) {
    setIsLoading(true);
    try {
      if (idCabecalho !== undefined) {
        let res = await get(`/get_reg_actividades_cabecalho/${id}`);
        if (res.status === 200) {
          setRowsTabelaTerra(res.data.result);
        }
      };
      setIsLoading(false);
    } catch (error) {
      func_print("getAnalise", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }

  async function getActividades(id: number) {
    setIsLoading(true);
    try {
      if (idCabecalho !== undefined) {
        let res = await get(`/get_reg_actividades_5b_cabecalho/${id}`);
        if (res.status === 200) {
          setRowsAtividades(res.data.result);
        }
      };
      setIsLoading(false);
    } catch (error) {
      func_print("getActividades", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }

  async function getExtra(id: number) {
    setIsLoading(true);
    try {
      let res = await get(`/get_reg_actividades_5b_two_cabecalho/${id}`);
      if (idCabecalho !== undefined) {
        if (res.status === 200) {
          setExtraFields(res.data.result);
        }
      };
      setIsLoading(false);
    } catch (error) {
      func_print("getExtra", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }

  const getInfoVariasTabelas = async (id_cabecalho: number) => {

    await getAnalise(id_cabecalho);
    await getActividades(id_cabecalho);
    await getExtra(id_cabecalho);
  }

  /************************ CABEÇALHO *************************************************************/
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
        let res = await post("update_reg_actividades_cabecalho", { payload: cabecalhoToUpdate });

        if (res.status === 200) {
          const updatedCabecalho =
            cabecalhos.map((cab) => {
              if (cabecalhoToUpdate.id_registo_activi !== cab.id_registo_activi) {
                return { ...cab };
              } else {
                return res.data.result
              }
            }
            );
          setCabecalhos(updatedCabecalho);

          setMessage("Cabeçalho atualizado com sucesso!");
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

  ////////////// DIFERENÇA NO ID id_registo_activ






  /****************************** TABELA ANÁLISE DE TERRAS *****************************************************************/
  const handleSaveAnalise = async () => {

    if (tabelaTerra === undefined) {
      setMessage("Preencha a tabela antes de gravar");
      setOpenSnackError(true);
    } else try {
      setIsLoading(true);
      let res = await post("new_reg_actividades", {
        payload: {
          id_registo_analise: 0,
          mg_camp1: tabelaTerra?.mg_camp1 === undefined ? "" : tabelaTerra.mg_camp1,
          mg_camp2: tabelaTerra?.mg_camp2 === undefined ? "" : tabelaTerra.mg_camp2,
          mg_camp3: tabelaTerra?.mg_camp3 === undefined ? "" : tabelaTerra.mg_camp3,
          mg_camp4: tabelaTerra?.mg_camp4 === undefined ? "" : tabelaTerra.mg_camp4,
          mg_camp5: tabelaTerra?.mg_camp5 === undefined ? "" : tabelaTerra.mg_camp5,
          mg_camp6: tabelaTerra?.mg_camp6 === undefined ? "" : tabelaTerra.mg_camp6,

          percentagem_camp1: tabelaTerra?.percentagem_camp1 === undefined ? "" : tabelaTerra.percentagem_camp1,
          percentagem_camp2: tabelaTerra?.percentagem_camp2 === undefined ? "" : tabelaTerra.percentagem_camp2,
          percentagem_camp3: tabelaTerra?.percentagem_camp3 === undefined ? "" : tabelaTerra.percentagem_camp3,
          percentagem_camp4: tabelaTerra?.percentagem_camp4 === undefined ? "" : tabelaTerra.percentagem_camp4,
          percentagem_camp5: tabelaTerra?.percentagem_camp5 === undefined ? "" : tabelaTerra.percentagem_camp5,
          percentagem_camp6: tabelaTerra?.percentagem_camp6 === undefined ? "" : tabelaTerra.percentagem_camp6,
          Resultados_analicesPH: tabelaTerra?.Resultados_analicesPH === undefined ? "" : tabelaTerra.Resultados_analicesPH,
          Resultados_analicesMO: tabelaTerra?.Resultados_analicesMO === undefined ? "" : tabelaTerra.Resultados_analicesMO,

          fertilizacao_camp1: tabelaTerra?.fertilizacao_camp1 === undefined ? "" : tabelaTerra.fertilizacao_camp1,
          fertilizacao_camp2: tabelaTerra?.fertilizacao_camp2 === undefined ? "" : tabelaTerra.fertilizacao_camp2,
          fertilizacao_camp3: tabelaTerra?.fertilizacao_camp3 === undefined ? "" : tabelaTerra.fertilizacao_camp3,
          fertilizacao_camp4: tabelaTerra?.fertilizacao_camp4 === undefined ? "" : tabelaTerra.fertilizacao_camp4,
          fertilizacao_camp5: tabelaTerra?.fertilizacao_camp5 === undefined ? "" : tabelaTerra.fertilizacao_camp5,
          fertilizacao_camp6: tabelaTerra?.fertilizacao_camp6 === undefined ? "" : tabelaTerra.fertilizacao_camp6,
          fertilizacao_camp7: tabelaTerra?.fertilizacao_camp7 === undefined ? "" : tabelaTerra.fertilizacao_camp7,
          fertilizacao_camp8: tabelaTerra?.fertilizacao_camp8 === undefined ? "" : tabelaTerra.fertilizacao_camp8,

          deduzir_cálculo: tabelaTerra?.deduzir_cálculo === undefined ? "" : tabelaTerra.deduzir_cálculo,
          deduzir_cálculo_camp2: tabelaTerra?.deduzir_cálculo_camp2 === undefined ? "" : tabelaTerra.deduzir_cálculo_camp2,
          azoto_mineral: tabelaTerra?.azoto_mineral === undefined ? false : tabelaTerra.azoto_mineral,
          azoto_nitrico: tabelaTerra?.azoto_nitrico === undefined ? false : tabelaTerra.azoto_nitrico,
          azoto_total: tabelaTerra?.azoto_total === undefined ? false : tabelaTerra.azoto_total,

          id_registo_activi: idCabecalho,
          last_update: new Date().toISOString(),
          create_date: new Date().toISOString(),
          uuid: ""
        }
      });

      if (res.status === 200) {
        setMessage("Gravado com sucesso!");

        setRowsTabelaTerra((prevRows) => {
          return [...prevRows, res.data.result]
        });
        setTabelaTerra(undefined);
        setOpenSnackSuccess(true);
        setCreateCabecalho(false);
      } else {
        setMessage("Erro ao gravar!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleSaveAnalise", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };
  // EDIT
  const handleUpdateAnalise = async () => {
    if (editingIdAgua !== null) {
      const tableToUpdate = rowsTableTerra.find((tab) => tab.id_registo_analise === editingIdAgua);

      if (!tableToUpdate) {
        setMessage("Tabela não encontrada!");
        setOpenSnackError(true);
        return;
      } else if (tableToUpdate === undefined) {
        setMessage("Preencha a tabela antes de gravar");
        setOpenSnackError(true);
      } else try {
        setIsLoading(true);
        let res = await post("update_reg_actividades", { payload: tableToUpdate });

        if (res.status === 200) {
          setMessage("Atualizado com sucesso!");
          const updatedRows = rowsTableTerra.map((row) => {
            if (row.id_registo_analise === editingId) {
              return res.data.result
            } else {
              return { ...row }
            }
          });
          setRowsTabelaTerra(updatedRows !== undefined ? updatedRows : []);
          setEditRow(false);
          setEditingIdAgua(null);
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

  /********************** Registo Atividades *********************************************************/
  // Create
  const handleSaveNewAtividades = async () => {
    if (atividades?.data === undefined || atividades?.data === "" ||
      atividades.fertilizacao === undefined || atividades.fertilizacao === ""
    ) {
      setMessage("Preencha os campos obrigatórios");
      setOpenSnackError(true);
    } else if (atividades === undefined) {
      setMessage("Preencha a tabela antes de gravar");
      setOpenSnackError(true);
    } else try {
      setIsLoading(true);
      let res = await post("new_reg_actividades_5b", {
        payload: {
          id_atividade: 0,
          data: atividades?.data === undefined ? "" : atividades.data,
          operacao_cult: atividades?.operacao_cult === undefined ? "" : atividades.operacao_cult,
          fertilizacao: atividades?.fertilizacao === undefined ? "" : atividades.fertilizacao,
          produto_utilizado: atividades?.produto_utilizado === undefined ? "" : atividades.produto_utilizado,
          t: atividades?.t === undefined ? "" : atividades.t,
          n: atividades?.n === undefined ? "" : atividades.n,
          po: atividades?.po === undefined ? "" : atividades.po,
          ko: atividades?.ko === undefined ? "" : atividades.ko,
          mgo: atividades?.mgo === undefined ? "" : atividades.mgo,
          cao: atividades?.cao === undefined ? "" : atividades.cao,
          so: atividades?.so === undefined ? "" : atividades.so,
          b: atividades?.b === undefined ? "" : atividades.b,
          campp_opcao: atividades?.campp_opcao === undefined ? "" : atividades.campp_opcao,
          id_registo_activi: idCabecalho,
          last_update: new Date().toISOString(),
          create_date: new Date().toISOString(),
          uuid: "",
        }
      });
      if (res.status === 200) {
        setMessage("Gravado com sucesso!");

        setAtividades(undefined);
        setRowsAtividades((prevRows) => {
          return [...prevRows, res.data.result];
        });
        setOpenSnackSuccess(true);
        setCreateCabecalho(false);
      } else {
        setMessage("Erro ao gravar!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleSaveNewAtividades", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };
  // EDIT
  const handleUpdateAtividades = async () => {
    if (editingId !== null) {
      const atividadeToSave = rowsAtividades.find((tab) => tab.id_atividade === editingId);

      if (atividadeToSave) {
        if (atividadeToSave?.data === undefined || atividadeToSave?.data === "" ||
          atividadeToSave.fertilizacao === undefined || atividadeToSave.fertilizacao === ""
        ) {
          setMessage("Preencha os campos obrigatórios");
          setOpenSnackError(true);
        } else try {
          setIsLoading(true);

          const res = await post(`update_reg_actividades_5b`, { payload: atividadeToSave });
          if (res.status === 200) {
            setMessage("Registado com sucesso!");
            const updatedRows = rowsAtividades.map((row) => {
              if (row.id_atividade === editingId) {
                return res.data.result
              } else {
                return { ...row }
              }
            });

            setRowsAtividades(updatedRows !== undefined ? updatedRows : []);
            setEditRow(false);
            setEditingId(null);
            setOpenSnackSuccess(true);
          } else {
            setMessage("Erro ao gravar!");
            setOpenSnackError(true);
          }
          setIsLoading(false);
        } catch (error) {
          func_print("handleSaveAtividades", error, true);
          setMessage("Erro ao gravar!");
          setOpenSnackError(true);
          setIsLoading(false);
        }
      }
    }
  };


  /********************* CAMPOS EXTRA ***************************************/
  // Create
  const handleSaveNewExtra = async () => {

    if (extraObject === undefined) {
      setMessage("Preencha a tabela antes de gravar");
      setOpenSnackError(true);
    } else try {
      setIsLoading(true);

      let res = await post("new_reg_actividades_5b_two", {
        payload: {
          id_atividade_two: 0,
          elementos_n: extraObject?.elementos_n === undefined ? "" : extraObject.elementos_n,
          elementos_po: extraObject?.elementos_po === undefined ? "" : extraObject.elementos_po,
          elementos_ko: extraObject?.elementos_ko === undefined ? "" : extraObject.elementos_ko,
          elementos_mgo: extraObject?.elementos_mgo === undefined ? "" : extraObject.elementos_mgo,
          elementos_cao: extraObject?.elementos_cao === undefined ? "" : extraObject.elementos_cao,
          elementos_so: extraObject?.elementos_so === undefined ? "" : extraObject.elementos_so,
          elementos_b: extraObject?.elementos_b === undefined ? "" : extraObject.elementos_b,
          elementos_campp_opcao: extraObject?.elementos_campp_opcao === undefined ? "" : extraObject.elementos_campp_opcao,

          totais_apli_homo_n: extraObject?.totais_apli_homo_n === undefined ? "" : extraObject.totais_apli_homo_n,
          totais_apli_homo_po: extraObject?.totais_apli_homo_po === undefined ? "" : extraObject.totais_apli_homo_po,
          totais_apli_homo_ko: extraObject?.totais_apli_homo_ko === undefined ? "" : extraObject.totais_apli_homo_ko,
          totais_apli_homo_mgo: extraObject?.totais_apli_homo_mgo === undefined ? "" : extraObject.totais_apli_homo_mgo,
          totais_apli_homo_cao: extraObject?.totais_apli_homo_cao === undefined ? "" : extraObject.totais_apli_homo_cao,
          totais_apli_homo_so: extraObject?.totais_apli_homo_so === undefined ? "" : extraObject.totais_apli_homo_so,
          totais_apli_homo_b: extraObject?.totais_apli_homo_b === undefined ? "" : extraObject.totais_apli_homo_b,
          totais_apli_homo_campp_opcao: extraObject?.totais_apli_homo_campp_opcao === undefined ? "" : extraObject.totais_apli_homo_campp_opcao,

          totais_apli_n: extraObject?.totais_apli_n === undefined ? "" : extraObject.totais_apli_n,
          totais_apli_po: extraObject?.totais_apli_po === undefined ? "" : extraObject.totais_apli_po,
          totais_apli_ko: extraObject?.totais_apli_ko === undefined ? "" : extraObject.totais_apli_ko,
          totais_apli_mgo: extraObject?.totais_apli_mgo === undefined ? "" : extraObject.totais_apli_mgo,
          totais_apli_cao: extraObject?.totais_apli_cao === undefined ? "" : extraObject.totais_apli_cao,
          totais_apli_so: extraObject?.totais_apli_so === undefined ? "" : extraObject.totais_apli_so,
          totais_apli_b: extraObject?.totais_apli_b === undefined ? "" : extraObject.totais_apli_b,
          totais_apli_campp_opcao: extraObject?.totais_apli_campp_opcao === undefined ? "" : extraObject.totais_apli_campp_opcao,

          id_registo_activi: idCabecalho,
          last_update: new Date().toISOString(),
          create_date: new Date().toISOString(),
          uuid: "",
        }
      });
      if (res.status === 200) {
        setMessage("Gravado com sucesso!");

        setExtraObject(undefined);
        setExtraFields((prevRows) => {
          return [...prevRows, res.data.result];
        });
        setOpenSnackSuccess(true);
        setCreateCabecalho(false);
      } else {
        setMessage("Erro ao gravar!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleSaveNewExtra", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };
  // EDIT
  const handleSaveEditExtra = async () => {
    if (editingIdExtra !== null) {
      const atividadeToSave = extraFields.find((tab) => tab.id_atividade_two === editingIdExtra);

      if (atividadeToSave) {
        try {
          setIsLoading(true);

          let res = await post(
            `update_reg_actividades_5b_two`,
            { payload: atividadeToSave }
          );
          if (res.status === 200) {
            setMessage("Registado com sucesso!");
            const updatedRows = extraFields.map((row) => {
              if (row.id_atividade_two === editingIdExtra) {
                return res.data.result
              } else {
                return { ...row }
              }
            });
            setExtraFields(updatedRows !== undefined ? updatedRows : []);
            setEditingIdExtra(null);
            setEditRowExtra(false);
            setOpenSnackSuccess(true);
          } else {
            setMessage("Erro ao gravar!");
            setOpenSnackError(true);
          }
          setIsLoading(false);
        } catch (error) {
          func_print("handleSaveEditExtra", error, true);
          setMessage("Erro ao gravar!");
          setOpenSnackError(true);
          setIsLoading(false);
        }
      }
    }
  };


  return (
    <CustomThemeProvider>
      <div className={classes.root}>
        <CadernoLayout title="5B - Registo das atividades" />
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
                <CabecalhoForm
                  cabecalhos={cabecalhos}
                  setCabecalhos={setCabecalhos}
                  updateCreateCabecalho={() => setCreateCabecalho(false)}
                  onSaveEditCabecalho={handleUpdateCabecalho}
                  handleSelectZona={handleSelectZona}
                  selectedIndex={selectedIndex}
                />
              </Box>

              <AnaliseTerrasForm
                tabelaTerra={tabelaTerra}
                rows={rowsTableTerra}
                onSaveTabela={handleSaveAnalise}
                onEditTabela={handleUpdateAnalise}
                updateCreateTable={() => setCreateCabecalho(false)}
                setEditingId={setEditingIdAgua}
                setEditRow={setEditRow}
                editingId={editingIdAgua}
                editRow={editRow}
                setTabelaTerra={setTabelaTerra}
                setRowsTabelaTerra={setRowsTabelaTerra}
                setIsLoading={setIsLoading}
                setOpenSnackSuccess={setOpenSnackSuccess}
                setOpenSnackError={setOpenSnackError}
                setMessage={setMessage} />

              <RegistoAtividades
                atividades={atividades}
                rows={rowsAtividades}
                extraObject={extraObject}
                extraFields={extraFields}
                setAtividades={setAtividades}
                setRowsAtividades={setRowsAtividades}
                updateCreateTable={() => setCreateCabecalho(false)}
                onSaveTabela={handleSaveNewAtividades}
                onSaveEdit={handleUpdateAtividades}
                setEditingId={setEditingId}
                setEditRow={setEditRow}
                editingId={editingId}
                editRow={editRow}
                setIsLoading={setIsLoading}
                setOpenSnackSuccess={setOpenSnackSuccess}
                setOpenSnackError={setOpenSnackError}
                setMessage={setMessage}
                onSaveTabelaExtra={handleSaveNewExtra}
                onSaveEditExtra={handleSaveEditExtra}
                setEditingIdExtra={setEditingIdExtra}
                setEditRowExtra={setEditRowExtra}
                editingIdExtra={editingIdExtra}
                editRowExtra={editRowExtra}
                setExtraObject={setExtraObject}
                setExtraFields={setExtraFields}
              />



            </>
          )}
        </main>
      </div>
    </CustomThemeProvider>
  );
}
