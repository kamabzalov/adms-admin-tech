import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useEffect, useState } from "react";
import * as UserService from "../../../services/user.service";
interface UserProfileFormProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleUploadData: (data: any) => void;
  uid: string;
}

export const UserProfileForm: React.FC<UserProfileFormProps> = ({
  openDialog,
  handleCloseDialog,
  handleUploadData,
  uid,
}): JSX.Element => {
  const [profileInput, setProfileInput] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfileInput(event.target.value);
  };

  const onSubmit = useCallback(() => {
    handleUploadData({ profile: profileInput });
    handleCloseDialog();
  }, [profileInput]);

  useEffect(() => {
    if (!loaded) {
      const response = UserService.getUserProfile(uid).then(
        (response) => {
          if (response.data.profile) setProfileInput(response.data.profile);
          setLoaded(true);
          return response.data;
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          //setLoading(false);
          //setMessage(resMessage);
        }
      );
    }
  }, [uid]);

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
          <Button onClick={onSubmit}>Set Profile</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
