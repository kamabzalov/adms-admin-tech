import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface UserOptionalDataFormProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleUploadData: (data: any) => void;
}

export const UserOptionalDataForm: React.FC<UserOptionalDataFormProps> = ({
  openDialog,
  handleCloseDialog,
  handleUploadData,
}): JSX.Element => {
  const [optionalData, setOptionalData] = useState<any>({
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

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      setOptionalData({
        ...optionalData,
        ["type"]: event.target.value as unknown as number,
      });
    },
    [optionalData]
  );
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setOptionalData({
        ...optionalData,
        [name]: value,
      });
    },
    [optionalData]
  );

  const onSubmit = useCallback(() => {
    handleUploadData(optionalData);
    handleCloseDialog();
  }, [optionalData]);

  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Modify data</DialogTitle>
        <DialogContent>
          {optionalData &&
            Object.keys(optionalData).map((property) => {
              if (property !== "type") {
                return (
                  <TextField
                    fullWidth
                    margin="dense"
                    autoFocus
                    variant="standard"
                    key={property}
                    label={property}
                    name={property}
                    type={"text"}
                    value={optionalData[property]}
                    onChange={handleInputChange}
                  />
                );
              } else {
                return (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={optionalData.type}
                      label="Type"
                      type="number"
                      onChange={handleChange}
                    >
                      <MenuItem value={0}>Admin</MenuItem>
                      <MenuItem value={1}>Manager</MenuItem>
                      <MenuItem value={2}>General</MenuItem>
                      <MenuItem value={3}>Salesperson</MenuItem>
                    </Select>
                  </FormControl>
                );
              }
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
