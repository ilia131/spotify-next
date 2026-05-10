import { Song } from '../features/playerSlice';
import { apiSlice } from './apiSlice';

export interface SongItem {
  song: Song
}

export interface Playlist {
  id: number;
  name: string;
  unique_id: string;
  tracks_count?: number
  tracks: SongItem[];
}

export interface PlaylistTrack {
  id: number;
  name: string
  tracks: Song[];
  added_at: string;
  position: number | null;
}

export const playlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // --- ساخت پلی‌لیست ---
    createPlaylist: builder.mutation({
      query: (data) => ({
        url: `/playlists/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Playlists"],
    }),

    // --- اضافه کردن آهنگ ---
    addTrackToPlaylist: builder.mutation({
      query: ({ playlistId, song_uuid }) => ({
        url: `/playlists/${playlistId}/add-track/`,
        method: "POST",
        body: { song_uuid },
      }),
      invalidatesTags: (result, error, { playlistId }) => [
        { type: "Playlists", id: playlistId },
      ],
    }),

    removeTrackFromPlaylist: builder.mutation({
      query: ({ playlistId, song_uuid }) => ({
        url: `/playlists/${playlistId}/remove-track/`,
        method: "POST",
        body: { song_uuid },
      }),
      invalidatesTags: (result, error, { playlistId }) => [
        { type: "Playlists", id: playlistId },
      ],
    }),

    // --- لیست پلی‌لیست‌های کاربر ---
    getUserPlaylists: builder.query<Playlist[], number>({
      query: () => `/playlists/`,
      providesTags: ["Playlists"],
    }),

    // --- دریافت یک پلی‌لیست ---
    getPlaylistById: builder.query<PlaylistTrack, string>({
      query: (playlistId) => `/playlists/${playlistId}/`,
      providesTags: (result, error, id) => [
        { type: "Playlists", id },
      ],
    }),

  }),
});

export const { 
  useCreatePlaylistMutation,
  useAddTrackToPlaylistMutation,
  useRemoveTrackFromPlaylistMutation,
  useGetUserPlaylistsQuery,
  useGetPlaylistByIdQuery
} = playlistApiSlice;
