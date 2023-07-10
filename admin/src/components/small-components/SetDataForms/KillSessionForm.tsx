import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useState } from "react";
interface KillSessionFormProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleUploadData: (data: any) => void;
}

export const KillSessionForm: React.FC<KillSessionFormProps> = ({
  openDialog,
  handleCloseDialog,
  handleUploadData,
}): JSX.Element => {
  const [sessionNumberInput, setSessionNumberInput] = useState<string>("");

  const handleSessionNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSessionNumberInput(event.target.value);
  };

  const onSubmit = useCallback(() => {
    handleUploadData({ id: sessionNumberInput });
    handleCloseDialog();
  }, [sessionNumberInput]);
  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Input session to kill</DialogTitle>
        <DialogContent>
          <TextField
            value={sessionNumberInput}
            onChange={handleSessionNumberChange}
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={onSubmit}>Kill Session</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
