import React, { useCallback, useState } from "react";
import { SetDataType } from "../UserMenu";
import { UserDataForm } from "./UserDataForm";
import { KillSessionForm } from "./KillSessionForm";
import { PermissionsForm } from "./PermissionsForm";
import { UserOptionalDataForm } from "./UserOptionalDataForm";
import { UserSettingsForm } from "./UserSettingsForm";
import { UserProfileForm } from "./UserProfileForm";
//import "../styles/table.css"
interface SetFormControllerProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleUploadData: (data: any) => void;
  type: SetDataType;
  uid: string;
}

export const SetFormController: React.FC<SetFormControllerProps> = ({
  openDialog,
  handleCloseDialog,
  handleUploadData,
  type,
  uid,
}): JSX.Element => {
  if (!openDialog) return <></>;
  switch (type) {
    case "User data":
      return (
        <UserDataForm
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          handleUploadData={handleUploadData}
        />
      );
    case "Kill session":
      return (
        <KillSessionForm
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          handleUploadData={handleUploadData}
        />
      );
    case "Locations":
      return <></>;
    case "Permissions":
      return (
        <PermissionsForm
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          handleUploadData={handleUploadData}
          uid={uid}
        />
      );
    case "Profile":
      return (
        <UserProfileForm
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          handleUploadData={handleUploadData}
        />
      );
    case "Settings":
      return (
        <UserSettingsForm
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          handleUploadData={handleUploadData}
          uid={uid}
        />
      );
    case "User optional data":
      return (
        <UserOptionalDataForm
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          handleUploadData={handleUploadData}
          uid={uid}
        />
      );
    case "Validate":
      return <></>;
    case "Validate with uid":
      return <></>;
    default:
      return <>not implemented yet</>;
  }
};
