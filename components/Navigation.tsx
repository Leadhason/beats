"use client"

import { useState } from "react"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navigation() {
  const { state, dispatch } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" })
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <nav className="flex items-center justify-between p-4 md:p-6 border-b border-gray-800">
        <div className="flex items-center space-x-4 md:space-x-10">
          <Link href="/" className="text-xl md:text-2xl font-bold">
            BB
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ml-4">
            <Link href="/store" className="hover:text-gray-300 transition-colors">
              Store
            </Link>
            <Link href="/about" className="hover:text-gray-300 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">
              Contact
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Cart Button */}
          <div className="relative">
            <button
              onClick={toggleCart}
              className="flex items-center rounded-lg p-2 border border-black space-x-1 md:space-x-2 bg-orange-500 hover:text-gray-300 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm">${state.total.toFixed(2)}</span>
            </button>
            {state.items.length > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                {state.items.length}
              </Badge>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="md:hidden text-white hover:bg-gray-800"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800">
          <div className="flex flex-col space-y-4 p-4">
            <Link
              href="/store"
              className="hover:text-gray-300 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Store
            </Link>
            <Link
              href="/about"
              className="hover:text-gray-300 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-gray-300 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
