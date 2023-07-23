import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useState } from "react";
interface UserPasswordFormProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleUploadData: (data: any) => void;
}

export const UserPasswordForm: React.FC<UserPasswordFormProps> = ({
  openDialog,
  handleCloseDialog,
  handleUploadData,
}): JSX.Element => {
  const [passwordInput, setPasswordInput] = useState<string>("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(event.target.value);
  };

  const onSubmit = useCallback(() => {
    handleUploadData({ password: passwordInput });
    handleCloseDialog();
  }, [passwordInput]);

  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update password</DialogTitle>
        <DialogContent>
          <TextField
            value={passwordInput}
            onChange={handlePasswordChange}
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={onSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
