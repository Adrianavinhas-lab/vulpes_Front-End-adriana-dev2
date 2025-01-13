import React from "react";
import { useEffect, useState } from "react";
import { FormGroup, Snackbar, TableBody, Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Box, Paper } from "@mui/material";
import { del, get, post } from "../../../Services/tokenConfig";
import CadernoLayout from "../../../Styles/layout/cadernoLayout";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingVulpes from "../../../Styles/Loader/loading";
import { CustomTextField, CustomThemeProvider } from "../../../Styles/theme/customThemeprovider";
import { StyledTableCell, StyledTableHeadLeft } from "../../../Styles/tabelCellStyled/customTableCell";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import { IAnexo5 } from "../../../Interfaces/anexos/anexo5";
import { func_print } from "../../../Func_genericas/func_print";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { Alert } from "../../../Components/Alert/Alert";
import { cores } from "../../../Func_genericas/valores_estaticos";
import { IPage3 } from "../../../Interfaces/cadernos/caderno3";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    toolbar: {
      display: "flex",
      textAlign: "center",
      justifyContent: "center",
      padding: theme.spacing(2, 4),
      // necessary for content to be below app bar
      background: " #E7F0DA ",
      color: "#353C47",
      fontFamily: "Arial",
    },
    toolbars: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(2, 3),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    contents: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);



export default function Anexo5() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();


  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);

  const [obj_anexo, set_obj_anexo] = useState<IAnexo5>();
  const [obj_anexo_lista, set_obj_anexo_lista] = useState<IAnexo5[]>([]);
  const [obj_anexo_new_or_edit, set_obj_anexo_new_or_edit] = useState<IAnexo5>();

  const [flag_editar_Anexo, set_flag_editar_Anexo] = useState(false);

  const [message, setMessage] = useState("");
  const [open_dialog_tem_a_certeza_que_quer_eliminar, set_open_dialog_tem_a_certeza_que_quer_eliminar] = useState(false);
  const [flag_criar_novo_anexo, set_flag_criar_novo_anexo] = useState(false);

  const [especie_ou_lote_homegenio_lista, set_especie_ou_lote_homegenio_lista] = useState<IPage3[]>([]);
  const [especie_ou_lote_homegenio_selecionada, set_especie_ou_lote_homegenio_selecionada] = useState<IPage3>();



  const [isLoading, setIsLoading] = useState(true);

  const reset_flags = () => {
    set_obj_anexo_new_or_edit(undefined)
    set_flag_editar_Anexo(false)
    set_open_dialog_tem_a_certeza_que_quer_eliminar(false)
    set_flag_criar_novo_anexo(false)

  }
  const onInputChange = (event: any) => {

    const { name, value, type, checked } = event.target;
    let aux_obj_anexo: any = obj_anexo_new_or_edit === undefined ? {} : obj_anexo_new_or_edit

    if (type === "checkbox") {
      aux_obj_anexo[name] = aux_obj_anexo[name] === undefined ? true : !aux_obj_anexo[name]
      set_obj_anexo_new_or_edit(aux_obj_anexo);

    } else {

      set_obj_anexo_new_or_edit((old: any) => ({
        ...old,
        [name]: value,
      }));
    }


  };
  const get_info = async () => {
    try {
      let data = await get(`/zona_homgenea_Lista/${location.state.id_rosto}`)
      // let data = await get(`/get_reg_anexo_cinco_rosto/${location.state.id_rosto}`)

      if (data.status === 200) {
        if (data.data.result.length !== 0) {
          set_especie_ou_lote_homegenio_selecionada(data.data.result[0])

          set_especie_ou_lote_homegenio_lista(data.data.result);
          await get_anexo(data.data.result[0].id_cara_pecu)

        } else {
          set_flag_criar_novo_anexo(true);
        }
      } else {

        setMessage("Erro a carregar informação!");
        setOpenSnackError(true);
        set_flag_criar_novo_anexo(true);

      }

      setIsLoading(false)

    } catch (error) {

      func_print('get_info', error, true)
      setMessage("Erro a realizar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false)
    }
  }

  const get_anexo = async (id_especie_ou_lote_homegenio_selecionada: number) => {
    try {
      setIsLoading(true)

      let data = await get(`/get_reg_anexo_cinco_um_idRosto/${location.state.id_rosto}`)

      if (data.status === 200) {
        if (data.data.result.length !== 0) {

          let aux_obj_anexo_de_acordo_com_especie_ou_lote_homegenio_selecionada = data.data.result.find((el: IAnexo5) => el.id_cara_pecu === id_especie_ou_lote_homegenio_selecionada)


          set_obj_anexo_lista(data.data.result)

          set_obj_anexo(aux_obj_anexo_de_acordo_com_especie_ou_lote_homegenio_selecionada);
          if (aux_obj_anexo_de_acordo_com_especie_ou_lote_homegenio_selecionada === undefined) {
            set_flag_criar_novo_anexo(true);

          } else {
            set_flag_criar_novo_anexo(false);

          }

        } else {
          set_obj_anexo_lista([])

          set_obj_anexo(undefined);

          set_flag_criar_novo_anexo(true);
        }
      } else {
        set_obj_anexo_lista([])

        set_obj_anexo(undefined);

        setMessage("Erro a carregar informação!");
        setOpenSnackError(true);
        set_flag_criar_novo_anexo(true);

      }

      setIsLoading(false)

    } catch (error) {
      set_obj_anexo(undefined);
      set_obj_anexo_lista([])

      func_print('get_anexo', error, true)
      setMessage("Erro a realizar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false)
    }
  }

  const handle_update_anexo = async () => {
    try {
      setIsLoading(true);

      let res = await post("update_reg_anexo_cinco_um", {
        payload: obj_anexo_new_or_edit
        // payload: {
        //   id_template: ?.id_reproducaos === undefined ? 0 : obj_anexo_new_or_edit?.id_reproducaos,
        //   id_reproducaos: obj_anexo_new_or_edit?.id_reproducaos === undefined ? 0 : obj_anexo_new_or_edit?.id_reproducaos,
        //   cruzados_indeterminacao: obj_anexo_new_or_edit?.cruzados_indeterminacao === undefined ? false : obj_anexo_new_or_edit?.cruzados_indeterminacao,
        //   cruzados_pura: obj_anexo_new_or_edit?.cruzados_pura === undefined ? false : obj_anexo_new_or_edit?.cruzados_pura,
        //   raca: obj_anexo_new_or_edit?.raca === undefined ? '' : obj_anexo_new_or_edit?.raca,
        //   cruzados_industrial: obj_anexo_new_or_edit?.cruzados_industrial === undefined ? false : obj_anexo_new_or_edit?.cruzados_industrial,
        //   raca_pai: obj_anexo_new_or_edit?.raca_pai === undefined ? '' : obj_anexo_new_or_edit?.raca_pai,
        //   raca_mae: obj_anexo_new_or_edit?.raca_mae === undefined ? '' : obj_anexo_new_or_edit?.raca_mae,
        //   idade: obj_anexo_new_or_edit?.idade === undefined ? false : obj_anexo_new_or_edit?.idade,
        //   estado_produtivo: obj_anexo_new_or_edit?.estado_produtivo === undefined ? false : obj_anexo_new_or_edit?.estado_produtivo,
        //   finalidade_produtiva: obj_anexo_new_or_edit?.finalidade_produtiva === undefined ? false : obj_anexo_new_or_edit?.finalidade_produtiva,
        //   utilizacao_parcela: obj_anexo_new_or_edit?.utilizacao_parcela === undefined ? false : obj_anexo_new_or_edit?.utilizacao_parcela,
        //   racas: obj_anexo_new_or_edit?.racas === undefined ? false : obj_anexo_new_or_edit?.racas,
        //   metodo_cobicao: obj_anexo_new_or_edit?.metodo_cobicao === undefined ? false : obj_anexo_new_or_edit?.metodo_cobicao,
        //   metodo_tranplante: obj_anexo_new_or_edit?.metodo_tranplante === undefined ? false : obj_anexo_new_or_edit?.metodo_tranplante,
        //   metodo_inseminacao: obj_anexo_new_or_edit?.metodo_inseminacao === undefined ? false : obj_anexo_new_or_edit?.metodo_inseminacao,
        //   n_femeas_macho: obj_anexo_new_or_edit?.n_femeas_macho === undefined ? '' : obj_anexo_new_or_edit?.n_femeas_macho,
        //   sim: obj_anexo_new_or_edit?.sim === undefined ? false : obj_anexo_new_or_edit?.sim,
        //   nao: obj_anexo_new_or_edit?.nao === undefined ? false : obj_anexo_new_or_edit?.nao,
        //   sim_melhor_preco: obj_anexo_new_or_edit?.sim_melhor_preco === undefined ? false : obj_anexo_new_or_edit?.sim_melhor_preco,
        //   sim_recursos: obj_anexo_new_or_edit?.sim_recursos === undefined ? false : obj_anexo_new_or_edit?.sim_recursos,
        //   sim_melhorfertilidade: obj_anexo_new_or_edit?.sim_melhorfertilidade === undefined ? false : obj_anexo_new_or_edit?.sim_melhorfertilidade,
        //   sim_recursos_humanos: obj_anexo_new_or_edit?.sim_recursos_humanos === undefined ? false : obj_anexo_new_or_edit?.sim_recursos_humanos,
        //   epoca_cobricao: obj_anexo_new_or_edit?.epoca_cobricao === undefined ? '' : obj_anexo_new_or_edit?.epoca_cobricao,
        //   assistencia_pos_parto_recem_nascido: obj_anexo_new_or_edit?.assistencia_pos_parto_recem_nascido === undefined ? '' : obj_anexo_new_or_edit?.assistencia_pos_parto_recem_nascido,
        //   assistencia_pos_parto_femea: obj_anexo_new_or_edit?.assistencia_pos_parto_femea === undefined ? '' : obj_anexo_new_or_edit?.assistencia_pos_parto_femea,
        //   longevidade: obj_anexo_new_or_edit?.longevidade === undefined ? '' : obj_anexo_new_or_edit?.longevidade,
        //   reinicio_producao: obj_anexo_new_or_edit?.reinicio_producao === undefined ? false : obj_anexo_new_or_edit?.reinicio_producao,
        //   renovacao_efetivo: obj_anexo_new_or_edit?.renovacao_efetivo === undefined ? false : obj_anexo_new_or_edit?.renovacao_efetivo,
        //   renovacao_adquiridos: obj_anexo_new_or_edit?.renovacao_adquiridos === undefined ? false : obj_anexo_new_or_edit?.renovacao_adquiridos,
        //   macho_renovacao_efetivo: obj_anexo_new_or_edit?.macho_renovacao_efetivo === undefined ? false : obj_anexo_new_or_edit?.macho_renovacao_efetivo,
        //   macho_renovacao_adquiridos: obj_anexo_new_or_edit?.macho_renovacao_adquiridos === undefined ? false : obj_anexo_new_or_edit?.macho_renovacao_adquiridos,
        //   macho_dade_inicio: obj_anexo_new_or_edit?.macho_dade_inicio === undefined ? null : obj_anexo_new_or_edit?.macho_dade_inicio,
        //   macho_peso_condicao: obj_anexo_new_or_edit?.macho_peso_condicao === undefined ? '' : obj_anexo_new_or_edit?.macho_peso_condicao,
        //   macho_avaliacao: obj_anexo_new_or_edit?.macho_avaliacao === undefined ? '' : obj_anexo_new_or_edit?.macho_avaliacao,
        //   obs: obj_anexo_new_or_edit?.obs === undefined ? '' : obj_anexo_new_or_edit?.obs,
        //   id_reproducao: obj_anexo_new_or_edit?.id_reproducao === undefined ? 0 : obj_anexo_new_or_edit?.id_reproducao,
        //   last_update: new Date().toISOString(),
        //   create_date: new Date().toISOString(),
        //   uuid: "",
        // }
      });

      if (res.status === 200) {

        set_obj_anexo(res.data.result);
        set_flag_editar_Anexo(false);
        reset_flags()
        setMessage("Gravado com sucesso!");
        setOpenSnackSuccess(true);
      } else {
        setMessage("Erro ao gravar!");

        setOpenSnackError(true);
      }

      setIsLoading(false);
    } catch (error) {
      func_print("handle_update_anexo", error, true);
      setMessage("Erro ao gravar!");

      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  const handle_delete_anexo = async () => {
    try {
      setIsLoading(true);
      // delete__reg_anexo_cinco
      func_print('obj_anexo', obj_anexo)
      let res = await del(
        `delete_reg_anexo_cinco_um/${obj_anexo?.id_reproducaos}`
      );
      if (res.status === 200) {
        setMessage("Registo eliminado com sucesso!");


        set_open_dialog_tem_a_certeza_que_quer_eliminar(false);
        setOpenSnackSuccess(true);
        set_obj_anexo(undefined)
        set_flag_criar_novo_anexo(true)
        // navigate(-1);
      } else {
        setMessage("Erro ao eliminar o registo!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handle_delete_anexo", error, true);
      setIsLoading(false);
      setMessage("Erro ao eliminar o registo!");
      setOpenSnackError(true);
    }
  };

  const handle_create_anexo = async () => {
    try {
      setIsLoading(true);
      let res = await post("new_reg_anexo_cinco_um", {
        payload: {
          id_reproducaos: 0,
          cruzados_indeterminacao: obj_anexo_new_or_edit?.cruzados_indeterminacao === undefined ? false : obj_anexo_new_or_edit?.cruzados_indeterminacao,
          cruzados_pura: obj_anexo_new_or_edit?.cruzados_pura === undefined ? false : obj_anexo_new_or_edit?.cruzados_pura,
          raca: obj_anexo_new_or_edit?.raca === undefined ? '' : obj_anexo_new_or_edit?.raca,
          cruzados_industrial: obj_anexo_new_or_edit?.cruzados_industrial === undefined ? false : obj_anexo_new_or_edit?.cruzados_industrial,
          raca_pai: obj_anexo_new_or_edit?.raca_pai === undefined ? '' : obj_anexo_new_or_edit?.raca_pai,
          raca_mae: obj_anexo_new_or_edit?.raca_mae === undefined ? '' : obj_anexo_new_or_edit?.raca_mae,
          idade: obj_anexo_new_or_edit?.idade === undefined ? false : obj_anexo_new_or_edit?.idade,
          estado_produtivo: obj_anexo_new_or_edit?.estado_produtivo === undefined ? false : obj_anexo_new_or_edit?.estado_produtivo,
          finalidade_produtiva: obj_anexo_new_or_edit?.finalidade_produtiva === undefined ? false : obj_anexo_new_or_edit?.finalidade_produtiva,
          utilizacao_parcela: obj_anexo_new_or_edit?.utilizacao_parcela === undefined ? false : obj_anexo_new_or_edit?.utilizacao_parcela,
          racas: obj_anexo_new_or_edit?.racas === undefined ? false : obj_anexo_new_or_edit?.racas,
          metodo_cobicao: obj_anexo_new_or_edit?.metodo_cobicao === undefined ? false : obj_anexo_new_or_edit?.metodo_cobicao,
          metodo_tranplante: obj_anexo_new_or_edit?.metodo_tranplante === undefined ? false : obj_anexo_new_or_edit?.metodo_tranplante,
          metodo_inseminacao: obj_anexo_new_or_edit?.metodo_inseminacao === undefined ? false : obj_anexo_new_or_edit?.metodo_inseminacao,
          n_femeas_macho: obj_anexo_new_or_edit?.n_femeas_macho === undefined ? '' : obj_anexo_new_or_edit?.n_femeas_macho,
          sim: obj_anexo_new_or_edit?.sim === undefined ? false : obj_anexo_new_or_edit?.sim,
          nao: obj_anexo_new_or_edit?.nao === undefined ? false : obj_anexo_new_or_edit?.nao,
          sim_melhor_preco: obj_anexo_new_or_edit?.sim_melhor_preco === undefined ? false : obj_anexo_new_or_edit?.sim_melhor_preco,
          sim_recursos: obj_anexo_new_or_edit?.sim_recursos === undefined ? false : obj_anexo_new_or_edit?.sim_recursos,
          sim_melhorfertilidade: obj_anexo_new_or_edit?.sim_melhorfertilidade === undefined ? false : obj_anexo_new_or_edit?.sim_melhorfertilidade,
          sim_recursos_humanos: obj_anexo_new_or_edit?.sim_recursos_humanos === undefined ? false : obj_anexo_new_or_edit?.sim_recursos_humanos,
          epoca_cobricao: obj_anexo_new_or_edit?.epoca_cobricao === undefined ? '' : obj_anexo_new_or_edit?.epoca_cobricao,
          assistencia_pos_parto_recem_nascido: obj_anexo_new_or_edit?.assistencia_pos_parto_recem_nascido === undefined ? '' : obj_anexo_new_or_edit?.assistencia_pos_parto_recem_nascido,
          assistencia_pos_parto_femea: obj_anexo_new_or_edit?.assistencia_pos_parto_femea === undefined ? '' : obj_anexo_new_or_edit?.assistencia_pos_parto_femea,
          longevidade: obj_anexo_new_or_edit?.longevidade === undefined ? '' : obj_anexo_new_or_edit?.longevidade,
          reinicio_producao: obj_anexo_new_or_edit?.reinicio_producao === undefined ? false : obj_anexo_new_or_edit?.reinicio_producao,
          renovacao_efetivo: obj_anexo_new_or_edit?.renovacao_efetivo === undefined ? false : obj_anexo_new_or_edit?.renovacao_efetivo,
          renovacao_adquiridos: obj_anexo_new_or_edit?.renovacao_adquiridos === undefined ? false : obj_anexo_new_or_edit?.renovacao_adquiridos,
          macho_renovacao_efetivo: obj_anexo_new_or_edit?.macho_renovacao_efetivo === undefined ? false : obj_anexo_new_or_edit?.macho_renovacao_efetivo,
          macho_renovacao_adquiridos: obj_anexo_new_or_edit?.macho_renovacao_adquiridos === undefined ? false : obj_anexo_new_or_edit?.macho_renovacao_adquiridos,
          macho_dade_inicio: obj_anexo_new_or_edit?.macho_dade_inicio === undefined ? 0 : obj_anexo_new_or_edit?.macho_dade_inicio,
          macho_peso_condicao: obj_anexo_new_or_edit?.macho_peso_condicao === undefined ? '' : obj_anexo_new_or_edit?.macho_peso_condicao,
          macho_avaliacao: obj_anexo_new_or_edit?.macho_avaliacao === undefined ? '' : obj_anexo_new_or_edit?.macho_avaliacao,
          obs: obj_anexo_new_or_edit?.obs === undefined ? '' : obj_anexo_new_or_edit?.obs,
          id_rosto: location.state.id_rosto,
          id_cara_pecu: especie_ou_lote_homegenio_selecionada?.id_cara_pecu,
          grupo: especie_ou_lote_homegenio_selecionada?.grupo_homoge,
          last_update: new Date().toISOString(),
          create_date: new Date().toISOString(),
          uuid: "",
        }
      });

      if (res.status === 200) {
        setMessage("Gravado com sucesso!");
        setOpenSnackSuccess(true);
        set_obj_anexo(res.data.result);
        set_obj_anexo_lista((old) => [...old, res.data.result])
        reset_flags()

        set_flag_criar_novo_anexo(false);
      } else {
        setMessage("Erro ao gravar!");
        setOpenSnackError(true);

      }

      setIsLoading(false);
    } catch (error) {
      func_print("handle_create_anexo", error, true);
      setIsLoading(false);
      setMessage("Erro ao gravar!");
      setOpenSnackError(true);

    }
  };

  const handleCloseSnack = () => {

    setOpenSnackSuccess(false);
    setOpenSnackError(false);
  };

  const handle_aoClicarGravar = () => {

    if (flag_editar_Anexo === false) {
      handle_create_anexo()
    } else {
      handle_update_anexo()
    }

  }

  const handle_aoClicarCancelar = () => {

    if (flag_criar_novo_anexo) {
      navigate(-1)
      set_flag_criar_novo_anexo(false)
    } else {
      set_flag_editar_Anexo(false)
      set_flag_criar_novo_anexo(false)


    }
    reset_flags()

  }


  const handle_click_especie_ou_lote_homogenio = (obj: IPage3) => {
    try {
      func_print('obj', obj)

      set_especie_ou_lote_homegenio_selecionada(obj)
      let aux_obj_anexo_de_acordo_com_especie_ou_lote_homegenio_selecionada = obj_anexo_lista?.find((el: IAnexo5) => el.id_cara_pecu === obj.id_cara_pecu)
      func_print('aux_obj_anexo_de_acordo_com_especie_ou_lote_homegenio_selecionada', aux_obj_anexo_de_acordo_com_especie_ou_lote_homegenio_selecionada?.id_cara_pecu)

      set_obj_anexo(aux_obj_anexo_de_acordo_com_especie_ou_lote_homegenio_selecionada)
      if (aux_obj_anexo_de_acordo_com_especie_ou_lote_homegenio_selecionada === undefined) {
        set_flag_criar_novo_anexo(true);
      }else{
        set_flag_criar_novo_anexo(false);

      }
      // await get_anexo()

    } catch (error) {

      func_print('handle_click_especie_ou_lote_homogenio', error, true)

    }

  }

  useEffect(() => {
    (async () => {
      await get_info();
    })();
  }, []);





  return (
    <div className={classes.root}>
      <CadernoLayout title="Anexo 5 - Plano de Reprodução" />
      <main className={classes.contents}>
        <div className={classes.toolbars} />


        {isLoading ? (
          <LoadingVulpes />
        ) : (
          <CustomThemeProvider>
            <Toolbar
              style={{
                paddingTop: 3,
                paddingBottom: 10,
                // background: "#f2d1c2",
                color: "#0000000",
                alignItems: "flex-start",
                fontFamily: "candara",
                fontSize: 18,
                fontWeight: 500,
                display: "flex",
                flexDirection: 'column',
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "space-between",
                width: '100%'

              }}>
                <span>Escolha uma espécie ou lote homogéneo: </span>
              </div>
              <div style={{
                display: "flex",
                flexDirection: 'row',
                minWidth: '100%',
              }}>

                {especie_ou_lote_homegenio_lista.length === 0 ?
                  <div style={{
                    marginTop: 2,
                    minHeight: 70,
                    minWidth: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    paddingTop: '1%',
                    paddingBottom: '1%',
                    // border: `0.5px solid ${cores.cor2}`,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    color: cores.cor2
                  }}>
                    Não existem especies ou lotes homogéneos
                  </div>
                  :

                  especie_ou_lote_homegenio_lista.map((elem, index) => (
                    <div
                      key={index}
                      onClick={() => handle_click_especie_ou_lote_homogenio(elem)}
                      style={{
                        textAlign: 'center',
                        margin: 3,
                        paddingRight: 10,
                        paddingLeft: 10,
                        borderRadius: 12,

                        backgroundColor: elem.id_cara_pecu === especie_ou_lote_homegenio_selecionada?.id_cara_pecu ? "#c94f1e" : "#f2d1c2",
                        color: "white",
                      }}
                    >
                      {elem.grupo_homoge}
                    </div>
                  ))}
              </div>

            </Toolbar>
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
                onClose={handleCloseSnack}
              >
                <Alert
                  onClose={handleCloseSnack}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  {message}
                </Alert>
              </Snackbar>
              <Snackbar
                open={openSnackError}
                autoHideDuration={2000}
                onClose={handleCloseSnack}
              >
                <Alert
                  onClose={handleCloseSnack}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  {message}
                </Alert>
              </Snackbar>

              <table style={{ width: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Box width="100%" height="auto" justifyContent="end">
                        <Stack direction="row" justifyContent="right">
                          {
                            flag_editar_Anexo === false && flag_criar_novo_anexo === false ?
                              <Box
                                sx={{
                                  justifyContent: "end",
                                  display: "flex",
                                }}
                              >
                                <ButtonCadernos
                                  mostrarBotaoEditar

                                  aoClicarEditar={() => {
                                    set_flag_editar_Anexo(true)
                                    set_obj_anexo_new_or_edit(obj_anexo)

                                  }}
                                />
                                <ButtonCadernos

                                  mostrarBotaoApagar
                                  aoClicarApagar={() => (set_open_dialog_tem_a_certeza_que_quer_eliminar(true))}
                                />

                              </Box>
                              : <><ButtonCadernos
                                mostrarBotaoGravar
                                aoClicarGravar={() => { handle_aoClicarGravar() }}


                              />
                                {typeof obj_anexo === 'undefined' ? <></> :
                                  <ButtonCadernos
                                    mostrarBotaoCancelar
                                    aoClicarCancelar={() => { handle_aoClicarCancelar() }}
                                  />
                                }
                              </>
                          }
                        </Stack>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>


                <TableBody>
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      sx={{
                        fontWeight: 600,
                        fontSize: 16,
                        fontFamily: "candara",
                      }}
                    >
                      Maneio Reprodutivo:
                    </TableCell>

                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}>
                          <FormControlLabel
                            name="cruzados_indeterminacao"
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={16}
                              >
                                Cruzados indeterminados
                              </Typography>
                            }
                            aria-readonly
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.cruzados_indeterminacao : obj_anexo?.cruzados_indeterminacao}

                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.cruzados_indeterminacao : obj_anexo?.cruzados_indeterminacao}


                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}
                        >
                          <FormControlLabel
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}

                            name="cruzados_pura"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={16}
                              >
                                Cruzamentos de linha pura
                              </Typography>
                            }
                            aria-readonly
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.cruzados_pura : obj_anexo?.cruzados_pura}
                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.cruzados_pura : obj_anexo?.cruzados_pura}
                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>
                      </Stack>
                    </TableCell>
                    <TableCell colSpan={2} sx={{ minWidth: 190 }} >
                      Raça:

                      {

                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField

                            name="raca"
                            value={obj_anexo_new_or_edit?.raca}
                            onChange={onInputChange}
                          /> :
                          obj_anexo?.raca
                      }

                    </TableCell>
                    <TableCell>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}>

                          <FormControlLabel
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}

                            name="cruzados_industrial"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={16}
                              >
                                Cruzamento industrial
                              </Typography>
                            }
                            aria-readonly
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.cruzados_industrial : obj_anexo?.cruzados_industrial}

                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.cruzados_industrial : obj_anexo?.cruzados_industrial}

                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>

                      </Stack>
                    </TableCell>
                    <TableCell sx={{ minWidth: 190 }}>
                      Raça do pai:
                      {
                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField
                            name="raca_pai"
                            value={obj_anexo_new_or_edit?.raca_pai}
                            onChange={onInputChange}


                          />
                          :
                          obj_anexo?.raca_pai}
                    </TableCell>
                    <TableCell sx={{ minWidth: 190 }}>
                      Raça da mãe:
                      {
                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField
                            name="raca_mae"
                            value={obj_anexo_new_or_edit?.raca_mae}
                            onChange={onInputChange}
                          />
                          :
                          obj_anexo?.raca_mae}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      sx={{
                        fontWeight: 600,
                        fontSize: 16,
                        fontFamily: "candara",
                      }}
                    >
                      Fêmea
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft rowSpan={5} width={200}>
                      1. Critério para estabelecimento de lotes
                      <Typography
                        align="left"
                        variant="subtitle2"
                        fontFamily="candara"
                      >
                        (Ponto 7 da norma técnica ProdI)
                      </Typography>
                    </StyledTableHeadLeft>
                    <StyledTableHeadLeft>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}>

                          <FormControlLabel
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}

                            name="idade"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={16}
                              >
                                Idade
                              </Typography>
                            }
                            aria-readonly
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.idade : obj_anexo?.idade}

                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.idade : obj_anexo?.idade}

                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>

                      </Stack>
                    </StyledTableHeadLeft>
                    <StyledTableHeadLeft rowSpan={3}>
                      2. Método reprodutivo
                      <Typography
                        align="left"
                        variant="subtitle2"
                        fontFamily="candara"
                      >
                        (Ponto 7 da norma técnica ProdI)
                      </Typography>
                    </StyledTableHeadLeft>
                    <StyledTableHeadLeft align="left">
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}>

                          <FormControlLabel
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}

                            name="metodo_cobicao"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={16}
                              >
                                Cobrição
                              </Typography>
                            }
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.metodo_cobicao : obj_anexo?.metodo_cobicao}

                            aria-readonly
                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.metodo_cobicao : obj_anexo?.metodo_cobicao}

                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>

                      </Stack>
                    </StyledTableHeadLeft>
                    <StyledTableHeadLeft rowSpan={5}>
                      4. Época de partos ajustada
                    </StyledTableHeadLeft>
                    <StyledTableHeadLeft rowSpan={4} align="left">
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}
                        >
                          <FormControlLabel
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}

                            name="sim"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={16}
                              >
                                SIM
                              </Typography>
                            }
                            aria-readonly
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.sim : obj_anexo?.sim}

                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.sim : obj_anexo?.sim}


                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>
                      </Stack>
                    </StyledTableHeadLeft>
                    <StyledTableHeadLeft align="left">
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}>

                          <FormControlLabel
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}

                            name="sim_melhor_preco"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={16}
                              >
                                Melhor preço de mercado
                              </Typography>
                            }
                            aria-readonly
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.sim_melhor_preco : obj_anexo?.sim_melhor_preco}

                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.sim_melhor_preco : obj_anexo?.sim_melhor_preco}
                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>

                      </Stack>
                    </StyledTableHeadLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft align="left">
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}>

                          <FormControlLabel
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}

                            name="estado_produtivo"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={16}
                              >
                                Estado reprodutivo
                              </Typography>
                            }
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.estado_produtivo : obj_anexo?.estado_produtivo}

                            aria-readonly
                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.estado_produtivo : obj_anexo?.estado_produtivo}

                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>

                      </Stack>
                    </StyledTableHeadLeft>
                    <StyledTableHeadLeft align="left">
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}>

                          <FormControlLabel
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}

                            name="metodo_tranplante"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={16}
                              >
                                Transplante de embriões
                              </Typography>
                            }
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.metodo_tranplante : obj_anexo?.metodo_tranplante}

                            aria-readonly
                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.metodo_tranplante : obj_anexo?.metodo_tranplante}

                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>

                      </Stack>
                    </StyledTableHeadLeft>
                    <StyledTableHeadLeft align="left">
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}>

                          <FormControlLabel
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}

                            name="sim_recursos"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={16}
                              >
                                Recursos alimentares
                              </Typography>
                            }
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.sim_recursos : obj_anexo?.sim_recursos}

                            aria-readonly
                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.sim_recursos : obj_anexo?.sim_recursos}

                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>

                      </Stack>
                    </StyledTableHeadLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft align="left">
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}>

                          <FormControlLabel
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}

                            name="finalidade_produtiva"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={16}
                              >
                                Finalidade Produtiva
                              </Typography>
                            }
                            aria-readonly
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.finalidade_produtiva : obj_anexo?.finalidade_produtiva}

                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.finalidade_produtiva : obj_anexo?.finalidade_produtiva}

                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>

                      </Stack>
                    </StyledTableHeadLeft>
                    <StyledTableHeadLeft align="left">
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}>

                          <FormControlLabel
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}

                            name="metodo_inseminacao"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={16}
                              >
                                Inseminação artificial
                              </Typography>
                            }
                            aria-readonly
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.metodo_inseminacao : obj_anexo?.metodo_inseminacao}

                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.metodo_inseminacao : obj_anexo?.metodo_inseminacao}

                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>

                      </Stack>
                    </StyledTableHeadLeft>
                    <StyledTableHeadLeft align="left">
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}>

                          <FormControlLabel
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}

                            name="sim_melhorfertilidade"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={16}
                              >
                                Melhor fertilidade
                              </Typography>
                            }
                            aria-readonly
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.sim_melhorfertilidade : obj_anexo?.sim_melhorfertilidade}

                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.sim_melhorfertilidade : obj_anexo?.sim_melhorfertilidade}

                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>

                      </Stack>
                    </StyledTableHeadLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft align="left">
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}>

                          <FormControlLabel
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}

                            name="utilizacao_parcela"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={16}
                              >
                                Utilização de parcelas, instalações
                              </Typography>
                            }
                            aria-readonly
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.utilizacao_parcela : obj_anexo?.utilizacao_parcela}

                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.utilizacao_parcela : obj_anexo?.utilizacao_parcela}

                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>

                      </Stack>
                    </StyledTableHeadLeft>
                    <StyledTableHeadLeft align="left" rowSpan={2}>
                      3. Proporção de cobrição por época
                      <Typography
                        align="left"
                        variant="subtitle2"
                        fontFamily="candara"
                      >
                        (nº de fêmeas por macho reprodutor)
                      </Typography>
                    </StyledTableHeadLeft>
                    <StyledTableCell align="left" rowSpan={2}>
                      <Stack direction="row" justifyContent="center">
                        {
                          flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                            <CustomTextField
                              name="n_femeas_macho"
                              value={obj_anexo_new_or_edit?.n_femeas_macho}
                              onChange={onInputChange}
                            />
                            :
                            obj_anexo?.n_femeas_macho}
                      </Stack>
                    </StyledTableCell>
                    <StyledTableHeadLeft align="left">
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}>

                          <FormControlLabel
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}


                            name="sim_recursos_humanos"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={16}
                              >
                                Recursos humanos
                              </Typography>
                            }
                            aria-readonly
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.sim_recursos_humanos : obj_anexo?.sim_recursos_humanos}

                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.sim_recursos_humanos : obj_anexo?.sim_recursos_humanos}

                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>

                      </Stack>
                    </StyledTableHeadLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft align="left">
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}>

                          <FormControlLabel
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}

                            name="racas"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={16}
                              >
                                Raça
                              </Typography>
                            }
                            aria-readonly
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.racas : obj_anexo?.racas}

                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.racas : obj_anexo?.racas}

                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>

                      </Stack>
                    </StyledTableHeadLeft>
                    <StyledTableHeadLeft align="left" colSpan={2}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}>

                          <FormControlLabel
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}

                            name="nao"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={16}
                              >
                                NÃO
                              </Typography>
                            }
                            aria-readonly
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.nao : obj_anexo?.nao}

                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.nao : obj_anexo?.nao}

                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>

                      </Stack>
                    </StyledTableHeadLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft sx={{ textAlign: "right" }}>
                      5. Época de cobrição / inseminação
                    </StyledTableHeadLeft>
                    <StyledTableCell colSpan={2}>
                      {
                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField
                            name="epoca_cobricao"
                            value={obj_anexo_new_or_edit?.epoca_cobricao}
                            onChange={onInputChange}
                          />
                          :
                          obj_anexo?.epoca_cobricao}
                    </StyledTableCell>
                    <StyledTableHeadLeft sx={{ textAlign: "right" }}>
                      6. Longevidade reproduvida máxima
                    </StyledTableHeadLeft>
                    <StyledTableCell colSpan={2}>
                      {
                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField
                            name="longevidade"
                            value={obj_anexo_new_or_edit?.longevidade}
                            onChange={onInputChange}
                          />
                          :
                          obj_anexo?.longevidade}
                    </StyledTableCell>
                    <StyledTableHeadLeft colSpan={2}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}>

                          <FormControlLabel
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}

                            name="reinicio_producao"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={14}
                                fontWeight={600}
                              >
                                7. Reinicio da reprodução após o parto
                              </Typography>
                            }
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.reinicio_producao : obj_anexo?.reinicio_producao}


                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.reinicio_producao : obj_anexo?.reinicio_producao}

                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>

                      </Stack>

                    </StyledTableHeadLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft
                      rowSpan={2}
                      sx={{ textAlign: "right" }}
                    >
                      8. Assistência pós parições:
                    </StyledTableHeadLeft>
                    <StyledTableHeadLeft sx={{ textAlign: "right" }}>
                      Assistência no puerpério da fêmea
                    </StyledTableHeadLeft>
                    <StyledTableCell align="left" colSpan={3}>
                      {
                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField
                            name="assistencia_pos_parto_recem_nascido"
                            value={obj_anexo_new_or_edit?.assistencia_pos_parto_recem_nascido}
                            onChange={onInputChange}
                          />
                          :
                          obj_anexo?.assistencia_pos_parto_recem_nascido}
                    </StyledTableCell>
                    <StyledTableHeadLeft
                      rowSpan={2}
                      sx={{ textAlign: "right" }}
                    >
                      11. Renovação do efetivo reprodutor
                    </StyledTableHeadLeft>
                    <StyledTableHeadLeft>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}>

                          <FormControlLabel
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.renovacao_efetivo : obj_anexo?.renovacao_efetivo}

                            name="renovacao_efetivo"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={16}
                              >
                                Do efetivo/ provenientes da exploração
                              </Typography>
                            }
                            aria-readonly
                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.renovacao_efetivo : obj_anexo?.renovacao_efetivo}

                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>

                      </Stack>
                    </StyledTableHeadLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft sx={{ textAlign: "right" }}>
                      Assistência no puerpério da fêmea
                    </StyledTableHeadLeft>
                    <StyledTableCell align="left" colSpan={3}>
                      <Stack direction="row" justifyContent="center">
                        {
                          flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                            <CustomTextField
                              name="assistencia_pos_parto_femea"
                              value={obj_anexo_new_or_edit?.assistencia_pos_parto_femea}
                              onChange={onInputChange}
                            />
                            :
                            obj_anexo?.assistencia_pos_parto_femea}
                      </Stack>
                    </StyledTableCell>
                    <StyledTableHeadLeft colSpan={2}>
                      <FormGroup onChange={onInputChange}>

                        <FormControlLabel
                          disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}

                          name="renovacao_adquiridos"
                          label={
                            <Typography
                              fontFamily="candara"
                              fontSize={16}
                            >
                              Adquiridos no exterior da exploração
                            </Typography>
                          }
                          aria-readonly
                          value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.renovacao_adquiridos : obj_anexo?.renovacao_adquiridos}

                          control={
                            <Checkbox
                              defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.renovacao_adquiridos : obj_anexo?.renovacao_adquiridos}

                              sx={{
                                color: "#aaaaaa",
                                "&.Mui-checked": {
                                  color: "#C94F1E",
                                },
                              }}
                            />
                          }
                        />
                      </FormGroup>

                    </StyledTableHeadLeft>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      sx={{
                        fontWeight: "600",
                        fontSize: 16,
                        padding: "10",
                        fontFamily: "candara",
                      }}
                    >
                      Machos Reprodutores
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft rowSpan={2} colSpan={2}>
                      1. Renovação do efetivo reprodutor
                    </StyledTableHeadLeft>
                    <StyledTableHeadLeft align="left" colSpan={5}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}>

                          <FormControlLabel
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}

                            name="macho_renovacao_efetivo"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={16}
                              >
                                Do efetivo/ provenientes da exploração
                              </Typography>
                            }
                            aria-readonly
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.macho_renovacao_efetivo : obj_anexo?.macho_renovacao_efetivo}

                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.macho_renovacao_efetivo : obj_anexo?.macho_renovacao_efetivo}

                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>

                      </Stack>
                    </StyledTableHeadLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft align="left" colSpan={5}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <FormGroup onChange={onInputChange}>

                          <FormControlLabel
                            disabled={flag_editar_Anexo === true || flag_criar_novo_anexo === true ? false : true}

                            name="macho_renovacao_adquiridos"
                            label={
                              <Typography
                                fontFamily="candara"
                                fontSize={16}
                              >
                                Adquiridos no exterior da exploração
                              </Typography>
                            }
                            value={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.macho_renovacao_adquiridos : obj_anexo?.macho_renovacao_adquiridos}

                            aria-readonly
                            control={
                              <Checkbox
                                defaultChecked={flag_criar_novo_anexo === true || flag_editar_Anexo === true ? obj_anexo_new_or_edit?.macho_renovacao_adquiridos : obj_anexo?.macho_renovacao_adquiridos}

                                sx={{
                                  color: "#aaaaaa",
                                  "&.Mui-checked": {
                                    color: "#C94F1E",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>

                      </Stack>
                    </StyledTableHeadLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>
                      2. Idade para o inicio da atividade reprodutiva
                    </StyledTableHeadLeft>
                    <StyledTableCell align="left" colSpan={2}>
                      {
                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField
                            name="macho_dade_inicio"
                            value={Number.isNaN(obj_anexo_new_or_edit?.macho_dade_inicio) || obj_anexo_new_or_edit?.macho_dade_inicio === null ? '' : obj_anexo_new_or_edit?.macho_dade_inicio}
                            onChange={onInputChange}
                          /> :
                          obj_anexo?.macho_dade_inicio}
                    </StyledTableCell>
                    <StyledTableHeadLeft colSpan={2}>
                      3. Peso e condição corporal mínimo no início do
                      ciclo de cobrições
                    </StyledTableHeadLeft>
                    <StyledTableCell align="left" colSpan={2}>
                      {
                        flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                          <CustomTextField
                            name="macho_peso_condicao"
                            value={obj_anexo_new_or_edit?.macho_peso_condicao}
                            onChange={onInputChange}
                          />
                          :
                          obj_anexo?.macho_peso_condicao}
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft colSpan={2}>
                      4. Avaliação da aptidão para a reprodução
                      <Typography
                        variant="subtitle2"
                        fontFamily="candara"
                      >
                        (apenas para animais de linha pura e deve ser
                        resultante da respetiva informação do LG/RZ)
                      </Typography>
                    </StyledTableHeadLeft>
                    <StyledTableCell align="left" colSpan={5}>
                      <Stack direction="row" justifyContent="center">
                        {
                          flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                            <CustomTextField
                              name="macho_avaliacao"
                              value={obj_anexo_new_or_edit?.macho_avaliacao}
                              onChange={onInputChange}
                            />
                            :
                            obj_anexo?.macho_avaliacao}
                      </Stack>
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>
                      Observações
                    </StyledTableHeadLeft>
                    <StyledTableCell align="left" colSpan={6}>
                      <Stack direction="row" justifyContent="center">

                        {
                          flag_criar_novo_anexo === true || flag_editar_Anexo === true ?
                            <CustomTextField
                              name="obs"
                              value={obj_anexo_new_or_edit?.obs}
                              onChange={onInputChange}
                            />
                            :
                            obj_anexo?.obs}
                      </Stack>
                    </StyledTableCell>
                  </TableRow>

                </TableBody>

              </table>
            </TableContainer>
          </CustomThemeProvider>
        )}
        <ConfirmDialog
          open={open_dialog_tem_a_certeza_que_quer_eliminar}
          onClose={() => set_open_dialog_tem_a_certeza_que_quer_eliminar(false)}
          onConfirm={handle_delete_anexo}
          message="Deseja eliminar o registo?"
        />

      </main>
    </div>
  );
}
