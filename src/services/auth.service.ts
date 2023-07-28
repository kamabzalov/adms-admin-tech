import axios from "axios";

export interface LoginResponse {
  modified: string;
  sessionuid: string;
  started: string;
  status: "OK";
  token: string;
  useruid: string;
}

export interface LogoutResponse {
  status: "OK";
}

const API_URL = "http://app.admss.com:8088/api/v1/";

const user: LoginResponse = JSON.parse(
  localStorage.getItem("admss-admin-user") ?? ""
);

const token = user?.token;

export const login = (username: string, password: string) => {
  return axios
    .post<LoginResponse>(`${API_URL}user`, {
      user: username,
      secret: password,
      magic: "avansoft",
    })
    .then((response) => response.data);
};

export const logout = (userId: string) => {
  return axios
    .post<LogoutResponse>(`${API_URL}user/${userId}/logout`, null, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data);
};
