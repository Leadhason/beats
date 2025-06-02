"use client"

import type React from "react"

import { Play, Pause, Share2, SkipBack, SkipForward, Shuffle, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { getTrackByTitle } from "@/lib/track-data"
import { useCart } from "@/lib/cart-context"
import { useState, useEffect, useRef } from "react"
import type { Track } from "@/lib/track-data"

interface AudioPlayerProps {
  currentTrack: string | null
  isPlaying: boolean
  onPlayPause: () => void
  onNext: () => void
  onPrevious: () => void
}

export function AudioPlayer({ currentTrack, isPlaying, onPlayPause, onNext, onPrevious }: AudioPlayerProps) {
  const { dispatch } = useCart()
  const [trackData, setTrackData] = useState<Track | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressBarRef = useRef<HTMLDivElement | null>(null)

  // Fetch track data by title when currentTrack changes
  useEffect(() => {
    let isMounted = true
    const fetchTrack = async () => {
      if (currentTrack) {
        setIsLoading(true)
        const track = await getTrackByTitle(currentTrack)
        if (isMounted) {
          setTrackData(track || null)
          setIsLoading(false)
        }
      } else {
        setTrackData(null)
      }
    }
    fetchTrack()
    return () => {
      isMounted = false
    }
  }, [currentTrack])

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        // Using the Promise returned by play() to handle any errors
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Playback started successfully
            })
            .catch((error) => {
              console.error("Playback failed:", error)
              // Revert UI state if playback fails
              onPlayPause()
            })
        }
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, onPlayPause])

  // Set up audio element and event listeners
  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setIsLoading(false)
    }

    const handleEnded = () => {
      onNext()
    }

    const handleError = (e: ErrorEvent) => {
      console.error("Audio error:", e)
      setIsLoading(false)
    }

    // Add event listeners
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError as EventListener)

    // Set initial volume
    audio.volume = volume

    // Clean up event listeners
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError as EventListener)
    }
  }, [onNext])

  // Update audio source when track changes
  useEffect(() => {
    if (audioRef.current && trackData?.audioUrl) {
      setIsLoading(true)
      audioRef.current.src = trackData.audioUrl
      audioRef.current.load()

      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Failed to play new track:", error)
        })
      }
    }
  }, [trackData, isPlaying])

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const addToCart = () => {
    if (trackData) {
      dispatch({ type: "ADD_TO_CART", payload: { trackId: trackData._id, licenseType: "Premium WAV License" } })
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressBarRef.current) return

    const progressBar = progressBarRef.current
    const rect = progressBar.getBoundingClientRect()
    const clickPosition = (e.clientX - rect.left) / rect.width

    // Set the current time based on click position
    const newTime = clickPosition * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0]
    setVolume(volumeValue)

    if (volumeValue > 0 && isMuted) {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  // Format time in MM:SS
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00"

    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  // Don't render if no track is selected or not loaded
  if (!currentTrack || !trackData) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-2 md:p-4 animate-in slide-in-from-bottom duration-300 z-30">
      {/* Hidden audio element */}
      <audio ref={audioRef} preload="auto">
        <source src={trackData.audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Mobile Layout */}
      <div className="block md:hidden">
        <div className="flex items-center justify-between mb-2">
          {/* Track Info */}
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <img src={trackData.imageUrl || "/placeholder.svg"} alt="Current track" className="w-10 h-10 rounded" />
            <div className="min-w-0 flex-1">
              <div className="font-medium truncate text-sm">{trackData.title}</div>
              <div className="text-xs text-gray-400 truncate">{trackData.artist || "Jay Cactus"}</div>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="border-gray-600 w-8 h-8" onClick={onPrevious}>
              <SkipBack className="w-3 h-3" />
            </Button>
            <Button
              size="icon"
              className="bg-white text-black hover:bg-gray-200 w-10 h-10 rounded-full"
              onClick={onPlayPause}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </Button>
            <Button variant="outline" size="icon" className="border-gray-600 w-8 h-8" onClick={onNext}>
              <SkipForward className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
          <span>{formatTime(currentTime)}</span>
          <div
            ref={progressBarRef}
            className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer overflow-hidden"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-white rounded-full transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Mobile Volume and Cart */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 w-1/2">
            <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-gray-800 w-8 h-8">
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-20"
            />
          </div>
          <Button
            onClick={addToCart}
            className="bg-white cursor-pointer text-black hover:bg-gray-200 text-xs px-3 py-1"
          >
            🛒 GHS {trackData.price}
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between max-w-6xl mx-auto">
        {/* Track Info */}
        <div className="flex items-center space-x-4 min-w-0 flex-1">
          <img src={trackData.imageUrl || "/placeholder.svg"} alt="Current track" className="w-12 h-12 rounded" />
          <div className="min-w-0">
            <div className="font-medium truncate">{trackData.title}</div>
            <div className="text-sm text-gray-400 truncate">{trackData.artist || "Jay Cactus"}</div>
          </div>
          <Button
            onClick={addToCart}
            className="bg-white cursor-pointer text-black hover:bg-gray-200 text-sm whitespace-nowrap"
          >
            🛒 GHS {trackData.price}
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          <div className="flex items-center space-x-4 text-black">
            <Button variant="outline" size="icon" className="border-gray-600 cursor-pointer">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="border-gray-600" onClick={onPrevious}>
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              className="bg-white text-black hover:bg-gray-200 w-12 h-12 rounded-full"
              onClick={onPlayPause}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
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
            <span>{formatTime(currentTime)}</span>
            <div
              ref={progressBarRef}
              className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer overflow-hidden"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-white rounded-full transition-all duration-100"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume and Additional Controls */}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <Button variant="outline" size="icon" className="border-gray-600" onClick={toggleMute}>
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
    </div>
  )
}
