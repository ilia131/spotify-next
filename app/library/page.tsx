"use client"
import { useMemo, useState } from "react";
import { FilterItem } from "@/components/FilterSlider/types";
import ArtistLibrary from "@/components/Library/ArtistLibrary";
import HeaderSection from "@/components/Library/HeaderSection";
import ModalPlayList from "@/components/Library/ModalPlayList";
import { useCreatePlaylistMutation, useGetUserPlaylistsQuery } from "@/redux/services/playlistApiSlice";
import { useGetFavArtistsQuery } from "@/redux/services/artistApislice";
import type { Artist } from "@/redux/services/artistApislice";
import type { Playlist } from "@/redux/services/playlistApiSlice";
import { toast } from "react-toastify";

const filters = [
  {
    name: "Playlists",
    href: "/browse",
    height: "h-[35px]",
    padding: "px-4",
    width: "w-[85px]",
  },
  {
    name: "Artist",
    href: "/browse/music",
    height: "h-[34px]",
    padding: "px-4",
    width: "w-[73px]",
  },
];

const Library = () => {
  const { data: artists } = useGetFavArtistsQuery(0);
  const { data: playList } = useGetUserPlaylistsQuery(0);

  const [activeFilter, setActiveFilter] = useState<FilterItem | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [createPlaylist] = useCreatePlaylistMutation();

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const showArtists = !activeFilter || activeFilter.name === "Artist";
  const showPlaylists = !activeFilter || activeFilter.name === "Playlists";

  const filteredArtists = useMemo(() => {
    if (!showArtists) return [];

    const artistList = (artists ?? []) as Artist[];

    if (!normalizedSearch) return artistList;

    return artistList.filter((artist) =>
      artist.artistname?.toLowerCase().includes(normalizedSearch)
    );
  }, [artists, normalizedSearch, showArtists]);

  const filteredPlaylists = useMemo(() => {
    if (!showPlaylists) return [];

    const playlistList = (playList ?? []) as Playlist[];

    if (!normalizedSearch) return playlistList;

    return playlistList.filter((playlist) =>
      playlist.name?.toLowerCase().includes(normalizedSearch)
    );
  }, [playList, normalizedSearch, showPlaylists]);

  const handleClick = (item: FilterItem) => {
    setActiveFilter(item);
  };

  const handleClose = () => {
    setActiveFilter(null);
  };

  const handleCreatePlaylist = async (name: string) => {
    try {
      await createPlaylist({ name }).unwrap();
      setIsOpen(false);
    } catch (error) {
      toast.error(`Playlist creation failed : ${error}`);
    }
  };

  return (
    <section>
      <HeaderSection
        filters={filters}
        activeFilter={activeFilter}
        handleClick={handleClick}
        handleClose={handleClose}
        handleOpen={setIsOpen}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <ArtistLibrary
        artist={filteredArtists}
        playlist={filteredPlaylists}
      />

      {isOpen && (
        <ModalPlayList
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onCreate={handleCreatePlaylist}
        />
      )}
    </section>
  );
};

export default Library;
