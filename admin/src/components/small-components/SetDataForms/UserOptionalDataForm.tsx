import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useEffect, useState } from "react";
import * as UserService from "./../../../services/user.service";

interface UserOptionalDataFormProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleUploadData: (data: any) => void;
  uid: string;
}

export const UserOptionalDataForm: React.FC<UserOptionalDataFormProps> = ({
  openDialog,
  handleCloseDialog,
  handleUploadData,
  uid,
}): JSX.Element => {
  const [optionalData, setOptionalData] = useState<any>({
    created: 0,
    updated: 0,
    userName: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    state: "",
    ZIP: "",
    phone1: "",
    phone2: "",
    email1: "",
    email2: "",
    messager1: "",
    messager2: "",
    companyName: "",
    type: 0,
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setOptionalData({
        ...optionalData,
        [name]:
          name === "created" || name === "updated" ? parseInt(value) : value,
      });
    },
    [optionalData]
  );

  const onSubmit = useCallback(() => {
    handleUploadData(optionalData);
    handleCloseDialog();
  }, [optionalData]);

  /*useEffect(() => {
    if (!loaded) {
      const response = UserService.getUserExtendedInfo(uid).then(
        (response) => {
          const { status, useruid, error, info, message, ...optionalData } =
            response.data;
          setOptionalData(optionalData);
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
  }, [uid]);*/

  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Modify data</DialogTitle>
        <DialogContent>
          {optionalData &&
            Object.keys(optionalData).map((property) => {
              return (
                <TextField
                  fullWidth
                  margin="dense"
                  autoFocus
                  variant="standard"
                  key={property}
                  label={property}
                  name={property}
                  type={
                    property === "type" ||
                    property === "created" ||
                    property === "updated"
                      ? "number"
                      : "text"
                  }
                  value={optionalData[property]}
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
