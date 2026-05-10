"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import {
  Artist,
  useGetArtistsListQuery,
  useGetFavArtistsQuery,
  useAddFavArtistMutation,
  useRemoveFavArtistMutation,
} from "@/redux/services/artistApislice"

interface Props {
  onClose: () => void
}

export default function AddArtistModal({ onClose }: Props) {
  const [query, setQuery] = useState<string>("")

  const { data: allArtists = [], isLoading } = useGetArtistsListQuery(0)
  const { data: favArtists = [] } = useGetFavArtistsQuery(0)

  const [addFavArtist, { isLoading: adding }] = useAddFavArtistMutation()
  const [removeFavArtist, { isLoading: removing }] = useRemoveFavArtistMutation()

  // فقط تغییرات کاربر
  const [overrides, setOverrides] = useState<Map<string, boolean>>(
    new Map<string, boolean>()
  )

  // انتخاب اولیه از سرور
  const baseSelected = useMemo<Set<string>>(() => {
    return new Set<string>(favArtists.map((a: Artist) => a.artistname))
  }, [favArtists])

  const filteredArtists = useMemo<Artist[]>(() => {
    if (!query.trim()) return allArtists
    return allArtists.filter((a: Artist) =>
      a.artistname.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, allArtists])

  const isSelected = (artistname: string): boolean => {
    if (overrides.has(artistname)) {
      return overrides.get(artistname) === true
    }
    return baseSelected.has(artistname)
  }

  const toggleLocal = (artistname: string) => {
    setOverrides((prev) => {
      const next = new Map<string, boolean>(prev)
      const current = isSelected(artistname)
      next.set(artistname, !current)
      return next
    })
  }

  const handleSave = async () => {
    try {
      const finalSelected = new Set<string>(baseSelected)

      for (const [name, val] of overrides as Map<string, boolean>) {
        if (val) {
          finalSelected.add(name)
        } else {
          finalSelected.delete(name)
        }
      }

      const toAdd: string[] = [...finalSelected].filter(
        (name: string) => !baseSelected.has(name)
      )

      const toRemove: string[] = [...baseSelected].filter(
        (name: string) => !finalSelected.has(name)
      )

      for (const name of toAdd) {
        await addFavArtist(name).unwrap()
      }

      for (const name of toRemove) {
        await removeFavArtist(name).unwrap()
      }

      setOverrides(new Map<string, boolean>())
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  const saving = adding || removing

  return (
    <div className="fixed inset-0 bg-[#000000e9] z-50 flex flex-col p-6 overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for an artist..."
          className="flex-1 px-4 py-2 rounded-full bg-[#1e1e1e] text-white placeholder-gray-400 outline-none border border-[#333] focus:border-green-500"
        />
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-2xl font-bold"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full pb-24">
        {isLoading ? (
          <p className="text-gray-400">Loading artists...</p>
        ) : (
          filteredArtists.map((artist: Artist) => {
            const selected = isSelected(artist.artistname)

            return (
              <div
                key={artist.id}
                onClick={() => toggleLocal(artist.artistname)}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="relative">
                  <Image
                    src={artist.profile_pic || "/artist-placeholder.jpg"}
                    alt={artist.artistname}
                    width={112}
                    height={112}
                    className={`rounded-full w-28 h-28 object-cover transition ${
                      selected ? "ring-4 ring-green-500" : "opacity-90"
                    }`}
                  />
                  {selected && (
                    <div className="absolute inset-0 bg-green-500/35 rounded-full flex justify-center items-center">
                      <span className="text-black font-bold bg-green-500 rounded-full w-8 h-8 flex items-center justify-center">
                        ✓
                      </span>
                    </div>
                  )}
                </div>

                <p
                  className={`text-sm mt-2 text-center ${
                    selected ? "text-green-400" : "text-white"
                  }`}
                >
                  {artist.artistname}
                </p>
              </div>
            )
          })
        )}
      </div>

      <div className="fixed left-0 right-0 bottom-0 p-4 bg-linear-to-t from-black to-transparent">
        <div className="max-w-4xl mx-auto flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-zinc-700 text-white hover:border-zinc-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded-full bg-green-500 text-black font-semibold disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  )
}
