"use client";

import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from "next/image";
import Carousel from "react-elastic-carousel";

const Hero = () => {
  const sliders = [
    {
      title: "Chaque lancer,",
      title2: "paix et découverte.",
      className: "first",
    },
    {
      title: "Entre calme et frémissement,",
      title2: "l’aventure commence.",
      className: "second",
    },
    {
      title: "À chaque lancer,",
      title2: "l’espoir renait.",
      className: "third",
    },
  ];  

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className="hero-section">
        <div className="hero-slider w-slider" aria-label="carousel">
          <div className="w-slider-mask">
            <Carousel showArrows={false}>
              {sliders.map((slide, index) => (
                <div
                  key={index}
                  className="hero-slide w-slide"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`slide ${index + 1} of 3`}
                >
                  <div
                    className={`image-slider ${index == 0 && "first"} ${
                      index == 1 && "second"
                    } ${index == 2 && "third"}`}
                  >
                    <div
                      className="container-text-hero-slider"
                      data-aos="fade-up"
                    >
                      <div className="overflow">
                        <h2 className="main-heading white">{slide.title}</h2>
                      </div>
                      <div className="overflow">
                        <h2 className="main-heading white">{slide.title2}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      <div className="section-services" data-aos="fade-in">
        <div className="w-layout-grid grid-icon">
          <div className="icon-wrap sroll-in-to-view">
            <div className="lottie-animation">
              <Image
                src='/images/delivery.gif'
                alt="delivery icon"
                width={71}
                height={71}
                unoptimized={true}
                loader={({ src }) => src}
              />
            </div>
            <h2 className="main-heading h6 services">
              Livraison partout au Maroc
            </h2>
            <p className="main-paragraph center">
              Profitez d&apos;une livraison rapide et fiable dans tout le pays.
            </p>
          </div>
          {/* ---------------------- */}
          <div className="icon-wrap sroll-in-to-view">
            <div className="lottie-animation">
              <Image
                src='/images/virtual-assistant.gif'
                alt="delivery icon"
                width={71}
                height={71}
                unoptimized={true}
              />
            </div>
            <h2 className="main-heading h6 services">
              Assistante À L&apos;écoute
            </h2>
            <p className="main-paragraph center">
              Notre équipe est disponible pour répondre à toutes vos questions et besoins.
            </p>
          </div>
          {/* ---------------------- */}
          <div className="icon-wrap sroll-in-to-view">
            <div className="lottie-animation">
              <Image
                src='/images/tech-support.gif'
                alt="delivery icon"
                width={71}
                height={71}
                unoptimized={true}
              />
            </div>
            <h2 className="main-heading h6 services">
              Service après-vente
            </h2>
            <p className="main-paragraph center">
              Un support de qualité pour garantir votre satisfaction après chaque achat.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
