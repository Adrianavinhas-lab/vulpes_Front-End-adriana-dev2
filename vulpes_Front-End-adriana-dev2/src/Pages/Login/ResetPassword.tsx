import React, { useState, useEffect} from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      background: "green",
    },
    passBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      background: "blue",
    },
    header: {
      textAlign: "center",
      background: "#FAFAFA",

      color: "black",
    },

    card: {
      marginTop: theme.spacing(10),
      background: "#FAFAFA",
    },
  })
);

// interface ILoginProps {
//   children: React.ReactNode;
// }
export default function ResetPassword() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password] = useState("");
  const [error] = useState(false);
  // const [, setToken] = useContext(UserContext);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  // const [helperText, setHelperText] = useState("");

  useEffect(() => {
    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, password]);

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13 || e.which === 13) {
    }
  };

  return (
    <React.Fragment>
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          <Card className={classes.card}>
            <CardHeader
              className={classes.header}
              title="Mudar palavra passe"
            />
            <CardContent>
              <div style={{ width: 400 }}>
                <TextField
                  error={error}
                  fullWidth
                  id="username"
                  type="email"
                  label="Utilizador"
                  placeholder="Utilizador"
                  margin="normal"
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e)}
                />
                {/* <TextField
                  error={error}
                  fullWidth
                  id="password"
                  type="password"
                  label="Palavra-Passe"
                  placeholder="Palavra-Passe"
                  margin="normal"
                  helperText={helperText}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e)} */}
                {/* /> */}
              </div>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                size="large"
                color="primary"
                className={classes.loginBtn}
                //onClick={() => submitLogin()}
                disabled={isButtonDisabled}
              >
                Seguinte
              </Button>
              <br />
            </CardActions>
          </Card>
        </form>
      </div>
      {/* } */}
    </React.Fragment>
  );
}
