"use client";

import TitleMusic from "../ArtistTabs/TitleMusic";
import PopularReleaseCard from "./PopularReleaseCard";
import { useParams } from "next/navigation";
import { useGetArtistAlbumsQuery } from "@/redux/services/artistContentApiSlice";
import { Song } from "@/redux/features/playerSlice";
import { Album } from "@/redux/services/artistApislice";

const ArtistPopularRelease = () => {

  const params = useParams<{ artistname: string }>();
  const artistname = decodeURIComponent(params.artistname);

  const { data } = useGetArtistAlbumsQuery({
    artistname,
    cursor: null
  });

  const releases: Song[] =
    data?.results?.slice(0, 5).map((album: Album) => ({
      id: album.id,
      title: album.title,
      image_url: album.cover
    })) ?? [];

  return (
    <div className="pl-4.5 pt-5.25 pr-4 grid gap-2.25">
      <TitleMusic title="Popular releases" />

      {releases.map((item, i) => (
        <PopularReleaseCard item={item} key={item.id ?? i} />
      ))}
    </div>
  );
};

export default ArtistPopularRelease;
