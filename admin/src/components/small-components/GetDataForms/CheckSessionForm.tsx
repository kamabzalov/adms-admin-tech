import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as UserService from "./../../../services/user.service";
import { useCallback, useEffect, useState } from "react";
interface CheckSessionFormProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleUploadData: (data: any) => void;
  userUid: string;
}

export const CheckSessionForm: React.FC<CheckSessionFormProps> = ({
  openDialog,
  handleCloseDialog,
  handleUploadData,
  userUid,
}): JSX.Element => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [sessionUid, setSessionUid] = useState<string>("");

  const handleChange = useCallback((event: SelectChangeEvent) => {
    setSessionUid(event.target.value as string);
  }, []);

  const onSubmit = useCallback(() => {
    if (sessionUid) {
      handleUploadData(sessionUid);
      handleCloseDialog();
    }
  }, [sessionUid]);

  useEffect(() => {
    if (!loaded) {
      const response = UserService.listUserSessions(userUid).then(
        (response) => {
          setSessions(response.data);
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
  }, [userUid]);

  if (loaded && !sessions.length) {
    return (
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Input session to check</DialogTitle>
        <DialogContent>No sessions were found</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }
  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Input session to check</DialogTitle>
        <DialogContent>
          <FormControl required fullWidth>
            <InputLabel id="demo-simple-select-label">Session uid</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              onChange={handleChange}
              value={sessionUid}
            >
              {sessions.length &&
                sessions.map((session, index) => {
                  return (
                    <MenuItem key={index} value={session.sessionuid}>
                      {session.sessionuid}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={onSubmit}>Check Session</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
