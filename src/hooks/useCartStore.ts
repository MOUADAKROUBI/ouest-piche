import { MyWixClient } from "@/Contexts/wixContext";
import { currentCart } from "@wix/ecom";
import { create } from "zustand";

type CartState = {
  cart: currentCart.Cart & currentCart.CartNonNullableFields;
  isCartLoading: boolean;
  counter: number;
  getCart: (wixClient: MyWixClient) => Promise<void>;
  addItem: (
    wixClient: MyWixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => Promise<void>;
  removeItem: (wixClient: MyWixClient, productId: string) => Promise<void>,
  updateQuantity: (wixClient: MyWixClient, productId: string, quantity: number) => Promise<void>,
};

export const useCartStore = create<CartState>((set) => ({
  cart: {
    lineItems: [],
    currency: '',
    conversionCurrency: '',
    subtotal: {
      amount: '',
      convertedAmount: '',
      formattedAmount: '',
      formattedConvertedAmount: '',
    },
    appliedDiscounts: [],
    weightUnit: currentCart.WeightUnit.KG || currentCart.WeightUnit.LB || currentCart.WeightUnit.UNSPECIFIED_WEIGHT_UNIT,
  },
  isCartLoading: false,
  counter: 0,
  getCart: async (wixClient) => {
    set((prev) => ({ ...prev, isCartLoading: true }));
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      set({
        cart: cart || [],
        isCartLoading: false,
        counter: cart?.lineItems.length || 0,
      });
    } catch (error) {
      set((prev) => ({ ...prev, isCartLoading: false }));
    }
  },
  addItem: async (wixClient, productId, variantId, quantity) => {
    set((state) => ({ ...state, isCartLoading: true }));
    try {
      const response = await wixClient.currentCart.addToCurrentCart({
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
        cart: response.cart,
        counter: response.cart?.lineItems.length,
        isCartLoading: false,
      });
    } catch (error) {
      set((state) => ({ ...state, isCartLoading: false }));
    }
  },
  removeItem: async (wixClient, productId) => {
    set((state) => ({ ...state, isCartLoading: true }));
    try {
      const response = await wixClient.currentCart.removeLineItemsFromCurrentCart(
        [productId]
      );
  
      set({
        cart: response.cart,
        counter: response.cart?.lineItems.length,
        isCartLoading: false,
      });
    } catch (error) {
      set((state) => ({ ...state, isCartLoading: false }));
    }
  },
  updateQuantity: async (wixClient, productId, quantity) => {
    set((state) => ({ ...state, isCartLoading: true }));
    try {
      const response = await wixClient.currentCart.updateCurrentCartLineItemQuantity([
        {
          _id: productId,
          quantity: quantity,
        }
      ]);
  
      set({
        cart: response.cart,
        counter: response.cart?.lineItems.length,
        isCartLoading: false,
      });
      
    } catch (error) {
      set((state) => ({ ...state, isCartLoading: false }));
    }
  },
}));
