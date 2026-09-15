import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hook";

import {
  useGetSongSubscriptionAccessQuery,
  useLazyGetSongSubscriptionAccessQuery,
} from "@/redux/services/artistApislice";

import {
  playNext,
  playPrev,
} from "@/redux/features/playerSlice";

import {
  useGetPlayerAdsQuery,
  Advertisement,
} from "@/redux/services/adsApiSlice";

import {
  useListenTracker,
} from "./useListenTracker";

import {
  useAudioEvents,
} from "./useAudioEvents";

import {
  useAudioCore,
} from "./useAudioCore";

import {
  createAdvertisementController,
} from "./ads/createAdvertisementController";

/*
 * --------------------------------------------------
 * Types
 * --------------------------------------------------
 */

/**
 * مشخص می‌کند تبلیغ به خاطر چه عملی نمایش داده شده.
 *
 * next:
 * کاربر روی دکمه آهنگ بعدی زده
 *
 * previous:
 * کاربر روی دکمه آهنگ قبلی زده
 *
 * song-end:
 * آهنگ به انتها رسیده و سیستم خودش تبلیغ را نمایش داده
 */
type PendingAdAction =
  | "next"
  | "previous"
  | "song-end"
  | null;


/*
 * --------------------------------------------------
 * Hook
 * --------------------------------------------------
 */

export const useAudioPlayer = () => {
  const dispatch =
    useAppDispatch();


  /*
   * --------------------------------------------------
   * Player State
   * --------------------------------------------------
   */

  const {
    queue,
    currentIndex,
    isPlaying,
    volume,
  } = useAppSelector(
    (state) => state.player
  );

  const song =
    queue[currentIndex];

  const {
      data: currentSongAccess,
      isLoading: currentSongAccessLoading,
      isFetching: currentSongAccessFetching,
    } = useGetSongSubscriptionAccessQuery(
      song?.unique_id ?? "",
      {
        skip: !song?.unique_id,
      }
    );
  const [
      fetchSongAccess,
      {
        isFetching: checkingTargetSong,
      },
    ] = useLazyGetSongSubscriptionAccessQuery();
  const checkSongAccess = useCallback(
      async (songId: string) => {
        try {
          const result = await fetchSongAccess(songId).unwrap();
    
          return result.can_play === true;
        } catch (error) {
          console.error(
            "Song access check failed:",
            error
          );
    
          return false;
        }
      },
      [fetchSongAccess]
    );

  /*
   * --------------------------------------------------
   * Audio
   * --------------------------------------------------
   */

  const audioRef =
    useRef<HTMLAudioElement | null>(
      null
    );


  /*
   * --------------------------------------------------
   * Advertisement State
   * --------------------------------------------------
   */

  const [
    showAd,
    setShowAd,
  ] = useState(false);

  const [
    currentAd,
    setCurrentAd,
  ] =
    useState<Advertisement | null>(
      null
    );


  /*
   * --------------------------------------------------
   * Pending Advertisement Action
   * --------------------------------------------------
   *
   * وقتی کاربر روی Previous یا Next می‌زند
   * و تبلیغ باید نمایش داده شود،
   * باید بدانیم بعد از تمام شدن تبلیغ
   * چه عملی باید انجام شود.
   *
   * مثال:
   *
   * Previous
   *      ↓
   * Advertisement
   *      ↓
   * playPrevious()
   *
   * و:
   *
   * Next
   *      ↓
   * Advertisement
   *      ↓
   * playNext()
   */

  const pendingAdActionRef =
    useRef<PendingAdAction>(
      null
    );


  /*
   * --------------------------------------------------
   * Advertisement Controller
   * --------------------------------------------------
   *
   * Controller فقط یک بار ساخته می‌شود
   * و شمارنده‌های تبلیغات را نگه می‌دارد.
   *
   * الگوی:
   *
   * Song:
   * 2 → 3 → 4 → 2 → 3 → 4
   *
   * Skip:
   * 2 → 3 → 4 → 2 → 3 → 4
   */

  const [
    advertisementController,
  ] = useState(
    () =>
      createAdvertisementController()
  );


  /*
   * --------------------------------------------------
   * Ads API
   * --------------------------------------------------
   */

  const {
    data: playerAds = [],
  } =
    useGetPlayerAdsQuery();


  /*
   * --------------------------------------------------
   * Create Audio
   * --------------------------------------------------
   */

  useEffect(() => {
    /*
     * اگر Audio قبلاً ساخته شده،
     * دوباره نساز.
     */

    if (audioRef.current) {
      return;
    }

    const audio =
      new Audio();

    audio.preload =
      "auto";

    audioRef.current =
      audio;

    /*
     * Cleanup
     */

    return () => {
      audio.pause();

      audio.src = "";
    };
  }, []);


  /*
   * --------------------------------------------------
   * Listen Tracker
   * --------------------------------------------------
   */

  const listenTracker =
    useListenTracker(song);


  /*
   * --------------------------------------------------
   * Song Change
   * --------------------------------------------------
   */

  useEffect(() => {
    listenTracker.onSongChange();
  }, [
    song?.unique_id,
  ]);

  const findPlayableSongIndex = useCallback(
    async (
      startIndex: number,
      direction: "next" | "previous"
    ) => {
  
      if (!queue.length) {
        return null;
      }
  
      let index = startIndex;
  
      for (let i = 0; i < queue.length; i++) {
  
        const targetSong = queue[index];
  
        if (!targetSong) {
          return null;
        }
  
  
        // آهنگ رایگان
        if (!targetSong.is_subscription_only) {
          return index;
        }
  
  
        // آهنگ اشتراکی
        try {
  
          const access =
            await fetchSongAccess(
              targetSong.unique_id
            ).unwrap();
  
  
          if (access.can_play) {
            return index;
          }
  
        } catch(error) {
          console.error(
            "access check failed",
            error
          );
        }
  
  
        // حرکت در لیست
        if(direction === "next") {
  
          index =
            (index + 1) % queue.length;
  
        } else {
  
          index =
            index === 0
              ? queue.length - 1
              : index - 1;
        }
      }
  
  
      return null;
  
    },
    [
      queue,
      fetchSongAccess
    ]
  )
  /*
   * --------------------------------------------------
   * Show Advertisement
   * --------------------------------------------------
   */

  /**
   * یک تابع مشترک برای نمایش تبلیغ.
   *
   * این تابع AdvertisementController را صدا می‌زند
   * و در صورت وجود تبلیغ، آن را نمایش می‌دهد.
   */

  const showAdvertisement =
  useCallback(
    (
      action: PendingAdAction,
      ad: Advertisement | null
    ) => {
      /*
       * اگر تبلیغی وجود ندارد،
       * هیچ کاری انجام نده.
       */

      if (!ad) {
        return false;
      }

      /*
       * --------------------------------------------------
       * Pause Current Song
       * --------------------------------------------------
       *
       * قبل از نمایش تبلیغ، آهنگ فعلی را متوقف می‌کنیم.
       */

      const audio =
        audioRef.current;

      if (audio) {
        audio.pause();
      }

      /*
       * ذخیره عملی که بعد از تبلیغ
       * باید انجام شود.
       */

      pendingAdActionRef.current =
        action;

      /*
       * ذخیره تبلیغ
       */

      setCurrentAd(ad);

      /*
       * نمایش تبلیغ
       */

      setShowAd(true);

      return true;
    },
    []
  );

  /*
   * --------------------------------------------------
   * Song End
   * --------------------------------------------------
   */

  const handleSongEnded = useCallback(async () => {
    listenTracker.onSongEnd();
  
    const ad =
      advertisementController.onSongCompleted(
        playerAds
      );
  
    if (ad) {
      showAdvertisement(
        "song-end",
        ad
      );
  
      return;
    }
  
    /*
     * آهنگ بعدی را پیدا کن
     */
  
    if (!queue.length) {
      return;
    }
  
    const nextIndex =
      (currentIndex + 1) % queue.length;
  
    const nextSong =
      queue[nextIndex];
  
    if (!nextSong) {
      return;
    }
  
    /*
     * آهنگ رایگان
     */
  
    if (!nextSong.is_subscription_only) {
      dispatch(playNext());
      return;
    }
  
    /*
     * آهنگ قفل
     */
  
    try {
      const access =
        await fetchSongAccess(
          nextSong.unique_id
        ).unwrap();
  
      if (access.can_play) {
        dispatch(playNext());
      } else {
        /*
         * کاربر اشتراک ندارد.
         *
         * آهنگ قفل پخش نمی‌شود.
         */
        console.log(
          "Next song is locked."
        );
      }
    } catch (error) {
      console.error(
        "Auto next access check failed:",
        error
      );
    }
  }, [
    queue,
    currentIndex,
    listenTracker,
    advertisementController,
    playerAds,
    showAdvertisement,
    fetchSongAccess,
    dispatch,
  ]);


  /*
   * --------------------------------------------------
   * Audio Events
   * --------------------------------------------------
   */

  useAudioEvents(
    audioRef,
    song,
    listenTracker,
    handleSongEnded
  );


  /*
   * --------------------------------------------------
   * Audio Core
   * --------------------------------------------------
   */

  const {
    seek,
    seekFromEvent,
  } = useAudioCore(
    audioRef,
    song,
    isPlaying,
    volume
  );


  /*
   * --------------------------------------------------
   * Next / Previous Advertisement Check
   * --------------------------------------------------
   */

  /**
   * این تابع قبل از Next یا Previous
   * بررسی می‌کند که آیا نوبت تبلیغ هست یا نه.
   *
   * اگر تبلیغ باشد:
   *
   * true
   *
   * اگر تبلیغ نباشد:
   *
   * false
   */

  const handleSkipAd =
    useCallback(
      (
        action:
          | "next"
          | "previous"
      ) => {
        /*
         * AdvertisementController
         *
         * هر بار Next یا Previous
         * یک skip حساب می‌شود.
         */

        const ad =
          advertisementController
            .onSkip(
              playerAds
            );


        /*
         * اگر تبلیغ وجود داشت،
         * آن را نمایش بده.
         */

        if (ad) {
          showAdvertisement(
            action,
            ad
          );

          return true;
        }


        /*
         * تبلیغی وجود ندارد.
         */

        return false;
      },
      [
        advertisementController,
        playerAds,
        showAdvertisement,
      ]
    );


  /*
   * --------------------------------------------------
   * Next Song
   * --------------------------------------------------
   */

  const handleNext = useCallback(async () => {

    const adShown =
      handleSkipAd("next");
  
  
    if(adShown) {
      return;
    }
  
  
    const nextIndex =
      (currentIndex + 1) % queue.length;
  
  
    const playableIndex =
      await findPlayableSongIndex(
        nextIndex,
        "next"
      );
  
  
    if(playableIndex !== null) {
  
      dispatch({
        type: "player/setQueue",
        payload:{
          songs: queue,
          startIndex: playableIndex
        }
      });
  
    }
  
  },[
    queue,
    currentIndex,
    handleSkipAd,
    findPlayableSongIndex,
    dispatch
  ]);

  /*
   * --------------------------------------------------
   * Previous Song
   * --------------------------------------------------
   */

  const handlePrevious = useCallback(async () => {

    const adShown =
      handleSkipAd("previous");
  
  
    if(adShown) {
      return;
    }
  
  
    const previousIndex =
      currentIndex === 0
        ? queue.length - 1
        : currentIndex - 1;
  
  
    const playableIndex =
      await findPlayableSongIndex(
        previousIndex,
        "previous"
      );
  
  
    if(playableIndex !== null) {
  
      dispatch({
        type:"player/setQueue",
        payload:{
          songs:queue,
          startIndex:playableIndex
        }
      });
  
    }
  
  
  },[
    queue,
    currentIndex,
    handleSkipAd,
    findPlayableSongIndex,
    dispatch
  ]);


  /*
   * --------------------------------------------------
   * Advertisement Finished
   * --------------------------------------------------
   */

  const handleAdFinished =
    useCallback(() => {
      /*
       * اول تبلیغ را ببند.
       */

      setShowAd(false);

      /*
       * تبلیغ فعلی را پاک کن.
       */

      setCurrentAd(null);


      /*
       * عملی که باعث نمایش تبلیغ شده بود
       * را از ref می‌گیریم.
       */

      const action =
        pendingAdActionRef.current;


      /*
       * بعد از اجرای action
       * مقدار آن را پاک می‌کنیم.
       */

      pendingAdActionRef.current =
        null;


      /*
       * اگر تبلیغ به خاطر آهنگ تمام‌شده
       * نمایش داده شده بود:
       *
       * باید آهنگ بعدی پخش شود.
       */

      if (
        action ===
        "song-end"
      ) {
        dispatch(
          playNext()
        );

        return;
      }


      /*
       * اگر تبلیغ به خاطر Next
       * نمایش داده شده بود:
       *
       * آهنگ بعدی.
       */

      if (
        action ===
        "next"
      ) {
        dispatch(
          playNext()
        );

        return;
      }


      /*
       * اگر تبلیغ به خاطر Previous
       * نمایش داده شده بود:
       *
       * آهنگ قبلی.
       */

      if (
        action ===
        "previous"
      ) {
        dispatch(
          playPrev()
        );

        return;
      }
    }, [
      dispatch,
    ]);


  /*
   * --------------------------------------------------
   * Format Time
   * --------------------------------------------------
   */

  const formatTime =
    useCallback(
      (time: number) => {
        if (!time) {
          return "0:00";
        }


        const minutes =
          Math.floor(
            time / 60
          );


        const seconds =
          Math.floor(
            time % 60
          );


        return `${minutes}:${
          seconds < 10
            ? "0"
            : ""
        }${seconds}`;
      },
      []
    );


  /*
   * --------------------------------------------------
   * Return
   * --------------------------------------------------
   */

  return {
    /*
     * Audio
     */

    audioRef,

    /*
     * Current song
     */

    song,

    /*
     * Controls
     */

    seek,
    seekFromEvent,

    /*
     * Utility
     */

    formatTime,

    /*
     * Advertisement
     */

    showAd,
    currentAd,
    handleAdFinished,

    /*
     * Player navigation
     */

    handleNext,
    handlePrevious,
  };
};