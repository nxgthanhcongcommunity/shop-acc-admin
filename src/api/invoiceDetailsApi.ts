import { METHODS } from "../constants";
import axiosInstance from "./axiosInstance";
import { transformResponse } from "./utils";

const invoiceDetailsApi = {
  async Get(queryConfig: any) {
    const response = await axiosInstance({
      method: METHODS.GET,
      url: "invoice-details/get",
      params: queryConfig,
    });
    return transformResponse(response);

  },

};

export default invoiceDetailsApi;
