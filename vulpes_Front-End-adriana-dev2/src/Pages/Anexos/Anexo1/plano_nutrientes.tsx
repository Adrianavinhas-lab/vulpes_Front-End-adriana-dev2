import React, { ChangeEvent } from "react";
import { useState } from "react";

import {
    Box,
    Paper,
    SelectChangeEvent,
    Snackbar,
    Stack,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {
    CustomSelect,
    CustomTextField,
    CustomThemeProvider,
} from "../../../Styles/theme/customThemeprovider";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import {
    StyledTableCell,
    StyledTableCellRight,
    StyledTableHead,
} from "../../../Styles/tabelCellStyled/customTableCell";
import BasicPopover from "../../../Components/Popover";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import { Alert } from "../../../Components/Alert/Alert";
import { IPlanoNutrientes } from "../../../Interfaces/anexos/anexo1/plano_nutrientes1_3";
import { calcario } from "../../../informacao_estatica";




export const PlanoNutrientesForm = () => {

    const [createTable, setCreateTable] = useState(false);
    const [message, setMessage] = useState("");
    const [openDelete, setOpenDelete] = useState(false);
    const [openSnackSuccess, setOpenSnackSuccess] = useState(false);
    const [openSnackError, setOpenSnackError] = useState(false);
    const [obj_anexo, set_obj_anexo] = useState<IPlanoNutrientes>();
    const [obj_anexo_lista, set_obj_anexo_lista] = useState<IPlanoNutrientes[]>([]);
    const [error_previsao_camp5, set_error_previsao_camp5] = useState(false);
    const [error_previsao_camp6, set_error_previsao_camp6] = useState(false);
    const [error_previsao_camp7, set_error_previsao_camp7] = useState(false);
    const [error_previsao_camp8, set_error_previsao_camp8] = useState(false);

    const handleEdit = (id: number | null) => {
    };
    const onInputChange = (
        event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
    ) => {
        const { name, value } = event.target;

        if (name.startsWith("previsao_camp")) {
            if (isNaN(Number(value))) {
            } else {
                Number(value);
            }
        }


    };

    // Editar
    const onInputChangeEdit = (
        event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
    ) => {
        const { name, value } = event.target;
        if (name.startsWith("previsao_camp")) {

        }


    };

    // Eliminar
    const handleClickOpenDelete = (id: number | null) => {
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    const handleDelete = () => {
        // ApiService.deleteById("delete__reg_anexo_um_plano_nutri", idToDelete).then(

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
                                    colSpan={8}
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: 18,
                                        textAlign: "left",
                                        fontFamily: "candara",
                                    }}
                                >
                                    3 - Plano de aplicação de nutrientes a disponibilizar à
                                    cultura
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
                                <StyledTableHead>Nutrientes</StyledTableHead>
                                <StyledTableHead width="8%">
                                    <Stack direction="row" justifyContent="center">
                                        N (kg/ha)
                                        <BasicPopover
                                            text={
                                                "Valores devem ser expressos em kg/ha.\nTer em atenção que:\n- De acordo com o Regulamento 2018/848, em Agricultura Biológica, a quantidade total de estrume animal a aplicar não pode exceder 170 kg de azoto por ano e por hectare;\n\n- Nas parcelas em Zona Vulnerável, de acordo com a Portaria n.º259/2012, a quantidade de matérias fertilizantes de natureza orgânica a aplicar, por hectare de SAU e ano, não pode veicular mais de 250 kg de azoto total, o qual não deve conter mais de 170 kg de azoto total de efluentes pecuários."
                                            }
                                        />
                                    </Stack>
                                </StyledTableHead>
                                <StyledTableHead width="8%">
                                    <Stack direction="row" justifyContent="center">
                                        P2O5 (kg/ha)
                                        <BasicPopover
                                            text={"Valores devem ser expressos em kg/ha."}
                                        />
                                    </Stack>
                                </StyledTableHead>
                                <StyledTableHead width="8%">
                                    <Stack direction="row" justifyContent="center">
                                        K2O (kg/ha)
                                        <BasicPopover
                                            text={"Valores devem ser expressos em kg/ha."}
                                        />
                                    </Stack>
                                </StyledTableHead>
                                <StyledTableHead width="8%">
                                    <Stack direction="row" justifyContent="center">
                                        Mg (kg/ha)
                                        <BasicPopover
                                            text={"Valores devem ser expressos em kg/ha."}
                                        />
                                    </Stack>
                                </StyledTableHead>
                                <StyledTableHead width="8%">
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "right",
                                        }}
                                    >
                                        Calagem (kg/ha)
                                        <BasicPopover
                                            text={
                                                "Preencher apenas quando for recomendada a calagem.\n\nValores devem ser expressos em kg/ha."
                                            }
                                        />
                                    </Box>
                                </StyledTableHead>
                                <StyledTableHead width="8%">
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "right",
                                        }}
                                    >
                                        <BasicPopover
                                            text={
                                                "Preencher apenas quando se prevê aplicar um elemento nutricional adicional.\n\nValores devem ser expressos em kg/ha."
                                            }
                                        />
                                    </Box>
                                </StyledTableHead>
                                <StyledTableHead width="8%">
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "right",
                                        }}
                                    >
                                        <BasicPopover
                                            text={
                                                "Preencher apenas quando se prevê aplicar um elemento nutricional adicional.\n\nValores devem ser expressos em kg/ha."
                                            }
                                        />
                                    </Box>
                                </StyledTableHead>
                                <StyledTableHead width="8%">
                                    <Stack direction="row" justifyContent="right">
                                        <BasicPopover
                                            text={
                                                "Preencher apenas quando se prevê aplicar um elemento nutricional adicional.\n\nValores devem ser expressos em kg/ha."
                                            }
                                        />
                                    </Stack>
                                </StyledTableHead>
                            </TableRow>
                            <TableRow>
                                <StyledTableHead>
                                    Previsão total de nutrientes a disponibilizar à cultura
                                </StyledTableHead>
                                <StyledTableCellRight>
                                    <BasicPopover
                                        text={
                                            "Auxiliar - fórmula de cálculo:\n\nN=Nc-(Ns-Na-Nv-Nr-Nx)\n\nN - Total de azoto a disponibilizar à cultura;\nNc - Necessidade da cultura em azoto;\nNs - Quantidade de azoto a deduzir em função dos resultados das análises de terras;\nNa - Azoto veículado pela água de rega;\nNv - Azoto proveniente da adubação verde;\nNr - Azoto proveniente dos resíduos da cultura precedente;\nNx - Azoto proveniente do excreta dos animais em pastoreio."
                                        }
                                    />
                                </StyledTableCellRight>
                                <StyledTableCellRight>
                                    <BasicPopover
                                        text={
                                            "Auxiliar - fórmula de cálculo:\n\nP2O5=Pc-(Pa-Pv-Px)\n\nP2O5 - Total de fósforo a disponibilizar à cultura;\nPc - Necessidade da cultura em fósforo;\nPa - Fósforo veículado pela água de rega;\nPv - Fósforo proveniente da adubação verde;\nNx - Fósforo proveniente do excreta dos animais em pastoreio."
                                        }
                                    />
                                </StyledTableCellRight>
                                <StyledTableCellRight>
                                    <BasicPopover
                                        text={
                                            "Auxiliar - fórmula de cálculo:\n\nK2O=Kc-(Kv-Kx)\n\nK2O - Total de potássio a disponibilizar à cultura;\nKc - Necessidade da cultura em potássio;\nKv - Potássio proveniente da adubação verde;\nKx - Potássio proveniente do excreta dos animais em pastoreio."
                                        }
                                    />
                                </StyledTableCellRight>
                                <StyledTableCellRight>
                                    <BasicPopover
                                        text={
                                            "Auxiliar - fórmula de cálculo:\n\nMg=Mgc-(Mgv)\n\nMg - Total de magnésio a disponibilizar à cultura;\nMgc - Necessidade da cultura em magnésio;\nMgv - Magnésio proveniente da adubação verde.\n\nNota: Quando há aplicação de calcários magnesianos ou dolomíticos, que contêm magnésio, considerar a quantidade de Mg veiculada pelo calcário."
                                        }
                                    />
                                </StyledTableCellRight>
                                <StyledTableCellRight>
                                    <BasicPopover
                                        text={
                                            "Indicar a quantidade de calcário recomendada em kg/ha"
                                        }
                                    />
                                </StyledTableCellRight>
                                <StyledTableCellRight>
                                    <BasicPopover
                                        text={
                                            "Preencher manualmente com os valores da quantidade de nutriente adicional a aplicar (caso exista)."
                                        }
                                    />
                                </StyledTableCellRight>
                                <StyledTableCellRight>
                                    <BasicPopover
                                        text={
                                            "Preencher apenas quando se prevê aplicar um elemento nutricional adicional.\n\nValores devem ser expressos em kg/ha."
                                        }
                                    />
                                </StyledTableCellRight>
                                <StyledTableCellRight>
                                    <BasicPopover
                                        text={
                                            "Preencher apenas quando se prevê aplicar um elemento nutricional adicional.\n\nValores devem ser expressos em kg/ha."
                                        }
                                    />
                                </StyledTableCellRight>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    colSpan={3}
                                    sx={{ fontWeight: 600, fontFamily: "candara" }}
                                >
                                    <Stack
                                        direction="row"
                                        justifyContent="right"
                                        alignItems="center"
                                    >
                                        Identificar o tipo de calcário aplicado:
                                        <BasicPopover
                                            text={
                                                "Sempre que for efetuado a correção do pH do solo por calagem é obrigatória indicar o teor de magnésio do calcário (em Mg ou MgO).\n\nValores possíveis:\n- Calcário calcítico (constituído apenas por carbonato de cálcio);\n- Calcário magnesiano (teor de óxido de magnésio igual ou superior a 3%);\n- Calcário dolomítico (constituídos por carbonato de cálcio e carbonato de magnésio, mas com teor de óxido de magnésio igual ou superior a 12 %)."
                                            }
                                        />
                                    </Stack>
                                </TableCell>
                                <TableCell colSpan={6}></TableCell>
                            </TableRow>


                            {createTable && (
                                <>
                                    <TableRow>
                                        <StyledTableHead>Nutrientes</StyledTableHead>
                                        <StyledTableHead width="8%">
                                            <Stack direction="row" justifyContent="center">
                                                N (kg/ha)
                                                <BasicPopover
                                                    text={
                                                        "Valores devem ser expressos em kg/ha.\nTer em atenção que:\n- De acordo com o Regulamento 2018/848, em Agricultura Biológica, a quantidade total de estrume animal a aplicar não pode exceder 170 kg de azoto por ano e por hectare;\n\n- Nas parcelas em Zona Vulnerável, de acordo com a Portaria n.º259/2012, a quantidade de matérias fertilizantes de natureza orgânica a aplicar, por hectare de SAU e ano, não pode veicular mais de 250 kg de azoto total, o qual não deve conter mais de 170 kg de azoto total de efluentes pecuários."
                                                    }
                                                />
                                            </Stack>
                                        </StyledTableHead>
                                        <StyledTableHead width="8%">
                                            <Stack direction="row" justifyContent="center">
                                                P2O5 (kg/ha)
                                                <BasicPopover
                                                    text={"Valores devem ser expressos em kg/ha."}
                                                />
                                            </Stack>
                                        </StyledTableHead>
                                        <StyledTableHead width="8%">
                                            <Stack direction="row" justifyContent="center">
                                                K2O (kg/ha)
                                                <BasicPopover
                                                    text={"Valores devem ser expressos em kg/ha."}
                                                />
                                            </Stack>
                                        </StyledTableHead>
                                        <StyledTableHead width="8%">
                                            <Stack direction="row" justifyContent="center">
                                                Mg (kg/ha)
                                                <BasicPopover
                                                    text={"Valores devem ser expressos em kg/ha."}
                                                />
                                            </Stack>
                                        </StyledTableHead>
                                        <StyledTableHead width="8%">
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "right",
                                                }}
                                            >
                                                Calagem (kg/ha)
                                                <BasicPopover
                                                    text={
                                                        "Preencher apenas quando for recomendada a calagem.\n\nValores devem ser expressos em kg/ha."
                                                    }
                                                />
                                            </Box>
                                        </StyledTableHead>
                                        <StyledTableHead width="8%">
                                            <CustomTextField
                                                name="elemento_camp1"
                                                value={obj_anexo?.elemento_camp1 === undefined ? '' : obj_anexo?.elemento_camp1}
                                                onChange={onInputChange}
                                            />
                                        </StyledTableHead>
                                        <StyledTableHead width="8%">
                                            <CustomTextField
                                                name="elemento_camp2"
                                                value={obj_anexo?.elemento_camp2 === undefined ? '' : obj_anexo?.elemento_camp2}
                                                onChange={onInputChange}
                                            />
                                        </StyledTableHead>
                                        <StyledTableHead width="8%">
                                            <CustomTextField
                                                name="elemento_camp3"
                                                value={obj_anexo?.elemento_camp3 === undefined ? '' : obj_anexo?.elemento_camp3}
                                                onChange={onInputChange}
                                            />
                                        </StyledTableHead>
                                    </TableRow>
                                    <TableRow>
                                        <StyledTableHead>
                                            Previsão total de nutrientes a disponibilizar à cultura
                                        </StyledTableHead>
                                        <StyledTableCellRight>
                                            <CustomTextField
                                                name="previsao_camp1"
                                                value={'valor_campo_n'}
                                                onChange={onInputChange}
                                            />
                                        </StyledTableCellRight>
                                        <StyledTableCellRight>
                                            <CustomTextField
                                                name="previsao_camp2"
                                                value={'valor_campo_po'}
                                                onChange={onInputChange}
                                            />
                                        </StyledTableCellRight>
                                        <StyledTableCellRight>
                                            <CustomTextField
                                                name="previsao_camp3"
                                                value={'valor_campo_ko'}
                                                onChange={onInputChange}
                                            />
                                        </StyledTableCellRight>
                                        <StyledTableCellRight>
                                            <CustomTextField
                                                name="previsao_camp4"
                                                value={'valor_campo_mg'}
                                                onChange={onInputChange}
                                            />
                                        </StyledTableCellRight>

                                        <StyledTableCellRight>
                                            <CustomTextField
                                                name="previsao_camp5"
                                                value={obj_anexo?.previsao_camp5 === undefined ? '' : obj_anexo?.previsao_camp5}
                                                onChange={onInputChange}
                                                error={error_previsao_camp5}
                                                helperText={error_previsao_camp5 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCellRight>
                                        <StyledTableCellRight>
                                            <CustomTextField
                                                name="previsao_camp6"
                                                value={obj_anexo?.previsao_camp6 === undefined ? '' : obj_anexo?.previsao_camp6}
                                                onChange={onInputChange}
                                                error={error_previsao_camp6}
                                                helperText={error_previsao_camp6 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCellRight>
                                        <StyledTableCellRight>
                                            <CustomTextField
                                                name="previsao_camp7"
                                                value={obj_anexo?.previsao_camp7 === undefined ? '' : obj_anexo?.previsao_camp7}
                                                onChange={onInputChange}
                                                error={error_previsao_camp7}
                                                helperText={error_previsao_camp7 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCellRight>
                                        <StyledTableCellRight>
                                            <CustomTextField
                                                name="previsao_camp8"
                                                value={obj_anexo?.previsao_camp8 === undefined ? '' : obj_anexo?.previsao_camp8}
                                                onChange={onInputChange}
                                                error={error_previsao_camp8}
                                                helperText={error_previsao_camp8 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCellRight>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            colSpan={3}
                                            sx={{ fontWeight: 600, fontFamily: "candara" }}
                                        >
                                            <Stack
                                                direction="row"
                                                justifyContent="right"
                                                alignItems="center"
                                            >
                                                Identificar o tipo de calcário aplicado:
                                                <BasicPopover
                                                    text={
                                                        "Sempre que for efetuado a correção do pH do solo por calagem é obrigatória indicar o teor de magnésio do calcário (em Mg ou MgO).\n\nValores possíveis:\n- Calcário calcítico (constituído apenas por carbonato de cálcio);\n- Calcário magnesiano (teor de óxido de magnésio igual ou superior a 3%);\n- Calcário dolomítico (constituídos por carbonato de cálcio e carbonato de magnésio, mas com teor de óxido de magnésio igual ou superior a 12 %)."
                                                    }
                                                />
                                            </Stack>
                                        </TableCell>
                                        <TableCell colSpan={6}>
                                            <CustomSelect
                                                value={obj_anexo?.indentifica === undefined ? '' : obj_anexo?.indentifica}
                                                name="indentifica"
                                                onChange={onInputChange}
                                                options={calcario}
                                                label="Origem dos Nutrientes"
                                            />
                                        </TableCell>
                                    </TableRow>
                                </>
                            )}

                            {obj_anexo_lista?.map((row) => {
                                if (obj_anexo?.id_plano === row.id_plano) {
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
                                                    3 - Plano de aplicação de nutrientes a disponibilizar à
                                                    cultura
                                                </TableCell>
                                                <TableCell>
                                                    <ButtonCadernos
                                                        mostrarBotaoEditar
                                                        aoClicarEditar={() => handleEdit(row.id_plano)}
                                                        mostrarBotaoApagar
                                                        aoClicarApagar={() =>
                                                            handleClickOpenDelete(row.id_plano)
                                                        }
                                                    />
                                                </TableCell>

                                            </TableRow>

                                            <TableRow>
                                                <StyledTableHead>Nutrientes</StyledTableHead>
                                                <StyledTableHead width="8%">
                                                    <Stack direction="row" justifyContent="center">
                                                        N (kg/ha)
                                                        <BasicPopover
                                                            text={
                                                                "Valores devem ser expressos em kg/ha.\nTer em atenção que:\n- De acordo com o Regulamento 2018/848, em Agricultura Biológica, a quantidade total de estrume animal a aplicar não pode exceder 170 kg de azoto por ano e por hectare;\n\n- Nas parcelas em Zona Vulnerável, de acordo com a Portaria n.º259/2012, a quantidade de matérias fertilizantes de natureza orgânica a aplicar, por hectare de SAU e ano, não pode veicular mais de 250 kg de azoto total, o qual não deve conter mais de 170 kg de azoto total de efluentes pecuários."
                                                            }
                                                        />
                                                    </Stack>
                                                </StyledTableHead>
                                                <StyledTableHead width="8%">
                                                    <Stack direction="row" justifyContent="center">
                                                        P2O5 (kg/ha)
                                                        <BasicPopover
                                                            text={"Valores devem ser expressos em kg/ha."}
                                                        />
                                                    </Stack>
                                                </StyledTableHead>
                                                <StyledTableHead width="8%">
                                                    <Stack direction="row" justifyContent="center">
                                                        K2O (kg/ha)
                                                        <BasicPopover
                                                            text={"Valores devem ser expressos em kg/ha."}
                                                        />
                                                    </Stack>
                                                </StyledTableHead>
                                                <StyledTableHead width="8%">
                                                    <Stack direction="row" justifyContent="center">
                                                        Mg (kg/ha)
                                                        <BasicPopover
                                                            text={"Valores devem ser expressos em kg/ha."}
                                                        />
                                                    </Stack>
                                                </StyledTableHead>
                                                <StyledTableHead width="8%">
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "right",
                                                        }}
                                                    >
                                                        Calagem (kg/ha)
                                                        <BasicPopover
                                                            text={
                                                                "Preencher apenas quando for recomendada a calagem.\n\nValores devem ser expressos em kg/ha."
                                                            }
                                                        />
                                                    </Box>
                                                </StyledTableHead>
                                                <StyledTableHead width="8%">
                                                    <CustomTextField
                                                        name="elemento_camp1"
                                                        value={obj_anexo?.elemento_camp1 === undefined ? '' : obj_anexo?.elemento_camp1}
                                                        onChange={onInputChangeEdit}
                                                    />
                                                </StyledTableHead>
                                                <StyledTableHead width="8%">
                                                    <CustomTextField
                                                        name="elemento_camp2"
                                                        value={obj_anexo?.elemento_camp2 === undefined ? '' : obj_anexo?.elemento_camp2}
                                                        onChange={onInputChangeEdit}
                                                    />
                                                </StyledTableHead>
                                                <StyledTableHead width="8%">
                                                    <CustomTextField
                                                        name="elemento_camp3"
                                                        value={obj_anexo?.elemento_camp3 === undefined ? '' : obj_anexo?.elemento_camp3}
                                                        onChange={onInputChangeEdit}
                                                    />
                                                </StyledTableHead>
                                            </TableRow>
                                            <TableRow>
                                                <StyledTableHead>
                                                    Previsão total de nutrientes a disponibilizar à
                                                    cultura
                                                </StyledTableHead>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        name="previsao_camp1"
                                                        value={obj_anexo?.previsao_camp1 === undefined ? '' : obj_anexo?.previsao_camp1}
                                                        // value={(obj_anexo?.previsao_camp1 = 'valor_campo_n')}
                                                        onChange={onInputChangeEdit}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        name="previsao_camp2"
                                                        value={obj_anexo?.previsao_camp2 === undefined ? '' : obj_anexo?.previsao_camp2}
                                                        // value={(row.previsao_camp2 = 'valor_campo_po')}
                                                        onChange={onInputChangeEdit}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        name="previsao_camp3"
                                                        value={obj_anexo?.previsao_camp3 === undefined ? '' : obj_anexo?.previsao_camp3}
                                                        // value={(row.previsao_camp3 = 'valor_campo_ko')}
                                                        onChange={onInputChangeEdit}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        name="previsao_camp4"
                                                        value={obj_anexo?.previsao_camp4 === undefined ? '' : obj_anexo?.previsao_camp4}
                                                        // value={(row.previsao_camp4 = 'valor_campo_mg')}
                                                        onChange={onInputChangeEdit}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        name="previsao_camp5"
                                                        value={obj_anexo?.previsao_camp5 === undefined ? '' : obj_anexo?.previsao_camp5}
                                                        onChange={onInputChangeEdit}
                                                        error={error_previsao_camp5}
                                                        helperText={error_previsao_camp5 ? "Apenas números são aceites" : ""}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        name="previsao_camp6"
                                                        value={obj_anexo?.previsao_camp6 === undefined ? '' : obj_anexo?.previsao_camp6}
                                                        onChange={onInputChangeEdit}
                                                        error={error_previsao_camp6}
                                                        helperText={error_previsao_camp6 ? "Apenas números são aceites" : ""}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        name="previsao_camp7"
                                                        value={obj_anexo?.previsao_camp7 === undefined ? '' : obj_anexo?.previsao_camp7}
                                                        onChange={onInputChangeEdit}
                                                        error={error_previsao_camp7}
                                                        helperText={error_previsao_camp7 ? "Apenas números são aceites" : ""}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        name="previsao_camp8"
                                                        value={obj_anexo?.previsao_camp8 === undefined ? '' : obj_anexo?.previsao_camp8}
                                                        onChange={onInputChangeEdit}
                                                        error={error_previsao_camp8}
                                                        helperText={error_previsao_camp8 ? "Apenas números são aceites" : ""}
                                                    />
                                                </StyledTableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    colSpan={3}
                                                    sx={{ fontWeight: 600, fontFamily: "candara" }}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="right"
                                                        alignItems="center"
                                                    >
                                                        Identificar o tipo de calcário aplicado:
                                                        <BasicPopover
                                                            text={
                                                                "Sempre que for efetuado a correção do pH do solo por calagem é obrigatória indicar o teor de magnésio do calcário (em Mg ou MgO).\n\nValores possíveis:\n- Calcário calcítico (constituído apenas por carbonato de cálcio);\n- Calcário magnesiano (teor de óxido de magnésio igual ou superior a 3%);\n- Calcário dolomítico (constituídos por carbonato de cálcio e carbonato de magnésio, mas com teor de óxido de magnésio igual ou superior a 12 %)."
                                                            }
                                                        />
                                                    </Stack>
                                                </TableCell>
                                                <TableCell colSpan={6}>
                                                    <CustomSelect
                                                        value={obj_anexo?.indentifica === undefined ? '' : obj_anexo?.indentifica}
                                                        name="indentifica"
                                                        onChange={onInputChangeEdit}
                                                        options={calcario}
                                                        label="Calcário"
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
                                                        fontSize: 18,
                                                        textAlign: "left",
                                                        fontFamily: "candara",
                                                    }}
                                                >
                                                    3 - Plano de aplicação de nutrientes a disponibilizar à
                                                    cultura
                                                </TableCell>
                                                <TableCell>
                                                    <ButtonCadernos
                                                        mostrarBotaoEditar
                                                        aoClicarEditar={() => handleEdit(row.id_plano)}
                                                        mostrarBotaoApagar
                                                        aoClicarApagar={() =>
                                                            handleClickOpenDelete(row.id_plano)
                                                        }
                                                    />
                                                </TableCell>

                                            </TableRow>

                                            <TableRow>
                                                <StyledTableHead>Nutrientes</StyledTableHead>
                                                <StyledTableHead width="8%">
                                                    <Stack direction="row" justifyContent="center">
                                                        N (kg/ha)
                                                        <BasicPopover
                                                            text={
                                                                "Valores devem ser expressos em kg/ha.\nTer em atenção que:\n- De acordo com o Regulamento 2018/848, em Agricultura Biológica, a quantidade total de estrume animal a aplicar não pode exceder 170 kg de azoto por ano e por hectare;\n\n- Nas parcelas em Zona Vulnerável, de acordo com a Portaria n.º259/2012, a quantidade de matérias fertilizantes de natureza orgânica a aplicar, por hectare de SAU e ano, não pode veicular mais de 250 kg de azoto total, o qual não deve conter mais de 170 kg de azoto total de efluentes pecuários."
                                                            }
                                                        />
                                                    </Stack>
                                                </StyledTableHead>
                                                <StyledTableHead width="8%">
                                                    <Stack direction="row" justifyContent="center">
                                                        P2O5 (kg/ha)
                                                        <BasicPopover
                                                            text={"Valores devem ser expressos em kg/ha."}
                                                        />
                                                    </Stack>
                                                </StyledTableHead>
                                                <StyledTableHead width="8%">
                                                    <Stack direction="row" justifyContent="center">
                                                        K2O (kg/ha)
                                                        <BasicPopover
                                                            text={"Valores devem ser expressos em kg/ha."}
                                                        />
                                                    </Stack>
                                                </StyledTableHead>
                                                <StyledTableHead width="8%">
                                                    <Stack direction="row" justifyContent="center">
                                                        Mg (kg/ha)
                                                        <BasicPopover
                                                            text={"Valores devem ser expressos em kg/ha."}
                                                        />
                                                    </Stack>
                                                </StyledTableHead>
                                                <StyledTableHead width="8%">
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "right",
                                                        }}
                                                    >
                                                        Calagem (kg/ha)
                                                        <BasicPopover
                                                            text={
                                                                "Preencher apenas quando for recomendada a calagem.\n\nValores devem ser expressos em kg/ha."
                                                            }
                                                        />
                                                    </Box>
                                                </StyledTableHead>
                                                <StyledTableHead width="8%">
                                                    {row.elemento_camp1}
                                                </StyledTableHead>
                                                <StyledTableHead width="8%">
                                                    {row.elemento_camp2}
                                                </StyledTableHead>
                                                <StyledTableHead width="8%">
                                                    {row.elemento_camp3}
                                                </StyledTableHead>
                                            </TableRow>
                                            <TableRow>
                                                <StyledTableHead>
                                                    Previsão total de nutrientes a disponibilizar à
                                                    cultura
                                                </StyledTableHead>
                                                <StyledTableCell>{row.previsao_camp1}</StyledTableCell>
                                                <StyledTableCell>{row.previsao_camp2}</StyledTableCell>
                                                <StyledTableCell>{row.previsao_camp3}</StyledTableCell>
                                                <StyledTableCell>{row.previsao_camp4}</StyledTableCell>
                                                <StyledTableCell>{row.previsao_camp5}</StyledTableCell>
                                                <StyledTableCell>{row.previsao_camp6}</StyledTableCell>
                                                <StyledTableCell>{row.previsao_camp7}</StyledTableCell>
                                                <StyledTableCell>{row.previsao_camp8}</StyledTableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    colSpan={3}
                                                    sx={{ fontWeight: 600, fontFamily: "candara" }}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="right"
                                                        alignItems="center"
                                                    >
                                                        Identificar o tipo de calcário aplicado:
                                                        <BasicPopover
                                                            text={
                                                                "Sempre que for efetuado a correção do pH do solo por calagem é obrigatória indicar o teor de magnésio do calcário (em Mg ou MgO).\n\nValores possíveis:\n- Calcário calcítico (constituído apenas por carbonato de cálcio);\n- Calcário magnesiano (teor de óxido de magnésio igual ou superior a 3%);\n- Calcário dolomítico (constituídos por carbonato de cálcio e carbonato de magnésio, mas com teor de óxido de magnésio igual ou superior a 12 %)."
                                                            }
                                                        />
                                                    </Stack>
                                                </TableCell>
                                                <TableCell colSpan={6}>{row.indentifica}</TableCell>
                                            </TableRow>

                                        </>
                                    )
                                }

                            })}
                        </TableBody>
                    </table>
                    <ConfirmDialog
                        open={openDelete}
                        onClose={handleCloseDelete}
                        onConfirm={handleDelete}
                        message="Deseja eliminar o registo?"
                    />
                </TableContainer>
            </CustomThemeProvider>
        </>
    );
};