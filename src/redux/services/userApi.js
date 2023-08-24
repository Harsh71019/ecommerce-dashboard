import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'cookies-next';

export const userApi = createApi({
  reducerPath: 'userApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    prepareHeaders: (headers) => {
      const token = getCookie('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (arg) => ({
        url: `users?page=${arg.currentPage}&pageSize=${arg.pageSize}${
          Object.keys(arg.filters).length !== 0 ? arg.filters : ''
        }`,
      }),
    }),
    getUserById: builder.query({
      query: ({ id }) => `users/${id}`,
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: 'users/login',
        method: 'POST',
        body: { email, password },
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useLoginUserMutation } =
  userApi;
