import { apiSlice } from './apiSlice';

export const SearchApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getSearch: builder.query({
        query: (query) => `/search/?q=${query}/`,
      }),
  }),
});

export const { useGetSearchQuery } = SearchApiSlice;