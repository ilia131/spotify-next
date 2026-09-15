"use client"
import CardAlbum from "@/entities/albums/ui/CardAlbum";
import { Album } from "@/redux/services/artistApislice";
import { useGetAlbumsListQuery } from "@/redux/services/artistApislice";

const Albums = () => {
  const { data, isLoading, isError } = useGetAlbumsListQuery(0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading albums</div>;
  }

  return (
    <div className="w-full px-3.75 pt-22 flex flex-col gap-5 pb-40 justify-center">
      {data?.map((album: Album) => (
        <CardAlbum key={album.id} album={album}
        firstTrack={album.tracks?.[0]}

        />
      ))}
    </div>
  );
};


export default Albums;