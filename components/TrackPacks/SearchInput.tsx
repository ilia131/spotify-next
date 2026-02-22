import SearchIconCs from "@/public/Icons/SearchIconCs";
export function SearchInput() {
    return (
      <div className="w-full h-6.5 bg-[#2A2727] rounded-[14px] flex py-1 items-center pl-2.5 pr-1.25 justify-between">
        <input
          placeholder="Search for Physics Packs..."
          className="text-[7px] bg-transparent placeholder:text-white outline-none flex-1"
        />
  
        <div className="h-3.75 w-3.75 bg-[#44843C] rounded-full flex items-center justify-center">
          <SearchIconCs fill="#FFFFFF" width={7} height={7} />
        </div>
      </div>
    );
  }