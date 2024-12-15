'use client';

import React, { useState } from "react";

interface Props {
  savedProducts: string[];
  id: string;
}

const SaveProductButton = ({ savedProducts, id }: Readonly<Props>) => {
  const [isProductSaved, setIsProductSaved] = useState<boolean>(
    savedProducts.some((savedId: string) => savedId === id)
  );

  const handleSaveProduct = () => {
    setIsProductSaved((prev) => {
        const updatedIsProductSaved = !prev;

        if (updatedIsProductSaved) {
            // Add the new product to the list and save back to localStorage
            const updatedProducts = [...savedProducts, id]; // Create a new array
            localStorage.setItem("savedProducts", JSON.stringify(updatedProducts));
        } else {
            // Remove the product from the list and save back to localStorage
            const updatedProducts = savedProducts.filter((savedId) => savedId !== id);
            localStorage.setItem("savedProducts", JSON.stringify(updatedProducts));
        }

        return updatedIsProductSaved;
    });
  };


  return (
    <div className="save-wrapper">
      <button className="save-button" onClick={handleSaveProduct}>
        <svg
          viewBox="0 0 24 24"
          fill={isProductSaved ? "red" : "none"}
          width={34}
          height={34}
          xmlns="http://www.w3.org/2000/svg"
          stroke={isProductSaved ? "#ffffff" : "#333"}
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
              stroke={isProductSaved ? "#ffffff" : "#333"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </button>
    </div>
  );
};

export default SaveProductButton;
