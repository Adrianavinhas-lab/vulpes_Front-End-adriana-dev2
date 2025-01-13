import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { Button } from "@material-ui/core";
import dayjs, { Dayjs } from "dayjs";

import { get, post } from "../../Services/tokenConfig";
import LoadingVulpes from "../../Styles/Loader/loading";
import { AuthContext } from "../../AuthContext/AuthContext";
import { func_print } from "../../Func_genericas/func_print";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    header: {
      textAlign: "center",
      background: "#FAFAFA",
      color: "black",
    },
  })
);

interface IHistorico {
  id_caderno: number;
  ano: number;
  link: string;
  publico: false;
  id_rosto: number;
  create_date: string;
  last_update: string;
  uuid: string;
}

export default function Historico(params: any) {
  const classes = useStyles();
  const navigate = useNavigate();

  const auth = React.useContext(AuthContext);

  const [view] = React.useState(1000);
  const [isloading, setIsLoading] = useState(true);

  const [openlink, setOpenLink] = useState(false);
  const [openlinkDesativar, setOpenLinkDesativar] = useState(false);
  const [geralink, setGeraLink] = useState(false);

  const [date] = useState<Dayjs | null>(dayjs);

  const [listHistorico, setListHistorico] = useState<IHistorico[]>([]);

  const [id, setId] = useState<any>(0);
  const [ano, setAno] = useState<any>(0);
  const [link, setLink] = useState("");

  const getHistoric = async () => {
    try {
      let res = await get(`/get_historico_idAgri/${params.idagri}`);

      if (res.status === 200) {
        setListHistorico(res.data.result);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      func_print("getHistoric", error, true);
    }
  };

  /** Função do botão VER que navega para a página dos cadernos */
  const cadernoAtivo = () => {
    navigate(`/IdentificacaoBen`, {
      state: {
        id_rosto: params.idrosto,
        idbenef: params.idagri,
      },
    });
  };

  // Ativar e desativar link para utilizador
  const handleopenLink = (
    id: number,
    id_rosto: number,
    ano: number,
    link: string
  ) => {
    setId(id);
    setAno(ano);
    setLink(link);
    setOpenLink(true);
  };
  const handleCloseLink = () => {
    setOpenLink(false);
    setGeraLink(false);
  };
  const handleopenLinkDesativar = (
    id: number,
    id_rosto: number,
    ano: number,
    link: string
  ) => {
    setId(id);

    setAno(ano);
    setLink(link);
    setOpenLinkDesativar(true);
  };
  const handleCloseLinkDesativar = () => {
    setOpenLinkDesativar(false);
    setGeraLink(false);
  };
  const handleGerarLink = () => {
    setGeraLink(true);
    post(`/update_historico`, {
      parameter: {
        id_caderno: id,
        ano: ano,
        link: link,
        publico: true,
        id_rosto: params.idrosto,
        last_update: date,
        create_date: date?.format("YYYY"),
        uuid: "",
      },
    });
  };
  const handleDesativarLink = () => {
    setGeraLink(false);
    post(`/update_historico`, {
      parameter: {
        id_caderno: id,
        ano: ano,
        link: link,
        publico: false,
        id_rosto: params.id_rosto,
        last_update: date,
        create_date: date?.format("YYYY"),
        uuid: "",
      },
    });
    setOpenLinkDesativar(false);
  };
  const showpdf = async (id: number) => {
    const { data } = await get(`/download_pdf_caderno/${id}`);

    if (data) {
      console.log(data);
      console.log(id);
    }
  };

  useEffect(() => {
    (async () => {
      getHistoric();
    })();
  }, []);

  return (
    <TableBody>
      {isloading ? (
        <TableRow>
          <TableCell
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoadingVulpes />
          </TableCell>
        </TableRow>
      ) : (
        <>
          <TableRow>
            <TableCell>
              <Typography
                fontWeight={600}
                fontSize={18}
                align="center"
                sx={{ fontFamily: "candara" }}
              >
                Ano
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                fontWeight={600}
                fontSize={18}
                align="center"
                sx={{ fontFamily: "candara" }}
              >
                Ações
              </Typography>
            </TableCell>
          </TableRow>

          {listHistorico.length > 0 ? (
            listHistorico.map((lista, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>
                    <Typography
                      fontWeight={600}
                      fontSize={16}
                      sx={{ marginLeft: "20px" }}
                    >
                      {lista.ano}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <IconButton aria-label="View" onClick={cadernoAtivo}>
                      <VisibilityIcon sx={{ height: 27, width: 27 }} />
                    </IconButton>
                    <IconButton
                      aria-label="Partilhar"
                      onClick={() => showpdf(lista.id_caderno)}
                    >
                      <FileDownloadIcon sx={{ height: 27, width: 27 }} />
                    </IconButton>
                    {lista.publico === false ? (
                      <IconButton
                        aria-label="Partilhar"
                        onClick={() =>
                          handleopenLink(
                            lista.id_caderno,
                            lista.id_rosto,
                            lista.ano,
                            lista.link
                          )
                        }
                      >
                        <ShareIcon
                          sx={{ height: 27, width: 27, color: "red" }}
                        />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="Partilhar"
                        onClick={() =>
                          handleopenLinkDesativar(
                            lista.id_caderno,
                            lista.id_rosto,
                            lista.ano,
                            lista.link
                          )
                        }
                      >
                        <ShareIcon
                          sx={{ height: 27, width: 27, color: "green" }}
                        />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  fontWeight={400}
                  fontSize={20}
                  align="center"
                  color= "#C94F1E"
                >
                  Histórico Vazio
                </Typography>
              </TableCell>
            </TableRow>
          )}

          <Dialog
            open={openlink}
            onClose={handleCloseLink}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle>Link de partilha</DialogTitle>
            <DialogContent>
              {geralink && (
                <Box display="flex" textAlign="center" justifyContent="center">
                  <Typography
                    fontWeight={600}
                    fontSize={16}
                    sx={{ color: "blue" }}
                  >
                    {link}
                  </Typography>
                </Box>
              )}
            </DialogContent>

            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGerarLink}
              >
                Tornar Link publico
              </Button>
              <Button
                color="inherit"
                variant="contained"
                onClick={handleCloseLink}
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openlinkDesativar}
            onClose={handleCloseLinkDesativar}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle>Link de partilha</DialogTitle>
            <DialogContent>
              <Box display="flex" textAlign="center" justifyContent="center">
                <Typography
                  fontWeight={600}
                  fontSize={16}
                  sx={{ color: "blue" }}
                >
                  {link}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDesativarLink}
              >
                Desativar Link
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </TableBody>
  );
}
