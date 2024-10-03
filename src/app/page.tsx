// 'use client';

import React from "react";
import Hero from "@/Components/Main/hero";
import Collection from "@/Components/Main/collection";
import IconSection from "@/Components/Main/iconSection";
// import AOS from 'aos';
// import 'aos/dist/aos.css';

export default function Home() {
  // useEffect(() => {
  //   AOS.init();
  // }, []);

  return (
    <main className="_next">
      <div className="main">
        <div className="container">
          <Hero />
          <Collection />
          <IconSection />
        </div>
      </div>
    </main>
  );
}
