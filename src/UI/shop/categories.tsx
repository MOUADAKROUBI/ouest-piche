"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { collections } from "@wix/stores";

export default function Categories({
  collections,
}: {
  collections: collections.Collection[];
}) {
  const [transform, setTransform] = useState<number>(0);

  const maxTransform = -(collections.length - 4); // Adjust based on number of visible items

  const handleLeftClick = () => {
    if (transform < 0) {
      setTransform(transform + 1);
    }
  };

  const handleRightClick = () => {
    if (transform > maxTransform) {
      setTransform(transform - 1);
    }
  };

  return (
    <div className="collection-list w-dyn-list">
      <div
        className="collection-list-category w-dyn-items"
        role="list"
        style={{
          transform: `translateX(${transform * 25}vw)`, // Adjust for item width
          transition: "0.5s",
        }}
      >
        {collections.map((collection, i) => (
          <Link
            key={i}
            role="listitem"
            href={`?category=${collection.name?.toLowerCase().replaceAll(" ", "-")}`}
            className="collection-item-link w-inline-block"
          >
            <div className="category-image">
              <Image
                src={collection.media?.items?.[0].image?.url!}
                alt={collection.name!}
                width={80}
                height={80}
                objectFit="cover"
              />
            </div>
            <div className="category-name nav-link _3 w-dyn-item">
              {collection.name}
            </div>
          </Link>
        ))}
      </div>
      <div className="arrow-left-right">
        <button
          className="arrow-left"
          onClick={handleLeftClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000"
          >
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        </button>
        <button
          className="arrow-right"
          onClick={handleRightClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000"
          >
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
