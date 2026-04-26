interface LoaderProps {
  src: string;
  width?: number;
  quality?: number;
}

export default function myImageLoader({
  src,
  width,
  quality,
}: LoaderProps) {
  const q = quality ?? 75;
  const w = width ?? 800;
  return `${src}?w=${w}&q=${q}`;
}