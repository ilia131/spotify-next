import {
    ListenSession,
  } from "./ListenSession";
  
  import {
    ListenProgress,
  } from "./ListenProgress";
  
  import {
    ListenReporter,
  } from "./ListenReporter";
  
  interface TrackSong {
    unique_id: string;
  }
  
  interface ListenTrackingServiceOptions {
    sendListen: (
      payload: {
        id: string;
        seconds: number;
        session_id: string;
      }
    ) => void;
  }
  
  export class ListenTrackingService {
    private readonly session =
      new ListenSession();
  
    private readonly progress =
      new ListenProgress();
  
    private readonly reporter: ListenReporter;
  
    private previousSongId:
      string | null = null;
  
    private exitSent = false;
  
    constructor(
      options: ListenTrackingServiceOptions
    ) {
      this.reporter =
        new ListenReporter(
          options.sendListen
        );
    }
  
    trackProgress(
        currentTime: number
      ): void {
        const delta =
          currentTime -
          this.progress.getLastTime();
      
        this.progress.addDelta(delta);
      
        this.progress.setLastTime(
          currentTime
        );
      }
  
    check30s(
      songId?: string
    ): void {
      if (!songId) {
        return;
      }
  
      const seconds =
        this.progress.getSeconds();
  
      /*
       * هنوز به 30 ثانیه نرسیده.
       */
      if (seconds < 30) {
        return;
      }
  
      /*
       * هنوز 30 ثانیه از آخرین
       * گزارش نگذشته.
       */
      if (
        seconds -
          this.reporter.getLastSentSeconds() <
        30
      ) {
        return;
      }
  
      this.reporter.send({
        id: songId,
  
        seconds,
  
        session_id:
          this.session.getId(),
      });
    }
  
    onSongEnd(
      songId?: string
    ): void {
      if (!songId) {
        return;
      }
  
      const seconds =
        this.progress.getSeconds();
  
      if (seconds <= 0) {
        return;
      }
  
      if (
        seconds <=
        this.reporter.getLastSentSeconds()
      ) {
        return;
      }
  
      this.reporter.send({
        id: songId,
  
        seconds,
  
        session_id:
          this.session.getId(),
      });
    }
  
    onSongChange(
      song?: TrackSong
    ): void {
      const currentSongId =
        song?.unique_id;
  
      const previousSongId =
        this.previousSongId;
  
      /*
       * ارسال آخرین زمان آهنگ قبلی
       */
      if (
        previousSongId &&
        previousSongId !==
          currentSongId
      ) {
        const seconds =
          this.progress.getSeconds();
  
        if (
          seconds > 0 &&
          seconds >
            this.reporter.getLastSentSeconds()
        ) {
          this.reporter.send({
            id: previousSongId,
  
            seconds,
  
            session_id:
              this.session.getId(),
          });
        }
      }
  
      this.previousSongId =
        currentSongId ?? null;
  
      this.reset();
    }
  
    sendOnExit(
      songId?: string
    ): void {
      if (this.exitSent) {
        return;
      }
  
      if (!songId) {
        return;
      }
  
      const seconds =
        this.progress.getSeconds();
  
      if (seconds <= 0) {
        return;
      }
  
      if (
        seconds <=
        this.reporter.getLastSentSeconds()
      ) {
        return;
      }
  
      this.exitSent = true;
  
      const payload =
        JSON.stringify({
          seconds,
  
          session_id:
            this.session.getId(),
        });
  
      const url =
        `${window.location.origin}` +
        `/api/player/` +
        `${songId}` +
        `/listen/`;
  
      navigator.sendBeacon(
        url,
        new Blob(
          [payload],
          {
            type:
              "application/json",
          }
        )
      );
  
      /*
       * چون Beacon ارسال شد،
       * مقدار را به عنوان آخرین
       * مقدار ارسال‌شده ثبت می‌کنیم.
       */
      this.markAsSent(seconds);
    }
  
    getLastTime(): number {
      return this.progress.getLastTime();
    }
  
    getTotalListened(): number {
      return this.progress.getSeconds();
    }
  
    setLastTime(
      time: number
    ): void {
      this.progress.setLastTime(
        time
      );
    }
  
    reset(): void {
      this.progress.reset();
  
      this.reporter.reset();
  
      this.exitSent = false;
  
      this.session.reset();
    }
  
    private markAsSent(
      seconds: number
    ): void {
      /*
       * Reporter متد عمومی برای این
       * حالت ندارد؛ بنابراین یک
       * request بدون ارسال نمی‌کنیم.
       *
       * این متد برای حفظ state داخلی
       * Beacon است.
       */
      this.reporter.markSent(seconds);
    }
  }