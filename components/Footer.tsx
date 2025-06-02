import { Button } from "@/components/ui/button"
import { Instagram, Twitter, Youtube, Music } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 px-4 md:px-6 py-6 md:py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6 md:mb-8">
          <a href="#" className="hover:text-gray-300 text-sm md:text-base">
            About
          </a>
          <a href="#" className="hover:text-gray-300 text-sm md:text-base">
            Shop
          </a>
          <a href="#" className="hover:text-gray-300 text-sm md:text-base">
            Contact
          </a>
        </div>

        <div className="flex justify-center space-x-4 md:space-x-6 mb-6 md:mb-8 text-black">
          <Button
            variant="outline"
            size="icon"
            className="border-gray-600 cursor-pointer rounded-full w-10 h-10 md:w-12 md:h-12"
          >
            <Instagram className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-gray-600 cursor-pointer rounded-full w-10 h-10 md:w-12 md:h-12"
          >
            <Music className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-gray-600 cursor-pointer rounded-full w-10 h-10 md:w-12 md:h-12"
          >
            <Twitter className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-gray-600 cursor-pointer rounded-full w-10 h-10 md:w-12 md:h-12"
          >
            <Youtube className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </div>

        <div className="text-center">
          <div className="text-4xl md:text-6xl font-bold">BB</div>
        </div>
      </div>
    </footer>
  )
}
