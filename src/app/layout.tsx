import type { Metadata } from "next";
import { Inter, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: '--font-hanken' });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: '--font-mono' });

export const metadata: Metadata = {
  title: "TransitOps Command Center",
  description: "Fleet Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=block" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} ${hanken.variable} ${jetbrains.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
