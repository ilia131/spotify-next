import Image from "next/image";
import { Shorts } from "@/redux/services/artistApislice";
import { useEffect, useState } from "react"; // useState را اضافه کن
import { useShortVideos } from "@/features/explore/hooks/useShortVideo";

interface ShortVideoProps {
  item: Shorts;
  i: number;
  onOpen: (i: number) => void;
  videos: Shorts[];
}

const ShortVideo = ({ item, onOpen, i }: ShortVideoProps) => {
  const { thumbnails, generateThumbnails } = useShortVideos();
  const uuid = item.uuid;
  const thumb = thumbnails[uuid] ;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (thumb) {
      setIsLoading(false);
      return;
    }

    const generateAndSetThumbnail = async () => {
      setIsLoading(true);
      try {
        
        await generateThumbnails([item]);
    
      } catch (error) {
        setIsLoading(false); 
      }
    };
    if (!thumb) {
      generateAndSetThumbnail();
    }

 
  }, [uuid, thumb, item, generateThumbnails]); 

  return (
    <div
      className="h-45.75 relative flex justify-center cursor-pointer"
      onClick={() => onOpen(i)}
    >
      {isLoading ? (
        <div
          className="h-45.75 flex items-center justify-center rounded-[9px] bg-gray-300" 
          style={{ width: '107px' }} 
        >
          <p>Loading...</p> 
        </div>
      ) : (
        <Image
          width={107}
          height={183}
          src={thumb || "/images/placeholder-thumb.png"}
          className="h-45.75 overflow-hidden rounded-[9px] object-cover"
          alt={item.caption || "short video"}
          loading="lazy"
          onLoad={() => {
            setIsLoading(false);
          }}
          onError={(e) => {
            setIsLoading(false);
          }}
        />
      )}
      <p className="absolute bottom-2 font-bold text-[12px] text-white">
        {item.caption}
      </p>
    </div>
  );
};

export default ShortVideo;
