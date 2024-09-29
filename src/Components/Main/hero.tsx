'use client';

import React, { useEffect, useState } from "react";

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

  return (
    <>
      <div className="hero-section">
        <div className="hero-slider w-slider" aria-label="carousel">
          <div className="w-slider-mask">
            {[0, 1, 2].map((slide, index) => (
              <div
                key={index}
                className="hero-slide w-slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`slide ${slide + 1} of 3`}
                style={{
                  transition:
                    activeSlide == slide ? "all, transform 900ms" : "all",
                  transform: `translateX(${-activeSlide * 100}vw)`,
                  opacity: activeSlide == slide ? 1 : 0,
                  zIndex: activeSlide == slide ? 1 : 0,
                }}
              >
                <div
                  className={`image-slider ${slide == 0 && "first"} ${
                    slide == 1 && "second"
                  } ${slide == 2 && "third"}`}
                >
                  <div className="container-text-hero-slider" data-aos="fade-up">
                    <div className="overflow">
                      <h1 className="main-heading white">lets break the</h1>
                    </div>
                    <div className="overflow">
                      <h1 className="main-heading white">barriers together</h1>
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
    </>
  );
};

export default Hero;
