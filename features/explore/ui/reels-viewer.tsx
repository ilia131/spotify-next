"use client";

import { useEffect, useRef, useState } from "react";
import { Shorts, useGetShortVideoDetailQuery } from "@/redux/services/artistApislice";
import { useAppSelector } from "@/redux/hook";
import { X } from "lucide-react";

interface Props {
  videos: Shorts[];
  startIndex: number;
  onClose: () => void;
}

const ReelsViewer = ({ videos, startIndex, onClose }: Props) => {
  const isMusicPlaying = useAppSelector((state) => state.player.isPlaying);

  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const currentVideo = videos[currentIndex];

  const { data: detail  } = useGetShortVideoDetailQuery(currentVideo?.uuid, {
    skip: !currentVideo,
  });

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: startIndex * window.innerHeight,
      behavior: "auto",
    });
  }, [startIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // اگر المنت قابل مشاهده بود، ایندکسش رو currentIndex قرار میدیم
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setCurrentIndex(index);
          }
        });
      },
      { threshold: 0.8 } // وقتی 80% المنت داخل صفحه هست، ایونت فعال میشه
    );

    containerRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, [])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      video.muted = isMusicPlaying;

      if (index === currentIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentIndex, isMusicPlaying]);

  return (
    <div className="fixed inset-0 flex justify-center z-1" >
      <div
        ref={scrollContainerRef}
        className="h-screen w-110 max-[440px]:w-full overflow-y-scroll snap-y snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <button
          title="close"
          onClick={onClose}
          className="fixed top-6 left-4 z-50 text-white text-xl"
        >
          <X />
        </button>

        {videos.map((v, index) => (
          <div
            key={v.uuid}
            data-index={index}
            ref={(el) => {
              containerRefs.current[index] = el;
            }}
            className="h-screen w-full snap-start flex items-center justify-center relative"
          >
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={v.video}
              className="h-full w-full object-cover"
              loop
              playsInline
              preload="metadata"
            />

            {index === currentIndex && detail && (
              <div className="absolute bottom-20 left-4 text-white pb-20">
                <p className="font-bold">@{detail?.user?.username}</p>
                <p className="text-sm">{detail?.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReelsViewer;
