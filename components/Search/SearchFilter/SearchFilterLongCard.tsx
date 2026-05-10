import { GenreCard } from "./SearchFilterAllCard"
import { useRouter } from "next/navigation"
interface Props {
  item: GenreCard
  i: number
}

const SearchFilterLongCard = ({ item, i }: Props) => {
  const router = useRouter()
  return (
    <div
      className={`
        relative overflow-hidden rounded-lg
        h-18 max-[440px]:w-47 w-49.5
        max-[394px]:w-41
        max-[363px]:w-37
        max-[340px]:w-35
        max-[430px]:w-44
        flex items-start p-4
        ${i % 2 === 0 ? "justify-self-start" : "justify-self-end"}
      `}
      style={{
        backgroundColor: item.color,
      }}
      onClick={() =>router.push(`/search/genre/${item.name}`)}
    >
      <h2 className="text-white text-[16px] font-bold leading-5">
        {item.name}
      </h2>

      {/* decorative shape مثل spotify */}
      <div
        className="
          absolute -bottom-3 -right-3
          w-16 h-16
          bg-black/20
          rotate-12 rounded-md
        "
      />
    </div>
  )
}

export default SearchFilterLongCard
