import { StaticImageData } from "next/image";

export type MediaKey = "cc" | "bilie"
 | "vini" | "vini2" | "dorcci" | 'hiphoplogist' | 'hiphoplogist2' 
 | 'dorcci2' | 'gucci' | 'gucci2';

export interface MediaItem {
  picture: StaticImageData;
  desc: string;
  name:string;
  profile_pic:StaticImageData,
    id:string
    bio:string
}

export type MediaLibrary = Record<MediaKey, MediaItem>;