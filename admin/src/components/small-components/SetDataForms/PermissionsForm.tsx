import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import * as UserService from "./../../../services/user.service";

interface PermissionsFormProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleUploadData: (data: any) => void;
  uid: string;
}

export const PermissionsForm: React.FC<PermissionsFormProps> = ({
  openDialog,
  handleCloseDialog,
  handleUploadData,
  uid,
}): JSX.Element => {
  const [permissions, setPermissions] = useState<any>({});
  const [loaded, setLoaded] = useState<boolean>(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, propertyName: string) => {
      const newPermissions = { ...permissions };
      newPermissions[propertyName] = event.target.checked ? 1 : 0;
      setPermissions(newPermissions);
    },
    [permissions]
  );

  const onSubmit = useCallback(() => {
    handleUploadData(permissions);
    handleCloseDialog();
  }, [permissions]);

  useEffect(() => {
    if (!loaded) {
      const response = UserService.getUserPermissions(uid).then(
        (response) => {
          const { status, useruid, error, info, message, ...onlyPermissions } =
            response.data;
          setPermissions(onlyPermissions);
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

  if (!permissions) {
    return <></>;
  }

  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Permissions</DialogTitle>
        <DialogContent>
          <FormGroup>
            {permissions &&
              Object.entries(permissions).map((permission, index) => {
                return (
                  <FormControlLabel
                    key={index + "_FormControlLabel"}
                    control={
                      <Switch
                        checked={permission[1] === 1}
                        onChange={(event) => {
                          handleChange(event, permission[0]);
                        }}
                      />
                    }
                    label={permission[0]}
                  />
                );
              })}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={onSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
