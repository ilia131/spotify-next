"use client"
import { OverlayLeft } from "../../shared/NavSlider/OverlayLeft"
import SearchIconCs from "@/public/Icons/SearchIconCs"
import PlusIconCs from "@/public/Icons/PlusIconCs"
import { ArrowLeft } from "lucide-react"

interface HeaderLibraryProps {
  handleOpen: (isOpen: boolean) => void
  isSearching: boolean
  setIsSearching: (v: boolean) => void
  searchTerm: string
  setSearchTerm: (v: string) => void
}

const HeaderLibrary = ({
  handleOpen,
  isSearching,
  setIsSearching,
  searchTerm,
  setSearchTerm
}: HeaderLibraryProps) => {
  return (
    <>
    

      <div className="w-full h-9 flex items-center justify-between relative z-50">
        
        {/* ✅ حالت عادی - همان استایل تو */}
        {!isSearching && (
          <>
            <div className="relative flex items-center ">
              <OverlayLeft />
              <p className="text-[23px] text-[#FFFFFF] mt-0.5 font-bold left-11.25 relative max-[340px]:text-[20px] max-[340px]:top-0.5">
                Your Library
              </p>
            </div>

            <div className="w-15.75 h-5 flex gap-5.75 items-center">
              <div
                onClick={() => setIsSearching(true)}
                className="cursor-pointer "
              >
                <SearchIconCs fill="white" fillOpacity="0.8" />
              </div>

              <div onClick={() => handleOpen(true)} className="cursor-pointer">
                <PlusIconCs />
              </div>
            </div>
          </>
        )}

        {/* ✅ حالت سرچ */}
        {isSearching && (
          <div className="flex items-center w-full gap-3 animate-fadeIn">
            <ArrowLeft
              className="text-white cursor-pointer"
              onClick={() => {
                setIsSearching(false)
                setSearchTerm("")
              }}
            />
            <input
              autoFocus
              type="text"
              placeholder="Search in Your Library"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-[#2a2a2a] text-white px-3 py-1.5 rounded-md outline-none text-[15px]"
            />
          </div>
        )}
      </div>
    </>
  )
}

export default HeaderLibrary
