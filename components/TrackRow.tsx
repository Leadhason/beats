"use client"

import { Play, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import type { Track } from "@/lib/track-data"

interface TrackRowProps {
  track: Track
  onTrackPlay: (trackName: string) => void
}

export function TrackRow({ track, onTrackPlay }: TrackRowProps) {
  const { dispatch } = useCart()

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: { trackId: track.id, licenseType: "Premium WAV License" } })
  }

  return (
    <div className="grid grid-cols-12 gap-4 items-center py-4 px-4 hover:bg-gray-900/50 rounded-lg border-b border-gray-800">
      <div className="col-span-4 flex items-center space-x-4">
        <div className="relative">
          <img src={track.image || "/placeholder.svg"} alt={track.title} className="w-12 h-12 rounded" />
          <Button
            size="icon"
            className="absolute inset-0 m-auto w-6 h-6 rounded-full cursor-pointer bg-white text-black hover:bg-gray-200"
            onClick={() => onTrackPlay(track.title)}
          >
            <Play className="w-3 h-3 ml-0.5" />
          </Button>
        </div>
        <span className="font-medium">{track.title}</span>
      </div>
      <div className="col-span-2 text-gray-400">{track.time}</div>
      <div className="col-span-2 text-gray-400">{track.bpm}</div>
      <div className="col-span-2 flex space-x-2">
        {track.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="bg-gray-400 text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="col-span-2 flex items-center justify-end space-x-2">
        <Button variant="outline" size="icon" className="border-gray-600 cursor-pointer text-black w-8 h-8">
          <Download className="w-3 h-3" />
        </Button>
        <Button variant="outline" size="icon" className="border-gray-600 cursor-pointer text-black w-8 h-8">
          <Share2 className="w-3 h-3" />
        </Button>
        <Button onClick={addToCart} className="bg-white text-black hover:bg-gray-200 cursor-pointer text-sm px-3 py-1">
          🛒 {track.price}
        </Button>
      </div>
    </div>
  )
}
