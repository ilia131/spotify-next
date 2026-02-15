interface Props{
    item:{name:string , color:string}
    i:number
}

const SearchFilterCard = ({item , i}:Props) => {
  return (
    <div className={` max-[394px]:w-41 h-13.5 pt-1.25 pl-2.25  max-[440px]:w-47 w-49.5
        max-[363px]:w-37 max-[340px]:w-35 max-[430px]:w-44
        ${i % 2 === 0 ? "justify-self-start" : "justify-self-end"}
       ${item.color}`}>
          <p className="text-[16px] text-[rgba(255,255,255,0.8)]">{item.name}</p>
    </div>
  )
}

export default SearchFilterCard