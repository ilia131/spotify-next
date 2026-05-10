import { apiSlice } from "./apiSlice";

export const followApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    followArtist: builder.mutation({
      query: (artist_id) => ({
        url: `/artists/${artist_id}/follow/`,
        method: "POST",
      }),
    }),

    getArtistFollowers: builder.query({
      query: (artist_id) => `/artists/${artist_id}/followers/`,
    }),

    isFollowing: builder.query({
      query: (artist_id) => `/artists/${artist_id}/is-following/`,
    }),

    getUserFollowing: builder.query({
      query: () => `/artists/following/`,
    }),

  }),
});

export const {
  useFollowArtistMutation,
  useGetArtistFollowersQuery,
  useIsFollowingQuery,
  useGetUserFollowingQuery,
} = followApiSlice;
