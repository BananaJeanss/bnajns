import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BnaJns",
  description: "BananaJeans, my personal website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
