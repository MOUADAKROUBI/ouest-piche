import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WixClientContextProvider } from "@/Contexts/wixContext";
import Header from "@/Components/Header/page";
import Footer from "@/Components/Footer/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "lefisheur.ma",
  description: "A ecommerce site for fish",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script>AOS.init();</script>
      </head>
      <body className={inter.className}>
        <WixClientContextProvider>
          <Header />
          {children}
          <Footer />
        </WixClientContextProvider>
      </body>
    </html>
  );
}
