import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import { redirects } from '@wix/redirects';
import { cookies } from "next/headers";

export const wixClientServer = async () => {
   let refreshToken;

    try {
      const cookieStore = cookies();
      refreshToken = JSON.parse(cookieStore.get("refreshToken")?.value || "{}");
    } catch (error) {
      console.error("Error parsing refresh token", error);
    }
    
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

    return myWixClient;
}