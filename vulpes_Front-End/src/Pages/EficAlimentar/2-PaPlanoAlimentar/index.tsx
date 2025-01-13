// import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import { styled, Paper, Snackbar } from "@mui/material";
// import { Box } from "@mui/material";
// import { TableCell, TableRow } from "@mui/material";
// import { TableBody, TableHead } from "@mui/material";
// import { TableContainer } from "@mui/material";
// import MuiAlert, { AlertProps } from "@mui/material/Alert";

// import CadernoLayout from "../../../Styles/layout/cadernoLayout";
// import { del, get, post } from "../../../Services/tokenConfig";
// import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
// import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
// import { ProducaoForrageira } from "./producaoForrageira";
// import LoadingVulpes from "../../../Styles/Loader/loading";

// import useDadosPAForrageira, {
//   IEFIntensividade,
//   IEFProducaoForrageira,
// } from "./interfacePA";
// import { IntensividadeProdutiva } from "./intensividade_produtiva";
// import { CustomThemeProvider } from "../../../Styles/theme/customThemeprovider";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: "flex",
//     },

//     toolbars: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "flex-end",
//       padding: theme.spacing(2, 3),
//       // necessary for content to be below app bar
//       ...theme.mixins.toolbar,
//     },
//     contents: {
//       flexGrow: 1,
//       padding: theme.spacing(3),
//     },
//   })
// );

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//   props,
//   ref
// ) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// export default function EFPlanoAlimentar() {
//   const classes = useStyles();
//   const [, setCreateCabecalho] = useState(false);
//   const [message, setMessage] = React.useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const idrosto = parseInt(localStorage.getItem("id_org") || "0", 10);

//   const [editingIdTabela, setEditingIdTabela] = useState<number | null>(null);
//   const [editingIdIntes, setEditingIdItens] = useState<number | null>(null);
//   const [editRowTabela, setEditRowTabela] = useState(false);
//   const [editRowIntens, setEditRowIntens] = useState(false);
//   const [idToDelete, setIdToDelete] = useState<number | null>(0);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [openDeleteIntens, setOpenDeleteIntens] = useState(false);

//   const {
//     rowsPA,
//     setRowsPA,
//     producaoForrageira,
//     setProducaoForrageira,
//     initialProducaoForrageira,
//     rowsIntensidade,
//     setRowsIntensidade,
//     intensidade,
//     setIntensidade,
//     initialIntensidade,
//     rowsGrupo, setRowsGrupo,
//     grupo,
//     setgGrupo,
//     initialGrupo
//   } = useDadosPAForrageira(idrosto);

//   // useEffect(() => {
//   //   console.log("recebi o id", idrosto)
//   //   setProducaoForrageira((prevNewRow) => ({
//   //     ...prevNewRow,
//   //     id_identificacao: idrosto,
//   //   }));
//   // }, [idrosto, setProducaoForrageira]);

//   /****************** PRODUÇÃO FORRAGEIRA ***************************/
//   // Get Tabela
//   const getTabela = useCallback(
//     async (id) => {
//       setIsLoading(true);
//       try {
//         const { data } = await get(`/get_Producao_Forrageira_id_rosto/${id}`);
//         if (data) {
//           setRowsPA(data.result);
//         }
//       } catch (error) {
//         console.error(error);
//         return new Error(
//           (error as { message: string }).message ||
//             "Erro ao ao listar o Registo"
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [setRowsPA]
//   );
//   //criar tabela
//   const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;

//     // Permite apenas dígitos numéricos
//     const newValue = value.replace(/\D/g, "");

//     setProducaoForrageira((prevAnaliseTerrras) => ({
//       ...prevAnaliseTerrras,
//       [name]: newValue,
//     }));
//   };

//   const handleSave = () => {
//     setIsLoading(true);
//     ApiService.create<IEFProducaoForrageira>(
//       "new_Producao_forrageira",
//       producaoForrageira
//     ).then((result) => {
//       setIsLoading(true);
//       if (result instanceof Error) {
//         setOpenSnackError(true);
//         setMessage("Erro ao gravar!");
//         setIsLoading(false);
//       } else {
//         setCreateCabecalho(false);
//         setOpenSnackSuccess(true);
//         setTimeout(() => {
//           setOpenSnackSuccess(false);
//         });
//         setMessage("Gravado com sucesso!");
//         setIsLoading(false);
//         getTabela(idrosto);
//         setProducaoForrageira(initialProducaoForrageira);
//       }
//     });
//     setIsLoading(false);
//   };
//   // EDITAR
//   const onInputChangeEdit = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;

//     // Permite apenas dígitos numéricos
//     const newValue = value.replace(/\D/g, "");

//     if (editingIdTabela !== null) {
//       const updatedTabela = rowsPA.map((cab) => {
//         if (cab.id_producao === editingIdTabela) {
//           return {
//             ...cab,
//             [name]: newValue,
//           };
//         }
//         return cab;
//       });
//       setRowsPA(updatedTabela);
//     }
//   };
//   const handleUpdate = async () => {
//     if (editingIdTabela !== null) {
//       const tableToUpdate = rowsPA.find(
//         (tab) => tab.id_producao === editingIdTabela
//       );
//       if (!tableToUpdate) {
//         setOpenSnackError(true);
//         setMessage("Tabela não encontrada!");
//         setTimeout(() => {
//           setOpenSnackError(false);
//         }, 3000);
//         return;
//       }

//       setIsLoading(true);
//       try {
//         const updatedCabecalho =
//           await ApiService.updateById<IEFProducaoForrageira>(
//             "update_Producao_forrageira",
//             tableToUpdate
//           );
//         setRowsPA((prevAnaliseTable) =>
//           prevAnaliseTable.map((tab) =>
//             tab.id_producao === updatedCabecalho.id_producao
//               ? updatedCabecalho
//               : tab
//           )
//         );
//         setOpenSnackSuccess(true);
//         setTimeout(() => {
//           setOpenSnackSuccess(false);
//         }, 3000);
//         setMessage("Atualizado com sucesso!");
//         setEditRowTabela(false);
//         setEditingIdTabela(null);
//       } catch (error) {
//         setOpenSnackError(true);
//         setMessage("Erro ao atualizar!");
//         setTimeout(() => {
//           setOpenSnackError(false);
//         }, 3000);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   // Eliminar
//   const handleClickOpenDelete = (id: number | null) => {
//     setIdToDelete(id);
//     setOpenDelete(true);
//   };
//   const handleCloseDelete = () => {
//     setOpenDelete(false);
//   };
//   const handleDelete = () => {
//     ApiService.deleteById("delete_Producao_forrageira", idToDelete).then(
//       (result) => {
//         if (result instanceof Error) {
//           setOpenSnackError(true);
//           setTimeout(() => {
//             setOpenSnackError(false);
//           }, 3000);
//           setMessage("Erro ao eliminar o registo!");
//         } else {
//           setRowsPA((oldRows) => [
//             ...oldRows.filter((oldRow) => oldRow.id_producao !== idToDelete),
//           ]);
//           setOpenDelete(false);
//           setIdToDelete(null);
//           setOpenSnackSuccess(true);
//           setMessage("Registo eliminado com sucesso!");
//         }
//       }
//     );
//   };

//   /********************** INTENSIVIDADE PRODUTIVA *******************/
//   // Get Tabela
//   const getTabelaIntens = useCallback(
//     async (id) => {
//       setIsLoading(true);
//       try {
//         const { data } = await get(`/get_Intensidade_Produtiva_id_rosto/${id}`);
//         if (data) {
//           setRowsIntensidade(data.result);
//         }
//       } catch (error) {
//         console.error(error);
//         return new Error(
//           (error as { message: string }).message ||
//             "Erro ao ao listar o Registo"
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [setRowsIntensidade]
//   );
//   //criar tabela
//   const onInputChangeInt = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;

//     // Permite apenas dígitos numéricos
//     const newValue = value.replace(/\D/g, "");

//     setIntensidade((prevAnaliseTerrras) => ({
//       ...prevAnaliseTerrras,
//       [name]: newValue,
//     }));
//   };

//   const handleSaveInt = () => {
//     setIsLoading(true);
//     ApiService.create<IEFIntensividade>(
//       "new_Intensidade_Produtiva",
//       intensidade
//     ).then((result) => {
//       setIsLoading(true);
//       if (result instanceof Error) {
//         setOpenSnackError(true);
//         setMessage("Erro ao gravar!");
//         setIsLoading(false);
//       } else {
//         setCreateCabecalho(false);
//         setOpenSnackSuccess(true);
//         setTimeout(() => {
//           setOpenSnackSuccess(false);
//         });
//         setMessage("Gravado com sucesso!");
//         setIsLoading(false);
//         getTabelaIntens(idrosto);
//         setIntensidade(initialIntensidade);
//       }
//     });
//     setIsLoading(false);
//   };
//   // EDITAR
//   const onInputChangeEditInt = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;

//     // Permite apenas dígitos numéricos
//     const newValue = value.replace(/\D/g, "");

//     if (editingIdTabela !== null) {
//       const updatedTabela = rowsPA.map((cab) => {
//         if (cab.id_producao === editingIdTabela) {
//           return {
//             ...cab,
//             [name]: newValue,
//           };
//         }
//         return cab;
//       });
//       setRowsPA(updatedTabela);
//     }
//   };
//   const handleUpdateInt = async () => {
//     if (editingIdIntes !== null) {
//       const tableToUpdate = rowsIntensidade.find(
//         (tab) => tab.id_intensidade === editingIdIntes
//       );
//       if (!tableToUpdate) {
//         setOpenSnackError(true);
//         setMessage("Tabela não encontrada!");
//         setTimeout(() => {
//           setOpenSnackError(false);
//         }, 3000);
//         return;
//       }

//       setIsLoading(true);
//       try {
//         const updatedCabecalho = await ApiService.updateById<IEFIntensividade>(
//           "update_Intensidade_Produtiva",
//           tableToUpdate
//         );
//         setRowsIntensidade((prevAnaliseTable) =>
//           prevAnaliseTable.map((tab) =>
//             tab.id_intensidade === updatedCabecalho.id_intensidade
//               ? updatedCabecalho
//               : tab
//           )
//         );
//         setOpenSnackSuccess(true);
//         setTimeout(() => {
//           setOpenSnackSuccess(false);
//         }, 3000);
//         setMessage("Atualizado com sucesso!");
//         setEditRowTabela(false);
//         setEditingIdTabela(null);
//       } catch (error) {
//         setOpenSnackError(true);
//         setMessage("Erro ao atualizar!");
//         setTimeout(() => {
//           setOpenSnackError(false);
//         }, 3000);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   // Eliminar
//   const handleClickOpenDeleteInt = (id: number | null) => {
//     setIdToDelete(id);
//     setOpenDeleteIntens(true);
//   };
//   const handleCloseDeleteInt = () => {
//     setOpenDeleteIntens(false);
//   };
//   const handleDeleteInt = () => {
//     ApiService.deleteById("delete_Intensidade_Produtiva", idToDelete).then(
//       (result) => {
//         if (result instanceof Error) {
//           setOpenSnackError(true);
//           setTimeout(() => {
//             setOpenSnackError(false);
//           }, 3000);
//           setMessage("Erro ao eliminar o registo!");
//         } else {
//           setRowsIntensidade((oldRows) => [
//             ...oldRows.filter((oldRow) => oldRow.id_intensidade !== idToDelete),
//           ]);
//           setOpenDeleteIntens(false);
//           setIdToDelete(null);
//           setOpenSnackSuccess(true);
//           setMessage("Registo eliminado com sucesso!");
//         }
//       }
//     );
//   };

//   // useEffect
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);

//         const requests = [getTabela(idrosto), getTabelaIntens(idrosto)];

//         const responses = await Promise.allSettled(requests);

//         responses.forEach((result) => {
//           if (result.status === "rejected") {
//             console.error("Erro na requisição:", result.reason.message);
//           }
//         });

//         setIsLoading(false);
//       } catch (error) {
//         console.error("Erro ao buscar dados:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [idrosto, getTabela, getTabelaIntens]);

//   /****** ALERTA **********************************/
//   const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
//   const [openSnackError, setOpenSnackError] = React.useState(false);
//   const handleCloseSnack = (
//     event?: React.SyntheticEvent | Event,
//     reason?: string
//   ) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setOpenSnackSuccess(false);
//   };

//   return (
//     <div className={classes.root}>
//       <CadernoLayout
//         title="A.3.4 Melhorar a eficiência alimentar animal para redução das emissões de GEE - Bovinos de Carne										
// "
//       />
//       <main className={classes.contents}>
//         <div className={classes.toolbars} />

//         <Box width="80%" margin="auto">
//           <Beneficiario_nome_id_alinhado_direita />
//         </Box>

//         <Snackbar
//           open={openSnackSuccess}
//           autoHideDuration={2000}
//           onClose={handleCloseSnack}
//         >
//           <Alert
//             onClose={handleCloseSnack}
//             severity="success"
//             sx={{ width: "100%" }}
//           >
//             {message}
//           </Alert>
//         </Snackbar>
//         <Snackbar
//           open={openSnackError}
//           autoHideDuration={2000}
//           onClose={handleCloseSnack}
//         >
//           <Alert
//             onClose={handleCloseSnack}
//             severity="error"
//             sx={{ width: "100%" }}
//           >
//             {message}
//           </Alert>
//         </Snackbar>

//         {isLoading ? (
//           <LoadingVulpes />
//         ) : (
//           <>
//             <CustomThemeProvider>
//               <ProducaoForrageira
//                 tabela={producaoForrageira}
//                 rows={rowsPA}
//                 onInputChange={onInputChange}
//                 updateCreateTable={() => setCreateCabecalho(false)}
//                 onSaveTabela={handleSave}
//                 onSaveEdit={handleUpdate}
//                 onEditTableChange={onInputChangeEdit}
//                 setEditingId={setEditingIdTabela}
//                 setEditRow={setEditRowTabela}
//                 editingId={editingIdTabela}
//                 editRow={editRowTabela}
//                 onDelete={handleClickOpenDelete}
//               />

//               <IntensividadeProdutiva
//                 tabela={intensidade}
//                 rows={rowsIntensidade}
//                 updateCreateTable={() => setCreateCabecalho(false)}
//                 onInputChange={onInputChangeInt}
//                 onSaveTabela={handleSaveInt}
//                 onSaveEdit={handleUpdateInt}
//                 onEditTableChange={onInputChangeEditInt}
//                 setEditingId={setEditingIdItens}
//                 setEditRow={setEditRowIntens}
//                 editingId={editingIdIntes}
//                 editRow={editRowIntens}
//                 onDelete={handleClickOpenDeleteInt}
//               />

//               <TableContainer
//                 component={Paper}
//                 variant="outlined"
//                 sx={{
//                   height: "auto",
//                   width: "auto",
//                   padding: 2,
//                 }}
//               >
//                 {/* <table style={{ width: "60%", marginTop: "3%", padding: "1%" }}>
//                   <TableRow></TableRow>
//                   <TableRow>
//                     <TableCell
//                       colSpan={2}
//                       sx={{
//                         fontWeight: 700,
//                         fontSize: 16,
//                         width: 400,
//                         fontFamily: "candara",
//                       }}
//                     >
//                       2.2 Intensidade Produtiva (CN/ ha de superficie
//                       forrageira)
//                     </TableCell>
//                     <StyledTableCell>
//                       <CustomTextField
//                         name="nome"
//                         // value={anexo.nome}
//                         // onChange={onInputChangeEdit}
//                       />
//                     </StyledTableCell>
//                   </TableRow>

//                   <TableBody>
//                     <TableRow>
//                       <StyledTableHead2 sx={{ width: 200 }}>
//                         CN
//                       </StyledTableHead2>
//                       <StyledTableCell2 sx={{ width: 100 }}></StyledTableCell2>
//                     </TableRow>
//                     <TableRow>
//                       <StyledTableHead2>Superficie forrageira</StyledTableHead2>
//                       <StyledTableCell2>{totalha} </StyledTableCell2>
//                     </TableRow>
//                   </TableBody>

//                   <TableHead>
//                     <TableRow>
//                       <TableCell
//                         colSpan={3}
//                         sx={{
//                           fontWeight: 600,
//                           fontSize: 16,
//                           width: 400,
//                           fontFamily: "candara",
//                         }}
//                       >
//                         2.3.Grupos Homogéneos (identificar atividade e raças)
//                       </TableCell>
//                       {editingId === id ? (
//                         <TableCell colSpan={8}>
//                           <ButtonCadernos
//                             mostrarBotaoGravar
//                             aoClicarGravar={() => criarTabela(newRows)}
//                             mostrarBotaoCancelar
//                             aoClicarCancelar={() => setEditingId(null)}
//                           />
//                         </TableCell>
//                       ) : (
//                         <TableCell
//                           colSpan={8}
//                           sx={{ alignItems: "center", justifyContent: "end" }}
//                         >
//                           <ButtonCadernos
//                             mostrarBotaoEditar
//                             aoClicarEditar={() => handleEdit(id)}
//                             mostrarBotaoApagar
//                             aoClicarApagar={() => handleClickOpenDelete(id)}
//                           />
//                         </TableCell>
//                       )}
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {editingId === id ? (
//                       <>
//                         <TableRow>
//                           <StyledTableHead2 sx={{ width: 200 }}>
//                             Grupo Homogéneo 1:
//                           </StyledTableHead2>
//                           <StyledTableCell>
//                             <TextField
//                               variant="filled"
//                               margin="normal"
//                               value={newRows.grupo_homo1}
//                               name="grupo_homo1"
//                               onChange={(e) =>
//                                 handleNewRowsChange(
//                                   "grupo_homo1",
//                                   e.target.value
//                                 )
//                               }
//                             />
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHead2 sx={{ width: 200 }}>
//                             Grupo Homogéneo 2:
//                           </StyledTableHead2>
//                           <StyledTableCell>
//                             <TextField
//                               variant="filled"
//                               fullWidth
//                               margin="normal"
//                               value={
//                                 editedFields[newRows.id_grupoHomogeneo]
//                                   ?.grupo_homo2 || newRows.grupo_homo2
//                               }
//                               // onChange={(e) =>
//                               //   handleFieldChange(
//                               //     "grupo_homo2",
//                               //     e.target.value,
//                               //     newRows.id_grupoHomogeneo
//                               //   )
//                               // }
//                             />
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHead2 sx={{ width: 200 }}>
//                             Grupo Homogéneo 3:
//                           </StyledTableHead2>
//                           <StyledTableCell>
//                             <TextField
//                               variant="filled"
//                               fullWidth
//                               margin="normal"
//                               value={
//                                 editedFields[newRows.id_grupoHomogeneo]
//                                   ?.grupo_homo3 || newRows.grupo_homo3
//                               }
//                               // onChange={(e) =>
//                               //   handleFieldChange(
//                               //     "grupo_homo3",
//                               //     e.target.value,
//                               //     newRows.id_grupoHomogeneo
//                               //   )
//                               // }
//                             />
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHead2 sx={{ width: 200 }}>
//                             Grupo Homogéneo:
//                           </StyledTableHead2>
//                           <StyledTableCell>
//                             <TextField
//                               variant="filled"
//                               fullWidth
//                               margin="normal"
//                               value={
//                                 editedFields[newRows.id_grupoHomogeneo]
//                                   ?.grupo_homo4 || newRows.grupo_homo4
//                               }
//                               // onChange={(e) =>
//                               //   handleFieldChange(
//                               //     "grupo_homo4",
//                               //     e.target.value,
//                               //     newRows.id_grupoHomogeneo
//                               //   )
//                               // }
//                             />
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHead2 sx={{ width: 200 }}>
//                             Grupo Homogéneo :
//                           </StyledTableHead2>
//                           <StyledTableCell>
//                             <TextField
//                               variant="filled"
//                               fullWidth
//                               margin="normal"
//                               value={
//                                 editedFields[newRows.id_grupoHomogeneo]
//                                   ?.grupo_homo5 || newRows.grupo_homo5
//                               }
//                               // onChange={(e) =>
//                               //   handleFieldChange(
//                               //     "grupo_homo5",
//                               //     e.target.value,
//                               //     newRows.id_grupoHomogeneo
//                               //   )
//                               // }
//                             />
//                           </StyledTableCell>
//                         </TableRow>
//                       </>
//                     ) : (
//                       <>
//                         <TableRow key={newRows.id_grupoHomogeneo}>
//                           <StyledTableHead2 sx={{ width: 200 }}>
//                             Grupo Homogéneo 1:
//                           </StyledTableHead2>
//                           <StyledTableCell></StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHead2 sx={{ width: 200 }}>
//                             Grupo Homogéneo 2:
//                           </StyledTableHead2>
//                           <StyledTableCell></StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHead2 sx={{ width: 200 }}>
//                             Grupo Homogéneo 3:
//                           </StyledTableHead2>
//                           <StyledTableCell></StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHead2 sx={{ width: 200 }}>
//                             Grupo Homogéneo:
//                           </StyledTableHead2>
//                           <StyledTableCell></StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHead2 sx={{ width: 200 }}>
//                             Grupo Homogéneo :
//                           </StyledTableHead2>
//                           <StyledTableCell></StyledTableCell>
//                         </TableRow>
//                       </>
//                     )}
//                   </TableBody>

//                   <TableHead>
//                     <TableRow>
//                       <TableCell
//                         colSpan={11}
//                         sx={{
//                           fontWeight: 700,
//                           fontSize: 16,
//                           width: 400,
//                           fontFamily: "candara",
//                         }}
//                       >
//                         2.4. Total das Necessidades Alimentares e Dieta (efetivo
//                         total e ano civil)
//                       </TableCell>
//                     </TableRow>

//                     <TableRow>
//                       <StyledTableHead rowSpan={2}>
//                         Efetivo Pecuário
//                       </StyledTableHead>
//                       <StyledTableHead rowSpan={2}>CN</StyledTableHead>
//                       <StyledTableHead colSpan={4}>
//                         Necessidades alimentares do efetivo (ano civil)
//                       </StyledTableHead>
//                       <StyledTableHead colSpan={5}>
//                         "Tipo de alimento (ton MS)"
//                       </StyledTableHead>
//                     </TableRow>
//                     <StyledTableHead>"Matéria Seca (ton)"</StyledTableHead>
//                     <StyledTableHead>"Energia (Mjoules)"</StyledTableHead>
//                     <StyledTableHead>"Proteína Bruta (ton)"</StyledTableHead>
//                     <StyledTableHead>"FB/NDF (ton) "</StyledTableHead>
//                     <StyledTableHead>Leite substituição</StyledTableHead>
//                     <StyledTableHead>Pastagem</StyledTableHead>
//                     <StyledTableHead>Silagem</StyledTableHead>
//                     <StyledTableHead>Outra forragem</StyledTableHead>
//                     <StyledTableHead>Alimento composto</StyledTableHead>
//                   </TableHead>
//                   <TableBody>
//                     <TableRow>
//                       <StyledTableHead>Grupo Homogéneo 1:</StyledTableHead>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                     </TableRow>
//                     <TableRow>
//                       <StyledTableHead>Grupo Homogéneo 2:</StyledTableHead>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                     </TableRow>
//                     <TableRow>
//                       <StyledTableHead>Grupo Homogéneo 3:</StyledTableHead>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                     </TableRow>
//                     <TableRow>
//                       <StyledTableHead>Grupo Homogéneo:</StyledTableHead>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                     </TableRow>
//                     <TableRow>
//                       <StyledTableHead>Grupo Homogéneo :</StyledTableHead>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                     </TableRow>
//                     <TableRow>
//                       <StyledTableHead>TOTAL:</StyledTableHead>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                     </TableRow>
//                   </TableBody>
//                 </table> */}

//                 {/* <table
//                   style={{ width: "100%", marginTop: "3%", padding: "1%" }}
//                 >
//                   <TableHead>
//                     <TableRow>
//                       <TableCell
//                         colSpan={3}
//                         sx={{
//                           fontWeight: 700,
//                           fontSize: 16,
//                           width: 400,
//                           fontFamily: "candara",
//                         }}
//                       >
//                         2.5. Alimento Composto
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <StyledTableHead rowSpan={4}>
//                         Efetivo Pecuário
//                       </StyledTableHead>
//                       <StyledTableHead colSpan={6}>
//                         Alimento composto
//                       </StyledTableHead>
//                     </TableRow>
//                     <TableRow>
//                       <StyledTableHead colSpan={6}>Aditivos</StyledTableHead>
//                     </TableRow>
//                     <TableRow>
//                       <StyledTableHead rowSpan={2}>
//                         Organoléticos
//                       </StyledTableHead>
//                       <StyledTableHead rowSpan={2}>Nutritivos</StyledTableHead>
//                       <StyledTableHead colSpan={4}>Zootécnicos</StyledTableHead>
//                     </TableRow>
//                     <TableRow>
//                       <StyledTableHead>Ambientais</StyledTableHead>
//                       <StyledTableHead>
//                         Melhoradores digestibilidade
//                       </StyledTableHead>
//                       <StyledTableHead>
//                         Estabilizadores flora gástrica
//                       </StyledTableHead>
//                       <StyledTableHead>Outros zootécnicos</StyledTableHead>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     <TableRow>
//                       <StyledTableHead>Grupo Homogéneo 1:</StyledTableHead>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                     </TableRow>
//                     <TableRow>
//                       <StyledTableHead>Grupo Homogéneo 2:</StyledTableHead>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                     </TableRow>
//                     <TableRow>
//                       <StyledTableHead>Grupo Homogéneo 3:</StyledTableHead>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                     </TableRow>
//                     <TableRow>
//                       <StyledTableHead>Grupo Homogéneo:</StyledTableHead>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                     </TableRow>
//                     <TableRow>
//                       <StyledTableHead>Grupo Homogéneo :</StyledTableHead>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                     </TableRow>
//                     <TableRow>
//                       <StyledTableHead>TOTAL:</StyledTableHead>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                       <StyledTableCell2></StyledTableCell2>
//                     </TableRow>
//                   </TableBody>
//                 </table> */}

//                 <ConfirmDialog
//                   open={openDelete}
//                   onClose={handleCloseDelete}
//                   onConfirm={handleDelete}
//                   message="Deseja eliminar o registo?"
//                 />
//                  <ConfirmDialog
//                   open={openDeleteIntens}
//                   onClose={handleCloseDeleteInt}
//                   onConfirm={handleDeleteInt}
//                   message="Deseja eliminar o registo?"
//                 />
//               </TableContainer>
//             </CustomThemeProvider>
//           </>
//         )}
//         <Box height={150}></Box>
//       </main>
//     </div>
//   );
// }
export{}