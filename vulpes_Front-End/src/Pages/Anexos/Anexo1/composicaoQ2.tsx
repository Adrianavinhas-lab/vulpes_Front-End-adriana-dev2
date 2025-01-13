// import { ChangeEvent, useState } from "react";

// import { IComposicaoQ2 } from "./interfacesA1_4_7";
// import {
//   Box,
//   Checkbox,
//   FormControlLabel,
//   Stack,
//   TableCell,
//   TableRow,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React from "react";
// import {
//   StyledTableCell,
//   StyledTableHead,
// } from "../../../Styles/tabelCellStyled/customTableCell";
// import { CustomTextField } from "../../../Styles/theme/customThemeprovider";
// import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
// import BasicPopover from "../../../Components/Static/Popover";
// import { TabelaComposicaoHome } from "./tabela_composicaoQ2_home";

// export interface IComposicao2Props {
//   rows: IComposicaoQ2[];
//   table: IComposicaoQ2;
//   updateCreateTable: () => void;
//   onInputChangeTable: (event: ChangeEvent<HTMLInputElement>) => void;
//   onSaveTabelaTable: (callback: () => void) => void;
//   setEditingIdTable: React.Dispatch<React.SetStateAction<number | null>>;
//   editingIdTable: number | null;
//   onSaveEditTable: (callback: () => void) => void;
//   onEditTableChangeTable: (event: ChangeEvent<HTMLInputElement>) => void;
//   onDeleteTable: (id: number) => void;
//   setEditRow: React.Dispatch<React.SetStateAction<boolean>>;
//   editRow: boolean;
// }

// export const ComposicaoQ2Form: React.FC<IComposicao2Props> = ({
//   rows,
//   table,
//   updateCreateTable,
//   onInputChangeTable,
//   onSaveTabelaTable,
//   setEditingIdTable,
//   editingIdTable,
//   onSaveEditTable,
//   onEditTableChangeTable,
//   onDeleteTable,
//   setEditRow,
//   editRow,
// }) => {
//   const [createTable, setCreateTable] = useState(false);

//   const handleEditTable = (id: number | null) => {
//     setEditingIdTable(id);
//     setEditRow(true);
//   };

//   return (
//     <>
//       {rows.length <= 0 && createTable === false && (
//         <TabelaComposicaoHome aoClicarNovo={() => setCreateTable(true)} />
//       )}
//       {createTable === true && (
//         <>
//           <TableRow>
//             <StyledTableHead>Digerido de Unidade de Biogás</StyledTableHead>
//             <StyledTableCell
//               sx={{ backgroundColor: "lightgrey" }}
//             ></StyledTableCell>
//             <StyledTableCell>
//               <CustomTextField
//                 name="digerido_camp2"
//                 value={table.digerido_camp2}
//                 onChange={onInputChangeTable}
//               />
//             </StyledTableCell>
//             <StyledTableCell>
//               <CustomTextField
//                 name="digerido_camp3"
//                 value={table.digerido_camp3}
//                 onChange={onInputChangeTable}
//               />
//             </StyledTableCell>
//             <StyledTableCell>
//               <CustomTextField
//                 name="digerido_camp4"
//                 value={table.digerido_camp4}
//                 onChange={onInputChangeTable}
//               />
//             </StyledTableCell>
//             <StyledTableCell rowSpan={8}>
//               <ButtonCadernos
//                 mostrarBotaoCancelar
//                 aoClicarCancelar={() => setCreateTable(false)}
//                 mostrarBotaoGravar
//                 aoClicarGravar={() => onSaveTabelaTable(updateCreateTable)}
//               />
//             </StyledTableCell>
//           </TableRow>
//           <TableRow>
//             <StyledTableHead>
//               Sedimentos depositados nos orgãos de armazenamento de efluentes
//               pecuários (por um período até 2 nos)
//             </StyledTableHead>
//             <StyledTableCell
//               sx={{ backgroundColor: "lightgrey" }}
//             ></StyledTableCell>
//             <StyledTableCell>
//               <CustomTextField
//                 name="sedimentos_camp2"
//                 value={table.sedimentos_camp2}
//                 onChange={onInputChangeTable}
//               />
//             </StyledTableCell>
//             <StyledTableCell>
//               <CustomTextField
//                 name="sedimentos_camp3"
//                 value={table.sedimentos_camp3}
//                 onChange={onInputChangeTable}
//               />
//             </StyledTableCell>
//             <StyledTableCell>
//               <CustomTextField
//                 name="sedimentos_camp4"
//                 value={table.sedimentos_camp4}
//                 onChange={onInputChangeTable}
//               />
//             </StyledTableCell>
//           </TableRow>
//           <TableRow>
//             <StyledTableHead>
//               Mistura de um ou mais dos anteriores fertilizantes
//             </StyledTableHead>
//             <StyledTableCell
//               sx={{ backgroundColor: "lightgrey" }}
//             ></StyledTableCell>
//             <StyledTableCell>
//               <CustomTextField
//                 name="mistura_camp2"
//                 value={table.mistura_camp2}
//                 onChange={onInputChangeTable}
//               />
//             </StyledTableCell>
//             <StyledTableCell>
//               <CustomTextField
//                 name="mistura_camp3"
//                 value={table.mistura_camp3}
//                 onChange={onInputChangeTable}
//               />
//             </StyledTableCell>
//             <StyledTableCell>
//               <CustomTextField
//                 name="mistura_camp4"
//                 value={table.mistura_camp4}
//                 onChange={onInputChangeTable}
//               />
//             </StyledTableCell>
//           </TableRow>
//           <TableRow>
//             <StyledTableHead>
//               Composto de bioresíduos de origem agrícola
//             </StyledTableHead>
//             <StyledTableCell
//               sx={{ backgroundColor: "lightgrey" }}
//             ></StyledTableCell>
//             <StyledTableCell>
//               <CustomTextField
//                 name="composto_camp2"
//                 value={table.composto_camp2}
//                 onChange={onInputChangeTable}
//               />
//             </StyledTableCell>
//             <StyledTableCell>
//               <CustomTextField
//                 name="composto_camp3"
//                 value={table.composto_camp3}
//                 onChange={onInputChangeTable}
//               />
//             </StyledTableCell>
//             <StyledTableCell>
//               <CustomTextField
//                 name="composto_camp4"
//                 value={table.composto_camp4}
//                 onChange={onInputChangeTable}
//               />
//             </StyledTableCell>
//           </TableRow>
//           <TableRow>
//             <StyledTableHead>
//               Composto orgânico de Unidade de tratamento de residuos sólidos
//               urbanos (Decreto-Lei n.º 30/2022)
//             </StyledTableHead>
//             <StyledTableCell
//               sx={{ backgroundColor: "lightgrey" }}
//             ></StyledTableCell>
//             <StyledTableCell>
//               <CustomTextField
//                 name="opcao_um_camp2"
//                 value={table.opcao_um_camp2}
//                 onChange={onInputChangeTable}
//               />
//             </StyledTableCell>
//             <StyledTableCell>
//               <CustomTextField
//                 name="opcao_um_camp3"
//                 value={table.opcao_um_camp3}
//                 onChange={onInputChangeTable}
//               />
//             </StyledTableCell>
//             <StyledTableCell>
//               <CustomTextField
//                 name="opcao_um_camp4"
//                 value={table.opcao_um_camp4}
//                 onChange={onInputChangeTable}
//               />
//             </StyledTableCell>
//           </TableRow>
//           <TableRow>
//             <StyledTableCell>
//               <BasicPopover
//                 text={
//                   "Campo de preenchimento 'livre'.\n\nRegistar o fertilizante orgânico a ser utilizado quando este não se enquadra nos tipos de fertilizantes orgânicos previstos nas linhas acima."
//                 }
//               />
//             </StyledTableCell>
//             <StyledTableCell
//               sx={{ backgroundColor: "lightgrey" }}
//             ></StyledTableCell>
//             <StyledTableCell>
//               <CustomTextField
//                 name="opcao_dois_camp2"
//                 value={table.opcao_dois_camp2}
//                 onChange={onInputChangeTable}
//               />
//             </StyledTableCell>
//             <StyledTableCell>
//               <CustomTextField
//                 name="opcao_dois_camp3"
//                 value={table.opcao_dois_camp3}
//                 onChange={onInputChangeTable}
//               />
//             </StyledTableCell>
//             <StyledTableCell>
//               <CustomTextField
//                 name="opcao_dois_camp4"
//                 value={table.opcao_dois_camp4}
//                 onChange={onInputChangeTable}
//               />
//             </StyledTableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell
//               rowSpan={2}
//               sx={{
//                 textAlign: "left",
//                 fontWeight: 600,
//                 fontFamily: "candara",
//               }}
//             >
//               <Stack direction="row" justifyContent="center">
//                 Origem dos dados:
//                 <Box margin={-1} padding={0}>
//                   <BasicPopover
//                     text={
//                       "Assinalar com uma X o campo correspondente à origem dos dados"
//                     }
//                   />
//                 </Box>
//               </Stack>
//             </TableCell>
//             <TableCell colSpan={2}>
//               <Stack direction="row" alignItems="center" justifyContent="left">
//                 <FormControlLabel
//                   name="origem_tabela"
//                   label={
//                     <Typography fontFamily="candara" fontSize={16}>
//                       a) Tabela - Referência bibliográfica:
//                     </Typography>
//                   }
//                   aria-readonly
//                   control={
//                     <Checkbox
//                       defaultChecked={table.origem_tabela === true && true}
//                       value={
//                         table.origem_tabela === true && table.origem_tabela
//                       }
//                       onChange={onInputChangeTable}
//                       sx={{
//                         color: "#aaaaaa",
//                         "&.Mui-checked": {
//                           color: "#C94F1E",
//                         },
//                       }}
//                     />
//                   }
//                 />
//               </Stack>
//             </TableCell>
//             <TableCell colSpan={2}>
//               <CustomTextField
//                 name="tabela"
//                 value={table.tabela}
//                 onChange={onInputChangeTable}
//               />
//             </TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell colSpan={2}>
//               <Stack direction="row" alignItems="center" justifyContent="left">
//                 <FormControlLabel
//                   name="origem_analise"
//                   label={
//                     <Typography fontFamily="candara" fontSize={16}>
//                       b) Análise - Data:
//                     </Typography>
//                   }
//                   aria-readonly
//                   control={
//                     <Checkbox
//                       defaultChecked={table.origem_analise === true && true}
//                       value={
//                         table.origem_analise === true && table.origem_analise
//                       }
//                       onChange={onInputChangeTable}
//                       sx={{
//                         color: "#aaaaaa",
//                         "&.Mui-checked": {
//                           color: "#C94F1E",
//                         },
//                       }}
//                     />
//                   }
//                 />
//               </Stack>
//             </TableCell>

//             <TableCell colSpan={2}>
//               <TextField
//                 variant="filled"
//                 type="date"
//                 inputProps={{
//                   style: { fontSize: 12, fontFamily: "verdana" },
//                 }}
//                 name="analise"
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 value={table.analise ? table.analise : ""}
//                 onChange={onInputChangeTable}
//               />
//             </TableCell>
//           </TableRow>
//         </>
//       )}

//       {rows.map((tab) => {
//         if (tab)
//           return (
//             <>
//               {editingIdTable === tab.id_anexo_um_quatro_um && editRow ? (
//                 <>
//                   <TableRow>
//                     <StyledTableHead>
//                       Digerido de Unidade de Biogás
//                     </StyledTableHead>
//                     <StyledTableCell
//                       sx={{ backgroundColor: "lightgrey" }}
//                     ></StyledTableCell>
//                     <StyledTableCell>
//                       <CustomTextField
//                         name="digerido_camp2"
//                         value={tab.digerido_camp2}
//                         onChange={onEditTableChangeTable}
//                       />
//                     </StyledTableCell>
//                     <StyledTableCell>
//                       <CustomTextField
//                         name="digerido_camp3"
//                         value={tab.digerido_camp3}
//                         onChange={onEditTableChangeTable}
//                       />
//                     </StyledTableCell>
//                     <StyledTableCell>
//                       <CustomTextField
//                         name="digerido_camp4"
//                         value={tab.digerido_camp4}
//                         onChange={onEditTableChangeTable}
//                       />
//                     </StyledTableCell>
//                     <StyledTableCell rowSpan={8}>
//                       <ButtonCadernos
//                         mostrarBotaoGravar
//                         aoClicarGravar={() =>
//                           onSaveEditTable(updateCreateTable)
//                         }
//                         mostrarBotaoCancelar
//                         aoClicarCancelar={() => setEditRow(false)}
//                       />
//                     </StyledTableCell>
//                   </TableRow>
//                   <TableRow>
//                     <StyledTableHead>
//                       Sedimentos depositados nos orgãos de armazenamento de
//                       efluentes pecuários (por um período até 2 nos)
//                     </StyledTableHead>
//                     <StyledTableCell
//                       sx={{ backgroundColor: "lightgrey" }}
//                     ></StyledTableCell>
//                     <StyledTableCell>
//                       <CustomTextField
//                         name="sedimentos_camp2"
//                         value={tab.sedimentos_camp2}
//                         onChange={onEditTableChangeTable}
//                       />
//                     </StyledTableCell>
//                     <StyledTableCell>
//                       <CustomTextField
//                         name="sedimentos_camp3"
//                         value={tab.sedimentos_camp3}
//                         onChange={onEditTableChangeTable}
//                       />
//                     </StyledTableCell>
//                     <StyledTableCell>
//                       <CustomTextField
//                         name="sedimentos_camp4"
//                         value={tab.sedimentos_camp4}
//                         onChange={onEditTableChangeTable}
//                       />
//                     </StyledTableCell>
//                   </TableRow>
//                   <TableRow>
//                     <StyledTableHead>
//                       Mistura de um ou mais dos anteriores fertilizantes
//                     </StyledTableHead>
//                     <StyledTableCell
//                       sx={{ backgroundColor: "lightgrey" }}
//                     ></StyledTableCell>
//                     <StyledTableCell>
//                       <CustomTextField
//                         name="mistura_camp2"
//                         value={tab.mistura_camp2}
//                         onChange={onEditTableChangeTable}
//                       />
//                     </StyledTableCell>
//                     <StyledTableCell>
//                       <CustomTextField
//                         name="mistura_camp3"
//                         value={tab.mistura_camp3}
//                         onChange={onEditTableChangeTable}
//                       />
//                     </StyledTableCell>
//                     <StyledTableCell>
//                       <CustomTextField
//                         name="mistura_camp4"
//                         value={tab.mistura_camp4}
//                         onChange={onEditTableChangeTable}
//                       />
//                     </StyledTableCell>
//                   </TableRow>
//                   <TableRow>
//                     <StyledTableHead>
//                       Composto de bioresíduos de origem agrícola
//                     </StyledTableHead>
//                     <StyledTableCell
//                       sx={{ backgroundColor: "lightgrey" }}
//                     ></StyledTableCell>
//                     <StyledTableCell>
//                       <CustomTextField
//                         name="composto_camp2"
//                         value={tab.composto_camp2}
//                         onChange={onEditTableChangeTable}
//                       />
//                     </StyledTableCell>
//                     <StyledTableCell>
//                       <CustomTextField
//                         name="composto_camp3"
//                         value={tab.composto_camp3}
//                         onChange={onEditTableChangeTable}
//                       />
//                     </StyledTableCell>
//                     <StyledTableCell>
//                       <CustomTextField
//                         name="composto_camp4"
//                         value={tab.composto_camp4}
//                         onChange={onEditTableChangeTable}
//                       />
//                     </StyledTableCell>
//                   </TableRow>
//                   <TableRow>
//                     <StyledTableHead>
//                       Composto orgânico de Unidade de tratamento de residuos
//                       sólidos urbanos (Decreto-Lei n.º 30/2022)
//                     </StyledTableHead>
//                     <StyledTableCell
//                       sx={{ backgroundColor: "lightgrey" }}
//                     ></StyledTableCell>
//                     <StyledTableCell>
//                       <CustomTextField
//                         name="opcao_um_camp2"
//                         value={tab.opcao_um_camp2}
//                         onChange={onEditTableChangeTable}
//                       />
//                     </StyledTableCell>
//                     <StyledTableCell>
//                       <CustomTextField
//                         name="opcao_um_camp3"
//                         value={tab.opcao_um_camp3}
//                         onChange={onEditTableChangeTable}
//                       />
//                     </StyledTableCell>
//                     <StyledTableCell>
//                       <CustomTextField
//                         name="opcao_um_camp4"
//                         value={tab.opcao_um_camp4}
//                         onChange={onEditTableChangeTable}
//                       />
//                     </StyledTableCell>
//                   </TableRow>
//                   <TableRow>
//                     <StyledTableCell>
//                       <BasicPopover
//                         text={
//                           "Campo de preenchimento 'livre'.\n\nRegistar o fertilizante orgânico a ser utilizado quando este não se enquadra nos tipos de fertilizantes orgânicos previstos nas linhas acima."
//                         }
//                       />
//                     </StyledTableCell>
//                     <StyledTableCell
//                       sx={{ backgroundColor: "lightgrey" }}
//                     ></StyledTableCell>
//                     <StyledTableCell>
//                       <CustomTextField
//                         name="opcao_dois_camp2"
//                         value={tab.opcao_dois_camp2}
//                         onChange={onEditTableChangeTable}
//                       />
//                     </StyledTableCell>
//                     <StyledTableCell>
//                       <CustomTextField
//                         name="opcao_dois_camp3"
//                         value={tab.opcao_dois_camp3}
//                         onChange={onEditTableChangeTable}
//                       />
//                     </StyledTableCell>
//                     <StyledTableCell>
//                       <CustomTextField
//                         name="opcao_dois_camp4"
//                         value={tab.opcao_dois_camp4}
//                         onChange={onEditTableChangeTable}
//                       />
//                     </StyledTableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell
//                       rowSpan={2}
//                       sx={{
//                         textAlign: "left",
//                         fontWeight: 600,
//                         fontFamily: "candara",
//                       }}
//                     >
//                       <Stack direction="row" justifyContent="center">
//                         Origem dos dados:
//                         <Box margin={-1} padding={0}>
//                           <BasicPopover
//                             text={
//                               "Assinalar com uma X o campo correspondente à origem dos dados"
//                             }
//                           />
//                         </Box>
//                       </Stack>
//                     </TableCell>
//                     <TableCell colSpan={2}>
//                       <Stack
//                         direction="row"
//                         alignItems="center"
//                         justifyContent="left"
//                       >
//                         <FormControlLabel
//                           name="origem_tabela"
//                           label={
//                             <Typography fontFamily="candara" fontSize={16}>
//                               a) Tabela - Referência bibliográfica:
//                             </Typography>
//                           }
//                           aria-readonly
//                           control={
//                             <Checkbox
//                               checked={tab.origem_tabela === true && true}
//                               onChange={onEditTableChangeTable}
//                               sx={{
//                                 color: "#aaaaaa",
//                                 "&.Mui-checked": {
//                                   color: "#C94F1E",
//                                 },
//                               }}
//                             />
//                           }
//                         />
//                       </Stack>
//                     </TableCell>
//                     <TableCell colSpan={2}>
//                       <CustomTextField
//                         name="tabela"
//                         value={tab.tabela}
//                         onChange={onEditTableChangeTable}
//                       />
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell colSpan={2}>
//                       <Stack
//                         direction="row"
//                         alignItems="center"
//                         justifyContent="left"
//                       >
//                         <FormControlLabel
//                           name="origem_analise"
//                           label={
//                             <Typography fontFamily="candara" fontSize={16}>
//                               b) Análise - Data:
//                             </Typography>
//                           }
//                           aria-readonly
//                           control={
//                             <Checkbox
//                               checked={tab.origem_analise === true && true}
//                               onChange={onEditTableChangeTable}
//                               sx={{
//                                 color: "#aaaaaa",
//                                 "&.Mui-checked": {
//                                   color: "#C94F1E",
//                                 },
//                               }}
//                             />
//                           }
//                         />
//                       </Stack>
//                     </TableCell>
//                     <TableCell colSpan={2}>
//                       <CustomTextField
//                         name="analise"
//                         value={tab.analise}
//                         onChange={onEditTableChangeTable}
//                       />
//                     </TableCell>
//                   </TableRow>
//                 </>
//               ) : (
//                 <>
//                   <TableRow>
//                     <StyledTableCell>
//                       Digerido de Unidade de Biogás
//                     </StyledTableCell>
//                     <StyledTableCell>{tab.digerido_camp1}</StyledTableCell>
//                     <StyledTableCell>{tab.digerido_camp2}</StyledTableCell>
//                     <StyledTableCell>{tab.digerido_camp3}</StyledTableCell>
//                     <StyledTableCell>{tab.digerido_camp4}</StyledTableCell>
//                     <StyledTableCell rowSpan={8}>
//                       <ButtonCadernos
//                         mostrarBotaoEditar
//                         aoClicarEditar={() =>
//                           handleEditTable(tab.id_anexo_um_quatro_um)
//                         }
//                         mostrarBotaoApagar
//                         aoClicarApagar={() =>
//                           onDeleteTable(tab.id_anexo_um_quatro_um)
//                         }
//                       />
//                     </StyledTableCell>
//                   </TableRow>
//                   <TableRow>
//                     <StyledTableCell>
//                       Sedimentos depositados nos orgãos de armazenamento de
//                       efluentes pecuários (por um período até 2 nos)
//                     </StyledTableCell>
//                     <StyledTableCell>{tab.sedimentos_camp1}</StyledTableCell>
//                     <StyledTableCell>{tab.sedimentos_camp2}</StyledTableCell>
//                     <StyledTableCell>{tab.sedimentos_camp3}</StyledTableCell>
//                     <StyledTableCell>{tab.sedimentos_camp4}</StyledTableCell>
//                   </TableRow>
//                   <TableRow>
//                     <StyledTableCell>
//                       Mistura de um ou mais dos anteriores fertilizantes
//                     </StyledTableCell>
//                     <StyledTableCell>{tab.mistura_camp1}</StyledTableCell>
//                     <StyledTableCell>{tab.mistura_camp2}</StyledTableCell>
//                     <StyledTableCell>{tab.mistura_camp3}</StyledTableCell>
//                     <StyledTableCell>{tab.mistura_camp4}</StyledTableCell>
//                   </TableRow>
//                   <TableRow>
//                     <StyledTableCell>
//                       Composto de bioresíduos de origem agrícola
//                     </StyledTableCell>
//                     <StyledTableCell>{tab.composto_camp1}</StyledTableCell>
//                     <StyledTableCell>{tab.composto_camp2}</StyledTableCell>
//                     <StyledTableCell>{tab.composto_camp3}</StyledTableCell>
//                     <StyledTableCell>{tab.composto_camp4}</StyledTableCell>
//                   </TableRow>
//                   <TableRow>
//                     <StyledTableCell>
//                       Composto orgânico de Unidade de tratamento de residuos
//                       sólidos urbanos (Decreto-Lei n.º 30/2022)
//                     </StyledTableCell>
//                     <StyledTableCell>{tab.opcao_um_camp1}</StyledTableCell>
//                     <StyledTableCell>{tab.opcao_um_camp2}</StyledTableCell>
//                     <StyledTableCell>{tab.opcao_um_camp3}</StyledTableCell>
//                     <StyledTableCell>{tab.opcao_um_camp4}</StyledTableCell>
//                   </TableRow>
//                   <TableRow>
//                     <StyledTableCell>
//                       <BasicPopover
//                         text={
//                           "Campo de preenchimento 'livre'.\n\nRegistar o fertilizante orgânico a ser utilizado quando este não se enquadra nos tipos de fertilizantes orgânicos previstos nas linhas acima."
//                         }
//                       />
//                     </StyledTableCell>
//                     <StyledTableCell>{tab.opcao_dois_camp1}</StyledTableCell>
//                     <StyledTableCell>{tab.opcao_dois_camp2}</StyledTableCell>
//                     <StyledTableCell>{tab.opcao_dois_camp3}</StyledTableCell>
//                     <StyledTableCell>{tab.opcao_dois_camp4}</StyledTableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell
//                       rowSpan={2}
//                       sx={{
//                         textAlign: "left",
//                         fontWeight: 600,
//                         fontFamily: "candara",
//                       }}
//                     >
//                       <Stack direction="row" justifyContent="center">
//                         Origem dos dados:
//                         <Box margin={-1} padding={0}>
//                           <BasicPopover
//                             text={
//                               "Assinalar com uma X o campo correspondente à origem dos dados"
//                             }
//                           />
//                         </Box>
//                       </Stack>
//                     </TableCell>
//                     <TableCell colSpan={2}>
//                       <Stack
//                         direction="row"
//                         alignItems="center"
//                         justifyContent="left"
//                       >
//                         <FormControlLabel
//                           name="origem_tabela"
//                           label={
//                             <Typography fontFamily="candara" fontSize={16}>
//                               a) Tabela - Referência bibliográfica:
//                             </Typography>
//                           }
//                           aria-readonly
//                           control={
//                             <Checkbox
//                               checked={tab.origem_tabela === true && true}
//                               sx={{
//                                 color: "#aaaaaa",
//                                 "&.Mui-checked": {
//                                   color: "#C94F1E",
//                                 },
//                               }}
//                             />
//                           }
//                         />
//                       </Stack>
//                     </TableCell>
//                     <TableCell colSpan={2}>{tab.tabela}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell colSpan={2}>
//                       <Stack
//                         direction="row"
//                         alignItems="center"
//                         justifyContent="left"
//                       >
//                         <FormControlLabel
//                           name="origem_analise"
//                           label={
//                             <Typography fontFamily="candara" fontSize={16}>
//                               b) Análise - Data:
//                             </Typography>
//                           }
//                           aria-readonly
//                           control={
//                             <Checkbox
//                               checked={tab.origem_analise === true && true}
//                               sx={{
//                                 color: "#aaaaaa",
//                                 "&.Mui-checked": {
//                                   color: "#C94F1E",
//                                 },
//                               }}
//                             />
//                           }
//                         />
//                       </Stack>
//                     </TableCell>
//                     <TableCell colSpan={2}>{tab.analise}</TableCell>
//                   </TableRow>
//                 </>
//               )}
//             </>
//           );
//         return null;
//       })}
//     </>
//   );
// };
export {}
