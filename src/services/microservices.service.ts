import axios from "axios";

import authHeader from "./auth.header";

const API_URL = "http://app.admss.com:8088/api/v1/";

export const listServices = () => {
    return axios.get(API_URL + "services", {
        headers: authHeader(),
    });
};

export const getServiceState = (uid: string) => {
    return axios.get(API_URL + "services/" + uid.toString(), {
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

// Get service allerts
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

export const restartService = (id: number) => {
    return axios.get(API_URL + "services/" + id + "/stop", {
        headers: authHeader(),
    });
};
