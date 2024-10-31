import React, { Suspense } from "react";
import CollectionsSkelton from "@/UI/collectionsSkelton";
import FetchCollections from "@/UI/fetchCollections";
import Link from "next/link";

export default function CategoriesHome() {
  return (
    <>
      <div className="collections-section">
        <h3
          className="main-heading h3 black scroll-in-to-view"
          data-aos="zoom-in-left"
        >
          découvrez nos meilleures <br /> catégories
        </h3>
        <Link
          href="/shop"
          className="main-button"
          data-aos="fade-in"
        >
          voir tout
        </Link>
      </div>
      <div className="collections-section">
        <Suspense fallback={<CollectionsSkelton />}>
          <FetchCollections />
        </Suspense>
      </div>
    </>
  );
}
