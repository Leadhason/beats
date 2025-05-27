"use client"

import { X, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export function CartSidebar() {
  const { state, dispatch } = useCart()

  const updateQuantity = (trackId: number, newQuantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { trackId, quantity: newQuantity } })
  }

  const removeItem = (trackId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { trackId } })
  }

  const closeCart = () => {
    dispatch({ type: "TOGGLE_CART" })
  }

  return (
    <>
      {/* Backdrop */}
      {state.isOpen && <div className="fixed inset-0 bg-black bg-black/80 z-40" onClick={closeCart} />}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-gray-900 border-l border-gray-700 transform transition-transform duration-300 ease-in-out z-50 ${
          state.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
            <Button variant="ghost" size="icon" onClick={closeCart} className="text-white hover:bg-gray-800">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="text-center text-gray-400 mt-8">
                <p>Your cart is empty</p>
                <p className="text-sm mt-2">Add some beats to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={`${item.track.id}-${item.licenseType}`} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={item.track.image || "/placeholder.svg"}
                        alt={item.track.title}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">{item.track.title}</h3>
                        <p className="text-gray-400 text-sm">{item.licenseType}</p>
                        <p className="text-white font-bold">{item.track.price}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.track.id)}
                        className="text-gray-400 hover:text-red-400 hover:bg-gray-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.track.id, item.quantity - 1)}
                          className="w-8 h-8 border-gray-600 text-black"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-white w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.track.id, item.quantity + 1)}
                          className="w-8 h-8 border-gray-600 text-black"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-white font-bold">
                        ${(Number.parseFloat(item.track.price.replace("$", "")) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-700 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-white">Total:</span>
                <span className="text-xl font-bold text-white">${state.total.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold py-3">
                Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full mt-2 border-gray-600 text-black"
                onClick={() => dispatch({ type: "CLEAR_CART" })}
              >
                Clear Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
