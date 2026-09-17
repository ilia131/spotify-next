import { apiSlice } from "../apiSlice";

/* =========================================================
   TYPES
========================================================= */

export interface RevenueOverview {
  total_revenue: number;
  today_revenue: number;
  monthly_revenue: number;

  platform_revenue: number;
  artist_revenue: number;

  successful_payments: number;
  pending_payments: number;
  failed_payments: number;

  active_subscriptions: number;
}

export interface RevenueChartItem {
  date: string;
  revenue: number;
}

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
   API
========================================================= */

export const adminRevenueApi =
  apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getAdminRevenue: builder.query<
        RevenueOverview,
        void
      >({
        query: () => ({
          url: "subscriptions/access/revenue/",
          method: "GET",

          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        }),

        providesTags: ["AdminRevenue"],
      }),

      getAdminRevenueChart: builder.query<
        RevenueChartItem[],
        void
      >({
        query: () => ({
          url: "subscriptions/access/revenue/chart/",
          method: "GET",

          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        }),

        providesTags: ["AdminRevenue"],
      }),
    }),

    overrideExisting: false,
  });

export const {
  useGetAdminRevenueQuery,
  useGetAdminRevenueChartQuery,
} = adminRevenueApi;
