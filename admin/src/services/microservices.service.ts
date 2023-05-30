import axios from "axios";
import microserviceHeader from "./microservices.header";

const API_URL = "http://localhost:6788/api/v1/";

export const listServices = () => {
  return axios.get(API_URL + "services", {
    headers: microserviceHeader(),
  });
};

export const getServiceState = (id: number) => {
  return axios.get(API_URL + "services" + "/" + id.toString(), {
    headers: microserviceHeader(),
  });
};

export const getServiceLogs = (id: number) => {
  return axios.get(API_URL + "services" + "/" + id.toString() + "/logs", {
    headers: microserviceHeader(),
  });
};

export const getServiceAudit = (id: number) => {
  return axios.get(API_URL + "services" + "/" + id.toString() + "/audit", {
    headers: microserviceHeader(),
  });
};

export const getServiceAllerts = (id: number) => {
  return axios.get(API_URL + "services" + "/" + id.toString() + "/allerts", {
    headers: microserviceHeader(),
  });
};

export const getServiceCounters = (id: number) => {
  return axios.get(API_URL + "services" + "/" + id.toString() + "/counters", {
    headers: microserviceHeader(),
  });
};

export const startService = (id: number) => {
  return axios
    .post(API_URL + "services" + "/" + id.toString() + "/start", {
      headers: microserviceHeader(),
      id,
    })
    .catch((err) => {
      console.error(err);
      return { data: {} };
    });
};

export const stopService = (id: number) => {
  return axios
    .post(API_URL + "services" + "/" + id.toString() + "/stop", {
      headers: microserviceHeader(),
      id,
    })
    .catch((err) => {
      console.error(err);
      return { data: {} };
    });
};
