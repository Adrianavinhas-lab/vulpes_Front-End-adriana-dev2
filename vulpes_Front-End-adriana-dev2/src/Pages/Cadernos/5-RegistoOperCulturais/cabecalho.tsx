import React, { ChangeEvent, SetStateAction, useEffect } from "react";
import { useState } from "react";
import { Button, FormControl, FormLabel, Table, TableBody, TextField, Toolbar } from "@mui/material";
import { Box } from "@mui/material";
import { TableRow, Typography } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import { TableContainer } from "@mui/material";
import { Paper, Stack } from "@mui/material";


import { TableHead } from "@material-ui/core";
import { ICabecalho } from "../../../Interfaces/cadernos/caderno5/caderno5";
import { CustomSelect, CustomTextField, CustomThemeProvider } from "../../../Styles/theme/customThemeprovider";
import { StyledTableCellCabecalho } from "../../../Styles/tabelCellStyled/customTableCell";
import BasicPopover from "../../../Components/Popover";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { IZonaHomogenea } from "../../../Interfaces/cadernos/zona_homogenea";
import { get, post } from "../../../Services/tokenConfig";
import { func_print } from "../../../Func_genericas/func_print";
import { useLocation } from "react-router-dom";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";


export interface ICabecalhoFormProps {
  cabecalhos: ICabecalho[];
  setCabecalhos: React.Dispatch<SetStateAction<ICabecalho[]>>;
  obj_Cabecalho: ICabecalho | undefined;
  set_obj_Cabecalho: React.Dispatch<SetStateAction<ICabecalho | undefined>>;
  handleSelectZona: (index: number, id: number) => void;
  zona_homogenea: IZonaHomogenea[];
  setZona_Homogenea: React.Dispatch<SetStateAction<IZonaHomogenea[]>>;
  selectedIndex: number | null;
  setMessage: React.Dispatch<SetStateAction<string>>;
  setOpenSnackError: React.Dispatch<SetStateAction<boolean>>;
  setOpenSnackSuccess: React.Dispatch<SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}

export const CabecalhoOPForm: React.FC<ICabecalhoFormProps> = ({
  cabecalhos,
  setCabecalhos,
  handleSelectZona,
  obj_Cabecalho,
  set_obj_Cabecalho,
  zona_homogenea,
  setZona_Homogenea,
  selectedIndex,
  setMessage,
  setOpenSnackError,
  setOpenSnackSuccess,
  setIsLoading
}) => {
  const location = useLocation();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [createcabecalho, setCreateCabecalho] = useState(false);
  const [editCabecalho, setEditCabecalho] = useState(false);

  const [zonaHomo_lista_for_select, set_zonaHomo_lista_for_select] = useState<any[]>();
  const [obj_zona_homo_escolhido, set_obj_zona_homo_escolhido] = useState<any>();

  const [error_n_plantas, setError_n_plantas] = useState<boolean>(false);
  const [error_esperada, set_error_esperada] = useState<boolean>(false);
  const [error_obtida, set_error_obtida] = useState<boolean>(false);
  const [error_n_contador, set_error_n_contador] = useState<boolean>(false);
  const [error_leitura_contador_preimeira, set_error_leitura_contador_preimeira] = useState<boolean>(false);
  const message_apenas_numero = ("Apenas números são aceites");


  async function getListaZonasHomogeneas() {

    try {
      let res = await get(`/zona_homgenea_caraterizacao/${location.state.id_rosto}`);

      if (res.status === 200) {
        const sortedData = res.data.result.sort((a: any, b: any) => {
          if (a.zona_homo < b.zona_homo) return -1;
          if (a.zona_homo > b.zona_homo) return 1;
          return 0;
        });

        setZona_Homogenea(sortedData);

        let lista_templates_for_select_aux = zonaHomo_lista_for_select !== undefined ? zonaHomo_lista_for_select : [];

        res.data.result.forEach((el: any) => {

          lista_templates_for_select_aux.push({
            value: el.id_cara,
            label: el.zona_homogenea,
            area: el.area
          });
        });

        set_obj_zona_homo_escolhido(lista_templates_for_select_aux[0])

        set_zonaHomo_lista_for_select(lista_templates_for_select_aux);
      }
      setIsLoading(false);

    } catch (error) {
      func_print("getCabecalhoFitossanitaria", error, true);
      setMessage("Erro ao efetuar a sua operação!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      await getListaZonasHomogeneas();
    })();
  }, []);

  let aux_obj_checked: any = obj_Cabecalho === undefined ? {} : obj_Cabecalho

  // Criar
  const onInputChange = (
    event: any
  ) => {
    const { name, value, type } = event.target;


    if (type === "checkbox") {
      aux_obj_checked[name] = aux_obj_checked[name] === undefined ? true : !aux_obj_checked[name]
      // set_obj_Cabecalho(aux_obj_checked);
      set_obj_Cabecalho((prev: any) => ({
        ...prev,
        [name]: aux_obj_checked[name] === undefined ? false : aux_obj_checked[name],
        zona_homo: obj_zona_homo_escolhido.label,
        area: obj_zona_homo_escolhido.area,


        id_regsto_oper_cult_cabecalho: 0,
        compasso: obj_Cabecalho?.compasso === undefined ? "" : obj_Cabecalho.compasso,
        producao_total: obj_Cabecalho?.producao_total === undefined ? "" : obj_Cabecalho.producao_total,
        esperada: obj_Cabecalho?.esperada === undefined ? "" : obj_Cabecalho.esperada,
        obtida: obj_Cabecalho?.obtida === undefined ? "" : obj_Cabecalho.obtida,
        conversao: obj_Cabecalho?.conversao === undefined ? "" : obj_Cabecalho.conversao,
        cultura: obj_Cabecalho?.cultura === undefined ? "" : obj_Cabecalho.cultura,
        porta_enxerto: obj_Cabecalho?.porta_enxerto === undefined ? "" : obj_Cabecalho.porta_enxerto,
        n_plantas: obj_Cabecalho?.n_plantas === undefined ? 0 : obj_Cabecalho.n_plantas,
        date_platacao: obj_Cabecalho?.date_platacao === undefined ? null : obj_Cabecalho.date_platacao,
        metodo_rega: obj_Cabecalho?.metodo_rega === undefined ? "" : obj_Cabecalho.metodo_rega,
        c_e: obj_Cabecalho?.c_e === undefined ? "" : obj_Cabecalho.c_e,
        n_contador: obj_Cabecalho?.n_contador === undefined ? "" : obj_Cabecalho.n_contador,
        leitura_contador_preimeira: obj_Cabecalho?.leitura_contador_preimeira === undefined ? "" : obj_Cabecalho.leitura_contador_preimeira,

        id_rosto: location.state.id_rosto,
        last_update: new Date().toISOString(),
        create_date: new Date().toISOString(),
        uuid: "",
      }));

    } else {

      if (name === "esperada") {
        if (isNaN(Number(value))) {
          set_error_esperada(true);
          return;
        } else {
          set_error_esperada(false);
        }
      }
      if (name === "obtida") {
        if (isNaN(Number(value))) {
          set_error_obtida(true);
          return;
        } else {
          set_error_obtida(false);
        }
      }

      set_obj_Cabecalho((prev: any) => ({
        ...prev,
        [name]: value,
        zona_homo: obj_zona_homo_escolhido.label,
        area: obj_zona_homo_escolhido.area
      }));
    }
  };

  const handleSaveNewCabecalho = async () => {
    if (
      obj_Cabecalho?.area === undefined ||
      obj_Cabecalho.zona_homo === undefined || obj_Cabecalho.zona_homo === ""
    ) {
      console.log(obj_Cabecalho);
      setMessage("Preencha todos os campos obrigatórios!");
      setOpenSnackError(true);
    } else {

      try {
        setIsLoading(true);

        let res = await post("/new_reg_operacoes_culturais_cabecalho", {
          payload: {
            id_regsto_oper_cult_cabecalho: 0,
            zona_homo: obj_Cabecalho?.zona_homo === undefined ? "" : obj_Cabecalho.zona_homo,
            area: obj_Cabecalho?.area === undefined ? 0 : obj_Cabecalho.area,
            compasso: obj_Cabecalho?.compasso === undefined ? "" : obj_Cabecalho.compasso,
            producao_total: obj_Cabecalho?.producao_total === undefined ? "" : obj_Cabecalho.producao_total,
            esperada: obj_Cabecalho?.esperada === undefined ? "" : obj_Cabecalho.esperada,
            obtida: obj_Cabecalho?.obtida === undefined ? "" : obj_Cabecalho.obtida,
            conversao: obj_Cabecalho?.conversao === undefined ? "" : obj_Cabecalho.conversao,
            c_1: obj_Cabecalho?.c_1 === undefined ? false : obj_Cabecalho.c_1,
            c_2: obj_Cabecalho?.c_2 === undefined ? false : obj_Cabecalho.c_2,
            c_3: obj_Cabecalho?.c_3 === undefined ? false : obj_Cabecalho.c_3,
            cultura: obj_Cabecalho?.cultura === undefined ? "" : obj_Cabecalho.cultura,
            porta_enxerto: obj_Cabecalho?.porta_enxerto === undefined ? "" : obj_Cabecalho.porta_enxerto,
            n_plantas: obj_Cabecalho?.n_plantas === undefined ? 0 : obj_Cabecalho.n_plantas,
            date_platacao: obj_Cabecalho?.date_platacao === undefined ? null : obj_Cabecalho.date_platacao,
            metodo_rega: obj_Cabecalho?.metodo_rega === undefined ? "" : obj_Cabecalho.metodo_rega,
            c_e: obj_Cabecalho?.c_e === undefined ? "" : obj_Cabecalho.c_e,
            n_contador: obj_Cabecalho?.n_contador === undefined ? "" : obj_Cabecalho.n_contador,
            leitura_contador_preimeira: obj_Cabecalho?.leitura_contador_preimeira === undefined ? "" : obj_Cabecalho.leitura_contador_preimeira,

            id_rosto: location.state.id_rosto,
            last_update: new Date().toISOString(),
            create_date: new Date().toISOString(),
            uuid: "",
          }
        });


        if (res.status === 200) {
          setMessage("Gravado com sucesso!");
          setOpenSnackSuccess(true);
          setCreateCabecalho(false);
          aux_obj_checked = undefined;

          setCabecalhos((prevRows) => [...prevRows, res.data.result])
        } else {
          setMessage("Erro ao gravar!");
          setOpenSnackError(true);
        }
        setIsLoading(false);
      } catch (error: any) {
        func_print("handleSaveFito", error, true);
        setMessage("Erro ao efetuar a sua operação!");
        setOpenSnackError(true);
        setIsLoading(false);
      }
    }
  };

  // EDITAR
  const handleEdit = (id: number) => {
    setEditingId(id);
    setEditCabecalho(true);
  };

  const onInputChange_editar = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = event.target;
    let newValue: any = type === "checkbox" ? checked : value;

    if (name === "esperada") {
      if (isNaN(Number(value))) {
        set_error_esperada(true);
        return;
      } else {
        set_error_esperada(false);
      }
    }
    if (name === "n_plantas") {
      if (isNaN(Number(value))) {
        setError_n_plantas(true);
        return;
      } else {
        setError_n_plantas(false);
      }
    }
    if (name === "obtida") {
      if (isNaN(Number(value))) {
        set_error_obtida(true);
        return;
      } else {
        set_error_obtida(false);
      }
    }
    if (name === "n_contador") {
      if (isNaN(Number(value))) {
        set_error_n_contador(true);
        return;
      } else {
        set_error_n_contador(false);
      }
    }
    if (name === "leitura_contador_preimeira") {
      if (isNaN(Number(value))) {
        set_error_leitura_contador_preimeira(true);
        return;
      } else {
        set_error_leitura_contador_preimeira(false);
      }
    }

    if (type === "date" && value === "") {
      newValue = null;
    }

    if (selectedIndex !== null) {
      const idCabecalhoToEdit =
        cabecalhos[selectedIndex].id_regsto_oper_cult_cabecalho;
      const updatedCabecalhos = cabecalhos.map((cab) => {
        if (cab.id_regsto_oper_cult_cabecalho === idCabecalhoToEdit) {
          return {
            ...cab,
            [name]: newValue,
          };
        }
        return cab;
      });
      setCabecalhos(updatedCabecalhos);
    }
  };

  const handleUpdateCabecalho = async () => {
    if (selectedIndex !== null) {
      const cabecalhoToUpdate = cabecalhos[selectedIndex];

      if (!cabecalhoToUpdate) {
        setMessage("Cabeçalho não encontrado!");
        setOpenSnackError(true);
        return;
      } else if (cabecalhoToUpdate.cultura === undefined) {
        setMessage("Preencha os campos obrigatórios!");
        setOpenSnackError(true);
      } else {
        try {
          setIsLoading(true);
          let res = await post("update_reg_operacoes_culturais_cabecalho", { payload: cabecalhoToUpdate })

          if (res.status === 200) {
            const updatedRows =
              cabecalhos.map((cab) => {
                if (cab.id_regsto_oper_cult_cabecalho !==
                  cabecalhoToUpdate.id_regsto_oper_cult_cabecalho) {
                  return cab
                } else {
                  return cabecalhoToUpdate
                }
              }
              );
            setCabecalhos(updatedRows);

            setMessage("Cabeçalho atualizado com sucesso!");
            setEditCabecalho(false);
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
    }
  };



  return (
    <form>
      <CustomThemeProvider>
        <Toolbar
          style={{
            background: "#f2d1c2",
            color: "#0000000",
            justifyContent: "center",
            fontFamily: "candara",
            fontSize: 18,
            fontWeight: 500,
            display: "flex",
          }}
        >
          <span>Zonas Homogéneas: </span>
          {cabecalhos.slice().map((zona, index) => (
            <Button
              key={index}
              onClick={() =>
                handleSelectZona(index, zona.id_regsto_oper_cult_cabecalho)
              }
              sx={{
                background: index === selectedIndex ? "#c94f1e" : "transparent",
                color: index === selectedIndex ? "white" : "inherit",
              }}
            >
              {zona.zona_homo}
            </Button>
          ))}
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
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCellCabecalho
                  colSpan={6}
                  sx={{ fontWeight: 700, fontSize: 18, fontFamily: "candara" }}
                >
                  <Stack direction="row" justifyContent="left">
                    5 - Registo de Operações Culturais
                    <Box>
                      <BasicPopover
                        text={"Registo obrigatório para as intervenções Agricultura Biológica e Produção Integrada. \nQuando existir acumulação (quando permitida) com as intervenções: Conservação do Solo - Sementeira Direta, Conservação do Solo - Enrelvamento, Uso Eficiente da Água, Apoio Zonal Peneda-Gerês - manutenção de socalcos, Apoio Zonal Montesinho-Nogueira - manutenção de rotação de sequeiro cereal-pousio, Apoio Zonal Douro Internacional, Sabor, Maçãs e Vale do Côa - manutenção de rotação de sequeiro cereal-pousio, Apoio Zonal Castro Verde, Vale do Guadiana, Piçarras e Cuba - manutenção de rotação de sequeiro cereal-pousio-pastagens temporárias naturais e Apoio Zonal Alto e Centro Alentejo - manutenção de rotação de sequeiro cereal-pousio-pastagens temporárias naturais, o preenchimento do registo 5 dispensa o preenchimento do registo 5A e 5B.\n\nPretende-se que se registe todo o tipo de intervenção efetuado ao nível da parcela agrícola ou zona homogénea e por cultura, como por exemplo a aplicação de fertilizantes com base no plano de fertilização, a utilização de cultivares resistentes e ou material de propagação vegetativa categoria normalizada ou certificada, controlo de infestantes, como a monda manual, mobilização do solo, limpeza e preparação do terreno. Incluir também podas sanitárias, destruição e queima da lenha, desinfeção de utiensilios, entre outros."} />
                    </Box>
                  </Stack>
                </StyledTableCellCabecalho>
                {createcabecalho === false && editCabecalho === false && <StyledTableCellCabecalho  >
                  <Stack direction="row" sx={{ justifyContent: "end" }}>
                    <BarraDeFerramentas
                      mostrarBotaoNovo
                      textoBotaoNovo="Nova zona homogénea"
                      aoClicarNovo={() => setCreateCabecalho(true)} />
                  </Stack>
                </StyledTableCellCabecalho>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {createcabecalho &&
                <>
                  <TableRow>
                    {createcabecalho === true &&
                      <StyledTableCellCabecalho >
                        <ButtonCadernos
                          mostrarBotaoGravar
                          aoClicarGravar={() => handleSaveNewCabecalho()}
                          mostrarBotaoCancelar
                          aoClicarCancelar={() => setCreateCabecalho(false)} />
                      </StyledTableCellCabecalho>
                    }
                  </TableRow>
                  <TableRow>
                    <StyledTableCellCabecalho>
                      Zona Homogénea:
                    </StyledTableCellCabecalho>
                    <StyledTableCellCabecalho>
                      {zonaHomo_lista_for_select !== undefined ? (
                        <FormControl sx={{ paddingBottom: 5 }}>
                          <FormLabel
                            sx={{
                              fontFamily: "candara",
                              "&.Mui-focused": {
                                color: "#c94f1e",
                              },
                              paddingBottom: 3,
                              width: 400,
                            }}
                          >
                          </FormLabel>
                          <CustomSelect
                            value={obj_zona_homo_escolhido.value}
                            name="zona_homo"
                            onChange={(e: any) => {

                              let obj_aux = zonaHomo_lista_for_select.find((el: any) => {
                                return el.value === e.target.value;
                              });
                              set_obj_zona_homo_escolhido(obj_aux);
                            }}
                            options={zonaHomo_lista_for_select}
                            label="Selecione a zona homogénea"
                            flag_list_map_obj={true}
                          />
                        </FormControl>
                      ) : (
                        <></>
                      )}
                    </StyledTableCellCabecalho>
                    <StyledTableCellCabecalho colSpan={2}
                      sx={{
                        wordSpacing: 6,
                        paddingY: 2,

                      }}
                    >
                      <Stack direction="row" display="flex" alignItems="center" justifyContent="center">
                        Conversão:
                        <FormControlLabel
                          name="c_1"
                          label={<Typography fontFamily="candara" fontSize={18}>
                            C1
                          </Typography>}
                          control={<Checkbox
                            checked={obj_Cabecalho?.c_1}
                            value={obj_Cabecalho?.c_1 === true && obj_Cabecalho.c_1}
                            onChange={onInputChange}
                            sx={{
                              color: "#aaaaaa",
                              "&.Mui-checked": {
                                color: "#C94F1E",
                              },
                            }} />} />
                        <FormControlLabel
                          name="c_2"
                          label={<Typography fontFamily="candara" fontSize={18}>
                            C2
                          </Typography>}
                          control={<Checkbox
                            checked={obj_Cabecalho?.c_2}
                            value={obj_Cabecalho?.c_2 === undefined ? false : obj_Cabecalho.c_2}
                            onChange={onInputChange}
                            sx={{
                              color: "#aaaaaa",
                              "&.Mui-checked": {
                                color: "#C94F1E",
                              },
                            }} />} />
                        <FormControlLabel
                          name="c_3"
                          label={<Typography fontFamily="candara" fontSize={18}>
                            C3
                          </Typography>}
                          control={<Checkbox
                            checked={obj_Cabecalho?.c_3}
                            value={obj_Cabecalho?.c_3 === undefined ? false : obj_Cabecalho.c_3}
                            onChange={onInputChange}
                            sx={{
                              color: "#aaaaaa",
                              "&.Mui-checked": {
                                color: "#C94F1E",
                              },
                            }} />} />
                      </Stack>
                    </StyledTableCellCabecalho>
                    <StyledTableCellCabecalho colSpan={2}>
                      <Stack direction="row" alignItems="center">
                        Área (ha):
                        <CustomTextField
                          name="area"
                          value={obj_zona_homo_escolhido.area}
                          onChange={onInputChange}
                          disabled />
                      </Stack>
                    </StyledTableCellCabecalho>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellCabecalho colSpan={6}>
                      <Stack direction="row" alignItems="center">
                        Cultura e variedade:
                        <CustomTextField
                          name="cultura"
                          value={obj_Cabecalho?.cultura === undefined ? "" : obj_Cabecalho.cultura}
                          onChange={onInputChange} />
                      </Stack>
                    </StyledTableCellCabecalho>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellCabecalho>
                      <Stack direction="row" alignItems="center">
                        Compasso:
                        <CustomTextField
                          name="compasso"
                          value={obj_Cabecalho?.compasso === undefined ? "" : obj_Cabecalho.compasso}
                          onChange={onInputChange} />
                      </Stack>
                    </StyledTableCellCabecalho>
                    <StyledTableCellCabecalho>
                      <Stack direction="row" alignItems="center">
                        porta-enxerto:
                        <CustomTextField
                          name="porta_enxerto"
                          value={obj_Cabecalho?.porta_enxerto === undefined ? "" : obj_Cabecalho.porta_enxerto}
                          onChange={onInputChange} />
                      </Stack>
                    </StyledTableCellCabecalho>
                    <StyledTableCellCabecalho>
                      <Stack direction="row" alignItems="center">
                        Nº de plantas:
                        <CustomTextField
                          name="n_plantas"
                          value={obj_Cabecalho?.n_plantas === undefined ? "" : obj_Cabecalho.n_plantas}
                          onChange={onInputChange}
                          error={error_n_plantas}
                          helperText={error_n_plantas ? message_apenas_numero : ""} />
                      </Stack>
                    </StyledTableCellCabecalho>
                    <StyledTableCellCabecalho>
                      <Stack direction="row" alignItems="center">
                        Data de plantação:
                        <TextField
                          variant="filled"
                          name="date_platacao"
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
                          value={obj_Cabecalho?.date_platacao === undefined ? "" : obj_Cabecalho.date_platacao}
                          onChange={onInputChange} />
                      </Stack>
                    </StyledTableCellCabecalho>
                    <StyledTableCellCabecalho>
                      <Stack direction="row" alignItems="center">
                        Método de rega:
                        <CustomTextField
                          name="metodo_rega"
                          value={obj_Cabecalho?.metodo_rega === undefined ? "" : obj_Cabecalho.metodo_rega}
                          onChange={onInputChange} />
                      </Stack>
                    </StyledTableCellCabecalho>
                    <StyledTableCellCabecalho>
                      <Stack direction="row" alignItems="center">
                        C.E.(dS/m):
                        <CustomTextField
                          name="c_e"
                          value={obj_Cabecalho?.c_e === undefined ? "" : obj_Cabecalho.c_e}
                          onChange={onInputChange} />
                      </Stack>
                    </StyledTableCellCabecalho>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellCabecalho>
                      <Stack direction="row" alignItems="center">
                        Produção Total:
                      </Stack>
                    </StyledTableCellCabecalho>
                    <StyledTableCellCabecalho>
                      <Stack direction="row" alignItems="center">
                        Esperada:
                        <CustomTextField
                          name="esperada"
                          value={obj_Cabecalho?.esperada === undefined ? "" : obj_Cabecalho.esperada}
                          onChange={onInputChange}
                          error={error_esperada}
                          helperText={error_esperada ? message_apenas_numero : ""} />
                        Unidades / Ton/ha
                      </Stack>
                    </StyledTableCellCabecalho>
                    <StyledTableCellCabecalho>
                      <Stack direction="row" alignItems="center">
                        Obtida:
                        <CustomTextField
                          name="obtida"
                          value={obj_Cabecalho?.obtida === undefined ? "" : obj_Cabecalho.obtida}
                          onChange={onInputChange}
                          error={error_obtida}
                          helperText={error_obtida ? message_apenas_numero : ""} />
                        Unidades / Ton/ha
                      </Stack>
                    </StyledTableCellCabecalho>
                    <StyledTableCellCabecalho>
                      <Stack direction="row" alignItems="center">
                        Nº do Contador:
                        <CustomTextField
                          name="n_contador"
                          value={obj_Cabecalho?.n_contador === undefined ? "" : obj_Cabecalho.n_contador}
                          onChange={onInputChange}
                          error={error_n_contador}
                          helperText={error_n_contador ? message_apenas_numero : ""} />
                      </Stack>
                    </StyledTableCellCabecalho>
                    <StyledTableCellCabecalho colSpan={2}>
                      <Stack direction="row" alignItems="center">
                        Leitura do contador antes da 1ª rega(m3):
                        <CustomTextField
                          name="leitura_contador_preimeira"
                          value={obj_Cabecalho?.leitura_contador_preimeira === undefined ? "" : obj_Cabecalho.leitura_contador_preimeira}
                          onChange={onInputChange}
                          error={error_leitura_contador_preimeira}
                          helperText={error_leitura_contador_preimeira ? message_apenas_numero : ""} />
                      </Stack>
                    </StyledTableCellCabecalho>
                  </TableRow>
                </>
              }
            </TableBody>

            {cabecalhos.map((cab, j) => {
              if (j === selectedIndex)
                return (
                  <React.Fragment key={j}>
                    <TableHead>
                      <TableRow>
                        {editingId === cab.id_regsto_oper_cult_cabecalho && editCabecalho ?
                          <StyledTableCellCabecalho colSpan={6} >
                            <Stack direction="row" sx={{ justifyContent: "end" }}>
                              <ButtonCadernos
                                mostrarBotaoGravar
                                aoClicarGravar={() => handleUpdateCabecalho()}
                                mostrarBotaoCancelar
                                aoClicarCancelar={() => setEditCabecalho(false)} />
                            </Stack>
                          </StyledTableCellCabecalho>
                          :
                          createcabecalho === false &&
                          <StyledTableCellCabecalho colSpan={6}>
                            <Stack direction="row" sx={{ justifyContent: "end" }}>
                              <ButtonCadernos
                                mostrarBotaoEditar
                                aoClicarEditar={() => handleEdit(
                                  cab.id_regsto_oper_cult_cabecalho
                                )} />
                            </Stack>
                          </StyledTableCellCabecalho>
                        }
                      </TableRow>
                    </TableHead>

                    <TableBody >

                      {editingId === cab.id_regsto_oper_cult_cabecalho &&
                        editCabecalho &&
                        selectedIndex !== null ? (
                        <>
                          <TableRow>
                            <StyledTableCellCabecalho>
                              Zona Homogénea:
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <CustomTextField
                                name="zona_homo"
                                value={cab.zona_homo}
                                // onChange={onInputChange_editar}
                                disabled />
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho colSpan={2}
                              sx={{
                                wordSpacing: 6,
                                paddingY: 2,

                              }}
                            >
                              <Stack direction="row" display="flex" alignItems="center" justifyContent="center">
                                Conversão:
                                <FormControlLabel
                                  name="c_1"
                                  label={<Typography fontFamily="candara" fontSize={18}>
                                    C1
                                  </Typography>}
                                  control={<Checkbox
                                    checked={cab.c_1}
                                    value={cab.c_1}
                                    onChange={onInputChange_editar}
                                    sx={{
                                      color: "#aaaaaa",
                                      "&.Mui-checked": {
                                        color: "#C94F1E",
                                      },
                                    }} />} />
                                <FormControlLabel
                                  name="c_2"
                                  label={<Typography fontFamily="candara" fontSize={18}>
                                    C2
                                  </Typography>}
                                  control={<Checkbox
                                    checked={cab.c_2}
                                    value={cab.c_2 === true && cab.c_2}
                                    onChange={onInputChange_editar}
                                    sx={{
                                      color: "#aaaaaa",
                                      "&.Mui-checked": {
                                        color: "#C94F1E",
                                      },
                                    }} />} />
                                <FormControlLabel
                                  name="c_3"
                                  label={<Typography fontFamily="candara" fontSize={18}>
                                    C3
                                  </Typography>}
                                  control={<Checkbox
                                    checked={cab.c_3}
                                    value={cab.c_3}
                                    onChange={onInputChange_editar}
                                    sx={{
                                      color: "#aaaaaa",
                                      "&.Mui-checked": {
                                        color: "#C94F1E",
                                      },
                                    }} />} />
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho colSpan={2}>
                              <Stack direction="row" alignItems="center">
                                Área:
                                <CustomTextField
                                  name="area"
                                  value={cab.area !== undefined && cab.area}
                                  // onChange={onInputChange_editar}
                                  // error={error_area}
                                  // helperText={error_area ? message_apenas_numero : ""}
                                  disabled />
                              </Stack>
                            </StyledTableCellCabecalho>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellCabecalho colSpan={6}>
                              <Stack direction="row" alignItems="center">
                                Cultura e variedade:
                                <CustomTextField
                                  name="cultura"
                                  value={cab.cultura !== null && cab.cultura}
                                  onChange={onInputChange_editar} />
                              </Stack>
                            </StyledTableCellCabecalho>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellCabecalho>
                              <Stack direction="row" alignItems="center">
                                Compasso:
                                <CustomTextField
                                  name="compasso"
                                  value={cab.compasso}
                                  onChange={onInputChange_editar} />
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row" alignItems="center">
                                porta-enxerto:
                                <CustomTextField
                                  name="porta_enxerto"
                                  value={cab.porta_enxerto}
                                  onChange={onInputChange_editar} />
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row" alignItems="center">
                                Nº de plantas:
                                <CustomTextField
                                  name="n_plantas"
                                  value={cab.n_plantas}
                                  onChange={onInputChange_editar}
                                  error={error_n_plantas}
                                  helperText={error_n_plantas ? message_apenas_numero : ""} />
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row" alignItems="center">
                                Data de plantação:
                                <TextField
                                  variant="filled"
                                  name="date_platacao"
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
                                  value={cab.date_platacao ? cab.date_platacao : ""}
                                  onChange={onInputChange_editar} />
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row" alignItems="center">
                                Método de rega:
                                <CustomTextField
                                  name="metodo_rega"
                                  value={cab.metodo_rega}
                                  onChange={onInputChange_editar} />
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row" alignItems="center">
                                C.E.(dS/m):
                                <CustomTextField
                                  name="c_e"
                                  value={cab.c_e}
                                  onChange={onInputChange_editar} />
                              </Stack>
                            </StyledTableCellCabecalho>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellCabecalho>
                              <Stack direction="row" alignItems="center">
                                Produção Total:
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row" alignItems="center">
                                Esperada:
                                <CustomTextField
                                  name="esperada"
                                  value={cab.esperada}
                                  onChange={onInputChange_editar}
                                  error={error_esperada}
                                  helperText={error_esperada ? message_apenas_numero : ""} />
                                Unidades / Ton/ha
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row" alignItems="center">
                                Obtida:
                                <CustomTextField
                                  name="obtida"
                                  value={cab.obtida}
                                  onChange={onInputChange_editar}
                                  error={error_obtida}
                                  helperText={error_obtida ? message_apenas_numero : ""} />
                                Unidades / Ton/ha
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row" alignItems="center">
                                Nº do Contador:
                                <CustomTextField
                                  name="n_contador"
                                  value={cab.n_contador}
                                  onChange={onInputChange_editar}
                                  error={error_n_contador}
                                  helperText={error_n_contador ? message_apenas_numero : ""} />
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho colSpan={2}>
                              <Stack direction="row" alignItems="center">
                                Leitura do contador antes da 1ª rega(m3):
                                <CustomTextField
                                  name="leitura_contador_preimeira"
                                  value={cab.leitura_contador_preimeira}
                                  onChange={onInputChange_editar}
                                  error={error_leitura_contador_preimeira}
                                  helperText={error_leitura_contador_preimeira ? message_apenas_numero : ""} />
                              </Stack>
                            </StyledTableCellCabecalho>
                          </TableRow>
                        </>
                      ) : (
                        <>
                          <TableRow>
                            <StyledTableCellCabecalho>
                              <Stack direction="row">
                                Zona Homogénea:
                                <Typography style={{ fontSize: 14, paddingLeft: 10, }}>
                                  {cab.zona_homo}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho
                              colSpan={3}
                              sx={{ wordSpacing: 6, paddingY: 2, textAlign: "center", }}
                            >
                              Conversão:
                              <BasicPopover
                                text={"Exploração em conversão para Produção Biológica (PB), assinalar:\nC1 - Primeiro ano de conversão para PB;\nC2 - Segundo ano de conversão para PB;\nC3 - Terceiro ano de conversão para PB."} />
                              <FormControlLabel
                                sx={{ paddingLeft: 8 }}
                                label={<Typography fontFamily="candara" fontSize={18}>
                                  C1
                                </Typography>}
                                aria-readonly
                                control={<Checkbox
                                  checked={cab.c_1 === true && cab.c_1}
                                  sx={{
                                    color: "#aaaaaa",
                                    "&.Mui-checked": {
                                      color: "#C94F1E",
                                    },
                                  }} />} />
                              <FormControlLabel
                                label={<Typography fontFamily="candara" fontSize={18}>
                                  C2
                                </Typography>}
                                aria-readonly
                                control={<Checkbox
                                  checked={cab.c_2 === true && cab.c_2}
                                  sx={{
                                    color: "#aaaaaa",
                                    "&.Mui-checked": {
                                      color: "#C94F1E",
                                    },
                                  }} />} />
                              <FormControlLabel
                                label={<Typography fontFamily="candara" fontSize={18}>
                                  C3
                                </Typography>}
                                aria-readonly
                                control={<Checkbox
                                  checked={cab.c_3 === true && cab.c_3}
                                  sx={{
                                    color: "#aaaaaa",
                                    "&.Mui-checked": {
                                      color: "#C94F1E",
                                    },
                                  }} />} />
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho colSpan={2}>
                              <Stack direction="row">
                                Área:
                                <Typography
                                  style={{
                                    fontFamily: "verdana",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 14,
                                  }}
                                >
                                  {cab.area}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellCabecalho colSpan={6}>
                              <Stack direction="row">
                                Cultura e variedade:
                                <Typography
                                  style={{
                                    fontFamily: "verdana",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 14,
                                    alignContent: "center",
                                  }}
                                >
                                  {cab.cultura}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellCabecalho>
                              <Stack direction="row">
                                Compasso:
                                <Box margin={-1} padding={0}>
                                  <BasicPopover text="Preencher apenas para cultura permanente" />
                                </Box>
                                <Typography
                                  style={{
                                    fontFamily: "verdana",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 14,
                                    alignContent: "center",
                                  }}
                                >
                                  {cab.compasso}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row">
                                Porta-enxerto:
                                <Box margin={-1} padding={0}>
                                  <BasicPopover text="Preencher apenas para cultura permanente" />
                                </Box>
                                <Typography
                                  style={{
                                    fontFamily: "verdana",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 14,
                                    alignContent: "center",
                                  }}
                                >
                                  {cab.porta_enxerto}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row">
                                Nº de plantas:
                                <Typography
                                  style={{
                                    fontFamily: "verdana",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 14,
                                    alignContent: "center",
                                  }}
                                >
                                  {cab.n_plantas}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row">
                                Data de plantação:
                                <Box margin={-1} padding={0}>
                                  <BasicPopover text="Preencher apenas para cultura permanente" />
                                </Box>
                                <Typography
                                  style={{
                                    fontFamily: "verdana",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 14,
                                    alignContent: "center",
                                  }}
                                >
                                  {cab.date_platacao}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row">
                                Método de rega:
                                <Typography
                                  style={{
                                    fontFamily: "verdana",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 14,
                                    alignContent: "center",
                                  }}
                                >
                                  {cab.metodo_rega}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row">
                                C.E.(dS/m):
                                <Box margin={-1} padding={0}>
                                  <BasicPopover
                                    text={" Condutividade elétrica (ds/m) determinada através das análise à água de rega. \n Preenchimento obrigatório apenas para os beneficiários de PRODI"} />
                                </Box>
                                <Typography
                                  style={{
                                    fontFamily: "verdana",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 14,
                                    alignContent: "center",
                                  }}
                                >
                                  {cab.c_e}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>
                          </TableRow>
                          <TableRow>
                            <StyledTableCellCabecalho>
                              Produção Total:
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row">
                                Esperada:
                                <Typography
                                  style={{
                                    fontFamily: "verdana",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 14,
                                    alignContent: "center",
                                  }}
                                >
                                  {cab.esperada}
                                </Typography>
                                Unidades / Ton/ha
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row">
                                Obtida:
                                <Typography
                                  style={{
                                    fontFamily: "verdana",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 14,
                                    alignContent: "center",
                                  }}
                                >
                                  {cab.obtida}
                                </Typography>
                                Unidades / Ton/ha
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho>
                              <Stack direction="row">
                                Nº do Contador:
                                <Box margin={-1} padding={0}>
                                  <BasicPopover
                                    text={"Preenchimento obrigatório apenas para os beneficiários de PRODI quando não existe acumulação\n com a intervenção «Uso Eficiente da Água» e utilizam sistemas de rega sob pressão."} />
                                </Box>
                                <Typography
                                  style={{
                                    fontFamily: "verdana",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 14,
                                    alignContent: "center",
                                  }}
                                >
                                  {cab.n_contador}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>
                            <StyledTableCellCabecalho colSpan={2}>
                              <Stack direction="row">
                                Leitura do contador antes da 1ª rega(m3):
                                <Box margin={-1} padding={0}>
                                  <BasicPopover
                                    text={"Preenchimento obrigatório apenas para os beneficiários de PRODI quando não existe acumulação \n com a intervenção «Uso Eficiente da Água» e utilizam sistemas de rega sob pressão."} />
                                </Box>
                                <Typography
                                  style={{
                                    fontFamily: "verdana",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    fontSize: 14,
                                    alignContent: "center",
                                  }}
                                >
                                  {cab.leitura_contador_preimeira}
                                </Typography>
                              </Stack>
                            </StyledTableCellCabecalho>
                          </TableRow>
                        </>
                      )}
                    </TableBody>
                  </React.Fragment>
                );
              return null;
            })}

          </Table>
        </TableContainer>
      </CustomThemeProvider>
    </form>
  );
};
