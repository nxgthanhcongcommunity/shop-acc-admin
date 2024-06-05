import { METHODS } from "../constants";
import axiosInstance from "./axiosInstance";
import { transformResponse } from "./utils";

const sendmailApi = {
  async Get(queryConfig: any) {
    const response = await axiosInstance({
      method: METHODS.GET,
      url: "sendmail/get",
      params: queryConfig,
    });
    return transformResponse(response);

  },

};

export default sendmailApi;
