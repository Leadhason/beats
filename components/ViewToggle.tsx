"use client"

import { Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ViewToggleProps {
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center space-x-1 md:space-x-2 bg-gray-800 rounded-lg p-1">
      <Button
        variant={viewMode === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("grid")}
        className={`text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 ${
          viewMode === "grid"
            ? "bg-white text-black hover:bg-gray-200"
            : "text-gray-400 hover:text-white hover:bg-gray-700"
        }`}
      >
        <Grid3X3 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
        Grid
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("list")}
        className={`text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 ${
          viewMode === "list"
            ? "bg-white text-black hover:bg-gray-200"
            : "text-gray-400 hover:text-white hover:bg-gray-700"
        }`}
      >
        <List className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
        List
      </Button>
    </div>
  )
}
