import {
    AdvertisementController,
  } from "./AdvertisementController";
  
  import {
    AdScheduler,
  } from "./AdScheduler";
  
  import {
    RandomAdSelector,
  } from "./AdSelector";
  
  export function createAdvertisementController() {
    return new AdvertisementController(
      new AdScheduler(),
      new RandomAdSelector()
    );
  }