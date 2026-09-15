import {
    Advertisement,
  } from "@/redux/services/adsApiSlice";
  
  export class RandomAdSelector {
    select(
      ads: Advertisement[]
    ): Advertisement | null {
      if (!ads.length) {
        return null;
      }
  
      const randomIndex =
        Math.floor(
          Math.random() *
            ads.length
        );
  
      return (
        ads[randomIndex] ?? null
      );
    }
  }