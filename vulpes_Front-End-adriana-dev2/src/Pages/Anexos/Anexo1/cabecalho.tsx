import { SetStateAction, useEffect, useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, MenuItem, Select, Snackbar, Toolbar, Typography } from "@mui/material";
import React from "react";
import { CustomTextField, CustomThemeProvider } from "../../../Styles/theme/customThemeprovider";
import { useLocation } from "react-router-dom";
import { del, get, post } from "../../../Services/tokenConfig";
import { func_print } from "../../../Func_genericas/func_print";
import { ICabecalho } from "../../../Interfaces/anexos/anexo1/analise_e_foliar1_1_3";
import { IZonaHomogenea } from "../../../Interfaces/cadernos/zona_homogenea";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { Alert } from "../../../Components/Alert/Alert";
import LoadingVulpesSmall from "../../../Styles/Loader/loadingSmall";
import { cores } from "../../../Func_genericas/valores_estaticos";

interface CabecalhoA1Form_prop {
  set_obj_anexo_cabecalho_selecionado: React.Dispatch<SetStateAction<ICabecalho| undefined>>;
  obj_anexo_cabecalho_selecionado: ICabecalho | undefined;
}

export const CabecalhoA1Form: React.FC<CabecalhoA1Form_prop> = ({
  obj_anexo_cabecalho_selecionado
  , set_obj_anexo_cabecalho_selecionado }) => {

  const location = useLocation();

  const [especie_ou_lote_homegenio_selecionada, set_especie_ou_lote_homegenio_selecionada] = useState<IZonaHomogenea>();
  const [obj_anexo_cabecalho, set_obj_anexo_cabecalho] = useState<ICabecalho>();
  const [obj_anexo_cabecalho_lista, set_obj_anexo_cabecalho_lista] = useState<ICabecalho[]>();
  const [obj_anexo_cabecalho_to_edit, set_obj_anexo_cabecalho_to_edit] = useState<ICabecalho>();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [flag_editar_cabecalho, set_flag_editar_cabecalho] = useState(false)
  const [especie_ou_lote_homegenio_lista, set_especie_ou_lote_homegenio_lista] = useState<IZonaHomogenea[]>([]);
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const [error_idade, set_error_idade] = React.useState(false);
  const [error_producao_esperado, set_error_producao_esperado] = React.useState(false);


  const onInputEditTableChange_cabecalho = (event: any) => {
    const { name, value, type, checked } = event.target;
    let aux_obj_anexo: any = obj_anexo_cabecalho_to_edit === undefined ? {} : obj_anexo_cabecalho_to_edit

    if (type === "checkbox") {
      aux_obj_anexo[name] = aux_obj_anexo[name] === undefined ? true : !aux_obj_anexo[name]
      set_obj_anexo_cabecalho_to_edit(aux_obj_anexo);

    } else {
      if (name === 'idade') {
        if (!/^\d+$/.test(value)) {
          set_error_idade(true)
        } else {
          set_error_idade(false)
        }
      }
      if (name === 'producao_esperado') {
        if (!/^\d+$/.test(value)) {
          set_error_producao_esperado(true)
        } else {
          set_error_producao_esperado(false)
        }
      }
      set_obj_anexo_cabecalho_to_edit((old: any) => ({
        ...old,
        [name]: value,
      }));
    }
  };

  const handleCloseSnack = () => {
    setOpenSnackSuccess(false);
    setOpenSnackError(false);
  };


  const get_info = async () => {
    try {

      let res = await get(
        `/get_caraterizacao_id_rosto/${location.state.id_rosto}`
        // `/get_reg_anexo_um__cabecalho_rosto/${location.state.id_rosto}`
      );
      let res_cabecalho = await get(
        `/get_reg_anexo_um__cabecalho_rosto/${location.state.id_rosto}`
        // `/get_reg_anexo_um_um_cabecalho/${location.state.id_rosto}`
      );
      func_print('res_cabecalho', res_cabecalho)
      if (res.status === 200 && res_cabecalho.status === 200) {
        if (res.data.result.length !== 0) {
          set_especie_ou_lote_homegenio_lista(res.data.result);
          set_especie_ou_lote_homegenio_selecionada(res.data.result[0])
        } else {
          setMessage("Erro a carregar informação!");
          setOpenSnackError(true);
        }

        set_obj_anexo_cabecalho_lista(res_cabecalho.data.result)
        set_obj_anexo_cabecalho_selecionado(res_cabecalho.data.result[0])
      } else {
        setMessage("Erro a carregar informação!");
        setOpenSnackError(true);
      }

      setIsLoading(false);
    } catch (error) {
      func_print("get_info", error, true);
      setMessage("Erro!");

      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  const handle_change_zona_homogenea = (id_zona_homogenea_selecionada: number) => {

    let aux_obj_zona_homogenea_selecionada = especie_ou_lote_homegenio_lista.find((el: IZonaHomogenea) => el.id_cara === id_zona_homogenea_selecionada)

    set_especie_ou_lote_homegenio_selecionada(aux_obj_zona_homogenea_selecionada)


  }

  const handle_criar_cabecalho = async () => {
    if (error_idade || error_producao_esperado) {
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);

    } else {

      try {
        setIsLoading(true);

        let data = await post("new_reg_anexo_um_cabecalho", {
          payload: {

            id_anexo_um_cabecalho: 0,
            zona_homo: especie_ou_lote_homegenio_selecionada?.zona_homogenea === undefined ? '' : especie_ou_lote_homegenio_selecionada?.zona_homogenea,
            n_sequencia: especie_ou_lote_homegenio_selecionada?.parcela_numero === undefined ? 0 : especie_ou_lote_homegenio_selecionada?.parcela_numero,
            n_subparcela: especie_ou_lote_homegenio_selecionada?.sub_parcela === undefined ? 0 : especie_ou_lote_homegenio_selecionada?.sub_parcela,
            area: especie_ou_lote_homegenio_selecionada?.area === undefined ? 0 : especie_ou_lote_homegenio_selecionada?.area,
            cultura: especie_ou_lote_homegenio_selecionada?.cultura === undefined ? '' : especie_ou_lote_homegenio_selecionada?.cultura,
            idade: obj_anexo_cabecalho_to_edit?.idade === undefined ? 0 : obj_anexo_cabecalho_to_edit?.idade,
            producao_esperado: obj_anexo_cabecalho_to_edit?.producao_esperado === undefined ? '' : obj_anexo_cabecalho_to_edit?.producao_esperado,
            insta: obj_anexo_cabecalho_to_edit?.insta === undefined ? false : obj_anexo_cabecalho_to_edit?.insta,
            manutencao: obj_anexo_cabecalho_to_edit?.manutencao === undefined ? false : obj_anexo_cabecalho_to_edit?.manutencao,
            producao: obj_anexo_cabecalho_to_edit?.producao === undefined ? false : obj_anexo_cabecalho_to_edit?.producao,
            id_rosto: location.state.id_rosto,
            last_update: new Date().toISOString(),
            create_date: new Date().toISOString(),
            uuid: ""
          }
        })
        func_print('data', data)
        if (data.status === 200) {
          setMessage("Operação efetuada com sucesso!");
          setOpenSnackSuccess(true);
          set_obj_anexo_cabecalho(data.data.result)
          set_obj_anexo_cabecalho_to_edit(undefined)

        } else {
          setMessage("Erro ao efetuar a sua operação!");
          setOpenSnackError(true);
        }
        setIsLoading(false);

      } catch (error) {
        func_print('handle_criar_cabecalho', error, true)
        setIsLoading(false);

        setMessage("Erro ao efetuar a sua operação!");
        setOpenSnackError(true);
      }
    }

  }
  const handle_editar_cabecalho = async () => {
    if (error_idade || error_producao_esperado) {
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);

    } else {
      try {
        setIsLoading(true);

        let data = await post("update_reg_anexo_um__cabecalho", {
          payload: {
            id_anexo_um_cabecalho: 0,
            zona_homo: especie_ou_lote_homegenio_selecionada?.zona_homogenea === undefined ? '' : especie_ou_lote_homegenio_selecionada?.zona_homogenea,
            n_sequencia: especie_ou_lote_homegenio_selecionada?.parcela_numero === undefined ? 0 : especie_ou_lote_homegenio_selecionada?.parcela_numero,
            n_subparcela: especie_ou_lote_homegenio_selecionada?.sub_parcela === undefined ? 0 : especie_ou_lote_homegenio_selecionada?.sub_parcela,
            area: especie_ou_lote_homegenio_selecionada?.area === undefined ? 0 : especie_ou_lote_homegenio_selecionada?.area,
            cultura: especie_ou_lote_homegenio_selecionada?.cultura === undefined ? '' : especie_ou_lote_homegenio_selecionada?.cultura,
            idade: obj_anexo_cabecalho_to_edit?.idade === undefined ? 0 : obj_anexo_cabecalho_to_edit?.idade,
            producao_esperado: obj_anexo_cabecalho_to_edit?.producao_esperado === undefined ? '' : obj_anexo_cabecalho_to_edit?.producao_esperado,
            insta: obj_anexo_cabecalho_to_edit?.insta === undefined ? false : obj_anexo_cabecalho_to_edit?.insta,
            manutencao: obj_anexo_cabecalho_to_edit?.manutencao === undefined ? false : obj_anexo_cabecalho_to_edit?.manutencao,
            producao: obj_anexo_cabecalho_to_edit?.producao === undefined ? false : obj_anexo_cabecalho_to_edit?.producao,
            id_rosto: location.state.id_rosto,
            last_update: new Date().toISOString(),
            create_date: new Date().toISOString(),
            uuid: ""
          }
        })


        if (data.status === 200) {
          setMessage("Operação efetuada com sucesso!");
          setOpenSnackSuccess(true);
          set_obj_anexo_cabecalho(data.data.result)
          set_obj_anexo_cabecalho_to_edit(undefined)

        } else {
          setMessage("Erro ao efetuar a sua operação!");
          setOpenSnackError(true);
        }
        setIsLoading(false);
      } catch (error) {
        func_print('handle_editar_cabecalho', error, true)
        setIsLoading(false);

        setMessage("Erro ao efetuar a sua operação!");
        setOpenSnackError(true);
      }
    }

  }
  const handle_delete_cabecalho = async () => {
    try {

      setIsLoading(true);
      let data = await del(`delete_anexo_um__cabecalho/${obj_anexo_cabecalho?.id_anexo_um_cabecalho}`)
      if (data.status === 200) {
        setMessage("Eliminado com sucesso!");
        setOpenSnackSuccess(true);
        set_obj_anexo_cabecalho(undefined)
        set_obj_anexo_cabecalho_to_edit(undefined)
      } else {
        setMessage("Erro ao efetuar a sua operação!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {

      func_print('handle_delete_cabecalho', error, true)
      setIsLoading(false);

      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
    }
  }
  const handle_change_cabecalho = (obj: ICabecalho) => {
    set_obj_anexo_cabecalho_selecionado(obj)
  }

  useEffect(() => {
    (async () => {
      await get_info();
    })();
  }, []);

  return (
    <form>
      <CustomThemeProvider>
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
        {isLoading ?
          <LoadingVulpesSmall />
          :
          <Toolbar
            style={{
              paddingTop: 3,
              paddingBottom: 10,
              fontFamily: "candara",
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
              <span>Escolha uma zona homogénea: </span>
            </div>
            <div style={{
              display: "flex",
              flexDirection: 'row',
              minWidth: '100%',
            }}>

              {obj_anexo_cabecalho_lista?.length === 0 ?
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

                obj_anexo_cabecalho_lista?.map((elem, index) => (
                  <div
                    key={index}
                    onClick={() => { handle_change_cabecalho(elem) }}
                    style={{
                      textAlign: 'center',
                      margin: 3,
                      paddingRight: 10,
                      paddingLeft: 10,
                      borderRadius: 12,

                      backgroundColor: elem.id_anexo_um_cabecalho === obj_anexo_cabecalho_selecionado?.id_anexo_um_cabecalho ? "#c94f1e" : "#f2d1c2",
                      color: "white",
                    }}
                  >
                    {elem.zona_homo}
                  </div>
                ))}
            </div>
            <div style={{
              width: '100%',

            }}
            >
              <div style={{
                width: '100%',
                display: "flex",
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',

              }}>
                {obj_anexo_cabecalho === undefined ?
                  <ButtonCadernos

                    mostrarBotaoGravar
                    aoClicarGravar={() => { handle_criar_cabecalho() }}
                  />
                  :
                  flag_editar_cabecalho === true ?
                    <ButtonCadernos
                      mostrarBotaoCancelar
                      aoClicarCancelar={() => set_flag_editar_cabecalho(false)}
                      mostrarBotaoGravar
                      aoClicarGravar={() => { handle_editar_cabecalho() }}
                    /> :
                    <ButtonCadernos
                      mostrarBotaoApagar
                      mostrarBotaoEditar
                      aoClicarApagar={() => { handle_delete_cabecalho() }}
                      aoClicarEditar={() => { set_flag_editar_cabecalho(true) }}
                    />


                }
              </div>
              <div style={{
                display: "flex",
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',

              }}>
                <div style={{
                  display: "flex",
                  flex: 0.25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',

                }}>
                  Zona Homogénea
                  <Select
                    value={especie_ou_lote_homegenio_selecionada?.id_cara === undefined ? '' : especie_ou_lote_homegenio_selecionada?.id_cara }
                    label={''}
                    name={'zona_homogenea'}
                    // defaultValue={especie_ou_lote_homegenio_selecionada?.id_cara === undefined ? 0 : especie_ou_lote_homegenio_selecionada?.id_cara}
                    sx={{
                      fontSize: 14,
                      fontFamily: "verdana",
                      minWidth: 200,
                    }}
                    onChange={(e) => handle_change_zona_homogenea(Number(e.target.value))}
                  >

                    {especie_ou_lote_homegenio_lista.map((item: IZonaHomogenea, key) => {

                      return (
                        <MenuItem key={key} value={item.id_cara}>
                          <Typography
                            style={{
                              fontSize: 14,
                              fontFamily: "candara",
                            }}
                          >
                            {item.zona_homogenea}
                          </Typography>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>

                <div style={{
                  display: "flex",
                  flex: 0.25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',

                }}>
                  Nº Seq. Parcela: {especie_ou_lote_homegenio_selecionada?.parcela_numero}
                </div>
                <div style={{
                  display: "flex",
                  flex: 0.25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',

                }}>
                  Nº Subparcela: {especie_ou_lote_homegenio_selecionada?.sub_parcela}
                </div>
                <div style={{
                  display: "flex",
                  flex: 0.25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',

                }}>
                  Área (ha): {especie_ou_lote_homegenio_selecionada?.area}
                </div>
              </div>
              <div style={{
                display: "flex",
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',

              }}>
                <div style={{
                  display: "flex",
                  flex: 0.33,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',

                }}>
                  Cultura e variedade: {especie_ou_lote_homegenio_selecionada?.cultura}
                </div>
                <div style={{
                  display: "flex",
                  flex: 0.33,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',

                }}>
                  Idade (anos):
                  <CustomTextField
                    name="idade"
                    value={obj_anexo_cabecalho_to_edit?.idade}
                    onChange={onInputEditTableChange_cabecalho}
                    error={error_idade}
                    helperText={error_idade ? 'Apenas números são aceites' : ""}
                  />

                </div>
                <div style={{
                  display: "flex",
                  flex: 0.33,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',

                }}>
                  Produção esperada (kg/ha):

                  <CustomTextField
                    name="producao_esperado"
                    value={obj_anexo_cabecalho_to_edit?.producao_esperado}
                    onChange={onInputEditTableChange_cabecalho}
                    error={error_producao_esperado}
                    helperText={error_producao_esperado ? 'Apenas números são aceites' : ""}
                  />
                </div>

              </div>
              <div style={{
                display: "flex",
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',

              }}>
                <div style={{
                  display: "flex",
                  flex: 0.25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',

                }}>
                  Cultura permanente em fase de:

                </div>

                <div style={{
                  display: "flex",
                  flex: 0.25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',

                }}>
                  <FormGroup onChange={onInputEditTableChange_cabecalho}>
                    <FormControlLabel
                      name="insta"
                      disabled={false}
                      label={
                        <Typography
                          fontFamily="candara"
                          fontSize={16}
                        >
                          Instalação
                        </Typography>
                      }
                      aria-readonly
                      value={obj_anexo_cabecalho_to_edit?.insta}

                      control={
                        <Checkbox
                          defaultChecked={obj_anexo_cabecalho_to_edit?.insta === undefined ? false : true}


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
                </div>
                <div style={{
                  display: "flex",
                  flex: 0.25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',

                }}>
                  <FormGroup onChange={onInputEditTableChange_cabecalho}>
                    <FormControlLabel
                      name="manutencao"
                      disabled={false}
                      label={
                        <Typography
                          fontFamily="candara"
                          fontSize={16}
                        >
                          Manutenção até entrada em produção
                        </Typography>
                      }
                      aria-readonly
                      value={obj_anexo_cabecalho_to_edit?.manutencao}

                      control={
                        <Checkbox
                          defaultChecked={obj_anexo_cabecalho_to_edit?.manutencao === undefined ? false : true}


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
                </div>
                <div style={{
                  display: "flex",
                  flex: 0.25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',

                }}>
                  <FormGroup onChange={onInputEditTableChange_cabecalho}>
                    <FormControlLabel
                      name="producao"
                      disabled={false}
                      label={
                        <Typography
                          fontFamily="candara"
                          fontSize={16}
                        >
                          Em produção
                        </Typography>
                      }
                      aria-readonly
                      value={obj_anexo_cabecalho_to_edit?.producao}

                      control={
                        <Checkbox
                          defaultChecked={obj_anexo_cabecalho_to_edit?.producao === undefined ? false : true}


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
                </div>
              </div>

            </div>
          </Toolbar>

        }

      </CustomThemeProvider>
    </form>
  );
};
