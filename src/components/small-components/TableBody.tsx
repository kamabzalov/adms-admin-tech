import React, { useCallback, useState } from "react";
//import "../styles/table.css"
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import Button from "@mui/material/Button";
import UserMenu from "./UserMenu";
import * as UserService from "../../services/user.service";

interface LayoutProps {
  user: any;
}

export const UsersTableBody: React.FC<LayoutProps> = ({ user }) => {
  const [data, setData] = useState<JSON>();

  const trashUser = useCallback(async () => {
    const response = await UserService.deleteUser(user.useruid).then(
      (response) => {
        return response.data;
      }
    );
    setData(response);
  }, []);

  const untrashUser = useCallback(async () => {
    const response = await UserService.undeleteUser(user.useruid).then(
      (response) => {
        return response.data;
      }
    );
    setData(response);
  }, []);

  return (
    <tbody>
      <tr>
        <th className="NumberOfString">{user.index}</th>
        <td>{user.username}</td>
        <td style={{ display: "flex" }}>
          <Button onClick={trashUser} style={{ width: "33%" }}>
            <DeleteIcon style={{ color: "red", flex: 1 }} />
          </Button>
          <Button onClick={untrashUser} style={{ width: "33%" }}>
            <RestoreFromTrashIcon style={{ color: "green", flex: 2 }} />
          </Button>
          <UserMenu uid={user.useruid} username={user.username} />
        </td>
      </tr>
    </tbody>
  );
};
