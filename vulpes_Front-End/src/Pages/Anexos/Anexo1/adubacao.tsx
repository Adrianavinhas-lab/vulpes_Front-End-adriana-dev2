import { ChangeEvent, useState } from "react";
import {
    Box,
    Checkbox,
    FormControlLabel,

    
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import { Paper, Stack, TableBody } from "@mui/material";
import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import {
    StyledTableCell,
    StyledTableCellRight,
    StyledTableHead,
} from "../../../Styles/tabelCellStyled/customTableCell";
import { CustomTextField } from "../../../Styles/theme/customThemeprovider";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import BasicPopover from "../../../Components/Popover";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { Alert } from "../../../Components/Alert/Alert";
import { IAdubacao } from "../../../Interfaces/anexos/anexo1/composicao_adubacao_azoto_nutrientes1_4_7";

export const AdubacaoForm = () => {
    const [createTable, setCreateTable] = useState(false);
    const [message, setMessage] = useState("");
    const [, setError] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
    const [openSnackError, setOpenSnackError] = React.useState(false);
    const [error_especies_camp1, set_error_especies_camp1] = React.useState(false);
    const [error_especies_camp2, set_error_especies_camp2] = React.useState(false);
    const [error_quantidade_camp1, set_error_quantidade_camp1] = React.useState(false);
    const [error_quantidade_camp2, set_error_quantidade_camp2] = React.useState(false);
    const [error_quantidade_camp3, set_error_quantidade_camp3] = React.useState(false);
    const [error_quantidade_camp4, set_error_quantidade_camp4] = React.useState(false);
    const [error_quantidade_camp5, set_error_quantidade_camp5] = React.useState(false);
    const [error_quantidade_camp6, set_error_quantidade_camp6] = React.useState(false);
    const [error_quantidade_camp7, set_error_quantidade_camp7] = React.useState(false);
    const [error_quantidade_camp8, set_error_quantidade_camp8] = React.useState(false);
    const [error_considerar_camp1, set_error_considerar_camp1] = React.useState(false);
    const [error_considerar_camp2, set_error_considerar_camp2] = React.useState(false);
    const [error_considerar_camp3, set_error_considerar_camp3] = React.useState(false);
    const [error_considerar_camp4, set_error_considerar_camp4] = React.useState(false);
    const [error_considerar_camp5, set_error_considerar_camp5] = React.useState(false);
    const [error_considerar_camp6, set_error_considerar_camp6] = React.useState(false);
    const [error_considerar_camp7, set_error_considerar_camp7] = React.useState(false);
    const [error_considerar_camp8, set_error_considerar_camp8] = React.useState(false);
    const [obj_anexo, set_obj_anexo] = useState<IAdubacao>();
    const [obj_anexo_lista, set_obj_anexo_lista] = useState<IAdubacao[]>();

    // onChange criar
    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        let newValue: any = type === "checkbox" ? checked : value;

        if (
            name.startsWith("especies_camp") ||
            name.startsWith("quantidade_camp") ||
            name.startsWith("considerar_camp")
        ) {
            if (isNaN(Number(value))) {
                setError(true);
                return;
            } else {
                setError(false);
                newValue = Number(value);
            }
        }
        if (type === "date") {
            newValue = value === "" ? null : value;
        }

    };

    /********** EDITAR LINHA *************/
    const handleEdit = (id: number | null) => {

    };

    // onChange editar
    const onEditTableChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("Estou na função");
        const { name, value, type, checked } = event.target;
        let newValue: any = type === "checkbox" ? checked : value;

        if (
            name.startsWith("especies_camp") ||
            name.startsWith("quantidade_camp") ||
            name.startsWith("considerar_camp")
        ) {
            if (isNaN(Number(value))) {
                setError(true);
                return;
            } else {
                setError(false);
                newValue = Number(value);
            }
        }
        if (type === "date") {
            newValue = value === "" ? null : value;
        }

    };

    // Eliminar
    const handleClickOpenDeleteAdubacao = (id: number | null) => {
        setOpenDelete(true);
    };
    const handleCloseDeleteAdubacao = () => {
        setOpenDelete(false);
    };
    const handleDeleteAdubacao = () => {
        // ApiService.deleteById("delete__reg_anexo_um_cinco", idToDelete).then(

    };


    const handleCloseSnack = () => {

        setOpenSnackSuccess(false);
        setOpenSnackError(false);
    };

    return (
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
                            colSpan={8}
                            sx={{
                                fontWeight: 600,
                                textAlign: "left",
                                fontFamily: "candara",
                                fontSize: 16,
                            }}
                        >
                            1.5 - Composição da adubação verde
                            <BasicPopover
                                text={
                                    "No caso do beneficiário ter efetuado análises, os boletins de análise devem ser mantidos pelo beneficiário por forma a serem consultados sempre que necessário pelas entidades que monitorizam, verificam a aplicação da legislação nacional aplicável no âmbito da gestão de nutrientes disponibilizados às culturas."
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
                </TableHead>
                <TableBody>
                    <TableRow>
                        <StyledTableHead rowSpan={2}>Espécies</StyledTableHead>
                        <StyledTableHead>% de Leguminosas</StyledTableHead>
                        <StyledTableHead>% de Gramíneas</StyledTableHead>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableHead>Nutriente </StyledTableHead>
                        <StyledTableHead>N</StyledTableHead>
                        <StyledTableHead>P2O5</StyledTableHead>
                        <StyledTableHead>K2O</StyledTableHead>
                        <StyledTableHead>Mg</StyledTableHead>
                        <StyledTableHead>Outros</StyledTableHead>
                        <StyledTableHead></StyledTableHead>
                        <StyledTableHead></StyledTableHead>
                        <StyledTableHead></StyledTableHead>
                    </TableRow>
                    <TableRow>
                        <StyledTableHead>Quantidade (mg/kg)</StyledTableHead>
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
                        <StyledTableHead>
                            A considerar no plano de fertilização nos casos em que se
                            recorra a esta prática
                            <Stack direction="row" justifyContent="center">
                                (kg/ha)
                                <Box margin={-1} padding={0}>
                                    <BasicPopover
                                        text={
                                            "Parcela usada no cálculo automático do campo «previsão total de nutrientes a disponibilizar à cultura» do quadro 3 - Plano de aplicação em função dos resultados das análises ou dos valores tabelados em referência bibliográfica relativamente à composição da adubação verde efetuada."
                                        }
                                    />
                                </Box>
                            </Stack>
                        </StyledTableHead>
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
                            rowSpan={2}
                            sx={{
                                textAlign: "left",
                                fontWeight: 600,
                                fontFamily: "candara",
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                Origem dos dados:
                                <BasicPopover
                                    text={
                                        "Assinalar com uma X o campo correspondente à origem dos dados"
                                    }
                                />
                            </Stack>
                        </TableCell>
                        <TableCell colSpan={2}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="left"
                            >
                                <FormControlLabel
                                    name="origem_tabela"
                                    label={
                                        <Typography fontFamily="candara" fontSize={16}>
                                            a) Tabela - Referência bibliográfica:
                                        </Typography>
                                    }
                                    control={
                                        <Checkbox
                                            disabled
                                            sx={{
                                                color: "#aaaaaa",
                                                "&.Mui-checked": {
                                                    color: "#C94F1E",
                                                },
                                            }}
                                        />
                                    }
                                />
                            </Stack>
                        </TableCell>
                        <TableCell colSpan={2}></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="left"
                            >
                                <FormControlLabel
                                    name="origem_analise"
                                    label={
                                        <Typography fontFamily="candara" fontSize={16}>
                                            b) Análise - Data:
                                        </Typography>
                                    }
                                    disabled
                                    control={
                                        <Checkbox
                                            sx={{
                                                color: "#aaaaaa",
                                                "&.Mui-checked": {
                                                    color: "#C94F1E",
                                                },
                                            }}
                                        />
                                    }
                                />
                            </Stack>
                        </TableCell>

                        <TableCell colSpan={2}></TableCell>
                    </TableRow>
                    {createTable && (
                        <>
                            <TableRow>
                                <StyledTableHead rowSpan={2}>Espécies</StyledTableHead>
                                <StyledTableHead>% de Leguminosas</StyledTableHead>
                                <StyledTableHead>% de Gramíneas</StyledTableHead>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="especies_camp1"
                                        value={obj_anexo?.especies_camp1 === undefined ? '' : obj_anexo?.especies_camp1}
                                        onChange={onInputChange}
                                        error={error_especies_camp1}
                                        helperText={error_especies_camp1 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="especies_camp2"
                                        value={obj_anexo?.especies_camp2 === undefined ? '' : obj_anexo?.especies_camp2}
                                        onChange={onInputChange}
                                        error={error_especies_camp2}
                                        helperText={error_especies_camp2 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableHead>Nutriente </StyledTableHead>
                                <StyledTableHead>N</StyledTableHead>
                                <StyledTableHead>P2O5</StyledTableHead>
                                <StyledTableHead>K2O</StyledTableHead>
                                <StyledTableHead>Mg</StyledTableHead>
                                <StyledTableHead>
                                    <CustomTextField
                                        name="nutriente_camp1"
                                        value={obj_anexo?.nutriente_camp1 === undefined ? '' : obj_anexo?.nutriente_camp1}
                                        onChange={onInputChange}
                                    />
                                </StyledTableHead>
                                <StyledTableHead>
                                    <CustomTextField
                                        name="nutriente_camp2"
                                        value={obj_anexo?.nutriente_camp2 === undefined ? '' : obj_anexo?.nutriente_camp2}
                                        onChange={onInputChange}
                                    />
                                </StyledTableHead>
                                <StyledTableHead>
                                    <CustomTextField
                                        name="nutriente_camp3"
                                        value={obj_anexo?.nutriente_camp3 === undefined ? '' : obj_anexo?.nutriente_camp3}
                                        onChange={onInputChange}
                                    />
                                </StyledTableHead>
                                <StyledTableHead>
                                    <CustomTextField
                                        name="nutriente_camp4"
                                        value={obj_anexo?.nutriente_camp4 === undefined ? '' : obj_anexo?.nutriente_camp4}
                                        onChange={onInputChange}
                                    />
                                </StyledTableHead>
                            </TableRow>
                            <TableRow>
                                <StyledTableHead>Quantidade (mg/kg)</StyledTableHead>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="quantidade_camp1"
                                        value={obj_anexo?.quantidade_camp1 === undefined ? '' : obj_anexo?.quantidade_camp1}
                                        onChange={onInputChange}
                                        error={error_quantidade_camp1}
                                        helperText={error_quantidade_camp1 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="quantidade_camp2"
                                        value={obj_anexo?.quantidade_camp2 === undefined ? '' : obj_anexo?.quantidade_camp2}
                                        onChange={onInputChange}
                                        error={error_quantidade_camp2}
                                        helperText={error_quantidade_camp2 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="quantidade_camp3"
                                        value={obj_anexo?.quantidade_camp3 === undefined ? '' : obj_anexo?.quantidade_camp3}
                                        onChange={onInputChange}
                                        error={error_quantidade_camp3}
                                        helperText={error_quantidade_camp3 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="quantidade_camp4"
                                        value={obj_anexo?.quantidade_camp4 === undefined ? '' : obj_anexo?.quantidade_camp4}
                                        onChange={onInputChange}
                                        error={error_quantidade_camp4}
                                        helperText={error_quantidade_camp4 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="quantidade_camp5"
                                        value={obj_anexo?.quantidade_camp5 === undefined ? '' : obj_anexo?.quantidade_camp5}
                                        onChange={onInputChange}
                                        error={error_quantidade_camp5}
                                        helperText={error_quantidade_camp5 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="quantidade_camp6"
                                        value={obj_anexo?.quantidade_camp6 === undefined ? '' : obj_anexo?.quantidade_camp6}
                                        onChange={onInputChange}
                                        error={error_quantidade_camp6}
                                        helperText={error_quantidade_camp6 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="quantidade_camp7"
                                        value={obj_anexo?.quantidade_camp7 === undefined ? '' : obj_anexo?.quantidade_camp7}
                                        onChange={onInputChange}
                                        error={error_quantidade_camp7}
                                        helperText={error_quantidade_camp7 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="quantidade_camp8"
                                        value={obj_anexo?.quantidade_camp8 === undefined ? '' : obj_anexo?.quantidade_camp8}
                                        onChange={onInputChange}
                                        error={error_quantidade_camp8}
                                        helperText={error_quantidade_camp8 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableHead>
                                    A considerar no plano de fertilização nos casos em que se
                                    recorra a esta prática
                                    <Stack direction="row" justifyContent="center">
                                        (kg/ha)
                                        <Box margin={-1} padding={0}>
                                            <BasicPopover
                                                text={
                                                    "Parcela usada no cálculo automático do campo «previsão total de nutrientes a disponibilizar à cultura» do quadro 3 - Plano de aplicação em função dos resultados das análises ou dos valores tabelados em referência bibliográfica relativamente à composição da adubação verde efetuada."
                                                }
                                            />
                                        </Box>
                                    </Stack>
                                </StyledTableHead>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="considerar_camp1"
                                        value={obj_anexo?.considerar_camp1 === undefined ? '' : obj_anexo?.considerar_camp1}
                                        onChange={onInputChange}
                                        error={error_considerar_camp1}
                                        helperText={error_considerar_camp1 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="considerar_camp2"
                                        value={obj_anexo?.considerar_camp2 === undefined ? '' : obj_anexo?.considerar_camp2}
                                        onChange={onInputChange}
                                        error={error_considerar_camp2}
                                        helperText={error_considerar_camp2 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="considerar_camp3"
                                        value={obj_anexo?.considerar_camp3 === undefined ? '' : obj_anexo?.considerar_camp3}
                                        onChange={onInputChange}
                                        error={error_considerar_camp3}
                                        helperText={error_considerar_camp3 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="considerar_camp4"
                                        value={obj_anexo?.considerar_camp4 === undefined ? '' : obj_anexo?.considerar_camp4}
                                        onChange={onInputChange}
                                        error={error_considerar_camp4}
                                        helperText={error_considerar_camp4 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="considerar_camp5"
                                        value={obj_anexo?.considerar_camp5 === undefined ? '' : obj_anexo?.considerar_camp5}
                                        onChange={onInputChange}
                                        error={error_considerar_camp5}
                                        helperText={error_considerar_camp5 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="considerar_camp6"
                                        value={obj_anexo?.considerar_camp6 === undefined ? '' : obj_anexo?.considerar_camp6}
                                        onChange={onInputChange}
                                        error={error_considerar_camp6}
                                        helperText={error_considerar_camp6 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="considerar_camp7"
                                        value={obj_anexo?.considerar_camp7 === undefined ? '' : obj_anexo?.considerar_camp7}
                                        onChange={onInputChange}
                                        error={error_considerar_camp7}
                                        helperText={error_considerar_camp7 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="considerar_camp8"
                                        value={obj_anexo?.considerar_camp8 === undefined ? '' : obj_anexo?.considerar_camp8}
                                        onChange={onInputChange}
                                        error={error_considerar_camp8}
                                        helperText={error_considerar_camp8 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    rowSpan={2}
                                    sx={{
                                        textAlign: "left",
                                        fontWeight: 600,
                                        fontFamily: "candara",
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        Origem dos dados:
                                        <BasicPopover
                                            text={
                                                "Assinalar com uma X o campo correspondente à origem dos dados"
                                            }
                                        />
                                    </Stack>
                                </TableCell>
                                <TableCell colSpan={2}>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="left"
                                    >
                                        <FormControlLabel
                                            name="origem_tabela"
                                            label={
                                                <Typography fontFamily="candara" fontSize={16}>
                                                    a) Tabela - Referência bibliográfica:
                                                </Typography>
                                            }
                                            aria-readonly
                                            control={
                                                <Checkbox
                                                    defaultChecked={
                                                        obj_anexo?.origem_tabela === true && true
                                                    }
                                                    value={
                                                        obj_anexo?.origem_tabela === true &&
                                                        obj_anexo?.origem_tabela
                                                    }
                                                    onChange={onInputChange}
                                                    sx={{
                                                        color: "#aaaaaa",
                                                        "&.Mui-checked": {
                                                            color: "#C94F1E",
                                                        },
                                                    }}
                                                />
                                            }
                                        />
                                    </Stack>
                                </TableCell>
                                <TableCell colSpan={2}>
                                    <CustomTextField
                                        name="tabela"
                                        value={obj_anexo?.tabela === undefined ? '' : obj_anexo?.tabela}
                                        onChange={onInputChange}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="left"
                                    >
                                        <FormControlLabel
                                            name="origem_analise"
                                            label={
                                                <Typography fontFamily="candara" fontSize={16}>
                                                    b) Análise - Data:
                                                </Typography>
                                            }
                                            aria-readonly
                                            control={
                                                <Checkbox
                                                    defaultChecked={
                                                        obj_anexo?.origem_analise === true && true
                                                    }
                                                    value={
                                                        obj_anexo?.origem_analise === true &&
                                                        obj_anexo?.origem_analise
                                                    }
                                                    onChange={onInputChange}
                                                    sx={{
                                                        color: "#aaaaaa",
                                                        "&.Mui-checked": {
                                                            color: "#C94F1E",
                                                        },
                                                    }}
                                                />
                                            }
                                        />
                                    </Stack>
                                </TableCell>

                                <TableCell colSpan={2}>
                                    <TextField
                                        variant="filled"
                                        type="date"
                                        inputProps={{
                                            style: { fontSize: 12, fontFamily: "verdana" },
                                        }}
                                        name="analise"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={obj_anexo?.analise === undefined ? '' : obj_anexo?.analise}
                                        onChange={onInputChange}
                                    />
                                </TableCell>
                            </TableRow>
                        </>
                    )}
                    {obj_anexo_lista?.map((tab) => {
                        if (tab.id_anexo_um_cabecalho === obj_anexo?.id_anexo_um_cabecalho) {
                            return (
                                <>
                                    <TableRow>
                                        <TableCell
                                            colSpan={8}
                                            sx={{
                                                fontWeight: 600,
                                                textAlign: "left",
                                                fontFamily: "candara",
                                                fontSize: 16,
                                            }}
                                        >
                                            1.5 - Composição da adubação verde
                                            <BasicPopover
                                                text={
                                                    "No caso do beneficiário ter efetuado análises, os boletins de análise devem ser mantidos pelo beneficiário por forma a serem consultados sempre que necessário pelas entidades que monitorizam, verificam a aplicação da legislação nacional aplicável no âmbito da gestão de nutrientes disponibilizados às culturas."
                                                }
                                            />
                                        </TableCell>

                                        <TableCell>
                                            <ButtonCadernos
                                                mostrarBotaoGravar
                                                aoClicarGravar={() => { }}
                                                mostrarBotaoCancelar
                                                aoClicarCancelar={() => { }}
                                            />
                                        </TableCell>

                                    </TableRow>


                                    <TableRow>
                                        <StyledTableHead rowSpan={2}>Espécies</StyledTableHead>
                                        <StyledTableHead>% de Leguminosas</StyledTableHead>
                                        <StyledTableHead>% de Gramíneas</StyledTableHead>
                                    </TableRow>
                                    <TableRow>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="especies_camp1"
                                                value={obj_anexo?.especies_camp1 === undefined ? '' : obj_anexo?.especies_camp1}
                                                onChange={onEditTableChange}
                                                error={error_especies_camp1}
                                                helperText={error_especies_camp1 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="especies_camp2"
                                                value={obj_anexo?.especies_camp2 === undefined ? '' : obj_anexo?.especies_camp2}
                                                onChange={onEditTableChange}
                                                error={error_especies_camp2}
                                                helperText={error_especies_camp2 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <StyledTableHead>Nutriente </StyledTableHead>
                                        <StyledTableHead>N</StyledTableHead>
                                        <StyledTableHead>P2O5</StyledTableHead>
                                        <StyledTableHead>K2O</StyledTableHead>
                                        <StyledTableHead>Mg</StyledTableHead>
                                        <StyledTableHead>
                                            <CustomTextField
                                                name="nutriente_camp1"
                                                value={obj_anexo?.nutriente_camp1 === undefined ? '' : obj_anexo?.nutriente_camp1}
                                                onChange={onEditTableChange}
                                            />
                                        </StyledTableHead>
                                        <StyledTableHead>
                                            <CustomTextField
                                                name="nutriente_camp2"
                                                value={obj_anexo?.nutriente_camp2 === undefined ? '' : obj_anexo?.nutriente_camp2}
                                                onChange={onEditTableChange}
                                            />
                                        </StyledTableHead>
                                        <StyledTableHead>
                                            <CustomTextField
                                                name="nutriente_camp3"
                                                value={obj_anexo?.nutriente_camp3 === undefined ? '' : obj_anexo?.nutriente_camp3}
                                                onChange={onEditTableChange}
                                            />
                                        </StyledTableHead>
                                        <StyledTableHead>
                                            <CustomTextField
                                                name="nutriente_camp4"
                                                value={obj_anexo?.nutriente_camp4 === undefined ? '' : obj_anexo?.nutriente_camp4}
                                                onChange={onEditTableChange}
                                            />
                                        </StyledTableHead>
                                    </TableRow>
                                    <TableRow>
                                        <StyledTableHead>Quantidade (mg/kg)</StyledTableHead>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="quantidade_camp1"
                                                value={obj_anexo?.quantidade_camp1 === undefined ? '' : obj_anexo?.quantidade_camp1}
                                                onChange={onEditTableChange}
                                                error={error_quantidade_camp1}
                                                helperText={error_quantidade_camp1 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="quantidade_camp2"
                                                value={obj_anexo?.quantidade_camp2 === undefined ? '' : obj_anexo?.quantidade_camp2}
                                                onChange={onEditTableChange}
                                                error={error_quantidade_camp2}
                                                helperText={error_quantidade_camp2 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="quantidade_camp3"
                                                value={obj_anexo?.quantidade_camp3 === undefined ? '' : obj_anexo?.quantidade_camp3}
                                                onChange={onEditTableChange}
                                                error={error_quantidade_camp3}
                                                helperText={error_quantidade_camp3 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="quantidade_camp4"
                                                value={obj_anexo?.quantidade_camp4 === undefined ? '' : obj_anexo?.quantidade_camp4}
                                                onChange={onEditTableChange}
                                                error={error_quantidade_camp4}
                                                helperText={error_quantidade_camp4 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="quantidade_camp5"
                                                value={obj_anexo?.quantidade_camp5 === undefined ? '' : obj_anexo?.quantidade_camp5}
                                                onChange={onEditTableChange}
                                                error={error_quantidade_camp5}
                                                helperText={error_quantidade_camp5 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="quantidade_camp6"
                                                value={obj_anexo?.quantidade_camp6 === undefined ? '' : obj_anexo?.quantidade_camp6}
                                                onChange={onEditTableChange}
                                                error={error_quantidade_camp6}
                                                helperText={error_quantidade_camp6 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="quantidade_camp7"
                                                value={obj_anexo?.quantidade_camp7 === undefined ? '' : obj_anexo?.quantidade_camp7}
                                                onChange={onEditTableChange}
                                                error={error_quantidade_camp7}
                                                helperText={error_quantidade_camp7 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="quantidade_camp8"
                                                value={obj_anexo?.quantidade_camp8 === undefined ? '' : obj_anexo?.quantidade_camp8}
                                                onChange={onEditTableChange}
                                                error={error_quantidade_camp8}
                                                helperText={error_quantidade_camp8 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <StyledTableHead>
                                            A considerar no plano de fertilização nos casos em que
                                            se recorra a esta prática
                                            <Stack direction="row" justifyContent="center">
                                                (kg/ha)
                                                <Box margin={-1} padding={0}>
                                                    <BasicPopover
                                                        text={
                                                            "Parcela usada no cálculo automático do campo «previsão total de nutrientes a disponibilizar à cultura» do quadro 3 - Plano de aplicação em função dos resultados das análises ou dos valores tabelados em referência bibliográfica relativamente à composição da adubação verde efetuada."
                                                        }
                                                    />
                                                </Box>
                                            </Stack>
                                        </StyledTableHead>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="considerar_camp1"
                                                value={obj_anexo?.considerar_camp1 === undefined ? '' : obj_anexo?.considerar_camp1}
                                                onChange={onEditTableChange}
                                                error={error_considerar_camp1}
                                                helperText={error_considerar_camp1 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="considerar_camp2"
                                                value={obj_anexo?.considerar_camp2 === undefined ? '' : obj_anexo?.considerar_camp2}
                                                onChange={onEditTableChange}
                                                error={error_considerar_camp2}
                                                helperText={error_considerar_camp2 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="considerar_camp3"
                                                value={obj_anexo?.considerar_camp3 === undefined ? '' : obj_anexo?.considerar_camp3}
                                                onChange={onEditTableChange}
                                                error={error_considerar_camp3}
                                                helperText={error_considerar_camp3 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="considerar_camp4"
                                                value={obj_anexo?.considerar_camp4 === undefined ? '' : obj_anexo?.considerar_camp4}
                                                onChange={onEditTableChange}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="considerar_camp5"
                                                value={obj_anexo?.considerar_camp5 === undefined ? '' : obj_anexo?.considerar_camp5}
                                                onChange={onEditTableChange}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="considerar_camp6"
                                                value={obj_anexo?.considerar_camp6 === undefined ? '' : obj_anexo?.considerar_camp6}
                                                onChange={onEditTableChange}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="considerar_camp7"
                                                value={obj_anexo?.considerar_camp7 === undefined ? '' : obj_anexo?.considerar_camp7}
                                                onChange={onEditTableChange}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="considerar_camp8"
                                                value={obj_anexo?.considerar_camp8 === undefined ? '' : obj_anexo?.considerar_camp8}
                                                onChange={onEditTableChange}
                                            />
                                        </StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            rowSpan={2}
                                            sx={{
                                                textAlign: "left",
                                                fontWeight: 600,
                                                fontFamily: "candara",
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                Origem dos dados:
                                                <BasicPopover
                                                    text={
                                                        "Assinalar com uma X o campo correspondente à origem dos dados"
                                                    }
                                                />
                                            </Stack>
                                        </TableCell>
                                        <TableCell colSpan={2}>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="left"
                                            >
                                                <FormControlLabel
                                                    name="origem_tabela"
                                                    label={
                                                        <Typography fontFamily="candara" fontSize={16}>
                                                            a) Tabela - Referência bibliográfica:
                                                        </Typography>
                                                    }
                                                    aria-readonly
                                                    control={
                                                        <Checkbox
                                                            checked={obj_anexo?.origem_tabela === true && true}
                                                            onChange={onEditTableChange}
                                                            sx={{
                                                                color: "#aaaaaa",
                                                                "&.Mui-checked": {
                                                                    color: "#C94F1E",
                                                                },
                                                            }}
                                                        />
                                                    }
                                                />
                                            </Stack>
                                        </TableCell>
                                        <TableCell colSpan={2}>
                                            <CustomTextField
                                                name="tabela"
                                                value={obj_anexo?.tabela === undefined ? '' : obj_anexo?.tabela}
                                                onChange={onEditTableChange}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={2}>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="left"
                                            >
                                                <FormControlLabel
                                                    name="origem_analise"
                                                    label={
                                                        <Typography fontFamily="candara" fontSize={16}>
                                                            b) Análise - Data:
                                                        </Typography>
                                                    }
                                                    aria-readonly
                                                    control={
                                                        <Checkbox
                                                            checked={obj_anexo?.origem_analise === true && true}
                                                            onChange={onEditTableChange}
                                                            sx={{
                                                                color: "#aaaaaa",
                                                                "&.Mui-checked": {
                                                                    color: "#C94F1E",
                                                                },
                                                            }}
                                                        />
                                                    }
                                                />
                                            </Stack>
                                        </TableCell>
                                        <TableCell colSpan={2}>
                                            <CustomTextField
                                                name="analise"
                                                value={obj_anexo?.analise === undefined ? '' : obj_anexo?.analise}
                                                onChange={onEditTableChange}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </>
                            )
                        } else {
                            return (
                                <>
                                    <TableRow>
                                        <TableCell
                                            colSpan={8}
                                            sx={{
                                                fontWeight: 600,
                                                textAlign: "left",
                                                fontFamily: "candara",
                                                fontSize: 16,
                                            }}
                                        >
                                            1.5 - Composição da adubação verde
                                            <BasicPopover
                                                text={
                                                    "No caso do beneficiário ter efetuado análises, os boletins de análise devem ser mantidos pelo beneficiário por forma a serem consultados sempre que necessário pelas entidades que monitorizam, verificam a aplicação da legislação nacional aplicável no âmbito da gestão de nutrientes disponibilizados às culturas."
                                                }
                                            />
                                        </TableCell>

                                        <TableCell>
                                            <ButtonCadernos
                                                mostrarBotaoEditar
                                                aoClicarEditar={() =>
                                                    handleEdit(tab.id_composicao_verde)
                                                }
                                                mostrarBotaoApagar
                                                aoClicarApagar={() =>
                                                    handleClickOpenDeleteAdubacao(
                                                        tab.id_composicao_verde
                                                    )
                                                }
                                            />
                                        </TableCell>

                                    </TableRow>


                                    <TableRow>
                                        <StyledTableHead rowSpan={2}>Espécies</StyledTableHead>
                                        <StyledTableHead>% de Leguminosas</StyledTableHead>
                                        <StyledTableHead>% de Gramíneas</StyledTableHead>
                                    </TableRow>
                                    <TableRow>
                                        <StyledTableCell>{tab.especies_camp1} </StyledTableCell>
                                        <StyledTableCell>{tab.especies_camp2} </StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <StyledTableHead>Nutriente</StyledTableHead>
                                        <StyledTableHead width="8%">
                                            N <BasicPopover text="Azoto" />
                                        </StyledTableHead>
                                        <StyledTableHead width="8%">
                                            P2O5 <BasicPopover text="Fósforo" />
                                        </StyledTableHead>
                                        <StyledTableHead width="8%">
                                            K2O <BasicPopover text="Potássio" />
                                        </StyledTableHead>
                                        <StyledTableHead width="8%">
                                            Mg <BasicPopover text="Magnésio" />
                                        </StyledTableHead>
                                        <StyledTableHead width="8%">
                                            {tab.nutriente_camp1}
                                            <BasicPopover text=" Preencher apenas quando o boletim de análises ou a tabela de referência utilizada apresenta dados sobre outros elementos, que vão ser considerados na elaboração do plano de fertilização." />
                                        </StyledTableHead>
                                        <StyledTableHead width="8%">
                                            {tab.nutriente_camp2}
                                            <BasicPopover text=" Preencher apenas quando o boletim de análises ou a tabela de referência utilizada apresenta dados sobre outros elementos, que vão ser considerados na elaboração do plano de fertilização." />
                                        </StyledTableHead>
                                        <StyledTableHead width="8%">
                                            {tab.nutriente_camp3}
                                            <BasicPopover text=" Preencher apenas quando o boletim de análises ou a tabela de referência utilizada apresenta dados sobre outros elementos, que vão ser considerados na elaboração do plano de fertilização." />
                                        </StyledTableHead>
                                        <StyledTableHead width="8%">
                                            {tab.nutriente_camp4}
                                            <BasicPopover text=" Preencher apenas quando o boletim de análises ou a tabela de referência utilizada apresenta dados sobre outros elementos, que vão ser considerados na elaboração do plano de fertilização." />
                                        </StyledTableHead>
                                    </TableRow>
                                    <TableRow>
                                        <StyledTableHead>Quantidade (mg/kg) </StyledTableHead>
                                        <StyledTableCell>
                                            {tab.quantidade_camp1}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {tab.quantidade_camp2}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {tab.quantidade_camp3}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {tab.quantidade_camp4}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {tab.quantidade_camp5}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {tab.quantidade_camp6}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {tab.quantidade_camp7}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {tab.quantidade_camp8}
                                        </StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <StyledTableHead>
                                            A considerar no plano de fertilização nos casos em que
                                            se recorra a esta prática (kg/ha)
                                            <BasicPopover
                                                text={
                                                    "Parcela usada no cálculo automático do campo «previsão total de nutrientes a disponibilizar à cultura» do quadro 3 - Plano de aplicação em função dos resultados das análises ou dos valores tabelados em referência bibliográfica relativamente à composição da adubação verde efetuada."
                                                }
                                            />
                                        </StyledTableHead>
                                        <StyledTableCellRight>
                                            {tab.considerar_camp1}
                                            <BasicPopover text="Inserir valores recomendados nas Tabelas de Referência ou os resultados das análises." />
                                        </StyledTableCellRight>
                                        <StyledTableCell>
                                            {tab.considerar_camp2}
                                            <BasicPopover text="Inserir valores recomendados nas Tabelas de Referência ou os resultados das análises." />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {tab.considerar_camp3}
                                            <BasicPopover text="Inserir valores recomendados nas Tabelas de Referência ou os resultados das análises." />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {tab.considerar_camp4}
                                            <BasicPopover text="Inserir valores recomendados nas Tabelas de Referência ou os resultados das análises." />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {tab.considerar_camp5}
                                            <BasicPopover text="Inserir valores recomendados nas Tabelas de Referência ou os resultados das análises." />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {tab.considerar_camp6}
                                            <BasicPopover text="Inserir valores recomendados nas Tabelas de Referência ou os resultados das análises." />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {tab.considerar_camp7}
                                            <BasicPopover text="Inserir valores recomendados nas Tabelas de Referência ou os resultados das análises." />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {tab.considerar_camp8}
                                            <BasicPopover text="Inserir valores recomendados nas Tabelas de Referência ou os resultados das análises." />
                                        </StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            rowSpan={2}
                                            sx={{
                                                fontWeight: 600,
                                                fontFamily: "candara",
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                Origem dos dados:
                                                <BasicPopover
                                                    text={
                                                        "Assinalar com uma X o campo correspondente à origem dos dados"
                                                    }
                                                />
                                            </Stack>
                                        </TableCell>
                                        <TableCell colSpan={4}>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="left"
                                            >
                                                <FormControlLabel
                                                    name="origem_tabela"
                                                    label={
                                                        <Typography fontFamily="candara" fontSize={16}>
                                                            a) Tabela - Referência bibliográfica:
                                                        </Typography>
                                                    }
                                                    aria-readonly
                                                    control={
                                                        <Checkbox
                                                            checked={tab.origem_tabela === true && true}
                                                            sx={{
                                                                color: "#aaaaaa",
                                                                "&.Mui-checked": {
                                                                    color: "#C94F1E",
                                                                },
                                                            }}
                                                        />
                                                    }
                                                />
                                            </Stack>
                                        </TableCell>
                                        <TableCell colSpan={4}>{tab.tabela}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={4}>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="left"
                                            >
                                                <FormControlLabel
                                                    name="origem_analise"
                                                    label={
                                                        <Typography fontFamily="candara" fontSize={16}>
                                                            b) Análise - Data:
                                                        </Typography>
                                                    }
                                                    aria-readonly
                                                    control={
                                                        <Checkbox
                                                            checked={tab.origem_analise === true && true}
                                                            sx={{
                                                                color: "#aaaaaa",
                                                                "&.Mui-checked": {
                                                                    color: "#C94F1E",
                                                                },
                                                            }}
                                                        />
                                                    }
                                                />
                                            </Stack>
                                        </TableCell>
                                        <TableCell colSpan={4}>{tab.analise}</TableCell>
                                    </TableRow>

                                </>
                            );
                        }


                    })}
                </TableBody >
            </table>
            <ConfirmDialog
                open={openDelete}
                onClose={handleCloseDeleteAdubacao}
                onConfirm={handleDeleteAdubacao}
                message="Deseja eliminar o registo?"
            />
        </TableContainer>
    );
};