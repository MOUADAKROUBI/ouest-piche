import { MyWixClient } from "@/Contexts/wixContext";
import { currentCart } from "@wix/ecom";
import { create } from "zustand";

type CartState = {
  cart: currentCart.Cart;
  isLoading: boolean;
  counter: number;
  getCart: (wixClient: MyWixClient) => void;
  addItem: (
    wixClient: MyWixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => Promise<void>;
  removeItem: (wixClient: MyWixClient, productId: string) => void,
  updateQuantity: (wixClient: MyWixClient, productId: string, quantity: number) => void,
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  isLoading: false,
  counter: 0,
  getCart: async (wixClient) => {
    set((prev) => ({ ...prev, isLoading: true }));
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      set({
        cart: cart || [],
        isLoading: false,
        counter: cart?.lineItems.length || 0,
      });
    } catch (error) {
      set((prev) => ({ ...prev, isLoading: false }));
    }
  },
  addItem: async (wixClient, productId, variantId, quantity) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const responce = await wixClient.currentCart.addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              appId: process.env.NEXT_PUBLIC_WIX_APP_ID,
              catalogItemId: productId,
              ...(variantId && { options: { variantId } }), //if variantId exist = options: {variantId},
            },
            quantity: quantity,
          },
        ],
      });
  
      set({
        cart: responce.cart,
        counter: responce.cart?.lineItems.length,
        isLoading: false,
      });
    } catch (error) {
      set((state) => ({ ...state, isLoading: false }));
    }
  },
  removeItem: async (wixClient, productId) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const responce = await wixClient.currentCart.removeLineItemsFromCurrentCart(
        [productId]
      );
  
      set({
        cart: responce.cart,
        counter: responce.cart?.lineItems.length,
        isLoading: false,
      });
    } catch (error) {
      set((state) => ({ ...state, isLoading: false }));
    }
  },
  updateQuantity: async (wixClient, productId, quantity) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const responce = await wixClient.currentCart.updateCurrentCartLineItemQuantity([
        {
          _id: productId,
          quantity: quantity,
        }
      ]);
  
      set({
        cart: responce.cart,
        counter: responce.cart?.lineItems.length,
        isLoading: false,
      });
      
    } catch (error) {
      set((state) => ({ ...state, isLoading: false }));
    }
  },
}));
