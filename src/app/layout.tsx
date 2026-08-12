import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { LenisProvider } from "@/components/providers/lenis-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Apex Tower Manhattan — Ultra-Luxury Sky Residences",
    template: "%s | Apex Tower Manhattan",
  },
  description:
    "Rise above the extraordinary. 85-story architectural masterpiece redefining luxury living in the heart of Manhattan with panoramic skyline views, world-class amenities, and bespoke residences.",
  openGraph: {
    title: "Apex Tower Manhattan — Ultra-Luxury Sky Residences",
    description:
      "Rise above the extraordinary. Manhattan's most prestigious address.",
    images: ["/images/hero-skyline.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sky-obsidian text-text-primary">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
