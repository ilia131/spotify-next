"use client";

import { useState } from "react";
import ShortVideo from "./ShortVideo";
import TitleMusic from "../ArtistTabs/TitleMusic";
import { Shorts } from "@/redux/services/artistApislice";
import ReelsViewer from "@/features/explore/ui/reels-viewer";
import { useAppDispatch } from "@/redux/hook";
import { setVideoPlaying } from "@/redux/features/playerSlice";
import { useLanguage } from "@/i18n/LanguageProvider";

interface ShortVideosProps {
  shortvideo?: Shorts[];
  artistname: string;
}

const ShortVideoSection = ({
  shortvideo,
  artistname,
}: ShortVideosProps) => {
  const { t, locale } = useLanguage();

  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  const dispatch = useAppDispatch();

  const videos = shortvideo ?? [];

  if (!videos.length) {
    return null;
  }

  return (
    <section className="grid pl-4.5 pt-5.25 pr-4 gap-2.25">
      <TitleMusic
title={
  locale === "fa"
    ? `${artistname} ${t("artist.clipsFrom")}`
    : `${t("artist.clipsFrom")} ${artistname}`
}      />

      <div className="flex h-45.75 gap-4.5 overflow-x-auto hide-scrollbar">
        {videos.slice(0,3).map((item, i) => (
          <ShortVideo
            key={item.uuid}
            item={item}
            i={i}
            videos={videos}
            onOpen={(index) => {
              dispatch(setVideoPlaying());
              setActiveIndex(index);
            }}
          />
        ))}
      </div>

      {activeIndex !== null && (
        <ReelsViewer
          videos={videos}
          startIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </section>
  );
};

export default ShortVideoSection;