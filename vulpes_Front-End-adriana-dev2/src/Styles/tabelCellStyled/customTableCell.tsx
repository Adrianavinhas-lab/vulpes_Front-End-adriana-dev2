import React from "react";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import { styled } from "@mui/material";

interface StyledTableCellProps extends TableCellProps { }

const StyledTableCellBase = styled(TableCell)<StyledTableCellProps>(
  ({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1, 1),
    border: "1px solid #555",
    textAlign: "center",
    fontSize: 12,
    height: "40px",
    minWidth: "100px",
    wordWrap: "break-word",
    fontFamily: "verdana",
  })
);

const StyledTableCellBaseCabecalho = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  padding: theme.spacing(1, 1),
  fontSize: 14,
  height: "40px",
  fontFamily: "candara",
  fontWeight: 600,
  textAlign:"left"
}));

const StyledTableCellBaseRight = styled(TableCell)<StyledTableCellProps>(
  ({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1, 1),
    border: "1px solid #555",
    textAlign: "right",
    fontSize: 12,
    height: "40px",
    minWidth: "100px",
    wordWrap: "break-word",
    fontFamily: "verdana",
  })
);

const StyledTableCellBaseLeftCandara = styled(TableCell)<StyledTableCellProps>(
  ({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1, 2.5),
    border: "1px solid #555",
    textAlign: "left",
    fontSize: 14,
    height: "40px",
    minWidth: "100px",
    wordWrap: "break-word",
    fontFamily: "candara",
  })
);

const StyledTableCellBseNoBorder = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  padding: theme.spacing(0, 1),
  textAlign: "center",
  height: "50px",
  fontSize: 13,
}));

const StyledTableHeadCellBase = styled(TableCell)<StyledTableCellProps>(
  ({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1, 1),
    border: "1px solid #555",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "candara",
    fontWeight: 600,
  })
);

const StyledTableHeadCellSemBorder = styled(TableCell)<StyledTableCellProps>(
  ({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    fontWeight: "bold",
    typography: theme.typography.fontWeightBold,
    padding: theme.spacing(0, 1),
    textAlign: "center",
    height: "50px",
    fontFamily: "candara",
  })
);

const StyledTableHead2 = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#f2d1c2",
  typography: theme.typography.fontWeightBold,
  padding: theme.spacing(0, 1),
  border: "1px solid #555",
  textAlign: "left",
  fontSize: 16,
  height: "40px",
  fontFamily: "candara",
  fontWeight: 600,
}));

const StyledTableHeadCellLeft = styled(TableCell)<StyledTableCellProps>(
  ({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1, 1),
    border: "1px solid #555",
    textAlign: "left",
    fontSize: 14,
    fontFamily: "candara",
    fontWeight: 600,
  })
);

export const StyledTableCell = styled(StyledTableCellBase)``;
export const StyledTableCellCabecalho = styled(StyledTableCellBaseCabecalho)``;
export const StyledTableHead = styled(StyledTableHeadCellBase)``;
export const StyledTableHeadLeft = styled(StyledTableHeadCellLeft)``;
export const StyledTableCellRight = styled(StyledTableCellBaseRight)``;
export const StyledTableCellBaseLeft = styled(StyledTableCellBaseLeftCandara)``;
export const StyledTableHeadColor = styled(StyledTableHead2)``;
export const StyledTableHeadWithoutBorder = styled(StyledTableHeadCellSemBorder)``;
export const StyledTableCellWithoutBorder = styled(StyledTableCellBseNoBorder)``;

interface CustomTableCellProps extends StyledTableCellProps {
  head?: boolean;
}

const CustomTableCell: React.FC<CustomTableCellProps> = ({
  head,
  children,
  ...props
}) => {
  const Component = head ? StyledTableHead : StyledTableCell;

  return <Component {...props}>{children}</Component>;
};

export default CustomTableCell;
