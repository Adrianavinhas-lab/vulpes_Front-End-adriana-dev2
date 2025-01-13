import React from "react";
import { Box } from "@material-ui/core";
import { Stack, Typography } from "@mui/material";

import { useLocation } from "react-router-dom";

function Beneficiario_nome_id_alinhado_direita() {
  const location = useLocation();

  return (
    <Box
      sx={{
        fontWeight: 500,
        fontFamily: "candara",
        fontSize: 18,
        display: "flex",
        justifyContent: "end",
        // color: "#7e2706",
        m: 1,
      }}
    >
      <Stack direction="row">
        <Typography
          variant="subtitle1"
          fontWeight={500}
          fontFamily="candara"
          fontSize={18}
          marginRight={5}
        >
          Beneficiário: {location.state.nome}
        </Typography>

        <Typography
          variant="subtitle1"
          fontWeight={500}
          fontFamily="candara"
          fontSize={18}
        >
          NIF: {location.state.nif}
        </Typography>
      </Stack>
    </Box>
  );
}

export default Beneficiario_nome_id_alinhado_direita;
