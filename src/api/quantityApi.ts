import { METHODS } from "../constants";
import axiosInstance from "./axiosInstance";
import { transformResponse } from "./utils";

const quantityApi = {
  async Get(queryConfig: any) {
    const response = await axiosInstance({
      method: METHODS.GET,
      url: "quantity/get",
      params: queryConfig,
    });
    return transformResponse(response);

  },

};

export default quantityApi;
