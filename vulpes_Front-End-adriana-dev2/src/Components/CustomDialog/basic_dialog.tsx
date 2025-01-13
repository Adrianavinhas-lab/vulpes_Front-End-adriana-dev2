import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface BasicDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const BasicDialog: FC<BasicDialogProps> = ({
  open,
  onClose,
  message,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent
      sx={{
        fontFamily: "candara",
        fontSize: 18
      }}
      >{message}</DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: "#7e2706",
            fontFamily: "candara",
          }}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BasicDialog;
