import axiosConfig from "..";

export const test = async (): Promise<string> => {
  return axiosConfig.get("/test");
};
