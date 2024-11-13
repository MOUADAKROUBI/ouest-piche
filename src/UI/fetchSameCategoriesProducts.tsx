import React from "react";
import SingleProduct from "./singleCardProduct";
import { fetchCollectionName, fetchSameCategoriesProducts, fetchSingleP } from "@/lib/fetchData";
import { products } from "@wix/stores";

export default async function FetchSameCategoriesProducts({catalogItemId}:{catalogItemId: string}) {
  const recommendedProducts = await fetchSameCategoriesProducts( catalogItemId );

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
      <div className="w-dyn-empty">
        <h1 style={{ textAlign: "center" }}>no products found</h1>
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
