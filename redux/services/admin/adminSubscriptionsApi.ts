import { apiSlice } from "../apiSlice";

/* =========================================================
   TYPES
========================================================= */

export interface AdminSubscription {
  id: string;

  username: string;
  user_email: string;

  plan_name: string;
  plan_price: number | string;
  duration_days: number;

  status:
    | "PENDING"
    | "ACTIVE"
    | "EXPIRED"
    | "CANCELLED";

  started_at: string | null;
  expires_at: string | null;

  created_at: string;
  updated_at: string;
}

export interface AdminSubscriptionResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminSubscription[];
}

export interface AdminSubscriptionParams {
  page?: number;
  search?: string;
  status?: string;
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

export const adminSubscriptionsApi =
  apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getAdminSubscriptions: builder.query<
        AdminSubscriptionResponse,
        AdminSubscriptionParams
      >({
        query: ({
          page = 1,
          search = "",
          status = "",
        }) => {
          const params = new URLSearchParams();

          params.set("page", String(page));

          if (search.trim()) {
            params.set(
              "search",
              search.trim()
            );
          }

          if (status) {
            params.set(
              "status",
              status
            );
          }

          const token = getAdminToken();

          return {
            url: `/subscriptions/access/subscriptions/?${params.toString()}`,
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        },

        providesTags: [
          "AdminSubscriptions",
        ],
      }),
    }),

    overrideExisting: false,
  });

export const {
  useGetAdminSubscriptionsQuery,
} = adminSubscriptionsApi;
