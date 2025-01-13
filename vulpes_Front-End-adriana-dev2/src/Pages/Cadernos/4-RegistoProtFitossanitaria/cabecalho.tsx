import React, { ChangeEvent, SetStateAction, useEffect } from "react";
import { useState } from "react";
import { Button, FormControl, FormLabel, Table, TableBody, TableHead, TableRow, Toolbar, } from "@mui/material";
import { TableContainer } from "@mui/material";
import { Paper, Stack } from "@mui/material";

import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { Typography } from "@material-ui/core";
import { CustomSelect, CustomTextField, CustomThemeProvider, } from "../../../Styles/theme/customThemeprovider";
import BasicPopover from "../../../Components/Popover";
import { ICabecalho4 } from "../../../Interfaces/cadernos/caderno4";
import { StyledTableCellCabecalho } from "../../../Styles/tabelCellStyled/customTableCell";
import { IZonaHomogenea } from "../../../Interfaces/cadernos/zona_homogenea";
import { get, post } from "../../../Services/tokenConfig";
import { func_print } from "../../../Func_genericas/func_print";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { useLocation } from "react-router-dom";

export interface ICabecalhoFormProps {
  cabecalhos: ICabecalho4[];
  obj_Cabecalho: ICabecalho4 | undefined;
  set_obj_Cabecalho: React.Dispatch<SetStateAction<ICabecalho4 | undefined>>;
  setCabecalhos: React.Dispatch<SetStateAction<ICabecalho4[]>>;
  setZona_Homogenea: React.Dispatch<SetStateAction<IZonaHomogenea[]>>;
  handleSelectZona: (index: number, id: number) => void;
  selectedIndex: number | null;
  setMessage: React.Dispatch<SetStateAction<string>>;
  setOpenSnackError: React.Dispatch<SetStateAction<boolean>>;
  setOpenSnackSuccess: React.Dispatch<SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}

export const CabecalhoPOForm: React.FC<ICabecalhoFormProps> = ({
  cabecalhos,
  obj_Cabecalho,
  set_obj_Cabecalho,
  setCabecalhos,
  setZona_Homogenea,
  handleSelectZona,
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

  const message_apenas_numero = ("Apenas números são aceites");
  const [error_esperada, setError_esperada] = useState<boolean>(false);
  const [error_obtida, setError_obtida] = useState<boolean>(false);


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


  // Criar
  const onInputChange = (
    event: any
  ) => {
    const { name, value } = event.target;

    if (name === "esperada") {
      if (isNaN(Number(value))) {
        setError_esperada(true);
        return;
      } else {
        setError_esperada(false);
      }
    }
    if (name === "obtidas") {
      if (isNaN(Number(value))) {
        setError_obtida(true);
        return;
      } else {
        setError_obtida(false);
      }
    }


    set_obj_Cabecalho((prev: any) => ({
      ...prev,
      [name]: value,
      zona_homo: obj_zona_homo_escolhido.label,
      area: obj_zona_homo_escolhido.area
    }));
  };

  const handleSaveNewCabecalho = async () => {
    if (
      obj_Cabecalho === undefined
    ) {
      setMessage("Preencha todos os campos obrigatórios!");
      setOpenSnackError(true);
    } else {

      try {
        setIsLoading(true);

        let res = await post("/new_reg_fitossanitaria_cabecalho", {
          payload: {
            id_registo_fitocabe: 0,
            zona_homo: obj_Cabecalho.zona_homo === undefined ? "" : obj_Cabecalho.zona_homo,
            area: obj_Cabecalho.area === undefined ? "" : obj_Cabecalho.area,
            tipo_rega: obj_Cabecalho.tipo_rega === undefined ? "" : obj_Cabecalho.tipo_rega,
            cultura: obj_Cabecalho.cultura === undefined ? "" : obj_Cabecalho.cultura,
            compasso: obj_Cabecalho.compasso === undefined ? "" : obj_Cabecalho.compasso,
            producao_total: obj_Cabecalho.producao_total === undefined ? "" : obj_Cabecalho.producao_total,
            esperada: obj_Cabecalho.esperada === undefined ? "" : obj_Cabecalho.esperada,
            obtidas: obj_Cabecalho.obtidas === undefined ? "" : obj_Cabecalho.obtidas,

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


  // Editar
  const handleEdit = (id: number) => {
    setEditingId(id);
    setEditCabecalho(true);
  };

  const onInputChange_editar = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (name === "esperada") {
      if (isNaN(Number(value))) {
        setError_esperada(true);
        return;
      } else {
        setError_esperada(false);
      }
    }
    if (name === "obtidas") {
      if (isNaN(Number(value))) {
        setError_obtida(true);
        return;
      } else {
        setError_obtida(false);
      }
    }

    if (selectedIndex !== null) {
      const idCabecalhoToEdit = cabecalhos[selectedIndex].id_registo_fitocabe;
      const updatedCabecalhos = cabecalhos.map((cab) => {
        if (cab.id_registo_fitocabe === idCabecalhoToEdit) {
          return {
            ...cab,
            [name]: value,
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
      } else if (cabecalhoToUpdate.cultura === undefined) {
        setMessage("Preencha os campos obrigatórios!");
        setOpenSnackError(true);
      } else {

        try {
          setIsLoading(true);
          let res = await post("/update_reg_fitossanitaria_cabecalho", { payload: cabecalhoToUpdate });

          if (res.status === 200) {
            const updatedRows = cabecalhos.map((cab) => {
              if (cab.id_registo_fitocabe === cabecalhoToUpdate.id_registo_fitocabe) {
                return cabecalhoToUpdate;
              } else {
                return cab;
              }
            });

            setCabecalhos(updatedRows !== undefined ? updatedRows : []);
            set_obj_Cabecalho(undefined)
            setMessage("Cabeçalho atualizado com sucesso!");
            setOpenSnackSuccess(true);
            setCreateCabecalho(false);
          } else {
            setMessage("Erro ao atualizar o cabeçalho!");
            setOpenSnackError(true);
          }
          setIsLoading(false);
        } catch (error) {
          func_print("handleDeleteCaraterizacao", error, true);
          setMessage("Erro ao atualizar o cabeçalho!");
          setOpenSnackError(true);
          setIsLoading(false);
        }
      }

    } else {
      setMessage("Zona homogénea não selecionada!");
      setOpenSnackError(true);
    }
  };


  return (
    <>
      <CustomThemeProvider>
        <form>
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
                onClick={() => handleSelectZona(index, zona.id_registo_fitocabe)}
                sx={{
                  background:
                    index === selectedIndex ? "#c94f1e" : "transparent",
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
            <Table >
              <TableHead>
                <TableRow>
                  <StyledTableCellCabecalho
                    colSpan={4}
                    sx={{ fontWeight: 700, fontSize: 18 }}>
                    4 - Registo de Proteção Fitossanitária e aplicação
                    de biocidas
                    <BasicPopover text={"Preenchimento obrigatório para todos os beneficiários que produzam produtos vegetais, independentemente da intervenção PEPAC a que se candidatem, conforme disposto no artigo 16.º e 17.º da Lei n.º 26/2013 (separador na integra) e para cumprimento do RLG 5 - Área n.º 1 — Requisitos relativos à produção primária vegetal - indicador 1.4 e 1.5 (nos campos identificados para o efeito).\n\nNo âmbito da PRODI, o presente Separador destina-se ao registo de todas as substâncias que contribuam para a proteção fitossanitária e desenvolvimento das culturas:\n- Fungicidas – combatem fungos\n- Insecticidas – combatem insectos\n- Acaricidas – combatem ácaros\n- Herbicidas – combatem ervas infestantes\n- Nematodicidas – combatem nemátodos\n- Moluscicidas – combatem lesmas e caracóis\n- Rodenticidas – combatem ratos\n- Algicidas – combatem algas\n- Bactericidas – combatem bactérias\n- Adjuvantes – substâncias que se adicionam às caldas e lhes imprimem certas propriedades\n- Reguladores de crescimento"} />
                  </StyledTableCellCabecalho>
                {createcabecalho === false && editCabecalho === false &&  <StyledTableCellCabecalho  >
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
                      <StyledTableCellCabecalho colSpan={4}>
                      <Stack direction="row" sx={{ justifyContent: "end" }}>
                        <ButtonCadernos
                          mostrarBotaoGravar
                          aoClicarGravar={() => handleSaveNewCabecalho()}
                          mostrarBotaoCancelar
                          aoClicarCancelar={() => setCreateCabecalho(false)} />
                          </Stack>
                      </StyledTableCellCabecalho>
                    </TableRow>
                    <TableRow>
                      <StyledTableCellCabecalho sx={{ width: "20%" }}>
                        <Stack direction="row" sx={{ alignItems: "center" }}>
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
                      </StyledTableCellCabecalho>
                      <StyledTableCellCabecalho sx={{ width: "20%" }}>
                        <Stack direction="row" sx={{ alignItems: "center" }}>
                          Área (ha):
                          <CustomTextField
                            name="area"
                            disabled
                            value={obj_zona_homo_escolhido.area} />
                        </Stack>
                      </StyledTableCellCabecalho>
                      <StyledTableCellCabecalho sx={{ width: "20%" }}>
                        <Stack direction="row" sx={{ alignItems: "center" }}>
                          Tipo de Rega:
                          <CustomTextField
                            name="tipo_rega"
                            value={obj_Cabecalho?.tipo_rega === undefined ? "" : obj_Cabecalho.tipo_rega}
                            onChange={onInputChange} />
                        </Stack>
                      </StyledTableCellCabecalho>
                      <StyledTableCellCabecalho sx={{ width: "30%" }}>
                        <Stack direction="row" sx={{ alignItems: "center" }}>
                          Se aplica biocidas nas áreas de passagem ou instalações não destinadas à quarda de produtos vegetais  indicar o local:
                          <CustomTextField
                            name="compasso"
                            value={obj_Cabecalho?.compasso === undefined ? "" : obj_Cabecalho.compasso}
                            onChange={onInputChange} />
                        </Stack>
                      </StyledTableCellCabecalho>
                    </TableRow>
                    <TableRow>
                      <StyledTableCellCabecalho colSpan={4}>
                        <Stack direction="column">
                          <Stack direction="row">
                            <Typography
                              style={{
                                fontFamily: "candara",
                                fontSize: 14,
                                fontWeight: 600,
                                alignItems: "center"
                              }}
                            >Cultura e variedade: *</Typography>
                            <BasicPopover text={"Condicionalidade: campo de preenchimento  obrigatório para efeito do cumprimento do indicador 1.4, da área 1, do RLG 5 da Portaria n.º 54-Q/2023."} />
                          </Stack>
                          <Stack direction="row" sx={{ alignItems: "center" }}>
                            <Typography
                              style={{
                                fontFamily: "candara",
                                fontSize: 14,
                                fontWeight: 600,
                                width: "30%"
                              }}
                            >Compasso; porta-enxerto; nº de plantas; data de plantação ou de sementeira:
                            </Typography>
                            <Stack sx={{ width: "20%" }}>
                              <CustomTextField
                                name="cultura"
                                value={obj_Cabecalho?.cultura === undefined ? "" : obj_Cabecalho.cultura}
                                onChange={onInputChange} />
                            </Stack>
                          </Stack>
                        </Stack>
                      </StyledTableCellCabecalho>
                    </TableRow>
                    <TableRow>
                      <StyledTableCellCabecalho
                      >
                        Produção Total:
                      </StyledTableCellCabecalho>
                      <StyledTableCellCabecalho colSpan={2}>
                        <Stack
                          direction="row"
                          alignItems="center"
                        >
                          Esperada:
                          <Stack sx={{ width: "30%" }}>
                            <CustomTextField
                              name="esperada"
                              value={obj_Cabecalho?.esperada === undefined ? "" : obj_Cabecalho.esperada}
                              onChange={onInputChange}
                              error={error_esperada}
                              helperText={error_esperada ? message_apenas_numero : ""} />
                          </Stack>
                          Unidades / Ton/ha
                        </Stack>
                      </StyledTableCellCabecalho>
                      <StyledTableCellCabecalho >
                        <Stack
                          direction="row"
                          alignItems="center"
                        >
                          Obtida:
                          <Stack sx={{ width: "30%" }}>
                            <CustomTextField
                              name="obtidas"
                              value={obj_Cabecalho?.obtidas === undefined ? "" : obj_Cabecalho.obtidas}
                              onChange={onInputChange}
                              error={error_obtida}
                              helperText={error_obtida ? message_apenas_numero : ""} />
                          </Stack>
                          Unidades / Ton/ha
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
                      <TableHead >
                        <TableRow>
                          {editingId === cab.id_registo_fitocabe && editCabecalho ?
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
                                  aoClicarEditar={() => handleEdit(cab.id_registo_fitocabe)} />
                              </Stack>
                            </StyledTableCellCabecalho>
                          }
                        </TableRow>
                      </TableHead>

                      <TableBody>

                        {editingId === cab.id_registo_fitocabe &&
                          editCabecalho &&
                          selectedIndex !== null ? (
                          <>
                            <TableRow>
                              <StyledTableCellCabecalho sx={{ width: "20%" }}>
                                <Stack direction="row" sx={{ alignItems: "center" }}>
                                  Zona Homogénea:
                                  <CustomTextField
                                    name="zona_homo"
                                    value={cab.zona_homo}
                                    onChange={onInputChange_editar}
                                    disabled />
                                </Stack>
                              </StyledTableCellCabecalho>
                              <StyledTableCellCabecalho sx={{ width: "20%" }}>
                                <Stack direction="row" sx={{ alignItems: "center" }}>
                                  Área (ha):
                                  <CustomTextField
                                    name="area"
                                    disabled
                                    value={cab.area} />
                                </Stack>
                              </StyledTableCellCabecalho>
                              <StyledTableCellCabecalho sx={{ width: "20%" }}>
                                <Stack direction="row" sx={{ alignItems: "center" }}>
                                  Tipo de Rega:
                                  <CustomTextField
                                    name="tipo_rega"
                                    value={obj_Cabecalho?.tipo_rega}
                                    onChange={onInputChange_editar} />
                                </Stack>
                              </StyledTableCellCabecalho>
                              <StyledTableCellCabecalho sx={{ width: "30%" }}>
                                <Stack direction="row" sx={{ alignItems: "center" }}>
                                  Se aplica biocidas nas áreas de passagem ou instalações não destinadas à quarda de produtos vegetais  indicar o local:
                                  <CustomTextField
                                    name="compasso"
                                    value={cab.compasso}
                                    onChange={onInputChange_editar} />
                                </Stack>
                              </StyledTableCellCabecalho>
                            </TableRow>
                            <TableRow>
                              <StyledTableCellCabecalho colSpan={4}>
                                <Stack direction="column">
                                  <Stack direction="row">
                                    <Typography
                                      style={{
                                        fontFamily: "candara",
                                        fontSize: 14,
                                        fontWeight: 600,
                                        alignItems: "center"
                                      }}
                                    >Cultura e variedade: *</Typography>
                                    <BasicPopover text={"Condicionalidade: campo de preenchimento  obrigatório para efeito do cumprimento do indicador 1.4, da área 1, do RLG 5 da Portaria n.º 54-Q/2023."} />
                                  </Stack>
                                  <Stack direction="row" sx={{ alignItems: "center" }}>
                                    <Typography
                                      style={{
                                        fontFamily: "candara",
                                        fontSize: 14,
                                        fontWeight: 600,
                                        width: "30%"
                                      }}
                                    >Compasso; porta-enxerto; nº de plantas; data de plantação ou de sementeira:
                                    </Typography>
                                    <Stack sx={{ width: "20%" }}>
                                      <CustomTextField
                                        name="cultura"
                                        value={cab.cultura}
                                        onChange={onInputChange_editar} />
                                    </Stack>
                                  </Stack>
                                </Stack>
                              </StyledTableCellCabecalho>
                            </TableRow>
                            <TableRow>
                              <StyledTableCellCabecalho
                              >
                                Produção Total:
                              </StyledTableCellCabecalho>
                              <StyledTableCellCabecalho colSpan={2}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                >
                                  Esperada:
                                  <Stack sx={{ width: "30%" }}>
                                    <CustomTextField
                                      name="esperada"
                                      value={cab.esperada}
                                      onChange={onInputChange_editar}
                                      error={error_esperada}
                                      helperText={error_esperada ? message_apenas_numero : ""} />
                                  </Stack>
                                  Unidades / Ton/ha
                                </Stack>
                              </StyledTableCellCabecalho>
                              <StyledTableCellCabecalho >
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                >
                                  Obtida:
                                  <Stack sx={{ width: "30%" }}>
                                    <CustomTextField
                                      name="obtidas"
                                      value={cab.obtidas}
                                      onChange={onInputChange_editar}
                                      error={error_obtida}
                                      helperText={error_obtida ? message_apenas_numero : ""} />
                                  </Stack>
                                  Unidades / Ton/ha
                                </Stack>
                              </StyledTableCellCabecalho>
                            </TableRow>
                          </>
                        ) : (
                          createcabecalho === false && <>
                            <TableRow>
                              <StyledTableCellCabecalho sx={{ width: "20%" }}>
                                <Stack direction="row">
                                  Zona Homogénea:
                                  <Typography
                                    style={{
                                      fontSize: 14,
                                      paddingLeft: 10,
                                    }}
                                  >
                                    {cab.zona_homo}
                                  </Typography>
                                </Stack>
                              </StyledTableCellCabecalho>
                              <StyledTableCellCabecalho sx={{ width: "20%" }}>
                                <Stack direction="row">
                                  Área:
                                  <Typography
                                    style={{
                                      fontFamily: "verdana",
                                      paddingLeft: 10,
                                      fontSize: 14,
                                    }}
                                  >
                                    {cab.area}
                                  </Typography>
                                </Stack>
                              </StyledTableCellCabecalho>
                              <StyledTableCellCabecalho sx={{ width: "20%" }}>
                                <Stack direction="row">
                                  Tipo de Rega:
                                  <Typography
                                    style={{
                                      fontFamily: "verdana",
                                      paddingLeft: 10,
                                      fontSize: 14,
                                    }}
                                  >
                                    {cab.tipo_rega}
                                  </Typography>
                                </Stack>
                              </StyledTableCellCabecalho>
                              <StyledTableCellCabecalho sx={{ width: "20%" }}>
                                <Stack direction="row">
                                  Se aplica biocidas nas áreas de passagem ou instalações não destinadas à quarda de produtos vegetais  indicar o local:
                                  <BasicPopover text={"Campo de preenchimento obrigatório para efeito de cumprimento do indicador 1,5, da área 1, do RLG 5 da Portaria n.º 54-Q/2023."} />
                                </Stack>
                              </StyledTableCellCabecalho>
                              <StyledTableCellCabecalho sx={{ width: "20%" }}>
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
                              </StyledTableCellCabecalho>
                            </TableRow>
                            <TableRow>
                              <StyledTableCellCabecalho colSpan={5}>
                                <Stack direction="column">
                                  <Stack direction="row">
                                    <Typography
                                      style={{
                                        fontFamily: "candara",
                                        fontSize: 14,
                                        fontWeight: 600,
                                        alignItems: "center",
                                        display: "flex"
                                      }}
                                    >Cultura e variedade: *</Typography>
                                    <BasicPopover text={"Condicionalidade: campo de preenchimento  obrigatório para efeito do cumprimento do indicador 1.4, da área 1, do RLG 5 da Portaria n.º 54-Q/2023."} />
                                  </Stack>
                                  <Stack direction="row" sx={{ alignItems: "center" }}>
                                    <Typography
                                      style={{
                                        fontFamily: "candara",
                                        fontSize: 14,
                                        fontWeight: 600,
                                        width: "30%"
                                      }}
                                    >Compasso; porta-enxerto; nº de plantas; data de plantação ou de sementeira:
                                    </Typography>
                                    <Typography
                                      style={{
                                        fontFamily: "verdana",
                                        paddingLeft: 10,
                                        fontSize: 14,
                                      }}
                                    >
                                      {cab.cultura}
                                    </Typography>
                                  </Stack>
                                </Stack>
                              </StyledTableCellCabecalho>
                            </TableRow>
                            <TableRow>
                              <StyledTableCellCabecalho
                              >
                                <Stack direction="row">
                                  Produção Total:

                                </Stack>
                              </StyledTableCellCabecalho>
                              <StyledTableCellCabecalho colSpan={2}>
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
                                    {cab.esperada}
                                  </Typography>
                                  Unidades / Ton/ha
                                </Stack>
                              </StyledTableCellCabecalho>
                              <StyledTableCellCabecalho colSpan={3}>
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
                                    {cab.obtidas}
                                  </Typography>
                                  Unidades / Ton/ha
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
        </form>
      </CustomThemeProvider>
    </>
  );
};
