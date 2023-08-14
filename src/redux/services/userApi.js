import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
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
