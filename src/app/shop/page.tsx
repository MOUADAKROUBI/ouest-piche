import React, { Suspense } from "react";
import Navigation from "@/UI/shop/navigation";
import Categories from "@/UI/shop/categories";
import type { Metadata, ResolvingMetadata } from "next";
import ProductCartSkeleton from "@/UI/productCartSkeleton";
import Products from "@/UI/shop/fetchProductsByQuery";
import CategoriesSkelton from "@/UI/categoriesSkelton";
import { fetchCollections } from "@/lib/fetchData";
import Filters from "@/UI/shop/filters";

export type Props = {
  searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const collection = await fetchCollections(100);
  const collectionNames = collection.filter(
    (col) =>
      col.name?.toLowerCase().replaceAll(" ", "-") === searchParams.category || 'all-products'
  )[0];

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Shop ${searchParams.category || 'all-products'}`,
    description: "browse our products",
    openGraph: {
      title: `Shop ${searchParams.category || 'all-products'}`,
      description: "browse our products",
      type: "website",
      url: `https://leficheur.vercle.com/shop?category=${searchParams.category || 'all-products'}`,
      siteName: "leficheur.ma",
      images: [
        collectionNames.media?.items?.[0].image?.url!,
        ...previousImages,
      ],
    },
  };
}

export default async function Page({ searchParams }: Props) {
  const collections = await fetchCollections(100);
  return (
    <>
      <div className="main">
        <div className="navigation-wrap">
          <Navigation />
          <Filters />
        </div>
      </div>
      <div className="container shop">
        <div className="shop-page shop">
          <div className="collumn-stiky">
            <Suspense fallback={<CategoriesSkelton len={4} />}>
              <Categories collections={collections} />
            </Suspense>
          </div>

          <div className="container-card-product">
            <div className="collection-product w-dyn-list">
              <div
                role="list"
                className="collection-list-product w-dyn-items"
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
