"use client";

import TitleMusic from "../ArtistTabs/TitleMusic";
import { Song } from "@/redux/features/playerSlice";
import TrackCardSlider from "@/shared/TrackCardSlider/TrackCardSlider";
import { useLanguage } from "@/i18n/LanguageProvider";

const ArtistFeaturing = ({
  songs,
  artistname,
}: {
  songs: Song[];
  artistname: string;
}) => {
  const { t } = useLanguage();

  const featuringSongs = songs.filter(
    (song) => song.artists && song.artists.length > 1
  );

  if (featuringSongs.length === 0) return null;

  return (
    <div className="pl-4.5 mt-10 grid pr-4 gap-2.25">
      <TitleMusic
        title={`${t("artist.featuring")} ${artistname}`}
      />

      <TrackCardSlider
        cardimages={featuringSongs}
        title=""
        isArtist
      />
    </div>
  );
};

export default ArtistFeaturing;