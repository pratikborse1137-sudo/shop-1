import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "JP SHOP — Your Daily-Needs Kirana, Delivered",
  description:
    "JP SHOP is your one-stop online kirana for aata, chawal, dal, ghee, masale, chai, biscuits, dairy, personal care and household essentials — delivered in 2 hours.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="bg-[var(--color-cream)] font-sans text-brand-900 antialiased">
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
