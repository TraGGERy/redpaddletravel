import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, phone, flightDetails } = body;

    // Validate required fields
    if (!email || !phone || !flightDetails) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // The email address where you want to receive notifications
      subject: 'New Flight Booking Inquiry',
      html: `
        <h2>New Flight Booking Inquiry</h2>
        <p><strong>Contact Information:</strong></p>
        <ul>
          <li>Email: ${email}</li>
          <li>Phone: ${phone}</li>
        </ul>
        <p><strong>Flight Details:</strong></p>
        <ul>
          <li>Trip Type: ${flightDetails.tripType}</li>
          <li>Cabin Class: ${flightDetails.cabinClass}</li>
          <li>From: ${flightDetails.from}</li>
          <li>To: ${flightDetails.to}</li>
          <li>Departure Date: ${flightDetails.departureDate}</li>
          <li>Return Date: ${flightDetails.returnDate}</li>
          <li>Passengers: ${JSON.stringify(flightDetails.passengers)}</li>
        </ul>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}