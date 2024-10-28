import { fetchCollections } from "@/lib/fetchData";
import Brand from "@/UI/brand";
import CategoriesSkelton from "@/UI/categoriesSkelton";
import Link from "next/link";
import React, { Suspense } from "react";

const Footer = async () => {
  const collections = await fetchCollections(3);

  return (
    <footer className="footer" data-aos="zoom-in-down">
      <div className="container">
        <div className="w-layout-grid footer-grid">
          <div className="wrapper-footer">
            <Brand />
            <h1 className="main-heading footer">
              Équipement de pêche <br /> premium pour tous.
            </h1>
          </div>
          <div
            className="wrapper-footer flex"
            id="w-node-b4085ec7-73f7-1d68-189c-49e7935adbe0-935adbd6"
          >
            <div className="w-layout-grid grid">
              <div className="wrapper-link-footer">
                <h6 className="heading">page</h6>
                <Link href="/about" className="nav-link footer w-inline-block">
                  <div className="text-link static">À propos de nous</div>
                </Link>
                <Link
                  href="/shop?category=all-products"
                  className="nav-link footer w-inline-block"
                >
                  <div className="text-link static">Boutique</div>
                </Link>
                <Link
                  href="/contact"
                  className="nav-link footer w-inline-block"
                >
                  <div className="text-link static">contact</div>
                </Link>
              </div>
              <div className="wrapper-link-footer">
                <h6 className="heading">shop</h6>
                <Suspense fallback={<CategoriesSkelton len={3} />}>
                  {collections.map((collection) => (
                    <Link
                      key={collection._id}
                      href={`/shop?category=${collection.name
                        ?.replaceAll(" ", "-")
                        .toLowerCase()}`}
                      className="nav-link footer w-inline-block"
                    >
                      <div className="text-link static">{collection.name}</div>
                    </Link>
                  ))}
                </Suspense>
              </div>
              <div className="wrapper-link-footer">
                <h6 className="heading">social</h6>
                <a
                  target="_blank"
                  href="https://www.facebook.com/profile.php?id=100094002310270&mibextid=ZbWKwL"
                  className="nav-link footer w-inline-block"
                >
                  <div className="text-link static">facebook</div>
                </a>
                <a
                  target="_blank"
                  href="https://www.instagram.com/bluefish.store_?igsh=MWRpeTQ4M2RtaXFwaQ=="
                  className="nav-link footer w-inline-block"
                >
                  <div className="text-link static">instagram</div>
                </a>
                <a href="#" className="nav-link footer w-inline-block">
                  <div className="text-link static">whatsApp</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-buttom">
        <p>
          {new Date().getFullYear()} &copy; All rights reserved || designed and
          developed by{" "}
          <a
            className="font-bold"
            href="https://www.linkedin.com/in/mouad-akroubi-714284222"
            target="_blank"
            rel="noreferrer"
          >
            MOUAD AKROUBI
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
