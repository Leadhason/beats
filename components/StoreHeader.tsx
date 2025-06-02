"use client"

import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface StoreHeaderProps {
  onSearch: (query: string) => void
}

export function StoreHeader({ onSearch }: StoreHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Beat Store</h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
          Premium beats for your next hit. High-quality instrumentals ready for licensing.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row max-w-2xl mx-auto bg-white p-2 md:p-3 gap-2 md:gap-3 rounded-lg shadow-lg">
          <div className="relative flex-1">
            <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
            <Input
              placeholder="Search beats by style, genre, BPM, or mood..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 md:pl-12 h-10 bg-white text-black text-sm md:text-lg rounded-lg sm:rounded-l-lg sm:rounded-r-none border-0"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="h-10 px-6 md:px-8 bg-gray-300 text-black hover:bg-gray-200 rounded-lg sm:rounded-r-lg sm:rounded-l-none font-semibold text-sm md:text-base"
          >
            SEARCH
          </Button>
        </div>
      </div>
    </div>
  )
}
