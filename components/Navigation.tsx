"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function Navigation() {
  const { state, dispatch } = useCart()

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" })
  }

  return (
    <nav className="flex items-center justify-between p-6 border-b border-gray-800">
      <Link href="/" className="text-2xl font-bold">BB</Link>
      <div className="hidden md:flex items-center space-x-8">
        <a href="/store" className="hover:text-gray-300">
          Store
        </a>
        <a href="#" className="hover:text-gray-300">
          About
        </a>
        <a href="#" className="hover:text-gray-300">
          Contact
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button onClick={toggleCart} className="flex items-center rounded-lg p-2 border border-black  space-x-2 bg-orange-500 hover:text-gray-300 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-sm">${state.total.toFixed(2)}</span>
          </button>
          {state.items.length > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
              {state.items.length}
            </Badge>
          )}
        </div>
      </div>
    </nav>
  )
}
