import { createApi } from "@reduxjs/toolkit/query/react";
import { ISendMail } from "../models";
import baseQuery from "./baseQuery";

export const sendmailApi = createApi({
  reducerPath: "sendmailApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllSendMails: builder.query<IPaging<ISendMail>, void>({
      query: () => `sendmail`,
    }),
  }),
});

export const { useGetAllSendMailsQuery } = sendmailApi;
