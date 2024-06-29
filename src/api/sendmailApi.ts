import { METHODS } from "../constants";
import axiosInstance from "./axiosInstance";
import { fetchApiAsync } from "./utils";

const sendmailApi = {
  Get: async (queryConfig: any) =>
    await fetchApiAsync(
      async () =>
        await axiosInstance({
          method: METHODS.GET,
          url: "sendmail/get",
          params: queryConfig,
        })
    ),
};

export default sendmailApi;
