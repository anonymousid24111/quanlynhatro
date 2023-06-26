import axios from "axios";

export const getToken = () =>
    localStorage.getItem("token") ? localStorage.getItem("token") : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const fetchHandler = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        Authorization: getAuthorizationHeader(),
    },
});

fetchHandler.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = "Bearer " + token;

    return config;
});
export default fetchHandler;
