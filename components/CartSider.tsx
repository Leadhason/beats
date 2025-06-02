"use client"

import { X, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export function CartSidebar() {
  const { state, dispatch } = useCart()

  // trackId is now a string, not a number
  const updateQuantity = (trackId: string, newQuantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { trackId, quantity: newQuantity } })
  }

  const removeItem = (trackId: string) => {
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
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-gray-900 border-l border-gray-700 transform transition-transform duration-300 ease-in-out z-50 ${
          state.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-lg md:text-xl font-bold text-white">Shopping Cart</h2>
            <Button variant="ghost" size="icon" onClick={closeCart} className="text-white hover:bg-gray-800">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {state.items.length === 0 ? (
              <div className="text-center text-gray-400 mt-8">
                <p>Your cart is empty</p>
                <p className="text-sm mt-2">Add some beats to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={`${item.track._id}-${item.licenseType}`} className="bg-gray-800 rounded-lg p-3 md:p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={item.track.imageUrl || "/placeholder.svg"}
                        alt={item.track.title}
                        className="w-12 h-12 md:w-16 md:h-16 rounded object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate text-sm md:text-base">{item.track.title}</h3>
                        <p className="text-gray-400 text-xs md:text-sm">{item.licenseType}</p>
                        <p className="text-white font-bold text-sm md:text-base">GHS {item.track.price}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.track._id)}
                        className="text-gray-400 hover:text-red-400 hover:bg-gray-700 w-8 h-8 flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.track._id, item.quantity - 1)}
                          className="w-7 h-7 md:w-8 md:h-8 border-gray-600 text-black"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-white w-6 md:w-8 text-center text-sm md:text-base">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.track._id, item.quantity + 1)}
                          className="w-7 h-7 md:w-8 md:h-8 border-gray-600 text-black"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-white font-bold text-sm md:text-base">
                        GHS {(item.track.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-700 p-4 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-base md:text-lg font-bold text-white">Total:</span>
                <span className="text-lg md:text-xl font-bold text-white">GHS {state.total.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold py-3 mb-2">
                Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-600 text-black"
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
