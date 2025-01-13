import { Box, Stack, TableCell, TableRow } from "@mui/material";
import BasicPopover from "../../../Components/Popover";
import { StyledTableHead } from "../../../Styles/tabelCellStyled/customTableCell";

export const TabelaComposicaoHead = () => {
  return (
    <>
      <TableRow>
        <TableCell
          colSpan={4}
          sx={{
            fontWeight: 600,
            textAlign: "left",
            fontFamily: "candara",
            fontSize: 16,
          }}
        >
          <Stack direction="row" justifyContent="left">
            1.4 - Composição dos fertilizantes orgânicos
            <Box margin={-1} padding={0}>
              <BasicPopover
                text={
                  "Preenchimento obrigatório apenas nos casos em que o beneficiário pretender recorrer á fertilização orgânica. Estes valores servirão de auxilio para o preenchimento do campo «Nutrientes disponibilizados por tipo de fertilizantes» do quadro 3 - Plano de Aplicação.\n\nNo caso do beneficiário ter efetuado análises, os boletins de análise devem ser mantidos pelo beneficiário por forma a serem consultados sempre que necessário pelas entidades que monitorizam, verificam a aplicação da legislação nacional aplicável no âmbito da gestão de nutrientes disponibilizados às culturas.\n\nApesar de não ser um quadro de preenchimento obrigatório para as restantes intervenções do PEPAC, o beneficiário poderá, sempre que assim o desejar, utilizar o quadro 1.2 para apoio dos cálculos de fertilização quando aplicar efluentes pecuários ou os seus derivados."
                }
              />
            </Box>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <StyledTableHead rowSpan={2} width={300}>
          Tipo de efluente pecuário ou seu equiparado (matéria fertilizante)
        </StyledTableHead>
        <StyledTableHead rowSpan={2} width={200}>
          <Stack direction="row" justifyContent="center">
            Espécie pecuária
            <Box margin={-1} padding={0}>
              <BasicPopover
                text={
                  "Preenchimento obrigatório apenas no caso de o beneficiário utilizar «estrume» ou «chorume». \n\n Admite os seguintes valores: \n - Bovino; \n  - Suíno; \n - Ovino;\n - Caprino; \n- Equino; \n - Aves;\n- Outras espécies pecuárias."
                }
              />
            </Box>
          </Stack>
        </StyledTableHead>
        <StyledTableHead colSpan={3}>
          Composição kg/t (sólidos) ou kg/m3 (líquidos) da matéria fertilizante
          <BasicPopover
            text={
              "Quando não tiverem sido efetuadas análises da  composição em nutrientes, devem ser utilizados os valores de referência para a forma disponível dos nutrientes indicados no Quadro 17 do Manual de Fertilização das Culturas do INIAV ou no Anexo VII do Código de Boas Práticas Agrícolas de 2018.\n\nQuando apenas se dispõe dos valores de azoto total, devem considerar-se as percentagens de azoto disponível ao longo dos anos constantes no Quadro 18 do Manual de Fertilização das Culturas do INIAV (2022).\n\nNo cálculo dos valores dos nutrientes na forma disponível ter em conta, ainda, o período que as culturas ocupam efetivamente no terreno: para as culturas de primavera-verão, considerar 1/3 daqueles valores; para os cereais de outono-inverno, considerar 3/4 ou 1/2; para pastagens, considerar aqueles valores na totalidade, conforme indicado no Código de Boas Práticas Agrícolas de 2018."
            }
          />
        </StyledTableHead>
        <StyledTableHead rowSpan={2}>Ações</StyledTableHead>
      </TableRow>
      <TableRow>
        <StyledTableHead width={200}>N</StyledTableHead>
        <StyledTableHead width={200}>P2O5</StyledTableHead>
        <StyledTableHead width={200}>K2O</StyledTableHead>
      </TableRow>
    </>
  );
};