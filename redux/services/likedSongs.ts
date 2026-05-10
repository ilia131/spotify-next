import { apiSlice } from "./apiSlice";
import { Song } from "../features/playerSlice";

export const ArtistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    toggleLikeSong: builder.mutation<{ liked: boolean }, string>({
      query: (uuid) => ({
        url: `songs/${uuid}/like/`,
        method: "POST",
      }),

      async onQueryStarted(uuid, { dispatch, queryFulfilled }) {

        const patch = dispatch(
          ArtistApiSlice.util.updateQueryData(
            "getLikedStatus",
            [uuid],
            (draft: Record<string, boolean>) => {
              draft[uuid] = !draft[uuid]
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          patch.undo()
        }
      },

      invalidatesTags: ["LikedSongs"],
    }),

    getLikedSongs: builder.query<Song[], void>({
      query: () => `liked-songs/`,
      providesTags: ["LikedSongs"],
    }),

    getLikedStatus: builder.query<Record<string, boolean>, string[]>({
      query: (ids: string[]) => ({
        url: `songs/liked/status/`,
        params: { ids: ids.join(",") },
      }),
      providesTags: ["LikedSongs"],
    }),

  }),
});

export const {
  useToggleLikeSongMutation,
  useGetLikedSongsQuery,
  useGetLikedStatusQuery,
} = ArtistApiSlice;
