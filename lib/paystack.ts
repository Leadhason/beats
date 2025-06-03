// Paystack configuration and utilities
export interface PaystackConfig {
  publicKey: string
  secretKey?: string // Only use on server-side
}

export interface PaystackPaymentData {
  email: string
  amount: number // Amount in kobo (multiply by 100)
  currency?: string
  reference?: string
  callback_url?: string
  metadata?: {
    custom_fields?: Array<{
      display_name: string
      variable_name: string
      value: string
    }>
    [key: string]: any
  }
}

export interface PaystackResponse {
  status: boolean
  message: string
  data: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

// Generate a unique reference for the transaction
export function generatePaystackReference(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  return `bb_${timestamp}_${random}`
}

// Convert amount to kobo (Paystack uses kobo, not cedis)
export function convertToKobo(amount: number): number {
  return Math.round(amount * 100)
}

// Format amount for display
export function formatAmount(amount: number): string {
  return `GHS ${amount.toFixed(2)}`
}
