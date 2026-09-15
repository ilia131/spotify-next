import { apiSlice } from "./apiSlice";

export interface Advertisement {
  id: string;
  campaign: string;
  advertiser: string;
  title: string;
  description: string;
  ad_type: "IMAGE" | "VIDEO";
  image: string | null;
  video: string | null;
  target_url: string;
  placement: string;
  pricing_model: "CPM" | "CPC" | "CPV";
  price: string;
  duration: number;
  is_active: boolean;
  created_at: string;
}

export const adsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayerAds: builder.query<Advertisement[], void>({
      query: () => ({
        url: "ads/advertisements/?placement=PLAYER",
        method: "GET",
      }),
      providesTags: ["PlayerAds"],

    }),

    registerAdImpression: builder.mutation<
      {
        status: string;
        impression_id: string;
      },
      {
        ad_id: string;
        session_id: string;
        watched_seconds: number;
        watched_percentage: number;
        completed: boolean;
      }
    >({
      query: (body) => ({
        url: `ads/advertisements/${body.ad_id}/impression/`,
        method: "POST",
        body: {
          session_id: body.session_id,
          watched_seconds: body.watched_seconds,
          watched_percentage: body.watched_percentage,
          completed: body.completed,
        },
      }),
    }),

    registerAdClick: builder.mutation<
      {
        status: string;
        target_url: string;
        click_id: string;
      },
      {
        ad_id: string;
        session_id: string;
      }
    >({
      query: (body) => ({
        url: `ads/advertisements/${body.ad_id}/click/`,
        method: "POST",
        body: {
          session_id: body.session_id,
        },
      }),
    }),
  }),
});

export const {
  useGetPlayerAdsQuery,
  useRegisterAdImpressionMutation,
  useRegisterAdClickMutation,
} = adsApi;