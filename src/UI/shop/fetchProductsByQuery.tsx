import React from "react";
import SingleProduct from "../singleCardProduct";
import { Props } from "@/app/shop/page";
import { fetchCollectionName, fetchProductsByQuery } from "@/lib/fetchData";
import { products } from "@wix/stores";

export default async function Products({ searchParams }: {searchParams: Props["searchParams"]}) {
  let products: (products.Product | undefined)[] = [];
  products = await fetchProductsByQuery(searchParams.category || 'all-products', searchParams.filter || 'default', 100);
  console.log(products);
  if (!products) 
    return (
      <div className="w-dyn-empty border">
        <h1>No products found in {searchParams.category!} category</h1>
      </div>
    )

  return (
    <>
      {await Promise.all(products.map(async (data, i) => {
        const collectionName = data?.collectionIds && data.collectionIds[0] ? await fetchCollectionName(data.collectionIds[0]) : 'all products';
        
        return (
          <SingleProduct key={i} data={data!} collectionName={collectionName} />
        )
      }))}
    </>
  );
}
