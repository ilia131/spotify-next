import { Advertisement } from "@/redux/services/adsApiSlice";

import { AdScheduler } from "./AdScheduler";
import { RandomAdSelector } from "./AdSelector";

export class AdvertisementController {
  constructor(
    private readonly scheduler: AdScheduler,
    private readonly selector: RandomAdSelector
  ) {}

  onSongCompleted(
    ads: Advertisement[]
  ): Advertisement | null {
    this.scheduler.registerSong();

    if (
      !this.scheduler.shouldShowAdForSong()
    ) {
      return null;
    }

    if (!ads.length) {
      return null;
    }

    const ad = this.selector.select(ads);

    if (!ad) {
      return null;
    }

    this.scheduler.completeSongAdCycle();

    return ad;
  }

  onSkip(
    ads: Advertisement[]
  ): Advertisement | null {
    this.scheduler.registerSkip();

    if (
      !this.scheduler.shouldShowAdForSkip()
    ) {
      return null;
    }

    if (!ads.length) {
      return null;
    }

    const ad = this.selector.select(ads);

    if (!ad) {
      return null;
    }

    this.scheduler.completeSkipAdCycle();

    return ad;
  }
}