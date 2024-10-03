import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WixClientContextProvider } from "@/Contexts/wixContext";
import Header from "@/Components/Header/page";
import Footer from "@/Components/Footer/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | leficheur.ma",
    default: "home | leficheur.ma",
  },
  description: "our website is the best place to find the best products for Fishing tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
