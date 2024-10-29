"use client";

import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from "next/image";

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeSlide === 2) {
        setActiveSlide(0);
      } else {
        setActiveSlide(activeSlide + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [activeSlide]);

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
            {sliders.map((slide, index) => (
              <div
                key={index}
                className="hero-slide w-slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`slide ${index + 1} of 3`}
                style={{
                  transition:
                    activeSlide == index ? "all, transform 900ms" : "all",
                  transform: `translateX(${-activeSlide * 100}vw)`,
                  opacity: activeSlide == index ? 1 : 0,
                  zIndex: activeSlide == index ? 1 : 0,
                }}
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
                      <h1 className="main-heading white">{slide.title}</h1>
                    </div>
                    <div className="overflow">
                      <h1 className="main-heading white">{slide.title2}</h1>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div
              aria-live="off"
              aria-atomic="true"
              className="w-slider-aria-label"
              data-wf-ignore=""
            >
              Slide {activeSlide} of 3.
            </div>
          </div>
          <div
            className="arrow w-slider-arrow-left"
            role="button"
            tabIndex={0}
            aria-controls="w-slider-mask-0"
            aria-label="Previous slide"
          >
            <div className="w-icon-slider-left"></div>
          </div>
          <div
            className="arrow w-slider-arrow-right"
            role="button"
            tabIndex={0}
            aria-controls="w-slider-mask-0"
            aria-label="Next slide"
          >
            <div className="w-icon-slider-right"></div>
          </div>
          <div className="w-slider-nav w-round">
            <div
              className={`w-slider-dot ${activeSlide == 0 && "w-active"}`}
              aria-label="show slide 1 of 3"
              role="button"
              tabIndex={activeSlide == 0 ? 0 : -1}
              aria-pressed={activeSlide == 0 ? "true" : "false"}
              onClick={() => setActiveSlide(0)}
              style={{
                marginLeft: "3px",
                marginRight: "3px",
              }}
            ></div>
            <div
              className={`w-slider-dot ${activeSlide == 1 && "w-active"}`}
              aria-label="show slide 2 of 3"
              role="button"
              tabIndex={activeSlide == 1 ? 0 : -1}
              aria-pressed={activeSlide == 1 ? "true" : "false"}
              onClick={() => setActiveSlide(1)}
              style={{
                marginLeft: "3px",
                marginRight: "3px",
              }}
            ></div>
            <div
              className={`w-slider-dot ${activeSlide == 2 && "w-active"}`}
              aria-label="show slide 3 of 3"
              role="button"
              tabIndex={activeSlide == 2 ? 0 : -1}
              aria-pressed={activeSlide == 2 ? "true" : "false"}
              onClick={() => setActiveSlide(2)}
              style={{
                marginLeft: "3px",
                marginRight: "3px",
              }}
            ></div>
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
              />
            </div>
            <h1 className="main-heading h6 services">
              Livraison partout au Maroc
            </h1>
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
              />
            </div>
            <h1 className="main-heading h6 services">
              Assistante À L&apos;écoute
            </h1>
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
              />
            </div>
            <h1 className="main-heading h6 services">
              Service après-vente
            </h1>
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
