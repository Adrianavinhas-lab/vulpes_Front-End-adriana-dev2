// import React, { ChangeEvent, useEffect, useState } from "react";

// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import { Snackbar } from "@mui/material";
// import { Box } from "@mui/material";
// import MuiAlert, { AlertProps } from "@mui/material/Alert";

// import CadernoLayout from "../../../Styles/layout/cadernoLayout";
// import {  get } from "../../../Services/tokenConfig";
// import { CabecalhoEPForm } from "./cabecalhoEP";
// import { QuantidadeEPForm } from "./quantidadeEP";
// import { AplicacaoEPForm } from "./aplicacaoEP";
// import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
// import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
// import { IAplicacaoEP, ICabecalhoEP, IQuantidadeEP } from "../../../Interfaces/cadernos/caderno11";
// import LoadingVulpes from "../../../Styles/Loader/loading";

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

// export default function RegGestaoEP() {
//   const classes = useStyles();

//   const [message, setMessage] = React.useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const idrosto = parseInt(localStorage.getItem("idrosto") || "0", 10);

//   const [error, setError] = useState<boolean>(false);
//   const [messageTextField, setMessageTextField] = useState("");

//   const [, setCreateCabecalho] = useState(false);
//   const [editRowCabecalho, setEditRowCabecalho] = useState(false);
//   const [editingIdCabecalho, setEditingIdCabecalho] = useState<number | null>(
//     null
//   );
//   const [idToDeleteCabecalho, setIdToDeleteCabecalho] = useState<number | null>(
//     null
//   );
//   const [openDeleteCabecalho, setOpenDeleteCabecalho] = React.useState(false);

//   const [editRowQuant, setEditRowQuant] = useState(false);
//   const [editingIdQuant, setEditingIdQuant] = useState<number | null>(null);
//   const [idToDeleteCQuant, setIdToDeleteQuant] = useState<number | null>(null);
//   const [openDeleteQuant, setOpenDeleteQuant] = React.useState(false);

//   const [editRowAplic, setEditRowAplic] = useState(false);
//   const [editingIdAplic, setEditingIdAplic] = useState<number | null>(null);
//   const [idToDeleteAplic, setIdToDeleteAplic] = useState<number | null>(null);
//   const [openDeleteAplic, setOpenDeleteAplic] = React.useState(false);

//   const [cabecalhos, setCabecalhos] = useState<ICabecalhoEP[]>([]);
//   const [cabecalho, setcabecalho] = useState<ICabecalhoEP>({
//     id_fluentes_um: 0,

//     fossas: "",
//     nitreiras: "",
//     valas_condu_fluentes: "",
//     lagos_imperm: "",
//     outros_reservatorios: "",
//     contratualizada: "",

//     id_rosto: idrosto,
//     last_update: new Date().toISOString(),
//     create_date: new Date().toISOString(),
//     uuid: "",
//   });

//   const [quantidades, setQuantidades] = useState<IQuantidadeEP[]>([]);
//   const [quantidadeEP, setQuantidadeEP] = useState<IQuantidadeEP>({
//     id_fluentes_dois: 0,

//     categoria_animal: "",
//     especie_animal: "",
//     n_animais: "",
//     ex_chorume: "",
//     ex_estrume: "",
//     exter_chorume: "",
//     exter_estrume: "",
//     vendido_chorume: "",
//     vendido_estrume: "",
//     quant_chorume: "",
//     quant_estrume: "",

//     id_rosto: idrosto,
//     last_update: new Date().toISOString(),
//     create_date: new Date().toISOString(),
//     uuid: "",
//   });

//   const [aplicacoes, setAplicacoes] = useState<IAplicacaoEP[]>([]);
//   const [aplicacaoEP, setAplicacaoEP] = useState<IAplicacaoEP>({
//     id_fluentes_tres: 0,
//     n_parcelario: 0,
//     cultura: "",
//     propria: 0,
//     contratualizada: 0,
//     tipo: "",
//     origem: "",
//     data: "",
//     quant: 0,

//     id_rosto: idrosto,
//     last_update: new Date().toISOString(),
//     create_date: new Date().toISOString(),
//     uuid: "",
//   });

//   /******************* CABEÇALHO ********************************/
//   // GET
//   useEffect(() => {
//     const fetchData = async () => {
//       getCabecalho(idrosto);
//     };

//     fetchData();
//   }, [idrosto]);

//   async function getCabecalho(id: number) {
//     setIsLoading(true);
//     try {
//       const { data } = await get(`/get_reg_gest_fluentes_onze_um_rosto/${id}`);
//       if (data) {
//         setCabecalhos(data.result);
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
//   const handleInputChangeCabecalho = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;

//     if (isNaN(Number(value))) {
//       setError(true);
//       setMessageTextField("Apenas números são aceites");
//     } else {
//       setError(false);
//       setMessageTextField("");
//     }

//     setcabecalho((prevProdAnimal) => ({
//       ...prevProdAnimal,
//       [name]: value,
//     }));
//   };

//   const handleSaveCabecalho = () => {
//     setIsLoading(true);
//     ApiService.create<ICabecalhoEP>(
//       "new_reg_gest_fluentes_onze_um",
//       cabecalho
//     ).then((result) => {
//       setIsLoading(true);
//       if (result instanceof Error) {
//         setOpenSnackError(true);
//         setTimeout(() => {
//           setOpenSnackError(false);
//         }, 3000);
//         setMessage("Erro ao gravar!");
//         setIsLoading(false);
//       } else {
//         setOpenSnackSuccess(true);
//         setMessage("Gravado com sucesso!");
//         setIsLoading(false);
//         setCreateCabecalho(false);
//         getCabecalho(idrosto);
//       }
//     });
//     setIsLoading(false);
//   };

//   // EDITAR
//   const OnChangeEditCabecalho = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;

//     if (isNaN(Number(value))) {
//       setError(true);
//       setMessageTextField("Apenas números são aceites");
//     } else {
//       setError(false);
//       setMessageTextField("");
//     }

//     if (editingIdCabecalho !== null) {
//       const updatedTable = cabecalhos.map((tab) => {
//         if (tab.id_fluentes_um === editingIdCabecalho) {
//           return {
//             ...tab,
//             [name]: value,
//           };
//         }
//         return tab;
//       });
//       setCabecalhos(updatedTable);
//     }
//   };

//   const handleUpdateCabecalho = async () => {
//     if (editingIdCabecalho !== null) {
//       const atividadeToSave = cabecalhos.find(
//         (tab) => tab.id_fluentes_um === editingIdCabecalho
//       );
//       if (atividadeToSave) {
//         try {
//           const result = await ApiService.updateById(
//             `update_reg_gest_fluentes_onze_um`,
//             atividadeToSave
//           );
//           if (result instanceof Error) {
//             setOpenSnackError(true);
//             setMessage("Erro ao registar!");
//             setTimeout(() => {
//               setOpenSnackError(false);
//             }, 3000);
//           } else {
//             setEditRowCabecalho(false);
//             setEditingIdCabecalho(null);
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
//   const handleClickOpenDeleteCabecalho = (id: number) => {
//     setIdToDeleteCabecalho(id);
//     setOpenDeleteCabecalho(true);
//   };
//   const handleCloseDeleteCabecalho = () => {
//     setOpenDeleteCabecalho(false);
//   };
//   const handleDeleteCabecalho = () => {
//     ApiService.deleteById(
//       "delete_gest_fluentes_onze_um",
//       idToDeleteCabecalho
//     ).then((result) => {
//       if (result instanceof Error) {
//         setOpenSnackError(true);
//         setTimeout(() => {
//           setOpenSnackError(false);
//         }, 2000);
//         setMessage("Erro ao eliminar o registo!");
//       } else {
//         setOpenSnackSuccess(true);
//         setMessage("Registo eliminado com sucesso!");
//         setOpenDeleteCabecalho(false);
//         getCabecalho(idrosto);
//       }
//     });
//   };

//   /******************* TABELA QUANTIDADE EP ********************/
//   // GET
//   useEffect(() => {
//     const fetchData = async () => {
//       getQuantidadesEP(idrosto);
//     };

//     fetchData();
//   }, [idrosto]);

//   async function getQuantidadesEP(id: number) {
//     setIsLoading(true);
//     try {
//       const { data } = await get(
//         `/get_reg_gest_fluentes_onze_dois_rosto/${id}`
//       );
//       if (data) {
//         setQuantidades(data.result);
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
//   const handleInputChangeQuantidades = (
//     event: ChangeEvent<HTMLInputElement>
//   ) => {
//     const { name, value } = event.target;

//     if (
//       name === "n_animais" ||
//       name === "ex_chorume" ||
//       name === "ex_estrume" ||
//       name === "exter_chorume" ||
//       name === "exter_estrume" ||
//       name === "vendido_chorume" ||
//       name === "vendido_estrume" ||
//       name === "quant_chorume" ||
//       name === "quant_estrume"
//     ) {
//       if (isNaN(Number(value))) {
//         setError(true);
//         setMessageTextField("Apenas números são aceites");
//         return;
//       } else {
//         setError(false);
//         setMessageTextField("");
//       }
//     }

//     setQuantidadeEP((prevProdAnimal) => ({
//       ...prevProdAnimal,
//       [name]: value,
//     }));
//   };

//   const handleSaveQuantidadeEP = () => {
//     setIsLoading(true);
//     ApiService.create<IQuantidadeEP>(
//       "new_reg_gest_fluentes_onze_dois",
//       quantidadeEP
//     ).then((result) => {
//       setIsLoading(true);
//       if (result instanceof Error) {
//         setOpenSnackError(true);
//         setTimeout(() => {
//           setOpenSnackError(false);
//         }, 3000);
//         setMessage("Erro ao gravar!");
//         setIsLoading(false);
//       } else {
//         setOpenSnackSuccess(true);
//         setMessage("Gravado com sucesso!");
//         setIsLoading(false);
//         setCreateCabecalho(false);
//         getQuantidadesEP(idrosto);
//         setQuantidadeEP({
//           id_fluentes_dois: 0,

//           categoria_animal: "",
//           especie_animal: "",
//           n_animais: "",
//           ex_chorume: "",
//           ex_estrume: "",
//           exter_chorume: "",
//           exter_estrume: "",
//           vendido_chorume: "",
//           vendido_estrume: "",
//           quant_chorume: "",
//           quant_estrume: "",

//           id_rosto: idrosto,
//           last_update: new Date().toISOString(),
//           create_date: new Date().toISOString(),
//           uuid: "",
//         });
//       }
//     });
//     setIsLoading(false);
//   };

//   // EDITAR
//   const OnChangeEditQuantidade = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;

//     if (
//       name === "n_animais" ||
//       name === "ex_chorume" ||
//       name === "ex_estrume" ||
//       name === "exter_chorume" ||
//       name === "exter_estrume" ||
//       name === "vendido_chorume" ||
//       name === "vendido_estrume" ||
//       name === "quant_chorume" ||
//       name === "quant_estrume"
//     ) {
//       if (isNaN(Number(value))) {
//         setError(true);
//         setMessageTextField("Apenas números são aceites");
//         return;
//       } else {
//         setError(false);
//         setMessageTextField("");
//       }
//     }

//     if (editingIdQuant !== null) {
//       const updatedTable = quantidades.map((tab) => {
//         if (tab.id_fluentes_dois === editingIdQuant) {
//           return {
//             ...tab,
//             [name]: value,
//           };
//         }
//         return tab;
//       });
//       setQuantidades(updatedTable);
//     }
//   };

//   const handleUpdateQuantidade = async () => {
//     if (editingIdQuant !== null) {
//       const atividadeToSave = quantidades.find(
//         (tab) => tab.id_fluentes_dois === editingIdQuant
//       );
//       if (atividadeToSave) {
//         try {
//           const result = await ApiService.updateById(
//             `update_reg_gest_fluentes_onze_dois`,
//             atividadeToSave
//           );
//           if (result instanceof Error) {
//             setOpenSnackError(true);
//             setMessage("Erro ao registar!");
//             setTimeout(() => {
//               setOpenSnackError(false);
//             }, 3000);
//           } else {
//             setEditRowQuant(false);
//             setEditingIdQuant(null);
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
//   const handleClickOpenDeleteQuantidade = (id: number) => {
//     setIdToDeleteQuant(id);
//     setOpenDeleteQuant(true);
//   };
//   const handleCloseDeleteQuantidade = () => {
//     setOpenDeleteQuant(false);
//   };
//   const handleDeleteQuantidade = () => {
//     ApiService.deleteById(
//       "delete_gest_fluentes_onze_dois",
//       idToDeleteCQuant
//     ).then((result) => {
//       if (result instanceof Error) {
//         setOpenSnackError(true);
//         setTimeout(() => {
//           setOpenSnackError(false);
//         }, 2000);
//         setMessage("Erro ao eliminar o registo!");
//       } else {
//         setOpenSnackSuccess(true);
//         setMessage("Registo eliminado com sucesso!");
//         setOpenDeleteQuant(false);
//         getQuantidadesEP(idrosto);
//       }
//     });
//   };

//   /********************* TABELA APLICACAO EFLUENTES****************/
//   // GET
//   useEffect(() => {
//     const fetchData = async () => {
//       getAplicacoes(idrosto);
//     };

//     fetchData();
//   }, [idrosto]);

//   async function getAplicacoes(id: number) {
//     setIsLoading(true);
//     try {
//       const { data } = await get(
//         `/get_reg_gest_fluentes_onze_tres_rosto/${id}`
//       );
//       if (data) {
//         setAplicacoes(data.result);
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
//   const handleInputChangeAplicEP = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;

//     if (
//       name === "n_parcelario" ||
//       name === "propria" ||
//       name === "contratualizada" ||
//       name === "quant"
//     ) {
//       if (isNaN(Number(value))) {
//         setError(true);
//         setMessageTextField("Apenas números são aceites");
//         return;
//       } else {
//         setError(false);
//         setMessageTextField("");
//       }
//     }

//     setAplicacaoEP((prevAplicacaoEP) => ({
//       ...prevAplicacaoEP,
//       [name]: value,
//     }));
//   };
//   const handleSaveAplicacoes = () => {
//     setIsLoading(true);
//     ApiService.create<IAplicacaoEP>(
//       "new_reg_gest_fluentes_onze_tres",
//       aplicacaoEP
//     ).then((result) => {
//       setIsLoading(true);
//       if (result instanceof Error) {
//         setOpenSnackError(true);
//         setTimeout(() => {
//           setOpenSnackError(false);
//         }, 3000);
//         setMessage("Erro ao gravar!");
//         setIsLoading(false);
//       } else {
//         setOpenSnackSuccess(true);
//         setMessage("Gravado com sucesso!");
//         setIsLoading(false);
//         setCreateCabecalho(false);
//         getAplicacoes(idrosto);
//         setAplicacaoEP({
//           id_fluentes_tres: 0,
//           n_parcelario: 0,
//           cultura: "",
//           propria: 0,
//           contratualizada: 0,
//           tipo: "",
//           origem: "",
//           data: "",
//           quant: 0,

//           id_rosto: idrosto,
//           last_update: new Date().toISOString(),
//           create_date: new Date().toISOString(),
//           uuid: "",
//         });
//       }
//     });
//     setIsLoading(false);
//   };
//   // EDITAR
//   const OnChangeEditAplicacao = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;

//     if (
//       name === "n_parcelario" ||
//       name === "propria" ||
//       name === "contratualizada" ||
//       name === "quant"
//     ) {
//       if (isNaN(Number(value))) {
//         setError(true);
//         setMessageTextField("Apenas números são aceites");
//         return;
//       } else {
//         setError(false);
//         setMessageTextField("");
//       }
//     }

//     if (editingIdAplic !== null) {
//       const updatedTable = aplicacoes.map((tab) => {
//         if (tab.id_fluentes_tres === editingIdAplic) {
//           return {
//             ...tab,
//             [name]: value,
//           };
//         }
//         return tab;
//       });
//       setAplicacoes(updatedTable);
//     }
//   };

//   const handleUpdateAplicacao = async () => {
//     if (editingIdAplic !== null) {
//       const atividadeToSave = aplicacoes.find(
//         (tab) => tab.id_fluentes_tres === editingIdAplic
//       );
//       if (atividadeToSave) {
//         try {
//           const result = await ApiService.updateById(
//             `update_reg_gest_fluentes_onze_tres`,
//             atividadeToSave
//           );
//           if (result instanceof Error) {
//             setOpenSnackError(true);
//             setMessage("Erro ao registar!");
//             setTimeout(() => {
//               setOpenSnackError(false);
//             }, 3000);
//           } else {
//             setEditRowAplic(false);
//             setEditingIdAplic(null);
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
//   const handleClickOpenDeleteAplicacao = (id: number) => {
//     setIdToDeleteAplic(id);
//     setOpenDeleteAplic(true);
//   };
//   const handleCloseDeleteAplicacao = () => {
//     setOpenDeleteAplic(false);
//   };
//   const handleDeleteAplicacao = () => {
//     ApiService.deleteById(
//       "delete_gest_fluentes_onze_tres",
//       idToDeleteAplic
//     ).then((result) => {
//       if (result instanceof Error) {
//         setOpenSnackError(true);
//         setTimeout(() => {
//           setOpenSnackError(false);
//         }, 2000);
//         setMessage("Erro ao eliminar o registo!");
//       } else {
//         setOpenSnackSuccess(true);
//         setMessage("Registo eliminado com sucesso!");
//         setOpenDeleteAplic(false);
//         getAplicacoes(idrosto);
//       }
//     });
//   };

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
//       <CadernoLayout title="11 - Registo de gestão de efluentes pecuários" />
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
//             Erro ao editar caderno!
//           </Alert>
//         </Snackbar>

//         {isLoading ? (
//           <LoadingVulpes />
//         ) : (
//           <>
//             <CabecalhoEPForm
//               cabecalho={cabecalho}
//               cabecalhos={cabecalhos}
//               onInputChange={handleInputChangeCabecalho}
//               updateCreateTable={() => setCreateCabecalho(false)}
//               onSaveTabela={handleSaveCabecalho}
//               onSaveEdit={handleUpdateCabecalho}
//               onEditTableChange={OnChangeEditCabecalho}
//               setEditingId={setEditingIdCabecalho}
//               setEditRow={setEditRowCabecalho}
//               editingId={editingIdCabecalho}
//               editRow={editRowCabecalho}
//               onDelete={handleClickOpenDeleteCabecalho}
//               error={error}
//               messageTextField={messageTextField}
//             />

//             <QuantidadeEPForm
//               quantEP={quantidadeEP}
//               quantidadesEP={quantidades}
//               onInputChange={handleInputChangeQuantidades}         
//               updateCreateTable={() => setCreateCabecalho(false)}
//               onSaveTabela={handleSaveQuantidadeEP}
//               onSaveEdit={handleUpdateQuantidade}
//               onEditTableChange={OnChangeEditQuantidade}
//               setEditingId={setEditingIdQuant}
//               setEditRow={setEditRowQuant}
//               editingId={editingIdQuant}
//               editRow={editRowQuant}
//               onDelete={handleClickOpenDeleteQuantidade}
//               error={error}
//               messageTextField={messageTextField}
//             />

//             <AplicacaoEPForm
//               aplicEP={aplicacaoEP}              
//               aplicacoes={aplicacoes}
//               onInputChange={handleInputChangeAplicEP}        
//               updateCreateTable={() => setCreateCabecalho(false)}
//               onSaveTabela={handleSaveAplicacoes}
//               onSaveEdit={handleUpdateAplicacao}
//               onEditTableChange={OnChangeEditAplicacao}
//               setEditingId={setEditingIdAplic}
//               setEditRow={setEditRowAplic}
//               editingId={editingIdAplic}
//               editRow={editRowAplic}
//               onDelete={handleClickOpenDeleteAplicacao}
//               error={error}
//               messageTextField={messageTextField}
//             />

//             <Box height={150}></Box>
//           </>
//         )}
//         <ConfirmDialog
//           open={openDeleteCabecalho}
//           onClose={handleCloseDeleteCabecalho}
//           onConfirm={handleDeleteCabecalho}
//           message="Deseja eliminar o registo?"
//         />
//         <ConfirmDialog
//           open={openDeleteQuant}
//           onClose={handleCloseDeleteQuantidade}
//           onConfirm={handleDeleteQuantidade}
//           message="Deseja eliminar o registo?"
//         />
//              <ConfirmDialog
//           open={openDeleteAplic}
//           onClose={handleCloseDeleteAplicacao}
//           onConfirm={handleDeleteAplicacao}
//           message="Deseja eliminar o registo?"
//         />
//       </main>
//     </div>
//   );
// }
export {}