import { METHODS } from "../constants";
import { IBanner } from "../models";
import axiosInstance from "./axiosInstance";
import { transformResponse } from "./utils";

const bannerApi = {
  async getBanners(queryConfig: any) {
    const response = await axiosInstance({
      method: METHODS.GET,
      url: "banner/get-banners",
      params: queryConfig,
    });
    return transformResponse(response);
  },

  async AddBanner(banner: IBanner) {
    const response = await axiosInstance({
      method: METHODS.POST,
      url: "banner/add-banner",
      data: banner,
    });
    return transformResponse(response);
  },

  async UpdateBanner(banner: IBanner) {
    const response = await axiosInstance({
      method: METHODS.PUT,
      url: "banner/update-banner",
      data: banner,
    });
    return transformResponse(response);
  },

  async DeleteBanner(banner: IBanner) {
    const response = await axiosInstance({
      method: METHODS.DELETE,
      url: "banner/delete-banner",
      data: banner,
    });
    return transformResponse(response);
  },
};

export default bannerApi;
