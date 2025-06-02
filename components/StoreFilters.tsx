"use client"

import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StoreFiltersProps {
  genres: string[]
  tags: string[]
  selectedGenre: string
  selectedTag: string
  onGenreChange: (genre: string) => void
  onTagChange: (tag: string) => void
  onClearFilters: () => void
}

export function StoreFilters({
  genres,
  tags,
  selectedGenre,
  selectedTag,
  onGenreChange,
  onTagChange,
  onClearFilters,
}: StoreFiltersProps) {
  const hasActiveFilters = selectedGenre || selectedTag

  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 md:gap-4">
      <div className="flex items-center space-x-2">
        <Filter className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-400">Filter by:</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
        <Select value={selectedGenre} onValueChange={onGenreChange}>
          <SelectTrigger className="w-full sm:w-40 bg-gray-800 border-gray-600">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="allGenres">All Genres</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedTag} onValueChange={onTagChange}>
          <SelectTrigger className="w-full sm:w-40 bg-gray-800 border-gray-600">
            <SelectValue placeholder="Style" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="allStyles">All Styles</SelectItem>
            {tags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="border-gray-600 text-gray-400 hover:text-white w-full sm:w-auto"
        >
          <X className="w-4 h-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  )
}
