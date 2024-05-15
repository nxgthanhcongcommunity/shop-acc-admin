import { METHODS } from "../constants";
import { ICategory } from "../models";
import axiosInstance from "./axiosInstance";
import { transformResponse } from "./utils";

const categoryApi = {
  async GetCategories(queryConfig: any) {
    const response = await axiosInstance({
      method: METHODS.GET,
      url: "category/get-categories",
      params: queryConfig,
    });
    return transformResponse(response);
  },

  async AddCategory(category: ICategory | FormData) {
    const response = await axiosInstance({
      method: METHODS.POST,
      url: "category/add-category",
      data: category,
    });
    return transformResponse(response);
  },

  async UpdateCategory(category: ICategory) {
    const response = await axiosInstance({
      method: METHODS.PUT,
      url: "category/update-category",
      data: category,
    });
    return transformResponse(response);
  },

  async DeleteCategory(category: ICategory) {
    const response = await axiosInstance({
      method: METHODS.DELETE,
      url: "category/delete-category",
      data: category,
    });
    return transformResponse(response);
  },
};

export default categoryApi;
