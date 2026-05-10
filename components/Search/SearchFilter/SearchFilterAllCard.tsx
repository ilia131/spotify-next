import SearchFilterTitle from "../SearchFilterTitle"
import SearchFilterLongCard from "./SearchFilterLongCard"
import {  useGetAllGenreQuery } from "@/redux/services/genreApiSlice"

interface Props {
  title: string
}

export interface GenreCard {
  name: string
  color: string
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
}

export const getGenreColor = (genre: string) => {
  const key = genre.toLowerCase().replace(/\s+/g, "")
  return GENRE_COLORS[key] || "#535353"
}

const SearchFilterAllCard = ({ title }: Props) => {
  const { data, isLoading } = useGetAllGenreQuery(0)
   
  if (isLoading) return <div>Loading...</div>

  const genres =
    data?.map((genre: GenreCard) => ({
      name: genre.name,
      color: getGenreColor(genre.name),
    })) || []
   
  return (
    <div className="w-full flex flex-col mt-8.5 gap-5 pl-4 pr-3.5 pb-150">
      <SearchFilterTitle title={title} />

      <div className="w-full grid grid-cols-2 gap-y-3">
        {genres.map((item: GenreCard, i: number) => (
          <SearchFilterLongCard key={i} item={item} i={i} />
        ))}
      </div>
    </div>
  )
}

export default SearchFilterAllCard
