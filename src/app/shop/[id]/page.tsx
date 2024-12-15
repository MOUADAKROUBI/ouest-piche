import React, { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from 'next'
import { fetchSingleP } from "@/lib/fetchData";
import ProductCartSkeleton from "@/UI/productCartSkeleton";
import DetailsSkelton from "@/UI/detailsSkelton";
import SingleProductContent from "@/UI/singleProduct/singleProduct";
import FetchSameCategoriesProducts from "@/UI/fetchSameCategoriesProducts";
 
export async function generateMetadata(
  { params }: {params: Promise<{ id: string }>},
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = (await params).id
 
  // fetch data
  const product = await fetchSingleP(id)
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? []
 
  return {
    title: product.product?.name,
    description: product.product?.description,
    openGraph: {
      title: product.product?.name!,
      description: product.product?.description!,
      type: 'website',
      url: `https://leficheur.vercle.app/shop/${id}`,
      siteName: 'leficheur.ma',
      images: [product.product?.media?.items?.[0].image?.url!, ...previousImages],
    },
  }
}

export default async function Page({ params }: {readonly params: Promise<{ id: string }>}) {
  return (
    <div className="main">
      <div className="container">
        <Suspense fallback={<DetailsSkelton />}>
          <SingleProductContent id={(await params).id} />
        </Suspense>
        <div className="product-section">
          <h3 className="main-heading h3 black scroll-in-to-view" data-aos="zoom-in-left">
            Produits similaires
          </h3>
          <p className="main-paragraph center" data-aos="zoom-in-right">
            Découvrez nos produits similaires
          </p>
          
          <div className="collection-product w-dyn-list">
            <ul className="collection-list-product w-dyn-items">
              <Suspense fallback={<ProductCartSkeleton len={4} />}>
                <FetchSameCategoriesProducts catalogItemId={(await params).id} />
              </Suspense>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
