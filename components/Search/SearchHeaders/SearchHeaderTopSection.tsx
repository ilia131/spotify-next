import { OverlayLeft } from "../../common/NavSlider/OverlayLeft"
interface Props {
    scrolled:boolean
}
const SearchHeaderTopSection = ({scrolled}:Props) => {
  return (
       <section className={`
          w-32.25 relative flex items-center 
          transition-all duration-300
          ${scrolled ? 'opacity-0 -translate-y-4  mb-0 h-3.5 ' : 'opacity-100 translate-y-0 h-9.5 '}
        `}
        >
           <OverlayLeft />
           <p className="text-[23px] font-semibold text-[rgba(255,255,255,0.85)] relative left-11.25">Search</p>
       </section>
  )
}

export default SearchHeaderTopSection