'use client';

import Image from "next/image";
import { useParams } from "next/navigation";
import { useDominantColorFromImage } from "@/shared/hooks/useDominantColorFromImage";
import { useAppSelector  , useAppDispatch} from "@/redux/hook";
import { playSingleSong, togglePlay} from "@/redux/features/playerSlice";
import {
  Heart,
  Share2,
  Disc3,
  Headphones,
} from "lucide-react";
import { useToggleLikeSongMutation , useGetLikedSongsQuery ,useGetLikedStatusQuery} from "@/redux/services/likedSongs";
import { useGetSongDetailQuery } from "@/redux/services/songApiSlice";
import { Lyrics } from "@/redux/features/playerSlice";
import { toast } from "react-toastify";
import PlayGreenButton from "@/components/Artist/ArtistButtons/PlayGreenButton";

export default function TrackDetail() {

  const dispatch = useAppDispatch();


  const params = useParams();

  const uniqueId = params.unique_id as string;

  const {
    data: song,
    isLoading,
    isError,
  } = useGetSongDetailQuery(uniqueId);
  const { color, darkColor , isPlaying , currentSong } = useAppSelector(
    (state) => state.player
  );

  const songId = song?.unique_id ?? "";

const [toggleLike, { isLoading: likeLoading }] =
  useToggleLikeSongMutation();

const { data: likedStatus } =
  useGetLikedStatusQuery(
    songId ? [songId] : [],
    {
      skip: !songId,
    }
  );

const liked =
  songId
    ? likedStatus?.[songId] ?? false
    : false;
  
  useDominantColorFromImage(song?.image_url);

  const shareTrack = async () => {
    if (!song) return;
  
    const url = `${window.location.origin}/track/${song.unique_id}`;
  
    try {
      if (navigator.share) {
        await navigator.share({
          title: song.title,
          text: `${song.artistname} - ${song.title}`,
          url,
        });
  
        return;
      }
  
      await navigator.clipboard.writeText(url);
  
      toast.success("Link copied");
    } catch (error) {
      toast.error(`error ${error}`);
    }
  };
  const songIsPlaying =
  isPlaying &&
  currentSong?.unique_id === song.unique_id;
  const handlePlay = () => {
    if (!song) return;
  
    const isCurrentSong =
      currentSong?.unique_id === song.unique_id;
  
    if (isCurrentSong) {
      dispatch(togglePlay());
      return;
    }
  
    dispatch(
      playSingleSong({
        ...song,
        audioUrl: song.track_url,
      })
    );
  };

  const handleLike = () => {
    if (!songId) return;
  
    toggleLike(songId);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-[#121212]">
        Loading...
      </div>
    );
  }
  

  if (isError || !song) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-[#121212]">
        Track not found
      </div>
    );
  }

  return (
    <main 
    
    className="min-h-screen bg-[#121212] text-white pb-50"
    style={{
      background: `linear-gradient(
        180deg,
        ${color} 0%,
        ${darkColor} 40%,
        #121212 80%
      )`,
    }}
    >
    
      {/* HERO */}

      <section className="relative px-5 pt-8 pb-6">

  <div
    className="
    absolute
    inset-0
    opacity-30
    blur-3xl
    overflow-hidden
  "
  >
    <Image
      fill
      src={song.image_url}
      alt={song.title}
      className="object-cover"
    />
  </div>

  <div className="relative flex flex-col items-center">

    <Image
      src={song.image_url}
      alt={song.title}
      width={220}
      height={220}
      className="
      w-[220px]
      h-[220px]
      rounded-md
      object-cover
      shadow-2xl
    "
    />

    <div className="mt-6 text-center w-full">
      <p className="text-xs uppercase text-zinc-400">
        Song
      </p>

      <h1
        className="
        text-3xl
        font-black
        mt-2
        leading-tight
      "
      >
        {song.title}
      </h1>

      <div
        className="
        flex
        justify-center
        flex-wrap
        gap-2
        mt-3
        text-sm
        text-zinc-300
      "
      >
        <span>{song.artistname}</span>
        <span>•</span>
        <span>{song.album_name}</span>
      </div>
    </div>

  </div>
</section>

      {/* ACTIONS */}

      <section className="px-5 mt-2">
  <div className="flex items-center gap-5">

      <button
      onClick={handleLike}
      disabled={likeLoading}
    >
      <Heart
        size={26}
        color={liked ? "#1ed760" : "#ffffff"}
        fill={liked ? "#1ed760" : "transparent"}
      />
    </button>

    <button onClick={shareTrack}>
      <Share2 size={24} />
    </button>

    <button className="ml-auto"
    
    >
     <PlayGreenButton onPlay={handlePlay} isPlaying={songIsPlaying}/>
    </button>

  </div>
</section>

      {/* STATS */}

      <section className="px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-5">
          About this track
        </h2>

        <div
          className="grid grid-cols-2 gap-3"
        >
          <div className="bg-[#181818] rounded-lg p-4">
            <Disc3 />

            <p className="text-zinc-400 mt-3">
              Genre
            </p>

            <p className="font-semibold">
              {song.genre_name}
            </p>
          </div>

          <div className="bg-[#181818] rounded-lg p-4">
            <Headphones />

            <p className="text-zinc-400 mt-3">
              Plays
            </p>

            <p className="font-semibold">
              {song.play_count}
            </p>
          </div>

          <div className="bg-[#181818] rounded-lg p-4">
            <p className="text-zinc-400">
              Tempo
            </p>

            <p className="font-semibold">
              {song.tempo} BPM
            </p>
          </div>

          <div className="bg-[#181818] rounded-lg p-4">
            <p className="text-zinc-400">
              Listeners
            </p>

            <p className="font-semibold">
              {song.unique_listeners}
            </p>
          </div>
        </div>
      </section>

      {/* DESCRIPTION */}

      <section className="px-4 sm:px-6 md:px-8 mt-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Description
        </h2>

        <p className="text-zinc-400 leading-7">
          {song.description}
        </p>
      </section>

      {/* LYRICS */}

      <section className="px-4 sm:px-6 md:px-8 mt-10 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Lyrics
        </h2>

        {song.lyrics?.length ? (
          <div className="space-y-2">
            {song.lyrics.map((line: Lyrics, index: number) => (
              <p key={index}>
                {line?.line}
              </p>
            ))}
          </div>
        ) : (
          <div className="bg-[#181818] rounded-xl p-5">
            <p className="text-zinc-500">
              No lyrics available
            </p>
          </div>
        )}
      </section>

    </main>
  );
}