import React, { Suspense } from "react";
import CollectionsSkelton from "@/UI/collectionsSkelton";
import FetchCollections from "@/UI/fetchCollections";

export default function IconSection() {
  return (
    <>
      <div className="collections-section">
        <h3
          className="main-heading h3 black scroll-in-to-view"
          data-aos="zoom-in-left"
        >
          découvrez nos meilleures <br /> catégories
        </h3>
      </div>
      <div className="collections-section">
        <Suspense fallback={<CollectionsSkelton />}>
          <FetchCollections />
        </Suspense>
      </div>
    </>
  );
}
