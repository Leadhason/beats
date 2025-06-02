"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, useCallback, useState, type ReactNode } from "react"
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
  | { type: "ADD_TO_CART"; payload: { trackId: string; licenseType: string } }
  | { type: "REMOVE_FROM_CART"; payload: { trackId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { trackId: string; quantity: number } }
  | { type: "TOGGLE_CART" }
  | { type: "CLEAR_CART" }
  | { type: "SET_ITEMS"; payload: CartItem[] }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload }
    case "ADD_TO_CART": {
      const existingItem = state.items.find(
        (item) => item.track._id === action.payload.trackId && item.licenseType === action.payload.licenseType,
      )
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.track._id === action.payload.trackId && item.licenseType === action.payload.licenseType
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }
      // The actual track will be added asynchronously in CartProvider
      return state
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.track._id !== action.payload.trackId),
      }
    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.track._id !== action.payload.trackId),
        }
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.track._id === action.payload.trackId ? { ...item, quantity: action.payload.quantity } : item,
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
    const price = typeof item.track.price === "number" ? item.track.price : 0
    return total + price * item.quantity
  }, 0)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
    total: 0,
  })
  const [total, setTotal] = useState(0)

  // Handle async track fetching for ADD_TO_CART
  const enhancedDispatch = useCallback(async (action: CartAction) => {
    if (action.type === "ADD_TO_CART") {
      const track = await getTrackById(action.payload.trackId)
      if (!track) return
      const existingItem = state.items.find(
        (item) => item.track._id === action.payload.trackId && item.licenseType === action.payload.licenseType,
      )
      if (existingItem) {
        dispatch({
          type: "SET_ITEMS",
          payload: state.items.map((item) =>
            item.track._id === action.payload.trackId && item.licenseType === action.payload.licenseType
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })
      } else {
        dispatch({
          type: "SET_ITEMS",
          payload: [...state.items, { track, quantity: 1, licenseType: action.payload.licenseType }],
        })
      }
    } else {
      dispatch(action)
    }
  }, [state.items])

  useEffect(() => {
    setTotal(calculateTotal(state.items))
  }, [state.items])

  const stateWithTotal = {
    ...state,
    total,
  }

  return (
    <CartContext.Provider value={{ state: stateWithTotal, dispatch: enhancedDispatch as any }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
