import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const masterDataApi = createApi({
  reducerPath: "masterDataApi",
  baseQuery,
  endpoints: (builder) => ({
    getMasterData: builder.query<any, void>({
      query: () => `master-data/get-by-key`,
    }),
  }),
});

export const { useGetMasterDataQuery } = masterDataApi;
