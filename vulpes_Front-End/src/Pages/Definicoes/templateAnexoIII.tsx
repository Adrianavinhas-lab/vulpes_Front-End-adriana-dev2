import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import uuid from "react-uuid";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Typography, IconButton, Box, TextField } from "@mui/material";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { DialogContent, DialogContentText } from "@mui/material";
import { Alert, AlertTitle, Paper, Stack } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Save } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { BarraDeFerramentas } from "../../Components/barra-de-ferramentas/BarraDeFerramentas";
import BasicPopover from "../../Components/Popover";
import { del, get, post } from "../../Services/tokenConfig";
import { ITemplate_definicoes } from "../../Interfaces/templates/template1";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3),
    },
    header: {
      textAlign: "center",
      background: "#f2d1c2",
      color: "black",
      fontWeight: 800,
    },
  })
);


type LocationStateAIII = {
  flag2: Boolean;
};

type LocationStateIdAIII = {
  id: string;
};

export const TemplateAnexoIII = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [id, setId] = useState<any>(0);
  const [id_org] = useState<number>(0);

  const [date] = React.useState<Dayjs | null>(dayjs);

  const [templateList, setTemplateList] = useState<ITemplate_definicoes[]>([]);

  /*********************** GET TEMPLATE AnexoIII *********************************************************** */
  const getAllTemplates = async () => {
    try {
      var idorg = localStorage.getItem("id_org");
      const urlrelativa = `/get_template_org/${idorg}`;

      const { data } = await get(urlrelativa);

      if (data.length !== 0) {
        setTemplateList(data.result);
      }

      return new Error("Erro ao listar");
    } catch (error) {
      console.error(error);
      return new Error(
        (error as { message: string }).message || "Erro ao listar"
      );
    }
  };

  useEffect(() => {
    getAllTemplates();
  }, []);

  /*********************** CREATE TEMPLATE ANEXO III*********************************************************** */

  const [openTemplateAnexoIII, setOpenTemplateAnexoIII] = useState(false);
  const handleOpenTemplateAnexoIII = () => {
    setId("");
    setNome("");
    setDescricao("");
    setOpenTemplateAnexoIII(true);
  };
  const handleCloseTemplateAnexoIII = () => {
    setId("");
    setNome("");
    setDescricao("");
    setOpenTemplateAnexoIII(false);
  };
  const create = async (
    nome: string,
    descricao: string
  ): Promise<ITemplate_definicoes | Error> => {
    try {
      var idorg = localStorage.getItem("id_org");
      const { data } = await post("/new_template", {
        parameter: {
          id_template: 0,
          nome: nome,
          descricao: descricao,
          id_org: idorg,
          last_update: date,
          create_date: date,
          uuid: uuid().slice(0, 8),
        },
      });

      if (data) {
        setMessage(data.message);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
        getAllTemplates();
      } else {
        setShowError(true);
        setMessageError(data.message);
        setTimeout(() => {
          setShowError(false);
        }, 2000);
      }
      return new Error("Erro ao criar o Registo");
    } catch (error) {
      console.error(error);
      return new Error(
        (error as { message: string }).message || "Erro ao ao criar o Registo"
      );
    }
  };

  function handleAddtemplateObject(nome: string, descricao: string) {
    templateList.push({
      id_template: id,
      nome: nome,
      descricao: descricao,
      id_org: id_org,
      anexoII: [],
      anexoIII: [],
      last_update: "",
      create_date: "",
      uuid: "",
    });
    create(nome, descricao);
    getAllTemplates();
    setDescricao("");
    setNome("");
    setOpenTemplateAnexoIII(false);
  }

  /*********************** EDIT TEMPLATE ANEXO III *********************************************************** */
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const handleOpenTemplate2 = (id: string, nome: string, descricao: string) => {
    setId(id);
    setNome(nome);
    setDescricao(descricao);
    setOpenUpdateDialog(true);
  };
  const handleCloseUpdateDialog = () => {
    setId("");
    setNome("");
    setDescricao("");
    setOpenUpdateDialog(false);
  };

  const updateById = async (Id: number): Promise<void | Error> => {
    try {
      var idorg = localStorage.getItem("id_org");
      await post(`/update_template`, {
        parameter: {
          id_template: Id,
          nome: nome,
          descricao: descricao,
          id_org: idorg,
          last_update: date,
          create_date: date,
          uuid: uuid().slice(0, 8),
        },
      }).then((resp) => {
        if (resp) {
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
          }, 2000);
        } else {
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 2000);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (id: number) => {
    // 👇️ passing function to setData method
    setTemplateList((prevState) => {
      const newState = prevState.map((obj) => {
        // 👇️ if id equals 2, update country property
        if (obj.id_template === id) {
          return { ...obj, nome: nome, decricao: descricao };
        }
        // 👇️ otherwise return object as is
        return obj;
      });
      return newState;
    });
    updateById(id);
    setOpenUpdateDialog(false);
  };

  /*********************** DELETE TEMPLATE ANEXO III *********************************************************** */
  const [openPopupdelete, setOpenPopupDelete] = useState(false);

  function handleopenPopupDelete(id: string, nome: string, descricao: string) {
    setId(id);
    setNome(nome);
    setDescricao(descricao);
    setOpenPopupDelete(true);
  }
  function handleclosePopupDelete() {
    setId("");
    setNome("");
    setDescricao("");
    setOpenPopupDelete(false);
  }

  const deleteById = async (Id: string): Promise<void | Error> => {
    try {
      await del(`/delete_template/${Id}`);
    } catch (error) {
      console.error(error);
      return new Error(
        (error as { message: string }).message ||
          "Erro ao ao eliminar o Registo"
      );
    }
  };

  function handleremove(id: string, nome: string, descricao: string) {
    setTemplateList((current) =>
      current.filter((template) => {
        return template.nome !== nome && template.descricao !== descricao;
      })
    );

    deleteById(id);

    setId("");
    setNome("");
    setDescricao("");
    setOpenPopupDelete(false);
  }

  /*********************** CREATE ANEXOS III *********************************************************** */

  // const [idfromAnexoII] = useState(checkIdAII);
  const [idfromAnexoIII] = useState(checkIdAIII);
  //----- Alterar a cor dos botões anexos
  // const [flag1] = useState(checkFlag1());
  const [flag2] = useState(checkFlag2());

  // function checkFlag1() {
  //   const { flag1 } = (location.state as LocationStateAII) || false;
  //   return flag1;
  // }
  // function checkIdAII() {
  //   const { id } = (location.state as LocationStateIdAII) || "";
  //   return id;
  // }
  function checkIdAIII() {
    const { id } = (location.state as LocationStateIdAIII) || "";
    return id;
  }
  function checkFlag2() {
    const { flag2 } = (location.state as LocationStateAIII) || false;
    return flag2;
  }

  function anexoIII(id_template: string, nome: string, descricao: string) {
    setNome(nome);
    setDescricao(descricao);
    navigate("/anexoIIITemplate_definicoes", {
      state: {
        idfromdefinicoes: id_template,
      },
    });
  }

  return (
    <div>
      <Paper className={classes.pageContent}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: 22, fontWeight: 700, fontFamily: "candara" }}
          >
            Templates Anexo III
          </Typography>
          <BasicPopover text="Aqui poderá criar, apagar e atualizar templates do Anexo III" />
          {showSuccess && (
            <Stack sx={{ width: "100%" }}>
              <Alert severity="success">
                <AlertTitle>
                  <strong>Sucesso</strong>
                </AlertTitle>
                {message}
              </Alert>
            </Stack>
          )}
          {showError && (
            <Stack sx={{ width: "100%" }}>
              <Alert severity="error">
                <AlertTitle>
                  <strong>Erro</strong>
                </AlertTitle>
                {messageError}
              </Alert>
            </Stack>
          )}
          <Box marginLeft="auto">
            <BarraDeFerramentas
              mostrarBotaoNovo
              textoBotaoNovo="Adicionar Template"
              aoClicarNovo={handleOpenTemplateAnexoIII}
            />
          </Box>
        </div>

        <Dialog
          open={openTemplateAnexoIII}
          onClose={handleCloseTemplateAnexoIII}
          fullWidth
          maxWidth="md"
        >
          <Stack direction="row">
            <DialogTitle sx={{ fontFamily: "candara" }}>
              Dê um nome e uma descrição ao Template
            </DialogTitle>
            <DialogContent sx={{ display: "flex", justifyContent: "end" }}>
              <BarraDeFerramentas
                mostrarBotaoCancelar
                aoClicarCancelar={handleCloseTemplateAnexoIII}
              />
            </DialogContent>
          </Stack>
          <DialogActions>
            <Box width="100%" margin={4}>
              <Table>
                <TableBody sx={{ margin: "auto" }}>
                  <TableRow>
                    
                    <TextField
                      fullWidth
                      id="nome"
                      label={
                        <Typography fontFamily="candara">Nome </Typography>
                      }
                      placeholder="Nome "
                      margin="normal"
                      style={{ width: "100%", paddingRight: "15px" }}
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </TableRow>
                  <TableRow>
                    <TextField
                      multiline
                      fullWidth
                      id="descricao"
                      label={
                        <Typography fontFamily="candara">Descrição </Typography>
                      }
                      placeholder="Descrição "
                      margin="normal"
                      style={{ width: "100%", paddingRight: "15px" }}
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </TableRow>
                </TableBody>

                <Stack spacing={2} direction="row" justifyContent="end">
                  {nome !== "" && descricao !== "" && (
                    <BarraDeFerramentas
                      mostrarBotaoGravar
                      aoClicarGravar={() =>
                        handleAddtemplateObject(nome, descricao)
                      }
                    />
                  )}
                </Stack>
              </Table>
            </Box>
          </DialogActions>
        </Dialog>

        {/* Update template */}
        <Dialog
          open={openUpdateDialog}
          onClose={handleCloseUpdateDialog}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Atualização do Template</DialogTitle>
          <DialogActions>
            <Box width="100%" margin={4}>
              <Table>
                <TableBody sx={{ margin: "auto" }}>
                  <TableRow>
                    <TextField
                      fullWidth
                      id="nome"
                      label="Nome "
                      placeholder="Nome "
                      required
                      margin="normal"
                      style={{ width: "100%", paddingRight: "15px" }}
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </TableRow>
                  <TableRow>
                    <TextField
                      multiline
                      fullWidth
                      id="descricao"
                      label="Descrição "
                      placeholder="Descrição "
                      required
                      margin="normal"
                      style={{ width: "100%", paddingRight: "15px" }}
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </TableRow>
                </TableBody>

                <Stack spacing={2} direction="row" justifyContent="end">
                  {nome !== "" && descricao !== "" && (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleUpdate(id)}
                      >
                        <Save />
                        Gravar
                      </Button>
                    </>
                  )}

                  <Button
                    variant="contained"
                    color="inherit"
                    size="small"
                    onClick={handleCloseUpdateDialog}
                  >
                    <CancelIcon />
                    Cancelar
                  </Button>
                </Stack>
              </Table>
            </Box>
          </DialogActions>
        </Dialog>
        <TableContainer
          sx={{
            height: "auto",
            width: "100%",
            display: "flex",
            margin: 4,
            padding: 4,
          }}
        >
          <Table>
            <TableHead className={classes.header}>
              <TableRow>
                <TableCell
                  sx={{ fontSize: 16, fontWeight: 700, fontFamily: "candara" }}
                >
                  Nome do Template
                </TableCell>
                <TableCell
                  sx={{ fontSize: 16, fontWeight: 700, fontFamily: "candara" }}
                >
                  Descrição
                </TableCell>
                <TableCell
                  sx={{ fontSize: 16, fontWeight: 700, fontFamily: "candara" }}
                >
                  Ações
                </TableCell>
                <TableCell
                  sx={{ fontSize: 16, fontWeight: 700, fontFamily: "candara" }}
                >
                  Anexos
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {templateList &&
                templateList.map((item: any) => (
                  <TableRow key={item.id_template}>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{item.descricao}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() =>
                          handleopenPopupDelete(
                            item.id_template,
                            item.nome,
                            item.descricao
                          )
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                      <Dialog
                        open={openPopupdelete}
                        onClose={handleclosePopupDelete}
                      >
                        <DialogContent>
                          <DialogContentText>
                            Tem certeza que deseja apagar este template?
                          </DialogContentText>
                          <DialogActions>
                            <Button
                              color="error"
                              onClick={() => handleremove(id, nome, descricao)}
                            >
                              Sim
                            </Button>
                            <Button onClick={handleclosePopupDelete}>
                              Cancelar
                            </Button>
                          </DialogActions>
                        </DialogContent>
                      </Dialog>

                      <IconButton
                        color="info"
                        size="small"
                        onClick={(e) =>
                          handleOpenTemplate2(
                            item.id_template,
                            item.nome,
                            item.descricao
                          )
                        }
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Button
                        sx={{
                          background:
                            item.anexoIII !== 0 ||
                            (flag2 === true &&
                              idfromAnexoIII === item.id_template)
                              ? "#1F67D3"
                              : "#DADBD7",
                        }} //flag2 == true ? "#1F67D3" : "#DADBD7", color: flag2 == true ? "#F8F5F5" : "#050505" }}
                        variant="contained"
                        // color="inherit"
                        size="small"
                        onClick={() =>
                          anexoIII(item.id_template, nome, descricao)
                        }
                      >
                        ANEXO III
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};
