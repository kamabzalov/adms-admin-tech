import React, { useCallback, useState } from "react";
import { SetDataType } from "../UserMenu";
import { UserPasswordForm } from "./UserPasswordForm";
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
    case "User password":
      return (
        <UserPasswordForm
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
          userUid={uid}
        />
      );
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
          uid={uid}
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
        />
      );
    default:
      return <>not implemented yet</>;
  }
};
