import ThreeDots from "../ArtistButtons/ThreeDots"
import TitleMusicCard from "./TitleMusicCard"
import ViewMusicCard from "./ViewMusicCard"
import { Song } from "@/redux/features/playerSlice";
import { useAppDispatch } from "@/redux/hook"
import { openBottomSheet } from "@/redux/features/bottomSheet"
import { useRemoveTrackFromPlaylistMutation } from "@/redux/services/playlistApiSlice"

interface ItemProps {
  item: Song
  isPlaylistView?: boolean
  playlistId?: string
}

const OptionCardMusic = ({ item, isPlaylistView, playlistId }: ItemProps) => {
  const dispatch = useAppDispatch()
  const [removeTrackFromPlaylist, { isLoading: isRemoving }] =
    useRemoveTrackFromPlaylistMutation()

  const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (!playlistId) return
    try {
      await removeTrackFromPlaylist({ playlistId, song_uuid: item.unique_id }).unwrap()
    } catch (err) {
      console.error("Failed to remove track:", err)
    }
  }

  return (
    <div className="flex flex-1 h-9.75 justify-between">
      <div className="h-9.75 grid items-center justify-start text-left">
        <TitleMusicCard title={item.title} />
        <ViewMusicCard countview={item.play_count} />
      </div>

      <div className="flex items-center gap-2">
        {isPlaylistView ? (
          <button
          onClick={handleRemove}
          disabled={isRemoving}
          aria-label="Remove from playlist"
          title="Remove from playlist"
          className="
            flex items-center justify-center
            min-w-6 min-h-6
            w-6 h-6
            rounded-full
            border border-white/55
            text-white/80
            hover:text-white
            hover:border-white
            transition
            duration-150
            disabled:opacity-40
          "
        >
          <div className="w-2.5 h-[1.5px] bg-current rounded-full" />
        </button>
        ) : (
          <ThreeDots
          onClick={(e) => {
            e.stopPropagation()
            dispatch(openBottomSheet(item))
          }}
        />
        )}

       
      </div>
    </div>
  )
}

export default OptionCardMusic
