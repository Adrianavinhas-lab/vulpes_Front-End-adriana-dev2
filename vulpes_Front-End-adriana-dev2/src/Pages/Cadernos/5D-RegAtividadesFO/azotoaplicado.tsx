import React, { ChangeEvent, SetStateAction, useRef, useState } from "react";

import { Box, Paper, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { TableFooter, TablePagination } from "@mui/material";
import { TableBody, TableHead } from "@mui/material";
import { TableContainer, TableCell, TableRow } from "@mui/material";

import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import TablePaginationActions from "../../../Components/Pagination/pagination";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import {
  StyledTableCell,
  StyledTableHead,
} from "../../../Styles/tabelCellStyled/customTableCell";
import {
  CustomSelect,
  CustomTextField,
  CustomThemeProvider,
} from "../../../Styles/theme/customThemeprovider";
import BasicPopover from "../../../Components/Popover";
import { converter_valor_para_hash } from "../../../Func_genericas/create_convert_hash_md5";
import { del, del_using_obj, post } from "../../../Services/tokenConfig";
import { func_print } from "../../../Func_genericas/func_print";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import { IAzotoAplicado, ICabecalho5D, IFertilizacaoOrganica } from "../../../Interfaces/cadernos/caderno5/interfaces5D";
import { fertilizante, origem, pecuaria } from "../../../informacao_estatica";

interface IAzotoAplicadoProps {
  azoto: IAzotoAplicado;
  rows: IAzotoAplicado[];
  cabecalho: ICabecalho5D;
  rowsOrganica: IFertilizacaoOrganica[];
  setRowsOrganica: React.Dispatch<SetStateAction<IFertilizacaoOrganica[]>>;
  setAzoto: React.Dispatch<SetStateAction<IAzotoAplicado>>;
  setRowsAzoto: React.Dispatch<SetStateAction<IAzotoAplicado[]>>;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  setEditRow: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSnackSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSnackError: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  editingId: number | null;
  editRow: boolean;
  idCabecalho: number;
}

export const AzotoAplicadoForm: React.FC<IAzotoAplicadoProps> = ({
  azoto,
  rows,
  cabecalho,
  rowsOrganica,
  setRowsOrganica,
  setEditingId,
  setEditRow,
  editingId,
  editRow,
  setIsLoading,
  setOpenSnackSuccess,
  setOpenSnackError,
  setMessage,
  setAzoto,
  setRowsAzoto,
  idCabecalho
}) => {
  const [showNewRow, setShowNewRow] = useState(false);

  const [error_quantidade_um, set_error_quantidade_um] = useState<boolean>(false);
  const [error_teor_n, set_error_teor_n] = useState<boolean>(false);
  const message_apenas_numero = ("Apenas números são aceites");

  const [idToDelete, setIdToDelete] = useState<number | null | undefined>(null);
  const [openDeleteAzoto, setOpenDeleteAzoto] = React.useState(false);

  const ref_quantidade_um = useRef(0);
  const ref_quantidade_dois = useRef(0);
  const ref_quantidade_tres = useRef(0);
  const ref_quantidade_quatro = useRef(0);
  const ref_quantidade_cinco = useRef(0);

  /********** EDITAR LINHA *************/
  const handleEdit = (obj_azoto: IAzotoAplicado) => {
    setEditingId(obj_azoto?.id_registo_fertil_um);
    ref_quantidade_um.current = obj_azoto?.quantidade_um;
    ref_quantidade_dois.current = obj_azoto?.quantidade_dois;
    ref_quantidade_tres.current = obj_azoto?.quantidade_tres;
    ref_quantidade_quatro.current = obj_azoto?.quantidade_quatro;
    ref_quantidade_cinco.current = obj_azoto?.quantidade_cinco;

    setEditRow(true);
  };

  const reset_valores_ref = () => {
    ref_quantidade_um.current = 0;
    ref_quantidade_dois.current = 0;
    ref_quantidade_tres.current = 0;
    ref_quantidade_quatro.current = 0;
    ref_quantidade_cinco.current = 0;
  }

  const handle_fechar_nova_linha_limpar_campos = () => {
    setAzoto({
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
    })
    setShowNewRow(false);
    reset_valores_ref();
  }


  // CRIAR
  const onInputChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<String>
  ) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    let newValue: any = value;

    if (type === "date" && value === "") {
      newValue = null;
    }

    if (name === "quantidade_um") {
      if (isNaN(Number(value))) {
        set_error_quantidade_um(true);
        return;
      } else {
        set_error_quantidade_um(false);
      }
    }
    if (name === "teor_n") {
      if (isNaN(Number(value))) {
        set_error_teor_n(true);
        return;
      } else {
        set_error_teor_n(false);
      }
    }


    if (name === "quantidade_um") {
      ref_quantidade_um.current = newValue;
      ref_quantidade_quatro.current = resultadoQuantQuatro(newValue)

      setAzoto((prevAzoto: any) => ({
        ...prevAzoto,
        [name]: newValue,
        ["quantidade_quatro"]: ref_quantidade_quatro.current,
      }));
      return newValue;
    } else if (name === "teor_n") {
      ref_quantidade_dois.current = val_total_Quant_dois(newValue);
      ref_quantidade_tres.current = resultado_Quant_tres(ref_quantidade_dois.current, ref_quantidade_um.current)
      ref_quantidade_cinco.current = resultadoQuantCinco(ref_quantidade_tres.current);

      setAzoto((prevAzoto: any) => ({
        ...prevAzoto,
        ["quantidade_dois"]: ref_quantidade_dois.current,
        ["quantidade_tres"]: ref_quantidade_tres.current,
        ["quantidade_cinco"]: ref_quantidade_cinco.current,
        [name]: newValue,
      }));
      return newValue;
    } else {
      setAzoto((prevAzoto: any) => ({
        ...prevAzoto,
        [name]: newValue,
      }));
    }
    setRowsAzoto((prevAzoto: any) => ({
      ...prevAzoto,
      [name]: newValue,
      ["quantidade_quatro"]: ref_quantidade_quatro.current,
      ["quantidade_dois"]: ref_quantidade_dois.current,
      ["quantidade_tres"]: ref_quantidade_tres.current,
      ["quantidade_cinco"]: ref_quantidade_cinco.current,
    }));
  };

  const handleSaveAzoto = async () => {
    if (
      azoto?.quantidade_tres === undefined
    ) {
      setMessage("Preencha todos os campos obrigatórios!");
      setOpenSnackError(true);
    } else {
      try {
        setIsLoading(true);
        let res = await post("new_reg_act_fertil_azotada_um_5d", {
          payload: {
            id_registo_fertil_um: 0,
            origem: azoto?.origem === undefined ? "" : azoto?.origem,
            tipo_ferti: azoto?.tipo_ferti === undefined ? "" : azoto?.tipo_ferti,
            nome_comercial: azoto?.nome_comercial === undefined ? "" : azoto?.nome_comercial,
            especi_pecuaria: azoto?.especi_pecuaria === undefined ? "" : azoto?.especi_pecuaria,
            data_aplica: azoto?.data_aplica === undefined ? null : azoto?.data_aplica,
            quantidade_um: azoto?.quantidade_um === undefined ? 0 : azoto?.quantidade_um,
            teor_n: azoto?.teor_n === undefined ? 0 : azoto?.teor_n,
            quantidade_dois: azoto?.quantidade_dois === undefined ? "" : azoto?.quantidade_dois,
            quantidade_tres: azoto?.quantidade_tres === undefined ? "" : azoto?.quantidade_tres,
            quantidade_quatro: azoto?.quantidade_quatro === undefined ? "" : azoto?.quantidade_quatro,
            quantidade_cinco: azoto?.quantidade_cinco === undefined ? "" : azoto?.quantidade_cinco,
            total: somaQuantidadeTres() + (azoto?.quantidade_tres === undefined ? 0 : azoto?.quantidade_tres),
            hash: converter_valor_para_hash(somaQuantidadeTres() + (azoto?.quantidade_tres === undefined ? 0 : azoto?.quantidade_tres)),
            id_act_feertil_azotada: idCabecalho,
            last_update: new Date().toISOString(),
            create_date: new Date().toISOString(),
            uuid: "",
          }
        });
        if (res.status === 200) {
          setMessage("Gravado com sucesso!");

          let aux_obj_network_azoto = res.data.result.find((tab: any) => tab.id_registo_fertil_um !== undefined);
          let aux_obj_network_organica = res.data.result.find((tab: any) => tab.id_registo_fertil_tres !== undefined);

          if (aux_obj_network_azoto !== undefined && aux_obj_network_organica !== undefined) {
            setRowsAzoto((prevRows) => {
              return [...prevRows, aux_obj_network_azoto]
            });
            setRowsOrganica([aux_obj_network_organica]);
            reset_valores_ref();
            setAzoto({
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
            })
            setShowNewRow(false);
            setOpenSnackSuccess(true);
          } else {
            setMessage("Erro ao gravar!");
            setOpenSnackError(true);
          }

        } else {
          setMessage("Erro ao gravar!");
          setOpenSnackError(true);
        }
        setIsLoading(false);
      } catch (error) {
        func_print("handleSaveAzoto", error, true);
        setMessage("Erro ao efetuar a sua operação!");
        setOpenSnackError(true);
        setIsLoading(false);
      }
    }
  }

  // EDITAR
  const onInputChange_editar = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    let newValue: any = value;

    if (type === "date" && value === "") {
      newValue = null;
    }

    if (name === "quantidade_um") {
      if (isNaN(Number(value))) {
        set_error_quantidade_um(true);
        return;
      } else {
        set_error_quantidade_um(false);
      }
    }
    if (name === "teor_n") {
      if (isNaN(Number(value))) {
        set_error_teor_n(true);
        return;
      } else {
        set_error_teor_n(false);
      }
    }

    if (editingId !== null) {
      const updatedTable = rows.map((row) => {
        if (row.id_registo_fertil_um === editingId) {

          if (name === "quantidade_um") {
            ref_quantidade_um.current = newValue;
            ref_quantidade_quatro.current = resultadoQuantQuatro(newValue)


            const updatedRow = {
              ...row,
              [name]: newValue,
              ["quantidade_quatro"]: ref_quantidade_quatro.current,
            };
            setAzoto(updatedRow);
            return updatedRow;
          } else if (name === "teor_n") {
            ref_quantidade_dois.current = val_total_Quant_dois(newValue);
            ref_quantidade_tres.current = resultado_Quant_tres(ref_quantidade_dois.current, ref_quantidade_um.current)
            ref_quantidade_cinco.current = resultadoQuantCinco(ref_quantidade_tres.current);

            const updatedRow = {
              ...row,
              [name]: newValue,
              ["quantidade_dois"]: ref_quantidade_dois.current,
              ["quantidade_tres"]: ref_quantidade_tres.current,
              ["quantidade_cinco"]: ref_quantidade_cinco.current,

            };
            setAzoto(updatedRow);
            return updatedRow;
          } else {
            const updatedRow = {
              ...row,
              [name]: newValue,
            };
            setAzoto(updatedRow);
            return updatedRow;
          }
        } else {
          return row;
        }
      })
      setRowsAzoto(updatedTable);
    }
  };

  const handleUpdateAzoto = async () => {
    if (editingId !== null) {
      const tableToSave = rows.find((tab) => tab.id_registo_fertil_um === editingId);

      if (azoto?.data_aplica === undefined || azoto?.data_aplica === "" ||
        azoto?.quantidade_tres === undefined
      ) {
        setMessage("Preencha todos os campos obrigatórios!");
        setOpenSnackError(true);
      } else {
        if (tableToSave) {
          try {
            setIsLoading(true);
            let res = await post("update_reg_act_fertil_azotada_um_5d", {
              payload: {
                id_registo_fertil_um: azoto?.id_registo_fertil_um === undefined ? 0 : azoto.id_registo_fertil_um,
                origem: azoto?.origem === undefined ? "" : azoto?.origem,
                tipo_ferti: azoto?.tipo_ferti === undefined ? "" : azoto?.tipo_ferti,
                nome_comercial: azoto?.nome_comercial === undefined ? "" : azoto?.nome_comercial,
                especi_pecuaria: azoto?.especi_pecuaria === undefined ? "" : azoto?.especi_pecuaria,
                data_aplica: azoto?.data_aplica === undefined ? "" : azoto?.data_aplica,
                quantidade_um: azoto?.quantidade_um === undefined ? "" : String(azoto?.quantidade_um),
                teor_n: azoto?.teor_n === undefined ? "" : String(azoto?.teor_n),
                quantidade_dois: azoto?.quantidade_dois === undefined ? "" : String(azoto?.quantidade_dois),
                quantidade_tres: azoto?.quantidade_tres === undefined ? "" : String(azoto?.quantidade_tres),
                quantidade_quatro: azoto?.quantidade_quatro === undefined ? "" : String(azoto?.quantidade_quatro),
                quantidade_cinco: azoto?.quantidade_cinco === undefined ? "" : String(azoto?.quantidade_cinco),
                total: somaQuantidadeTres(),
                hash: converter_valor_para_hash(somaQuantidadeTres()),
                id_act_feertil_azotada: idCabecalho,
                last_update: new Date().toISOString(),
                create_date: new Date().toISOString(),
                uuid: "",
              }
            });

            if (res.status === 200) {
              setMessage("Registado com sucesso!");

              if (res.data.result.length > 1) {
                let aux_obj_network_azoto = res.data.result.find((tab: any) => tab.id_registo_fertil_um !== undefined);
                let aux_obj_network_organica = res.data.result.find((tab: any) => tab.id_registo_fertil_tres !== undefined);

                if (aux_obj_network_azoto !== undefined && aux_obj_network_organica !== undefined) {
                  setRowsAzoto((prevRows) => {
                    return [...prevRows, aux_obj_network_azoto]
                  });
                  setRowsOrganica(aux_obj_network_organica);
                  reset_valores_ref();
                  setAzoto({
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
                  })
                  setShowNewRow(false);
                  setOpenSnackSuccess(true);
                } else {
                  setMessage("Erro ao gravar!");
                  setOpenSnackError(true);
                }
              } else {
                setRowsAzoto((prevRows) => {
                  return [...prevRows, res.data.result[0]]
                });
                reset_valores_ref();
                setAzoto({
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
                })
                setShowNewRow(false);
                setOpenSnackSuccess(true);
              }
            } else {
              setMessage("Erro ao gravar!");
              setOpenSnackError(true);
            }
            setIsLoading(false);
          } catch (error) {
            func_print("handleUpdateAzoto", error, true);
            setMessage("Erro ao gravar!");
            setOpenSnackError(true);
            setIsLoading(false);
          }
        } else {
          setMessage("Não foi encontrada a linha a editar!");
          setOpenSnackError(false);
        }
      }

    }
  };
  // DELETE
  const handleClickOpenDeleteAzoto = (obj: IAzotoAplicado) => {
    setIdToDelete(obj.id_registo_fertil_um);
    setAzoto(obj);
    setOpenDeleteAzoto(true);
  };

  const handleDeleteAzoto = async () => {
    try {
      setIsLoading(true);
      let res = await del_using_obj(`delete__reg_act_fertil_azotada_um_5d`, {
        payload: {
          id_registo_fertil_um: idToDelete,
          origem: azoto?.origem === undefined ? "" : azoto?.origem,
          tipo_ferti: azoto?.tipo_ferti === undefined ? "" : azoto?.tipo_ferti,
          nome_comercial: azoto?.nome_comercial === undefined ? "" : azoto?.nome_comercial,
          especi_pecuaria: azoto?.especi_pecuaria === undefined ? "" : azoto?.especi_pecuaria,
          data_aplica: azoto?.data_aplica === undefined ? "" : azoto?.data_aplica,
          quantidade_um: azoto?.quantidade_um === undefined ? 0 : azoto?.quantidade_um,
          teor_n: azoto?.teor_n === undefined ? 0 : azoto?.teor_n,
          quantidade_dois: azoto?.quantidade_dois === undefined ? "" : azoto?.quantidade_dois,
          quantidade_tres: azoto?.quantidade_tres === undefined ? "" : azoto?.quantidade_tres,
          quantidade_quatro: azoto?.quantidade_quatro === undefined ? "" : azoto?.quantidade_quatro,
          quantidade_cinco: azoto?.quantidade_cinco === undefined ? "" : azoto?.quantidade_cinco,
          total: somaQuantidadeTres() - (azoto?.quantidade_tres === undefined ? 0 : azoto?.quantidade_tres),
          hash: converter_valor_para_hash(somaQuantidadeTres() - (azoto?.quantidade_tres === undefined ? 0 : azoto?.quantidade_tres)),
          id_act_feertil_azotada: idCabecalho,
          last_update: new Date().toISOString(),
          create_date: new Date().toISOString(),
          uuid: "",
        }
      });
      if (res.status === 200) {
        setMessage("Eliminado com sucesso!");
        setRowsAzoto((rows) => [...rows.filter((row) => row.id_registo_fertil_um !== idToDelete)]);
        
        setOpenDeleteAzoto(false);
        setIdToDelete(null);
        setOpenSnackSuccess(true);
      } else {
        setMessage("Erro ao eliminar!");
        setOpenSnackError(true);
      }
      setIsLoading(false);
    } catch (error) {
      func_print("handleDeleteAzoto", error, true);
      setMessage("Erro ao eliminar o registo!");
      setOpenSnackError(true);
      setIsLoading(false);
    }
  };

  /*********************** SOMAS / TOTAIS ****************/
  // FORMULAS
  // resultado do campo quantidade dois
  const val_total_Quant_dois = (teorn: number | undefined) => {
    return teorn !== 0 && teorn !== undefined
      ? ((teorn * 1000000) / 100)
      : 0;
  }

  // Valor campo quantidade tres
  const resultado_Quant_tres = (valor_quant_2: number | undefined, quantidadeum: number | undefined) => {
    console.log("valor_quant_2", valor_quant_2)
    console.log("quantidadeum", quantidadeum)
    return valor_quant_2 !== 0 && valor_quant_2 !== undefined && quantidadeum !== 0 && quantidadeum !== undefined
      ? (valor_quant_2 * 0.000001 * quantidadeum)
      : 0;
  }

  // Valor do campo quantidade quatro
  const resultadoQuantQuatro = (quantidadeum: number | undefined) => {
    return quantidadeum !== 0 && quantidadeum !== undefined && cabecalho.area !== 0
      ? (quantidadeum * cabecalho.area)
      : 0;
  }

  // Vaor do campo quantidade cinco
  const resultadoQuantCinco = (valor_quantidade_3: number | undefined) => {
    return valor_quantidade_3 !== 0 && valor_quantidade_3 !== undefined && cabecalho.area !== 0
      ? (valor_quantidade_3 * cabecalho.area)
      : 0;
  }

  const somaQuantidadeQuatro = () => {
    return Array.isArray(rows) ? rows.reduce((acc, row) => acc + Number(row.quantidade_quatro), 0) : 0
  }

    
  const somaQuantidadeCinco = () => {
    return Array.isArray(rows) ? rows.reduce((acc, row) => acc + Number(row.quantidade_cinco), 0) : 0
  }

  const somaQuantidadeDois = () => {
    return (somaQuantidadeCinco() * 1000000 / somaQuantidadeQuatro()) || 0;
  }
  const somaQuantidadeTres = () => {
    return (somaQuantidadeCinco() / cabecalho.area)
  }



  /*****************  PAGINAÇÃO ********************** */
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
              <TableCell
                colSpan={10}
                sx={{
                  fontWeight: 600,
                  textAlign: "left",
                  fontFamily: "candara",
                  fontSize: 16,
                }}
              >   <Stack direction="row">
                  1- Quantidade de Azoto aplicada
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={
                        "Quadro de preenchimento obrigatório para:\n\n- Beneficiários candidatos ao regime ecológico «promoção da fertilização orgânica»;\n\n- As explorações em Zona Vulnerável para cumprimento do disposto na alínea a) do n.º 9 do artigo 8.º da Portaria n.º 259/2012, caso o beneficiário opte pelo registo em CCU."
                      }
                    />
                  </Box>
                </Stack>
              </TableCell>
              <TableCell colSpan={2}>
                <BarraDeFerramentas
                  mostrarBotaoNovo
                  textoBotaoNovo="Novo Registo"
                  aoClicarNovo={() => setShowNewRow(true)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableHead sx={{ minWidth: 180 }}>
                Origem dos
                <Stack direction="row" justifyContent="center">
                  Nutrientes
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={
                        "Valores possíveis:\n- Água de rega;\n- Fertilização de Fundo com Fertilizantes Orgânicos;\n- Fertilização de Fundo com Fertilizantes Inorgânicos;\n- Fertilização de Cobertura com Fertilizantes Orgânicos; \n- Fertilização de Cobertura com Fertilizantes Inorgânicos.\n\nPreenchimento obrigatório apenas no âmbito do regime ecológico «promoção da fertilização orgânica»."
                      }
                    />
                  </Box>
                </Stack>
              </StyledTableHead>
              <StyledTableHead sx={{ minWidth: 150 }}>
                Tipo de
                <Stack direction="row" justifyContent="center">
                  Fertilizantes
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={
                        "Valores possíveis:\n- Estrume; \n- Chorume; \n- Mistura de fluentes pecuários;\n- Digerido de Unidade de Biogás; \n- Sedimentos depositados nas lagoas de armazenamento de efluentes pecuários;\n- Composto com origem em efluentes pecuários ou seus equiparados;\n- Outro tipo de Composto;\n- Outro tipo de Fertilizante Orgânico; \n- Fertilizante de síntese;"
                      }
                    />
                  </Box>
                </Stack>
              </StyledTableHead>
              <StyledTableHead sx={{ minWidth: 180 }}>Nome Comercial/ Origem da M.O.</StyledTableHead>
              <StyledTableHead sx={{ minWidth: 120 }}>
                Espécie
                <Stack direction="row" justifyContent="center">
                  pecuária
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={
                        "Preencher quando se trate de efluente pecuário. \n\nValores possíveis:  \n- Bovino; \n - Suíno; \n - Ovino; \n- Caprino;\n - Aves;  \n - Equídeos; \n - Leporídeos; \n - Outras espécies pecuárias."
                      }
                    />
                  </Box>
                </Stack>
              </StyledTableHead>
              <StyledTableHead>
                Data da
                <Stack direction="row" justifyContent="center">
                  Aplicação *
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={"Valor deverá assumir o formato dd-mm-aaaa."}
                    />
                  </Box>
                </Stack>
              </StyledTableHead>
              <StyledTableHead>
                Quantidade de fertilizante aplicada/ha
                <Stack direction="row" justifyContent="center">
                  (kg ou m3/ha)
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={
                        "Os registos efetuados neste campo devem atender ao previsto no plano de fertilização (Anexo I)."
                      }
                    />
                  </Box>
                </Stack>
              </StyledTableHead>
              <StyledTableHead>
                Teor em
                <Stack direction="row" justifyContent="center">
                  N(%)
                  <Box margin={-1} padding={0}>
                    <BasicPopover text={"Campo de preenchimento manual."} />
                  </Box>
                </Stack>
              </StyledTableHead>
              <StyledTableHead sx={{ backgroundColor: "lightgray" }}>
                Quantidade N(total)/kg ou m3 fertilizante (mg N(total)/kg ou m3)
              </StyledTableHead>
              <StyledTableHead sx={{ backgroundColor: "lightgray" }}>
                Quantidade N(total) aplicada/ha
                <Stack direction="row" justifyContent="center">
                  (k/ha)
                  <Box margin={-1} padding={0}>
                    <BasicPopover
                      text={
                        "Portaria n.º 259/2012 - campo de preenchimento obrigatório."
                      }
                    />
                  </Box>
                </Stack>
              </StyledTableHead>
              <StyledTableHead sx={{ backgroundColor: "lightgray" }}>
                Quantidade total de fertilizante aplicada (kg ou m3)
              </StyledTableHead>
              <StyledTableHead sx={{ backgroundColor: "lightgray" }}>
                Quantidade total de azoto (N(total) aplicada (kg))
              </StyledTableHead>
              <StyledTableHead>Ações</StyledTableHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {showNewRow && (
              <TableRow>
                <StyledTableCell>
                  <CustomSelect
                    value={azoto?.origem === undefined ? "" : azoto.origem}
                    name="origem"
                    onChange={onInputChange}
                    options={origem}
                    label="Origem dos Nutrientes"
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomSelect
                    value={azoto?.tipo_ferti === undefined ? "" : azoto.tipo_ferti}
                    name="tipo_ferti"
                    onChange={onInputChange}
                    options={fertilizante}
                    label="Tipo de Fertilizante"
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="nome_comercial"
                    value={azoto?.nome_comercial === undefined ? "" : azoto.nome_comercial}
                    onChange={onInputChange}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomSelect
                    value={azoto?.especi_pecuaria === undefined ? "" : azoto.especi_pecuaria}
                    name="especi_pecuaria"
                    onChange={onInputChange}
                    options={pecuaria}
                    label="Espécie pecuária"
                  />
                </StyledTableCell>
                <StyledTableCell>
                <CustomTextField
                    name="data_aplica"
                    value={azoto?.data_aplica === undefined ? null : azoto.data_aplica}
                    onChange={onInputChange}
                  
                  />
                  {/* <TextField
                    variant="filled"
                    type="date"
                    inputProps={{
                      style: { fontSize: 12, fontFamily: "verdana" },
                    }}
                    name="data_aplica"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={azoto?.data_aplica === undefined ? "" : azoto.data_aplica}
                    onChange={
                      onInputChange as (
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => void
                    }
                  /> */}
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="quantidade_um"
                    value={azoto?.quantidade_um === undefined ? 0 : azoto.quantidade_um}
                    onChange={onInputChange}
                    error={error_quantidade_um}
                    helperText={error_quantidade_um ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="teor_n"
                    value={azoto?.teor_n === undefined ? "" : azoto.teor_n}
                    onChange={onInputChange}
                    error={error_teor_n}
                    helperText={error_teor_n ? message_apenas_numero : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="quantidade_dois"
                    value={azoto?.quantidade_dois === undefined ? "" : azoto.quantidade_dois}
                    onChange={onInputChange}
                    disabled
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="quantidade_tres"
                    value={(azoto?.quantidade_tres === undefined ? "" : azoto.quantidade_tres)}
                    onChange={onInputChange}
                    disabled
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomTextField
                    name="quantidade_quatro"
                    value={(azoto?.quantidade_quatro === undefined ? "" : azoto.quantidade_quatro)}
                    onChange={onInputChange}
                    disabled
                  />
                </StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: "lightgray" }}>
                  <CustomTextField
                    name="quantidade_cinco"
                    value={(azoto?.quantidade_cinco === undefined ? "" : azoto.quantidade_cinco)}
                    onChange={onInputChange}
                    disabled
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <Stack direction="row" justifyContent="center">
                    <ButtonCadernos
                      mostrarBotaoCancelar
                      aoClicarCancelar={handle_fechar_nova_linha_limpar_campos}
                      mostrarBotaoGravar
                      aoClicarGravar={() => handleSaveAzoto()}
                    />
                  </Stack>
                </StyledTableCell>
              </TableRow>
            )}

            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, key) =>
            (
              <TableRow key={key}>
                {editingId === row.id_registo_fertil_um &&
                  editRow === true ? (
                  <>
                    <StyledTableCell>
                      <CustomSelect
                        value={row.origem}
                        name={"origem"}
                        onChange={(event) => onInputChange_editar(event)}
                        options={origem}
                        label="Origem dos Nutrientes"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomSelect
                        value={row.tipo_ferti}
                        name="tipo_ferti"
                        onChange={(event) => onInputChange_editar(event)}
                        options={fertilizante}
                        label="Tipo de Fertilizante"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="nome_comercial"
                        value={row.nome_comercial}
                        onChange={(event: any) => onInputChange_editar(event)}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomSelect
                        value={row.especi_pecuaria}
                        name="especi_pecuaria"
                        onChange={(event) => onInputChange_editar(event)}
                        options={pecuaria}
                        label="Espécie pecuária"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="filled"
                        type="date"
                        name="data_aplica"
                        inputProps={{
                          style: {
                            fontSize: 12,
                            fontFamily: "verdana",
                          },
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={row?.data_aplica !== undefined ? row.data_aplica : null}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          onInputChange_editar(event)
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="quantidade_um"
                        value={row.quantidade_um}
                        onChange={(event: any) => onInputChange_editar(event)}
                        error={error_quantidade_um}
                        helperText={error_quantidade_um ? message_apenas_numero : ""}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="teor_n"
                        value={row.teor_n}
                        onChange={(event: any) => onInputChange_editar(event)}
                        error={error_teor_n}
                        helperText={error_teor_n ? message_apenas_numero : ""}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="quantidade_dois"
                        value={row.quantidade_dois}
                        onChange={(event: any) => onInputChange_editar(event)}
                        disabled
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="quantidade_tres"
                        value={row.quantidade_tres}
                        onChange={(event: any) => onInputChange_editar(event)}
                        disabled
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="quantidade_quatro"
                        value={row.quantidade_quatro}
                        onChange={(event: any) => onInputChange_editar(event)}
                        disabled
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="quantidade_cinco"
                        value={row.quantidade_cinco}
                        // onChange={converter_valor_para_hash("olaaa")}
                        onChange={(event: any) => onInputChange_editar(event)}
                        disabled
                      />
                    </StyledTableCell>
                  </>
                ) : (
                  <>
                    <StyledTableCell aria-multiline>
                      {row.origem}
                    </StyledTableCell>
                    <StyledTableCell aria-multiline>
                      {row.tipo_ferti}
                    </StyledTableCell>
                    <StyledTableCell>{row.nome_comercial}</StyledTableCell>
                    <StyledTableCell aria-multiline>
                      {row.especi_pecuaria}
                    </StyledTableCell>
                    <StyledTableCell>{row.data_aplica}</StyledTableCell>
                    <StyledTableCell>{Number(row.quantidade_um).toFixed(2)}</StyledTableCell>
                    <StyledTableCell>{row.teor_n}</StyledTableCell>
                    <StyledTableCell>{Number(row.quantidade_dois).toFixed(2)}</StyledTableCell>
                    <StyledTableCell>{Number(row.quantidade_tres).toFixed(2)}</StyledTableCell>
                    <StyledTableCell>{Number(row.quantidade_quatro).toFixed(2)}</StyledTableCell>
                    <StyledTableCell>{Number(row.quantidade_cinco).toFixed(2)}</StyledTableCell>
                  </>
                )}

                {editingId === row.id_registo_fertil_um && editRow ? (
                  <StyledTableCell>
                    <ButtonCadernos
                      mostrarBotaoGravar
                      aoClicarGravar={() => handleUpdateAzoto()}
                      mostrarBotaoCancelar
                      aoClicarCancelar={() => setEditingId(null)}
                    />
                  </StyledTableCell>
                ) : (
                  <StyledTableCell>
                    <ButtonCadernos
                      mostrarBotaoEditar
                      aoClicarEditar={() =>
                        handleEdit(row)
                      }
                      mostrarBotaoApagar
                      aoClicarApagar={() =>
                        handleClickOpenDeleteAzoto(row)
                      }
                    />
                  </StyledTableCell>
                )}
              </TableRow>
            )
            )}
            <TableRow>
              <TableCell colSpan={6}>
                <Typography style={{ fontSize: 14, fontFamily: "candara" }}>
                  * Campos de preenchimento obrigatório
                </Typography>
              </TableCell>
              <StyledTableCell sx={{ textAlign: "right" }}>
                {"Total ->"}
              </StyledTableCell>
              <StyledTableCell>{somaQuantidadeDois().toFixed(2)}</StyledTableCell>
              <StyledTableCell>{somaQuantidadeTres().toFixed(2)}</StyledTableCell>
              <StyledTableCell>{somaQuantidadeQuatro().toFixed(2)}</StyledTableCell>
              <StyledTableCell>{somaQuantidadeCinco().toFixed(2)}</StyledTableCell>
            </TableRow>
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={19} />
              </TableRow>
            )}

          </TableBody>
          <TableFooter>
            <TableRow sx={{ width: "100%" }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={14}
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
      <ConfirmDialog
        open={openDeleteAzoto}
        onClose={() => setOpenDeleteAzoto(false)}
        onConfirm={handleDeleteAzoto}
        message="Deseja eliminar o registo?"
      />
    </CustomThemeProvider>
  );
};