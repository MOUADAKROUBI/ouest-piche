import React from "react";

export default function CollectionsSkelton() {
  return (
    <div role="list" className="w-layout-grid collection-skelton-grid">
      {[1, 2, 3, 4, 5].map((_, index) => (
        <div key={index} role="listitem" className="collection-item">
          <div className="nav-card w-inline-block">
            <div className="main-image skelton" />
            <div className="nav-link footer skelton"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
