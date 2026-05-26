import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Script from 'next/script'
// import { ThemeProvider } from "@/context/ThemeContext";

const lexend = Lexend({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "HAND - Human Action for Need and Development",
  description: "Making a difference in communities through dedicated service and compassionate action.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexend.variable} antialiased`}
      >
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        {children}

      </body>
    </html>
  );
}
