import React from "react";
import { ChangeEvent, useState } from "react";
import {
    CustomTextField,
    CustomThemeProvider,
} from "../../../Styles/theme/customThemeprovider";
import {
    Box,
    Paper,
    Snackbar,
    Stack,
    TableCell,
    TableRow,
} from "@mui/material";
import { TableBody, TableContainer, TableHead } from "@mui/material";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import BasicPopover from "../../../Components/Popover";
import { StyledTableCell } from "../../../Styles/tabelCellStyled/customTableCell";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import { Alert } from "../../../Components/Alert/Alert";
import { IAzoto } from "../../../Interfaces/anexos/anexo1/composicao_adubacao_azoto_nutrientes1_4_7";



export const AzotoForm = () => {
    const [createTable, setCreateTable] = useState(false);
    const [message, setMessage] = useState("");
    const [error_n, set_error_n] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
    const [openSnackError, setOpenSnackError] = React.useState(false);
    const [obj_anexo, set_obj_anexo] = useState<IAzoto>();
    const [obj_anexo_lista, set_obj_anexo_lista] = useState<IAzoto[]>([]);

    const handleEdit = (id: number | null) => {
    };

    // onChange criar
    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "n") {
            if (isNaN(Number(value))) {
            } else {
                Number(value);
            }
        }

    };
    // onChange editar
    const onEditTableChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name !== "n") {
            if (isNaN(Number(value))) {
            } else {
                Number(value);
            }
        }


    };

    // Eliminar
    const handleClickOpenDeleteAzoto = (id: number | null) => {
        setOpenDelete(true);
    };
    const handleCloseDeleteAzoto = () => {
        setOpenDelete(false);
    };
    const handleDeleteAzoto = () => {
        // ApiService.deleteById("delete__reg_anexo_um_seis", idToDelete).then(

    };

    const handleCloseSnack = () => {
        setOpenSnackSuccess(false);
        setOpenSnackError(false);
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
                <table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                colSpan={2}
                                sx={{
                                    fontWeight: 600,
                                    textAlign: "left",
                                    fontFamily: "candara",
                                    fontSize: 16,
                                    width: "60%",
                                }}
                            >
                                1.6 - Azoto proveniente dos resíduos das culturas precedentes
                                <BasicPopover
                                    text={
                                        "O beneficiário deve preencher este campo com base nos valores do Quadro 2 do Anexo VI da portaria n.º 259/2012, de 28 de agosto Ou com base no Quadro 21 do Manual de Fertilização das Culturas do INIAV (2022)."
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
                            <TableCell>
                                <Stack direction="row" justifyContent="start">
                                    Nr (kg/ha):
                                    <Box margin={-1} padding={0}>
                                        <BasicPopover
                                            text={
                                                "Preencher de acordo com Portaria n.º259/2012_Programa de Ação - Anexo VI - Quadro 2.  \n\nPrecedente cultural ........................ Azoto a adicionar (+) ou retirar (-) à recomendação  \n Beterraba (folhas recolhidas) ……………………………………........... 0  \n Beterraba (folhas incorporadas) ............................................... -20  \nCereais (palha recolhida) ........................................................... 0 \n Cereais (palha incorporada) ...................................................... 20 \n Couve-brócolo ......................................................................... -30   \n  Couve-de-bruxelas ................................................................... -30   \n Couve-flor ............................................................................... -30  \nPrado temporário (2 ou mais anos) ........................................... -20 \n Prado luzerna .......................................................................... -40                          \n  Cultura intercalar - gramíneas ..................................... -1,5 kg de N/t matéria verde incorporada                            \nCultura intercalar - leguminosas .................................. -2,5 kg de N/t matéria verde incorporada"
                                            }
                                        />
                                    </Box>
                                </Stack>
                            </TableCell>
                            <TableCell colSpan={2}></TableCell>
                        </TableRow>
                        {createTable && (
                            <TableRow>

                                <StyledTableCell>
                                    <CustomTextField
                                        name="n"
                                        value={obj_anexo?.n === undefined ? '' : obj_anexo?.n}
                                        onChange={onInputChange}
                                        error={error_n}
                                        helperText={error_n ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                            </TableRow>
                        )}

                        {obj_anexo_lista?.map((tab) => {
                            if (tab.id_azoto === obj_anexo?.id_azoto) {
                                return (
                                    <>
                                        <TableRow>
                                            <TableCell colSpan={2}>
                                                <Stack direction="row" justifyContent="end">
                                                    <ButtonCadernos
                                                        mostrarBotaoGravar
                                                        aoClicarGravar={() => { }}
                                                        mostrarBotaoCancelar
                                                        aoClicarCancelar={() => { }}
                                                    />
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Stack direction="row" justifyContent="start">
                                                    Nr (kg/ha):
                                                    <Box margin={-1} padding={0}>
                                                        <BasicPopover
                                                            text={
                                                                "Preencher de acordo com Portaria n.º259/2012_Programa de Ação - Anexo VI - Quadro 2.  \n\nPrecedente cultural ........................ Azoto a adicionar (+) ou retirar (-) à recomendação  \n Beterraba (folhas recolhidas) ……………………………………........... 0  \n Beterraba (folhas incorporadas) ............................................... -20  \nCereais (palha recolhida) ........................................................... 0 \n Cereais (palha incorporada) ...................................................... 20 \n Couve-brócolo ......................................................................... -30   \n  Couve-de-bruxelas ................................................................... -30   \n Couve-flor ............................................................................... -30  \nPrado temporário (2 ou mais anos) ........................................... -20 \n Prado luzerna .......................................................................... -40                          \n  Cultura intercalar - gramíneas ..................................... -1,5 kg de N/t matéria verde incorporada                            \nCultura intercalar - leguminosas .................................. -2,5 kg de N/t matéria verde incorporada"
                                                            }
                                                        />
                                                    </Box>
                                                </Stack>
                                            </TableCell>
                                            <StyledTableCell>
                                                <CustomTextField
                                                    name="n"
                                                    value={obj_anexo?.n === undefined ? '' : obj_anexo?.n}
                                                    onChange={onEditTableChange}
                                                />
                                            </StyledTableCell>
                                        </TableRow>
                                    </>
                                );
                            } else {
                                return (
                                    <>
                                        <TableRow>
                                                <TableCell colSpan={3}>
                                                    <Stack direction="row" justifyContent="end">
                                                        <ButtonCadernos
                                                            mostrarBotaoEditar
                                                            aoClicarEditar={() => handleEdit(tab.id_azoto)}
                                                            mostrarBotaoApagar
                                                            aoClicarApagar={() =>
                                                                handleClickOpenDeleteAzoto(tab.id_azoto)
                                                            }
                                                        />
                                                    </Stack>
                                                </TableCell>
                                         
                                        </TableRow>
                                       
                                            <TableRow>
                                                <TableCell>
                                                    <Stack direction="row" justifyContent="start">
                                                        Nr (kg/ha):
                                                        <Box margin={-1} padding={0}>
                                                            <BasicPopover
                                                                text={
                                                                    "Preencher de acordo com Portaria n.º259/2012_Programa de Ação - Anexo VI - Quadro 2.  \n\nPrecedente cultural ........................ Azoto a adicionar (+) ou retirar (-) à recomendação  \n Beterraba (folhas recolhidas) ……………………………………........... 0  \n Beterraba (folhas incorporadas) ............................................... -20  \nCereais (palha recolhida) ........................................................... 0 \n Cereais (palha incorporada) ...................................................... 20 \n Couve-brócolo ......................................................................... -30   \n  Couve-de-bruxelas ................................................................... -30   \n Couve-flor ............................................................................... -30  \nPrado temporário (2 ou mais anos) ........................................... -20 \n Prado luzerna .......................................................................... -40                          \n  Cultura intercalar - gramíneas ..................................... -1,5 kg de N/t matéria verde incorporada                            \nCultura intercalar - leguminosas .................................. -2,5 kg de N/t matéria verde incorporada"
                                                                }
                                                            />
                                                        </Box>
                                                    </Stack>
                                                </TableCell>
                                                <StyledTableCell>{tab.n}</StyledTableCell>
                                            </TableRow>
                                        
                                    </>
                                );
                            }
                        })}
                    </TableBody>
                </table>
                <ConfirmDialog
                    open={openDelete}
                    onClose={handleCloseDeleteAzoto}
                    onConfirm={handleDeleteAzoto}
                    message="Deseja eliminar o registo?"
                />
            </TableContainer>
        </CustomThemeProvider>
    );
};