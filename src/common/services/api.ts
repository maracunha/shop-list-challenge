import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../store';
import { User, IProducts, IPayloadForm } from '../types';
import { setUser } from './userSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6256fc506ea7037005434e84.mockapi.io/api/v1',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).user.value.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (email: string) => ({ url: 'user', params: { email } }),
      transformResponse: (response: User[]) => response,
    }),

    createUser: builder.mutation({
      query: (body: IPayloadForm) => ({ url: 'user', method: 'POST', body }),
      // transformResponse: (response: User[]) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const response: {data: User} = await queryFulfilled;
          dispatch(setUser(response.data));
        } catch (err) {
          console.error('Error on create user');
        }
      },
    }),

    getProducts: builder.query({
      query: ({ page, search }: { page: number; search: string }) => ({
        url: 'produto',
        params: { page, limit: 15, search },
      }),
      transformResponse: (response: IProducts[]) => response,
    }),
    seachProducts: builder.query({
      query: (search: string) => ({ url: 'produto', params: { search } }),
      transformResponse: (response: IProducts[]) => response,
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useSeachProductsQuery,
  useCreateUserMutation,
} = userApi;
