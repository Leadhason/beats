import { type NextRequest, NextResponse } from "next/server"

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY

export async function GET(request: NextRequest) {
  try {
    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json({ error: "Paystack secret key not configured" }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const reference = searchParams.get("reference")

    if (!reference) {
      return NextResponse.json({ error: "Transaction reference is required" }, { status: 400 })
    }

    // Verify payment with Paystack
    const paystackResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    })

    const data = await paystackResponse.json()

    if (!data.status) {
      return NextResponse.json({ error: data.message || "Failed to verify payment" }, { status: 400 })
    }

    // Here you would typically:
    // 1. Update your database with the successful payment
    // 2. Send download links to the customer
    // 3. Update inventory if needed
    // 4. Send confirmation emails

    return NextResponse.json({
      status: true,
      data: {
        reference: data.data.reference,
        amount: data.data.amount / 100, // Convert back from kobo
        status: data.data.status,
        paid_at: data.data.paid_at,
        customer: data.data.customer,
        metadata: data.data.metadata,
      },
    })
  } catch (error) {
    console.error("Paystack verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
