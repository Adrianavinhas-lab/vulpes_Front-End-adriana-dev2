import React from "react";
import { ChangeEvent, useState } from "react";
import { Box, SelectChangeEvent, Snackbar, TableCell } from "@mui/material";
import { Stack } from "@mui/material";
import { TableRow } from "@mui/material";
import { Alert } from "../../../Components/Alert/Alert";
import { StyledTableCell } from "../../../Styles/tabelCellStyled/customTableCell";
import { CustomSelect, CustomTextField } from "../../../Styles/theme/customThemeprovider";
import { nutriente } from "../../../informacao_estatica";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import BasicPopover from "../../../Components/Popover";
import { IPlanoFertil2, IPlanoFertil3 } from "../../../Interfaces/anexos/anexo1/plano_fertil1_4";



export const PlanoFertlizante2Form = () => {
    const [createTable, setCreateTable] = useState(false);
    const [createTable3, setCreateTable3] = useState(false);
    const [message, setMessage] = useState("");
    const [, setError] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openDelete3, setOpenDelete3] = useState(false);
    const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
    const [openSnackError, setOpenSnackError] = React.useState(false);
    const [obj_anexo, set_obj_anexo] = useState<IPlanoFertil2>();
    const [obj_anexo_lista, set_obj_anexo_lista] = useState<IPlanoFertil2[]>([]);
    const [error_fonte_nutri_camp1, seterror_fonte_nutri_camp1] = useState(false);
    const [error_fonte_nutri_camp2, seterror_fonte_nutri_camp2] = useState(false);
    const [error_fonte_nutri_camp3, seterror_fonte_nutri_camp3] = useState(false);
    const [error_fonte_nutri_camp4, seterror_fonte_nutri_camp4] = useState(false);
    const [error_fonte_nutri_camp5, seterror_fonte_nutri_camp5] = useState(false);
    const [error_fonte_nutri_camp6, seterror_fonte_nutri_camp6] = useState(false);
    const [error_fonte_nutri_camp7, seterror_fonte_nutri_camp7] = useState(false);
    const [error_fonte_nutri_camp8, seterror_fonte_nutri_camp8] = useState(false);
    const [obj_anexo_3, set_obj_anexo_3] = useState<IPlanoFertil3>();
    const [obj_anexo_lista_3, set_obj_anexo_lista_3] = useState<IPlanoFertil3[]>([]);


    /********** EDITAR LINHA *************/
    const handleEdit = (id: number | null) => {
    };

    const handleEdit3 = (id: number | null) => {
    };
    // onChange criar
    const onInputChange = (
        event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
    ) => {
        console.log("entrei no onchange");
        const { name, value } = event.target;

        if (name.startsWith("fonte_nutri_camp")) {
            if (isNaN(Number(value))) {
                setError(true);
                return;
            } else {
                setError(false);
                Number(value);
            }
        }


    };

    // onChange Editar
    const onEditTableChange = (
        event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
    ) => {
        const { name, value } = event.target;


    };

    // Eliminar
    const handleClickOpenDelete = (id: number | null) => {
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    const handleDelete = () => {
        // ApiService.deleteById( "delete__reg_anexo_um_plano_ferti_um",

    };

    /*************** Tabela3 ****/
    // Editar
    const onEditTable3Change = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;


    };


    const handleClickOpenDelete3 = (id: number | null) => {
        setOpenDelete3(true);
    };
    const handleCloseDelete3 = () => {
        setOpenDelete3(false);
    };
    const handleDelete3 = () => {
        // ApiService.deleteById( "delete__reg_anexo_um_plano_ferti_dois",

    };



    const handleCloseSnack = () => {

        setOpenSnackSuccess(false);
        setOpenSnackError(false);
    };

    return (
        <>
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

            <TableRow>
                <TableCell colSpan={10}>
                    <Stack direction="row" justifyContent="end">
                        <BarraDeFerramentas
                            mostrarBotaoNovo
                            textoBotaoNovo="Registar"
                            aoClicarNovo={() => setCreateTable(true)}
                        />
                    </Stack>
                </TableCell>
            </TableRow>
            {createTable && (

                <TableRow>
                    <StyledTableCell>
                        <CustomSelect
                            value={obj_anexo?.fonte_nutri === undefined ? '' : obj_anexo?.fonte_nutri}
                            name="fonte_nutri"
                            onChange={onInputChange}
                            options={nutriente}
                            label="Espécie Pecuária"
                        />
                    </StyledTableCell>
                    <StyledTableCell>
                        <CustomTextField
                            name="fonte_nutri_camp1"
                            value={obj_anexo?.fonte_nutri_camp1 === undefined ? '' : obj_anexo?.fonte_nutri_camp1}
                            onChange={onInputChange}
                            error={error_fonte_nutri_camp1}
                            helperText={error_fonte_nutri_camp1 ? "Apenas números são aceites" : ""}
                        />
                    </StyledTableCell>
                    <StyledTableCell>
                        <CustomTextField
                            name="fonte_nutri_camp2"
                            value={obj_anexo?.fonte_nutri_camp2 === undefined ? '' : obj_anexo?.fonte_nutri_camp2}
                            onChange={onInputChange}
                            error={error_fonte_nutri_camp2}
                            helperText={error_fonte_nutri_camp2 ? "Apenas números são aceites" : ""}
                        />
                    </StyledTableCell>
                    <StyledTableCell>
                        <CustomTextField
                            name="fonte_nutri_camp3"
                            value={obj_anexo?.fonte_nutri_camp3 === undefined ? '' : obj_anexo?.fonte_nutri_camp3}
                            onChange={onInputChange}
                            error={error_fonte_nutri_camp3}
                            helperText={error_fonte_nutri_camp3 ? "Apenas números são aceites" : ""}
                        />
                    </StyledTableCell>
                    <StyledTableCell>
                        <CustomTextField
                            name="fonte_nutri_camp4"
                            value={obj_anexo?.fonte_nutri_camp4 === undefined ? '' : obj_anexo?.fonte_nutri_camp4}
                            onChange={onInputChange}
                            error={error_fonte_nutri_camp4}
                            helperText={error_fonte_nutri_camp4 ? "Apenas números são aceites" : ""}
                        />
                    </StyledTableCell>
                    <StyledTableCell>
                        <CustomTextField
                            name="fonte_nutri_camp5"
                            value={obj_anexo?.fonte_nutri_camp5 === undefined ? '' : obj_anexo?.fonte_nutri_camp5}
                            onChange={onInputChange}
                            error={error_fonte_nutri_camp5}
                            helperText={error_fonte_nutri_camp5 ? "Apenas números são aceites" : ""}
                        />
                    </StyledTableCell>
                    <StyledTableCell>
                        <CustomTextField
                            name="fonte_nutri_camp6"
                            value={obj_anexo?.fonte_nutri_camp6 === undefined ? '' : obj_anexo?.fonte_nutri_camp6}
                            onChange={onInputChange}
                            error={error_fonte_nutri_camp6}
                            helperText={error_fonte_nutri_camp6 ? "Apenas números são aceites" : ""}
                        />
                    </StyledTableCell>
                    <StyledTableCell>
                        <CustomTextField
                            name="fonte_nutri_camp7"
                            value={obj_anexo?.fonte_nutri_camp7 === undefined ? '' : obj_anexo?.fonte_nutri_camp7}
                            onChange={onInputChange}
                            error={error_fonte_nutri_camp7}
                            helperText={error_fonte_nutri_camp7 ? "Apenas números são aceites" : ""}
                        />
                    </StyledTableCell>
                    <StyledTableCell>
                        <CustomTextField
                            name="fonte_nutri_camp8"
                            value={obj_anexo?.fonte_nutri_camp8 === undefined ? '' : obj_anexo?.fonte_nutri_camp8}
                            onChange={onInputChange}
                            error={error_fonte_nutri_camp8}
                            helperText={error_fonte_nutri_camp8 ? "Apenas números são aceites" : ""}
                        />
                    </StyledTableCell>

                    <StyledTableCell>
                        <Stack direction="row" justifyContent="center">
                            <ButtonCadernos
                                mostrarBotaoCancelar
                                aoClicarCancelar={() => setCreateTable(false)}
                                mostrarBotaoGravar
                                aoClicarGravar={() => { }}
                            />
                        </Stack>
                    </StyledTableCell>
                </TableRow>

            )}
            {obj_anexo_lista?.map((row) => {
                if (row.id_plano_dois === obj_anexo?.id_plano_dois) {
                    return (
                        <TableRow>
                            <StyledTableCell>
                                <CustomSelect
                                    value={obj_anexo?.fonte_nutri === undefined ? '' : obj_anexo?.fonte_nutri}
                                    name="fonte_nutri"
                                    onChange={onEditTableChange}
                                    options={nutriente}
                                    label="Espécie Pecuária"
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <CustomTextField
                                    name="fonte_nutri_camp1"
                                    value={obj_anexo?.fonte_nutri_camp1 === undefined ? '' : obj_anexo?.fonte_nutri_camp1}
                                    onChange={onEditTableChange}
                                    error={error_fonte_nutri_camp1}
                                    helperText={error_fonte_nutri_camp1 ? "Apenas números são aceites" : ""}
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <CustomTextField
                                    name="fonte_nutri_camp2"
                                    value={obj_anexo?.fonte_nutri_camp2 === undefined ? '' : obj_anexo?.fonte_nutri_camp2}
                                    onChange={onEditTableChange}
                                    error={error_fonte_nutri_camp2}
                                    helperText={error_fonte_nutri_camp2 ? "Apenas números são aceites" : ""}
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <CustomTextField
                                    name="fonte_nutri_camp3"
                                    value={obj_anexo?.fonte_nutri_camp3 === undefined ? '' : obj_anexo?.fonte_nutri_camp3}
                                    onChange={onEditTableChange}
                                    error={error_fonte_nutri_camp3}
                                    helperText={error_fonte_nutri_camp3 ? "Apenas números são aceites" : ""}
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <CustomTextField
                                    name="fonte_nutri_camp4"
                                    value={obj_anexo?.fonte_nutri_camp4 === undefined ? '' : obj_anexo?.fonte_nutri_camp4}
                                    onChange={onEditTableChange}
                                    error={error_fonte_nutri_camp4}
                                    helperText={error_fonte_nutri_camp4 ? "Apenas números são aceites" : ""}
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <CustomTextField
                                    name="fonte_nutri_camp5"
                                    value={obj_anexo?.fonte_nutri_camp5 === undefined ? '' : obj_anexo?.fonte_nutri_camp5}
                                    onChange={onEditTableChange}
                                    error={error_fonte_nutri_camp5}
                                    helperText={error_fonte_nutri_camp5 ? "Apenas números são aceites" : ""}
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <CustomTextField
                                    name="fonte_nutri_camp6"
                                    value={obj_anexo?.fonte_nutri_camp6 === undefined ? '' : obj_anexo?.fonte_nutri_camp6}
                                    onChange={onEditTableChange}
                                    error={error_fonte_nutri_camp6}
                                    helperText={error_fonte_nutri_camp6 ? "Apenas números são aceites" : ""}
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <CustomTextField
                                    name="fonte_nutri_camp7"
                                    value={obj_anexo?.fonte_nutri_camp7 === undefined ? '' : obj_anexo?.fonte_nutri_camp7}
                                    onChange={onEditTableChange}
                                    error={error_fonte_nutri_camp7}
                                    helperText={error_fonte_nutri_camp7 ? "Apenas números são aceites" : ""}
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <CustomTextField
                                    name="fonte_nutri_camp8"
                                    value={obj_anexo?.fonte_nutri_camp8 === undefined ? '' : obj_anexo?.fonte_nutri_camp8}
                                    onChange={onEditTableChange}
                                    error={error_fonte_nutri_camp8}
                                    helperText={error_fonte_nutri_camp8 ? "Apenas números são aceites" : ""}
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <ButtonCadernos
                                    mostrarBotaoGravar
                                    aoClicarGravar={() => { }}
                                    mostrarBotaoCancelar
                                    aoClicarCancelar={() => { }}
                                />
                            </StyledTableCell>
                        </TableRow>


                    )
                } else {
                    return (

                        <TableRow>
                            <StyledTableCell>{row.fonte_nutri} </StyledTableCell>
                            <StyledTableCell>{row.fonte_nutri_camp1}</StyledTableCell>
                            <StyledTableCell>{row.fonte_nutri_camp2}</StyledTableCell>
                            <StyledTableCell>{row.fonte_nutri_camp3}</StyledTableCell>
                            <StyledTableCell>{row.fonte_nutri_camp4}</StyledTableCell>
                            <StyledTableCell>{row.fonte_nutri_camp5}</StyledTableCell>
                            <StyledTableCell>{row.fonte_nutri_camp6}</StyledTableCell>
                            <StyledTableCell>{row.fonte_nutri_camp7}</StyledTableCell>
                            <StyledTableCell>{row.fonte_nutri_camp8}</StyledTableCell>
                            <StyledTableCell>
                                <ButtonCadernos
                                    mostrarBotaoEditar
                                    aoClicarEditar={() => handleEdit(row.id_plano_dois)}
                                    mostrarBotaoApagar
                                    aoClicarApagar={() =>
                                        handleClickOpenDelete(row.id_plano_dois)
                                    }
                                />
                            </StyledTableCell>
                        </TableRow>

                    )
                }
            })}


            {obj_anexo_lista_3?.map((row) => {
                if (row.id_plano_tres === obj_anexo_3?.id_plano_tres) {
                    return (

                        <>
                            <TableRow>
                                <StyledTableCell
                                    sx={{
                                        textAlign: "left",
                                    }}
                                >
                                    A1 - Total de ferilizantes Orgânicos (só efluentes
                                    pecuários e seus equiparados) (kg)
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_um_camp1"
                                        value={obj_anexo_3?.a_um_camp1 === undefined ? '' : obj_anexo_3?.a_um_camp1}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_um_camp2"
                                        value={obj_anexo_3?.a_um_camp2 === undefined ? '' : obj_anexo_3?.a_um_camp2}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_um_camp3"
                                        value={obj_anexo_3?.a_um_camp3 === undefined ? '' : obj_anexo_3?.a_um_camp3}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_um_camp4"
                                        value={obj_anexo_3?.a_um_camp4 === undefined ? '' : obj_anexo_3?.a_um_camp4}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_um_camp5"
                                        value={obj_anexo_3?.a_um_camp5 === undefined ? '' : obj_anexo_3?.a_um_camp5}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_um_camp6"
                                        value={obj_anexo_3?.a_um_camp6 === undefined ? '' : obj_anexo_3?.a_um_camp6}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_um_camp7"
                                        value={obj_anexo_3?.a_um_camp7 === undefined ? '' : obj_anexo_3?.a_um_camp7}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_um_camp8"
                                        value={obj_anexo_3?.a_um_camp8 === undefined ? '' : obj_anexo_3?.a_um_camp8}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell rowSpan={4}>
                                    <ButtonCadernos
                                        mostrarBotaoGravar
                                        aoClicarGravar={() => {}}
                                        mostrarBotaoCancelar
                                        aoClicarCancelar={() => {}}
                                    />
                                </StyledTableCell>
                            </TableRow>

                            <TableRow>
                                <StyledTableCell
                                    sx={{
                                        textAlign: "left",
                                    }}
                                >
                                    A2 - Total de outros fertilizantes orgânicos não
                                    contabilizados em A1 (kg)
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_dois_camp1"
                                        value={obj_anexo_3?.a_dois_camp1 === undefined ? '' : obj_anexo_3?.a_dois_camp1}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_dois_camp2"
                                        value={obj_anexo_3?.a_dois_camp2 === undefined ? '' : obj_anexo_3?.a_dois_camp2}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_dois_camp3"
                                        value={obj_anexo_3?.a_dois_camp3 === undefined ? '' : obj_anexo_3?.a_dois_camp3}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_dois_camp4"
                                        value={obj_anexo_3?.a_dois_camp4 === undefined ? '' : obj_anexo_3?.a_dois_camp4}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_dois_camp5"
                                        value={obj_anexo_3?.a_dois_camp5 === undefined ? '' : obj_anexo_3?.a_dois_camp5}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_dois_camp6"
                                        value={obj_anexo_3?.a_dois_camp6 === undefined ? '' : obj_anexo_3?.a_dois_camp6}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_dois_camp7"
                                        value={obj_anexo_3?.a_dois_camp7 === undefined ? '' : obj_anexo_3?.a_dois_camp7}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_dois_camp8"
                                        value={obj_anexo_3?.a_dois_camp8 === undefined ? '' : obj_anexo_3?.a_dois_camp8}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                            </TableRow>

                            <TableRow>
                                <StyledTableCell
                                    sx={{
                                        textAlign: "left",
                                    }}
                                >
                                    A3 - Total de fertilizantes não orgânicos (kg)
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_tres_camp1"
                                        value={obj_anexo_3?.a_tres_camp1 === undefined ? '' : obj_anexo_3?.a_tres_camp1}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_tres_camp2"
                                        value={obj_anexo_3?.a_tres_camp2 === undefined ? '' : obj_anexo_3?.a_tres_camp2}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_tres_camp3"
                                        value={obj_anexo_3?.a_tres_camp3 === undefined ? '' : obj_anexo_3?.a_tres_camp3}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_tres_camp4"
                                        value={obj_anexo_3?.a_tres_camp4 === undefined ? '' : obj_anexo_3?.a_tres_camp4}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_tres_camp5"
                                        value={obj_anexo_3?.a_tres_camp5 === undefined ? '' : obj_anexo_3?.a_tres_camp5}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_tres_camp6"
                                        value={obj_anexo_3?.a_tres_camp6 === undefined ? '' : obj_anexo_3?.a_tres_camp6}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_tres_camp7"
                                        value={obj_anexo_3?.a_tres_camp7 === undefined ? '' : obj_anexo_3?.a_tres_camp7}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="a_tres_camp8"
                                        value={obj_anexo_3?.a_tres_camp8 === undefined ? '' : obj_anexo_3?.a_tres_camp8}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell>A1+A2+A3</StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="soma_camp1"
                                        value={obj_anexo_3?.soma_camp1 === undefined ? '' : obj_anexo_3?.soma_camp1}
                                        // value={(row.soma_camp1 = somaCampo1)}
                                        onChange={onEditTable3Change}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="soma_camp2"
                                        value={obj_anexo_3?.soma_camp2 === undefined ? '' : obj_anexo_3?.soma_camp2}
                                        // value={(row.soma_camp2 = somaCampo2)}
                                        onChange={onInputChange}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="soma_camp3"
                                        value={obj_anexo_3?.soma_camp3 === undefined ? '' : obj_anexo_3?.soma_camp3}
                                        // value={(row.soma_camp3 = somaCampo3)}
                                        onChange={onInputChange}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="soma_camp4"
                                        value={obj_anexo_3?.soma_camp4 === undefined ? '' : obj_anexo_3?.soma_camp4}
                                        // value={(row.soma_camp4 = somaCampo4)}
                                        onChange={onInputChange}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="soma_camp5"
                                        value={obj_anexo_3?.soma_camp5 === undefined ? '' : obj_anexo_3?.soma_camp5}
                                        // value={(row.soma_camp5 = somaCampo5)}
                                        onChange={onInputChange}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="soma_camp6"
                                        value={obj_anexo_3?.soma_camp6 === undefined ? '' : obj_anexo_3?.soma_camp6}
                                        // value={(row.soma_camp6 = somaCampo6)}
                                        onChange={onInputChange}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="soma_camp7"
                                        value={obj_anexo_3?.soma_camp7 === undefined ? '' : obj_anexo_3?.soma_camp7}
                                        // value={(row.soma_camp7 = somaCampo7)}
                                        onChange={onInputChange}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="soma_camp8"
                                        value={obj_anexo_3?.soma_camp8 === undefined ? '' : obj_anexo_3?.soma_camp8}
                                        // value={(row.soma_camp8 = somaCampo8)}
                                        onChange={onInputChange}
                                    />
                                </StyledTableCell>
                            </TableRow>
                        </>

                    );
                } else {
                    return (

                        <>
                            <TableRow>
                                <StyledTableCell
                                    sx={{
                                        textAlign: "left",
                                    }}
                                >
                                    A1 - Total de ferilizantes Orgânicos (só efluentes
                                    pecuários
                                    <Stack direction="row" justifyContent="start">
                                        e seus equiparados)
                                        <Box margin={-1} padding={0}>
                                            <BasicPopover
                                                text={
                                                    "O beneficiário deve, por cada um dos nutrientes listados, somar as quantidades\n a disponibilizar através dos tipos de fertilizantes orgânicos listados no campo «nutrientes a disponibilizar por tipo de fertilizantes». "
                                                }
                                            />
                                        </Box>
                                    </Stack>
                                </StyledTableCell>
                                <StyledTableCell>{row.a_um_camp1} </StyledTableCell>
                                <StyledTableCell>{row.a_um_camp2} </StyledTableCell>
                                <StyledTableCell>{row.a_um_camp3} </StyledTableCell>
                                <StyledTableCell>{row.a_um_camp4} </StyledTableCell>
                                <StyledTableCell>{row.a_um_camp5} </StyledTableCell>
                                <StyledTableCell>{row.a_um_camp6} </StyledTableCell>
                                <StyledTableCell>{row.a_um_camp7} </StyledTableCell>
                                <StyledTableCell>{row.a_um_camp8} </StyledTableCell>
                                <StyledTableCell
                                    rowSpan={4}
                                    sx={{ alignItems: "center", justifyContent: "end" }}
                                >
                                    <ButtonCadernos
                                        mostrarBotaoEditar
                                        aoClicarEditar={() => handleEdit3(row.id_plano_tres)}
                                        mostrarBotaoApagar
                                        aoClicarApagar={() =>
                                            handleClickOpenDelete3(row.id_plano_tres)
                                        }
                                    />
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell
                                    sx={{
                                        textAlign: "left",
                                    }}
                                >
                                    A2 - Total de outros fertilizantes orgânicos não
                                    contabilizados
                                    <Stack direction="row" justifyContent="start">
                                        em A1
                                        <Box margin={-1} padding={0}>
                                            <BasicPopover
                                                text={
                                                    "O beneficiário deve, por cada um dos nutrientes listados, somar as quantidades\n a disponibilizar através dos tipos de outros fertilizantes orgânicos listados no campo «nutrientes a disponibilizar por tipo de fertilizantes». "
                                                }
                                            />
                                        </Box>
                                    </Stack>
                                </StyledTableCell>
                                <StyledTableCell>{row.a_dois_camp1} </StyledTableCell>
                                <StyledTableCell>{row.a_dois_camp2} </StyledTableCell>
                                <StyledTableCell>{row.a_dois_camp3} </StyledTableCell>
                                <StyledTableCell>{row.a_dois_camp4} </StyledTableCell>
                                <StyledTableCell>{row.a_dois_camp5} </StyledTableCell>
                                <StyledTableCell>{row.a_dois_camp6} </StyledTableCell>
                                <StyledTableCell>{row.a_dois_camp7} </StyledTableCell>
                                <StyledTableCell>{row.a_dois_camp8} </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell
                                    sx={{
                                        textAlign: "left",
                                    }}
                                >
                                    A3 - Total de fertilizantes não
                                    <Stack direction="row" justifyContent="start">
                                        orgânicos
                                        <Box margin={-1} padding={0}>
                                            <BasicPopover
                                                text={
                                                    "O beneficiário deve, por cada um dos nutrientes listados, somar as quantidades\n a disponibilizar através dos tipos de fertilizantes não orgânicos listados no campo «nutrientes a disponibilizar por tipo de fertilizantes». "
                                                }
                                            />
                                        </Box>
                                    </Stack>
                                </StyledTableCell>
                                <StyledTableCell>{row.a_tres_camp1}</StyledTableCell>
                                <StyledTableCell>{row.a_tres_camp2}</StyledTableCell>
                                <StyledTableCell>{row.a_tres_camp3}</StyledTableCell>
                                <StyledTableCell>{row.a_tres_camp4}</StyledTableCell>
                                <StyledTableCell>{row.a_tres_camp5}</StyledTableCell>
                                <StyledTableCell>{row.a_tres_camp6}</StyledTableCell>
                                <StyledTableCell>{row.a_tres_camp7}</StyledTableCell>
                                <StyledTableCell>{row.a_tres_camp8}</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell>
                                    <Stack direction="row" justifyContent="start">
                                        A1+A2+A3
                                        <Box margin={-1} padding={0}>
                                            <BasicPopover
                                                text={
                                                    "Este somatório, por cada um dos nutrientes, não pode ser superior aos valores determinados no campo «Previsão total de nutrientes a disponibilzar à cultura» do «Quadro 3 - Plano de aplicação»."
                                                }
                                            />
                                        </Box>
                                    </Stack>
                                </StyledTableCell>
                                <StyledTableCell>{row.soma_camp1} </StyledTableCell>
                                <StyledTableCell>{row.soma_camp2} </StyledTableCell>
                                <StyledTableCell>{row.soma_camp3} </StyledTableCell>
                                <StyledTableCell>{row.soma_camp4} </StyledTableCell>
                                <StyledTableCell>{row.soma_camp5} </StyledTableCell>
                                <StyledTableCell>{row.soma_camp6} </StyledTableCell>
                                <StyledTableCell>{row.soma_camp7} </StyledTableCell>
                                <StyledTableCell>{row.soma_camp8} </StyledTableCell>
                            </TableRow>
                        </>

                    );
                }
            })}

            <ConfirmDialog
                open={openDelete}
                onClose={handleCloseDelete}
                onConfirm={handleDelete}
                message="Deseja eliminar o registo?"
            />
            <ConfirmDialog
                open={openDelete3}
                onClose={handleCloseDelete3}
                onConfirm={handleDelete3}
                message="Deseja eliminar o registo?"
            />
        </>
    );
};