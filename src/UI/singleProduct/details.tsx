"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { MyWixClient, WixClientContext } from "@/Contexts/wixContext";
import Link from "next/link";
import { collections, products } from "@wix/stores";
import { useRouter } from "next/navigation";

interface Props {
  product: products.Product;
  collection: collections.Collection;
}

export function Details({
  product,
  collection,
}: Readonly<Props>) {
  const [imageClicked, setImageClicked] = useState<string | undefined>(
    undefined
  );
  const [tabSelected, setTabSelected] = useState<number>(1);
  const WixClient = useContext<MyWixClient>(WixClientContext);
  const router = useRouter();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setPosition({ x, y });
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const { isLoading, addItem } = useCartStore();

  useEffect(() => {
    const imageId = product?.media?.mainMedia?._id;
    if (imageId) {
      setImageClicked(imageId);
    }
  }, [product]);

  const handleClickImage = (i: string | undefined) => {
    setImageClicked(i);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const quantity = (
      form.elements.namedItem(
        "commerce-add-to-cart-quantity-input"
      ) as HTMLInputElement
    ).value;
    const variantId = product.variants?.[0]._id;
    addItem(WixClient, product._id!, variantId!, parseInt(quantity));
  }

  return (
    <>
      <div className="go-back">
        <button className="icon-go-back" onClick={() => router.back()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="30px"
            stroke="#333"
          >
            <path d="m287-446.67 240 240L480-160 160-480l320-320 47 46.67-240 240h513v66.66H287Z" />
          </svg>
        </button>
      </div>
      <div className="w-layout-grid shop-grid" data-id={product._id}>
        <div className="wrapper-gallery-product">
          <div className="container-hover-media">
            {product.media?.items?.map((item) =>
              item.mediaType === "image" ? (
                <div key={item._id}>
                  <Image
                    src={item.image?.url ?? ""}
                    alt={item.image?.altText ?? "image de notre produit"}
                    width={600}
                    height={600}
                    className={`hover-media ${imageClicked === item._id ? "scroll-in-to-view" : ""}`}
                    onMouseEnter={() => setShowMagnifier(true)}
                    onMouseLeave={() => setShowMagnifier(false)}
                    onMouseMove={(e) => handleMouseMove(e)}
                    style={{
                      opacity: imageClicked === item._id ? 1 : 0,
                      transition: "opacity 1s ease",
                    }}
                  />
                  {showMagnifier && imageClicked === item._id && (
                    <div
                      className="magnifier"
                      style={{
                        left: `${cursorPosition.x - 300}px`,
                        top: `${cursorPosition.y - 270}px`,
                      }}
                    >
                      <div
                        className="magnifier-image"
                        style={{
                          background: `url(${item.image?.url}) no-repeat`,
                          backgroundPosition: `${position.x}% ${position.y}%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div
                  key={item._id}
                >
                  <video
                    src={item.video?.files?.[0].url ?? ""}
                    autoPlay
                    loop
                    muted
                    controls
                    className={`hover-media ${imageClicked === item._id ? "scroll-in-to-view" : ""}`}
                    aria-label={
                      item.video?.files?.[0].altText ?? "video de notre produit"
                    }
                    style={{
                      opacity: imageClicked === item._id ? 1 : 0,
                      transition: "opacity 1s ease",
                    }}
                  />
                </div>
              )
            )}
          </div>
          <div className="w-layout-grid grid-more-media">
            {
              product?.media?.items?.map((item) =>
                item.mediaType === "image" ? (
                  <Image
                    key={item._id}
                    src={item.image?.url ?? ""}
                    alt={item.image?.altText ?? "image de notre produit"}
                    width={600}
                    height={600}
                    onClick={() => handleClickImage(item._id)}
                    style={{
                      cursor: "pointer",
                      transition: "transform 0.3s ease",
                      transform:
                        imageClicked === item._id ? "scale(.85)" : "scale(1)",
                    }}
                  />
                ) : (
                  <video
                    key={item._id}
                    src={item.video?.files?.[0].url ?? ""}
                    autoPlay
                    loop
                    muted
                    onClick={() => handleClickImage(item._id)}
                    aria-label={
                      item.video?.files?.[0].altText ?? "video de notre produit"
                    }
                    style={{
                      cursor: "pointer",
                      transition: "transform 0.3s ease",
                      transform:
                        imageClicked === item._id ? "scale(.85)" : "scale(1)",
                    }}
                  />
                )
              )}
          </div>
        </div>

        <div className="container-text-shop">
          <div className="main-text in-stock">
            {product.stock?.inventoryStatus === "IN_STOCK" && "En stock"}
            {product.stock?.inventoryStatus === "OUT_OF_STOCK" &&
              "Rupture de stock"}
            {product.stock?.inventoryStatus === "PARTIALLY_OUT_OF_STOCK" &&
              "En stock partiellement"}
          </div>
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
          <p
            className="main-paragraph shop"
            data-aos="fade-up"
            dangerouslySetInnerHTML={{ __html: product.description! }}
          />
          <div className="add-to-cart" data-aos="fade-up">
            <form
              className="w-commerce-commerceaddtocartform default-state"
              onSubmit={handleSubmit}
            >
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
                  {isLoading ? "Ajout au panier..." : "Ajouter au panier"}
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
              <div>ce produit est en rupture de stock</div>
            </div>
            <div
              className="w-commerce-commerceaddtocarterror"
              style={{
                display: "none",
              }}
            >
              <div>Le produit n&apos;est pas disponible en cette quantité</div>
            </div>
          </div>
          <div className="w-layout-grid additional-information-grid top">
            <div className="colluumn">
              <div className="main-text price first">Catégorie</div>
            </div>
            <div className="colluumn">
              <div className="main-text price first">{collection.name}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="shop-tab w-tabs" data-current="tab-1">
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
              <div className="tab-text">détails</div>
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
            >
              <p
                className="main-paragraph"
                dangerouslySetInnerHTML={{ __html: product.description! }}
              />
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
                <table className="table">
                  <tbody>
                    <tr>
                      <td className="main-text price first">quantité</td>
                      <td className="main-text price first">
                        {product.stock?.quantity}
                      </td>
                    </tr>
                    <tr>
                      <td className="main-text price">ruban</td>
                      <td className="main-text price">{product.ribbon}</td>
                    </tr>
                    {
                      product?.additionalInfoSections?.map(section => (
                        <tr key={section.title}>
                          <td className="main-text price">{section.title}</td>
                          <td
                            className="main-text price"
                            dangerouslySetInnerHTML={{
                              __html: section.description!,
                            }}
                          />
                        </tr>
                      ))}

                    {
                      product?.productOptions?.map((options, i) => (
                        <tr key={options.name}>
                          <td className="main-text price">{options.name}</td>
                          <td>
                            {
                              options?.choices?.map((choice, i) => (
                                <span key={choice.value} className="main-text price">
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
