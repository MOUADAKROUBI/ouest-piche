import React, { Suspense } from "react";
import Link from "next/link";
import ProductCartSkeleton from "@/UI/productCartSkeleton";
import FetchBestSellersProducts from "@/UI/fetchBestSellersProducts";

export default function Collection() {

  return (
    <>
      <div className="collection-section">
        <h3
          className="main-heading h3 black scroll-in-to-view"
          data-aos="zoom-in-left"
        >
          les plus vendus
        </h3>
        <p className="main-paragraph center" data-aos="zoom-in-right">
          Découvrez nos produits les plus vendus
        </p>
        <Link
          href="/shop?category=all-products"
          className="main-button"
          data-aos="fade-in"
        >
          voir tout
        </Link>
      </div>
      <div className="product-section no-padding-top">
        <div className="collection-product w-dyn-list">
          <div role="list" className="collection-list-product w-dyn-items">
            <Suspense fallback={<ProductCartSkeleton len={4} />}>
              <FetchBestSellersProducts />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
