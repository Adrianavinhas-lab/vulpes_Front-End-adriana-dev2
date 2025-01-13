import React, { ChangeEvent, useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Snackbar } from "@mui/material";
import { Paper } from "@mui/material";
import { Box } from "@mui/material";
import { TableContainer } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material";

import CadernoLayout from "../../../Styles/layout/cadernoLayout";
import { del } from "../../../Services/tokenConfig";
import ConfirmDialog from "../../../Components/CustomDialog/customdialog";
import Beneficiario_nome_id_alinhado_direita from "../../../Componentes_modulo/Beneficiario_nome_id_alinhado_direita";
import LoadingVulpes from "../../../Styles/Loader/loading";
import { EfetivoPecuarioEFGH3, IEfetivoPecuarioGH3 } from "./efetivopecuarioGH3";
import { INecessidadesNutriGH3, NecessidadesNutriEFGH3 } from "./necessidadesNutricionaisGH3";
import { INecessidadesNutriTotalGH3, NNutricionaisTotaisEFGH3 } from "./necessidadesTotaisGH3";
import { AlimentoCompostoEFGH3, IAlimentoCompostoGH3 } from "./aliementoCompostoGH3";


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


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function EF_PA_GH3() {
  const classes = useStyles();

  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const idrosto = parseInt(localStorage.getItem("idrosto") || "0", 10);
  const [id, setId] = useState(0);

  /************** TABELA EFETIVO PECUARIO ******************/

  const [efetivo, setEfetivo] = useState<IEfetivoPecuarioGH3>({
    id_efetivo_pecuarioGH3: 0,

    b_macho_menos_6meses_cn: "",
    b_femea_menos_6meses_cn: "",
    b_macho_6meses_a_1ano_cn: "",
    b_femea_6meses_a_1ano_cn: "",
    b_macho_mais1ano_menos2_cn: "",
    b_femea_mais1ano_menos2_cn: "",
    b_macho_mais_2anos_cn: "",
    b_femea_mais_2anos_cn: "",

    b_macho_menos_6meses_dieta: "",
    b_femea_menos_6meses_dieta: "",
    b_macho_6meses_a_1ano_dieta: "",
    b_femea_6meses_a_1ano_dieta: "",
    b_macho_mais1ano_menos2_dieta: "",
    b_femea_mais1ano_menos2_dieta: "",
    b_macho_mais_2anos_dieta: "",
    b_femea_mais_2anos_dieta: "",

    total_cn: "",

    id_rosto: 0,
    last_update: "",
    create_date: "",
    uuid: "",
  });

  const handleInputChangeEfetivo = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEfetivo((prevOrganica) => ({
      ...prevOrganica,
      [name]: value,
    }));
  };

  /************** TABELA NECESSIDADES NUTRICIONAIS ******************/

  const [necessidades, setNecessidades] = useState<INecessidadesNutriGH3>({
    id_nessec_nutrGH3: 0,

    b_macho_menos_6meses_materia: "",
    b_femea_menos_6meses_materia: "",
    b_macho_6meses_a_1ano_materia: "",
    b_femea_6meses_a_1ano_materia: "",
    b_macho_mais1ano_menos2_materia: "",
    b_femea_mais1ano_menos2_materia: "",
    b_macho_mais_2anos_materia: "",
    b_femea_mais_2anos_materia: "",

    b_macho_menos_6meses_energia: "",
    b_femea_menos_6meses_energia: "",
    b_macho_6meses_a_1ano_energia: "",
    b_femea_6meses_a_1ano_energia: "",
    b_macho_mais1ano_menos2_energia: "",
    b_femea_mais1ano_menos2_energia: "",
    b_macho_mais_2anos_energia: "",
    b_femea_mais_2anos_energia: "",

    b_macho_menos_6meses_proteina: "",
    b_femea_menos_6meses_proteina: "",
    b_macho_6meses_a_1ano_proteina: "",
    b_femea_6meses_a_1ano_proteina: "",
    b_macho_mais1ano_menos2_proteina: "",
    b_femea_mais1ano_menos2_proteina: "",
    b_macho_mais_2anos_proteina: "",
    b_femea_mais_2anos_proteina: "",

    b_macho_menos_6meses_bf: "",
    b_femea_menos_6meses_bf: "",
    b_macho_6meses_a_1ano_bf: "",
    b_femea_6meses_a_1ano_bf: "",
    b_macho_mais1ano_menos2_bf: "",
    b_femea_mais1ano_menos2_bf: "",
    b_macho_mais_2anos_bf: "",
    b_femea_mais_2anos_bf: "",

    b_macho_menos_6meses_leite: "",
    b_femea_menos_6meses_leite: "",
    b_macho_6meses_a_1ano_leite: "",
    b_femea_6meses_a_1ano_leite: "",

    b_macho_menos_6meses_pastagem: "",
    b_femea_menos_6meses_pastagem: "",
    b_macho_6meses_a_1ano_pastagem: "",
    b_femea_6meses_a_1ano_pastagem: "",
    b_macho_mais1ano_menos2_pastagem: "",
    b_femea_mais1ano_menos2_pastagem: "",
    b_macho_mais_2anos_pastagem: "",
    b_femea_mais_2anos_pastagem: "",

    b_macho_menos_6meses_silagem: "",
    b_femea_menos_6meses_silagem: "",
    b_macho_6meses_a_1ano_silagem: "",
    b_femea_6meses_a_1ano_silagem: "",
    b_macho_mais1ano_menos2_silagem: "",
    b_femea_mais1ano_menos2_silagem: "",
    b_macho_mais_2anos_silagem: "",
    b_femea_mais_2anos_silagem: "",

    b_macho_menos_6meses_o_forragens: "",
    b_femea_menos_6meses_o_forragens: "",
    b_macho_6meses_a_1ano_o_forragens: "",
    b_femea_6meses_a_1ano_o_forragens: "",
    b_macho_mais1ano_menos2_o_forragens: "",
    b_femea_mais1ano_menos2_o_forragens: "",
    b_macho_mais_2anos_o_forragens: "",
    b_femea_mais_2anos_o_forragens: "",

    b_macho_menos_6meses_alimento: "",
    b_femea_menos_6meses_alimento: "",
    b_macho_6meses_a_1ano_alimento: "",
    b_femea_6meses_a_1ano_alimento: "",
    b_macho_mais1ano_menos2_alimento: "",
    b_femea_mais1ano_menos2_alimento: "",
    b_macho_mais_2anos_alimento: "",
    b_femea_mais_2anos_alimento: "",

    id_rosto: 0,
    last_update: "",
    create_date: "",
    uuid: "",
  });

  const handleInputChangeNNutricionais = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setNecessidades((prevOrganica) => ({
      ...prevOrganica,
      [name]: value,
    }));
  };

  /************** TABELA NECESSIDADES TOTAIS ******************/

  const [totais, setTotais] = useState<INecessidadesNutriTotalGH3>({
    id_nutri_totaisGH3: 0,

    b_macho_menos_6meses_materia: "",
    b_femea_menos_6meses_materia: "",
    b_macho_6meses_a_1ano_materia: "",
    b_femea_6meses_a_1ano_materia: "",
    b_macho_mais1ano_menos2_materia: "",
    b_femea_mais1ano_menos2_materia: "",
    b_macho_mais_2anos_materia: "",
    b_femea_mais_2anos_materia: "",

    b_macho_menos_6meses_energia: "",
    b_femea_menos_6meses_energia: "",
    b_macho_6meses_a_1ano_energia: "",
    b_femea_6meses_a_1ano_energia: "",
    b_macho_mais1ano_menos2_energia: "",
    b_femea_mais1ano_menos2_energia: "",
    b_macho_mais_2anos_energia: "",
    b_femea_mais_2anos_energia: "",

    b_macho_menos_6meses_proteina: "",
    b_femea_menos_6meses_proteina: "",
    b_macho_6meses_a_1ano_proteina: "",
    b_femea_6meses_a_1ano_proteina: "",
    b_macho_mais1ano_menos2_proteina: "",
    b_femea_mais1ano_menos2_proteina: "",
    b_macho_mais_2anos_proteina: "",
    b_femea_mais_2anos_proteina: "",

    b_macho_menos_6meses_bf: "",
    b_femea_menos_6meses_bf: "",
    b_macho_6meses_a_1ano_bf: "",
    b_femea_6meses_a_1ano_bf: "",
    b_macho_mais1ano_menos2_bf: "",
    b_femea_mais1ano_menos2_bf: "",
    b_macho_mais_2anos_bf: "",
    b_femea_mais_2anos_bf: "",

    b_macho_menos_6meses_leite: "",
    b_femea_menos_6meses_leite: "",
    b_macho_6meses_a_1ano_leite: "",
    b_femea_6meses_a_1ano_leite: "",

    b_macho_menos_6meses_pastagem: "",
    b_femea_menos_6meses_pastagem: "",
    b_macho_6meses_a_1ano_pastagem: "",
    b_femea_6meses_a_1ano_pastagem: "",
    b_macho_mais1ano_menos2_pastagem: "",
    b_femea_mais1ano_menos2_pastagem: "",
    b_macho_mais_2anos_pastagem: "",
    b_femea_mais_2anos_pastagem: "",

    b_macho_menos_6meses_silagem: "",
    b_femea_menos_6meses_silagem: "",
    b_macho_6meses_a_1ano_silagem: "",
    b_femea_6meses_a_1ano_silagem: "",
    b_macho_mais1ano_menos2_silagem: "",
    b_femea_mais1ano_menos2_silagem: "",
    b_macho_mais_2anos_silagem: "",
    b_femea_mais_2anos_silagem: "",

    b_macho_menos_6meses_o_forragens: "",
    b_femea_menos_6meses_o_forragens: "",
    b_macho_6meses_a_1ano_o_forragens: "",
    b_femea_6meses_a_1ano_o_forragens: "",
    b_macho_mais1ano_menos2_o_forragens: "",
    b_femea_mais1ano_menos2_o_forragens: "",
    b_macho_mais_2anos_o_forragens: "",
    b_femea_mais_2anos_o_forragens: "",

    b_macho_menos_6meses_alimento: "",
    b_femea_menos_6meses_alimento: "",
    b_macho_6meses_a_1ano_alimento: "",
    b_femea_6meses_a_1ano_alimento: "",
    b_macho_mais1ano_menos2_alimento: "",
    b_femea_mais1ano_menos2_alimento: "",
    b_macho_mais_2anos_alimento: "",
    b_femea_mais_2anos_alimento: "",

    id_rosto: 0,
    last_update: "",
    create_date: "",
    uuid: "",
  });

  const handleInputChangeNutriTotais = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setTotais((prevOrganica) => ({
      ...prevOrganica,
      [name]: value,
    }));
  };

  /************** ALIMENTOcOMPOSTO ****************************/
  const [alimento, setAlimento] = useState<IAlimentoCompostoGH3>({
    id_alim_compostoGH3: 0,

    b_macho_menos_6meses_prot_bruta: "",
    b_femea_menos_6meses_prot_bruta: "",
    b_macho_6meses_a_1ano_prot_bruta: "",
    b_femea_6meses_a_1ano_prot_bruta: "",
    b_macho_mais1ano_menos2_prot_bruta: "",
    b_femea_mais1ano_menos2_prot_bruta: "",
    b_macho_mais_2anos_prot_bruta: "",
    b_femea_mais_2anos_prot_bruta: "",

    b_macho_menos_6meses_gordura: "",
    b_femea_menos_6meses_gordura: "",
    b_macho_6meses_a_1ano_gordura: "",
    b_femea_6meses_a_1ano_gordura: "",
    b_macho_mais1ano_menos2_gordura: "",
    b_femea_mais1ano_menos2_gordura: "",
    b_macho_mais_2anos_gordura: "",
    b_femea_mais_2anos_gordura: "",

    b_macho_menos_6meses_organoleticos: "",
    b_femea_menos_6meses_organoleticos: "",
    b_macho_6meses_a_1ano_organoleticos: "",
    b_femea_6meses_a_1ano_organoleticos: "",
    b_macho_mais1ano_menos2_organoleticos: "",
    b_femea_mais1ano_menos2_organoleticos: "",
    b_macho_mais_2anos_organoleticos: "",
    b_femea_mais_2anos_organoleticos: "",

    b_macho_menos_6meses_nutri: "",
    b_femea_menos_6meses_nutri: "",
    b_macho_6meses_a_1ano_nutri: "",
    b_femea_6meses_a_1ano_nutri: "",
    b_macho_mais1ano_menos2_nutri: "",
    b_femea_mais1ano_menos2_nutri: "",
    b_macho_mais_2anos_nutri: "",
    b_femea_mais_2anos_nutri: "",

    b_macho_menos_6meses_ambientais: "",
    b_femea_menos_6meses_ambientais: "",
    b_macho_6meses_a_1ano_ambientais: "",
    b_femea_6meses_a_1ano_ambientais: "",
    b_macho_mais1ano_menos2_ambientais: "",
    b_femea_mais1ano_menos2_ambientais: "",
    b_macho_mais_2anos_ambientais: "",
    b_femea_mais_2anos_ambientais: "",

    b_macho_menos_6meses_melhor: "",
    b_femea_menos_6meses_melhor: "",
    b_macho_6meses_a_1ano_melhor: "",
    b_femea_6meses_a_1ano_melhor: "",
    b_macho_mais1ano_menos2_melhor: "",
    b_femea_mais1ano_menos2_melhor: "",
    b_macho_mais_2anos_melhor: "",
    b_femea_mais_2anos_melhor: "",

    b_macho_menos_6meses_estabiliz: "",
    b_femea_menos_6meses_estabiliz: "",
    b_macho_6meses_a_1ano_estabiliz: "",
    b_femea_6meses_a_1ano_estabiliz: "",
    b_macho_mais1ano_menos2_estabiliz: "",
    b_femea_mais1ano_menos2_estabiliz: "",
    b_macho_mais_2anos_estabiliz: "",
    b_femea_mais_2anos_estabiliz: "",

    b_macho_menos_6meses_o_zoot: "",
    b_femea_menos_6meses_o_zoot: "",
    b_macho_6meses_a_1ano_o_zoot: "",
    b_femea_6meses_a_1ano_o_zoot: "",
    b_macho_mais1ano_menos2_o_zoot: "",
    b_femea_mais1ano_menos2_o_zoot: "",
    b_macho_mais_2anos_o_zoot: "",
    b_femea_mais_2anos_o_zoot: "",

    total_bov_menos6_proteina: "",
    total_bov_mais6_proteina: "",
    total_gordura: "",

    id_rosto: 0,
    last_update: "",
    create_date: "",
    uuid: "",
  });

  const handleInputChangeAlimento = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAlimento((prevOrganica) => ({
      ...prevOrganica,
      [name]: value,
    }));
  };

  /*********** DELETE **************************/
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleClickOpenDelete = (id: number) => {
    setId(id);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const deleteById = async (id: number): Promise<void | Error> => {
    try {
      const response = await del(`/delete_reg_fitossanitaria/${id}`);
      if (response) {
        // setMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      return new Error(
        (error as { message: string }).message ||
          "Erro ao ao eliminar o Registo"
      );
    }
  };
  const handleDelete = () => {
    deleteById(id).then((result) => {
      if (result instanceof Error) {
        setOpenSnackError(true);
        setMessage("Erro ao eliminar o registo!");
      } else {
        // setRows((oldRows) => [
        //   ...oldRows.filter((oldRow) => oldRow.id_efetivo_pecuario !== id),
        // ]);
        setOpenDelete(false);
        setOpenSnackSuccess(true);
        setMessage("Registo eliminado com sucesso!");
      }
    });
  };

  /****** ALERTA **********************************/
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
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
      <CadernoLayout title="2.1 Plano Alimentar Grupo Homogéneo 1" />
      <main className={classes.contents}>
        <div className={classes.toolbars} />

        <Box width="80%" margin="auto">
          <Beneficiario_nome_id_alinhado_direita />
        </Box>

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

        {isLoading ? (
          <LoadingVulpes />
        ) : (
          <ThemeProvider theme={theme}>
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{
              height: "auto",
              width: "auto",
              padding: 2,
            }}
          >
            <EfetivoPecuarioEFGH3
              tabela={efetivo}
              onInputChange={handleInputChangeEfetivo}
            />

            <NecessidadesNutriEFGH3
              tabela={necessidades}
              onInputChange={handleInputChangeNNutricionais}
            />

            <NNutricionaisTotaisEFGH3
              tabela={totais}
              onInputChange={handleInputChangeNutriTotais}
            />

            <AlimentoCompostoEFGH3
              tabela={alimento}
              onInputChange={handleInputChangeAlimento}
            />

            <ConfirmDialog
              open={openDelete}
              onClose={handleCloseDelete}
              onConfirm={handleDelete}
              message="Deseja eliminar o registo?"
            />
          </TableContainer>
          </ThemeProvider>
        )}
        <Box height={150}></Box>
      </main>
    </div>
  );
}
