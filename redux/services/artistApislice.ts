import { apiSlice } from "./apiSlice";
import { Song } from "../features/playerSlice";

export interface Shorts {
  id: number;
  user: {
    username: string;
  };
  main_artist: number;
  video: string;
  video_url: string;
  thumbnail: string | null;
  caption: string;
  duration: number;
  views: number;
  likes_count: number;
  created_at: string;
  uuid: string;
}

export type ArtistPickProps2 = {
  image: string;
  title: string;
};

export type Artist = {
  id: number;
  artistname: string;
  profile_pic: string;
  background: string;
  songs: Song[];
  shorts: Shorts[];
  bio: string;
  artist_pick: ArtistPickProps2;
  monthly_listeners: number;
  uuid: string;
};

export type Album = {
  id: number;
  title: string;
  release_date: string;
  cover: string;
  tracks: Song[];
  artist: {
    name: string;
  }[];
};

export type ShortVideo = {
  results: string[];
};

export interface BigArtist {
  id: number;
  artistname: string;
  profile_pic_url: string;
  background?: string;
  top_tracks: Song[];
  score: number;
}

/* =========================
   Subscription Types
========================= */

export interface ArtistSubscriptionPlan {
  id: string;
  artist: string;
  name: string;
  description: string;
  price: number | string;
  duration_days: number;
  is_active: boolean;
}

export interface ArtistSubscriptionPlanResponse {
  message?: string;
  plan: ArtistSubscriptionPlan;
}

export type SubscriptionTrackStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface SubscriptionTrackArtist {
  artist: string;
  status: SubscriptionTrackStatus;
  approved_at: string | null;
}

export interface SubscriptionTrackResponse {
  message?: string;

  song: {
    id: string;
    title: string | null;
  };

  is_subscription_only: boolean;

  approval?: {
    approved: number;
    total: number;
  };

  artists?: SubscriptionTrackArtist[];
}

export interface ArtistSubscriptionPurchaseResponse {
  message?: string;
  detail?: string;

  subscription_id: string;
  artist: string;
  plan: string;
  price: number | string;
  duration_days: number;
  status: "PENDING" | "ACTIVE" | "EXPIRED" | "CANCELLED";
}

export interface SongSubscriptionAccessResponse {
  /**
   * آیا کاربر در حال حاضر اجازه پخش دارد؟
   */
  can_play: boolean;

  /**
   * آیا خود آهنگ subscription-only است؟
   *
   * توجه:
   * این فیلد به معنی "کاربر باید اشتراک بخرد" نیست.
   * فقط مشخص می‌کند آهنگ قفل اشتراکی دارد یا نه.
   */
  requires_subscription: boolean;

  reason?: "LOGIN_REQUIRED" | "SUBSCRIPTION_REQUIRED";

  approval_status?: {
    artist: string;
    status: SubscriptionTrackStatus;
  }[];

  artists?: string[];
}

/* =========================
   API
========================= */

export const ArtistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* =========================
       Artists
    ========================= */

    artists: builder.query<Artist[], void>({
      query: () => "artists/",
    }),

    artistDetail: builder.query<Artist, string>({
      query: (artistname) => `artists/${artistname}/`,
    }),

    getSongPlayer: builder.query<Song, string>({
      query: (unique_id) => `player/${unique_id}/`,
    }),

    listenSong: builder.mutation<
      { success: boolean },
      {
        id: string;
        seconds: number;
        session_id: string;
      }
    >({
      query: ({ id, seconds, session_id }) => ({
        url: `player/${id}/listen/`,
        method: "POST",
        body: {
          seconds,
          session_id,
        },
      }),
    }),

    getBigCardArtists: builder.query<BigArtist[], void>({
      query: () => "/big-card-artists/",
    }),

    getFreshTrack: builder.query<Song[], void>({
      query: () => "fresh-tracks/",
    }),

    getTredingTrack: builder.query<Song[], void>({
      query: () => "trending/",
    }),

    getPopularAlbum: builder.query<Album[], void>({
      query: () => "albums/popular/",
    }),

    getPopularAlbumDetail: builder.query<
      Album[],
      {
        artist: string;
        albums: string;
      }
    >({
      query: ({ artist, albums }) =>
        `albums/popular/detail/?title=${albums}&artist=${artist}`,
    }),

    getAlbumDetail: builder.query<
      Album,
      {
        artist: string;
        albums: string;
      }
    >({
      query: ({ artist, albums }) =>
        `album/${artist}/${albums}/`,
    }),

    getArtistsList: builder.query({
      query: () => "/artistslist/",
    }),

    getAlbumsList: builder.query({
      query: () => "/albums/",
    }),

    /* =========================
       Favorite Artists
    ========================= */

    getFavArtists: builder.query({
      query: () => "me/favorite-artists/",
      providesTags: ["FavoriteArtists"],
    }),

    addFavArtist: builder.mutation({
      query: (artistname: string) => ({
        url: "me/favorite-artists/",
        method: "POST",
        body: {
          artistname,
        },
      }),
      invalidatesTags: ["FavoriteArtists"],
    }),

    removeFavArtist: builder.mutation({
      query: (artistname: string) => ({
        url: "me/favorite-artists/",
        method: "DELETE",
        body: {
          artistname,
        },
      }),
      invalidatesTags: ["FavoriteArtists"],
    }),

    /* =========================
       Shorts
    ========================= */

    getShortVideo: builder.query({
      query: (params) => ({
        url: "shorts/explore/",
        params,
      }),
    }),

    getShortVideoDetail: builder.query<Shorts, string>({
      query: (unique_id) => `shorts/${unique_id}/`,
    }),

    /* =====================================================
       ARTIST SUBSCRIPTION
    ===================================================== */

    /**
     * گرفتن پلن اشتراک آرتیست
     *
     * GET
     * /subscriptions/artists/{artistname}/subscription/
     */
    getArtistSubscriptionPlan: builder.query<
      ArtistSubscriptionPlan,
      string
    >({
      query: (artistname) =>
        `/subscriptions/artists/${artistname}/subscription/`,
      providesTags: (_result, _error, artistname) => [
        {
          type: "ArtistSubscription",
          id: artistname,
        },
      ],
    }),

    /**
     * ساخت یا آپدیت پلن اشتراک آرتیست
     *
     * POST
     * /subscriptions/artists/{artistname}/subscription/
     */
    createArtistSubscriptionPlan: builder.mutation<
      ArtistSubscriptionPlanResponse,
      {
        artistname: string;
        name?: string;
        description?: string;
        price: number;
        duration_days?: number;
      }
    >({
      query: ({
        artistname,
        name = "اشتراک ماهانه",
        description = "",
        price,
        duration_days = 30,
      }) => ({
        url: `/subscriptions/artists/${artistname}/subscription/`,
        method: "POST",
        body: {
          name,
          description,
          price,
          duration_days,
        },
      }),

      invalidatesTags: (_result, _error, { artistname }) => [
        {
          type: "ArtistSubscription",
          id: artistname,
        },
      ],
    }),

    /**
     * درخواست subscription-only کردن آهنگ
     *
     * POST
     * /subscriptions/artists/subscription/tracks/{song_id}/
     */
    requestSongSubscription: builder.mutation<
      SubscriptionTrackResponse,
      string
    >({
      query: (song_id) => ({
        url: `/subscriptions/artists/subscription/tracks/${song_id}/`,
        method: "POST",
      }),

      invalidatesTags: (_result, _error, song_id) => [
        {
          type: "SongSubscriptionAccess",
          id: song_id,
        },
      ],
    }),

    /**
     * تأیید یا رد subscription-only بودن آهنگ
     *
     * POST
     * /subscriptions/artists/subscription/tracks/{song_id}/approval/
     */
    approveSongSubscription: builder.mutation<
      SubscriptionTrackResponse,
      {
        song_id: string;
        action: "APPROVED" | "REJECTED";
      }
    >({
      query: ({ song_id, action }) => ({
        url: `/subscriptions/artists/subscription/tracks/${song_id}/approval/`,
        method: "POST",
        body: {
          action,
        },
      }),

      invalidatesTags: (_result, _error, { song_id }) => [
        {
          type: "SongSubscriptionAccess",
          id: song_id,
        },
      ],
    }),

    /**
     * گرفتن وضعیت approval آهنگ
     *
     * GET
     * /subscriptions/artists/subscription/tracks/{song_id}/status/
     */
    getSongSubscriptionStatus: builder.query<
      SubscriptionTrackResponse,
      string
    >({
      query: (song_id) =>
        `/subscriptions/artists/subscription/tracks/${song_id}/status/`,

      providesTags: (_result, _error, song_id) => [
        {
          type: "SongSubscriptionAccess",
          id: song_id,
        },
      ],
    }),

    /**
     * بررسی دسترسی کاربر به آهنگ
     *
     * GET
     * /subscriptions/songs/{song_id}/subscription/access/
     *
     * نتیجه:
     *
     * {
     *   can_play: true,
     *   requires_subscription: true
     * }
     */
    getSongSubscriptionAccess: builder.query<
      SongSubscriptionAccessResponse,
      string
    >({
      query: (song_id) =>
        `/subscriptions/songs/${song_id}/subscription/access/`,

      providesTags: (_result, _error, song_id) => [
        {
          type: "SongSubscriptionAccess",
          id: song_id,
        },
      ],
    }),

    /**
     * خرید اشتراک آرتیست
     *
     * POST
     * /subscriptions/artists/{artistname}/subscription/purchase/
     *
     * song_id فقط برای invalidate کردن access cache
     * استفاده می‌شود و به backend ارسال نمی‌شود.
     */
    purchaseArtistSubscription: builder.mutation<
      ArtistSubscriptionPurchaseResponse,
      {
        artistname: string;
        song_id?: string;
      }
    >({
      query: ({ artistname }) => ({
        url: `/subscriptions/artists/${artistname}/subscription/purchase/`,
        method: "POST",
      }),

      invalidatesTags: (_result, _error, { artistname, song_id }) => {
        const tags: Array<
          | "ArtistSubscription"
          | {
              type: "ArtistSubscription";
              id: string;
            }
          | {
              type: "SongSubscriptionAccess";
              id: string;
            }
        > = [
          {
            type: "ArtistSubscription",
            id: artistname,
          },
        ];

        if (song_id) {
          tags.push({
            type: "SongSubscriptionAccess",
            id: song_id,
          });
        }

        return tags;
      },
    }),
  }),
});

/* =========================
   Hooks
========================= */

export const {
  useGetAlbumsListQuery,
  useGetBigCardArtistsQuery,

  useGetFavArtistsQuery,
  useGetArtistsListQuery,
  useAddFavArtistMutation,
  useRemoveFavArtistMutation,

  useLazyGetShortVideoQuery,
  useGetShortVideoDetailQuery,
  useGetShortVideoQuery,

  useArtistsQuery,
  useArtistDetailQuery,

  useGetSongPlayerQuery,
  useLazyGetSongPlayerQuery,

  useListenSongMutation,

  useGetFreshTrackQuery,
  useGetTredingTrackQuery,

  useGetPopularAlbumQuery,
  useGetPopularAlbumDetailQuery,
  useGetAlbumDetailQuery,

  // Subscription
  useGetArtistSubscriptionPlanQuery,
  useCreateArtistSubscriptionPlanMutation,

  useRequestSongSubscriptionMutation,
  useApproveSongSubscriptionMutation,
  useGetSongSubscriptionStatusQuery,

  useGetSongSubscriptionAccessQuery,
  useLazyGetSongSubscriptionAccessQuery,

  usePurchaseArtistSubscriptionMutation,
} = ArtistApiSlice;