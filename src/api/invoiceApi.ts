import { METHODS } from "../constants";
import axiosInstance from "./axiosInstance";
import { transformResponse } from "./utils";

const invoiceApi = {
  async Get(queryConfig: any) {
    const response = await axiosInstance({
      method: METHODS.GET,
      url: "invoice/get",
      params: queryConfig,
    });
    return transformResponse(response);
  },

  async GetInvoiceDetails(queryConfig: any) {
    const response = await axiosInstance({
      method: METHODS.GET,
      url: "invoice/get-invoice-details",
      params: queryConfig,
    });
    return transformResponse(response);
  },
};

export default invoiceApi;
