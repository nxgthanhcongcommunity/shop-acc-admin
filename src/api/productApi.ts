import { createApi } from "@reduxjs/toolkit/query/react";
import { METHODS } from "../constants";
import { IProduct } from "../models";
import baseQuery from "./baseQuery";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllProducts: builder.query<IPaging<IProduct>, void>({
      query: (queryConfig) => "product/get-products",
    }),
    addProduct: builder.mutation<IProduct, any>({
      query: (payload) => ({
        url: `product/add-product`,
        method: "POST",
        body: payload,
      }),
    }),
    updateProduct: builder.mutation<IProduct, any>({
      query: (payload) => ({
        url: `product/update-product`,
        method: "PUT",
        body: payload,
      }),
    }),
    deleteProduct: builder.mutation<IProduct, any>({
      query: (payload) => ({
        url: `product/delete-product`,
        method: METHODS.DELETE,
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
