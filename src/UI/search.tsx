"use client";

import React, { useContext, useState } from "react";
import { MyWixClient, WixClientContext } from "@/Contexts/wixContext";
import { products } from "@wix/stores";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter()
  const myWixClient = useContext<MyWixClient>(WixClientContext);
  const [searchTxt, setSearchTxt] = useState<string>("");
  const [searchedData, setSearchedData] = useState<products.Product[]>([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTxt(e.target.value);

    try {
      const res = (
        await myWixClient.products
          .queryProducts()
          .in("name", e.target.value)
          .find()
      ).items;
      setSearchedData(res);
    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <div className={`search`}>
      <svg
        className="icon search-input-icon"
        height="20px"
        width="20px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="#999999"
      >
        <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
      </svg>
      <input
        className="search-input"
        type="search"
        name="query"
        id="search-query"
        placeholder={`rechercher plus de 30 produits`}
        maxLength={256}
        required
        autoFocus
        value={searchTxt}
        onChange={(e) => handleSearch(e)}
      />
      <button
        className="search-clear"
        style={{
          display: searchTxt ? "block" : "none",
        }}
        onClick={() => setSearchTxt('')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          width="20px"
          viewBox="0 -960 960 960"
          fill="#999999"
        >
          <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
        </svg>
      </button>
      <div
        className="search-results"
        style={{
          display: (searchedData.length && searchTxt) ? "block" : "none",
        }}
      >
        <ul>
          {searchedData.map((product) => (
            <li
              className="search-result-item"
              key={product._id}
              onClick={() => {
                router.push(`/shop/${product._id}`)
                setSearchTxt('')
              }}
            >
              <div className="search-result-image">
                <Image
                  src={
                    product.media?.mainMedia?.image?.url ||
                    "/images/apple-touch-icon.png"
                  }
                  alt="product"
                  width={50}
                  height={50}
                />
              </div>
              <div className="search-result-text">
                <div className="search-result-title heading-product">
                  {product.name}
                </div>
                <div className="search-result-price price">
                  {product.priceData?.price} {product.priceData?.currency}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
