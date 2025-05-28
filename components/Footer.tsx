import { Button } from "@/components/ui/button"
import { Instagram, Twitter, Youtube, Music } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center space-x-8 mb-8">
          <a href="#" className="hover:text-gray-300">
            About
          </a>
          <a href="#" className="hover:text-gray-300">
            Shop
          </a>
          <a href="#" className="hover:text-gray-300">
            Contact
          </a>
        </div>

        <div className="flex justify-center space-x-6 mb-8 text-black">
          <Button variant="outline" size="icon" className="border-gray-600 cursor-pointer  rounded-full">
            <Instagram className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="border-gray-600 cursor-pointer rounded-full">
            <Music className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="border-gray-600 cursor-pointer rounded-full">
            <Twitter className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="border-gray-600 cursor-pointer rounded-full">
            <Youtube className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-center">
          <div className="text-6xl font-bold">BB</div>
        </div>
      </div>
    </footer>
  )
}
