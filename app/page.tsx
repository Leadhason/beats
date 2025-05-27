"use client"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/Hero"
import { TracksSection } from "@/components/TrackSection"
import { LicensingSection } from "@/components/LicenseSection"
import { NewsletterSection } from "@/components/NewsletterSection"
import { Footer } from "@/components/Footer"
import { AudioPlayer } from "@/components/AudioPlayer"
import { CartSidebar } from "@/components/CartSider"
import { tracks, getFeaturedTrack, type Track } from "@/lib/track-data"

export default function MusicProducerSite() {
  const featuredTrack = getFeaturedTrack()
  const [currentTrack, setCurrentTrack] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [searchResults, setSearchResults] = useState<Track[] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleTrackPlay = (trackName: string) => {
    setCurrentTrack(trackName)
    setIsPlaying(true)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    const currentTracks = searchResults || tracks
    const currentIndex = currentTracks.findIndex((track) => track.title === currentTrack)
    const nextIndex = (currentIndex + 1) % currentTracks.length
    const nextTrack = currentTracks[nextIndex]
    if (nextTrack) {
      setCurrentTrack(nextTrack.title)
      setIsPlaying(true)
    }
  }

  const handlePrevious = () => {
    const currentTracks = searchResults || tracks
    const currentIndex = currentTracks.findIndex((track) => track.title === currentTrack)
    const prevIndex = currentIndex <= 0 ? currentTracks.length - 1 : currentIndex - 1
    const prevTrack = currentTracks[prevIndex]
    if (prevTrack) {
      setCurrentTrack(prevTrack.title)
      setIsPlaying(true)
    }
  }

  const handleSearchResults = (results: Track[]) => {
    setSearchResults(results)
    setSearchQuery(results.length > 0 ? "search results" : "no results")
  }

  const displayTracks = searchResults || tracks

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection onTrackPlay={handleTrackPlay} onSearchResults={handleSearchResults} />
      <TracksSection
        tracks={displayTracks}
        onTrackPlay={handleTrackPlay}
        searchQuery={searchResults ? searchQuery : undefined}
      />
      <LicensingSection />
      <NewsletterSection />
      <Footer />
      {currentTrack && (
        <AudioPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
      <CartSidebar />
    </div>
  )
}
