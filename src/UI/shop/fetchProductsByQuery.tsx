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
    <>
      {products.map((data, i) => (
        <SingleProduct key={i} data={data} />
      ))}
    </>
  );
}
