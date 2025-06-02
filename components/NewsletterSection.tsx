import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  return (
    <div className="px-4 md:px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">NEWSLETTER</h2>
        <p className="text-gray-400 mb-6 md:mb-8 text-sm md:text-base">
          Sign-up for the BlingBeats mailing list to be notified of new releases and updates.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-2xl mx-auto mb-12">
          <Input
            placeholder="Name"
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 h-10 md:h-12"
          />
          <Input
            placeholder="Email"
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 h-10 md:h-12"
          />
          <Button className="bg-gray-600 hover:bg-gray-700 whitespace-nowrap h-10 md:h-12 px-4 md:px-6">SIGN-UP</Button>
        </div>
      </div>
    </div>
  )
}
