"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { TrackRow } from "./TrackRow"
import { fetchTracks, type Track } from "@/lib/track-data"
import Link from "next/link"

interface TracksSectionProps {
  tracks?: Track[]
  onTrackPlay: (trackName: string) => void
  showAll?: boolean
  limit?: number
  searchQuery?: string
}

export function TracksSection({ tracks, onTrackPlay, showAll = false, limit = 4, searchQuery }: TracksSectionProps) {
  const [loadedTracks, setLoadedTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Only fetch if tracks prop is not provided
    if (!tracks) {
      setLoading(true)
      fetchTracks().then((data) => {
        setLoadedTracks(data)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [tracks])

  const displayTracks = tracks || loadedTracks
  const tracksToShow = showAll ? displayTracks : displayTracks.slice(0, limit)

  if (loading) {
    return (
      <div className="px-4 md:px-6 py-12">
        <div className="max-w-6xl mx-auto text-center text-gray-400">Loading tracks...</div>
      </div>
    )
  }

  return (
    <div className="px-4 md:px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Search Results for "{searchQuery}"</h2>
            <p className="text-gray-400">{displayTracks.length} tracks found</p>
          </div>
        )}

        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 text-sm text-gray-400 uppercase tracking-wider mb-6 px-4">
          <div className="col-span-4">Title</div>
          <div className="col-span-2">Time</div>
          <div className="col-span-2">BPM</div>
          <div className="col-span-4">Tags</div>
        </div>

        {tracksToShow.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No tracks found matching your search.</p>
            <p className="text-gray-500 text-sm mt-2">Try different keywords or browse all tracks.</p>
          </div>
        ) : (
          tracksToShow.map((track) => <TrackRow key={track._id} track={track} onTrackPlay={onTrackPlay} />)
        )}

        {!showAll && !searchQuery && displayTracks.length > limit && (
          <div className="text-center mt-8">
            <Link href="/store" className="inline-block">
              <Button
                variant="outline"
                className="border-white cursor-pointer hover:border-black border hover:text-black hover:bg-white bg-transparent text-white"
              >
                BROWSE ALL TRACKS
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
