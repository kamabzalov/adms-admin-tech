import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ListItemIcon, ListItemText } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useCallback, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import * as UserService from "../../services/user.service";
import { SetFormController } from "./SetDataForms/SetFormController";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface UserMenuProps {
  uid: string;
  username: string;
}

export type SetDataType =
  | "Permissions"
  | "User data"
  | "User optional data"
  | "Kill session"
  | "Locations"
  | "Profile"
  | "Settings"
  | "Validate"
  | "Validate with uid";

type GetDataType =
  | "Permissions"
  | "Extended Info"
  | "Locations"
  | "Profile"
  | "Settings"
  | "Check Token"
  | "Sessions"
  | "Logins"
  | "Subusers"
  | "Sales Persons"
  | "Short Info"
  | "All UI Permissions"
  | "All UI Types";

interface SetDataDict {
  type: SetDataType;
  text: string;
}

interface GetDataDict {
  type: GetDataType;
  text: string;
}

export default function UserMenu({ uid, username }: UserMenuProps) {
  const getDataDict = [
    { type: "Permissions", text: "Get permissions" },
    { type: "Extended Info", text: "Get extended user info" },
    { type: "Locations", text: "Get user locations" },
    { type: "Profile", text: "Get user profile" },
    { type: "Settings", text: "Get user settings" },
    { type: "Check Token", text: "Check if token is valid" },
    { type: "Sessions", text: "List sessions" },
    { type: "Logins", text: "List logins" },
    { type: "Subusers", text: "List secondary users, subusers" },
    { type: "Sales Persons", text: "List sales persons related to user" },
    { type: "Short Info", text: "Get user short info" },
    { type: "All UI Permissions", text: "List available permissions for UI" },
    { type: "All UI Types", text: "List all available user types for UI" },
  ] as GetDataDict[];

  const setDataDict = [
    { type: "Permissions", text: "Set user permissions" },
    { type: "User data", text: "Set user data" },
    { type: "User optional data", text: "Set user optional data" },
    { type: "Kill session", text: "Kill user's session." },
    { type: "Locations", text: "Set locations for user" },
    { type: "Profile", text: "Set user profile" },
    { type: "Settings", text: "Set user settings" },
    { type: "Validate", text: "Validate data" },
    { type: "Validate with uid", text: "Validate data with uid" },
  ] as SetDataDict[];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [downloadAnchorEl, setDownloadAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [uploadAnchorEl, setUploadAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [openSetDialog, setOpenSetDialog] = useState<boolean>(false);
  const [openGetDialog, setOpenGetDialog] = useState<boolean>(false);
  const [dataType, setDataType] = useState<string>("Data type is undefined");
  const [responseData, setResponseData] = useState<JSON>();

  const openBasicMenuBool = Boolean(anchorEl);

  const openDownloadMenuBool = Boolean(downloadAnchorEl);
  const openUploadMenuBool = Boolean(uploadAnchorEl);

  const openBasicMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setDownloadAnchorEl(null);
    setUploadAnchorEl(null);
  }, []);

  const openDownloadMenu = (event: React.MouseEvent<HTMLLIElement>) => {
    handleClose();
    setDownloadAnchorEl(event.currentTarget);
  };

  const openUploadMenu = (event: React.MouseEvent<HTMLLIElement>) => {
    handleClose();
    setUploadAnchorEl(event.currentTarget);
  };

  const handleClickOpenSetDialog = useCallback(() => {
    handleClose();
    setOpenSetDialog(true);
  }, []);

  const handleClickOpenGetDialog = useCallback(() => {
    handleClose();
    setOpenGetDialog(true);
  }, []);

  const handleCloseSetDialog = useCallback(() => {
    setOpenSetDialog(false);
  }, []);

  const handleCloseGetDialog = useCallback(() => {
    setOpenGetDialog(false);
  }, []);

  const setUserDataType = useCallback((type: SetDataType) => {
    setDataType(type);
  }, []);

  const setUserData = useCallback(
    async (data: any) => {
      let response: any;
      switch (dataType as SetDataType) {
        case "Permissions":
          response = await UserService.setUserPermissions(uid, data).then(
            (response) => {
              return response.data;
            }
          );
          break;
        case "User optional data":
          response = await UserService.setUserOptionalData(uid, data).then(
            (response) => {
              return response.data;
            }
          );
          break;
        case "Settings":
          response = await UserService.setUserSettings(uid, data).then(
            (response) => {
              return response.data;
            }
          );
          break;
        case "Profile":
          response = await UserService.setUserProfile(uid, data).then(
            (response) => {
              return response.data;
            }
          );
          break;
        case "User data":
          response = await UserService.updateUser(
            uid,
            username,
            data.password
          ).then((response) => {
            return response.data;
          });
          break;
        case "Kill session":
          response = await UserService.killSession(data.id).then((response) => {
            return response.data;
          });
          break;
      }
      setResponseData(response);
      setDataType(dataType);
      handleClickOpenGetDialog();
    },
    [dataType]
  );

  const getUserData = useCallback(
    async (type: GetDataType) => {
      let response: any;
      switch (type) {
        case "Permissions":
          response = await UserService.getUserPermissions(uid).then(
            (response) => {
              return response.data;
            }
          );
          break;
        case "Extended Info":
          response = await UserService.getUserExtendedInfo(uid).then(
            (response) => {
              return response.data;
            }
          );
          break;
        case "Locations":
          response = await UserService.getUserLocations(uid).then(
            (response) => {
              return response.data;
            }
          );
          break;
        case "Profile":
          response = await UserService.getUserProfile(uid).then((response) => {
            return response.data;
          });
          break;
        case "Settings":
          response = await UserService.getUserSettings(uid).then((response) => {
            return response.data;
          });
          break;
        case "Check Token":
          response = await UserService.checkUserToken(uid).then((response) => {
            return response.data;
          });
          break;
        case "Sessions":
          response = await UserService.listUserSessions(uid).then(
            (response) => {
              return response.data;
            }
          );
          break;
        case "Logins":
          response = await UserService.listUserLogins(uid).then((response) => {
            return response.data;
          });
          break;
        case "Subusers":
          response = await UserService.listSubusers(uid).then((response) => {
            return response.data;
          });
          break;
        case "Sales Persons":
          response = await UserService.listSalesPersons(uid).then(
            (response) => {
              return response.data;
            }
          );
          break;
        case "Short Info":
          response = await UserService.getUserShortInfo(uid).then(
            (response) => {
              return response.data;
            }
          );
          break;
        case "All UI Permissions":
          response = await UserService.getAllUIPermissions(uid).then(
            (response) => {
              return response.data;
            }
          );
          break;
        case "All UI Types":
          response = await UserService.getAllUITypes(uid).then((response) => {
            return response.data;
          });
          break;
      }
      setResponseData(response);
      setDataType(type);
    },
    [uid]
  );

  return (
    <div style={{ flex: 3, width: "33%" }}>
      <Button
        id="basic-button"
        aria-controls={openBasicMenuBool ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openBasicMenuBool ? "true" : undefined}
        onClick={openBasicMenu}
        style={{ width: "100%" }}
      >
        <MoreVertIcon style={{ color: "blue" }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openBasicMenuBool}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={openUploadMenu}>
          <ListItemIcon>
            <CloudUploadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Set data</ListItemText>
        </MenuItem>
        <MenuItem onClick={openDownloadMenu}>
          <ListItemIcon>
            <CloudDownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Get data</ListItemText>
        </MenuItem>
      </Menu>

      <Menu
        id="set-menu"
        anchorEl={uploadAnchorEl}
        open={openUploadMenuBool}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {setDataDict.length &&
          setDataDict.map((element, index) => {
            return (
              <MenuItem
                key={index + "_GetMenuItem"}
                onClick={() => {
                  handleClickOpenSetDialog();
                  setUserDataType(element.type);
                }}
              >
                <ListItemText>{element.text}</ListItemText>
              </MenuItem>
            );
          })}
      </Menu>

      <Menu
        id="get-menu"
        anchorEl={downloadAnchorEl}
        open={openDownloadMenuBool}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {getDataDict.length &&
          getDataDict.map((element, index) => {
            return (
              <MenuItem
                key={index + "_GetMenuItem"}
                onClick={() => {
                  handleClickOpenGetDialog();
                  getUserData(element.type);
                }}
              >
                <ListItemText>{element.text}</ListItemText>
              </MenuItem>
            );
          })}
      </Menu>

      <SetFormController
        openDialog={openSetDialog}
        handleCloseDialog={handleCloseSetDialog}
        handleUploadData={setUserData}
        type={dataType as SetDataType}
        uid={uid}
      />

      <Dialog
        fullScreen
        open={openGetDialog}
        onClose={handleCloseGetDialog}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseGetDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {dataType}
            </Typography>
          </Toolbar>
        </AppBar>
        <pre style={{ overflowY: "scroll" }}>
          {JSON.stringify(responseData, null, 2)}
        </pre>
      </Dialog>
    </div>
  );
}
