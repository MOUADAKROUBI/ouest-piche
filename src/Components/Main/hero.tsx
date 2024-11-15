"use client";

import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from "next/image";
import Weather from "@/UI/header/weather";
import Carousel from "@/UI/carousel";
import Link from "next/link";

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
              {[1].map(index => (
                <Link
                  key={index}
                  href="#"
                  aria-label={`slider ${index}/3`}
                  title="slider"
                >
                  <picture>
                    <source
                      media="(min-width: 991px)"
                      srcSet={`/images/slider-${index}.webp`}
                      type="image/webp"
                    />
                    <Image
                      src={`/images/slider-${index}.webp`}
                      alt="slider"
                      width={1920}
                      height={1080}
                      loading="lazy"
                      unoptimized={true}
                      className="slider-image"
                    />
                  </picture>
                </Link>
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
                loading="lazy"
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
                loading="lazy"
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
                loading="lazy"
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
