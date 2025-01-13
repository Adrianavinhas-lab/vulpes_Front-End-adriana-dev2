import React, { useEffect, useMemo, useState } from "react";
import  api from "../../Services/api";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import Layout from "../../Styles/layout/index";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
        },

        toolbars: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: theme.spacing(2, 3),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        contents: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },

        label: {
            display: "flex",
            flexWrap: "wrap",
            "& > *": {
                margin: theme.spacing(3),
                width: theme.spacing(16),
                height: theme.spacing(16),
                minWidth: 325,
            },
        },
    })
);

//Formatação das células do Head
const StyledTableHead = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    fontWeight: "bold",
    typography: theme.typography.fontWeightBold,
    padding: theme.spacing(2, 1),
    textAlign: "center",
    fontSize: 14,
}));

//Formatação das células do Body
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
        padding: theme.spacing(0, 1),
        //border: "1px solid #555",
        textAlign: "center",
        fontSize: 12,
    },

    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: "center",
    },
}));

interface ITecnico {
    id: number;
    name: string;
    email: string;
}

export default function SuportAdmin() {
    const classes = useStyles();
    const [searchParams, setSearchParams] = useSearchParams();

    const [rows, setRows] = useState<ITecnico[]>([
        { id: 1, name: "Ticket#####1", email: "quinta@net.pt" },
        { id: 2, name: "Ticket#####2", email: "armenio@net.pt" },
        { id: 3, name: "Ticket#####3", email: "armenio@net.pt" },
    ]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);
    const { id } = useParams();

    const busca = useMemo(() => {
        return searchParams.get("busca") || "";
    }, [searchParams]);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // Mostra opção ok delete para os users
    const handleConfirm = () => {
        setShowConfirm(true);
    };
    //Opção de não delete
    const handleNo = () => {
        setShowConfirm(false);
    };

    //Caso o ser confirme a eleiminação
    const handleRemoveClick = (i: any) => {
        const list = [...rows];
        list.splice(i, 1);
        setRows(list);
        setShowConfirm(false);
    };

    // async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    //   e.preventDefault();

    //   console.log(id);

    //   if (id !== undefined) {
    //     const response = await api.put(`/alunos/${id}`, model);
    //   } else {
    //     var editar: IAluno = {
    //       nome: model.nome,
    //       email: model.email,
    //       idade: model.idade,
    //     };
    //     const response = await api.post(`/alunos`, editar);
    //   }
    //   Back();
    // }

    const handleDelete = (id: number) => {
        console.log(id);
        if (window.confirm('Deseja eliminar o registo?')) {
            api.delete(`/tecnico/${id}`).then(result => {
                if (result instanceof Error) {
                    alert(result.message)
                }
            })
        }
    }

    return (
        <div className={classes.root}>
            <Layout title="Gestão de Técnicos" />
            <main className={classes.contents}>
                <div className={classes.toolbars} />

                <Typography sx={{ fontSize: 25, fontWeight: 700 }}> Recepção</Typography>
                <Paper elevation={3} >
                    <TableContainer
                        component={Paper}
                        variant="outlined"
                        sx={{ height: "auto", margin: "auto" }}
                    >
                        <Table style={{ width: "100%" }}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableHead>Ticket</StyledTableHead>
                                    {/* <StyledTableHead>Email</StyledTableHead> */}
                                    <StyledTableHead>Estado</StyledTableHead>
                                    <StyledTableHead>Acções</StyledTableHead>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <><TableRow key={row.id}>
                                        <StyledTableCell>{row.name}</StyledTableCell>
                                        {/* <StyledTableCell>{row.email}</StyledTableCell> */}
                                        <StyledTableCell>
                                            <Typography sx={{ color: "#F52F2F", fontWeight: 700 }}> A tratar </Typography></StyledTableCell>
                                        <StyledTableCell>

                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="primary"
                                            >
                                                Aceitar
                                            </Button>
                                        </StyledTableCell>
                                    </TableRow>

                                    </>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

               
                <br></br>
                <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ width: "100%" }}>
                        <Typography sx={{ fontSize: 25, fontWeight: 700 }}> A Processar </Typography>
                        <Paper elevation={3} sx={{ width: "100%" }} >
                            <TableContainer
                                component={Paper}
                                variant="outlined"
                                sx={{ height: "auto", margin: "auto" }}
                            >
                                <Table style={{ width: "100%" }}>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableHead>Ticket</StyledTableHead>
                                            {/* <StyledTableHead>Email</StyledTableHead> */}
                                            <StyledTableHead>Estado</StyledTableHead>
                                            <StyledTableHead>Acções</StyledTableHead>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <><TableRow key={row.id}>
                                                <StyledTableCell>{row.name}</StyledTableCell>
                                                {/* <StyledTableCell>{row.email}</StyledTableCell> */}
                                                <StyledTableCell>
                                                    <Typography sx={{ color: "#F0A80D", fontWeight: 700 }}> Em tratamento </Typography></StyledTableCell>
                                                <StyledTableCell>

                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        sx={{ backgroundColor: "#07801B" }}

                                                    >
                                                        Concluir
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        sx={{ backgroundColor: "#C9361C" }}

                                                    >
                                                        Cancelar
                                                    </Button>
                                                </StyledTableCell>
                                            </TableRow>

                                            </>
                                        ))}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                        <br></br>
                     

                        <Typography sx={{ fontSize: 25, fontWeight: 700 }}> Concluido </Typography>
                        <Paper elevation={3}
                            sx={{ width: "100%" }}>
                            <TableContainer
                                component={Paper}
                                variant="outlined"
                                sx={{ height: "auto", margin: "auto" }}
                            >
                                <Table style={{ width: "100%" }}>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableHead>Ticket</StyledTableHead>
                                            {/* <StyledTableHead>Email</StyledTableHead> */}
                                            <StyledTableHead>Estado</StyledTableHead>
                                            <StyledTableHead>Acções</StyledTableHead>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <><TableRow key={row.id}>
                                                <StyledTableCell>{row.name}</StyledTableCell>
                                                {/* <StyledTableCell>{row.email}</StyledTableCell> */}
                                                <StyledTableCell>
                                                    <Typography sx={{ color: "#2FF550", fontWeight: 700 }}> Tratado </Typography></StyledTableCell>
                                                <StyledTableCell>
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        color="primary"

                                                    >
                                                        Ver
                                                    </Button>

                                                    {/* <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => handleDelete(row.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton
                                            color="info"
                                            size="small"
                                        >
                                            <EditIcon />
                                        </IconButton> */}
                                                </StyledTableCell>
                                            </TableRow>

                                            </>
                                        ))}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </div>

                    <div style={{marginLeft:20}}>
                    <Typography sx={{ fontSize: 25, fontWeight: 700 }}> Visão Geral</Typography>
                    <Paper elevation={3} sx={{ width: "100%" ,padding:7.8}} >
                        <div style={{ display: "flex"}}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    '& > :not(style)': {
                                        m: 1,
                                        width: 300,
                                        height: 200,
                                    },
                                }}
                            > <Paper elevation={3}></Paper>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    '& > :not(style)': {
                                        m: 1,
                                        width: 300,
                                        height: 200,
                                    },
                                }}
                            > <Paper elevation={3}></Paper>
                            </Box>


                        </div>
                        <div style={{ display: "flex", }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    '& > :not(style)': {
                                        m: 1,
                                        width: 300,
                                        height: 200,
                                    },
                                }}
                            > <Paper elevation={3}></Paper>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    '& > :not(style)': {
                                        m: 1,
                                        width: 300,
                                        height: 200,
                                    },
                                }}
                            > <Paper elevation={3}></Paper>
                            </Box>
                        </div>
                    </Paper>
                    </div>
                </div>
            </main>
        </div>
    );
}
