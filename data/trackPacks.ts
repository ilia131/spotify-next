import { StaticImageData } from "next/image";
import images from "@/public/images";
interface Track {
    id: string;
    artist: string;
    album: string;
    title: string;
    progress: number;
    duration: string;
    cover: StaticImageData;
    bg: string;
  }
  
export  const tracks : Track[] = [
    {
      id: "track-1",
      artist: "Sajad Shahi",
      album: "Western Sweden",
      title: "New Documentary in the Swedish Radio App",
      progress: 33,
      duration: "3:33",
      cover: images.hip2,
      bg:'bg-[rgba(10,33,50,1)]'
  
    },
    {
      id: "track-2",
      artist: "Sajad Shahi",
      album: "Western Sweden",
      title: "New Documentary in the Swedish Radio App",
      progress: 33,
      duration: "3:33",
      cover: images.hip2,
      bg:'bg-[rgba(10,33,50,1)]'
  
    },
    {
      id: "track-3",
      artist: "Sajad Shahi",
      album: "Western Sweden",
      title: "New Documentary in the Swedish Radio App",
      progress: 33,
      duration: "3:33",
      cover: images.hip3,
      bg:'bg-[rgba(10,33,50,1)]'
    },
    {
      id: "track-4",
      artist: "Sajad Shahi",
      album: "Western Sweden",
      title: "New Documentary in the Swedish Radio App",
      progress: 33,
      duration: "3:33",
      cover: images.HipHopLogist,
      bg:'bg-[rgba(10,33,50,1)]'
    },
  ]