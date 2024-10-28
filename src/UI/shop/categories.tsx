import React from "react";
import { fetchCollections } from "@/lib/fetchData";
import Link from "next/link";

export default async function Categories() {
  const collections = await fetchCollections(100);

  return (
    <div className="w-dyn-list">
      <div className="collection-list-category w-dyn-items" role="list">
        {collections.map((collection, i) => (
          <div
            key={i}
            className="collection-item-link w-dyn-item"
            role="listitem"
          >
            <Link
              href={`?category=${collection.name
                ?.toLowerCase()
                .replaceAll(" ", "-")}`}
              className="link-text w-inline-block"
            >
              <div>{collection.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
