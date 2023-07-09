import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useState } from "react";
interface UserProfileFormProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleUploadData: (data: any) => void;
}

export const UserProfileForm: React.FC<UserProfileFormProps> = ({
  openDialog,
  handleCloseDialog,
  handleUploadData,
}): JSX.Element => {
  const [profileInput, setProfileInput] = useState<string>("");

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfileInput(event.target.value);
  };

  const onSubmit = useCallback(() => {
    handleUploadData({ profile: profileInput });
    handleCloseDialog();
  }, [profileInput]);
  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <TextField
            value={profileInput}
            onChange={handleProfileChange}
            autoFocus
            margin="dense"
            id="profile"
            label="Profile"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={onSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
