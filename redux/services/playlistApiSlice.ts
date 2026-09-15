import { Song } from "../features/playerSlice";
import { apiSlice } from "./apiSlice";

export interface SongItem {
  song: Song;
}

export interface Playlist {
  id: number;
  name: string;
  unique_id: string;
  tracks_count?: number;
  tracks: SongItem[];
}

export interface PlaylistTrack {
  id: number;
  name: string;
  unique_id: string;
  tracks: SongItem[];
  tracks_count?: number;
  added_at?: string;
  position?: number | null;
}

export const playlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // =========================
    // Create Playlist
    // =========================
    createPlaylist: builder.mutation({
      query: (data) => ({
        url: `/playlists/`,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Playlists"],
    }),

    // =========================
    // Add Track To Playlist
    // =========================
    addTrackToPlaylist: builder.mutation({
      query: ({
        playlistId,
        song_uuid,
      }: {
        playlistId: string | number;
        song_uuid: string;
      }) => ({
        url: `/playlists/${playlistId}/add-track/`,
        method: "POST",
        body: {
          song_uuid,
        },
      }),

      invalidatesTags: (result, error, { playlistId }) => [
        "Playlists",
        {
          type: "Playlists",
          id: String(playlistId),
        },
      ],
    }),

    // =========================
    // Remove Track
    // =========================
    removeTrackFromPlaylist: builder.mutation({
      query: ({
        playlistId,
        song_uuid,
      }: {
        playlistId: string | number;
        song_uuid: string;
      }) => ({
        url: `/playlists/${playlistId}/remove-track/`,
        method: "POST",
        body: {
          song_uuid,
        },
      }),

      invalidatesTags: (result, error, { playlistId }) => [
        "Playlists",
        {
          type: "Playlists",
          id: String(playlistId),
        },
      ],
    }),

    // =========================
    // User Playlists
    // =========================
    getUserPlaylists: builder.query<Playlist[], number | void>({
      query: () => `/playlists/`,

      providesTags: (result) => [
        "Playlists",

        ...(result ?? []).map((playlist) => ({
          type: "Playlists" as const,
          id: String(playlist.unique_id),
        })),

        ...(result ?? []).map((playlist) => ({
          type: "Playlists" as const,
          id: String(playlist.id),
        })),
      ],
    }),

    // =========================
    // Single Playlist
    // =========================
    getPlaylistById: builder.query<
      PlaylistTrack,
      string
    >({
      query: (playlistId) =>
        `/playlists/${playlistId}/`,

      providesTags: (result, error, playlistId) => [
        "Playlists",
        {
          type: "Playlists",
          id: String(playlistId),
        },
      ],
    }),
  }),
});

export const {
  useCreatePlaylistMutation,
  useAddTrackToPlaylistMutation,
  useRemoveTrackFromPlaylistMutation,
  useGetUserPlaylistsQuery,
  useGetPlaylistByIdQuery,
} = playlistApiSlice;