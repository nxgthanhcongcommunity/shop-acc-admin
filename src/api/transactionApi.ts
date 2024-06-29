import { METHODS } from "../constants";
import axiosInstance from "./axiosInstance";
import { fetchApiAsync } from "./utils";

const transactionApi = {
  Get: async (queryConfig: any) =>
    await fetchApiAsync(
      async () =>
        await axiosInstance({
          method: METHODS.GET,
          url: "transaction/get",
          params: queryConfig,
        })
    ),
};

export default transactionApi;
