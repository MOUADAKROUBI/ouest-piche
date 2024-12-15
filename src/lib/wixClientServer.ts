import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart, recommendations, orders as ordersEcom } from "@wix/ecom";
import { redirects } from '@wix/redirects';
import { members } from '@wix/members';
import { orders } from '@wix/restaurants';
import { cookies } from "next/headers";

export const wixClientServer = async () => {
   let refreshToken, accessToken;

    try {
      const cookieStore = await cookies();
      refreshToken = JSON.parse(cookieStore.get("WIX_REFRESH_TOKEN")?.value ?? "{}");
      accessToken = JSON.parse(cookieStore.get("WIX_ACCESS_TOKEN")?.value ?? "{}");
    } catch (error) {
      console.error("Error parsing refresh token", error);
    }
    
    const myWixClient = createClient({  
      modules: {
        products,
        collections,
        currentCart,
        redirects,
        recommendations,
        members,
        ordersEcom,
        orders,
      },
      auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
        tokens: {
          refreshToken,
          accessToken,
        },
      }),
    });

    return myWixClient;
}