import nodemailer from "nodemailer"
import { NextRequest, NextResponse } from "next/server"



export async function POST(req: NextRequest) {
  try {
    // Parse JSON body from request
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      )
    }
    const cleanMessage = message
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

    // Create transporter for Gmail SMTP
    const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // IMPORTANT
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

    // Define email content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      replyTo: email, // sender is user
      to: process.env.EMAIL_USER, // your portfolio email
      subject: `Portfolio Contact Form: ${name}`,
      text: cleanMessage,
      html: `
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Message:</strong></p>
      <p>${cleanMessage}</p>
`,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    )
  }
}