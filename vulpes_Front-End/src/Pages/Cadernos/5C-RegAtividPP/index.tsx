import React, { ChangeEvent, useEffect, useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import CadernoLayout from "../../../Styles/layout/cadernoLayout";
import { OperacoesCulturaisForm } from "./operacoesculturais";
import { ManeioEPecuarioForm } from "./maneio";
import LoadingVulpes from "../../../Styles/Loader/loading";
import { del, get, post } from "../../../Services/tokenConfig";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import { useLocation } from "react-router-dom";
import { func_print } from "../../../Func_genericas/func_print";
import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
import { IManeioEPecuario, IOperacoesCulturais } from "../../../Interfaces/cadernos/caderno5/interfaces5C";
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


export default function RegAtividPP() {
  const classes = useStyles();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [, setCreate] = useState(false);
  const [editRow, setEditRow] = useState(false);

  const [editingId, setEditingId] = useState<number | null | undefined>(null);



  const [rows, setRows] = useState<IOperacoesCulturais[]>([]);
  const [operacoes, setOperacoes] = useState<IOperacoesCulturais>();


  async function getOperacoesCulturais() {

    try {
      let res = await get(`/get_reg_oper_culturais_PP_um_5c_rosto/${location.state.id_rosto}`);

      if (res.status === 200) {
        setRows(res.data.result);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("getOperacoesCulturais", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }



  useEffect(() => {
    (async () => {
      await getOperacoesCulturais();
    })();
  }, []);


  /*************** OPERAÇÕES CULTURAIS *********************/
  // CREATE
  const handleSaveNOperCulturais = async () => {
    setIsLoading(true);

    try {
      let res = await post("new_reg_oper_culturais_PP_um_5c", { payload: operacoes });
      if (res.status === 200) {
        setMessage("Gravado com sucesso!");

        setOperacoes(undefined);
        setRows((prevRows) => {
          return [...prevRows, res.data.result];
        });
        setOpenSnackSuccess(true);
        setCreate(false);
      } else {
        setMessage("Erro ao gravar!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleSaveNOperCulturais", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  // EDIT
  const handleSaveEdit = async () => {
    if (editingId !== null) {
      const atividadeToSave = rows.find((tab) => tab.id_regis_ope_cult === editingId);

      if (atividadeToSave) {
        try {
          setIsLoading(true);
          let res = await post(`update_reg_oper_culturais_PP_um_5c`, { payload: atividadeToSave });

          if (res.status === 200) {
            setMessage("Registado com sucesso!");
            const updatedRows = rows.map((row) => {
              if (row.id_regis_ope_cult === editingId) {
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
          func_print("handleSaveEdit", error, true);
          setMessage("Erro ao gravar!");
          setOpenSnackError(true);
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <div className={classes.root}>
      <CadernoLayout title="5C - Registo das Atividades pastagens permanentes e pastagens biodiversas" />
      <main className={classes.contents}>
        <div className={classes.toolbars} />
        <div>
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
              <>
                <OperacoesCulturaisForm
                  operacoes={operacoes}
                  rows={rows}
                  setOperacoes={setOperacoes}
                  setRows={setRows}
                  onSaveTabela={handleSaveNOperCulturais}
                  onSaveEdit={handleSaveEdit}
                  setEditingId={setEditingId}
                  setEditRow={setEditRow}
                  editingId={editingId}
                  editRow={editRow}
                  updateCreateTable={() => setCreate(false)}
                />

                <ManeioEPecuarioForm
                  // maneio={maneio}
                  // rows={rowsManeio}
                  // onInputChange={onInputChange}
                  // onEditTableChange={onChangeEditManeio}
                  // onSaveTabela={handleSaveManeio}
                  // onSaveEdit={handleSaveEditManeio}
                  // setEditingId={setEditingIdManeio}
                  // setEditRow={setEditRowManeio}
                  // editingId={editingIdManeio}
                  // editRow={editRowManeio}
                  // onDelete={handleClickOpenDeleteManeio}
                  // updateCreateTable={() => setCreate(false)}
                  // error_area={error_area}
                  // error_cn_ja_fev={error_cn_ja_fev}
                  // error_cn_jun_set={error_cn_jun_set}
                  // error_cn_mar_mai={error_cn_mar_mai}
                  // error_cn_out_dez={error_cn_out_dez}
                   />
              </>
            )}

      
          </>
        </div>
      </main>
    </div>
  );
}
