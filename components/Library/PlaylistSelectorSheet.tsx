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
  const isOpen = useAppSelector((state) => state.playlistModal.isOpen);

  const { song : songToAdd } = useAppSelector((state) => state.bottomSheet)
  const { data: playlists = [] } = useGetUserPlaylistsQuery(1); 
  const [addTrack, { isLoading }] = useAddTrackToPlaylistMutation();

  const [search, setSearch] = useState("");

  const filtered = playlists.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleSelectPlaylist = async (playlist:Playlist) => {
    if (!songToAdd) return;

    try {
      await addTrack({
        playlistId: playlist.unique_id,
        song_uuid: songToAdd.unique_id,
      }).unwrap();

      toast.success(`Song added to playlist: ${playlist.name}`);
      dispatch(closePlaylistModal());
    } catch (err) {
      toast.error(`Failed to add track: ${String(err)}`);
    }
  };

  return (
    <>
      {/* تاریک‌کننده پس‌زمینه */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => dispatch(closePlaylistModal())}
        />
      )}

      {/* مدال اسلایدی */}
      <div
        className={`fixed left-0 right-0 bottom-0 z-50 bg-[#121212] 
          rounded-t-2xl shadow-xl transition-transform duration-300
          ${isOpen ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-xl font-semibold">
              Add to Playlist
            </h2>
            <button
              className="text-white/60"
              onClick={() => dispatch(closePlaylistModal())}
            >
              Close
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search playlists"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 rounded bg-[#1e1e1e] text-white outline-none"
          />

          {/* Playlist List */}
          <div className="mt-4 flex flex-col gap-3 max-h-80 overflow-y-auto">
            {filtered.map((playlist) => (
              <div
                key={playlist.unique_id}
                className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-[#1e1e1e]"
                onClick={() => handleSelectPlaylist(playlist)}
              >
                <div className="w-12 h-12 rounded bg-zinc-800"></div>

                <div>
                  <p className="text-white font-medium">{playlist.name}</p>
                  <p className="text-white/50 text-sm">
                    {playlist.tracks_count} songs
                  </p>
                </div>

                {isLoading && (
                  <span className="text-green-400 text-sm ml-auto">
                    Adding...
                  </span>
                )}
              </div>
            ))}

            {filtered.length === 0 && (
              <p className="text-white/50 text-center py-5">No playlists found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
