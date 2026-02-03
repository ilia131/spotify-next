import { MediaItem } from "@/components/FilterSlider/types";
import ArtistMiniCard from "../ArtistMiniCard/ArtistMiniCard";

interface ArtistGridProps {
  items: MediaItem[];
}

export const ArtistGrid = ({ items }: ArtistGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item, index) => (
        <ArtistMiniCard
          key={index}
          picture={item.picture}
          desc={item.desc}
        />
      ))}
    </div>
  );
};
