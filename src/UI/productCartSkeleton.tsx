import React from "react";

export default function ProductCartSkeleton({ len }: { len: number }) {
  return (
    <>
      {Array.from({ length: len }).map((_, i) => (
        <div
          key={i}
          className="collection-item-product w-dyn-item"
          role="listitem"
        >
          <div className="product-card scroll-in-to-view">
            <div className="wrapp-image-product skelton"></div>

            <div className="container-text-product">
              <div className="collumn _1">
                <div className="heading-product skelton"></div>
                <div className="category-text skelton"></div>
              </div>

              <div className="collumn skelton"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
