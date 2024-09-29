import { wixClientServer } from '@/lib/wixClientServer';
import Brand from '@/UI/brand';
import Link from 'next/link';
import React from 'react';

const Footer = async () => {
    const wixClient = await wixClientServer();
    const collections = (await wixClient.collections.queryCollections().limit(3).find()).items;

    return (
        <footer className='footer' data-aos="zoom-in-down">
            <div className="container">
                <div className="w-layout-grid footer-grid">
                    <div className="wrapper-footer">
                        <Brand />
                        <h1 className="main-heading footer">
                            Premium fishing gear for all.
                        </h1>
                    </div>
                    <div 
                        className="wrapper-footer flex"
                        id='w-node-b4085ec7-73f7-1d68-189c-49e7935adbe0-935adbd6'
                    >
                        <div className="w-layout-grid grid">
                            <div className="wrapper-link-footer">
                                <h6 className="heading">page</h6>
                                <Link
                                    href='/about'
                                    className="nav-link footer w-inline-block"
                                >
                                    <div className="text-link static">about</div>
                                </Link>
                                <Link
                                    href='/shop?category=all-products'
                                    className="nav-link footer w-inline-block"
                                >
                                    <div className="text-link static">shop</div>
                                </Link>
                                <Link
                                    href='/contact'
                                    className="nav-link footer w-inline-block"
                                >
                                    <div className="text-link static">contact</div>
                                </Link>
                            </div>
                            <div className="wrapper-link-footer">
                                <h6 className="heading">shop</h6>
                                {
                                    collections.map((collection) => (
                                        <Link
                                            key={collection._id}
                                            href={`/shop?category=${collection.name?.replaceAll(' ', '-').toLowerCase()}`}
                                            className="nav-link footer w-inline-block"
                                        >
                                            <div className="text-link static">{collection.name}</div>
                                        </Link>
                                    ))
                                }
                            </div>
                            <div className="wrapper-link-footer">
                                <h6 className="heading">social</h6>
                                <Link
                                    href='/about'
                                    className="nav-link footer w-inline-block"
                                >
                                    <div className="text-link static">facebook</div>
                                </Link>
                                <Link
                                    href='/shop?category=all-products'
                                    className="nav-link footer w-inline-block"
                                >
                                    <div className="text-link static">instagram</div>
                                </Link>
                                <Link
                                    href='/contact'
                                    className="nav-link footer w-inline-block"
                                >
                                    <div className="text-link static">whatsApp</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-buttom mt-3 text-center">
                <p className="text-center text-[15px]">
                    {new Date().getFullYear()} &copy; All rights reserved || designed and developed by <a className='font-bold' href="https://www.linkedin.com/in/mouad-akroubi-714284222" target="_blank" rel="noreferrer">MOUAD AKROUBI</a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
