import React from "react";
import SingleProduct from "./singleCardProduct";
import { products } from "@wix/stores";
import { fetchBestSellersProducts, fetchCollectionName, fetchSingleP } from "@/lib/fetchData";

export default async function FetchBestSellersProducts() {
  const recommendedProducts = await fetchBestSellersProducts();

  const data: { product: products.Product | undefined; collectionName: string | undefined | null }[] = recommendedProducts
    .recommendation?.items
    ? await Promise.all(
        recommendedProducts.recommendation.items.map(async (item) => {
          const product = await fetchSingleP(item.catalogItemId!);
          const collectionName = await fetchCollectionName(item.catalogItemId!);
          return { product: product.product, collectionName };
        })
      )
    : [];

  if (!data.length)
    return (
      <div className="not-products-found w-dyn-empty" role="listitem">
        <h2>no products found</h2>
      </div>
    );

  return (
    <>
      {data.map(({ product, collectionName }, i) => (
        <SingleProduct key={i} data={product!} collectionName={collectionName!} />
      ))}
    </>
  );
}
