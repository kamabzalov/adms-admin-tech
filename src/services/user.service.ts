import axios from "axios";
import { LoginResponse } from "./auth.service";

const API_URL = "http://app.admss.com:8088/api/v1/";

const user: LoginResponse = JSON.parse(
  localStorage.getItem("admss-admin-user") ?? ""
);

const token = user?.token;

export const createUser = (loginname: string, loginpassword: string) => {
  return axios.post(
    API_URL + "user/" + 0 + "/user",
    { loginname: loginname, loginpassword: loginpassword },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const updateUser = (
  uid: string,
  loginname: string,
  loginpassword: string
) => {
  return axios.post(
    API_URL + "user/" + uid + "/user",
    { loginname: loginname, loginpassword: loginpassword },
    {
        headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const setUserOptionalData = (uid: string, data: any) => {
  return axios.post(
    API_URL + "user/" + uid + "/set",
    { ...data },
    {
        headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const listUsers = () => {
  return axios.get(API_URL + "user", {
      headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteUser = (uid: string) => {
  return axios.post(
    API_URL + "user/" + uid + "/delete",
    {},
    {
        headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const undeleteUser = (uid: string) => {
  return axios.post(
    API_URL + "user/" + uid + "/undelete",
    {},
    {
        headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const setUserPermissions = (uid: string, data: any) => {
  return axios.post(
    API_URL + "user/" + uid + "/permissions",
    { ...data },
    {
        headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const getUserPermissions = (uid: string) => {
  return axios.get(API_URL + "user/" + uid + "/permissions", {
      headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserExtendedInfo = (uid: string) => {
  return axios.get(API_URL + "user/" + uid + "/info", {
      headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserLocations = (uid: string) => {
  return axios.get(API_URL + "user/" + uid + "/locations", {
      headers: { Authorization: `Bearer ${token}` },
  });
};

export const setUserProfile = (uid: string, profile: any) => {
  return axios.post(
    API_URL + "user/" + uid + "/profile",
    { ...profile },
    {
        headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const getUserProfile = (uid: string) => {
  return axios.get(API_URL + "user/" + uid + "/profile", {
      headers: { Authorization: `Bearer ${token}` },
  });
};

export const setUserSettings = (uid: string, data: any) => {
  return axios.post(API_URL + "user/" + uid + "/settings", data, {
      headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserSettings = (uid: string) => {
  return axios.get(API_URL + "user/" + uid + "/settings", {
      headers: { Authorization: `Bearer ${token}` },
  });
};

export const checkToken = (token: string) => {
  return axios.get(API_URL + "user/" + token + "/token", {
      headers: { Authorization: `Bearer ${token}` },
  });
};

export const listUserSessions = (uid: string) => {
  return axios.get(API_URL + "user/" + uid + "/sessions", {
      headers: { Authorization: `Bearer ${token}` },
  });
};

export const killSession = (id: number) => {
  return axios.post(API_URL + "user/" + id.toString() + "/session", {
      headers: { Authorization: `Bearer ${token}` },
  });
};

export const checkSession = (uid: string) => {
  return axios.get(API_URL + "user/" + uid + "/session", {
      headers: { Authorization: `Bearer ${token}` },
  });
};

export const listUserLogins = (uid: string) => {
  return axios.get(API_URL + "user/" + uid + "/logins", {
      headers: { Authorization: `Bearer ${token}` },
  });
};

export const listSubusers = (uid: string) => {
  return axios.get(API_URL + "user/" + uid + "/subusers", {
      headers: { Authorization: `Bearer ${token}` },
  });
};

export const listSalesPersons = (uid: string) => {
  return axios.get(API_URL + "user/" + uid + "/salespersons", {
      headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserShortInfo = (uid: string) => {
  return axios.get(API_URL + "user/" + uid + "/username", {
      headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllUIPermissions = (uid: string) => {
  return axios.get(API_URL + "user/" + uid + "/listpermissions", {
      headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllUITypes = (uid: string) => {
  return axios.get(API_URL + "user/" + uid + "/listusertypes", {
      headers: { Authorization: `Bearer ${token}` },
  });
};
