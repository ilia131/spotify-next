// components/SkeletonSection.tsx

import SkeletonTrackCard from "./SkeletonTrackCard";

export default function SkeletonSection({
  title,
}: {
  title: string;
}) {
  return (
    <div className="mb-8">
      <div className="h-7 w-52 bg-white/[0.06] rounded mb-4 animate-pulse" />

      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonTrackCard key={i} />
        ))}
      </div>
    </div>
  );
}