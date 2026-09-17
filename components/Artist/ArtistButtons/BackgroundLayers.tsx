interface Props {
  image?: string;
}

const BackgroundLayers = ({ image }: Props) => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#121212]">
      {/* Artist image */}
      {image && (
        <div
          className="absolute inset-x-0 top-0 h-[650px] scale-110 bg-cover bg-center blur-[45px]"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      )}

      {/* Darken image */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Main fade */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(18,18,18,0.05) 0%,
              rgba(18,18,18,0.15) 20%,
              rgba(18,18,18,0.45) 45%,
              rgba(18,18,18,0.85) 68%,
              #121212 85%
            )
          `,
        }}
      />

      {/* Extra bottom fade */}
      <div
        className="absolute left-0 right-0 bottom-0 h-[45%]"
        style={{
          background:
            "linear-gradient(to top, #121212 0%, transparent 100%)",
        }}
      />
    </div>
  );
};

export default BackgroundLayers;