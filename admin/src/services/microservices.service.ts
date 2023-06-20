import axios from "axios";

import authHeader from "./auth.header";

const API_URL = "http://app.admss.com:8088/api/v1/";

export const listServices = () => {
  console.warn(authHeader());
  return axios.get(API_URL + "services", {
    headers: authHeader(),
  });
};

export const getServiceState = (id: number) => {
  return axios.get(API_URL + "services/" + id.toString(), {
    headers: authHeader(),
  });
};

export const getServiceLogs = (id: number) => {
  return axios.get(API_URL + "services/" + id.toString() + "/logs", {
    headers: authHeader(),
  });
};

export const getServiceAudit = (id: number) => {
  return axios.get(API_URL + "services/" + id.toString() + "/audit", {
    headers: authHeader(),
  });
};

export const getServiceAllerts = (id: number) => {
  return axios.get(API_URL + "services/" + id.toString() + "/allerts", {
    headers: authHeader(),
  });
};

export const getServiceCounters = (id: number) => {
  return axios.get(API_URL + "services/" + id.toString() + "/counters", {
    headers: authHeader(),
  });
};

export const startService = (id: number) => {
  return axios.post(API_URL + "services/" + id.toString() + "/start", {
    headers: authHeader(),
  });
};

export const stopService = (id: number) => {
  return axios.post(API_URL + "services/" + id.toString() + "/stop", {
    headers: authHeader(),
  });
};
