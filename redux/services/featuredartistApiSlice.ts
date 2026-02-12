import { apiSlice } from './apiSlice';

const FeaturedArtistApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    featuredartists: builder.query({
      query: () => 'artists/featured/',
    }),
  }),
});

export const { useFeaturedartistsQuery } = FeaturedArtistApiSlice;
