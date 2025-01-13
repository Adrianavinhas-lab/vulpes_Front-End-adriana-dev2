// import React, { ChangeEvent, useEffect } from "react";
// import { useState } from "react";

// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import { Box } from "@mui/material";
// import { Snackbar } from "@mui/material";
// import MuiAlert, { AlertProps } from "@mui/material/Alert";

// import CadernoLayout from "../../../Styles/layout/cadernoLayout";
// import { get } from "../../../Services/tokenConfig";
// import { Cabecalho7Form } from "./cabecalho7";
// import { ProducaoAnimalForm } from "./reg_prod_animal";
// import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
// import { ICabecalho7, IObservacoes, IProducaoAnimal } from "../../../Interfaces/cadernos/caderno7";

// import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
// import LoadingVulpes from "../../../Styles/Loader/loading";

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

// export default function RegProducaoAnimal(props: any) {
//   const classes = useStyles();
//   const [message, setMessage] = React.useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const idrosto = parseInt(localStorage.getItem("idrosto") || "0", 10);

//   const [, setCreateCabecalho] = useState(false);

//   const [, setIndex] = useState(0); // index da zona homegénea
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(0); // grava o index da zona homogénea selecionada
//   const [editRow, setEditRow] = useState(false);
//   const [editRowObs, setEditRowObs] = useState(false);
//   const [idCabecalho, setIdCabecalho] = useState(0);
//   const [editingIdObs, setEditingIdObs] = useState<number | null>(null);
//   const [idToDelete, setIdToDelete] = useState<number | null>(null);
//   const [idToDeleteObs, setIdToDeleteObs] = useState<number | null>(null);
//   const [openDelete, setOpenDelete] = React.useState(false);
//   const [openDeleteObs, setOpenDeleteObs] = React.useState(false);

//   const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
//   const [openSnackError, setOpenSnackError] = React.useState(false);
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [cabecalhos, setCabecalhos] = useState<ICabecalho7[]>([]);

//   const [rows, setRows] = useState<IProducaoAnimal[]>([]);
//   const [prodanimal, setProdAnimal] = useState<IProducaoAnimal>({
//     id_registo_pro_ani: 0,
//     data_camp1: "",
//     data_camp2: "",
//     justif_camp1: "",
//     justif_camp2: "",
//     alter_camp1: "",
//     alter_camp2: "",
//     alimenta_camp1: "",
//     alimenta_camp2: "",
//     operacoescamp1: "",
//     operacoescamp2: "",
//     control_camp1: "",
//     control_camp2: "",
//     prod_camp1: "",
//     prod_camp2: "",
//     id_registo_pro: idCabecalho,
//     last_update: new Date().toISOString(),
//     create_date: new Date().toISOString(),
//     uuid: "",
//   });

//   const [obs, setObs] = useState<IObservacoes[]>([]);
//   const [obsRow, setobsRow] = useState<IObservacoes>({
//     id_registo_pro_ani_obs: 0,
//     obs: "",
//     id_registo_pro: idCabecalho,
//     last_update: new Date().toISOString(),
//     create_date: new Date().toISOString(),
//     uuid: "",
//   });
//   /********************* SELEÇÃO DA ZONA HOMOGÉNEA*****************/
//   useEffect(() => {
//     setProdAnimal((prevNewRow) => ({
//       ...prevNewRow,
//       id_registo_pro: idCabecalho,
//     }));
//     setobsRow((prevNewRow) => ({
//       ...prevNewRow,
//       id_registo_pro: idCabecalho,
//     }));
//   }, [idCabecalho]);

//   const handleSelectZona = (index: number, idZonaHomo: any) => {
//     setSelectedIndex(index);
//     setIndex(idZonaHomo);
//     setIdCabecalho(idZonaHomo);
//   };

//   /************* CABEÇALHO ****************************/
//   useEffect(() => {
//     const fetchData = async () => {
//       getCabecalhoAtividades(idrosto);
//     };

//     fetchData();
//   }, [idrosto]);

//   async function getCabecalhoAtividades(id_rosto: number) {
//     setIsLoading(true);
//     try {
//       get(`/get_reg_producao_animal_sete_cabecalho_rosto/${id_rosto}`).then(
//         (data) => {
//           if (data) {
//             const sortedData = data.data.result.sort((a: any, b: any) => {
//               if (a.zona_homo < b.zona_homo) return -1;
//               if (a.zona_homo > b.zona_homo) return 1;
//               return 0;
//             });
//             setCabecalhos(sortedData);
//             setIdCabecalho(sortedData[0].id_registo_pro);
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

//   const handleInputChangeEditCabecalho = (
//     event: ChangeEvent<HTMLInputElement>
//   ) => {
//     const { name, value, type, checked } = event.target;
//     let newValue: any = type === "checkbox" ? checked : value;

//     if (selectedIndex !== null) {
//       const idCabecalhoToEdit = cabecalhos[selectedIndex].id_registo_pro;
//       const updatedCabecalhos = cabecalhos.map((cab) => {
//         if (cab.id_registo_pro === idCabecalhoToEdit) {
//           return {
//             ...cab,
//             [name]: newValue,
//             id_registo_activ: cab.id_registo_pro,
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
//         setMessage("Não encontrado!");
//         setTimeout(() => {
//           setOpenSnackError(false);
//         }, 2000);
//         return;
//       }
//       setIsLoading(true);

//       try {
//         const updatedCabecalho = await ApiService.updateById<ICabecalho7>(
//           "update_reg_producao_animal_sete_cabecalho",
//           cabecalhoToUpdate
//         );
//         setCabecalhos((prevCabecalhos) =>
//           prevCabecalhos.map((cab) =>
//             cab.id_registo_pro === updatedCabecalho.id_registo_pro
//               ? updatedCabecalho
//               : cab
//           )
//         );
//         setCreateCabecalho(false);
//         setOpenSnackSuccess(true);
//         setMessage("Atualizado com sucesso!");
//         getCabecalhoAtividades(idrosto);
//       } catch (error) {
//         setOpenSnackError(true);
//         setTimeout(() => {
//           setOpenSnackError(false);
//         }, 2000);
//         setMessage("Erro ao atualizar o cabeçalho!");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   /****************** TABELA REGISTO PRODUÇÃO ANIMAL*****************************************************/
//   // GET
//   useEffect(() => {
//     const fetchData = async () => {
//       getTabela(idCabecalho);
//     };

//     fetchData();
//   }, [idCabecalho]);

//   async function getTabela(id: number) {
//     setIsLoading(true);
//     try {
//       const { data } = await get(
//         `/get_reg_producao_animal_sete_cabecalho/${id}`
//       );
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
//   const handleInputChangeTable = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setProdAnimal((prevProdAnimal) => ({
//       ...prevProdAnimal,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     setIsLoading(true);
//     ApiService.create<IProducaoAnimal>(
//       "new_reg_producao_animal_sete",
//       prodanimal
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
//         getTabela(idCabecalho);
//         setProdAnimal({
//           id_registo_pro_ani: 0,
//           data_camp1: "",
//           data_camp2: "",
//           justif_camp1: "",
//           justif_camp2: "",
//           alter_camp1: "",
//           alter_camp2: "",
//           alimenta_camp1: "",
//           alimenta_camp2: "",
//           operacoescamp1: "",
//           operacoescamp2: "",
//           control_camp1: "",
//           control_camp2: "",
//           prod_camp1: "",
//           prod_camp2: "",
//           id_registo_pro: idCabecalho,
//           last_update: new Date().toISOString(),
//           create_date: new Date().toISOString(),
//           uuid: "",
//         });
//       }
//     });
//     setIsLoading(false);
//   };

//   // EDITAR
//   const handleEditTabela = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;

//     if (editingId !== null) {
//       const updatedTable = rows.map((tab) => {
//         if (tab.id_registo_pro_ani === editingId) {
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
//         (tab) => tab.id_registo_pro_ani === editingId
//       );
//       if (atividadeToSave) {
//         try {
//           const result = await ApiService.updateById(
//             `update_reg_producao_animal_sete`,
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
//     ApiService.deleteById("delete__reg_producao_animal_sete", idToDelete).then(
//       (result) => {
//         if (result instanceof Error) {
//           setOpenSnackError(true);
//           setMessage("Erro ao eliminar o registo!");
//         } else {
//           setOpenSnackSuccess(true);
//           setMessage("Registo eliminado com sucesso!");
//           setOpenDeleteObs(false);
//         }
//       }
//     );
//   };

//   /********************* OBSERVAÇÕES *******************/
//   // GET
//   useEffect(() => {
//     const fetchData = async () => {
//       getTabelaObs(idCabecalho);
//     };

//     fetchData();
//   }, [idCabecalho]);

//   async function getTabelaObs(id: number) {
//     setIsLoading(true);
//     try {
//       const { data } = await get(
//         `/get_reg_producao_animal_sete_obs_cabecalho/${id}`
//       );
//       if (data) {
//         setObs(data.result);
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
//   const handleInputChangeTableObs = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setobsRow((prevProdAnimal) => ({
//       ...prevProdAnimal,
//       [name]: value,
//     }));
//   };

//   const handleSaveObs = () => {
//     setIsLoading(true);
//     ApiService.create<IObservacoes>(
//       "new_reg_producao_animal_sete_obs",
//       obsRow
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
//         getTabelaObs(idCabecalho);
//         setobsRow({
//           id_registo_pro_ani_obs: 0,
//           obs: "",
//           id_registo_pro: idCabecalho,
//           last_update: new Date().toISOString(),
//           create_date: new Date().toISOString(),
//           uuid: "",
//         });
//       }
//     });
//     setIsLoading(false);
//   };

//   // EDITAR
//   const handleEditTabelaObs = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;

//     if (editingIdObs !== null) {
//       const updatedTable = obs.map((tab) => {
//         if (tab.id_registo_pro_ani_obs === editingIdObs) {
//           return {
//             ...tab,
//             [name]: value,
//           };
//         }
//         return tab;
//       });
//       setObs(updatedTable);
//     }
//   };

//   const handleUpdateTabelaObs = async () => {
//     if (editingIdObs !== null) {
//       const atividadeToSave = obs.find(
//         (tab) => tab.id_registo_pro_ani_obs === editingIdObs
//       );
//       if (atividadeToSave) {
//         try {
//           const result = await ApiService.updateById(
//             `update_reg_producao_animal_sete_obs`,
//             atividadeToSave
//           );
//           if (result instanceof Error) {
//             setOpenSnackError(true);
//             setMessage("Erro ao registar!");
//             setTimeout(() => {
//               setOpenSnackError(false);
//             }, 3000);
//           } else {
//             setEditRowObs(false);
//             setEditingIdObs(null);
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
//   const handleClickOpenDeleteObs = (id: number) => {
//     setIdToDeleteObs(id);
//     setOpenDeleteObs(true);
//   };
//   const handleCloseDeleteObs = () => {
//     setOpenDeleteObs(false);
//   };
//   const handleDeleteObs = () => {
//     ApiService.deleteById(
//       "delete__reg_producao_animal_sete_obs",
//       idToDeleteObs
//     ).then((result) => {
//       if (result instanceof Error) {
//         setOpenSnackError(true);
//         setMessage("Erro ao eliminar o registo!");
//       } else {
//         setOpenSnackSuccess(true);
//         setMessage("Registo eliminado com sucesso!");
//         setOpenDelete(false);
//       }
//     });
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
//       <CadernoLayout title="7 - Registo de Produção Animal" />
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
//             <Cabecalho7Form
//               cabecalhos={cabecalhos}
//               updateCreateCabecalho={() => setCreateCabecalho(false)}
//               onEditChange={handleInputChangeEditCabecalho}
//               onSaveEditCabecalho={handleUpdateCabecalho}
//               handleSelectZona={handleSelectZona}
//               selectedIndex={selectedIndex}
//             />
//             <ProducaoAnimalForm
//               prodanimal={prodanimal}
//               rows={rows}
//               onInputChange={handleInputChangeTable}
//               updateCreateTable={() => setCreateCabecalho(false)}
//               onSaveTabela={handleSave}
//               onSaveEdit={handleUpdateTabela}
//               onEditTableChange={handleEditTabela}
//               setEditingId={setEditingId}
//               setEditRow={setEditRow}
//               editingId={editingId}
//               editRow={editRow}
//               onDelete={handleClickOpenDelete}
//               obsRow={obsRow}
//               obs={obs}
//               onInputChangeObs={handleInputChangeTableObs}
//               onSaveTabelaObs={handleSaveObs}
//               onEditTableChangeObs={handleEditTabelaObs}
//               onSaveEditObs={handleUpdateTabelaObs}
//               setEditingIdObs={setEditingIdObs}
//               editingIdObs={editingIdObs}
//               editRowObs={editRowObs}
//               setEditRowObs={setEditRowObs}
//               onDeleteObs={handleClickOpenDeleteObs}
//             />
//           </>
//         )}
//         <ConfirmDialog
//           open={openDelete}
//           onClose={handleCloseDelete}
//           onConfirm={handleDelete}
//           message="Deseja eliminar o registo?"
//         />
//         <ConfirmDialog
//           open={openDeleteObs}
//           onClose={handleCloseDeleteObs}
//           onConfirm={handleDeleteObs}
//           message="Deseja eliminar o registo?"
//         />
//       </main>
//     </div>
//   );
// }
export {}