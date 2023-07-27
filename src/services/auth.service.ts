import axios from "axios";

const API_URL = "http://app.admss.com:8088/api/v1/";

export const login = (username: string, password: string) => {
    return axios.post(API_URL + "user", {
        user: username,
        secret: password,
        magic: "avansoft",
    });
};

export const logout = (userId: string) => {
    return axios.post(`${API_URL}/user/${userId}`)
}

