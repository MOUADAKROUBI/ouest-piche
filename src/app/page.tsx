// 'use client';

import React, { useEffect } from "react";
import Hero from "@/Components/Main/hero";
import Collection from "@/Components/Main/collection";
import IconSection from "@/Components/Main/iconSection";
// import AOS from 'aos';
// import 'aos/dist/aos.css';

export default function Home() {
    
  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000, // Animation duration (in ms)
  //     offset: 200, // Offset (in px) from the top before the animation starts
  //     once: true,
  //   });
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
