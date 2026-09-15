"use client";

import Image from "next/image";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { closeBottomSheet } from "@/redux/features/bottomSheet";
import { openPlaylistModal } from "@/redux/features/playlistModalSlice";

import {
  useToggleLikeSongMutation,
  useGetLikedStatusQuery,
} from "@/redux/services/likedSongs";

import {
  X,
  Heart,
  HeartOff,
  UserRound,
  Music4,
  ListMusic,
  Disc3,
} from "lucide-react";

export default function MusicOptionsSheet() {
  const dispatch = useAppDispatch();

  const { isOpen, song } = useAppSelector(
    (state) => state.bottomSheet
  );

  const songId = song?.unique_id;

  const [toggleLike, { isLoading }] =
    useToggleLikeSongMutation();

  const { data: likedStatus } = useGetLikedStatusQuery(
    songId ? [songId] : [],
    {
      skip: !songId,
    }
  );

  const liked = songId
    ? likedStatus?.[songId] ?? false
    : false;

  const handleLike = () => {
    if (!songId) return;
    toggleLike(songId);
  };

  if (!isOpen || !song) return null;

  const actionClass = `
    group
    h-14
    rounded-2xl
    bg-white/5
    hover:bg-white/10
    border border-white/10
    flex items-center
    gap-4
    px-5
    text-white
    transition-all
    duration-200
  `;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}

      <div
        onClick={() => dispatch(closeBottomSheet())}
        className="
          absolute inset-0
          bg-black/50
          backdrop-blur-xl
        "
      />

      {/* Ambient Lights */}

      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-green-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Sheet */}

      <div
        onClick={(e) => e.stopPropagation()}
        className="
          absolute
          bottom-0
          left-1/2
          -translate-x-1/2

          w-full
          max-w-[430px]

          rounded-t-[36px]

          bg-white/5
          backdrop-blur-3xl

          border border-white/10

          shadow-[0_-20px_80px_rgba(0,0,0,.45)]

          overflow-hidden

          animate-slideUp
        "
      >
        {/* Shine */}

        <div
          className="
            absolute inset-0
            bg-gradient-to-br
            from-white/10
            via-transparent
            to-transparent
            pointer-events-none
          "
        />

        {/* Handle */}

        <div className="flex justify-center pt-3">
          <div className="w-14 h-1.5 rounded-full bg-white/20" />
        </div>

        {/* Close Button */}

        <div className="absolute top-5 right-5 z-10">
          <button
            onClick={() => dispatch(closeBottomSheet())}
            className="
              w-10 h-10
              rounded-full
              bg-white/10
              hover:bg-white/20
              border border-white/10
              flex items-center justify-center
              transition
            "
          >
            <X size={18} className="text-white" />
          </button>
        </div>

        {/* Song */}

        <div className="px-6 pt-5 pb-6 flex items-center gap-4">
          <Image
            src={song.image_url}
            alt={song.title}
            width={80}
            height={80}
            className="
              w-20 h-20
              rounded-2xl
              object-cover
              shadow-xl
            "
          />

          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold truncate text-lg">
              {song.title}
            </h3>

            <p className="text-white/60 truncate">
              {song.artistname}
            </p>

            <p className="text-white/30 text-sm truncate">
              {song.album_name}
            </p>
          </div>
        </div>

        {/* Actions */}

        <div className="px-4 pb-8 flex flex-col gap-3">
          <button
            onClick={() => dispatch(openPlaylistModal())}
            className={actionClass}
          >
            <ListMusic
              size={20}
              className="text-green-400"
            />

            <span>Add to Playlist</span>
          </button>

          <Link
            href={`/artist/${song.artistname}`}
            onClick={() => dispatch(closeBottomSheet())}
            className={actionClass}
          >
            <UserRound
              size={20}
              className="text-blue-400"
            />

            <span>Go to Artist</span>
          </Link>

          <Link
            href={`/track/${song.unique_id}`}
            onClick={() => dispatch(closeBottomSheet())}
            className={actionClass}
          >
            <Music4
              size={20}
              className="text-purple-400"
            />

            <span>View Track</span>
          </Link>

          <button
            onClick={handleLike}
            disabled={isLoading}
            className={actionClass}
          >
            {liked ? (
              <>
                <HeartOff
                  size={20}
                  className="text-red-400"
                />
                <span>Remove from Liked Songs</span>
              </>
            ) : (
              <>
                <Heart
                  size={20}
                  className="text-pink-400"
                />
                <span>Like this Song</span>
              </>
            )}
          </button>

          <Link
            href={`/album/${song.artistname}/${song.album_name}`}
            onClick={() => dispatch(closeBottomSheet())}
            className={actionClass}
          >
            <Disc3
              size={20}
              className="text-yellow-400"
            />

            <span>View Album</span>
          </Link>
        </div>
      </div>
    </div>
  );
}