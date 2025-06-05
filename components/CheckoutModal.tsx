"use client"

import type React from "react"

import { useState } from "react"
import { X, CreditCard, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/lib/cart-context"
import { usePaystack } from "@/hooks/use-paystack"
import { formatAmount } from "@/lib/paystack"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { state, dispatch } = useCart()
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const { initializePayment, isLoading, error } = usePaystack({
    onSuccess: (reference) => {
      console.log("Payment successful:", reference)
      // Clear cart after successful payment
      dispatch({ type: "CLEAR_CART" })
      onClose()
    },
    onError: (error) => {
      console.error("Payment error:", error)
    },
  })

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!customerInfo.email || !customerInfo.firstName || !customerInfo.lastName) {
      alert("Please fill in all required fields")
      return
    }

    if (state.items.length === 0) {
      alert("Your cart is empty")
      return
    }

    setIsProcessing(true)

    try {
      await initializePayment({
        email: customerInfo.email,
        amount: state.total,
        metadata: {
          customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          customer_phone: customerInfo.phone,
          items: state.items.map((item) => ({
            track_id: item.track._id,
            track_title: item.track.title,
            license_type: item.licenseType,
            quantity: item.quantity,
            price: item.track.price,
          })),
          total_items: state.items.length,
        },
      })
    } catch (err) {
      console.error("Checkout error:", err)
    } finally {
      setIsProcessing(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg max-w-md w-full max-h-[90vh] overflow-auto no-scrollbar shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Checkout</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-gray-800">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Order Summary */}
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
          <div className="space-y-3">
            {state.items.map((item) => (
              <div key={`${item.track._id}-${item.licenseType}`} className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{item.track.title}</p>
                  <p className="text-gray-400 text-xs">
                    {item.licenseType} × {item.quantity}
                  </p>
                </div>
                <p className="text-white font-semibold">{formatAmount(item.track.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
            <span className="text-lg font-bold text-white">Total:</span>
            <span className="text-xl font-bold text-white">{formatAmount(state.total)}</span>
          </div>
        </div>

        {/* Customer Information Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Customer Information</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-white mb-2">
                  First Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="firstName"
                    type="text"
                    value={customerInfo.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-600 text-white"
                    placeholder="John"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="lastName" className="text-white mb-2">
                  Last Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="lastName"
                    type="text"
                    value={customerInfo.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-600 text-white"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-white mb-2">
                Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600 text-white"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-white mb-2">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="+233 XX XXX XXXX"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <div className="mt-6 space-y-3">
            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3"
              disabled={isLoading || isProcessing}
            >
              {isLoading || isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay {formatAmount(state.total)} with Paystack
                </div>
              )}
            </Button>

            <p className="text-xs text-gray-400 text-center">
              Secure payment powered by Paystack. Your payment information is encrypted and secure.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
