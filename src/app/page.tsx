import React from "react";
import Hero from "@/Components/Main/hero";
import Collection from "@/Components/Main/collection";
import CategoriesHome from "@/Components/Main/categoriesHome";

export default function Home() {
  return (
    <main className="_next">
      <div className="main">
        <div className="container">
          <Hero />
          <CategoriesHome />
          <Collection />
        </div>
      </div>
    </main>
  );
}
