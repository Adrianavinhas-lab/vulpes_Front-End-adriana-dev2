import React, { useEffect, useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Layout from "../../Styles/layout/index";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import EuroOutlinedIcon from "@mui/icons-material/EuroOutlined";
import { get } from "../../Services/tokenConfig";
import Historico from "../Historico/historico";
import Loading from "../../Styles/Loader/loading";
import { func_print } from "../../Func_genericas/func_print";
import { IDashboard } from "../../Interfaces/dashboard/dashboard";
import { operacao_erro } from "../../Func_genericas/valores_estaticos";

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
    label: {
      display: "flex",
      justifyContent: 'center',
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
        minWidth: 325,
      },
    },
    paper: {
      background: "linear-gradient(45deg, #ffffff 70%,  #c94f1e 60%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px #90918e ",
      width: 300,
      // hight: 500,
      color: "#353C47",
      padding: "5px 20px",
      margin: "20px 20px",
      fontSize: 26,
      fontFamily: "Arial",
      alignItems: "center",
    },
  })
);



function HomeAdmin() {
  const classes = useStyles();
  const [isloading, setIsLoading] = useState(true);

  //MediaQuery Para um Layout responsivo
  const matches = useMediaQuery("(min-width:950px)");

  const [viewHistory] = useState(false);
  const [dashboard, setDashboard] = useState<IDashboard[]>([]);

  const [message, setMessage] = useState("");
  const [openSnackSuccess, setOpenSnackSuccess] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);


  const getDashboard = async () => {

    try {

      const response = await get("/dashboard");
      func_print('response.data', response.data)

      setDashboard(response.data);
      setIsLoading(false)
    } catch (error) {
      func_print('getDashboard', error, true)
      setMessage(operacao_erro)
      setOpenSnackError(true)
      setIsLoading(false)
      setDashboard([]);


    }
  };

  useEffect(() => {
    (async () => {
      await getDashboard()

    })();

  }, []);

  return (
    <div className={classes.root}>
      <Layout title="Admin" />
      <main className={classes.contents}>
        <div className={classes.toolbars} />
        {isloading ? <Loading />
          :
          <div className={classes.label}>

            <div id="box" className={classes.paper}>
              <div>
                <PeopleAltOutlinedIcon fontSize="large" />
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ fontWeight: 800, marginTop: 23 }}>
                  {dashboard.length === 0 ? '' : dashboard[0].agri}
                </div>
                <div style={{ fontSize: 15, marginLeft: 10, marginTop: 35 }}>
                  
                  Beneficiários
                </div>
              </div>
            </div>
            <div id="box" className={classes.paper}>
              <div>
                <ManageAccountsOutlinedIcon fontSize="large" />
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ fontWeight: 800, marginTop: 23 }}>
                  {dashboard.length === 0 ? '' : dashboard[0].tecnico}
                </div>
                <div style={{ fontSize: 15, marginLeft: 10, marginTop: 35 }}>
                  
                  Técnicos
                </div>
              </div>
            </div>
            <div id="box" className={classes.paper}>
              <div>
                <AutoStoriesOutlinedIcon fontSize="large" />
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ fontWeight: 800, marginTop: 23 }}>
                  {dashboard.length === 0 ? '' : dashboard[0].cadernos}
                </div>
                <div style={{ fontSize: 15, marginLeft: 10, marginTop: 35 }}>
                  
                  Cadernos em aberto
                </div>
              </div>
            </div>
            <div id="box" className={classes.paper}>
              <div>
                <EuroOutlinedIcon fontSize="large" />
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ fontWeight: 800, marginTop: 23 }}>
                  {dashboard.length === 0? '' : dashboard[0].preco}€
                </div>
                <div style={{ fontSize: 15, marginLeft: 10, marginTop: 35 }}>
                  
                  Estimados
                </div>
              </div>
            </div>


            <div
              id="dados"
              style={{
                height: matches === true ? "400px" : "auto",
                width: matches === true ? "48%" : "97%",
                display: "flex",
              }}
            >

            </div>
          </div>
        }


        {viewHistory === true ? <Historico /> : ""}
      </main>
    </div>
  );
}
export default HomeAdmin;
