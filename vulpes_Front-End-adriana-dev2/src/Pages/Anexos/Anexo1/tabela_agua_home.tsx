// import {
//   Checkbox,
//   FormControlLabel,
//   Stack,
//   TableCell,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import {
//   StyledTableCell,
//   StyledTableHead,
// } from "../../../Styles/tabelCellStyled/customTableCell";
// import BasicPopover from "../../../Components/Static/Popover";

// export const TabelaAguaHome = () => {
//   return (
//     <>
//       <TableRow>
//         <TableCell
//           colSpan={5}
//           sx={{
//             fontWeight: 600,
//             fontFamily: "candara",
//           }}
//         >
//           <Stack
//             direction="row"
//             sx={{ justifyContent: "center", alignItems: "center" }}
//           >
//             Dotação (m3/ha):
//           </Stack>
//         </TableCell>
//         <TableCell
//           colSpan={4}
//           sx={{
//             fontWeight: 600,
//             fontFamily: "candara",
//           }}
//         >
//           <Stack
//             direction="row"
//             sx={{ justifyContent: "center", alignItems: "center" }}
//           >
//             Origem da água:
//           </Stack>
//         </TableCell>
//         <TableCell
//           colSpan={4}
//           sx={{
//             fontWeight: 600,
//             fontFamily: "candara",
//           }}
//         >
//           <Stack
//             direction="row"
//             sx={{ justifyContent: "center", alignItems: "center" }}
//           >
//             Método de rega:
//           </Stack>
//         </TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell
//           colSpan={4}
//           sx={{
//             fontWeight: 600,
//             fontFamily: "candara",
//           }}
//         >
//           <Stack
//             direction="row"
//             sx={{ justifyContent: "center", alignItems: "center" }}
//           >
//             Eficiência de rega:
//           </Stack>
//         </TableCell>
//         <TableCell
//           colSpan={9}
//           sx={{
//             fontWeight: 600,
//             fontFamily: "candara",
//           }}
//         >
//           <Stack
//             direction="row"
//             sx={{ justifyContent: "center", alignItems: "center" }}
//           >
//             Razão de adsorção de sódio ajustada:
//           </Stack>
//         </TableCell>
//       </TableRow>
//       <TableRow>
//         <StyledTableHead sx={{ minWidth: 100 }} colSpan={2}>
//           Elemento/nutriente
//           <BasicPopover text="Todos os campos deste quadro são de preenchimento obrigatório." />
//         </StyledTableHead>
//         <StyledTableHead sx={{ minWidth: 100 }}>
//           N
//           <BasicPopover text="Azoto sob a forma de nitrato (NO3)" />
//         </StyledTableHead>
//         <StyledTableHead sx={{ minWidth: 100 }}>
//           P2O5
//           <BasicPopover text="Fósforo" />
//         </StyledTableHead>
//         <StyledTableHead sx={{ minWidth: 100 }}>
//           K
//           <BasicPopover text="Potássio" />
//         </StyledTableHead>
//         <StyledTableHead sx={{ minWidth: 100 }}>
//           Mg
//           <BasicPopover text="Magnésio" />
//         </StyledTableHead>
//         <StyledTableHead sx={{ minWidth: 100 }}>Bicarbonatos</StyledTableHead>
//         <StyledTableHead sx={{ minWidth: 100 }}>
//           B
//           <BasicPopover text="Boro" />
//         </StyledTableHead>
//         <StyledTableHead sx={{ minWidth: 100 }}>
//           Ca
//           <BasicPopover text="Cálcio" />
//         </StyledTableHead>
//         <StyledTableHead sx={{ minWidth: 100 }}>Clorestos</StyledTableHead>
//         <StyledTableHead sx={{ minWidth: 100 }}>
//           Na
//           <BasicPopover text="Sódio" />
//         </StyledTableHead>
//         <StyledTableHead sx={{ minWidth: 100 }}>pH(H2O)</StyledTableHead>
//         <StyledTableHead sx={{ minWidth: 100 }}>
//           C.E. (dS/m)
//           <BasicPopover text="Condutividade elétrica" />
//         </StyledTableHead>
//       </TableRow>
//       <TableRow>
//         <StyledTableHead>Resultado das análises</StyledTableHead>
//         <StyledTableHead>(mg/l)</StyledTableHead>
//         <StyledTableHead></StyledTableHead>
//         <StyledTableHead></StyledTableHead>
//         <StyledTableHead></StyledTableHead>
//         <StyledTableHead></StyledTableHead>
//         <StyledTableHead></StyledTableHead>
//         <StyledTableHead></StyledTableHead>
//         <StyledTableHead></StyledTableHead>
//         <StyledTableHead></StyledTableHead>
//         <StyledTableHead></StyledTableHead>
//         <StyledTableHead></StyledTableHead>
//         <StyledTableHead></StyledTableHead>
//       </TableRow>
//       <TableRow>
//         <StyledTableHead colSpan={2}>
//           Quantidade de nutriente fornecida pela água de rega (kg/ha)
//         </StyledTableHead>
//         <StyledTableCell></StyledTableCell>
//         <StyledTableCell></StyledTableCell>

//         <StyledTableCell
//           colSpan={9}
//           sx={{ backgroundColor: "lightgray" }}
//         ></StyledTableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell colSpan={5}>
//           Identificar se a avaliação do teor de potássio na água de rega foi
//           expresso em:
//         </TableCell>

//         <TableCell colSpan={4}>
//           <Stack direction="row" alignItems="center" justifyContent="center">
//             <FormControlLabel
//               name="k"
//               label={
//                 <Typography fontFamily="candara" fontSize={18}>
//                   K
//                 </Typography>
//               }
//               aria-readonly
//               control={
//                 <Checkbox
//                   sx={{
//                     color: "#aaaaaa",
//                     "&.Mui-checked": {
//                       color: "#C94F1E",
//                     },
//                   }}
//                 />
//               }
//             />
//           </Stack>
//         </TableCell>

//         <TableCell colSpan={4}>
//           <FormControlLabel
//             name="ko"
//             label={
//               <Typography fontFamily="candara" fontSize={18}>
//                 K2O
//               </Typography>
//             }
//             aria-readonly
//             control={
//               <Checkbox
//                 sx={{
//                   color: "#aaaaaa",
//                   "&.Mui-checked": {
//                     color: "#C94F1E",
//                   },
//                 }}
//               />
//             }
//           />
//         </TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell
//           colSpan={4}
//           sx={{
//             fontWeight: 600,
//             fontFamily: "candara",
//           }}
//         >
//           <Stack
//             direction="row"
//             sx={{ justifyContent: "center", alignItems: "center" }}
//           >
//             Data da colheita da água:
//           </Stack>
//         </TableCell>
//         <TableCell
//           colSpan={3}
//           sx={{
//             fontWeight: 600,
//             fontFamily: "candara",
//           }}
//         >
//           <Stack
//             direction="row"
//             sx={{ justifyContent: "center", alignItems: "center" }}
//           >
//             Data emissão resultados:
//           </Stack>
//         </TableCell>
//         <TableCell
//           colSpan={3}
//           sx={{
//             fontWeight: 600,
//             fontFamily: "candara",
//           }}
//         >
//           <Stack
//             direction="row"
//             sx={{ justifyContent: "center", alignItems: "center" }}
//           >
//             N.º de amostras
//           </Stack>
//         </TableCell>
//         <TableCell
//           colSpan={3}
//           sx={{
//             fontWeight: 600,
//             fontFamily: "candara",
//           }}
//         >
//           <Stack
//             direction="row"
//             sx={{ justifyContent: "center", alignItems: "center" }}
//           >
//             N.º do Boletim:
//           </Stack>
//         </TableCell>
//       </TableRow>
//     </>
//   );
// };
export {}