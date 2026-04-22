import type { Metadata } from "next";
import { Inter, Playfair_Display, DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Party Riders — Nigeria's Event OS",
  description: "Revolutionizing the Nigerian Event Industry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${dmSans.variable} antialiased h-screen w-screen overflow-hidden flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 overflow-y-auto no-scrollbar pt-24 relative">
          {children}
        </main>
      </body>
    </html>
  );
}
