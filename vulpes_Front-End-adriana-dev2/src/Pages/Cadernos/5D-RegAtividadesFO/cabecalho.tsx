import React, { SetStateAction, useEffect } from "react";
import { ChangeEvent, useState } from "react";

import { Box, Button, FormControl, FormLabel, Table, TableBody, TableCell, TableRow, TextField, Toolbar, Typography, } from "@mui/material";
import { TableContainer } from "@mui/material";
import { Paper, Stack } from "@mui/material";
import { styled } from "@mui/material";

import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";

import BasicPopover from "../../../Components/Popover";
import { CustomSelect, CustomTextField, CustomThemeProvider, } from "../../../Styles/theme/customThemeprovider";
import { ICabecalho5D } from "../../../Interfaces/cadernos/caderno5/interfaces5D";
import { func_print } from "../../../Func_genericas/func_print";
import { IZonaHomogenea } from "../../../Interfaces/cadernos/zona_homogenea";
import { get, post } from "../../../Services/tokenConfig";
import { useLocation } from "react-router-dom";
import { TableHead } from "@material-ui/core";
import { StyledTableCellCabecalho } from "../../../Styles/tabelCellStyled/customTableCell";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  padding: theme.spacing(1, 1),
  fontSize: 14,
  height: "40px",
  fontFamily: "candara",
  textAlign: "left",
  fontWeight: 600,
}));

export interface ICabecalho5CFormProps {
  cabecalhos: ICabecalho5D[];
  obj_Cabecalho: ICabecalho5D | undefined;
  set_obj_Cabecalho: React.Dispatch<SetStateAction<ICabecalho5D | undefined>>;
  setCabecalhos: React.Dispatch<SetStateAction<ICabecalho5D[]>>;
  setZona_Homogenea: React.Dispatch<SetStateAction<IZonaHomogenea[]>>;
  handleSelectZona: (index: number, id: number) => void;
  selectedIndex: number | null;
  setMessage: React.Dispatch<SetStateAction<string>>;
  setOpenSnackError: React.Dispatch<SetStateAction<boolean>>;
  setOpenSnackSuccess: React.Dispatch<SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}

export const CabecalhoForm: React.FC<ICabecalho5CFormProps> = ({
  cabecalhos,
  obj_Cabecalho,
  set_obj_Cabecalho,
  setCabecalhos,
  setZona_Homogenea,
  handleSelectZona,
  selectedIndex,
  setMessage,
  setIsLoading,
  setOpenSnackError,
  setOpenSnackSuccess

}) => {
  const location = useLocation();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [createcabecalho, setCreateCabecalho] = useState(false);
  const [editCabecalho, setEditCabecalho] = useState(false);

  const [zonaHomo_lista_for_select, set_zonaHomo_lista_for_select] = useState<any[]>();
  const [obj_zona_homo_escolhido, set_obj_zona_homo_escolhido] = useState<any>();

  const [error_area, set_error_area] = useState<boolean>(false);
  const [error_esperada, set_error_esperada] = useState<boolean>(false);
  const [error_obtida, set_error_obtida] = useState<boolean>(false);
  const [error_n_sequencia, set_error_n_sequencia] = useState<boolean>(false);
  const [error_n_subparcela, set_error_n_subparcela] = useState<boolean>(false);
  const [error_n_planta, set_error_n_planta] = useState<boolean>(false);
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
            area: el.area,
            n_sequencia: el.parcela_numero,
            n_subparcela: el.sub_parcela
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

  // Criar
  const onInputChange = (
    event: any
  ) => {
    const { name, value } = event.target;

    if (name === "area") {
      if (isNaN(Number(value))) {
        set_error_area(true);
        return;
      } else {
        set_error_area(false);
      }
    }
    if (name === "n_sequencia") {
      if (isNaN(Number(value))) {
        set_error_n_sequencia(true);
        return;
      } else {
        set_error_n_sequencia(false);
      }
    }
    if (name === "n_subparcela") {
      if (isNaN(Number(value))) {
        set_error_n_subparcela(true);
        return;
      } else {
        set_error_n_subparcela(false);
      }
    }
    if (name === "produca_total") {
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
    if (name === "n_planta") {
      if (isNaN(Number(value))) {
        set_error_n_planta(true);
        return;
      } else {
        set_error_n_planta(false);
      }
    }


    set_obj_Cabecalho((prev: any) => ({
      ...prev,
      [name]: value,
      zona_homo: obj_zona_homo_escolhido.label,
      area: obj_zona_homo_escolhido.area,
      n_sequencia: obj_zona_homo_escolhido.parcela_numero,
      n_subparcela: obj_zona_homo_escolhido.sub_parcela
    }));
  };

  const handleSaveNewCabecalho = async () => {
    if (
      obj_Cabecalho === undefined ||
      obj_Cabecalho.cultura === undefined || obj_Cabecalho.cultura === ""
    ) {
      setMessage("Preencha todos os campos obrigatórios!");
      setOpenSnackError(true);
    } else {

      try {
        setIsLoading(true);

        let res = await post("/new_reg_act_fertil_azotada_cabecalho", {
          payload: {
            id_act_feertil_azotada: 0,
            zona_homo: obj_Cabecalho.zona_homo === undefined ? "" : obj_Cabecalho.zona_homo,
            area: obj_Cabecalho.area === undefined ? "" : obj_Cabecalho.area,
            cultura: obj_Cabecalho.cultura === undefined ? "" : obj_Cabecalho.cultura,
            compasso: obj_Cabecalho.compasso === undefined ? "" : obj_Cabecalho.compasso,
            produca_total: obj_Cabecalho.produca_total === undefined ? "" : obj_Cabecalho.produca_total,
            obtidas: obj_Cabecalho.obtida === undefined ? "" : obj_Cabecalho.obtida,
            n_sequencia: obj_Cabecalho.n_sequencia === undefined ? "" : obj_Cabecalho.n_sequencia,
            n_subparcela: obj_Cabecalho.n_subparcela === undefined ? "" : obj_Cabecalho.n_subparcela,
            metodo_rega: obj_Cabecalho.metodo_rega === undefined ? "" : obj_Cabecalho.metodo_rega,
            porta_enxerto: obj_Cabecalho.porta_enxerto === undefined ? "" : obj_Cabecalho.porta_enxerto,
            n_planta: obj_Cabecalho.n_planta === undefined ? "" : obj_Cabecalho.n_planta,
            data_plantacao: obj_Cabecalho.data_plantacao === undefined ? null : obj_Cabecalho.data_plantacao,

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
    if (name === "n_sequencia") {
      if (isNaN(Number(value))) {
        set_error_n_sequencia(true);
        return;
      } else {
        set_error_n_sequencia(false);
      }
    }
    if (name === "n_subparcela") {
      if (isNaN(Number(value))) {
        set_error_n_subparcela(true);
        return;
      } else {
        set_error_n_subparcela(false);
      }
    }
    if (name === "produca_total") {
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
    if (name === "n_planta") {
      if (isNaN(Number(value))) {
        set_error_n_planta(true);
        return;
      } else {
        set_error_n_planta(false);
      }
    }

    if (selectedIndex !== null) {
      const idCabecalhoToEdit =
        cabecalhos[selectedIndex].id_act_feertil_azotada;
      const updatedCabecalhos = cabecalhos.map((cab) => {
        if (cab.id_act_feertil_azotada === idCabecalhoToEdit) {
          return {
            ...cab,
            [name]: newValue,
            id_registo_activ: cab.id_act_feertil_azotada,
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
      } else {
        try {
          setIsLoading(true);
          let res = await post("update_reg_act_fertil_azotada_cabecalho", { payload: cabecalhoToUpdate });
          if (res.status === 200) {
            setMessage("Atualizado com sucesso!");

            const updatedCabecalho =
              cabecalhos.map((cab) => {
                if (cabecalhoToUpdate.id_act_feertil_azotada !== cab.id_act_feertil_azotada) {
                  return { ...cab };
                } else {
                  return res.data.result
                }
              }
              );
            setCabecalhos(updatedCabecalho);
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
                handleSelectZona(index, zona.id_act_feertil_azotada)
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
                  colSpan={4}
                  sx={{ fontWeight: 700, fontSize: 18 }}
                >
                  5D - Registo das Atividades de fertilização Orgânica
                  <BasicPopover
                    text={
                      "Registo obrigatório para o regime ecológico Promoção da Fertilização Orgânica.\n\nPretende-se que o beneficiário registe a aplicação de fertilizantes orgânicos e inorgânicos com base no plano de fertilização.\n\nRegisto pode ser utilizado para cumprimento dos requisitos de:\n\n- Programa de Ação das Zonas Vulneráveis, Portaria n.º 259/2012, sendo obrigatório o preenchimento dos campos que antecedem o quadro 1, exceto os campos 'compasso', 'porta-enxertos', 'n.º de plantas' e 'data de plantação', o quadro 1 - quantidades de azoto aplicadas e o quadro 2 - azoto fornecido pela água de rega.\n\n- Condicionalidade, parte dos indicadores do RLG2 da Portaria n.º 54-Q/2023, sendo obrigatório o preenchimento dos quadros 1 e 2 com complemento do Anexo 1 - indicadores 3.1, 3.3 e 3.4."
                    }
                  />
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
                    <StyledTableCell colSpan={5}>
                      <Stack
                        direction="row"
                        sx={{ justifyContent: "end" }}
                      >
                        <ButtonCadernos
                          mostrarBotaoGravar
                          aoClicarGravar={() => handleSaveNewCabecalho()}
                          mostrarBotaoCancelar
                          aoClicarCancelar={() => setCreateCabecalho(false)}
                        />
                      </Stack>
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>
                      <Stack
                        direction="row"
                        alignItems="center"
                      >
                        Zona Homogénea:
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
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Stack
                        direction="row"
                        alignItems="center"
                      >
                        Nº Seq. Parcela:
                        <CustomTextField
                          name="n_sequencia"
                          disabled
                          value={obj_zona_homo_escolhido.n_sequencia}
                          onChange={onInputChange}
                          error={error_n_sequencia}
                          helperText={
                            error_n_sequencia ? message_apenas_numero : ""
                          }
                        />
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Stack
                        direction="row"
                        alignItems="center"
                      >
                        Nº subparcela:
                        <CustomTextField
                          name="n_subparcela"
                          disabled
                          value={obj_zona_homo_escolhido.n_subparcela}
                          onChange={onInputChange}
                          error={error_n_subparcela}
                          helperText={error_n_subparcela ? message_apenas_numero : ""}
                        />
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Stack
                        direction="row"
                        alignItems="center"
                      >
                        Área (ha):
                        <CustomTextField
                          name="area"
                          disabled
                          value={obj_zona_homo_escolhido.area}
                          onChange={onInputChange}
                          error={error_area}
                          helperText={
                            error_area ? message_apenas_numero : ""
                          }
                        />
                      </Stack>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Stack
                        direction="row"
                        alignItems="center"
                      >
                        Método de rega:
                        <CustomTextField
                          name="metodo_rega"
                          value={obj_Cabecalho?.metodo_rega === undefined ? "" : obj_Cabecalho.metodo_rega}
                          onChange={onInputChange}
                        />
                      </Stack>
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell
                      colSpan={5}
                      sx={{
                        textAlign: "left",
                        fontWeight: 600,
                      }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                      >
                        Cultura e variedade:
                        <CustomTextField
                          name="cultura"
                          value={obj_Cabecalho?.cultura === undefined ? "" : obj_Cabecalho.cultura}
                          onChange={onInputChange}
                        />
                      </Stack>
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>
                      <Stack
                        direction="row"
                        alignItems="center"
                      >
                        Compasso:
                        <CustomTextField
                          name="compasso"
                          value={obj_Cabecalho?.compasso === undefined ? "" : obj_Cabecalho.compasso}
                          onChange={onInputChange}
                        />
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Stack
                        direction="row"
                        alignItems="center"
                      >
                        porta-enxerto:
                        <CustomTextField
                          name="porta_enxerto"
                          value={obj_Cabecalho?.porta_enxerto === undefined ? "" : obj_Cabecalho.porta_enxerto}
                          onChange={onInputChange}
                        />
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Stack
                        direction="row"
                        alignItems="center"
                      >
                        Nº de Plantas:
                        <CustomTextField
                          name="n_planta"
                          value={obj_Cabecalho?.n_planta === undefined ? "" : obj_Cabecalho.n_planta}
                          onChange={onInputChange}
                          error={error_n_planta}
                          helperText={
                            error_n_planta ? message_apenas_numero : ""
                          }
                        />
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell colSpan={2}>
                      <Stack
                        direction="row"
                        alignItems="center"
                      >
                        Data de plantação:
                        <TextField
                          variant="filled"
                          type="date"
                          inputProps={{
                            style: {
                              fontSize: 12,
                              fontFamily: "verdana",
                            },
                          }}
                          name="data_plantacao"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={obj_Cabecalho?.data_plantacao === undefined ? "" : obj_Cabecalho.data_plantacao}
                          onChange={onInputChange}
                        />
                      </Stack>
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>
                      Produção Total:
                    </StyledTableCell>
                    <StyledTableCell colSpan={2}>
                      <Stack
                        direction="row"
                        alignItems="center"
                      >
                        Esperada:
                        <CustomTextField
                          name="produca_total"
                          value={obj_Cabecalho?.produca_total === undefined ? "" : obj_Cabecalho.produca_total}
                          onChange={onInputChange}
                          error={error_esperada}
                          helperText={
                            error_esperada ? message_apenas_numero : ""
                          }
                        />
                        Unidades / Ton/ha
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell colSpan={2}>
                      <Stack
                        direction="row"
                        alignItems="center"
                      >
                        Obtida:
                        <CustomTextField
                          name="obtida"
                          value={obj_Cabecalho?.obtida === undefined ? "" : obj_Cabecalho.obtida}
                          onChange={onInputChange}
                          error={error_obtida}
                          helperText={
                            error_obtida ? message_apenas_numero : ""
                          }
                        />
                        Unidades / Ton/ha
                      </Stack>
                    </StyledTableCell>
                  </TableRow>
                </>
              }
              </TableBody>

              {cabecalhos.map((cab, j) => {
                if (j === selectedIndex)
                  return (
                    <React.Fragment key={j}>
                            <TableHead >
                        <TableRow>
                          {editingId === cab.id_act_feertil_azotada && editCabecalho ?
                            <StyledTableCellCabecalho colSpan={5} >
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
                            <StyledTableCellCabecalho colSpan={5}>
                              <Stack direction="row" sx={{ justifyContent: "end" }}>
                                <ButtonCadernos
                                  mostrarBotaoEditar
                                  aoClicarEditar={() => handleEdit(cab.id_act_feertil_azotada)} />
                              </Stack>
                            </StyledTableCellCabecalho>
                          }
                        </TableRow>
                      </TableHead>

                      <TableBody>
                      {editingId === cab.id_act_feertil_azotada &&
                        editCabecalho ? (
                        selectedIndex !== null && (
                          <>
                            <TableRow key={cab.id_zona_homo}>
                              <StyledTableCell>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                >
                                  Zona Homogénea:
                                  <CustomTextField
                                    name="zona_homo"
                                    value={cab.zona_homo}
                                    onChange={onInputChange_editar}
                                  />
                                </Stack>
                              </StyledTableCell>
                              <StyledTableCell>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                >
                                  Nº Seq. Parcela:
                                  <CustomTextField
                                    // name="n_sequencia"
                                    disabled
                                    value={cab.n_sequencia}
                                    onChange={onInputChange_editar}
                                    error={error_n_sequencia}
                                    helperText={
                                      error_n_sequencia ? message_apenas_numero : ""
                                    }
                                  />
                                </Stack>
                              </StyledTableCell>
                              <StyledTableCell>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                >
                                  Nº subparcela:
                                  <CustomTextField
                                    // name="n_subparcela"
                                    disabled
                                    value={cab.n_subparcela}
                                    onChange={onInputChange_editar}
                                    error={error_n_subparcela}
                                    helperText={
                                      error_n_subparcela ? message_apenas_numero : ""
                                    }
                                  />
                                </Stack>
                              </StyledTableCell>
                              <StyledTableCell>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                >
                                  Área (ha):
                                  <CustomTextField
                                    // name="area"
                                    disabled
                                    value={cab.area}
                                    onChange={onInputChange_editar}
                                    error={error_area}
                                    helperText={
                                      error_area ? message_apenas_numero : ""
                                    }
                                  />
                                </Stack>
                              </StyledTableCell>

                              <StyledTableCell>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                >
                                  Método de rega:
                                  <CustomTextField
                                    name="metodo_rega"
                                    value={cab.metodo_rega}
                                    onChange={onInputChange_editar}
                                  />
                                </Stack>
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell
                                colSpan={5}
                                sx={{
                                  textAlign: "left",
                                  fontWeight: 600,
                                }}
                              >
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                >
                                  Cultura e variedade:
                                  <CustomTextField
                                    name="cultura"
                                    value={cab.cultura}
                                    onChange={onInputChange_editar}
                                  />
                                </Stack>
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                >
                                  Compasso:
                                  <CustomTextField
                                    name="compasso"
                                    value={cab.compasso}
                                    onChange={onInputChange_editar}
                                  />
                                </Stack>
                              </StyledTableCell>
                              <StyledTableCell>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                >
                                  porta-enxerto:
                                  <CustomTextField
                                    name="porta_enxerto"
                                    value={cab.porta_enxerto}
                                    onChange={onInputChange_editar}
                                  />
                                </Stack>
                              </StyledTableCell>
                              <StyledTableCell>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                >
                                  Nº de Plantas:
                                  <CustomTextField
                                    name="n_planta"
                                    value={cab.n_planta}
                                    onChange={onInputChange_editar}
                                    error={error_n_planta}
                                    helperText={
                                      error_n_planta ? message_apenas_numero : ""
                                    }
                                  />
                                </Stack>
                              </StyledTableCell>
                              <StyledTableCell colSpan={2}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                >
                                  Data de plantação:
                                  <TextField
                                    variant="filled"
                                    type="date"
                                    inputProps={{
                                      style: {
                                        fontSize: 12,
                                        fontFamily: "verdana",
                                      },
                                    }}
                                    name="data_plantacao"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    value={cab.data_plantacao ? cab.data_plantacao : ""}
                                    onChange={onInputChange_editar}
                                  />
                                </Stack>
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell>
                                Produção Total:
                              </StyledTableCell>
                              <StyledTableCell colSpan={2}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                >
                                  Esperada:
                                  <CustomTextField
                                    name="produca_total"
                                    value={cab.produca_total}
                                    onChange={onInputChange_editar}
                                    error={error_esperada}
                                    helperText={
                                      error_esperada ? message_apenas_numero : ""
                                    }
                                  />
                                  Unidades / Ton/ha
                                </Stack>
                              </StyledTableCell>
                              <StyledTableCell colSpan={2}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                >
                                  Obtida:
                                  <CustomTextField
                                    name="obtida"
                                    value={cab.obtida}
                                    onChange={onInputChange_editar}
                                    error={error_obtida}
                                    helperText={
                                      error_obtida ? message_apenas_numero : ""
                                    }
                                  />
                                  Unidades / Ton/ha
                                </Stack>
                              </StyledTableCell>
                            </TableRow>
                          </>
                        )
                      ) : (
                        <>

                          {selectedIndex !== null && (
                            <>
                              <TableRow key={cab.id_zona_homo}>
                                <StyledTableCell>
                                  <Stack direction="row">
                                    Zona Homogénea:
                                    <Typography
                                      style={{
                                        fontSize: 18,
                                        paddingLeft: 10,
                                      }}
                                    >
                                      {cab.zona_homo}
                                    </Typography>
                                  </Stack>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <Stack direction="row">
                                    Nº Seq. Parcela:
                                    <Box margin={-1} padding={0}>
                                      <BasicPopover
                                        text={
                                          " N.º sequencial da parcela - Preencher com o n.º sequencial da parcela constante do iE do agricultor e anexar o respetivo iE. \nParcela é a área delimitada geograficamente com uma identificação única conforme registado no Sistema de Identificação Parcelar (iSIP).\nO iE é o documento de caraterização da exploração agrícola resultante da identificação das parcelas da exploração no iSIP; esta caraterização da exploração encontra-se no documento IFAP e nele consta o n.º sequencial da parcela ou baldio; n.º do parcelário; nome da parcela; área da parcela; IQFP, entre outros. "
                                        }
                                      />
                                    </Box>
                                    <Typography
                                      style={{
                                        fontFamily: "verdana",
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        fontSize: 14,
                                      }}
                                    >
                                      {cab.n_sequencia}
                                    </Typography>
                                  </Stack>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <Stack direction="row">
                                    Nº subparcela:
                                    <Box margin={-1} padding={0}>
                                      <BasicPopover
                                        text={
                                          "Preencher com o n.º de subparcela constante no iE para a corresponde parcela com o n.º sequencial registado no campo anterior.\n\nEntende-se por Subparcela a área corresponde à porção contínua de terreno homogéneo com a mesma ocupação de solo existente numa mesma parcela e que consta do documento iE"
                                        }
                                      />
                                    </Box>
                                    <Typography
                                      style={{
                                        fontFamily: "verdana",
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        fontSize: 14,
                                      }}
                                    >
                                      {cab.n_subparcela}
                                    </Typography>
                                  </Stack>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <Stack direction="row">
                                    Área (ha):
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
                                </StyledTableCell>
                                <StyledTableCell>
                                  <Stack direction="row">
                                    Método de rega:
                                    <Box margin={-1} padding={0}>
                                      <BasicPopover
                                        text={
                                          "Preencher apenas quando aplicável"
                                        }
                                      />
                                    </Box>
                                    <Typography
                                      style={{
                                        fontFamily: "verdana",
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        fontSize: 14,
                                      }}
                                    >
                                      {cab.metodo_rega}
                                    </Typography>
                                  </Stack>
                                </StyledTableCell>
                              </TableRow>

                              <TableRow>
                                <StyledTableCell colSpan={5}>
                                  <Stack direction="row">
                                    Cultura e variedade:
                                    <Typography
                                      style={{
                                        fontFamily: "verdana",
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        fontSize: 14,
                                      }}
                                    >
                                      {cab.cultura}
                                    </Typography>
                                  </Stack>
                                </StyledTableCell>
                              </TableRow>
                              <TableRow>
                                <StyledTableCell>
                                  <Stack
                                    direction="row"
                                    justifyContent="start"
                                  >
                                    Compasso:
                                    <Box margin={-1} padding={0}>
                                      <BasicPopover
                                        text={
                                          "Preencher apenas para cultura permanente."
                                        }
                                      />
                                    </Box>
                                    <Typography
                                      style={{
                                        fontFamily: "verdana",
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        fontSize: 14,
                                      }}
                                    >
                                      {cab.compasso}
                                    </Typography>
                                  </Stack>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <Stack
                                    direction="row"
                                    justifyContent="start"
                                  >
                                    Porta-enxerto:
                                    <Box margin={-1} padding={0}>
                                      <BasicPopover
                                        text={
                                          "Preencher apenas para cultura permanente."
                                        }
                                      />
                                    </Box>
                                    <Typography
                                      style={{
                                        fontFamily: "verdana",
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        fontSize: 14,
                                      }}
                                    >
                                      {cab.porta_enxerto}
                                    </Typography>
                                  </Stack>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <Stack direction="row">
                                    Nº de Plantas:
                                    <Typography
                                      style={{
                                        fontFamily: "verdana",
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        fontSize: 14,
                                      }}
                                    >
                                      {cab.n_planta}
                                    </Typography>
                                  </Stack>
                                </StyledTableCell>
                                <StyledTableCell colSpan={2}>
                                  <Stack
                                    direction="row"
                                    justifyContent="start"
                                  >
                                    Data de plantação:
                                    <Box margin={-1} padding={0}>
                                      <BasicPopover
                                        text={
                                          "Preencher apenas para cultura permanente."
                                        }
                                      />
                                    </Box>
                                    <Typography
                                      style={{
                                        fontFamily: "verdana",
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        fontSize: 14,
                                      }}
                                    >
                                      {cab.data_plantacao}
                                    </Typography>
                                  </Stack>
                                </StyledTableCell>
                              </TableRow>
                              <TableRow>
                                <StyledTableCell>
                                  Produção Total:
                                </StyledTableCell>
                                <StyledTableCell colSpan={2}>
                                  <Stack direction="row">
                                    Esperada:
                                    <Typography
                                      style={{
                                        fontFamily: "verdana",
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        fontSize: 14,
                                      }}
                                    >
                                      {cab.produca_total}
                                    </Typography>
                                    Unidades / Ton/ha
                                  </Stack>
                                </StyledTableCell>
                                <StyledTableCell colSpan={2}>
                                  <Stack direction="row">
                                    Obtida:
                                    <Typography
                                      style={{
                                        fontFamily: "verdana",
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        fontSize: 14,
                                      }}
                                    >
                                      {cab.obtida}
                                    </Typography>
                                    Unidades / Ton/ha
                                  </Stack>
                                </StyledTableCell>
                              </TableRow>
                            </>
                          )}
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
