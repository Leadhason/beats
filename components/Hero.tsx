"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Play, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getFeaturedTrack, searchTracks, type Track } from "@/lib/track-data"
import { useCart } from "@/lib/cart-context"

interface HeroSectionProps {
  onTrackPlay: (trackName: string) => void
  onSearchResults: (results: Track[]) => void
}

export function HeroSection({ onTrackPlay, onSearchResults }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [featuredTrack, setFeaturedTrack] = useState<Track | null>(null)
  const [loading, setLoading] = useState(true)
  const { dispatch } = useCart()

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true)
      const track = await getFeaturedTrack()
      setFeaturedTrack(track || null)
      setLoading(false)
    }
    fetchFeatured()
  }, [])

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const results = await searchTracks(searchQuery)
      onSearchResults(results)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const addToCart = () => {
    if (featuredTrack) {
      dispatch({ type: "ADD_TO_CART", payload: { trackId: featuredTrack._id, licenseType: "Premium WAV License" } })
    }
  }

  if (loading || !featuredTrack) {
    return (
      <div className="relative min-h-[50vh] md:min-h-[60vh] flex flex-col items-center justify-center px-4 md:px-6">
        <div className="text-gray-400 text-lg md:text-xl">Loading featured track...</div>
      </div>
    )
  }

  return (
    <div className="relative min-h-[50vh] md:min-h-[60vh] flex flex-col items-center justify-center px-4 md:px-6">
      {/* Background with light streaks effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-50"></div>
      <div className="absolute inset-0">
        <img src="/Hero-2.jpeg" alt="Light streaks background" className="w-full h-full object-cover opacity-20" />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row mb-8 md:mb-16 bg-white gap-2 sm:gap-4 p-2 rounded-lg">
          <Input
            placeholder="Search by style, genre, bpm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 h-10 bg-white text-black text-sm md:text-lg px-4 md:px-6 rounded-lg sm:rounded-l-lg sm:rounded-r-none border-0"
          />
          <Button
            onClick={handleSearch}
            className="h-10 px-4 md:px-8 bg-gray-200 text-black hover:bg-gray-300 rounded-lg sm:rounded-r-lg sm:rounded-l-none text-sm md:text-base font-semibold"
          >
            SEARCH
          </Button>
        </div>

        {/* Featured Track */}
        <div className="flex items-center justify-center">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 bg-black/50 backdrop-blur-sm p-4 md:p-6 rounded-lg max-w-full">
            <div className="relative flex-shrink-0">
              <img
                src={featuredTrack.imageUrl || "/placeholder.svg"}
                alt={`${featuredTrack.title} track cover`}
                className="w-24 h-24 md:w-30 md:h-30 rounded-lg"
              />
              <Button
                size="icon"
                className="absolute inset-0 m-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black hover:bg-gray-200"
                onClick={() => onTrackPlay(featuredTrack.title)}
              >
                <Play className="w-5 h-5 md:w-6 md:h-6 ml-1" />
              </Button>
            </div>
            <div className="space-y-3 text-center md:text-left">
              <div className="text-xs md:text-sm text-gray-400">Featured Track • {featuredTrack.bpm} BPM</div>
              <h2 className="text-2xl md:text-4xl font-bold">{featuredTrack.title}</h2>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Button
                  onClick={addToCart}
                  className="bg-white cursor-pointer text-black hover:bg-gray-200 text-sm md:text-base"
                >
                  🛒 GHS {featuredTrack.price}
                </Button>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-600 cursor-pointer text-black w-8 h-8 md:w-10 md:h-10"
                  >
                    <Download className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-600 cursor-pointer text-black w-8 h-8 md:w-10 md:h-10"
                  >
                    <Share2 className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1 justify-center md:justify-start">
                  {(featuredTrack.tags || []).map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-gray-700 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
