'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { collections } from "@wix/stores";
import ReactElasticCarousel, { ReactElasticCarouselProps } from "react-elastic-carousel";

export default function Categories({
  collections,
}: {
  collections: collections.Collection[];
}) {
  interface CustomCarouselProps extends ReactElasticCarouselProps {
    children: React.ReactNode;
  }
  
  const CustomCarousel = (props: CustomCarouselProps) => (
    <ReactElasticCarousel {...props} />
  );

  const breakPoints = [
    { width: 1, itemsToShow: 1, pagination: false },
    { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
    { width: 850, itemsToShow: 7, pagination: false },
    { width: 1150, itemsToShow: 7, itemsToScroll: 6, pagination: false },
    { width: 1450, itemsToShow: 7, pagination: false },
    { width: 1750, itemsToShow: 7, pagination: false },
  ]

  return (
    <div className="collection-list w-dyn-list">
      <div
        className="collection-list-category w-dyn-items"
        role="list"
        style={{
          cursor: "grab",
        }}
      >
        <CustomCarousel isRTL={false} breakPoints={breakPoints} >
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
        </CustomCarousel>
      </div>
    </div>
  );
}
