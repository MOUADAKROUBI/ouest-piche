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
      <div className="arrow-left-right">
        <div className="arrow-left">
          <div className="icon-arrow-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000"
            >
              <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
          </div>
        </div>
        <div className="arrow-right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000"
          >
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
