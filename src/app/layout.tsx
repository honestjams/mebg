import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cardwell Butchery — Local Fresh Meat Specialist",
  description:
    "Cardwell's local butcher. Beef, lamb, pork, chicken and house-made specialties — fresh every day. Shop 1/97 Victoria Street, Cardwell QLD.",
  openGraph: {
    title: "Cardwell Butchery",
    description: "Local Fresh Meat Specialist — Cardwell, QLD.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
