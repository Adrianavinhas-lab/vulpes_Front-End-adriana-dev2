import React, { useContext, useEffect, useState } from "react";

import {
  DialogActions,
  FormControl,
  FormLabel,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import { AuthContext } from "../../AuthContext/AuthContext";
import { get } from "../../Services/tokenConfig";
import { func_print } from "../../Func_genericas/func_print";
import { BarraDeFerramentas } from "../../Components/barra-de-ferramentas/BarraDeFerramentas";
import { CustomSelect } from "../../Styles/theme/customThemeprovider";
import { drapToChoose } from "../../informacao_estatica";
import LoadingVulpesSmall from "../../Styles/Loader/loadingSmall";
// import { ITemplate } from "../../Interfaces/templates/template1";

interface INovoCadernoManualProps {
  setValueYear_arg: (obj: Dayjs | null) => void;
  setDrapChoose_arg: (choose_drap: string) => void;
  set_obj_template_escolhido_arg: (obj: any) => void;
  handleCreateCaderno_arg: () => void;
}

export const DialogNovoCadernoManual = ({
  setDrapChoose_arg,
  setValueYear_arg,
  // set_obj_template_escolhido_arg,
  handleCreateCaderno_arg
}: INovoCadernoManualProps) => {
  const auth = useContext(AuthContext);

  const [isloading, setIsLoading] = useState(true);
  const [valueYear, setValueYear] = useState<Dayjs | null>(dayjs);
  // const [templateList_for_select, setTemplateList_for_select] = useState<any[]>();
  // const [obj_template_escolhido, set_obj_template_escolhido] = useState<any>();
  const [drapChoose, setDrapChoose] = useState<string>("Norte");



  const getAllTemplates = async () => {
    try {
      const urlrelativa = `/get_template_org/${auth.user?.id_org}`;

      const res = await get(urlrelativa);
      if (res.status === 200) {
        let lista_templates_for_select_aux = [
          { value: -1, label: "Caderno em Branco" },
        ];
        res.data.result.forEach((el: any) => {

          lista_templates_for_select_aux.push({
            value: el.id_template,
            label: el.decricao,
          });
        });
        // set_obj_template_escolhido(lista_templates_for_select_aux[0])

        // setTemplateList_for_select(lista_templates_for_select_aux);
        setIsLoading(false);
      } else {
        setIsLoading(false);

      }
    } catch (error) {
      func_print("getAllTemplates", error, true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getAllTemplates();
    })();
  }, []);

  // OnChage DRAP
  const handleChangeDrap = (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    setDrapChoose_arg(event.target.value)
    setDrapChoose(event.target.value);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DialogActions>
          {isloading ?
            <LoadingVulpesSmall />
            : <Stack direction="column">
              <FormControl sx={{ paddingBottom: 5 }}>
                <FormLabel
                  sx={{
                    fontFamily: "candara",
                    "&.Mui-focused": {
                      color: "#c94f1e",
                    },
                    paddingBottom: 3,
                    width: 400,
                  }}
                >
                  Selecione DRAP
                </FormLabel>
                <CustomSelect
                  value={drapChoose}
                  name="drap"
                  onChange={handleChangeDrap}
                  options={drapToChoose}
                  label="Selecione Drap"
                />
              </FormControl>

              {/* {templateList_for_select !== undefined ? (
                <FormControl sx={{ paddingBottom: 5 }}>
                  <FormLabel
                    sx={{
                      fontFamily: "candara",
                      "&.Mui-focused": {
                        color: "#c94f1e",
                      },
                      paddingBottom: 3,
                      width: 400,
                    }}
                  >
                    Selecione Template ou Caderno em Branco
                  </FormLabel>
                  <CustomSelect
                    value={obj_template_escolhido.value}
                    name="template"
                    onChange={(e: any) => {

                      let obj_aux = templateList_for_select.find((el: any) => {
                        return el.value === e.target.value;
                      });
                      set_obj_template_escolhido(obj_aux);
                      set_obj_template_escolhido_arg(obj_aux)
                    }}
                    options={templateList_for_select}
                    label="Selecione Template ou Caderno em Branco"
                    flag_list_map_obj={true}
                  />
                </FormControl>
              ) : (
                <></>
              )} */}

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["year"]}
                  label={
                    <Typography fontFamily="candara" fontSize={18}>
                      Selecionar ano
                    </Typography>
                  }
                  value={valueYear}
                  onChange={(valueYear) => {
                    setValueYear(valueYear);
                    setValueYear_arg(valueYear)
                  }}
                  maxDate={dayjs()}
                  minDate={dayjs("2010")}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

            </Stack>
          }
        </DialogActions>
      </div>
      <Stack direction="row" display="flex" justifyContent="end" paddingTop={5}>
        <BarraDeFerramentas
          mostrarBotaoNovo
          aoClicarNovo={() => handleCreateCaderno_arg()}
          textoBotaoNovo="CRIAR"
        />
      </Stack>
    </>
  );
};
