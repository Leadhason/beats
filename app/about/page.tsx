import Link from "next/link"
import { ShoppingCart, Music, Users, Award, Headphones, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex h-16 w-full items-center justify-between px-6 border-b border-gray-800">
        <Link href="/" className="text-2xl font-bold text-white">
          BB
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/store" className="text-gray-300 hover:text-white transition-colors">
            Store
          </Link>
          <Link href="/about" className="text-white font-medium">
            About
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
            Contact
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-orange-500">BlingBeats</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Your premier destination for high-quality beats and instrumentals. We're passionate about providing
            producers, artists, and creators with the sounds they need to bring their vision to life.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Founded by a passionate music producer and beat maker, BlingBeats was born from the need for a platform
                that truly understands the creative process. As a solo producer, I know what it takes to create that
                perfect sound, and I'm here to provide you with the beats and tools to make it happen.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Every beat in my catalog is carefully crafted to meet the highest standards of quality. From trap and
                hip-hop to R&B and electronic, I cover all genres to fuel your creativity and bring your musical vision
                to life.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-8 text-center">
              <Music className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">10,000+</h3>
              <p className="text-gray-300">Premium Beats Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose BlingBeats?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Award className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-gray-300">Every beat is professionally mixed and mastered to industry standards</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Trusted by Artists</h3>
              <p className="text-gray-300">
                Thousands of artists worldwide trust my beats for their music production needs
              </p>
            </div>
            <div className="text-center">
              <Headphones className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Instant Access</h3>
              <p className="text-gray-300">
                Download your beats immediately after purchase with multiple format options
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 bg-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Meet the Producer</h2>
          <p className="text-gray-300 mb-12 leading-relaxed">
            Hi, I'm the creator behind BlingBeats. As a dedicated music producer with years of experience in the
            industry, I'm passionate about creating high-quality beats that inspire artists and help bring their
            creative visions to life.
          </p>
          <div className="bg-gray-700 rounded-lg p-8 max-w-md mx-auto">
            <Mic className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Solo Producer</h3>
            <p className="text-gray-300 leading-relaxed">
              Crafting premium beats with attention to detail, ensuring every track meets professional standards.
              Available for custom productions and collaborations.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create?</h2>
          <p className="text-gray-300 mb-8">
            Browse our extensive catalog of premium beats and find the perfect sound for your next project.
          </p>
          <Link href="/store">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg">Browse Beats</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 px-6 border-t border-gray-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold text-white">
                BB
              </Link>
            </div>
            <nav className="flex space-x-6">
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/store" className="text-gray-300 hover:text-white transition-colors">
                Store
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
