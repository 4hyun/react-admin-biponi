import { FC } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, styled } from "@mui/material";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": { minWidth: 400, borderRadius: "4px" },
  "& .MuiDialogTitle-root": {
    fontSize: 28,
    fontWeight: 700,
    paddingBottom: 0,
    textAlign: "center",
  },
  "& .MuiDialogContent-root": { textAlign: "center" },
  "& .MuiDialogActions-root": {
    paddingBottom: 32,
    justifyContent: "center",
    "& button": { padding: "7px 28px" },
  },
  [theme.breakpoints.down("xs")]: {
    "& .MuiPaper-root": { minWidth: "100%" },
  },
}));

// ==========================================================
type Props = {
  open: boolean;
  close: () => void;
  description?: string;
  handleConfirm: () => void;
};
// ==========================================================

const ConfirmationAlert: FC<Props> = (props) => {
  const { open, close, handleConfirm, description } = props;

  return (
    <StyledDialog open={open} onClose={close}>
      <DialogTitle>Are you sure?</DialogTitle>

      <DialogContent>{description}</DialogContent>

      <DialogActions>
        <Button onClick={close} variant="outlined">
          No
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">
          Yes
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

ConfirmationAlert.defaultProps = { description: "Want to remove this product" };

export default ConfirmationAlert;
