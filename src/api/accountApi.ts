import { METHODS } from "../constants";
import axiosInstance from "./axiosInstance";
import { transformResponse } from "./utils";

const accountApi = {
  async GetAccounts(queryConfig: any) {
    const response = await axiosInstance({
      method: METHODS.GET,
      url: "account/get-accounts",
      params: queryConfig,
    });
    return transformResponse(response);

  },

};

export default accountApi;
