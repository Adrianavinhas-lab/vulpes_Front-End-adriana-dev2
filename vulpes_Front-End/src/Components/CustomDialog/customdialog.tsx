import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  message,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent id="alert-dialog-description">{message}</DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: "#7e2706",
            fontFamily: "candara",
          }}
        >
          Não
        </Button>
        <Button
          color="secondary"
          onClick={onConfirm}
          sx={{
            color: "#7e2706",
            fontFamily: "candara",
          }}
        >
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
