import { METHODS } from "../constants";
import { IProduct } from "../models";
import axiosInstance from "./axiosInstance";
import { fetchApiAsync } from "./utils";

const productApi = {
  AddProduct: async (product: IProduct | FormData) =>
    await fetchApiAsync(
      async () =>
        await axiosInstance({
          method: METHODS.POST,
          url: "product/add-product",
          data: product,
        })
    ),

  UpdateProduct: async (product: IProduct | FormData) =>
    await fetchApiAsync(
      async () =>
        await axiosInstance({
          method: METHODS.PUT,
          url: "product/update-product",
          data: product,
        })
    ),

  DeleteProduct: async (product: IProduct | FormData) =>
    await fetchApiAsync(
      async () =>
        await axiosInstance({
          method: METHODS.DELETE,
          url: "product/delete-product",
          data: product,
        })
    ),

  GetProducts: async (queryConfig: any) =>
    await fetchApiAsync(
      async () =>
        await axiosInstance({
          method: METHODS.GET,
          url: "product/get-products",
          params: queryConfig,
        })
    ),
};

export default productApi;
