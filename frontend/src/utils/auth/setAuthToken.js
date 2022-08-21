import axiosInstance from "../axios/axiosInstance";

const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["x-access-token"] = token;
  } else {
    delete axiosInstance.defaults.headers.common["x-access-token"];
  }
};

export default setAuthToken;
