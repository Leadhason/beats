"use client"

import { Play, Download, Share2, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import type { Track } from "@/lib/track-data"

interface TrackCardProps {
  track: Track
  onTrackPlay: (trackName: string) => void
}

export function TrackCard({ track, onTrackPlay }: TrackCardProps) {
  const { dispatch } = useCart()

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: { trackId: track._id, licenseType: "Premium WAV License" } })
  }

  return (
    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 group">
      <CardContent className="">
        {/* Track Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <img
            src={track.imageUrl || "/placeholder.svg?height=300&width=300"}
            alt={track.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-transparent group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <Button
              size="icon"
              className="opacity-0 group-hover:opacity-100 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300 transform scale-75 group-hover:scale-100"
              onClick={() => onTrackPlay(track.title)}
            >
              <Play className="w-6 h-6 md:w-8 md:h-8 ml-1" />
            </Button>
          </div>

          {/* Track Info Overlay */}
          <div className="absolute top-2 md:top-3 left-2 md:left-3 right-2 md:right-3 flex justify-between items-start">
            <div className="flex flex-col space-y-1">
              <Badge variant="secondary" className="bg-black bg-opacity-70 text-white text-xs">
                <Zap className="w-3 h-3 mr-1" />
                {track.bpm} BPM
              </Badge>
              <Badge variant="secondary" className="bg-black bg-opacity-70 text-white text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {track.time}
              </Badge>
            </div>
            <Badge variant="secondary" className="bg-black bg-opacity-70 text-white font-bold text-xs md:text-sm">
              GHS {track.price}
            </Badge>
          </div>
        </div>

        {/* Track Details */}
        <div className="p-3 md:p-4">
          <div className="mb-3">
            <h3 className="font-bold text-base md:text-lg mb-1 truncate">{track.title}</h3>
            <p className="text-gray-400 text-sm">{track.artist || "Jay Cactus"}</p>
            {track.genre && <p className="text-gray-500 text-xs mt-1">{track.genre}</p>}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {(track.tags || []).slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-300">
                {tag}
              </Badge>
            ))}
            {track.tags && track.tags.length > 3 && (
              <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                +{track.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Button onClick={addToCart} className="flex-1 bg-white text-black hover:bg-gray-200 font-semibold text-sm">
              🛒 Add to Cart
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" className="border-gray-600 w-8 h-8 md:w-10 md:h-10">
                <Download className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-600 w-8 h-8 md:w-10 md:h-10">
                <Share2 className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
