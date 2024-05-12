import { METHODS } from "../constants";
import { ICategory } from "../models";
import axiosInstance from "./axiosInstance";

const categoryApi = {
  async GetCategories(queryConfig: any) {
    const response = await axiosInstance({
      method: METHODS.GET,
      url: "category/get-categories",
      params: queryConfig,
    });
    return response;
  },

  async AddCategory(category: ICategory) {
    const response = await axiosInstance({
      method: METHODS.POST,
      url: "category/add-category",
      data: category,
    });
    return response;
  },

  async UpdateCategory(category: ICategory) {
    const response = await axiosInstance({
      method: METHODS.PUT,
      url: "category/update-category",
      data: category,
    });
    return response;
  },

  async DeleteCategory(category: ICategory) {
    const response = await axiosInstance({
      method: METHODS.DELETE,
      url: "category/delete-category",
      data: category,
    });
    return response;
  },
};

export default categoryApi;
