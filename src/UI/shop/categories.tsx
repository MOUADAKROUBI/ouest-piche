'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { collections } from "@wix/stores";
import Carousel from "../carousel";

export default function Categories({
  collections,
}: {
  collections: collections.Collection[];
}) {
  return (
    <div className="collection-list w-dyn-list">
      <div
        className="collection-list-category w-dyn-items"
        role="list"
        style={{
          cursor: "grab",
        }}
      >
        <Carousel autoSlide={false} tips={false} >
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
        </Carousel>
      </div>
    </div>
  );
}
