"use client";

import SearchFilterTitle from "../SearchFilterTitle";
import SearchFilterLongCard from "./SearchFilterLongCard";
import { useGetAllGenreQuery } from "@/redux/services/genreApiSlice";

interface Props {
  title: string;
}

export interface GenreCard {
  name: string;
  color: string;
}

export const GENRE_COLORS: Record<string, string> = {
  pop: "#E61E32",

  hiphop: "#BA5D07",
  hip_hop: "#BA5D07",
  rap: "#BA5D07",

  trap: "#AF2896",

  rock: "#1E3264",
  metal: "#222326",
  punk: "#FF4632",

  electronic: "#27856A",
  edm: "#27856A",
  house: "#1DB954",
  techno: "#0D72EA",

  jazz: "#8D67AB",
  blues: "#0D73EC",
  soul: "#DC148C",
  rnb: "#DC148C",

  indie: "#477D95",
  alternative: "#777777",

  classical: "#503750",
  opera: "#7D4B32",

  latin: "#E13300",
  reggaeton: "#E13300",

  kpop: "#F037A5",
  jpop: "#F037A5",

  country: "#9A6E31",
  folk: "#A56752",

  workout: "#E61E32",
  party: "#FF4632",
  chill: "#1E3264",
  focus: "#503750",

  soundtrack: "#777777",
};

export const getGenreColor = (genre: string) => {
  const key = genre
    .toLowerCase()
    .trim()
    .replace(/[\s_-]+/g, "");

  return (
    GENRE_COLORS[key] ||
    GENRE_COLORS[genre.toLowerCase().trim()] ||
    "#535353"
  );
};

const SearchFilterAllCard = ({ title }: Props) => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useGetAllGenreQuery(0);

  const genres: GenreCard[] =
    data?.map((genre: GenreCard) => ({
      name: genre.name,
      color: getGenreColor(genre.name),
    })) ?? [];

  return (
    <section
      className="
        mt-8.5
        flex
        w-full
        flex-col
        gap-5
        pl-4
        pr-3.5
        pb-150
      "
    >
      <SearchFilterTitle title={title} />

      {/* Loading */}
      {isLoading ? (
        <div className="flex min-h-[220px] items-center justify-center">
          <div
            className="
              h-8
              w-8
              animate-spin
              rounded-full
              border-2
              border-white/15
              border-t-[#1ed760]
            "
          />
        </div>
      ) : isError ? (
        /* Error */
        <div
          className="
            flex
            min-h-[180px]
            flex-col
            items-center
            justify-center
            rounded-xl
            bg-[#181818]
            text-center
          "
        >
          <p className="text-[15px] font-semibold text-white">
            any genres
          </p>

          <p className="mt-1 text-[13px] text-white/40">
            Please try again later.
          </p>
        </div>
      ) : genres.length === 0 ? (
        /* Empty */
        <div
          className="
            flex
            min-h-[180px]
            items-center
            justify-center
            rounded-xl
            bg-[#181818]
          "
        >
          <p className="text-[14px] text-white/40">
            No genres available
          </p>
        </div>
      ) : (
        /* Genres */
        <div className="grid w-full grid-cols-2 gap-x-3 gap-y-3">
          {genres.map((item) => (
            <SearchFilterLongCard
              key={item.name}
              item={item}
              i={genres.indexOf(item)}
            />
          ))}
        </div>
      )}

      {/* Background fetching */}
      {isFetching && !isLoading && (
        <div className="flex justify-center py-2">
          <div
            className="
              h-5
              w-5
              animate-spin
              rounded-full
              border-2
              border-white/15
              border-t-[#1ed760]
            "
          />
        </div>
      )}
    </section>
  );
};

export default SearchFilterAllCard;