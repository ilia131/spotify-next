import { apiSlice } from './apiSlice';
import { Song } from '../features/playerSlice';

export interface Genre {
  id: number;
  name: string;
  songs_count: number;
  cover_image: string;
}

export interface GenreResponse {
  genre: {
    id: number;
    name: string;
    songs_count: number;
  };
  songs: {
    next: string | null;
    previous: string | null;
    results: Song[];
  };
}

export const GenreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSongbyGenre: builder.query<
      GenreResponse,
      { genre: string; nextUrl?: string | null }
    >({
      query: ({ genre, nextUrl }) => {
        // اگر nextUrl وجود داشت، از همون استفاده کن
        // وگرنه صفحه اول رو بگیر
        if (nextUrl) {
          return nextUrl; // معمولاً کامل هست، مثل /api/genres/browse/xxx/?page=2
        }
        return `/genres/browse/${genre}/`;
      },

      // همه صفحات یک ژانر رو زیر یک کلید نگه دار
      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs.genre;
      },

      // نتایج جدید رو به نتایج قبلی اضافه کن
      merge: (currentCache, newItems) => {
        if (newItems?.songs?.results?.length) {
          currentCache.songs.results.push(...newItems.songs.results);
          currentCache.songs.next = newItems.songs.next;
          currentCache.songs.previous = newItems.songs.previous;
        }
      },

      // فقط وقتی nextUrl عوض شد دوباره fetch کن
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.nextUrl !== previousArg?.nextUrl;
      },
    }),

    getAllGenre: builder.query({
      query: () => `/genres/browse/`,
    }),
  }),
});

export const { useGetSongbyGenreQuery, useGetAllGenreQuery } = GenreApiSlice;