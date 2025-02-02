import { fetchCollections } from "@/lib/fetchData";
import Brand from "@/UI/brand";
import CategoriesSkelton from "@/UI/categoriesSkelton";
import Link from "next/link";
import React, { Suspense } from "react";

const Footer = async () => {
  const collections = await fetchCollections(3);
  const currentDate = new Date().getFullYear();

  return (
    <footer className="footer" data-aos="zoom-in-down">
      <div className="container">
        <div className="w-layout-grid footer-grid">
          <div className="wrapper-footer">
            <Brand isFooter={true} />
            <figcaption className="">
              Découvrez Ouest pêche votre spécialiste dans les matériels de
              pêche, nous proposons une large gamme de produits adaptés à tous
              les techniques : pêche en mer, pêche en rivière, pêche au
              carnassier ou à la carpe. Que vous soyez débutant ou pêcheur
              expérimenté, notre objectif est de vous fournir l&apos;équipement
              et les conseils nécessaires pour vivre des moments inoubliables au
              bord de l&apos;eau. Chez Ouest Pêche, nous partageons votre
              passion et mettons tout en œuvre pour vous offrir le meilleur de
              la pêche, avec des produits rigoureusement sélectionnés, des prix
              compétitifs et un service client à votre écoute.
            </figcaption>
          </div>
          <div
            className="wrapper-footer flex"
            id="w-node-b4085ec7-73f7-1d68-189c-49e7935adbe0-935adbd6"
          >
            <div className="w-layout-grid grid">
              <div className="wrapper-link-footer">
                <h3 className="heading">page</h3>
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
                <h3 className="heading">shop</h3>
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
                <h3 className="heading">suivez-nous</h3>
                <div className="social-icons">
                  <Link
                    target="_blank"
                    href="https://www.facebook.com/profile.php?id=61568291620909"
                    className="nav-link footer w-inline-block"
                    aria-label="suivez-nous sur facebook"
                  >
                    <svg
                      viewBox="0 0 192 192"
                      xmlns="http://www.w3.org/2000/svg"
                      width="35px"
                      height="35px"
                      fill="none"
                      stroke="#fff"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeWidth="12"
                          d="M96 170c40.869 0 74-33.131 74-74 0-40.87-33.131-74-74-74-40.87 0-74 33.13-74 74 0 40.869 33.13 74 74 74Zm0 0v-62m30-48h-10c-11.046 0-20 8.954-20 20v28m0 0H74m22 0h22"
                        ></path>
                      </g>
                    </svg>
                  </Link>
                  <Link
                    target="_blank"
                    href="https://www.instagram.com/Ouest Pêche.store_?igsh=MWRpeTQ4M2RtaXFwaQ=="
                    className="nav-link footer w-inline-block"
                    aria-label="suivez-nous sur instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width="30px"
                      height="30px"
                      fill="#fff"
                    >
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                    </svg>
                  </Link>
                  <Link
                    target="_black"
                    href="#"
                    className="nav-link footer w-inline-block"
                    aria-label="contacter nous sur whatsapp"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width="30px"
                      height="30px"
                      fill="#fff"
                    >
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-buttom">
        <p>
          {currentDate} &copy; All rights reserved || designed and
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
