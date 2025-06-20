import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@sanity/client"
import { Resend } from "resend"
import imageUrlBuilder from "@sanity/image-url"

// Initialize Sanity client
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // Use false for write operations
  apiVersion: "2024-01-01",
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN!, // Write-enabled token
})

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY!)

// Image URL builder for Sanity images
const builder = imageUrlBuilder(sanityClient)

// Types
interface Beat {
  _id: string
  title: string
  artist?: string
  price: number
  coverImage?: {
    asset: {
      _ref: string
      url?: string
    }
  }
  audioFile?: {
    asset: {
      _ref: string
      url?: string
    }
  }
}

interface PaymentData {
  beatId: string
  customerName: string
  customerEmail: string
  transactionId: string
  amount: number
  currency: string
}

// Helper function to get image URL
function getImageUrl(imageRef: any): string | null {
  if (!imageRef) return null
  return builder.image(imageRef).width(400).height(400).url()
}

// Helper function to get file URL
function getFileUrl(fileRef: any): string | null {
  if (!fileRef?.asset?.url) return null
  return fileRef.asset.url
}

// Fetch beat from Sanity
async function fetchBeat(beatId: string): Promise<Beat | null> {
  try {
    const query = `*[_type == "track" && _id == $beatId][0] {
      _id,
      title,
      artist,
      price,
      coverImage {
        asset-> {
          _ref,
          url
        }
      },
      audioFile {
        asset-> {
          _ref,
          url
        }
      }
    }`

    const beat = await sanityClient.fetch(query, { beatId })
    return beat
  } catch (error) {
    console.error("Error fetching beat:", error)
    return null
  }
}

// Create order in Sanity
async function createOrder(beat: Beat, paymentData: PaymentData, downloadUrl: string): Promise<string | null> {
  try {
    const orderDoc = {
      _type: "order",
      customerName: paymentData.customerName,
      customerEmail: paymentData.customerEmail,
      beat: {
        _type: "reference",
        _ref: beat._id,
      },
      downloadLink: downloadUrl,
      paymentStatus: "completed",
      transactionId: paymentData.transactionId,
      currency: paymentData.currency,
      amount: paymentData.amount,
      paymentProvider: "Paystack",
      purchaseDate: new Date().toISOString(),
    }

    const result = await sanityClient.create(orderDoc)
    return result._id
  } catch (error) {
    console.error("Error creating order:", error)
    return null
  }
}

// Send confirmation email
async function sendConfirmationEmail(beat: Beat, paymentData: PaymentData, downloadUrl: string): Promise<boolean> {
  try {
    const coverImageUrl = getImageUrl(beat.coverImage)

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Beat Purchase Confirmation</title>
          <style>
            body {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8f9fa;
            }
            .container {
              background-color: white;
              border-radius: 8px;
              padding: 30px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #007bff;
              padding-bottom: 20px;
            }
            .beat-info {
              display: flex;
              align-items: center;
              margin: 20px 0;
              padding: 20px;
              background-color: #f8f9fa;
              border-radius: 8px;
            }
            .beat-cover {
              width: 100px;
              height: 100px;
              border-radius: 8px;
              margin-right: 20px;
              object-fit: cover;
            }
            .beat-details h3 {
              margin: 0 0 10px 0;
              color: #007bff;
            }
            .beat-details p {
              margin: 5px 0;
              color: #666;
            }
            .download-section {
              text-align: center;
              margin: 30px 0;
              padding: 20px;
              background-color: #e8f4fd;
              border-radius: 8px;
            }
            .download-button {
              display: inline-block;
              background-color: #007bff;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              margin-top: 15px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎵 Thank You for Your Purchase!</h1>
              <p>Your beat is ready for download</p>
            </div>
            
            <p>Hi ${paymentData.customerName},</p>
            
            <p>Thank you for purchasing from our beat store! Your payment has been successfully processed and your beat is now available for download.</p>
            
            <div class="beat-info">
              ${coverImageUrl ? `<img src="${coverImageUrl}" alt="${beat.title}" class="beat-cover">` : ""}
              <div class="beat-details">
                <h3>${beat.title}</h3>
                ${beat.artist ? `<p><strong>Artist:</strong> ${beat.artist}</p>` : ""}
                <p><strong>Amount Paid:</strong> ${paymentData.currency} ${paymentData.amount}</p>
                <p><strong>Transaction ID:</strong> ${paymentData.transactionId}</p>
              </div>
            </div>
            
            <div class="download-section">
              <h3>🎧 Your Beat is Ready!</h3>
              <p>Click the button below to download your high-quality beat file:</p>
              <a href="${downloadUrl}" class="download-button">Download Beat</a>
              <p style="margin-top: 15px; font-size: 12px; color: #666;">
                This download link is secure and unique to your purchase.
              </p>
            </div>
            
            <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Important:</strong> Please save this email and download your beat as soon as possible. If you have any issues with your download, please contact our support team.</p>
            </div>
            
            <div class="footer">
              <p>Thank you for choosing our beat store!</p>
              <p>If you have any questions, please don't hesitate to contact us.</p>
              <p>&copy; ${new Date().getFullYear()} Beat Store. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const { data, error } = await resend.emails.send({
      from: "no-reply@blingbeats.com", // Replace with your verified domain
      to: [paymentData.customerEmail],
      subject: `🎵 Your Beat "${beat.title}" is Ready for Download!`,
      html: emailHtml,
    })

    if (error) {
      console.error("Error sending email:", error)
      return false
    }

    console.log("Email sent successfully:", data)
    return true
  } catch (error) {
    console.error("Error sending confirmation email:", error)
    return false
  }
}

// Main API handler
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    console.log('Received checkout payload:', body);


    // Extract payment data (adjust based on your Paystack payload structure)
    const paymentData: PaymentData = {
      beatId: body.beatId || body.metadata?.track_id || body.metadata?.items?.[0]?.track_id,
      customerName: body.customerName || body.customer?.customer_name,
      customerEmail: body.customerEmail || body.customer?.email,
      transactionId: body.transactionId || body.reference,
      amount: body.amount || body.data?.amount, // Convert from kobo if needed
      currency: body.currency || "GHS",
    }

    // Validate required fields
    if (!paymentData.beatId || !paymentData.customerEmail || !paymentData.transactionId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: beatId, customerEmail, or transactionId",
        },
        { status: 400 },
      )
    }

    // 1. Look up the purchased beat
    console.log("Fetching beat:", paymentData.beatId)
    const beat = await fetchBeat(paymentData.beatId)

    if (!beat) {
      return NextResponse.json({ success: false, error: "Beat not found" }, { status: 404 })
    }

    // 2. Get the download URL for the beat's audio file
    const downloadUrl = getFileUrl(beat.audioFile)

    if (!downloadUrl) {
      return NextResponse.json({ success: false, error: "Audio file not available for this beat" }, { status: 404 })
    }

    // 3. Create order document in Sanity
    console.log("Creating order in Sanity...")
    const orderId = await createOrder(beat, paymentData, downloadUrl)

    if (!orderId) {
      return NextResponse.json({ success: false, error: "Failed to create order record" }, { status: 500 })
    }

    // 4. Send confirmation email
    console.log("Sending confirmation email...")
    const emailSent = await sendConfirmationEmail(beat, paymentData, downloadUrl)

    if (!emailSent) {
      console.warn("Order created but email failed to send")
      // Don't fail the entire request if email fails
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Order processed successfully",
      data: {
        orderId,
        beatTitle: beat.title,
        downloadUrl,
        emailSent,
      },
    })
  } catch (error) {
    console.error("Checkout processing error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" && error instanceof Error ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}

// Optional: Handle GET requests for health checks
export async function GET() {
  return NextResponse.json({
    status: "OK",
    message: "Checkout API is running",
    timestamp: new Date().toISOString(),
  })
}
