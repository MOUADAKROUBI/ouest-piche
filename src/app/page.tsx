import React from "react";
import Hero from "@/Components/Main/hero";
import Collection from "@/Components/Main/collection";
import IconSection from "@/Components/Main/iconSection";

export default function Home() {
  return (
    <main className="_next">
      <div className="main">
        <div className="container">
          <Hero />
          <IconSection />
          <Collection />
        </div>
      </div>
    </main>
  );
}
