"use client";

import MusicRowCard from "./MusicRowCard";
import TitleMusic from "./TitleMusic";
import { Song } from "@/redux/features/playerSlice";
import { useLanguage } from "@/i18n/LanguageProvider";

interface ArtistPopularMusicProps {
  songs?: Song[];
}

const ArtistPopularMusic = ({
  songs,
}: ArtistPopularMusicProps) => {
  const { t } = useLanguage();

  return (
    <div className="pl-4.5 pt-3.5 grid gap-5 items-center">
      <TitleMusic title={t("artist.popular")} />

      {songs?.slice(0, 5).map((item, i) => (
        <MusicRowCard
          key={i}
          item={item}
          songs={songs}
          index={i}
        />
      ))}
    </div>
  );
};

export default ArtistPopularMusic;