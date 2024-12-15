import React from "react";
import SingleProduct from "./singleCardProduct";
import { fetchSameCategoriesProducts, fetchSingleP } from "@/lib/fetchData";
import { collections, products } from "@wix/stores";

interface Props {
  readonly catalogItemId: string
}

export default async function FetchSameCategoriesProducts({catalogItemId} : Props) {
  const recommendedProducts = await fetchSameCategoriesProducts( catalogItemId );

  const data: { product: products.Product | undefined; collection: collections.Collection & collections.CollectionNonNullableFields }[] = recommendedProducts
    .recommendation?.items
    ? await Promise.all(
        recommendedProducts.recommendation.items.map(async (item) => {
          const product = await fetchSingleP(item.catalogItemId!);
          return product;
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
      {data.map(({ product, collection }) => (
        <SingleProduct key={product?._id} data={product!} collectionName={collection.name!} />
      ))}
    </>
  );
}
