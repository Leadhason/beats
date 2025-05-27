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
    <div className="bg-gradient-to-r from-gray-900 to-black py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Beat Store</h1>
        <p className="text-xl text-gray-300 mb-8">
          Premium beats for your next hit. High-quality instrumentals ready for licensing.
        </p>

        {/* Search Bar */}
        <div className="flex max-w-2xl mx-auto bg-white p-3 gap-3 rounded-lg shadow-lg">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search beats by style, genre, BPM, or mood..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-12 h-10 bg-white text-black text-lg rounded-l-lg border-0"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="h-10 px-8 bg-gray-300 text-black hover:bg-gray-200 rounded-r-lg rounded-l-none font-semibold"
          >
            SEARCH
          </Button>
        </div>
      </div>
    </div>
  )
}
