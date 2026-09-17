import { apiSlice } from "../apiSlice";

/* =========================================================
   TYPES
========================================================= */

export interface AdminPayment {
  id: string;

  username: string;
  user_email: string;

  amount: number | string;

  status: "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";

  authority: string;
  ref_id: string;

  subscription_type: "PLATFORM" | "ARTIST" | null;
  subscription_name: string | null;

  created_at: string;
  paid_at: string | null;
}

export interface AdminPaymentResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminPayment[];
}

export interface AdminPaymentParams {
  page?: number;
  search?: string;
  status?: string;
  type?: string;
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

export const adminPaymentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminPayments: builder.query<
      AdminPaymentResponse,
      AdminPaymentParams
    >({
      query: ({
        page = 1,
        search = "",
        status = "",
        type = "",
      }) => {
        const params = new URLSearchParams();

        params.set("page", String(page));

        if (search.trim()) {
          params.set("search", search.trim());
        }

        if (status) {
          params.set("status", status);
        }

        if (type) {
          params.set("type", type);
        }

        const token = getAdminToken();

        return {
          url: `/subscriptions/access/payments/?${params.toString()}`,
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },

      providesTags: ["AdminPayments"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetAdminPaymentsQuery,
} = adminPaymentsApi;
