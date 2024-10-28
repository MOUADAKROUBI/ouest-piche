"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("filter", e.target.value);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      name="filter"
      id="filter-products"
      className="main-text link"
      onChange={(e) => handleSelect(e)}
    >
      <option value="default" className="main-text link">
        tri par défaut
      </option>
      {/* <option value="most-bought" className="main-text link">tri par popularité</option> */}
      <option value="date" className="main-text link">
        tri du plus récent ou plus ancien
      </option>
      <option value="price-cro" className="main-text link">
        tri par tarif croissant
      </option>
      <option value="price-desc" className="main-text link">
        tri par tarif décroissant
      </option>
    </select>
  );
}
