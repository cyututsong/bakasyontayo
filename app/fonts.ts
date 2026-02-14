import { Poppins, Cormorant_Garamond } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // ← IMPORTANT
  variable: "--font-poppins",
  display: "swap",
});

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // ← kailangan din
  variable: "--font-cormorant",
  display: "swap",
});