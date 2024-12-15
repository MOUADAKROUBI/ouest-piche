import React from "react";
import SingleProduct from "./singleCardProduct";
import { collections, products } from "@wix/stores";
import { fetchBestSellersProducts, fetchSingleP } from "@/lib/fetchData";

export default async function FetchBestSellersProducts() {
  const recommendedProducts = await fetchBestSellersProducts();

  const data: { product: products.Product | undefined, collection: collections.Collection & collections.CollectionNonNullableFields }[] = recommendedProducts
    .recommendation?.items
    ? await Promise.all(
        recommendedProducts.recommendation.items.map(async (item) => {
          const product = await fetchSingleP(item.catalogItemId!);
          return  product;
        })
      )
    : [];

  if (!data.length)
    return (
      <li className="not-products-found w-dyn-empty">
        <h2>no products found</h2>
      </li>
    );

  return (
    <>
      {data.map(({ product, collection }) => (
        <SingleProduct key={product?._id} data={product!} collectionName={collection.name} />
      ))}
    </>
  );
}
