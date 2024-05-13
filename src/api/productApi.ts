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

};

export default productApi;
