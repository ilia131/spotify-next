export class AdScheduler {
    private readonly songIntervals = [2, 3, 4];
    private readonly skipIntervals = [2, 3, 4];
  
    private songIntervalIndex = 0;
    private skipIntervalIndex = 0;
  
    private songsSinceAd = 0;
    private skipsSinceAd = 0;
  
    registerSong(): void {
      this.songsSinceAd += 1;
    }
  
    registerSkip(): void {
      this.skipsSinceAd += 1;
    }
  
    shouldShowAdForSong(): boolean {
      const interval =
        this.songIntervals[this.songIntervalIndex];
  
      return this.songsSinceAd >= interval;
    }
  
    shouldShowAdForSkip(): boolean {
      const interval =
        this.skipIntervals[this.skipIntervalIndex];
  
      return this.skipsSinceAd >= interval;
    }
  
    completeSongAdCycle(): void {
      this.songIntervalIndex =
        (this.songIntervalIndex + 1) %
        this.songIntervals.length;
  
      this.songsSinceAd = 0;
      this.skipsSinceAd = 0;
    }
  
    completeSkipAdCycle(): void {
      this.skipIntervalIndex =
        (this.skipIntervalIndex + 1) %
        this.skipIntervals.length;
  
      this.skipsSinceAd = 0;
      this.songsSinceAd = 0;
    }
  }