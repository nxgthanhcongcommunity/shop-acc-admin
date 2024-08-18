import { createApi } from "@reduxjs/toolkit/query/react";
import { ITransaction } from "../models";
import baseQuery from "./baseQuery";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllTransactions: builder.query<IPaging<ITransaction>, void>({
      query: () => `transaction/get`,
    }),
  }),
});

export const { useGetAllTransactionsQuery } = transactionApi;
