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
    dispatch({ type: "ADD_TO_CART", payload: { trackId: track._id, licenseType: "Premium WAV License" } })
  }

  return (
    <>
      {/* Mobile Layout */}
      <div className="block md:hidden bg-gray-900/30 rounded-lg p-4 mb-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="relative flex-shrink-0">
            <img src={track.imageUrl || "/placeholder.svg"} alt={track.title} className="w-12 h-12 rounded" />
            <Button
              size="icon"
              className="absolute inset-0 m-auto w-6 h-6 rounded-full cursor-pointer bg-white text-black hover:bg-gray-200"
              onClick={() => onTrackPlay(track.title)}
            >
              <Play className="w-3 h-3 ml-0.5" />
            </Button>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{track.title}</div>
            <div className="text-sm text-gray-400">
              {track.time} • {track.bpm} BPM
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {(track.tags || []).slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-700 text-xs">
              {tag}
            </Badge>
          ))}
          {track.tags && track.tags.length > 3 && (
            <Badge variant="secondary" className="bg-gray-700 text-xs">
              +{track.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" className="border-gray-600 cursor-pointer text-black w-8 h-8">
              <Download className="w-3 h-3" />
            </Button>
            <Button variant="outline" size="icon" className="border-gray-600 cursor-pointer text-black w-8 h-8">
              <Share2 className="w-3 h-3" />
            </Button>
          </div>
          <Button
            onClick={addToCart}
            className="bg-white text-black hover:bg-gray-200 cursor-pointer text-sm px-3 py-1"
          >
            🛒 GHS {track.price}
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-12 gap-4 items-center py-4 px-4 hover:bg-gray-900/50 rounded-lg border-b border-gray-800">
        <div className="col-span-4 flex items-center space-x-4">
          <div className="relative">
            <img src={track.imageUrl || "/placeholder.svg"} alt={track.title} className="w-12 h-12 rounded" />
            <Button
              size="icon"
              className="absolute inset-0 m-auto w-6 h-6 rounded-full cursor-pointer bg-white text-black hover:bg-gray-200"
              onClick={() => onTrackPlay(track.title)}
            >
              <Play className="w-3 h-3 ml-0.5" />
            </Button>
          </div>
          <span className="font-medium truncate">{track.title}</span>
        </div>
        <div className="col-span-2 text-gray-400">{track.time}</div>
        <div className="col-span-2 text-gray-400">{track.bpm}</div>
        <div className="col-span-2 flex space-x-2">
          {(track.tags || []).slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-400 text-xs">
              {tag}
            </Badge>
          ))}
          {track.tags && track.tags.length > 2 && (
            <Badge variant="secondary" className="bg-gray-400 text-xs">
              +{track.tags.length - 2}
            </Badge>
          )}
        </div>
        <div className="col-span-2 flex items-center justify-end space-x-2">
          <Button variant="outline" size="icon" className="border-gray-600 cursor-pointer text-black w-8 h-8">
            <Download className="w-3 h-3" />
          </Button>
          <Button variant="outline" size="icon" className="border-gray-600 cursor-pointer text-black w-8 h-8">
            <Share2 className="w-3 h-3" />
          </Button>
          <Button
            onClick={addToCart}
            className="bg-white text-black hover:bg-gray-200 cursor-pointer text-sm px-3 py-1"
          >
            🛒 GHS {track.price}
          </Button>
        </div>
      </div>
    </>
  )
}
