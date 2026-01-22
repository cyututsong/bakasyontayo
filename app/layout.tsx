import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google"; 
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});


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
      <body className={`${cormorantGaramond.variable} ${poppins.variable} antialiased`} >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
