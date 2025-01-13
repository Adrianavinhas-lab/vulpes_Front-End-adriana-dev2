import React, { useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Snackbar, TextField } from "@mui/material";
import { styled, Paper } from "@mui/material";
import { Box } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import { TableBody, TableHead } from "@mui/material";
import { TableContainer } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material";

import CadernoLayout from "../../../Styles/layout/cadernoLayout";
import LoadingVulpes from "../../../Styles/Loader/loading";
import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { Typography } from "@material-ui/core";

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
  })
);
const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          // input label when focused
          "& label.Mui-focused": {
            color: "#c94f1e",
            // focused color for input with variant='standard'
            "& .MuiInput-underline:after": {
              borderBottomColor: "#c94f1e",
            },
          },
          // focused color for input with variant='filled'
          "& .MuiFilledInput-underline:after": {
            borderBottomColor: "#c94f1e",
          },
          // focused color for input with variant='outlined'
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#c94f1e",
            },
          },
        },
      },
    },
  },
});


const StyledTableHead = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: theme.spacing(0, 1),
  border: "1px solid #555",
  textAlign: "left",
  fontSize: 16,
  fontFamily: "candara",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#dcdcdc",
  color: theme.palette.common.black,
  padding: theme.spacing(0, 1),
  border: "1px solid #555",
  textAlign: "center",
  fontSize: 14,
  height: "40px",
}));

interface ICadernosEF {
  id_cadernoEF: number;

  pa_pastagem: string;
  pa_total_ms_pastagem: string;
  pa_peso_dieta_pastagem: string;
  grupo_homo1_pastagem: string;
  grupo_homo2_pastagem: string;
  grupo_homo3_pastagem: string;
  grupo_homo4_pastagem: string;
  grupo_homo5_pastagem: string;
  cc_total_ms_pastagem: string;
  cc_peso_dieta_pastagem: string;
  dif_pastagem: string;
  dif_ms_pastagem: string;
  dif_dieta_pastagem: string;

  pa_silagem: string;
  pa_total_ms_silagem: string;
  pa_peso_dieta_silagem: string;
  grupo_homo1_silagem: string;
  grupo_homo2_silagem: string;
  grupo_homo3_silagem: string;
  grupo_homo4_silagem: string;
  grupo_homo5_silagem: string;
  cc_total_ms_silagem: string;
  cc_peso_dieta_silagem: string;
  dif_silagem: string;
  dif_ms_silagem: string;
  dif_dieta_silagem: string;

  pa_o_forragem: string;
  pa_total_ms_o_forragem: string;
  pa_peso_dieta_o_forragem: string;
  grupo_homo1_o_forragem: string;
  grupo_homo2_o_forragem: string;
  grupo_homo3_o_forragem: string;
  grupo_homo4_o_forragem: string;
  grupo_homo5_o_forragem: string;
  cc_total_ms_o_forragem: string;
  cc_peso_dieta_o_forragem: string;
  dif_o_forragem: string;
  dif_ms_o_forragem: string;
  dif_dieta_o_forragem: string;

  pa_composto: string;
  pa_total_ms_composto: string;
  pa_peso_dieta_composto: string;
  grupo_homo1_composto: string;
  grupo_homo2_composto: string;
  grupo_homo3_composto: string;
  grupo_homo4_composto: string;
  grupo_homo5_composto: string;
  cc_total_ms_composto: string;
  cc_peso_dieta_composto: string;
  dif_composto: string;
  dif_ms_composto: string;
  dif_dieta_composto: string;

  id_rosto: 0;
  last_update: string;
  create_date: string;
  uuid: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function EFCadernoCampos() {
  const classes = useStyles();
  const [isLoading] = useState(false);
  const [message] = React.useState("");

  const [id, ] = useState(0);

  const [rows, setRows] = useState<ICadernosEF>({
    id_cadernoEF: 0,

    pa_pastagem: "",
    pa_total_ms_pastagem: "",
    pa_peso_dieta_pastagem: "",
    grupo_homo1_pastagem: "",
    grupo_homo2_pastagem: "",
    grupo_homo3_pastagem: "",
    grupo_homo4_pastagem: "",
    grupo_homo5_pastagem: "",
    cc_total_ms_pastagem: "",
    cc_peso_dieta_pastagem: "",
    dif_pastagem: "",
    dif_ms_pastagem: "",
    dif_dieta_pastagem: "",

    pa_silagem: "",
    pa_total_ms_silagem: "",
    pa_peso_dieta_silagem: "",
    grupo_homo1_silagem: "",
    grupo_homo2_silagem: "",
    grupo_homo3_silagem: "",
    grupo_homo4_silagem: "",
    grupo_homo5_silagem: "",
    cc_total_ms_silagem: "",
    cc_peso_dieta_silagem: "",
    dif_silagem: "",
    dif_ms_silagem: "",
    dif_dieta_silagem: "",

    pa_o_forragem: "",
    pa_total_ms_o_forragem: "",
    pa_peso_dieta_o_forragem: "",
    grupo_homo1_o_forragem: "",
    grupo_homo2_o_forragem: "",
    grupo_homo3_o_forragem: "",
    grupo_homo4_o_forragem: "",
    grupo_homo5_o_forragem: "",
    cc_total_ms_o_forragem: "",
    cc_peso_dieta_o_forragem: "",
    dif_o_forragem: "",
    dif_ms_o_forragem: "",
    dif_dieta_o_forragem: "",

    pa_composto: "",
    pa_total_ms_composto: "",
    pa_peso_dieta_composto: "",
    grupo_homo1_composto: "",
    grupo_homo2_composto: "",
    grupo_homo3_composto: "",
    grupo_homo4_composto: "",
    grupo_homo5_composto: "",
    cc_total_ms_composto: "",
    cc_peso_dieta_composto: "",
    dif_composto: "",
    dif_ms_composto: "",
    dif_dieta_composto: "",
    id_rosto: 0,
    last_update: "",
    create_date: "",
    uuid: "",
  });

  const handleNewRowsChange = (
    field: keyof ICadernosEF,
    value: string | number
  ) => {
    setRows((prevNewRows) => ({
      ...prevNewRows,
      [field]: value,
    }));
  };

  /*************** EDITAR LINHA *********************/
  // const [rows, setRows] = useState<ICadernosEF[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  // const [editedFields, setEditedFields] = useState<
  //   Partial<Record<number, Partial<ICadernosEF>>>
  // >({});
  const handleEdit = (id: number) => {
    setEditingId(id);
    // setEditedFields({});
  };

  /******  ALERTA **********************************/
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, ] = React.useState(false);
  const handleCloseSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackSuccess(false);
  };

  return (
    <div className={classes.root}>
      <CadernoLayout title="A.3.4 Melhorar a eficiência alimentar animal para redução das emissões de GEE - Bovinos de Carne" />
      <main className={classes.contents}>
        <div className={classes.toolbars} />

        <Box width="80%" margin="auto">
          <Beneficiario_nome_id_alinhado_direita />
        </Box>
        <Box height={20}></Box>
        {isLoading ? (
          <LoadingVulpes />
        ) : (
          <ThemeProvider theme={theme}>
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ height: "auto", width: "auto", padding: 2 }}
          >
            <Snackbar
              open={openSnackSuccess}
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
              open={openSnackError}
              autoHideDuration={2000}
              onClose={handleCloseSnack}
            >
              <Alert
                onClose={handleCloseSnack}
                severity="error"
                sx={{ width: "100%" }}
              >
                Erro ao editar caderno!
              </Alert>
            </Snackbar>

            <table style={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={5}
                    sx={{
                      fontWeight: 700,
                      fontSize: 18,
                      fontFamily: "candara",
                    }}
                  >
                    CC - Caderno de Campo
                  </TableCell>
                  {editingId === id ? (
                    <TableCell colSpan={8}>
                      <ButtonCadernos
                        mostrarBotaoGravar
                        // aoClicarGravar={() => criarTabela(newRows)}
                        mostrarBotaoCancelar
                        aoClicarCancelar={() => setEditingId(null)}
                      />
                    </TableCell>
                  ) : (
                    <TableCell
                      colSpan={8}
                      sx={{ alignItems: "center", justifyContent: "end" }}
                    >
                      <ButtonCadernos
                        mostrarBotaoEditar
                        aoClicarEditar={() => handleEdit(id)}
                        mostrarBotaoApagar
                        // aoClicarApagar={() => handleClickOpenDelete(id)}
                      />
                    </TableCell>
                  )}
                </TableRow>

                <TableRow>
                  <StyledTableHead rowSpan={2} colSpan={2}>
                    Efetivo Pecuário
                  </StyledTableHead>
                  <StyledTableCell
                    colSpan={4}
                    sx={{
                      alignContent: "center",
                      fontFamily: "candara",
                      fontSize: 16,
                      backgroundColor: "white",
                    }}
                  >
                    Tipo de alimento <br /> (ton de Matéria seca)
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableHead>Pastagem</StyledTableHead>
                  <StyledTableHead>Silagem</StyledTableHead>
                  <StyledTableHead>Outra Forragem</StyledTableHead>
                  <StyledTableHead>Composto</StyledTableHead>
                </TableRow>
              </TableHead>
              <TableBody>
                {editingId === id ? (
                  <>
                    <TableRow>
                      <StyledTableHead
                        rowSpan={2}
                        colSpan={2}
                        sx={{
                          justifyContent: "space-between",
                          verticalAlign: "top",
                        }}
                      >
                        <strong>1. plano de Alimentação</strong> (necessidades
                        anuais)
                        <Box
                          sx={{
                            justifyContent: "end",
                            display: "flex",
                            padding: 2,
                          }}
                        >
                          <Typography
                            style={{ fontFamily: "candara", fontSize: 16 }}
                          >
                            Total de MS
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            justifyContent: "end",
                            display: "flex",
                            padding: 2,
                          }}
                        >
                          <Typography
                            style={{ fontFamily: "candara", fontSize: 16 }}
                          >
                            Peso na Dieta (%)
                          </Typography>
                        </Box>
                      </StyledTableHead>
                      <StyledTableCell>
                        {" "}
                        <TextField
                          variant="filled"
                          margin="normal"
                          value={rows.pa_total_ms_pastagem}
                          name="pa_total_ms_pastagem"
                          onChange={(e) =>
                            handleNewRowsChange(
                              "pa_total_ms_pastagem",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead
                        colSpan={2}
                        rowSpan={6}
                        sx={{
                          justifyContent: "space-between",
                          verticalAlign: "top",
                        }}
                      >
                        <strong>2. Caderno de Campo</strong>

                        <Box
                          sx={{
                            padding: 1,
                          }}
                        >
                          <Typography
                            style={{ fontFamily: "candara", fontSize: 16 }}
                          >
                            Grupo Homogéneo 1
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            padding: 1,
                          }}
                        >
                          <Typography
                            style={{ fontFamily: "candara", fontSize: 16 }}
                          >
                            Grupo Homogéneo 2
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            padding: 1,
                          }}
                        >
                          <Typography
                            style={{ fontFamily: "candara", fontSize: 16 }}
                          >
                            Grupo Homogéneo 3
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            padding: 1,
                          }}
                        >
                          <Typography
                            style={{ fontFamily: "candara", fontSize: 16 }}
                          >
                            Grupo Homogéneo 4
                          </Typography>
                          <Box
                            sx={{
                              justifyContent: "end",
                              display: "flex",
                              padding: 1,
                            }}
                          >
                            <Typography
                              style={{ fontFamily: "candara", fontSize: 16 }}
                            >
                              Total de MS
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              justifyContent: "end",
                              display: "flex",
                              padding: 1,
                            }}
                          >
                            <Typography
                              style={{ fontFamily: "candara", fontSize: 16 }}
                            >
                              Peso na Dieta (%)
                            </Typography>
                          </Box>
                        </Box>
                      </StyledTableHead>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead
                        rowSpan={2}
                        colSpan={2}
                        sx={{
                          justifyContent: "space-between",
                          verticalAlign: "top",
                        }}
                      >
                        <strong>3. Diferença (2-1) </strong>
                        <Box
                          sx={{
                            justifyContent: "end",
                            display: "flex",
                            padding: 2,
                          }}
                        >
                          <Typography
                            style={{ fontFamily: "candara", fontSize: 16 }}
                          >
                            Total de MS
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            justifyContent: "end",
                            display: "flex",
                            padding: 2,
                          }}
                        >
                          <Typography
                            style={{ fontFamily: "candara", fontSize: 16 }}
                          >
                            Peso na Dieta (%)
                          </Typography>
                        </Box>
                      </StyledTableHead>

                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                  </>
                ) : (
                  <>
                    <TableRow>
                      <StyledTableHead
                        rowSpan={2}
                        colSpan={2}
                        sx={{
                          justifyContent: "space-between",
                          verticalAlign: "top",
                        }}
                      >
                        <strong>1. plano de Alimentação</strong> (necessidades
                        anuais)
                        <Box
                          sx={{
                            justifyContent: "end",
                            display: "flex",
                            padding: 2,
                          }}
                        >
                          <Typography
                            style={{ fontFamily: "candara", fontSize: 16 }}
                          >
                            Total de MS
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            justifyContent: "end",
                            display: "flex",
                            padding: 2,
                          }}
                        >
                          <Typography
                            style={{ fontFamily: "candara", fontSize: 16 }}
                          >
                            Peso na Dieta (%)
                          </Typography>
                        </Box>
                      </StyledTableHead>
                      <StyledTableCell>
                        {rows.pa_total_ms_pastagem}{" "}
                      </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell> </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead
                        colSpan={2}
                        rowSpan={6}
                        sx={{
                          justifyContent: "space-between",
                          verticalAlign: "top",
                        }}
                      >
                        <strong>2. Caderno de Campo</strong>

                        <Box
                          sx={{
                            padding: 1,
                          }}
                        >
                          <Typography
                            style={{ fontFamily: "candara", fontSize: 16 }}
                          >
                            Grupo Homogéneo 1
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            padding: 1,
                          }}
                        >
                          <Typography
                            style={{ fontFamily: "candara", fontSize: 16 }}
                          >
                            Grupo Homogéneo 2
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            padding: 1,
                          }}
                        >
                          <Typography
                            style={{ fontFamily: "candara", fontSize: 16 }}
                          >
                            Grupo Homogéneo 3
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            padding: 1,
                          }}
                        >
                          <Typography
                            style={{ fontFamily: "candara", fontSize: 16 }}
                          >
                            Grupo Homogéneo 4
                          </Typography>
                          <Box
                            sx={{
                              justifyContent: "end",
                              display: "flex",
                              padding: 1,
                            }}
                          >
                            <Typography
                              style={{ fontFamily: "candara", fontSize: 16 }}
                            >
                              Total de MS
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              justifyContent: "end",
                              display: "flex",
                              padding: 1,
                            }}
                          >
                            <Typography
                              style={{ fontFamily: "candara", fontSize: 16 }}
                            >
                              Peso na Dieta (%)
                            </Typography>
                          </Box>
                        </Box>
                      </StyledTableHead>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHead
                        rowSpan={2}
                        colSpan={2}
                        sx={{
                          justifyContent: "space-between",
                          verticalAlign: "top",
                        }}
                      >
                        <strong>3. Diferença (2-1) </strong>
                        <Box
                          sx={{
                            justifyContent: "end",
                            display: "flex",
                            padding: 2,
                          }}
                        >
                          <Typography
                            style={{ fontFamily: "candara", fontSize: 16 }}
                          >
                            Total de MS
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            justifyContent: "end",
                            display: "flex",
                            padding: 2,
                          }}
                        >
                          <Typography
                            style={{ fontFamily: "candara", fontSize: 16 }}
                          >
                            Peso na Dieta (%)
                          </Typography>
                        </Box>
                      </StyledTableHead>

                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                      <StyledTableCell>{} </StyledTableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </table>
          </TableContainer>
          </ThemeProvider>
        )}
        <Box height={150}></Box>
      </main>
    </div>
  );
}
