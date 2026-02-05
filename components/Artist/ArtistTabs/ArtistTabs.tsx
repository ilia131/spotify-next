"use client"
import { useState } from "react"

const ArtistTabs = () => {
  const [activeTab, setActiveTab] = useState("music")

  return (
    <div className="flex gap-7.5 mt-0.75">
      <button
        onClick={() => setActiveTab("music")}
        className="relative pb-2"
      >
        <span
          className={`text-[17px] font-normal ${
            activeTab === "music"
              ? "text-white"
              : "text-white/50"
          }`}
        >
          Music
        </span>

        {activeTab === "music" && (
          <span className="absolute left-0 -bottom-1 h-0.75 w-full rounded-full bg-[#1ED760]" />
        )}
      </button>

      <button
        onClick={() => setActiveTab("clips")}
        className="relative pb-2"
      >
        <span
          className={`text-[17px] font-normal ${
            activeTab === "clips"
              ? "text-white"
              : "text-white/50"
          }`}
        >
          Clips
        </span>

        {activeTab === "clips" && (
          <span className="absolute left-0 -bottom-1 h-0.75 w-full rounded-full bg-[#1ED760]" />
        )}
      </button>
    </div>
  )
}

export default ArtistTabs
