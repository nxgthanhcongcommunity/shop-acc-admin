import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { IInvoice } from "../models";

export const invoiceApi = createApi({
  reducerPath: "invoiceApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllInvoices: builder.query<IPaging<IInvoice>, void>({
      query: () => `invoice/get`,
    }),
    // getAllInvoices: builder.query<IPaging<IInvoice>, void>({
    //   query: () => `invoice/get`,
    // }),
  }),
});

export const { useGetAllInvoicesQuery } = invoiceApi;
