"use client";

import { WixClientContext } from "@/Contexts/wixContext";
import { useCartStore } from "@/hooks/useCartStore";
import SingleProduct from "@/UI/singleProduct";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [imageHovered, setImageHovered] = useState(null);
  const [tabSelected, setTabSelected] = useState(1);
  const WixClient = useContext(WixClientContext);
  const [products, setProducts] = useState<any[]>([]);
  const [singleP, setSingP] = useState<any>(null);
  const [collectionName, setCollectionName] = useState("");
  const { isLoading, addItem } = useCartStore();

  useEffect(() => {
    async function fetchSingleP(id) {
      try {
        const response = await WixClient.products.getProduct(params.id);
        const collectionName = await WixClient.collections.getCollection(
          response.product?.collectionIds[0] || ""
        );
        setSingP(response.product);
        setCollectionName(collectionName.name || "loading...");
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchProduct() {
      try {
        const response = await WixClient.products
          .queryProducts()
          .ne("_id", params.id)
          .limit(4)
          .find();
        setProducts(response.items);
      } catch (error) {
        console.log(error);
      }
    }

    fetchSingleP(params.id);
    fetchProduct();
  }, [WixClient.collections, WixClient.products, params.id]);

  const handleMouseEnter = (i) => {
    setImageHovered(i);
  };

  const handleMouseLeave = () => {
    setImageHovered(null);
  };

  function handleSubmit(e) {
    e.preventDefault();

    const quantity = e.target[0].value || 1;
    const variantId = singleP.variants[0]._id;
    addItem(WixClient, singleP._id, variantId, quantity);
  }

  return (
    <>
      <div className="main">
        <div className="container">
          {singleP ? (
            <>
              <div className="w-layout-grid shop-grid" data-id={singleP._id}>
                <div className="wrapper-gallery-product">
                  <div className="container-hover-image">
                    {singleP?.media?.items
                      .filter((item, index) => index >= 1)
                      .map((item) => (
                        <Image
                          key={item._id}
                          src={item.image.url}
                          alt={item.title}
                          width={600}
                          height={600}
                          className="hover-image"
                          style={{
                            opacity: imageHovered === item._id ? 1 : 0,
                            transition: "opacity 1s ease", // Smooth opacity transition
                          }}
                        />
                      ))}
                    <Image
                      src={singleP.media.mainMedia.image.url}
                      alt={singleP.media.mainMedia.title}
                      width={600}
                      height={600}
                      className="image sroll-in-to-view"
                      style={{
                        opacity: imageHovered === null ? 1 : 0,
                        transition: "opacity 1s ease", // Smooth opacity transition
                      }}
                    />
                  </div>
                  <div className="w-layout-grid grid-more-image">
                    {singleP?.media?.items
                      .filter((item, index) => index >= 1)
                      .map((item) => (
                        <Image
                          key={item._id}
                          src={item.image.url}
                          alt={item.title}
                          width={600}
                          height={600}
                          onMouseEnter={() => handleMouseEnter(item._id)}
                          onMouseLeave={handleMouseLeave}
                          onClick={() => handleMouseEnter(item._id)}
                          style={{
                            cursor: "pointer",
                            transition: "transform 0.3s ease", // Smooth scale effect
                            transform:
                              imageHovered === item._id
                                ? "scale(1.05)"
                                : "scale(1)", // Slight scale on hover
                          }}
                        />
                      ))}
                  </div>
                </div>
                
                <div className="container-text-shop">
                  <div className="main-text price blue" data-aos="fade-up">
                    {singleP.price.price + " " + singleP.price.currency}
                  </div>
                  <h2 className="main-heading shop" data-aos="fade-up">
                    {singleP.name}
                  </h2>
                  <p className="main-paragraph shop" data-aos="fade-up">
                    {singleP.description}
                  </p>
                  <div className="add-to-cart" data-aos="fade-up">
                    <form
                      className="w-commerce-commerceaddtocartform default-state"
                      onSubmit={handleSubmit}
                    >
                      <label htmlFor="" className="field-label-product">
                        Quantity
                      </label>
                      <div className="add-to-cart-wrap">
                        <input
                          type="number"
                          pattern="^[0-9]+$"
                          inputMode="numeric"
                          id="quantity-5377d51fa6998e4325fd81c3622b761b"
                          name="commerce-add-to-cart-quantity-input"
                          min="1"
                          className="w-commerce-commerceaddtocartquantityinput quantity-product"
                          defaultValue={1}
                        />
                        <input
                          type="submit"
                          data-node-type="commerce-add-to-cart-button"
                          data-loading-text="Adding to cart..."
                          aria-busy="false"
                          aria-haspopup="dialog"
                          className="w-commerce-commerceaddtocartbutton add-to-cart-button-product"
                          disabled={isLoading}
                          value={
                            isLoading ? "Adding to cart..." : "Add to cart"
                          }
                        />
                      </div>
                      <Link
                        href="/checkout"
                        className="w-commerce-commercebuynowbutton add-to-cart-button-product w-dyn-hide"
                      >
                        buy now
                      </Link>
                    </form>
                    <div
                      className="w-commerce-commerceaddtocartoutofstock"
                      style={{
                        display: singleP.stock.inStock ? "none" : "block",
                      }}
                    >
                      <div>this product is out of stock</div>
                    </div>
                    <div
                      className="w-commerce-commerceaddtocarterror"
                      style={{
                        display: "none",
                      }}
                    >
                      <div>product is not avariable in this Quantity</div>
                    </div>
                  </div>
                  <div
                    className="w-layout-grid additional-information-grid top"
                    data-aos="fade-up"
                  >
                    <div className="colluumn">
                      <div className="main-text price first">SKU</div>
                      <div className="main-text price first">Category</div>
                    </div>
                    <div className="colluumn">
                      <div className="main-text price first">{singleP.sku}</div>
                      <div className="main-text price first">
                        {collectionName}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section">
                <div
                  className="shop-tab w-tabs"
                  data-current="tab-1"
                  data-aos="fade-up"
                >
                  <div className="w-tab-menu" role="tablist">
                    <button
                      data-w-tab="Tab 1"
                      role="tab"
                      id="w-tabs-0-data-w-tab-0"
                      aria-selected={tabSelected === 1}
                      tabIndex={tabSelected === 1 ? 0 : -1}
                      className={`shop-tab-link w-inline-block w-tab-link ${
                        tabSelected === 1 ? "w--current" : ""
                      }`}
                      onClick={() => setTabSelected(1)}
                    >
                      <div className="tab-text">description</div>
                    </button>
                    <button
                      data-w-tab="Tab 2"
                      role="tab"
                      id="w-tabs-0-data-w-tab-1"
                      aria-selected={tabSelected === 2}
                      tabIndex={tabSelected === 2 ? 0 : -1}
                      className={`shop-tab-link w-inline-block w-tab-link ${
                        tabSelected === 2 ? "w--current" : ""
                      }`}
                      onClick={() => setTabSelected(2)}
                    >
                      <div className="tab-text">details</div>
                    </button>
                  </div>
                  <div className="w-tab-content" data-aos="fade-down">
                    <div
                      data-w-tab="Tab 1"
                      id="w-tabs-0-data-w-pane-0"
                      role="tabpanel"
                      className={`tab-pane-first-tab w-tab-pane ${
                        tabSelected === 1 ? "w--tab-active" : ""
                      }`}
                    >
                      <p className="main-paragraph">{singleP.description}</p>
                    </div>
                    <div
                      data-w-tab="Tab 2"
                      id="w-tabs-0-data-w-pane-1"
                      role="tabpanel"
                      className={`tab-pane-second-tab w-tab-pane ${
                        tabSelected === 2 ? "w--tab-active" : ""
                      }`}
                    >
                      <div className="flex-container">
                        <div className="w-layout-grid additional-information-grid">
                          <div className="colluumn">
                            <div className="main-text price first">
                              quantity
                            </div>
                            <div className="main-text price">ribbon</div>
                            {singleP.additionalInfoSections.map(
                              (section, i) => (
                                <div key={i} className="main-text price">
                                  {section.title}
                                </div>
                              )
                            )}
                            {singleP.productOptions.map((option, i) => (
                              <div key={i} className="main-text price">
                                {option.name}
                              </div>
                            ))}
                          </div>
                          <div className="colluumn">
                            <div className="main-text price first">
                              {singleP.stock.quantity}
                            </div>
                            <div className="main-text price">
                              {singleP.ribbon}
                            </div>
                            {singleP.additionalInfoSections.map(
                              (section, i) => (
                                <div key={i} className="main-text price">
                                  {section.description}
                                </div>
                              )
                            )}
                            {singleP.productOptions.map((options, i) => (
                              <ul key={i} className="">
                                {options.choices.map((choice, i) => (
                                  <li key={i} className="main-text price">
                                    {choice.value}
                                  </li>
                                ))}
                              </ul>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="loading">loading...</div>
          )}
          <div className="product-section">
            <div className="collection-product w-dyn-list">
              {products ? (
                <div
                  role="list"
                  className="collection-list-product w-dyn-items"
                >
                  {products.map((product, i) => (
                    <SingleProduct key={i} data={product} />
                  ))}
                </div>
              ) : (
                <div className="loading">loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
