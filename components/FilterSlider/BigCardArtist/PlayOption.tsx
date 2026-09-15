const PlayOption = ({
  isPlaying,
  onTogglePlay,
}: {
  isPlaying: boolean;
  onTogglePlay: (e: React.MouseEvent) => void;
}) => {
  return (
    <button
      onClick={onTogglePlay}
      className="
        group
        w-13 h-13
        rounded-full
        bg-white
        flex items-center justify-center
        shadow-[0_10px_25px_rgba(0,0,0,0.25)]
        hover:scale-110
        active:scale-95
        transition-all duration-300
      "
    >
      {isPlaying ? (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="black"
          className="transition-transform group-hover:scale-110"
        >
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="black"
          className="
            translate-x-[1px]
            transition-transform
            group-hover:scale-110
          "
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
};

export default PlayOption;