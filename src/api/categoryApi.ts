import { METHODS } from "../constants";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { ICategory } from "../models";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllCategories: builder.query<IPaging<ICategory>, void>({
      query: (queryConfig) => `category/get-categories`,
    }),
    addCategory: builder.mutation<ICategory, any>({
      query: (payload) => ({
        url: `category/add-category`,
        method: "POST",
        body: payload,
      }),
    }),
    updateCategory: builder.mutation<ICategory, any>({
      query: (payload) => ({
        url: `category/update-category`,
        method: "PUT",
        body: payload,
      }),
    }),
    deleteCategory: builder.mutation<ICategory, any>({
      query: (payload) => ({
        url: `category/delete-category`,
        method: METHODS.DELETE,
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
