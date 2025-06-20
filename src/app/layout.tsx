import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Redpaddle Travel & Tours - Premium Car, Flight & Hotel Booking",
  description: "Experience luxury travel with our premium car hiring, flight booking, and hotel reservation services.",
  keywords: "luxury travel, car hire, flight booking, hotel reservation, premium travel services",
  openGraph: {
    title: "Redpaddle Travel & Tours - Premium Travel Services",
    description: "Experience luxury travel with our premium car hiring, flight booking, and hotel reservation services.",
    images: ["/ITINERARY IEP LARGE LOGO 718px X 160px.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Redpaddle Travel & Tours - Premium Travel Services",
    description: "Experience luxury travel with our premium car hiring, flight booking, and hotel reservation services.",
    images: ["/ITINERARY IEP LARGE LOGO 718px X 160px.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
