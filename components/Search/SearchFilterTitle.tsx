interface Props {
  title:string
}


const SearchFilterTitle = ({title}:Props) => {
  return (
    <h2 className="text-[17px] text-[rgba(255,255,255,0.9)]">{title}</h2>
  )
}

export default SearchFilterTitle