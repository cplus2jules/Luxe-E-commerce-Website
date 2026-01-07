import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { ConfirmDialogProvider } from "@/context/ConfirmDialogContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
});

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "LUXE | Timeless Elegance",
  description: "Discover premium products crafted for the modern lifestyle. Quality meets elegance at LUXE.",
  keywords: ["e-commerce", "premium products", "online shopping", "luxury", "accessories", "electronics"],
  authors: [{ name: "LUXE Store" }],
  openGraph: {
    title: "LUXE | Timeless Elegance",
    description: "Discover premium products crafted for the modern lifestyle.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body>
        <ToastProvider>
          <ConfirmDialogProvider>
            <CartProvider>
              <a href="#main-content" className="sr-only">
                Skip to main content
              </a>
              <Navbar />
              <main id="main-content">
                {children}
              </main>
              <Footer />
            </CartProvider>
          </ConfirmDialogProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
