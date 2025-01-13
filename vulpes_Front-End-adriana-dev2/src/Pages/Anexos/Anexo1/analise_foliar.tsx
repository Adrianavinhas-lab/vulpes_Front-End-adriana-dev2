import React from "react";
import { useState } from "react";
import { Paper, Snackbar, Stack, TextField } from "@mui/material";
import { TableBody, TableContainer, TableHead } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import {
    CustomSelect,
    CustomTextField,
    CustomThemeProvider,
} from "../../../Styles/theme/customThemeprovider";
import BasicPopover from "../../../Components/Popover";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import {
    StyledTableCell,
    StyledTableHead,
} from "../../../Styles/tabelCellStyled/customTableCell";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import { Alert } from "../../../Components/Alert/Alert";
import { IFoliar } from "../../../Interfaces/anexos/anexo1/analise_e_foliar1_1_3";
import { del } from "../../../Services/tokenConfig";
import { func_print } from "../../../Func_genericas/func_print";
import { ICabecalho } from "../../../Interfaces/anexos/anexo1/analise_e_foliar1_1_3";
import { analise_foliar_1_3_classificacao } from "../../../informacao_estatica";

interface AnaliseFoliar_prop {
    obj_anexo_cabecalho_selecionado: ICabecalho | undefined;
}


export const AnaliseFoliar: React.FC<AnaliseFoliar_prop> = ({ obj_anexo_cabecalho_selecionado }) => {
    const [createTable, setCreateTable] = useState(false);
    const [message, setMessage] = useState("");
    const [openSnackSuccess, setOpenSnackSuccess] = useState(false);
    const [openSnackError, setOpenSnackError] = useState(false);
    const [obj_anexo, set_obj_anexo] = useState<IFoliar>();
    const [error_resultado_camp1, set_error_resultado_camp1] = React.useState(false);
    const [error_resultado_camp2, set_error_resultado_camp2] = React.useState(false);
    const [error_resultado_camp3, set_error_resultado_camp3] = React.useState(false);
    const [error_resultado_camp4, set_error_resultado_camp4] = React.useState(false);
    const [error_resultado_camp5, set_error_resultado_camp5] = React.useState(false);
    const [error_resultado_camp6, set_error_resultado_camp6] = React.useState(false);
    const [error_resultado_camp7, set_error_resultado_camp7] = React.useState(false);
    const [error_resultado_camp8, set_error_resultado_camp8] = React.useState(false);
    const [error_resultado_camp9, set_error_resultado_camp9] = React.useState(false);
    const [error_resultado_camp10, set_error_resultado_camp10] = React.useState(false);
    const [error_resultado_camp11, set_error_resultado_camp11] = React.useState(false);
    const [error_classificacao_camp1, set_error_classificacao_camp1] = React.useState(false);
    const [error_classificacao_camp2, set_error_classificacao_camp2] = React.useState(false);
    const [error_classificacao_camp3, set_error_classificacao_camp3] = React.useState(false);
    const [error_classificacao_camp4, set_error_classificacao_camp4] = React.useState(false);
    const [error_classificacao_camp5, set_error_classificacao_camp5] = React.useState(false);
    const [error_classificacao_camp6, set_error_classificacao_camp6] = React.useState(false);
    const [error_classificacao_camp7, set_error_classificacao_camp7] = React.useState(false);
    const [error_classificacao_camp8, set_error_classificacao_camp8] = React.useState(false);
    const [error_classificacao_camp9, set_error_classificacao_camp9] = React.useState(false);
    const [error_classificacao_camp10, set_error_classificacao_camp10] = React.useState(false);
    const [error_classificacao_camp11, set_error_classificacao_camp11] = React.useState(false);
    const [obj_anexo_lista, set_obj_anexo_lista] = useState<IFoliar[]>([]);
    const [open_dialog_tem_a_certeza_que_quer_eliminar, set_open_dialog_tem_a_certeza_que_quer_eliminar] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    // EDITAR
    const handleEdit = () => {

    };
    // onChange criar
    const onInputChange = (event: any) => {
        const { name, value, type, checked } = event.target;
        let aux_obj_anexo: any = obj_anexo === undefined ? {} : obj_anexo

        if (type === "checkbox") {
            aux_obj_anexo[name] = aux_obj_anexo[name] === undefined ? true : !aux_obj_anexo[name]
            set_obj_anexo(aux_obj_anexo);

        } else {
            if (name === 'resultado_camp1') {
                if (!/^\d+$/.test(value)) {
                    set_error_resultado_camp1(true)
                } else {
                    set_error_resultado_camp1(false)
                }
            }
            if (name === 'resultado_camp2') {
                if (!/^\d+$/.test(value)) {
                    set_error_resultado_camp2(true)
                } else {
                    set_error_resultado_camp2(false)
                }
            }
            if (name === 'resultado_camp3') {
                if (!/^\d+$/.test(value)) {
                    set_error_resultado_camp3(true)
                } else {
                    set_error_resultado_camp3(false)
                }
            }
            if (name === 'resultado_camp4') {
                if (!/^\d+$/.test(value)) {
                    set_error_resultado_camp4(true)
                } else {
                    set_error_resultado_camp4(false)
                }
            }
            if (name === 'resultado_camp5') {
                if (!/^\d+$/.test(value)) {
                    set_error_resultado_camp5(true)
                } else {
                    set_error_resultado_camp5(false)
                }
            }
            if (name === 'resultado_camp6') {
                if (!/^\d+$/.test(value)) {
                    set_error_resultado_camp6(true)
                } else {
                    set_error_resultado_camp6(false)
                }
            }
            if (name === 'resultado_camp7') {
                if (!/^\d+$/.test(value)) {
                    set_error_resultado_camp7(true)
                } else {
                    set_error_resultado_camp7(false)
                }
            }
            if (name === 'resultado_camp8') {
                if (!/^\d+$/.test(value)) {
                    set_error_resultado_camp8(true)
                } else {
                    set_error_resultado_camp8(false)
                }
            }
            if (name === 'resultado_camp9') {
                if (!/^\d+$/.test(value)) {
                    set_error_resultado_camp9(true)
                } else {
                    set_error_resultado_camp9(false)
                }
            }
            if (name === 'resultado_camp10') {
                if (!/^\d+$/.test(value)) {
                    set_error_resultado_camp10(true)
                } else {
                    set_error_resultado_camp10(false)
                }
            }
            if (name === 'resultado_camp11') {
                if (!/^\d+$/.test(value)) {
                    set_error_resultado_camp11(true)
                } else {
                    set_error_resultado_camp11(false)
                }
            }
            if (name === 'classificacao_camp1') {
                if (!/^\d+$/.test(value)) {
                    set_error_classificacao_camp1(true)
                } else {
                    set_error_classificacao_camp1(false)
                }
            }
            if (name === 'classificacao_camp2') {
                if (!/^\d+$/.test(value)) {
                    set_error_classificacao_camp2(true)
                } else {
                    set_error_classificacao_camp2(false)
                }
            }
            if (name === 'classificacao_camp3') {
                if (!/^\d+$/.test(value)) {
                    set_error_classificacao_camp3(true)
                } else {
                    set_error_classificacao_camp3(false)
                }
            }
            if (name === 'classificacao_camp4') {
                if (!/^\d+$/.test(value)) {
                    set_error_classificacao_camp4(true)
                } else {
                    set_error_classificacao_camp4(false)
                }
            }
            if (name === 'classificacao_camp5') {
                if (!/^\d+$/.test(value)) {
                    set_error_classificacao_camp5(true)
                } else {
                    set_error_classificacao_camp5(false)
                }
            }
            if (name === 'classificacao_camp6') {
                if (!/^\d+$/.test(value)) {
                    set_error_classificacao_camp6(true)
                } else {
                    set_error_classificacao_camp6(false)
                }
            }
            if (name === 'classificacao_camp7') {
                if (!/^\d+$/.test(value)) {
                    set_error_classificacao_camp7(true)
                } else {
                    set_error_classificacao_camp7(false)
                }
            }
            if (name === 'classificacao_camp8') {
                if (!/^\d+$/.test(value)) {
                    set_error_classificacao_camp8(true)
                } else {
                    set_error_classificacao_camp8(false)
                }
            }
            if (name === 'classificacao_camp9') {
                if (!/^\d+$/.test(value)) {
                    set_error_classificacao_camp9(true)
                } else {
                    set_error_classificacao_camp9(false)
                }
            }
            if (name === 'classificacao_camp10') {
                if (!/^\d+$/.test(value)) {
                    set_error_classificacao_camp10(true)
                } else {
                    set_error_classificacao_camp10(false)
                }
            }
            if (name === 'classificacao_camp11') {
                if (!/^\d+$/.test(value)) {
                    set_error_classificacao_camp11(true)
                } else {
                    set_error_classificacao_camp11(false)
                }
            }
            set_obj_anexo((old: any) => ({
                ...old,
                [name]: value,
            }));

        };

    };

    const handle_delete_anexo = async () => {
        try {
            setIsLoading(true);

            let res = await del(
                `delete__reg_anexo_dois_operacoes_melhoria_tres/${obj_anexo?.id_anexo_um_tres}`
            );
            if (res.status === 200) {
                let lista_aux: any = obj_anexo_lista.filter((el) => {
                    if (el.id_anexo_um_tres !== obj_anexo?.id_anexo_um_tres) {
                        return el
                    }
                })
                set_obj_anexo_lista(lista_aux === undefined ? [] : lista_aux)
                set_obj_anexo(undefined)
                setMessage("Registo eliminado com sucesso!");
                set_open_dialog_tem_a_certeza_que_quer_eliminar(false);
                setOpenSnackSuccess(true);

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

    return (
        <>
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
                    <table style={{ width: "100%" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    colSpan={11}
                                    sx={{
                                        fontWeight: 600,
                                        textAlign: "left",
                                        fontFamily: "candara",
                                        fontSize: 16,
                                    }}
                                >
                                    1.3 - Análise foliar
                                    <BasicPopover
                                        text={
                                            "Preenchimento obrigatório para os beneficiários candidatos ao regime ecológico A.3.2 - PRODI. Estes valores servirão de auxilio para o preenchimento do campo «Nutrientes disponibilizados por tipo de fertilizantes» do quadro 3 - Plano de Aplicação.\n\nOs boletins de análise devem ser apresentados sempre que forem solicitados pelos técnicos que monitorizam as intervenções no âmbito do PEPAC."
                                        }
                                    />
                                </TableCell>
                                {createTable === false ?
                                    <TableCell>
                                        <Stack direction="row" justifyContent="end">
                                            <BarraDeFerramentas
                                                mostrarBotaoNovo
                                                textoBotaoNovo="Registar"
                                                aoClicarNovo={() => setCreateTable(true)}
                                            />
                                        </Stack>
                                    </TableCell>
                                    :
                                    <TableCell>
                                        <ButtonCadernos
                                            mostrarBotaoCancelar
                                            aoClicarCancelar={() => setCreateTable(false)}
                                            mostrarBotaoGravar
                                            aoClicarGravar={() => { }}
                                        />
                                    </TableCell>

                                }
                            </TableRow>

                            <TableRow>
                                <StyledTableHead>Elemento</StyledTableHead>
                                <StyledTableHead>
                                    N (%) <BasicPopover text="Azoto" />
                                </StyledTableHead>
                                <StyledTableHead>
                                    P (%) <BasicPopover text="Fósforo" />
                                </StyledTableHead>
                                <StyledTableHead>
                                    K (%) <BasicPopover text="Potássio" />
                                </StyledTableHead>
                                <StyledTableHead>
                                    Ca (%) <BasicPopover text="Cálcio" />
                                </StyledTableHead>
                                <StyledTableHead>
                                    Mg (%) <BasicPopover text="Magnésio" />
                                </StyledTableHead>
                                <StyledTableHead>
                                    S (%) <BasicPopover text="Enxofre" />
                                </StyledTableHead>
                                <StyledTableHead>
                                    Fe (mg/kg) <BasicPopover text="Ferro" />
                                </StyledTableHead>
                                <StyledTableHead>
                                    Mn (mg/kg) <BasicPopover text="Manganês" />
                                </StyledTableHead>
                                <StyledTableHead>
                                    Zn (mg/kg)
                                    <BasicPopover text="Zinco" />
                                </StyledTableHead>
                                <StyledTableHead>
                                    Cu (mg/kg) <BasicPopover text="Cobre" />
                                </StyledTableHead>
                                <StyledTableHead>
                                    B (mg/kg) <BasicPopover text="Boro" />
                                </StyledTableHead>
                            </TableRow>
                            <TableRow>
                                <StyledTableHead>Resultado análises</StyledTableHead>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableHead>Classificação</StyledTableHead>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    sx={{
                                        fontWeight: 600,
                                        fontFamily: "candara",
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        sx={{ justifyContent: "center", alignItems: "center" }}
                                    >
                                        Data da colheita da água:
                                    </Stack>
                                </TableCell>
                                <TableCell
                                    colSpan={3}
                                    sx={{
                                        fontWeight: 600,
                                        fontFamily: "candara",
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        sx={{ justifyContent: "center", alignItems: "center" }}
                                    >
                                        Data emissão resultados:
                                    </Stack>
                                </TableCell>
                                <TableCell
                                    colSpan={3}
                                    sx={{
                                        fontWeight: 600,
                                        fontFamily: "candara",
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        sx={{ justifyContent: "center", alignItems: "center" }}
                                    >
                                        N.º de amostras
                                    </Stack>
                                </TableCell>
                                <TableCell
                                    colSpan={3}
                                    sx={{
                                        fontWeight: 600,
                                        fontFamily: "candara",
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        sx={{ justifyContent: "center", alignItems: "center" }}
                                    >
                                        N.º do Boletim:
                                    </Stack>
                                </TableCell>
                            </TableRow>

                        </TableHead>

                        <TableBody>
                            {createTable === true && (
                                <>
                                    <TableRow>
                                        <StyledTableHead>Elemento</StyledTableHead>
                                        <StyledTableHead>
                                            N (%) <BasicPopover text="Azoto" />
                                        </StyledTableHead>
                                        <StyledTableHead>
                                            P (%) <BasicPopover text="Fósforo" />
                                        </StyledTableHead>
                                        <StyledTableHead>
                                            K (%) <BasicPopover text="Potássio" />
                                        </StyledTableHead>
                                        <StyledTableHead>
                                            Ca (%) <BasicPopover text="Cálcio" />
                                        </StyledTableHead>
                                        <StyledTableHead>
                                            Mg (%) <BasicPopover text="Magnésio" />
                                        </StyledTableHead>
                                        <StyledTableHead>
                                            S (%) <BasicPopover text="Enxofre" />
                                        </StyledTableHead>
                                        <StyledTableHead>
                                            Fe (mg/kg) <BasicPopover text="Ferro" />
                                        </StyledTableHead>
                                        <StyledTableHead>
                                            Mn (mg/kg) <BasicPopover text="Manganês" />
                                        </StyledTableHead>
                                        <StyledTableHead>
                                            Zn (mg/kg)
                                            <BasicPopover text="Zinco" />
                                        </StyledTableHead>
                                        <StyledTableHead>
                                            Cu (mg/kg) <BasicPopover text="Cobre" />
                                        </StyledTableHead>
                                        <StyledTableHead>
                                            B (mg/kg) <BasicPopover text="Boro" />
                                        </StyledTableHead>
                                    </TableRow>
                                    <TableRow>
                                        <StyledTableHead>Resultado análises</StyledTableHead>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="resultado_camp1"
                                                value={obj_anexo?.resultado_camp1 === undefined ? '' : obj_anexo?.resultado_camp1}
                                                onChange={onInputChange}
                                                error={error_resultado_camp1}
                                                helperText={error_resultado_camp1 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="resultado_camp2"
                                                value={obj_anexo?.resultado_camp2 === undefined ? '' : obj_anexo?.resultado_camp2}
                                                onChange={onInputChange}
                                                error={error_resultado_camp2}
                                                helperText={error_resultado_camp2 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="resultado_camp3"
                                                value={obj_anexo?.resultado_camp3 === undefined ? '' : obj_anexo?.resultado_camp3}
                                                onChange={onInputChange}
                                                error={error_resultado_camp3}
                                                helperText={error_resultado_camp3 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="resultado_camp4"
                                                value={obj_anexo?.resultado_camp4 === undefined ? '' : obj_anexo?.resultado_camp4}
                                                onChange={onInputChange}
                                                error={error_resultado_camp4}
                                                helperText={error_resultado_camp4 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="resultado_camp5"
                                                value={obj_anexo?.resultado_camp5 === undefined ? '' : obj_anexo?.resultado_camp5}
                                                onChange={onInputChange}
                                                error={error_resultado_camp5}
                                                helperText={error_resultado_camp5 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="resultado_camp6"
                                                value={obj_anexo?.resultado_camp6 === undefined ? '' : obj_anexo?.resultado_camp6}
                                                onChange={onInputChange}
                                                error={error_resultado_camp6}
                                                helperText={error_resultado_camp6 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="resultado_camp7"
                                                value={obj_anexo?.resultado_camp7 === undefined ? '' : obj_anexo?.resultado_camp7}
                                                onChange={onInputChange}
                                                error={error_resultado_camp7}
                                                helperText={error_resultado_camp7 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="resultado_camp8"
                                                value={obj_anexo?.resultado_camp8 === undefined ? '' : obj_anexo?.resultado_camp8}
                                                onChange={onInputChange}
                                                error={error_resultado_camp8}
                                                helperText={error_resultado_camp8 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="resultado_camp9"
                                                value={obj_anexo?.resultado_camp9 === undefined ? '' : obj_anexo?.resultado_camp9}
                                                onChange={onInputChange}
                                                error={error_resultado_camp9}
                                                helperText={error_resultado_camp9 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="resultado_camp10"
                                                value={obj_anexo?.resultado_camp10 === undefined ? '' : obj_anexo?.resultado_camp10}
                                                onChange={onInputChange}
                                                error={error_resultado_camp10}
                                                helperText={error_resultado_camp10 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="resultado_camp11"
                                                value={obj_anexo?.resultado_camp11 === undefined ? '' : obj_anexo?.resultado_camp11}
                                                onChange={onInputChange}
                                                error={error_resultado_camp11}
                                                helperText={error_resultado_camp11 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <StyledTableHead>Classificação</StyledTableHead>
                                        <StyledTableCell>
                                            <CustomSelect
                                                value={obj_anexo?.classificacao_camp1 === undefined ? '' : obj_anexo?.classificacao_camp1}
                                                name="classificacao_camp1"
                                                onChange={onInputChange}
                                                options={analise_foliar_1_3_classificacao}
                                                label=""
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>

                                            <CustomSelect
                                                value={obj_anexo?.classificacao_camp2 === undefined ? '' : obj_anexo?.classificacao_camp2}
                                                name="classificacao_camp2"
                                                onChange={onInputChange}
                                                options={analise_foliar_1_3_classificacao}
                                                label=""
                                            />

                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomSelect
                                                value={obj_anexo?.classificacao_camp3 === undefined ? '' : obj_anexo?.classificacao_camp3}
                                                name="classificacao_camp3"
                                                onChange={onInputChange}
                                                options={analise_foliar_1_3_classificacao}
                                                label=""
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomSelect
                                                value={obj_anexo?.classificacao_camp4 === undefined ? '' : obj_anexo?.classificacao_camp4}
                                                name="classificacao_camp4"
                                                onChange={onInputChange}
                                                options={analise_foliar_1_3_classificacao}
                                                label=""
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomSelect
                                                name="classificacao_camp5"
                                                value={obj_anexo?.classificacao_camp5 === undefined ? '' : obj_anexo?.classificacao_camp5}
                                                onChange={onInputChange}
                                                options={analise_foliar_1_3_classificacao}
                                                label=""
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomSelect
                                                name="classificacao_camp6"
                                                value={obj_anexo?.classificacao_camp6 === undefined ? '' : obj_anexo?.classificacao_camp6}
                                                onChange={onInputChange}
                                                options={analise_foliar_1_3_classificacao}
                                                label=""
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomSelect
                                                name="classificacao_camp7"
                                                value={obj_anexo?.classificacao_camp7 === undefined ? '' : obj_anexo?.classificacao_camp7}
                                                onChange={onInputChange}
                                                options={analise_foliar_1_3_classificacao}
                                                label=""
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomSelect
                                                name="classificacao_camp8"
                                                value={obj_anexo?.classificacao_camp8 === undefined ? '' : obj_anexo?.classificacao_camp8}
                                                onChange={onInputChange}
                                                options={analise_foliar_1_3_classificacao}
                                                label=""
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomSelect
                                                name="classificacao_camp9"
                                                value={obj_anexo?.classificacao_camp9 === undefined ? '' : obj_anexo?.classificacao_camp9}
                                                onChange={onInputChange}
                                                options={analise_foliar_1_3_classificacao}
                                                label=""
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomSelect
                                                name="classificacao_camp10"
                                                value={obj_anexo?.classificacao_camp10 === undefined ? '' : obj_anexo?.classificacao_camp10}
                                                onChange={onInputChange}
                                                options={analise_foliar_1_3_classificacao}
                                                label=""
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomSelect
                                                name="classificacao_camp11"
                                                value={obj_anexo?.classificacao_camp11 === undefined ? '' : obj_anexo?.classificacao_camp11}
                                                onChange={onInputChange}
                                                options={analise_foliar_1_3_classificacao}
                                                label=""
                                            />
                                        </StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            sx={{
                                                fontWeight: 600,
                                                fontFamily: "candara",
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                sx={{ justifyContent: "center", alignItems: "center" }}
                                            >
                                                Data da colheita da água:
                                                <TextField
                                                    variant="filled"
                                                    name="data_colheita"
                                                    type="date"
                                                    inputProps={{
                                                        style: { fontSize: 12, fontFamily: "verdana" },
                                                    }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={obj_anexo?.data_colheita === undefined ? '' : obj_anexo?.data_colheita}

                                                    onChange={onInputChange}
                                                />
                                            </Stack>
                                        </TableCell>
                                        <TableCell
                                            colSpan={3}
                                            sx={{
                                                fontWeight: 600,
                                                fontFamily: "candara",
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                sx={{ justifyContent: "center", alignItems: "center" }}
                                            >
                                                Data emissão resultados:
                                                <TextField
                                                    variant="filled"
                                                    name="data_resultados"
                                                    type="date"
                                                    inputProps={{
                                                        style: { fontSize: 12, fontFamily: "verdana" },
                                                    }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={obj_anexo?.data_resultados === undefined ? '' : obj_anexo?.data_resultados}

                                                    onChange={onInputChange}
                                                />
                                            </Stack>
                                        </TableCell>
                                        <TableCell
                                            colSpan={3}
                                            sx={{
                                                fontWeight: 600,
                                                fontFamily: "candara",
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                sx={{ justifyContent: "center", alignItems: "center" }}
                                            >
                                                N.º de amostras
                                                <CustomTextField
                                                    name="n_amostras"
                                                    value={obj_anexo?.n_amostras === undefined ? '' : obj_anexo?.n_amostras}
                                                    onChange={onInputChange}
                                                />
                                            </Stack>
                                        </TableCell>
                                        <TableCell
                                            colSpan={3}
                                            sx={{
                                                fontWeight: 600,
                                                fontFamily: "candara",
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                sx={{ justifyContent: "center", alignItems: "center" }}
                                            >
                                                N.º do Boletim:
                                                <CustomTextField
                                                    name="n_boletin"
                                                    value={obj_anexo?.n_boletin === undefined ? '' : obj_anexo?.n_boletin}
                                                    onChange={onInputChange}
                                                />
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                </>
                            )}

                            {obj_anexo_lista.map((row, key) => {
                                if (row.id_anexo_um_tres === obj_anexo?.id_anexo_um_tres) {
                                    return (
                                        <>
                                            <TableRow key={key}>
                                                <TableCell
                                                    colSpan={11}
                                                    sx={{
                                                        fontWeight: 600,
                                                        textAlign: "left",
                                                        fontFamily: "candara",
                                                        fontSize: 16,
                                                    }}
                                                >
                                                    1.3 - Análise foliar
                                                    <BasicPopover
                                                        text={
                                                            "Preenchimento obrigatório para os beneficiários candidatos ao regime ecológico A.3.2 - PRODI. Estes valores servirão de auxilio para o preenchimento do campo «Nutrientes disponibilizados por tipo de fertilizantes» do quadro 3 - Plano de Aplicação.\n\nOs boletins de análise devem ser apresentados sempre que forem solicitados pelos técnicos que monitorizam as intervenções no âmbito do PEPAC."
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell colSpan={12}>
                                                    <Stack direction="row" justifyContent="end">
                                                        <ButtonCadernos
                                                            mostrarBotaoEditar
                                                            aoClicarEditar={() => handleEdit()}
                                                            mostrarBotaoApagar
                                                            aoClicarApagar={() => { }}
                                                        />
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <StyledTableHead>Elemento</StyledTableHead>
                                                <StyledTableHead>
                                                    N (%) <BasicPopover text="Azoto" />
                                                </StyledTableHead>
                                                <StyledTableHead>
                                                    P (%) <BasicPopover text="Fósforo" />
                                                </StyledTableHead>
                                                <StyledTableHead>
                                                    K (%) <BasicPopover text="Potássio" />
                                                </StyledTableHead>
                                                <StyledTableHead>
                                                    Ca (%) <BasicPopover text="Cálcio" />
                                                </StyledTableHead>
                                                <StyledTableHead>
                                                    Mg (%) <BasicPopover text="Magnésio" />
                                                </StyledTableHead>
                                                <StyledTableHead>
                                                    S (%) <BasicPopover text="Enxofre" />
                                                </StyledTableHead>
                                                <StyledTableHead>
                                                    Fe (mg/kg) <BasicPopover text="Ferro" />
                                                </StyledTableHead>
                                                <StyledTableHead>
                                                    Mn (mg/kg) <BasicPopover text="Manganês" />
                                                </StyledTableHead>
                                                <StyledTableHead>
                                                    Zn (mg/kg)
                                                    <BasicPopover text="Zinco" />
                                                </StyledTableHead>
                                                <StyledTableHead>
                                                    Cu (mg/kg) <BasicPopover text="Cobre" />
                                                </StyledTableHead>
                                                <StyledTableHead>
                                                    B (mg/kg) <BasicPopover text="Boro" />
                                                </StyledTableHead>
                                            </TableRow>


                                            <TableRow>
                                                <StyledTableHead>
                                                    Resultado análises
                                                </StyledTableHead>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        name="resultado_camp1"
                                                        value={obj_anexo?.resultado_camp1 === undefined ? '' : obj_anexo?.resultado_camp1}
                                                        onChange={onInputChange}
                                                        error={error_resultado_camp1}
                                                        helperText={error_resultado_camp1 ? "Apenas números são aceites" : ""}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        name="resultado_camp2"
                                                        value={obj_anexo?.resultado_camp2 === undefined ? '' : obj_anexo?.resultado_camp2}
                                                        onChange={onInputChange}
                                                        error={error_resultado_camp2}
                                                        helperText={error_resultado_camp2 ? "Apenas números são aceites" : ""}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        name="resultado_camp3"
                                                        value={obj_anexo?.resultado_camp3 === undefined ? '' : obj_anexo?.resultado_camp3}
                                                        onChange={onInputChange}
                                                        error={error_resultado_camp3}
                                                        helperText={error_resultado_camp3 ? "Apenas números são aceites" : ""}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        name="resultado_camp4"
                                                        value={obj_anexo?.resultado_camp4 === undefined ? '' : obj_anexo?.resultado_camp4}
                                                        onChange={onInputChange}
                                                        error={error_resultado_camp4}
                                                        helperText={error_resultado_camp4 ? "Apenas números são aceites" : ""}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        name="resultado_camp5"
                                                        value={obj_anexo?.resultado_camp5 === undefined ? '' : obj_anexo?.resultado_camp5}
                                                        onChange={onInputChange}
                                                        error={error_resultado_camp5}
                                                        helperText={error_resultado_camp5 ? "Apenas números são aceites" : ""}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        name="resultado_camp6"
                                                        value={obj_anexo?.resultado_camp6 === undefined ? '' : obj_anexo?.resultado_camp6}
                                                        onChange={onInputChange}
                                                        error={error_resultado_camp6}
                                                        helperText={error_resultado_camp6 ? "Apenas números são aceites" : ""}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        name="resultado_camp7"
                                                        value={obj_anexo?.resultado_camp7 === undefined ? '' : obj_anexo?.resultado_camp7}
                                                        onChange={onInputChange}
                                                        error={error_resultado_camp7}
                                                        helperText={error_resultado_camp7 ? "Apenas números são aceites" : ""}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        name="resultado_camp8"
                                                        value={obj_anexo?.resultado_camp8 === undefined ? '' : obj_anexo?.resultado_camp8}
                                                        onChange={onInputChange}
                                                        error={error_resultado_camp8}
                                                        helperText={error_resultado_camp8 ? "Apenas números são aceites" : ""}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        name="resultado_camp9"
                                                        value={obj_anexo?.resultado_camp9 === undefined ? '' : obj_anexo?.resultado_camp9}
                                                        onChange={onInputChange}
                                                        error={error_resultado_camp9}
                                                        helperText={error_resultado_camp9 ? "Apenas números são aceites" : ""}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        name="resultado_camp10"
                                                        value={obj_anexo?.resultado_camp10 === undefined ? '' : obj_anexo?.resultado_camp10}
                                                        onChange={onInputChange}
                                                        error={error_resultado_camp10}
                                                        helperText={error_resultado_camp10 ? "Apenas números são aceites" : ""}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        name="resultado_camp11"
                                                        value={obj_anexo?.resultado_camp11 === undefined ? '' : obj_anexo?.resultado_camp11}
                                                        onChange={onInputChange}
                                                        error={error_resultado_camp11}
                                                        helperText={error_resultado_camp11 ? "Apenas números são aceites" : ""}
                                                    />
                                                </StyledTableCell>
                                            </TableRow>
                                            <TableRow>
                                                <StyledTableHead>Classificação</StyledTableHead>
                                                <StyledTableCell>
                                                    <CustomSelect
                                                        value={obj_anexo?.classificacao_camp1 === undefined ? '' : obj_anexo?.classificacao_camp1}
                                                        name="classificacao_camp1"
                                                        onChange={onInputChange}
                                                        options={analise_foliar_1_3_classificacao}
                                                        label=""
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>

                                                    <CustomSelect
                                                        value={obj_anexo?.classificacao_camp2 === undefined ? '' : obj_anexo?.classificacao_camp2}
                                                        name="classificacao_camp2"
                                                        onChange={onInputChange}
                                                        options={analise_foliar_1_3_classificacao}
                                                        label=""
                                                    />

                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomSelect
                                                        value={obj_anexo?.classificacao_camp3 === undefined ? '' : obj_anexo?.classificacao_camp3}
                                                        name="classificacao_camp3"
                                                        onChange={onInputChange}
                                                        options={analise_foliar_1_3_classificacao}
                                                        label=""
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomSelect
                                                        value={obj_anexo?.classificacao_camp4 === undefined ? '' : obj_anexo?.classificacao_camp4}
                                                        name="classificacao_camp4"
                                                        onChange={onInputChange}
                                                        options={analise_foliar_1_3_classificacao}
                                                        label=""
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomSelect
                                                        name="classificacao_camp5"
                                                        value={obj_anexo?.classificacao_camp5 === undefined ? '' : obj_anexo?.classificacao_camp5}
                                                        onChange={onInputChange}
                                                        options={analise_foliar_1_3_classificacao}
                                                        label=""
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomSelect
                                                        name="classificacao_camp6"
                                                        value={obj_anexo?.classificacao_camp6 === undefined ? '' : obj_anexo?.classificacao_camp6}
                                                        onChange={onInputChange}
                                                        options={analise_foliar_1_3_classificacao}
                                                        label=""
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomSelect
                                                        name="classificacao_camp7"
                                                        value={obj_anexo?.classificacao_camp7 === undefined ? '' : obj_anexo?.classificacao_camp7}
                                                        onChange={onInputChange}
                                                        options={analise_foliar_1_3_classificacao}
                                                        label=""
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomSelect
                                                        name="classificacao_camp8"
                                                        value={obj_anexo?.classificacao_camp8 === undefined ? '' : obj_anexo?.classificacao_camp8}
                                                        onChange={onInputChange}
                                                        options={analise_foliar_1_3_classificacao}
                                                        label=""
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomSelect
                                                        name="classificacao_camp9"
                                                        value={obj_anexo?.classificacao_camp9 === undefined ? '' : obj_anexo?.classificacao_camp9}
                                                        onChange={onInputChange}
                                                        options={analise_foliar_1_3_classificacao}
                                                        label=""
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomSelect
                                                        name="classificacao_camp10"
                                                        value={obj_anexo?.classificacao_camp10 === undefined ? '' : obj_anexo?.classificacao_camp10}
                                                        onChange={onInputChange}
                                                        options={analise_foliar_1_3_classificacao}
                                                        label=""
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomSelect
                                                        name="classificacao_camp11"
                                                        value={obj_anexo?.classificacao_camp11 === undefined ? '' : obj_anexo?.classificacao_camp11}
                                                        onChange={onInputChange}
                                                        options={analise_foliar_1_3_classificacao}
                                                        label=""
                                                    />
                                                </StyledTableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    colSpan={4}
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontFamily: "candara",
                                                    }}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        sx={{
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        Data da colheita da água:
                                                        <TextField
                                                            variant="filled"
                                                            name="data_colheita"
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
                                                            value={row.data_colheita}
                                                            onChange={onInputChange}
                                                        />
                                                    </Stack>
                                                </TableCell>
                                                <TableCell
                                                    colSpan={3}
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontFamily: "candara",
                                                    }}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        sx={{
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        Data emissão resultados:
                                                        <TextField
                                                            variant="filled"
                                                            name="data_resultados"
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
                                                            value={row.data_resultados}
                                                            onChange={onInputChange}
                                                        />
                                                    </Stack>
                                                </TableCell>
                                                <TableCell
                                                    colSpan={3}
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontFamily: "candara",
                                                    }}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        sx={{
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        N.º de amostras
                                                        <CustomTextField
                                                            name="n_amostras"
                                                            value={row.n_amostras}
                                                            onChange={onInputChange}
                                                        />
                                                    </Stack>
                                                </TableCell>
                                                <TableCell
                                                    colSpan={3}
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontFamily: "candara",
                                                    }}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        sx={{
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        N.º do Boletim:
                                                        <CustomTextField
                                                            name="n_boletin"
                                                            value={row.n_boletin}
                                                            onChange={onInputChange}
                                                        />
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>

                                        </>
                                    );

                                } else {
                                    return (
                                        <>
                                            <TableRow>
                                                <StyledTableHead>
                                                    Resultado análises
                                                </StyledTableHead>
                                                <StyledTableCell>
                                                    {row.resultado_camp1}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.resultado_camp2}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.resultado_camp1}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.resultado_camp1}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.resultado_camp4}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.resultado_camp5}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.resultado_camp6}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.resultado_camp7}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.resultado_camp8}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.resultado_camp9}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.resultado_camp10}
                                                </StyledTableCell>
                                            </TableRow>
                                            <TableRow>
                                                <StyledTableHead>Classificação</StyledTableHead>
                                                <StyledTableCell>
                                                    {row.classificacao_camp1}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.classificacao_camp2}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.classificacao_camp3}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.classificacao_camp4}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.classificacao_camp5}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.classificacao_camp6}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.classificacao_camp7}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.classificacao_camp8}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.classificacao_camp9}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.classificacao_camp10}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.classificacao_camp11}
                                                </StyledTableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    colSpan={4}
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontFamily: "candara",
                                                    }}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        sx={{
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        Data da colheita da água:
                                                        {row.data_colheita}
                                                    </Stack>
                                                </TableCell>
                                                <TableCell
                                                    colSpan={3}
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontFamily: "candara",
                                                    }}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        sx={{
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        Data emissão resultados:
                                                        {row.data_resultados}
                                                    </Stack>
                                                </TableCell>
                                                <TableCell
                                                    colSpan={3}
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontFamily: "candara",
                                                    }}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        sx={{
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        N.º de amostras
                                                        {row.n_amostras}
                                                    </Stack>
                                                </TableCell>
                                                <TableCell
                                                    colSpan={3}
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontFamily: "candara",
                                                    }}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        sx={{
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        N.º do Boletim:
                                                        {row.n_boletin}
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    )
                                }
                            })}
                        </TableBody>
                    </table>
                    <ConfirmDialog
                        open={open_dialog_tem_a_certeza_que_quer_eliminar}
                        onClose={() => set_open_dialog_tem_a_certeza_que_quer_eliminar(false)}
                        onConfirm={handle_delete_anexo}
                        message="Deseja eliminar o registo?"
                    />
                </TableContainer>
            </CustomThemeProvider>
        </>
    );
};