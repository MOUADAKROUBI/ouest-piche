import React, { Suspense } from "react";
import Navigation from "@/UI/shop/navigation";
import Categories from "@/UI/shop/categories";
import type { Metadata, ResolvingMetadata } from "next";
import ProductCartSkeleton from "@/UI/productCartSkeleton";
import Products from "@/UI/shop/fetchProductsByQuery";
import CategoriesSkelton from "@/UI/categoriesSkelton";

export type Props = {
  searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: searchParams.category ? `Shop ${searchParams.category}` : "Shop",
  };
}

export default function Page({ searchParams }: Props) {
  return (
    <>
      <div className="main">
        <div className="navigation-wrap">
          <Navigation />
        </div>
      </div>
      <div className="container shop">
        <div className="w-layout-grid shop-grid shop">
          <div className="collumn-stiky">
            <div className="main-text link black">select a category</div>
            <Suspense fallback={<CategoriesSkelton len={6} />}>
              <Categories />
            </Suspense>
          </div>

          <div className="container-card-product">
            <div className="collection-product w-dyn-list">
              <div
                role="list"
                className="collection-list-product shop-page w-dyn-items"
              >
                <Suspense fallback={<ProductCartSkeleton len={6} />}>
                  <Products searchParams={searchParams} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
