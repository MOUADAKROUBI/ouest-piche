import React from 'react'
import SingleProduct from './singleCardProduct'
import { fetchProducts } from '@/lib/fetchData';

export default async function FetchProducts() {
  const products = await fetchProducts(4);

  if (!products) 
    return (
    <div className="w-dyn-empty">
      <h1>no product found</h1>
    </div>
  );

  return (
    <>
      {products.map((product, i) => (
      <SingleProduct key={i} data={product} />
      ))}
    </>
  )
}
