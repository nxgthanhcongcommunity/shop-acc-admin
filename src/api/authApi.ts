import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    signinWithGoogle: builder.mutation<any, any>({
      query: (payload) => ({
        url: `auth/google`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useSigninWithGoogleMutation } = authApi;
