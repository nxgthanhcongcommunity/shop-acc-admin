import { METHODS } from "../constants";
import axiosInstance from "./axiosInstance";
import { fetchApiAsync } from "./utils";

const accountApi = {
  GetAccounts: async (queryConfig: any) =>
    await fetchApiAsync(
      async () =>
        await axiosInstance({
          method: METHODS.GET,
          url: "account/get-all-accounts",
          params: queryConfig,
        })
    ),
};

export default accountApi;
