import React, { ChangeEvent, SetStateAction, useState } from "react";

import { Box, Divider, Stack } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";

// import dayjs, { Dayjs } from "dayjs";

import { ButtonCadernos } from "../../../Components/barra-de-ferramentas/ButtonCadernos";
import { StyledTableHeadLeft } from "../../../Styles/tabelCellStyled/customTableCell";
import { StyledTableCell } from "../../../Styles/tabelCellStyled/customTableCell";
import { CustomTextField } from "../../../Styles/theme/customThemeprovider";
import BasicPopover from "../../../Components/Popover";
import { IPage6 } from "../../../Interfaces/cadernos/caderno6";

export interface ITableRegaProps {
  tabelas: IPage6[];
  setTabelas: React.Dispatch<SetStateAction<IPage6[]>>
  updateCreateTable: () => void;
  onSaveEdit: (callback: () => void) => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setEditRow: React.Dispatch<React.SetStateAction<boolean>>;
  editRow: boolean;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  editingId: number | null;
  onDelete: (id: number) => void;
  error_capacidade_utili: boolean;
  error_reserva_facilmente_utiliz: boolean;
  error_semana_n: boolean;
  error_prefundidad_radi_camp_1: boolean;
  error_prefundidad_radi_camp_2: boolean;
  error_prefundidad_radi_camp_3: boolean;
  error_prefundidad_radi_camp_4: boolean;
  error_prefundidad_radi_camp_5: boolean;
  error_prefundidad_radi_camp_6: boolean;
  error_prefundidad_radi_camp_7: boolean;
  error_capacidade_campo_camp_1: boolean;
  error_capacidade_campo_camp_2: boolean;
  error_capacidade_campo_camp_3: boolean;
  error_capacidade_campo_camp_4: boolean;
  error_capacidade_campo_camp_5: boolean;
  error_capacidade_campo_camp_6: boolean;
  error_capacidade_campo_camp_7: boolean;
  error_teor_crit_cul_camp_1: boolean;
  error_teor_crit_cul_camp_2: boolean;
  error_teor_crit_cul_camp_3: boolean;
  error_teor_crit_cul_camp_4: boolean;
  error_teor_crit_cul_camp_5: boolean;
  error_teor_crit_cul_camp_6: boolean;
  error_teor_crit_cul_camp_7: boolean;
  error_teor_agua_inicio_camp_1: boolean;
  error_teor_agua_inicio_camp_2: boolean;
  error_teor_agua_inicio_camp_3: boolean;
  error_teor_agua_inicio_camp_4: boolean;
  error_teor_agua_inicio_camp_5: boolean;
  error_teor_agua_inicio_camp_6: boolean;
  error_teor_agua_inicio_camp_7: boolean;
  error_eto_camp_1: boolean;
  error_eto_camp_2: boolean;
  error_eto_camp_3: boolean;
  error_eto_camp_4: boolean;
  error_eto_camp_5: boolean;
  error_eto_camp_6: boolean;
  error_eto_camp_7: boolean;
  error_kc_camp_1: boolean;
  error_kc_camp_2: boolean;
  error_kc_camp_3: boolean;
  error_kc_camp_4: boolean;
  error_kc_camp_5: boolean;
  error_kc_camp_6: boolean;
  error_kc_camp_7: boolean;
  error_etc_camp_1: boolean;
  error_etc_camp_2: boolean;
  error_etc_camp_3: boolean;
  error_etc_camp_4: boolean;
  error_etc_camp_5: boolean;
  error_etc_camp_6: boolean;
  error_etc_camp_7: boolean;
  error_precipita_t_camp_1: boolean;
  error_precipita_t_camp_2: boolean;
  error_precipita_t_camp_3: boolean;
  error_precipita_t_camp_4: boolean;
  error_precipita_t_camp_5: boolean;
  error_precipita_t_camp_6: boolean;
  error_precipita_t_camp_7: boolean;
  error_variacao_agu_camp_1: boolean;
  error_variacao_agu_camp_2: boolean;
  error_variacao_agu_camp_3: boolean;
  error_variacao_agu_camp_4: boolean;
  error_variacao_agu_camp_5: boolean;
  error_variacao_agu_camp_6: boolean;
  error_variacao_agu_camp_7: boolean;
  error_teor_agua_solo_s_rega_camp_1: boolean;
  error_teor_agua_solo_s_rega_camp_2: boolean;
  error_teor_agua_solo_s_rega_camp_3: boolean;
  error_teor_agua_solo_s_rega_camp_4: boolean;
  error_teor_agua_solo_s_rega_camp_5: boolean;
  error_teor_agua_solo_s_rega_camp_6: boolean;
  error_teor_agua_solo_s_rega_camp_7: boolean;
  error_leitura_sonda_1_camp_1: boolean;
  error_leitura_sonda_1_camp_2: boolean;
  error_leitura_sonda_1_camp_3: boolean;
  error_leitura_sonda_1_camp_4: boolean;
  error_leitura_sonda_1_camp_5: boolean;
  error_leitura_sonda_1_camp_6: boolean;
  error_leitura_sonda_1_camp_7: boolean;
  error_leitura_sonda_2_camp_1: boolean;
  error_leitura_sonda_2_camp_2: boolean;
  error_leitura_sonda_2_camp_3: boolean;
  error_leitura_sonda_2_camp_4: boolean;
  error_leitura_sonda_2_camp_5: boolean;
  error_leitura_sonda_2_camp_6: boolean;
  error_leitura_sonda_2_camp_7: boolean;
  error_folga_prox_rega_camp_1: boolean;
  error_folga_prox_rega_camp_2: boolean;
  error_folga_prox_rega_camp_3: boolean;
  error_folga_prox_rega_camp_4: boolean;
  error_folga_prox_rega_camp_5: boolean;
  error_folga_prox_rega_camp_6: boolean;
  error_folga_prox_rega_camp_7: boolean;
  error_rega_leitura_camp_1: boolean;
  error_rega_leitura_camp_2: boolean;
  error_rega_leitura_camp_3: boolean;
  error_rega_leitura_camp_4: boolean;
  error_rega_leitura_camp_5: boolean;
  error_rega_leitura_camp_6: boolean;
  error_rega_leitura_camp_7: boolean;
  error_rega_dose_total_camp_1: boolean;
  error_rega_dose_total_camp_2: boolean;
  error_rega_dose_total_camp_3: boolean;
  error_rega_dose_total_camp_4: boolean;
  error_rega_dose_total_camp_5: boolean;
  error_rega_dose_total_camp_6: boolean;
  error_rega_dose_total_camp_7: boolean;
  error_rega_dose_util_camp_1: boolean;
  error_rega_dose_util_camp_2: boolean;
  error_rega_dose_util_camp_3: boolean;
  error_rega_dose_util_camp_4: boolean;
  error_rega_dose_util_camp_5: boolean;
  error_rega_dose_util_camp_6: boolean;
  error_rega_dose_util_camp_7: boolean;
  error_teor_agua_solo_1_camp_1: boolean;
  error_teor_agua_solo_1_camp_2: boolean;
  error_teor_agua_solo_1_camp_3: boolean;
  error_teor_agua_solo_1_camp_4: boolean;
  error_teor_agua_solo_1_camp_5: boolean;
  error_teor_agua_solo_1_camp_6: boolean;
  error_teor_agua_solo_1_camp_7: boolean;
  error_perda_agua_camp_1: boolean;
  error_perda_agua_camp_2: boolean;
  error_perda_agua_camp_3: boolean;
  error_perda_agua_camp_4: boolean;
  error_perda_agua_camp_5: boolean;
  error_perda_agua_camp_6: boolean;
  error_perda_agua_camp_7: boolean;
  error_ident_camp2: boolean;
  error_ident_camp4: boolean;
}

export const TabelaCalendarioRega: React.FC<ITableRegaProps> = ({
  tabelas,
  setTabelas,
  updateCreateTable,
  onSaveEdit,
  onInputChange,
  setEditRow,
  editRow,
  setEditingId,
  editingId,
  onDelete,
  error_capacidade_utili,
  error_reserva_facilmente_utiliz,
  error_semana_n,
  error_prefundidad_radi_camp_1,
  error_prefundidad_radi_camp_2,
  error_prefundidad_radi_camp_3,
  error_prefundidad_radi_camp_4,
  error_prefundidad_radi_camp_5,
  error_prefundidad_radi_camp_6,
  error_prefundidad_radi_camp_7,
  error_capacidade_campo_camp_1,
  error_capacidade_campo_camp_2,
  error_capacidade_campo_camp_3,
  error_capacidade_campo_camp_4,
  error_capacidade_campo_camp_5,
  error_capacidade_campo_camp_6,
  error_capacidade_campo_camp_7,
  error_teor_crit_cul_camp_1,
  error_teor_crit_cul_camp_2,
  error_teor_crit_cul_camp_3,
  error_teor_crit_cul_camp_4,
  error_teor_crit_cul_camp_5,
  error_teor_crit_cul_camp_6,
  error_teor_crit_cul_camp_7,
  error_teor_agua_inicio_camp_1,
  error_teor_agua_inicio_camp_2,
  error_teor_agua_inicio_camp_3,
  error_teor_agua_inicio_camp_4,
  error_teor_agua_inicio_camp_5,
  error_teor_agua_inicio_camp_6,
  error_teor_agua_inicio_camp_7,
  error_eto_camp_1,
  error_eto_camp_2,
  error_eto_camp_3,
  error_eto_camp_4,
  error_eto_camp_5,
  error_eto_camp_6,
  error_eto_camp_7,
  error_kc_camp_1,
  error_kc_camp_2,
  error_kc_camp_3,
  error_kc_camp_4,
  error_kc_camp_5,
  error_kc_camp_6,
  error_kc_camp_7,
  error_etc_camp_1,
  error_etc_camp_2,
  error_etc_camp_3,
  error_etc_camp_4,
  error_etc_camp_5,
  error_etc_camp_6,
  error_etc_camp_7,
  error_precipita_t_camp_1,
  error_precipita_t_camp_2,
  error_precipita_t_camp_3,
  error_precipita_t_camp_4,
  error_precipita_t_camp_5,
  error_precipita_t_camp_6,
  error_precipita_t_camp_7,
  error_variacao_agu_camp_1,
  error_variacao_agu_camp_2,
  error_variacao_agu_camp_3,
  error_variacao_agu_camp_4,
  error_variacao_agu_camp_5,
  error_variacao_agu_camp_6,
  error_variacao_agu_camp_7,
  error_teor_agua_solo_s_rega_camp_1,
  error_teor_agua_solo_s_rega_camp_2,
  error_teor_agua_solo_s_rega_camp_3,
  error_teor_agua_solo_s_rega_camp_4,
  error_teor_agua_solo_s_rega_camp_5,
  error_teor_agua_solo_s_rega_camp_6,
  error_teor_agua_solo_s_rega_camp_7,
  error_leitura_sonda_1_camp_1,
  error_leitura_sonda_1_camp_2,
  error_leitura_sonda_1_camp_3,
  error_leitura_sonda_1_camp_4,
  error_leitura_sonda_1_camp_5,
  error_leitura_sonda_1_camp_6,
  error_leitura_sonda_1_camp_7,
  error_leitura_sonda_2_camp_1,
  error_leitura_sonda_2_camp_2,
  error_leitura_sonda_2_camp_3,
  error_leitura_sonda_2_camp_4,
  error_leitura_sonda_2_camp_5,
  error_leitura_sonda_2_camp_6,
  error_leitura_sonda_2_camp_7,
  error_folga_prox_rega_camp_1,
  error_folga_prox_rega_camp_2,
  error_folga_prox_rega_camp_3,
  error_folga_prox_rega_camp_4,
  error_folga_prox_rega_camp_5,
  error_folga_prox_rega_camp_6,
  error_folga_prox_rega_camp_7,
  error_rega_leitura_camp_1,
  error_rega_leitura_camp_2,
  error_rega_leitura_camp_3,
  error_rega_leitura_camp_4,
  error_rega_leitura_camp_5,
  error_rega_leitura_camp_6,
  error_rega_leitura_camp_7,
  error_rega_dose_total_camp_1,
  error_rega_dose_total_camp_2,
  error_rega_dose_total_camp_3,
  error_rega_dose_total_camp_4,
  error_rega_dose_total_camp_5,
  error_rega_dose_total_camp_6,
  error_rega_dose_total_camp_7,
  error_rega_dose_util_camp_1,
  error_rega_dose_util_camp_2,
  error_rega_dose_util_camp_3,
  error_rega_dose_util_camp_4,
  error_rega_dose_util_camp_5,
  error_rega_dose_util_camp_6,
  error_rega_dose_util_camp_7,
  error_teor_agua_solo_1_camp_1,
  error_teor_agua_solo_1_camp_2,
  error_teor_agua_solo_1_camp_3,
  error_teor_agua_solo_1_camp_4,
  error_teor_agua_solo_1_camp_5,
  error_teor_agua_solo_1_camp_6,
  error_teor_agua_solo_1_camp_7,
  error_perda_agua_camp_1,
  error_perda_agua_camp_2,
  error_perda_agua_camp_3,
  error_perda_agua_camp_4,
  error_perda_agua_camp_5,
  error_perda_agua_camp_6,
  error_perda_agua_camp_7,
  error_ident_camp2,
  error_ident_camp4,
}) => {

  const message_apenas_numero = ("Apenas números são aceites");

  /********** EDITAR LINHA *************/
  const handleEdit = (id: number | null) => {
    setEditingId(id);
    setEditRow(true);
  };

  return (
    <>
      {tabelas.map((tab, key) => {
        return (
          <React.Fragment key={key}>
            {editingId === tab.id_registo_rega &&
              editRow ?
              <>
                <TableRow>
                  <TableCell colSpan={8}>
                    <Box sx={{ justifyContent: "end", display: "flex" }}>
                      <ButtonCadernos
                        mostrarBotaoGravar
                        aoClicarGravar={() =>
                          onSaveEdit(updateCreateTable)
                        }
                        mostrarBotaoCancelar
                        aoClicarCancelar={() => setEditRow(false)}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    Capacidade utilizável (m3/m3):
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="capacidade_utili"
                      value={tab.capacidade_utili}
                      onChange={onInputChange}
                      error={error_capacidade_utili}
                      helperText={error_capacidade_utili ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <TableCell></TableCell>
                  <StyledTableHeadLeft>
                    Eficiência da rega:
                  </StyledTableHeadLeft>
                  <TableCell></TableCell>
                  <StyledTableHeadLeft> mês:</StyledTableHeadLeft>
                  <TableCell></TableCell>
                  <StyledTableHeadLeft>Semana n.º:</StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft> Reserva facilmente utilizável (m3/m3): </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      value={tab.reserva_facilmente_utiliz}
                      name="reserva_facilmente_utiliz"
                      onChange={onInputChange}
                      error={error_reserva_facilmente_utiliz}
                      helperText={error_reserva_facilmente_utiliz ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <TableCell></TableCell>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      value={tab.eficiencia_rega}
                      name="eficiencia_rega"
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <TableCell></TableCell>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="mes"
                      value={tab.mes}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <TableCell></TableCell>
                  <StyledTableHeadLeft>
                    <Stack direction="row" justifyContent="start">
                      <CustomTextField
                        name="semana_n"
                        value={tab.semana_n}
                        onChange={onInputChange}
                        error={error_semana_n}
                        helperText={error_semana_n ? message_apenas_numero : ""}
                      />
                      <Box margin={-1} padding={0}>
                        <BasicPopover
                          text={"Preencher com o n.º da semana ao qual\n diz respeito o calendário de rega e ano cívil"}
                        />
                      </Box>
                    </Stack>
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    <Stack direction="row" justifyContent="end" alignItems="center">
                      Data
                      <BasicPopover
                        text={"Identificar, em cada um dos campos seguintes o dia da semana, dia do mês e mês"}
                      />
                    </Stack>
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft> {"SSS D MMM"} </StyledTableHeadLeft>
                  <StyledTableHeadLeft> {"SSS D MMM"} </StyledTableHeadLeft>
                  <StyledTableHeadLeft> {"SSS D MMM"} </StyledTableHeadLeft>
                  <StyledTableHeadLeft> {"SSS D MMM"} </StyledTableHeadLeft>
                  <StyledTableHeadLeft> {"SSS D MMM"} </StyledTableHeadLeft>
                  <StyledTableHeadLeft> {"SSS D MMM"} </StyledTableHeadLeft>
                  <StyledTableHeadLeft> {"SSS D MMM"} </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>  DIA DO CICLO VEGETATIVO </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="date_camp_1"
                      value={tab.date_camp_1}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="date_camp_2"
                      value={tab.date_camp_2}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="date_camp_3"
                      value={tab.date_camp_3}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="date_camp_4"
                      value={tab.date_camp_4}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="date_camp_5"
                      value={tab.date_camp_5}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="date_camp_6"
                      value={tab.date_camp_6}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="date_camp_7"
                      value={tab.date_camp_7}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft> PROFUNDIDADE RADICULAR (m) </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="prefundidad_radi_camp_1"
                      value={tab.prefundidad_radi_camp_1}
                      onChange={onInputChange}
                      error={error_prefundidad_radi_camp_1}
                      helperText={error_prefundidad_radi_camp_1 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="prefundidad_radi_camp_2"
                      value={tab.prefundidad_radi_camp_2}
                      onChange={onInputChange}
                      error={error_prefundidad_radi_camp_2}
                      helperText={error_prefundidad_radi_camp_2 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="prefundidad_radi_camp_3"
                      value={tab.prefundidad_radi_camp_3}
                      onChange={onInputChange}
                      error={error_prefundidad_radi_camp_3}
                      helperText={error_prefundidad_radi_camp_3 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="prefundidad_radi_camp_4"
                      value={tab.prefundidad_radi_camp_4}
                      onChange={onInputChange}
                      error={error_prefundidad_radi_camp_4}
                      helperText={error_prefundidad_radi_camp_4 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="prefundidad_radi_camp_5"
                      value={tab.prefundidad_radi_camp_5}
                      onChange={onInputChange}
                      error={error_prefundidad_radi_camp_5}
                      helperText={error_prefundidad_radi_camp_5 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="prefundidad_radi_camp_6"
                      value={tab.prefundidad_radi_camp_6}
                      onChange={onInputChange}
                      error={error_prefundidad_radi_camp_6}
                      helperText={error_prefundidad_radi_camp_6 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="prefundidad_radi_camp_7"
                      value={tab.prefundidad_radi_camp_7}
                      onChange={onInputChange}
                      error={error_prefundidad_radi_camp_7}
                      helperText={error_prefundidad_radi_camp_7 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>  CAPACIDADE DE CAMPO (mm) </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="capacidade_campo_camp_1"
                      value={tab.capacidade_campo_camp_1}
                      onChange={onInputChange}
                      error={error_capacidade_campo_camp_1}
                      helperText={error_capacidade_campo_camp_1 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="capacidade_campo_camp_2"
                      value={tab.capacidade_campo_camp_2}
                      onChange={onInputChange}
                      error={error_capacidade_campo_camp_2}
                      helperText={error_capacidade_campo_camp_2 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="capacidade_campo_camp_3"
                      value={tab.capacidade_campo_camp_3}
                      onChange={onInputChange}
                      error={error_capacidade_campo_camp_3}
                      helperText={error_capacidade_campo_camp_3 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="capacidade_campo_camp_4"
                      value={tab.capacidade_campo_camp_4}
                      onChange={onInputChange}
                      error={error_capacidade_campo_camp_4}
                      helperText={error_capacidade_campo_camp_4 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="capacidade_campo_camp_5"
                      value={tab.capacidade_campo_camp_5}
                      onChange={onInputChange}
                      error={error_capacidade_campo_camp_5}
                      helperText={error_capacidade_campo_camp_5 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="capacidade_campo_camp_6"
                      value={tab.capacidade_campo_camp_6}
                      onChange={onInputChange}
                      error={error_capacidade_campo_camp_6}
                      helperText={error_capacidade_campo_camp_6 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="capacidade_campo_camp_7"
                      value={tab.capacidade_campo_camp_7}
                      onChange={onInputChange}
                      error={error_capacidade_campo_camp_7}
                      helperText={error_capacidade_campo_camp_7 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft> TEOR CRÍTICO CULTURAL (mm) </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_crit_cul_camp_1"
                      value={tab.teor_crit_cul_camp_1}
                      onChange={onInputChange}
                      error={error_teor_crit_cul_camp_1}
                      helperText={error_teor_crit_cul_camp_1 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_crit_cul_camp_2"
                      value={tab.teor_crit_cul_camp_2}
                      onChange={onInputChange}
                      error={error_teor_crit_cul_camp_2}
                      helperText={error_teor_crit_cul_camp_2 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_crit_cul_camp_3"
                      value={tab.teor_crit_cul_camp_3}
                      onChange={onInputChange}
                      error={error_teor_crit_cul_camp_3}
                      helperText={error_teor_crit_cul_camp_3 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_crit_cul_camp_4"
                      value={tab.teor_crit_cul_camp_4}
                      onChange={onInputChange}
                      error={error_teor_crit_cul_camp_4}
                      helperText={error_teor_crit_cul_camp_4 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_crit_cul_camp_5"
                      value={tab.teor_crit_cul_camp_5}
                      onChange={onInputChange}
                      error={error_teor_crit_cul_camp_5}
                      helperText={error_teor_crit_cul_camp_5 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_crit_cul_camp_6"
                      value={tab.teor_crit_cul_camp_6}
                      onChange={onInputChange}
                      error={error_teor_crit_cul_camp_6}
                      helperText={error_teor_crit_cul_camp_6 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_crit_cul_camp_7"
                      value={tab.teor_crit_cul_camp_7}
                      onChange={onInputChange}
                      error={error_teor_crit_cul_camp_7}
                      helperText={error_teor_crit_cul_camp_7 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>TEOR DE ÁGUA DO SOLO - INÍCIO (mm)  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_inicio_camp_1"
                      value={tab.teor_agua_inicio_camp_1}
                      onChange={onInputChange}
                      error={error_teor_agua_inicio_camp_1}
                      helperText={error_teor_agua_inicio_camp_1 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_inicio_camp_2"
                      value={tab.teor_agua_inicio_camp_2}
                      onChange={onInputChange}
                      error={error_teor_agua_inicio_camp_2}
                      helperText={error_teor_agua_inicio_camp_2 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_inicio_camp_3"
                      value={tab.teor_agua_inicio_camp_3}
                      onChange={onInputChange}
                      error={error_teor_agua_inicio_camp_3}
                      helperText={error_teor_agua_inicio_camp_3 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_inicio_camp_4"
                      value={tab.teor_agua_inicio_camp_4}
                      onChange={onInputChange}
                      error={error_teor_agua_inicio_camp_4}
                      helperText={error_teor_agua_inicio_camp_4 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_inicio_camp_5"
                      value={tab.teor_agua_inicio_camp_5}
                      onChange={onInputChange}
                      error={error_teor_agua_inicio_camp_5}
                      helperText={error_teor_agua_inicio_camp_5 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_inicio_camp_6"
                      value={tab.teor_agua_inicio_camp_6}
                      onChange={onInputChange}
                      error={error_teor_agua_inicio_camp_6}
                      helperText={error_teor_agua_inicio_camp_6 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_inicio_camp_7"
                      value={tab.teor_agua_inicio_camp_7}
                      onChange={onInputChange}
                      error={error_teor_agua_inicio_camp_7}
                      helperText={error_teor_agua_inicio_camp_7 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>ET0 (mm)</StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="eto_camp_1"
                      value={tab.eto_camp_1}
                      onChange={onInputChange}
                      error={error_eto_camp_1}
                      helperText={error_eto_camp_1 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="eto_camp_2"
                      value={tab.eto_camp_2}
                      onChange={onInputChange}
                      error={error_eto_camp_2}
                      helperText={error_eto_camp_2 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="eto_camp_3"
                      value={tab.eto_camp_3}
                      onChange={onInputChange}
                      error={error_eto_camp_3}
                      helperText={error_eto_camp_3 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="eto_camp_4"
                      value={tab.eto_camp_4}
                      onChange={onInputChange}
                      error={error_eto_camp_4}
                      helperText={error_eto_camp_4 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="eto_camp_5"
                      value={tab.eto_camp_5}
                      onChange={onInputChange}
                      error={error_eto_camp_5}
                      helperText={error_eto_camp_5 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="eto_camp_6"
                      value={tab.eto_camp_6}
                      onChange={onInputChange}
                      error={error_eto_camp_6}
                      helperText={error_eto_camp_6 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="eto_camp_7"
                      value={tab.eto_camp_7}
                      onChange={onInputChange}
                      error={error_eto_camp_7}
                      helperText={error_eto_camp_7 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>KC</StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="kc_camp_1"
                      value={tab.kc_camp_1}
                      onChange={onInputChange}
                      error={error_kc_camp_1}
                      helperText={error_kc_camp_1 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="kc_camp_2"
                      value={tab.kc_camp_2}
                      onChange={onInputChange}
                      error={error_kc_camp_2}
                      helperText={error_kc_camp_2 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="kc_camp_3"
                      value={tab.kc_camp_3}
                      onChange={onInputChange}
                      error={error_kc_camp_3}
                      helperText={error_kc_camp_3 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="kc_camp_4"
                      value={tab.kc_camp_4}
                      onChange={onInputChange}
                      error={error_kc_camp_4}
                      helperText={error_kc_camp_4 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="kc_camp_5"
                      value={tab.kc_camp_5}
                      onChange={onInputChange}
                      error={error_kc_camp_5}
                      helperText={error_kc_camp_5 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="kc_camp_6"
                      value={tab.kc_camp_6}
                      onChange={onInputChange}
                      error={error_kc_camp_6}
                      helperText={error_kc_camp_6 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="kc_camp_7"
                      value={tab.kc_camp_7}
                      onChange={onInputChange}
                      error={error_kc_camp_7}
                      helperText={error_kc_camp_7 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>ETC (mm)</StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="etc_camp_1"
                      value={tab.etc_camp_1}
                      onChange={onInputChange}
                      error={error_etc_camp_1}
                      helperText={error_etc_camp_1 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="etc_camp_2"
                      value={tab.etc_camp_2}
                      onChange={onInputChange}
                      error={error_etc_camp_2}
                      helperText={error_etc_camp_2 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="etc_camp_3"
                      value={tab.etc_camp_3}
                      onChange={onInputChange}
                      error={error_etc_camp_3}
                      helperText={error_etc_camp_3 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="etc_camp_4"
                      value={tab.etc_camp_4}
                      onChange={onInputChange}
                      error={error_etc_camp_4}
                      helperText={error_etc_camp_4 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="etc_camp_5"
                      value={tab.etc_camp_5}
                      onChange={onInputChange}
                      error={error_etc_camp_5}
                      helperText={error_etc_camp_5 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="etc_camp_6"
                      value={tab.etc_camp_6}
                      onChange={onInputChange}
                      error={error_etc_camp_6}
                      helperText={error_etc_camp_6 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="etc_camp_7"
                      value={tab.etc_camp_7}
                      onChange={onInputChange}
                      error={error_etc_camp_7}
                      helperText={error_etc_camp_7 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft> PRECIPITAÇÃO TOTAL (mm) </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="precipita_t_camp_1"
                      value={tab.precipita_t_camp_1}
                      onChange={onInputChange}
                      error={error_precipita_t_camp_1}
                      helperText={error_precipita_t_camp_1 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="precipita_t_camp_2"
                      value={tab.precipita_t_camp_2}
                      onChange={onInputChange}
                      error={error_precipita_t_camp_2}
                      helperText={error_precipita_t_camp_2 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="precipita_t_camp_3"
                      value={tab.precipita_t_camp_3}
                      onChange={onInputChange}
                      error={error_precipita_t_camp_3}
                      helperText={error_precipita_t_camp_3 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="precipita_t_camp_4"
                      value={tab.precipita_t_camp_4}
                      onChange={onInputChange}
                      error={error_precipita_t_camp_4}
                      helperText={error_precipita_t_camp_4 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="precipita_t_camp_5"
                      value={tab.precipita_t_camp_5}
                      onChange={onInputChange}
                      error={error_precipita_t_camp_5}
                      helperText={error_precipita_t_camp_5 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="precipita_t_camp_6"
                      value={tab.precipita_t_camp_6}
                      onChange={onInputChange}
                      error={error_precipita_t_camp_6}
                      helperText={error_precipita_t_camp_6 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="precipita_t_camp_7"
                      value={tab.precipita_t_camp_7}
                      onChange={onInputChange}
                      error={error_precipita_t_camp_7}
                      helperText={error_precipita_t_camp_7 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft> VARIAÇÃO DA ÁGUA NO SOLO (mm)</StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="variacao_agu_camp_1"
                      value={tab.variacao_agu_camp_1}
                      onChange={onInputChange}
                      error={error_variacao_agu_camp_1}
                      helperText={error_variacao_agu_camp_1 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="variacao_agu_camp_2"
                      value={tab.variacao_agu_camp_2}
                      onChange={onInputChange}
                      error={error_variacao_agu_camp_2}
                      helperText={error_variacao_agu_camp_2 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="variacao_agu_camp_3"
                      value={tab.variacao_agu_camp_3}
                      onChange={onInputChange}
                      error={error_variacao_agu_camp_3}
                      helperText={error_variacao_agu_camp_3 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="variacao_agu_camp_4"
                      value={tab.variacao_agu_camp_4}
                      onChange={onInputChange}
                      error={error_variacao_agu_camp_4}
                      helperText={error_variacao_agu_camp_4 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="variacao_agu_camp_5"
                      value={tab.variacao_agu_camp_5}
                      onChange={onInputChange}
                      error={error_variacao_agu_camp_5}
                      helperText={error_variacao_agu_camp_5 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="variacao_agu_camp_6"
                      value={tab.variacao_agu_camp_6}
                      onChange={onInputChange}
                      error={error_variacao_agu_camp_6}
                      helperText={error_variacao_agu_camp_6 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="variacao_agu_camp_7"
                      value={tab.variacao_agu_camp_7}
                      onChange={onInputChange}
                      error={error_variacao_agu_camp_7}
                      helperText={error_variacao_agu_camp_7 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft> TEOR DE ÁGUA DO SOLO - SEM REGA (mm) </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_solo_s_rega_camp_1"
                      value={tab.teor_agua_solo_s_rega_camp_1}
                      onChange={onInputChange}
                      error={error_teor_agua_solo_s_rega_camp_1}
                      helperText={error_teor_agua_solo_s_rega_camp_1 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_solo_s_rega_camp_2"
                      value={tab.teor_agua_solo_s_rega_camp_2}
                      onChange={onInputChange}
                      error={error_teor_agua_solo_s_rega_camp_2}
                      helperText={error_teor_agua_solo_s_rega_camp_2 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_solo_s_rega_camp_3"
                      value={tab.teor_agua_solo_s_rega_camp_3}
                      onChange={onInputChange}
                      error={error_teor_agua_solo_s_rega_camp_3}
                      helperText={error_teor_agua_solo_s_rega_camp_3 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_solo_s_rega_camp_4"
                      value={tab.teor_agua_solo_s_rega_camp_4}
                      onChange={onInputChange}
                      error={error_teor_agua_solo_s_rega_camp_4}
                      helperText={error_teor_agua_solo_s_rega_camp_4 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_solo_s_rega_camp_5"
                      value={tab.teor_agua_solo_s_rega_camp_5}
                      onChange={onInputChange}
                      error={error_teor_agua_solo_s_rega_camp_5}
                      helperText={error_teor_agua_solo_s_rega_camp_5 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_solo_s_rega_camp_6"
                      value={tab.teor_agua_solo_s_rega_camp_6}
                      onChange={onInputChange}
                      error={error_teor_agua_solo_s_rega_camp_6}
                      helperText={error_teor_agua_solo_s_rega_camp_6 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_solo_s_rega_camp_7"
                      value={tab.teor_agua_solo_s_rega_camp_7}
                      onChange={onInputChange}
                      error={error_teor_agua_solo_s_rega_camp_7}
                      helperText={error_teor_agua_solo_s_rega_camp_7 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft> LEITURA DA SONDA (% OU kPa) </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="leitura_sonda_1_camp_1"
                      value={tab.leitura_sonda_1_camp_1}
                      onChange={onInputChange}
                      error={error_leitura_sonda_1_camp_1}
                      helperText={error_leitura_sonda_1_camp_1 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="leitura_sonda_1_camp_2"
                      value={tab.leitura_sonda_1_camp_2}
                      onChange={onInputChange}
                      error={error_leitura_sonda_1_camp_2}
                      helperText={error_leitura_sonda_1_camp_2 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="leitura_sonda_1_camp_3"
                      value={tab.leitura_sonda_1_camp_3}
                      onChange={onInputChange}
                      error={error_leitura_sonda_1_camp_3}
                      helperText={error_leitura_sonda_1_camp_3 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="leitura_sonda_1_camp_4"
                      value={tab.leitura_sonda_1_camp_4}
                      onChange={onInputChange}
                      error={error_leitura_sonda_1_camp_4}
                      helperText={error_leitura_sonda_1_camp_4 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="leitura_sonda_1_camp_5"
                      value={tab.leitura_sonda_1_camp_5}
                      onChange={onInputChange}
                      error={error_leitura_sonda_1_camp_5}
                      helperText={error_leitura_sonda_1_camp_5 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="leitura_sonda_1_camp_6"
                      value={tab.leitura_sonda_1_camp_6}
                      onChange={onInputChange}
                      error={error_leitura_sonda_1_camp_6}
                      helperText={error_leitura_sonda_1_camp_6 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="leitura_sonda_1_camp_7"
                      value={tab.leitura_sonda_1_camp_7}
                      onChange={onInputChange}
                      error={error_leitura_sonda_1_camp_7}
                      helperText={error_leitura_sonda_1_camp_7 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft> LEITURA DA SONDA (mm) </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="leitura_sonda_2_camp_1"
                      value={tab.leitura_sonda_2_camp_1}
                      onChange={onInputChange}
                      error={error_leitura_sonda_2_camp_1}
                      helperText={error_leitura_sonda_2_camp_1 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="leitura_sonda_2_camp_2"
                      value={tab.leitura_sonda_2_camp_2}
                      onChange={onInputChange}
                      error={error_leitura_sonda_2_camp_2}
                      helperText={error_leitura_sonda_2_camp_2 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="leitura_sonda_2_camp_3"
                      value={tab.leitura_sonda_2_camp_3}
                      onChange={onInputChange}
                      error={error_leitura_sonda_2_camp_3}
                      helperText={error_leitura_sonda_2_camp_3 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="leitura_sonda_2_camp_4"
                      value={tab.leitura_sonda_2_camp_4}
                      onChange={onInputChange}
                      error={error_leitura_sonda_2_camp_4}
                      helperText={error_leitura_sonda_2_camp_4 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="leitura_sonda_2_camp_5"
                      value={tab.leitura_sonda_2_camp_5}
                      onChange={onInputChange}
                      error={error_leitura_sonda_2_camp_5}
                      helperText={error_leitura_sonda_2_camp_5 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="leitura_sonda_2_camp_6"
                      value={tab.leitura_sonda_2_camp_6}
                      onChange={onInputChange}
                      error={error_leitura_sonda_2_camp_6}
                      helperText={error_leitura_sonda_2_camp_6 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="leitura_sonda_2_camp_7"
                      value={tab.leitura_sonda_2_camp_7}
                      onChange={onInputChange}
                      error={error_leitura_sonda_2_camp_7}
                      helperText={error_leitura_sonda_2_camp_7 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft> FOLGA PARA PRÓXIMA REGA (mm) </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="folga_prox_rega_camp_1"
                      value={tab.folga_prox_rega_camp_1}
                      onChange={onInputChange}
                      error={error_folga_prox_rega_camp_1}
                      helperText={error_folga_prox_rega_camp_1 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="folga_prox_rega_camp_2"
                      value={tab.folga_prox_rega_camp_2}
                      onChange={onInputChange}
                      error={error_folga_prox_rega_camp_2}
                      helperText={error_folga_prox_rega_camp_2 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="folga_prox_rega_camp_3"
                      value={tab.folga_prox_rega_camp_3}
                      onChange={onInputChange}
                      error={error_folga_prox_rega_camp_3}
                      helperText={error_folga_prox_rega_camp_3 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="folga_prox_rega_camp_4"
                      value={tab.folga_prox_rega_camp_4}
                      onChange={onInputChange}
                      error={error_folga_prox_rega_camp_4}
                      helperText={error_folga_prox_rega_camp_4 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="folga_prox_rega_camp_5"
                      value={tab.folga_prox_rega_camp_5}
                      onChange={onInputChange}
                      error={error_folga_prox_rega_camp_5}
                      helperText={error_folga_prox_rega_camp_5 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="folga_prox_rega_camp_6"
                      value={tab.folga_prox_rega_camp_6}
                      onChange={onInputChange}
                      error={error_folga_prox_rega_camp_6}
                      helperText={error_folga_prox_rega_camp_6 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="folga_prox_rega_camp_7"
                      value={tab.folga_prox_rega_camp_7}
                      onChange={onInputChange}
                      error={error_folga_prox_rega_camp_7}
                      helperText={error_folga_prox_rega_camp_7 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft> REGA - LEITURA DO CONTADOR NO FINAL (m3) </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_leitura_camp_1"
                      value={tab.rega_leitura_camp_1}
                      onChange={onInputChange}
                      error={error_rega_leitura_camp_1}
                      helperText={error_rega_leitura_camp_1 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_leitura_camp_2"
                      value={tab.rega_leitura_camp_2}
                      onChange={onInputChange}
                      error={error_rega_leitura_camp_1}
                      helperText={error_rega_leitura_camp_1 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_leitura_camp_3"
                      value={tab.rega_leitura_camp_3}
                      onChange={onInputChange}
                      error={error_rega_leitura_camp_1}
                      helperText={error_rega_leitura_camp_1 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_leitura_camp_4"
                      value={tab.rega_leitura_camp_4}
                      onChange={onInputChange}
                      error={error_rega_leitura_camp_1}
                      helperText={error_rega_leitura_camp_1 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_leitura_camp_5"
                      value={tab.rega_leitura_camp_5}
                      onChange={onInputChange}
                      error={error_rega_leitura_camp_1}
                      helperText={error_rega_leitura_camp_1 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_leitura_camp_6"
                      value={tab.rega_leitura_camp_6}
                      onChange={onInputChange}
                      error={error_rega_leitura_camp_1}
                      helperText={error_rega_leitura_camp_1 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_leitura_camp_7"
                      value={tab.rega_leitura_camp_7}
                      onChange={onInputChange}
                      error={error_rega_leitura_camp_1}
                      helperText={error_rega_leitura_camp_1 ? message_apenas_numero : ""}
                    />
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    REGA - DOSE TOTAL APLICADA (mm)
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_dose_total_camp_1"
                      value={tab.rega_dose_total_camp_1}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_dose_total_camp_2"
                      value={tab.rega_dose_total_camp_2}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_dose_total_camp_3"
                      value={tab.rega_dose_total_camp_3}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_dose_total_camp_4"
                      value={tab.rega_dose_total_camp_4}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_dose_total_camp_5"
                      value={tab.rega_dose_total_camp_5}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_dose_total_camp_6"
                      value={tab.rega_dose_total_camp_6}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_dose_total_camp_7"
                      value={tab.rega_dose_total_camp_7}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    REGA - DOSE ÚTIL (mm) – APÓS REGA
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_dose_util_camp_1"
                      value={tab.rega_dose_util_camp_1}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_dose_util_camp_2"
                      value={tab.rega_dose_util_camp_2}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_dose_util_camp_3"
                      value={tab.rega_dose_util_camp_3}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_dose_util_camp_4"
                      value={tab.rega_dose_util_camp_4}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_dose_util_camp_5"
                      value={tab.rega_dose_util_camp_5}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_dose_util_camp_6"
                      value={tab.rega_dose_util_camp_6}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="rega_dose_util_camp_7"
                      value={tab.rega_dose_util_camp_7}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    TEOR DE ÁGUA DO SOLO (mm)
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_solo_1_camp_1"
                      value={tab.teor_agua_solo_1_camp_1}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_solo_1_camp_2"
                      value={tab.teor_agua_solo_1_camp_2}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_solo_1_camp_3"
                      value={tab.teor_agua_solo_1_camp_3}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_solo_1_camp_4"
                      value={tab.teor_agua_solo_1_camp_4}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_solo_1_camp_5"
                      value={tab.teor_agua_solo_1_camp_5}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_solo_1_camp_6"
                      value={tab.teor_agua_solo_1_camp_6}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="teor_agua_solo_1_camp_7"
                      value={tab.teor_agua_solo_1_camp_7}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    PERDA DE ÁGUA (CHUVA OU REGA EXCESSIVA)
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="perda_agua_camp_1"
                      value={tab.perda_agua_camp_1}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="perda_agua_camp_2"
                      value={tab.perda_agua_camp_2}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="perda_agua_camp_3"
                      value={tab.perda_agua_camp_3}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="perda_agua_camp_4"
                      value={tab.perda_agua_camp_4}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="perda_agua_camp_5"
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="perda_agua_camp_6"
                      value={tab.perda_agua_camp_6}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    <CustomTextField
                      name="perda_agua_camp_7"
                      value={tab.perda_agua_camp_7}
                      onChange={onInputChange}
                    />
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={4}
                    sx={{
                      fontWeight: 600,
                      paddingTop: 10,
                      fontFamily: "candara",
                      fontSize: 18,
                    }}
                  >
                    PREENCHER APENAS OS CAMPOS QUE SE APLICAM
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{ fontFamily: "candara", fontSize: 16 }}
                  >
                    IDENTIFICAÇÃO DO AVISO DE REGA com sonda (Data):
                  </TableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="ident_camp1"
                      value={tab.ident_camp1}
                      onChange={onInputChange}
                    />
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{ fontFamily: "candara", fontSize: 16 }}
                  >
                    IDENTIFICAÇÃO DO AVISO DE REGA com sonda (dotação
                    recomendada m3/ha):
                  </TableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="ident_camp2"
                      value={tab.ident_camp2}
                      onChange={onInputChange}
                    />
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{ fontFamily: "candara", fontSize: 16 }}
                  >
                    IDENTIFICAÇÃO DO AVISO DE REGA com imagem satélite
                    IVDI (Data):
                  </TableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="ident_camp3"
                      value={tab.ident_camp3}
                      onChange={onInputChange}
                    />
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{ fontFamily: "candara", fontSize: 16 }}
                  >
                    IDENTIFICAÇÃO DO AVISO DE REGA com imagem satélite
                    IVDI (dotação recomendada m3/ha):
                  </TableCell>
                  <StyledTableCell>
                    <CustomTextField
                      name="ident_camp4"
                      value={tab.ident_camp4}
                      onChange={onInputChange}
                    />
                  </StyledTableCell>
                </TableRow>
              </>
              :
              <>
                <TableRow>
                  <TableCell colSpan={8}>
                    <Box
                      sx={{ justifyContent: "end", display: "flex" }}
                    >
                      <ButtonCadernos
                        mostrarBotaoEditar
                        aoClicarEditar={() =>
                          handleEdit(tab.id_registo_rega)
                        }
                        mostrarBotaoApagar
                        aoClicarApagar={() =>
                          onDelete(tab.id_registo_rega)
                        }
                      />
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow key={tab.id_registo_rega}>
                  <StyledTableHeadLeft>
                    Capacidade utilizável (m3/m3):
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.capacidade_utili}
                  </StyledTableHeadLeft>
                  <TableCell></TableCell>
                  <StyledTableHeadLeft>
                    Eficiência da rega:
                  </StyledTableHeadLeft>
                  <TableCell> </TableCell>
                  <StyledTableHeadLeft> mês:</StyledTableHeadLeft>
                  <TableCell> </TableCell>
                  <StyledTableHeadLeft>
                    Semana n.º:
                    <Box margin={-1} padding={0}>
                      <BasicPopover
                        text={
                          "Preencher com o n.º da semana ao qual diz respeito o calendário de rega e ano cívil"
                        }
                      />
                    </Box>
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    Reserva facilmente utilizável (m3/m3):
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.reserva_facilmente_utiliz}
                  </StyledTableHeadLeft>
                  <TableCell></TableCell>
                  <StyledTableHeadLeft>
                    {tab.eficiencia_rega}
                  </StyledTableHeadLeft>
                  <TableCell></TableCell>
                  <StyledTableHeadLeft>{tab.mes}</StyledTableHeadLeft>
                  <TableCell></TableCell>
                  <StyledTableHeadLeft>
                    {tab.semana_n ? tab.semana_n : "____/20xx"}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    <Stack direction="row" justifyContent="end">
                      Data
                      <Box margin={-1} padding={0}>
                        <BasicPopover
                          text={
                            "Identificar, em cada um dos campos seguintes o dia da semana, dia do mês e mês"
                          }
                        />
                      </Box>
                    </Stack>
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {"SSS D MMM"}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {"SSS D MMM"}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {"SSS D MMM"}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {"SSS D MMM"}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {"SSS D MMM"}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {"SSS D MMM"}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {"SSS D MMM"}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    <Stack direction="row" justifyContent="end">
                      DIA DO CICLO VEGETATIVO
                    </Stack>
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.date_camp_1}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.date_camp_2}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.date_camp_3}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.date_camp_4}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.date_camp_5}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.date_camp_6}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.date_camp_7}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    PROFUNDIDADE RADICULAR (m)
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.prefundidad_radi_camp_1}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.prefundidad_radi_camp_2}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.prefundidad_radi_camp_3}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.prefundidad_radi_camp_4}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.prefundidad_radi_camp_5}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.prefundidad_radi_camp_6}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.prefundidad_radi_camp_7}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    CAPACIDADE DE CAMPO (mm)
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.capacidade_campo_camp_1}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.capacidade_campo_camp_2}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.capacidade_campo_camp_3}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.capacidade_campo_camp_4}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.capacidade_campo_camp_5}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.capacidade_campo_camp_6}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.capacidade_campo_camp_7}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    TEOR CRÍTICO CULTURAL (mm)
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_crit_cul_camp_1}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_crit_cul_camp_2}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_crit_cul_camp_3}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_crit_cul_camp_4}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_crit_cul_camp_5}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_crit_cul_camp_6}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_crit_cul_camp_7}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    TEOR DE ÁGUA DO SOLO - INÍCIO (mm)
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_inicio_camp_1}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_inicio_camp_2}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_inicio_camp_3}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_inicio_camp_4}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_inicio_camp_5}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_inicio_camp_6}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_inicio_camp_7}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>ET0 (mm)</StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.eto_camp_1}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.eto_camp_2}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.eto_camp_3}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.eto_camp_4}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.eto_camp_5}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.eto_camp_6}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.eto_camp_7}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>KC</StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.kc_camp_1}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.kc_camp_2}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.kc_camp_3}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.kc_camp_4}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.kc_camp_5}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.kc_camp_6}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.kc_camp_7}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>ETC (mm)</StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.etc_camp_1}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.etc_camp_2}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.etc_camp_3}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.etc_camp_4}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.etc_camp_5}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.etc_camp_6}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.etc_camp_7}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    PRECIPITAÇÃO TOTAL (mm)
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.precipita_t_camp_1}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.precipita_t_camp_2}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.precipita_t_camp_3}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.precipita_t_camp_4}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.precipita_t_camp_5}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.precipita_t_camp_6}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.precipita_t_camp_7}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    VARIAÇÃO DA ÁGUA NO SOLO (mm)
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.variacao_agu_camp_1}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.variacao_agu_camp_2}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.variacao_agu_camp_3}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.variacao_agu_camp_4}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.variacao_agu_camp_5}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.variacao_agu_camp_6}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.variacao_agu_camp_7}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    TEOR DE ÁGUA DO SOLO - SEM REGA (mm)
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_solo_s_rega_camp_1}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_solo_s_rega_camp_2}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_solo_s_rega_camp_3}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_solo_s_rega_camp_4}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_solo_s_rega_camp_5}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_solo_s_rega_camp_6}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_solo_s_rega_camp_7}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    <Stack direction="row" justifyContent="left">
                      LEITURA DA SONDA (% OU kPa)
                      <Box margin={-1} padding={0}>
                        <BasicPopover
                          text={
                            "A ser preenchido apenas por regantes da classe A e B+."
                          }
                        />
                      </Box>
                    </Stack>
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.leitura_sonda_1_camp_1}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.leitura_sonda_1_camp_2}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.leitura_sonda_1_camp_3}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.leitura_sonda_1_camp_4}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.leitura_sonda_1_camp_5}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.leitura_sonda_1_camp_6}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.leitura_sonda_1_camp_7}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    <Stack direction="row" justifyContent="left">
                      LEITURA DA SONDA (mm)
                      <Box margin={-1} padding={0}>
                        <BasicPopover
                          text={
                            "A ser preenchido apenas por regantes da classe A e B+."
                          }
                        />
                      </Box>
                    </Stack>
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.leitura_sonda_2_camp_1}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.leitura_sonda_2_camp_2}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.leitura_sonda_2_camp_3}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.leitura_sonda_2_camp_4}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.leitura_sonda_2_camp_5}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.leitura_sonda_2_camp_6}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.leitura_sonda_2_camp_7}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    FOLGA PARA PRÓXIMA REGA (mm)
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.folga_prox_rega_camp_1}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.folga_prox_rega_camp_2}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.folga_prox_rega_camp_3}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.folga_prox_rega_camp_4}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.folga_prox_rega_camp_5}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.folga_prox_rega_camp_6}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.folga_prox_rega_camp_7}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    REGA - LEITURA DO CONTADOR NO FINAL (m3)
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_leitura_camp_1}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_leitura_camp_2}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_leitura_camp_3}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_leitura_camp_4}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_leitura_camp_5}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_leitura_camp_6}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_leitura_camp_7}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    REGA - DOSE TOTAL APLICADA (mm)
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_dose_total_camp_1}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_dose_total_camp_2}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_dose_total_camp_3}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_dose_total_camp_4}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_dose_total_camp_5}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_dose_total_camp_6}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_dose_total_camp_7}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    REGA - DOSE ÚTIL (mm) – APÓS REGA
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_dose_util_camp_1}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_dose_util_camp_2}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_dose_util_camp_3}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_dose_util_camp_4}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_dose_util_camp_5}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_dose_util_camp_6}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.rega_dose_util_camp_7}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    TEOR DE ÁGUA DO SOLO (mm)
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_solo_1_camp_1}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_solo_1_camp_2}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_solo_1_camp_3}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_solo_1_camp_4}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_solo_1_camp_5}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_solo_1_camp_6}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.teor_agua_solo_1_camp_7}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <StyledTableHeadLeft>
                    PERDA DE ÁGUA (CHUVA OU REGA EXCESSIVA)
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.perda_agua_camp_1}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.perda_agua_camp_2}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.perda_agua_camp_3}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.perda_agua_camp_4}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.perda_agua_camp_5}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.perda_agua_camp_6}
                  </StyledTableHeadLeft>
                  <StyledTableHeadLeft>
                    {tab.perda_agua_camp_7}
                  </StyledTableHeadLeft>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      paddingTop: 10,
                      fontFamily: "candara",
                      fontSize: 18,
                    }}
                  >
                    PREENCHER APENAS OS CAMPOS QUE SE APLICAM
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{ fontFamily: "candara", fontSize: 16 }}
                  >
                    <Stack direction="row" justifyContent="left">
                      IDENTIFICAÇÃO DO AVISO DE REGA com sonda (Data):
                      <Box margin={-1} padding={0}>
                        <BasicPopover
                          text={
                            "A ser preenchido apenas por regantes da classe A."
                          }
                        />
                      </Box>
                    </Stack>
                  </TableCell>
                  <StyledTableCell>{tab.ident_camp1}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{ fontFamily: "candara", fontSize: 16 }}
                  >
                    <Stack direction="row" justifyContent="left">
                      IDENTIFICAÇÃO DO AVISO DE REGA com sonda
                      (dotação recomendada m3/ha):
                      <Box margin={-1} padding={0}>
                        <BasicPopover
                          text={
                            "A ser preenchido apenas por regantes da classe A."
                          }
                        />
                      </Box>
                    </Stack>
                  </TableCell>
                  <StyledTableCell>{tab.ident_camp2}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{ fontFamily: "candara", fontSize: 16 }}
                  >
                    <Stack direction="row" justifyContent="left">
                      IDENTIFICAÇÃO DO AVISO DE REGA com imagem
                      satélite IVDI (Data):
                      <Box margin={-1} padding={0}>
                        <BasicPopover
                          text={
                            "A ser preenchido apenas por regantes da classe A."
                          }
                        />
                      </Box>
                    </Stack>
                  </TableCell>
                  <StyledTableCell>{tab.ident_camp3}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{ fontFamily: "candara", fontSize: 16 }}
                  >
                    <Stack direction="row" justifyContent="left">
                      IDENTIFICAÇÃO DO AVISO DE REGA com imagem
                      satélite IVDI (dotação recomendada m3/ha):
                      <Box margin={-1} padding={0}>
                        <BasicPopover
                          text={
                            "A ser preenchido apenas por regantes da classe A."
                          }
                        />
                      </Box>
                    </Stack>
                  </TableCell>
                  <StyledTableCell>{tab.ident_camp4}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={8}>
                    <Divider sx={{ height: 2, color: "black" }} />
                  </TableCell>
                </TableRow>
              </>
            }
          </React.Fragment>
        );
      })}
    </>
  );
};
