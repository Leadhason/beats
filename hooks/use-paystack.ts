"use client"

import { useState } from "react"
import { generatePaystackReference } from "@/lib/paystack"

interface PaystackHookProps {
  onSuccess?: (reference: string) => void
  onError?: (error: string) => void
}

export function usePaystack({ onSuccess, onError }: PaystackHookProps = {}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initializePayment = async (paymentData: {
    email: string
    amount: number
    metadata?: any
  }) => {
    setIsLoading(true)
    setError(null)

    try {
      const reference = generatePaystackReference()

      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: paymentData.email,
          amount: paymentData.amount,
          reference,
          metadata: paymentData.metadata,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to initialize payment")
      }

      if (data.status && data.data.authorization_url) {
        // Redirect to Paystack payment page
        window.location.href = data.data.authorization_url
      } else {
        throw new Error("Invalid response from payment gateway")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Payment initialization failed"
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const verifyPayment = async (reference: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/paystack/verify?reference=${reference}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to verify payment")
      }

      if (data.status) {
        onSuccess?.(reference)
        return data.data
      } else {
        throw new Error("Payment verification failed")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Payment verification failed"
      setError(errorMessage)
      onError?.(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    initializePayment,
    verifyPayment,
    isLoading,
    error,
  }
}
