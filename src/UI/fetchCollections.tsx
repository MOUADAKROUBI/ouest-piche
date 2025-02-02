import React from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchCollections } from "@/lib/fetchData";

export default async function FetchCollections() {
  const collections = await fetchCollections(6);

  return (
    <div className="collection-list-wrapper">
      <ul className="collection-list-home w-dyn-items">
        {collections.map((collection) => (
          <li key={collection._id} className="collection-item">
            <Link
              className="nav-card w-inline-block"
              href={`/shop?category=${collection
                .name!.toLowerCase()
                .replaceAll(" ", "-")}`}
            >
              <Image
                src={
                  collection?.media?.mainMedia?.image?.url ??
                  "/placeholder-image.jpg"
                } // Fallback if image URL is missing
                alt={
                  collection?.media?.mainMedia?.title ?? "No title available"
                } // Fallback if title is missing
                width={200}
                height={200}
                className="main-image"
              />
              <div className="nav-link footer">{collection.name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
