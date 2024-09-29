import React from "react";
import Link from "next/link";
import SingleProduct from "@/UI/singleProduct";
import { wixClientServer } from "@/lib/wixClientServer";

export default async function Collection() {
  const wixClient = await wixClientServer();
  const res = (await wixClient.products.queryProducts().limit(4).find()).items

  return (
    <>
      <div className="collection-section">
        <div className="main-text normal scroll-in-to-view" data-aos="zoom-in-right">
          Makai COLLECTION
        </div>
        <h1 className="main-heading h3 black scroll-in-to-view" data-aos="zoom-in-left">
          the unlimited collection
          <br />
          of the best quality
        </h1>
        <p className="main-paragraph center" data-aos="zoom-in-right">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          odit, minima officiis earum sapiente eaque illo repudiandae odio et
          aspernatur ex voluptatem obcaecati autem doloribus minus in laudantium
          nam quos.
        </p>
        <Link href="/shop?category=all-products" className="main-button" data-aos="fade-in">
          view all
        </Link>
      </div>
      <div className="product-section no-padding-top" data-aos="zoom-in-down">
        <div className="collection-product w-dyn-list">
          <div role="list" className="collection-list-product w-dyn-items">
            {res.map((data, i) => (
              <SingleProduct key={i} data={data} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
