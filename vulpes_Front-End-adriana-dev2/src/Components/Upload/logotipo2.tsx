import React from "react";
import { ChangeEvent, useState } from "react";
import { Box, Button, Snackbar, Stack, useTheme } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { post } from "../../Services/tokenConfig";
import { BarraDeFerramentas } from "../barra-de-ferramentas/BarraDeFerramentas";
import { func_print } from "../../Func_genericas/func_print";
import { IOrg } from "../../Interfaces/organizacao/organizacao";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {


  setOpen: React.Dispatch<boolean>
  setOrgdata: React.Dispatch<IOrg | undefined>
  orgData: IOrg | undefined

}

const Logotipo2 = ({ setOpen, setOrgdata, orgData }: Props) => {
  const theme = useTheme();
  const [image, setImage] = useState<any>();

  /****** fecha o alerta **********************************/
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);

  const handleCloseSnack = () => {
    setOpenSnackError(false)
    setOpenSnackSuccess(false);
  };

  const onChange = async (file: ChangeEvent) => {
    file.preventDefault();

    try {
      const { files } = file.target as HTMLInputElement;

      if (files && files.length !== 0) {
        setImage(files[0]);
      }
    } catch (err) {
      setOpenSnackError(true)
      func_print('onChange', err, true)
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", image);

      let response: any = await post("/logotipo2", formData)

      if (response.status === 200) {

        setOpenSnackSuccess(true);
        let aux_orgData = orgData
        if (aux_orgData !== undefined) {
          aux_orgData.logo2 = response.data[0]
        }
        setOrgdata(aux_orgData);
        setOpen(false)
      } else {
        setOpenSnackError(true);
      }
    } catch (error) {
      setOpenSnackError(true)
      func_print('handleUpload', error, true)
    }
  };

  return (
    <div>
      <Box
        height={theme.spacing(6)}
        sx={{ "& button": { m: 1 } }}
        padding={2}
        width="100%"
        display="flex"
        alignItems="center"
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
            Logotipo importado com sucesso!
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
            Erro ao importar!
          </Alert>
        </Snackbar>
        <Box display="flex" height="auto" marginBottom={10} marginTop={5}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack direction="row">
              <Button
                variant="contained"
                component="label"
                size="small"
                sx={{
                  fontFamily: "candara",
                  backgroundColor: "#ccafa3",
                  "&:hover": {
                    backgroundColor: "#f2d1c2",
                    color: "#000000",
                  },
                }}
              >
                <input
                  accept=".jpg, .jpeg, .png"
                  type="file"
                  onChange={onChange}
                />
              </Button>{" "}
              <BarraDeFerramentas
                mostrarBotaoGravar
                aoClicarGravar={handleUpload}
              />
            </Stack>
          </form>
        </Box>
      </Box>
    </div>
  );
};
export default Logotipo2;
