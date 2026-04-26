"use client"

import FreshTrackHero from "@/features/freshTrack/ui/fresh-track-hero";
import FreshTrackRows from "@/features/freshTrack/ui/fresh-track-rows";
import { useGetFreshTrackQuery } from "@/redux/services/artistApislice";

const FreshTrack = () => {
  const {data , isLoading} = useGetFreshTrackQuery()
  const imagefirst = data?.[0]?.image_url ?? ''
  if (isLoading) return null
  return (
    <main className="grid pb-50 overflow-hidden">
      <FreshTrackHero 
       image={imagefirst}
      />
      <FreshTrackRows 
        songs={data ?? []}
      />
    </main>
  );
};

export default FreshTrack;