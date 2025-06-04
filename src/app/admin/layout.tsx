import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Redpaddle Travel Booking",
  description: "Admin dashboard for managing flight bookings and inquiries",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}