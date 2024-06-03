import { METHODS } from "../constants";
import axiosInstance from "./axiosInstance";
import { transformResponse } from "./utils";

const masterDataApi = {
  async getByKey(queryConfig: any) {
    const response = await axiosInstance({
      method: METHODS.GET,
      url: "master-data/get-by-key",
      params: queryConfig,
    });
    return transformResponse(response);
  },
};

export default masterDataApi;
