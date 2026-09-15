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
    getForYou: builder.query({
        query: () => '/recommendations/for-you/',
      }),
    getSongDetail: builder.query({
        query: (uniqueId) => `tracks/${uniqueId}/`,
      }),
  }),
  
});

export const { usePlaySongMutation , useGetRecentlyPlayedQuery , useGetForYouQuery , useGetSongDetailQuery} = songApiSlice;
