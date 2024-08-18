import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { IAccount } from "../models";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllAccounts: builder.query<IPaging<IAccount>, void>({
      query: () => `account/get-all-accounts`,
    }),
  }),
});

export const { useGetAllAccountsQuery } = accountApi;
