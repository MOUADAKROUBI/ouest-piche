import FetchProducts from "@/UI/fetchProducts";
import LoadingSkeleton from "@/UI/loadingSkeleton";
import SingleProductContent from "@/UI/singleProduct/singleProduct";
import React, { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from 'next'
import { fetchSingleP } from "@/lib/fetchData";
 
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
  
 
  return {
    title: product.product?.name,
  }
}

export default async function Page({ params }: Props) {
  return (
    <>
      <div className="main">
        <div className="container">
          <Suspense fallback={<LoadingSkeleton />}>
            <SingleProductContent id={params.id} />
          </Suspense>
          <div className="product-section">
            <div className="collection-product w-dyn-list">
              <div role="list" className="collection-list-product w-dyn-items">
                <Suspense fallback={<LoadingSkeleton />}>
                  <FetchProducts />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
