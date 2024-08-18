import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const { REACT_APP_API_URL, REACT_APP_API_VER } = process.env;

const baseQuery = async (args: any, api: any, extraOptions: any) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: `${REACT_APP_API_URL}/api/${REACT_APP_API_VER}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("JWT");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  // Handle 401 Unauthorized response
  if (
    result.error &&
    (result.error.status == 401 || result.error.status == 403)
  ) {
    const to = `/login?redirect-from=${window.location.pathname}${window.location.search}`;
    window.location.href = to;
  }

  debugger;

  if (result.data && (result.data as IBaseResponse<any>).succeed) {
    result.data = (result.data as IBaseResponse<any>).data;
    return result;
  }

  console.log(result);
  throw new Error();
};

export default baseQuery;
