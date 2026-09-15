"use client";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  useGetSubscriptionPlansQuery,
  useGetMySubscriptionQuery,
  usePurchaseSubscriptionMutation,
} from "@/redux/services/subscriptionApiSlice";

const Trackpacks = () => {
  // --------------------------------
  // Subscription
  // --------------------------------

  const {
    data: subscriptionData,
    isLoading: isSubscriptionLoading,
    isError: isSubscriptionError,
  } = useGetMySubscriptionQuery();

  // --------------------------------
  // Plans
  // --------------------------------

  const {
    data: plans,
    isLoading: isPlansLoading,
    isError: isPlansError,
  } = useGetSubscriptionPlansQuery();

  // --------------------------------
  // Purchase
  // --------------------------------

  const [
    purchaseSubscription,
    {
      isLoading: isPurchasing,
    },
  ] = usePurchaseSubscriptionMutation();

  // --------------------------------
  // Current plan
  // --------------------------------

  const premiumPlan = plans?.[0];

  // --------------------------------
  // Purchase handler
  // --------------------------------

  const handlePurchase = async () => {
    if (!premiumPlan) {
      toast.error("Premium plan is not available.");
      return;
    }

    try {
      const result =
        await purchaseSubscription({
          plan_id: premiumPlan.id,
        }).unwrap();

      toast.success(
        "Purchase successful!",
        {
          description:
            "Welcome to Milify Premium.",
        }
      );

      console.log(
        "Remaining balance:",
        result.balance
      );
    } catch (error: any) {
      const message =
        error?.data?.message ||
        "Insufficient balance.";

      toast.error(message);
    }
  };

  // --------------------------------
  // Loading
  // --------------------------------

  if (
    isPlansLoading ||
    isSubscriptionLoading
  ) {
    return (
      <main className="min-h-screen text-white px-6 py-24">
        <div className="max-w-xl mx-auto flex justify-center">
          <Loader2
            className="animate-spin"
            size={28}
          />
        </div>
      </main>
    );
  }

  // --------------------------------
  // Error
  // --------------------------------

  if (
    isPlansError ||
    isSubscriptionError
  ) {
    return (
      <main className="min-h-screen text-white px-6 py-24">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-red-400">
            Failed to load subscription information.
          </p>
        </div>
      </main>
    );
  }

  // --------------------------------
  // Active subscription
  // --------------------------------

  if (
    subscriptionData?.has_subscription &&
    subscriptionData.subscription
  ) {
    const subscription =
      subscriptionData.subscription;

    return (
      <main
        lang="en-US"
        dir="ltr"
        className="min-h-screen text-white px-6 py-24 pb-30"
      >
        <div className="max-w-xl mx-auto">

          <div className="text-center mb-14">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Milify Premium
            </h1>

            <p className="text-neutral-400 mt-4">
              Better music. Better experience.
            </p>
          </div>

          {/* Active Premium */}
          <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-green-400 via-emerald-500 to-green-700 shadow-[0_20px_80px_rgba(0,255,140,0.25)]">

            <div className="bg-neutral-950 rounded-3xl p-8">

              <div className="flex justify-center mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border border-green-500/30">
                  <span className="text-3xl text-green-400">
                    ✓
                  </span>
                </div>
              </div>

              <div className="text-center">

                <div className="inline-flex items-center rounded-full bg-green-500/10 border border-green-500/20 px-4 py-1 text-xs font-semibold text-green-400 mb-4">
                  ACTIVE
                </div>

                <h2 className="text-2xl font-bold">
                  {subscription.plan.name}
                </h2>

                <p className="text-neutral-400 mt-3">
                  Your Milify Premium subscription
                  is active.
                </p>

              </div>

              <div className="mt-8 space-y-3 text-sm">

                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <span className="text-neutral-500">
                    Status
                  </span>

                  <span className="text-green-400 font-medium">
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <span className="text-neutral-500">
                    Started
                  </span>

                  <span>
                    {new Date(
                      subscription.started_at
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">
                    Expires
                  </span>

                  <span>
                    {new Date(
                      subscription.expires_at
                    ).toLocaleDateString()}
                  </span>
                </div>

              </div>

              <div className="mt-8 rounded-2xl bg-green-500/5 border border-green-500/10 p-5">

                <p className="text-sm font-semibold text-green-400 mb-3">
                  Premium benefits
                </p>

                <ul className="space-y-2 text-sm text-neutral-300">
                  <li>
                    ✓ Ad-free listening
                  </li>

                  <li>
                    ✓ Unlimited access to all songs
                  </li>

                  <li>
                    ✓ Higher audio quality
                  </li>

                  <li>
                    ✓ Skip songs without limitations
                  </li>

                  <li>
                    ✓ Access to premium features
                  </li>

                  <li>
                    ✓ Support independent artists
                  </li>
                </ul>

              </div>

            </div>
          </div>

        </div>
      </main>
    );
  }

  // --------------------------------
  // No active subscription
  // --------------------------------

  return (
    <main
      lang="en-US"
      dir="ltr"
      className="min-h-screen text-white px-6 py-24 pb-30"
    >
      <div className="max-w-xl mx-auto">

        {/* Header */}

        <div className="text-center mb-14">

          <h1 className="text-4xl font-extrabold tracking-tight">
            Milify Premium
          </h1>

          <p className="text-neutral-400 mt-4">
            Better music. Better experience.
          </p>

        </div>

        <div className="space-y-8">

          {/* Premium */}

          <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-green-400 via-emerald-500 to-green-700 shadow-[0_20px_80px_rgba(0,255,140,0.25)]">

            <div className="bg-neutral-950 rounded-3xl p-8">

              <div className="absolute -top-3 left-6 bg-green-500 text-black text-xs font-bold px-4 py-1 rounded-full">
                PREMIUM
              </div>

              <h2 className="text-xl font-semibold">
                {premiumPlan?.name ||
                  "Milify Premium"}
              </h2>

              <p className="text-3xl font-bold mt-3">
                {premiumPlan
                  ? `$${premiumPlan.price}`
                  : "$5"}
              </p>

              <p className="text-neutral-500 text-sm mt-1">
                Better music. Better experience.
              </p>

              <ul className="mt-6 space-y-3 text-sm">

                <li>
                  ✓ Ad-free listening
                </li>

                <li>
                  ✓ Unlimited access to all songs
                </li>

                <li>
                  ✓ Higher audio quality
                </li>

                <li>
                  ✓ Enhanced listening experience
                </li>

                <li>
                  ✓ Skip songs without limitations
                </li>

                <li>
                  ✓ Access to premium features
                </li>

                <li>
                  ✓ Support independent artists
                </li>

              </ul>

              <button
                type="button"
                onClick={handlePurchase}
                disabled={
                  isPurchasing ||
                  !premiumPlan
                }
                className="mt-8 flex w-full items-center justify-center gap-2 text-center bg-green-500 text-black font-semibold py-3 rounded-full hover:bg-green-400 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >

                {isPurchasing ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Processing...
                  </>
                ) : (
                  "Get Premium"
                )}

              </button>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Trackpacks;
