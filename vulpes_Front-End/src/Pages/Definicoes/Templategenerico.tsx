import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import dayjs, { Dayjs } from "dayjs";
import { Save } from "@material-ui/icons";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Button, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Table, TableContainer } from "@mui/material";
import { Dialog, DialogContentText } from "@mui/material";
import { Paper, Stack } from "@mui/material";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";

import { BarraDeFerramentas } from "../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { del, post } from "../../Services/tokenConfig";
import BasicPopover from "../../Components/Popover";
import { aviso_sem_info } from "../../Func_genericas/aviso_sem_info";
import { func_print } from "../../Func_genericas/func_print";
import { AuthContext } from "../../AuthContext/AuthContext";
import LoadingVulpes from "../../Styles/Loader/loading";
import { cores, operacao_erro, operacao_sucesso } from "../../Func_genericas/valores_estaticos";
import { ITemplate } from "../../Interfaces/templates/template1";
import ConfirmDialog from "../../Components/CustomDialog/customdialog";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pageContent: {
            margin: theme.spacing(5),
            padding: theme.spacing(3),
        },

        contents: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },

        header: {
            textAlign: "center",
            // background: "#FAFAFA",
            background: "#f2d1c2",
            color: "black",
            fontWeight: 800,
        },
    })
);



//type Dispatcher<S> = Dispatch<SetStateAction<S>>;
interface Props {

    lista_templates: Array<ITemplate>,
    titulo: string,
    tipo_de_anexo: string,
    //set_lista_templates:Dispatch<ITemplate[]>,
    // set_lista_templates: Dispatcher<ITemplate[]>,
    //set_lista_templates: Dispatch<SetStateAction<ITemplate[]>>,
    //set_lista_templates:(lista_templates:SetStateAction<ITemplate[]>) => void,
    set_lista_templates: React.Dispatch<Array<ITemplate>>
    //set_lista_templates:(lista_templates:ITemplate[]) => void,
    // set_lista_templates:React.Dispatch<ITemplate[]>,

}

export const Templategenerico = ({ lista_templates, titulo, tipo_de_anexo, set_lista_templates }: Props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useContext(AuthContext);


    const [is_loading, set_is_loading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [error_descricao, set_error_descricao] = useState(false);
    const [message, setMessage] = useState('');

    const [date] = React.useState<Dayjs | null>(dayjs);

    const [obj_to_update, set_obj_to_update] = useState<ITemplate>();

    const [descricao, setDescricao] = useState("");
    const [id, setId] = useState<any>(0);
    const [openPopupdelete, setOpenPopupDelete] = useState(false);
    const [openTemplateAnexoIV, setOpenTemplateAnexoIV] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);


    /*********************** CREATE TEMPLATE ANEXO IV*********************************************************** */
    const handleOpenTemplateAnexoIV = () => {
        setId("");
        setDescricao("");
        setOpenTemplateAnexoIV(true);
    };
    const handleCloseTemplateAnexoIV = () => {
        setId("");
        setDescricao("");
        setOpenTemplateAnexoIV(false);
    };


    async function handleAddtemplateObject(descricao: string) {

        try {

            if (descricao.length !== 0) {
                try {

                    const data = await post("/new_template", {
                        payload: {
                            id_template: 0,
                            decricao: descricao,
                            tipo_anexo: parseInt(tipo_de_anexo),
                            id_org: auth.user?.id_org,
                            last_update: date,
                            create_date: date,
                            uuid: '',
                        },
                    });

                    if (data.status === 200) {

                        let aux_list = lista_templates
                        aux_list.push(data.data.result)

                        setMessage(data.data.message);
                        setOpenTemplateAnexoIV(false);
                        setShowSuccess(true);

                    } else {
                        setMessage(data.data.message);
                        setOpenTemplateAnexoIV(false); 
                            setShowError(true);


                    }
                } catch (error: any) {
                    func_print('create', error, true)
                    setMessage(error.toString());
                    setShowError(true);


                }
                set_error_descricao(false)

            } else {
                set_error_descricao(true)
            }

        } catch (error: any) {
            func_print('handleAddtemplateObject', error, true)
            set_error_descricao(false)
            setMessage(error.toString());
            setShowError(true);

        }

    }

    /*********************** EDIT TEMPLATE ANEXO IV *********************************************************** */

    const handleOpenTemplate2 = (obj: ITemplate) => {
        set_obj_to_update(obj)
        setDescricao(obj.decricao)
        setOpenUpdateDialog(true);
    };
    const handleCloseUpdateDialog = () => {
        set_obj_to_update(undefined)
        setDescricao('')
        setOpenUpdateDialog(true);
    };


    const handleUpdate = async (descricao: string) => {

        if (descricao.length !== 0) {
            try {
                let resp = await post(`/update_template`, {
                    payload: {
                        id_template: obj_to_update?.id_template,
                        decricao: descricao,
                        tipo_anexo: obj_to_update?.tipo_anexo,
                        id_org: obj_to_update?.id_org,
                        last_update: obj_to_update?.last_update,
                        create_date: obj_to_update?.create_date,
                        uuid: '',
                    },
                })

                if (resp.status === 200) {
                    let aux_list = lista_templates.map((el) => {
                        if (el.id_template !== obj_to_update?.id_template) {
                            return el

                        } else {
                            return resp.data.result
                        }
                    })
                    set_lista_templates(aux_list)
                    setMessage(operacao_sucesso)
                    setShowSuccess(true);

                } else {
                    setMessage(operacao_erro)
                    setShowError(true);

                }
                set_error_descricao(false);
                setOpenUpdateDialog(false);
            } catch (error) {
                func_print('handleUpdate', error, true)
                set_error_descricao(false)
                setShowError(true);


            }

        } else {
            set_error_descricao(true)

        }




    };

    /*********************** DELETE TEMPLATE ANEXO IV *********************************************************** */


    function handleopenPopupDelete(id: string) {
        setId(id);
        setOpenPopupDelete(true);
    }


    const handleremove = async () => {
        try {
            func_print('id', id)
            let data = await del(`/delete_template/${id}`);
            func_print('data', data)

            if (data.status === 200) {

                let aux_list = lista_templates.filter((el) => el.id_template !== id)
                set_lista_templates(aux_list)
                setMessage(data.data.message);
                setShowSuccess(true);

            } else {
                setMessage(data.data.message);
                setShowError(true);


            }
            setOpenPopupDelete(false);
        } catch (error: any) {
            func_print('handleremove', error, true)
            setMessage(error.toString());
            setShowError(true);
            setOpenPopupDelete(false);


        }




    }
    function anexoIV(id_template: string) {

        navigate("/AnexoIVtemplate", {
            state: {
                id_template_params: id_template,
            },
        });
    }

    function anexoV(id_template: string) {

        navigate("/AnexoVtemplate", {
            state: {
                id_template_params: id_template,
            },
        });
    }
    const handleCloseSnack = () => {

        setShowSuccess(false);
        setShowError(false);
    };

    return (
        <div>
            <Paper className={classes.pageContent}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        sx={{ fontSize: 22, fontWeight: 700, fontFamily: "candara" }}
                    >
                        {titulo}

                    </Typography>
                    <BasicPopover text="Aqui poderá criar, apagar e atualizar templates" />
                    <Snackbar
                        open={showSuccess}
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
                        open={showError}
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
                    <Box marginLeft="auto">
                        <BarraDeFerramentas
                            mostrarBotaoNovo
                            textoBotaoNovo="Adicionar template"
                            aoClicarNovo={handleOpenTemplateAnexoIV}
                        />
                    </Box>
                </div>

                <Dialog
                    open={openTemplateAnexoIV}
                    onClose={handleCloseTemplateAnexoIV}
                    fullWidth
                    maxWidth="md"
                >
                    <div style={{
                        backgroundColor: 'white',
                        display: "flex",
                        flexDirection: 'column',

                    }}>

                        <div style={{
                            display: "flex",
                            flexDirection: 'row',
                            justifyContent: 'flex-end',

                        }}>

                            <BarraDeFerramentas
                                mostrarBotaoCancelar
                                aoClicarCancelar={handleCloseTemplateAnexoIV}
                            />
                        </div>
                        <div style={{
                            fontFamily: "candara",
                            fontWeight: 'bold',
                            fontSize: '19px',
                            paddingLeft: '10%',
                        }}>
                            Criar Template
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <TextField
                                error={error_descricao}
                                helperText={error_descricao === true ? 'A descrição introduzida é inválida.' : ''}

                                minRows={4}
                                multiline
                                fullWidth
                                id="descricao"
                                label={
                                    <Typography fontFamily="candara">Descrição</Typography>
                                }
                                placeholder="Descrição "
                                margin="normal"
                                style={{ width: "80%" }}
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />

                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            paddingRight: '15%',
                            paddingTop: 10,
                            paddingBottom: 30
                        }}>
                            <BarraDeFerramentas
                                mostrarBotaoGravar
                                aoClicarGravar={() =>
                                    handleAddtemplateObject(descricao)
                                }
                            />
                        </div>

                    </div>

                </Dialog>
                <ConfirmDialog
                    open={openPopupdelete}
                    onClose={() => setOpenPopupDelete(false)}
                    onConfirm={handleremove}
                    message="Deseja eliminar o registo?"
                />

                <Dialog
                    open={openUpdateDialog}
                    onClose={handleCloseUpdateDialog}
                    fullWidth
                    maxWidth="md"
                >
                    <DialogTitle>Atualização do Template</DialogTitle>
                    <DialogActions>
                        <Box width="100%" margin={4}>

                            <TextField
                                error={error_descricao}
                                helperText={error_descricao === true ? 'A descrição introduzida é inválida.' : ''}
                                multiline
                                fullWidth
                                id="descricao"
                                label="Descrição "
                                placeholder="Descrição "
                                required
                                margin="normal"
                                style={{ width: "100%", paddingRight: "15px" }}
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />

                            <Stack marginTop={3} spacing={2} direction="row" justifyContent="end">
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: cores.cor1,
                                        "&:hover": {
                                            backgroundColor: cores.cor3
                                        },
                                    }}
                                    size="small"
                                    onClick={() => handleUpdate(descricao)}
                                >
                                    <Save />
                                    Gravar
                                </Button>
                                <Button
                                    variant="contained"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        set_obj_to_update(undefined)
                                        setDescricao('')
                                        setOpenUpdateDialog(false);
                                    }}
                                >
                                    <CancelIcon />
                                    Cancelar
                                </Button>
                            </Stack>

                        </Box>
                    </DialogActions>
                </Dialog>
                {
                    is_loading === true ?

                        <LoadingVulpes></LoadingVulpes>
                        :
                        <TableContainer
                            sx={{
                                height: "auto",
                                width: "100%",
                                display: "flex",
                                padding: 4,
                            }}
                        >
                            <Table>
                                <TableHead className={classes.header}>
                                    <TableRow>
                                        <TableCell
                                            sx={{ fontSize: 16, fontWeight: 700, fontFamily: "candara" }}
                                        >
                                            Descrição
                                        </TableCell>
                                        <TableCell
                                            sx={{ fontSize: 16, fontWeight: 700, fontFamily: "candara" }}
                                        >
                                            Ações
                                        </TableCell>
                                        <TableCell
                                            sx={{ fontSize: 16, fontWeight: 700, fontFamily: "candara" }}
                                        >
                                            Anexos
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {lista_templates.length !== 0 &&/* ?
                                        <>{aviso_sem_info}</>  :*/
                                        lista_templates.map((item: any, key: number) => (
                                            <TableRow key={key}>
                                                <TableCell
                                                    sx={{
                                                        maxWidth: 200,
                                                        whiteSpace: 'normal',
                                                        wordWrap: 'break-word'
                                                    }}
                                                >{item.decricao}</TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        size="small"
                                                        /*   color="error" */
                                                        sx={{
                                                            color: cores.cor1

                                                        }}
                                                        onClick={() =>
                                                            handleopenPopupDelete(
                                                                item.id_template

                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>

                                                    <IconButton
                                                        sx={{
                                                            color: cores.cor1

                                                        }}
                                                        size="small"
                                                        onClick={() => handleOpenTemplate2(item)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        sx={{
                                                            "&:hover": {
                                                                backgroundColor: cores.cor3
                                                            },
                                                            background:
                                                                /* item.anexoIV !== 0 ||
                                                                    (flag2 === true &&
                                                                        idfromAnexoIV === item.id_template)
                                                                    ? */ cores.cor1
                                                            /*  : cores.cor3, */
                                                        }} //flag2 == true ? "#1F67D3" : "#DADBD7", color: flag2 == true ? "#F8F5F5" : "#050505" }}
                                                        variant="contained"
                                                        // color="inherit"
                                                        size="small"
                                                        onClick={() =>
                                                            parseInt(tipo_de_anexo) === 4 ?
                                                                anexoIV(item.id_template) : anexoV(item.id_template)
                                                        }
                                                    >
                                                        ANEXO
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                }

            </Paper>
        </div>
    );
};
