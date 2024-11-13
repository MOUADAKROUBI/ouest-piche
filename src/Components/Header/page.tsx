"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Brand from "@/UI/brand";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { currentCart } from "@wix/ecom";
import { MyWixClient, WixClientContext } from "@/Contexts/wixContext";
import Search from "@/UI/search";
import Weather from "@/UI/header/weather";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const myWixClient = useContext<MyWixClient>(WixClientContext);
  const cartFormRef = useRef<HTMLFormElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { cart, isLoading, counter, removeItem, updateQuantity } =
    useCartStore();
  const [searchBarOpen, setSearchBarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (cartFormRef.current) if (cart) cartFormRef.current.style.display = "";
  }, [cart]);

  const toggleCart = () => {
    setCartOpen((prevState) => {
      if (cartRef.current) {
        if (prevState) {
          cartRef.current.style.display = "none";
        } else {
          cartRef.current.style.display = "";
        }
      }
      return !prevState;
    });
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, id: string) {
    let quantity = parseInt(e.target.value);
    if (quantity < 1) quantity = 1;

    updateQuantity(myWixClient, id, quantity);
  }

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const checkout =
        await myWixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });

      const { redirectSession } =
        await myWixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId: checkout.checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: window.location.origin + "/success",
          },
        });

      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (menuRef.current) {
      if (menuOpen) {
        menuRef.current.style.display = "block";
      } else {
        menuRef.current.style.display = "";
      }
    }
  }, [menuOpen]);

  return (
    <header className="navbar w-nav" data-collapse="medium">
      <div
        className="container navbar"
        style={{
          display: searchBarOpen ? "none" : "flex",
        }}
      >
        {/* menu button */}
        <div
          className="menu-button w-nav-button"
          role="button"
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            WebkitUserSelect: "text",
          }}
        >
          <div className="wrapper-burger-menu">
            <div
              className="line-burger-menu"
              style={{
                transition: "all, transform 500ms ease-in-out",
                transform: menuOpen
                  ? "rotate(45deg) translate(5px, 5px)"
                  : "rotate(0deg) translate(0px, 0px)",
              }}
            />
            <div
              className="line-burger-menu"
              style={{
                transition: "all, transform 500ms ease-in-out",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <div
              className="line-burger-menu"
              style={{
                transition: "all, transform 500ms ease-in-out",
                transform: menuOpen
                  ? "rotate(-45deg) translate(5px, -5px)"
                  : "rotate(0deg) translate(0px, 0px)",
              }}
            />
          </div>
        </div>
        <div className="brand-search-wrapp">
          <Brand />
          <Search screen="desktop" />
        </div>
        <nav role="navigation" className="nav-menu w-nav-menu">
          <ul className="wrap-nav">
            <li className="nav-item nav-item-fill">
              <Link href="/" className="nav-link">
                <div className="icon-page">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    width={24}
                    height={24}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
                        stroke="#000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>{" "}
                      <path
                        d="M15 18H9"
                        stroke="#000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="name-page">Accueil</div>
              </Link>
            </li>
            <li className="nav-item nav-item-fill">
              <Link href="/shop" className="nav-link">
                <div className="icon-page">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    width={24}
                    height={24}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M3.5 11V14C3.5 17.7712 3.5 19.6569 4.67157 20.8284C5.84315 22 7.72876 22 11.5 22H12.5C16.2712 22 18.1569 22 19.3284 20.8284M20.5 11V14C20.5 15.1698 20.5 16.1581 20.465 17"
                        stroke="#000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>{" "}
                      <path
                        d="M9.50002 2H14.5M9.50002 2L8.84828 8.51737C8.66182 10.382 10.1261 12 12 12C13.874 12 15.3382 10.382 15.1518 8.51737L14.5 2M9.50002 2H7.41771C6.50969 2 6.05567 2 5.66628 2.10675C4.84579 2.33168 4.15938 2.89439 3.77791 3.65484M9.50002 2L8.77549 9.24527C8.61911 10.8091 7.30318 12 5.73155 12C3.8011 12 2.35324 10.2339 2.73183 8.34093L2.80002 8M14.5 2H16.5823C17.4904 2 17.9444 2 18.3338 2.10675C19.1542 2.33168 19.8407 2.89439 20.2221 3.65484C20.4032 4.01573 20.4922 4.46093 20.6703 5.35133L21.2682 8.34093C21.6468 10.2339 20.1989 12 18.2685 12C16.6969 12 15.3809 10.8091 15.2245 9.24527L14.5 2Z"
                        stroke="#000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>{" "}
                      <path
                        d="M9.5 21.5V18.5C9.5 17.5654 9.5 17.0981 9.70096 16.75C9.83261 16.522 10.022 16.3326 10.25 16.201C10.5981 16 11.0654 16 12 16C12.9346 16 13.4019 16 13.75 16.201C13.978 16.3326 14.1674 16.522 14.299 16.75C14.5 17.0981 14.5 17.5654 14.5 18.5V21.5"
                        stroke="#000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="name-page">boutique</div>
              </Link>
            </li>
            <li className="nav-item nav-item-fill">
              <Link href="/contact" className="nav-link">
                <div className="icon-page">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    width={24}
                    height={24}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="name-page">Contact</div>
              </Link>
            </li>
            <li className="nav-item nav-item-fill">
              <Link href="/about" className="nav-link">
                <div className="icon-page">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    width={24}
                    height={24}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M12 6H12.01M9 20L3 17V4L5 5M9 20L15 17M9 20V14M15 17L21 20V7L19 6M15 17V14M15 6.2C15 7.96731 13.5 9.4 12 11C10.5 9.4 9 7.96731 9 6.2C9 4.43269 10.3431 3 12 3C13.6569 3 15 4.43269 15 6.2Z"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="name-page">à propos de nous</div>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="ico-search-cart">
          {/* search icon for mobile devices */}
          <div
            className="icon-search mobile"
            onClick={() => setSearchBarOpen(!searchBarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#333"
            >
              <path d="M792-120.67 532.67-380q-30 25.33-69.64 39.67Q423.39-326 378.67-326q-108.44 0-183.56-75.17Q120-476.33 120-583.33t75.17-182.17q75.16-75.17 182.5-75.17 107.33 0 182.16 75.17 74.84 75.17 74.84 182.27 0 43.23-14 82.9-14 39.66-40.67 73l260 258.66-48 48Zm-414-272q79.17 0 134.58-55.83Q568-504.33 568-583.33q0-79-55.42-134.84Q457.17-774 378-774q-79.72 0-135.53 55.83-55.8 55.84-55.8 134.84t55.8 134.83q55.81 55.83 135.53 55.83Z" />
            </svg>
          </div>
          <div className="cart-wrap">
            <div
              className="w-commerce-commercecartwrapper cart-2"
              data-cart-open
            >
              <div className="w-commerce-commercecartopenlink cart-button w-inline-block">
                <div className="cart-icon" onClick={toggleCart}>
                  <div className="icon-page">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      width={24}
                      height={24}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M3.864 16.4552C4.40967 18.6379 4.68251 19.7292 5.49629 20.3646C6.31008 21 7.435 21 9.68486 21H14.3155C16.5654 21 17.6903 21 18.5041 20.3646C19.3179 19.7292 19.5907 18.6379 20.1364 16.4552C20.9943 13.0234 21.4233 11.3075 20.5225 10.1538C19.6217 9 17.853 9 14.3155 9H9.68486C6.14745 9 4.37875 9 3.47791 10.1538C2.94912 10.831 2.87855 11.702 3.08398 13"
                          stroke="#000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>{" "}
                        <path
                          d="M19.5 9.5L18.7896 6.89465C18.5157 5.89005 18.3787 5.38775 18.0978 5.00946C17.818 4.63273 17.4378 4.34234 17.0008 4.17152C16.5619 4 16.0413 4 15 4M4.5 9.5L5.2104 6.89465C5.48432 5.89005 5.62128 5.38775 5.90221 5.00946C6.18199 4.63273 6.56216 4.34234 6.99922 4.17152C7.43808 4 7.95872 4 9 4"
                          stroke="#000"
                          strokeWidth="1.5"
                        ></path>{" "}
                        <path
                          d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4C15 4.55228 14.5523 5 14 5H10C9.44772 5 9 4.55228 9 4Z"
                          stroke="#000"
                          strokeWidth="1.5"
                        ></path>{" "}
                      </g>
                    </svg>
                    <div className="w-commerce-commercecartopenlinkcount cart-quantity">
                      {counter}
                    </div>
                  </div>
                  <div className=" nav-link text-page">mon Panier</div>
                </div>
              </div>
              <div
                ref={cartRef}
                className="w-commerce-commercecartcontainerwrapper w-commerce-commercecartcontainerwrapper--cartType-rightSidebar cart-wrapper"
                style={{
                  transition: "all, opacity 300ms",
                  opacity: cartOpen ? 1 : 0,
                  display: "none",
                }}
              >
                <div
                  className="w-commerce-commercecartcontainer cart-container"
                  style={{
                    transition:
                      "transform .3 cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transform: cartOpen ? "translateX(0px)" : "translateX(-100%)",
                  }}
                >
                  <div className="w-commerce-commercecartheader cart-header">
                    <Link
                      href="#"
                      className="w-commerce-commercecartcloselink w-inline-block"
                      role="button"
                      aria-label="Close cart"
                      onClick={toggleCart}
                    >
                      <svg width="16px" height="16px" viewBox="0 0 16 16">
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <g fillRule="nonzero" fill="#333333">
                            <polygon points="6.23223305 8 0.616116524 13.6161165 2.38388348 15.3838835 8 9.76776695 13.6161165 15.3838835 15.3838835 13.6161165 9.76776695 8 15.3838835 2.38388348 13.6161165 0.616116524 8 6.23223305 2.38388348 0.616116524 0.616116524 2.38388348 6.23223305 8"></polygon>
                          </g>
                        </g>
                      </svg>
                    </Link>
                    <Brand />
                  </div>
                  <div className="w-commerce-commercecartformwrapper">
                    {isLoading && <div className="loading-cart" />}
                    {cart.lineItems?.length ? (
                      <form
                        ref={cartFormRef}
                        className="w-commerce-commercecartform"
                        style={{
                          display: "none",
                        }}
                        onSubmit={handleCheckout}
                      >
                        <div
                          className="w-commerce-commercecartlist"
                          role="list"
                        >
                          {cart.lineItems.map((item) => (
                            <div
                              key={item._id}
                              className="w-commerce-commercecartitem"
                              role="listitem"
                            >
                              {item.image && (
                                <Image
                                  src={wixMedia.getScaledToFillImageUrl(
                                    item.image,
                                    400,
                                    400,
                                    {}
                                  )}
                                  alt={item.productName?.original || "product"}
                                  width={400}
                                  height={400}
                                  className="w-commerce-commercecartitemimage"
                                />
                              )}
                              <div className="w-commerce-commercecartiteminfo collection-wrapper">
                                <div className="w-commerce-commercecartproductname text-collection">
                                  {item.productName?.original}
                                </div>
                                <div className="text-collection-second">
                                  {item.price?.amount + " MAD"}
                                </div>
                                <ul className="w-commerce-commercecartoptionlist option-list-cart"></ul>
                                <Link
                                  href="#"
                                  className="remove-button w-inline-block"
                                >
                                  <div
                                    className="text-block-collection"
                                    onClick={() =>
                                      removeItem(myWixClient, item._id!)
                                    }
                                  >
                                    Supprimer
                                  </div>
                                </Link>
                              </div>
                              <input
                                className="w-commerce-commercecartquantity cart-quantity-nav"
                                required
                                pattern="^[0-9]+$"
                                inputMode="numeric"
                                type="number"
                                name="quantity"
                                autoComplete="off"
                                defaultValue={item.quantity}
                                min={1}
                                max={10}
                                onChange={(e) => handleChange(e, item._id!)}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="w-commerce-commercecartfooter">
                          <div className="w-commerce-commercecartlineitem">
                            <div className="main-text cart">Sous-total</div>
                            <div className="w-commerce-commercecartordervalue main-text cart blue">
                              {cart.subtotal?.amount + " " + cart.currency}
                            </div>
                          </div>
                          <div>
                            <button
                              type="submit"
                              className="w-commerce-commercecartcheckoutbutton checkout-button"
                            >
                              continuer vers le paiement
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div className="w-commerce-commercecartemptystate empty-state-cart">
                        <div className="text-cart">Aucun article trouvé</div>
                        <Link
                          href="/shop?category=all-products"
                          className="main-button"
                          onClick={toggleCart}
                        >
                          retour à la boutique
                        </Link>
                      </div>
                    )}
                    <div className="w-commerce-commercecarterrorstate error-state-cart"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="search-bar-go-back mobile"
        style={{
          display: searchBarOpen ? "flex" : "none",
        }}
      >
        <div className="icon-go-back" onClick={() => setSearchBarOpen(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#333"
          >
            <path d="m287-446.67 240 240L480-160 160-480l320-320 47 46.67-240 240h513v66.66H287Z" />
          </svg>
        </div>
        <Search screen="mobile" />
      </div>
      <div
        className="w-nav-overlay"
        ref={menuRef}
        data-wf-ignore
        style={{
          transition: "all, transform .5 ease-in-out",
          transform: `translateY(${menuOpen ? 0 : "-100%"})`,
        }}
      >
        <div className="nav-menu-weather">
          <nav
            role="navigation"
            className="nav-menu w-nav-menu"
            data-nav-menu-open
          >
            <ul className="wrap-nav">
              <li className="nav-item">
                <Link href="/" className="nav-link" onClick={() => setMenuOpen(!menuOpen)}>
                  <div className="icon-page">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      width={24}
                      height={24}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
                          stroke="#000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>{" "}
                        <path
                          d="M15 18H9"
                          stroke="#000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                  <div className="name-page">Accueil</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/shop" className="nav-link" onClick={() => setMenuOpen(!menuOpen)}>
                  <div className="icon-page">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      width={24}
                      height={24}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M3.5 11V14C3.5 17.7712 3.5 19.6569 4.67157 20.8284C5.84315 22 7.72876 22 11.5 22H12.5C16.2712 22 18.1569 22 19.3284 20.8284M20.5 11V14C20.5 15.1698 20.5 16.1581 20.465 17"
                          stroke="#000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>{" "}
                        <path
                          d="M9.50002 2H14.5M9.50002 2L8.84828 8.51737C8.66182 10.382 10.1261 12 12 12C13.874 12 15.3382 10.382 15.1518 8.51737L14.5 2M9.50002 2H7.41771C6.50969 2 6.05567 2 5.66628 2.10675C4.84579 2.33168 4.15938 2.89439 3.77791 3.65484M9.50002 2L8.77549 9.24527C8.61911 10.8091 7.30318 12 5.73155 12C3.8011 12 2.35324 10.2339 2.73183 8.34093L2.80002 8M14.5 2H16.5823C17.4904 2 17.9444 2 18.3338 2.10675C19.1542 2.33168 19.8407 2.89439 20.2221 3.65484C20.4032 4.01573 20.4922 4.46093 20.6703 5.35133L21.2682 8.34093C21.6468 10.2339 20.1989 12 18.2685 12C16.6969 12 15.3809 10.8091 15.2245 9.24527L14.5 2Z"
                          stroke="#000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>{" "}
                        <path
                          d="M9.5 21.5V18.5C9.5 17.5654 9.5 17.0981 9.70096 16.75C9.83261 16.522 10.022 16.3326 10.25 16.201C10.5981 16 11.0654 16 12 16C12.9346 16 13.4019 16 13.75 16.201C13.978 16.3326 14.1674 16.522 14.299 16.75C14.5 17.0981 14.5 17.5654 14.5 18.5V21.5"
                          stroke="#000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                  <div className="name-page">boutique</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" className="nav-link" onClick={() => setMenuOpen(!menuOpen)}>
                  <div className="icon-page">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      width={24}
                      height={24}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                  <div className="name-page">Contact</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className="nav-link" onClick={() => setMenuOpen(!menuOpen)}>
                  <div className="icon-page">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      width={24}
                      height={24}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M12 6H12.01M9 20L3 17V4L5 5M9 20L15 17M9 20V14M15 17L21 20V7L19 6M15 17V14M15 6.2C15 7.96731 13.5 9.4 12 11C10.5 9.4 9 7.96731 9 6.2C9 4.43269 10.3431 3 12 3C13.6569 3 15 4.43269 15 6.2Z"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                  <div className="name-page">à propos de nous</div>
                </Link>
              </li>
            </ul>
          </nav>
          
          <Weather screen="-mobile" />
        </div>
      </div>
    </header>
  );
};

export default Header;
