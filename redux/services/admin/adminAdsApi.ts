import { apiSlice } from "../apiSlice";

/* =========================================================
   ADMIN TOKEN
========================================================= */

const getAdminToken = () => {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem("admin_access") || "";
};

/* =========================================================
   TYPES
========================================================= */

export interface Advertisement {
  id: string;

  title: string;
  description: string;

  ad_type: "IMAGE" | "VIDEO";

  image: string | null;
  video: string | null;

  target_url: string;

  placement:
    | "HOME"
    | "SEARCH"
    | "PLAYER"
    | "ARTIST"
    | "ALBUM"
    | "DISCOVERY"
    | string;

  pricing_model: "CPM" | "CPC" | "CPV";

  price: number | string;

  duration: number;

  is_active: boolean;

  campaign: string;
  campaign_name: string;
  advertiser_name: string;
  advertiser:string
  budget: number | string;
  spent: number | string;

  created_at: string;
  updated_at: string;
}

/* =========================================================
   STATS
========================================================= */

export interface AdvertisementStats {
  impressions: number;
  clicks: number;

  ctr: number;

  completed: number;

  completion_rate: number;

  watched_seconds: number;

  average_watched_percentage: number;
}

/* =========================================================
   DAILY STATS
========================================================= */

export interface DailyStat {
  date: string;

  impressions: number;

  clicks: number;

  completed: number;
}

/* =========================================================
   AD DETAIL + STATS
========================================================= */

export interface AdvertisementDetail {
  advertisement: Advertisement;

  stats: AdvertisementStats;

  daily_stats: DailyStat[];
}

/* =========================================================
   PAGINATION
========================================================= */

export interface PaginatedAds {
  count: number;

  next: string | null;

  previous: string | null;

  results: Advertisement[];
}

/* =========================================================
   CAMPAIGN
========================================================= */

export interface Campaign {
  id: string;

  name: string;

  advertiser: string;

  budget: number | string;

  spent: number | string;

  status:
    | "DRAFT"
    | "ACTIVE"
    | "PAUSED"
    | "COMPLETED"
    | string;
}

/* =========================================================
   CREATE PAYLOAD
========================================================= */

export interface CreateAdvertisementPayload {
  campaign: string;

  title: string;

  description?: string;

  ad_type: "IMAGE" | "VIDEO";

  image?: File | null;

  video?: File | null;

  target_url: string;

  placement:
    | "HOME"
    | "SEARCH"
    | "PLAYER"
    | "ARTIST"
    | "ALBUM"
    | "DISCOVERY";

  pricing_model: "CPM" | "CPC" | "CPV";

  price: string | number;

  duration: number;

  is_active: boolean;
}

/* =========================================================
   QUERY PARAMS
========================================================= */

export interface AdminAdsQueryParams {
  page?: number;

  search?: string;

  ad_type?: string;

  placement?: string;

  pricing_model?: string;

  is_active?: string;

  campaign?: string;
}

/* =========================================================
   API
========================================================= */

export const adminAdsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* =====================================================
       GET ADMIN ADS
    ===================================================== */

    getAdminAds: builder.query< PaginatedAds, AdminAdsQueryParams >({ query: (params) => { const { page = 1, search = "", ad_type = "", placement = "", pricing_model = "", is_active = "", campaign = "", } = params; const queryParams = new URLSearchParams(); queryParams.set( "page", String(page) ); if (search.trim()) { queryParams.set( "search", search.trim() ); } if (ad_type) { queryParams.set( "ad_type", ad_type ); } if (placement) { queryParams.set( "placement", placement ); } if (pricing_model) { queryParams.set( "pricing_model", pricing_model ); } if (is_active) { queryParams.set( "is_active", is_active ); } if (campaign) { queryParams.set( "campaign", campaign ); } return { url: `ads/access/ads/?${queryParams.toString()}`, method: "GET", headers: { Authorization: `Bearer ${getAdminToken()}`, }, }; }, providesTags: (result) => [ { type: "AdminAds", id: "LIST", }, ...(result?.results ?? []).map( (ad) => ({ type: "AdminAds" as const, id: ad.id, }) ), ], }),

    /* =====================================================
       GET SINGLE AD + STATS
    ===================================================== */

    getAdminAd: builder.query<
      AdvertisementDetail,
      string
    >({
      query: (id) => ({
        url: `ads/access/ads/${id}/stats/`,
        method: "GET",

        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),

      providesTags: (
        _result,
        _error,
        id
      ) => [
        {
          type: "AdminAds",
          id,
        },
      ],
    }),

    /* =====================================================
       CREATE AD
    ===================================================== */

    createAdminAd: builder.mutation<
      Advertisement,
      FormData
    >({
      query: (body) => ({
        url: "ads/access/ads/",
        method: "POST",
        body,

        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),

      invalidatesTags: [
        {
          type: "AdminAds",
          id: "LIST",
        },
      ],
    }),

    /* =====================================================
       UPDATE AD
    ===================================================== */

    updateAdminAd: builder.mutation<
      Advertisement,
      {
        id: string;
        body: FormData;
      }
    >({
      query: ({
        id,
        body,
      }) => ({
        url: `ads/access/ads/${id}/`,
        method: "PATCH",
        body,

        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),

      invalidatesTags: (
        _result,
        _error,
        { id }
      ) => [
        {
          type: "AdminAds",
          id,
        },

        {
          type: "AdminAds",
          id: "LIST",
        },
      ],
    }),

    /* =====================================================
       DELETE AD
    ===================================================== */

    deleteAdminAd: builder.mutation<
      void,
      string
    >({
      query: (id) => ({
        url: `ads/access/ads/${id}/`,
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),

      invalidatesTags: (
        _result,
        _error,
        id
      ) => [
        {
          type: "AdminAds",
          id,
        },

        {
          type: "AdminAds",
          id: "LIST",
        },
      ],
    }),

    /* =====================================================
       GET CAMPAIGNS
    ===================================================== */

    getCampaigns: builder.query<
      Campaign[],
      void
    >({
      query: () => ({
        url: "ads/campaigns/",
        method: "GET",

        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),

      providesTags: [
        {
          type: "AdminAds",
          id: "CAMPAIGNS",
        },
      ],
    }),
  }),

  overrideExisting: false,
});

/* =========================================================
   HOOKS
========================================================= */

export const {
  useGetAdminAdsQuery,
  useGetAdminAdQuery,
  useCreateAdminAdMutation,
  useUpdateAdminAdMutation,
  useDeleteAdminAdMutation,
  useGetCampaignsQuery,
} = adminAdsApi;
