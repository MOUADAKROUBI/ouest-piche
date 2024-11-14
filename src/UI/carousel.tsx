import React, { useEffect, useState } from "react";
import { CarouselProps } from "@/lib/difinations";

export default function Carousel({
  children: sliders,
  autoSlide = true,
  authoSlideInterval = 5000,
  tips = true,
  hiddenArrows = true,
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = React.Children.count(sliders);

  const prevSlide = () => {
    setCurrentSlide((curr) => (curr === 0 ? slidesCount - 1 : curr - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((curr) => (curr === slidesCount - 1 ? 0 : curr + 1));
  };

  useEffect(() => {
    if (!autoSlide) return;
    const carouselInterval = setInterval(() => {
      setCurrentSlide((curr) => (curr === slidesCount - 1 ? 0 : curr + 1));
    }, authoSlideInterval);

    return () => clearInterval(carouselInterval);
  }, [slidesCount, autoSlide, authoSlideInterval]);

  return (
    <div
      className="carousel-container"
    >
      <div
        className="sliders-images"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {sliders}
      </div>
      <div className="arrows-left-right">
        {(hiddenArrows && currentSlide != 0) && (
          <button 
            className="arrow-left" 
            onClick={prevSlide}
            aria-label="previous slide"
            title="aller à la diapositive précédente"
          >
            <svg
              viewBox="0 0 1024 1024"
              className="icon"
              width={34}
              height={34}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="#333"
              stroke="#333"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
                  fill="#333"
                ></path>
              </g>
            </svg>
          </button>
        )}
        {(hiddenArrows && currentSlide != slidesCount - 1) && (
          <button 
            className="arrow-right" 
            onClick={nextSlide}
            aria-label="next slide"
            title="aller à la diapositive suivante"
          >
            <svg
              viewBox="0 0 1024 1024"
              className="icon"
              width={34}
              height={34}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="#333"
              stroke="#333"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
                  fill="#333"
                ></path>
              </g>
            </svg>
          </button>
        )}
      </div>
      {tips && (
        <div className="carousel-tips-btns">
          <div className="carousel-tips">
            {Array.from({ length: slidesCount }).map((_, index) => (
              <div
                key={index}
                className={`carousel-tip ${
                  currentSlide === index ? "active" : ""
                }`}
                onClick={() => setCurrentSlide(index)}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
