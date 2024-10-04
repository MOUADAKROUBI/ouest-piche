"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { WixClientContext } from "@/Contexts/wixContext";
import Link from "next/link";
import { useCartStore } from "@/hooks/useCartStore";
import { products } from "@wix/stores";

export default function SingleProduct({ data } : { data: products.Product }) {
  const [hoveredIndex, setHoveredIndex] = useState(null); // Tracks which item is hovered
  const { addItem } = useCartStore();
  const ref = useRef<HTMLInputElement>(null);

  const wixClient = useContext(WixClientContext);

  async function addToCart(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (ref.current) {
      const variantId = data.variants?.[0]._id;
      ref.current.value = "Adding to cart...";
      await addItem(wixClient, data._id!, variantId!, 1)
      ref.current.value = "Added to cart";
    };
  }

  // Use media query to check if it's mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on initial render and when resizing the window
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleMouseEnter = (index: any) => {
    setHoveredIndex(index);
    if (!isMobile) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null); // Reset when no item is hovered
    if (!isMobile) {
      setHoveredIndex(null);
    }
  };

  return (
    <div
      className="collection-item-product w-dyn-item"
      role="listitem"
      data-aos="fade-up"
      data-id={data._id}
      onMouseEnter={() => handleMouseEnter(data._id)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="product-card scroll-in-to-view">
        <Link
          href={`/shop/${data._id}`}
          className="wrapp-image-product w-inline-block"
          style={{
            backgroundImage: `url(${data?.media?.mainMedia?.image?.url || "/placeholder-image.jpg"})`,
          }}
        >
          <div
            className="quick-look-wrap"
            style={{
              transform: `translate3d(0px, ${
                hoveredIndex === data._id || isMobile ? "0%" : "100%"
              }, 0px)`,
              transition: "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
              transformStyle: "preserve-3d",
            }}
          >
            <p className="main-paragraph card">Quick look</p>
          </div>
        </Link>

        <div className="container-text-product">
          <div className="collumn _1">
            <h5 className="heading-product">{data.name}</h5>
            <p className="category-text capitalize">
              {data.stock?.inventoryStatus ? "in stock" : "out of stock"}
            </p>
          </div>

          <div className="collumn">
            <div
              className="price"
              style={{
                opacity: hoveredIndex === data._id ? 0 : 1,
                transform: `translate3d(${
                  hoveredIndex === data._id ? "100%" : "0%"
                }, 0%, 0px)`,
                transition: "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.5s ease",
                transformStyle: "preserve-3d",
              }}
            >
              {data.priceData?.price + " " + data.priceData?.currency}
            </div>

            <div
              className="add-to-cart-card"
              style={{
                opacity: hoveredIndex === data._id || isMobile ? 1 : 0,
                transform: `translate3d(${
                  hoveredIndex === data._id || isMobile ? "0%" : "-100%"
                }, ${isMobile ? '50%': '0px'} ,0px)`,
                transition: "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.5s ease",
                transformStyle: "preserve-3d",
              }}
            >
              <form
                className="w-commerce-commerceaddtocartform default-state-card"
                onSubmit={addToCart}
              >
                <label htmlFor="" className="field-label">Quantity</label>
                <input
                  type="number"
                  pattern="^[0-9]+DH"
                  inputMode="numeric"
                  id="quantity-5377d51fa6998e4325fd81c3622b761b"
                  name="commerce-add-to-cart-quantity-input"
                  min={1}
                  className="w-commerce-commerceaddtocartquantityinput quantity"
                  defaultValue="1"
                />
                <input
                  ref={ref}
                  type="submit"
                  value="Add to cart"
                  id={`add-to-cart-${data._id}`}
                  className="w-commerce-commerceaddtocartbutton add-to-cart-button"
                />
                <Link
                  href="/checkout"
                  className="w-commerce-commercebuynowbutton buy-now-button w-dyn-hid"
                >
                  buy now
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
