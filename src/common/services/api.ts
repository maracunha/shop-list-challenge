import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../store';
import { User, IProducts, IPayloadForm, ICreateProduct } from '../types';
import { setUser } from './userSlice'

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
  tagTypes: ['Product'],
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
          const response: { data: User } = await queryFulfilled;
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
    getProductById: builder.query({
      query: (id: string) => ({ url: 'produto', params: { id } }),
      transformResponse: (response: IProducts[]) => response,
    }),
    seachProducts: builder.query({
      query: (search: string) => ({ url: 'produto', params: { search } }),
      transformResponse: (response: IProducts[]) => response,
    }),
    createProduct: builder.mutation({
      query: ({ body, isEditing, id }: ICreateProduct) => ({
        url: isEditing ? `produto/${id}` : 'produto',
        method: isEditing ? 'PUT' : 'POST',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSeachProductsQuery,
  useCreateUserMutation,
  useCreateProductMutation,
} = userApi;
