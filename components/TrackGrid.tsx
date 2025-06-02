"use client"

import { TrackCard } from "./TrackCard"
import type { Track } from "@/lib/track-data"

interface TrackGridProps {
  tracks: Track[]
  onTrackPlay: (trackName: string) => void
}

export function TrackGrid({ tracks, onTrackPlay }: TrackGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tracks.map((track) => (
        <TrackCard key={track._id} track={track} onTrackPlay={onTrackPlay} />
      ))}
    </div>
  )
}
