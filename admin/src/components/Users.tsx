import React, { useCallback, useEffect, useState } from "react";
import { TableHead } from "./small-components/TableHeads";
import { UsersTableBody } from "./small-components/TableBody";
import "./styles/table.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import * as UserService from "./../services/user.service";

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<JSON>();
  const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);

  const [loginInput, setLoginInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const handleClickOpenDialog = () => {
    setOpenFormDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenFormDialog(false);
  };

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInput(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(event.target.value);
  };

  const createUser = useCallback(async () => {
    const response = await UserService.createUser(
      loginInput,
      passwordInput
    ).then((response) => {
      return response.data;
    });
    setData(response);
  }, [loginInput, passwordInput]);

  useEffect(() => {
    if (!loaded) {
      const listOfUsers = UserService.listUsers().then(
        (response) => {
          setUsers(response.data);
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
  }, [users]);

  return (
    <>
      <h1>Here are users</h1>
      <table>
        <TableHead firstRow="Full Name" secondRow="Actions" />
        {users.length &&
          users.map((user, index) => {
            return <UsersTableBody key={index} user={user} />;
          })}
      </table>
      <Button
        onClick={handleClickOpenDialog}
        variant="contained"
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
        }}
      >
        Create new User
      </Button>

      <Dialog open={openFormDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create new User</DialogTitle>
        <DialogContent>
          <TextField
            value={loginInput}
            onChange={handleLoginChange}
            autoFocus
            margin="dense"
            id="login"
            label="Login"
            type="Login"
            fullWidth
            variant="standard"
          />
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
          <Button onClick={createUser}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Users;
