import { StaticImageData } from "next/image";

export interface FilterItem {
  readonly name: string;
  readonly height: string;
  readonly padding: string;
  readonly width: string;
}

export interface MediaItem {
  picture: StaticImageData;
  desc: string;
}

export type MediaKey = "cc" | "bilie" | "vini";

export interface SectionConfig {
  title: string;
  items: MediaKey[];
  variant?: "artist" | "card";
}
