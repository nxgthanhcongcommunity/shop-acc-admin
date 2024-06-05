import { METHODS } from "../constants";
import axiosInstance from "./axiosInstance";
import { transformResponse } from "./utils";

const balanceApi = {
  async Get(queryConfig: any) {
    const response = await axiosInstance({
      method: METHODS.GET,
      url: "balance/get",
      params: queryConfig,
    });
    return transformResponse(response);

  },

};

export default balanceApi;
