import React, { ChangeEvent } from "react";
import { useState } from "react";
import {
    Paper,
    Snackbar,
    Stack,
    TableBody,
    TableFooter,
    TablePagination,
} from "@mui/material";
import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import {
    StyledTableHead,
    StyledTableCell,
} from "../../../Styles/tabelCellStyled/customTableCell";
import BasicPopover from "../../../Components/Popover";
import { CustomTextField } from "../../../Styles/theme/customThemeprovider";
import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
import TablePaginationActions from "../../../Components/Pagination/pagination";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import { Alert } from "../../../Components/Alert/Alert";
import { INutrientes } from "../../../Interfaces/anexos/anexo1/composicao_adubacao_azoto_nutrientes1_4_7";




export const NutrientesForm = () => {
    const [createTable, setCreateTable] = useState(false);
    const [message, setMessage] = useState("");
    const [, setError] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSnackSuccess, setOpenSnackSuccess] = useState(false);
    const [openSnackError, setOpenSnackError] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [obj_anexo, set_obj_anexo] = useState<INutrientes>();
    const [obj_anexo_lista, set_obj_anexo_lista] = useState<INutrientes[]>([]);
    const [error_ko_total, set_error_ko_total] = useState<boolean>(false);
    const [error_numero, set_error_numero] = useState<boolean>(false);
    const [error_valor_ref_n, set_error_valor_ref_n] = useState<boolean>(false);
    const [error_valor_ref_po, set_error_valor_ref_po] = useState<boolean>(false);
    const [error_valor_ref_ko, set_error_valor_ref_ko] = useState<boolean>(false);
    const [error_numero_total, set_error_numero_total] = useState<boolean>(false);
    const [error_po_total, set_error_po_total] = useState<boolean>(false);


    const handleEdit = (id: number | null) => {
    };

    // onChange criar
    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name !== "especie") {
            if (isNaN(Number(value))) {
                setError(true);
            } else {
                setError(false);
                Number(value);
            }
        }

    };

    const handleClickOpenDeleteNutrientes = (id: number | null) => {
        setOpenDelete(true);
    };
    const handleCloseDeleteNutrientes = () => {
        setOpenDelete(false);
    };
    const handleDeleteNutrientes = () => {
        // ApiService.deleteById("delete__reg_anexo_um_sete", idToDelete).then(

    };


    const handleCloseSnack = () => {
        setOpenSnackError(false)
        setOpenSnackSuccess(false);
    };



    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - obj_anexo_lista?.length) : 0;

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
                        <TableRow>
                            <TableCell
                                colSpan={8}
                                sx={{
                                    fontWeight: 600,
                                    fontFamily: "candara",
                                    fontSize: 16,
                                }}
                            >
                                1.7 - Nutrientes principais provenientes do excreta dos animais
                                em pastoreio
                                <BasicPopover
                                    text={
                                        "O beneficiário deve preencher este campo no caso das pastagens que são objeto de pastoreio direto."
                                    }
                                />
                            </TableCell>
                            <TableCell>
                                <Stack direction="row" justifyContent="end">
                                    <BarraDeFerramentas
                                        mostrarBotaoNovo
                                        textoBotaoNovo="Novo Registo"
                                        aoClicarNovo={() => setCreateTable(true)}
                                    />
                                </Stack>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableHead sx={{ minWidth: 100 }}>
                                <Stack direction="row">
                                    Espécie pecuária
                                    <BasicPopover
                                        text={
                                            "Identificar a espécie pecuária que pastoreia anualmente a pastagem a que diz respeito o presente plano de fertilização.\n\nDeverão ser acrescentadas linhas ao presente quadro, no caso de não serem suficientes para registar o contributo do excreta do efetivo pecuário que pastoreia a pastagem."
                                        }
                                    />
                                </Stack>
                            </StyledTableHead>
                            <StyledTableHead sx={{ minWidth: 100 }}>
                                <Stack direction="row">
                                    N.º CN/ha
                                    <BasicPopover text="Registar o n.º CN (cabeças normais) que pastoreiam anualmente a pastagem" />
                                </Stack>
                            </StyledTableHead>
                            <StyledTableHead sx={{ minWidth: 100 }}>
                                <Stack direction="row">
                                    Valor de referência N
                                    <BasicPopover text="Preencher de acordo com os valores de referência constantes no Anexo VI do Código das Boas Práticas Agrícolas." />
                                </Stack>
                            </StyledTableHead>
                            <StyledTableHead sx={{ minWidth: 100 }}>
                                <Stack direction="row">
                                    Valor de referência P2O5
                                    <BasicPopover text="Preencher de acordo com os valores de referência constantes no Anexo VI do Código das Boas Práticas Agrícolas." />
                                </Stack>{" "}
                            </StyledTableHead>
                            <StyledTableHead sx={{ minWidth: 100 }}>
                                <Stack direction="row">
                                    Valor de referência K2O
                                    <BasicPopover text="Preencher de acordo com os valores de referência constantes no Anexo VI do Código das Boas Práticas Agrícolas." />
                                </Stack>
                            </StyledTableHead>
                            <StyledTableHead sx={{ minWidth: 100 }}>
                                <Stack direction="row">
                                    N total por espécie/há
                                    <BasicPopover
                                        text={
                                            "Preencher com o resultado do produto do valor de referência para o Nx pelo n.º de CN.\n\nN total/espécie= N.ºCN/ha x Valor ref N"
                                        }
                                    />
                                </Stack>
                            </StyledTableHead>
                            <StyledTableHead sx={{ minWidth: 100 }}>
                                <Stack direction="row">
                                    P2O5 total por espécie
                                    <BasicPopover
                                        text={
                                            "Preencher com o resultado do produto do valor de referência para o P2O5x pelo n.º de CN.\n\nP2O5 total/espécie= N.ºCN/ha x Valor ref P2O5"
                                        }
                                    />
                                </Stack>
                            </StyledTableHead>
                            <StyledTableHead sx={{ minWidth: 100 }}>
                                <Stack direction="row">
                                    K2O total por espécie/ha
                                    <BasicPopover
                                        text={
                                            "Preencher com o resultado do produto do valor de referência para o K2Ox pelo n.º de CN.\n\nK2O total/espécie= N.ºCN/ha x Valor ref K2O"
                                        }
                                    />
                                </Stack>
                            </StyledTableHead>
                            <StyledTableHead>Ações</StyledTableHead>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {createTable && (
                            <>
                                <TableRow>
                                    <StyledTableHead>
                                        <CustomTextField
                                            name="especie"
                                            value={obj_anexo?.especie === undefined ? '' : obj_anexo?.especie}
                                            onChange={onInputChange}
                                        />
                                    </StyledTableHead>
                                    <StyledTableHead>
                                        <CustomTextField
                                            name="numero"
                                            value={obj_anexo?.numero === undefined ? '' : obj_anexo?.numero}
                                            onChange={onInputChange}
                                            error={error_numero}
                                            helperText={error_numero ? "Apenas números são aceites" : ""}
                                        />
                                    </StyledTableHead>
                                    <StyledTableHead>
                                        <CustomTextField
                                            name="valor_ref_n"
                                            value={obj_anexo?.valor_ref_n === undefined ? '' : obj_anexo?.valor_ref_n}
                                            onChange={onInputChange}
                                            error={error_valor_ref_n}
                                            helperText={error_valor_ref_n ? "Apenas números são aceites" : ""}
                                        />
                                    </StyledTableHead>
                                    <StyledTableHead>
                                        <CustomTextField
                                            name="valor_ref_po"
                                            value={obj_anexo?.valor_ref_po === undefined ? '' : obj_anexo?.valor_ref_po}
                                            onChange={onInputChange}
                                            error={error_valor_ref_po}
                                            helperText={error_valor_ref_po ? "Apenas números são aceites" : ""}
                                        />
                                    </StyledTableHead>
                                    <StyledTableHead>
                                        <CustomTextField
                                            name="valor_ref_ko"
                                            value={obj_anexo?.valor_ref_ko === undefined ? '' : obj_anexo?.valor_ref_ko}
                                            onChange={onInputChange}
                                            error={error_valor_ref_ko}
                                            helperText={error_valor_ref_ko ? "Apenas números são aceites" : ""}
                                        />
                                    </StyledTableHead>
                                    <StyledTableHead>
                                        <CustomTextField
                                            name="numero_total"
                                            value={obj_anexo?.numero_total === undefined ? '' : obj_anexo?.numero_total}
                                            onChange={onInputChange}
                                            error={error_numero_total}
                                            helperText={error_numero_total ? "Apenas números são aceites" : ""}
                                        />
                                    </StyledTableHead>
                                    <StyledTableHead>
                                        <CustomTextField
                                            name="po_total"
                                            value={obj_anexo?.po_total === undefined ? '' : obj_anexo?.po_total}
                                            onChange={onInputChange}
                                            error={error_po_total}
                                            helperText={error_po_total ? "Apenas números são aceites" : ""}
                                        />
                                    </StyledTableHead>
                                    <StyledTableHead>
                                        <CustomTextField
                                            name="ko_total"
                                            value={obj_anexo?.ko_total === undefined ? '' : obj_anexo?.ko_total}
                                            onChange={onInputChange}
                                            error={error_ko_total}
                                            helperText={error_ko_total ? "Apenas números são aceites" : ""}
                                        />
                                    </StyledTableHead>
                                    <StyledTableHead>
                                        <ButtonCadernos
                                            mostrarBotaoCancelar
                                            aoClicarCancelar={() => setCreateTable(false)}
                                            mostrarBotaoGravar
                                            aoClicarGravar={() => { }}
                                        />
                                    </StyledTableHead>
                                </TableRow>
                            </>
                        )}

                        {(rowsPerPage > 0
                            ? obj_anexo_lista?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : obj_anexo_lista
                        ).map((row) => {
                            if (obj_anexo?.id_nutrientes === row.id_nutrientes) {
                                return (
                                    <TableRow>

                                        <StyledTableCell>
                                            <CustomTextField
                                                name="especie"
                                                value={obj_anexo?.especie === undefined ? '' : obj_anexo?.especie}
                                                onChange={onInputChange}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="numero"
                                                value={obj_anexo?.numero === undefined ? '' : obj_anexo?.numero}
                                                onChange={onInputChange}
                                                error={error_numero}
                                                helperText={error_numero ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="valor_ref_n"
                                                value={obj_anexo?.valor_ref_n === undefined ? '' : obj_anexo?.valor_ref_n}
                                                onChange={onInputChange}
                                                error={error_valor_ref_n}
                                                helperText={error_valor_ref_n ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="valor_ref_po"
                                                value={obj_anexo?.valor_ref_po === undefined ? '' : obj_anexo?.valor_ref_po}
                                                onChange={onInputChange}
                                                error={error_valor_ref_po}
                                                helperText={error_valor_ref_po ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="valor_ref_ko"
                                                value={obj_anexo?.valor_ref_ko === undefined ? '' : obj_anexo?.valor_ref_ko}
                                                onChange={onInputChange}
                                                error={error_valor_ref_ko}
                                                helperText={error_valor_ref_ko ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="numero_total"
                                                value={obj_anexo?.numero_total === undefined ? '' : obj_anexo?.numero_total}
                                                onChange={onInputChange}
                                                error={error_numero_total}
                                                helperText={error_numero_total ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="po_total"
                                                value={obj_anexo?.po_total === undefined ? '' : obj_anexo?.po_total}
                                                onChange={onInputChange}
                                                error={error_po_total}
                                                helperText={error_po_total ? "Apenas números são aceites" : ""}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <CustomTextField
                                                name="ko_total"
                                                value={obj_anexo?.ko_total === undefined ? '' : obj_anexo?.ko_total}
                                                onChange={onInputChange}
                                                error={error_ko_total}
                                                helperText={error_ko_total ? "Apenas números são aceites" : ""}
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
                                )
                            } else {
                                return (
                                    <TableRow>

                                        <StyledTableCell>{row.especie}</StyledTableCell>
                                        <StyledTableCell>{row.numero}</StyledTableCell>
                                        <StyledTableCell>{row.valor_ref_n}</StyledTableCell>
                                        <StyledTableCell>{row.valor_ref_po}</StyledTableCell>
                                        <StyledTableCell>{row.valor_ref_ko}</StyledTableCell>
                                        <StyledTableCell>{row.numero_total}</StyledTableCell>
                                        <StyledTableCell>{row.po_total}</StyledTableCell>
                                        <StyledTableCell>{row.ko_total}</StyledTableCell>

                                        <StyledTableCell>
                                            <ButtonCadernos
                                                mostrarBotaoEditar
                                                aoClicarEditar={() => handleEdit(row.id_nutrientes)}
                                                mostrarBotaoApagar
                                                aoClicarApagar={() => handleClickOpenDeleteNutrientes(row.id_nutrientes)}
                                            />
                                        </StyledTableCell>

                                    </TableRow>
                                )
                            }

                        }


                        )}
                        <TableRow>
                            <StyledTableHead colSpan={5} sx={{ textAlign: "right" }}>
                                Total (kg/ha):
                                <BasicPopover
                                    text={
                                        "Preencher com o resultado da soma dos valores registados nas colunas «N total por espécie», «P2O5 total por espécie» e «K2O total por espécie»."
                                    }
                                />
                            </StyledTableHead>
                            <StyledTableCell>somaN_Total</StyledTableCell>
                            <StyledTableCell>somaPO_Total</StyledTableCell>

                            <StyledTableCell>somaKo_Total</StyledTableCell>
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
                                count={obj_anexo_lista?.length}
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
                <ConfirmDialog
                    open={openDelete}
                    onClose={handleCloseDeleteNutrientes}
                    onConfirm={handleDeleteNutrientes}
                    message="Deseja eliminar o registo?"
                />
            </TableContainer>
        </>
    );
};