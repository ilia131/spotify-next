interface Props {
  dominantColor?: string;
}

const BackgroundLayers = ({ dominantColor }: Props) => {
  return (
    <>
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: dominantColor
            ? `
              radial-gradient(circle at 50% 0%,
                ${dominantColor}80 0%,
                ${dominantColor}40 25%,
                transparent 60%
              ),

              radial-gradient(circle at 20% 20%,
                ${dominantColor}55,
                transparent 50%
              ),

              radial-gradient(circle at 80% 10%,
                ${dominantColor}33,
                transparent 55%
              ),

              linear-gradient(
                to bottom,
                ${dominantColor}66 0%,
                ${dominantColor}33 25%,
                rgba(0,0,0,0.15) 55%,
                #111c1e 100%
              )
            `
            : "#111c1e",
        }}
      >
        {/* Aurora blobs */}
        <div
          className="absolute left-[-200px] top-[-100px] h-[500px] w-[500px] rounded-full blur-[150px]"
          style={{ backgroundColor: dominantColor ?? "#22c55e" }}
        />

        <div
          className="absolute right-[-150px] top-[50px] h-[450px] w-[450px] rounded-full blur-[150px]"
          style={{
            backgroundColor: dominantColor ?? "#a855f7",
            opacity: 0.35,
          }}
        />
      </div>
    </>
  );
};

export default BackgroundLayers;