'use client'
import TrendingTracksHero from "@/features/trending/ui/trending-hero"
import TrendingTracksRows from "@/features/trending/ui/trending-track-rows"
import { useGetTredingTrackQuery } from "@/redux/services/artistApislice"



const TrendingTracks = () => {
    const {data} = useGetTredingTrackQuery()
    const imagefirst = data?.[0]?.image_url ?? ''

  return (
    <div className="grid pb-50 overflow-hidden">
       <TrendingTracksHero 
         image={imagefirst}
       />
       <TrendingTracksRows 
         songs={data ?? []}
       />
    </div>
  )
}

export default TrendingTracks