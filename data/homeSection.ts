import { StaticImageData } from "next/image";
import images from "@/public/images";



export type MediaKey = "cc" | "bilie" | "vini";

export interface MediaItem {
  picture: StaticImageData;
  desc: string;
}

export type MediaLibrary = Record<MediaKey, MediaItem>;

export interface SectionConfig {
  title: string;
  items: MediaKey[];
  variant?: "artist" | "card";
}



export const mediaLibrary: MediaLibrary = {
  cc: {
    picture: images.cc,
    desc: "Camila Cabello",
  },
  bilie: {
    picture: images.Bilie,
    desc: "Camila Cabello",
  },
  vini: {
    picture: images.vini,
    desc: "Noah Kahan, Labrinth, Paris Paloma, jireel, Co...",
  },
  
};

export const sectionsConfig: SectionConfig[] = [
  {
    title: "Fresh Tracks Friday!",
    items: ["cc", "bilie", "vini"],
  },
  {
    title: "Trending Hits",
    items: ["bilie", "vini", "cc"],
  },
  {
    title: "Recommended Today",
    items: ["bilie", "vini", "cc"],
  },
  {
    title: "Your Favorite Artists",
    items: ["bilie", "vini", "cc"],
    variant: "artist",
  },
];
