import { apiSlice } from './apiSlice';

export const SuggestApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getSuggestSong: builder.query({
        query: (uuid) => `recommendations/suggest/${uuid}/`,
      }),
  }),
});

export const { useGetSuggestSongQuery } = SuggestApiSlice;