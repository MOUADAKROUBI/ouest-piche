"use client";

import React, { useContext, useState } from "react";
import { MyWixClient, WixClientContext } from "@/Contexts/wixContext";
import { collections, products } from "@wix/stores";
import { useRouter } from "next/navigation";

enum Category {
  PRODUCT= "product",
  CATEGORY= "collection"
}

export default function Search({ screen }: { readonly screen: string }) {
  const router = useRouter();
  const myWixClient = useContext<MyWixClient>(WixClientContext);
  const [category, setCategory] = useState<Category>(Category.PRODUCT);
  const [searchTxt, setSearchTxt] = useState<string>("");
  const [searchedData, setSearchedData] = useState<products.Product[] | collections.Collection[]>([]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value: Category = e.target.value as Category
    setCategory(value)
  }

  const handleClickData = (data: products.Product | collections.Collection) => {
    if(category === Category.PRODUCT) 
      router.push(`/shop/${data._id}`);
    else 
      router.push(`/shop?category=${data.name?.toLocaleLowerCase()}`);
    
    setSearchTxt("");
  }

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let res: products.Product[] | collections.Collection[] = [];
    setSearchTxt(e.target.value);

    try {
      if (category === Category.PRODUCT) {
        res = (
          await myWixClient.products
            .queryProducts()
            .in("name", e.target.value)
            .find()
        ).items;
      } else {
        res = (
          await myWixClient.collections
            .queryCollections()
            .in("name", e.target.value)
            .find()
        ).items;
      }
      setSearchedData(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`search ${screen}`}>
      <div className="filter">
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
          value={searchTxt}
          onChange={handleSearch}
        />
        <button
          className="search-clear"
          style={{
            display: searchTxt ? "block" : "none",
          }}
          onClick={() => setSearchTxt("")}
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
        <div className="select-filter">
        <select
          name="filter"
          id="filter-category"
          className="main-text link"
          value={category}
          onChange={handleSelect}
        >
          <option value={Category.PRODUCT} className="main-text link">
            produit
          </option>
          <option value={Category.CATEGORY} className="main-text link">
            catégorie
          </option>
        </select>
        </div>
      </div>
      <div
        className="search-results"
        style={{
          display: searchedData.length && searchTxt ? "block" : "none",
        }}
      >
        <div>
          {searchedData.map((product) => (
            <button
              className="search-result-item"
              key={product._id}
              onClick={() => handleClickData(product)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  router.push(`/shop/${product._id}`);
                  setSearchTxt("");
                }
              }}
            >
              <div className="search-result-title">
                {product.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
