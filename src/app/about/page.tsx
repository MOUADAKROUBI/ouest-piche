import type { Metadata } from "next";
import React from "react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "About page",
};

const Page = () => {
  return (
    <>
      <div className="main">
        <div className="container about">
          <div className="hero-about">
            <div className="text-wrap-hero-about padding-right">
              <h1
                className="main-heading"
                style={{
                  opacity: 1,
                  transform:
                    "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                À propos de nous
              </h1>
              <p
                className="main-paragraph margin-top"
                style={{
                  opacity: 1,
                  transform:
                    "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                Bluefish, votre magasin spécialisé en matériel de pêche, vous
                propose une large gamme d&apos;équipements adaptés à tous les
                pêcheurs, du débutant à l&apos;expert. Chez Bluefish, vous trouverez
                des cannes à pêche, des appâts, des accessoires et des conseils
                personnalisés pour vivre une expérience de pêche réussie, que ce
                soit en eau douce ou en mer. Notre passion pour la pêche se
                reflète dans la qualité de nos produits et notre service client.
                Venez découvrir notre sélection et équipez-vous pour vos
                prochaines sorties de pêche !
              </p>
            </div>
            <div className="text-wrap-hero-about bg">
              <div
                className="cover-shape"
                style={{
                  transform:
                    "translate3d(100%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                  transformStyle: "preserve-3d",
                  display: "block",
                }}
              ></div>
              <Image
                className="main-image"
                src="https://assets-global.website-files.com/60d4499d6dd4a589a869c2a8/60e2cdca782f33aac57badd3_44%20(1)%20(1)-p-800.jpeg"
                alt="about"
                width={800}
                height={800}
                style={{
                  willChange: "transform",
                  transform:
                    "translate3d(0px, -3.40392%, 0px) scale3d(1.14183, 1.14183, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                  transformStyle: "preserve-3d",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="scaled-wrapper"
        style={{
          willChange: "width, height",
          width: "100vw",
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.957672733722!2d-9.55870841429443!3d30.066747740762608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb39347a0b36f49%3A0x30b0ffcb3c83ec1a!2zQmx1ZSBGaXNoIC0gbWF0ZXJpYWwgZGUgcMOqY2ggLSDZhdiz2KrZhNiy2YXYp9iqINin2YTYtdmK2K8!5e0!3m2!1sen!2sma!4v1729791556960!5m2!1sen!2sma"
          style={{
            width: "100%",
            height: "500px",
            border:0
        }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="container hero-about no-padding">
        <div className="text-wrap-hero-about padding">
          <h1 className="main-heading">Nous prenons soin de vos sentiments</h1>
          <div
            className="row"
            style={{
              transform:
                "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
              opacity: 1,
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src="https://cdn.prod.website-files.com/60d4499d6dd4a589a869c2a8/60dd8f386671a5605644ec2d_Slag-01.svg"
              alt="image-1"
              width={800}
              height={800}
              className="slag-image"
            />
            <p className="main-paragraph no-margin">Livraison par tout au Maroc</p>
          </div>
          <div
            className="row"
            style={{
              transform:
                "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
              opacity: 1,
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src="https://cdn.prod.website-files.com/60d4499d6dd4a589a869c2a8/60dd8f386671a5605644ec2d_Slag-01.svg"
              alt="image-1"
              width={800}
              height={800}
              className="slag-image"
            />
            <p className="main-paragraph no-margin">Assistante À L&apos;écoute</p>
          </div>
          <div
            className="row"
            style={{
              transform:
                "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
              opacity: 1,
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src="https://cdn.prod.website-files.com/60d4499d6dd4a589a869c2a8/60dd8f386671a5605644ec2d_Slag-01.svg"
              alt="image-1"
              width={800}
              height={800}
              className="slag-image"
            />
            <p className="main-paragraph no-margin">Service après-vente</p>
          </div>
        </div>
        <div className="text-wrap-hero-about _600">
          <div
            className="cover-shape"
            style={{
              transform:
                "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
              transformStyle: "preserve-3d",
              display: "block",
            }}
          ></div>
          <Image
            src="/images/image-hero-2.jpg"
            alt="image-1"
            width={800}
            height={800}
            style={{
              transform:
                "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
              transformStyle: "preserve-3d",
              zIndex: 1,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
