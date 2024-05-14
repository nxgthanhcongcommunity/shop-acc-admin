import { METHODS } from "../constants";
import { IProduct } from "../models";
import axiosInstance from "./axiosInstance";

const productApi = {
  async AddProduct(product: IProduct | FormData) {
    const response = await axiosInstance({
      method: METHODS.POST,
      url: "product/add-product",
      data: product,
    });
    return response;
  },

  async UpdateProduct(product: IProduct | FormData) {
    const response = await axiosInstance({
      method: METHODS.PUT,
      url: "product/update-product",
      data: product,
    });
    return response;
  },

  async DeleteProduct(product: IProduct | FormData) {
    const response = await axiosInstance({
      method: METHODS.DELETE,
      url: "product/delete-product",
      data: product,
    });
    return response;
  },

  async GetProducts(queryConfig: any) {
    const response = await axiosInstance({
      method: METHODS.GET,
      url: "product/get-products",
      params: queryConfig,
    });
    return response;
  },
};

export default productApi;
