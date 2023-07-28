import axios from "axios";
import {LoginResponse} from "./auth.service";

export interface Microservice {
  heartbit: string;
  index: number;
  ipv4: string;
  name: string;
  port: number;
  started: string;
  status: string;
  type: string;
  type_i: number;
  uid: string;
  version: string;
}

const API_URL = "http://app.admss.com:8088/api/v1/";

const user: LoginResponse = JSON.parse(
    localStorage.getItem("admss-admin-user") ?? ""
);

const token = user?.token;

export const listServices = () => {
  return axios.get<Microservice[]>(`${API_URL}services/list`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(response => response.data);
};

export const getServiceState = (uid: string) => {
  return axios.get(API_URL + "services/" + uid.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getServiceLogs = (id: number) => {
  return axios.get(API_URL + "services/" + id.toString() + "/logs", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getServiceAudit = (id: number) => {
  return axios.get(API_URL + "services/" + id.toString() + "/audit", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getServiceAllerts = (id: number) => {
  return axios.get(API_URL + "services/" + id.toString() + "/allerts", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getServiceCounters = (id: number) => {
  return axios.get(API_URL + "services/" + id.toString() + "/counters", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const restartService = (id: number) => {
  return axios.get(API_URL + "services/" + id + "/stop", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
