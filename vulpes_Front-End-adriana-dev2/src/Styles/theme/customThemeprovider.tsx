import {
  FilledInput,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import React from "react";

interface CustomSelectProps {
  value: string;
  name: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: string[];
  label: string;
  flag_list_map_obj?: boolean | undefined;
}

const customTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: 12,
          fontFamily: "candara",
          "& label.Mui-focused": {
            color: "#c94f1e",
            "& .MuiInput-underline:after": {
              borderBottomColor: "#c94f1e",
            },
          },
          "& .MuiFilledInput-underline:after": {
            borderBottomColor: "#c94f1e",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#c94f1e",
            },
          },
          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#000000",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#c94f1e", // Cor do texto do rótulo quando o campo está focado
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#c94f1e",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#c94f1e",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          "&:focus": {
            backgroundColor: "#f0f0f0",

          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline ": {
            borderColor: "#c94f1e !important",
          },
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

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({
  children,
}) => {
  return <ThemeProvider theme={customTheme}>{children}</ThemeProvider>;
};

const CustomTextField: React.FC<any> = (props) => {
  return (
    <TextField
      variant="filled"
      margin="normal"
      multiline
      fullWidth
      {...props}
      inputProps={{ style: { fontSize: 14, fontFamily: "verdana" } }}
    />
  );
};

const CustomTextFieldPass: React.FC<any> = ({ selectBool, ...props }) => {
  return (
    <FormControl color="error" margin="normal" fullWidth variant="filled">
      <InputLabel htmlFor="filled-adornment-password">Palavra-Passe</InputLabel>

      <FilledInput
        inputProps={{ style: { fontSize: 14, fontFamily: "verdana" } }}
        {...props}
        fullWidth
      />
      <FormHelperText id="username-helper" error={selectBool}>
        {selectBool === true ? "Palavra-Passe deve ter no minimo 9 caracteres, e pelo menos um caracter especial" : ""}
      </FormHelperText>
    </FormControl>
  );
};
const CustomTextFieldPassConfirm: React.FC<any> = ({
  selectBool,
  ...props
}) => {
  return (
    <FormControl margin="normal" fullWidth color="error" variant="filled">
      <InputLabel htmlFor="filled-adornment-password">
        Confirme a palavra-passe
      </InputLabel>
      <FilledInput
        inputProps={{ style: { fontSize: 14, fontFamily: "verdana" } }}
        {...props}
        fullWidth
      />
      <FormHelperText id="username-helper" error={selectBool}>
        {selectBool === true ? "Palavra-Passe deve ter no minimo 9 caracteres, e pelo menos um caracter especial" : ""}
      </FormHelperText>
    </FormControl>
  );
};


const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  options,
  label,
  name,
  onChange,
  flag_list_map_obj = false,
}) => {
  return (
    <FormControl >
      <InputLabel
        sx={{
          fontSize: 14,
          fontFamily: "verdana",
        }}
      >
        {label}
      </InputLabel>
      <Select
        value={value}
        label={label}

        name={name}
        sx={{
          fontSize: 14,
          fontFamily: "verdana",
          minWidth: 200,
        }}
        onChange={onChange}
      >

        {flag_list_map_obj === false || flag_list_map_obj === undefined
          ? options.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                <Typography
                  style={{
                    fontSize: 14,
                    fontFamily: "candara",
                  }}
                >
                  {item}
                </Typography>
              </MenuItem>
            );
          })
          : options.map((item: any, key) => {

            return (
              <MenuItem key={key} value={item.value}>
                <Typography
                  style={{
                    fontSize: 14,
                    fontFamily: "candara",
                  }}
                >
                  {item.label}
                </Typography>
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export {
  CustomThemeProvider,
  CustomTextField,
  CustomSelect,
  CustomTextFieldPass,
  CustomTextFieldPassConfirm,
};
