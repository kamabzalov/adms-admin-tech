import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useState } from "react";
interface CheckTokenFormProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleUploadData: (data: any) => void;
}

export const CheckTokenForm: React.FC<CheckTokenFormProps> = ({
  openDialog,
  handleCloseDialog,
  handleUploadData,
}): JSX.Element => {
  const [token, setToken] = useState<string>("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
  };

  const onSubmit = useCallback(() => {
    handleUploadData(token);
    handleCloseDialog();
  }, [token]);

  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Input token to check</DialogTitle>
        <DialogContent>
          <TextField
            value={token}
            onChange={handlePasswordChange}
            autoFocus
            margin="dense"
            id="password"
            label="token"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={onSubmit}>Check</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
