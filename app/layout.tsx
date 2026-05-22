import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MESBG Companion",
  description: "A Middle Earth Strategy Battle Game Companion App — track phases, points, and heroic actions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col" style={{ backgroundColor: '#1a0f08', color: '#f4e4c1' }}>
        {children}
      </body>
    </html>
  );
}
