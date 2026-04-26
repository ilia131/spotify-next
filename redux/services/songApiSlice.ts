import { apiSlice } from './apiSlice';

export const songApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    playSong: builder.mutation({
      query: (songId: number) => ({
        url: `/songs/${songId}/play/`,
        method: 'POST',
      }),
    
    }),
    getRecentlyPlayed: builder.query({
        query: () => '/recently-played/',
      }),
  }),
});

export const { usePlaySongMutation , useGetRecentlyPlayedQuery} = songApiSlice;
