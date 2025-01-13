import { useContext } from "react";
import { ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import { AuthContext } from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

export const OpcaoSair = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.signout();
        navigate('/')
        auth.func_set_user_role("");
    };

    return (
        <ListItemButton onClick={() => handleLogout()}>
        <ListItemIcon>
          <ExitToAppTwoToneIcon sx={{ color: "#c94f1e" }} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography style={{ fontFamily: "candara", fontSize: 16 }}>
              Sair
            </Typography>
          }
        />
      </ListItemButton>)
}