import React from "react";

export default function DetailsSkelton() {
  return (
    <div className="w-layout-grid shop-grid">
      <div className="wrapper-gallery-product">
        <div className="container-hover-image skelton"></div>
        <div className="w-layout-grid grid-more-image skelton"></div>
      </div>

      <div className="container-text-shop">
        <div className="main-text price skelton" data-aos="fade-up"></div>
        <div className="main-heading shop skelton" data-aos="fade-up"></div>
        <div className="main-paragraph shop skelton" data-aos="fade-up"></div>
        <div className="add-to-cart skelton" data-aos="fade-up"></div>
        <div className="w-layout-grid additional-information-grid top">
          <div className="colluumn">
            <div className="main-text price first">SKU</div>
            <div className="main-text price first">Category</div>
          </div>
          <div className="colluumn skelton">
            <div className="main-text price first skelton"></div>
            <div className="main-text price first skelton"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
