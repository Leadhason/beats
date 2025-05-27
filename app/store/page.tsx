"use client"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { AudioPlayer } from "@/components/AudioPlayer"
import { CartSidebar } from "@/components/CartSider"
import { StoreHeader } from "@/components/StoreHeader"
import { TrackGrid } from "@/components/TrackGrid"
import { TracksSection } from "@/components/TrackSection"
import { ViewToggle } from "@/components/ViewToggle"
import { StoreFilters } from "@/components/StoreFilters"
import { tracks, searchTracks, getAllTags, getAllGenres, type Track } from "@/lib/track-data"

export default function StorePage() {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filteredTracks, setFilteredTracks] = useState<Track[]>(tracks)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string>("")
  const [selectedTag, setSelectedTag] = useState<string>("")

  const handleTrackPlay = (trackName: string) => {
    setCurrentTrack(trackName)
    setIsPlaying(true)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    const currentIndex = filteredTracks.findIndex((track) => track.title === currentTrack)
    const nextIndex = (currentIndex + 1) % filteredTracks.length
    const nextTrack = filteredTracks[nextIndex]
    if (nextTrack) {
      setCurrentTrack(nextTrack.title)
      setIsPlaying(true)
    }
  }

  const handlePrevious = () => {
    const currentIndex = filteredTracks.findIndex((track) => track.title === currentTrack)
    const prevIndex = currentIndex <= 0 ? filteredTracks.length - 1 : currentIndex - 1
    const prevTrack = filteredTracks[prevIndex]
    if (prevTrack) {
      setCurrentTrack(prevTrack.title)
      setIsPlaying(true)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    applyFilters(query, selectedGenre, selectedTag)
  }

  const handleGenreFilter = (genre: string) => {
    setSelectedGenre(genre)
    applyFilters(searchQuery, genre, selectedTag)
  }

  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag)
    applyFilters(searchQuery, selectedGenre, tag)
  }

  const applyFilters = (query: string, genre: string, tag: string) => {
    let filtered = tracks

    if (query) {
      filtered = searchTracks(query)
    }

    if (genre) {
      filtered = filtered.filter((track) => track.genre?.toLowerCase() === genre.toLowerCase())
    }

    if (tag) {
      filtered = filtered.filter((track) => track.tags.some((trackTag) => trackTag.toLowerCase() === tag.toLowerCase()))
    }

    setFilteredTracks(filtered)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedGenre("")
    setSelectedTag("")
    setFilteredTracks(tracks)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <StoreHeader onSearch={handleSearch} />

      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Store Controls */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <div className="flex-1">
              <StoreFilters
                genres={getAllGenres()}
                tags={getAllTags()}
                selectedGenre={selectedGenre}
                selectedTag={selectedTag}
                onGenreChange={handleGenreFilter}
                onTagChange={handleTagFilter}
                onClearFilters={clearFilters}
              />
            </div>
            <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          </div>

          {/* Results Info */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {searchQuery || selectedGenre || selectedTag ? "Filtered Results" : "All Tracks"}
            </h2>
            <p className="text-gray-400">
              Showing {filteredTracks.length} of {tracks.length} tracks
              {searchQuery && ` for "${searchQuery}"`}
              {selectedGenre && ` in ${selectedGenre}`}
              {selectedTag && ` tagged with "${selectedTag}"`}
            </p>
          </div>

          {/* Track Display */}
          {viewMode === "grid" ? (
            <TrackGrid tracks={filteredTracks} onTrackPlay={handleTrackPlay} />
          ) : (
            <TracksSection tracks={filteredTracks} onTrackPlay={handleTrackPlay} showAll={true} />
          )}

          {filteredTracks.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold mb-2">No tracks found</h3>
              <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
              <button
                onClick={clearFilters}
                className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

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
