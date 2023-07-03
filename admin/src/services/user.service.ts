import axios from "axios";
import authHeader from "./auth.header";
/*const API_URL = "http://localhost:8080/api/test/";*/

const API_URL = "http://app.admss.com:8088/api/v1/";

interface CreateUserInfo {
  uid: string;
  username: string;
  email: string;
  given_name?: string;
  middle_name?: string;
  name?: string;
  family_name?: string;
  nickname?: string;
  phone_number?: string;
  comment?: string;
  picture?: string;
  directory?: string;
  metadata?: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  };
  tags?: string[];
  is_suspended?: boolean;
  is_admin?: boolean;
  is_manager?: boolean;
}

interface UpdateUserInfo {
  uid?: string;
  username?: string;
  email?: string;
  given_name?: string;
  middle_name?: string;
  name?: string;
  family_name?: string;
  nickname?: string;
  phone_number?: string;
  comment?: string;
  picture?: string;
  directory?: string;
  metadata?: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  };
  tags?: string[];
  is_suspended?: boolean;
}

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

export const createUser = (userInfo: CreateUserInfo) => {
  return axios.post(API_URL + "users", {
    headers: authHeader(),
    userInfo,
  });
};

export const listUsers = () => {
  return axios.get(API_URL + "users", {
    headers: authHeader(),
  });
};

export const getUserInfoById = (id: number) => {
  return axios.get(API_URL + "users/" + id.toString(), {
    headers: authHeader(),
  });
};

export const updateUser = (id: number, userInfo: UpdateUserInfo) => {
  return axios.post(API_URL + "users/" + id.toString(), {
    headers: authHeader(),
    userInfo,
  });
};

export const getUserInfoByUid = (uid: string) => {
  return axios.get(API_URL + "users/" + uid, {
    headers: authHeader(),
  });
};

export const getAuthenticatedUser = () => {
  return axios.get(API_URL + "user", {
    headers: authHeader(),
  });
};

export const MoveUserToTrash = (id: number) => {
  return axios.post(API_URL + "users/" + id.toString() + "/trash", {
    headers: authHeader(),
  });
};

export const getAutocompleteUsers = () => {
  return axios.get(API_URL + "users/autocomplete", {
    headers: authHeader(),
  });
};

export const restoreUserFromTrash = (id: number) => {
  return axios.post(API_URL + "users/" + id.toString() + "/restore", {
    headers: authHeader(),
  });
};

export const issueAccessToken = (uid: string) => {
  return axios.post(API_URL + "users/" + uid + "/tokens", {
    headers: authHeader(),
  });
};

export const revokeAllAccessTokens = (uid: string) => {
  return axios.delete(API_URL + "users/" + uid + "/tokens", {
    headers: authHeader(),
  });
};
