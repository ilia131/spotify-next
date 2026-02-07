import { StaticImageData } from 'next/image';
import ShortVideo from './ShortVideo'
import TitleMusic from '../ArtistTabs/TitleMusic'

interface ShortVideosProps {
    shortvideo:ItemPopularMusic[]
}

interface ItemPopularMusic {
    musicname:string;
    cover:StaticImageData;
}


const ShortVideoSection = ({shortvideo}:ShortVideosProps) => {
  return (
     <section className="grid pl-4.5 pt-5.25 pr-4  gap-2.25">
        <TitleMusic title="Clips from Ashkan Kagan" />
      
        <div className="flex  h-45.75 gap-4.5 ">
        {shortvideo.map((item,i)=>(
             <ShortVideo item={item} key={i} />
        ))}
        
        </div>
    </section>
  )
}

export default ShortVideoSection