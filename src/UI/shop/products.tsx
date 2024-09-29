'use client';

import { WixClientContext } from "@/Contexts/wixContext";
import { useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import SingleProduct from "../singleProduct";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);

  const query = useSearchParams().get("category");

  const wixClient = useContext(WixClientContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts(query: string) {
      setLoading(true);
      try {
        const category = (
          await wixClient.collections
            .queryCollections()
            .eq("name", query.replaceAll("-", " "))
            .find()
        ).items[0];
        const products = (
          await wixClient.products
            .queryProducts()
            .eq("collectionIds", category._id)
            .find()
        ).items;
        setProducts(products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (query) {
      fetchProducts(query);
    }
  }, [wixClient.products, query, wixClient.collections]);
  return (
    <div className="container-card-product">
      <div className="collection-product w-dyn-list">
        {!loading ? (
          <div
            role="list"
            className="collection-list-product shop-page w-dyn-items"
          >
            {products.map((data, i) => (
              <SingleProduct key={i} data={data} />
            ))}
          </div>
        ) : (
          <div className="loading">loading</div>
        )}
      </div>
    </div>
  );
}
