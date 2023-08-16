import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'cookies-next';

export const productApi = createApi({
  reducerPath: 'productApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    prepareHeaders: (headers) => {
      // Add the bearer token to the headers
      const token = getCookie('authToken'); // Assuming you store the token in local storage
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (page, filters) => ({
        url: `products?page=${page}${filters ? filters : ' '}`,
      }),
    }),
    getProductById: builder.query({
      query: ({ id }) => `products/${id}`,
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: 'products',
        method: 'POST',
        body: newProduct,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, updatedProduct }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: updatedProduct,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
