import { apiSlice } from './apiSlice';

const ArtistApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    artists: builder.query({
      query: () => 'artists/',
    }),
  }),
});

export const { useArtistsQuery } = ArtistApiSlice;