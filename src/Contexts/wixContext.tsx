"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart, orders as ordersEcom } from "@wix/ecom";
import { redirects } from '@wix/redirects';
import { members } from '@wix/members';
import { orders } from '@wix/restaurants';
import Cookies from "js-cookie";
import { createContext, ReactNode } from "react";

// Safely parse the refresh token, fallback to null if not found
const refreshToken = Cookies.get("WIX_REFRESH_TOKEN")
  ? JSON.parse(Cookies.get("WIX_REFRESH_TOKEN")!)
  : {};
  const accessToken = Cookies.get("WIX_ACCESS_TOKEN")
  ? JSON.parse(Cookies.get("WIX_ACCESS_TOKEN")!)
  : {};

const myWixClient = createClient({
  modules: {
    products,
    collections,
    currentCart,
    redirects,
    members,
    ordersEcom,
    orders
  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
    tokens: {
      refreshToken,
      accessToken,
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
