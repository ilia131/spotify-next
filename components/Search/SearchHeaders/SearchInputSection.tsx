import SearchIconCs from '@/public/Icons/SearchIconCs'
interface Props {
    scrolled:boolean
}
const SearchInputSection = ({scrolled}:Props) => {
  return (
    <section className={`h-12.5 w-full rounded-[5px] bg-[#FFFFFF]  flex items-center pl-2.5 pr-10.5 gap-3.5
        ${scrolled ? 'scale-[0.98] shadow-lg' : 'scale-100'}
        `}>
          <div className="flex pb-0.75 ">
            <SearchIconCs className="w-5.5 h-5.25 "  fill='#000000' fillOpacity='0.65' />
          </div>
          <input className="w-full   focus:outline-none placeholder:text-[16px] placeholder:text-[rgba(0,0,0,0.75)]"  title=""  placeholder="What do you want to listen to?" />
    </section>
  )
}

export default SearchInputSection