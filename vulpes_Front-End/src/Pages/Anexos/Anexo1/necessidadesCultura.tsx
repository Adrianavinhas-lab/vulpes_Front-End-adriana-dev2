import React from "react";
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
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import {
    StyledTableHead,
    StyledTableCell,
} from "../../../Styles/tabelCellStyled/customTableCell";
import {
    CustomTextField,
    CustomThemeProvider,
} from "../../../Styles/theme/customThemeprovider";
import BasicPopover from "../../../Components/Popover";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import LoadingVulpes from "../../../Styles/Loader/loading";
import { Alert } from "../../../Components/Alert/Alert";
import { INecessidades } from "../../../Interfaces/anexos/anexo1/necessidades1_2";



export const NecessidadesForm = () => {
    const [createTable, setCreateTable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
    const [openSnackError, setOpenSnackError] = React.useState(false);
    const [obj_anexo, set_obj_anexo] = useState<INecessidades>();
    const [obj_anexo_lista, set_obj_anexo_lista] = useState<INecessidades[]>([]);
    const [error_quantidade_camp1, set_error_quantidade_camp1] = useState<boolean>(false);
    const [error_quantidade_camp2, set_error_quantidade_camp2] = useState<boolean>(false);
    const [error_quantidade_camp3, set_error_quantidade_camp3] = useState<boolean>(false);
    const [error_quantidade_camp4, set_error_quantidade_camp4] = useState<boolean>(false);
    const [error_quantidade_camp5, set_error_quantidade_camp5] = useState<boolean>(false);
    const [error_quantidade_camp6, set_error_quantidade_camp6] = useState<boolean>(false);
    const [error_quantidade_camp7, set_error_quantidade_camp7] = useState<boolean>(false);
    const [error_quantidade_camp8, set_error_quantidade_camp8] = useState<boolean>(false);

    

    const handleEdit = (id: number | null) => {
    };

    //OnChange criação nova tabela
    const handleInputChangeNecessidades = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, type, checked } = event.target;
        let newValue: any = type === "checkbox" ? checked : value;

        if (type === "date" && value === "") {
            newValue = null;
        }

        if (name.startsWith("quantidade_camp")) {
            if (isNaN(Number(value))) {
                setError(true);
            } else {
                setError(false);
                newValue = Number(value);
            }
        }


    };

    // onChange Editar tabela
    const handleInputChangeEditNecessidades = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, type, checked } = event.target;
        let newValue: any = type === "checkbox" ? checked : value;

        if (type === "date" && value === "") {
            newValue = null;
        }

        if (name.startsWith("quantidade_camp")) {
            if (isNaN(Number(value))) {
                setError(true);
            } else {
                setError(false);
                newValue = Number(value);
            }
        }


    };

    // Eliminar
    const handleClickOpenDeleteNecessidades = (id: number | null) => {
        setOpenDelete(true);
    };
    const handleCloseDeleteNutrientes = () => {
        setOpenDelete(false);
    };
    const handleDeleteNutrientes = () => {
        setIsLoading(true);
        // ApiService.deleteById("delete__reg_anexo_um_necessidades", idToDelete).then(
    };


    const handleCloseSnack = () => {

        setOpenSnackSuccess(false);
        setOpenSnackError(false);
    };

    return (
        <>
            <CustomThemeProvider>
                {isLoading ? (
                    <LoadingVulpes />
                ) : (
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
                                            fontSize: 18,
                                            textAlign: "left",
                                            fontFamily: "candara",
                                        }}
                                    >
                                        2 - Necessidades da cultura
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
                                    <StyledTableHead>Elemento</StyledTableHead>
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
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "right",
                                            }}
                                        >
                                            <BasicPopover text=" Preencher apenas quando o boletim de análises ou a tabela de referência utilizada apresenta dados sobre outros elementos, que vão ser considerados na elaboração do plano de fertilização." />
                                        </Box>
                                    </StyledTableHead>
                                    <StyledTableHead width="8%">
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "right",
                                            }}
                                        >
                                            <BasicPopover text=" Preencher apenas quando o boletim de análises ou a tabela de referência utilizada apresenta dados sobre outros elementos, que vão ser considerados na elaboração do plano de fertilização." />
                                        </Box>
                                    </StyledTableHead>
                                    <StyledTableHead width="8%">
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "right",
                                            }}
                                        >
                                            <BasicPopover text=" Preencher apenas quando o boletim de análises ou a tabela de referência utilizada apresenta dados sobre outros elementos, que vão ser considerados na elaboração do plano de fertilização." />
                                        </Box>
                                    </StyledTableHead>
                                    <StyledTableHead width="8%">
                                        <Stack direction="row" justifyContent="center">
                                            Outros
                                            <Box margin={-1} padding={0}>
                                                <BasicPopover text=" Preencher apenas quando o boletim de análises ou a tabela de referência utilizada apresenta dados sobre outros elementos, que vão ser considerados na elaboração do plano de fertilização." />
                                            </Box>
                                        </Stack>
                                    </StyledTableHead>
                                </TableRow>
                                <TableRow>
                                    <StyledTableHead>Quantidade (kg/ha) </StyledTableHead>
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
                                        <Stack direction="row" justifyContent="center">
                                            Origem dos dados:
                                            <Box margin={-1} padding={0}>
                                                <BasicPopover
                                                    text={
                                                        "Assinalar com uma X o campo correspondente à origem dos dados"
                                                    }
                                                />
                                            </Box>
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
                                    <TableCell colSpan={4}></TableCell>
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
                                    <TableCell colSpan={4}></TableCell>
                                </TableRow>


                                {createTable && (
                                    <>
                                        <TableRow>
                                            <StyledTableHead>Nutriente </StyledTableHead>
                                            <StyledTableHead>N</StyledTableHead>
                                            <StyledTableHead>P2O5</StyledTableHead>
                                            <StyledTableHead>K2O</StyledTableHead>
                                            <StyledTableHead>Mg</StyledTableHead>
                                            <StyledTableHead>
                                                <CustomTextField
                                                    name="elemento_camp1"
                                                    value={obj_anexo?.elemento_camp1 === undefined ? '' : obj_anexo?.elemento_camp1}
                                                    onChange={handleInputChangeNecessidades}
                                                />
                                            </StyledTableHead>
                                            <StyledTableHead>
                                                <CustomTextField
                                                    name="elemento_camp2"
                                                    value={obj_anexo?.elemento_camp2 === undefined ? '' : obj_anexo?.elemento_camp2}
                                                    onChange={handleInputChangeNecessidades}
                                                />
                                            </StyledTableHead>
                                            <StyledTableHead>
                                                <CustomTextField
                                                    name="elemento_camp3"
                                                    value={obj_anexo?.elemento_camp3 === undefined ? '' : obj_anexo?.elemento_camp3}
                                                    onChange={handleInputChangeNecessidades}
                                                />
                                            </StyledTableHead>
                                            <StyledTableHead>
                                                <CustomTextField
                                                    name="elemento_camp4"
                                                    value={obj_anexo?.elemento_camp4 === undefined ? '' : obj_anexo?.elemento_camp4}
                                                    onChange={handleInputChangeNecessidades}
                                                />
                                            </StyledTableHead>
                                        </TableRow>
                                        <TableRow>
                                            <StyledTableHead>Quantidade (mg/kg)</StyledTableHead>
                                            <StyledTableCell>
                                                <CustomTextField
                                                    name="quantidade_camp1"
                                                    value={obj_anexo?.quantidade_camp1 === undefined ? '' : obj_anexo?.quantidade_camp1}
                                                    onChange={handleInputChangeNecessidades}
                                                    error={error_quantidade_camp1}
                                                    helperText={error_quantidade_camp1 ? "Apenas números são aceites" : ""}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <CustomTextField
                                                    name="quantidade_camp2"
                                                    value={obj_anexo?.quantidade_camp2 === undefined ? '' : obj_anexo?.quantidade_camp2}
                                                    onChange={handleInputChangeNecessidades}
                                                    error={error_quantidade_camp2}
                                                    helperText={error_quantidade_camp2 ? "Apenas números são aceites" : ""}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <CustomTextField
                                                    name="quantidade_camp3"
                                                    value={obj_anexo?.quantidade_camp3 === undefined ? '' : obj_anexo?.quantidade_camp3}
                                                    onChange={handleInputChangeNecessidades}
                                                    error={error_quantidade_camp3}
                                                    helperText={error_quantidade_camp3 ? "Apenas números são aceites" : ""}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <CustomTextField
                                                    name="quantidade_camp4"
                                                    value={obj_anexo?.quantidade_camp4 === undefined ? '' : obj_anexo?.quantidade_camp4}
                                                    onChange={handleInputChangeNecessidades}
                                                    error={error_quantidade_camp4}
                                                    helperText={error_quantidade_camp4 ? "Apenas números são aceites" : ""}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <CustomTextField
                                                    name="quantidade_camp5"
                                                    value={obj_anexo?.quantidade_camp5 === undefined ? '' : obj_anexo?.quantidade_camp5}
                                                    onChange={handleInputChangeNecessidades}
                                                    error={error_quantidade_camp5}
                                                    helperText={error_quantidade_camp5 ? "Apenas números são aceites" : ""}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <CustomTextField
                                                    name="quantidade_camp6"
                                                    value={obj_anexo?.quantidade_camp6 === undefined ? '' : obj_anexo?.quantidade_camp6}
                                                    onChange={handleInputChangeNecessidades}
                                                    error={error_quantidade_camp6}
                                                    helperText={error_quantidade_camp6 ? "Apenas números são aceites" : ""}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <CustomTextField
                                                    name="quantidade_camp7"
                                                    value={obj_anexo?.quantidade_camp7 === undefined ? '' : obj_anexo?.quantidade_camp7}
                                                    onChange={handleInputChangeNecessidades}
                                                    error={error_quantidade_camp7}
                                                    helperText={error_quantidade_camp7 ? "Apenas números são aceites" : ""}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <CustomTextField
                                                    name="quantidade_camp8"
                                                    value={obj_anexo?.quantidade_camp8 === undefined ? '' : obj_anexo?.quantidade_camp8}
                                                    onChange={handleInputChangeNecessidades}
                                                    error={error_quantidade_camp8}
                                                    helperText={error_quantidade_camp8 ? "Apenas números são aceites" : ""}
                                                />
                                            </StyledTableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                rowSpan={2}
                                                colSpan={3}
                                                sx={{
                                                    textAlign: "left",
                                                    fontWeight: 600,
                                                    fontFamily: "candara",
                                                }}
                                            >
                                                <Stack direction="row" justifyContent="center">
                                                    Origem dos dados:
                                                    <Box margin={-1} padding={0}>
                                                        <BasicPopover
                                                            text={
                                                                "Assinalar com uma X o campo correspondente à origem dos dados"
                                                            }
                                                        />
                                                    </Box>
                                                </Stack>
                                            </TableCell>
                                            <TableCell colSpan={3}>
                                                <Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    justifyContent="left"
                                                >
                                                    <FormControlLabel
                                                        name="origem"
                                                        label={
                                                            <Typography fontFamily="candara" fontSize={16}>
                                                                a) Tabela - Referência bibliográfica:
                                                            </Typography>
                                                        }
                                                        aria-readonly
                                                        control={
                                                            <Checkbox
                                                                defaultChecked={
                                                                    obj_anexo?.origem === true && true
                                                                }
                                                                value={
                                                                    obj_anexo?.origem === true &&
                                                                    obj_anexo?.origem
                                                                }
                                                                onChange={handleInputChangeNecessidades}
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
                                            <TableCell colSpan={3}>
                                                <CustomTextField
                                                    name="tabela"
                                                    value={obj_anexo?.tabela}
                                                    onChange={handleInputChangeNecessidades}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={3}>
                                                <Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    justifyContent="left"
                                                >
                                                    <FormControlLabel
                                                        name="origem_b"
                                                        label={
                                                            <Typography fontFamily="candara" fontSize={16}>
                                                                b) Análise - Data:
                                                            </Typography>
                                                        }
                                                        aria-readonly
                                                        control={
                                                            <Checkbox
                                                                defaultChecked={
                                                                    obj_anexo?.origem_b === true && true
                                                                }
                                                                value={
                                                                    obj_anexo?.origem_b === true &&
                                                                    obj_anexo?.origem_b
                                                                }
                                                                onChange={handleInputChangeNecessidades}
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

                                            <TableCell colSpan={3}>
                                                <TextField
                                                    variant="filled"
                                                    type="date"
                                                    inputProps={{
                                                        style: { fontSize: 12, fontFamily: "verdana" },
                                                    }}
                                                    name="tabela_b"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={
                                                        obj_anexo?.tabela_b ? obj_anexo?.tabela_b : ""
                                                    }
                                                    onChange={handleInputChangeNecessidades}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )}

                                {obj_anexo_lista?.map((tab) => {
                                    if (tab.id_necessidades === obj_anexo?.id_necessidades) {
                                        return (
                                            <>
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={8}
                                                        sx={{
                                                            fontWeight: 600,
                                                            fontSize: 18,
                                                            textAlign: "left",
                                                            fontFamily: "candara",
                                                        }}
                                                    >
                                                        2 - Necessidades da cultura
                                                    </TableCell>

                                                    <ButtonCadernos
                                                        mostrarBotaoGravar
                                                        aoClicarGravar={() => { }}
                                                        mostrarBotaoCancelar
                                                        aoClicarCancelar={() => { }}
                                                    />

                                                </TableRow>

                                                <TableRow>
                                                    <StyledTableHead>Nutriente </StyledTableHead>
                                                    <StyledTableHead>N</StyledTableHead>
                                                    <StyledTableHead>P2O5</StyledTableHead>
                                                    <StyledTableHead>K2O</StyledTableHead>
                                                    <StyledTableHead>Mg</StyledTableHead>
                                                    <StyledTableHead>
                                                        <CustomTextField
                                                            name="elemento_camp1"
                                                            value={obj_anexo?.elemento_camp1 === undefined ? '' : obj_anexo?.elemento_camp1}
                                                            onChange={handleInputChangeEditNecessidades}
                                                        />
                                                    </StyledTableHead>
                                                    <StyledTableHead>
                                                        <CustomTextField
                                                            name="elemento_camp2"
                                                            value={obj_anexo?.elemento_camp2 === undefined ? '' : obj_anexo?.elemento_camp2}
                                                            onChange={handleInputChangeEditNecessidades}
                                                        />
                                                    </StyledTableHead>
                                                    <StyledTableHead>
                                                        <CustomTextField
                                                            name="elemento_camp3"
                                                            value={obj_anexo?.elemento_camp3 === undefined ? '' : obj_anexo?.elemento_camp3}
                                                            onChange={handleInputChangeEditNecessidades}
                                                        />
                                                    </StyledTableHead>
                                                    <StyledTableHead>
                                                        <CustomTextField
                                                            name="elemento_camp4"
                                                            value={obj_anexo?.elemento_camp4 === undefined ? '' : obj_anexo?.elemento_camp4}
                                                            onChange={handleInputChangeEditNecessidades}
                                                        />
                                                    </StyledTableHead>
                                                </TableRow>
                                                <TableRow>
                                                    <StyledTableHead>
                                                        Quantidade (mg/kg)
                                                    </StyledTableHead>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="quantidade_camp1"
                                                            value={obj_anexo?.quantidade_camp1 === undefined ? '' : obj_anexo?.quantidade_camp1}
                                                            onChange={handleInputChangeEditNecessidades}
                                                            error={error_quantidade_camp1}
                                                            helperText={error_quantidade_camp1 ? "Apenas números são aceites" : ""}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="quantidade_camp2"
                                                            value={obj_anexo?.quantidade_camp2 === undefined ? '' : obj_anexo?.quantidade_camp2}
                                                            onChange={handleInputChangeEditNecessidades}
                                                            error={error_quantidade_camp2}
                                                            helperText={error_quantidade_camp2 ? "Apenas números são aceites" : ""}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="quantidade_camp3"
                                                            value={obj_anexo?.quantidade_camp3 === undefined ? '' : obj_anexo?.quantidade_camp3}
                                                            onChange={handleInputChangeEditNecessidades}
                                                            error={error_quantidade_camp3}
                                                            helperText={error_quantidade_camp3 ? "Apenas números são aceites" : ""}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="quantidade_camp4"
                                                            value={obj_anexo?.quantidade_camp4 === undefined ? '' : obj_anexo?.quantidade_camp4}
                                                            onChange={handleInputChangeEditNecessidades}
                                                            error={error_quantidade_camp4}
                                                            helperText={error_quantidade_camp4 ? "Apenas números são aceites" : ""}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="quantidade_camp5"
                                                            value={obj_anexo?.quantidade_camp5 === undefined ? '' : obj_anexo?.quantidade_camp5}
                                                            onChange={handleInputChangeEditNecessidades}
                                                            error={error_quantidade_camp5}
                                                            helperText={error_quantidade_camp5 ? "Apenas números são aceites" : ""}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="quantidade_camp6"
                                                            value={obj_anexo?.quantidade_camp6 === undefined ? '' : obj_anexo?.quantidade_camp6}
                                                            onChange={handleInputChangeEditNecessidades}
                                                            error={error_quantidade_camp6}
                                                            helperText={error_quantidade_camp6 ? "Apenas números são aceites" : ""}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="quantidade_camp7"
                                                            value={obj_anexo?.quantidade_camp7 === undefined ? '' : obj_anexo?.quantidade_camp7}
                                                            onChange={handleInputChangeEditNecessidades}
                                                            error={error_quantidade_camp7}
                                                            helperText={error_quantidade_camp7 ? "Apenas números são aceites" : ""}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="quantidade_camp8"
                                                            value={obj_anexo?.quantidade_camp8 === undefined ? '' : obj_anexo?.quantidade_camp8}
                                                            onChange={handleInputChangeEditNecessidades}
                                                            error={error_quantidade_camp8}
                                                            helperText={error_quantidade_camp8 ? "Apenas números são aceites" : ""}
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
                                                        <Stack direction="row" justifyContent="center">
                                                            Origem dos dados:
                                                            <Box margin={-1} padding={0}>
                                                                <BasicPopover
                                                                    text={
                                                                        "Assinalar com uma X o campo correspondente à origem dos dados"
                                                                    }
                                                                />
                                                            </Box>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell colSpan={2}>
                                                        <Stack
                                                            direction="row"
                                                            alignItems="center"
                                                            justifyContent="left"
                                                        >
                                                            <FormControlLabel
                                                                name="origem"
                                                                label={
                                                                    <Typography
                                                                        fontFamily="candara"
                                                                        fontSize={16}
                                                                    >
                                                                        a) Tabela - Referência bibliográfica:
                                                                    </Typography>
                                                                }
                                                                aria-readonly
                                                                control={
                                                                    <Checkbox
                                                                        checked={obj_anexo?.origem === true && true}
                                                                        onChange={
                                                                            handleInputChangeEditNecessidades
                                                                        }
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
                                                            onChange={handleInputChangeEditNecessidades}
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
                                                                name="origem_b"
                                                                label={
                                                                    <Typography
                                                                        fontFamily="candara"
                                                                        fontSize={16}
                                                                    >
                                                                        b) Análise - Data:
                                                                    </Typography>
                                                                }
                                                                aria-readonly
                                                                control={
                                                                    <Checkbox
                                                                        checked={obj_anexo?.origem_b === true && true}
                                                                        onChange={
                                                                            handleInputChangeEditNecessidades
                                                                        }
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
                                                                style: {
                                                                    fontSize: 12,
                                                                    fontFamily: "verdana",
                                                                },
                                                            }}
                                                            name="tabela_b"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            value={obj_anexo?.tabela_b === undefined ? '' : obj_anexo?.tabela_b}
                                                            onChange={handleInputChangeEditNecessidades}
                                                        />
                                                    </TableCell>
                                                </TableRow>

                                            </>
                                        );
                                    } else {
                                        return (
                                            <>
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={8}
                                                        sx={{
                                                            fontWeight: 600,
                                                            fontSize: 18,
                                                            textAlign: "left",
                                                            fontFamily: "candara",
                                                        }}
                                                    >
                                                        2 - Necessidades da cultura
                                                    </TableCell>
                                                    <TableCell>
                                                        <ButtonCadernos
                                                            mostrarBotaoEditar
                                                            aoClicarEditar={() =>
                                                                handleEdit(tab.id_necessidades)
                                                            }
                                                            mostrarBotaoApagar
                                                            aoClicarApagar={() =>
                                                                handleClickOpenDeleteNecessidades(
                                                                    tab.id_necessidades
                                                                )
                                                            }
                                                        />
                                                    </TableCell>

                                                </TableRow>

                                                <TableRow>
                                                    <StyledTableHead>Nutriente </StyledTableHead>
                                                    <StyledTableHead>N</StyledTableHead>
                                                    <StyledTableHead>P2O5</StyledTableHead>
                                                    <StyledTableHead>K2O</StyledTableHead>
                                                    <StyledTableHead>Mg</StyledTableHead>
                                                    <StyledTableHead>
                                                        {tab.elemento_camp1}
                                                    </StyledTableHead>
                                                    <StyledTableHead>
                                                        {tab.elemento_camp2}
                                                    </StyledTableHead>
                                                    <StyledTableHead>
                                                        {tab.elemento_camp3}
                                                    </StyledTableHead>
                                                    <StyledTableHead>
                                                        {tab.elemento_camp4}
                                                    </StyledTableHead>
                                                </TableRow>
                                                <TableRow>
                                                    <StyledTableHead>
                                                        Quantidade (mg/kg)
                                                    </StyledTableHead>
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
                                                    <TableCell
                                                        rowSpan={2}
                                                        colSpan={3}
                                                        sx={{
                                                            textAlign: "left",
                                                            fontWeight: 600,
                                                            fontFamily: "candara",
                                                        }}
                                                    >
                                                        <Stack direction="row" justifyContent="center">
                                                            Origem dos dados:
                                                            <Box margin={-1} padding={0}>
                                                                <BasicPopover
                                                                    text={
                                                                        "Assinalar com uma X o campo correspondente à origem dos dados"
                                                                    }
                                                                />
                                                            </Box>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell colSpan={3}>
                                                        <Stack
                                                            direction="row"
                                                            alignItems="center"
                                                            justifyContent="left"
                                                        >
                                                            <FormControlLabel
                                                                name="origem"
                                                                label={
                                                                    <Typography
                                                                        fontFamily="candara"
                                                                        fontSize={16}
                                                                    >
                                                                        a) Tabela - Referência bibliográfica:
                                                                    </Typography>
                                                                }
                                                                aria-readonly
                                                                control={
                                                                    <Checkbox
                                                                        checked={tab.origem === true && true}
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
                                                    <TableCell colSpan={3}>{tab.tabela}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell colSpan={3}>
                                                        <Stack
                                                            direction="row"
                                                            alignItems="center"
                                                            justifyContent="left"
                                                        >
                                                            <FormControlLabel
                                                                name="origem_b"
                                                                label={
                                                                    <Typography
                                                                        fontFamily="candara"
                                                                        fontSize={16}
                                                                    >
                                                                        b) Análise - Data:
                                                                    </Typography>
                                                                }
                                                                aria-readonly
                                                                control={
                                                                    <Checkbox
                                                                        checked={tab.origem_b === true && true}
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

                                                    <TableCell colSpan={3}>{tab.tabela_b}</TableCell>
                                                </TableRow>

                                            </>
                                        );
                                    }
                                })}
                            </TableBody>
                        </table>
                    </TableContainer>
                )}
                <ConfirmDialog
                    open={openDelete}
                    onClose={handleCloseDeleteNutrientes}
                    onConfirm={handleDeleteNutrientes}
                    message="Deseja eliminar o registo?"
                />
            </CustomThemeProvider>
        </>
    );
};