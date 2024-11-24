'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { collections } from "@wix/stores";
import Carousel from "../carousel";

interface Props {
  readonly collections: collections.Collection[];
}

export default function Categories({
  collections,
}: Props) {
  return (
    <div className="collection-list w-dyn-list">
      <menu
        className="collection-list-category w-dyn-items"
      >
        <Carousel hiddenArrows={true}>
          {collections.map( collection => (
            <Link
              key={collection._id}
              href={`?category=${collection.name?.toLowerCase().replaceAll(" ", "-")}`}
              className="collection-item-link w-inline-block"
            >
              <div className="category-image">
                <Image
                  src={collection.media?.mainMedia?.image?.url ?? "/placeholder-image.jpg"}
                  alt={collection.media?.mainMedia?.image?.altText ?? "placeholder"}
                  width={100}
                  height={100}
                />
              </div>
              <div className="category-name nav-link _3 w-dyn-item">
                {collection.name}
              </div>
            </Link>
          ))}
        </Carousel>
      </menu>
    </div>
  );
}
