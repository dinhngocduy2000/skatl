import { getAccessTokenCookie } from "@/actions/cookie";
import axios, { AxiosError, AxiosResponse } from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // Set in .env

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
// Add a request interceptor
axiosConfig.interceptors.request.use(
  async function (config) {
    const accessToken = await getAccessTokenCookie();
    console.log("CHECKING TOKEN: ", accessToken);
    if (accessToken) {
      config.headers["Cookie"] = `Bearer ${accessToken}`;
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
axiosConfig.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  async function (error) {
    if (!error.response) {
      return Promise.reject(error);
    }
    switch (error.response.status) {
      case 403:
        return await handleRenewToken(error);
      case 404:
        break;
      case 401:
        // Refetch token with access token
        break;
      case 500:
        break;
      default:
        break;
    }

    return Promise.reject(error);
  }
);

export const axiosConfigWithoutAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosSupabaseConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosSupabaseConfig.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

const renewToken = async () => {
  // const refreshTokenFromSession = sessionStorage.getItem(
  //   COOKIE_KEYS.REFRESH_TOKEN
  // );
  // const refreshTokenFromLocal = localStorage.getItem(COOKIE_KEYS.REFRESH_TOKEN);

  // const res: UserCredential = await refreshTokenFunction({
  //   token: refreshTokenFromLocal ?? refreshTokenFromSession ?? "",
  // });
  // saveToStorages(
  //   COOKIE_KEYS.ACCESS_TOKEN,
  //   res.token,
  //   Boolean(refreshTokenFromLocal)
  // ); // if refreshToken is store from local === the session is save
  // saveToStorages(
  //   COOKIE_KEYS.REFRESH_TOKEN,
  //   res.refresh_token,
  //   Boolean(refreshTokenFromLocal)
  // ); // if refreshToken is store from local === the session is save

  // return res.token;
  return "";
};

const handleRenewToken = async (error: unknown) => {
  if (!(error instanceof AxiosError)) {
    return;
  }
  const axiosError: AxiosError = error;
  const originalRequest = axiosError.config;
  if (!originalRequest) {
    return;
  }
  const newAccessToken = await renewToken();
  originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
  return await axiosConfig(originalRequest);
};

export default axiosConfig;
