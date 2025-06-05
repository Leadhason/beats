import { type NextRequest, NextResponse } from "next/server"

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY

export async function POST(request: NextRequest) {
  try {
    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json({ error: "Paystack secret key not configured" }, { status: 500 })
    }

    const body = await request.json()
    const { email, amount, reference, metadata } = body

    // Validate required fields
    if (!email || !amount || !reference) {
      return NextResponse.json({ error: "Missing required fields: email, amount, reference" }, { status: 400 })
    }

    // Initialize payment with Paystack
    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100), // Convert to kobo
        reference,
        currency: "GHS",
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/payment/callback`,
        metadata: {
          ...(metadata || {}),
          track_id: metadata?.track_id || null,
          customer_email: email,
          custom_fields: [
            {
              display_name: "Order Type",
              variable_name: "order_type",
              value: "Beat Purchase",
            },
            {
              display_name: "Platform",
              variable_name: "platform",
              value: "BlingBeats",
            },
          ],
        },
      }),
    })

    const data = await paystackResponse.json()

    if (!data.status) {
      return NextResponse.json({ error: data.message || "Failed to initialize payment" }, { status: 400 })
    }

    return NextResponse.json({
      status: true,
      data: {
        authorization_url: data.data.authorization_url,
        access_code: data.data.access_code,
        reference: data.data.reference,
      },
    })
  } catch (error) {
    console.error("Paystack initialization error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
