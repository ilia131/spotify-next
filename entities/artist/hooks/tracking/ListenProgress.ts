export class ListenProgress {
    private listenedSeconds = 0;
  
    private lastTime = 0;
  
    addDelta(delta: number): void {
      /*
       * فقط deltaهای منطقی را قبول می‌کنیم.
       *
       * timeupdate معمولاً حدود
       * 0.2 تا 1 ثانیه است.
       *
       * deltaهای بزرگ معمولاً seek هستند.
       */
      if (
        delta > 0 &&
        delta < 5
      ) {
        this.listenedSeconds += delta;
      }
    }
  
    getSeconds(): number {
      return Math.floor(
        this.listenedSeconds
      );
    }
  
    getLastTime(): number {
      return this.lastTime;
    }
  
    setLastTime(time: number): void {
      this.lastTime = time;
    }
  
    reset(): void {
      this.listenedSeconds = 0;
      this.lastTime = 0;
    }
  }