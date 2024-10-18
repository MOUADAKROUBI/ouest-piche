import React, { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from 'next'
import { fetchSingleP } from "@/lib/fetchData";
import ProductCartSkeleton from "@/UI/productCartSkeleton";
import DetailsSkelton from "@/UI/detailsSkelton";
import SingleProductContent from "@/UI/singleProduct/singleProduct";
import FetchSameCategoriesProducts from "@/UI/fetchSameCategoriesProducts";
 
type Props = {
  params: { id: string }
}
 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id
 
  // fetch data
  const product = await fetchSingleP(id)
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
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

export default async function Page({ params }: Props) {
  return (
    <>
      <div className="main">
        <div className="container">
          <Suspense fallback={<DetailsSkelton />}>
            <SingleProductContent id={params.id} />
          </Suspense>
          <div className="product-section">
            <div className="collection-product w-dyn-list">
              <div role="list" className="collection-list-product w-dyn-items">
                <Suspense fallback={<ProductCartSkeleton len={4} />}>
                  <FetchSameCategoriesProducts catalogItemId={params.id} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
