"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function IconSection() {
  const imageViewdRef = useRef<HTMLImageElement>(null);
  const [sectionViewd, setSectionViewd] = useState(false);

  useEffect(() => {
    const scrollInToView = () => {
      if (imageViewdRef.current) {
        const rect = imageViewdRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setSectionViewd(true);
        } else {
          setSectionViewd(false);
        }
      }
    };
    scrollInToView(); // Call the function immediately after defining it
    window.addEventListener("scroll", scrollInToView);
    return () => {
      window.removeEventListener("scroll", scrollInToView);
    };
  }, []);
  return (
    <>
      <div className="icon-section">
        <div className="container-heading">
          <h1 className="main-heading scroll-in-to-view" data-aos="zoom-in-up">
            We are <span className="text-span">Makai</span>,<br />
            Our voice speaks with the <br />
            sound of the sea.
          </h1>
          <p
            className="main-paragraph width scroll-in-to-view"
            data-aos="zoom-in-down"
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>
          <div className="line"></div>
        </div>
        <div className="wrap">
          <Image
            ref={imageViewdRef}
            src="https://cdn.prod.website-files.com/60d4499d6dd4a589a869c2a8/60db1a59405491a6f7b0823e_surf-png.png"
            alt="surf"
            width={300}
            height={300}
            className="image-table"
            data-aos="fade-down"
          />
          <div
            className="wrap-icon second"
            style={{
              opacity: sectionViewd ? 1 : 0,
              transform: `translate3d(${
                sectionViewd ? "0px" : "282px"
              }, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src="https://cdn.prod.website-files.com/60d4499d6dd4a589a869c2a8/60db1b6dbd32c6a2355c9639_Orion_station-wagon.svg"
              alt="station-wagon"
              width={300}
              height={300}
              className="icon-table"
            />
            <h3 className="main-heading h6">
              fast shipping <br />
            </h3>
            <p className="main-paragraph right">
              Lorem, ipsum dolor sit amet consectetur <br /> adipisicing elit.
              Reprehenderit, est.
            </p>
          </div>
          <div
            className="wrap-icon third"
            style={{
              opacity: sectionViewd ? 1 : 0,
              transform: `translate3d(${
                sectionViewd ? "0px, 0px" : "218px, -210px"
              }, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src="https://cdn.prod.website-files.com/60d4499d6dd4a589a869c2a8/60db1b6daf81f8ca34e09aff_Orion_reload.svg"
              alt="station-wagon"
              width={300}
              height={300}
              className="icon-table"
            />
            <h3 className="main-heading h6">
              only recyclable materials <br />
            </h3>
            <p className="main-paragraph right">
              Lorem, ipsum dolor sit amet consectetur <br /> adipisicing elit.
              Reprehenderit, est.
            </p>
          </div>
          <div
            className="wrap-icon first"
            style={{
              opacity: sectionViewd ? 1 : 0,
              transform: `translate3d(${
                sectionViewd ? "0px, 0px" : "218px, 218px"
              }, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src="https://cdn.prod.website-files.com/60d4499d6dd4a589a869c2a8/60db1b6d8346485782aafb1d_Orion_spray-paint.svg"
              alt="station-wagon"
              width={300}
              height={300}
              className="icon-table"
            />
            <h3 className="main-heading h6">
              custom products <br />
            </h3>
            <p className="main-paragraph right">
              Lorem, ipsum dolor sit amet consectetur <br /> adipisicing elit.
              Reprehenderit, est.
            </p>
          </div>
          <div
            className="wrap-icon fifth"
            style={{
              opacity: sectionViewd ? 1 : 0,
              transform: `translate3d(${
                sectionViewd ? "0px" : "-242px"
              }, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src="https://cdn.prod.website-files.com/60d4499d6dd4a589a869c2a8/60db1b6dd7bb17b761f4c9bd_Orion_herbal-medicine.svg"
              alt="station-wagon"
              width={300}
              height={300}
              className="icon-table"
            />
            <h3 className="main-heading h6">
              100% eco fabric <br />
            </h3>
            <p className="main-paragraph right">
              Lorem, ipsum dolor sit amet consectetur <br /> adipisicing elit.
              Reprehenderit, est.
            </p>
          </div>
          <div
            className="wrap-icon sixth"
            style={{
              opacity: sectionViewd ? 1 : 0,
              transform: `translate3d(${
                sectionViewd ? "0px, 0px" : "-121px, -226px"
              }, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src="https://cdn.prod.website-files.com/60d4499d6dd4a589a869c2a8/60db1b6d4b82a7e97bf0d926_Orion_toilet.svg"
              alt="station-wagon"
              width={300}
              height={300}
              className="icon-table"
            />
            <h3 className="main-heading h6">
              for everyone <br />
            </h3>
            <p className="main-paragraph right">
              Lorem, ipsum dolor sit amet consectetur <br /> adipisicing elit.
              Reprehenderit, est.
            </p>
          </div>
          <div
            className="wrap-icon fourth"
            style={{
              opacity: sectionViewd ? 1 : 0,
              transform: `translate3d(${
                sectionViewd ? "0px, 0px" : "-177px, 153px"
              }, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src="https://cdn.prod.website-files.com/60d4499d6dd4a589a869c2a8/60db1b6d6c4569be72943b91_Orion_smiley.svg"
              alt="station-wagon"
              width={300}
              height={300}
              className="icon-table"
            />
            <h3 className="main-heading h6">
              easy-care <br />
            </h3>
            <p className="main-paragraph right">
              Lorem, ipsum dolor sit amet consectetur <br /> adipisicing elit.
              Reprehenderit, est.
            </p>
          </div>
        </div>
      </div>
      <div className="icon-section mobile">
        <div className="container-heading">
          <h1 className="main-heading scroll-in-to-view" data-aos="zoom-in-up">
            We are <span className="text-span">Makai</span>,<br />
            Our voice speaks with the <br />
            sound of the sea.
          </h1>
          <p
            className="main-paragraph width scroll-in-to-view"
            data-aos="zoom-in-down"
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>
          <div className="line"></div>
        </div>
        <div className="wrap">
          <Image
            ref={imageViewdRef}
            src="https://cdn.prod.website-files.com/60d4499d6dd4a589a869c2a8/60dc90e7ba3fef0a1b3ddd9c_board.jpg"
            alt="surf"
            width={300}
            height={300}
            className="image-table"
            data-aos="fade-down"
          />
          <div className="w-layout-grid icon-grid">
            <div
                className="wrap-icon"
            >
                <Image
                src="https://cdn.prod.website-files.com/60d4499d6dd4a589a869c2a8/60db1b6dbd32c6a2355c9639_Orion_station-wagon.svg"
                alt="station-wagon"
                width={300}
                height={300}
                className="icon-table"
                />
                <h3 className="main-heading h6">
                fast shipping <br />
                </h3>
                <p className="main-paragraph">
                Lorem, ipsum dolor sit amet consectetur <br /> adipisicing elit.
                Reprehenderit, est.
                </p>
            </div>
            <div
                className="wrap-icon"
            >
                <Image
                src="https://cdn.prod.website-files.com/60d4499d6dd4a589a869c2a8/60db1b6daf81f8ca34e09aff_Orion_reload.svg"
                alt="station-wagon"
                width={1000}
                height={1000}
                className="icon-table"
                />
                <h3 className="main-heading h6">
                only recyclable materials <br />
                </h3>
                <p className="main-paragraph">
                Lorem, ipsum dolor sit amet consectetur <br /> adipisicing elit.
                Reprehenderit, est.
                </p>
            </div>
            <div
                className="wrap-icon"
            >
                <Image
                src="https://cdn.prod.website-files.com/60d4499d6dd4a589a869c2a8/60db1b6d8346485782aafb1d_Orion_spray-paint.svg"
                alt="station-wagon"
                width={300}
                height={300}
                className="icon-table"
                />
                <h3 className="main-heading h6">
                custom products <br />
                </h3>
                <p className="main-paragraph">
                Lorem, ipsum dolor sit amet consectetur <br /> adipisicing elit.
                Reprehenderit, est.
                </p>
            </div>
            <div
                className="wrap-icon"
            >
                <Image
                src="https://cdn.prod.website-files.com/60d4499d6dd4a589a869c2a8/60db1b6dd7bb17b761f4c9bd_Orion_herbal-medicine.svg"
                alt="station-wagon"
                width={300}
                height={300}
                className="icon-table"
                />
                <h3 className="main-heading h6">
                100% eco fabric <br />
                </h3>
                <p className="main-paragraph">
                Lorem, ipsum dolor sit amet consectetur <br /> adipisicing elit.
                Reprehenderit, est.
                </p>
            </div>
            <div
                className="wrap-icon"
            >
                <Image
                src="https://cdn.prod.website-files.com/60d4499d6dd4a589a869c2a8/60db1b6d4b82a7e97bf0d926_Orion_toilet.svg"
                alt="station-wagon"
                width={300}
                height={300}
                className="icon-table"
                />
                <h3 className="main-heading h6">
                for everyone <br />
                </h3>
                <p className="main-paragraph">
                Lorem, ipsum dolor sit amet consectetur <br /> adipisicing elit.
                Reprehenderit, est.
                </p>
            </div>
            <div
                className="wrap-icon"
            >
                <Image
                src="https://cdn.prod.website-files.com/60d4499d6dd4a589a869c2a8/60db1b6d6c4569be72943b91_Orion_smiley.svg"
                alt="station-wagon"
                width={300}
                height={300}
                className="icon-table"
                />
                <h3 className="main-heading h6">
                easy-care <br />
                </h3>
                <p className="main-paragraph">
                Lorem, ipsum dolor sit amet consectetur <br /> adipisicing elit.
                Reprehenderit, est.
                </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
