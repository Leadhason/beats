"use client"

import { Play, Pause, Share2, SkipBack, SkipForward, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTrackByTitle } from "@/lib/track-data"
import { useCart } from "@/lib/cart-context"
import { useState, useEffect } from "react"

interface AudioPlayerProps {
  currentTrack: string | null
  isPlaying: boolean
  onPlayPause: () => void
  onNext: () => void
  onPrevious: () => void
}

export function AudioPlayer({ currentTrack, isPlaying, onPlayPause, onNext, onPrevious }: AudioPlayerProps) {
  const { dispatch } = useCart()
  const [progress, setProgress] = useState(0)

  const trackData = currentTrack ? getTrackByTitle(currentTrack) : null

  const addToCart = () => {
    if (trackData) {
      dispatch({ type: "ADD_TO_CART", payload: { trackId: trackData.id, licenseType: "Premium WAV License" } })
    }
  }

  // Simulate progress for demo purposes
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5))
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  // Don't render if no track is selected
  if (!currentTrack || !trackData) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-4 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Track Info */}
        <div className="flex items-center space-x-4 min-w-0 flex-1">
          <img src={trackData.image || "/placeholder.svg"} alt="Current track" className="w-12 h-12 rounded" />
          <div className="min-w-0">
            <div className="font-medium truncate">{trackData.title}</div>
            <div className="text-sm text-gray-400 truncate">{trackData.artist || "Jay Cactus"}</div>
          </div>
          <Button onClick={addToCart} className="bg-white text-black hover:bg-gray-200 text-sm whitespace-nowrap">
            🛒 {trackData.price}
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          <div className="flex items-center space-x-4 text-black">
            <Button variant="outline" size="icon" className="border-gray-600">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="border-gray-600" onClick={onPrevious}>
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              className="bg-white text-black hover:bg-gray-200 w-12 h-12 rounded-full"
              onClick={onPlayPause}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </Button>
            <Button variant="outline" size="icon" className="border-gray-600" onClick={onNext}>
              <SkipForward className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="border-gray-600">
              <Shuffle className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="w-full flex items-center space-x-2 text-xs text-gray-400">
            <span>0:00</span>
            <div className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span>{trackData.time}</span>
          </div>
        </div>

        {/* Volume and Additional Controls */}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <Button variant="outline" size="icon" className="border-gray-600">
            🔊
          </Button>
          <div className="w-24 h-1 bg-gray-600 rounded">
            <div className="w-16 h-1 bg-white rounded"></div>
          </div>
          <Button variant="outline" size="icon" className="border-gray-600">
            📝
          </Button>
          <Button variant="outline" size="icon" className="border-gray-600">
            📋
          </Button>
        </div>
      </div>
    </div>
  )
}
