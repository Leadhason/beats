"use client"

import { Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ViewToggleProps {
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1">
      <Button
        variant={viewMode === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("grid")}
        className={`${
          viewMode === "grid"
            ? "bg-white text-black hover:bg-gray-200"
            : "text-gray-400 hover:text-white hover:bg-gray-700"
        }`}
      >
        <Grid3X3 className="w-4 h-4 mr-2" />
        Grid
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("list")}
        className={`${
          viewMode === "list"
            ? "bg-white text-black hover:bg-gray-200"
            : "text-gray-400 hover:text-white hover:bg-gray-700"
        }`}
      >
        <List className="w-4 h-4 mr-2" />
        List
      </Button>
    </div>
  )
}
