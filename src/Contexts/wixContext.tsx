"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import { redirects } from '@wix/redirects';
import Cookies from "js-cookie";
import { createContext, ReactNode } from "react";

// Safely parse the refresh token, fallback to null if not found
const refreshToken = Cookies.get("refreshToken")
  ? JSON.parse(Cookies.get("refreshToken")!)
  : null;

const myWixClient = createClient({
  modules: {
    products,
    collections,
    currentCart,
    redirects
  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
    tokens: {
      refreshToken,
      accessToken: { value: "", expiresAt: 0 },
    },
  }),
});

export type MyWixClient = typeof myWixClient;

// Creating context for WixClient
export const WixClientContext = createContext<MyWixClient>(myWixClient);

// Declare the provider component
export const WixClientContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <WixClientContext.Provider value={myWixClient}>
      {children}
    </WixClientContext.Provider>
  );
};
