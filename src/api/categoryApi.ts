import { METHODS } from "../constants";
import { ICategory } from "../models";
import axiosInstance from "./axiosInstance";
import { fetchApiAsync } from "./utils";

const categoryApi = {
  GetAccounts: async (queryConfig: any) =>
    await fetchApiAsync(
      async () =>
        await axiosInstance({
          method: METHODS.GET,
          url: "account/get-accounts",
          params: queryConfig,
        })
    ),

  GetCategories: async (queryConfig: any) =>
    await fetchApiAsync(
      async () =>
        await axiosInstance({
          method: METHODS.GET,
          url: "category/get-categories",
          params: queryConfig,
        })
    ),

  AddCategory: async (category: ICategory | FormData) =>
    await fetchApiAsync(
      async () =>
        await axiosInstance({
          method: METHODS.POST,
          url: "category/add-category",
          data: category,
        })
    ),

  UpdateCategory: async (category: ICategory) =>
    await fetchApiAsync(
      async () =>
        await axiosInstance({
          method: METHODS.PUT,
          url: "category/update-category",
          data: category,
        })
    ),

  DeleteCategory: async (category: ICategory) =>
    await fetchApiAsync(
      async () =>
        await axiosInstance({
          method: METHODS.DELETE,
          url: "category/delete-category",
          data: category,
        })
    ),
};

export default categoryApi;
