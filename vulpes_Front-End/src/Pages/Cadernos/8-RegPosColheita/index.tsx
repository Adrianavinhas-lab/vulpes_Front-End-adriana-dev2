// import React, { ChangeEvent, useEffect, useState } from "react";

// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import { Snackbar, TableCell } from "@mui/material";
// import { TableBody, TableFooter, TableHead } from "@mui/material";
// import { TableContainer, TableRow } from "@mui/material";
// import { TextField } from "@mui/material";
// import { Box, Paper, Stack } from "@mui/material";
// import { TablePagination } from "@mui/material";
// import MuiAlert, { AlertProps } from "@mui/material/Alert";

// import CadernoLayout from "../../../Styles/layout/cadernoLayout";
// import { get } from "../../../Services/tokenConfig";
// import TablePaginationActions from "../../../Components/Pagination/pagination";
// import { CabecalhoPosColheitaForm } from "./cabecalho8";
// import ConfirmDialog from "../../../Components/CustomDialog/customdialog";

// import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
// import LoadingVulpes from "../../../Styles/Loader/loading";
// import {
//   StyledTableHead,
//   StyledTableCell,
// } from "../../../Styles/tabelCellStyled/customTableCell";
// import { ICabecalho8, IPage8 } from "../../../Interfaces/cadernos/caderno8";
// import {
//   CustomTextField,
//   CustomThemeProvider,
// } from "../../../Styles/theme/customThemeprovider";

// import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
// import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: "flex",
//     },
//     contents: {
//       flexGrow: 1,
//       padding: theme.spacing(0),
//     },
//     toolbars: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "flex-end",
//       padding: theme.spacing(2, 3),
//       // necessary for content to be below app bar
//       ...theme.mixins.toolbar,
//     },
//   })
// );

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//   props,
//   ref
// ) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// export default function RegPosColheita(props: any) {
//   const classes = useStyles();
//   const [message, setMessage] = React.useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const idrosto = parseInt(localStorage.getItem("idrosto") || "0", 10);
//   const [error, setError] = useState<boolean>(false);
//   const [messageTextField, setMessageTextField] = useState("");

//   const [, setCreateCabecalho] = useState(false); // FECHAR CABEÇALHO POR PROPS
//   const [, setIndex] = useState(0); // INDEX QUE VEM DO ABEÇALHO
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(0); // GRAVA O INDEX SELECIONADO

//   const [idCabecalho, setIdCabecalho] = useState(0);
//   const [idToDelete, setIdToDelete] = useState<number | null>(null);
//   const [openDelete, setOpenDelete] = React.useState(false);
//   const [showNewRow, setShowNewRow] = useState(false);
//   const [editRow, setEditRow] = useState(false);
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
//   const [openSnackError, setOpenSnackError] = React.useState(false);
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const [cabecalhos, setCabecalhos] = useState<ICabecalho8[]>([]);

//   const [rows, setRows] = useState<IPage8[]>([]);
//   const [poscolheita, setPosColheita] = useState<IPage8>({
//     id_registo_pos_colhe: 0,
//     data: "",
//     embalagem: "",
//     quantificacao: "",
//     destinatario: "",
//     quantificacao_dois: "",
//     id_registo_colh: idCabecalho,
//     last_update: new Date().toISOString(),
//     create_date: new Date().toISOString(),
//     uuid: "",
//   });

//   /********************* SELEÇÃO DA ZONA HOMOGÉNEA*****************/
//   useEffect(() => {
//     setPosColheita((prevNewRow) => ({
//       ...prevNewRow,
//       id_registo_colh: idCabecalho,
//     }));
//   }, [idCabecalho]);

//   const handleSelectZona = (index: number, idZonaHomo: any) => {
//     setSelectedIndex(index);
//     setIndex(idZonaHomo);
//     setIdCabecalho(idZonaHomo);
//   };

//   /********************* CABEÇALHO ****************/
//   useEffect(() => {
//     const fetchData = async () => {
//       getCabecalho(idrosto);
//     };

//     fetchData();
//   }, [idrosto]);

//   async function getCabecalho(id_rosto: number) {
//     setIsLoading(true);
//     try {
//       get(`/get_reg_pos_colheita_oito_cabecalho_rosto/${id_rosto}`).then(
//         (data) => {
//           if (data) {
//             const sortedData = data.data.result.sort((a: any, b: any) => {
//               if (a.zona_homo < b.zona_homo) return -1;
//               if (a.zona_homo > b.zona_homo) return 1;
//               return 0;
//             });
//             setCabecalhos(sortedData);
//             setIdCabecalho(sortedData[0].id_registo_colh);
//           }
//         }
//       );
//     } catch (error) {
//       console.error(error);
//       return new Error(
//         (error as { message: string }).message || "Erro ao ao listar o Registo"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   // EDIT
//   const handleInputChangeEditCabecalho = (
//     event: ChangeEvent<HTMLInputElement>
//   ) => {
//     const { name, value, type, checked } = event.target;
//     let newValue: any = type === "checkbox" ? checked : value;

//     if(type === "date" && value === "") {
//       newValue = null;
//     }

//     if (name === "area" || name === "n_planta") {
//       if (isNaN(Number(value))) {
//         setError(true);
//         setMessageTextField("Apenas números são aceites");
//         return;
//       } else {
//         setError(false);
//         setMessageTextField("");
//         newValue = Number(value);
//       }
//     }

//     if (selectedIndex !== null) {
//       const idCabecalhoToEdit = cabecalhos[selectedIndex].id_registo_colh;
//       const updatedCabecalhos = cabecalhos.map((cab) => {
//         if (cab.id_registo_colh === idCabecalhoToEdit) {
//           return {
//             ...cab,
//             [name]: newValue,
//           };
//         }
//         return cab;
//       });
//       setCabecalhos(updatedCabecalhos);
//     }
//   };
//   const handleUpdateCabecalho = async () => {
//     if (selectedIndex !== null) {
//       const cabecalhoToUpdate = cabecalhos[selectedIndex];

//       if (!cabecalhoToUpdate) {
//         setOpenSnackError(true);
//         setMessage("Cabeçalho não encontrado!");
//         setTimeout(() => {
//           setOpenSnackError(false);
//         }, 3000);
//         return;
//       }

//       setIsLoading(true);

//       try {
//         const updatedCabecalho = await ApiService.updateById<ICabecalho8>(
//           "update_reg_pos_colheita_oito_cabecalho",
//           cabecalhoToUpdate
//         );

//         setCabecalhos((prevCabecalhos) =>
//           prevCabecalhos.map((cab) =>
//             cab.id_registo_colh === updatedCabecalho.id_registo_colh
//               ? updatedCabecalho
//               : cab
//           )
//         );

//         setCreateCabecalho(false);
//         setOpenSnackSuccess(true);
//         setMessage("Cabeçalho atualizado com sucesso!");
//       } catch (error) {
//         setOpenSnackError(true);
//         setMessage("Erro ao atualizar o cabeçalho!");
//         setTimeout(() => {
//           setOpenSnackError(false);
//         }, 3000);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   /***************** TABELA REGISTO POS COLHEITA ******************************************/
//   useEffect(() => {
//     const fetchData = async () => {
//       getTabela(idCabecalho);
//     };

//     fetchData();
//   }, [idCabecalho]);

//   async function getTabela(id: number) {
//     setIsLoading(true);
//     try {
//       const { data } = await get(`/get_reg_pos_colheita_oito_cabecalho/${id}`);
//       if (data) {
//         setRows(data.result);
//       }
//     } catch (error) {
//       console.error(error);
//       return new Error(
//         (error as { message: string }).message || "Erro ao ao listar o Registo"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   // CRIAR
//   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setPosColheita((prevCabecalho) => ({
//       ...prevCabecalho,
//       [name]: value,
//     }));
//   };
//   const handleSaveTabela = () => {
//     setIsLoading(true);
//     ApiService.create<IPage8>("new_reg_pos_colheita_oito", poscolheita).then(
//       (result) => {
//         setIsLoading(true);
//         if (result instanceof Error) {
//           setOpenSnackError(true);
//           setTimeout(() => {
//             setOpenSnackError(false);
//           }, 3000);
//           setMessage("Erro ao gravar!");
//           setIsLoading(false);
//         } else {
//           setShowNewRow(false);
//           setCreateCabecalho(false);
//           setOpenSnackSuccess(true);
//           setMessage("Gravado com sucesso!");
//           setIsLoading(false);
//           setPosColheita({
//             id_registo_pos_colhe: 0,
//             data: "",
//             embalagem: "",
//             quantificacao: "",
//             destinatario: "",
//             quantificacao_dois: "",
//             id_registo_colh: idCabecalho,
//             last_update: new Date().toISOString(),
//             create_date: new Date().toISOString(),
//             uuid: "",
//           });

//           getTabela(idCabecalho);
//         }
//       }
//     );
//     setIsLoading(false);
//   };

//   // EDIT
//   const handleEdit = (id: number) => {
//     setEditingId(id);
//     setEditRow(true);
//   };
//   const handleEditTabela = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;

//     if (editingId !== null) {
//       const updatedTable = rows.map((tab) => {
//         if (tab.id_registo_pos_colhe === editingId) {
//           return {
//             ...tab,
//             [name]: value,
//           };
//         }
//         return tab;
//       });
//       setRows(updatedTable);
//     }
//   };
//   const handleUpdateTabela = async () => {
//     if (editingId !== null) {
//       const atividadeToSave = rows.find(
//         (tab) => tab.id_registo_pos_colhe === editingId
//       );
//       if (atividadeToSave) {
//         try {
//           const result = await ApiService.updateById(
//             `update_reg_pos_colheita_oito`,
//             atividadeToSave
//           );
//           if (result instanceof Error) {
//             setOpenSnackError(true);
//             setMessage("Erro ao registar!");
//             setTimeout(() => {
//               setOpenSnackError(false);
//             }, 3000);
//           } else {
//             setEditRow(false);
//             setEditingId(null);
//             setOpenSnackSuccess(true);
//             setMessage("Registado com sucesso!");
//           }
//         } catch (error) {
//           console.error("Erro ao atualizar o registro!", error);
//         }
//       }
//     }
//   };

//   // Delete
//   const handleClickOpenDelete = (id: number) => {
//     setIdToDelete(id);
//     setOpenDelete(true);
//   };
//   const handleCloseDelete = () => {
//     setOpenDelete(false);
//   };
//   const handleDelete = () => {
//     ApiService.deleteById("delete__reg_pos_colheita_oito", idToDelete).then(
//       (result) => {
//         if (result instanceof Error) {
//           setOpenSnackError(true);
//           setMessage("Erro ao eliminar o registo!");
//         } else {
//           setOpenSnackSuccess(true);
//           setMessage("Registo eliminado com sucesso!");
//           setOpenDelete(false);

//           getTabela(idCabecalho);
//         }
//       }
//     );
//   };

//   /*****************  PAGINAÇÃO ********************** */

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   const handleChangePage = (
//     event: React.MouseEvent<HTMLButtonElement> | null,
//     newPage: number
//   ) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
//   /****** ALERTA **********************************/
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
//       <CadernoLayout title="8 - Registo Pós-colheita" />
//       <main className={classes.contents}>
//         <div className={classes.toolbars} />
//         <Box width="80%" margin="auto">
//           <Beneficiario_nome_id_alinhado_direita />
//         </Box>

//         {isLoading ? (
//           <LoadingVulpes />
//         ) : (
//           <>
//             <CustomThemeProvider>
//               <CabecalhoPosColheitaForm
//                 cabecalhos={cabecalhos}
//                 updateCreateCabecalho={() => setCreateCabecalho(false)}
//                 onEditChange={handleInputChangeEditCabecalho}
//                 onSaveEditCabecalho={handleUpdateCabecalho}
//                 handleSelectZona={handleSelectZona}
//                 selectedIndex={selectedIndex}
//                 error={error}
//                 messageTextField={messageTextField}
//               />

//               <TableContainer
//                 component={Paper}
//                 sx={{
//                   height: "auto",
//                   width: "auto",
//                   margin: 2,
//                   padding: 2,
//                 }}
//               >
//                 <Snackbar
//                   open={openSnackSuccess}
//                   autoHideDuration={2000}
//                   onClose={handleCloseSnack}
//                 >
//                   <Alert
//                     onClose={handleCloseSnack}
//                     severity="success"
//                     sx={{ width: "100%" }}
//                   >
//                     {message}
//                   </Alert>
//                 </Snackbar>
//                 <Snackbar
//                   open={openSnackError}
//                   autoHideDuration={2000}
//                   onClose={handleCloseSnack}
//                 >
//                   <Alert
//                     onClose={handleCloseSnack}
//                     severity="error"
//                     sx={{ width: "100%" }}
//                   >
//                     Erro ao editar caderno!
//                   </Alert>
//                 </Snackbar>
//                 <Box sx={{ display: "flex", justifyContent: "end" }}>
//                   <BarraDeFerramentas
//                     mostrarBotaoNovo
//                     textoBotaoNovo="Novo Registo"
//                     aoClicarNovo={() => setShowNewRow(true)}
//                   />
//                 </Box>
//                 <table style={{ width: "100%" }}>
//                   <TableHead>
//                     <TableRow>
//                       <StyledTableHead rowSpan={2}>Data</StyledTableHead>
//                       <StyledTableHead colSpan={2}>
//                         Processamento
//                       </StyledTableHead>
//                       <StyledTableHead colSpan={2}>
//                         Comercialização
//                       </StyledTableHead>
//                       <StyledTableCell rowSpan={2}>Ações</StyledTableCell>
//                     </TableRow>

//                     <TableRow>
//                       <StyledTableCell>
//                         Embalagem, transformação
//                       </StyledTableCell>
//                       <StyledTableCell>Quantificação (Lote n.)</StyledTableCell>
//                       <StyledTableCell>Destinatário</StyledTableCell>
//                       <StyledTableCell>Quantificação (Lote nº)</StyledTableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     <TableRow>
//                       {showNewRow && (
//                         <>
//                           <StyledTableCell>
//                             <TextField
//                               variant="filled"
//                               type="date"
//                               inputProps={{
//                                 style: {
//                                   fontSize: 12,
//                                   fontFamily: "verdana",
//                                 },
//                               }}
//                               name="data"
//                               InputLabelProps={{
//                                 shrink: true,
//                               }}
//                               value={poscolheita.data}
//                               onChange={handleInputChange}
//                             />
//                           </StyledTableCell>
//                           <StyledTableCell>
//                             <CustomTextField
//                               name="embalagem"
//                               value={poscolheita.embalagem}
//                               onChange={handleInputChange}
//                             />
//                           </StyledTableCell>
//                           <StyledTableCell>
//                             <CustomTextField
//                               name="quantificacao"
//                               value={poscolheita.quantificacao}
//                               onChange={handleInputChange}
//                             />
//                           </StyledTableCell>
//                           <StyledTableCell>
//                             <CustomTextField
//                               name="destinatario"
//                               value={poscolheita.destinatario}
//                               onChange={handleInputChange}
//                             />
//                           </StyledTableCell>
//                           <StyledTableCell>
//                             <CustomTextField
//                               name="quantificacao_dois"
//                               value={poscolheita.quantificacao_dois}
//                               onChange={handleInputChange}
//                             />
//                           </StyledTableCell>
//                           <StyledTableCell>
//                             <Stack direction="row" justifyContent="center">
//                               <ButtonCadernos
//                                 mostrarBotaoCancelar
//                                 aoClicarCancelar={() => setShowNewRow(false)}
//                                 mostrarBotaoGravar
//                                 aoClicarGravar={() => handleSaveTabela()}
//                               />
//                             </Stack>
//                           </StyledTableCell>
//                         </>
//                       )}
//                     </TableRow>
//                     {(rowsPerPage > 0
//                       ? rows.slice(
//                           page * rowsPerPage,
//                           page * rowsPerPage + rowsPerPage
//                         )
//                       : rows
//                     ).map((row) => (
//                       <React.Fragment>
//                         <TableRow>
//                           {editingId === row.id_registo_pos_colhe && editRow ? (
//                             <>
//                               <StyledTableCell>
//                                 <TextField
//                                   variant="filled"
//                                   type="date"
//                                   inputProps={{
//                                     style: {
//                                       fontSize: 12,
//                                       fontFamily: "verdana",
//                                     },
//                                   }}
//                                   name="data"
//                                   InputLabelProps={{
//                                     shrink: true,
//                                   }}
//                                   value={row.data}
//                                   onChange={handleEditTabela}
//                                 />
//                               </StyledTableCell>
//                               <StyledTableCell>
//                                 <CustomTextField
//                                   name="embalagem"
//                                   value={row.embalagem}
//                                   onChange={handleEditTabela}
//                                 />
//                               </StyledTableCell>
//                               <StyledTableCell>
//                                 <CustomTextField
//                                   name="quantificacao"
//                                   value={row.quantificacao}
//                                   onChange={handleEditTabela}
//                                 />
//                               </StyledTableCell>
//                               <StyledTableCell>
//                                 <CustomTextField
//                                   name="destinatario"
//                                   value={row.destinatario}
//                                   onChange={handleEditTabela}
//                                 />
//                               </StyledTableCell>
//                               <StyledTableCell>
//                                 <CustomTextField
//                                   name="quantificacao_dois"
//                                   value={row.quantificacao_dois}
//                                   onChange={handleEditTabela}
//                                 />
//                               </StyledTableCell>
//                             </>
//                           ) : (
//                             <>
//                               <StyledTableCell>{row.data} </StyledTableCell>
//                               <StyledTableCell>{row.embalagem}</StyledTableCell>
//                               <StyledTableCell>
//                                 {row.quantificacao}
//                               </StyledTableCell>
//                               <StyledTableCell>
//                                 {row.destinatario}
//                               </StyledTableCell>
//                               <StyledTableCell>
//                                 {row.quantificacao_dois}
//                               </StyledTableCell>
//                             </>
//                           )}

//                           {editingId === row.id_registo_pos_colhe && editRow ? (
//                             <StyledTableCell>
//                               <ButtonCadernos
//                                 mostrarBotaoGravar
//                                 aoClicarGravar={() => handleUpdateTabela()}
//                                 mostrarBotaoCancelar
//                                 aoClicarCancelar={() => setEditingId(null)}
//                               />
//                             </StyledTableCell>
//                           ) : (
//                             <StyledTableCell>
//                               <ButtonCadernos
//                                 mostrarBotaoEditar
//                                 aoClicarEditar={() =>
//                                   handleEdit(row.id_registo_pos_colhe)
//                                 }
//                                 mostrarBotaoApagar
//                                 aoClicarApagar={() =>
//                                   handleClickOpenDelete(
//                                     row.id_registo_pos_colhe
//                                   )
//                                 }
//                               />
//                             </StyledTableCell>
//                           )}
//                         </TableRow>
//                       </React.Fragment>
//                     ))}

//                     {emptyRows > 0 && (
//                       <TableRow style={{ height: 53 * emptyRows }}>
//                         <TableCell colSpan={12} />
//                       </TableRow>
//                     )}
//                   </TableBody>
//                   <TableFooter>
//                     <TableRow sx={{ width: "100%" }}>
//                       <TablePagination
//                         rowsPerPageOptions={[
//                           5,
//                           10,
//                           25,
//                           { label: "All", value: -1 },
//                         ]}
//                         colSpan={14}
//                         count={rows.length}
//                         rowsPerPage={rowsPerPage}
//                         page={page}
//                         labelDisplayedRows={({ from, to, count }) => {
//                           return `${from}–${to} de ${count !== -1 ? count : `mais do que ${to}`}`;
//                         }}
//                         labelRowsPerPage={'Linhas por página'}
//                         onPageChange={handleChangePage}
//                         onRowsPerPageChange={handleChangeRowsPerPage}
//                         ActionsComponent={TablePaginationActions}
//                       />
//                     </TableRow>
//                   </TableFooter>
//                 </table>
//               </TableContainer>
//             </CustomThemeProvider>
//           </>
//         )}
//         <ConfirmDialog
//           open={openDelete}
//           onClose={handleCloseDelete}
//           onConfirm={handleDelete}
//           message="Deseja eliminar o registo?"
//         />
//       </main>
//     </div>
//   );
// }
export {}