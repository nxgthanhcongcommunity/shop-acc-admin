import { METHODS } from "../constants";
import axiosInstance from "./axiosInstance";

const accountApi = {
  async GetAccounts(queryConfig: any) {
    const response = await axiosInstance({
      method: METHODS.GET,
      url: "account/get-accounts",
      params: queryConfig,
    });
    return response;
  },

};

export default accountApi;
