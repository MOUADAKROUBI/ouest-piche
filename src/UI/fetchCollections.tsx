import React from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchCollections } from "@/lib/fetchData";

export default async function FetchCollections() {
  const collections = await fetchCollections(6);

  return (
    <div className="collection-list-wrapper">
      <div role="list" className="collection-list w-dyn-items">
        {collections.map((collection) => (
          <div key={collection._id} role="listitem" className="collection-item">
            <Link
              className="nav-card w-inline-block"
              href={`/shop?category=${collection
                .name!.toLowerCase()
                .replaceAll(" ", "-")}`}
            >
              <Image
                src={
                  collection?.media?.mainMedia?.image?.url ||
                  "/placeholder-image.jpg"
                } // Fallback if image URL is missing
                alt={
                  collection?.media?.mainMedia?.title || "No title available"
                } // Fallback if title is missing
                width={400}
                height={400}
                className="main-image"
              />
              <div className="nav-link footer">{collection.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
