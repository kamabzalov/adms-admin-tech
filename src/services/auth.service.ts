import axios from "axios";
import { LoginResponse } from "../components/Login";

const API_URL = "http://app.admss.com:8088/api/v1/";

export const login = (username: string, password: string) => {
  return axios
    .post<LoginResponse>(API_URL + "user", {
      user: username,
      secret: password,
      magic: "avansoft",
    })
    .then((response) => response.data);
};

export const logout = (userId: string) => {
  return axios.post(`${API_URL}/user/${userId}`);
};
