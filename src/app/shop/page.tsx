import React from "react";
import Navigation from "@/UI/shop/navigation";
import Categories from "@/UI/shop/categories";
import Products from "@/UI/shop/products";

export default function Page() {

  return (
    <>
      <div className="main">
        <div className="navigation-wrap">
          <Navigation />
        </div>
      </div>
      <div className="container shop">
        <div className="w-layout-grid shop-grid shop">
          <Categories />
          <Products />
        </div>
      </div>
    </>
  );
}
