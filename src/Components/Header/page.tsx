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
import { usePathname, useRouter } from "next/navigation";
import { UseUser } from "@/hooks/useUser";
import Cookies from "js-cookie";

const Header = () => {
  const myWixClient = useContext<MyWixClient>(WixClientContext);

  const [loginMenuOpen, setLoginMenuOpen] = useState<boolean>(false);
  const { user, isUserLoading, getUser } = UseUser();

  useEffect(() => {
    const fetchUser = async () => {
      await getUser(myWixClient); // Call the service function
    };

    fetchUser();
  }, [myWixClient, getUser]);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const cartFormRef = useRef<HTMLFormElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { cart, isCartLoading, counter, removeItem, updateQuantity } =
    useCartStore();
  const [searchBarOpen, setSearchBarOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

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

  const handleLogOut = async () => {
    setLoginMenuOpen(false);
    Cookies.remove("WIX_REFRESH_TOKEN");
    Cookies.remove("WIX_ACCESS_TOKEN");

    const { logoutUrl } = await myWixClient.auth.logout(window.location.origin);
    router.push(logoutUrl);
  };

  return (
    <header className="navbar w-nav" data-collapse="medium">
      <div
        className="container navbar"
        style={{
          display: searchBarOpen ? "none" : "flex",
        }}
      >
        {/* menu button */}
        <button
          className="menu-button w-nav-button"
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
        </button>
        <div className="brand-search-wrapp">
          <Brand />
        </div>

        <Search screen="desktop" />

        <div className="icon-search-cart-login">
          <div className="login-wrapper">
            {isUserLoading ? (
              <div className="login-icon skelton" />
            ) : (
              <div>
                {user ? (
                  <button
                    className="login-icon"
                    title={user.profile?.nickname ?? ""}
                    onClick={() => setLoginMenuOpen(!loginMenuOpen)}
                  >
                    <div className="icon-page">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        height="24px"
                        width="24px"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#333"
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
                            d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                            stroke="#333"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>
                  </button>
                ) : (
                  <Link
                    href="/auth"
                    className="login-icon"
                    title="se Connecter"
                  >
                    <div className="icon-page">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        height="24px"
                        width="24px"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#333"
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
                            d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                            stroke="#333"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>
                  </Link>
                )}
              </div>
            )}
            <div
              className="login-menu"
              style={{
                display: loginMenuOpen ? "block" : "none",
                transform: loginMenuOpen
                  ? "translateY(0)"
                  : "translateY(-100%)",
                transition: "all, transform .5 ease-in-out",
              }}
            >
              <ul>
                <li className="nav-item">
                  <Link
                    href={`/${user?.profile?.nickname}/me/orders`}
                    className="nav-link"
                    onClick={() => setLoginMenuOpen(false)}
                  >
                    <div className="icon-page">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        height="24px"
                        width="24px"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#333"
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
                            d="M21.9844 10C21.9473 8.68893 21.8226 7.85305 21.4026 7.13974C20.8052 6.12523 19.7294 5.56066 17.5777 4.43152L15.5777 3.38197C13.8221 2.46066 12.9443 2 12 2C11.0557 2 10.1779 2.46066 8.42229 3.38197L6.42229 4.43152C4.27063 5.56066 3.19479 6.12523 2.5974 7.13974C2 8.15425 2 9.41667 2 11.9415V12.0585C2 14.5833 2 15.8458 2.5974 16.8603C3.19479 17.8748 4.27063 18.4393 6.42229 19.5685L8.42229 20.618C10.1779 21.5393 11.0557 22 12 22C12.9443 22 13.8221 21.5393 15.5777 20.618L17.5777 19.5685C19.7294 18.4393 20.8052 17.8748 21.4026 16.8603C21.8226 16.1469 21.9473 15.3111 21.9844 14"
                            stroke="#333"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          ></path>{" "}
                          <path
                            d="M21 7.5L17 9.5M12 12L3 7.5M12 12V21.5M12 12C12 12 14.7426 10.6287 16.5 9.75C16.6953 9.65237 17 9.5 17 9.5M17 9.5V13M17 9.5L7.5 4.5"
                            stroke="#333"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>
                    <div className="name-page">mes commandes</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href={`/${user?.profile?.nickname}/me`}
                    className="nav-link"
                    onClick={() => setLoginMenuOpen(false)}
                  >
                    <div className="icon-page">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        height="24px"
                        width="24px"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#333"
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
                            d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                            stroke="#333"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>
                    <div className="name-page">mon compte</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href={`/${user?.profile?.nickname}/me/likes`}
                    className="nav-link"
                    onClick={() => setLoginMenuOpen(false)}
                  >
                    <div className="icon-page">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        height="24px"
                        width="24px"
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
                            d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM7.00061 16.4209C6.68078 16.1577 6.20813 16.2036 5.94491 16.5234C5.68169 16.8432 5.72758 17.3159 6.04741 17.5791L7.00061 16.4209ZM2.34199 13.4115C2.54074 13.7749 2.99647 13.9084 3.35988 13.7096C3.7233 13.5108 3.85677 13.0551 3.65801 12.6917L2.34199 13.4115ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219ZM9.42605 18.3219C8.63014 17.6945 7.82129 17.0963 7.00061 16.4209L6.04741 17.5791C6.87768 18.2624 7.75472 18.9144 8.49742 19.4999L9.42605 18.3219ZM3.65801 12.6917C3.0968 11.6656 2.75 10.5033 2.75 9.1371H1.25C1.25 10.7746 1.66995 12.1827 2.34199 13.4115L3.65801 12.6917Z"
                            fill="#333"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>
                    <div className="name-page">mes favoris</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link logout" onClick={handleLogOut}>
                    <div className="icon-page">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        height="24px"
                        width="24px"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#fff"
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
                            d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15"
                            stroke="#fff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                          <path
                            d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827"
                            stroke="#fff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>
                    <div className="name-page">se déconnecter</div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/* search icon for mobile devices */}
          <button
            className="icon-search mobile"
            onClick={() => setSearchBarOpen(!searchBarOpen)}
            style={{
              background: "transparent",
            }}
            title="Rechercher"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              width="24px"
              viewBox="0 -960 960 960"
              fill="#333"
            >
              <path d="M792-120.67 532.67-380q-30 25.33-69.64 39.67Q423.39-326 378.67-326q-108.44 0-183.56-75.17Q120-476.33 120-583.33t75.17-182.17q75.16-75.17 182.5-75.17 107.33 0 182.16 75.17 74.84 75.17 74.84 182.27 0 43.23-14 82.9-14 39.66-40.67 73l260 258.66-48 48Zm-414-272q79.17 0 134.58-55.83Q568-504.33 568-583.33q0-79-55.42-134.84Q457.17-774 378-774q-79.72 0-135.53 55.83-55.8 55.84-55.8 134.84t55.8 134.83q55.81 55.83 135.53 55.83Z" />
            </svg>
          </button>
          <div className="cart-wrap">
            <div
              className="w-commerce-commercecartwrapper cart-2"
              data-cart-open
            >
              <div className="w-commerce-commercecartopenlink cart-button w-inline-block">
                <button
                  className="cart-icon"
                  onClick={toggleCart}
                  title="mon panier"
                >
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
                </button>
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
                    transform: cartOpen
                      ? "translateX(0px)"
                      : "translateX(-100%)",
                  }}
                >
                  <div className="w-commerce-commercecartheader cart-header">
                    <button
                      className="w-commerce-commercecartcloselink w-inline-block"
                      aria-label="Close cart"
                      title="Close cart"
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
                    </button>
                    <Brand />
                  </div>
                  <div className="w-commerce-commercecartformwrapper">
                    {isCartLoading && <div className="loading-cart" />}
                    {cart.lineItems?.length ? (
                      <form
                        ref={cartFormRef}
                        className="w-commerce-commercecartform"
                        style={{
                          display: "none",
                        }}
                        onSubmit={handleCheckout}
                      >
                        <ul className="w-commerce-commercecartlist">
                          {cart.lineItems.map((item) => (
                            <li
                              key={item._id}
                              className="w-commerce-commercecartitem"
                            >
                              {item.image && (
                                <Image
                                  src={wixMedia.getScaledToFillImageUrl(
                                    item.image,
                                    400,
                                    400,
                                    {}
                                  )}
                                  alt={item.productName?.original ?? "product"}
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
                                  <button
                                    className="text-block-collection"
                                    onClick={() =>
                                      removeItem(myWixClient, item._id!)
                                    }
                                  >
                                    Supprimer
                                  </button>
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
                            </li>
                          ))}
                        </ul>
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
      <nav role="navigation" className="nav-menu w-nav-menu">
        <ul className="wrap-nav">
          <li className="nav-item nav-item-fill">
            <Link
              href="/"
              className={`nav-link ${pathname === "/" ? "active" : ""}`}
            >
              <div className="name-page">Accueil</div>
            </Link>
          </li>
          <li className="nav-item nav-item-fill">
            <Link
              href="/shop"
              className={`nav-link ${pathname == "/shop" ? "active" : ""}`}
            >
              <div className="name-page">boutique</div>
            </Link>
          </li>
          <li className="nav-item nav-item-fill">
            <Link
              href="/contact"
              className={`nav-link ${pathname == "/contact" ? "active" : ""}`}
            >
              <div className="name-page">Contact</div>
            </Link>
          </li>
          <li className="nav-item nav-item-fill">
            <Link
              href="/about"
              className={`nav-link ${pathname == "/about" ? "active" : ""}`}
            >
              <div className="name-page">à propos de nous</div>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="line"></div>
      <div
        className="search-bar-go-back mobile"
        style={{
          display: searchBarOpen ? "flex" : "none",
        }}
      >
        <button
          className="icon-go-back"
          onClick={() => setSearchBarOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#333"
          >
            <path d="m287-446.67 240 240L480-160 160-480l320-320 47 46.67-240 240h513v66.66H287Z" />
          </svg>
        </button>
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
                <Link
                  href="/"
                  className={`nav-link ${pathname === "/" ? "active" : ""}`}
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <div className="name-page">Accueil</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/shop"
                  className={`nav-link ${pathname === "/shop" ? "active" : ""}`}
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <div className="name-page">boutique</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/contact"
                  className={`nav-link ${pathname === "/contact" ? "active" : ""}`}
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <div className="name-page">Contact</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/about"
                  className={`nav-link ${pathname === "/about" ? "active" : ""}`}
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <div className="name-page">à propos de nous</div>
                </Link>
              </li>
            </ul>
          </nav>

          {/* <Weather screen="-mobile" /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
