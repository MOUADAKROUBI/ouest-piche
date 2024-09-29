import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <>
        <div className="main">
        <div className="container about">
            <div className="hero-about">
            <div className="text-wrap-hero-about padding-right">
                <div
                className="main-text"
                style={{
                    opacity: 1,
                    transform:
                    "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    transformStyle: "preserve-3d",
                }}
                >
                Makai adventure
                </div>
                <h1
                className="main-heading"
                style={{
                    opacity: 1,
                    transform:
                    "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    transformStyle: "preserve-3d",
                }}
                >
                The sea is your mirror
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>
            <div className="text-wrap-hero-about bg">
                <div className="cover-shape"
                    style={{
                        transform: 'translate3d(100%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                        transformStyle: 'preserve-3d',
                        display: 'block',
                    }}      
                ></div>
                <Image
                className="main-image"
                src="https://assets-global.website-files.com/60d4499d6dd4a589a869c2a8/60e2cdca782f33aac57badd3_44%20(1)%20(1)-p-800.jpeg"
                alt="about"
                width={800}
                height={800}
                style={{
                    willChange: 'transform',
                    transform: 'translate3d(0px, -3.40392%, 0px) scale3d(1.14183, 1.14183, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                    transformStyle: 'preserve-3d',
                }}        
                />
            </div>
            </div>
        </div>
        </div>
        <div className="scaled-wrapper"
            style={{
                willChange: 'width, height',
                width: '100vw',
            }}  
        >
            <Image
                className="scaled-image"
                src="https://assets-global.website-files.com/60d4499d6dd4a589a869c2a8/60dc909d50fa107ed4fd91a0_effect.jpg"
                alt="about"
                width={800}
                height={800}
            />
        </div>
        <div className="main no-padding">
            <div className="container about">
                <div className="section-text no-bgh">
                    <div className="w-layout-grid grid-about">
                        <div className="wrapper-grid-about padding">
                            <h3 className="main-heading about scroll-in-to-view">m</h3>
                        </div>
                        <div className="wrapper-grid-about">
                            <div className="main-text scroll-in-to-view">
                                <strong className="bold-text-6">We are Makai</strong>
                            </div>
                            <p 
                                className="main-paragraph sroll-in-to-view"
                                style={{
                                    transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                                    transformStyle: 'preserve-3d',
                                    opacity: 1,
                                }}          
                            >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor dolores ex, excepturi reprehenderit omnis, dolorum ipsum, minus consequatur veritatis praesentium quam id qui iure! Veritatis, totam? Reprehenderit laudantium maxime numquam?
                            </p>
                            <p 
                                className="main-paragraph sroll-in-to-view"
                                style={{
                                    transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                                    transformStyle: 'preserve-3d',
                                    opacity: 1,
                                }}          
                            >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor dolores ex, excepturi reprehenderit omnis, dolorum ipsum, minus consequatur veritatis praesentium quam id qui iure! Veritatis, totam? Reprehenderit laudantium maxime numquam?
                            </p>
                        </div>
                        <div className="wrapper-grid-about padding-top">
                            <p className="wrapper-grid-about padding-top">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique modi magni explicabo eum fugiat ex, placeat aut in nemo perspiciatis eos numquam quas necessitatibus veritatis laborum labore iste. Sunt, eum!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="hero-about no-padding">
            <div className="text-wrap-hero-about padding">
                <h1 className="main-heading">We take care of your feelings</h1>
                <p className="main-paragraph margin">
                    Lorem ipsum dolor sit amet <br /> consectetur adipisicing elit. Eum, veritatis.
                </p>
                <div className="row"
                    style={{
                        transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                        opacity: 1,
                        transformStyle: 'preserve-3d',
                    }}  
                >
                    <Image
                        src='https://cdn.prod.website-files.com/60d4499d6dd4a589a869c2a8/60dd8f386671a5605644ec2d_Slag-01.svg'
                        alt="image-1"
                        width={800}
                        height={800}
                        className="slag-image"
                    />
                    <p className="main-paragraph no-margin">custom products</p>
                </div>
                <div className="row"
                    style={{
                        transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                        opacity: 1,
                        transformStyle: 'preserve-3d',
                    }}  
                >
                    <Image
                        src='https://cdn.prod.website-files.com/60d4499d6dd4a589a869c2a8/60dd8f386671a5605644ec2d_Slag-01.svg'
                        alt="image-1"
                        width={800}
                        height={800}
                        className="slag-image"
                    />
                    <p className="main-paragraph no-margin">100% eco fabrics</p>
                </div>
                <div className="row"
                    style={{
                        transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                        opacity: 1,
                        transformStyle: 'preserve-3d',
                    }}  
                >
                    <Image
                        src='https://cdn.prod.website-files.com/60d4499d6dd4a589a869c2a8/60dd8f386671a5605644ec2d_Slag-01.svg'
                        alt="image-1"
                        width={800}
                        height={800}
                        className="slag-image"
                    />
                    <p className="main-paragraph no-margin">approved boards</p>
                </div>
            </div>
            <div 
                className="text-wrap-hero-about _600"
            >
                <div 
                    className="cover-shape"
                    style={{
                        transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                        transformStyle: 'preserve-3d',
                        display: 'block',
                    }}
                ></div>
                <Image
                    src='https://assets-global.website-files.com/60d4499d6dd4a589a869c2a8/60e2cdca782f33aac57badd3_44%20(1)%20(1)-p-1080.jpeg'
                    alt="image-1"
                    width={800}
                    height={800}
                    style={{
                        transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                        transformStyle: 'preserve-3d',
                        zIndex: 1,
                    }}  
                />
            </div>
        </div>
    </>
  );
};

export default Page;
