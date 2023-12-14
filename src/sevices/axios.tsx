import axios, { AxiosInstance } from "axios";

export let axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:1337/api/",
  headers: {
    // token: localStorage.getItem("token") || "",
    Authorization:
      localStorage.getItem("token") || sessionStorage.getItem("token"),
  },
});
