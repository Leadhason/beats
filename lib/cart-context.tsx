"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import { getTrackById, type Track } from "./track-data"

interface CartItem {
  track: Track
  quantity: number
  licenseType: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  total: number
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: { trackId: number; licenseType: string } }
  | { type: "REMOVE_FROM_CART"; payload: { trackId: number } }
  | { type: "UPDATE_QUANTITY"; payload: { trackId: number; quantity: number } }
  | { type: "TOGGLE_CART" }
  | { type: "CLEAR_CART" }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const track = getTrackById(action.payload.trackId)
      if (!track) return state

      const existingItem = state.items.find(
        (item) => item.track.id === action.payload.trackId && item.licenseType === action.payload.licenseType,
      )

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.track.id === action.payload.trackId && item.licenseType === action.payload.licenseType
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }

      const newItem: CartItem = {
        track,
        quantity: 1,
        licenseType: action.payload.licenseType,
      }

      return {
        ...state,
        items: [...state.items, newItem],
      }
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.track.id !== action.payload.trackId),
      }

    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.track.id !== action.payload.trackId),
        }
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.track.id === action.payload.trackId ? { ...item, quantity: action.payload.quantity } : item,
        ),
      }

    case "TOGGLE_CART":
      return {
        ...state,
        isOpen: !state.isOpen,
      }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      }

    default:
      return state
  }
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const price = Number.parseFloat(item.track.price.replace("$", ""))
    return total + price * item.quantity
  }, 0)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
    total: 0,
  })

  const stateWithTotal = {
    ...state,
    total: calculateTotal(state.items),
  }

  return <CartContext.Provider value={{ state: stateWithTotal, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
