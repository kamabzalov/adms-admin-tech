import axios from "axios";
import authHeader from "./auth.header";
/*const API_URL = "http://localhost:8080/api/test/";*/

const API_URL = "http://app.admss.com:8088/api/v1/";

export const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

export const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

export const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

export const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

// Create user
export const createUser = (loginname: string, loginpassword: string) => {
  return axios.post(
    API_URL + "user/" + 0 + "/user",
    { loginname: loginname, loginpassword: loginpassword },
    {
      headers: authHeader(),
    }
  );
};

// Update user
export const updateUser = (
  uid: string,
  loginname: string,
  loginpassword: string
) => {
  return axios.post(
    API_URL + "user/" + uid + "/user",
    { loginname: loginname, loginpassword: loginpassword },
    {
      headers: authHeader(),
    }
  );
};

// Update user
export const setUserOptionalData = (uid: string, data: any) => {
  return axios.post(
    API_URL + "user/" + uid + "/set",
    { ...data },
    {
      headers: authHeader(),
    }
  );
};

// List users
export const listUsers = () => {
  return axios.get(API_URL + "user", {
    headers: authHeader(),
  });
};

// Move a user to the trash.
export const deleteUser = (uid: string) => {
  return axios.post(API_URL + "user/" + uid.toString() + "/delete", {
    headers: authHeader(),
  });
};

// Restore a user from the trash.
export const undeleteUser = (uid: string) => {
  return axios.post(API_URL + "user/" + uid.toString() + "/undelete", {
    headers: authHeader(),
  });
};

// Set user permissions.
export const setUserPermissions = (uid: string, data: any) => {
  return axios.post(
    API_URL + "user/" + uid.toString() + "/permissions",
    { ...data },
    {
      headers: authHeader(),
    }
  );
};

// Get user permissions.
export const getUserPermissions = (uid: string) => {
  return axios.get(API_URL + "user/" + uid.toString() + "/permissions", {
    headers: authHeader(),
  });
};

// Get user extended user info.
export const getUserExtendedInfo = (uid: string) => {
  return axios.get(API_URL + "user/" + uid.toString() + "/info", {
    headers: authHeader(),
  });
};

// Get user related locations.
export const getUserLocations = (uid: string) => {
  return axios.get(API_URL + "user/" + uid.toString() + "/locations", {
    headers: authHeader(),
  });
};

// Set user profile.
export const setUserProfile = (uid: string, profile: any) => {
  return axios.post(
    API_URL + "user/" + uid.toString() + "/profile",
    { ...profile },
    {
      headers: authHeader(),
    }
  );
};

// Get user profile.
export const getUserProfile = (uid: string) => {
  return axios.get(API_URL + "user/" + uid.toString() + "/profile", {
    headers: authHeader(),
  });
};

// Set user settings.
export const setUserSettings = (uid: string, data: any) => {
  return axios.post(
    API_URL + "user/" + uid.toString() + "/settings",
    { ...data },
    {
      headers: authHeader(),
    }
  );
};

// Get user settings.
export const getUserSettings = (uid: string) => {
  return axios.get(API_URL + "user/" + uid.toString() + "/settings", {
    headers: authHeader(),
  });
};

// Check if token is valid.
export const checkUserToken = (uid: string) => {
  return axios.get(API_URL + "user/" + uid.toString() + "/token", {
    headers: authHeader(),
  });
};

// List user sessions.
export const listUserSessions = (uid: string) => {
  return axios.get(API_URL + "user/" + uid.toString() + "/sessions", {
    headers: authHeader(),
  });
};

// Kill user's session.
export const killSession = (id: number) => {
  return axios.post(API_URL + "user/" + id.toString() + "/session", {
    headers: authHeader(),
  });
};

// Check if session is valid.
export const getSession = (id: number) => {
  return axios.get(API_URL + "user/" + id.toString() + "/session", {
    headers: authHeader(),
  });
};

// List user logins.
export const listUserLogins = (uid: string) => {
  return axios.get(API_URL + "user/" + uid.toString() + "/logins", {
    headers: authHeader(),
  });
};

// List subusers.
export const listSubusers = (uid: string) => {
  return axios.get(API_URL + "user/" + uid.toString() + "/subusers", {
    headers: authHeader(),
  });
};

// List sales persons.
export const listSalesPersons = (uid: string) => {
  return axios.get(API_URL + "user/" + uid.toString() + "/salespersons", {
    headers: authHeader(),
  });
};

// Get user short info.
export const getUserShortInfo = (uid: string) => {
  return axios.get(API_URL + "user/" + uid.toString() + "/username", {
    headers: authHeader(),
  });
};

// List all available permissions for UI.
export const getAllUIPermissions = (uid: string) => {
  return axios.get(API_URL + "user/" + uid.toString() + "/listpermissions", {
    headers: authHeader(),
  });
};

// List all available user types for UI.
export const getAllUITypes = (uid: string) => {
  return axios.get(API_URL + "user/" + uid.toString() + "/listusertypes", {
    headers: authHeader(),
  });
};
