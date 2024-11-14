"use client";

import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from "next/image";
import Weather from "@/UI/header/weather";
import Carousel from "@/UI/carousel";

const Hero = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Weather screen="-desktop" />

      <div className="hero-section">
        <div className="hero-slider w-slider" aria-label="carousel">
            <Carousel>
              {[1,2,3].map((_, index) => (
                <Image
                  key={index}
                  src={`/images/hero-${index + 1}.jpg`}
                  alt="hero"
                  width={1920}
                  height={100}
                  className="slider-image"
                  unoptimized={true}
                />
              ))}
            </Carousel>
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
