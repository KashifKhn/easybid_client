import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReactQueryClientProvider } from "./ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "EasyBid - Online Auction Platform",
  description: "Bid on unique items and create your own auctions with EasyBid",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider>
      <AuthProvider>
        <html lang="en">
          <body className={inter.className}>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster />
          </body>
        </html>
      </AuthProvider>
    </ReactQueryClientProvider>
  );
}
