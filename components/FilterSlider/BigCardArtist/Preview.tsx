const Preview = ({ isActive }: { isActive: boolean }) => {
  return (
    <div
      className="
        h-9 px-4 rounded-full
        bg-white/10 border border-white/10
        backdrop-blur-md
        flex items-center gap-3
        shadow-[0_8px_30px_rgba(0,0,0,0.25)]
      "
    >
      <div className="flex items-end gap-[3px] h-5">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`
              w-[3px] bg-white rounded-full
              ${isActive ? `animate-sound delay-${bar}` : "h-2"}
            `}
          />
        ))}
      </div>

      <span
        className={`
          text-xs font-medium tracking-wide
          transition-colors duration-300
          ${isActive ? "text-green-400" : "text-white/70"}
        `}
      >
        {isActive ? "Now Playing" : "Preview"}
      </span>
    </div>
  );
};

export default Preview;