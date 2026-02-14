import type { Metadata } from "next";
import { poppins, cormorantGaramond } from "./fonts";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


export const metadata: Metadata = {
  title: "Bakasyon Tayo",
  description: "Book your perfect vacation rental with Bakasyon Tayo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${cormorantGaramond.variable} antialiased`} >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
