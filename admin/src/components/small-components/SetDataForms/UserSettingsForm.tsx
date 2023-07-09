import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import * as UserService from "../../../services/user.service";
import { TextField } from "@mui/material";

interface UserSettingsFormProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleUploadData: (data: any) => void;
  uid: string;
}

export const UserSettingsForm: React.FC<UserSettingsFormProps> = ({
  openDialog,
  handleCloseDialog,
  handleUploadData,
  uid,
}): JSX.Element => {
  const [settings, setSettings] = useState<any>({});
  const [loaded, setLoaded] = useState<boolean>(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setSettings({
        ...settings,
        [name]:
          name === "created" || name === "updated" ? parseInt(value) : value,
      });
    },
    [settings]
  );

  const onSubmit = useCallback(() => {
    handleUploadData(settings);
    handleCloseDialog();
  }, [settings]);

  useEffect(() => {
    if (!loaded) {
      const response = UserService.getUserSettings(uid).then(
        (response) => {
          const { status, error, info, message, ...settingsProp } =
            response.data;
          setSettings(settingsProp.settings);
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

  if (!settings) {
    return <></>;
  }
  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>User Settings</DialogTitle>
        <DialogContent>
          {settings &&
            Object.keys(settings).map((property) => {
              return (
                <TextField
                  disabled={property === "useruid"}
                  fullWidth
                  margin="dense"
                  autoFocus
                  variant="standard"
                  key={property}
                  label={property}
                  name={property}
                  type={"text"}
                  value={settings[property]}
                  onChange={handleInputChange}
                />
              );
            })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={onSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
