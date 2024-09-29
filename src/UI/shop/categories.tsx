'use client';

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { WixClientContext } from "@/Contexts/wixContext";

export default function Categories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const wixClient = useContext(WixClientContext);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const categories = (
          await wixClient.collections.queryCollections().find()
        ).items;
        setCategories(categories);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, [wixClient.collections]);

  return (
    <div className="collumn-stiky">
      <div className="main-text link black">select a category</div>
      <div className="w-dyn-list">
        {!loading ? (
          <div className="collection-list-category w-dyn-items" role="list">
            {categories.map((category, i) => (
              <div
                key={i}
                className="collection-item-link w-dyn-item"
                role="listitem"
              >
                <Link
                  href={`?category=${category.name
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                  className="link-text w-inline-block"
                >
                  <div>{category.name}</div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="loading">loading</div>
        )}
      </div>
    </div>
  );
}
