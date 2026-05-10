import { useState } from 'react';
import ShortVideo from './ShortVideo';
import TitleMusic from '../ArtistTabs/TitleMusic';
import { Shorts } from '@/redux/services/artistApislice';
import ReelsViewer from '@/features/explore/ui/reels-viewer';
import { useAppDispatch } from "@/redux/hook";
import { setVideoPlaying } from '@/redux/features/playerSlice';

interface ShortVideosProps {
  shortvideo?: Shorts[];
  artistname:string
}

const ShortVideoSection = ({ shortvideo  , artistname}: ShortVideosProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const videos = shortvideo?.slice(3) ?? [];

  return (
    <section className="grid pl-4.5 pt-5.25 pr-4 gap-2.25">
      <TitleMusic title={`Clips from ${artistname}`} />

      <div className="flex h-45.75 gap-4.5">
        {videos.map((item, i) => (
          <ShortVideo
            key={item.uuid}
            item={item}
            i={i}
            videos={videos}
            onOpen={(index) => {
              dispatch(setVideoPlaying());
              setActiveIndex(index);
            }}
          />
        ))}
      </div>

      {activeIndex !== null && (
        <ReelsViewer
          videos={videos}
          startIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </section>
  );
};

export default ShortVideoSection;
