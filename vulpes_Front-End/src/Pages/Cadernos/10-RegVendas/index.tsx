// import React, { ChangeEvent, useEffect, useState } from "react";

// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import { TablePagination, TextField } from "@mui/material";
// import { Snackbar, Stack } from "@mui/material";
// import { Paper } from "@mui/material";
// import { Box } from "@mui/material";
// import { TableCell, TableRow } from "@mui/material";
// import { TableBody, TableFooter, TableHead } from "@mui/material";
// import { TableContainer } from "@mui/material";
// import MuiAlert, { AlertProps } from "@mui/material/Alert";

// import CadernoLayout from "../../../Styles/layout/cadernoLayout";
// import { get } from "../../../Services/tokenConfig";
// import TablePaginationActions from "../../../Components/Pagination/pagination";
// import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
// import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
// import LoadingVulpes from "../../../Styles/Loader/loading";
// import {
//   StyledTableHead,
//   StyledTableCell,
// } from "../../../Styles/tabelCellStyled/customTableCell";
// import {
//   CustomTextField,
//   CustomThemeProvider,
// } from "../../../Styles/theme/customThemeprovider";
// import { IPage10 } from "../../../Interfaces/cadernos/caderno10";

// import BasicPopover from "../../../Components/Popover";
// import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
// import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";

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
//   return <MuiAlert elevation={6} ref={ref} {...props} />;
// });

// export default function RegVendas() {
//   const classes = useStyles();
//   const idrosto = parseInt(localStorage.getItem("idrosto") || "0", 10);

//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = React.useState("");
//   const [showNewRow, setShowNewRow] = useState(false);
//   const [editRow, setEditRow] = useState(false);
//   const [openDelete, setOpenDelete] = React.useState(false);
//   const [idToDelete, setIdToDelete] = useState<number | null>(null);
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
//   const [openSnackError, setOpenSnackError] = React.useState(false);

//   const [rows, setRows] = useState<IPage10[]>([]);
//   const [regAquisicoes, setRegAquisicoes] = useState<IPage10>({
//     id_vendas: 0,
//     data: "",
//     produto: "",
//     quantidade: "",
//     cliente: "",
//     id_rosto: idrosto,
//     last_update: new Date().toISOString(),
//     create_date: new Date().toISOString(),
//     uuid: "",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       getTabela(idrosto);
//     };

//     fetchData();
//   }, [idrosto]);

//   async function getTabela(id: number) {
//     setIsLoading(true);
//     try {
//       const { data } = await get(`/get_reg_vendas_dez_rosto/${id}`);
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

//   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setRegAquisicoes((prevCabecalho) => ({
//       ...prevCabecalho,
//       [name]: value,
//     }));
//   };

//   const handleSaveTabela = () => {
//     setIsLoading(true);
//     ApiService.create<IPage10>("new_reg_vendas_dez", regAquisicoes).then(
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
//           setShowNewRow(false);
//           setOpenSnackSuccess(true);
//           setMessage("Gravado com sucesso!");
//           setIsLoading(false);
//           setRegAquisicoes({
//             id_vendas: 0,
//             data: "",
//             produto: "",
//             quantidade: "",
//             cliente: "",
//             id_rosto: idrosto,
//             last_update: new Date().toISOString(),
//             create_date: new Date().toISOString(),
//             uuid: "",
//           });

//           getTabela(idrosto);
//         }
//       }
//     );
//     setIsLoading(false);
//   };

//   // EDITAR
//   const handleEdit = (id: number) => {
//     setEditingId(id);
//     setEditRow(true);
//   };

//   const handleEditTabela = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;

//     if (editingId !== null) {
//       const updatedTable = rows.map((tab) => {
//         if (tab.id_vendas === editingId) {
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
//       const atividadeToSave = rows.find((tab) => tab.id_vendas === editingId);
//       if (atividadeToSave) {
//         try {
//           const result = await ApiService.updateById(
//             `update_reg_vendas_dez`,
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

//   // DELETE
//   const handleClickOpenDelete = (id: number) => {
//     setIdToDelete(id);
//     setOpenDelete(true);
//   };
//   const handleCloseDelete = () => {
//     setOpenDelete(false);
//   };

//   const handleDelete = () => {
//     ApiService.deleteById("delete_vendas_dez", idToDelete).then((result) => {
//       if (result instanceof Error) {
//         setOpenSnackError(true);
//         setMessage("Erro ao eliminar o registo!");
//       } else {
//         setOpenSnackSuccess(true);
//         setMessage("Registo eliminado com sucesso!");
//         setOpenDelete(false);

//         getTabela(idrosto);
//       }
//     });
//   };

//   /*****************  PAGINAÇÃO ********************** */
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
//   /******  ALERTA **********************************/
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
//       <CadernoLayout title="10 - Registo de vendas" />
//       <main className={classes.contents}>
//         <div className={classes.toolbars} />

//         <Box width="80%" margin="auto">
//           <Beneficiario_nome_id_alinhado_direita />
//         </Box>

//         {isLoading ? (
//           <LoadingVulpes />
//         ) : (
//           <CustomThemeProvider>
//             <TableContainer
//               component={Paper}
//               variant="outlined"
//               sx={{
//                 height: "auto",
//                 width: "auto",
//                 margin: 2,
//                 padding: 2,
//               }}
//             >
//               <Snackbar
//                 open={openSnackSuccess}
//                 autoHideDuration={2000}
//                 onClose={handleCloseSnack}
//               >
//                 <Alert
//                   onClose={handleCloseSnack}
//                   severity="success"
//                   sx={{ width: "100%" }}
//                 >
//                   {message}
//                 </Alert>
//               </Snackbar>
//               <Snackbar
//                 open={openSnackError}
//                 autoHideDuration={2000}
//                 onClose={handleCloseSnack}
//               >
//                 <Alert
//                   onClose={handleCloseSnack}
//                   severity="error"
//                   sx={{ width: "100%" }}
//                 >
//                   Erro ao editar caderno!
//                 </Alert>
//               </Snackbar>

//               <table style={{ width: "100%" }}>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell
//                       colSpan={4}
//                       sx={{
//                         fontWeight: 700,
//                         fontSize: 18,
//                         fontFamily: "candara",
//                       }}
//                     >
//                       <Stack direction="row" justifyContent="left">
//                         10 - Registo de vendas
//                         <Box margin={-1} padding={0}>
//                           <BasicPopover
//                             text={
//                               "Registo de vendas da produção primária para cumprimento do RLG 5 da\n Portaria n.º 54-Q/2023 relativamente aos indicadores:\n- 1.1 da Área n.º 1 – requisitos relativos à produção primária vegetal;\n- 2.1 da Área n.º 2 – requisitos relativos à produção primária animal."
//                             }
//                           />
//                         </Box>
//                       </Stack>
//                     </TableCell>
//                     <TableCell>
//                       <BarraDeFerramentas
//                         mostrarBotaoNovo
//                         textoBotaoNovo="Novo Registo"
//                         aoClicarNovo={() => setShowNewRow(true)}
//                       />
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <StyledTableHead>
//                       <Stack direction="row" justifyContent="center">
//                         Data
//                         <Box margin={-1} padding={0}>
//                           <BasicPopover
//                             text={
//                               "Preencher data da venda no formato dd-mm-aaaa."
//                             }
//                           />
//                         </Box>
//                       </Stack>
//                     </StyledTableHead>
//                     <StyledTableHead>
//                       <Stack direction="row" justifyContent="center">
//                         Produto
//                         <Box margin={-1} padding={0}>
//                           <BasicPopover
//                             text={
//                               "Identificar o produto vegetal primário vendido"
//                             }
//                           />
//                         </Box>
//                       </Stack>
//                     </StyledTableHead>
//                     <StyledTableHead>
//                       Quantidade
//                       <Stack direction="row" justifyContent="center">
//                         (Kg, L, Ton.)
//                         <Box margin={-1} padding={0}>
//                           <BasicPopover
//                             text={
//                               "Quantidade (kg, L, t) – Descriminar individualmente a quantidade aplicada"
//                             }
//                           />
//                         </Box>
//                       </Stack>
//                     </StyledTableHead>
//                     <StyledTableHead>
//                       <Stack direction="row" justifyContent="center">
//                         Cliente
//                         <Box margin={-1} padding={0}>
//                           <BasicPopover
//                             text={
//                               "Identificar o cliente a quem se vendeu o produto vegetal primário."
//                             }
//                           />
//                         </Box>
//                       </Stack>
//                     </StyledTableHead>

//                     <StyledTableHead>Ações</StyledTableHead>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {showNewRow && (
//                     <>
//                       <StyledTableCell>
//                         <TextField
//                           variant="filled"
//                           name="data"
//                           type="date"
//                           fullWidth
//                           inputProps={{ style: { fontSize: 12 } }}
//                           InputLabelProps={{
//                             shrink: true,
//                           }}
//                           value={regAquisicoes.data}
//                           onChange={handleInputChange}
//                         />
//                       </StyledTableCell>
//                       <StyledTableCell>
//                         <CustomTextField
//                           name="produto"
//                           value={regAquisicoes.produto}
//                           onChange={handleInputChange}
//                         />
//                       </StyledTableCell>
//                       <StyledTableCell>
//                         <CustomTextField
//                           name="quantidade"
//                           value={regAquisicoes.quantidade}
//                           onChange={handleInputChange}
//                         />
//                       </StyledTableCell>
//                       <StyledTableCell>
//                         <CustomTextField
//                           name="cliente"
//                           value={regAquisicoes.cliente}
//                           onChange={handleInputChange}
//                         />
//                       </StyledTableCell>
//                       <StyledTableCell>
//                         <Stack direction="row" justifyContent="center">
//                           <ButtonCadernos
//                             mostrarBotaoCancelar
//                             aoClicarCancelar={() => setShowNewRow(false)}
//                             mostrarBotaoGravar
//                             aoClicarGravar={() => handleSaveTabela()}
//                           />
//                         </Stack>
//                       </StyledTableCell>
//                     </>
//                   )}
//                   {(rowsPerPage > 0
//                     ? rows.slice(
//                         page * rowsPerPage,
//                         page * rowsPerPage + rowsPerPage
//                       )
//                     : rows
//                   ).map((row) => (
//                     <>
//                       <TableRow key={row.id_vendas}>
//                         {editingId === row.id_vendas ? (
//                           <>
//                             <StyledTableCell>
//                               <TextField
//                                 variant="filled"
//                                 type="date"
//                                 inputProps={{
//                                   style: {
//                                     fontSize: 12,
//                                     fontFamily: "verdana",
//                                   },
//                                 }}
//                                 name="data"
//                                 InputLabelProps={{
//                                   shrink: true,
//                                 }}
//                                 value={row.data}
//                                 onChange={handleEditTabela}
//                               />
//                             </StyledTableCell>
//                             <StyledTableCell>
//                               <CustomTextField
//                                 name="produto"
//                                 value={row.produto}
//                                 onChange={handleEditTabela}
//                               />
//                             </StyledTableCell>
//                             <StyledTableCell>
//                               <CustomTextField
//                                 name="quantidade"
//                                 value={row.quantidade}
//                                 onChange={handleEditTabela}
//                               />
//                             </StyledTableCell>
//                             <StyledTableCell>
//                               <CustomTextField
//                                 name="cliente"
//                                 value={row.cliente}
//                                 onChange={handleEditTabela}
//                               />
//                             </StyledTableCell>
//                           </>
//                         ) : (
//                           <>
//                             <StyledTableCell>{row.data}</StyledTableCell>
//                             <StyledTableCell>{row.produto} </StyledTableCell>
//                             <StyledTableCell>{row.quantidade} </StyledTableCell>
//                             <StyledTableCell>{row.cliente}</StyledTableCell>
//                           </>
//                         )}
//                         {editingId === row.id_vendas && editRow ? (
//                           <StyledTableCell>
//                             <ButtonCadernos
//                               mostrarBotaoGravar
//                               aoClicarGravar={() => handleUpdateTabela()}
//                               mostrarBotaoCancelar
//                               aoClicarCancelar={() => setEditingId(null)}
//                             />
//                           </StyledTableCell>
//                         ) : (
//                           <StyledTableCell>
//                             <ButtonCadernos
//                               mostrarBotaoEditar
//                               aoClicarEditar={() => handleEdit(row.id_vendas)}
//                               mostrarBotaoApagar
//                               aoClicarApagar={() =>
//                                 handleClickOpenDelete(row.id_vendas)
//                               }
//                             />
//                           </StyledTableCell>
//                         )}
//                       </TableRow>

//                       {emptyRows > 0 && (
//                         <TableRow style={{ height: 53 * emptyRows }}>
//                           <TableCell colSpan={12} />
//                         </TableRow>
//                       )}
//                       <ConfirmDialog
//                         open={openDelete}
//                         onClose={handleCloseDelete}
//                         onConfirm={handleDelete}
//                         message="Deseja eliminar o registo?"
//                       />
//                     </>
//                   ))}
//                 </TableBody>
//                 <TableFooter>
//                   <TableRow>
//                     <TablePagination
//                       rowsPerPageOptions={[
//                         10,
//                         20,
//                         50,
//                         { label: "All", value: -1 },
//                       ]}
//                       colSpan={12}
//                       count={rows.length}
//                       rowsPerPage={rowsPerPage}
//                       page={page}
//                       labelDisplayedRows={({ from, to, count }) => {
//                         return `${from}–${to} de ${count !== -1 ? count : `mais do que ${to}`}`;
//                       }}
//                       labelRowsPerPage={'Linhas por página'}
//                       onPageChange={handleChangePage}
//                       onRowsPerPageChange={handleChangeRowsPerPage}
//                       ActionsComponent={TablePaginationActions}
//                     />
//                   </TableRow>
//                 </TableFooter>
//               </table>
//             </TableContainer>
//           </CustomThemeProvider>
//         )}
//       </main>
//     </div>
//   );
// }
export {}