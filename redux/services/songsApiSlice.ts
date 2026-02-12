import { apiSlice } from './apiSlice';

export const songsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getsongs: builder.query({
        query: () => `/songs/`,
      }),
  }),
});

export const { useGetsongsQuery} = songsApiSlice;