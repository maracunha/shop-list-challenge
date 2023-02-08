import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://6256fc506ea7037005434e84.mockapi.io/api/v1" }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (email: string) => ({ url: "user", params: { email } }),
      transformResponse: (response: User[]) => response,
    }),
  }),
});

export const { useGetUserQuery } = userApi;

