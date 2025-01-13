import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import {
    Box,
    Checkbox,
    FormControlLabel,
    SelectChangeEvent,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Paper, TableBody } from "@mui/material";
import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import {
    StyledTableHead,
    StyledTableCell,
} from "../../../Styles/tabelCellStyled/customTableCell";
import BasicPopover from "../../../Components/Popover";
import {
    CustomSelect,
    CustomTextField,
} from "../../../Styles/theme/customThemeprovider";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { TabelaComposicaoHead } from "./tabela_composicao_head";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import { IComposicaoQ1, IComposicaoQ2 } from "../../../Interfaces/anexos/anexo1/composicao_adubacao_azoto_nutrientes1_4_7";
import { Alert } from "../../../Components/Alert/Alert";
import { especie } from "../../../informacao_estatica";
import { ICabecalho } from "../../../Interfaces/anexos/anexo1/analise_e_foliar1_1_3";
import { get, post } from "../../../Services/tokenConfig";
import { func_print } from "../../../Func_genericas/func_print";


interface ComposicaoQ1Form_prop {
    obj_anexo_cabecalho_selecionado: ICabecalho | undefined;
}


export const ComposicaoQ1Form: React.FC<ComposicaoQ1Form_prop> = ({ obj_anexo_cabecalho_selecionado }) => {
    const [createTable, setCreateTable] = useState(false);
    const [createTableEstrume, setCreateTableEstrume] = useState(false);
    const [createTableChorume, setCreateTableChorume] = useState(false);

    const [message, setMessage] = useState("");
    const [openDeleteComposicaoQ1, setOpenDeleteComposicaoQ1] = useState(false);
    const [obj_anexo_lista, set_obj_anexo_lista] = useState<IComposicaoQ1[]>([]);
    const [obj_anexo_lista_q2, set_obj_anexo_lista_q2] = useState<IComposicaoQ2[]>([]);
    const [openSnackSuccess, setOpenSnackSuccess] = useState(false);
    const [openSnackError, setOpenSnackError] = useState(false);
    const [obj_anexo, set_obj_anexo] = useState<IComposicaoQ1>();
    const [obj_anexo_to_edit, set_obj_anexo_to_edit] = useState<IComposicaoQ1>();

    const [obj_anexo_q2, set_obj_anexo_q2] = useState<IComposicaoQ2>();
    const [obj_anexo_q2_to_edit, set_obj_anexo_q2_to_edit] = useState<IComposicaoQ2>();
    const [error_estrume_camp2, set_error_estrume_camp2] = useState(false);
    const [error_estrume_camp3, set_error_estrume_camp3] = useState(false);
    const [error_estrume_camp4, set_error_estrume_camp4] = useState(false);
    const [error_chorume_camp2, set_error_chorume_camp2] = useState(false);
    const [error_chorume_camp3, set_error_chorume_camp3] = useState(false);
    const [error_chorume_camp4, set_error_chorume_camp4] = useState(false);

    const [isLoading, setIsLoading] = useState(false);


    const handleEdit = (id: number | null) => {
    };

    const handleEditTable = (id: number | null) => {
    };
    const onInputChangeTable = () => {

    }
    const onEditTableChangeTable = () => {

    }
    //criar Q1
    const onInputChange = (event: any) => {
        const { name, value, type, checked } = event.target;
        let aux_obj_anexo: any = obj_anexo_to_edit === undefined ? {} : obj_anexo_to_edit

        if (type === "checkbox") {
            aux_obj_anexo[name] = aux_obj_anexo[name] === undefined ? true : !aux_obj_anexo[name]
            set_obj_anexo_to_edit(aux_obj_anexo);

        } else {
            if (name === 'estrume_camp2') {
                if (!/^\d+$/.test(value)) {
                    set_error_estrume_camp2(true)
                } else {
                    set_error_estrume_camp2(false)
                }
            }
            if (name === 'estrume_camp3') {
                if (!/^\d+$/.test(value)) {
                    set_error_estrume_camp3(true)
                } else {
                    set_error_estrume_camp3(false)
                }
            }
            if (name === 'estrume_camp4') {
                if (!/^\d+$/.test(value)) {
                    set_error_estrume_camp4(true)
                } else {
                    set_error_estrume_camp4(false)
                }
            }
            if (name === 'chorume_camp2') {
                if (!/^\d+$/.test(value)) {
                    set_error_chorume_camp2(true)
                } else {
                    set_error_chorume_camp2(false)
                }
            }
            if (name === 'chorume_camp3') {
                if (!/^\d+$/.test(value)) {
                    set_error_chorume_camp3(true)
                } else {
                    set_error_chorume_camp3(false)
                }
            }
            if (name === 'chorume_camp4') {
                if (!/^\d+$/.test(value)) {
                    set_error_chorume_camp4(true)
                } else {
                    set_error_chorume_camp4(false)
                }
            }
            set_obj_anexo_to_edit((old: any) => ({
                ...old,
                [name]: value,
            }));
        }
    };

    // Editar Q1
    const onEditTableChange = (
        event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
    ) => {

    };
    // Eliminar Q1
    const handleClickOpenDeleteComposicaoQ1 = (id: number | null) => {
        setOpenDeleteComposicaoQ1(true);
    };
    const handleCloseDeleteComposicaoQ1 = () => {
        setOpenDeleteComposicaoQ1(false);
    };
    const handleDeleteComposicaoQ1 = () => {
        // ApiService.deleteById("delete__reg_anexo_um_quatro_um", idToDelete).then(

    };

    const filteredRowsEstrume = obj_anexo_lista.filter(
        (tab) =>
            tab &&
            (tab.estrume_camp1 ||
                tab.estrume_camp2 ||
                tab.estrume_camp3 ||
                tab.estrume_camp4)
    );

    const filteredRowsChorume = obj_anexo_lista.filter(
        (tab) =>
            tab &&
            (tab.chorume_camp1 ||
                tab.chorume_camp2 ||
                tab.chorume_camp3 ||
                tab.chorume_camp4)
    );


    const handleCloseSnack = () => {
        setOpenSnackSuccess(false);
        setOpenSnackError(false);
    };
    const handle_criar_anexo = async () => {
        if (error_estrume_camp2 || error_estrume_camp3 || error_estrume_camp4 || error_chorume_camp2 || error_chorume_camp3 || error_chorume_camp4) {
            setMessage("Erro ao efetuar a sua operação!");
            setOpenSnackError(true);

        } else {

            try {
                setIsLoading(true);

                let data = await post("new_reg_anexo_um_quatro_um", {
                    payload: {

                        id_anexo_um_quatro_um: 0,
                        estrume_camp1: obj_anexo_to_edit?.estrume_camp1 === undefined ? '' : obj_anexo_to_edit?.estrume_camp1,
                        estrume_camp2: obj_anexo_to_edit?.estrume_camp2 === undefined ? '' : obj_anexo_to_edit?.estrume_camp2,
                        estrume_camp3: obj_anexo_to_edit?.estrume_camp3 === undefined ? '' : obj_anexo_to_edit?.estrume_camp3,
                        estrume_camp4: obj_anexo_to_edit?.estrume_camp4 === undefined ? '' : obj_anexo_to_edit?.estrume_camp4,
                        chorume_camp1: obj_anexo_to_edit?.chorume_camp1 === undefined ? '' : obj_anexo_to_edit?.chorume_camp1,
                        chorume_camp2: obj_anexo_to_edit?.chorume_camp2 === undefined ? '' : obj_anexo_to_edit?.chorume_camp2,
                        chorume_camp3: obj_anexo_to_edit?.chorume_camp3 === undefined ? '' : obj_anexo_to_edit?.chorume_camp3,
                        chorume_camp4: obj_anexo_to_edit?.chorume_camp4 === undefined ? '' : obj_anexo_to_edit?.chorume_camp4,
                        id_anexo_um_cabecalho: obj_anexo_cabecalho_selecionado?.id_anexo_um_cabecalho,
                        last_update: new Date().toISOString(),
                        create_date: new Date().toISOString(),
                        uuid: ""
                    }
                })
                func_print('data', data)
                if (data.status === 200) {
                    setMessage("Operação efetuada com sucesso!");
                    setOpenSnackSuccess(true);
                    set_obj_anexo_lista((old) => [...old, data.data.result])
                    set_obj_anexo_to_edit(undefined)

                } else {
                    setMessage("Erro ao efetuar a sua operação!");
                    setOpenSnackError(true);
                }
                setIsLoading(false);

            } catch (error) {
                func_print('handle_criar_anexo', error, true)
                setIsLoading(false);

                setMessage("Erro ao efetuar a sua operação!");
                setOpenSnackError(true);
            }
        }
    }
    const get_info = async () => {
        try {
            let res = await get(
                `/get_reg_anexo_um_quatro_um_cabecalho/${obj_anexo_cabecalho_selecionado?.id_anexo_um_cabecalho}`
            );
            func_print('get_info res2222', res)
            func_print('obj_anexo_cabecalho_selecionado?.id_anexo_um_cabecalho res1111', obj_anexo_cabecalho_selecionado?.id_anexo_um_cabecalho)
            if (res.status === 200) {
                if (res.data.result.length !== 0) {
                    set_obj_anexo_lista(res.data.result);
                } else {
                    setCreateTable(true)
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
            if (obj_anexo_cabecalho_selecionado !== undefined) {

                await get_info();

            }
        })();
    }, [obj_anexo_cabecalho_selecionado]);


    return (
        <>
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
                        <TabelaComposicaoHead />
                    </TableHead>

                    <TableBody>
                        {createTableEstrume ? (
                            <TableRow>
                                <StyledTableHead>Estrume</StyledTableHead>
                                <StyledTableCell>
                                    <CustomSelect
                                        value={obj_anexo_to_edit?.estrume_camp1 === undefined ? '' : obj_anexo_to_edit?.estrume_camp1}
                                        name="estrume_camp1"
                                        onChange={onInputChange}
                                        options={especie}
                                        label=""
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="estrume_camp2"
                                        value={obj_anexo_to_edit?.estrume_camp2 === undefined ? '' : obj_anexo_to_edit?.estrume_camp2}
                                        onChange={onInputChange}
                                        error={error_estrume_camp2}
                                        helperText={error_estrume_camp2 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="estrume_camp3"
                                        value={obj_anexo_to_edit?.estrume_camp3 === undefined ? '' : obj_anexo_to_edit?.estrume_camp3}
                                        onChange={onInputChange}
                                        error={error_estrume_camp3}
                                        helperText={error_estrume_camp3 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="estrume_camp4"
                                        value={obj_anexo_to_edit?.estrume_camp4 === undefined ? '' : obj_anexo_to_edit?.estrume_camp4}
                                        onChange={onInputChange}
                                        error={error_estrume_camp4}
                                        helperText={error_estrume_camp4 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <ButtonCadernos
                                        mostrarBotaoCancelar
                                        aoClicarCancelar={() => setCreateTableEstrume(false)}
                                        mostrarBotaoGravar
                                        aoClicarGravar={() => { handle_criar_anexo() }}
                                    />
                                </StyledTableCell>
                            </TableRow>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "end",
                                            alignContent: "end",
                                        }}
                                    >
                                        <BarraDeFerramentas
                                            mostrarBotaoNovo
                                            textoBotaoNovo="Adicionar linha Estrume"
                                            aoClicarNovo={() => setCreateTableEstrume(true)}
                                        />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}

                        {filteredRowsEstrume.map((tab, index) => {
                            if (tab.id_anexo_um_quatro_um === obj_anexo?.id_anexo_um_quatro_um) {

                                return (
                                    <>
                                        <StyledTableHead>Estrume</StyledTableHead>
                                        <StyledTableCell>
                                            <CustomSelect
                                                value={obj_anexo?.estrume_camp1 === undefined ? '' : obj_anexo?.estrume_camp1}
                                                name="estrume_camp1"
                                                onChange={onEditTableChange}
                                                options={especie}
                                                label="Espécie Pecuária"
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="estrume_camp2"
                                                value={obj_anexo?.estrume_camp2 === undefined ? '' : obj_anexo?.estrume_camp2}
                                                onChange={onEditTableChange}
                                                error={error_estrume_camp2}
                                                helperText={error_estrume_camp2 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="estrume_camp3"
                                                value={obj_anexo?.estrume_camp3 === undefined ? '' : obj_anexo?.estrume_camp3}
                                                onChange={onEditTableChange}
                                                error={error_estrume_camp3}
                                                helperText={error_estrume_camp3 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="estrume_camp4"
                                                value={obj_anexo?.estrume_camp4 === undefined ? '' : obj_anexo?.estrume_camp4}
                                                onChange={onEditTableChange}
                                                error={error_estrume_camp4}
                                                helperText={error_estrume_camp4 ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <ButtonCadernos
                                                mostrarBotaoCancelar
                                                aoClicarCancelar={() => { }}
                                                mostrarBotaoGravar
                                                aoClicarGravar={() => { }}
                                            />
                                        </StyledTableCell>
                                    </>

                                );
                            } else {

                                return (
                                    <>
                                        <TableRow>
                                            {index === 0 && (
                                                <StyledTableHead rowSpan={filteredRowsEstrume.length}>
                                                    Estrume
                                                </StyledTableHead>
                                            )}

                                            <StyledTableCell>{tab.estrume_camp1}</StyledTableCell>
                                            <StyledTableCell>{tab.estrume_camp2}</StyledTableCell>
                                            <StyledTableCell>{tab.estrume_camp3}</StyledTableCell>
                                            <StyledTableCell>{tab.estrume_camp4}</StyledTableCell>
                                            <StyledTableCell>
                                                <ButtonCadernos
                                                    mostrarBotaoEditar
                                                    aoClicarEditar={() =>
                                                        handleEdit(tab.id_anexo_um_quatro_um)
                                                    }
                                                    mostrarBotaoApagar
                                                    aoClicarApagar={() =>
                                                        handleClickOpenDeleteComposicaoQ1(
                                                            tab.id_anexo_um_quatro_um
                                                        )
                                                    }
                                                />
                                            </StyledTableCell>
                                        </TableRow>
                                    </>
                                )
                            }

                        })}
                        {createTableChorume ? (
                            <TableRow>
                                <StyledTableHead>Chorume</StyledTableHead>
                                <StyledTableCell>
                                    <CustomSelect
                                        value={obj_anexo?.chorume_camp1 === undefined ? '' : obj_anexo?.chorume_camp1}
                                        name="chorume_camp1"
                                        onChange={onInputChange}
                                        options={especie}
                                        label="Espécie Pecuária"
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="chorume_camp2"
                                        value={obj_anexo?.chorume_camp2 === undefined ? '' : obj_anexo?.chorume_camp2}
                                        onChange={onInputChange}
                                        error={error_chorume_camp2}
                                        helperText={error_chorume_camp2 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="chorume_camp3"
                                        value={obj_anexo?.chorume_camp3 === undefined ? '' : obj_anexo?.chorume_camp3}
                                        onChange={onInputChange}
                                        error={error_chorume_camp3}
                                        helperText={error_chorume_camp3 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CustomTextField
                                        name="chorume_camp4"
                                        value={obj_anexo?.chorume_camp4 === undefined ? '' : obj_anexo?.chorume_camp4}
                                        onChange={onInputChange}
                                        error={error_chorume_camp4}
                                        helperText={error_chorume_camp4 ? "Apenas números são aceites" : ""}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <ButtonCadernos
                                        mostrarBotaoCancelar
                                        aoClicarCancelar={() => setCreateTableChorume(false)}
                                        mostrarBotaoGravar
                                        aoClicarGravar={() => { }}
                                    />
                                </StyledTableCell>
                            </TableRow>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "end",
                                            alignContent: "end",
                                        }}
                                    >
                                        <BarraDeFerramentas
                                            mostrarBotaoNovo
                                            textoBotaoNovo="Adicionar linha Chorume"
                                            aoClicarNovo={() => setCreateTableChorume(true)}
                                        />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}

                        {filteredRowsChorume.map((tab, index) => {
                            if (tab.id_anexo_um_quatro_um === obj_anexo?.id_anexo_um_quatro_um) {
                                return (

                                    <>
                                        <TableRow>
                                            <StyledTableHead>Chorume</StyledTableHead>
                                            <StyledTableCell>
                                                <CustomSelect
                                                    value={tab.chorume_camp1}
                                                    name="chorume_camp1"
                                                    onChange={onEditTableChange}
                                                    options={especie}
                                                    label="Espécie Pecuária"
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <CustomTextField
                                                    name="chorume_camp2"
                                                    value={tab.chorume_camp2}
                                                    onChange={onEditTableChange}
                                                    error={error_chorume_camp2}
                                                    helperText={error_chorume_camp2 ? "Apenas números são aceites" : ""}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <CustomTextField
                                                    name="chorume_camp3"
                                                    value={tab.chorume_camp3}
                                                    onChange={onEditTableChange}
                                                    error={error_chorume_camp3}
                                                    helperText={error_chorume_camp3 ? "Apenas números são aceites" : ""}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <CustomTextField
                                                    name="chorume_camp4"
                                                    value={tab.chorume_camp4}
                                                    onChange={onEditTableChange}
                                                    error={error_chorume_camp4}
                                                    helperText={error_chorume_camp4 ? "Apenas números são aceites" : ""}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <ButtonCadernos
                                                    mostrarBotaoCancelar
                                                    aoClicarCancelar={() => { }}
                                                    mostrarBotaoGravar
                                                    aoClicarGravar={() => { }}
                                                />
                                            </StyledTableCell>
                                        </TableRow>
                                    </>
                                )
                            } else {

                                return (
                                    <TableRow key={tab.id_anexo_um_quatro_um}>
                                        {index === 0 && (
                                            <StyledTableHead rowSpan={filteredRowsChorume.length}>
                                                Chorume
                                            </StyledTableHead>
                                        )}
                                        <StyledTableCell>{tab.chorume_camp1}</StyledTableCell>
                                        <StyledTableCell>{tab.chorume_camp2}</StyledTableCell>
                                        <StyledTableCell>{tab.chorume_camp3}</StyledTableCell>
                                        <StyledTableCell>{tab.chorume_camp4}</StyledTableCell>
                                        <StyledTableCell>
                                            <ButtonCadernos
                                                mostrarBotaoEditar
                                                aoClicarEditar={() =>
                                                    handleEdit(tab.id_anexo_um_quatro_um)
                                                }
                                                mostrarBotaoApagar
                                                aoClicarApagar={() =>
                                                    handleClickOpenDeleteComposicaoQ1(
                                                        tab.id_anexo_um_quatro_um
                                                    )
                                                }
                                            />
                                        </StyledTableCell>
                                    </TableRow>
                                )
                            }


                        })}

                        {createTable === true && (
                            <>
                                <TableRow>
                                    <StyledTableHead>
                                        Digerido de Unidade de Biogás
                                    </StyledTableHead>
                                    <StyledTableCell
                                        sx={{ backgroundColor: "lightgrey" }}
                                    ></StyledTableCell>
                                    <StyledTableCell>
                                        <CustomTextField
                                            name="digerido_camp2"
                                            value={obj_anexo_q2?.digerido_camp2 === undefined ? '' : obj_anexo_q2?.digerido_camp2}
                                            onChange={onInputChangeTable}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <CustomTextField
                                            name="digerido_camp3"
                                            value={obj_anexo_q2?.digerido_camp3 === undefined ? '' : obj_anexo_q2?.digerido_camp3}
                                            onChange={onInputChangeTable}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <CustomTextField
                                            name="digerido_camp4"
                                            value={obj_anexo_q2?.digerido_camp4 === undefined ? '' : obj_anexo_q2?.digerido_camp4}
                                            onChange={onInputChangeTable}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell rowSpan={8}>
                                        <ButtonCadernos
                                            mostrarBotaoCancelar
                                            aoClicarCancelar={() => setCreateTable(false)}
                                            mostrarBotaoGravar
                                            aoClicarGravar={() => { }}
                                        />
                                    </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledTableHead>
                                        Sedimentos depositados nos orgãos de armazenamento de
                                        efluentes pecuários (por um período até 2 nos)
                                    </StyledTableHead>
                                    <StyledTableCell
                                        sx={{ backgroundColor: "lightgrey" }}
                                    ></StyledTableCell>
                                    <StyledTableCell>
                                        <CustomTextField
                                            name="sedimentos_camp2"
                                            value={obj_anexo_q2?.sedimentos_camp2 === undefined ? '' : obj_anexo_q2?.sedimentos_camp2}
                                            onChange={onInputChangeTable}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <CustomTextField
                                            name="sedimentos_camp3"
                                            value={obj_anexo_q2?.sedimentos_camp3 === undefined ? '' : obj_anexo_q2?.sedimentos_camp3}
                                            onChange={onInputChangeTable}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <CustomTextField
                                            name="sedimentos_camp4"
                                            value={obj_anexo_q2?.sedimentos_camp4 === undefined ? '' : obj_anexo_q2?.sedimentos_camp4}
                                            onChange={onInputChangeTable}
                                        />
                                    </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledTableHead>
                                        Mistura de um ou mais dos anteriores fertilizantes
                                    </StyledTableHead>
                                    <StyledTableCell
                                        sx={{ backgroundColor: "lightgrey" }}
                                    ></StyledTableCell>
                                    <StyledTableCell>
                                        <CustomTextField
                                            name="mistura_camp2"
                                            value={obj_anexo_q2?.mistura_camp2 === undefined ? '' : obj_anexo_q2?.mistura_camp2}
                                            onChange={onInputChangeTable}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <CustomTextField
                                            name="mistura_camp3"
                                            value={obj_anexo_q2?.mistura_camp3 === undefined ? '' : obj_anexo_q2?.mistura_camp3}
                                            onChange={onInputChangeTable}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <CustomTextField
                                            name="mistura_camp4"
                                            value={obj_anexo_q2?.mistura_camp4 === undefined ? '' : obj_anexo_q2?.mistura_camp4}
                                            onChange={onInputChangeTable}
                                        />
                                    </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledTableHead>
                                        Composto de bioresíduos de origem agrícola
                                    </StyledTableHead>
                                    <StyledTableCell
                                        sx={{ backgroundColor: "lightgrey" }}
                                    ></StyledTableCell>
                                    <StyledTableCell>
                                        <CustomTextField
                                            name="composto_camp2"
                                            value={obj_anexo_q2?.composto_camp2 === undefined ? '' : obj_anexo_q2?.composto_camp2}
                                            onChange={onInputChangeTable}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <CustomTextField
                                            name="composto_camp3"
                                            value={obj_anexo_q2?.composto_camp3 === undefined ? '' : obj_anexo_q2?.composto_camp3}
                                            onChange={onInputChangeTable}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <CustomTextField
                                            name="composto_camp4"
                                            value={obj_anexo_q2?.composto_camp4 === undefined ? '' : obj_anexo_q2?.composto_camp4}
                                            onChange={onInputChangeTable}
                                        />
                                    </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledTableHead>
                                        Composto orgânico de Unidade de tratamento de residuos
                                        sólidos urbanos (Decreto-Lei n.º 30/2022)
                                    </StyledTableHead>
                                    <StyledTableCell
                                        sx={{ backgroundColor: "lightgrey" }}
                                    ></StyledTableCell>
                                    <StyledTableCell>
                                        <CustomTextField
                                            name="opcao_um_camp2"
                                            value={obj_anexo_q2?.opcao_um_camp2 === undefined ? '' : obj_anexo_q2?.opcao_um_camp2}
                                            onChange={onInputChangeTable}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <CustomTextField
                                            name="opcao_um_camp3"
                                            value={obj_anexo_q2?.opcao_um_camp3 === undefined ? '' : obj_anexo_q2?.opcao_um_camp3}
                                            onChange={onInputChangeTable}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <CustomTextField
                                            name="opcao_um_camp4"
                                            value={obj_anexo_q2?.opcao_um_camp4 === undefined ? '' : obj_anexo_q2?.opcao_um_camp4}
                                            onChange={onInputChangeTable}
                                        />
                                    </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledTableCell>
                                        <BasicPopover
                                            text={
                                                "Campo de preenchimento 'livre'.\n\nRegistar o fertilizante orgânico a ser utilizado quando este não se enquadra nos tipos de fertilizantes orgânicos previstos nas linhas acima."
                                            }
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell
                                        sx={{ backgroundColor: "lightgrey" }}
                                    ></StyledTableCell>
                                    <StyledTableCell>
                                        <CustomTextField
                                            name="opcao_dois_camp2"
                                            value={obj_anexo_q2?.opcao_dois_camp2 === undefined ? '' : obj_anexo_q2?.opcao_dois_camp2}
                                            onChange={onInputChangeTable}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <CustomTextField
                                            name="opcao_dois_camp3"
                                            value={obj_anexo_q2?.opcao_dois_camp3 === undefined ? '' : obj_anexo_q2?.opcao_dois_camp3}
                                            onChange={onInputChangeTable}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <CustomTextField
                                            name="opcao_dois_camp4"
                                            value={obj_anexo_q2?.opcao_dois_camp4 === undefined ? '' : obj_anexo_q2?.opcao_dois_camp4}
                                            onChange={onInputChangeTable}
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
                                                            obj_anexo_q2?.origem_tabela === true && true
                                                        }
                                                        value={
                                                            obj_anexo_q2?.origem_tabela === true &&
                                                            obj_anexo_q2?.origem_tabela
                                                        }
                                                        onChange={onInputChangeTable}
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
                                            value={obj_anexo_q2?.tabela === undefined ? '' : obj_anexo_q2?.tabela}
                                            onChange={onInputChangeTable}
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
                                                            obj_anexo_q2?.origem_analise === true && true
                                                        }
                                                        value={
                                                            obj_anexo_q2?.origem_analise === true &&
                                                            obj_anexo_q2?.origem_analise
                                                        }
                                                        onChange={onInputChangeTable}
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
                                            value={obj_anexo_q2?.analise === undefined ? '' : obj_anexo_q2?.analise}
                                            onChange={onInputChangeTable}
                                        />
                                    </TableCell>
                                </TableRow>
                            </>
                        )}

                        {obj_anexo_lista_q2.map((tab) => {
                            if (obj_anexo_q2?.id_anexo_um_quatro_um === tab.id_anexo_um_quatro_um)
                                return (
                                    <>
                                        {obj_anexo_q2?.id_anexo_um_quatro_um === tab.id_anexo_um_quatro_um ? (
                                            <>
                                                <TableRow>
                                                    <StyledTableHead>
                                                        Digerido de Unidade de Biogás
                                                    </StyledTableHead>
                                                    <StyledTableCell
                                                        sx={{ backgroundColor: "lightgrey" }}
                                                    ></StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="digerido_camp2"
                                                            value={tab.digerido_camp2}
                                                            onChange={onEditTableChangeTable}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="digerido_camp3"
                                                            value={tab.digerido_camp3}
                                                            onChange={onEditTableChangeTable}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="digerido_camp4"
                                                            value={tab.digerido_camp4}
                                                            onChange={onEditTableChangeTable}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell rowSpan={8}>
                                                        <ButtonCadernos
                                                            mostrarBotaoGravar
                                                            aoClicarGravar={() => { }}
                                                            mostrarBotaoCancelar
                                                            aoClicarCancelar={() => { }}
                                                        />
                                                    </StyledTableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <StyledTableHead>
                                                        Sedimentos depositados nos orgãos de armazenamento
                                                        de efluentes pecuários (por um período até 2 nos)
                                                    </StyledTableHead>
                                                    <StyledTableCell
                                                        sx={{ backgroundColor: "lightgrey" }}
                                                    ></StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="sedimentos_camp2"
                                                            value={tab.sedimentos_camp2}
                                                            onChange={onEditTableChangeTable}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="sedimentos_camp3"
                                                            value={tab.sedimentos_camp3}
                                                            onChange={onEditTableChangeTable}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="sedimentos_camp4"
                                                            value={tab.sedimentos_camp4}
                                                            onChange={onEditTableChangeTable}
                                                        />
                                                    </StyledTableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <StyledTableHead>
                                                        Mistura de um ou mais dos anteriores fertilizantes
                                                    </StyledTableHead>
                                                    <StyledTableCell
                                                        sx={{ backgroundColor: "lightgrey" }}
                                                    ></StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="mistura_camp2"
                                                            value={tab.mistura_camp2}
                                                            onChange={onEditTableChangeTable}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="mistura_camp3"
                                                            value={tab.mistura_camp3}
                                                            onChange={onEditTableChangeTable}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="mistura_camp4"
                                                            value={tab.mistura_camp4}
                                                            onChange={onEditTableChangeTable}
                                                        />
                                                    </StyledTableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <StyledTableHead>
                                                        Composto de bioresíduos de origem agrícola
                                                    </StyledTableHead>
                                                    <StyledTableCell
                                                        sx={{ backgroundColor: "lightgrey" }}
                                                    ></StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="composto_camp2"
                                                            value={tab.composto_camp2}
                                                            onChange={onEditTableChangeTable}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="composto_camp3"
                                                            value={tab.composto_camp3}
                                                            onChange={onEditTableChangeTable}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="composto_camp4"
                                                            value={tab.composto_camp4}
                                                            onChange={onEditTableChangeTable}
                                                        />
                                                    </StyledTableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <StyledTableHead>
                                                        Composto orgânico de Unidade de tratamento de
                                                        residuos sólidos urbanos (Decreto-Lei n.º 30/2022)
                                                    </StyledTableHead>
                                                    <StyledTableCell
                                                        sx={{ backgroundColor: "lightgrey" }}
                                                    ></StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="opcao_um_camp2"
                                                            value={tab.opcao_um_camp2}
                                                            onChange={onEditTableChangeTable}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="opcao_um_camp3"
                                                            value={tab.opcao_um_camp3}
                                                            onChange={onEditTableChangeTable}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="opcao_um_camp4"
                                                            value={tab.opcao_um_camp4}
                                                            onChange={onEditTableChangeTable}
                                                        />
                                                    </StyledTableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <StyledTableCell>
                                                        <BasicPopover
                                                            text={
                                                                "Campo de preenchimento 'livre'.\n\nRegistar o fertilizante orgânico a ser utilizado quando este não se enquadra nos tipos de fertilizantes orgânicos previstos nas linhas acima."
                                                            }
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell
                                                        sx={{ backgroundColor: "lightgrey" }}
                                                    ></StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="opcao_dois_camp2"
                                                            value={tab.opcao_dois_camp2}
                                                            onChange={onEditTableChangeTable}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="opcao_dois_camp3"
                                                            value={tab.opcao_dois_camp3}
                                                            onChange={onEditTableChangeTable}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <CustomTextField
                                                            name="opcao_dois_camp4"
                                                            value={tab.opcao_dois_camp4}
                                                            onChange={onEditTableChangeTable}
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
                                                                name="origem_tabela"
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
                                                                        checked={tab.origem_tabela === true && true}
                                                                        onChange={onEditTableChangeTable}
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
                                                            value={tab.tabela}
                                                            onChange={onEditTableChangeTable}
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
                                                                        checked={
                                                                            tab.origem_analise === true && true
                                                                        }
                                                                        onChange={onEditTableChangeTable}
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
                                                            value={tab.analise}
                                                            onChange={onEditTableChangeTable}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        ) : (
                                            <>
                                                <TableRow>
                                                    <StyledTableCell>
                                                        Digerido de Unidade de Biogás
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {tab.digerido_camp1}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {tab.digerido_camp2}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {tab.digerido_camp3}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {tab.digerido_camp4}
                                                    </StyledTableCell>
                                                    <StyledTableCell rowSpan={8}>
                                                        <ButtonCadernos
                                                            mostrarBotaoEditar
                                                            aoClicarEditar={() =>
                                                                handleEditTable(tab.id_anexo_um_quatro_um)
                                                            }
                                                            mostrarBotaoApagar
                                                            aoClicarApagar={() => { }}
                                                        />
                                                    </StyledTableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <StyledTableCell>
                                                        Sedimentos depositados nos orgãos de armazenamento
                                                        de efluentes pecuários (por um período até 2 nos)
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {tab.sedimentos_camp1}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {tab.sedimentos_camp2}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {tab.sedimentos_camp3}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {tab.sedimentos_camp4}
                                                    </StyledTableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <StyledTableCell>
                                                        Mistura de um ou mais dos anteriores fertilizantes
                                                    </StyledTableCell>
                                                    <StyledTableCell>{tab.mistura_camp1}</StyledTableCell>
                                                    <StyledTableCell>{tab.mistura_camp2}</StyledTableCell>
                                                    <StyledTableCell>{tab.mistura_camp3}</StyledTableCell>
                                                    <StyledTableCell>{tab.mistura_camp4}</StyledTableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <StyledTableCell>
                                                        Composto de bioresíduos de origem agrícola
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {tab.composto_camp1}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {tab.composto_camp2}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {tab.composto_camp3}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {tab.composto_camp4}
                                                    </StyledTableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <StyledTableCell>
                                                        Composto orgânico de Unidade de tratamento de
                                                        residuos sólidos urbanos (Decreto-Lei n.º 30/2022)
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {tab.opcao_um_camp1}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {tab.opcao_um_camp2}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {tab.opcao_um_camp3}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {tab.opcao_um_camp4}
                                                    </StyledTableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <StyledTableCell>
                                                        <BasicPopover
                                                            text={
                                                                "Campo de preenchimento 'livre'.\n\nRegistar o fertilizante orgânico a ser utilizado quando este não se enquadra nos tipos de fertilizantes orgânicos previstos nas linhas acima."
                                                            }
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {tab.opcao_dois_camp1}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {tab.opcao_dois_camp2}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {tab.opcao_dois_camp3}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {tab.opcao_dois_camp4}
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
                                                                name="origem_tabela"
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
                                                    <TableCell colSpan={2}>{tab.tabela}</TableCell>
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
                                                                        checked={
                                                                            tab.origem_analise === true && true
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
                                                    <TableCell colSpan={2}>{tab.analise}</TableCell>
                                                </TableRow>
                                            </>
                                        )}
                                    </>
                                );
                            return null;
                        })}
                    </TableBody>
                </table>
                <ConfirmDialog
                    open={openDeleteComposicaoQ1}
                    onClose={handleCloseDeleteComposicaoQ1}
                    onConfirm={handleDeleteComposicaoQ1}
                    message="Deseja eliminar o registo?"
                />
            </TableContainer >
        </>
    );
};
