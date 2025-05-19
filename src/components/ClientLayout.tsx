'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatIcon from "@/components/ChatIcon";
import AdminLink from "@/components/AdminLink";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');
  
  return (
    <>
      {!isAdminPage && <Navbar />}
      {children}
      <Footer />
      <ChatIcon />
      {!isAdminPage && <AdminLink />}
    </>
  );
}