import { apiSlice } from "@/redux/services/apiSlice";

export interface AdminPlaylistTrack {
  id: number;
  song_id: number;
  song_unique_id: string;
  song_title: string | null;
  song_image: string | null;
  artists: {
    id: number;
    artistname: string;
  }[];
  position: number;
}

export interface AdminPlaylist {
  id: number;
  unique_id: string;
  name: string;
  username: string;
  user_email: string;
  tracks_count: number;
}

export interface AdminPlaylistDetail extends AdminPlaylist {
  tracks: AdminPlaylistTrack[];
}

interface AdminPlaylistResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminPlaylist[];
}

const getAdminToken = () => {
  if (typeof window === "undefined") return "";

  return localStorage.getItem("admin_access") || "";
};

export const adminPlaylistsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminPlaylists: builder.query<
      AdminPlaylistResponse,
      {
        page?: number;
        search?: string;
      }
    >({
      query: ({ page = 1, search = "" }) => {
        const params = new URLSearchParams();

        params.set("page", String(page));

        if (search.trim()) {
          params.set("search", search.trim());
        }

        return {
          url: `/access/playlists/?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        };
      },

      providesTags: ["AdminPlaylists"],
    }),

    getAdminPlaylist: builder.query<
      AdminPlaylistDetail,
      string
    >({
      query: (uniqueId) => ({
        url: `/access/playlists/${uniqueId}/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),

      providesTags: (_result, _error, uniqueId) => [
        {
          type: "AdminPlaylists",
          id: uniqueId,
        },
      ],
    }),

    deleteAdminPlaylist: builder.mutation<
      void,
      string
    >({
      query: (uniqueId) => ({
        url: `/access/playlists/${uniqueId}/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),

      invalidatesTags: ["AdminPlaylists"],
    }),
  }),
});

export const {
  useGetAdminPlaylistsQuery,
  useGetAdminPlaylistQuery,
  useDeleteAdminPlaylistMutation,
} = adminPlaylistsApi;