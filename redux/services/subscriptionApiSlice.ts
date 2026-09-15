import { apiSlice } from "./apiSlice";

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  duration_days: number;
}

export interface Subscription {
  id: string;
  plan: SubscriptionPlan;
  status: string;
  started_at: string;
  expires_at: string;
  is_active: boolean;
}

interface PurchaseSubscriptionResponse {
  status: string;
  message: string;
  balance: string;
  payment_id: string;
  subscription: Subscription;
}

interface PurchaseSubscriptionRequest {
  plan_id: string;
}

export const subscriptionApi =
  apiSlice.injectEndpoints({
    endpoints: (builder) => ({

      getSubscriptionPlans:
        builder.query<
          SubscriptionPlan[],
          void
        >({
          query: () => ({
            url: "subscriptions/plans/",
            method: "GET",
          }),

          providesTags: [
            "SubscriptionPlans",
          ],
        }),

      getMySubscription:
        builder.query<
          {
            has_subscription: boolean;
            subscription:
              | Subscription
              | null;
          },
          void
        >({
          query: () => ({
            url: "subscriptions/me/",
            method: "GET",
          }),

          providesTags: [
            "MySubscription",
          ],
        }),

      purchaseSubscription:
        builder.mutation<
          PurchaseSubscriptionResponse,
          PurchaseSubscriptionRequest
        >({
          query: (body) => ({
            url: "subscriptions/purchase/",
            method: "POST",
            body,
          }),

          invalidatesTags: [
            "MySubscription",
          ],
        }),
    }),
  });

export const {
  useGetSubscriptionPlansQuery,
  useGetMySubscriptionQuery,
  usePurchaseSubscriptionMutation,
} = subscriptionApi;