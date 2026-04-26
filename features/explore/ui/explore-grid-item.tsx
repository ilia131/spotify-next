import { Shorts } from "@/redux/services/artistApislice";
import Image from "next/image";

interface Props {
  video: Shorts;
  thumb?: string;
  visible: boolean;
  hovered: string | null;
  span: string;

  onHover: () => void;
  onLeave: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
  onClick: () => void;

  videoRef: (el: HTMLVideoElement | null) => void;
  itemRef: (el: HTMLDivElement | null) => void;
}

export const ExploreGridItem = ({
  video,
  thumb,
  visible,
  hovered,
  span,
  onHover,
  onLeave,
  onTouchStart,
  onTouchEnd,
  onClick,
  videoRef,
  itemRef,
}: Props) => {
  const { uuid } = video;

  return (
    <div
      data-id={uuid}
      ref={itemRef}
      className={`relative overflow-hidden cursor-pointer ${span}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={onClick}
    >
    {!thumb && (
        <div className="absolute inset-0 bg-[#272727] animate-pulse" />
      )}
      {thumb && hovered !== uuid && (
        <Image
          src={thumb}
          alt=""
          width={300}
          height={300}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {visible && (
        <video
          ref={videoRef}
          src={video.video}
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};
