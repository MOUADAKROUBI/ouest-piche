import React from "react";
import SingleProduct from "../singleCardProduct";
import { Props } from "@/app/shop/page";
import { fetchProductsByQuery } from "@/lib/fetchData";

export default async function Products({ searchParams }: {searchParams: Props["searchParams"]}) {
  const products = await fetchProductsByQuery(searchParams.category!, 20);

  if (!products) 
    return (
      <div className="w-dyn-empty border">
        <h1>No products found in {searchParams.category!} category</h1>
      </div>
    )

  return (
    <div className="container-card-product">
      <div className="collection-product w-dyn-list">
        <div
          role="list"
          className="collection-list-product shop-page w-dyn-items"
        >
          {products.map((data, i) => (
            <SingleProduct key={i} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
