import { METHODS } from "../constants";
import axiosInstance from "./axiosInstance";
import { transformResponse } from "./utils";

const transactionApi = {
  async Get(queryConfig: any) {
    const response = await axiosInstance({
      method: METHODS.GET,
      url: "transaction/get",
      params: queryConfig,
    });
    return transformResponse(response);

  },

};

export default transactionApi;
