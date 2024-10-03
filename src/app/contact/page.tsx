import React from 'react'
import type { Metadata } from "next";

export const metadata : Metadata = {
    title: "Contact",
    description: "Contact page",
};

export default function Contact() {
  return (
    <div className='main'>
        <div className="container">
            <div className="w-layout-grid contact-grid">
                <div className="contact-wrap">
                    <h1 className="main-heading">contact</h1>
                    <h1 className="main-heading contact-info">call</h1>
                    <p className="main-paragraph">060606060606</p>
                    <h1 className="main-heading contact-info">email</h1>
                    <p className="main-paragraph">mouad@gmail.com</p>
                    <h1 className="main-heading contact-info">address</h1>
                    <p className="main-paragraph">agadir</p>
                </div>
                <div className="container-image" id="w-node-_18748564-0e13-9745-d99d-3c3634bfd6fa-bb522360">
                    <div className="cover-shap"
                        style={{
                            transform: 'translate3d(100%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                            transformStyle: 'preserve-3d',
                            display: 'block'
                        }}
                    ></div>
                </div>
                <div className="wrapper-text-contact">
                    <h2 className="main-heading h2 sroll-in-to-view">Opening Hours</h2>
                </div>
                <div className="wrapper-text-contact">
                    <p className="main-paragraph contact sroll-in-to-view">
                        Monday - Friday: <strong className="bold-text-7">8:00 - 21:00 <br /></strong>
                        Saturday: <strong className="bold-text-7">8:00 - 14:00 <br /></strong>
                        Sunday: <strong className="bold-text-7">Closed <br /></strong>
                    </p>
                </div>
                <div className="wrapper-text-contact">
                    <h2 className="main-heading h2 sroll-in-to-view">Wholesale Enquiries</h2>
                </div>
                <div className="wrapper-text-contact">
                    <p className="main-paragraph contact sroll-in-to-view">
                    For all wholesale enquiries in the EU region, please contact: <br />
                    Linda Cristie:
                    <a href="#" className='text-span-link'> mouad@gmail.com <br /></a>
                    0606060606060
                    </p>
                </div>

            </div>
        </div>
    </div>
  )
}
