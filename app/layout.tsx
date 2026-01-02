import type { Metadata } from "next";
import { Cinzel, Cinzel_Decorative, Crimson_Text } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Galaxtc | Cosmic Art Portfolio",
  description:
    "We are all Animals in the Universe. Explore a magical grimoire of cosmic art featuring animals among the stars.",
  keywords: ["cosmic art", "animal portraits", "galaxy art", "custom pet portraits", "acrylic painting", "digital art"],
  authors: [{ name: "Galaxtc" }],
  openGraph: {
    title: "Galaxtc | Cosmic Art Portfolio",
    description: "We are all Animals in the Universe",
    type: "website",
    locale: "en_US",
    siteName: "Galaxtc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${cinzelDecorative.variable} ${crimsonText.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
