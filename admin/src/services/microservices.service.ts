import axios from "axios";
import * as AuthService from "./auth.service";

const API_URL = "http://localhost:6788/api/v1/";

export const listServices = () => {
  return axios.get(API_URL + "services", {
    headers: {
      Authorization: "Bearer" + AuthService.getCurrentUser().token,
    },
  });
};
