"use client";

import { useEffect, useState } from "react";

import { Song, setQueue } from "@/redux/features/playerSlice";
import { useAppDispatch } from "@/redux/hook";

import {
  useGetSongSubscriptionAccessQuery,
} from "@/redux/services/artistApislice";

import ImageMusicCard from "./ImageMusicCard";
import OptionCardMusic from "./OptionCardMusic";

interface MusicRowCardProps {
  item: Song;
  songs: Song[];
  index: number;
  isPlaylistView?: boolean;
  playlistId?: string;
}

const MusicRowCard = ({
  item,
  songs,
  index,
  isPlaylistView,
  playlistId,
}: MusicRowCardProps) => {
  const dispatch = useAppDispatch();

  const [showSubscriptionToast, setShowSubscriptionToast] =
    useState(false);

  /*
   * همیشه access endpoint را برای این آهنگ صدا می‌زنیم.
   *
   * Endpoint:
   *
   * /api/subscriptions/songs/{unique_id}/subscription/access/
   *
   * تصمیم پخش فقط بر اساس can_play خواهد بود.
   */
  const {
    data: subscriptionAccess,
    isLoading: subscriptionAccessLoading,
    isFetching: subscriptionAccessFetching,
    isError: subscriptionAccessError,
  } = useGetSongSubscriptionAccessQuery(
    item.unique_id
  );

  /*
   * وضعیت نهایی دسترسی
   *
   * true  => اجازه پخش
   * false => اجازه پخش ندارد
   */
  const canPlay =
    subscriptionAccess?.can_play === true;

  /*
   * هنوز access endpoint جواب نداده
   */
  const isCheckingAccess =
    subscriptionAccessLoading ||
    subscriptionAccessFetching;

  /*
   * اگر endpoint خطا بدهد
   */
  const accessCheckFailed =
    subscriptionAccessError ||
    (!isCheckingAccess && !subscriptionAccess);

  /*
   * فقط زمانی قفل است که endpoint صراحتاً
   * can_play: false برگرداند.
   *
   * نکته:
   *
   * requires_subscription هیچ نقشی ندارد.
   * is_subscription_only هم هیچ نقشی ندارد.
   */
  const isLocked =
    !isCheckingAccess &&
    !accessCheckFailed &&
    subscriptionAccess?.can_play === false;

  useEffect(() => {
    if (!showSubscriptionToast) {
      return;
    }

    const timer = setTimeout(() => {
      setShowSubscriptionToast(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [showSubscriptionToast]);

  const handlePlay = () => {
    /*
     * هنوز نتیجه Access API مشخص نشده.
     */
    if (isCheckingAccess) {
      return;
    }

    /*
     * Access API خطا داده.
     */
    if (accessCheckFailed) {
      console.error(
        "Subscription access check failed:",
        item.unique_id
      );

      return;
    }

    /*
     * مهم‌ترین قسمت:
     *
     * اگر can_play === false
     * اجازه پخش نداریم.
     */
    if (!canPlay) {
      setShowSubscriptionToast(true);
      return;
    }

    /*
     * can_play === true
     *
     * بدون توجه به:
     *
     * requires_subscription
     * is_subscription_only
     *
     * آهنگ باید پخش شود.
     */
    dispatch(
      setQueue({
        songs: [...songs],
        startIndex: index,
      })
    );
  };

  const isDisabled =
    isCheckingAccess || isLocked;

  return (
    <>
      <div
        className={`h-12.75 flex items-center pr-6.25 gap-3.5 ${
          isDisabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer"
        }`}
        onClick={handlePlay}
      >
        <ImageMusicCard
          item={item}
          index={index}
        />

        <OptionCardMusic
          item={item}
          isPlaylistView={isPlaylistView}
          playlistId={playlistId}
        />
      </div>

      {/* =========================
          Subscription Toast
      ========================= */}

      {showSubscriptionToast && (
        <div className="fixed bottom-6 left-1/2 z-[9999] w-[calc(100%-32px)] max-w-md -translate-x-1/2">
          <div className="rounded-2xl border border-white/10 bg-[#181818]/95 p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start gap-3">

              {/* Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500/15 text-xl">
                🔒
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white">
                  این آهنگ اشتراکی است
                </p>

                <p className="mt-1 text-sm leading-5 text-white/60">
                  برای پخش این آهنگ باید اشتراک یکی
                  از آرتیست‌های این آهنگ را داشته باشید.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    console.log(
                      "Buy subscription:",
                      item.artistname
                    );
                  }}
                  className="mt-3 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90 active:scale-[0.98]"
                >
                  خرید اشتراک
                </button>
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={() =>
                  setShowSubscriptionToast(false)
                }
                className="text-white/40 transition hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MusicRowCard;