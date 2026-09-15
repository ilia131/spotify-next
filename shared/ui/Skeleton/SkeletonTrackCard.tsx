// components/SkeletonTrackCard.tsx

export default function SkeletonTrackCard() {
    return (
      <div
        className="
          w-40 h-56
          rounded-2xl
          bg-white/[0.03]
          animate-pulse
          shrink-0
        "
      >
        <div className="w-full h-40 rounded-t-2xl bg-white/[0.06]" />
  
        <div className="p-3">
          <div className="h-4 rounded bg-white/[0.06]" />
  
          <div className="h-3 rounded bg-white/[0.04] mt-3 w-2/3" />
        </div>
      </div>
    );
  }