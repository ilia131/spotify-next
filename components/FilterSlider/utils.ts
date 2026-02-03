import { mediaLibrary } from "@/data/homeSection";
import { MediaItem, MediaKey } from "./types";

export const mapItems = (keys: MediaKey[]): MediaItem[] =>
  keys.map((key) => mediaLibrary[key]);
