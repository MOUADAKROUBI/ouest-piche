'use client';

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Navigation() {
  const query = useSearchParams().get("category");

  return (
    <div className="container no-bg">
      <Link href="/" className="link-text w-inline-block">
      <div className="main-text link">accueil</div>
      </Link>
      <div className="main-text link margin">/</div>
      <Link href="#" className="link-text w-inline-block">
      <div className="main-text link">boutique</div>
      </Link>
      <div className="main-text link margin">/</div>
      <div className="main-text link">{query?.replaceAll("-", " ") ?? 'all products'}</div>
    </div>
  );
}
