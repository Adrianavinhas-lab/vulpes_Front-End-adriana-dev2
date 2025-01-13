import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { Button, Collapse, ListItemButton } from "@mui/material";
import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import { DialogActions } from "@material-ui/core";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import ManageAccountsTwoToneIcon from "@mui/icons-material/ManageAccountsTwoTone";
import LibraryBooksTwoToneIcon from "@mui/icons-material/LibraryBooksTwoTone";
import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";
import PetsTwoToneIcon from "@mui/icons-material/PetsTwoTone";
import img from "../../Assets/Images/VULPES LOGO V1 SUPORTE 64.png";
import { OpcaoSair } from "./opcao_sair";
import { cores, versao } from "../../Func_genericas/valores_estaticos";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    active: {
      background: "#7E2706",
      color: "#ffffff",
      "& .MuiSvgIcon-root": {
        color: "#ffffff",
      },
    },

    footer: {
      width: "100%",
      height: "40px",
      position: "fixed",
      fontFamily: "candara",
      bottom: 20,
      left: 20,
    },
  })
);

// View do administrador 2GF
export function Admin2View() {
  const classes = useStyles();
  const location = useLocation();

  return (
    <>
      <List style={{
        fontFamily: "candara", fontSize: 16,
        flex: 1,

      }}>
        <ListItem
          button
          component={Link}
          to="/"
          className={location.pathname === "/" ? classes.active : ""}
        >
          <ListItemIcon>
            <HomeTwoToneIcon sx={{ color: "#c94f1e" }} />
          </ListItemIcon>
          <ListItemText disableTypography primary="Inicio" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/gestaotecnicos"
          className={
            location.pathname === "/gestaotecnicos" ? classes.active : ""
          }
        >
          <ListItemIcon>
            <ManageAccountsTwoToneIcon sx={{ color: "#c94f1e" }} />
          </ListItemIcon>
          <ListItemText disableTypography primary="Gestão de Utilizadores" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/gestaoBeneficiarios"
          className={
            location.pathname === "/gestaoBeneficiarios" ? classes.active : ""
          }
        >
          <ListItemIcon>
            <PeopleAltTwoToneIcon sx={{ color: "#c94f1e" }} />
          </ListItemIcon>
          <ListItemText disableTypography primary="Gestão de Beneficiarios" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/definicoes"
          className={location.pathname === "/definicoes" ? classes.active : ""}
        >
          <ListItemIcon>
            <SettingsTwoToneIcon sx={{ color: "#c94f1e" }} />
          </ListItemIcon>
          <ListItemText disableTypography primary="Definições" />
        </ListItem>
        {/* <ListItem
        button
        component={Link}
        to="/suporteAdmin"
        className={location.pathname == "/suporteAdmin" ? classes.active : ""}
      >
        <ListItemIcon>
          {" "}
          <AccountBox />{" "}
        </ListItemIcon>
        <ListItemText primary="Suporte" />
      </ListItem> */}
        <ListItem
          button
          component={Link}
          to="/suporte"
          className={location.pathname === "/suporte" ? classes.active : ""}
        >
          <ListItemIcon>
            <img
              src={img}
              alt="suporte"
              style={{ width: "24px", height: "24px" }}
            />
          </ListItemIcon>
          <ListItemText disableTypography primary="Suporte" />
        </ListItem>
        <Divider />

        <OpcaoSair />

        {/* Rodapé */}

      </List>
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        fontSize: 20,

      }}>
        {versao.versao}

      </div>
    </>
  );
}

//View inicial dos Tecnicos
export function CadernoView() {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [openSubMenu, setOpenSubMenu] = useState(false);
  const handleClickSubMenu = () => {
    setOpenSubMenu(!openSubMenu);
  };

  const [openAnexos, setOpenAnexos] = useState(false);
  const handleClickAnexos = () => {
    setOpenAnexos(!openAnexos);
  };

  const [openEficiencia, setOpenEficiencia] = useState(false);
  const handleClickEficiencia = () => {
    setOpenEficiencia(!openEficiencia);
  };

  const handleBack = () => {
    navigate("/",);
  };

  return (
    <>
      <List style={{ fontFamily: "candara", fontSize: 16, flex: 1 }}>
        <ListItemButton onClick={handleClickSubMenu}>
          <ListItemIcon>
            <LibraryBooksTwoToneIcon sx={{ color: "#c94f1e" }} />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={<strong>Caderno Campo</strong>}
          />
          {openSubMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
          <List component="div">
            <ListItem
              button
              component={Link}
              to="/IdentificacaoBenExp"
              className={
                location.pathname === "/IdentificacaoBenExp" ||
                  location.pathname === "IdentificacaoBenExp"
                  ? classes.active
                  : ""
              }
              state={location.state}
            >
              <ListItemText
                disableTypography
                primary="1. Ident. Beneficiário e da Exploração"
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/CaraterizacaoAreas"
              className={
                location.pathname === "/CaraterizacaoAreas" ? classes.active : ""
              }
              state={location.state}
            >
              <ListItemText
                disableTypography
                primary="2. Carat. Areas sob compromiss11o"
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/CaracterizacaoEfePecuaria"
              className={
                location.pathname === "/CaracterizacaoEfePecuaria"
                  ? classes.active
                  : ""
              }
              state={location.state}
            >
              <ListItemText
                disableTypography
                primary="3. Caraterização do Efetivo Pecuário"
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/RegistoProtFitossanitaria"
              className={
                location.pathname === "/RegistoProtFitossanitaria"
                  ? classes.active
                  : ""
              }
              state={location.state}
            >
              <ListItemText
                disableTypography
                primary="4. R. Proteção Fitossanitária e aplicação de biocidas"
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/RegistoOperCulturais"
              className={
                location.pathname === "/RegistoOperCulturais"
                  ? classes.active
                  : ""
              }
              state={location.state}
              
            >
              <ListItemText
                disableTypography
                primary="5. R. Opererações Culturais"
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/RegOperFertil"
              className={
                location.pathname === "/RegOperFertil" ? classes.active : ""
              }
              state={location.state}
            >
              <ListItemText
                disableTypography
                primary="5A. R. Opererações Fertilização"
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/RegAtividades"
              className={
                location.pathname === "/RegAtividades" ? classes.active : ""
              }
              state={location.state}
            >
              <ListItemText disableTypography primary="5B. Registo Atividades" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/RegAtividPP"
              className={
                location.pathname === "/RegAtividPP" ? classes.active : ""
              }
              state={location.state}
              disabled
            >
              <ListItemText
                disableTypography
                primary="5C. R. Ativividades Pastagens "
              />
            </ListItem>





            <ListItem
              button
              component={Link}
              to="/RegAtividadesFO"
              className={
                location.pathname === "/RegAtividadesFO" ? classes.active : ""
              }
              state={location.state}
              // disabled
            >
              <ListItemText
                disableTypography
                primary="5D. R. Ativ. Fertilização Orgânica "
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/RegCalRega"
              className={
                location.pathname === "/RegCalRega" ? classes.active : ""
              }
              state={location.state}
              disabled
            >
              <ListItemText disableTypography primary="6. R. Calendário Rega" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/RegProducaoAnimal"
              className={
                location.pathname === "/RegProducaoAnimal" ? classes.active : ""
              }
              state={location.state}
              disabled
            >
              <ListItemText disableTypography primary="7. R. Produção Animal" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/RegPosColheita"
              className={
                location.pathname === "/RegPosColheita" ? classes.active : ""
              }
              state={location.state}
              disabled
            >
              <ListItemText disableTypography primary="8. R. Pós-colheita" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/RegAquisicoesEntra"
              className={
                location.pathname === "/RegAquisicoesEntra" ? classes.active : ""
              }
              state={location.state}
              disabled
            >
              <ListItemText
                disableTypography
                primary="9. R. Aquisicoes/Entradas"
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/RegVendas"
              className={location.pathname === "/RegVendas" ? classes.active : ""}
              state={location.state}
              disabled
            >
              <ListItemText disableTypography primary="10. Registo vendas" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/RegGestaoEP"
              className={
                location.pathname === "/RegGestaoEP" ? classes.active : ""
              }
              state={location.state}
              disabled
            >
              <ListItemText
                disableTypography
                primary="11. R. Gestão Efluentes Pecuários"
              />
            </ListItem>
          </List>
        </Collapse>

        <Divider />
        <ListItemButton onClick={handleClickAnexos}>
          <ListItemIcon>
            <AttachFileTwoToneIcon sx={{ color: "#c94f1e" }} />
          </ListItemIcon>
          <ListItemText disableTypography primary={<strong>Anexos</strong>} />
          {openAnexos ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openAnexos} timeout="auto" unmountOnExit>
          <List component="div">
            <ListItem
              button
              component={Link}
              to="/Anexo1"
              className={location.pathname === "/Anexo1" ? classes.active : ""}
              state={location.state}
            >
              <ListItemText
                disableTypography
                primary="A1. Plano de Fertilização"
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/Anexo2"
              className={location.pathname === "/Anexo2" ? classes.active : ""}
              state={location.state}
              
            >
              <ListItemText
                disableTypography
                primary="A2. Plano Gestão Pastoreio"
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/Anexo3"
              className={location.pathname === "/Anexo3" ? classes.active : ""}
              state={location.state}
            >
              <ListItemText disableTypography primary="A3. Plano Alimentar" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/Anexo4"
              className={location.pathname === "/Anexo4" ? classes.active : ""}
              state={location.state}
            >
              <ListItemText
                disableTypography
                primary="A4. P. Boas Práticas Higiéne"
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/Anexo5"
              className={location.pathname === "/Anexo5" ? classes.active : ""}
              state={location.state}
            >
              <ListItemText disableTypography primary="A5. Plano de Reprodução" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/Anexo6"
              className={location.pathname === "/Anexo6" ? classes.active : ""}
              state={location.state}
            >
              <ListItemText
                disableTypography
                primary="A6. Registo visitas de OC, ERR ou ELA"
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/Anexo7"
              className={location.pathname === "/Anexo7" ? classes.active : ""}
              state={location.state}
            >
              <ListItemText disableTypography primary="A7 - Emissão de Parecer" />
            </ListItem>
          </List>
        </Collapse>

        <Divider />
        <ListItemButton onClick={handleClickEficiencia}>
          <ListItemIcon>
            <PetsTwoToneIcon sx={{ color: "#c94f1e" }} />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={<strong>Efic. Alimentar</strong>}

          />
          {openEficiencia ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openEficiencia} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              component={Link}
              to="/EFIdentBenfExp"
              className={
                location.pathname === "/EFIdentBenfExp" ? classes.active : ""
              }
              disabled
            >
              <ListItemText
                disableTypography
                primary="1. Ident. beneficiário Exp."
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/EFPlanoAlimentar"
              className={
                location.pathname === "/EFPlanoAlimentar" ? classes.active : ""
              }
              disabled
            >
              <ListItemText disableTypography primary="2. Plano Alimentar" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/EF_PA_GH1"
              className={location.pathname === "/EF_PA_GH1" ? classes.active : ""}
              disabled
            >
              <ListItemText disableTypography primary="2.1. PA_G.Homogeneo 1" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/EF_PA_GH2"
              className={location.pathname === "/EF_PA_GH2" ? classes.active : ""}
              disabled
            >
              <ListItemText disableTypography primary="2.2. PA_G.Homogeneo 2" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/EF_PA_GH3"
              className={location.pathname === "/EF_PA_GH3" ? classes.active : ""}
              disabled
            >
              <ListItemText disableTypography primary="2.3. PA_G.Homogeneo 3" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/EF_Caderno_Campos"
              className={
                location.pathname === "/EF_Caderno_Campos" ? classes.active : ""
              }
              disabled
            >
              <ListItemText disableTypography primary="3. CC Caderno de campo" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/EF_CC_GH1"
              className={location.pathname === "/EF_CC_GH1" ? classes.active : ""}
              disabled
            >
              <ListItemText disableTypography primary="3.1. CC G. Homogéneo 1" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/EF_CC_GH2"
              className={location.pathname === "/EF_CC_GH2" ? classes.active : ""}
              disabled
            >
              <ListItemText disableTypography primary="3.2. CC G. Homogéneo 2" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/EF_CC_GH3"
              className={location.pathname === "/EF_CC_GH3" ? classes.active : ""}
              disabled
            >
              <ListItemText disableTypography primary="3.3. CC G. Homogéneo 3" />
            </ListItem>
          </List>
        </Collapse>

        <Divider />
        {/* Voltar para a página inicio */}
        <ListItemButton
          onClick={handleClickOpenDialog}
          style={{ marginBottom: 50 }}
        >
          <ListItemIcon>
            <ArrowBackTwoToneIcon sx={{ color: "#c94f1e" }} />
          </ListItemIcon>
          <ListItemText disableTypography primary="Voltar ao inicio" />
        </ListItemButton>

        {/* Rodapé */}

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Tem a certeza que quer sair dos cadernos de campo?
            </DialogContentText>
            <DialogActions>
              <Button
                onClick={handleBack}
                sx={{
                  color: "#7e2706",
                  fontFamily: "candara",
                  fontSize: 18,
                }}
              >
                Sim
              </Button>
              <Button
                onClick={handleCloseDialog}
                sx={{
                  color: "#7e2706",
                  fontFamily: "candara",
                  fontSize: 18,
                }}
              >
                Cancelar
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </List>
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        fontSize: 20,

      }}>
        {versao.versao}

      </div>
    </>
  );
}

//View inicial dos Tecnicos
export function TecnicoView() {
  const classes = useStyles();
  const location = useLocation();

  return (
    <>
      <List style={{ fontFamily: "candara", fontSize: 16, flex:1 }}>
        <ListItem
          button
          component={Link}
          to="/"
          className={location.pathname === "/" ? classes.active : ""}
        >
          <ListItemIcon>
            <HomeTwoToneIcon sx={{ color: "#c94f1e" }} />
          </ListItemIcon>
          <ListItemText disableTypography primary="Inicio" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/definicoestecnico"
          className={
            location.pathname === "/definicoestecnico" ? classes.active : ""
          }
        >
          <ListItemIcon>
            <SettingsTwoToneIcon sx={{ color: "#c94f1e" }} />
          </ListItemIcon>
          <ListItemText disableTypography primary="Definições" />
        </ListItem>

        {/* Fazer logout do user */}
        <List style={{ fontFamily: "candara", fontSize: 16 }}>
          <OpcaoSair />
        </List>

        {/* Rodapé */}

      </List>
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        fontSize: 20,

      }}>
        {versao.versao}

      </div>
    </>
  );
}
