import axiosConfig from "..";

export const test = async () => {
  return axiosConfig.get("/test");
};
