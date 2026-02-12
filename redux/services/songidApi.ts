import { apiSlice } from './apiSlice';

export const songidApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getsongid: builder.query({
        query: (id) => `/artist/${id}/`,
      }),
  }),
});

export const { useGetsongidQuery} = songidApiSlice;
