import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const { REACT_APP_API_URL, REACT_APP_API_VER } = process.env;

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${REACT_APP_API_URL}/api/${REACT_APP_API_VER}`,
  }),

  endpoints: (builder) => ({
    getAllAccounts: builder.query<any, void>({
      query: () => `account/get-all-accounts`,
    }),
  }),
});

export const { useGetAllAccountsQuery } = appApi;
