"use client";

import CardSlider from "@/shared/CardSlider/CardSlider";
import CardSection from "@/shared/CardSection/CardSection";
import MoreLikeCard from "@/shared/MoreLikeCard/MoreLikeCard";
import ArtistMiniCard from "../ArtistMiniCard/ArtistMiniCard";

import { useLanguage } from "@/i18n/LanguageProvider";

import BigCardArtist from "./BigCardArtist/BigCardArtist";

import {
  useArtistsQuery,
  useGetBigCardArtistsQuery,
  useGetFreshTrackQuery,
  useGetPopularAlbumQuery,
  useGetTredingTrackQuery,
  useGetFavArtistsQuery,
} from "@/redux/services/artistApislice";

import CardSectionPA from "@/entities/albums/ui/card-section-popular-albums";
import SkeletonSection from "@/shared/ui/Skeleton/SkeletonSection";

export default function FilterSlider() {
  const { t } = useLanguage();

  const { data: artists } = useGetFavArtistsQuery(0);

  const latestArtist =
    artists?.[artists.length - 1];

  const {
    data,
    error,
    isLoading,
  } = useArtistsQuery();

  const {
    data: FreshTrack,
  } = useGetFreshTrackQuery();

  const {
    data: Trending,
  } = useGetTredingTrackQuery();

  const {
    data: PopularAlbum,
  } = useGetPopularAlbumQuery();

  const {
    data: bigArtists,
  } = useGetBigCardArtistsQuery();

  const sliderData = data;

  if (isLoading) {
    return (
      <div className="pl-4 pt-23.5 pb-24">
        <SkeletonSection
          title={t("home.freshTracks")}
        />

        <SkeletonSection
          title={t("home.trendingHits")}
        />

        <SkeletonSection
          title={t("home.popularAlbums")}
        />

        <SkeletonSection
          title={t("home.favoriteArtists")}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        {t("home.errorLoadingArtists")}
      </div>
    );
  }

  return (
    <div className="pl-4 relative hide-scrollbar pb-24 pt-23.25 animate-[fadeIn_.4s_ease]">

      <ArtistMiniCard />

      {FreshTrack && FreshTrack.length > 0 && (
        <CardSection
          title={t("home.freshTrackFriday")}
          items={FreshTrack}
          variant="track"
        />
      )}

      {Trending && Trending.length > 0 && (
        <CardSection
          title={t("home.trendingHits")}
          items={Trending}
          variant="track"
        />
      )}

      {PopularAlbum && PopularAlbum.length > 0 && (
        <CardSectionPA
          title={t("home.popularAlbums")}
          items={PopularAlbum}
        />
      )}

      {latestArtist && (
        <MoreLikeCard
          images={latestArtist.profile_pic}
          subtitle={t("home.moreLike")}
          label={latestArtist.artistname}
        />
      )}

      {sliderData && sliderData.length > 0 && (
        <CardSlider
          cardimages={sliderData}
          title={t("home.yourFavoriteArtists")}
          variant="avatar"

        />
      )}

      <div className="pb-50">
        {bigArtists?.map((artist) => {
          const firstTrackImage =
            artist.top_tracks?.[0]?.image_url;

          const firstTrack =
            artist.top_tracks?.[0];

          const album_name =
            artist.top_tracks?.[0]?.album_name;

          return (
            <BigCardArtist
              key={artist.id}
              item={{
                name: artist.artistname,
                pic: artist.profile_pic_url,
                bg:
                  firstTrackImage ||
                  artist.background ||
                  "",
                firstTrack,
                album_name,
              }}
            />
          );
        })}
      </div>

    </div>
  );
}