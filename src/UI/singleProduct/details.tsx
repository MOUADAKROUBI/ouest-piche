"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { MyWixClient, WixClientContext } from "@/Contexts/wixContext";
import Link from "next/link";
import { collections, products } from "@wix/stores";

export function Details({
  product,
  collection,
}: {
  product: products.Product;
  collection: collections.Collection;
}) {
  const [imageHovered, setImageHovered] = useState<string | undefined>(undefined);
  const [tabSelected, setTabSelected] = useState<number>(1);
  const WixClient = useContext<MyWixClient>(WixClientContext);

  const { isLoading, addItem } = useCartStore();

  const handleMouseEnter = (i: string | undefined) => {
    setImageHovered(i);
  };

  const handleMouseLeave = () => {
    setImageHovered(undefined);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const quantity = (form.elements.namedItem('commerce-add-to-cart-quantity-input') as HTMLInputElement).value;
    const variantId = product.variants?.[0]._id;
    addItem(WixClient, product._id!, variantId!, parseInt(quantity));
  }

  return (
    <>
      <div className="w-layout-grid shop-grid" data-id={product._id}>
        <div className="wrapper-gallery-product">
          <div className="container-hover-image">
            {product.media?.items &&
              product.media.items
                .filter((_, index) => index >= 1)
                .map((item) => (
                  <Image
                    key={item._id}
                    src={item.image?.url!}
                    alt={item.title!}
                    width={600}
                    height={600}
                    className="hover-image"
                    style={{
                      opacity: imageHovered === item._id ? 1 : 0,
                      transition: "opacity 1s ease", // Smooth opacity transition
                    }}
                  />
                ))}
            {product.media && (
              <Image
                src={product.media.mainMedia?.image?.url!}
                alt={product.media.mainMedia?.title!}
                width={600}
                height={600}
                className="image sroll-in-to-view"
                style={{
                  opacity: imageHovered === undefined ? 1 : 0,
                  transition: "opacity 1s ease", // Smooth opacity transition
                }}
              />
            )}
          </div>
          <div className="w-layout-grid grid-more-image">
            {product.media?.items &&
              product?.media?.items
                .filter((_, index) => index >= 1)
                .map((item) => (
                  <Image
                    key={item._id}
                    src={item.image?.url!}
                    alt={item.title!}
                    width={600}
                    height={600}
                    onMouseEnter={() => handleMouseEnter(item._id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleMouseEnter(item._id)}
                    style={{
                      cursor: "pointer",
                      transition: "transform 0.3s ease", // Smooth scale effect
                      transform:
                        imageHovered === item._id ? "scale(1.05)" : "scale(1)", // Slight scale on hover
                    }}
                  />
                ))}
          </div>
        </div>

        <div className="container-text-shop">
          <div className="main-text price" data-aos="fade-up">
            {product?.discount?.value ? (
              <div>
                <span className="old-price">
                  {product.priceData?.price + " " + product.priceData?.currency}
                </span>
                <sup className="mr-3 main-text price blue">
                  -
                  {String(product?.discount?.value) +
                    (product?.discount?.type === "PERCENT" ? "%" : "DH")}
                </sup>
                <span>
                  {product.priceData?.discountedPrice +
                    " " +
                    product.priceData?.currency}
                </span>
              </div>
            ) : (
              <span>
                {product.priceData?.price + " " + product.priceData?.currency}
              </span>
            )}
          </div>
          <h2 className="main-heading shop" data-aos="fade-up">
            {product.name}
          </h2>
          <p className="main-paragraph shop" data-aos="fade-up">
            {product.description}
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
                  pattern="^[1-9]+$"
                  inputMode="numeric"
                  id="quantity-5377d51fa6998e4325fd81c3622b761b"
                  name="commerce-add-to-cart-quantity-input"
                  min={1}
                  className="w-commerce-commerceaddtocartquantityinput quantity-product"
                  defaultValue={1}
                />
                <button
                  type="submit"
                  className="w-commerce-commerceaddtocartbutton add-to-cart-button-product"
                  disabled={isLoading}
                >
                  {isLoading ? "Adding to cart..." : "Add to cart"}
                </button>
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
                display: product.stock?.inventoryStatus ? "none" : "block",
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
          <div className="w-layout-grid additional-information-grid top">
            <div className="colluumn">
              <div className="main-text price first">SKU</div>
              <div className="main-text price first">Category</div>
            </div>
            <div className="colluumn">
              <div className="main-text price first">{product.sku}</div>
              <div className="main-text price first">{collection.name}</div>
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
          <div className="w-tab-content">
            <div
              data-w-tab="Tab 1"
              id="w-tabs-0-data-w-pane-0"
              role="tabpanel"
              className={`tab-pane-first-tab w-tab-pane ${
                tabSelected === 1 ? "w--tab-active" : ""
              }`}
              data-aos="fade-down"
            >
              <p className="main-paragraph">{product.description}</p>
            </div>
            <div
              data-w-tab="Tab 2"
              id="w-tabs-0-data-w-pane-1"
              role="tabpanel"
              className={`tab-pane-second-tab w-tab-pane ${
                tabSelected === 2 ? "w--tab-active" : ""
              }`}
              data-aos="fade-down"
            >
              <div className="flex-container">
                <table className="table">
                  <tbody>
                    <tr>
                      <td className="main-text price first">quantity</td>
                      <td className="main-text price first">
                        {product.stock?.quantity}
                      </td>
                    </tr>
                    <tr>
                      <td className="main-text price">ribbon</td>
                      <td className="main-text price">{product.ribbon}</td>
                    </tr>
                    {product.additionalInfoSections &&
                      product.additionalInfoSections.map((section, i) => (
                        <tr key={i}>
                          <td className="main-text price">{section.title}</td>
                          <td
                            className="main-text price"
                            dangerouslySetInnerHTML={{
                              __html: section.description!,
                            }}
                          />
                        </tr>
                      ))}

                    {product.productOptions &&
                      product.productOptions.map((options, i) => (
                        <tr key={i}>
                          <td className="main-text price">{options.name}</td>
                          <td>
                            {options.choices &&
                              options.choices.map((choice, i) => (
                                <span key={i} className="main-text price">
                                  {choice.value} ,{" "}
                                </span>
                              ))}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
