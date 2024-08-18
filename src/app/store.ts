import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { accountApi } from "../api/accountApi";
import { authApi } from "../api/authApi";
import { categoryApi } from "../api/categoryApi";
import { masterDataApi } from "../api/masterDataApi";
import { invoiceApi } from "../api/invoiceApi";
import { sendmailApi } from "../api/sendmailApi";
import { transactionApi } from "../api/transactionApi";
import { productApi } from "../api/productApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [masterDataApi.reducerPath]: masterDataApi.reducer,
    [invoiceApi.reducerPath]: invoiceApi.reducer,
    [sendmailApi.reducerPath]: sendmailApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(accountApi.middleware)
      .concat(authApi.middleware)
      .concat(categoryApi.middleware)
      .concat(masterDataApi.middleware)
      .concat(invoiceApi.middleware)
      .concat(sendmailApi.middleware)
      .concat(transactionApi.middleware)
      .concat(productApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
