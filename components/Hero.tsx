"use client"

import type React from "react"

import { useState } from "react"
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
  const { dispatch } = useCart()
  const featuredTrack = getFeaturedTrack()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = searchTracks(searchQuery)
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
      dispatch({ type: "ADD_TO_CART", payload: { trackId: featuredTrack.id, licenseType: "Premium WAV License" } })
    }
  }

  if (!featuredTrack) {
    return null
  }

  return (
    <div className="relative min-h-[60vh] flex flex-col items-center justify-center px-6">
      {/* Background with light streaks effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-50"></div>
      <div
        className="absolute inset-0">
            <img 
            src ="/Hero-2.jpeg"
            alt="Light streaks background"
            className="w-full h-full object-cover opacity-20"
            />
        </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Search Bar */}
        <div className="flex mb-16 bg-white gap-4 p-2">
          <Input
            placeholder="Search by style, genre, bpm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 h-10 bg-white text-black text-lg px-6 rounded-l-lg border-0"
          />
          <Button
            onClick={handleSearch}
            className="h-10 px-8 bg-gray-200 text-black hover:bg-gray-300 rounded-r-lg rounded-l-none"
          >
            SEARCH
          </Button>
        </div>

        {/* Featured Track */}
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-6 bg-black/50 backdrop-blur-sm p-6 rounded-lg">
            <div className="relative">
              <img
                src={featuredTrack.image || "/placeholder.svg"}
                alt={`${featuredTrack.title} track cover`}
                className="w-30 h-30 rounded-lg"
              />
              <Button
                size="icon"
                className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white text-black hover:bg-gray-200"
                onClick={() => onTrackPlay(featuredTrack.title)}
              >
                <Play className="w-6 h-6 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              <div className="text-sm text-gray-400">Featured Track • {featuredTrack.bpm}BPM</div>
              <h2 className="text-4xl font-bold">{featuredTrack.title}</h2>
              <div className="flex items-center space-x-4">
                <Button onClick={addToCart} className="bg-white text-black hover:bg-gray-200">
                  🛒 {featuredTrack.price}
                </Button>
                <Button variant="outline" size="icon" className="border-gray-600 text-black">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="border-gray-600 text-black">
                  <Share2 className="w-4 h-4" />
                </Button>
                {featuredTrack.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-gray-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
