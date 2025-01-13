import React, { ChangeEvent, useState } from "react";

import {
  FormControlLabel, Stack, TableCell, TableRow,
} from "@mui/material";
import { TableBody, TableHead } from "@mui/material";
import { Paper } from "@mui/material";
import { TextField, Typography } from "@mui/material";
import { TableContainer } from "@mui/material";
import { Checkbox } from "@mui/material";
import { Box } from "@mui/system";
import { PatternFormat } from "react-number-format";
import PhoneInput from "react-phone-number-input";

import { post } from "../../../Services/tokenConfig";
import Loading from "../../../Styles/Loader/loading";
import {
  CustomTextField,
  CustomThemeProvider,
} from "../../../Styles/theme/customThemeprovider";
import {
  StyledTableHeadLeft,
  StyledTableHeadColor,
  StyledTableCellBaseLeft,
  StyledTableHead,
} from "../../../Styles/tabelCellStyled/customTableCell";
import { func_print } from "../../../Func_genericas/func_print";
import { isValidEmail } from "../../../Func_genericas/isValidEmail";
import { verify_nif } from "../../../Func_genericas/verify_nif";
import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import BasicPopover from "../../../Components/Popover";
import { ICaderno } from "../../../Interfaces/cadernos/caderno1";

interface IcadernoProps {
  book: ICaderno;
  setBook: React.Dispatch<React.SetStateAction<ICaderno>>;
  updateCreateCabecalho: () => void;
  setOpenSnackSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSnackError: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const NewCCIdentBenExp: React.FC<IcadernoProps> = ({
  book,
  setBook,
  updateCreateCabecalho,
  setOpenSnackSuccess,
  setOpenSnackError,
  setMessage,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [error_email, set_error_email] = useState(false);
  const [error_nif, set_error_nif] = useState(false);
  const [error_nome, set_error_nome] = useState(false);
  const [error_nifap, setError_nifap] = useState<boolean>(false);
  const [error_n_parcelario, setError_n_parcelario] = useState<boolean>(false);
  const [error_n_subparcela, setError_n_subparcela] = useState<boolean>(false);
  const [error_conversao_AB, setError_conversao_AB] = useState<boolean>(false);
  const [error_area_manutencao_AB, setError_area_manutencao_AB] = useState<boolean>(false);
  const [error_area_PRODI, setError_area_PRODI] = useState<boolean>(false);
  const [error_area_total_exploracao, setError_area_total_exploracao] = useState<boolean>(false);
  const [error_area_regada, setError_area_regada] = useState<boolean>(false);
  const [error_bovinos_conversao_AB, setError_bovinos_conversao_AB] = useState<boolean>(false);
  const [error_bovinos_manutencao_AB, setError_bovinos_manutencao_AB] = useState<boolean>(false);
  const [error_ovinos_conversao_AB, setError_ovinos_conversao_AB] = useState<boolean>(false);
  const [error_ovinos_manutencao_AB, setError_ovinos_manutencao_AB] = useState<boolean>(false);
  const [error_caprinos_conversao_AB, setError_caprinos_conversao_AB] = useState<boolean>(false);
  const [error_caprinos_manutencao_AB, setError_caprinos_manutencao_AB] = useState<boolean>(false);
  const [error_outras_espe_conver_AB, setError_outras_espe_conver_AB] = useState<boolean>(false);
  const [error_outras_esp_manu_AB, setError_outras_esp_manu_AB] = useState<boolean>(false);
  const [error_bovinos_PRODI, setError_bovinos_PRODI] = useState<boolean>(false);
  const [error_ovinos_PRODI, setError_ovinos_PRODI] = useState<boolean>(false);
  const [error_caprinos_PRODI, setError_caprinos_PRODI] = useState<boolean>(false);
  const [error_outras_esp_PRODI, setError_outras_esp_PRODI] = useState<boolean>(false);
  const message_apenas_numero = ("Introduza apenas números");


  async function updateCaderno() {
    try {
      let flag_valido_email = false;
      let flag_valido_nif = false;
      let flag_valido_nome = false;

      if (book.email.length !== 0 && isValidEmail(book.email) === false) {
        set_error_email(true);
        flag_valido_email = false;
      } else {
        set_error_email(false);
        flag_valido_email = true;
      }
      if (book.nif.length === 0) {
        set_error_nif(true);
        flag_valido_nif = false;
      } else if (verify_nif(book.nif) === false) {
        set_error_nif(true);
        flag_valido_nif = false;
      } else {
        set_error_nif(false);
        flag_valido_nif = true;
      }

      if (book.nome.length === 0) {
        set_error_nome(true);
        flag_valido_nome = false;
      } else {
        set_error_nome(false);
        flag_valido_nome = true;
      }

      if (flag_valido_email && flag_valido_nif && flag_valido_nome) {
        const response = await post(`/update_caderno_rosto`, {
          payload: book,
        });

        if (response.status === 200) {
          setBook(response.data.result);
          setMessage("Atualizado com sucesso!");
          setOpenSnackSuccess(true);

          updateCreateCabecalho();

        } else {
          setOpenSnackError(true);
          setMessage("Erro ao atualizar");
        }
        setIsLoading(false);
      }
    } catch (error) {
      func_print("updateCaderno", error, true);
      setOpenSnackError(true);
      setIsLoading(false);
    }
  }

  const onInputChange = (event: ChangeEvent<HTMLInputElement>, valor: boolean) => {
    const { name, value, type, checked } = event.target;
    let newValue: any = type === "checkbox" ? valor : value;

    if (name === "nifap") {
      if (isNaN(Number(value))) {
        setError_nifap(true);
        return;
      } else {
        setError_nifap(false);
      }
    }
    if (name === "n_parcelario") {
      if (isNaN(Number(value))) {
        setError_n_parcelario(true);
        return;
      } else {
        setError_n_parcelario(false);
      }
    }
    if (name === "n_subparcela") {
      if (isNaN(Number(value))) {
        setError_n_subparcela(true);
        return;
      } else {
        setError_n_subparcela(false);
      }
    }
    if (name === "area_manutencao_AB") {
      if (isNaN(Number(value))) {
        setError_area_manutencao_AB(true);
        return;
      } else {
        setError_area_manutencao_AB(false);
      }
    }
    if (name === "area_manutencao_AB") {
      if (isNaN(Number(value))) {
        setError_area_manutencao_AB(true);
        return;
      } else {
        setError_area_manutencao_AB(false);
      }
    }
    if (name === "area_conversao_AB") {
      if (isNaN(Number(value))) {
        setError_conversao_AB(true);
        return;
      } else {
        setError_conversao_AB(false);
      }
    }
    if (name === "area_PRODI") {
      if (isNaN(Number(value))) {
        setError_area_PRODI(true);
        return;
      } else {
        setError_area_PRODI(false);
      }
    }
    if (name === "area_total_exploracao") {
      if (isNaN(Number(value))) {
        setError_area_total_exploracao(true);
        return;
      } else {
        setError_area_total_exploracao(false);
      }
    }
    if (name === "area_regada") {
      if (isNaN(Number(value))) {
        setError_area_regada(true);
        return;
      } else {
        setError_area_regada(false);
      }
    }
    if (name === "bovinos_conversao_AB") {
      if (isNaN(Number(value))) {
        setError_bovinos_conversao_AB(true);
        return;
      } else {
        setError_bovinos_conversao_AB(false);
      }
    }
    if (name === "bovinos_manutencao_AB") {
      if (isNaN(Number(value))) {
        setError_bovinos_manutencao_AB(true);
        return;
      } else {
        setError_bovinos_manutencao_AB(false);
      }
    }
    if (name === "ovinos_conversao_AB") {
      if (isNaN(Number(value))) {
        setError_ovinos_conversao_AB(true);
        return;
      } else {
        setError_ovinos_conversao_AB(false);
      }
    }
    if (name === "ovinos_manutencao_AB") {
      if (isNaN(Number(value))) {
        setError_ovinos_manutencao_AB(true);
        return;
      } else {
        setError_ovinos_manutencao_AB(false);
      }
    }
    if (name === "caprinos_conversao_AB") {
      if (isNaN(Number(value))) {
        setError_caprinos_conversao_AB(true);
        return;
      } else {
        setError_caprinos_conversao_AB(false);
      }
    }
    if (name === "caprinos_manutencao_AB") {
      if (isNaN(Number(value))) {
        setError_caprinos_manutencao_AB(true);
        return;
      } else {
        setError_caprinos_manutencao_AB(false);
      }
    }
    if (name === "outras_espe_conver_AB") {
      if (isNaN(Number(value))) {
        setError_outras_espe_conver_AB(true);
        return;
      } else {
        setError_outras_espe_conver_AB(false);
      }
    }
    if (name === "outras_esp_manu_AB") {
      if (isNaN(Number(value))) {
        setError_outras_esp_manu_AB(true);
        return;
      } else {
        setError_outras_esp_manu_AB(false);
      }
    }
    if (name === "bovinos_PRODI") {
      if (isNaN(Number(value))) {
        setError_bovinos_PRODI(true);
        return;
      } else {
        setError_bovinos_PRODI(false);
      }
    }
    if (name === "ovinos_PRODI") {
      if (isNaN(Number(value))) {
        setError_ovinos_PRODI(true);
        return;
      } else {
        setError_ovinos_PRODI(false);
      }
    }
    if (name === "caprinos_PRODI") {
      if (isNaN(Number(value))) {
        setError_caprinos_PRODI(true);
        return;
      } else {
        setError_caprinos_PRODI(false);
      }
    }
    if (name === "outras_esp_PRODI") {
      if (isNaN(Number(value))) {
        setError_outras_esp_PRODI(true);
        return;
      } else {
        setError_outras_esp_PRODI(false);
      }
    }

    setBook((prevCaderno:any) => ({
      ...prevCaderno,
      [name]: newValue,
    }));
  };

  return (
    <CustomThemeProvider>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Box sx={{ display: "flex", justifyContent: "end", padding: 2 }}>
              <ButtonCadernos
                mostrarBotaoGravar
                aoClicarGravar={() => updateCaderno()}
                mostrarBotaoCancelar
                aoClicarCancelar={updateCreateCabecalho}
              />
            </Box>
            <TableContainer
              component={Paper}
              variant="outlined"
              sx={{ height: "auto", width: "auto", m: 2, padding: 2 }}
            >
              <table style={{ width: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      sx={{
                        fontWeight: 700,
                        fontSize: 18,
                        fontFamily: "candara",
                      }}
                    >
                      1. Identificação do beneficiário e da exploração
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <StyledTableHeadColor colSpan={2}>
                      Identificação do operador
                      <BasicPopover
                        text={
                          "Identificar o beneficiário e a Exploração Pecuária."
                        }
                      />
                    </StyledTableHeadColor>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft width="20%">
                      Nome do Beneficiário:
                    </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        error={error_nome}
                        helperText={
                          error_nome === true ? "Nome inválido" : ""
                        }
                        name="nome"
                        value={book.nome}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>NIF: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        error={error_nif}
                        helperText={error_nif === true ? "NIF inválido" : ""}
                        name="nif"
                        value={book.nif || ""}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>NIFAP: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="nifap"
                        value={book.nifap}
                        onChange={onInputChange}
                        error={error_nifap}
                        helperText={error_nifap ? message_apenas_numero : ""}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Morada: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="morada"
                        value={book.morada}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Localização: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="localizacao"
                        value={book.localizacao}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Código Postal: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <PatternFormat
                        format="%%%%-%%%"
                        customInput={TextField}
                        variant="filled"
                        fullWidth
                        patternChar="%"
                        value={book.codig_postal || ""}
                        name="codig_postal"
                        margin="normal"
                        onChange={(e: any) => onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Freguesia: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="freguesia"
                        value={book.freguesia}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Concelho: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="concelho"
                        value={book.concelho}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Telefone: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <PhoneInput
                        name="telefone"
                        defaultCountry="PT"
                        placeholder="Número de telefone"
                        value={"+351" + (book.telefone === null ? '' : book.telefone)}
                        onChange={(e: any) => onInputChange}
                        style={{
                          width: "90%",
                          height: 51,
                        }}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Telemóvel: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <PhoneInput
                        name="telemovel"
                        defaultCountry="PT"
                        placeholder="Número de telefone"
                        value={"+351" + (book.telemovel === null ? '' : book.telemovel)}
                        onChange={(e: any) => onInputChange}
                        style={{
                          width: "90%",
                          height: 51,
                        }}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>
                      Correio electrónico:
                    </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        error={error_email}
                        helperText={
                          error_email === true ? "Email inválido" : ""
                        }
                        name="email"
                        value={book.email}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadColor colSpan={2}>
                      Sócio gerente ou representante (Quando aplicável)
                      <BasicPopover
                        text={
                          "No caso de sociedades identificar o sócio gerente ou pessoa em quem delegou a responsabilidade técnica da exploração pecuária.\nNo caso de beneficiário em nome individual quando o mesmo nomeou um representante legal ou responsável técnico."
                        }
                      />
                    </StyledTableHeadColor>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Cargo: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="cargo"
                        value={book.cargo}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Nome: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="nome_S"
                        value={book.nome_S}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Morada: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="morada_S"
                        value={book.morada_S}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Telefone: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <PhoneInput
                        name="telefone_S"
                        defaultCountry="PT"
                        placeholder="Número de telefone"
                        value={"+351" + (book.telefone_S === null ? '' : book.telefone_S)}
                        onChange={(e: any) => onInputChange}
                        style={{
                          width: "90%",
                          height: 51,
                        }}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Telemóvel: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <PhoneInput
                        name="telemovel_S"
                        defaultCountry="PT"
                        placeholder="Número de telemóvel"
                        value={"+351" + (book.telemovel_S === null ? '' : book.telemovel_S)}

                        onChange={(e) => onInputChange}
                        style={{
                          width: "90%",
                          height: 51,
                        }}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>
                      Correio electrónico:
                    </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="email_S"
                        value={book.email_S}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadColor colSpan={2}>
                      Identificação da exploração
                      <BasicPopover text="Pretende-se que seja feita a caraterização em termos de localização, área e modo de produção, identificando a possível existência de assistência técnica, tipo de produção animal/vegetal e eventual transformação da produção na própria exploração." />
                    </StyledTableHeadColor>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Local da sede: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="local_sede_E"
                        value={book.local_sede_E}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Cód. Postal: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="codigo_postal_E"
                        value={book.codigo_postal_E}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Freguesia: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="freguesia_E"
                        value={book.freguesia_E}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Concelho: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="concelho_E"
                        value={book.concelho_E}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadColor colSpan={2}>
                      Baldio
                      <BasicPopover text="No caso de pastoreio em terrenos de baldio, p. ex." />
                    </StyledTableHeadColor>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Designação: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="designacao_baldio"
                        value={book.designacao_baldio}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Nº Parcelário: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="n_parcelario"
                        value={book.n_parcelario}
                        onChange={onInputChange}
                        error={error_n_parcelario}
                        helperText={error_n_parcelario ? message_apenas_numero : ""}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Nº Subparcela: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="n_subparcela"
                        value={book.n_subparcela}
                        onChange={onInputChange}
                        error={error_n_subparcela}
                        helperText={error_n_subparcela ? message_apenas_numero : ""}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Localização: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="localizacao_baldio"
                        value={book.localizacao_baldio}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Concelho: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="concelho_baldio"
                        value={book.concelho_baldio}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableHeadLeft>Freguesia: </StyledTableHeadLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="freguesia_baldio"
                        value={book.freguesia_baldio}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                </TableBody>
              </table>

              <table style={{ paddingTop: 40 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableHead colSpan={12}>Área (ha):</StyledTableHead>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Área em Manutenção AB:
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="area_manutencao_AB"
                        value={book.area_manutencao_AB}
                        onChange={onInputChange}
                        error={error_area_manutencao_AB}
                        helperText={error_area_manutencao_AB ? message_apenas_numero : ""}
                      />
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      Área de conversão AB:
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="area_conversao_AB"
                        value={book.area_conversao_AB}
                        onChange={onInputChange}
                        error={error_conversao_AB}
                        helperText={error_conversao_AB ? message_apenas_numero : ""}
                      />
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      Área em PRODI
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="area_PRODI"
                        value={book.area_PRODI}
                        onChange={onInputChange}
                        error={error_area_PRODI}
                        helperText={error_area_PRODI ? message_apenas_numero : ""}
                      />
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      Área total exploração:
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="area_total_exploracao"
                        value={book.area_total_exploracao}
                        onChange={onInputChange}
                        error={error_area_total_exploracao}
                        helperText={error_area_total_exploracao ? message_apenas_numero : ""}
                      />
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      <Stack
                        direction="row"
                        justifyContent="right"
                        alignItems="center"
                      >
                        <BasicPopover text="Quando existe, registar o tipo de transformação realizado." />
                      </Stack>
                      Transformação:
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      <Stack direction="column">
                        <FormControlLabel
                          name="transformacao"
                          label={
                            <Typography fontFamily="candara" fontSize={18}>
                              Sim
                            </Typography>
                          }
                          control={
                            <Checkbox
                              checked={book.transformacao === true}
                              onChange={(event) => onInputChange(event, true)}
                              sx={{
                                color: "#aaaaaa",
                                "&.Mui-checked": {
                                  color: "#C94F1E",
                                },
                              }}
                            />
                          }
                        />

                        <FormControlLabel
                          name="transformacao"
                          label={
                            <Typography fontFamily="candara" fontSize={18}>
                              Não
                            </Typography>
                          }
                          control={
                            <Checkbox
                              checked={book.transformacao === false}
                              onChange={(event) =>
                                onInputChange(event, false)
                              }
                              sx={{
                                color: "#aaaaaa",
                                "&.Mui-checked": {
                                  color: "#C94F1E",
                                },
                              }}
                            />
                          }
                        />
                      </Stack>
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft colSpan={2}>
                      <Stack
                        direction="row"
                        justifyContent="right"
                        alignItems="center"
                      >
                        <BasicPopover text="Se resposta é 'SIM', registar o tipo de transformação realizado." />
                      </Stack>
                      <CustomTextField
                        name="tranform_obs"
                        value={book.tranform_obs}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft colSpan={2}>
                      <Stack direction="row" alignItems="center">
                        <FormControlLabel
                          name="regante_classe_A"
                          label={
                            <Typography
                              fontFamily="candara"
                            >
                              Regante de Classe A
                            </Typography>
                          }
                          aria-readonly
                          control={
                            <Checkbox
                              checked={book.regante_classe_A}
                              value={book.regante_classe_A}
                              onChange={onInputChange}
                              sx={{
                                color: "#aaaaaa",
                                "&.Mui-checked": {
                                  color: "#C94F1E",
                                },
                              }}
                            />
                          }
                        />
                      </Stack>
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft rowSpan={3} colSpan={2}>
                      Área Regada(ha):
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft rowSpan={3}>
                      <CustomTextField
                        name="area_regada"
                        value={book.area_regada}
                        onChange={onInputChange}
                        error={error_area_regada}
                        helperText={error_area_regada ? message_apenas_numero : ""}
                      />
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft rowSpan={3}>
                      Título de regante nº:
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft rowSpan={3} sx={{ width: 100 }}>
                      <CustomTextField
                        name="titulo_regante"
                        value={book.titulo_regante}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft rowSpan={3} colSpan={2}>
                      Data do contrato com a ERR
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft rowSpan={3} colSpan={3}>
                      <TextField
                        type="date"
                        name="data_contrato_ERR"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{ style: { fontSize: 12 } }}
                        value={book.data_contrato_ERR}
                        onChange={(e: any) => onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft colSpan={2}>
                      <Stack direction="row" alignItems="center" width={180}>
                        <FormControlLabel
                          name="regante_classe_B_plus"
                          label={
                            <Typography fontFamily="candara">
                              Regante de Classe B+
                            </Typography>
                          }
                          aria-readonly
                          control={
                            <Checkbox
                              checked={book.regante_classe_B_plus}
                              value={book.regante_classe_B_plus}
                              onChange={onInputChange}
                              sx={{
                                color: "#aaaaaa",
                                "&.Mui-checked": {
                                  color: "#C94F1E",
                                },
                              }}
                            />
                          }
                        />
                      </Stack>
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft colSpan={2}>
                      <Stack direction="row" alignItems="center">
                        <FormControlLabel
                          name="regante_classe_B"
                          label={
                            <Typography fontFamily="candara">
                              Regante de Classe B
                            </Typography>
                          }
                          aria-readonly
                          control={
                            <Checkbox
                              checked={book.regante_classe_B}
                              value={book.regante_classe_B}
                              onChange={onInputChange}
                              sx={{
                                color: "#aaaaaa",
                                "&.Mui-checked": {
                                  color: "#C94F1E",
                                },
                              }}
                            />
                          }
                        />
                      </Stack>
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={12}></TableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead colSpan={12}>
                      Efetivo pecuário (CN):
                      <BasicPopover
                        text={
                          "Preencher com as diferentes espécies pecuárias que se encontrem em AB ou PRODI, independentemente que se encontrem candidatas a apoio (AB) ou não.\n\nNo caso de o beneficiário deter outras espécies diferentes das elencadas ou deter animais em PRODI, deverá acrescentar esses animais neste campo.\n\nIndíce de conversão de cabeças naturais em cabeças normais (CN)\nBovinos com mais de 2 anos - 1,0\nBovinos de 6 meses a 2 anos - 0,6\nBovinos com menos de 6 meses - 0,4"
                        }
                      />
                    </StyledTableHead>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Bovinos em conversão AB:
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="bovinos_conversao_AB"
                        value={book.bovinos_conversao_AB}
                        onChange={onInputChange}
                        error={error_bovinos_conversao_AB}
                        helperText={error_bovinos_conversao_AB ? message_apenas_numero : ""}
                      />
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      Bovinos em manutenção AB:
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="bovinos_manutencao_AB"
                        value={book.bovinos_manutencao_AB}
                        onChange={onInputChange}
                        error={error_bovinos_manutencao_AB}
                        helperText={error_bovinos_manutencao_AB ? message_apenas_numero : ""}
                      />
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      Ovinos em conversão AB:
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="ovinos_conversao_AB"
                        value={book.ovinos_conversao_AB}
                        onChange={onInputChange}
                        error={error_ovinos_conversao_AB}
                        helperText={error_ovinos_conversao_AB ? message_apenas_numero : ""}
                      />
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      Ovinos em manutenção AB:
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="ovinos_manutencao_AB"
                        value={book.ovinos_manutencao_AB}
                        onChange={onInputChange}
                        error={error_ovinos_manutencao_AB}
                        helperText={error_ovinos_manutencao_AB ? message_apenas_numero : ""}
                      />
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      Caprinos em conversão AB:
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="caprinos_conversao_AB"
                        value={book.caprinos_conversao_AB}
                        onChange={onInputChange}
                        error={error_caprinos_conversao_AB}
                        helperText={error_caprinos_conversao_AB ? message_apenas_numero : ""}
                      />
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      Caprinos em manutenção AB:
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft width="80">
                      <CustomTextField
                        name="caprinos_manutencao_AB"
                        value={book.caprinos_manutencao_AB}
                        onChange={onInputChange}
                        error={error_caprinos_manutencao_AB}
                        helperText={error_caprinos_manutencao_AB ? message_apenas_numero : ""}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Outras espécies conversão AB:
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="outras_espe_conver_AB"
                        value={book.outras_espe_conver_AB}
                        onChange={onInputChange}
                        error={error_outras_espe_conver_AB}
                        helperText={error_outras_espe_conver_AB ? message_apenas_numero : ""}
                      />
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      Outras espécies manutenção AB:
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="outras_esp_manu_AB"
                        value={book.outras_esp_manu_AB}
                        onChange={onInputChange}
                        error={error_outras_esp_manu_AB}
                        helperText={error_outras_esp_manu_AB ? message_apenas_numero : ""}
                      />
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      Bovinos PRODI:
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="bovinos_PRODI"
                        value={book.bovinos_PRODI}
                        onChange={onInputChange}
                        error={error_bovinos_PRODI}
                        helperText={error_bovinos_PRODI ? message_apenas_numero : ""}
                      />
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      Ovinos PRODI:
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="ovinos_PRODI"
                        value={book.ovinos_PRODI}
                        onChange={onInputChange}
                        error={error_ovinos_PRODI}
                        helperText={error_ovinos_PRODI ? message_apenas_numero : ""}
                      />
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      Caprinos PRODI:
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="caprinos_PRODI"
                        value={book.caprinos_PRODI}
                        onChange={onInputChange}
                        error={error_caprinos_PRODI}
                        helperText={error_caprinos_PRODI ? message_apenas_numero : ""}
                      />
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      Outras espécies PRODI:
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      <CustomTextField
                        name="outras_esp_PRODI"
                        value={book.outras_esp_PRODI}
                        onChange={onInputChange}
                        error={error_outras_esp_PRODI}
                        helperText={error_outras_esp_PRODI ? message_apenas_numero : ""}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={12}></TableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableHead colSpan={2}>
                      <Stack
                        direction="row"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        DRAP a que pertence:
                        <BasicPopover
                          text={
                            "Identificar a Direção Regional de Agricultura e Pescas em cuja área de influência se localiza a sede da exploração."
                          }
                        />
                      </Stack>
                    </StyledTableHead>
                    <StyledTableCellBaseLeft colSpan={10}>
                      <CustomTextField
                        name="drap"
                        value={book.drap}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Assistência técnica em AB:
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft colSpan={3}>
                      <CustomTextField
                        name="assistencia_tec_AB"
                        value={book.assistencia_tec_AB}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      Assistência técnica em PRODI:
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft colSpan={3}>
                      <CustomTextField
                        name="assistencia_tec_PRODI"
                        value={book.assistencia_tec_PRODI}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      Assistência técnica Maneio Pastagem Permanente:2
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft colSpan={3}>
                      <CustomTextField
                        name="assistencia_tec_past_permanente"
                        value={book.assistencia_tec_past_permanente}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>

                  <TableRow>
                    <StyledTableCellBaseLeft>
                      <Stack direction="row" justifyContent="right">
                        <BasicPopover
                          text={
                            "Identificação do OC - Organismo de Controle e Certificação que efetua as ações de controlo durante todo o ciclo produtivo. \nA lista de OC encontra-se disponível na página da DGADR."
                          }
                        />
                      </Stack>
                      Identificação do OC (AB):
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft colSpan={3}>
                      <CustomTextField
                        name="indentificacao_OC_AB"
                        value={book.indentificacao_OC_AB}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      <Stack direction="row" justifyContent="right">
                        <BasicPopover
                          text={
                            "Identificação do OC - Organismo de Controle e Certificação que efetua as ações de controlo durante todo o ciclo produtivo. \nA lista de OC encontra-se disponível na página da DGADR."
                          }
                        />
                      </Stack>
                      Identificação do OC (PRODI):
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft colSpan={3}>
                      <CustomTextField
                        name="indentificacao_OC_PRODI"
                        value={book.indentificacao_OC_PRODI}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft>
                      <Stack direction="row" justifyContent="right">
                        <BasicPopover
                          text={
                            "Identificação do OC - Organismo de Controle e Certificação que efetua as ações de controlo durante todo o ciclo produtivo. \nA lista de OC encontra-se disponível na página da DGADR."
                          }
                        />
                      </Stack>
                      Identificação do OC (PP biodiversas):
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft colSpan={3}>
                      <CustomTextField
                        name="indentificacao_OC_PP_biod"
                        value={book.indentificacao_OC_PP_biod}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellBaseLeft>
                      Identificação da ERR:
                    </StyledTableCellBaseLeft>
                    <StyledTableCellBaseLeft colSpan={3}>
                      <CustomTextField
                        name="identificacao_ERR"
                        value={book.identificacao_ERR}
                        onChange={onInputChange}
                      />
                    </StyledTableCellBaseLeft>
                  </TableRow>
                </TableBody>
              </table>
            </TableContainer>
            <Box height={10}></Box>
          </>
        )}
      </div>
    </CustomThemeProvider>
  );
};
