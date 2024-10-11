import React from "react";
import SingleProduct from "../singleCardProduct";
import { Props } from "@/app/shop/page";
import { fetchFrequentlyViewedProducts, fetchProductsByQuery, fetchSingleP } from "@/lib/fetchData";
import { products } from "@wix/stores";

export default async function Products({ searchParams }: {searchParams: Props["searchParams"]}) {
  let products: (products.Product | undefined)[] = [];

  // if (searchParams.category === 'all-products') {
  //   const recommendedProducts = (await fetchFrequentlyViewedProducts());
  //   products = recommendedProducts.recommendation?.items
  //   ? await Promise.all(
  //       recommendedProducts.recommendation.items
  //       .map(async (item) => {
  //         const product = await fetchSingleP(item.catalogItemId!);
  //         return product.product;
  //       })
  //     )
  //   : [];
  // } else {
  //   products = await fetchProductsByQuery(searchParams.category!, 20);
  // }
  products = await fetchProductsByQuery(searchParams.category!, 20);

  if (!products) 
    return (
      <div className="w-dyn-empty border">
        <h1>No products found in {searchParams.category!} category</h1>
      </div>
    )

  return (
    <>
      {products.map((data, i) => (
        <SingleProduct key={i} data={data!} />
      ))}
    </>
  );
}
