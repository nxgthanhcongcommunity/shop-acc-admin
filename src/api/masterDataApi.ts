import { METHODS } from "../constants";
import axiosInstance from "./axiosInstance";
import { fetchApiAsync } from "./utils";

const masterDataApi = {
  getByKey: async (queryConfig: any) =>
    await fetchApiAsync(
      async () =>
        await axiosInstance({
          method: METHODS.GET,
          url: "master-data/get-by-key",
          params: queryConfig,
        })
    ),
};

export default masterDataApi;
