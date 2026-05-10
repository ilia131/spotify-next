import { apiSlice } from './apiSlice';
import { Song } from '../features/playerSlice';
export interface Genre {
  id: number
  name: string
  songs_count: number
  cover_image: string
}

export interface GenreResponse {
  genre: {
    id: number
    name: string
    songs_count: number
  }

  songs: {
    next: string | null
    previous: string | null
    results: Song[]
  }
}

export const GenreApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getSongbyGenre: builder.query<GenreResponse, string>({
        query: (genre) => `/genres/browse/${genre}/`,
      }),
    getAllGenre: builder.query({
        query: () => `/genres/browse/`,
      }),
    
  }),
});

export const { useGetSongbyGenreQuery  , useGetAllGenreQuery} = GenreApiSlice;