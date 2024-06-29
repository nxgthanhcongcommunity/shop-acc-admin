import { METHODS } from "../constants";
import axiosInstance from "./axiosInstance";
import { fetchApiAsync } from "./utils";

const invoiceApi = {
  Get: async (queryConfig: any) =>
    await fetchApiAsync(
      async () =>
        await axiosInstance({
          method: METHODS.GET,
          url: "invoice/get",
          params: queryConfig,
        })
    ),

  GetInvoiceDetails: async (queryConfig: any) =>
    await fetchApiAsync(
      async () =>
        await axiosInstance({
          method: METHODS.GET,
          url: "invoice/get-invoice-details",
          params: queryConfig,
        })
    ),
};

export default invoiceApi;
