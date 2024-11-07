import type { Metadata } from "next";
import "./globals.css";
import { WixClientContextProvider } from "@/Contexts/wixContext";
import Header from "@/Components/Header/page";
import Footer from "@/Components/Footer/page";
import { popping } from "./fonts";

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
    <html lang="fr" className={`${popping.variable}`}>
      <body>
        <WixClientContextProvider>
          <Header />
          {children}
          <Footer />
        </WixClientContextProvider>
      </body>
    </html>
  );
}
