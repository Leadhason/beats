import { LicenseCard } from "./LicenseCard"

const licenses = [
  {
    name: "Basic License",
    price: "$29.95",
    features: [
      "Used for Music Recording",
      "Distribute up to 2,000 copies",
      "500,000 Online Audio Streams",
      "1 Music Video",
      "For Profit Live Performances",
    ],
  },
  {
    name: "Premium WAV License",
    price: "$39.95",
    popular: true,
    features: [
      "High Quality WAV & MP3 Lease",
      "Free Professional Vocal Mix (3 Stems)",
      "500,000 Streams",
      "3000 Distribution Copies",
    ],
  },
  {
    name: "Unlimited License",
    price: "$99.99",
    features: [
      "Unlimited Usage - Beat can still be leased to other artists.",
      "High Quality WAV Stems",
      "Free Professional Vocal Mix (6 Stems)",
    ],
  },
  {
    name: "Exclusive License",
    price: "MAKE AN OFFER",
    features: [
      "Exclusively Own The Beat",
      "High Quality WAV Stems",
      "Unlimited Streams",
      "Unlimited Distribution Copies",
    ],
  },
]

export function LicensingSection() {
  return (
    <div className="px-6 py-12 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Licensing Info</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {licenses.map((license, index) => (
            <LicenseCard key={index} license={license} />
          ))}
        </div>
      </div>
    </div>
  )
}
