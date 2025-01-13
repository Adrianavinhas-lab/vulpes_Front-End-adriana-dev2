import React from "react";
import { ChangeEvent, useState } from "react";
import { Alert, Box, Button, Paper, Snackbar, useTheme } from "@mui/material";


import { post } from "../../Services/tokenConfig";
import { BarraDeFerramentas } from "../barra-de-ferramentas/BarraDeFerramentas";
import { func_print } from "../../Func_genericas/func_print";
import LoadingVulpesSmall from "../../Styles/Loader/loadingSmall";

export interface IUploadFileprops {
  onCloseDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadFile: React.FC<IUploadFileprops> =
  ({ onCloseDialog }) => {
    const [file, setFile] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);

    /****** ALERTA **********************************/
    const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
    const [openSnackError, setOpenSnackError] = React.useState(false);
    const [message, setMessage] = useState("");

    const handleCloseSnack = () => {
      setOpenSnackSuccess(false);
      setOpenSnackError(false);
    };

    const onChange = (file: ChangeEvent) => {
      const { files } = file.target as HTMLInputElement;
      if (files && files.length !== 0) {
        setFile(files[0]);
      } else {
        setOpenSnackError(true);
      }
    };

    const handleUpload = async () => {
      try {
        setIsLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        if (file !== undefined) {
          const response = await post("/uploadfile", formData);

          if (response.status === 200) {
            setMessage("Ficheiro carregado com sucesso!")
            setOpenSnackSuccess(true);
            onCloseDialog(false);
          } else {
            setOpenSnackError(true);
          }

        } else {
          setMessage("Erro ao carregar o ficheiro.")
          setOpenSnackError(true);

        }
        setIsLoading(false);



      } catch (error) {
        func_print("handleUpload", error, true);
        setMessage("Erro ao carregar o ficheiro.")
        setOpenSnackError(true);
        setIsLoading(false);
      }
    };

    return (
      <div>
        <Box
          sx={{ "& button": { m: 1 } }}
          padding={2}
          width="100%"
          display="flex"
          alignItems="center"
          component={Paper}
          justifyContent="center"
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
              {message}
            </Alert>
          </Snackbar>
          {isLoading ? (
            <LoadingVulpesSmall />
          ) : (
            <Box padding={3}>
              <form onSubmit={(e) => e.preventDefault()}>
                <Button
                  variant="contained"
                  component="label"
                  size="small"
                  sx={{
                    marginBottom: 5,
                    fontFamily: "candara",
                    backgroundColor: "#ccafa3",
                    "&:hover": {
                      backgroundColor: "#f2d1c2",
                      color: "#000000",
                    },
                  }}
                >
                  <input
                    style={{ color: "#7e2706", fontFamily: "candara" }}
                    accept=".pdf"
                    type="file"
                    onChange={onChange}
                  />
                </Button>

              </form>
              <Box sx={{ alignItems: 'center', justifyContent: 'end', display: 'flex' }}>
                <BarraDeFerramentas
                  mostrarBotaoGravar
                  aoClicarGravar={handleUpload}
                />
              </Box>

            </Box>
          )}
        </Box>
      </div>
    );
  };
export default UploadFile;
