import { apiSlice } from "./apiSlice";
import { Album } from "./artistApislice";

export const artistContentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getArtistSongs: builder.query({
      query: ({ artistname, cursor }) => {
        let url = `/artists/${artistname}/songs/`;
        if (cursor) url += `?cursor=${cursor}`;
        return url;
      },
    }),

    getArtistAlbums: builder.query({
      query: ({ artistname, cursor }) => {
        let url = `/artists/${artistname}/albums/`;
        if (cursor) url += `?cursor=${cursor}`;
        return url;
      },

      // مهم برای infinite scroll
      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs.artistname;
      },

      merge: (currentCache, newItems) => {
        const map = new Map(
          currentCache.results?.map((a: Album) => [a.id, a])
        );

        newItems.results?.forEach((a: Album) => {
          map.set(a.id, a);
        });

        currentCache.results = Array.from(map.values());
        currentCache.next = newItems.next;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.cursor !== previousArg?.cursor;
      },
    }),

  }),
});

export const {
  useGetArtistSongsQuery,
  useGetArtistAlbumsQuery,
} = artistContentApiSlice;
