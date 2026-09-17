import { apiSlice } from "@/redux/services/apiSlice";

export interface AdminSongArtist {
  artist_id: number;
  artistname: string;
  role: "main" | "feature" | "producer";
  order: number;
}

export interface AdminSong {
  id: number;
  unique_id: string;

  title: string | null;
  description: string | null;

  artists: AdminSongArtist[];

  genre: number | null;
  genre_name: string | null;

  album: number | null;
  album_title: string | null;
  track_number: number | null;

  image: string;
  track: string;

  popularity: number;
  tempo: number;
  energy: number;
  danceability: number;
  loudness: number | null;
  valence: number | null;
  acousticness: number | null;

  verified: boolean;

  total_revenue: string;
  plays_last_24h: number;
  unique_listeners: number;
  play_count: number;
  total_listen_time: number;

  is_published: boolean;

  release_date: string;
}

interface SongsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminSong[];
}

interface TogglePublishedResponse {
  id: number;
  title: string;
  is_published: boolean;
}

interface ToggleVerifiedResponse {
  id: number;
  title: string;
  verified: boolean;
}

export interface CreateSongRequest {
  title: string;
  description: string;
  artist_ids: number[];
  genre?: number | null;
  album?: number | null;
  track_number?: number | null;

  image?: File | null;
  track?: File | null;

  popularity?: number;
  tempo?: number;
  energy?: number;
  danceability?: number;
  loudness?: number | null;
  valence?: number | null;
  acousticness?: number | null;

  verified: boolean;
  is_published: boolean;
  release_date: string;
}

export interface UpdateSongRequest {
  title?: string;
  description?: string;
  artist_ids?: number[];

  genre?: number | null;
  album?: number | null;
  track_number?: number | null;

  image?: File | null;
  track?: File | null;

  popularity?: number;
  tempo?: number;
  energy?: number;
  danceability?: number;
  loudness?: number | null;
  valence?: number | null;
  acousticness?: number | null;

  verified?: boolean;
  is_published?: boolean;
  release_date?: string;
}

const getAdminToken = () => {
  if (typeof window === "undefined") return "";

  return localStorage.getItem("admin_access") || "";
};

const createFormData = (
  data: CreateSongRequest | UpdateSongRequest
) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, String(item));
      });

      return;
    }

    formData.append(key, String(value));
  });

  return formData;
};

export const adminSongsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminSongs: builder.query<
      SongsResponse,
      {
        page?: number;
        search?: string;
        genre?: string;
        album?: string;
        artist?: string;
        is_published?: string;
        verified?: string;
      }
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();

        if (params.page)
          searchParams.set("page", String(params.page));

        if (params.search)
          searchParams.set("search", params.search);

        if (params.genre)
          searchParams.set("genre", params.genre);

        if (params.album)
          searchParams.set("album", params.album);

        if (params.artist)
          searchParams.set("artist", params.artist);

        if (params.is_published)
          searchParams.set(
            "is_published",
            params.is_published
          );

        if (params.verified)
          searchParams.set(
            "verified",
            params.verified
          );

        return {
          url: `/access/songs/?${searchParams.toString()}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        };
      },

      providesTags: ["AdminSongs"],
    }),

    getAdminSong: builder.query<AdminSong, number>({
      query: (id) => ({
        url: `/access/songs/${id}/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
    
      transformResponse: (response: AdminSong): AdminSong => {
        return {
          ...response,
          artists: Array.isArray(response.artists)
            ? response.artists.map((artist) => ({
                ...artist,
              }))
            : [],
        };
      },
    
      providesTags: (_result, _error, id) => [
        {
          type: "AdminSongs",
          id,
        },
      ],
    }),

    createAdminSong: builder.mutation<
      AdminSong,
      CreateSongRequest
    >({
      query: (data) => ({
        url: "/access/songs/create/",
        method: "POST",
        body: createFormData(data),
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),

      invalidatesTags: ["AdminSongs"],
    }),

    updateAdminSong: builder.mutation<
      AdminSong,
      {
        id: number;
        data: UpdateSongRequest;
      }
    >({
      query: ({ id, data }) => ({
        url: `/access/songs/${id}/update/`,
        method: "PATCH",
        body: createFormData(data),
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),

      invalidatesTags: (_result, _error, { id }) => [
        "AdminSongs",
        {
          type: "AdminSongs",
          id,
        },
      ],
    }),

    toggleAdminSongPublished:
      builder.mutation<
        TogglePublishedResponse,
        number
      >({
        query: (id) => ({
          url: `/access/songs/${id}/toggle-published/`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        }),

        invalidatesTags: (_result, _error, id) => [
          "AdminSongs",
          {
            type: "AdminSongs",
            id,
          },
        ],
      }),

    toggleAdminSongVerified:
      builder.mutation<
        ToggleVerifiedResponse,
        number
      >({
        query: (id) => ({
          url: `/access/songs/${id}/toggle-verified/`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        }),

        invalidatesTags: (_result, _error, id) => [
          "AdminSongs",
          {
            type: "AdminSongs",
            id,
          },
        ],
      }),
  }),
});

export const {
  useGetAdminSongsQuery,
  useGetAdminSongQuery,
  useCreateAdminSongMutation,
  useUpdateAdminSongMutation,
  useToggleAdminSongPublishedMutation,
  useToggleAdminSongVerifiedMutation,
} = adminSongsApi;