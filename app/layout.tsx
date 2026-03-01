import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Natural Herbal House | Premium Cannabis Collection",
  description: "The finest quality cannabis selection for connoisseurs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-stone-50 text-stone-900`}>
        <Navbar />
        {/* children နေရာမှာ ကျွန်တော်တို့ ရေးသမျှ Page တွေ အစားထိုး ဝင်လာမှာပါ */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}