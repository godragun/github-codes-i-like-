import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Villa Maravilha | Ultra-Luxury Tropical Residence",
  description:
    "An immersive 3D experience showcasing Villa Maravilha — a photorealistic ultra-luxury modern tropical villa seamlessly integrated into a lush jungle and beach environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
