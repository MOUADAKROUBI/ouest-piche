"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Brand from "@/UI/brand";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { currentCart } from "@wix/ecom";
import { collections } from "@wix/stores";
import { MyWixClient, WixClientContext } from "@/Contexts/wixContext";
import Search from "@/UI/search";

const Header = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const [collections, setCollections] = useState<collections.Collection[]>([]);
  const myWixClient = useContext<MyWixClient>(WixClientContext);
  const cartFormRef = useRef<HTMLFormElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { cart, isLoading, counter, removeItem, updateQuantity } =
    useCartStore();

  useEffect(() => {
    if (cartFormRef.current) if (cart) cartFormRef.current.style.display = "";
  }, [cart]);

  // Function to handle toggle
  const toggleDropdown = () => {
    setToggle(!toggle); // Toggle the state
  };

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

  useEffect(() => {
    const fetchCollections = async () => {
      const res = (
        await myWixClient.collections.queryCollections().limit(7).find()
      ).items;
      setCollections(res);
    };
    fetchCollections();
  }, [myWixClient.collections]);

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
        menuRef.current.style.height = "12533.6px";
      } else {
        menuRef.current.style.height = "";
      }
    }
  }, [menuOpen]);

  return (
    <header className="navbar w-nav" data-collapse="medium">
      <Brand />
      <div className="container navbar">
        {/* menu button */}
        <div
          className="menu-button w-nav-button"
          role="button"
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
        <Search />
        <nav role="navigation" className="nav-menu w-nav-menu">
          <div className="wrap-nav">
            <Link href="/about" className="nav-link">
              à propos de nous
            </Link>
            <Link href="/shop" className="nav-link">
              boutique
            </Link>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
          </div>
        </nav>
        <div className="cart-wrap">
          <div className="w-commerce-commercecartwrapper cart-2" data-cart-open>
            <div className="w-commerce-commercecartopenlink cart-button w-inline-block">
              <div className="cart" onClick={toggleCart}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#333"
                >
                  <path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z" />
                </svg>
              </div>
              <div className="w-commerce-commercecartopenlinkcount cart-quantity">
                {counter}
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
                    "all, transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  transform: cartOpen ? "translateX(0px)" : "none",
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
                      <div className="w-commerce-commercecartlist" role="list">
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
      <div
        className="w-nav-overlay"
        ref={menuRef}
        data-wf-ignore
        style={{
          display: menuOpen ? "block" : "none",
        }}
      >
        <nav
          role="navigation"
          className="nav-menu w-nav-menu"
          style={{
            transition: "all, transform 500ms ease-in-out",
            transform: `translateY(${
              menuOpen ? "0px" : "-100%"
            }) translateX(0px)`,
          }}
          data-nav-menu-open
        >
          <div className="wrap-nav">
            <Link href="/about" className="nav-link w-inline-block">
              à propos de nous
            </Link>
            <div className="dropdown w-dropdown w--nav-dropdown-open">
              <div
                className="dropdown-toggle w-dropdown-toggle nav-link"
                onClick={toggleDropdown}
                style={{
                  opacity: 1,
                  transform:
                    "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="icon"
                  style={{
                    transition: "cubic-bezier(1,-0.3, 0.58, 1) .7s",
                    transform: toggle ? `rotate(180deg)` : `rotate(0deg)`,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#333"
                  >
                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                  </svg>
                </div>
                <div className="nav-link _2">
                  <div className="text-link static">boutique</div>
                </div>
              </div>
              <nav
                className={`dropdown-list w-dropdown-list w--nav-dropdown-list-open ${
                  toggle && "w--open"
                }`}
              >
                <div
                  className="bg-dropdown"
                  style={{
                    height: toggle ? "100%" : "0%",
                    width: "864px",
                    transition: "height 0.3s ease",
                  }}
                ></div>
                <div className="container-dropdown">
                  <div className="main-section">
                    <div className="collection-list-wrapper">
                      <div
                        role="list"
                        className="collection-grid-list w-dyn-items"
                      >
                        {collections.map((item) => (
                          <div
                            key={item._id}
                            role="listitem"
                            className="w-dyn-item"
                          >
                            <Link
                              className="nav-card w-inline-block"
                              href={`/shop?category=${item
                                .name!.toLowerCase()
                                .replaceAll(" ", "-")}`}
                              onClick={() => {
                                setMenuOpen(false);
                                setToggle(false);
                              }}
                            >
                              <Image
                                src="https://cdn.prod.website-files.com/60d454895317b1b117060f3d/60d5d32920b4c5addcaad33d_tshirt.jpg"
                                alt="t-shirt"
                                width={400}
                                height={400}
                                className="main-image hidden-mobile"
                              />
                              <div className="nav-link footer">
                                <div className="text-link static">
                                  {item.name}
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
            <Link href="/contact" className="nav-link w-inline-block">
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
