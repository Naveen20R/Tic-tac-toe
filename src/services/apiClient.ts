import axios from "axios";
import { baseURL } from "../config";
import { store } from "../store";
import { hideLoader, showLoader } from "../store/common/loader.reducer";

const headers = {
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": true,
};

const http = axios.create({
  baseURL,
  headers,
});

http.interceptors.request.use((config) => {
  store.dispatch(showLoader());
  return config;
});

http.interceptors.response.use(
  (response) => {
    store.dispatch(hideLoader());
    return response;
  },
  (error) => {
    store.dispatch(hideLoader());
    return Promise.reject(error);
  }
);

export default http;
