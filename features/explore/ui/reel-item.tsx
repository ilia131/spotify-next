"use client";

interface Props {
  video: string;
  artist: string;
  title: string;
}

const ReelItem = ({ video, artist, title }: Props) => {
  return (
    <div className="relative h-screen w-full snap-start bg-black flex items-center justify-center">

      <video
        src={video}
        className="absolute h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute bottom-24 left-4 text-white">
        <p className="font-semibold">{artist}</p>
        <p className="text-sm opacity-80">{title}</p>
      </div>

    </div>
  );
};

export default ReelItem;
