import { apiSlice } from "@/redux/services/apiSlice";

export interface AdminArtist {
  id: number;
  uuid: string;
  artistname: string;
  bio: string;

  username: string;
  email: string;

  profile_pic: string;
  background: string;

  is_featured: boolean;
  is_active: boolean;

  monthly_listeners: number;
  followers_count: number;

  created_at: string;
}

interface ArtistsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminArtist[];
}

interface ToggleFeaturedResponse {
  id: number;
  artistname: string;
  is_featured: boolean;
}

interface ToggleActiveResponse {
  id: number;
  artistname: string;
  is_active: boolean;
}

export interface CreateArtistRequest {
  user_id: number;
  artistname: string;
  bio: string;
  profile_pic?: File | null;
  background?: File | null;
  is_featured: boolean;
  monthly_listeners: number;
}

export interface UpdateArtistRequest {
  artistname?: string;
  bio?: string;
  profile_pic?: File | null;
  background?: File | null;
  is_featured?: boolean;
  monthly_listeners?: number;
}

export const adminArtistsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // =========================
    // GET ARTISTS
    // =========================

    getAdminArtists: builder.query<
      ArtistsResponse,
      {
        page?: number;
        search?: string;
        is_featured?: string;
        is_active?: string;
      }
    >({
      query: ({
        page = 1,
        search = "",
        is_featured = "",
        is_active = "",
      }) => {
        const params = new URLSearchParams();

        params.set("page", String(page));

        if (search) {
          params.set("search", search);
        }

        if (is_featured) {
          params.set("is_featured", is_featured);
        }

        if (is_active) {
          params.set("is_active", is_active);
        }

        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("admin_access")
            : null;

        return {
          url: `/admin/artists/?${params.toString()}`,
          method: "GET",
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        };
      },

      providesTags: ["AdminArtists"],
    }),

    // =========================
    // GET SINGLE ARTIST
    // =========================

    getAdminArtist: builder.query<AdminArtist, number>({
      query: (id) => {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("admin_access")
            : null;

        return {
          url: `/admin/artists/${id}/`,
          method: "GET",
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        };
      },

      providesTags: (_result, _error, id) => [
        {
          type: "AdminArtists",
          id,
        },
      ],
    }),

    // =========================
    // CREATE ARTIST
    // =========================

    createArtist: builder.mutation<
      AdminArtist,
      CreateArtistRequest
    >({
      query: ({
        user_id,
        artistname,
        bio,
        profile_pic,
        background,
        is_featured,
        monthly_listeners,
      }) => {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("admin_access")
            : null;

        const formData = new FormData();

        formData.append("user_id", String(user_id));
        formData.append("artistname", artistname);
        formData.append("bio", bio);
        formData.append(
          "is_featured",
          String(is_featured)
        );
        formData.append(
          "monthly_listeners",
          String(monthly_listeners)
        );

        if (profile_pic) {
          formData.append("profile_pic", profile_pic);
        }

        if (background) {
          formData.append("background", background);
        }

        return {
          url: `/admin/artists/create/`,
          method: "POST",
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
          body: formData,
        };
      },

      invalidatesTags: ["AdminArtists"],
    }),

    // =========================
    // UPDATE ARTIST
    // =========================

    updateArtist: builder.mutation<
      AdminArtist,
      {
        id: number;
        data: UpdateArtistRequest;
      }
    >({
      query: ({ id, data }) => {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("admin_access")
            : null;

        const formData = new FormData();

        if (data.artistname !== undefined) {
          formData.append(
            "artistname",
            data.artistname
          );
        }

        if (data.bio !== undefined) {
          formData.append("bio", data.bio);
        }

        if (data.is_featured !== undefined) {
          formData.append(
            "is_featured",
            String(data.is_featured)
          );
        }

        if (data.monthly_listeners !== undefined) {
          formData.append(
            "monthly_listeners",
            String(data.monthly_listeners)
          );
        }

        if (data.profile_pic) {
          formData.append(
            "profile_pic",
            data.profile_pic
          );
        }

        if (data.background) {
          formData.append(
            "background",
            data.background
          );
        }

        return {
          url: `/admin/artists/${id}/update/`,
          method: "PATCH",
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
          body: formData,
        };
      },

      invalidatesTags: (_result, _error, { id }) => [
        "AdminArtists",
        {
          type: "AdminArtists",
          id,
        },
      ],
    }),

    // =========================
    // TOGGLE FEATURED
    // =========================

    toggleArtistFeatured: builder.mutation<
      ToggleFeaturedResponse,
      number
    >({
      query: (id) => {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("admin_access")
            : null;

        return {
          url: `/admin/artists/${id}/toggle-featured/`,
          method: "PATCH",
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        };
      },

      invalidatesTags: ["AdminArtists"],
    }),

    // =========================
    // TOGGLE ACTIVE
    // =========================

    toggleArtistActive: builder.mutation<
      ToggleActiveResponse,
      number
    >({
      query: (id) => {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("admin_access")
            : null;

        return {
          url: `/admin/artists/${id}/toggle-active/`,
          method: "PATCH",
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        };
      },

      invalidatesTags: ["AdminArtists"],
    }),
  }),
});

export const {
  useGetAdminArtistsQuery,
  useGetAdminArtistQuery,
  useCreateArtistMutation,
  useUpdateArtistMutation,
  useToggleArtistFeaturedMutation,
  useToggleArtistActiveMutation,
} = adminArtistsApi;