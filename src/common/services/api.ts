import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://6256fc506ea7037005434e84.mockapi.io/api/v1" }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (email) => ({ url: "user", params: { email } }),
      transformResponse: (response) => response,
    }),
  }),
});

export const { useGetUserQuery } = userApi;

