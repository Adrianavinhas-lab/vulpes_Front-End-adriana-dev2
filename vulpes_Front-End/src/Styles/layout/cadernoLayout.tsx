import React, { useState, useContext } from "react";
import clsx from "clsx";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { CadernoView } from "./views";
import ReportProblemTwoToneIcon from "@mui/icons-material/ReportProblemTwoTone";
import img from "../../Assets/Images/VULPES MENU 128.png";

import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import {
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../AuthContext/AuthContext";
import { ChangeRole } from "../../Func_genericas/change_role";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
      fontFamily: "Candara",
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(2),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    barra: {
      background: "#C94F1E",
    },
    active: {
      background: "#7E2706",
    },
    clock: {
      overflow: "hidden",
      textAlign: "center",
      border: "2px solid burlywood",
      width: "150px",
      borderRadius: "1px",
      padding: "0px 0",
    },
    footer: {
      width: "100%",
      height: "40px",
      position: "fixed",
      bottom: 0,
      left: 20,
    },
  })
);

export default function CadernoLayout(props: { title: React.ReactNode }) {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  //****************************************************************************************************** */
  const [openConnfirm, setOpenConfirm] = useState(false);

  const handleMudarView = () => {
    ChangeRole(auth, navigate);
  };

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleConfirmOpen = () => {
    setOpenConfirm(true);
  };
  const handleConfirmClose = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.barra}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" fontFamily="candara" noWrap>
            VULPES - {props.title}
          </Typography>
          <div style={{ marginLeft: "auto", marginRight: 0, display: "flex" }}>
            <div
              style={{
                display: "flex",
                width: 250,
                paddingLeft: 10,
                paddingRight: 10,
                alignSelf: "center",
              }}
              className={classes.clock}
            >
              <div style={{ marginRight: 10 }}>
                <AccountCircleOutlinedIcon fontSize="large" />
              </div>
              <Typography variant="h6" fontFamily="candara" noWrap>
                {auth.user?.name}
                {/*Nome do utilizador ...................................................................................................*/}
              </Typography>
            </div>

            <Button
              sx={{
                height: 44,
                marginRight: 1,
                alignSelf: "center",
                borderRadius: 0.5,
                backgroundColor: "#7E2706",
                paddingTop: 3,
                paddingBottom: 3,
                marginLeft: 1,
                "&:hover": {
                  backgroundColor: "#ccafa3",
                },
              }}
              variant="contained"
              onClick={handleConfirmOpen}
            >
              <SupervisorAccountIcon fontSize="large" />
              <Typography style={{ fontFamily: "Candara" }}>
                Vista Consultor
              </Typography>
            </Button>

            <Dialog open={openConnfirm} onClose={handleConfirmClose}>
              <DialogContent>
                <ReportProblemTwoToneIcon
                  sx={{ color: "orange", fontSize: 60 }}
                />
                <Typography
                  align="center"
                  fontFamily="Candara"
                  fontWeight={700}
                  fontSize={20}
                  color="#7e2706"
                >
                  Certifique-se de que gravou toda a informação antes de mudar.
                </Typography>
              </DialogContent>
              <Typography
                align="center"
                fontFamily="Candara"
                color="#7e2706"
                fontWeight={700}
                fontSize={18}
                padding={1}
              >
                Deseja Continuar?
              </Typography>
              <DialogActions>
                <Button
                  onClick={handleMudarView}
                  sx={{
                    color: "#7e2706",
                    fontFamily: "candara",
                    fontSize: 18,
                  }}
                >
                  SIM
                </Button>
                <Button
                  onClick={handleConfirmClose}
                  sx={{
                    color: "#7e2706",
                    fontFamily: "candara",
                    fontSize: 18,
                  }}
                >
                  NÃO
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <CardMedia
            component="img"
            sx={{ width: "60%", padding: 1 }}
            image={img}
            alt="Caderno de Campo"
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        {/* <Divider /> */}
        <CadernoView />
      </Drawer>
    </>
  );
}
