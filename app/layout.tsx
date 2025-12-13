import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HADE Store",
  description: "Premium subscription services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="bg-[#040A26] text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
