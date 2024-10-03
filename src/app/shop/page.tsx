import React, { Suspense } from "react";
import Navigation from "@/UI/shop/navigation";
import Categories from "@/UI/shop/categories";
import Products from "@/UI/shop/products";
import LoadingSkeleton from "@/UI/loadingSkeleton";
import type { Metadata, ResolvingMetadata } from 'next'
 
export type Props = {
  searchParams: { [key: string]: string | undefined }
}
 
export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
 
  return {
    title: searchParams.category ? `Shop ${searchParams.category}` : "Shop",
  }
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
          <Suspense fallback={<LoadingSkeleton />}>
            <Categories />
          </Suspense>
          <Suspense fallback={<LoadingSkeleton />}>
            <Products searchParams={searchParams}  />
          </Suspense>
        </div>
      </div>
    </>
  );
}
