import React from "react";
import SingleProduct from "./singleCardProduct";
import { products } from "@wix/stores";
import { fetchBestSellersProducts, fetchSingleP } from "@/lib/fetchData";

export default async function FetchBestSellersProducts() {
  const recommendedProducts = await fetchBestSellersProducts();

  const products: (products.Product | undefined)[] = recommendedProducts
    .recommendation?.items
    ? await Promise.all(
        recommendedProducts.recommendation.items.map(async (item) => {
          const product = await fetchSingleP(item.catalogItemId!);
          return product.product;
        })
      )
    : [];

  if (!products?.length)
    return (
      <div className="w-dyn-empty">
        <h1>no products found</h1>
      </div>
    );

  return (
    <>
      {products.map((product, i) => (
        <SingleProduct key={i} data={product!} />
      ))}
    </>
  );
}
