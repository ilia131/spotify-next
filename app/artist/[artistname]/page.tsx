"use client";

import ArtistHeroSection from "@/components/Artist/ArtistButtons/ArtistHeroSection";
import ArtistContentSection from "@/components/Artist/ArtistButtons/ArtistContentSection";
import Clips from "@/components/Artist/ArtistTabs/Clips/Clips";
import { Vazirmatn } from "next/font/google";
import { useParams } from "next/navigation";
import {
  useArtistDetailQuery,
  useGetArtistSubscriptionPlanQuery,
  useGetSongSubscriptionAccessQuery,
  usePurchaseArtistSubscriptionMutation,
} from "@/redux/services/artistApislice";
import type { Artist } from "@/redux/services/artistApislice";
import { useAppSelector } from "@/redux/hook";
const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
});
const ArtistDetail = () => {
  const params = useParams<{ artistname: string }>();

  const artistname = params.artistname;

  const artistname2 = params.artistname
    ? decodeURIComponent(params.artistname)
    : "";

  const activeTab = useAppSelector(
    (state) => state.tabs.activeTab
  );

  // =========================================================
  // Artist
  // =========================================================

  const {
    data,
    isLoading,
  } = useArtistDetailQuery(artistname);

  // =========================================================
  // Artist Subscription Plan
  // =========================================================

  const {
    data: subscriptionPlan,
    isLoading: subscriptionLoading,
    isError: subscriptionError,
  } = useGetArtistSubscriptionPlanQuery(
    artistname,
    {
      skip: !artistname,
    }
  );

  // =========================================================
  // Find subscription-only song
  // =========================================================

  const subscriptionSong = data?.songs?.find(
    (song) => song.is_subscription_only === true
  );

  const subscriptionSongId =
    subscriptionSong?.unique_id ?? "";

  // =========================================================
  // Subscription Access
  // =========================================================

  const {
    data: subscriptionAccess,
    isLoading: accessLoading,
    isFetching: accessFetching,
    isError: accessError,
  } = useGetSongSubscriptionAccessQuery(
    subscriptionSongId,
    {
      skip: !subscriptionSongId,
    }
  );

  // =========================================================
  // Purchase
  // =========================================================

  const [
    purchaseArtistSubscription,
    {
      isLoading: purchaseLoading,
    },
  ] = usePurchaseArtistSubscriptionMutation();

  // =========================================================
  // Access state
  // =========================================================

  const isCheckingSubscription =
    accessLoading ||
    accessFetching;

  /*
   * مهم:
   *
   * requires_subscription = true
   * یعنی آهنگ subscription-only است.
   *
   * can_play = true
   * یعنی کاربر دسترسی دارد.
   *
   * بنابراین برای تشخیص خرید بودن اشتراک فقط can_play
   * را بررسی می‌کنیم.
   */

  const isSubscribed =
    subscriptionAccess?.can_play === true;

  // =========================================================
  // Purchase Handler
  // =========================================================

  const handlePurchaseSubscription = async () => {
    if (
      !artistname2 ||
      !subscriptionSongId ||
      purchaseLoading
    ) {
      return;
    }

    try {
      const response =
        await purchaseArtistSubscription({
          artistname: artistname2,
          song_id: subscriptionSongId,
        }).unwrap();

      console.log(
        "Subscription purchase:",
        response
      );

      /*
       * Access query به خاطر invalidatesTags
       * دوباره اجرا می‌شود.
       *
       * بنابراین نیازی به state جدا برای
       * isSubscribed نداریم.
       */

      if (response?.status === "ACTIVE") {
        alert(
          `اشتراک ${artistname2} با موفقیت فعال شد.`
        );
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "Subscription purchase failed:",
        error
      );

      const message =
        error?.data?.message ||
        error?.data?.detail ||
        "خرید اشتراک انجام نشد.";

      alert(message);
    }
  };

  // =========================================================
  // Loading
  // =========================================================

  if (isLoading) {
    return null;
  }

  // =========================================================
  // Render
  // =========================================================

  return (
    <main className="relative">

      {/* =====================================================
          Artist Hero
      ===================================================== */}

      <ArtistHeroSection
        image={data?.background}
        artistname={data?.artistname}
        data={data as Artist}
      />

      {/* =====================================================
          Artist Subscription
      ===================================================== */}

      {!subscriptionLoading &&
        !subscriptionError &&
        subscriptionPlan && (

          <section className="px-4 py-4">

            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                p-4
                backdrop-blur-xl
              "
            >

              {/* =================================================
                  ACCESS CHECKING
              ================================================= */}

              {isCheckingSubscription && (
                <div className="flex items-center gap-3">

                  <div
                    className="
                      h-11
                      w-11
                      shrink-0
                      animate-pulse
                      rounded-full
                      bg-white/10
                    "
                  />

                  <div className="min-w-0">

                    <div
                      className="
                        h-4
                        w-32
                        animate-pulse
                        rounded
                        bg-white/10
                      "
                    />

                    <div
                      className="
                        mt-2
                        h-3
                        w-48
                        animate-pulse
                        rounded
                        bg-white/10
                      "
                    />

                  </div>

                </div>
              )}

              {/* =================================================
                  USER HAS ACCESS
              ================================================= */}

              {!isCheckingSubscription &&
                !accessError &&
                subscriptionSongId &&
                isSubscribed && (

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-green-500/15
                        text-lg
                        text-green-400
                      "
                    >
                      ✓
                    </div>

                    <div className="min-w-0">

                      <h3
                        className="
                          text-base
                          font-semibold
                          text-white
                        "
                      >
                        شما دسترسی دارید
                      </h3>

                      <p
                        className="
                          mt-1
                          text-sm
                          leading-5
                          text-white/50
                        "
                      >
                        شما به آهنگ‌های اشتراکی{" "}
                        {data?.artistname} دسترسی دارید.
                      </p>

                    </div>

                  </div>
                )}

              {/* =================================================
                  USER DOES NOT HAVE ACCESS
              ================================================= */}

              {!isCheckingSubscription &&
                !accessError &&
                subscriptionSongId &&
                !isSubscribed && (

                  <div
                    className={`
                      ${vazirmatn.className}
                      flex
                      items-center
                      justify-between
                      gap-4
                    `}
                  >

                    {/* Plan information */}

                    <div className="min-w-0">

                      <h3
                        className="
                          truncate
                          text-base
                          font-semibold
                          text-white
                        "
                      >
                        {subscriptionPlan.name}
                      </h3>

                      {subscriptionPlan.description && (
                        <p
                          className="
                            mt-1
                            text-sm
                            leading-5
                            text-white/50
                          "
                        >
                          {subscriptionPlan.description}
                        </p>
                      )}

                      <div
                        className="
                          mt-2
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <span
                          className="
                            text-lg
                            font-bold
                            text-white
                          "
                        >
                          {Number(
                            subscriptionPlan.price
                          ).toLocaleString("fa-IR")}
                        </span>

                        <span
                          className="
                            text-xs
                            text-white/40
                          "
                        >
                          تومان /{" "}
                          {subscriptionPlan.duration_days} روز
                        </span>

                      </div>

                    </div>

                    {/* Purchase button */}

                    <button
                      type="button"
                      disabled={purchaseLoading}
                      onClick={
                        handlePurchaseSubscription
                      }
                      className="
                        shrink-0
                        rounded-xl
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        text-black
                        transition
                        hover:bg-white/90
                        active:scale-[0.97]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      {purchaseLoading
                        ? "در حال پردازش..."
                        : "خرید اشتراک"}
                    </button>

                  </div>
                )}

              {/* =================================================
                  ACCESS ERROR
              ================================================= */}

              {!isCheckingSubscription &&
                accessError &&
                subscriptionSongId && (

                  <div className="flex items-center justify-between gap-4">

                    <div>

                      <h3
                        className="
                          text-base
                          font-semibold
                          text-white
                        "
                      >
                        {subscriptionPlan.name}
                      </h3>

                      <p
                        className="
                          mt-1
                          text-sm
                          text-white/50
                        "
                      >
                        امکان بررسی وضعیت اشتراک وجود ندارد.
                      </p>

                    </div>

                    <button
                      type="button"
                      disabled={purchaseLoading}
                      onClick={
                        handlePurchaseSubscription
                      }
                      className="
                        shrink-0
                        rounded-xl
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        text-black
                        transition
                        hover:bg-white/90
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      {purchaseLoading
                        ? "در حال پردازش..."
                        : "خرید اشتراک"}
                    </button>

                  </div>
                )}

              {/* =================================================
                  NO SUBSCRIPTION-ONLY SONG
              ================================================= */}

              {!isCheckingSubscription &&
                !subscriptionSongId && (

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-white/10
                        text-white/70
                      "
                    >
                      ♪
                    </div>

                    <div>

                      <h3
                        className="
                          text-base
                          font-semibold
                          text-white
                        "
                      >
                        اشتراک آرتیست
                      </h3>

                      <p
                        className="
                          mt-1
                          text-sm
                          text-white/50
                        "
                      >
                        هنوز آهنگ اشتراکی برای این آرتیست ثبت نشده است.
                      </p>

                    </div>

                  </div>
                )}

            </div>

          </section>
        )}

      {/* =====================================================
          Artist Content
      ===================================================== */}

      {activeTab === "music" ? (

        <ArtistContentSection
          songs={data?.songs}
          shorts={data?.shorts}
          artistpick={data?.artist_pick}
          artistname={artistname2}
          data={data as Artist}
        />

      ) : (

        <Clips />

      )}

    </main>
  );
};

export default ArtistDetail;

