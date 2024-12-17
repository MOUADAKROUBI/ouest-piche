import React from "react";
import SingleProduct from "../singleCardProduct";
import { Props } from "@/app/shop/page";
import { fetchProductsByQuery } from "@/lib/fetchData";
import { collections, products } from "@wix/stores";

export default async function Products({ searchParams }: {readonly searchParams: Props["searchParams"]}) {
  let data: Promise<{ product: products.Product, collection: collections.Collection }>[] = [];
  data = await fetchProductsByQuery(searchParams.category ?? 'all-products', searchParams.filter ?? 'default', 100);

  if (!products) 
    return (
      <li className="w-dyn-empty border">
        <h1>No products found in {searchParams.category!} category</h1>
      </li>
    )

  return (
    <>
      {
        Promise.all(
          data.map( async (dd) => {
            return (
              <SingleProduct key={(await dd).product._id} data={(await dd).product} collectionName={(await dd).collection.name} />
            )
          })
        )
      }
    </>
  );
}
