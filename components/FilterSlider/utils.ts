import { MediaKey, MediaItem } from "@/data/media";
import { mediaLibrary } from "@/data/homeSection";

export const mapItems = (keys: MediaKey[]): MediaItem[] => {
  return keys.map((key) => mediaLibrary[key]);
};
