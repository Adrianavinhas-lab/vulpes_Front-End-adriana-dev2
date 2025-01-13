import React, { useEffect } from "react";
import { useState } from "react";
import { Snackbar } from "@mui/material";
import { TableFooter, TablePagination } from "@mui/material";
import { Paper, Stack, TableBody } from "@mui/material";
import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TablePaginationActions from "../../../../Components/Pagination/pagination";
import ConfirmDialog from "../../../../Components/CustomDialog/customdialog";
import { ButtonCadernos } from "../../../../Components/barra-de-ferramentas/ButtonCadernos";
import { StyledTableHead, StyledTableCell } from "../../../../Styles/tabelCellStyled/customTableCell";
import { CustomSelect, CustomTextField, CustomThemeProvider } from "../../../../Styles/theme/customThemeprovider";
import BasicPopover from "../../../../Components/Popover";
import { ICaraterizacaoA2 } from "../../../../Interfaces/anexos/anexo2/caraterizacao";
import { del, get, post } from "../../../../Services/tokenConfig";
import LoadingVulpes from "../../../../Styles/Loader/loading";
import { func_print } from "../../../../Func_genericas/func_print";
import { useLocation } from "react-router-dom";
import { BarraDeFerramentas } from "../../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { parqueamento, pastagem, pontodeagua } from "../../../../informacao_estatica";
import { Alert } from "../../../../Components/Alert/Alert";



export const CaraterizacaoAreaForm = () => {

  const location = useLocation();

  const [createTable, setCreateTable] = useState(false);
  const [message, setMessage] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);

  const [obj_anexo, set_obj_anexo] = useState<ICaraterizacaoA2>();
  const [open_dialog_tem_a_certeza_que_quer_eliminar, set_open_dialog_tem_a_certeza_que_quer_eliminar] = useState(false);
  const [obj_anexo_lista, set_obj_anexo_lista] = useState<ICaraterizacaoA2[]>([]);
  const [flag_criar_novo_anexo, set_flag_criar_novo_anexo] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [flag_erro_subparcela, set_flag_erro_subparcela] = useState(false);
  const [flag_erro_parcela, set_flag_erro_parcela] = useState(false);
  const [flag_erro_area, set_flag_erro_area] = useState(false);


  const handleEdit = (obj: ICaraterizacaoA2) => {
    set_obj_anexo(obj)
    set_flag_criar_novo_anexo(true)
    setCreateTable(false)
  };

  const get_info = async () => {
    try {
      let res = await get(
        `/get_reg_anexo_dois_caraterizacao_rosto/${location.state.id_rosto}`
      );
      if (res.status === 200) {
        if (res.data.result.length !== 0) {
          set_obj_anexo_lista(res.data.result);
        }
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
  useEffect(() => {
    (async () => {
      await get_info();
    })();
  }, []);


  const handle_create_anexo = async () => {
    try {
      if (typeof obj_anexo?.parcela === 'undefined' || obj_anexo?.parcela.toString().length === 0 || flag_erro_parcela === true) {
        set_flag_erro_parcela(true)
        setMessage("Preenchimento de parcela é numérico!");
        setOpenSnackError(true);

      } else if (typeof obj_anexo?.subparcela === 'undefined' || obj_anexo?.subparcela.toString().length === 0 || flag_erro_subparcela === true) {
        set_flag_erro_subparcela(true)
        setMessage("Preenchimento de subparcela é numérico!");
        setOpenSnackError(true);

      } else {
        setIsLoading(true);
        let res = await post("new_reg_anexo_dois_caraterizacao", {
          payload: {
            id_caraterizacao: 0,
            parcela: obj_anexo?.parcela === undefined ? 0 : obj_anexo?.parcela,
            subparcela: obj_anexo?.subparcela === undefined ? 0 : obj_anexo?.subparcela,
            zona_homo: obj_anexo?.zona_homo === undefined ? '' : obj_anexo?.zona_homo,
            area: obj_anexo?.area === undefined ? 0 : obj_anexo?.area,
            tipo_pastagem: obj_anexo?.tipo_pastagem === undefined ? '' : obj_anexo?.tipo_pastagem,
            estado_pastagem: obj_anexo?.estado_pastagem === undefined ? '' : obj_anexo?.estado_pastagem,
            presenca_leguminosas: obj_anexo?.presenca_leguminosas === undefined ? '' : obj_anexo?.presenca_leguminosas,
            estruturas_gado: obj_anexo?.estruturas_gado === undefined ? '' : obj_anexo?.estruturas_gado,
            pontos_agua: obj_anexo?.pontos_agua === undefined ? '' : obj_anexo?.pontos_agua,
            maneiro: obj_anexo?.maneiro === undefined ? '' : obj_anexo?.maneiro,
            controlo_vegetacao: obj_anexo?.controlo_vegetacao === undefined ? '' : obj_anexo?.controlo_vegetacao,
            corecoes: obj_anexo?.corecoes === undefined ? '' : obj_anexo?.corecoes,
            sementeira: obj_anexo?.sementeira === undefined ? '' : obj_anexo?.sementeira,
            id_rosto: location.state.id_rosto,
            last_update: new Date().toISOString(),
            create_date: new Date().toISOString(),
            uuid: ''
          }
        });


        if (res.status === 200) {
          set_obj_anexo_lista((old) => [...old, res.data.result])
          set_obj_anexo(undefined);

          setMessage("Gravado com sucesso!");
          setOpenSnackSuccess(true);


          setCreateTable(false);
        } else {
          setMessage("Erro ao gravar!");
          setOpenSnackError(true);
        }

        setIsLoading(false);
      }

    } catch (error) {
      func_print("handle_create_anexo", error, true);
      setIsLoading(false);
      setMessage("Erro ao gravar!");
      setOpenSnackError(true);

    }
  };


  const handle_update_anexo = async () => {
    try {
      setIsLoading(true);
      console.log('obj_anexo', obj_anexo)

      let res = await post("update_reg_anexo_dois_caraterizacao", { payload: obj_anexo });

      if (res.status === 200) {
        let lista_aux: any = obj_anexo_lista.map((el) => {
          if (el.id_caraterizacao !== res.data.result.id_caraterizacao) {
            return el
          } else {
            return res.data.result
          }
        })
        set_obj_anexo_lista(lista_aux === undefined ? [] : lista_aux)
        set_obj_anexo(undefined);
        set_flag_criar_novo_anexo(false)

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

  const onInputChange = (event: any) => {
    console.log('event.target', event.target)
    const { name, value, type, checked } = event.target;
    let aux_obj_anexo: any = obj_anexo === undefined ? {} : obj_anexo

    if (type === "checkbox") {
      aux_obj_anexo[name] = aux_obj_anexo[name] === undefined ? true : !aux_obj_anexo[name]
      set_obj_anexo(aux_obj_anexo);

    } else {
      if (name === 'parcela') {

        if (!/^\d+$/.test(value)) {
          set_flag_erro_parcela(true)

        } else {
          set_flag_erro_parcela(false)

        }

      }
      if (name === 'subparcela') {

        if (!/^\d+$/.test(value)) {
          set_flag_erro_subparcela(true)

        } else {
          set_flag_erro_subparcela(false)

        }

      }

      set_obj_anexo((old: any) => ({
        ...old,
        [name]: value,
      }));
    }
  };

  const handleClickOpenDelete = (obj: ICaraterizacaoA2) => {
    set_obj_anexo(obj);
    set_open_dialog_tem_a_certeza_que_quer_eliminar(true)
  };
  const handle_delete_anexo = async () => {
    try {
      setIsLoading(true);

      let res = await del(
        `delete__reg_anexo_dois_caraterizacao/${obj_anexo?.id_caraterizacao}`
      );
      if (res.status === 200) {
        let lista_aux: any = obj_anexo_lista.filter((el) => {
          if (el.id_caraterizacao !== obj_anexo?.id_caraterizacao) {
            return el
          }
        })
        set_obj_anexo_lista(lista_aux === undefined ? [] : lista_aux)
        setMessage("Registo eliminado com sucesso!");

        set_open_dialog_tem_a_certeza_que_quer_eliminar(false);
        setOpenSnackSuccess(true);
        if (lista_aux === undefined || lista_aux.length === 0) {
          setCreateTable(true)
          set_obj_anexo(undefined)
        }
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

  const handleCloseSnack = () => {

    setOpenSnackSuccess(false);
    setOpenSnackError(false);
  };

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
  const handle_novo_registo = () => {
    set_obj_anexo(undefined)
    set_flag_criar_novo_anexo(false)

    setCreateTable(true)


  }

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
        {isLoading ? (
          <LoadingVulpes />
        ) : (
          <table style={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={14}
                  sx={{
                    fontWeight: 700,
                    fontSize: 18,
                    fontFamily: "candara",
                  }}
                >
                  Anexo 2 - Plano de Gestão do Pastoreio
                  <BasicPopover
                    text={
                      "O Plano de Gestão do Pastoreio é obrigatório para as seguintes intervenções PEPAC: Maneio da Pastagem Permanente (para 3 anos) e Conservação do Solo - Pastagens Biodiversas (para 5 anos). \n\n Pretende-se que o agricultor faça uma caraterização das pastagens permanentes, na qual deve incluir tipo de pastagem permanente, resultado das Análises (a registar no Anexo 1 - Plano de Fertilização); estado geral da pastagem: grau de cobertura do solo com vegetação herbácea, estruturas de parqueamento do gado (tipo, quando existentes), pontos de água acessíveis ao gado (se existem e de que tipo) e caracterização do maneio do gado.\n\n Para além da caraterização das áreas de pastagem permanente, o beneficiário deverá apresentar um planeamento/organigrama das práticas culturais, que se propõe implementar para melhorar o estado das pastagens, aumentar/manter os níveis de armazenamento do carbono orgânico, bem como o conjunto de alterações a efetuar no maneio do seu efetivo pecuário para garantir a melhoria ou manutenção do estado de conservação das pastagens e do sequestro do carbono orgânico.I"
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={11}
                  sx={{
                    fontWeight: 600,
                    fontFamily: "candara",
                    fontSize: 16,
                  }}
                >
                  1 - Caraterização da área de pastagem permanente
                </TableCell>
                <TableCell colSpan={3}>
                  <Stack direction="row" sx={{ justifyContent: "end" }}>
                    <BarraDeFerramentas
                      mostrarBotaoNovo
                      textoBotaoNovo="Novo Registo"
                      aoClicarNovo={() => handle_novo_registo()}
                    />
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow>
                <StyledTableHead rowSpan={3} sx={{ minWidth: 110 }}>
                  <Stack direction="row" justifyContent="right" marginTop={0}>
                    <BasicPopover
                      text={
                        " N.º sequencial da parcela - Preencher com o n.º sequencial da parcela constante do iE do agricultor e anexar o respetivo iE.\n\n  Parcela é a área delimitada geograficamente com uma identificação única conforme registado no Sistema de Identificação Parcelar (iSIP).\n\n O iE é o documento de caraterização da exploração agrícola resultante da identificação das parcelas da exploração no iSIP; esta caraterização da exploração encontra-se no documento IFAP e nele consta o n.º sequencial da parcela ou baldio; n.º do parcelário; nome da parcela; área da parcela; IQFP, entre outros. "
                      }
                    />
                  </Stack>
                  Nº seq. de Parcela
                </StyledTableHead>
                <StyledTableHead rowSpan={3} sx={{ minWidth: 110 }}>
                  <Stack direction="row" justifyContent="right">
                    <BasicPopover
                      text={
                        "Preencher com o n.º de subparcela constante no iE para a corresponde parcela com o n.º sequencial registado na coluna anterior.\n\n Entende-se por Subparcela a área corresponde à porção contínua de terreno homogéneo com a mesma ocupação de solo existente numa mesma parcela e que consta do documento iE. "
                      }
                    />
                  </Stack>
                  Subparcela
                </StyledTableHead>
                <StyledTableHead rowSpan={3} sx={{ minWidth: 70 }}>
                  <Stack direction="row" justifyContent="right">
                    <BasicPopover
                      text={
                        "A Zona Homogénea, que deverá ser identificada por uma letra maiúscula, tanto pode corresponder a uma subparcela, como a mais do que uma. Nas culturas arbóreas e arbustivas, a zona homogénea compreende as mesmas características dominantes quanto à natureza do solo, à topografia e exposição, à espécie e variedade das plantas, à idade das plantas e às práticas culturais.\n\n  No caso das culturas anuais, pertencentes à mesma unidade de produção, a zona homogênea compreende as mesmas características dominantes. Uma mesma zona homogénea, para efeitos de registo no presente caderno de campo não deve contemplar conjuntamente área em conversão e área em produção biológica. Por exemplo: Pode incluir uma vinha com várias castas, desde que as outras caraterísticas dominantes sejam uniformes quanto à natureza do solo, à topografia, ao passado cultural e às práticas culturais e a finalidade da produção seja a mesma (uva para vinho ou uva de mesa não podem estar na mesma zona homogénea mas, vinha com diferentes castas podem estar na mesma zona homogénea). "
                      }
                    />
                  </Stack>
                  Zona homogénea
                </StyledTableHead>
                <StyledTableHead rowSpan={3} sx={{ minWidth: 80 }}>
                  <Stack direction="row" justifyContent="right">
                    <BasicPopover
                      text={
                        "Beneficiário deve preencher a área da subparcela registada na coluna «subparcela» (ha)."
                      }
                    />
                  </Stack>
                  Área (Ha)
                </StyledTableHead>
                <StyledTableHead rowSpan={3} sx={{ minWidth: 80 }}>
                  <Stack direction="row" justifyContent="right">
                    <BasicPopover
                      text={
                        "Preencher campo apenas se o beneficiário for candidato à intervenção agroambiental «conservação do solo - pastagens biodiversas». \n\nIndicar se a pastagem é semeada ou natural."
                      }
                    />
                  </Stack>
                  Tipo de Pastagem Permanente Biodiversa
                </StyledTableHead>
                <StyledTableHead rowSpan={3} sx={{ minWidth: 100 }}>
                  <Stack direction="row" justifyContent="right">
                    pastagem
                    <BasicPopover
                      text={
                        "Indicar o grau de cobertura do coberto vegetal (vegetação herbácea):  \n- grau de cobertura elevado - ≥ 80%; \n - grau de cobertura médio – > 40% e < 80%; \n - grau de cobertura fraco - ≤ 40%"
                      }
                    />
                  </Stack>
                  Estado geral da pastagem
                </StyledTableHead>
                <StyledTableHead rowSpan={3} sx={{ minWidth: 110 }}>
                  <Stack direction="row" justifyContent="right">
                    <BasicPopover
                      text={
                        "No caso do regime ecológico «maneio da pastagem permanente» indicar se a presença de leguminosas é adequada, fraca ou ausente na subparcela/zona homogénea.\n\n No caso da intervenção agroambiental «conservação do solo - pastagens biodiversas» identificar as diferentes espécies de leguminosas presentes na subparcela/zona homogénea."
                      }
                    />
                  </Stack>
                  Presença de leguminosas
                </StyledTableHead>
                <StyledTableHead rowSpan={3} sx={{ minWidth: 110 }}>
                  <Stack direction="row" justifyContent="right">
                    <BasicPopover
                      text={
                        "Indicar o tipo de estrutura utilizado no parqueamento do gado, quando existente: \n - Vedação/cerca fixa;\n - Cerca móvel;\n  - Cerca elétrica;\n  - Outras"
                      }
                    />
                  </Stack>
                  Estruturas de parqueamento do gado
                </StyledTableHead>
                <StyledTableHead rowSpan={3} sx={{ minWidth: 110 }}>
                  <Stack direction="row" justifyContent="right">
                    <BasicPopover
                      text={
                        "Indicar tipo de ponto de água. Preencher campo com os seguintes valores: \n - Bebedouro;\n - Charca; \n - Cisterna;\n- Tanque; \n - Reservatório; \n - Outros;\n - Não existem "
                      }
                    />
                  </Stack>
                  Pontos de água acessíveis ao gado
                </StyledTableHead>
                <StyledTableHead colSpan={4}>
                  Área intervencionada (ha)
                </StyledTableHead>
                <StyledTableHead rowSpan={3} width={150}>
                  Ações
                </StyledTableHead>
              </TableRow>
              <TableRow>
                <StyledTableHead colSpan={4}>
                  Tipo de intervenção
                </StyledTableHead>
              </TableRow>
              <TableRow>
                <StyledTableHead sx={{ minWidth: 70 }}>
                  <Stack direction="row" justifyContent="right">
                    <BasicPopover
                      text={
                        "Preencher campo com o valor 'X'. \nÉ obrigatório o registo do planeamento do maneio do efetivo pecuário (carga animal, duração do pastoreio em cada parcela, alternância entre as parcelas a pastorear) para o período de 3 anos, no caso do regime ecológico «maneio da pastagem permanente» e de 5 anos, no caso da intervenção «conservação do solo - pastagens biodiversas» . \n\n Devem ser preenchidos os quadros 2 e 6, consoante as necessidades de intervenção observadas na avaliação global das pastagens permanentes no que diz respeito ao maneio do efetivo pecuário."
                      }
                    />
                  </Stack>
                  Maneio Pastoreio
                </StyledTableHead>
                <StyledTableHead sx={{ minWidth: 70 }}>
                  <Stack direction="row" justifyContent="right">
                    <BasicPopover
                      text={
                        "Preencher campo com o valor 'X' quando o presente plano propuser ações que visem o controlo de vegetação arbustiva para evitar a degradação da pastagem.\n\n Quando o campo 'controlo vegetação arbustiva' for assinalado com 'X' deve ser preenchido o quadro 3."
                      }
                    />
                  </Stack>
                  Controlo vegetação arbustiva
                </StyledTableHead>
                <StyledTableHead sx={{ minWidth: 70 }}>
                  <Stack direction="row" justifyContent="right">
                    <BasicPopover
                      text={
                        "Preencher campo com o valor 'X' quando o Plano de Fertilização para as subparcelas candidatas (regime ecológico ou intervenção agroambiental) propôr a realização de correções e/ou fertilizações. "
                      }
                    />
                  </Stack>
                  Correcções/Fertilizações
                </StyledTableHead>
                <StyledTableHead>
                  <Stack direction="row" justifyContent="right">
                    <BasicPopover
                      text={
                        "Preencher campo com o valor 'X' quando o presente plano propuser ações no sentido de melhorar a composição florística/espécies pratenses da subparcela em causa. \n\n Quando o campo 'sementeira/ressementeira/melhoria da pp' for assinalado com 'X' devem ser preenchidos os quadros 4 e 5 (nos campos aplicáveis). "
                      }
                    />
                  </Stack>
                  Sementeira/ ressementeira/ melhoria PP
                </StyledTableHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {createTable && (
                <>
                  <TableRow>
                    <StyledTableCell>
                      <CustomTextField
                        name="parcela"
                        value={obj_anexo?.parcela === undefined ? '' : obj_anexo?.parcela}
                        onChange={onInputChange}
                        error={flag_erro_parcela}
                        helperText={flag_erro_parcela ? 'Valor numérico obrigatório' : ""}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="subparcela"
                        value={obj_anexo?.subparcela === undefined ? '' : obj_anexo?.subparcela}
                        onChange={onInputChange}
                        error={flag_erro_subparcela}
                        helperText={flag_erro_subparcela ? 'Valor numérico obrigatório' : ""}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="zona_homo"
                        value={obj_anexo?.zona_homo === undefined ? '' : obj_anexo?.zona_homo}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="area"
                        value={obj_anexo?.area === undefined ? '' : obj_anexo?.area}
                        onChange={onInputChange}
                        error={flag_erro_area}
                        helperText={flag_erro_area ? 'Valor numérico obrigatório' : ""}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="tipo_pastagem"
                        value={obj_anexo?.tipo_pastagem === undefined ? '' : obj_anexo?.tipo_pastagem}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomSelect
                        value={obj_anexo?.estado_pastagem === undefined ? '' : obj_anexo?.estado_pastagem}
                        name="estado_pastagem"
                        onChange={onInputChange}
                        options={pastagem}
                        label="Estado geral"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="presenca_leguminosas"
                        value={obj_anexo?.presenca_leguminosas === undefined ? '' : obj_anexo?.presenca_leguminosas}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomSelect
                        value={obj_anexo?.estruturas_gado === undefined ? '' : obj_anexo?.estruturas_gado}
                        name="estruturas_gado"
                        onChange={onInputChange}
                        options={parqueamento}
                        label="Estrutura de parqueamento"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomSelect
                        value={obj_anexo?.pontos_agua === undefined ? '' : obj_anexo?.pontos_agua}
                        name="pontos_agua"
                        onChange={onInputChange}
                        options={pontodeagua}
                        label="Pontos de água acessíveis"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="maneiro"
                        value={obj_anexo?.maneiro === undefined ? '' : obj_anexo?.maneiro}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="controlo_vegetacao"
                        value={obj_anexo?.controlo_vegetacao === undefined ? '' : obj_anexo?.controlo_vegetacao}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="corecoes"
                        value={obj_anexo?.corecoes === undefined ? '' : obj_anexo?.corecoes}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomTextField
                        name="sementeira"
                        value={obj_anexo?.sementeira === undefined ? '' : obj_anexo?.sementeira}
                        onChange={onInputChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Stack direction="row" justifyContent="center">
                        <ButtonCadernos
                          mostrarBotaoCancelar
                          aoClicarCancelar={() => {
                            setCreateTable(false)
                            set_obj_anexo(undefined)
                          }}
                          mostrarBotaoGravar
                          aoClicarGravar={() => handle_create_anexo()}
                        />
                      </Stack>
                    </StyledTableCell>
                  </TableRow>
                </>
              )}

              {(rowsPerPage > 0
                ? obj_anexo_lista?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                : obj_anexo_lista
              ).map((row, key) => {
                return (
                  <TableRow key={key}>
                    {obj_anexo?.id_caraterizacao === row.id_caraterizacao && flag_criar_novo_anexo === true ? (
                      <>
                        <StyledTableCell>
                          <CustomTextField
                            name="parcela"
                            value={obj_anexo.parcela === undefined ? '' : obj_anexo.parcela}
                            onChange={onInputChange}
                            error={flag_erro_parcela}
                            helperText={flag_erro_parcela ? 'Valor numérico obrigatório' : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="subparcela"
                            value={obj_anexo.subparcela === undefined ? '' : obj_anexo.subparcela}
                            onChange={onInputChange}
                            error={flag_erro_subparcela}
                            helperText={flag_erro_subparcela ? 'Valor numérico obrigatório' : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="zona_homo"
                            value={obj_anexo.zona_homo === undefined ? '' : obj_anexo.zona_homo}
                            onChange={onInputChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="area"
                            value={obj_anexo.area === undefined ? '' : obj_anexo.area}
                            onChange={onInputChange}
                            error={flag_erro_area}
                            helperText={flag_erro_area ? 'Valor numérico obrigatório' : ""}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="tipo_pastagem"
                            value={obj_anexo.tipo_pastagem === undefined ? '' : obj_anexo.tipo_pastagem}
                            onChange={onInputChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomSelect
                            value={obj_anexo.estado_pastagem === undefined ? '' : obj_anexo.estado_pastagem}
                            name="estado_pastagem"
                            onChange={onInputChange}
                            options={pastagem}
                            label="Estado geral"
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="presenca_leguminosas"
                            value={obj_anexo.presenca_leguminosas === undefined ? '' : obj_anexo.presenca_leguminosas}
                            onChange={onInputChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomSelect
                            value={obj_anexo.estruturas_gado === undefined ? '' : obj_anexo.estruturas_gado}
                            name="estruturas_gado"
                            onChange={onInputChange}
                            options={parqueamento}
                            label="Estrutura de parqueamento"
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomSelect
                            value={obj_anexo.pontos_agua === undefined ? '' : obj_anexo.pontos_agua}
                            name="pontos_agua"
                            onChange={onInputChange}
                            options={pontodeagua}
                            label="Pontos de água acessíveis"
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="maneiro"
                            value={obj_anexo.maneiro === undefined ? '' : obj_anexo.maneiro}
                            onChange={onInputChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="controlo_vegetacao"
                            value={obj_anexo.controlo_vegetacao === undefined ? '' : obj_anexo.controlo_vegetacao}
                            onChange={onInputChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="corecoes"
                            value={obj_anexo.corecoes === undefined ? '' : obj_anexo.corecoes}
                            onChange={onInputChange}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <CustomTextField
                            name="sementeira"
                            value={obj_anexo.sementeira === undefined ? '' : obj_anexo.sementeira}
                            onChange={onInputChange}
                          />
                        </StyledTableCell>
                      </>
                    ) : (
                      <>
                        <StyledTableCell>{row.parcela}</StyledTableCell>
                        <StyledTableCell>{row.subparcela}</StyledTableCell>
                        <StyledTableCell>{row.zona_homo}</StyledTableCell>
                        <StyledTableCell>{row.area}</StyledTableCell>
                        <StyledTableCell>{row.tipo_pastagem}</StyledTableCell>
                        <StyledTableCell>{row.estado_pastagem}</StyledTableCell>
                        <StyledTableCell>
                          {row.presenca_leguminosas}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row.estruturas_gado}
                        </StyledTableCell>
                        <StyledTableCell>{row.pontos_agua}</StyledTableCell>
                        <StyledTableCell>{row.maneiro} </StyledTableCell>
                        <StyledTableCell>
                          {row.controlo_vegetacao}
                        </StyledTableCell>
                        <StyledTableCell>{row.corecoes} </StyledTableCell>
                        <StyledTableCell>{row.sementeira} </StyledTableCell>
                      </>
                    )}

                    {obj_anexo?.id_caraterizacao === row.id_caraterizacao ? (
                      <StyledTableCell>
                        <ButtonCadernos
                          mostrarBotaoGravar
                          aoClicarGravar={() => handle_update_anexo()}
                          mostrarBotaoCancelar
                          aoClicarCancelar={() => set_obj_anexo(undefined)}
                        />
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell>
                        <ButtonCadernos
                          mostrarBotaoEditar
                          aoClicarEditar={() => handleEdit(row)}
                          mostrarBotaoApagar
                          aoClicarApagar={() =>
                            handleClickOpenDelete(row)
                          }
                        />
                      </StyledTableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow sx={{ width: "100%" }}>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
                  colSpan={18}
                  count={obj_anexo_lista.length}
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
        )}
        <ConfirmDialog
          open={open_dialog_tem_a_certeza_que_quer_eliminar}
          onClose={() => set_open_dialog_tem_a_certeza_que_quer_eliminar(false)}
          onConfirm={handle_delete_anexo}
          message="Deseja eliminar o registo?"
        />
      </TableContainer>
    </CustomThemeProvider>
  );
};
