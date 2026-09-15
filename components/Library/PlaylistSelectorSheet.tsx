"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { closePlaylistModal } from "@/redux/features/playlistModalSlice";
import {
  useGetUserPlaylistsQuery,
  useAddTrackToPlaylistMutation,
  Playlist,
} from "@/redux/services/playlistApiSlice";
import { toast } from "react-toastify";

export default function PlaylistSelectorSheet() {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(
    (state) => state.playlistModal.isOpen
  );

  const { song: songToAdd } = useAppSelector(
    (state) => state.bottomSheet
  );

  const { data: playlists = [] } = useGetUserPlaylistsQuery(1);

  const [addTrack, { isLoading }] =
    useAddTrackToPlaylistMutation();

  const [search, setSearch] = useState("");

  const filtered = playlists.filter((playlist) =>
    playlist.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleSelectPlaylist = async (
    playlist: Playlist
  ) => {
    if (!songToAdd) return;

    try {
      await addTrack({
        playlistId: playlist.unique_id,
        song_uuid: songToAdd.unique_id,
      }).unwrap();

      toast.success(
        `"${songToAdd.title}" added to "${playlist.name}"`
      );

      dispatch(closePlaylistModal());
    } catch (error) {
      toast.error("Failed to add track");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => dispatch(closePlaylistModal())}
        className={`
          fixed inset-0 z-40
          bg-black/60
          backdrop-blur-lg
          transition-all duration-300
          ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* Sheet */}
      <div
        className={`
          fixed inset-x-0 bottom-0 top-10
          z-50
          bg-[#111111]/95
          backdrop-blur-2xl
          rounded-t-[32px]
          border-t border-white/10
          shadow-[0_-20px_80px_rgba(0,0,0,0.5)]
          transition-transform duration-300
          flex flex-col
          ${
            isOpen
              ? "translate-y-0"
              : "translate-y-full"
          }
        `}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-14 h-1.5 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="px-6 pb-5 flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl font-bold">
              Add to Playlist
            </h2>

            {songToAdd && (
              <p className="text-white/50 text-sm mt-1 truncate max-w-[220px]">
                {songToAdd.title}
              </p>
            )}
          </div>

          <button
            onClick={() =>
              dispatch(closePlaylistModal())
            }
            className="
              w-10 h-10
              rounded-full
              bg-white/10
              hover:bg-white/20
              text-white
              transition
              flex items-center justify-center
            "
          >
            ✕
          </button>
        </div>

        {/* Search */}
        <div className="px-6 pb-5">
          <div
            className="
              h-13
              rounded-2xl
              bg-white/5
              border border-white/10
              flex items-center
              gap-3
              px-4
            "
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              className="text-white/40"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search playlists..."
              className="
                flex-1
                bg-transparent
                outline-none
                text-white
                placeholder:text-white/40
              "
            />
          </div>
        </div>

        {/* Playlists */}
        <div className="flex-1 overflow-y-auto px-4 pb-10 no-scrollbar">
          <div className="flex flex-col gap-2">
            {filtered.map((playlist) => (
              <button
                key={playlist.unique_id}
                disabled={isLoading}
                onClick={() =>
                  handleSelectPlaylist(playlist)
                }
                className="
                  group
                  flex items-center
                  gap-4
                  p-3
                  rounded-2xl
                  hover:bg-white/5
                  transition-all
                  text-left
                "
              >
                {/* Cover */}
                <div
                  className="
                    w-16 h-16
                    rounded-xl
                    shrink-0
                    bg-gradient-to-br
                    from-zinc-700
                    via-zinc-800
                    to-black
                    flex items-center justify-center
                  "
                >
                  <svg
                    width="24"
                    height="24"
                    fill="white"
                    className="opacity-80"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" />
                  </svg>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">
                    {playlist.name}
                  </p>

                  <p className="text-white/50 text-sm">
                    {playlist.tracks_count} songs
                  </p>
                </div>

                {/* Add Button */}
                <div
                  className="
                    w-10 h-10
                    rounded-full
                    bg-green-500
                    flex items-center justify-center
                    text-black
                    font-bold
                    shadow-lg
                    group-hover:scale-110
                    transition
                  "
                >
                  {isLoading ? (
                    <div
                      className="
                        w-4 h-4
                        border-2
                        border-black
                        border-t-transparent
                        rounded-full
                        animate-spin
                      "
                    />
                  ) : (
                    "+"
                  )}
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="text-6xl mb-4">🎵</div>

              <h3 className="text-white text-lg font-medium">
                No playlists found
              </h3>

              <p className="text-white/40 text-sm mt-2">
                Try another search term
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}