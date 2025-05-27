import { Card, CardContent } from "@/components/ui/card"

interface License {
  name: string
  price: string
  popular?: boolean
  features: string[]
}

interface LicenseCardProps {
  license: License
}

export function LicenseCard({ license }: LicenseCardProps) {
  return (
    <Card className={`bg-gray-800 border-gray-700 ${license.popular ? "ring-2 ring-white" : ""}`}>
      <CardContent className="p-6 text-center">
        {license.popular && (
          <div className="bg-gray-200 text-black text-sm font-bold py-1 px-3 rounded mb-4 inline-block">⭐ POPULAR</div>
        )}
        <h3 className="font-bold mb-2">{license.name}</h3>
        <div className="text-3xl font-bold mb-4">{license.price}</div>
        <ul className="text-sm space-y-2 text-left">
          {license.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start">
              <span className="text-green-400 mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
