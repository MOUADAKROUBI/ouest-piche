import React from "react";
import Hero from "./hero";
import Collection from "./collection";
import IconSection from "./iconSection";

const MainHome = () => {
  return (
    <div className="main">
      <div className="container">
        <Hero />
        <Collection />
        <IconSection />
      </div>
    </div>
  );
};

export default MainHome;
