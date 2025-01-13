// import React, {
//   ChangeEvent,
//   useCallback,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import {
//   Box,
//   Snackbar,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import { Paper, Typography } from "@mui/material";
// import { TableContainer } from "@mui/material";
// import MuiAlert, { AlertProps } from "@mui/material/Alert";

// import CadernoLayout from "../../../Styles/layout/cadernoLayout";
// import BasicPopover from "../../../Components/Popover";
// import LoadingVulpes from "../../../Styles/Loader/loading";
// import { BarraDeFerramentas } from "../../../Components/barra-de-ferramentas/BarraDeFerramentas";
// import { IdentifEficienciaAlimentarEdit } from "./editBeneficiario";
// import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
// import {
//   StyledTableCell,
//   StyledTableHeadColor,
//   StyledTableHeadLeft,
// } from "../../../Styles/tabelCellStyled/customTableCell";
// import useDadosEFBeneficiario, {
//   IEFBeneficiario,
// } from "./interfaceEFBeneficiario";
// import { get } from "../../../Services/tokenConfig";
// import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
// import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
// import { AuthContext } from "../../../AuthContext/AuthContext";

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

// export default function EFIdentBenfExp() {
//   const classes = useStyles();
//   const auth = useContext(AuthContext);

//   const idrosto = parseInt(localStorage.getItem("idrosto") || "0", 10);
//   const [id_org, setId_Org] = useState<number | null>(null);

//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = React.useState("");
//   const [openDelete, setOpenDelete] = React.useState(false);
//   const [idToDelete, setIdToDelete] = useState<number | null>(null);
//   const [, setEditingId] = useState<number | null>(null);
//   const [messageTextField, setMessageTextField] = useState("");
//   const [error, setError] = useState<boolean>(false);

//   const { beneficiario, setBeneficiario, initialEFBeneficiario } =
//     useDadosEFBeneficiario(id_org);

  

//   console.log("id_agri", auth.user?.id_org);

//   /*************** EDITAR *********************/
//   const [showNewForm, setShowNewForm] = useState(false);
//   const handleEdit = (id: number | null) => {
//     setEditingId(id);
//     setShowNewForm(true);
//   };

//   const getTabela = async (id: number) => {
//     setIsLoading(true);
//     try {
//       const { data } = await get(`/get_caderno_eficiencia_agricultor_id/${id}`);
//       if (data) {
//         setBeneficiario(data.result[0]);

//         console.log("beneficiario", beneficiario);
//       } else if (data.code === "401") {
//         console.log("Expirou");
//       }
//     } catch (error) {
//       console.error(error);
//       return new Error(
//         (error as { message: string }).message || "Erro ao ao listar o Registo"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       await getTabela(idrosto);
//     };

//     fetchData();
//   }, [idrosto]);

//   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;

//     if (name === "nif" || name === "telefone" || name === "telefone_S") {
//       if (isNaN(Number(value))) {
//         setError(true);
//         setMessageTextField("Apenas números são aceites");
//         return;
//       } else {
//         setError(false);
//         setMessageTextField("");
//         Number(value);
//       }
//     }

//     setBeneficiario((prevCaderno) => ({
//       ...prevCaderno,
//       [name]: value,
//     }));
//   };

//   const handleCreate = () => {
//     setIsLoading(true);
//     ApiService.create<IEFBeneficiario>(
//       "new_caderno_eficiencia",
//       beneficiario
//     ).then((result) => {
//       setIsLoading(true);
//       if (result instanceof Error) {
//         setOpenSnackError(true);
//         setMessage("Erro ao gravar!");
//         setIsLoading(false);
//       } else {
//         setShowNewForm(false);
//         setOpenSnackSuccess(true);
//         setTimeout(() => {
//           setOpenSnackSuccess(false);
//         });
//         setMessage("Gravado com sucesso!");
//         setIsLoading(false);
//         getTabela(idrosto);
//         setBeneficiario(initialEFBeneficiario);
//       }
//     });
//     setIsLoading(false);
//   };

//   const handleUpdate = () => {
//     setIsLoading(true);
//     ApiService.updateById<IEFBeneficiario>(
//       "update_caderno_eficiencia",
//       beneficiario
//     ).then((result) => {
//       setIsLoading(true);
//       if (result instanceof Error) {
//         setOpenSnackError(true);
//         setMessage("Erro ao gravar!");
//         setIsLoading(false);
//       } else {
//         setShowNewForm(false);
//         setOpenSnackSuccess(true);
//         setTimeout(() => {
//           setOpenSnackSuccess(false);
//         });
//         setMessage("Gravado com sucesso!");
//         setIsLoading(false);
//         getTabela(idrosto);
//         setBeneficiario(initialEFBeneficiario);
//       }
//     });
//     setIsLoading(false);
//   };

//   const handleSave = () => {
//     if (beneficiario.id_identificacao === 0) {
//       handleCreate();
//     } else {
//       handleUpdate();
//     }
//   };

//   // DELETE
//   const handleClickOpenDelete = (id: number | null) => {
//     setIdToDelete(id);
//     setOpenDelete(true);
//   };
//   const handleCloseDelete = () => {
//     setOpenDelete(false);
//   };

//   const handleDelete = () => {
//     ApiService.deleteById("delete_caderno_eficiencia", idToDelete).then(
//       (result) => {
//         if (result instanceof Error) {
//           setOpenSnackError(true);
//           setTimeout(() => {
//             setOpenSnackError(false);
//           });
//           setMessage("Erro ao eliminar o registo!");
//         } else {
//           setBeneficiario(initialEFBeneficiario);
//           setOpenSnackSuccess(true);
//           setMessage("Registo eliminado com sucesso!");
//           setTimeout(() => {
//             setOpenSnackSuccess(false);
//           });
//           setOpenDelete(false);

//           getTabela(idrosto);
//         }
//       }
//     );
//   };

//   /******  ALERTA **********************************/
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
//       <CadernoLayout title="A.3.4 Melhorar a eficiência alimentar animal para redução das emissões de GEE - Bovinos de Carne							" />
//       <main className={classes.contents}>
//         <div className={classes.toolbars} />
//         <div>
//           {isLoading ? (
//             <LoadingVulpes />
//           ) : (
//             <>
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

//               <Box width="80%" margin="auto">
//                 <Beneficiario_nome_id_alinhado_direita />
//               </Box>

//               {showNewForm ? (
//                 <IdentifEficienciaAlimentarEdit
//                   book={beneficiario}
//                   onInputChange={handleInputChange}
//                   updateCreateTable={() => setShowNewForm(false)}
//                   onSaveTabela={handleSave}
//                   error={error}
//                   messageTextField={messageTextField}
//                 />
//               ) : (
//                 <>
//                   <TableContainer
//                     component={Paper}
//                     variant="outlined"
//                     sx={{ height: "auto", width: "auto", m: 2, padding: 2 }}
//                   >
//                     <table style={{ width: "100%" }}>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell colSpan={2}>
//                             <Box
//                               sx={{
//                                 width: "100%",
//                                 display: "flex",
//                                 margin: "auto",
//                                 padding: 1,
//                               }}
//                             >
//                               <Typography
//                                 fontWeight={600}
//                                 fontSize={18}
//                                 fontFamily="candara"
//                                 sx={{ marginLeft: 0 }}
//                               >
//                                 A.3.4 Melhorar a eficiência alimentar animal
//                                 para redução das emissões de GEE - Bovinos de
//                                 Carne
//                               </Typography>
//                               <Box
//                                 sx={{
//                                   width: "98%",
//                                   display: "flex",
//                                   justifyContent: "right",
//                                 }}
//                               >
//                                 {beneficiario.id_identificacao === null ? (
//                                   <BarraDeFerramentas
//                                     mostrarBotaoNovo
//                                     textoBotaoNovo="Registar tabela"
//                                     aoClicarNovo={() => setShowNewForm(true)}
//                                   />
//                                 ) : (
//                                   <ButtonCadernos
//                                     mostrarBotaoEditar
//                                     aoClicarEditar={() =>
//                                       handleEdit(beneficiario.id_identificacao)
//                                     }
//                                     mostrarBotaoApagar
//                                     aoClicarApagar={() =>
//                                       handleClickOpenDelete(
//                                         beneficiario.id_identificacao
//                                       )
//                                     }
//                                   />
//                                 )}
//                               </Box>
//                             </Box>
//                           </TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         <TableRow>
//                           <StyledTableHeadColor colSpan={2}>
//                             Identificação do operador
//                           </StyledTableHeadColor>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft width="20%">
//                             Nome do Beneficiário:
//                           </StyledTableHeadLeft>
//                           <StyledTableCell>{beneficiario.nome}</StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft>NIF: </StyledTableHeadLeft>
//                           <StyledTableCell>{beneficiario.nif}</StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft>NIFAP: </StyledTableHeadLeft>
//                           <StyledTableCell>
//                             {beneficiario.nifap}
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft>Morada: </StyledTableHeadLeft>
//                           <StyledTableCell>
//                             {beneficiario.morada}
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft>
//                             Localização:
//                           </StyledTableHeadLeft>
//                           <StyledTableCell>
//                             {beneficiario.localizacao}
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft>
//                             Código Postal:
//                           </StyledTableHeadLeft>
//                           <StyledTableCell>
//                             {beneficiario.codig_postal}
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft>Freguesia:</StyledTableHeadLeft>
//                           <StyledTableCell>
//                             {beneficiario.freguesia}
//                           </StyledTableCell>
//                         </TableRow>

//                         <TableRow>
//                           <StyledTableHeadLeft>Concelho:</StyledTableHeadLeft>
//                           <StyledTableCell>
//                             {beneficiario.concelho}
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft>
//                             Contacto telefónico
//                           </StyledTableHeadLeft>
//                           <StyledTableCell>
//                             {beneficiario.telefone}
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft>
//                             Correio eletrónico:
//                           </StyledTableHeadLeft>
//                           <StyledTableCell>
//                             {beneficiario.email}
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadColor colSpan={2}>
//                             Sócio gerente ou representante (Quando aplicável)
//                             <BasicPopover text="Identificação da exploração" />
//                           </StyledTableHeadColor>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft>Cargo: {}</StyledTableHeadLeft>
//                           <StyledTableCell>
//                             {beneficiario.cargo_s}
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft>Nome: {}</StyledTableHeadLeft>
//                           <StyledTableCell>
//                             {beneficiario.nome_S}
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft>Morada: {}</StyledTableHeadLeft>
//                           <StyledTableCell>
//                             {beneficiario.morada_S}
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft>
//                             Contacto telefónico
//                           </StyledTableHeadLeft>
//                           <StyledTableCell>
//                             {beneficiario.telefone_S}
//                           </StyledTableCell>
//                         </TableRow>

//                         <TableRow>
//                           <StyledTableHeadLeft>
//                             Correio electrónico: {}
//                           </StyledTableHeadLeft>
//                           <StyledTableCell>
//                             {beneficiario.email_S}
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadColor colSpan={2}>
//                             Identificação da exploração
//                           </StyledTableHeadColor>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft>
//                             Local da sede:{" "}
//                           </StyledTableHeadLeft>
//                           <StyledTableCell>
//                             {beneficiario.local_sede_E}
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft>
//                             Cód. Postal:{" "}
//                           </StyledTableHeadLeft>
//                           <StyledTableCell>
//                             {beneficiario.codigo_postal_E}
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft>Concelho: </StyledTableHeadLeft>
//                           <StyledTableCell>
//                             {beneficiario.concelho_E}
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft>Freguesia: </StyledTableHeadLeft>
//                           <StyledTableCell>
//                             {beneficiario.freguesia_E}
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadColor colSpan={2}>
//                             Efetivo Pecuário (CN):
//                           </StyledTableHeadColor>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft>
//                             Bovinos de carne (CN):
//                           </StyledTableHeadLeft>
//                           <StyledTableCell>
//                             {beneficiario.bovinos_carne}
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft>
//                             CCDR a que pertence:
//                           </StyledTableHeadLeft>
//                           <StyledTableCell>{beneficiario.ccdr}</StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft>
//                             Assistência Técnica:
//                           </StyledTableHeadLeft>
//                           <StyledTableCell>
//                             {beneficiario.assistencia}
//                           </StyledTableCell>
//                         </TableRow>
//                         <TableRow>
//                           <StyledTableHeadLeft>
//                             Identificação do OC: {}
//                           </StyledTableHeadLeft>
//                           <StyledTableCell>
//                             {beneficiario.identificacao_oc}
//                           </StyledTableCell>
//                         </TableRow>
//                       </TableBody>
//                     </table>
//                   </TableContainer>
//                 </>
//               )}
//               <ConfirmDialog
//                 open={openDelete}
//                 onClose={handleCloseDelete}
//                 onConfirm={handleDelete}
//                 message="Deseja eliminar o registo?"
//               />

//               <Box height={300}></Box>
//             </>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }
export {}