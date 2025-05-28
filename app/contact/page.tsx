import Link from "next/link"
import { ShoppingCart, Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
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
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-white font-medium">
            Contact
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get In <span className="text-orange-500">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Have questions about our beats, licensing, or need custom production? We're here to help you create amazing
            music.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-300">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 mt-1"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-300">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 mt-1"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 mt-1"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-gray-300">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 mt-1"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-gray-300">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    rows={6}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 mt-1"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="text-gray-300 mb-8">
                  Reach out to us through any of the following channels. We typically respond within 24 hours during
                  business days.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-300">support@blingbeats.com</p>
                    <p className="text-gray-300">licensing@blingbeats.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-300">+1 (555) 123-BEAT</p>
                    <p className="text-gray-300">+1 (555) 123-2328</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-gray-300">123 Music Street</p>
                    <p className="text-gray-300">Studio City, CA 91604</p>
                    <p className="text-gray-300">United States</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                    <p className="text-gray-300">Saturday: 10:00 AM - 4:00 PM PST</p>
                    <p className="text-gray-300">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">How do I license a beat?</h3>
              <p className="text-gray-300">
                Simply browse our catalog, select the beat you want, choose your licensing option, and complete the
                purchase. You'll receive instant access to download your files.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">What formats do you provide?</h3>
              <p className="text-gray-300">
                We provide high-quality WAV files, MP3 files, and trackout stems depending on your licensing package.
                All files are professionally mixed and mastered.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Do you offer custom beats?</h3>
              <p className="text-gray-300">
                Yes! We offer custom beat production services. Contact us with your requirements and we'll create a
                unique beat tailored to your vision.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">What's your refund policy?</h3>
              <p className="text-gray-300">
                Due to the digital nature of our products, we don't offer refunds. However, if you experience technical
                issues with your download, we're here to help.
              </p>
            </div>
          </div>
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
