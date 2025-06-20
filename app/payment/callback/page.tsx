"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PaymentCallback() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading")
  const [paymentData, setPaymentData] = useState<any>(null)

  useEffect(() => {
    const reference = searchParams.get("reference")

    if (!reference) {
      setStatus("failed")
      return
    }

    // Verify payment
    const verifyPayment = async () => {
      try {
        const response = await fetch(`/api/paystack/verify?reference=${reference}`)
        const data = await response.json()


        if (response.ok && data.status) {
          setStatus("success")
          setPaymentData(data.data)
          // Call checkout API to create order and send email
          await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              beatId: data.data.metadata?.items?.[0]?.track_id || data.data.metadata?.track_id,
              customerName: data.data.metadata?.customer_name,
              customerEmail: data.data.metadata?.customer_email,
              transactionId: data.data.reference,
              amount: data.data.amount,
              currency: "GHS",
              customerPhone: data.data.metadata?.customer_phone,
              items: data.data.metadata?.items || [],
            }),
          })
        } else {
          setStatus("failed")
        }
      } catch (error) {
        console.error("Payment verification error:", error)
        setStatus("failed")
      }
    }

    verifyPayment()
  }, [searchParams])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-orange-500" />
          <h1 className="text-2xl font-bold mb-2">Verifying Payment...</h1>
          <p className="text-gray-400">Please wait while we confirm your payment.</p>
        </div>
      </div>
    )
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4 text-green-500">Payment Successful!</h1>
          <p className="text-gray-300 mb-6">
            Thank you for your purchase! Your payment has been processed successfully.
          </p>

          {paymentData && (
            <div className="bg-gray-900 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold mb-2">Payment Details:</h3>
              <p className="text-sm text-gray-400">Reference: {paymentData.reference}</p>
              <p className="text-sm text-gray-400">Amount: GHS {paymentData.amount}</p>
              <p className="text-sm text-gray-400">Status: {paymentData.status}</p>
            </div>
          )}

          <div className="space-y-3">
            <p className="text-sm text-gray-400">Download links have been sent to your email address.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/store" className="flex-1">
                <Button variant="outline" className="w-full border-gray-600 cursor-pointer text-black">
                  Browse More Beats
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4 text-red-500">Payment Failed</h1>
        <p className="text-gray-300 mb-6">
          We couldn't process your payment. Please try again or contact support if the problem persists.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="flex-1">
            <Button className="w-full bg-orange-600 hover:bg-orange-700">Back to Home</Button>
          </Link>
          <Button variant="outline" className="flex-1 border-gray-600 text-black" onClick={() => router.back()}>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  )
}
