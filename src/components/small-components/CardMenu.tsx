import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ListItemIcon, ListItemText } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import ReceiptIcon from "@mui/icons-material/Receipt";
import WarningIcon from "@mui/icons-material/Warning";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { useCallback, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import * as MicroservicesService from "../../services/microservices.service";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface CardMenuProps {
  id: number;
  uid: string;
}
type ServiceDataType = "State" | "Logs" | "Audit" | "Allerts" | "Counters";

export default function CardMenu({ id, uid }: CardMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dataType, setDataType] = useState<ServiceDataType>("Logs");
  const [data, setData] = useState<JSON>();

  const open = Boolean(anchorEl);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClickOpenDialog = useCallback(() => {
    handleClose();
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const getState = useCallback(async () => {
    const state = await MicroservicesService.getServiceState(uid).then(
      (response) => {
        return response.data;
      }
    );
    setData(state);
    setDataType("State");
  }, [uid]);

  const getLogs = useCallback(async () => {
    const logs = await MicroservicesService.getServiceLogs(id).then(
      (response) => {
        return response.data;
      }
    );
    setData(logs);
    setDataType("Logs");
  }, [id]);

  const getAudit = useCallback(async () => {
    const audit = await MicroservicesService.getServiceAudit(id).then(
      (response) => {
        return response.data;
      }
    );
    setData(audit);
    setDataType("Audit");
  }, [id]);

  const getAllerts = useCallback(async () => {
    const allerts = await MicroservicesService.getServiceAllerts(id).then(
      (response) => {
        return response.data;
      }
    );
    setData(allerts);
    setDataType("Allerts");
  }, [id]);

  const getCounters = useCallback(async () => {
    const counters = await MicroservicesService.getServiceCounters(id).then(
      (response) => {
        return response.data;
      }
    );
    setData(counters);
    setDataType("Counters");
  }, [id]);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={openMenu}
      >
        Get data
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClickOpenDialog();
            getState();
          }}
        >
          <ListItemText>Get State</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClickOpenDialog();
            getLogs();
          }}
        >
          <ListItemText>Get Logs</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClickOpenDialog();
            getAudit();
          }}
        >
          <ListItemText>Get Audit</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClickOpenDialog();
            getAllerts();
          }}
        >
          <ListItemText>Get Allerts</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClickOpenDialog();
            getCounters();
          }}
        >
          <ListItemText>Get Counters</ListItemText>
        </MenuItem>
      </Menu>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDialog}
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
          {JSON.stringify(data, null, 2)}
        </pre>
      </Dialog>
    </div>
  );
}
